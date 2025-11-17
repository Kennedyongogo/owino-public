import React from "react";
import { Card, Box, Typography, Link, Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function FooterCard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (section) => {
    if (location.pathname === "/") {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 1,
      }}
    >
      <Card
        elevation={6}
        sx={{
          width: { xs: "96%", sm: 720, md: 960, lg: 1200, xl: 1400 },
          minHeight: { xs: "auto", sm: 300 },
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1B4D4D",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(2px)",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.3)",
          color: "white",
          p: { xs: 1.5, sm: 2 },
        }}
      >
        {/* Footer Content - Stacked vertically on small screens */}
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="flex-start"
          direction={{ xs: "column", sm: "row" }}
        >
          {/* Owino Interiors Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ mb: 1, fontWeight: 700, fontSize: "1rem", fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive" }}>
              Owino Interiors
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.95, lineHeight: 1.4, fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive" }}>
              Curating Beauty in Every Space.
            </Typography>
            <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
              <IconButton
                color="inherit"
                aria-label="Facebook"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                <Facebook sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Twitter"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                <Twitter sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Instagram"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                <Instagram sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="LinkedIn"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                <LinkedIn sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              flex: 1,
              textAlign: { xs: "left", sm: "center" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", sm: "center" },
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mb: 1, fontWeight: 700, fontSize: "1rem", fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive" }}>
              Quick Links
            </Typography>
            <Link
              component="button"
              onClick={() => handleNavigation("hero-section")}
              color="inherit"
              display="block"
              sx={{
                mb: 0.5,
                textAlign: { xs: "left", sm: "center" },
                cursor: "pointer",
                color: "rgba(255,255,255,0.9)",
                textDecoration: "none",
                position: "relative",
                display: "inline-block",
                fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -1,
                  height: 2,
                  width: "100%",
                  background:
                    "linear-gradient(90deg, #ffffff 0%, #cfcfcf 50%, #ffffff 100%)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.25s ease",
                },
                "&:hover": {
                  color: "#fff",
                  "&::after": { transform: "scaleX(1)" },
                },
              }}
            >
              Home
            </Link>
            <Link
              component="button"
              onClick={() => handleNavigation("services-section")}
              color="inherit"
              display="block"
              sx={{
                mb: 0.5,
                textAlign: { xs: "left", sm: "center" },
                cursor: "pointer",
                color: "rgba(255,255,255,0.9)",
                textDecoration: "none",
                position: "relative",
                display: "inline-block",
                fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -1,
                  height: 2,
                  width: "100%",
                  background:
                    "linear-gradient(90deg, #ffffff 0%, #cfcfcf 50%, #ffffff 100%)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.25s ease",
                },
                "&:hover": {
                  color: "#fff",
                  "&::after": { transform: "scaleX(1)" },
                },
              }}
            >
              Services
            </Link>
            <Link
              component="button"
              onClick={() => handleNavigation("projects-section")}
              color="inherit"
              display="block"
              sx={{
                mb: 0.5,
                textAlign: { xs: "left", sm: "center" },
                cursor: "pointer",
                color: "rgba(255,255,255,0.9)",
                textDecoration: "none",
                position: "relative",
                display: "inline-block",
                fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -1,
                  height: 2,
                  width: "100%",
                  background:
                    "linear-gradient(90deg, #ffffff 0%, #cfcfcf 50%, #ffffff 100%)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.25s ease",
                },
                "&:hover": {
                  color: "#fff",
                  "&::after": { transform: "scaleX(1)" },
                },
              }}
            >
              Projects
            </Link>
            <Link
              component="button"
              onClick={() => handleNavigation("contact-section")}
              color="inherit"
              display="block"
              sx={{
                mb: 0.5,
                textAlign: { xs: "left", sm: "center" },
                cursor: "pointer",
                color: "rgba(255,255,255,0.9)",
                textDecoration: "none",
                position: "relative",
                display: "inline-block",
                fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -1,
                  height: 2,
                  width: "100%",
                  background:
                    "linear-gradient(90deg, #ffffff 0%, #cfcfcf 50%, #ffffff 100%)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.25s ease",
                },
                "&:hover": {
                  color: "#fff",
                  "&::after": { transform: "scaleX(1)" },
                },
              }}
            >
              Contact
            </Link>
          </Grid>

          {/* Contact Us Section */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              flex: 1,
              textAlign: { xs: "left", sm: "right" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", sm: "flex-end" },
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mb: 1, fontWeight: 700, fontSize: "1rem", fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive" }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, lineHeight: 1.4, fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive" }}>
              Headquarters
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, lineHeight: 1.4, fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive" }}>
              P.O. Box 12345-00100
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, lineHeight: 1.4, fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive" }}>
              Nairobi, Kenya
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, lineHeight: 1.4, fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive" }}>
              Phone: +254 700 123456
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.4, fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive" }}>
              Email: info@owinointeriors.com
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box
          sx={{
            mt: 1,
            pt: 1,
            borderTop: "1px solid rgba(255,255,255,0.2)",
            mb: 0.5,
          }}
        >
          <Typography variant="body2" align="center" sx={{ fontSize: "0.85rem", fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive" }}>
            © {new Date().getFullYear()} Owino Interiors. All rights reserved.
          </Typography>
        </Box>

        {/* Developed by Card - Positioned at bottom */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 0.5 }}>
          <Card
            elevation={8}
            sx={{
              width: { xs: "90%", sm: 320, md: 360 },
              minHeight: { xs: 48, sm: 56 },
              borderRadius: 1.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 1.5,
              px: 1,
              background: "linear-gradient(135deg, rgba(247, 220, 111, 0.25) 0%, rgba(244, 208, 63, 0.3) 50%, rgba(241, 196, 15, 0.25) 100%)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                borderRadius: "inherit",
                pointerEvents: "none",
              },
              "&:hover": {
                transform: "translateY(-4px) scale(1.02)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                background: "linear-gradient(135deg, rgba(247, 220, 111, 0.35) 0%, rgba(244, 208, 63, 0.4) 50%, rgba(241, 196, 15, 0.35) 100%)",
              },
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                color: "#000",
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                fontWeight: 700,
                mb: 0.5,
                textAlign: "center",
                whiteSpace: "nowrap",
                position: "relative",
                zIndex: 1,
                transition: "color 0.3s ease",
              }}
            >
              Developed by
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: "#000",
                fontSize: { xs: "0.85rem", sm: "1rem" },
                fontWeight: 700,
                textAlign: "center",
                lineHeight: 1.2,
                position: "relative",
                zIndex: 1,
                transition: "color 0.3s ease",
              }}
            >
              Carlvyne Technologies Ltd
            </Typography>
          </Card>
        </Box>
      </Card>
    </Box>
  );
}


