import express from "express";
import cors from "cors";
// import fetch from "node-fetch";
const app = express();
const port = 5002;

const ACCESS_TOKEN = "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"; 

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

app.post("/predict", async (req, res) => {
  const { text } = req.body;
  const response = await fetch(
    "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    }
  );

  const data = await response.json();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
