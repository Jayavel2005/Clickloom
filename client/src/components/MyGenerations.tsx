import React, { useState } from "react";
import SoftBackdrop from "./SoftBackdrop";
import Image from "./Image";
import Modal from "./Modal";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const MyGenerations = () => {
  const { isAuthenticated, user, updateImages } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const images = user?.images || [];
  console.log(images);

  async function deleteImage(index: number) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/images/${index}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      const updatedImages = images.filter((_, i) => i !== index);
      updateImages(updatedImages);
      setSelectedIndex(null);
    } catch (error) {
      console.error(error);
    }
  }

  function downloadImage(index: number) {
    window.location.href = `http://localhost:5000/api/v1/images/download/${index}`;
  }

  return (
    <>
      <SoftBackdrop />

      {isAuthenticated ? (
        <div className="pt-24 min-h-screen">
          <main className="mx-auto max-w-6xl px-4 py-8">
            {images.length === 0 ? (
              <p className="text-center text-zinc-400">
                No images generated yet.
              </p>
            ) : (
              <div className="grid grid-cols-6 gap-5">
                {images.map((image, index) => (
                  <Image
                    key={index}
                    image={image}
                    onView={() => setSelectedIndex(index)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      ) : (
        <div className="pt-24 flex items-center justify-center">
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
              Please sign in to view your generated images.
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

      {/* Modal */}
      <Modal
          isOpen={selectedIndex !== null}
          onClose={() => setSelectedIndex(null)}
      >
        {selectedIndex !== null && (
            <div className="w-[90vw] max-w-5xl max-h-[80vh] grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-4">

              {/* LEFT — Image */}
              <div className="flex items-center justify-center bg-black/40 rounded-xl p-3">
                <img
                    src={images[selectedIndex].imageUrl}
                    alt="Generated"
                    className="max-h-[70vh] w-full object-contain rounded-lg"
                />
              </div>

              {/* RIGHT — Details */}
              <div className="flex flex-col bg-white/5 rounded-xl p-4 overflow-hidden">

                {/* Prompt Header */}
                <h3 className="text-sm font-semibold text-zinc-200 mb-2">
                  Prompt
                </h3>

                {/* Full Prompt */}
                <div className="flex-1 overflow-y-auto rounded-md bg-black/30 p-3 text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {images[selectedIndex].prompt}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                      onClick={() => downloadImage(selectedIndex)}
                      className="flex-1 rounded-lg border border-purple-400/60 py-2 text-sm text-purple-300
                       hover:bg-purple-400/10 transition"
                  >
                    Download
                  </button>

                  <button
                      onClick={() => deleteImage(selectedIndex)}
                      className="flex-1 rounded-lg bg-red-600/90 py-2 text-sm text-white
                       hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
        )}
      </Modal>

    </>
  );
};

export default MyGenerations;
