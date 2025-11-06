import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Box, Typography, Link, Button } from "@mui/material";
// Logo now served from public folder
import { Construction, ContactSupport, Home } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-section");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      
      // Update active section on scroll
      if (location.pathname === "/") {
        const sections = ["hero-section", "projects-section", "contact-section"];
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const isSectionActive = (sectionId) => {
    if (location.pathname !== "/") return false;
    return activeSection === sectionId;
  };

  const handleNavigation = (sectionId) => {
    setActiveSection(sectionId);
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "none", md: "flex" },
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
            }}
          >
            <Box
              sx={{
                mr: { xs: 0, sm: 5 },
                flexGrow: 1,
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
                    justifyContent: "flex-start",
                  }}
                >
                  <img
                    src="/owino-logo.jpg"
                    alt="Owino Interiors Logo"
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
                        fontSize: { xs: "1.5rem", sm: "2.25rem" },
                        color: "#000000",
                        fontWeight: 900,
                        fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive",
                      }}
                    >
                      Owino Interiors
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 2,
                alignItems: "center",
                mr: 4,
              }}
            >
              <Button
                onClick={() => handleNavigation("hero-section")}
                startIcon={<Home />}
                sx={{
                  backgroundColor: "rgba(255, 248, 220, 0.7)",
                  backdropFilter: "blur(10px)",
                  color: "rgba(0, 0, 0, 0.8)",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  borderRadius: "25px",
                  px: 3,
                  py: 1,
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 248, 220, 0.9)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                Home
              </Button>
              <Button
                onClick={() => handleNavigation("projects-section")}
                startIcon={<Construction />}
                sx={{
                  backgroundColor: "rgba(255, 248, 220, 0.7)",
                  backdropFilter: "blur(10px)",
                  color: "rgba(0, 0, 0, 0.8)",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  borderRadius: "25px",
                  px: 3,
                  py: 1,
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 248, 220, 0.9)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                Projects
              </Button>
              <Button
                onClick={() => handleNavigation("contact-section")}
                startIcon={<ContactSupport />}
                sx={{
                  backgroundColor: "rgba(255, 248, 220, 0.7)",
                  backdropFilter: "blur(10px)",
                  color: "rgba(0, 0, 0, 0.8)",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  borderRadius: "25px",
                  px: 3,
                  py: 1,
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 248, 220, 0.9)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                Contact
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ display: { xs: "none", md: "block" } }} />
      {/* Mobile Navigation Bar - Bottom */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#1B4D4D",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.3)",
          zIndex: 1100,
          justifyContent: "space-around",
          alignItems: "center",
          py: 1.5,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Link
          component="button"
          onClick={() => handleNavigation("hero-section")}
          sx={{
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            background: "none",
            border: "none",
            cursor: "pointer",
            px: 2,
            minWidth: "60px",
            outline: "none",
            "&:focus": {
              outline: "none",
              "& .MuiSvgIcon-root": {
                color: "#C9B99B",
              },
              "& .MuiTypography-root": {
                color: "#C9B99B",
              },
            },
            "&:focus-visible": {
              outline: "none",
              "& .MuiSvgIcon-root": {
                color: "#C9B99B",
              },
              "& .MuiTypography-root": {
                color: "#C9B99B",
              },
            },
          }}
        >
          <Home
            sx={{
              fontSize: "1.5rem",
              color: isSectionActive("hero-section")
                ? "#FFF8DC"
                : "rgba(255, 255, 255, 0.7)",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.75rem",
              color: isSectionActive("hero-section")
                ? "#FFF8DC"
                : "rgba(255, 255, 255, 0.7)",
              fontWeight: 500,
            }}
          >
            Home
          </Typography>
        </Link>
        <Link
          component="button"
          onClick={() => handleNavigation("projects-section")}
          sx={{
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            background: "none",
            border: "none",
            cursor: "pointer",
            px: 2,
            minWidth: "60px",
            outline: "none",
            "&:focus": {
              outline: "none",
              "& .MuiSvgIcon-root": {
                color: "#C9B99B",
              },
              "& .MuiTypography-root": {
                color: "#C9B99B",
              },
            },
            "&:focus-visible": {
              outline: "none",
              "& .MuiSvgIcon-root": {
                color: "#C9B99B",
              },
              "& .MuiTypography-root": {
                color: "#C9B99B",
              },
            },
          }}
        >
          <Construction
            sx={{
              fontSize: "1.5rem",
              color: isSectionActive("projects-section")
                ? "#FFF8DC"
                : "rgba(255, 255, 255, 0.7)",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.75rem",
              color: isSectionActive("projects-section")
                ? "#FFF8DC"
                : "rgba(255, 255, 255, 0.7)",
              fontWeight: 500,
            }}
          >
            Projects
          </Typography>
        </Link>
        <Link
          component="button"
          onClick={() => handleNavigation("contact-section")}
          sx={{
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            background: "none",
            border: "none",
            cursor: "pointer",
            px: 2,
            minWidth: "60px",
            outline: "none",
            "&:focus": {
              outline: "none",
              "& .MuiSvgIcon-root": {
                color: "#C9B99B",
              },
              "& .MuiTypography-root": {
                color: "#C9B99B",
              },
            },
            "&:focus-visible": {
              outline: "none",
              "& .MuiSvgIcon-root": {
                color: "#C9B99B",
              },
              "& .MuiTypography-root": {
                color: "#C9B99B",
              },
            },
          }}
        >
          <ContactSupport
            sx={{
              fontSize: "1.5rem",
              color: isSectionActive("contact-section")
                ? "#FFF8DC"
                : "rgba(255, 255, 255, 0.7)",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.75rem",
              color: isSectionActive("contact-section")
                ? "#FFF8DC"
                : "rgba(255, 255, 255, 0.7)",
              fontWeight: 500,
            }}
          >
            Contact
          </Typography>
        </Link>
      </Box>
      {/* Spacer for bottom mobile nav */}
      <Box sx={{ display: { xs: "block", md: "none" }, height: "70px" }} />
    </>
  );
}
