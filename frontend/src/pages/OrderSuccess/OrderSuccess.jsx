import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { toast } from 'sonner';

import { updateOrder} from '@/services/orders.service';
import { getStripeTransactionData } from '@/services/stripe.service';

function OrderSuccess() {

    const location = useLocation();
    const [orderDetails, setOrderDetails] = useState({});

    useEffect(() => {
        // Get the session_id from the URL
        const queryParams = new URLSearchParams(location.search);
        const sessionId = queryParams.get('session_id');
        

        if (sessionId) {
            console.log("Stripe Session ID:", sessionId);
            // Use the session ID to fetch payment details, update order status, etc.

            toast.success('Order placed successfully');

            // @TODO: Call the backend API to update the order status

            // @TODO: Redirect the user to the order details page or products page or dashboard

            const getOrderDetails = async () => {
                try {
                    const response = await getStripeTransactionData(sessionId);
                    setOrderDetails(response);
                    console.log(response);
                } catch (error) {
                    console.error(error);
                }
            }

            getOrderDetails();

            // const orderData = getOrderDetails(sessionId);
            const orderId = orderDetails?.metadata?.orderId;

            if(orderId) {
              console.log('orderData', orderId);

              const orderData = {
                orderStatus: 'completed',
              }
  
              const updateOrderStatus = async () => {
                  try {
                      const response = await updateOrder(orderId, orderData);
                      const data = response.data;
                      console.log('final: ', data);
                  } catch (error) {
                      console.error(error);
                  }
              }

              updateOrderStatus();
            }


        } else {
            console.error("No session ID found in the URL.");
        }
    }, [location]);

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