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

const Product = mongoose.model("Product", productSchema, "prod_desc"); // Explicit collection name

async function pushDataToDB(filePath) {
  const readStream = fs.createReadStream(filePath, "utf8");
  let buffer = "";

  readStream.on("data", (chunk) => {
    buffer += chunk;
    let lines = buffer.split("\n");
    buffer = lines.pop(); // Keep the incomplete line in buffer

    lines.forEach(async (line) => {
      try {
        const product = JSON.parse(line); // Parse the JSON line
        const newProduct = new Product(product);
        await newProduct.save(); // Save to MongoDB
        console.log("Product saved:", product.title);
      } catch (err) {
        console.error("Error saving product:", err.message);
      }
    });
  });

  readStream.on("end", () => {
    console.log("File processing complete.");
    if (buffer) {
      try {
        const product = JSON.parse(buffer);
        const newProduct = new Product(product);
        newProduct.save().then(() => console.log("Last product saved."));
      } catch (err) {
        console.error("Error saving last product:", err.message);
      }
    }
  });

  readStream.on("error", (err) => {
    console.error("Error reading file:", err.message);
  });
}

// Call the function with your JSON file
pushDataToDB("../meta_All_Beauty.jsonl");
