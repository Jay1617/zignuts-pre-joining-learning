import mongoose from "mongoose";
import { User } from "../models/userSchema.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const verifyAdmin = async () => {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Blogify",
    });
    console.log("✅ Connected to MongoDB successfully!");

    // Find admin user
    const admin = await User.findOne({ email: "admin@blognest.com" });
    
    if (admin) {
      console.log("🎉 Admin user found!");
      console.log("📧 Email:", admin.email);
      console.log("👤 Name:", admin.name);
      console.log("🔑 Role:", admin.role);
      console.log("🆔 User ID:", admin._id);
      console.log("📅 Created:", admin.createdOn);
    } else {
      console.log("❌ Admin user not found!");
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
    
  } catch (error) {
    console.error("❌ Error verifying admin user:", error.message);
    
    // Try to disconnect even if there was an error
    try {
      await mongoose.disconnect();
    } catch (disconnectError) {
      console.error("Error disconnecting:", disconnectError.message);
    }
    
    process.exit(1);
  }
};

// Run the script
verifyAdmin();



