import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { STRIPE_PUBLISHABLE_KEY } from '@/config/app.config';
import { initializeCart } from '@/store/cart.slice';
import { setIsLoading } from '@/store/loading.slice';
import { createOrder } from '@/services/orders.service';
import { getCurrentUser } from '@/services/auth.service';
import { setIsUserAuthenticated } from "@/store/auth.slice";
import { setUser, setUserRole } from '@/store/user.slice';
import { LOCAL_STORAGE_KEYS } from '@/common/constants';

import CartSingleItem from '@/components/Shop/CartSingleItem';
import { Button } from '@/components/ui/button';

function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const [localUser, setLocalUser] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);

        if (!userId) {
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            try {
                const currentUser = await getCurrentUser(userId);

                dispatch(setIsUserAuthenticated(true));
                dispatch(setUser(currentUser));
                setLocalUser(currentUser);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                dispatch(setIsUserAuthenticated(false));
                navigate('/login');
            }
        };

        dispatch(initializeCart());
        fetchUserData();
    }, [dispatch, navigate]);

    const handleCheckout = async () => {
        if (localUser) {
            const stripePromise = await loadStripe(STRIPE_PUBLISHABLE_KEY);

            try {
                dispatch(setIsLoading(true));

                // foramt cart items for stripe
                const formattedCartItems = cartItems.map((item) => ({
                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    category: item.category,
                    quantity: item.quantity,
                    image: item.image,
                }));

                // shipping data
                const shippingData = {
                    address_line_1: localUser?.data?.address_line_1,
                    address_line_2: localUser?.data?.address_line_2,
                    city: localUser?.data?.city,
                    district: localUser?.data?.district,
                    province: localUser?.data?.province,
                    postal_code: localUser?.data?.postal_code || '00000',
                    phone: localUser?.data?.phone,
                };

                // order info
                const orderData = {
                    userId: localUser.data._id,
                    products: formattedCartItems,
                    totalAmount: totalPrice,
                    orderStatus: 'pending',
                    shippingAddress: shippingData,
                };

                const newOrder = await createOrder(orderData);
                
                const { sessionId } = await axios.post('http://localhost:3999/api/v1/create-order-checkout-session', {
                    cartItems: newOrder.data.products,
                    orderId: newOrder.data._id,
                    userId: newOrder.data.userId,
                }).then((response) => response.data);

                const stripe = await stripePromise;
                await stripe.redirectToCheckout({ sessionId });
            } catch (error) {
                toast.error('Failed to proceed to checkout');
                console.error(error);
            } finally {
                dispatch(setIsLoading(false));
            }
        } else {
            navigate('/login');
        }
    };

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
