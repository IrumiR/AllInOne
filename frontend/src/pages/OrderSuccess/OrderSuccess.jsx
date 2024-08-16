import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { toast } from 'sonner';

import { updateOrder } from '@/services/orders.service';
import { getStripeTransactionData } from '@/services/stripe.service';
import { LOCAL_STORAGE_KEYS } from '@/common/constants';
import { clearCart } from '@/store/cart.slice';
import { useDispatch } from 'react-redux';

function OrderSuccess() {

    const location = useLocation();
    const [orderDetails, setOrderDetails] = useState({});
    const dispatch = useDispatch();

    // updated order data

    useEffect(() => {
        // Get the session_id from the URL
        const queryParams = new URLSearchParams(location.search);
        const sessionId = queryParams.get('session_id');


        if (sessionId) {
            console.log("Stripe Session ID:", sessionId);
            // Use the session ID to fetch payment details, update order status, etc.

            toast.success('Order placed successfully');


            const getOrderDetails = async () => {
                try {
                    const response = await getStripeTransactionData(sessionId).then((response) => {
                        setOrderDetails(response.data);
                        //   console.log(response);
                    })
                    // setOrderDetails(response);
                    // console.log(response.data);

                    // return response.data;
                } catch (error) {
                    console.error(error);
                }
            }

            getOrderDetails();

        } else {
            console.error("No session ID found in the URL.");
        }
    }, [location]);

    useEffect(() => {
        const orderId = orderDetails?.metadata?.orderId;

            if (orderId) {
                console.log('orderData', orderId);

                const orderData = {
                    orderStatus: 'completed',
                }

                const updateOrderStatus = async () => {
                    try {
                        const response = await updateOrder(orderId, orderData);
                        const data = response.data;
                        console.log('Final Order data: ', data);

                        toast.success('Order updated successfully');

                        // @TODO: Redirect the user to the order details page or products page or dashboard

                        // @TODO: clear the cart items in the local storage
                        localStorage.removeItem(LOCAL_STORAGE_KEYS.CART);
                        
                        // update cart state in the context
                        dispatch(clearCart());
                        

                    } catch (error) {
                        console.error(error);
                    }
                }

                updateOrderStatus();
            }
    }, [orderDetails]);


    return (
        <section className="mt-20">
            <div className="container">
                <h1 className="text-3xl font-bold mb-6">Order Success</h1>
                <p>Your order has been placed successfully. Thank you for shopping with us!</p>
            </div>
        </section>
    )
}

export default OrderSuccess