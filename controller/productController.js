const SavedProduct = require("../model/SavedProduct");

// Get all saved products for authenticated user
const getSavedProductsController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const savedProducts = await SavedProduct.find({ userId })
      .sort({ createdAt: -1 });
    
    res.json(savedProducts);
  } catch (error) {
    console.error("Get saved products error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Save a product
const saveProductController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, title, price, thumbnail } = req.body;

    if (!productId || !title || !price || !thumbnail) {
      return res.status(400).json({ message: "All product fields are required" });
    }

    // Check if already saved (unique index will also prevent duplicates)
    const existing = await SavedProduct.findOne({ userId, productId });
    if (existing) {
      return res.status(400).json({ message: "Product already saved" });
    }

    const savedProduct = new SavedProduct({
      userId,
      productId,
      title,
      price,
      thumbnail
    });

    await savedProduct.save();
    res.status(201).json({ message: "Product saved successfully", savedProduct });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Product already saved" });
    }
    console.error("Save product error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove a saved product
const removeSavedProductController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const deleted = await SavedProduct.findOneAndDelete({ userId, productId });
    
    if (!deleted) {
      return res.status(404).json({ message: "Product not found in saved list" });
    }

    res.json({ message: "Product removed from saved list" });
  } catch (error) {
    console.error("Remove product error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getSavedProductsController,
  saveProductController,
  removeSavedProductController
};

