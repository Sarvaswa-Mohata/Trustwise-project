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
  images: [
    {
     thumb: String,
     large: String,
     variant: String,
     hi_res: mongoose.Schema.Types.Mixed,
    },
  ],
  parent_asin: String,
});

// Create a model for the reviews collection
const Review = mongoose.model("Review", reviewSchema, "cust_reviews");

// Initialize express app
const app = express();
const port = 5003;

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
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Specify allowed methods
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
})
.post("/api/reviews", async (req, res) => {
  const newReview = req.body;
  try {
    const review = new Review(newReview);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(500).send("Error saving review.");
  }
});

// Fetch a specific product by its ASIN
app.get("/api/reviews/:parent_asin", async (req, res) => {
  const { parent_asin } = req.params;

  try {
    const review = await Review.findOne({ parent_asin: parent_asin });
    if (review) {
      res.json(review); // Send the found product data
    } else {
      res.status(404).send("Review not found");
    }
  } catch (err) {
    console.error("Error fetching review:", err);
    res.status(500).send("Error fetching review.");
  }
})
.patch("/api/reviews/:parent_asin", async (req, res) => {
  const { parent_asin } = req.params;
  const updatedReview = req.body;

  try {
    const review = await Review.findOneAndUpdate(
      { parent_asin: parent_asin },
      updatedReview,
      { new: true }
    );

    if (review) {
      res.json(review);
    } else {
      res.status(404).send("Review not found");
    }
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).send("Error updating review.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
