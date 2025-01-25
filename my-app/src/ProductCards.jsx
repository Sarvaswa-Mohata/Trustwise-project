import React, { useContext, useState } from "react";
import {Card,CardMedia,CardContent,CardActions,Button,Typography,Rating,Grid2,Modal,Box,Slider,TextField} from "@mui/material";
import { ReviewContext } from "./ReviewContext"; // Import ReviewContext

const ProductGrid = () => {
  const { products } = useContext(ReviewContext); // Access products from the ReviewContext
  const [buyClicked, setBuyClicked] = useState({}); // Track buy button states
  const [reviewPopup, setReviewPopup] = useState(false); // Track the currently open popup
  const [reviewData, setReviewData] = useState({}); // Track review inputs

  const handleBuyNow = (productId) => {
    setBuyClicked((prev) => ({ ...prev, [productId]: true }));
  };

  const handleOpenReview = (productId) => {
    setReviewPopup(true);
    setReviewData((prev) => ({
      ...prev,
      [productId]: reviewData[productId] || { rating: 0, text: "" },
    }));
  };

  const handleCloseReview = () => {
    setReviewPopup(false);
  };

  const handleReviewChange = (index, field, value) => {
    setReviewData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
      },
    }));
  };

  const handleSubmitReview = () => {
    console.log("Submitted review:", reviewData[reviewPopup]);
    // Reset review for the current product
    setReviewData((prev) => ({
      ...prev,
      [reviewPopup]: { rating: null, text: "" },
    }));
    handleCloseReview();
  };

  if (!products.length) {
    return <div>Loading...</div>; // Show a loading state if no products are available
  }

  return (
    <Grid2 container spacing={2} justifyContent="center">
      {/* Iterate over products and display a Card for each */}
      {products.map((product, index) => (
        <Grid2 item key={index} xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, borderRadius: "8px" }}>
            {/* Enlarged image */}
            <CardMedia
              component="img"
              height="250" // Adjusted for a larger image
              image={product.images[0]?.large || "/placeholder.png"} // Use the first image URL
              alt={product.title}
            />

            {/* Card Content */}
            <CardContent>
              {/* Display the product title */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2, 
                  height: "3em", 
                }}
              >
                {product.title || "No title available"}
              </Typography>

              {/* Display the rating */}
              <div style={{ marginTop: "8px", display: "flex", alignItems: "center" }}>
                <Rating
                  name="product-rating"
                  value={product.average_rating || 0} // Use the rating value
                  precision={0.5} // Allows for fractional ratings
                  readOnly // Makes the stars non-interactive
                />
              </div>
            </CardContent>

            {/* Card Actions */}
            <CardActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
              {buyClicked[index] ? (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FF9900", // Amazon-style yellow-orange
                      color: "white",
                      marginRight: "8px",
                      textTransform: "capitalize",
                    }}
                  >
                    Purchased
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenReview(index)}
                    sx={{ textTransform: "capitalize" }}
                  >
                    Review
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ borderRadius: "24px", textTransform: "capitalize" }}
                  onClick={() => handleBuyNow(index)}
                >
                  Buy Now
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid2>
      ))}

      {/* Review Modal */}
      <Modal
        open={reviewPopup}
        onClose={handleCloseReview}
        aria-labelledby="review-modal-title"
        aria-describedby="review-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="review-modal-title" variant="h6">
            Review Product
          </Typography>

          {/* Rating Input */}
          <Rating
            name="product-rating"
            value={reviewData[reviewPopup]?.rating || 0}
            precision={0.5}
            onChange={(e, newValue) =>
              handleReviewChange(reviewPopup, "rating", newValue)
            }
            sx={{ mt: 2 }}
          />

          {/* Text Input */}
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your review here..."
            value={reviewData[reviewPopup]?.text || ""}
            onChange={(e) =>
              handleReviewChange(reviewPopup, "text", e.target.value)
            }
            sx={{ mt: 2 }}
          />

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="secondary" onClick={handleCloseReview}>
              Close
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmitReview}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid2>
  );
};

export default ProductGrid;
