import type { IFeature } from "../types";
import { Sparkles, Target, Sliders } from "lucide-react";

export const featuresData: IFeature[] = [
  {
    icon: <Sparkles className="w-8 h-8 text-pink-500" strokeWidth={1.5} />,
    title: "Instant Image Generation",
    description:
      "Generate high-quality AI images in seconds using simple text prompts — no design or editing skills required.",
  },
  {
    icon: <Target className="w-8 h-8 text-pink-500" strokeWidth={1.5} />,
    title: "High-Quality Visual Output",
    description:
      "Create detailed, visually rich images with cinematic lighting, depth, and professional-grade results.",
  },
  {
    icon: <Sliders className="w-8 h-8 text-pink-500" strokeWidth={1.5} />,
    title: "Flexible & Creative Control",
    description:
      "Customize prompts, styles, and visual details to shape images exactly the way you imagine.",
  },
];
