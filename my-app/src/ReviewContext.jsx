import React, { createContext, useState } from "react";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [predictionValue, setPredictionValue] = useState({}); // Store prediction values for each product

  return (
    <ReviewContext.Provider
      value={{ products, setProducts, reviews, setReviews, predictionValue, setPredictionValue }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
