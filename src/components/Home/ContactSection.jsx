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
        background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 50%, #f0f2f5 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 50%, rgba(0,0,0,0.02) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.02) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          px: { xs: 2, sm: 4, md: 6 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              backgroundColor: "white",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
              border: "1px solid rgba(0,0,0,0.08)",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)",
              },
            }}
          >
            <Box sx={{ p: 6 }}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <MotionBox
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "#000",
                      mb: 2,
                      letterSpacing: "-0.5px",
                      textShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    }}
                  >
                    Contact Us
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      maxWidth: 600,
                      mx: "auto",
                      color: "#333",
                      fontSize: "1rem",
                      lineHeight: 1.6,
                    }}
                  >
                    Get in touch with us for your construction needs
                  </Typography>
                </MotionBox>
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fafafa",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#666",
                        },
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#fff",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#333",
                          borderWidth: "2px",
                        },
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#666",
                      "&.Mui-focused": {
                        color: "#000",
                        fontWeight: 500,
                      },
                    },
                  }}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fafafa",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#666",
                        },
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#fff",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#333",
                          borderWidth: "2px",
                        },
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#666",
                      "&.Mui-focused": {
                        color: "#000",
                        fontWeight: 500,
                      },
                    },
                  }}
                />

                <FormControl
                  fullWidth
                  margin="normal"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fafafa",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#666",
                        },
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#fff",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#333",
                          borderWidth: "2px",
                        },
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#666",
                      "&.Mui-focused": {
                        color: "#000",
                        fontWeight: 500,
                      },
                    },
                  }}
                >
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
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#fafafa",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#666",
                            },
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#fff",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#333",
                              borderWidth: "2px",
                            },
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#666",
                          "&.Mui-focused": {
                            color: "#000",
                            fontWeight: 500,
                          },
                        },
                      }}
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
                        <Business sx={{ mr: 1, color: "#666" }} />
                        <Box>
                          <Typography variant="body1" sx={{ color: "#000" }}>
                            {option.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#666" }}>
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fafafa",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#666",
                        },
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#fff",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#333",
                          borderWidth: "2px",
                        },
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#666",
                      "&.Mui-focused": {
                        color: "#000",
                        fontWeight: 500,
                      },
                    },
                  }}
                />

                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} sx={{ color: "#fff" }} />
                      ) : (
                        <Send sx={{ color: "#fff" }} />
                      )
                    }
                    disabled={loading}
                    sx={{
                      px: 5,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      background: "linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #2a2a2a 100%)",
                      color: "#fff",
                      borderRadius: 2,
                      boxShadow: "0 4px 15px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.15)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #2a2a2a 0%, #5a5a5a 50%, #3a3a3a 100%)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.35), 0 3px 8px rgba(0,0,0,0.2)",
                        transform: "translateY(-2px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      },
                      "&:disabled": {
                        background: "linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #2a2a2a 100%)",
                        opacity: 0.6,
                      },
                    }}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </MotionBox>
      </Box>
    </Box>
  );
}
