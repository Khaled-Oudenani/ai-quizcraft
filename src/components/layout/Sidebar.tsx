// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";

// const navItems = [
//   { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
//   { icon: "inventory_2", label: "My Quizzes", href: "/dashboard/quizzes" },
//   { icon: "psychology", label: "AI Lab", href: "/quiz/create" },
//   { icon: "leaderboard", label: "Analytics", href: "/dashboard/analytics" },
//   { icon: "group", label: "Students", href: "/dashboard/students" },
// ];

// const footerItems = [
//   { icon: "help", label: "Support", href: "#" },
//   { icon: "archive", label: "Archive", href: "#" },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const supabase = createClient();

//   const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     router.push("/");
//     router.refresh();
//   };

//   return (
//     <nav
//       className="hidden md:flex flex-col h-screen w-64 py-6 shrink-0 relative z-10"
//       style={{
//         background: "#0a0e16",
//         borderRight: "1px solid rgba(255,255,255,0.05)",
//       }}
//     >
//       {/* Header */}
//       <div className="px-6 mb-8">
//         <Link href="/dashboard" className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-lg bg-[#acc7ff]/20 flex items-center justify-center">
//             <span className="material-symbols-outlined text-[#acc7ff] text-base">psychology</span>
//           </div>
//           <div>
//             <span
//               className="text-[#acc7ff] font-black tracking-wider text-base uppercase"
//               style={{ fontFamily: "Space Grotesk, sans-serif" }}
//             >
//               The Academy
//             </span>
//             <p className="text-[#424753] text-xs font-medium" style={{ fontFamily: "Manrope, sans-serif" }}>
//               AI-Powered Learning
//             </p>
//           </div>
//         </Link>
//       </div>

//       {/* Nav Links */}
//       <div className="flex-1 px-4 space-y-1 overflow-y-auto">
//         {navItems.map((item) => {
//           const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
//                 isActive
//                   ? "text-[#acc7ff] translate-x-1"
//                   : "text-[#424753] hover:text-[#c2c6d5] hover:bg-white/5"
//               }`}
//               style={{
//                 fontFamily: "Manrope, sans-serif",
//                 background: isActive ? "rgba(172,199,255,0.1)" : undefined,
//                 borderRight: isActive ? "3px solid #acc7ff" : "3px solid transparent",
//                 fontWeight: isActive ? 700 : 500,
//               }}
//             >
//               <span className="material-symbols-outlined text-[1.25rem]">{item.icon}</span>
//               {item.label}
//             </Link>
//           );
//         })}
//       </div>

//       {/* New Generation CTA */}
//       <div className="px-4 mb-4">
//         <Link
//           href="/quiz/create"
//           className="w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all hover:brightness-110"
//           style={{
//             background: "#262a33",
//             border: "1px solid rgba(66,71,83,0.5)",
//             color: "#c2c6d5",
//             fontFamily: "Manrope, sans-serif",
//           }}
//         >
//           <span className="material-symbols-outlined text-sm text-[#acc7ff]">bolt</span>
//           New Generation
//         </Link>
//       </div>

//       {/* Footer Links */}
//       <div className="px-4 pt-4 space-y-1 border-t border-white/5">
//         {footerItems.map((item) => (
//           <a
//             key={item.label}
//             href={item.href}
//             className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#424753] hover:text-[#c2c6d5] hover:bg-white/5 transition-all"
//             style={{ fontFamily: "Manrope, sans-serif" }}
//           >
//             <span className="material-symbols-outlined text-[1.25rem]">{item.icon}</span>
//             {item.label}
//           </a>
//         ))}
//         <button
//           onClick={handleSignOut}
//           className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#424753] hover:text-[#ffb4ab] hover:bg-[#ffb4ab]/5 transition-all text-left"
//           style={{ fontFamily: "Manrope, sans-serif" }}
//         >
//           <span className="material-symbols-outlined text-[1.25rem]">logout</span>
//           Sign Out
//         </button>
//       </div>
//     </nav>
//   );
// }

// add logout cinfirmation modal

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

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const [showConfirm, setShowConfirm] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(10,14,22,0.85)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-7 flex flex-col gap-5 border border-[#424753]/30"
            style={{
              background: "#181c24",
              boxShadow:
                "0 24px 48px rgba(0,0,0,0.5), 0 0 30px rgba(255,180,171,0.05)",
            }}
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#ffb4ab]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-[#ffb4ab]">
                logout
              </span>
            </div>

            {/* Text */}
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

            {/* Actions */}
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

      {/* ─── Sidebar ─── */}
      <nav
        className="hidden md:flex flex-col h-screen w-64 py-6 shrink-0 relative z-10"
        style={{
          background: "#0a0e16",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Header */}
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

          {/* Sign Out — opens confirmation modal */}
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
