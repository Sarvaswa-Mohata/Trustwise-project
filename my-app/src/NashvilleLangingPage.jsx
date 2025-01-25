import React from "react";
import { Container, Grid2, Typography, Card, CardContent, Button, TextField, Rating} from "@mui/material";
import { motion } from "framer-motion";
import ProductGrid from "./ProductCards";

export default function NashvilleLandingPage() {

  return (
    <div style={{ backgroundColor: "#f9f4f1", color: "#774c3d" }}>
      {/* Navbar section*/}
      <nav style={{ padding: "16px 32px", backgroundColor: "#f5e9e4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight="bold"  fontFamily={"Lato"}>Nashville</Typography>
        <Typography style={{ display: "flex", gap: "32px" }} fontFamily={"Lato"} fontWeight={400}>
          <Typography>Home</Typography>
          <Typography>About Us</Typography>
          <Typography>Our Customers</Typography>
          <Typography>Contact Us</Typography>
          <Typography>Products</Typography>
        </Typography>
      </nav>
      {/*Header section*/}
      <section id="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start", // Align content to the left
          padding: "32px",
          backgroundColor: "#D2C0AF", // Background color
          borderRadius: "8px",
          backgroundImage: "url('https://www.shutterstock.com/image-photo/beauty-black-skin-woman-face-600nw-1924402385.jpg')",
          backgroundSize: "50% 100%", // Image occupies 50% of width
          backgroundRepeat: "no-repeat", // Prevent the image from repeating
          backgroundPosition: "right center", // Shift image to the right side
          height: "600px",
          width: "100%", // Set the width of the section
          color: "#fff", // Text color for contrast against the background
          position: "relative", // To allow the overlaying of content on top of the image
        }}
      >
        <Grid2 container spacing={4} style={{ width: "100%" }}>
          {/* Text Section */}
          <Grid2 item xs={12} md={6} style={{ textAlign: "left", zIndex: 2 }}>
            <Typography
              fontFamily={"Playfair Display"}
              fontWeight="700"
              gutterBottom
              style={{
                color: "#774C3D", 
                fontSize: "3rem", // Increase size for better readability
                lineHeight: "1.2", // Add line height for better spacing
                marginBottom: "16px", // Spacing below the title
              }}
            >
              Nashville
            </Typography>
            <Typography
              fontFamily={"Lato"}
              fontWeight={400}
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                color: "#8a6b5d", // Text color for better contrast
                fontSize: "18px", // Slightly larger font size for better readability
                lineHeight: "1.8", // Increase line height for better readability
                letterSpacing: "0.5px", // Subtle spacing between letters
                textAlign: "left", // Ensure the text is aligned to the left
              }}
            >
              At Nashville, we believe in the power of nature to restore and rejuvenate your skin. Our premium skincare products are carefully crafted using the finest organic ingredients, designed to deliver intense hydration and promote a youthful glow. Whether you’re struggling with dry skin, aging concerns, or simply looking for a more radiant complexion, our formulas work to nourish, replenish, and protect your skin from the harsh environmental elements. 
              Every product in our line is crafted to not only enhance the health of your skin but also to provide a luxurious experience. From deeply moisturizing creams to age-defying serums, each product has been tested for effectiveness, ensuring that your skin feels as smooth, hydrated, and revitalized as possible. Embrace a skincare routine that’s rooted in nature, and let your skin radiate with the beauty it deserves.
            </Typography>
          </Grid2>


          {/* Optional empty Grid2 to adjust layout */}
          <Grid2 item xs={12} md={6} />
        </Grid2>
      </section>

      {/* Products Section */}
      <section id="products" style={{ padding: "32px 32px" }}>
        <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>Our Products</Typography>
        <ProductGrid/>
      </section>

      {/* Our Customers Section */}
      <section
        id="our-customers"
        style={{
          padding: "32px",
          backgroundColor: "#f5e9e4",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          style={{ color: "#774C3D", marginBottom: "32px" }}
        >
          Our Happy Customers
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          {/* Customer 1 */}
          <div style={{ textAlign: "center", width: "250px" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                margin: "0 auto",
                backgroundImage: "url('https://media.istockphoto.com/id/1143063908/photo/close-up-photo-beautiful-funky-her-she-lady-arm-hand-index-finger-indicate-direct-up-empty.jpg?s=612x612&w=0&k=20&c=orOhRo-wL38UkUeQOc4FlBHYeZ368uXmz23YSRXjwWI=')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "50%",
                border: "4px solid #D2A185",
              }}
            ></div>
            <blockquote
              style={{
                fontStyle: "italic",
                color: "#8a6b5d",
                marginTop: "16px",
              }}
            >
              "Nashville products transformed my skin. Highly recommend!"
            </blockquote>
            <Typography
              variant="body2"
              style={{
                marginTop: "8px",
                color: "#774C3D",
                fontWeight: "500",
              }}
            >
              ~ Erina Paul
            </Typography>
            <Rating
              name="customer1-rating"
              value={5}
              readOnly
              precision={0.5}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#D2A185",
                },
                "& .MuiRating-iconEmpty": {
                  color: "#E0CFC3",
                },
              }}
            />
          </div>

          {/* Customer 2 */}
          <div style={{ textAlign: "center", width: "250px" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                margin: "0 auto",
                backgroundImage: "url('https://media.istockphoto.com/id/1473203340/photo/face-beauty-and-satisfaction-with-a-model-black-woman-in-studio-on-a-gray-background-to.jpg?s=612x612&w=0&k=20&c=vlAmvWIRkthdr9bzHCXLHknRWawyIklPwyVDFsk3aaA=')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "50%",
                border: "4px solid #D2A185",
              }}
            ></div>
            <blockquote
              style={{
                fontStyle: "italic",
                color: "#8a6b5d",
                marginTop: "16px",
              }}
            >
              "The best skincare brand I've ever tried."
            </blockquote>
            <Typography
              variant="body2"
              style={{
                marginTop: "8px",
                color: "#774C3D",
                fontWeight: "500",
              }}
            >
              ~ Lina Haydon
            </Typography>
            <Rating
              name="customer2-rating"
              value={4.5}
              readOnly
              precision={0.5}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#D2A185",
                },
                "& .MuiRating-iconEmpty": {
                  color: "#E0CFC3",
                },
              }}
            />
          </div>

          {/* Customer 3 */}
          <div style={{ textAlign: "center", width: "250px" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                margin: "0 auto",
                backgroundImage: "url('https://media.istockphoto.com/id/1343145458/photo/cheerful-smiling-young-woman-massaging-face-cheek-bones-beauty-model-with-perfect-smooth-skin.jpg?s=612x612&w=0&k=20&c=s_qUQ4qGWhV9M8LntlfcPQBJof3w9g4_Pg6cxRETa7I=')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "50%",
                border: "4px solid #D2A185",
              }}
            ></div>
            <blockquote
              style={{
                fontStyle: "italic",
                color: "#8a6b5d",
                marginTop: "16px",
              }}
            >
              "Amazing results! My skin has never felt so good."
            </blockquote>
            <Typography
              variant="body2"
              style={{
                marginTop: "8px",
                color: "#774C3D",
                fontWeight: "500",
              }}
            >
              ~ Sofia Benzamin
            </Typography>
            <Rating
              name="customer3-rating"
              value={5}
              readOnly
              precision={0.5}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#D2A185",
                },
                "& .MuiRating-iconEmpty": {
                  color: "#E0CFC3",
                },
              }}
            />
          </div>
          <div style={{ textAlign: "center", width: "250px" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                margin: "0 auto",
                backgroundImage: "url('https://media.istockphoto.com/id/910856488/photo/beautiful-african-american-female-model.jpg?s=612x612&w=0&k=20&c=zPxhqB08kcPpMmYKmTkHtkxZ2naIk-BB_IJbhJNgDSk=')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "50%",
                border: "4px solid #D2A185",
              }}
            ></div>
            <blockquote
              style={{
                fontStyle: "italic",
                color: "#8a6b5d",
                marginTop: "16px",
              }}
            >
              "I loved their products. They feel very natural"
            </blockquote>
            <Typography
              variant="body2"
              style={{
                marginTop: "8px",
                color: "#774C3D",
                fontWeight: "500",
              }}
            >
              ~ Elizabeth Vancouver
            </Typography>
            <Rating
              name="customer3-rating"
              value={5}
              readOnly
              precision={0.5}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#D2A185",
                },
                "& .MuiRating-iconEmpty": {
                  color: "#E0CFC3",
                },
              }}
            />
          </div>
        </div>
      </section>


      {/* Contact Us Section */}
      <section
        id="contact-us"
        style={{
          padding: "48px 32px",
          backgroundColor: "#f5e9e4",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          margin: "32px auto",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          align="center"
          gutterBottom
          style={{
            color: "#774C3D",
            marginBottom: "24px",
          }}
        >
          Contact Us
        </Typography>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            slotProps={{
              input:{
                style: {
                  borderRadius: "8px",
                }
              }
            }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            slotProps={{
              input:{
                style: {
                  borderRadius: "8px",
                }
              }
            }}
          />
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            slotProps={{
              input:{
                style: {
                  borderRadius: "8px",
                }
              }
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: "100%",
              backgroundColor: "#D2A185",
              color: "#fff",
              padding: "16px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Send Message
          </motion.button>
        </form>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#774c3d", color: "#fff", textAlign: "center", padding: "16px" }}>
        &copy; {new Date().getFullYear()} Nashville. All rights reserved.
      </footer>
    </div>
  );
}
