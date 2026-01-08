const express = require("express");
const jwtMiddleware = require("../middleware/jwtMiddleware");
const {getSavedProductsController,saveProductController,removeSavedProductController} = require("../controller/productController");

const router = express.Router();

// Get all saved products (protected)
router.get("/saved", jwtMiddleware, getSavedProductsController);

// Save a product (protected)
router.post("/save", jwtMiddleware, saveProductController);

// Remove a saved product (protected)
router.delete("/saved/:productId", jwtMiddleware, removeSavedProductController);

module.exports = router;

