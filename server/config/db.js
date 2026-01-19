import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Successfully.");
  } catch (error) {
    console.log("Error connecting database");
    process.exit(1);
  }
};
