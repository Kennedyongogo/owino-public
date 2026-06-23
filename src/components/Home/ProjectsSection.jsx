import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Chip,
  CircularProgress,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Construction,
  LocationOn,
  ChevronLeft,
  ChevronRight,
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

const getStatusLabel = (status) => {
  const labels = {
    in_progress: "In Progress",
    completed: "Completed",
    planning: "Planning",
    on_hold: "On Hold",
  };
  return labels[status] || status;
};

const getStatusSx = (status) => {
  if (status === "completed") {
    return { bgcolor: "rgba(26, 95, 180, 0.12)", color: BRAND_BLUE_DARK, borderColor: BRAND_BLUE };
  }
  if (status === "on_hold") {
    return { bgcolor: "rgba(245, 197, 24, 0.15)", color: BRAND_BLUE_DARK, borderColor: BRAND_GOLD };
  }
  return { bgcolor: "rgba(26, 95, 180, 0.08)", color: BRAND_BLUE, borderColor: "rgba(26, 95, 180, 0.35)" };
};

const ProjectCard = ({ project, compact, onViewDetails }) => {
  const statusSx = getStatusSx(project.status);
  const imageSrc = buildImageUrl(project.image);

  return (
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
        {imageSrc ? (
          <Box
            component="img"
            src={imageSrc}
            alt={project.title}
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
            <Construction sx={{ fontSize: compact ? 44 : 56, color: BRAND_BLUE, opacity: 0.45 }} />
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
        <Chip
          label={getStatusLabel(project.status)}
          size="small"
          sx={{
            alignSelf: "flex-start",
            mb: 1,
            fontWeight: 700,
            fontSize: "0.7rem",
            height: 24,
            border: "1px solid",
            ...statusSx,
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: compact ? "0.95rem" : { xs: "1rem", md: "1.1rem" },
            color: BRAND_BLUE_DARK,
            mb: 0.75,
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </Typography>

        <Typography
          sx={{
            fontSize: compact ? "0.78rem" : { xs: "0.82rem", md: "0.9rem" },
            color: "text.secondary",
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: compact ? 2 : 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 1.25,
          }}
        >
          {project.description || "SafeWire electrical project."}
        </Typography>

        {project.location && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
            <LocationOn sx={{ fontSize: 16, color: BRAND_BLUE }} />
            <Typography sx={{ fontSize: "0.78rem", color: "text.secondary" }}>
              {project.location}
            </Typography>
          </Box>
        )}

        <Box sx={{ mb: 1.5 }}>
          <Typography sx={{ fontSize: "0.72rem", color: BRAND_BLUE, fontWeight: 600, mb: 0.5 }}>
            Progress: {project.progress}%
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: 4,
              bgcolor: "rgba(26, 95, 180, 0.12)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${project.progress}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_GOLD})`,
                transition: "width 0.3s ease",
              }}
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          size="small"
          onClick={() => onViewDetails(project.id)}
          sx={{
            mt: "auto",
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.85rem",
            color: "#fff",
            background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, ${BRAND_BLUE_DARK} 100%)`,
            boxShadow: `0 4px 14px rgba(26, 95, 180, 0.3)`,
            border: `1px solid rgba(245, 197, 24, 0.3)`,
            "&:hover": {
              background: `linear-gradient(135deg, ${BRAND_BLUE_DARK} 0%, ${BRAND_BLUE} 100%)`,
              boxShadow: `0 6px 20px rgba(26, 95, 180, 0.4)`,
            },
          }}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default function ProjectsSection() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const cardsPerView = isMdUp ? 3 : 1;

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/public-projects");
        if (!response.ok) throw new Error("Failed to fetch projects");

        const data = await response.json();
        if (data.success && data.data) {
          setProjects(
            data.data.map((project) => ({
              id: project.id,
              title: project.name,
              description: project.description,
              image: project.image || project.cover_image || "",
              location: project.location_name,
              status: project.status,
              progress: project.progress_percent || 0,
            }))
          );
        } else {
          setProjects([]);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const maxIndex = useMemo(
    () => Math.max(0, projects.length - cardsPerView),
    [projects.length, cardsPerView]
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
      id="projects-section"
      sx={{
        pt: { xs: 1, sm: 1.25, md: 1.5, lg: 2 },
        pb: { xs: 3.5, sm: 4, md: 5, lg: 6 },
        px: { xs: 1, sm: 1.25, md: 1.5, lg: 2 },
        background: "linear-gradient(160deg, #f4f8ff 0%, #fffef5 50%, #f0f6ff 100%)",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <Box sx={{ textAlign: "center", mb: { xs: 2, sm: 2.5, md: 3 } }}>
          <Typography
            variant="overline"
            sx={{
              color: BRAND_GOLD,
              fontWeight: 800,
              letterSpacing: "0.14em",
              fontSize: "0.75rem",
            }}
          >
            OUR WORK
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
            Our Projects
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
            Explore our ongoing and completed electrical projects across Kenya.
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
        ) : error ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography color="error" fontWeight={600}>
              {error}
            </Typography>
          </Box>
        ) : projects.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Construction sx={{ fontSize: 48, color: BRAND_BLUE, opacity: 0.35, mb: 1 }} />
            <Typography color="text.secondary" fontWeight={600}>
              Projects coming soon.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ position: "relative", px: { xs: 5, sm: 5.5, md: 6 } }}>
            <IconButton
              onClick={handlePrev}
              disabled={carouselIndex === 0}
              aria-label="Previous projects"
              sx={{ ...arrowSx, left: 0 }}
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
                {projects.map((project) => (
                  <Box
                    key={project.id}
                    sx={{
                      flex: `0 0 ${100 / cardsPerView}%`,
                      px: { xs: 0.75, sm: 1, md: 1.5 },
                      boxSizing: "border-box",
                    }}
                  >
                    <ProjectCard
                      project={project}
                      compact={isMdUp}
                      onViewDetails={(id) => navigate(`/project/${id}`)}
                    />
                  </Box>
                ))}
              </Box>
            </Box>

            <IconButton
              onClick={handleNext}
              disabled={carouselIndex >= maxIndex}
              aria-label="Next projects"
              sx={{ ...arrowSx, right: 0 }}
            >
              <ChevronRight />
            </IconButton>

            {projects.length > cardsPerView && (
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
