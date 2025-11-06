import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const services = [
  {
    title: "Residential Interior Design",
    description:
      "Create personalized home environments that blend beauty, comfort, and functionality. From living rooms to kitchens, we craft cohesive interiors that reflect your personality.",
    image: "/s1.png",
  },
  {
    title: "Commercial Interior Design",
    description:
      "Design commercial spaces that inspire creativity and efficiency. Whether corporate offices, retail stores, or restaurants, we enhance user experience and business performance.",
    image: "/s2.png",
  },
  {
    title: "Custom Furniture & Décor",
    description:
      "Signature custom furniture pieces and personalized décor services. From modern minimalist to luxurious designs, ensuring every element complements your interior's theme.",
    image: "/s3.png",
  },
  {
    title: "Space Planning & 3D Visualization",
    description:
      "Bring your ideas to life with detailed floor plans and realistic renderings. Experience your design virtually before any work begins for confident decision-making.",
    image: "/s4.png",
  },
  {
    title: "Renovation & Remodeling",
    description:
      "Breathe new life into existing spaces with our renovation expertise. We manage the entire process from conceptual design to material sourcing and construction.",
    image: "/s5.png",
  },
  {
    title: "Project Management & Execution",
    description:
      "End-to-end project management ensuring smooth delivery. We handle cost estimation, procurement, site supervision, and quality control with clear communication.",
    image: "/s6.png",
  },
];

export default function ServicesSection() {
  return (
    <Box
      id="services-section"
      sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 }, bgcolor: "background.paper" }}
    >
      <Box sx={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: 2,
            fontWeight: 700,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.2rem" },
            color: { xs: "#1B4D4D", sm: "inherit" },
          }}
        >
          Our Services
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{
            mb: 6,
            maxWidth: "800px",
            mx: "auto",
            fontSize: { xs: "0.875rem", sm: "1rem", md: "1.1rem" },
            color: { xs: "#1B4D4D", sm: "text.secondary" },
          }}
        >
          Transform your spaces with our comprehensive interior design services.
          From concept to completion, we bring your vision to life with style,
          functionality, and attention to detail.
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s",
                    position: "relative",
                    zIndex: 1,
                    bgcolor: "#FFFEF5",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Box
                      sx={{
                        width: "100%",
                        height: 200,
                        borderRadius: 2,
                        mb: 2,
                        overflow: "hidden",
                      }}
                    >
                      {service.image ? (
                        <Box
                          component="img"
                          src={service.image}
                          alt={service.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            bgcolor: "grey.200",
                            border: "2px dashed",
                            borderColor: "grey.400",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              fontStyle: "italic",
                              fontSize: { xs: "0.7rem", sm: "0.875rem" },
                            }}
                          >
                            Image Placeholder
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.35rem" },
                        color: { xs: "#1B4D4D", sm: "inherit" },
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "0.95rem" },
                        color: { xs: "#1B4D4D", sm: "text.secondary" },
                      }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
