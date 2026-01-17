import React, { useState } from "react";
import { useParams } from "react-router-dom";
import type { IThumbnail } from "../../public/assets/assets";
import SoftBackdrop from "./SoftBackdrop";
import AspectRatioSelector from "./AspectRatioSelector";

const Generate = () => {
  const { id } = useParams();

  const [title, setTitle] = useState<string>("");
  const [additionalDetails, setAdditionalDetails] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "1:1" | "9:16">(
    "16:9",
  );

  return (
    <>
      <SoftBackdrop />

      <div className="pt-24 min-h-screen">
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
            {/* Left panel */}
            <div
              className={`space-y-6 ${
                id ? "pointer-events-none opacity-70" : ""
              }`}
            >
              <div className="space-y-6 rounded-2xl border border-white/10 bg-white/8 p-6 shadow-xl">
                <div>
                  <h2 className="mb-1 text-xl font-semibold text-zinc-100">
                    Create your thumbnail
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Describe your vision and let AI bring it to life.
                  </p>
                </div>

                {/* Title input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-zinc-300">
                    Title or topic
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                    placeholder="e.g. 10 Tips for Better Programmers"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-zinc-100 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-purple-500/60"
                  />
                  <span className="block text-right text-xs text-zinc-400">
                    {title.length} / 100
                  </span>
                </div>

                {/* Aspect ratio selector */}
                <AspectRatioSelector
                  value={aspectRatio}
                  onChange={setAspectRatio}
                />

                {/* Style Selector */}
                {/* Color pallete selector */}

                {/* details */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-zinc-300">
                    Additional prompts{" "}
                    <span className="text-zinc-400 text-xs">(optional)</span>
                  </label>

                  <textarea
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    rows={3}
                    placeholder="Add any specific elements, mood, or style preferences…"
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-zinc-100 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-purple-500/60"
                  />
                </div>

                {/* Generate button */}
                {!id && (
                  <button
                    disabled={loading || !title}
                    onClick={() => setLoading(true)}
                    className="w-full rounded-xl bg-gradient-to-b from-purple-500 to-purple-600 py-3.5 text-[15px] font-medium text-white transition-colors hover:from-purple-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Generating…" : "Generate thumbnail"}
                  </button>
                )}
              </div>
            </div>

            {/* Right panel */}
            <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5"></div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
