import mongoose from "mongoose";
import config from "../config";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database_url);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Handle disconnection
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected");
});

// Handle errors
mongoose.connection.on("error", (err) => {
  console.error("🔥 MongoDB error:", err);
});
