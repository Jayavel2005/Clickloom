import React, { useEffect, useState } from "react";
import SoftBackdrop from "./SoftBackdrop";
import PreviewPanel from "./PreviewPanel";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useNavigate } from "react-router-dom";

const Generate = () => {
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState("");
  const [imageId, setImageId] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("airtist_generate_tour_seen")) return;

    if (!localStorage.getItem("airtist_start_generate_tour")) return;

    const driverObj = driver({
      showProgress: true,
      allowClose: true,
      steps: [
        {
          element: "#airtist-prompt-input",
          popover: {
            title: "Describe your idea ✍️",
            description:
              "Start by describing what you imagine.\nThe clearer the idea, the better the result.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#airtist-additional-details",
          popover: {
            title: "Add more details (optional)",
            description:
              "You can refine style, mood, or lighting here.\nThis step is optional.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#airtist-generate-btn",
          popover: {
            title: "Generate your image 🎨",
            description: "Click here and let AIrtist bring your idea to life.",
            side: "top",
            align: "center",
          },
        },
        {
          element: "#airtist-preview-panel",
          popover: {
            title: "Preview your result 👀",
            description:
              "Your generated image appears here.\nYou can regenerate if needed.",
            side: "left",
            align: "center",
          },
        },
        {
          element: "#airtist-download-btn",
          popover: {
            title: "Download your image ⬇️",
            description: "You’re all set!\nClick next to head back to Home.",
            side: "top",
            align: "center",
            onNextClick: () => {
              // ✅ mark generate tour as done
              localStorage.setItem("airtist_generate_tour_seen", "true");

              // ✅ cleanup trigger
              localStorage.removeItem("airtist_start_generate_tour");

              driverObj.destroy();
              navigate("/"); // ⬅️ go back to Home
            },
          },
        },
      ],
    });

    driverObj.drive();

    return () => driverObj.destroy();
  }, [navigate]);

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
      </div>
    </>
  );
};

export default Generate;
