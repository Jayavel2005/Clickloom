import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react";
import React from "react";

type AspectRatio = "16:9" | "1:1" | "9:16";

interface AspectRatioSelectorProps {
  value: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
}

const ASPECT_RATIOS: {
  label: string;
  icon: any;
  value: AspectRatio;
  description: string;
}[] = [
  {
    label: "16:9",
    icon: <RectangleHorizontal />,
    value: "16:9",
    description: "YouTube, Thumbnails",
  },
  {
    label: "1:1",
    icon: <Square />,
    value: "1:1",
    description: "Instagram, Square",
  },
  {
    label: "9:16",
    icon: <RectangleVertical />,
    value: "9:16",
    description: "Shorts, Reels",
  },
];

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-300">
        Aspect ratio
      </label>

      <div className="grid grid-cols-3 gap-3">
        {ASPECT_RATIOS.map((ratio) => {
          const active = value === ratio.value;

          return (
            <button
              key={ratio.value}
              type="button"
              onClick={() => onChange(ratio.value)}
              className={`rounded-lg border flex flex-col items-center justify-center px-3 py-3 text-left transition
                ${
                  active
                    ? "border-purple-500 bg-purple-500/10 text-white"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20"
                }
              `}
            >
              <p className="text-sm font-medium text-center">{ratio.label}</p>
              {ratio.icon}
              <p className="mt-1 text-xs text-zinc-400 text-center">{ratio.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AspectRatioSelector;
