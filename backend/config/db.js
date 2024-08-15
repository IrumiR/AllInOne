import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const db = process.env.DATABASE_URL;


const connectDB = async () => {
  try {

    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log('✅MongoDB Connected...');
  } catch (err) {
    console.error('❌DB Connection Error: ', err.message);
    process.exit(1);
  }
};

export default connectDB;
