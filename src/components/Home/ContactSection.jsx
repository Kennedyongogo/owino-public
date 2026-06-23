import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  CircularProgress,
  Stack,
  InputAdornment,
  Card,
} from "@mui/material";
import { motion } from "framer-motion";
import { Phone, LocationOn, Send, Business } from "@mui/icons-material";
import Swal from "sweetalert2";
import {
  SAFEWIRE_PHONE_DISPLAY,
  SAFEWIRE_PHONE_TEL,
  SAFEWIRE_LOCATION,
} from "../../constants/contact";

const BRAND_BLUE = "#1a5fb4";
const BRAND_BLUE_DARK = "#134a8c";
const BRAND_GOLD = "#f5c518";

const MotionBox = motion(Box);

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#ffffff",
    borderRadius: 2,
    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
    "& fieldset": {
      borderColor: "rgba(26, 95, 180, 0.22)",
    },
    "&:hover fieldset": {
      borderColor: BRAND_BLUE,
    },
    "&.Mui-focused": {
      boxShadow: `0 0 0 3px rgba(245, 197, 24, 0.28)`,
    },
    "&.Mui-focused fieldset": {
      borderColor: BRAND_BLUE,
      borderWidth: 2,
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(26, 95, 180, 0.65)",
    "&.Mui-focused": {
      color: BRAND_BLUE,
    },
  },
  "& .MuiInputBase-input": {
    color: "#1a1a2e",
    fontSize: { xs: "0.9rem", sm: "1rem" },
  },
};

const swalFix = {
  customClass: { container: "swal-z-index-fix" },
  didOpen: () => {
    const el = document.querySelector(".swal-z-index-fix");
    if (el) el.style.zIndex = "9999";
  },
};

const ContactInfoItem = ({ icon: Icon, label, value, tel }) => (
  <Stack direction="row" spacing={{ xs: 1.25, sm: 1.5 }} alignItems="center">
    <Box
      sx={{
        width: { xs: 40, sm: 44 },
        height: { xs: 40, sm: 44 },
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        bgcolor: "rgba(26, 95, 180, 0.08)",
        border: `1px solid rgba(26, 95, 180, 0.18)`,
      }}
    >
      <Icon sx={{ color: BRAND_BLUE, fontSize: { xs: 20, sm: 22 } }} />
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          fontSize: { xs: "0.68rem", sm: "0.72rem" },
          color: BRAND_BLUE,
          fontWeight: 700,
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </Typography>
      {tel ? (
        <Typography
          component="a"
          href={`tel:${tel}`}
          sx={{
            color: BRAND_BLUE_DARK,
            fontWeight: 600,
            fontSize: { xs: "0.88rem", sm: "0.95rem" },
            wordBreak: "break-word",
            textDecoration: "none",
            "&:hover": { color: BRAND_BLUE, textDecoration: "underline" },
          }}
        >
          {value}
        </Typography>
      ) : (
        <Typography
          sx={{
            color: BRAND_BLUE_DARK,
            fontWeight: 600,
            fontSize: { xs: "0.88rem", sm: "0.95rem" },
            wordBreak: "break-word",
          }}
        >
          {value}
        </Typography>
      )}
    </Box>
  </Stack>
);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    description: "",
    category: "",
    project_id: "",
  });

  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/issues/categories");
        const data = await response.json();
        if (data.success) setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchInitialProjects = async () => {
      try {
        const response = await fetch("/api/public-projects");
        const data = await response.json();
        if (data.success) {
          setProjects(data.data);
          setAllProjects(data.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchCategories();
    fetchInitialProjects();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProjectSearch = (event, value) => {
    if (event && event.type === "input") {
      if (!value || !value.trim()) {
        setProjects(allProjects);
        return;
      }
      setProjectLoading(true);
      const filtered = allProjects.filter(
        (project) =>
          project.name.toLowerCase().includes(value.toLowerCase()) ||
          (project.description &&
            project.description.toLowerCase().includes(value.toLowerCase())) ||
          (project.location_name &&
            project.location_name.toLowerCase().includes(value.toLowerCase()))
      );
      setProjects(filtered);
      setProjectLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          project_id: formData.project_id || null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFormData({
          name: "",
          phone_number: "",
          description: "",
          category: "",
          project_id: "",
        });
        setProjects(allProjects);
        Swal.fire({
          icon: "success",
          title: "Message sent!",
          text: "We'll get back to you shortly.",
          timer: 2200,
          showConfirmButton: false,
          confirmButtonColor: BRAND_BLUE,
          ...swalFix,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Could not send",
          text: data.message || "Please try again.",
          confirmButtonColor: BRAND_BLUE,
          ...swalFix,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Network error",
        text: "Check your connection and try again.",
        confirmButtonColor: BRAND_BLUE,
        ...swalFix,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="contact-section"
      component="section"
      sx={{
        width: "100%",
        maxWidth: "100vw",
        pt: { xs: 3.5, sm: 4, md: 5, lg: 6 },
        pb: { xs: 0.5, sm: 1, md: 1.5 },
        px: { xs: 1, sm: 1.25, md: 1.5, lg: 2 },
        background: "linear-gradient(160deg, #f4f8ff 0%, #fffef5 50%, #f0f6ff 100%)",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <Box sx={{ textAlign: { xs: "center", md: "left" }, mb: { xs: 2, sm: 2.5, md: 3 } }}>
          <Typography
            variant="overline"
            sx={{
              color: BRAND_GOLD,
              fontWeight: 800,
              letterSpacing: "0.14em",
              fontSize: "0.75rem",
            }}
          >
            GET IN TOUCH
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
            Contact Us
          </Typography>
          <Typography
            sx={{
              maxWidth: 480,
              fontSize: { xs: "0.9rem", md: "1rem" },
              color: "text.secondary",
              lineHeight: 1.65,
              mx: { xs: "auto", md: 0 },
            }}
          >
            Need a quote, emergency help, or have a question? Send us a message and our team will
            respond as soon as possible.
          </Typography>
          <Box
            sx={{
              width: 64,
              height: 4,
              mt: 2,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_GOLD})`,
              mx: { xs: "auto", md: 0 },
            }}
          />
        </Box>

        <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }} alignItems="stretch">
          <Grid size={{ xs: 12, sm: 12, md: 5 }}>
            <MotionBox
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true }}
              sx={{ height: "100%" }}
            >
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                  background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
                  border: `1px solid rgba(26, 95, 180, 0.12)`,
                  borderTop: `4px solid ${BRAND_GOLD}`,
                  boxShadow: "0 10px 36px rgba(26, 95, 180, 0.1)",
                }}
              >
                <Box
                  sx={{
                    height: 4,
                    background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_GOLD}, ${BRAND_BLUE})`,
                  }}
                />
                <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: BRAND_BLUE, mb: 0.5 }}
                  >
                    Reach us directly
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(26, 95, 180, 0.65)", mb: { xs: 2, sm: 2.5 }, lineHeight: 1.6 }}
                  >
                    Prefer to call? Our team is ready to help with quotes, emergencies, and
                    project enquiries.
                  </Typography>

                  <Stack spacing={{ xs: 2, sm: 2.5 }}>
                    <ContactInfoItem icon={Phone} label="CALL US" value={SAFEWIRE_PHONE_DISPLAY} tel={SAFEWIRE_PHONE_TEL} />
                    <ContactInfoItem icon={LocationOn} label="LOCATION" value={SAFEWIRE_LOCATION} />
                  </Stack>

                  <Box
                    sx={{
                      mt: { xs: 2, sm: 2.5 },
                      display: "inline-flex",
                      alignItems: "center",
                      maxWidth: "100%",
                      px: { xs: 1.5, sm: 2 },
                      py: { xs: 0.6, sm: 0.75 },
                      borderRadius: "20px",
                      backgroundColor: BRAND_BLUE,
                      border: `1.5px solid ${BRAND_GOLD}`,
                      boxShadow: `0 4px 12px rgba(26, 95, 180, 0.25)`,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "0.72rem", sm: "0.8rem" },
                        fontWeight: 600,
                        color: BRAND_GOLD,
                        letterSpacing: "0.02em",
                      }}
                    >
                      Certified power, wiring & solar experts
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </MotionBox>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 7 }}>
            <MotionBox
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              viewport={{ once: true }}
            >
              <Card
                elevation={0}
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  background: "rgba(255, 255, 255, 0.98)",
                  border: `1px solid rgba(26, 95, 180, 0.12)`,
                  borderTop: `4px solid ${BRAND_GOLD}`,
                  boxShadow:
                    "0 16px 48px rgba(26, 95, 180, 0.12), 0 0 0 1px rgba(255,255,255,0.5)",
                }}
              >
                <Box
                  sx={{
                    height: 4,
                    background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_GOLD}, ${BRAND_BLUE})`,
                  }}
                />

                <Box sx={{ p: { xs: 1.75, sm: 2.5, md: 3, lg: 3.5 } }}>
                  <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: BRAND_BLUE,
                        fontSize: { xs: "1.1rem", sm: "1.25rem" },
                      }}
                    >
                      Send a message
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(26, 95, 180, 0.65)", mt: 0.25 }}
                    >
                      Fill in the form and we&apos;ll get back to you shortly
                    </Typography>
                  </Box>

                  <Stack spacing={{ xs: 1.25, sm: 1.5, md: 2 }}>
                    <TextField
                      fullWidth
                      label="Your name"
                      required
                      size="small"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      sx={fieldSx}
                    />

                    <TextField
                      fullWidth
                      label="Phone number"
                      type="tel"
                      required
                      size="small"
                      placeholder="e.g. 0712 345 678"
                      value={formData.phone_number}
                      onChange={(e) => handleInputChange("phone_number", e.target.value)}
                      sx={fieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone sx={{ color: BRAND_BLUE, fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <FormControl fullWidth required size="small" sx={fieldSx}>
                      <InputLabel>What do you need help with?</InputLabel>
                      <Select
                        value={formData.category}
                        label="What do you need help with?"
                        onChange={(e) => handleInputChange("category", e.target.value)}
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
                      size="small"
                      options={projects}
                      getOptionLabel={(option) => option.name}
                      value={projects.find((p) => p.id === formData.project_id) || null}
                      onChange={(event, newValue) => {
                        handleInputChange("project_id", newValue?.id || "");
                      }}
                      onInputChange={handleProjectSearch}
                      loading={projectLoading}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Related project (optional)"
                          sx={fieldSx}
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
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Business sx={{ color: BRAND_BLUE, fontSize: 20 }} />
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                {option.name}
                              </Typography>
                              {option.location_name && (
                                <Typography variant="caption" color="text.secondary">
                                  {option.location_name}
                                </Typography>
                              )}
                            </Box>
                          </Stack>
                        </Box>
                      )}
                      noOptionsText="No projects found"
                    />

                    <TextField
                      fullWidth
                      label="Your message"
                      multiline
                      minRows={4}
                      required
                      size="small"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      sx={fieldSx}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={loading}
                      startIcon={
                        loading ? (
                          <CircularProgress size={18} color="inherit" />
                        ) : (
                          <Send />
                        )
                      }
                      sx={{
                        py: { xs: 1.1, sm: 1.25 },
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: { xs: "0.95rem", sm: "1.05rem" },
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                        color: "#fff",
                        background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, ${BRAND_BLUE_DARK} 100%)`,
                        boxShadow: `0 6px 20px rgba(26, 95, 180, 0.4)`,
                        border: `1px solid rgba(245, 197, 24, 0.35)`,
                        transition: "all 0.25s ease",
                        "&:hover": {
                          background: `linear-gradient(135deg, ${BRAND_BLUE_DARK} 0%, ${BRAND_BLUE} 100%)`,
                          boxShadow: `0 8px 28px rgba(26, 95, 180, 0.5), 0 0 0 2px rgba(245, 197, 24, 0.25)`,
                          transform: "translateY(-1px)",
                        },
                        "&:disabled": {
                          background: "rgba(26, 95, 180, 0.4)",
                          color: "rgba(255,255,255,0.8)",
                        },
                      }}
                    >
                      {loading ? "Sending…" : "Send Message"}
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </MotionBox>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
