import React, { useEffect, useContext, useState } from "react";
import {Card,CardMedia,CardContent,CardActions,Button,Typography,Rating,Grid2,Modal,Box,Slider,TextField} from "@mui/material";
import { ReviewContext } from "./ReviewContext"; // Import ReviewContext
import axios from "axios";

const ProductGrid = () => {
  const { products, setProducts, setIsReviewSubmitted, buyClicked, setBuyClicked } = useContext(ReviewContext); // Access products from the ReviewContext
  const [reviewPopup, setReviewPopup] = useState(null); // Track the currently open popup
  const [reviewData, setReviewData] = useState({}); // Track review inputs

  useEffect(() => {
    localStorage.setItem("buyClicked", JSON.stringify(buyClicked));
  }, [buyClicked]);  

  useEffect(() => {
    // Fetch products and reviews
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data); // Set products
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleBuyNow = (productId) => {
    setBuyClicked((prev) => ({ ...prev, [productId]: true }));
  };

  const handleOpenReview = (productId) => {
    setReviewPopup(productId);
    setReviewData((prev) => ({
      ...prev,
      [productId]: reviewData[productId] || { rating: 0, text: "" },
    }));
  };

  const handleCloseReview = () => {
    setReviewPopup(null);
  };

  const handleReviewChange = (productId, field, value) => {
    setReviewData((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleSubmitReview = async () => {
    const review = reviewData[reviewPopup]; // Get the current review data
    const prod = products.find((product) => product.parent_asin === reviewPopup);
    if (!review || !reviewPopup) {
      console.error("Invalid review data");
      return;
    }
  
    try {
      // Check if the review already exists in the database
      const response = await fetch(`http://localhost:5003/api/reviews/${reviewPopup}`);
  
      if (response.ok) {
        const existingReview = await response.json();
  
        if (existingReview) {
          // If review exists, update it
          const updateResponse = await fetch(`http://localhost:5003/api/reviews/${reviewPopup}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              rating: review.rating,
              title: prod.title,
              text: review.text,
              images: prod.images,
              parent_asin: reviewPopup,
            }),
          });
  
          if (!updateResponse.ok) {
            throw new Error("Failed to update the review.");
          }
  
          console.log("Review updated successfully:", review);
        }
      } else if (response.status === 404) {
        // If review does not exist, create a new one
        const createResponse = await fetch(`http://localhost:5003/api/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              rating: review.rating,
              title: prod.title,
              text: review.text,
              images: prod.images,
              parent_asin: reviewPopup,
          }),
        });
  
        if (!createResponse.ok) {
          throw new Error("Failed to create the review.");
        }
  
        console.log("Review created successfully:", review);
      } else {
        throw new Error("Failed to fetch review data.");
      }
  
      // Reset review for the current product
      setReviewData((prev) => ({
        ...prev,
        [reviewPopup]: { rating: null, text: "" },
      }));
      setIsReviewSubmitted(true);
  
      handleCloseReview();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
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
              {buyClicked[product.parent_asin] ? (
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
                    onClick={() => handleOpenReview(product.parent_asin)}
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
                  onClick={() => handleBuyNow(product.parent_asin)}
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
