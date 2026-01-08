// Script to create a test user directly in MongoDB
// Run: node scripts/createUser.js

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../model/User");

const connectionstring = process.env.DATABASE || process.env.MONGODB_URI;

// Test user credentials
const testUser = {
  email: "test@example.com",
  password: "password123"
};

async function createUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(connectionstring);
    console.log("✅ Connected to MongoDB");

    // Check if user already exists
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      console.log("❌ User already exists with email:", testUser.email);
      process.exit(1);
    }

    // Create user (password stored as plain text)
    const user = new User({
      email: testUser.email,
      password: testUser.password
    });

    await user.save();
    console.log("✅ User created successfully!");
    console.log("📧 Email:", testUser.email);
    console.log("🔑 Password:", testUser.password);
    console.log("🆔 User ID:", user._id);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
    process.exit(1);
  }
}

createUser();

