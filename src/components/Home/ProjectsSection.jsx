import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Construction,
  LocationOn,
  Schedule,
  AttachMoney,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

const MotionBox = motion(Box);

const getStatusColor = (status) => {
  const colors = {
    in_progress: "primary",
    completed: "success",
    planning: "warning",
    on_hold: "error",
  };
  return colors[status] || "default";
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

const formatCurrency = (amount, currency = "KES") => {
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) return `${currency} 0`;

  if (numAmount >= 1000000) {
    return `${currency} ${(numAmount / 1000000).toFixed(1)}M`;
  } else if (numAmount >= 1000) {
    return `${currency} ${(numAmount / 1000).toFixed(1)}K`;
  }
  return `${currency} ${numAmount.toLocaleString()}`;
};

export default function ProjectsSection() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Determine how many cards to show based on screen size
  const cardsToShow = isMobile ? 1 : isTablet ? 2 : 3;
  const maxIndex = Math.max(0, projects.length - cardsToShow);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/public-projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();

      if (data.success && data.data) {
        // Map API data to component format
        const mappedProjects = data.data.map((project) => ({
          id: project.id,
          title: project.name,
          description: project.description,
          image: "/betheltus-logo.png",
          location: project.location_name,
          status: project.status,
          startDate: project.start_date,
          estimatedCompletion: project.end_date,
          budget: formatCurrency(project.budget_estimate, project.currency),
          progress: project.progress_percent || 0,
          clientName: project.client_name,
          contractorName: project.contractor_name,
          engineerName: project.engineer?.name,
          constructionType: project.construction_type,
          floorSize: project.floor_size,
        }));
        setProjects(mappedProjects);
      } else {
        setProjects([]);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching projects:", err);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const getVisibleProjects = () => {
    return projects.slice(currentIndex, currentIndex + cardsToShow);
  };

  const handleViewDetails = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <Box
      id="projects-section"
      sx={{
        py: 4,
        backgroundColor: "#f8f9fa",
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Paper
            elevation={6}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              backgroundColor: "white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <Box sx={{ p: 6 }}>
              <Box
                sx={{
                  textAlign: "center",
                  mb: 6,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Construction
                    sx={{ fontSize: "2.5rem", color: "primary.main" }}
                  />
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                    }}
                  >
                    Our Projects
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ maxWidth: 600, mx: "auto" }}
                >
                  Explore our ongoing and completed construction projects across
                  Kenya
                </Typography>
              </Box>

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              ) : projects.length === 0 ? (
                <Alert severity="info" sx={{ mb: 3 }}>
                  No projects available at the moment.
                </Alert>
              ) : (
                <Box>
                  {/* Navigation Controls */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <IconButton
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                        "&:disabled": {
                          backgroundColor: "grey.300",
                          color: "grey.500",
                        },
                      }}
                    >
                      <ChevronLeft />
                    </IconButton>

                    <Typography variant="body1" color="text.secondary">
                      Showing {currentIndex + 1}-
                      {Math.min(currentIndex + cardsToShow, projects.length)} of{" "}
                      {projects.length} projects
                    </Typography>

                    <IconButton
                      onClick={handleNext}
                      disabled={currentIndex >= maxIndex}
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                        "&:disabled": {
                          backgroundColor: "grey.300",
                          color: "grey.500",
                        },
                      }}
                    >
                      <ChevronRight />
                    </IconButton>
                  </Box>

                  {/* Projects Gallery */}
                  <Grid container spacing={3} justifyContent="center">
                    {getVisibleProjects().map((project, index) => (
                      <Grid
                        size={{
                          xs: 12,
                          sm: 6,
                          md: 4,
                        }}
                        key={project.id}
                      >
                        <MotionBox
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Card
                            sx={{
                              height: "520px",
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              transition:
                                "transform 0.3s ease, box-shadow 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-8px)",
                                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                              },
                            }}
                          >
                            <CardMedia
                              component="img"
                              height="180"
                              image={project.image}
                              alt={project.title}
                              sx={{
                                objectFit: "cover",
                                flexShrink: 0,
                              }}
                            />
                            <CardContent
                              sx={{
                                flexGrow: 1,
                                p: 3,
                                display: "flex",
                                flexDirection: "column",
                                minHeight: "340px",
                              }}
                            >
                              <Box sx={{ mb: 2 }}>
                                <Chip
                                  label={getStatusLabel(project.status)}
                                  color={getStatusColor(project.status)}
                                  size="small"
                                  sx={{ mb: 2 }}
                                />
                                <Typography
                                  variant="h6"
                                  component="h3"
                                  sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    color: "text.primary",
                                  }}
                                >
                                  {project.title}
                                </Typography>
                              </Box>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  mb: 2,
                                  overflow: "hidden",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  lineHeight: 1.4,
                                  flexGrow: 1,
                                }}
                              >
                                {project.description}
                              </Typography>

                              <Box sx={{ mb: 1 }}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 0.5,
                                  }}
                                >
                                  <LocationOn
                                    sx={{ fontSize: 14, color: "primary.main" }}
                                  />
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontSize: "0.8rem" }}
                                  >
                                    {project.location}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 0.5,
                                  }}
                                >
                                  <Schedule
                                    sx={{ fontSize: 14, color: "primary.main" }}
                                  />
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontSize: "0.8rem" }}
                                  >
                                    Started: {formatDate(project.startDate)}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 0.5,
                                  }}
                                >
                                  <AttachMoney
                                    sx={{ fontSize: 14, color: "primary.main" }}
                                  />
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontSize: "0.8rem" }}
                                  >
                                    Budget: {project.budget}
                                  </Typography>
                                </Box>
                              </Box>

                              <Box sx={{ mb: 1 }}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mb: 0.5, fontSize: "0.8rem" }}
                                >
                                  Progress: {project.progress}%
                                </Typography>
                                <Box
                                  sx={{
                                    width: "100%",
                                    height: 4,
                                    backgroundColor: "grey.200",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: `${project.progress}%`,
                                      height: "100%",
                                      backgroundColor:
                                        project.status === "completed"
                                          ? "success.main"
                                          : "primary.main",
                                      transition: "width 0.3s ease",
                                    }}
                                  />
                                </Box>
                              </Box>

                              <Box sx={{ mt: "auto", pt: 1 }}>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  onClick={() => handleViewDetails(project.id)}
                                  sx={{
                                    borderColor: "primary.main",
                                    color: "primary.main",
                                    fontSize: "0.875rem",
                                    py: 1,
                                    "&:hover": {
                                      borderColor: "primary.dark",
                                      backgroundColor: "primary.light",
                                      color: "white",
                                    },
                                  }}
                                >
                                  View Details
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </MotionBox>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Page Indicators */}
                  {projects.length > cardsToShow && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                        mt: 4,
                      }}
                    >
                      {Array.from({
                        length: Math.ceil(projects.length / cardsToShow),
                      }).map((_, index) => (
                        <Box
                          key={index}
                          onClick={() => setCurrentIndex(index * cardsToShow)}
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor:
                              Math.floor(currentIndex / cardsToShow) === index
                                ? "primary.main"
                                : "grey.300",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                            "&:hover": {
                              backgroundColor: "primary.light",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Paper>
        </MotionBox>
      </Box>
    </Box>
  );
}
