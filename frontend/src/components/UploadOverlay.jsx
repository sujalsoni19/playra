import { X, Smile } from "lucide-react";
import { ClipLoader } from "react-spinners";

function UploadOverlay({ status, onClose, errorMessage }) {
  if (status === "idle") return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="relative bg-[#0B0B0C] border border-cyan-400 rounded-xl px-6 py-5 min-w-60">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-zinc-400 hover:text-zinc-200"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center gap-3">
          {status === "loading" && (
            <>
              <ClipLoader size={36} color="#22d3ee" />
              <p className="text-cyan-400 text-sm">Uploading…</p>
            </>
          )}

          {status === "success" && (
            <>
              <span className="text-4xl">😊</span>
              <p className="text-green-400 text-sm">Upload successful!!!</p>
            </>
          )}

          {status === "error" && (
            <>
              <span className="text-4xl">🙁</span>
              <p className="text-red-600 text-sm">
                {errorMessage || "Something went wrong. Please try again."}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadOverlay;
