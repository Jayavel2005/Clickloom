import React from "react";

const SoftBackdrop = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Top glow */}
      <div className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-gradient-to-tr from-purple-800/35 to-transparent rounded-full blur-3xl" />

      {/* Bottom glow */}
      <div className="absolute right-12 bottom-10 w-105 h-55 bg-gradient-to-bl from-purple-700/35 to-transparent rounded-full blur-2xl" />
    </div>
  );
};

export default SoftBackdrop;
