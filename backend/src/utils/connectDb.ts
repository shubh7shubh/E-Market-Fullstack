import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://kosevimit:PkKVHiIho6EM9n5l@cluster0.z9lflhi.mongodb.net/'); // Type assertion for ConnectOptions
        console.log('Connected to MongoDB Atlas');
    } catch (error: any) { // Specify 'any' type for the error object
        console.error('Error connecting to MongoDB Atlas:', error.message);
        // Exit process if connection fails
        process.exit(1);
    }
};