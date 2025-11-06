import React, { useState, useEffect } from "react";
import { Typography, Box, Container, Tooltip, Button } from "@mui/material";
import { DesignServices, Person, Timeline } from "@mui/icons-material";

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/images/owino bg 1.jpg",
    "/images/owino bg 2.jpg",
    "/images/owino bg 3.jpg"
  ];

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
          color: "#FFF8DC",
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
              fontSize: { xs: "1.2rem", sm: "1.8rem", md: "2.5rem" },
              fontWeight: 600,
              mb: 2,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              color: "#FFF8DC",
            }}
          >
            Welcome to Owino Interiors
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
              mb: 4,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              opacity: 0.9,
              color: "#FFF8DC",
            }}
          >
            Curating Beauty in Every Space
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
          gap: { xs: 1.5, sm: 3, md: 4 },
          p: { xs: 2, sm: 2.5, md: 3 },
          backgroundColor: "rgba(0,0,0,0.5)",
          animation: "slideUp 1s ease-out",
        }}
      >
        <Tooltip title="Elegant Designs">
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
            <DesignServices sx={{ fontSize: { xs: 18, sm: 24 } }} />
            <Typography sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem", md: "1rem" } }}>
              Elegant Designs
            </Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Expert Consultation">
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
            <Person sx={{ fontSize: { xs: 18, sm: 24 } }} />
            <Typography sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem", md: "1rem" } }}>
              Expert Consultation
            </Typography>
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
            <Timeline sx={{ fontSize: { xs: 18, sm: 24 } }} />
            <Typography sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem", md: "1rem" } }}>
              Timely Delivery
            </Typography>
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
