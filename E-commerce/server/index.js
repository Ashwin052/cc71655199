const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;
const DATA_PATH = path.join(__dirname, "data", "products.json");

app.use(cors());
app.use(express.json());

const readProducts = () => JSON.parse(fs.readFileSync(DATA_PATH));
const writeProducts = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};

app.get("/", (req, res) => {
  res.send("E-commerce API is running!");
});

app.get("/api/products", (req, res) => {
  try {
    const products = readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error reading products data" });
  }
});

app.get("/api/products/:id", (req, res) => {
  const products = readProducts();
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.post("/api/products", (req, res) => {
  const products = readProducts();
  const newProduct = { ...req.body, id: Date.now() };
  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  let products = readProducts();
  const id = parseInt(req.params.id);
  products = products.map((p) => (p.id === id ? { ...p, ...req.body } : p));
  writeProducts(products);
  res.json({ message: "Product updated successfully" });
});

app.delete("/api/products/:id", (req, res) => {
  let products = readProducts();
  products = products.filter((p) => p.id !== parseInt(req.params.id));
  writeProducts(products);
  res.json({ message: "Product deleted successfully" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
