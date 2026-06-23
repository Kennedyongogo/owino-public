import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../components/Home/HeroSection";
import ServicesSection from "../components/Home/ServicesSection";
import ProjectsSection from "../components/Home/ProjectsSection";
import ReviewsSection from "../components/Home/ReviewsSection";
import ContactSection from "../components/Home/ContactSection";
import FooterCard from "../components/Common/FooterCard";

export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ReviewsSection />
      <ContactSection />
      <FooterCard />
    </Box>
  );
}
