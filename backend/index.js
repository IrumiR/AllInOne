import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import cloudinary from "cloudinary";
import { cloudinaryConfig } from "./config/cloudinary.config.js";
import Stripe from "stripe";

// rountes
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import serviceProviderRoute from "./Routes/serviceProviders.js";
import reviewRoute from "./Routes/review.js";
import serviceRoute from "./Routes/services.Router.js";
import cloudinaryRouter from "./Routes/cloudinary.Router.js";
import productRoute from "./Routes/products.Router.js";
import ordersRoute from "./Routes/orders.Router.js";
import bookingRouter from "./Routes/bookings.Router.js";

dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const corsOptions = {
    origin: true,
};

app.get("/", (req, res) => {
    res.send("Api is working")
});

//database connection
connectDB()


//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/serviceproviders', serviceProviderRoute)
app.use('/api/v1/reviews', reviewRoute)
app.use('/api/v1/services', serviceRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/orders', ordersRoute);
app.use('/api/v1/bookings', bookingRouter);

app.get('/api/v1/get-signature', (req, res) => {
    // res.send('Signature route working');

    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiSecret = cloudinaryConfig.api_secret;
    console.log("apiSecret: ", apiSecret);
    const signature = cloudinary.utils.api_sign_request({
        timestamp: timestamp,
    }, apiSecret);
    res.json({ signature, timestamp });

})

// stripe
app.post('/api/v1/create-order-checkout-session', async (req, res) => {

    const { cartItems, orderId, userId } = req.body;

    // return res.json({cartItems: cartItems, orderId: orderId, userId: userId});

    const line_items = cartItems?.map(item => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }
    });

    // return res.json({line_items});

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'LK'], // Adjust based on your needs
        },
        success_url: `${process.env.CLIENT_SUCCESS_URL}/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_CANCEL_URL}`,
        metadata: {
            orderId,
            userId,
        }
    });
    res.json({ sessionId: session.id });
});

app.get('/api/v1/payment-success', async (req, res) => {
    const session_id = req.query.session_id;


    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['payment_intent', 'shipping'],
        });

        // return res.json(session);

        // Access the shipping details
        const shippingDetails = session.payment_intent.shipping;

        const data = {
            shippingDetails,
        };

        // Use this data in your application (e.g., save to your database)
        res.status(200).json({
            type: 'success',
            message: 'Payment successful',
            data: data,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// stripe booking session init
app.post('/api/v1/create-booking-checkout-session', async (req, res) => {

    const bookingInfo = req.body;

    // return res.json({ bookingInfo });

    const lineItems = [
        {
            price_data: {
                currency: "usd",
                product_data: {
                    name: bookingInfo.serviceName,
                    // images: [bookingInfo.serviceImage],
                },
                unit_amount: 2000,
            },
            quantity: 1,
        }]

    // return res.json({lineItems});

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'LK'], // Adjust based on your needs
        },
        success_url: `${process.env.CLIENT_SUCCESS_URL}/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_CANCEL_URL}`,
        metadata: {
            bookingId: bookingInfo.bookingId,
            userId: bookingInfo.clientId._id,
            serviceId: bookingInfo.serviceId,
            serviceName: bookingInfo.serviceName,

        }
    });
    res.json({ sessionId: session.id });
});


app.listen(port, () => {
    connectDB()
    console.log("✅Server is running on port: " + port)
});