import React, { useEffect, useContext, useState } from "react";
import { Modal, Button, Box, Card, CardHeader, CardMedia, CardContent, Avatar, Typography, IconButton, CardActions, Grid2, Rating, LinearProgress } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { ReviewContext } from "./ReviewContext";
import EmotionChartPopup from "./EmotionChartPopup";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff4040"]; // Define chart colors

// Function to generate random letter
const getRandomLetter = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters.charAt(Math.floor(Math.random() * letters.length)); // Random letter
};

// Function to generate random color
const getRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16); // Random hex color
  return `#${randomColor}`; // Return hex color string
};
  

export default function BeautyProductReviewCards() {
  const { products, setProducts, reviews, setReviews, predictionValue, setPredictionValue } = useContext(ReviewContext);
  const [popupIndex, setPopupIndex] = useState(null);
  const [avatarData, setAvatarData] = useState({});

  const handleOpenPopup = (index) => {
    setPopupIndex(index);
  };

  const handleClosePopup = () => {
    setPopupIndex(null);
  };

  const fetchGibberishPrediction = async (text, index) => {
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }), // sending the raw text
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      const prediction = result.probabilities[0][0];
      setPredictionValue((prevValue)=>({
        ...prevValue,
        [index]:prediction*100, // Set the prediction value
      }))
    }
     catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  const loadAvatarData = (index) => {
    setAvatarData((prevData) => ({
      ...prevData,
      [index]: {
        letter: getRandomLetter(), // Generate a random letter
        color: getRandomColor(), // Generate a random color
      },
    }));
  };

  useEffect(() => {
    // Fetch products and reviews
    const fetchProducts = axios.get("http://localhost:5000/api/products");
    const fetchReviews = axios.get("http://localhost:5001/api/reviews");

    Promise.all([fetchProducts, fetchReviews])
      .then(([productsResponse, reviewsResponse]) => {
        setProducts(productsResponse.data); // Set products
        setReviews(reviewsResponse.data); // Set reviews
        reviewsResponse.data.map((item, index)=>{
            fetchGibberishPrediction(item.text, index);
            loadAvatarData(index);
        })
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // If no products or reviews are loaded yet, return a loading state
  if (products.length === 0 || reviews.length === 0) {
    return <div>Loading...</div>;
  }

  const combinedData = products.map((product, index) => ({
    ...product,
    review: reviews[index]?.text || "No review available", // Match review text or fallback
    rating: reviews[index]?.rating || 0, // Match review rating or fallback to 0
  }));
  

  return (
    <Grid2 container spacing={2} justifyContent="center">
      {/* Iterate over combined data and display a Card for each */}
      {combinedData.map((item, index) => (
        <Grid2 item key={index} xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }} onClick={() => handleOpenPopup(index)}>
          <CardHeader
              avatar={
                avatarData[index] && ( // Ensure data is available for the index
                  <Avatar
                    sx={{ bgcolor: avatarData[index].color }}
                    aria-label="recipe"
                  >
                    {avatarData[index].letter}
                  </Avatar>
                )
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={item.title.split(" ").slice(0, 4).join(" ")} // Take top 4 words of the title
              subheader={new Date().toLocaleDateString()} // Use current date for subheader
            />
            <CardMedia
              component="img"
              height="194"
              image={item.images[0]?.large} // Use the first image URL from the images array
              alt={item.title}
            />
            <CardContent>
            {/* Display the product review text */}
            <Typography
                variant="body2"
                sx={{
                color: "text.secondary",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 3, // Ensure only 3 lines are displayed
                minHeight: "4.5em", // Approximate height for 3 lines of text
                }}
            >
                {item.review || "No description available"}
            </Typography>

            {/* Display the rating */}
            <div style={{ marginTop: "8px", display: "flex", alignItems: "center" }}>
                <Rating
                name="product-rating"
                value={item.rating || 0} // Use the rating value from reviews
                precision={0.5} // Allows for fractional ratings
                readOnly // Makes the stars non-interactive
                />
            </div>

            {/* Battery-style progress bar */}
            <div style={{ marginTop: "12px" }}>
                <Typography variant="body2" color="textSecondary">
                Prediction Confidence
                </Typography>
                <LinearProgress
                variant="determinate"
                value={predictionValue[index] || 0} // Show the prediction value as the progress
                sx={{
                    height: 10,
                    borderRadius: 5,
                    marginTop: "8px",
                    backgroundColor: "#e0e0e0", // Light background color
                }}
                />
            </div>
            </CardContent>
            <CardActions disableSpacing>
              {/* Add actions if needed */}
            </CardActions>
          </Card>
        </Grid2>
      ))}
      {/* Popup for review text */}
      <Modal
        open={popupIndex}
        onClose={handleClosePopup}
        aria-labelledby="review-popup-title"
        aria-describedby="review-popup-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 550,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="review-popup-title" variant="h6">
            Review Text
          </Typography>
          <Typography id="review-popup-description" sx={{ mt: 2 }}>
            {popupIndex !== null ? (
              reviews[popupIndex].text,
              <EmotionChartPopup reviewText={reviews[popupIndex].text} />
            ) : (
              "Loading..."
            )}
          </Typography>
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClosePopup}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid2>
  );
}
