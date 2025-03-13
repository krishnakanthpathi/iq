import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB connected successfully 🍭🍭');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectDB;



