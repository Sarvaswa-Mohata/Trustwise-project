import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// MongoDB connection string (update with your credentials)
const username = encodeURIComponent("f20202358");
const password = encodeURIComponent("4f8CVm7ZW522sJWj");
const CONNECTION_STRING = `mongodb+srv://${username}:${password}@cluster0.iq23vkt.mongodb.net/beauty_products?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose
  .connect(CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define schema for prod_desc
const productSchema = new mongoose.Schema({
  main_category: String,
  title: String,
  average_rating: Number,
  rating_number: Number,
  features: Array,
  description: Array,
  price: mongoose.Schema.Types.Mixed, // Can be number or null
  images: [
    {
      thumb: String,
      large: String,
      variant: String,
      hi_res: mongoose.Schema.Types.Mixed,
    },
  ],
  videos: Array,
  store: String,
  categories: Array,
  details: mongoose.Schema.Types.Mixed, // Handles nested objects like 'details'
  parent_asin: String,
  bought_together: mongoose.Schema.Types.Mixed, // Can be null or object
});

// Create the model
const Product = mongoose.model("Product", productSchema, "prod_desc"); // Explicit collection name

// Initialize express app
const app = express();
const port = 5000;

const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:5173",
];

// Middleware to parse JSON data
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow requests with no origin (e.g., mobile apps, curl)
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));
app.use(express.json());

// Fetch all products from the database
app.get("/api/products", async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find().limit(10); 
    res.json(products); // Send the product data as a response
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Error fetching products.");
  }
});

// Fetch a specific product by its ASIN
app.get("/api/products/:asin", async (req, res) => {
  const { asin } = req.params;

  try {
    const product = await Product.findOne({ parent_asin: asin });
    if (product) {
      res.json(product); // Send the found product data
    } else {
      res.status(404).send("Product not found");
    }
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).send("Error fetching product.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
