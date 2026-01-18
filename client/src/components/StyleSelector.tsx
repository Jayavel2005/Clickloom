import React, { useState } from "react";
import {
  Zap,
  Layout,
  Camera,
  Brush,
  Cpu,
  Smile,
  Columns2,
  Newspaper,
  ChevronDown,
} from "lucide-react";

const thumbnailStyles = [
  {
    id: "bold-graphic",
    label: "Bold & Graphic",
    intent: "Maximum CTR",
    icon: Zap,
  },
  {
    id: "clean-professional",
    label: "Clean Professional",
    intent: "Trust & clarity",
    icon: Layout,
  },
  {
    id: "photo-focus",
    label: "Photo Focus",
    intent: "Authentic & human",
    icon: Camera,
  },
  {
    id: "illustrated-concept",
    label: "Illustrated Concept",
    intent: "Explain ideas visually",
    icon: Brush,
  },
  {
    id: "modern-tech",
    label: "Modern Tech",
    intent: "Futuristic & sharp",
    icon: Cpu,
  },
  {
    id: "face-emotion",
    label: "Face-Driven Emotion",
    intent: "Human reaction & emotion",
    icon: Smile,
  },
  {
    id: "comparison-contrast",
    label: "Comparison / Contrast",
    intent: "Instant curiosity",
    icon: Columns2,
  },
  {
    id: "editorial-magazine",
    label: "Editorial / Magazine",
    intent: "Premium & professional",
    icon: Newspaper,
  },
];

const StyleSelector = () => {
  const [open, setOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<
    (typeof thumbnailStyles)[number] | null
  >(null);

  return (
    <div className="relative space-y-2">
      <label className="block text-sm font-medium text-zinc-300">
        Thumbnail Style
      </label>

      {/* Dropdown trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/20"
      >
        <div className="flex items-center gap-3">
          {selectedStyle ? (
            <>
              <selectedStyle.icon className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-white">
                {selectedStyle.label}
              </span>
            </>
          ) : (
            <span className="text-sm text-zinc-400">
              Select a thumbnail style
            </span>
          )}
        </div>

        <ChevronDown
          className={`h-4 w-4 text-zinc-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-white/10 bg-[#0b0b0f] shadow-xl">
          {thumbnailStyles.map((style) => {
            const Icon = style.icon;
            const active = selectedStyle?.id === style.id;

            return (
              <button
                key={style.id}
                type="button"
                onClick={() => {
                  setSelectedStyle(style);
                  setOpen(false);
                }}
                className={`flex w-full items-start gap-3 px-4 py-3 text-left transition
                  ${
                    active
                      ? "bg-purple-500/10"
                      : "hover:bg-white/5"
                  }
                `}
              >
                <Icon className="mt-0.5 h-4 w-4 text-purple-400" />
                <div>
                  <p className="text-sm text-white">{style.label}</p>
                  <p className="text-xs text-zinc-400">{style.intent}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StyleSelector;
