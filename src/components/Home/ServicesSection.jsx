import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  IconButton,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ElectricalServices,
} from "@mui/icons-material";

const BRAND_BLUE = "#1a5fb4";
const BRAND_GOLD = "#f5c518";
const BRAND_BLUE_DARK = "#134a8c";

const buildImageUrl = (imageUrl) => {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  if (imageUrl.startsWith("uploads/")) return `/${imageUrl}`;
  if (imageUrl.startsWith("/uploads/")) return imageUrl;
  return imageUrl;
};

const ServiceCard = ({ service, compact }) => (
  <Card
    elevation={0}
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 3,
      overflow: "hidden",
      border: `1px solid rgba(26, 95, 180, 0.12)`,
      background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
      boxShadow: "0 10px 36px rgba(26, 95, 180, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 16px 48px rgba(26, 95, 180, 0.18)",
      },
    }}
  >
    <Box sx={{ position: "relative", height: compact ? 160 : 200, overflow: "hidden" }}>
      {service.image ? (
        <Box
          component="img"
          src={buildImageUrl(service.image)}
          alt={service.name}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, rgba(26,95,180,0.12), rgba(245,197,24,0.15))`,
          }}
        >
          <ElectricalServices sx={{ fontSize: compact ? 44 : 56, color: BRAND_BLUE, opacity: 0.45 }} />
        </Box>
      )}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_GOLD})`,
        }}
      />
    </Box>
    <Box sx={{ p: compact ? 2 : 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          fontSize: compact ? "0.95rem" : { xs: "1rem", md: "1.1rem" },
          color: BRAND_BLUE_DARK,
          mb: 1,
          lineHeight: 1.3,
        }}
      >
        {service.name}
      </Typography>
      <Typography
        sx={{
          fontSize: compact ? "0.78rem" : { xs: "0.82rem", md: "0.9rem" },
          color: "text.secondary",
          lineHeight: 1.65,
          display: "-webkit-box",
          WebkitLineClamp: compact ? 3 : 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {service.description || "Professional electrical service by SafeWire."}
      </Typography>
    </Box>
  </Card>
);

export default function ServicesSection() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const cardsPerView = isMdUp ? 3 : 1;

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/public-services?limit=50");
        const data = await response.json();
        if (data.success) {
          setServices(data.data || []);
        }
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const maxIndex = useMemo(
    () => Math.max(0, services.length - cardsPerView),
    [services.length, cardsPerView]
  );

  useEffect(() => {
    setCarouselIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex, cardsPerView]);

  const handlePrev = () => setCarouselIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setCarouselIndex((i) => Math.min(maxIndex, i + 1));

  const arrowSx = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    width: { xs: 40, sm: 44, md: 48 },
    height: { xs: 40, sm: 44, md: 48 },
    bgcolor: "#fff",
    color: BRAND_BLUE,
    border: `2px solid ${BRAND_GOLD}`,
    boxShadow: "0 6px 20px rgba(26,95,180,0.2)",
    "&:hover": {
      bgcolor: BRAND_BLUE,
      color: "#fff",
    },
    "&.Mui-disabled": {
      bgcolor: "rgba(255,255,255,0.6)",
      color: "rgba(26,95,180,0.35)",
      borderColor: "rgba(245,197,24,0.35)",
    },
  };

  return (
    <Box
      id="services-section"
      sx={{
        py: { xs: 5, md: 7 },
        px: { xs: 1.5, sm: 4, md: 6 },
        background: "linear-gradient(160deg, #f4f8ff 0%, #fffef5 50%, #f0f6ff 100%)",
      }}
    >
      <Box sx={{ maxWidth: 1400, margin: "0 auto" }}>
        <Box sx={{ textAlign: "center", mb: { xs: 3, md: 5 } }}>
          <Typography
            variant="overline"
            sx={{
              color: BRAND_GOLD,
              fontWeight: 800,
              letterSpacing: "0.14em",
              fontSize: "0.75rem",
            }}
          >
            WHAT WE DO
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.75rem", sm: "2.1rem", md: "2.5rem" },
              color: BRAND_BLUE_DARK,
              mt: 0.5,
              mb: 1,
            }}
          >
            Our Services
          </Typography>
          <Typography
            sx={{
              maxWidth: 520,
              mx: "auto",
              fontSize: { xs: "0.9rem", md: "1rem" },
              color: "text.secondary",
              lineHeight: 1.6,
              px: 1,
            }}
          >
            Safe, reliable electrical work for homes and businesses.
          </Typography>
          <Box
            sx={{
              width: 64,
              height: 4,
              mx: "auto",
              mt: 2,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_GOLD})`,
            }}
          />
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: BRAND_BLUE }} />
          </Box>
        ) : services.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <ElectricalServices sx={{ fontSize: 48, color: BRAND_BLUE, opacity: 0.35, mb: 1 }} />
            <Typography color="text.secondary" fontWeight={600}>
              Services coming soon.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ position: "relative", px: { xs: 5, sm: 5.5, md: 6 } }}>
            <IconButton
              onClick={handlePrev}
              disabled={carouselIndex === 0}
              aria-label="Previous services"
              sx={{ ...arrowSx, left: { xs: 0, md: 0 } }}
            >
              <ChevronLeft />
            </IconButton>

            <Box sx={{ overflow: "hidden", borderRadius: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: `translateX(-${carouselIndex * (100 / cardsPerView)}%)`,
                }}
              >
                {services.map((service) => (
                  <Box
                    key={service.id}
                    sx={{
                      flex: `0 0 ${100 / cardsPerView}%`,
                      px: { xs: 0.75, sm: 1, md: 1.5 },
                      boxSizing: "border-box",
                    }}
                  >
                    <ServiceCard service={service} compact={isMdUp} />
                  </Box>
                ))}
              </Box>
            </Box>

            <IconButton
              onClick={handleNext}
              disabled={carouselIndex >= maxIndex}
              aria-label="Next services"
              sx={{ ...arrowSx, right: 0 }}
            >
              <ChevronRight />
            </IconButton>

            {services.length > cardsPerView && (
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <Box
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    sx={{
                      width: i === carouselIndex ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: i === carouselIndex ? BRAND_BLUE : "rgba(26,95,180,0.2)",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
