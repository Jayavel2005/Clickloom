const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative z-10 max-w-3xl w-full rounded-2xl bg-zinc-900 p-4">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-white/70 hover:text-white"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
