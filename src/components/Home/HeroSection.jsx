import React, { useState, useEffect } from "react";
import { Typography, Box, Container, Tooltip, Button } from "@mui/material";
import Hero1 from "../../assets/images/beth1.jpg";
import Hero2 from "../../assets/images/beth2.jpg";
import Hero3 from "../../assets/images/beth3.jpg";
import { Construction, Engineering, Timeline } from "@mui/icons-material";

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [Hero1, Hero2, Hero3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      id="hero-section"
      sx={{
        position: "relative",
        height: { xs: "100vh", md: "100vh" },
        width: "100%",
        overflow: "hidden",
        marginTop: "-64px",
      }}
    >
      {/* Background Images */}
      {images.map((image, index) => (
        <Box
          key={index}
          component="img"
          src={image}
          alt={`${index + 1}`}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.7)",
            opacity: currentImageIndex === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}

      {/* Content Overlay */}
      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "white",
          zIndex: 1,
          px: { xs: 2, sm: 4, md: 6 },
          maxWidth: "1400px",
          margin: "0 auto",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <Box
          sx={{
            maxWidth: "600px",
            animation: "slideIn 1s ease-out",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.5rem", md: "2.5rem" },
              fontWeight: 600,
              mb: 2,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Welcome to Betheltus Construction LTD
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              opacity: 0.9,
            }}
          >
            Your Vision, Our Construction
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {/* <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SearchSharp />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              Explore Services
            </Button> */}
            {/* <Button
              variant="outlined"
              color="inherit"
              size="large"
              startIcon={<Map />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderColor: "white",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "scale(1.05)",
                },
              }}
            >
              View Map
            </Button> */}
          </Box>
        </Box>
      </Box>

      {/* Feature Icons */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 4,
          p: 3,
          backgroundColor: "rgba(0,0,0,0.5)",
          animation: "slideUp 1s ease-out",
        }}
      >
        <Tooltip title="Quality Construction">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "white",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <Construction sx={{ fontSize: 24 }} />
            <Typography>Quality Construction</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Expert Engineering">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "white",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <Engineering sx={{ fontSize: 24 }} />
            <Typography>Expert Engineering</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Timely Delivery">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "white",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <Timeline sx={{ fontSize: 24 }} />
            <Typography>Timely Delivery</Typography>
          </Box>
        </Tooltip>
      </Box>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideIn {
            from { 
              opacity: 0;
              transform: translateX(-50px);
            }
            to { 
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(50px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
}
