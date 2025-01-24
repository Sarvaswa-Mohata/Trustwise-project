import mongoose from "mongoose";
import fs from "fs";
// MongoDB connection string (update with your credentials)
const username = encodeURIComponent("f20202358");
const password = encodeURIComponent("4f8CVm7ZW522sJWj");
const CONNECTION_STRING = `mongodb+srv://${username}:${password}@cluster0.iq23vkt.mongodb.net/beauty_products?retryWrites=true&w=majority`;

// Connect to MongoDB

mongoose
  .connect(CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));


// Define the schema for your collection
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

// Function to clean and parse JSON lines
const parseAndCleanJSON = (line) => {
  try {
    // Attempt to parse the JSON
    return JSON.parse(line);
  } catch (err) {
    console.error("Invalid JSON line skipped:", line);
    return null; // Return null for invalid JSON
  }
};

// Function to read, parse, and push data into MongoDB
async function pushDataToDB(filePath) {
  const readStream = fs.createReadStream(filePath, "utf8");
  let buffer = "";

  readStream.on("data", (chunk) => {
    buffer += chunk;
    let lines = buffer.split("\n");

    // Keep the last incomplete line in the buffer
    buffer = lines.pop();

    lines.forEach(async (line) => {
      const review = parseAndCleanJSON(line);
      if (review) {
        try {
          const newReview = new Review(review);
          await newReview.save(); // Save to MongoDB
          console.log("Review saved:", review.title);
        } catch (err) {
          console.error("Error saving review:", err.message);
        }
      }
    });
  });

  readStream.on("end", () => {
    console.log("File read complete.");
    if (buffer) {
      // Process any remaining data in the buffer
      const review = parseAndCleanJSON(buffer);
      if (review) {
        const newReview = new Review(review);
        newReview.save().then(() => console.log("Last review saved."));
      }
    }
  });

  readStream.on("error", (err) => {
    console.error("Error reading file:", err.message);
  });
}

// Call the function with your JSON file

const jsonRecords = "../All_beauty.jsonl";
pushDataToDB(jsonRecords);
