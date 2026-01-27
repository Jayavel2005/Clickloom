import React from "react";
import { Eye, Download } from "lucide-react";

const Image = ({ image, onView }) => {
  return (
    <div className="group relative inline-block rounded-2xl overflow-hidden">
      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300" />

      {/* Action buttons */}
      <div className="absolute right-3 top-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
        <button
          onClick={onView} // 👈 THIS OPENS MODAL
          className="pointer-events-auto rounded-full bg-black/60 p-2 backdrop-blur-md hover:bg-black/80 transition"
          title="View"
        >
          <Eye size={16} className="text-white" />
        </button>

        <button
          onClick={() =>
            (window.location.href = `http://localhost:5000/api/v1/images/download/${image._id}`)
          }
          className="pointer-events-auto rounded-full bg-black/60 p-2 backdrop-blur-md hover:bg-black/80 transition"
          title="Download"
        >
          <Download size={15} className="text-white" />
        </button>
      </div>

      {/* Image */}
      <img
        src={image.imgUrl}
        alt=""
        className="w-70 rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>
  );
};

export default Image;
