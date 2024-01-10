import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "Connected to MongoDB HOST :" + connectionInstance.connection.host
    );
  } catch (error) {
    console.error(" Database connection failed:", error.message);
  }
};

export default connectDB;
