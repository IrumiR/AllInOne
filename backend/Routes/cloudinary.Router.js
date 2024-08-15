import express from "express";
import cloudinary from "cloudinary";
import { cloudinaryConfig } from "../config/cloudinary.config.js";


 const router = express.Router();

 router.get('/get-signature', (req, res) => {
        res.send('Signature route working');

        // const timestamp = Math.round(new Date().getTime() / 1000); 
        // const apiSecret = cloudinaryConfig.api_secret;
        // const signature = cloudinary.utils.api_sign_request({ 
        //     timestamp: timestamp, 
        // }, apiSecret); 
        // res.json({ signature, timestamp });
    
     });

 export default router;