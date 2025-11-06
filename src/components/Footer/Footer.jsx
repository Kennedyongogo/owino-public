import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (section) => {
    if (location.pathname === "/") {
      // If on home page, scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // If on other pages, navigate to home then scroll
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
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Betheltus Construction LTD
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your Vision, Our Construction. Building Kenya's future with
              quality infrastructure and innovative solutions.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link
              component="button"
              onClick={() => handleNavigation("hero-section")}
              color="inherit"
              display="block"
              sx={{ mb: 1, textAlign: "left", cursor: "pointer" }}
            >
              Home
            </Link>
            <Link
              component="button"
              onClick={() => handleNavigation("services-section")}
              color="inherit"
              display="block"
              sx={{ mb: 1, textAlign: "left", cursor: "pointer" }}
            >
              Services
            </Link>
            <Link
              component="button"
              onClick={() => handleNavigation("projects-section")}
              color="inherit"
              display="block"
              sx={{ mb: 1, textAlign: "left", cursor: "pointer" }}
            >
              Projects
            </Link>
            <Link
              component="button"
              onClick={() => handleNavigation("contact-section")}
              color="inherit"
              display="block"
              sx={{ mb: 1, textAlign: "left", cursor: "pointer" }}
            >
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Headquarters
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              P.O. Box 12345-00100
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Nairobi, Kenya
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: +254 700 123456
            </Typography>
            <Typography variant="body2">
              Email: info@betheltusconstruction.co.ke
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{ mt: 4, pt: 2, borderTop: "1px solid rgba(255,255,255,0.2)" }}
        >
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Betheltus Construction LTD. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
