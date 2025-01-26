import React, { createContext, useState } from "react";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [predictionValue, setPredictionValue] = useState({}); // Store prediction values for each product
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false); // Track review submission status
  const [buyClicked, setBuyClicked] = useState(() => {
    const savedState = localStorage.getItem("buyClicked");
    return savedState ? JSON.parse(savedState) : {}; // Load saved state or use default
  });

  return (
    <ReviewContext.Provider
      value={{ products, setProducts, reviews, setReviews, predictionValue, setPredictionValue, isReviewSubmitted, setIsReviewSubmitted, buyClicked, setBuyClicked }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
