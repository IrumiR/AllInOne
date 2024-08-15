import dotenv from "dotenv";

export const cloudinaryConfig = {
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  }