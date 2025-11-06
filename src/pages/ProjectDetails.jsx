import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Construction,
  LocationOn,
  Schedule,
  AttachMoney,
  Person,
  Business,
  Engineering,
  Description,
  Home,
  CalendarToday,
  TrendingUp,
  ArrowBack,
  Image as ImageIcon,
  PhotoCamera,
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

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/public-projects/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch project details");
      }
      const data = await response.json();

      if (data.success && data.data) {
        setProject(data.data);
      } else {
        setError("Project not found");
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching project details:", err);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || "Project not found"}
        </Alert>
        <Button variant="outlined" onClick={handleBack}>
          <ArrowBack sx={{ mr: 1 }} />
          Back to Projects
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handleBack}
              sx={{ mb: 3 }}
            >
              Back to Projects
            </Button>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 3,
                  mb: 3,
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "primary.main",
                    fontSize: "2rem",
                  }}
                >
                  <Construction />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{ fontWeight: 600 }}
                    >
                      {project.name}
                    </Typography>
                    <Chip
                      label={getStatusLabel(project.status)}
                      color={getStatusColor(project.status)}
                      size="large"
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {project.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOn color="primary" />
                    <Typography variant="body1">
                      {project.location_name}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Project Overview */}
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Project Overview
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <CalendarToday color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Start Date
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formatDate(project.start_date)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <CalendarToday color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      End Date
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formatDate(project.end_date)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <AttachMoney color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Budget Estimate
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formatCurrency(
                        project.budget_estimate,
                        project.currency
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <TrendingUp color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {project.progress_percent}%
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Home color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Floor Size
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {project.floor_size} sq ft
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Construction color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Construction Type
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, textTransform: "capitalize" }}
                    >
                      {project.construction_type}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {project.notes && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Special Notes
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {project.notes}
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Tasks Section */}
          {project.tasks && project.tasks.length > 0 && (
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Project Tasks
              </Typography>

              {project.tasks.map((task, index) => (
                <Card key={task.id} sx={{ mb: 2, border: "1px solid #e0e0e0" }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {task.name}
                      </Typography>
                      <Chip
                        label={getStatusLabel(task.status)}
                        color={getStatusColor(task.status)}
                        size="small"
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {task.description}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 3,
                        mb: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Start Date
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {formatDate(task.start_date)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Due Date
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {formatDate(task.due_date)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {task.progress_percent}%
                        </Typography>
                      </Box>
                    </Box>

                    {/* Materials */}
                    {task.materials && task.materials.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Materials Required:
                        </Typography>
                        <List dense>
                          {task.materials.map((material) => (
                            <ListItem key={material.id} sx={{ py: 0.5 }}>
                              <ListItemText
                                primary={`${material.name} - ${material.quantity_required} ${material.unit}`}
                                secondary={`Unit Cost: ${formatCurrency(material.unit_cost, project.currency)}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

                    {/* Equipment */}
                    {task.equipment && task.equipment.length > 0 && (
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Equipment Required:
                        </Typography>
                        <List dense>
                          {task.equipment.map((equip) => (
                            <ListItem key={equip.id} sx={{ py: 0.5 }}>
                              <ListItemText
                                primary={`${equip.name} (${equip.type})`}
                                secondary={`Rental: ${formatCurrency(equip.rental_cost_per_day, project.currency)}/day`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Paper>
          )}

          {/* Progress Updates Section */}
          {project.tasks &&
            project.tasks.some(
              (task) => task.progressUpdates && task.progressUpdates.length > 0
            ) && (
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Progress Updates
                </Typography>

                {project.tasks.map(
                  (task) =>
                    task.progressUpdates &&
                    task.progressUpdates.length > 0 && (
                      <Box key={task.id} sx={{ mb: 4 }}>
                        <Typography
                          variant="h6"
                          sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
                        >
                          {task.name}
                        </Typography>

                        {task.progressUpdates.map((update, updateIndex) => (
                          <Card
                            key={update.id}
                            sx={{ mb: 3, border: "1px solid #e0e0e0" }}
                          >
                            <CardContent>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "flex-start",
                                  mb: 2,
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: 600, mb: 1 }}
                                  >
                                    Progress Update #{updateIndex + 1}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 1 }}
                                  >
                                    {formatDate(update.date)} •{" "}
                                    {update.progress_percent}% Complete
                                  </Typography>
                                </Box>
                                <Chip
                                  label={`${update.progress_percent}%`}
                                  color="primary"
                                  size="small"
                                />
                              </Box>

                              <Typography
                                variant="body1"
                                sx={{ mb: 2, lineHeight: 1.6 }}
                              >
                                {update.description}
                              </Typography>

                              {/* Progress Update Images */}
                              {update.images && update.images.length > 0 && (
                                <Box>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      mb: 2,
                                      fontWeight: 600,
                                      color: "text.secondary",
                                    }}
                                  >
                                    Progress Images ({update.images.length})
                                  </Typography>
                                  <Grid container spacing={2}>
                                    {update.images.map(
                                      (imageUrl, imageIndex) => (
                                        <Grid
                                          item
                                          xs={12}
                                          sm={6}
                                          md={4}
                                          key={imageIndex}
                                        >
                                          <Box
                                            sx={{
                                              position: "relative",
                                              width: "100%",
                                              height: 200,
                                              borderRadius: 2,
                                              overflow: "hidden",
                                              border: "1px solid #e0e0e0",
                                              cursor: "pointer",
                                              transition: "transform 0.2s ease",
                                              "&:hover": {
                                                transform: "scale(1.02)",
                                              },
                                            }}
                                            onClick={() =>
                                              window.open(
                                                `${window.location.origin}${imageUrl}`,
                                                "_blank"
                                              )
                                            }
                                          >
                                            <img
                                              src={`${window.location.origin}${imageUrl}`}
                                              alt={`Progress image ${imageIndex + 1}`}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                              }}
                                              onError={(e) => {
                                                e.target.style.display = "none";
                                                e.target.nextSibling.style.display =
                                                  "flex";
                                              }}
                                            />
                                            <Box
                                              sx={{
                                                display: "none",
                                                width: "100%",
                                                height: "100%",
                                                backgroundColor: "#f8f9fa",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <ImageIcon
                                                sx={{
                                                  fontSize: 48,
                                                  color: "#666",
                                                }}
                                              />
                                              <Typography
                                                variant="caption"
                                                sx={{ color: "#666" }}
                                              >
                                                Image not available
                                              </Typography>
                                            </Box>

                                            {/* Overlay with camera icon */}
                                            <Box
                                              sx={{
                                                position: "absolute",
                                                top: 8,
                                                right: 8,
                                                backgroundColor:
                                                  "rgba(0, 0, 0, 0.6)",
                                                borderRadius: "50%",
                                                width: 32,
                                                height: 32,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                              }}
                                            >
                                              <PhotoCamera
                                                sx={{
                                                  color: "white",
                                                  fontSize: 16,
                                                }}
                                              />
                                            </Box>
                                          </Box>
                                        </Grid>
                                      )
                                    )}
                                  </Grid>
                                </Box>
                              )}

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mt: 2,
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Created: {formatDate(update.createdAt)}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                    )
                )}
              </Paper>
            )}

          {/* Project Team */}
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Project Team
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Person color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Client
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {project.client_name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Business color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Contractor
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {project.contractor_name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {project.engineer && (
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Engineering color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Engineer in Charge
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {project.engineer.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.engineer.email}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>

          {/* Project Details */}
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Project Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Funding Source
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {project.funding_source}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Actual Cost
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatCurrency(project.actual_cost, project.currency)}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Created
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatDate(project.createdAt)}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatDate(project.updatedAt)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
}
