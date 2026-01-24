import React from "react";
import { Image, Loader2 } from "lucide-react";

interface PreviewPanelProps {
  imageUrl?: string;
  loading: boolean;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ loading, imageUrl }) => {
  const showImage = !!imageUrl && !loading;
  const showEmpty = !imageUrl && !loading;

  return (
    <div className="flex w-full items-center justify-center">
      {/* Canvas */}
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-4">
        {/* Content */}
        <div className="relative flex min-h-[500px] items-center justify-center rounded-xl bg-black/20 overflow-hidden">
          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center gap-3 text-zinc-400">
              <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
              <p className="text-sm">Hang in there, magic takes a moment ✨</p>
            </div>
          )}

          {/* Image preview */}
          {showImage && (
            <img
              src={imageUrl}
              alt="AI generated preview"
              className="h-full w-full rounded-xl object-cover shadow-lg transition-opacity duration-300"
            />
          )}

          {/* Empty state */}
          {showEmpty && (
            <div className="flex flex-col items-center gap-3 text-zinc-400">
              <Image className="h-8 w-8 text-zinc-500" />
              <p className="text-sm text-center">
                Your AI-generated image will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
