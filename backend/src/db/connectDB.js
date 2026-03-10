import mongoose from "mongoose";
import dotenv from 'dotenv'
import env from "../config/env.js";
dotenv.config()
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`✅ MongoDB Connected`);
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error(error.message);

    process.exit(1); 
  }
};

export default connectDB;