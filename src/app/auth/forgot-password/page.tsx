"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // const { error } = await supabase.auth.resetPasswordForEmail(email, {
    //   redirectTo: `${window.location.origin}/auth/reset-password`,
    // });
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 neural-mesh"
      style={{ background: "#0f131c" }}
    >
      {/* Background Glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#acc7ff]/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#acc7ff]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#acc7ff]">
                psychology
              </span>
            </div>
            <span
              className="text-xl font-black tracking-tight text-[#acc7ff]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              QuizCraft AI
            </span>
          </Link>
          <h1
            className="text-3xl font-black text-[#dfe2ee] tracking-tight"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            {sent ? "Check your email" : "Forgot password?"}
          </h1>
          <p
            className="text-[#8c909e] mt-2 text-sm"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {sent
              ? `We sent a reset link to ${email}`
              : "Enter your email and we'll send you a reset link"}
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 border border-[#424753]/30"
          style={{
            background: "#181c24",
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(79,142,247,0.05)",
          }}
        >
          {sent ? (
            /* ── Success State ── */
            <div className="flex flex-col items-center gap-5 py-2">
              <div
                className="w-16 h-16 rounded-2xl bg-[#acc7ff]/10 flex items-center justify-center"
                style={{ border: "1px solid #acc7ff30" }}
              >
                <span className="material-symbols-outlined text-[#acc7ff] text-3xl">
                  mark_email_read
                </span>
              </div>
              <div className="text-center">
                <p
                  className="text-[#c2c6d5] text-sm leading-relaxed"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Click the link in the email to reset your password. If you
                  don&apos;t see it, check your spam folder.
                </p>
              </div>
              <button
                onClick={() => {
                  setSent(false);
                  setEmail("");
                }}
                className="text-sm text-[#acc7ff] hover:text-[#dfe2ee] transition-colors"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Didn&apos;t receive it? Try again
              </button>
            </div>
          ) : (
            /* ── Form State ── */
            <>
              {error && (
                <div
                  className="mb-6 p-3 rounded-xl bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 text-[#ffb4ab] text-sm"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none transition-all"
                    style={{
                      background: "#0a0e16",
                      border: "1px solid #424753",
                      fontFamily: "Manrope, sans-serif",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#acc7ff";
                      e.target.style.boxShadow =
                        "0 0 0 1px #acc7ff, 0 0 10px rgba(172,199,255,0.1)";
                      e.target.style.background = "#1c2028";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#424753";
                      e.target.style.boxShadow = "none";
                      e.target.style.background = "#0a0e16";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-[#00285b] transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  style={{
                    background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
                    fontFamily: "Manrope, sans-serif",
                    boxShadow: "inset 0.5px 0.5px 0 rgba(255,255,255,0.2)",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-sm animate-spin">
                        refresh
                      </span>
                      Sending…
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        <p
          className="text-center mt-6 text-sm text-[#8c909e]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="text-[#acc7ff] hover:text-[#dfe2ee] font-semibold transition-colors"
          >
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
