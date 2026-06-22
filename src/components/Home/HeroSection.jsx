import React, { useState, useEffect } from "react";
import { Typography, Box, Tooltip } from "@mui/material";
import { ElectricalServices, Engineering, SolarPower } from "@mui/icons-material";

const BRAND_BLUE = "#1a5fb4";
const BRAND_GOLD = "#f5c518";

const IMAGES = [
  "/652234-electricity-1998106_1920.jpg",
  "/akela999-electrical-2476782_1920.jpg",
  "/jarmoluk-electric-1080584_1920.jpg",
  "/martinelle-automation-5393191_1920.jpg",
  "/superadsmaker-panel-6816102_1920.jpg",
];

const FEATURES = [
  {
    icon: ElectricalServices,
    title: "Power Expert",
    tooltip: "Grid power, distribution & commercial systems",
  },
  {
    icon: Engineering,
    title: "Wiring Expert",
    tooltip: "Residential wiring, panels & automation",
  },
  {
    icon: SolarPower,
    title: "Solar Renewable",
    tooltip: "Solar design, installation & maintenance",
  },
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);

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
      {IMAGES.map((image, index) => (
        <Box
          key={image}
          component="img"
          src={image}
          alt={`SafeWire Electrical ${index + 1}`}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: currentImageIndex === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 35%, transparent 65%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          zIndex: 1,
          px: { xs: 2, sm: 4, md: 6 },
          maxWidth: "1400px",
          margin: "0 auto",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <Box sx={{ animation: "slideIn 1s ease-out" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: "clamp(1.35rem, 5vw, 2.75rem)",
              fontWeight: 700,
              mb: 2,
              whiteSpace: "nowrap",
              textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
              lineHeight: 1.2,
            }}
          >
            <Box component="span" sx={{ color: BRAND_BLUE }}>
              SafeWire
            </Box>{" "}
            <Box component="span" sx={{ color: BRAND_GOLD }}>
              Electrical
            </Box>
          </Typography>

          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              maxWidth: "100%",
              px: { xs: 1.25, sm: 2 },
              py: { xs: 0.5, sm: 0.75 },
              borderRadius: "20px",
              backgroundColor: BRAND_BLUE,
              border: `1.5px solid ${BRAND_GOLD}`,
              boxShadow: `0 4px 12px rgba(26, 95, 180, 0.35)`,
            }}
          >
            <Typography
              sx={{
                fontSize: "clamp(0.65rem, 2.8vw, 1rem)",
                fontWeight: 600,
                whiteSpace: "nowrap",
                letterSpacing: "0.02em",
                color: BRAND_GOLD,
                textShadow: "1px 1px 4px rgba(0,0,0,0.4)",
              }}
            >
              Certified power, wiring & solar experts
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: { xs: 0.5, sm: 2 },
          p: { xs: 1.5, sm: 2.5, md: 3 },
          backgroundColor: "rgba(0,0,0,0.5)",
          animation: "slideUp 1s ease-out",
        }}
      >
        {FEATURES.map(({ icon: Icon, title, tooltip }) => (
          <Tooltip key={title} title={tooltip}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 0.5, sm: 1 },
                color: "white",
                minWidth: 0,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Icon
                sx={{
                  fontSize: { xs: 20, sm: 24 },
                  color: BRAND_GOLD,
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "0.65rem", sm: "0.875rem", md: "1rem" },
                  fontWeight: 500,
                  textAlign: "center",
                  whiteSpace: { xs: "normal", sm: "nowrap" },
                  lineHeight: 1.2,
                }}
              >
                {title}
              </Typography>
            </Box>
          </Tooltip>
        ))}
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
