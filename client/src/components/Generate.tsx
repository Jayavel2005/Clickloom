import { useState } from "react";
import SoftBackdrop from "./SoftBackdrop";
import PreviewPanel from "./PreviewPanel";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loader2, Sparkle } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { successNotify } from "../utils/notify.util.ts";

const Generate = () => {
    const [title, setTitle] = useState("");
    const [additionalDetails, setAdditionalDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [promptLoading, setPromptLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [showPopOver, setShowPopOver] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const { width, height } = useWindowSize();
    const navigate = useNavigate();
    const { isAuthenticated, user, updateCredits, updateImages } = useAuth();

    const isDisabled = promptLoading || (user?.credits ?? 0) <= 0;

    /* ---------------- Generate Image ---------------- */

    async function generateImage() {
        try {
            setLoading(true);

            const finalPrompt = `${title}\n${additionalDetails}`.trim();

            const response = await fetch(
                "http://localhost:5000/api/v1/images/generate",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: finalPrompt }),
                    credentials: "include",
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to generate image");
            }

            // ✅ success only
            setImgUrl(data.image);
            updateCredits(data.remainingCredits);
            updateImages(data.images);

            setShowConfetti(true);
            successNotify("Image Generated Successfully 🎉");

            setTimeout(() => {
                setShowConfetti(false);
            }, 5000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setTitle("");
            setAdditionalDetails("");
        }
    }

    /* ---------------- Refine Prompt ---------------- */

    async function refinePrompt() {
        if (!title.trim()) return;

        setPromptLoading(true);
        try {
            const response = await fetch(
                "http://localhost:5000/api/v1/images/refine-prompt",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: title }),
                    credentials: "include",
                }
            );

            const data = await response.json();
            setTitle(data.refinedPrompt);
        } catch (e) {
            console.error(e);
        } finally {
            setPromptLoading(false);
        }
    }

    /* ---------------- Download ---------------- */

    function downloadImage() {
        if (!user?.images?.length) return;
        const index = user.images.length - 1;
        window.location.href = `http://localhost:5000/api/v1/images/download/${index}`;
    }

    /* ---------------- UI ---------------- */

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return (
        <>
            <SoftBackdrop />

            {showConfetti && !prefersReducedMotion && (
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={120}
                    gravity={0.22}
                    recycle={false}
                    colors={["#a855f7", "#c084fc", "#f472b6"]}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        pointerEvents: "none",
                        zIndex: 50,
                    }}
                />
            )}

            <div className="pt-24 min-h-screen">
                {isAuthenticated ? (
                    <main className="mx-auto max-w-6xl px-4 py-8">
                        <div className="grid gap-8 lg:grid-cols-[450px_1fr]">
                            {/* LEFT PANEL */}
                            <div className="space-y-6 rounded-2xl border border-white/10 bg-white/8 p-6">
                                <h2 className="text-xl font-semibold text-zinc-100">
                                    Create Images from Imagination
                                </h2>

                                {/* Prompt Input */}
                                <div className="relative">
                                    {/* Tooltip */}
                                    <div
                                        className={`
                      absolute -left-36 bottom-3
                      rounded-md px-3 py-1 text-xs
                      bg-purple-900/90 text-purple-100
                      border border-purple-500/30
                      backdrop-blur
                      shadow-lg shadow-purple-900/50
                      transition-all duration-200
                      pointer-events-none
                      ${
                                            showPopOver
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-1"
                                        }
                    `}
                                    >
                                        {promptLoading ? "Refining Prompt ⚡" : "Refine Prompt ✨"}
                                    </div>

                                    {/* Refine Button */}
                                    <button
                                        disabled={isDisabled}
                                        onMouseEnter={() => !isDisabled && setShowPopOver(true)}
                                        onMouseLeave={() => setShowPopOver(false)}
                                        onClick={!isDisabled ? refinePrompt : undefined}
                                        className={`
                      absolute left-0 bottom-1
                      flex items-center justify-center
                      p-1.5 rounded-md
                      transition-all duration-300 ease-out
                      ${
                                            isDisabled
                                                ? "cursor-not-allowed opacity-60 bg-purple-500/5"
                                                : "border border-purple-500/40 bg-purple-500/10 backdrop-blur hover:bg-purple-500/20 hover:border-purple-400 hover:scale-105 group"
                                        }
                    `}
                                    >
                                        {promptLoading ? (
                                            <Loader2
                                                size={18}
                                                className="text-purple-400 animate-spin"
                                            />
                                        ) : (
                                            <Sparkle
                                                size={18}
                                                className="
                          text-purple-400
                          transition-transform duration-300
                          group-hover:rotate-12
                          [filter:drop-shadow(0_0_6px_rgba(168,85,247,0.8))]
                          group-hover:[filter:drop-shadow(0_0_12px_rgba(168,85,247,1))]
                        "
                                            />
                                        )}
                                    </button>

                                    <textarea
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        rows={9}
                                        placeholder="Describe your image"
                                        className="
                      w-full rounded-lg bg-white/5
                      p-4 pr-12 text-white
                      placeholder:text-white/40
                      focus:outline-none
                      focus:ring-1 focus:ring-purple-500/40
                    "
                                    />
                                </div>

                                <textarea
                                    value={additionalDetails}
                                    onChange={(e) => setAdditionalDetails(e.target.value)}
                                    rows={4}
                                    placeholder="Additional details (optional)"
                                    className="w-full rounded-lg bg-white/5 p-3 text-white"
                                />

                                <button
                                    disabled={loading || !title || (user?.credits ?? 0) <= 0}
                                    onClick={generateImage}
                                    className="w-full rounded-xl bg-purple-600 py-3 text-white disabled:opacity-50"
                                >
                                    {loading
                                        ? "Generating…"
                                        : (user?.credits ?? 0) <= 0
                                            ? "No credits left"
                                            : "Generate Image"}
                                </button>

                                <button
                                    disabled={!user?.images?.length}
                                    onClick={downloadImage}
                                    className="w-full rounded-xl border border-purple-400 py-3 text-purple-300 disabled:opacity-50"
                                >
                                    Download Image
                                </button>

                                <p className="text-sm text-zinc-400 text-center">
                                    Credits left:{" "}
                                    <span className="text-purple-400 font-medium">
                    {user?.credits ?? 0}
                  </span>
                                </p>
                            </div>

                            {/* RIGHT PANEL */}
                            <PreviewPanel loading={loading} imageUrl={imgUrl} />
                        </div>
                    </main>
                ) : (
                    <div className="flex items-center justify-center min-h-[70vh]">
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
                                Please sign in to generate and manage your images.
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
            </div>
        </>
    );
};

export default Generate;
