import React, { useEffect, useState } from "react";
import SoftBackdrop from "./SoftBackdrop";
import Image from "./Image";
import Modal from "./Modal";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const MyGenerations = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function getImages() {
      try {
        const response = await fetch("http://localhost:5000/api/v1/images", {
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load images");
        }

        setImages(data.data.images);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, []);

  return (
    <>
      <SoftBackdrop />

      {isAuthenticated ? (
        <div className="pt-24 min-h-screen">
          <main className="mx-auto max-w-6xl px-4 py-8">
            <div className="grid grid-cols-6 gap-5">
              {images.map((image) => (
                <Image
                  key={image._id}
                  image={image}
                  onView={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </main>
        </div>
      ) : (
        <div className="pt-24  flex items-center justify-center">
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

      {/* Modal */}
      <Modal isOpen={selectedImage} onClose={() => setSelectedImage(null)}>
        <div className="flex gap-4 p-2">
          <img
            src={selectedImage?.imgUrl}
            alt=""
            className="rounded-xl w-100 "
          />
          <p className="mt-4 text-sm text-zinc-300">{selectedImage?.prompt}</p>
        </div>
      </Modal>
    </>
  );
};

export default MyGenerations;
