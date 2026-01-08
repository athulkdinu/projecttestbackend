const mongoose = require("mongoose");

const savedProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Prevent duplicates - one product per user
savedProductSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("SavedProduct", savedProductSchema);

