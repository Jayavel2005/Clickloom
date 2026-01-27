import React, { useEffect, useState } from "react";
import SoftBackdrop from "./SoftBackdrop";
import Image from "./Image";
import Modal from "./Modal";

const MyGenerations = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function getImages() {
      try {
        const response = await fetch("http://localhost:5000/api/v1/images");
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

      <div className="pt-24 min-h-screen">
        <main className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-6 gap-5">
            {images.map((image) => (
              <Image
                key={image._id}
                image={image}
                onView={() => setSelectedImage(image)} // 👈 IMPORTANT
              />
            ))}
          </div>
        </main>
      </div>

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
