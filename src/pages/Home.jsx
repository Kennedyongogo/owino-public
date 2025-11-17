import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../components/Home/HeroSection";
import ServicesSection from "../components/Home/ServicesSection";
import ProjectsSection from "../components/Home/ProjectsSection";
import ContactSection from "../components/Home/ContactSection";
import FooterCard from "../components/Common/FooterCard";

export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <FooterCard />
      {/* Spacer to keep bottom content visible above the fixed mobile navbar */}
      <Box sx={{ display: { xs: "block", md: "none" }, height: "80px" }} />
    </Box>
  );
}
