import mongoose from "mongoose";

let isConnected = false;

export const connectToOrderDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Order DB");
    isConnected = true;
  } catch (error) {
    console.error("Error connecting to Order DB:", error);
  }
};
