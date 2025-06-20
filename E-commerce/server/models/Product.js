const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  offer: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);