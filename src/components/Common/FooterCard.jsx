import React from "react";
import { Box, Typography, Link, Grid, IconButton, Stack } from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
  Bolt,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const BRAND_BLUE = "#1a5fb4";
const BRAND_BLUE_DARK = "#134a8c";
const BRAND_GOLD = "#f5c518";

const sectionTitleSx = {
  mb: 1.5,
  fontWeight: 800,
  fontSize: "0.8rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: BRAND_GOLD,
  display: "flex",
  alignItems: "center",
  gap: 1,
  width: "fit-content",
  "&::before": {
    content: '""',
    width: 20,
    height: 3,
    borderRadius: 2,
    bgcolor: BRAND_GOLD,
    flexShrink: 0,
  },
};

const linkSx = {
  cursor: "pointer",
  color: "rgba(255,255,255,0.9)",
  textDecoration: "none",
  fontSize: "0.9rem",
  fontWeight: 500,
  background: "none",
  border: "none",
  fontFamily: "inherit",
  textAlign: "left",
  p: 0,
  py: 0.4,
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  transition: "color 0.2s ease, transform 0.2s ease",
  "&:hover": {
    color: BRAND_GOLD,
    transform: "translateX(4px)",
  },
};

const ContactLine = ({ icon: Icon, children }) => (
  <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mb: 0.75 }}>
    <Icon sx={{ fontSize: 18, color: BRAND_GOLD, mt: 0.2, flexShrink: 0 }} />
    <Typography variant="body2" sx={{ lineHeight: 1.55, opacity: 0.92, fontSize: "0.88rem" }}>
      {children}
    </Typography>
  </Stack>
);

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

  const socialIcons = [
    { Icon: Facebook, label: "Facebook" },
    { Icon: Twitter, label: "Twitter" },
    { Icon: Instagram, label: "Instagram" },
    { Icon: LinkedIn, label: "LinkedIn" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        maxWidth: "100vw",
        alignSelf: "stretch",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(160deg, ${BRAND_BLUE_DARK} 0%, ${BRAND_BLUE} 45%, ${BRAND_BLUE_DARK} 100%)`,
        borderTop: `3px solid ${BRAND_GOLD}`,
        color: "#fff",
        pt: { xs: 3, md: 3.5 },
        pb: { xs: "calc(env(safe-area-inset-bottom, 0px) + 72px)", md: 2 },
        mt: "auto",
        boxSizing: "border-box",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,197,24,0.08) 0%, transparent 55%)",
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          px: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
        }}
      >
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box
              onClick={() => navigate("/")}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.25,
                mb: 1.5,
                cursor: "pointer",
                p: 1.25,
                borderRadius: 2,
                border: "1px solid rgba(245,197,24,0.2)",
                bgcolor: "rgba(255,255,255,0.06)",
                transition: "border-color 0.2s, background 0.2s",
                "&:hover": {
                  borderColor: "rgba(245,197,24,0.45)",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="SafeWire Electricals"
                sx={{ height: { xs: 40, sm: 48 }, width: "auto" }}
              />
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: "1rem", sm: "1.15rem" }, lineHeight: 1.2 }}>
                  SafeWire Electricals
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Bolt sx={{ fontSize: 14, color: BRAND_GOLD }} />
                  <Typography sx={{ fontSize: "0.72rem", color: BRAND_GOLD, fontWeight: 600 }}>
                    Professional Electrical Services
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Typography
              variant="body2"
              sx={{ opacity: 0.88, lineHeight: 1.65, mb: 2, maxWidth: 360, fontSize: "0.88rem" }}
            >
              Safe, reliable power solutions for homes and businesses across Kenya.
            </Typography>
            <Stack direction="row" spacing={0.75}>
              {socialIcons.map(({ Icon, label }) => (
                <IconButton
                  key={label}
                  aria-label={label}
                  size="small"
                  sx={{
                    width: 36,
                    height: 36,
                    color: "#fff",
                    bgcolor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(245,197,24,0.3)",
                    borderRadius: 1.5,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: BRAND_GOLD,
                      color: BRAND_BLUE_DARK,
                      borderColor: BRAND_GOLD,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 4 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", sm: "center" },
            }}
          >
            <Typography sx={sectionTitleSx}>Quick Links</Typography>
            <Stack spacing={0.25} sx={{ alignItems: { xs: "flex-start", sm: "center" } }}>
              {[
                { id: "hero-section", label: "Home" },
                { id: "services-section", label: "Services" },
                { id: "projects-section", label: "Projects" },
                { id: "contact-section", label: "Contact" },
              ].map(({ id, label }) => (
                <Link key={id} component="button" onClick={() => handleNavigation(id)} sx={linkSx}>
                  <Box component="span" sx={{ color: BRAND_GOLD, fontSize: "0.65rem" }}>
                    ›
                  </Box>
                  {label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 4 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", sm: "flex-end" },
            }}
          >
            <Typography sx={sectionTitleSx}>Contact</Typography>
            <Stack spacing={0} sx={{ width: "fit-content" }}>
              <ContactLine icon={LocationOn}>Nairobi, Kenya</ContactLine>
              <ContactLine icon={Phone}>+254 700 000 000</ContactLine>
              <ContactLine icon={Email}>info@safewireelectrical.com</ContactLine>
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: { xs: 2, md: 2.5 },
            pt: 1.5,
            pb: 0,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: -1,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 2,
              bgcolor: BRAND_GOLD,
              borderRadius: 2,
            },
          }}
        >
          <Typography
            align="center"
            sx={{ fontSize: "0.8rem", opacity: 0.85, letterSpacing: "0.02em" }}
          >
            © {new Date().getFullYear()} SafeWire Electricals. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
