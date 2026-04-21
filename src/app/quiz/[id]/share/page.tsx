"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import { QRCodeSVG } from "qrcode.react";
import type { Quiz } from "@/types";

export default function SharePage() {
  const params = useParams();
  const supabase = createClient();
  const quizId = params.id as string;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [copied, setCopied] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const shareUrl = quiz?.share_token
    ? `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/quiz/${quiz.share_token}/take`
    : "";

  useEffect(() => {
    supabase
      .from("quizzes")
      .select("*")
      .eq("id", quizId)
      .single()
      .then(({ data }) => {
        if (data) setQuiz(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePublish = async () => {
    setPublishing(true);
    await supabase
      .from("quizzes")
      .update({ status: "published" })
      .eq("id", quizId);
    setQuiz((prev) => (prev ? { ...prev, status: "published" } : null));
    setPublishing(false);
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#0f131c" }}
    >
      <Sidebar />

      <main
        className="flex-1 overflow-y-auto neural-mesh
          pt-[56px] pb-[72px] px-4
          sm:px-6
          md:pt-0 md:pb-0 md:p-8 lg:p-10"
        style={{ background: "#0a0e16" }}
      >
        <div className="max-w-2xl mx-auto py-6 sm:py-0">
          {/* ── Header ── */}
          <div className="mb-6 sm:mb-8">
            <h1
              className="text-2xl sm:text-3xl font-black text-[#dfe2ee] tracking-tight"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Share & Publish
            </h1>
            <p
              className="text-[#8c909e] mt-1 text-sm"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Distribute your quiz to students via link or QR code.
            </p>
          </div>

          {/* ── Status Card ── */}
          <div
            className="rounded-2xl p-4 sm:p-5 mb-5 border border-[#424753]/20 flex items-center justify-between gap-3"
            style={{ background: "#181c24" }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#acc7ff]/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#acc7ff] text-base sm:text-xl">
                  quiz
                </span>
              </div>
              <div className="min-w-0">
                <p
                  className="font-bold text-[#dfe2ee] text-sm truncate"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {quiz?.title || "Loading…"}
                </p>
                <p
                  className="text-xs text-[#8c909e]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {quiz?.questions_count || 0} questions · {quiz?.difficulty}
                </p>
              </div>
            </div>
            <span
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold shrink-0"
              style={{
                background:
                  quiz?.status === "published" ? "#45dfa420" : "#ffb95f20",
                color: quiz?.status === "published" ? "#45dfa4" : "#ffb95f",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              {quiz?.status || "loading"}
            </span>
          </div>

          {/* ── Not Published Warning ── */}
          {quiz?.status !== "published" && (
            <div className="rounded-2xl p-4 sm:p-5 mb-5 border border-[#ffb95f]/20 bg-[#ffb95f]/5">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#ffb95f] mt-0.5 shrink-0 text-xl">
                  warning
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold text-[#dfe2ee] text-sm mb-1"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Quiz is not published yet
                  </p>
                  <p
                    className="text-xs text-[#8c909e] mb-3"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Students won&apos;t be able to access the quiz until you
                    publish it.
                  </p>
                  <button
                    onClick={handlePublish}
                    disabled={publishing}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#00285b] transition-all hover:brightness-110 disabled:opacity-60"
                    style={{
                      background:
                        "linear-gradient(to bottom, #acc7ff, #508ff8)",
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    {publishing ? "Publishing…" : "Publish Now"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Share Link ── */}
          <div
            className="rounded-2xl p-4 sm:p-6 border border-[#424753]/20 mb-5"
            style={{ background: "#181c24" }}
          >
            <h3
              className="font-bold text-[#dfe2ee] mb-4 text-sm sm:text-base"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Share Link
            </h3>

            {/* Mobile: stacked, Desktop: side by side */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                readOnly
                value={shareUrl}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm text-[#8c909e] outline-none truncate"
                style={{
                  background: "#0a0e16",
                  border: "1px solid #424753",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              />
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl font-bold text-sm transition-all shrink-0"
                style={{
                  background: copied ? "#45dfa420" : "#262a33",
                  color: copied ? "#45dfa4" : "#c2c6d5",
                  border: `1px solid ${copied ? "#45dfa440" : "#424753"}`,
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                <span className="material-symbols-outlined text-sm">
                  {copied ? "check" : "content_copy"}
                </span>
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* ── QR Code ── */}
          {shareUrl && (
            <div
              className="rounded-2xl p-4 sm:p-6 border border-[#424753]/20 mb-5 flex flex-col items-center gap-4 sm:gap-5"
              style={{ background: "#181c24" }}
            >
              <h3
                className="font-bold text-[#dfe2ee] self-start text-sm sm:text-base"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                QR Code
              </h3>

              <div className="p-4 sm:p-5 rounded-2xl bg-white">
                <QRCodeSVG
                  value={shareUrl}
                  size={window?.innerWidth < 400 ? 140 : 180}
                  bgColor="#ffffff"
                  fgColor="#0f131c"
                />
              </div>

              <p
                className="text-xs text-[#8c909e] text-center max-w-xs"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Students can scan this QR code to access the quiz directly on
                their device.
              </p>

              <button
                onClick={() => {
                  const svg = document.querySelector("svg");
                  if (!svg) return;
                  const blob = new Blob([svg.outerHTML], {
                    type: "image/svg+xml",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `quizcraft-qr-${quizId}.svg`;
                  a.click();
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-[#c2c6d5] bg-[#262a33] hover:bg-[#31353e] transition-all"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                <span className="material-symbols-outlined text-sm">
                  download
                </span>
                Download QR Code
              </button>
            </div>
          )}

          {/* ── Access Settings ── */}
          <div
            className="rounded-2xl p-4 sm:p-6 border border-[#424753]/20"
            style={{ background: "#181c24" }}
          >
            <h3
              className="font-bold text-[#dfe2ee] mb-4 text-sm sm:text-base"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Access Settings
            </h3>
            <div className="flex flex-col gap-0">
              {[
                {
                  icon: "schedule",
                  label: "Time Limit",
                  value: quiz?.time_limit
                    ? `${quiz.time_limit} minutes`
                    : "Unlimited",
                },
                {
                  icon: "grade",
                  label: "Pass Mark",
                  value: quiz?.pass_mark ? `${quiz.pass_mark}%` : "60%",
                },
                {
                  icon: "quiz",
                  label: "Questions",
                  value: `${quiz?.questions_count || 0} questions`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="material-symbols-outlined text-sm text-[#8c909e]">
                      {item.icon}
                    </span>
                    <span
                      className="text-xs sm:text-sm text-[#c2c6d5]"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <span
                    className="text-xs sm:text-sm font-bold text-[#dfe2ee]"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
