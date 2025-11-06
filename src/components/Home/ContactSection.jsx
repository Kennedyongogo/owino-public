import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { Email, Phone, LocationOn, Send, Business } from "@mui/icons-material";
import Swal from "sweetalert2";

const MotionBox = motion(Box);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    category: "",
    project_id: "",
  });

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/issues/categories");
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchInitialProjects = async () => {
      try {
        const response = await fetch("/api/public-projects");
        const data = await response.json();
        if (data.success) {
          console.log("Projects fetched:", data.data.length);
          setProjects(data.data);
        } else {
          console.error("Failed to fetch projects:", data.message);
        }
      } catch (error) {
        console.error("Error fetching initial projects:", error);
      }
    };

    fetchCategories();
    fetchInitialProjects();
  }, []);

  // Filter projects locally based on search term
  const filterProjects = (searchTerm = "") => {
    if (!searchTerm || !searchTerm.trim()) {
      // If no search term, fetch all projects
      fetchInitialProjects();
      return;
    }

    setProjectLoading(true);
    try {
      // Filter projects locally from the already loaded projects
      const filtered = projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (project.description &&
            project.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (project.location &&
            project.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      console.log(
        `Filtered ${filtered.length} projects for search: "${searchTerm}"`
      );
      setProjects(filtered);
    } catch (error) {
      console.error("Error filtering projects:", error);
    } finally {
      setProjectLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProjectSearch = (event, value) => {
    // Filter projects locally as user types
    if (event && event.type === "input") {
      filterProjects(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          project_id: formData.project_id || null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Reset form data
        setFormData({
          name: "",
          email: "",
          description: "",
          category: "",
          project_id: "",
        });
        setProjects([]);

        // Show success SweetAlert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your message has been sent successfully!",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            container: "swal-z-index-fix",
          },
          didOpen: () => {
            const swalContainer = document.querySelector(".swal-z-index-fix");
            if (swalContainer) {
              swalContainer.style.zIndex = "9999";
            }
          },
        });
      } else {
        // Show error SweetAlert
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: data.message || "Failed to send message. Please try again.",
          customClass: {
            container: "swal-z-index-fix",
          },
          didOpen: () => {
            const swalContainer = document.querySelector(".swal-z-index-fix");
            if (swalContainer) {
              swalContainer.style.zIndex = "9999";
            }
          },
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show network error SweetAlert
      Swal.fire({
        icon: "error",
        title: "Network Error!",
        text: "Please check your connection and try again.",
        customClass: {
          container: "swal-z-index-fix",
        },
        didOpen: () => {
          const swalContainer = document.querySelector(".swal-z-index-fix");
          if (swalContainer) {
            swalContainer.style.zIndex = "9999";
          }
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="contact-section"
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
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    mb: 2,
                  }}
                >
                  Contact Us
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ maxWidth: 600, mx: "auto" }}
                >
                  Get in touch with us for your construction needs
                </Typography>
              </Box>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 2, width: "100%" }}
              >
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />

                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category"
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Autocomplete
                  fullWidth
                  options={projects}
                  getOptionLabel={(option) => option.name}
                  value={
                    projects.find((p) => p.id === formData.project_id) || null
                  }
                  onChange={(event, newValue) => {
                    handleInputChange("project_id", newValue?.id || "");
                  }}
                  onInputChange={handleProjectSearch}
                  loading={projectLoading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Project (Optional)"
                      margin="normal"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {projectLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Business sx={{ mr: 1, color: "text.secondary" }} />
                        <Box>
                          <Typography variant="body1">{option.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.location} • {option.status}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  noOptionsText="No projects found"
                  clearOnBlur={false}
                  blurOnSelect
                />

                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  margin="normal"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <Send />
                  }
                  disabled={loading}
                  sx={{
                    mt: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                  }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </Box>
            </Box>
          </Paper>
        </MotionBox>
      </Box>
    </Box>
  );
}
