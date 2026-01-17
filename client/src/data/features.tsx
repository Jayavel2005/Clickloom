import type { IFeature } from "../types";
import { Sparkles, Target, Sliders } from "lucide-react";

export const featuresData: IFeature[] = [
  {
    icon: <Sparkles className="w-8 h-8 text-pink-500" strokeWidth={1.5} />,
    title: "Instant AI Generation",
    description:
      "Generate eye-catching thumbnails in seconds from a simple prompt — no design skills required.",
  },
  {
    icon: <Target className="w-8 h-8 text-pink-500" strokeWidth={1.5} />,
    title: "Optimized for Clicks",
    description:
      "Thumbnails are designed using visual-attention patterns proven to increase CTR.",
  },
  {
    icon: <Sliders className="w-8 h-8 text-pink-500" strokeWidth={1.5} />,
    title: "Fully Customizable",
    description:
      "Edit text, colors, layout, and style to match your brand — complete creative control.",
  },
];
