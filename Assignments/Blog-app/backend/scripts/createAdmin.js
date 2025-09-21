import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/userSchema.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Blogify",
    });
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@blognest.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      console.log("Email: admin@blognest.com");
      console.log("Password: admin123");
      console.log("Role: Admin");
      await mongoose.disconnect();
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@blognest.com",
      password: hashedPassword,
      role: "Admin",
      avatar: {
        public_id: "default-avatar",
        url: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Admin",
      },
    });

    console.log("Admin user created successfully!");
    console.log("Email: admin@blognest.com");
    console.log("Password: admin123");
    console.log("Role: Admin");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

createAdminUser();
