"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;

    // ── 1. رابط منتهي الصلاحية أو خطأ من Supabase ──
    const errorCode = searchParams.get("error_code");
    const errorType = searchParams.get("error");
    if (errorType === "access_denied" || errorCode === "otp_expired") {
      setError("expired");
      return;
    }

    // ── 2. PKCE flow (Supabase v2 الجديد) → ?code=xxx ──
    const code = searchParams.get("code");
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) setError("invalid");
        else setReady(true);
      });
      return;
    }

    // ── 3. Implicit flow (القديم) → #access_token=xxx&type=recovery ──
    if (hash && hash.includes("type=recovery")) {
      const params = new URLSearchParams(hash.substring(1));
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (access_token && refresh_token) {
        supabase.auth
          .setSession({ access_token, refresh_token })
          .then(({ error }) => {
            if (error) setError("invalid");
            else setReady(true);
          });
      } else {
        setError("invalid");
      }
      return;
    }

    // ── 4. Fallback: استنّى الـ event ──
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setDone(true);
      setTimeout(() => router.push("/auth/login"), 3000);
    }
    setLoading(false);
  };

  // ── حالة: رابط منتهي الصلاحية ──
  const isExpired = error === "expired";
  const isInvalid = error === "invalid";
  const isLinkError = isExpired || isInvalid;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 neural-mesh"
      style={{ background: "#0f131c" }}
    >
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
            {done
              ? "Password updated!"
              : isExpired
                ? "Link expired"
                : isInvalid
                  ? "Invalid link"
                  : "Set new password"}
          </h1>
          <p
            className="text-[#8c909e] mt-2 text-sm"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {done
              ? "Redirecting you to sign in…"
              : isExpired
                ? "This reset link has expired"
                : isInvalid
                  ? "This reset link is not valid"
                  : "Choose a strong password for your account"}
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
          {/* ── رابط منتهي أو غير صالح ── */}
          {isLinkError && (
            <div className="flex flex-col items-center gap-5 py-2">
              <div
                className="w-16 h-16 rounded-2xl bg-[#ffb4ab]/10 flex items-center justify-center"
                style={{ border: "1px solid #ffb4ab30" }}
              >
                <span className="material-symbols-outlined text-[#ffb4ab] text-3xl">
                  {isExpired ? "schedule" : "link_off"}
                </span>
              </div>
              <p
                className="text-[#c2c6d5] text-sm text-center leading-relaxed"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {isExpired
                  ? "Reset links expire after a short time for security reasons. Please request a new one and use it immediately."
                  : "This reset link is invalid or has already been used. Please request a new one."}
              </p>
              <Link
                href="/auth/forgot-password"
                className="w-full py-3.5 rounded-xl font-bold text-[#00285b] text-center transition-all hover:brightness-110"
                style={{
                  background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
                  fontFamily: "Manrope, sans-serif",
                  boxShadow: "inset 0.5px 0.5px 0 rgba(255,255,255,0.2)",
                }}
              >
                Request New Reset Link
              </Link>
            </div>
          )}

          {/* ── انتظار التحقق (لا يوجد hash ولا code بعد) ── */}
          {!isLinkError && !ready && !done && (
            <div className="flex flex-col items-center gap-4 py-6">
              <span className="material-symbols-outlined text-[#acc7ff] text-4xl animate-spin">
                refresh
              </span>
              <p
                className="text-[#8c909e] text-sm"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Verifying your reset link…
              </p>
            </div>
          )}

          {/* ── نجاح ── */}
          {done && (
            <div className="flex flex-col items-center gap-5 py-2">
              <div
                className="w-16 h-16 rounded-2xl bg-[#acc7ff]/10 flex items-center justify-center"
                style={{ border: "1px solid #acc7ff30" }}
              >
                <span className="material-symbols-outlined text-[#acc7ff] text-3xl">
                  check_circle
                </span>
              </div>
              <p
                className="text-[#c2c6d5] text-sm text-center"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Your password has been updated successfully. You will be
                redirected to the login page in a moment.
              </p>
            </div>
          )}

          {/* ── الفورم ── */}
          {ready && !done && (
            <>
              {error && error !== "expired" && error !== "invalid" && (
                <div
                  className="mb-6 p-3 rounded-xl bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 text-[#ffb4ab] text-sm"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleReset} className="flex flex-col gap-5">
                {/* New Password */}
                <div>
                  <label
                    className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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

                {/* Confirm Password */}
                <div>
                  <label
                    className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
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
                  {confirm.length > 0 && (
                    <p
                      className={`mt-1.5 text-xs ${
                        password === confirm
                          ? "text-[#b5e8a0]"
                          : "text-[#ffb4ab]"
                      }`}
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {password === confirm
                        ? "✓ Passwords match"
                        : "✗ Passwords do not match"}
                    </p>
                  )}
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
                      Updating…
                    </span>
                  ) : (
                    "Update Password"
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {!done && !isLinkError && (
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
        )}
      </div>
    </div>
  );
}
