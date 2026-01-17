import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
  {
    name: "Starter",
    price: 19,
    period: "month",
    features: [
      "AI-generated thumbnails",
      "50 thumbnails per month",
      "Standard styles and layouts",
      "Basic text and color edits",
      "Community support",
    ],
    mostPopular: false,
  },
  {
    name: "Creator",
    price: 49,
    period: "month",
    features: [
      "Unlimited thumbnail generation",
      "High-CTR optimized designs",
      "Advanced customization controls",
      "Faster generation speed",
      "HD downloads",
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
      "Brand style presets",
      "Bulk thumbnail generation",
      "Commercial usage rights",
      "Dedicated support",
    ],
    mostPopular: false,
  },
];
