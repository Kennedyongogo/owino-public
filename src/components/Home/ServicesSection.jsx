import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import {
  Visibility,
  QuestionAnswer,
  ReportProblem,
  AttachMoney,
  Construction,
  Info,
} from "@mui/icons-material";

const howitworks = [
  {
    title: "View Projects",
    description:
      "Browse our current and completed construction projects with detailed information and progress updates",
    icon: <Visibility sx={{ fontSize: 40, color: "white" }} />,
  },
  {
    title: "Project Inquiries",
    description:
      "Ask questions about specific projects, timelines, and construction details",
    icon: <QuestionAnswer sx={{ fontSize: 40, color: "white" }} />,
  },
  {
    title: "Report Issues",
    description:
      "Report any concerns or issues related to our construction projects in your area",
    icon: <ReportProblem sx={{ fontSize: 40, color: "white" }} />,
  },
  {
    title: "Budget Information",
    description:
      "Request budget details and cost breakdowns for projects that may affect your community",
    icon: <AttachMoney sx={{ fontSize: 40, color: "white" }} />,
  },
  {
    title: "Construction Updates",
    description:
      "Stay informed about ongoing construction activities, road closures, and project milestones",
    icon: <Construction sx={{ fontSize: 40, color: "white" }} />,
  },
  {
    title: "Community Engagement",
    description:
      "Participate in community meetings and provide feedback on construction projects",
    icon: <Info sx={{ fontSize: 40, color: "white" }} />,
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
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          How It Works
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: "800px", mx: "auto" }}
        >
          Our public portal provides transparency and community engagement for
          all construction projects. Stay informed, ask questions, and
          participate in the development process.
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Grid container spacing={4}>
            {howitworks.map((service, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s",
                    position: "relative",
                    zIndex: 1,
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          bgcolor: "primary.light",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {service.icon}
                      </Box>
                    </Box>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                      sx={{ fontWeight: 600 }}
                    >
                      {service.title}
                    </Typography>
                    <Typography color="text.secondary">
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
