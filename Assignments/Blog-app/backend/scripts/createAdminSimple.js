import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/userSchema.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Blogify",
    });
    console.log("✅ Connected to MongoDB successfully!");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@blognest.com" });
    if (existingAdmin) {
      console.log("ℹ️  Admin user already exists!");
      console.log("📧 Email: admin@blognest.com");
      console.log("🔑 Password: admin123");
      console.log("👤 Role: Admin");
      await mongoose.disconnect();
      return;
    }

    // Create admin user (password will be hashed by pre-save hook)
    console.log("👤 Creating admin user...");
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@blognest.com",
      password: "admin123", // Will be hashed by pre-save hook
      role: "Admin",
      avatar: {
        public_id: "default-avatar",
        url: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Admin",
      },
    });

    console.log("🎉 Admin user created successfully!");
    console.log("📧 Email: admin@blognest.com");
    console.log("🔑 Password: admin123");
    console.log("👤 Role: Admin");
    console.log("🆔 User ID:", adminUser._id);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
    
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    console.error("Full error:", error);
    
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
createAdmin();
