const User = require("../model/User");
const jwt = require("jsonwebtoken");

// Register Controller
const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user (plain text password)
    const user = new User({ email, password });
    await user.save();

    // Check JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not set in .env file");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    console.error("❌ Register error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log("❌ Login failed: User not found -", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Plain text password comparison
    if (user.password !== password) {
      console.log("❌ Login failed: Password mismatch for -", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not set in .env file");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Login successful for -", email);

    // Success response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerController,
  loginController
};
