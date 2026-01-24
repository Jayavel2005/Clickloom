import React, { useState } from "react";
import SoftBackdrop from "./SoftBackdrop";
import PreviewPanel from "./PreviewPanel";

const Generate = () => {
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const [imgUrl, setImgUrl] = useState<string | undefined>(
    "https://res.cloudinary.com/dsnqjjhc9/image/upload/v1769240329/airtist/rhfvjg2dhjhegjrhngxq.png",
  );
  const [imageId, setImageId] = useState<string | null>();

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

    // Forces download without opening new tab
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={6}
                placeholder="Describe your image"
                className="w-full rounded-lg bg-white/5 p-3 text-white"
              />

              <textarea
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                rows={4}
                placeholder="Additional details (optional)"
                className="w-full rounded-lg bg-white/5 p-3 text-white"
              />

              <button
                disabled={loading || !title}
                onClick={generateImage}
                className="w-full rounded-xl bg-purple-600 py-3 text-white"
              >
                {loading ? "Generating…" : "Generate Image"}
              </button>

              <button
                disabled={!imageId}
                onClick={downloadImage}
                className="w-full rounded-xl border border-purple-400 py-3 text-purple-300"
              >
                Download Image
              </button>
            </div>

            {/* RIGHT */}
            <PreviewPanel loading={loading} imageUrl={imgUrl} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
