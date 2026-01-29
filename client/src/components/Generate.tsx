import React, { useState } from "react";
import SoftBackdrop from "./SoftBackdrop";
import PreviewPanel from "./PreviewPanel";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Sparkle } from "lucide-react";

const Generate = () => {
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const [showPopOver, setShowPopOver] = useState<boolean>(false);

  const navigate = useNavigate();

  const { isAuthenticated, user, updateCredits, updateImages } = useAuth();

  const onHover = () => {
    setShowPopOver(true);
  };

  const offHover = () => {
    setShowPopOver(false);
  };

  async function generateImage() {
    try {
      setLoading(true);

      const finalPrompt = `${title}\n${additionalDetails}`;

      const response = await fetch(
        "http://localhost:5000/api/v1/images/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: finalPrompt }),
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate image");
      }

      setImgUrl(data.image);
      updateCredits(data.remainingCredits);
      updateImages(data.images);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setTitle("");
      setAdditionalDetails("");
    }
  }

  function downloadImage() {
    if (!user?.images?.length) return;

    // download latest image
    const index = user.images.length - 1;
    window.location.href = `http://localhost:5000/api/v1/images/download/${index}`;
  }

  return (
    <>
      <SoftBackdrop />

      <div className="pt-24 min-h-screen">
        {isAuthenticated ? (
          <main className="mx-auto max-w-6xl px-4 py-8">
            <div className="grid gap-8 lg:grid-cols-[450px_1fr]">
              {/* LEFT PANEL */}
              <div className="space-y-6 rounded-2xl border border-white/10 bg-white/8 p-6">
                <h2 className="text-xl font-semibold text-zinc-100">
                  Create Images from Imagination
                </h2>

                <div className="relative">
                  {/* Tooltip */}
                  <div
                    className={`
                  absolute  -right-12 -top-10
                  rounded-md px-3 py-1
                  text-xs text-purple-100
                  bg-purple-900/90
                  backdrop-blur
                  border border-purple-500/30
                  shadow-lg shadow-purple-900/50
                  transition-all duration-200 ease-out
                  pointer-events-none
                  ${showPopOver ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
                `}
                              >
                                Refine Prompt ✨
                              </div>

                              {/* Button */}
                              <button
                                onMouseEnter={onHover}
                                onMouseLeave={offHover}
                                className="
                  absolute right-0
                  flex items-center justify-center
                  p-1.5
                  rounded-md
                  border border-purple-500/40
                  bg-purple-500/10
                  backdrop-blur
                  transition-all duration-300
                  hover:bg-purple-500/20
                  hover:border-purple-400
                  hover:scale-105
                  focus:outline-none
                  group
                "
                              >
                                <Sparkle
                                  size={18}
                                  className="
                    text-purple-400
                    transition-all duration-300
                    group-hover:rotate-12
                    [filter:drop-shadow(0_0_6px_rgba(168,85,247,0.8))]
                    group-hover:[filter:drop-shadow(0_0_12px_rgba(168,85,247,1))]
                  "
                                />
                              </button>

                              {/* Textarea */}
                              <textarea
                                id="airtist-prompt-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                rows={6}
                                placeholder="Describe your image"
                                className="
                  w-full
                  rounded-lg
                  bg-white/5
                  p-4
                  pr-12
                  text-white
                  placeholder:text-white/40
                  focus:outline-none
                  focus:ring-1 focus:ring-purple-500/40
                "
                              />
                            </div>

                <textarea
                  id="airtist-additional-details"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  rows={4}
                  placeholder="Additional details (optional)"
                  className="w-full rounded-lg bg-white/5 p-3 text-white"
                />

                {/* Generate Button */}
                <button
                  id="airtist-generate-btn"
                  disabled={loading || !title || user?.credits <= 0}
                  onClick={generateImage}
                  className="w-full rounded-xl bg-purple-600 py-3 text-white disabled:opacity-50"
                >
                  {loading
                    ? "Generating…"
                    : user?.credits <= 0
                      ? "No credits left"
                      : "Generate Image"}
                </button>

                {/* Download Button */}
                <button
                  id="airtist-download-btn"
                  disabled={!user?.images?.length}
                  onClick={downloadImage}
                  className="w-full rounded-xl border border-purple-400 py-3 text-purple-300 disabled:opacity-50"
                >
                  Download Image
                </button>

                {/* Credits Info */}
                <p className="text-sm text-zinc-400 text-center">
                  Credits left:{" "}
                  <span className="text-purple-400 font-medium">
                    {user?.credits ?? 0}
                  </span>
                </p>
              </div>

              {/* RIGHT PANEL */}
              <div id="airtist-preview-panel">
                <PreviewPanel loading={loading} imageUrl={imgUrl} />
              </div>
            </div>
          </main>
        ) : (
          <div className="flex items-center justify-center min-h-[70vh]">
            <div className="max-w-xl text-center bg-white/5 border border-white/10 rounded-2xl p-8">
              <img
                src="/assets/authentication.png"
                alt="Login required"
                className="w-80 mx-auto mb-6 opacity-80 rounded-full"
              />

              <h2 className="text-xl font-semibold text-white mb-2">
                Login required
              </h2>

              <p className="text-gray-400 text-sm mb-6">
                Please sign in to generate and manage your images.
              </p>

              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-full text-white transition"
              >
                Go to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Generate;
