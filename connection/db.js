const mongoose = require("mongoose");

const connectionstring = process.env.DATABASE || process.env.MONGODB_URI || process.env.MONGO_URI;

if (!connectionstring) {
  console.error("❌ DATABASE/MONGODB_URI/MONGO_URI not found in .env file");
  process.exit(1);
}

mongoose.connect(connectionstring)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err.message);
    process.exit(1);
  });
