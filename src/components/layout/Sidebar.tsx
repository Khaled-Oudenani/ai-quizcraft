"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
  { icon: "inventory_2", label: "My Quizzes", href: "/dashboard/quizzes" },
  { icon: "psychology", label: "AI Lab", href: "/quiz/create" },
  { icon: "leaderboard", label: "Analytics", href: "/dashboard/analytics" },
  { icon: "group", label: "Students", href: "/dashboard/students" },
];

const footerItems = [
  { icon: "help", label: "Support", href: "#" },
  { icon: "archive", label: "Archive", href: "#" },
];

const mobileNavItems = [
  { icon: "dashboard", label: "Home", href: "/dashboard" },
  { icon: "inventory_2", label: "Quizzes", href: "/dashboard/quizzes" },
  { icon: "psychology", label: "AI Lab", href: "/quiz/create" },
  { icon: "leaderboard", label: "Analytics", href: "/dashboard/analytics" },
  { icon: "group", label: "Students", href: "/dashboard/students" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const [showConfirm, setShowConfirm] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* ─── Sign-out Confirmation Modal ─── */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{
            background: "rgba(10,14,22,0.85)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6 sm:p-7 flex flex-col gap-5 border border-[#424753]/30"
            style={{
              background: "#181c24",
              boxShadow:
                "0 24px 48px rgba(0,0,0,0.5), 0 0 30px rgba(255,180,171,0.05)",
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-[#ffb4ab]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-[#ffb4ab]">
                logout
              </span>
            </div>
            <div>
              <h3
                className="text-lg font-black text-[#dfe2ee] mb-1"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Sign out?
              </h3>
              <p
                className="text-sm text-[#8c909e] leading-relaxed"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                You will be redirected to the home page. Any unsaved changes
                will be lost.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={signingOut}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-[#c2c6d5] hover:text-[#dfe2ee] transition-all disabled:opacity-40"
                style={{
                  background: "#262a33",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-110 disabled:opacity-60 flex items-center justify-center gap-2"
                style={{
                  background: "#ffb4ab",
                  color: "#690005",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {signingOut ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">
                      refresh
                    </span>
                    Signing out…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">
                      logout
                    </span>
                    Sign Out
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════
          MOBILE: Top Header
      ═══════════════════════════════════ */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 border-b border-white/5"
        style={{ background: "#0a0e16" }}
      >
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#acc7ff]/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#acc7ff] text-sm">
              psychology
            </span>
          </div>
          <span
            className="text-sm font-black tracking-wider text-[#acc7ff] uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            The Academy
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/quiz/create"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#00285b]"
            style={{
              background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            <span className="material-symbols-outlined text-xs">bolt</span>
            New
          </Link>
          {/* More options button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-all"
          >
            <span className="material-symbols-outlined text-[#8c909e]">
              {mobileMenuOpen ? "close" : "more_vert"}
            </span>
          </button>
        </div>
      </header>

      {/* MOBILE: Dropdown More Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="md:hidden fixed top-14 right-3 z-40 w-52 rounded-2xl overflow-hidden border border-[#424753]/30 shadow-2xl"
            style={{ background: "#181c24" }}
          >
            {footerItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-[#8c909e] hover:text-[#c2c6d5] hover:bg-white/5 transition-all border-b border-white/5"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                <span className="material-symbols-outlined text-base">
                  {item.icon}
                </span>
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowConfirm(true);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#ffb4ab] hover:bg-[#ffb4ab]/5 transition-all text-left"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              <span className="material-symbols-outlined text-base">
                logout
              </span>
              Sign Out
            </button>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════
          MOBILE: Bottom Navigation Bar
      ═══════════════════════════════════ */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-1 py-1.5 border-t border-white/5"
        style={{ background: "#0a0e16" }}
      >
        {mobileNavItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all"
              style={{ minWidth: "52px" }}
            >
              <span
                className="material-symbols-outlined transition-all"
                style={{
                  fontSize: "1.3rem",
                  color: isActive ? "#acc7ff" : "#424753",
                }}
              >
                {item.icon}
              </span>
              <span
                className="text-[9px] font-bold leading-tight"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  color: isActive ? "#acc7ff" : "#424753",
                }}
              >
                {item.label}
              </span>
              {isActive && (
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: "#acc7ff" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ═══════════════════════════════════
          DESKTOP: Sidebar
      ═══════════════════════════════════ */}
      <nav
        className="hidden md:flex flex-col h-screen w-64 py-6 shrink-0 relative z-10"
        style={{
          background: "#0a0e16",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Logo */}
        <div className="px-6 mb-8">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#acc7ff]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#acc7ff] text-base">
                psychology
              </span>
            </div>
            <div>
              <span
                className="text-[#acc7ff] font-black tracking-wider text-base uppercase"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                The Academy
              </span>
              <p
                className="text-[#424753] text-xs font-medium"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                AI-Powered Learning
              </p>
            </div>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-[#acc7ff] translate-x-1"
                    : "text-[#424753] hover:text-[#c2c6d5] hover:bg-white/5"
                }`}
                style={{
                  fontFamily: "Manrope, sans-serif",
                  background: isActive ? "rgba(172,199,255,0.1)" : undefined,
                  borderRight: isActive
                    ? "3px solid #acc7ff"
                    : "3px solid transparent",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                <span className="material-symbols-outlined text-[1.25rem]">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* New Generation CTA */}
        <div className="px-4 mb-4">
          <Link
            href="/quiz/create"
            className="w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all hover:brightness-110"
            style={{
              background: "#262a33",
              border: "1px solid rgba(66,71,83,0.5)",
              color: "#c2c6d5",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            <span className="material-symbols-outlined text-sm text-[#acc7ff]">
              bolt
            </span>
            New Generation
          </Link>
        </div>

        {/* Footer Links */}
        <div className="px-4 pt-4 space-y-1 border-t border-white/5">
          {footerItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#424753] hover:text-[#c2c6d5] hover:bg-white/5 transition-all"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              <span className="material-symbols-outlined text-[1.25rem]">
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#424753] hover:text-[#ffb4ab] hover:bg-[#ffb4ab]/5 transition-all text-left"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            <span className="material-symbols-outlined text-[1.25rem]">
              logout
            </span>
            Sign Out
          </button>
        </div>
      </nav>
    </>
  );
}
