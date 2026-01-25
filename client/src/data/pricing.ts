import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
  {
    name: "Starter",
    price: 19,
    period: "month",
    features: [
      "AI image generation from text prompts",
      "100 images per month",
      "Standard image quality",
      "Basic prompt customization",
      "Community support",
    ],
    mostPopular: false,
  },
  {
    name: "Creator",
    price: 49,
    period: "month",
    features: [
      "Unlimited image generation",
      "High-quality image outputs",
      "Advanced prompt control",
      "Faster generation speed",
      "Download images in full resolution",
      "Priority support",
    ],
    mostPopular: true,
  },
  {
    name: "Studio",
    price: 99,
    period: "month",
    features: [
      "Everything in Creator",
      "Team access",
      "Image history and management",
      "Bulk image generation",
      "Commercial usage rights",
      "Dedicated support",
    ],
    mostPopular: false,
  },
];
