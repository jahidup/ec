require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./models/Product");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// ROUTES

// Get all products
app.get("/api/products", async (req, res) => {
  const products = await Product.find().sort({ updatedAt: -1 });
  res.json(products);
});

// Add product
app.post("/api/products", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// Update product
app.put("/api/products/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(updated);
});

// Delete product
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
