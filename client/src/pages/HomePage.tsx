import HeroSection from "../sections/HeroSection";
import FeaturesSection from "../sections/FeaturesSection";
import TestimonialSection from "../sections/TestimonialSection";
import PricingSection from "../sections/PricingSection";
import ContactSection from "../sections/ContactSection";
import CTASection from "../sections/CTASection";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("airtist_home_tour_seen")) return;

    const driverObj = driver({
      popoverClass: "driverjs-theme",
      showProgress: true,
      animate: true,
      allowClose: true,
      steps: [
        {
          element: "#airtist-hero-title",
          popover: {
            title: "Welcome to AIrtist ✨",
            description:
              "Turn your imagination into stunning visuals.\nAI helps with the magic — you bring the ideas.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#airtist-powered-ai",
          popover: {
            title: "Creativity, powered by AI",
            description:
              "Describe what’s in your mind.\nAIrtist transforms it into art in seconds.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#airtist-generate-now-btn",
          popover: {
            title: "Start creating 🎨",
            description:
              "This is where your ideas become visuals.\nClick next to continue the tour.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#airtist-features-section",
          popover: {
            title: "Built for creators",
            description:
              "Fast generation, high-quality visuals,\nand full creative control.",
            side: "top",
            align: "center",
          },
        },
        {
          element: "#airtist-create-images-section",
          popover: {
            title: "Create images from text ✍️",
            description: "Just describe an idea.\nAIrtist handles the rest.",
            side: "left",
            align: "center",
          },
        },
        {
          element: "#airtist-testimonials-section",
          popover: {
            title: "Loved by creators 💜",
            description:
              "Artists and creators trust AIrtist\nfor fast, beautiful results.",
            side: "top",
            align: "center",
          },
        },
        {
          element: "#airtist-contact-section",
          popover: {
            title: "We’re here for you 💬",
            description: "Have questions or feedback?\nReach out anytime.",
            side: "top",
            align: "center",
          },
        },
        {
          element: "#airtist-cta-section",
          popover: {
            title: "Ready to create something amazing? 🚀",
            description: "Let’s generate your first artwork together.",
            side: "top",
            align: "center",
            onNextClick: () => {
              localStorage.setItem("airtist_home_tour_seen", "true");

              localStorage.setItem("airtist_start_generate_tour", "true");

              driverObj.destroy();
            },
          },
        },
      ],
    });

    driverObj.drive();

    return () => driverObj.destroy();
  }, [navigate]);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <PricingSection />
      <ContactSection />
      <CTASection />
    </>
  );
}
