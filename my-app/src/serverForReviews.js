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
const reviewSchema = new mongoose.Schema({
  rating: Number,
  title: String,
  text: String,
  images: Array,
  asin: String,
  parent_asin: String,
  user_id: String,
  timestamp: Number,
  helpful_vote: Number,
  verified_purchase: Boolean,
});

// Create a model for the reviews collection
const Review = mongoose.model("Review", reviewSchema, "reviews");

// Initialize express app
const app = express();
const port = 5001;

// Middleware to parse JSON data
app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    // or
    // origin: true, // Allow any origin (less secure, use with caution)
    // origin: '*', // Allow any origin (less secure, use with caution)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));
app.use(express.json());

// Fetch all reviews from the database
app.get("/api/reviews", async (req, res) => {
  try {
    // Fetch all products
    const reviews = await Review.find().limit(10); 
    res.json(reviews); // Send the product data as a response
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).send("Error fetching reviews.");
  }
});

// Fetch a specific product by its ASIN
app.get("/api/reviews/:asin", async (req, res) => {
  const { asin } = req.params;

  try {
    const review = await Product.findOne({ parent_asin: asin });
    if (review) {
      res.json(review); // Send the found product data
    } else {
      res.status(404).send("Review not found");
    }
  } catch (err) {
    console.error("Error fetching review:", err);
    res.status(500).send("Error fetching review.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
