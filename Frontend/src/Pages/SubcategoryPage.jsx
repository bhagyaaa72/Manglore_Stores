import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BreadCrumbs from "../Components/BreadCrumbsNav";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const SubCategory = () => {
  const { categoryId } = useParams(); //urlparameter
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/${categoryId}`) //dollor for dynamix c changing cat id 
      .then((res) => setSubcategories(res.data.data))
      .catch((err) => console.error("Subcategory fetch error:", err));
  }, [categoryId]); //runit only when category id changes or else same useefect or catid 123 

  return (
    <Box p={2} mb={10}>
      <BreadCrumbs />
      <Typography variant="h6" mb={3} fontWeight="bold">
        Subcategories
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {subcategories.map((subcategory) => (
          <Grid
            item
            key={subcategory._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            display="flex"
            justifyContent="center"
          >
            <Card
              onClick={() => navigate(`/product/${subcategory._id}`)}
              sx={{
                cursor: "pointer",
                width: 250,
                "&:hover": {
                  boxShadow: "0px 4px 20px #02002ee0",
                },
              }}
            >
              {/* <CardMedia
                component="img"
                image={`http://localhost:5000/${subcategory.image.replace(/\\/g, "/")}`}
                alt={subcategory.name}
                sx={{
                  objectFit: "fill",
                  width: 250,
                  height: 250,
                  mx: "auto",
                }}
              /> */}
              <CardMedia
                component="img"
                image={`http://localhost:5000/${subcategory.image.replace(/^Backend[\\/]/, "").replace(/\\/g, "/")}`}
                alt={subcategory.name}
                sx={{
                  objectFit: "fill",
                  width: 250,
                  height: 250,
                  mx: "auto",
                }}
              />

              <CardContent>
                <Typography fontSize={14} align="center" fontWeight="bold">
                  {subcategory.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SubCategory;
