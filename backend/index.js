import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import serviceProviderRoute from "./Routes/serviceProviders.js";
import reviewRoute from "./Routes/review.js";
import connectDB from "./config/db.js";

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

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

app.listen(port, () => {
    connectDB()
    console.log("✅Server is running on port: " + port)
});