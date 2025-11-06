import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Box, Typography, Link, Button } from "@mui/material";
// Logo now served from public folder
import { Construction, ContactSupport, Home } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.1)"
            : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
          color: scrolled ? "primary.main" : "white",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Box
              sx={{
                mr: { xs: 0, sm: 5 },
                flexGrow: 1,
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  color: scrolled ? "primary.main" : "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", sm: "flex-start" },
                  }}
                >
                  <img
                    src="/betheltus-logo.png"
                    alt="Betheltus Construction Logo"
                    style={{
                      height: "64px",
                      width: "auto",
                      marginTop: "2.5px",
                    }}
                  />
                  <Box sx={{ ml: 2 }}>
                    <Typography
                      color="inherit"
                      sx={{
                        fontWeight: "800",
                        fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      }}
                    ></Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        color: "inherit",
                      }}
                    >
                      Betheltus Construction LTD
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 4,
                alignItems: "center",
                mr: 4,
              }}
            >
              <Link
                component="button"
                onClick={() => {
                  if (location.pathname === "/") {
                    // If on home page, scroll to Hero section
                    const heroSection = document.getElementById("hero-section");
                    if (heroSection) {
                      heroSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  } else {
                    // If on other pages, navigate to home and then scroll
                    navigate("/");
                    setTimeout(() => {
                      const heroSection =
                        document.getElementById("hero-section");
                      if (heroSection) {
                        heroSection.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }, 100);
                  }
                }}
                sx={{
                  color: scrolled ? "primary.main" : "white",
                  textDecoration: "none",
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": { color: "primary.main" },
                  borderBottom: isActive("/") ? "2px solid" : "none",
                  borderColor: "primary.main",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Home sx={{ fontSize: "1.2rem" }} />
                Home
              </Link>
              <Link
                component="button"
                onClick={() => {
                  if (location.pathname === "/") {
                    // If on home page, scroll to Projects section
                    const projectsSection =
                      document.getElementById("projects-section");
                    if (projectsSection) {
                      projectsSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  } else {
                    // If on other pages, navigate to home and then scroll
                    navigate("/");
                    setTimeout(() => {
                      const projectsSection =
                        document.getElementById("projects-section");
                      if (projectsSection) {
                        projectsSection.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }, 100);
                  }
                }}
                sx={{
                  color: scrolled ? "primary.main" : "white",
                  textDecoration: "none",
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": { color: "primary.main" },
                  borderBottom: isActive("/projects") ? "2px solid" : "none",
                  borderColor: "primary.main",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Construction sx={{ fontSize: "1.2rem" }} />
                Projects
              </Link>
              <Link
                component="button"
                onClick={() => {
                  if (location.pathname === "/") {
                    // If on home page, scroll to Contact section
                    const contactSection =
                      document.getElementById("contact-section");
                    if (contactSection) {
                      contactSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  } else {
                    // If on other pages, navigate to home and then scroll
                    navigate("/");
                    setTimeout(() => {
                      const contactSection =
                        document.getElementById("contact-section");
                      if (contactSection) {
                        contactSection.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }, 100);
                  }
                }}
                sx={{
                  color: scrolled ? "primary.main" : "white",
                  textDecoration: "none",
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": { color: "primary.main" },
                  borderBottom: isActive("/contact") ? "2px solid" : "none",
                  borderColor: "primary.main",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <ContactSupport sx={{ fontSize: "1.2rem" }} />
                Contact
              </Link>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
