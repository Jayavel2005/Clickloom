import React from "react";
import { Image, Loader2 } from "lucide-react";
import Marquee from "react-fast-marquee";

interface PreviewPanelProps {
  imageUrl?: string;
  loading: boolean;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ loading, imageUrl }) => {
  const showImage = !!imageUrl && !loading;
  const showEmpty = !imageUrl && !loading;

  return (
    <div className="flex w-full items-center justify-center">
      {/* Canvas */}
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-4">
        {/* Content */}
        <div className="relative flex min-h-[500px] items-center justify-center rounded-xl bg-black/20 overflow-hidden">
          {/* Loading state */}
          {loading && (
            <div className="w-full h-full flex flex-col gap-6">
              {/* Header (OUTSIDE) */}
              <div className="flex justify-center">
                <div
                  className="flex items-center justify-between gap-6
                   rounded-full px-5 py-2
                   bg-black/40 backdrop-blur-md
                   border border-purple-500/20"
                >
                  {/* Left */}
                  <div className="flex items-center gap-2 text-purple-300/70 text-xs uppercase">
                    <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                    <span>forming shape</span>
                  </div>

                  {/* Center */}
                  <span className="text-sm tracking-widest uppercase text-purple-300/80">
                    depth emerging slowly 🧊
                  </span>

                  {/* Right */}
                  <span className="text-xs tracking-widest uppercase text-purple-300/40">
                    synthesis
                  </span>
                </div>
              </div>

              {/* Loader / Marquee */}
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden
                 bg-black/70 border border-purple-500/20"
              >
                <div className="h-full flex items-center">
                  <Marquee speed={90} gradient={false} pauseOnHover={false}>
                    {[
                      "cinematic light forming 🟣",
                      "texture meeting color ✨",
                      "details taking shape 🎨",
                      "depth emerging slowly 🌫️",
                      "light bending into form 💡",
                      "noise finding meaning 🔮",
                    ].map((text, i) => (
                      <span
                        key={i}
                        className="mx-8 text-xl tracking-wide
                         text-purple-300/70 uppercase"
                      >
                        {text}
                      </span>
                    ))}
                  </Marquee>
                </div>

                {/* Edge fade */}
                <div
                  className="pointer-events-none absolute inset-0
                   bg-gradient-to-r from-black via-transparent to-black"
                />
              </div>
            </div>
          )}

          {/* Image preview */}
          {showImage && (
            <img
              src={imageUrl}
              alt="AI generated preview"
              className="h-full w-full rounded-xl object-cover shadow-lg transition-opacity duration-300"
            />
          )}

          {/* Empty state */}
          {showEmpty && (
            <div className="flex flex-col items-center gap-3 text-zinc-400">
              <Image className="h-8 w-8 text-zinc-500" />
              <p className="text-sm text-center">
                Your AI-generated image will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
