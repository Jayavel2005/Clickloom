import React, { useEffect, useState } from "react";
import SoftBackdrop from "./SoftBackdrop";
import PreviewPanel from "./PreviewPanel";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Generate = () => {
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState("");
  const [imageId, setImageId] = useState(null);

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

      setImgUrl(data.data.imgUrl);
      setImageId(data.data._id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setTitle("");
      setAdditionalDetails("");
    }
  }

  function downloadImage() {
    if (!imageId) return;
    window.location.href = `http://localhost:5000/api/v1/images/download/${imageId}`;
  }

  return (
    <>
      <SoftBackdrop />

      <div className="pt-24 min-h-screen">
        {isAuthenticated ? (
          <main className="mx-auto max-w-6xl px-4 py-8">
            <div className="grid gap-8 lg:grid-cols-[450px_1fr]">
              {/* LEFT */}
              <div className="space-y-6 rounded-2xl border border-white/10 bg-white/8 p-6">
                <h2 className="text-xl font-semibold text-zinc-100">
                  Create Images from Imagination
                </h2>

                <textarea
                  id="airtist-prompt-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  rows={6}
                  placeholder="Describe your image"
                  className="w-full rounded-lg bg-white/5 p-3 text-white"
                />

                <textarea
                  id="airtist-additional-details"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  rows={4}
                  placeholder="Additional details (optional)"
                  className="w-full rounded-lg bg-white/5 p-3 text-white"
                />

                <button
                  id="airtist-generate-btn"
                  disabled={loading || !title}
                  onClick={generateImage}
                  className="w-full rounded-xl bg-purple-600 py-3 text-white"
                >
                  {loading ? "Generating…" : "Generate Image"}
                </button>

                <button
                  id="airtist-download-btn"
                  disabled={!imageId}
                  onClick={downloadImage}
                  className="w-full rounded-xl border border-purple-400 py-3 text-purple-300"
                >
                  Download Image
                </button>
              </div>

              {/* RIGHT */}
              <div id="airtist-preview-panel">
                <PreviewPanel loading={loading} imageUrl={imgUrl} />
              </div>
            </div>
          </main>
        ) : (
          <div className=" flex items-center justify-center">
            <div className="max-w-xl text-center bg-white/5 border border-white/10 rounded-2xl p-8">
              {/* Image */}
              <img
                src="/assets/authentication.png"
                alt="Login required"
                className="w-80 mx-auto mb-6 opacity-80 rounded-full"
              />

              {/* Text */}
              <h2 className="text-xl font-semibold text-white mb-2">
                Login required
              </h2>

              <p className="text-gray-400 text-sm mb-6">
                Please sign in to view your generated images and manage your
                creations.
              </p>

              {/* CTA */}
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
