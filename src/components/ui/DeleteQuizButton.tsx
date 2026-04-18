"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DeleteQuizButton({ quizId }: { quizId: string }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.from("quizzes").delete().eq("id", quizId);
    setLoading(false);
    setShowConfirm(false);
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8c909e] hover:text-red-400 hover:bg-red-400/10 transition-all"
      >
        <span className="material-symbols-outlined text-sm cursor-pointer">
          delete
        </span>
      </button>

      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="rounded-2xl p-6 border border-[#424753]/30 shadow-2xl w-80"
            style={{ background: "#181c24" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "rgba(239,68,68,0.1)" }}
            >
              <span className="material-symbols-outlined text-red-400">
                delete_forever
              </span>
            </div>
            <h3
              className="font-bold text-[#dfe2ee] mb-1"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Delete Quiz?
            </h3>
            <p
              className="text-sm text-[#8c909e] mb-5"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              This action cannot be undone. The quiz will be permanently
              deleted.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-[#8c909e] transition-all hover:text-[#dfe2ee]"
                style={{
                  background: "#262a33",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-50"
                style={{
                  background: "linear-gradient(to bottom, #f87171, #dc2626)",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
