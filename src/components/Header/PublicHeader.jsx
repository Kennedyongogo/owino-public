import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Box, Typography, Link } from "@mui/material";
import { Construction, ContactSupport, Home, DesignServices } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const BRAND_BLUE = "#1a5fb4";
const BRAND_GOLD = "#f5c518";
const BRAND_BLUE_DARK = "#134a8c";

const NAV_ITEMS = [
  { id: "hero-section", label: "Home" },
  { id: "services-section", label: "Our Services" },
  { id: "projects-section", label: "Projects" },
  { id: "contact-section", label: "Contact" },
];

const navItemSx = (active, scrolled) => ({
  position: "relative",
  color: scrolled
    ? active
      ? BRAND_BLUE
      : "rgba(26, 95, 180, 0.78)"
    : active
      ? "#ffffff"
      : "rgba(255, 255, 255, 0.88)",
  textTransform: "none",
  fontWeight: active ? 700 : 500,
  fontSize: "0.95rem",
  letterSpacing: "0.03em",
  px: 2.5,
  py: 1.25,
  minWidth: "auto",
  border: "none",
  borderRadius: 0,
  backgroundColor: "transparent",
  boxShadow: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  transition: "color 0.25s ease",
  "&:hover": {
    backgroundColor: "transparent",
    color: scrolled ? BRAND_BLUE_DARK : "#ffffff",
  },
  "&:focus": { outline: "none" },
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: scrolled ? BRAND_GOLD : BRAND_GOLD,
    outlineOffset: 4,
    borderRadius: "4px",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: "50%",
    bottom: 4,
    width: "calc(100% - 24px)",
    height: 2,
    borderRadius: 1,
    backgroundColor: BRAND_GOLD,
    transform: `translateX(-50%) scaleX(${active ? 1 : 0})`,
    transformOrigin: "center",
    transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: active ? 1 : 0.9,
  },
  "&:hover::after": {
    transform: "translateX(-50%) scaleX(1)",
  },
});

const mobileNavBtnSx = (active) => ({
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
  "&:focus": { outline: "none" },
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
    color: active ? BRAND_GOLD : "rgba(255, 255, 255, 0.72)",
  },
  "& .MuiTypography-root": {
    fontSize: "0.75rem",
    fontWeight: active ? 700 : 500,
    color: active ? BRAND_GOLD : "rgba(255, 255, 255, 0.72)",
  },
});

export default function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-section");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);

      if (location.pathname === "/") {
        const sections = ["hero-section", "services-section", "projects-section", "contact-section"];
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

  const isSectionActive = (sectionId) => {
    if (location.pathname !== "/") return false;
    return activeSection === sectionId;
  };

  const handleNavigation = (sectionId) => {
    setActiveSection(sectionId);
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
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
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 4px 24px rgba(26, 95, 180, 0.12)" : "none",
          borderBottom: scrolled ? `3px solid ${BRAND_GOLD}` : "none",
          color: scrolled ? BRAND_BLUE : "white",
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
            <Box sx={{ mr: { xs: 0, sm: 5 }, flexGrow: 1 }}>
              <Box
                sx={{
                  flexGrow: 1,
                  color: scrolled ? BRAND_BLUE : "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                  <img
                    src="/logo.png"
                    alt="SafeWire Electricals Logo"
                    style={{ height: "64px", width: "auto", marginTop: "2.5px" }}
                  />
                  <Box sx={{ ml: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "1.5rem", sm: "2.25rem" },
                        color: scrolled ? BRAND_BLUE : "#ffffff",
                        fontWeight: 900,
                        fontFamily: "'Monotype Corsiva', 'Brush Script MT', cursive",
                        textShadow: scrolled ? "none" : "0 2px 8px rgba(0,0,0,0.25)",
                      }}
                    >
                      SafeWire Electricals
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              component="nav"
              aria-label="Main navigation"
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
                mr: 4,
              }}
            >
              {NAV_ITEMS.map(({ id, label }) => (
                <Box
                  key={id}
                  component="button"
                  onClick={() => handleNavigation(id)}
                  aria-current={isSectionActive(id) ? "page" : undefined}
                  sx={navItemSx(isSectionActive(id), scrolled)}
                >
                  {label}
                </Box>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ display: { xs: "none", md: "block" } }} />

      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: `linear-gradient(180deg, ${BRAND_BLUE} 0%, ${BRAND_BLUE_DARK} 100%)`,
          boxShadow: "0 -4px 20px rgba(26, 95, 180, 0.35)",
          zIndex: 1100,
          justifyContent: "space-around",
          alignItems: "center",
          py: 1.5,
          borderTop: `3px solid ${BRAND_GOLD}`,
        }}
      >
        <Link component="button" onClick={() => handleNavigation("hero-section")} sx={mobileNavBtnSx(isSectionActive("hero-section"))}>
          <Home />
          <Typography variant="caption">Home</Typography>
        </Link>
        <Link component="button" onClick={() => handleNavigation("services-section")} sx={mobileNavBtnSx(isSectionActive("services-section"))}>
          <DesignServices />
          <Typography variant="caption">Services</Typography>
        </Link>
        <Link component="button" onClick={() => handleNavigation("projects-section")} sx={mobileNavBtnSx(isSectionActive("projects-section"))}>
          <Construction />
          <Typography variant="caption">Projects</Typography>
        </Link>
        <Link component="button" onClick={() => handleNavigation("contact-section")} sx={mobileNavBtnSx(isSectionActive("contact-section"))}>
          <ContactSupport />
          <Typography variant="caption">Contact</Typography>
        </Link>
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" }, height: "70px" }} />
    </>
  );
}
