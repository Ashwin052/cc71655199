const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const path = require("path");
const natural = require("natural"); // 🧠 NLP tokenizer

const router = express.Router();
const tokenizer = new natural.WordTokenizer();

// Multer storage for image uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// CREATE: Add a new product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, offer } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      offer: Number(offer) || 0,
      imageUrl,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// UPDATE: Edit a product using FormData (no image update)
router.put("/:id", multer().none(), async (req, res) => {
  try {
    const { name, description, price, offer } = req.body;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price: Number(price),
        offer: Number(offer) || 0,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// READ: Get all products with optional search
router.get("/", async (req, res) => {
  const search = req.query.q || "";
  try {
    const products = await Product.find({
      name: { $regex: search, $options: "i" },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// DELETE: Remove a product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// BEST OFFER: Get top offer product
router.get("/best-offer", async (req, res) => {
  try {
    const topProduct = await Product.findOne({ offer: { $gt: 0 } }).sort({ offer: -1 });
    res.json(topProduct || {});
  } catch (err) {
    res.status(500).json({ error: "Could not fetch best offer" });
  }
});

// AI ASSISTANT: Natural language powered deal finder
router.post("/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const lower = question.toLowerCase();
    const words = tokenizer.tokenize(lower);
    let answer = "🤖 Hmm, I'm not sure how to help with that yet. Try asking about discounts or budget limits!";

    // Example: "Show me deals under 1000"
    const priceMatch = lower.match(/under\s*₹?\s*(\d+)/);
    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[1], 10);
      const deals = await Product.find({ price: { $lt: maxPrice }, offer: { $gt: 0 } })
        .sort({ offer: -1 })
        .limit(3);

      answer = deals.length
        ? `💰 Deals under ₹${maxPrice}: ` +
          deals.map((p) => `${p.name} (${p.offer}% OFF at ₹${p.price})`).join(", ")
        : `😕 No discounted products found under ₹${maxPrice}.`;
    } else if (words.includes("best") && words.includes("offer")) {
      const best = await Product.findOne({ offer: { $gt: 0 } }).sort({ offer: -1 });
      answer = best
        ? `🔥 Top Deal: ${best.name} has a ${best.offer}% OFF for ₹${best.price}.`
        : "😶 No current deals available.";
    }

    res.json({ answer });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ error: "AI failed to respond" });
  }
});

module.exports = router;