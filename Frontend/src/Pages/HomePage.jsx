import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import BreadCrumbs from "../Components/BreadCrumbsNav";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductBrowser = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Example slider images (replace with dynamic if needed)
  const sliderImages = [
    "http://localhost:5000/Images/Category/Others/14.png",
    "http://localhost:5000/Images/Category/Others/1745470764949_buns.png",
    "http://localhost:5000/Images/Category/Others/1745470778282_Bonda.jpg",
  ];

  // Fetch categories on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error("Category fetch error:", err));
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <Box p={2} mb={10}>
      <BreadCrumbs />

      {/* Image Slider */}
      <Box mb={4}>
        <Slider {...sliderSettings}>
          {sliderImages.map((img, index) => (
            <Box key={index}>
              <img
                src={img}
                alt={`slide-${index}`}
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      <Typography variant="h6" mb={3} fontWeight="bold">
        Categories
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {categories.map((category) => (
          <Grid
            item
            key={category._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            display="flex"
            justifyContent="center"
          >
            <Card
              onClick={() => navigate(`/subcategory/${category._id}`)}
              sx={{
                cursor: "pointer",
                width: 250,
                "&:hover": {
                  boxShadow: "0px 4px 20px #02002ee0",
                },
              }}
            >
              <CardMedia
                component="img"
                image={`http://localhost:5000/${category.image.replace(/^Backend[\\/]/, "").replace(/\\/g, "/")}`}
                alt={category.name}
                sx={{
                  objectFit: "fill",
                  width: 250,
                  height: 250,
                  mx: "auto",
                }}
              />

              <CardContent>
                <Typography fontSize={14} align="center" fontWeight="bold">
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductBrowser;
