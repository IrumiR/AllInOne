import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { toast } from 'sonner';

import { STRIPE_PUBLISHABLE_KEY } from '@/config/app.config';
import { initializeCart } from '@/store/cart.slice';
import { setIsLoading } from '@/store/loading.slice';
import { createOrder } from '@/services/orders.service';
import { getCurrentUser } from '@/services/auth.service';
import { setIsUserAuthenticated } from "@/store/auth.slice"
import { setUser, setUserRole } from '@/store/user.slice';
import { LOCAL_STORAGE_KEYS } from '@/common/constants';

import CartSingleItem from '@/components/Shop/CartSingleItem';
import { Button } from '@/components/ui/button';

function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    // const user = useSelector((state) => state.user);
    const [localUser, setLocaUser] = useState('')

    // console.log('user', user.user.data._id);

    const handleCheckout = async () => {
        
        if (localUser) {
            console.log('localUser', localUser);

            const stripePromise = await loadStripe(STRIPE_PUBLISHABLE_KEY);

            try {
                dispatch(setIsLoading(true));

                const formattedCartItems = cartItems.map((item) => {
                    return {
                        productId: item._id,
                        name: item.name,
                        price: item.price,
                        category: item.category,
                        quantity: item.quantity,
                        image: item.image,
                    };
                })

                const shppingData = {
                    address_line_1: localUser?.data?.address_line_1,
                    address_line_2: localUser?.data?.address_line_2,
                    city: localUser?.data?.city,
                    district: localUser?.data?.district,
                    province: localUser?.data?.province,
                    postal_code: localUser?.data?.postal_code || '00000',
                    phone: localUser?.data?.phone,
                }

                console.log('formattedCartItems: ', shppingData);
                // return false;

                // create order
                const orderData = {
                    userId: localUser.data._id,
                    products: formattedCartItems,
                    totalAmount: totalPrice,
                    orderStatus: 'pending',
                    shippingAddress: shppingData,
                }
  
                
                const newOrder = await createOrder(orderData);
                console.log('orderData', newOrder?.data._id);

                const orderId = newOrder?.data._id;
                const userId = newOrder?.data.userId;
                const newOrderProducts = newOrder?.data.products;

                const response = await axios.post('http://localhost:3999/api/v1/create-checkout-session', { cartItems: newOrderProducts, orderId, userId });

                console.log('response', response.data);

                // return false;

                const { sessionId } = response.data;

                const stripe = await stripePromise;
                await stripe.redirectToCheckout({ sessionId });
            } catch (error) {
                toast.error('Failed to proceed to checkout');
                console.error(error);
            } finally {
                dispatch(setIsLoading(false));
            }

        }
    }

    useEffect(() => {
        dispatch(initializeCart());

        // get user
        const fetchUserData = async () => {

            const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);
            const userRole = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ROLE);
            const currentUser = await getCurrentUser(userId);

            // set user is authenticated
            dispatch(setIsUserAuthenticated(true));

            // set user in redux state
            dispatch(setUser(currentUser));
            // dispatch(setUserRole(userRole));
            setLocaUser(currentUser);
        }

        fetchUserData();

    }, [dispatch]);



    return (
        <section className="mt-20 max-w-[1200px] mx-auto px-4">
            <div className="container">
                <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <CartSingleItem key={item._id} item={item} />
                        ))}
                        <div className="mt-8 text-right">
                            <h2 className="text-xl font-semibold">Total Price: Rs. {totalPrice.toFixed(2)}</h2>
                        </div>
                        <div className="flex justify-end mt-6">
                            <Button className="px-6 py-2 bg-blue-600 text-white rounded" onClick={handleCheckout}>Proceed to Checkout</Button>
                        </div>
                    </>
                )}
            </div>

        </section>
    );
}

export default CartPage;
