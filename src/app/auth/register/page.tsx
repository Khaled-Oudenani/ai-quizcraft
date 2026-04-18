"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => router.push("/dashboard"), 1500);
    }
  };

  const inputStyle = {
    background: "#0a0e16",
    border: "1px solid #424753",
    fontFamily: "Manrope, sans-serif",
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 neural-mesh" style={{ background: "#0f131c" }}>
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#45dfa4]/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#acc7ff]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#acc7ff]">psychology</span>
            </div>
            <span className="text-xl font-black tracking-tight text-[#acc7ff]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              QuizCraft AI
            </span>
          </Link>
          <h1 className="text-3xl font-black text-[#dfe2ee] tracking-tight" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
            Create your account
          </h1>
          <p className="text-[#8c909e] mt-2 text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>
            Start generating quizzes for free — no credit card required
          </p>
        </div>

        <div className="rounded-2xl p-8 border border-[#424753]/30" style={{ background: "#181c24", boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(79,142,247,0.05)" }}>
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 text-[#ffb4ab] text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-3 rounded-xl bg-[#45dfa4]/10 border border-[#45dfa4]/20 text-[#45dfa4] text-sm flex items-center gap-2" style={{ fontFamily: "Manrope, sans-serif" }}>
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Account created! Redirecting to dashboard…
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            {[
              { label: "Full Name", type: "text", value: fullName, setter: setFullName, placeholder: "Jane Smith" },
              { label: "Email Address", type: "email", value: email, setter: setEmail, placeholder: "you@example.com" },
              { label: "Password", type: "password", value: password, setter: setPassword, placeholder: "Min. 8 characters" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  required
                  minLength={field.type === "password" ? 8 : undefined}
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#acc7ff";
                    e.target.style.boxShadow = "0 0 0 1px #acc7ff, 0 0 10px rgba(172,199,255,0.1)";
                    e.target.style.background = "#1c2028";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#424753";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "#0a0e16";
                  }}
                />
              </div>
            ))}

            <p className="text-xs text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>
              By signing up, you agree to our{" "}
              <a href="#" className="text-[#acc7ff] hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-[#acc7ff] hover:underline">Privacy Policy</a>.
            </p>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3.5 rounded-xl font-bold text-[#00285b] transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              style={{
                background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
                fontFamily: "Manrope, sans-serif",
                boxShadow: "inset 0.5px 0.5px 0 rgba(255,255,255,0.2)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                  Creating account…
                </span>
              ) : "Create Free Account"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#acc7ff] hover:text-[#dfe2ee] font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
