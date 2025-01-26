import React, { useEffect, useContext, useState } from "react";
import { Modal, Button, Box, Card, CardHeader, CardMedia, CardContent, Avatar, Typography, IconButton, CardActions, Grid2, Rating, LinearProgress, Slider } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { ReviewContext } from "./ReviewContext";
import EmotionChartPopup from "./EmotionChartPopup";

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
  const { reviews, setReviews, predictionValue, setPredictionValue, isReviewSubmitted, setIsReviewSubmitted } = useContext(ReviewContext);
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
      setPredictionValue((prevValue) => ({
        ...prevValue,
        [index]: (1 / (1 + Math.exp(-prediction))) * 100, // Set the prediction value and multiply by 100
      }));      
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

  useEffect((isReviewSubmitted) => {
    // Fetch products and reviews
    axios
    .get("http://localhost:5003/api/reviews")
    .then((reviewsResponse) => {
      setReviews(reviewsResponse.data); // Set reviews
      reviewsResponse.data.map((item, index)=>{
          fetchGibberishPrediction(item.text, index);
          loadAvatarData(index);
      })
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    })
    .finally(() => {
      setIsReviewSubmitted(false);
    });
  }, [isReviewSubmitted]);

  // If no products or reviews are loaded yet, return a loading state
  if(reviews.length === 0){
    return <div>No Data to Display</div>
  }

  return (
    <div
      style={{
        padding: "32px",
        backgroundColor: "#f5e9e4",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        style={{
          marginBottom: "24px",
          color: "#774C3D",
          fontFamily: 'Playfair Display, serif',
        }}
      >
        Customer Reviews
      </Typography>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      ></div>
    <Grid2 container spacing={2} justifyContent="center">
      {reviews.map((item, index) => (
        <Grid2 item key={index} xs={12} sm={6} md={4}>
          <Card sx={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              maxWidth: 345,
              minWidth: 345,
            }} 
            onClick={() => handleOpenPopup(index)}
          >
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
              title={<Typography fontWeight={"normal"} style={{ color: "#774C3D" }}>{item.title.split(" ").slice(0, 4).join(" ")}</Typography>} // Take top 4 words of the title
              subheader={<Typography variant="body2" style={{ color: "#8a6b5d" }}>{new Date().toLocaleDateString()}</Typography>} // Use current date for subheader
            />
            <CardMedia
              component="img"
              height="194"
              image={item.images[0]?.large} // Use the first image URL from the images array
              alt={item.title}
              style={{ objectFit: "cover" }}
            />
            <CardContent>
            {/* Display the product review text */}
            <Typography
                variant="body1"
                sx={{
                color: "#8a6b5d",
                marginBottom: "8px",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 3, // Ensure only 3 lines are displayed
                minHeight: "4.5em", // Approximate height for 3 lines of text
                }}
            >
                {item.text || "No description available"}
            </Typography>

            {/* Display the rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Typography variant="body2" style={{ color: "#8a6b5d" }}>
                  Rating:
                </Typography>
                <Rating
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#D2A185", // Color of the filled stars
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#E0CFC3", // Color of the empty stars
                    },
                  }}
                  name="product-rating"
                  value={item.rating || 0} // Use the rating value from reviews
                  precision={0.5} // Allows for fractional ratings
                  readOnly // Makes the stars non-interactive
                />
              </div>

            {/* Battery-style progress bar */}
            <div style={{ marginTop: "12px" }}>
                <Typography variant="body2" color="textSecondary">
                Gibberish Prediction :
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={predictionValue[index] || 0} // Show the prediction value as the progress
                  sx={{
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#D2A185', // Customize the progress bar color
                    },
                    '& .MuiLinearProgress-background': {
                      backgroundColor: '#FFFFFF', // Background color of the bar (behind the progress)
                    },
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
              sx={{backgroundColor:"#774C3D"}}
              onClick={handleClosePopup}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid2>
    </div>
  );
}
