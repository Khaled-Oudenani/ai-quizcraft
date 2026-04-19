// import Link from "next/link";

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-[#0f131c] text-[#dfe2ee] neural-mesh overflow-x-hidden">
//       {/* Navigation */}
//       <header className="fixed top-0 w-full z-50 bg-[#0f131c]/60 backdrop-blur-xl border-b border-white/5">
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-8 py-4">
//           <div className="flex items-center gap-8">
//             <Link href="/" className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded-lg bg-[#acc7ff]/20 flex items-center justify-center">
//                 <span className="material-symbols-outlined text-[#acc7ff] text-sm">psychology</span>
//               </div>
//               <span className="text-lg font-black tracking-tight text-[#acc7ff]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
//                 QuizCraft AI
//               </span>
//             </Link>
//             <nav className="hidden md:flex gap-6">
//               {["Features", "Pricing", "Academy", "Resources"].map((item) => (
//                 <a key={item} href="#" className="text-sm text-[#8c909e] hover:text-[#dfe2ee] transition-colors" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
//                   {item}
//                 </a>
//               ))}
//             </nav>
//           </div>
//           <div className="flex items-center gap-3">
//             <Link href="/auth/login" className="px-4 py-2 text-sm text-[#c2c6d5] hover:text-[#dfe2ee] transition-colors" style={{ fontFamily: "Manrope, sans-serif" }}>
//               Sign In
//             </Link>
//             <Link
//               href="/auth/register"
//               className="px-5 py-2.5 rounded-lg text-sm font-bold text-[#00285b] transition-all hover:brightness-110"
//               style={{
//                 background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
//                 fontFamily: "Manrope, sans-serif",
//                 boxShadow: "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 20px rgba(79,142,247,0.3)",
//               }}
//             >
//               Get Started Free
//             </Link>
//           </div>
//         </div>
//       </header>

//       <main className="pt-28">
//         {/* Hero Section */}
//         <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-32 relative">
//           <div className="absolute inset-0 bg-gradient-to-tr from-[#acc7ff]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             {/* Left: Content */}
//             <div className="relative z-10">
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#45dfa4]/10 border border-[#45dfa4]/20 text-[#45dfa4] text-xs font-bold mb-8 uppercase tracking-widest" style={{ fontFamily: "Manrope, sans-serif" }}>
//                 <span className="w-2 h-2 rounded-full bg-[#45dfa4] animate-pulse" />
//                 AI Model 2.0 — Now Live
//               </div>
//               <h1
//                 className="text-[3.5rem] leading-[1.1] tracking-[-0.02em] mb-6 max-w-2xl text-gradient"
//                 style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
//               >
//                 Turn any document into an interactive quiz in seconds
//               </h1>
//               <p className="text-lg text-[#c2c6d5] mb-10 max-w-xl leading-relaxed" style={{ fontFamily: "Manrope, sans-serif" }}>
//                 AI-powered quiz generation for teachers, trainers, and HR teams. Stop writing questions manually — let our Neural Engine build comprehensive assessments from your PDFs, docs, and presentations.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link
//                   href="/auth/register"
//                   className="relative overflow-hidden group px-8 py-4 rounded-xl font-bold text-[#00285b] transition-all hover:brightness-110"
//                   style={{
//                     background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
//                     fontFamily: "Manrope, sans-serif",
//                     boxShadow: "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 20px rgba(79,142,247,0.3)",
//                   }}
//                 >
//                   <span className="relative z-10">Start for free</span>
//                   <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
//                 </Link>
//                 <button className="px-8 py-4 rounded-xl font-bold text-[#8c909e] hover:text-[#dfe2ee] border border-[#424753]/30 hover:bg-[#31353e]/30 transition-all" style={{ fontFamily: "Manrope, sans-serif" }}>
//                   View Demo →
//                 </button>
//               </div>

//               {/* Social proof */}
//               <div className="mt-12 flex items-center gap-6">
//                 <div className="flex -space-x-2">
//                   {["#acc7ff", "#45dfa4", "#ffb95f", "#c084fc"].map((color, i) => (
//                     <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0f131c] flex items-center justify-center text-xs font-bold" style={{ background: color + "30", color, borderColor: "#0f131c" }}>
//                       {["T", "H", "S", "R"][i]}
//                     </div>
//                   ))}
//                 </div>
//                 <p className="text-sm text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>
//                   <span className="text-[#dfe2ee] font-semibold">2,400+</span> educators already using QuizCraft
//                 </p>
//               </div>
//             </div>

//             {/* Right: Hero Mockup */}
//             <div className="relative w-full aspect-square max-w-[560px] mx-auto lg:mx-0">
//               <div className="absolute inset-0 bg-gradient-to-tr from-[#acc7ff]/10 to-[#45dfa4]/5 rounded-full blur-3xl" />
//               <div
//                 className="absolute inset-4 rounded-2xl p-6 flex flex-col gap-5 overflow-hidden border border-[#424753]/20"
//                 style={{
//                   background: "rgba(49,53,62,0.6)",
//                   backdropFilter: "blur(20px)",
//                   boxShadow: "inset 0.5px 0.5px 0 rgba(66,71,83,0.3), 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(79,142,247,0.05)",
//                   transform: "rotate(-2deg)",
//                   transition: "transform 0.5s ease",
//                 }}
//               >
//                 <div className="flex justify-between items-center border-b border-white/5 pb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded bg-[#acc7ff]/20 flex items-center justify-center">
//                       <span className="material-symbols-outlined text-[#acc7ff] text-sm">description</span>
//                     </div>
//                     <div className="h-4 w-36 bg-[#262a33] rounded animate-pulse" />
//                   </div>
//                   <div className="h-6 w-24 bg-[#45dfa4]/10 rounded-full border border-[#45dfa4]/20 flex items-center justify-center">
//                     <span className="text-[10px] text-[#45dfa4] font-bold uppercase" style={{ fontFamily: "Manrope, sans-serif" }}>Generating…</span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-3">
//                   <div className="h-20 bg-[#181c24] rounded-xl p-4 flex flex-col gap-2">
//                     {[3, 4, 2].map((w, i) => (
//                       <div key={i} className="h-2.5 rounded bg-[#262a33]" style={{ width: `${w * 25}%` }} />
//                     ))}
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     {[
//                       { icon: "check_circle", color: "#acc7ff", val: "15", label: "Questions Drafted" },
//                       { icon: "lightbulb", color: "#ffb95f", val: "High", label: "Complexity" },
//                     ].map((card) => (
//                       <div
//                         key={card.label}
//                         className="rounded-xl p-4 flex flex-col justify-between h-28 border"
//                         style={{
//                           background: "rgba(49,53,62,0.6)",
//                           backdropFilter: "blur(20px)",
//                           borderColor: card.color + "20",
//                         }}
//                       >
//                         <span className="material-symbols-outlined text-xl" style={{ color: card.color }}>{card.icon}</span>
//                         <div>
//                           <div className="text-2xl font-black text-[#dfe2ee]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{card.val}</div>
//                           <div className="text-[10px] text-[#8c909e] uppercase tracking-wider mt-0.5" style={{ fontFamily: "Manrope, sans-serif" }}>{card.label}</div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex gap-2 mt-auto">
//                   {["MCQ", "True/False", "Short Answer"].map((tag) => (
//                     <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#acc7ff]/10 text-[#acc7ff] border border-[#acc7ff]/20" style={{ fontFamily: "Manrope, sans-serif" }}>
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
//           <div className="text-center mb-16">
//             <h2 className="text-[2.5rem] font-black tracking-tight mb-4 text-gradient" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
//               Everything you need to assess better
//             </h2>
//             <p className="text-[#8c909e] max-w-xl mx-auto" style={{ fontFamily: "Manrope, sans-serif" }}>
//               From upload to publish in under 60 seconds. QuizCraft handles the complexity so you can focus on teaching.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               { icon: "upload_file", color: "#acc7ff", title: "Document Upload", desc: "Upload PDFs, DOCX, or paste text. Our AI parses and understands your content instantly." },
//               { icon: "psychology", color: "#45dfa4", title: "AI Question Generation", desc: "Gemini AI generates diverse, high-quality questions: MCQ, True/False, and short answers." },
//               { icon: "edit_note", color: "#ffb95f", title: "Smart Question Editor", desc: "Refine AI-generated questions with our intuitive editor. Reorder, modify, or regenerate any question." },
//               { icon: "share", color: "#c084fc", title: "One-Click Publishing", desc: "Publish with a shareable link or QR code. Control access, set time limits, and pass marks." },
//               { icon: "leaderboard", color: "#acc7ff", title: "Real-Time Analytics", desc: "Track performance with detailed charts. See question-level insights and identify learning gaps." },
//               { icon: "devices", color: "#45dfa4", title: "Student-Friendly View", desc: "Distraction-free, mobile-responsive quiz interface. Students need no account to take a quiz." },
//             ].map((feature) => (
//               <div
//                 key={feature.title}
//                 className="rounded-2xl p-6 flex flex-col gap-4 border border-[#424753]/20 hover:border-[#424753]/40 transition-all group"
//                 style={{ background: "#181c24" }}
//               >
//                 <div
//                   className="w-10 h-10 rounded-xl flex items-center justify-center"
//                   style={{ background: feature.color + "15" }}
//                 >
//                   <span className="material-symbols-outlined" style={{ color: feature.color }}>{feature.icon}</span>
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-[#dfe2ee] mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{feature.title}</h3>
//                   <p className="text-sm text-[#8c909e] leading-relaxed" style={{ fontFamily: "Manrope, sans-serif" }}>{feature.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Pricing Section */}
//         <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
//           <div className="text-center mb-16">
//             <h2 className="text-[2.5rem] font-black tracking-tight mb-4 text-gradient" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
//               Simple, transparent pricing
//             </h2>
//           </div>
//           <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
//             {[
//               {
//                 plan: "Free", price: "€0", period: "/month", color: "#8c909e",
//                 features: ["5 quizzes/month", "Up to 10 questions", "Basic analytics", "Share links"],
//                 cta: "Get Started",
//               },
//               {
//                 plan: "Pro", price: "€19", period: "/month", color: "#acc7ff", featured: true,
//                 features: ["Unlimited quizzes", "Unlimited questions", "Advanced analytics", "QR codes", "Custom branding", "Priority support"],
//                 cta: "Start Pro Trial",
//               },
//               {
//                 plan: "Enterprise", price: "€79", period: "/month", color: "#45dfa4",
//                 features: ["Everything in Pro", "Team collaboration", "SSO / SAML", "API access", "SLA guarantee", "Dedicated support"],
//                 cta: "Contact Sales",
//               },
//             ].map((tier) => (
//               <div
//                 key={tier.plan}
//                 className={`rounded-2xl p-7 flex flex-col gap-5 border relative ${tier.featured ? "border-[#acc7ff]/30" : "border-[#424753]/20"}`}
//                 style={{
//                   background: tier.featured ? "rgba(172,199,255,0.05)" : "#181c24",
//                   boxShadow: tier.featured ? "0 0 40px rgba(172,199,255,0.08)" : undefined,
//                 }}
//               >
//                 {tier.featured && (
//                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#acc7ff] text-[#001a40] text-xs font-black" style={{ fontFamily: "Manrope, sans-serif" }}>
//                     MOST POPULAR
//                   </div>
//                 )}
//                 <div>
//                   <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: tier.color, fontFamily: "Manrope, sans-serif" }}>{tier.plan}</p>
//                   <div className="flex items-baseline gap-1">
//                     <span className="text-4xl font-black text-[#dfe2ee]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{tier.price}</span>
//                     <span className="text-[#8c909e] text-sm">{tier.period}</span>
//                   </div>
//                 </div>
//                 <ul className="flex flex-col gap-2.5 flex-1">
//                   {tier.features.map((f) => (
//                     <li key={f} className="flex items-center gap-2.5 text-sm text-[#c2c6d5]" style={{ fontFamily: "Manrope, sans-serif" }}>
//                       <span className="material-symbols-outlined text-sm" style={{ color: tier.color }}>check</span>
//                       {f}
//                     </li>
//                   ))}
//                 </ul>
//                 <Link
//                   href="/auth/register"
//                   className="w-full py-3 rounded-xl font-bold text-sm text-center transition-all hover:brightness-110"
//                   style={{
//                     background: tier.featured ? "linear-gradient(to bottom, #acc7ff, #508ff8)" : "#262a33",
//                     color: tier.featured ? "#00285b" : "#c2c6d5",
//                     fontFamily: "Manrope, sans-serif",
//                   }}
//                 >
//                   {tier.cta}
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
//           <div
//             className="rounded-2xl p-12 text-center relative overflow-hidden"
//             style={{
//               background: "rgba(49,53,62,0.4)",
//               border: "1px solid rgba(172,199,255,0.15)",
//               backdropFilter: "blur(20px)",
//             }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-tr from-[#acc7ff]/5 via-transparent to-[#45dfa4]/5 pointer-events-none" />
//             <h2 className="text-[2.5rem] font-black tracking-tight mb-4 text-gradient relative z-10" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
//               Ready to transform your assessments?
//             </h2>
//             <p className="text-[#8c909e] mb-8 max-w-md mx-auto relative z-10" style={{ fontFamily: "Manrope, sans-serif" }}>
//               Join thousands of educators who save hours every week with AI-powered quiz generation.
//             </p>
//             <Link
//               href="/auth/register"
//               className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[#00285b] transition-all hover:brightness-110 relative z-10"
//               style={{
//                 background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
//                 boxShadow: "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 30px rgba(79,142,247,0.4)",
//                 fontFamily: "Manrope, sans-serif",
//               }}
//             >
//               <span className="material-symbols-outlined text-sm">rocket_launch</span>
//               Start Building for Free
//             </Link>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-white/5 py-12 mt-8">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 rounded bg-[#acc7ff]/20 flex items-center justify-center">
//               <span className="material-symbols-outlined text-[#acc7ff] text-xs">psychology</span>
//             </div>
//             <span className="font-black text-[#acc7ff] text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>QuizCraft AI</span>
//           </div>
//           <p className="text-xs text-[#424753]" style={{ fontFamily: "Manrope, sans-serif" }}>
//             © 2025 QuizCraft AI. All rights reserved.
//           </p>
//           <div className="flex gap-6">
//             {["Privacy", "Terms", "Contact"].map((link) => (
//               <a key={link} href="#" className="text-xs text-[#8c909e] hover:text-[#dfe2ee] transition-colors" style={{ fontFamily: "Manrope, sans-serif" }}>{link}</a>
//             ))}
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// 222222222222222

// "use client";

// import Link from "next/link";

// const navLinks = [
//   { label: "Features", href: "#features" },
//   { label: "Pricing", href: "#pricing" },
//   { label: "Academy", href: "#cta" },
//   // { label: "Resources", href: "#features" },
// ];

// function handleScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
//   if (!href.startsWith("#")) return;
//   e.preventDefault();
//   const el = document.getElementById(href.slice(1));
//   if (el) {
//     const top = el.getBoundingClientRect().top + window.scrollY - 80;
//     window.scrollTo({ top, behavior: "smooth" });
//   }
// }

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-[#0f131c] text-[#dfe2ee] neural-mesh overflow-x-hidden">
//       {/* Navigation */}
//       <header className="fixed top-0 w-full z-50 bg-[#0f131c]/60 backdrop-blur-xl border-b border-white/5">
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-8 py-4">
//           <div className="flex items-center gap-8">
//             <a
//               href="#hero"
//               onClick={(e) => handleScroll(e, "#hero")}
//               className="flex items-center gap-2"
//             >
//               <div className="w-8 h-8 rounded-lg bg-[#acc7ff]/20 flex items-center justify-center">
//                 <span className="material-symbols-outlined text-[#acc7ff] text-sm">
//                   psychology
//                 </span>
//               </div>
//               <span
//                 className="text-lg font-black tracking-tight text-[#acc7ff]"
//                 style={{ fontFamily: "Space Grotesk, sans-serif" }}
//               >
//                 QuizCraft AI
//               </span>
//             </a>
//             <nav className="hidden md:flex gap-6">
//               {navLinks.map((item) => (
//                 <a
//                   key={item.label}
//                   href={item.href}
//                   onClick={(e) => handleScroll(e, item.href)}
//                   className="text-sm text-[#8c909e] hover:text-[#dfe2ee] transition-colors cursor-pointer"
//                   style={{ fontFamily: "Space Grotesk, sans-serif" }}
//                 >
//                   {item.label}
//                 </a>
//               ))}
//             </nav>
//           </div>
//           <div className="flex items-center gap-3">
//             <Link
//               href="/auth/login"
//               className="px-4 py-2 text-sm text-[#c2c6d5] hover:text-[#dfe2ee] transition-colors"
//               style={{ fontFamily: "Manrope, sans-serif" }}
//             >
//               Sign In
//             </Link>
//             <Link
//               href="/auth/register"
//               className="px-5 py-2.5 rounded-lg text-sm font-bold text-[#00285b] transition-all hover:brightness-110"
//               style={{
//                 background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
//                 fontFamily: "Manrope, sans-serif",
//                 boxShadow:
//                   "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 20px rgba(79,142,247,0.3)",
//               }}
//             >
//               Get Started Free
//             </Link>
//           </div>
//         </div>
//       </header>

//       <main className="pt-28">
//         {/* Hero Section */}
//         <section
//           id="hero"
//           className="max-w-7xl mx-auto px-6 lg:px-8 pb-32 relative"
//         >
//           <div className="absolute inset-0 bg-gradient-to-tr from-[#acc7ff]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             {/* Left: Content */}
//             <div className="relative z-10">
//               <div
//                 className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#45dfa4]/10 border border-[#45dfa4]/20 text-[#45dfa4] text-xs font-bold mb-8 uppercase tracking-widest"
//                 style={{ fontFamily: "Manrope, sans-serif" }}
//               >
//                 <span className="w-2 h-2 rounded-full bg-[#45dfa4] animate-pulse" />
//                 AI Model 2.0 — Now Live
//               </div>
//               <h1
//                 className="text-[3.5rem] leading-[1.1] tracking-[-0.02em] mb-6 max-w-2xl text-gradient"
//                 style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
//               >
//                 Turn any document into an interactive quiz in seconds
//               </h1>
//               <p
//                 className="text-lg text-[#c2c6d5] mb-10 max-w-xl leading-relaxed"
//                 style={{ fontFamily: "Manrope, sans-serif" }}
//               >
//                 AI-powered quiz generation for teachers, trainers, and HR teams.
//                 Stop writing questions manually — let our Neural Engine build
//                 comprehensive assessments from your PDFs, docs, and
//                 presentations.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link
//                   href="/auth/register"
//                   className="relative overflow-hidden group px-8 py-4 rounded-xl font-bold text-[#00285b] transition-all hover:brightness-110"
//                   style={{
//                     background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
//                     fontFamily: "Manrope, sans-serif",
//                     boxShadow:
//                       "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 20px rgba(79,142,247,0.3)",
//                   }}
//                 >
//                   <span className="relative z-10">Start for free</span>
//                   <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
//                 </Link>
//                 <button
//                   onClick={(e) =>
//                     handleScroll(
//                       e as unknown as React.MouseEvent<HTMLAnchorElement>,
//                       "#features",
//                     )
//                   }
//                   className="px-8 py-4 rounded-xl font-bold text-[#8c909e] hover:text-[#dfe2ee] border border-[#424753]/30 hover:bg-[#31353e]/30 transition-all"
//                   style={{ fontFamily: "Manrope, sans-serif" }}
//                 >
//                   View Demo →
//                 </button>
//               </div>

//               {/* Social proof */}
//               <div className="mt-12 flex items-center gap-6">
//                 <div className="flex -space-x-2">
//                   {["#acc7ff", "#45dfa4", "#ffb95f", "#c084fc"].map(
//                     (color, i) => (
//                       <div
//                         key={i}
//                         className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
//                         style={{
//                           background: color + "30",
//                           color,
//                           borderColor: "#0f131c",
//                         }}
//                       >
//                         {["T", "H", "S", "R"][i]}
//                       </div>
//                     ),
//                   )}
//                 </div>
//                 <p
//                   className="text-sm text-[#8c909e]"
//                   style={{ fontFamily: "Manrope, sans-serif" }}
//                 >
//                   <span className="text-[#dfe2ee] font-semibold">2,400+</span>{" "}
//                   educators already using QuizCraft
//                 </p>
//               </div>
//             </div>

//             {/* Right: Hero Mockup */}
//             <div className="relative w-full aspect-square max-w-[560px] mx-auto lg:mx-0">
//               <div className="absolute inset-0 bg-gradient-to-tr from-[#acc7ff]/10 to-[#45dfa4]/5 rounded-full blur-3xl" />
//               <div
//                 className="absolute inset-4 rounded-2xl p-6 flex flex-col gap-5 overflow-hidden border border-[#424753]/20"
//                 style={{
//                   background: "rgba(49,53,62,0.6)",
//                   backdropFilter: "blur(20px)",
//                   boxShadow:
//                     "inset 0.5px 0.5px 0 rgba(66,71,83,0.3), 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(79,142,247,0.05)",
//                   transform: "rotate(-2deg)",
//                   transition: "transform 0.5s ease",
//                 }}
//               >
//                 <div className="flex justify-between items-center border-b border-white/5 pb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded bg-[#acc7ff]/20 flex items-center justify-center">
//                       <span className="material-symbols-outlined text-[#acc7ff] text-sm">
//                         description
//                       </span>
//                     </div>
//                     <div className="h-4 w-36 bg-[#262a33] rounded animate-pulse" />
//                   </div>
//                   <div className="h-6 w-24 bg-[#45dfa4]/10 rounded-full border border-[#45dfa4]/20 flex items-center justify-center">
//                     <span
//                       className="text-[10px] text-[#45dfa4] font-bold uppercase"
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       Generating…
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-3">
//                   <div className="h-20 bg-[#181c24] rounded-xl p-4 flex flex-col gap-2">
//                     {[3, 4, 2].map((w, i) => (
//                       <div
//                         key={i}
//                         className="h-2.5 rounded bg-[#262a33]"
//                         style={{ width: `${w * 25}%` }}
//                       />
//                     ))}
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     {[
//                       {
//                         icon: "check_circle",
//                         color: "#acc7ff",
//                         val: "15",
//                         label: "Questions Drafted",
//                       },
//                       {
//                         icon: "lightbulb",
//                         color: "#ffb95f",
//                         val: "High",
//                         label: "Complexity",
//                       },
//                     ].map((card) => (
//                       <div
//                         key={card.label}
//                         className="rounded-xl p-4 flex flex-col justify-between h-28 border"
//                         style={{
//                           background: "rgba(49,53,62,0.6)",
//                           backdropFilter: "blur(20px)",
//                           borderColor: card.color + "20",
//                         }}
//                       >
//                         <span
//                           className="material-symbols-outlined text-xl"
//                           style={{ color: card.color }}
//                         >
//                           {card.icon}
//                         </span>
//                         <div>
//                           <div
//                             className="text-2xl font-black text-[#dfe2ee]"
//                             style={{ fontFamily: "Space Grotesk, sans-serif" }}
//                           >
//                             {card.val}
//                           </div>
//                           <div
//                             className="text-[10px] text-[#8c909e] uppercase tracking-wider mt-0.5"
//                             style={{ fontFamily: "Manrope, sans-serif" }}
//                           >
//                             {card.label}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex gap-2 mt-auto">
//                   {["MCQ", "True/False", "Short Answer"].map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#acc7ff]/10 text-[#acc7ff] border border-[#acc7ff]/20"
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section id="features" className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
//           <div className="text-center mb-16">
//             <h2
//               className="text-[2.5rem] font-black tracking-tight mb-4 text-gradient"
//               style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
//             >
//               Everything you need to assess better
//             </h2>
//             <p
//               className="text-[#8c909e] max-w-xl mx-auto"
//               style={{ fontFamily: "Manrope, sans-serif" }}
//             >
//               From upload to publish in under 60 seconds. QuizCraft handles the
//               complexity so you can focus on teaching.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               {
//                 icon: "upload_file",
//                 color: "#acc7ff",
//                 title: "Document Upload",
//                 desc: "Upload PDFs, DOCX, or paste text. Our AI parses and understands your content instantly.",
//               },
//               {
//                 icon: "psychology",
//                 color: "#45dfa4",
//                 title: "AI Question Generation",
//                 desc: "Gemini AI generates diverse, high-quality questions: MCQ, True/False, and short answers.",
//               },
//               {
//                 icon: "edit_note",
//                 color: "#ffb95f",
//                 title: "Smart Question Editor",
//                 desc: "Refine AI-generated questions with our intuitive editor. Reorder, modify, or regenerate any question.",
//               },
//               {
//                 icon: "share",
//                 color: "#c084fc",
//                 title: "One-Click Publishing",
//                 desc: "Publish with a shareable link or QR code. Control access, set time limits, and pass marks.",
//               },
//               {
//                 icon: "leaderboard",
//                 color: "#acc7ff",
//                 title: "Real-Time Analytics",
//                 desc: "Track performance with detailed charts. See question-level insights and identify learning gaps.",
//               },
//               {
//                 icon: "devices",
//                 color: "#45dfa4",
//                 title: "Student-Friendly View",
//                 desc: "Distraction-free, mobile-responsive quiz interface. Students need no account to take a quiz.",
//               },
//             ].map((feature) => (
//               <div
//                 key={feature.title}
//                 className="rounded-2xl p-6 flex flex-col gap-4 border border-[#424753]/20 hover:border-[#424753]/40 transition-all group"
//                 style={{ background: "#181c24" }}
//               >
//                 <div
//                   className="w-10 h-10 rounded-xl flex items-center justify-center"
//                   style={{ background: feature.color + "15" }}
//                 >
//                   <span
//                     className="material-symbols-outlined"
//                     style={{ color: feature.color }}
//                   >
//                     {feature.icon}
//                   </span>
//                 </div>
//                 <div>
//                   <h3
//                     className="font-bold text-[#dfe2ee] mb-2"
//                     style={{ fontFamily: "Space Grotesk, sans-serif" }}
//                   >
//                     {feature.title}
//                   </h3>
//                   <p
//                     className="text-sm text-[#8c909e] leading-relaxed"
//                     style={{ fontFamily: "Manrope, sans-serif" }}
//                   >
//                     {feature.desc}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Pricing Section */}
//         <section id="pricing" className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
//           <div className="text-center mb-16">
//             <h2
//               className="text-[2.5rem] font-black tracking-tight mb-4 text-gradient"
//               style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
//             >
//               Simple, transparent pricing
//             </h2>
//           </div>
//           <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
//             {[
//               {
//                 plan: "Free",
//                 price: "€0",
//                 period: "/month",
//                 color: "#8c909e",
//                 features: [
//                   "5 quizzes/month",
//                   "Up to 10 questions",
//                   "Basic analytics",
//                   "Share links",
//                 ],
//                 cta: "Get Started",
//               },
//               {
//                 plan: "Pro",
//                 price: "€19",
//                 period: "/month",
//                 color: "#acc7ff",
//                 featured: true,
//                 features: [
//                   "Unlimited quizzes",
//                   "Unlimited questions",
//                   "Advanced analytics",
//                   "QR codes",
//                   "Custom branding",
//                   "Priority support",
//                 ],
//                 cta: "Start Pro Trial",
//               },
//               {
//                 plan: "Enterprise",
//                 price: "€79",
//                 period: "/month",
//                 color: "#45dfa4",
//                 features: [
//                   "Everything in Pro",
//                   "Team collaboration",
//                   "SSO / SAML",
//                   "API access",
//                   "SLA guarantee",
//                   "Dedicated support",
//                 ],
//                 cta: "Contact Sales",
//               },
//             ].map((tier) => (
//               <div
//                 key={tier.plan}
//                 className={`rounded-2xl p-7 flex flex-col gap-5 border relative ${tier.featured ? "border-[#acc7ff]/30" : "border-[#424753]/20"}`}
//                 style={{
//                   background: tier.featured
//                     ? "rgba(172,199,255,0.05)"
//                     : "#181c24",
//                   boxShadow: tier.featured
//                     ? "0 0 40px rgba(172,199,255,0.08)"
//                     : undefined,
//                 }}
//               >
//                 {tier.featured && (
//                   <div
//                     className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#acc7ff] text-[#001a40] text-xs font-black"
//                     style={{ fontFamily: "Manrope, sans-serif" }}
//                   >
//                     MOST POPULAR
//                   </div>
//                 )}
//                 <div>
//                   <p
//                     className="text-sm font-bold uppercase tracking-widest mb-1"
//                     style={{
//                       color: tier.color,
//                       fontFamily: "Manrope, sans-serif",
//                     }}
//                   >
//                     {tier.plan}
//                   </p>
//                   <div className="flex items-baseline gap-1">
//                     <span
//                       className="text-4xl font-black text-[#dfe2ee]"
//                       style={{ fontFamily: "Space Grotesk, sans-serif" }}
//                     >
//                       {tier.price}
//                     </span>
//                     <span className="text-[#8c909e] text-sm">
//                       {tier.period}
//                     </span>
//                   </div>
//                 </div>
//                 <ul className="flex flex-col gap-2.5 flex-1">
//                   {tier.features.map((f) => (
//                     <li
//                       key={f}
//                       className="flex items-center gap-2.5 text-sm text-[#c2c6d5]"
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       <span
//                         className="material-symbols-outlined text-sm"
//                         style={{ color: tier.color }}
//                       >
//                         check
//                       </span>
//                       {f}
//                     </li>
//                   ))}
//                 </ul>
//                 <Link
//                   href="/auth/register"
//                   className="w-full py-3 rounded-xl font-bold text-sm text-center transition-all hover:brightness-110"
//                   style={{
//                     background: tier.featured
//                       ? "linear-gradient(to bottom, #acc7ff, #508ff8)"
//                       : "#262a33",
//                     color: tier.featured ? "#00285b" : "#c2c6d5",
//                     fontFamily: "Manrope, sans-serif",
//                   }}
//                 >
//                   {tier.cta}
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section id="cta" className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
//           <div
//             className="rounded-2xl p-12 text-center relative overflow-hidden"
//             style={{
//               background: "rgba(49,53,62,0.4)",
//               border: "1px solid rgba(172,199,255,0.15)",
//               backdropFilter: "blur(20px)",
//             }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-tr from-[#acc7ff]/5 via-transparent to-[#45dfa4]/5 pointer-events-none" />
//             <h2
//               className="text-[2.5rem] font-black tracking-tight mb-4 text-gradient relative z-10"
//               style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
//             >
//               Ready to transform your assessments?
//             </h2>
//             <p
//               className="text-[#8c909e] mb-8 max-w-md mx-auto relative z-10"
//               style={{ fontFamily: "Manrope, sans-serif" }}
//             >
//               Join thousands of educators who save hours every week with
//               AI-powered quiz generation.
//             </p>
//             <Link
//               href="/auth/register"
//               className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[#00285b] transition-all hover:brightness-110 relative z-10"
//               style={{
//                 background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
//                 boxShadow:
//                   "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 30px rgba(79,142,247,0.4)",
//                 fontFamily: "Manrope, sans-serif",
//               }}
//             >
//               <span className="material-symbols-outlined text-sm">
//                 rocket_launch
//               </span>
//               Start Building for Free
//             </Link>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-white/5 py-12 mt-8">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 rounded bg-[#acc7ff]/20 flex items-center justify-center">
//               <span className="material-symbols-outlined text-[#acc7ff] text-xs">
//                 psychology
//               </span>
//             </div>
//             <span
//               className="font-black text-[#acc7ff] text-sm"
//               style={{ fontFamily: "Space Grotesk, sans-serif" }}
//             >
//               QuizCraft AI
//             </span>
//           </div>
//           <p
//             className="text-xs text-[#424753]"
//             style={{ fontFamily: "Manrope, sans-serif" }}
//           >
//             © 2025 QuizCraft AI. All rights reserved.
//           </p>
//           <div className="flex gap-6">
//             {["Privacy", "Terms", "Contact"].map((link) => (
//               <a
//                 key={link}
//                 href="#"
//                 className="text-xs text-[#8c909e] hover:text-[#dfe2ee] transition-colors"
//                 style={{ fontFamily: "Manrope, sans-serif" }}
//               >
//                 {link}
//               </a>
//             ))}
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// 333333333333333333

// "use client";

// import Link from "next/link";
// import { useState } from "react";

// const navLinks = [
//   { label: "Features", href: "#features" },
//   { label: "Pricing", href: "#pricing" },
//   { label: "Academy", href: "#cta" },
// ];

// function handleScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
//   if (!href.startsWith("#")) return;
//   e.preventDefault();
//   const el = document.getElementById(href.slice(1));
//   if (el) {
//     const top = el.getBoundingClientRect().top + window.scrollY - 80;
//     window.scrollTo({ top, behavior: "smooth" });
//   }
// }

// export default function LandingPage() {
//   const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

//   const plans = [
//     {
//       plan: "Free",
//       price: "$0",
//       period: "forever",
//       color: "#8c909e",
//       featured: false,
//       features: [
//         "5 quizzes / month",
//         "Up to 10 questions",
//         "Basic analytics",
//         "Share links",
//         "Student quiz view",
//       ],
//       cta: "Get Started Free",
//       href: "/auth/register",
//     },
//     {
//       plan: "Pro",
//       price: billing === "monthly" ? "$9" : "$49",
//       period: billing === "monthly" ? "/ month" : "/ year",
//       subNote:
//         billing === "monthly"
//           ? "Switch to annual — save $59/yr"
//           : "≈ $4.08 / month, billed annually",
//       subColor: billing === "monthly" ? "#8c909e" : "#45dfa4",
//       badge: billing === "monthly" ? "Most Popular" : "Save 54%",
//       badgeBg: billing === "monthly" ? "#acc7ff" : "#45dfa4",
//       badgeColor: billing === "monthly" ? "#001a40" : "#003825",
//       color: "#acc7ff",
//       featured: true,
//       features: [
//         "Unlimited quizzes",
//         "Unlimited questions",
//         "Advanced analytics",
//         "QR code sharing",
//         "Custom branding",
//         "Priority support",
//       ],
//       cta: billing === "monthly" ? "Start Monthly — $9" : "Start Annual — $49",
//       href: "/auth/register",
//     },
//     {
//       plan: "Enterprise",
//       price: "Custom",
//       period: "contact us",
//       color: "#45dfa4",
//       featured: false,
//       features: [
//         "Everything in Pro",
//         "Team collaboration",
//         "SSO / SAML",
//         "API access",
//         "SLA guarantee",
//         "Dedicated support",
//       ],
//       cta: "Contact Sales",
//       href: "mailto:sales@quizcraft.ai",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0f131c] text-[#dfe2ee] neural-mesh overflow-x-hidden">
//       {/* ── Navbar ── */}
//       <header className="fixed top-0 w-full z-50 bg-[#0f131c]/60 backdrop-blur-xl border-b border-white/5">
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-8 py-4">
//           <div className="flex items-center gap-8">
//             <a
//               href="#hero"
//               onClick={(e) => handleScroll(e, "#hero")}
//               className="flex items-center gap-2"
//             >
//               <div className="w-8 h-8 rounded-lg bg-[#acc7ff]/20 flex items-center justify-center">
//                 <span className="material-symbols-outlined text-[#acc7ff] text-sm">
//                   psychology
//                 </span>
//               </div>
//               <span
//                 className="text-lg font-black tracking-tight text-[#acc7ff]"
//                 style={{ fontFamily: "Space Grotesk, sans-serif" }}
//               >
//                 QuizCraft AI
//               </span>
//             </a>
//             <nav className="hidden md:flex gap-6">
//               {navLinks.map((item) => (
//                 <a
//                   key={item.label}
//                   href={item.href}
//                   onClick={(e) => handleScroll(e, item.href)}
//                   className="text-sm text-[#8c909e] hover:text-[#dfe2ee] transition-colors cursor-pointer"
//                   style={{ fontFamily: "Space Grotesk, sans-serif" }}
//                 >
//                   {item.label}
//                 </a>
//               ))}
//             </nav>
//           </div>
//           <div className="flex items-center gap-3">
//             <Link
//               href="/auth/login"
//               className="px-4 py-2 text-sm text-[#c2c6d5] hover:text-[#dfe2ee] transition-colors"
//               style={{ fontFamily: "Manrope, sans-serif" }}
//             >
//               Sign In
//             </Link>
//             <Link
//               href="/auth/register"
//               className="px-5 py-2.5 rounded-lg text-sm font-bold text-[#00285b] transition-all hover:brightness-110"
//               style={{
//                 background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
//                 fontFamily: "Manrope, sans-serif",
//                 boxShadow:
//                   "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 20px rgba(79,142,247,0.3)",
//               }}
//             >
//               Get Started Free
//             </Link>
//           </div>
//         </div>
//       </header>

//       <main className="pt-28">
//         {/* ── Hero ── */}
//         <section
//           id="hero"
//           className="max-w-7xl mx-auto px-6 lg:px-8 pb-32 relative"
//         >
//           <div className="absolute inset-0 bg-gradient-to-tr from-[#acc7ff]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div className="relative z-10">
//               <div
//                 className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#45dfa4]/10 border border-[#45dfa4]/20 text-[#45dfa4] text-xs font-bold mb-8 uppercase tracking-widest"
//                 style={{ fontFamily: "Manrope, sans-serif" }}
//               >
//                 <span className="w-2 h-2 rounded-full bg-[#45dfa4] animate-pulse" />
//                 AI Model 2.0 — Now Live
//               </div>
//               <h1
//                 className="text-[3.5rem] leading-[1.1] tracking-[-0.02em] mb-6 max-w-2xl text-gradient"
//                 style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
//               >
//                 Turn any document into an interactive quiz in seconds
//               </h1>
//               <p
//                 className="text-lg text-[#c2c6d5] mb-10 max-w-xl leading-relaxed"
//                 style={{ fontFamily: "Manrope, sans-serif" }}
//               >
//                 AI-powered quiz generation for teachers, trainers, and HR teams.
//                 Stop writing questions manually — let our Neural Engine build
//                 comprehensive assessments from your PDFs, docs, and
//                 presentations.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link
//                   href="/auth/register"
//                   className="relative overflow-hidden group px-8 py-4 rounded-xl font-bold text-[#00285b] transition-all hover:brightness-110"
//                   style={{
//                     background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
//                     fontFamily: "Manrope, sans-serif",
//                     boxShadow:
//                       "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 20px rgba(79,142,247,0.3)",
//                   }}
//                 >
//                   <span className="relative z-10">Start for free</span>
//                   <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
//                 </Link>
//                 <a
//                   href="#features"
//                   onClick={(e) => handleScroll(e, "#features")}
//                   className="px-8 py-4 rounded-xl font-bold text-[#8c909e] hover:text-[#dfe2ee] border border-[#424753]/30 hover:bg-[#31353e]/30 transition-all text-center"
//                   style={{ fontFamily: "Manrope, sans-serif" }}
//                 >
//                   View Demo →
//                 </a>
//               </div>
//               <div className="mt-12 flex items-center gap-6">
//                 <div className="flex -space-x-2">
//                   {["#acc7ff", "#45dfa4", "#ffb95f", "#c084fc"].map(
//                     (color, i) => (
//                       <div
//                         key={i}
//                         className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
//                         style={{
//                           background: color + "30",
//                           color,
//                           borderColor: "#0f131c",
//                         }}
//                       >
//                         {["T", "H", "S", "R"][i]}
//                       </div>
//                     ),
//                   )}
//                 </div>
//                 <p
//                   className="text-sm text-[#8c909e]"
//                   style={{ fontFamily: "Manrope, sans-serif" }}
//                 >
//                   <span className="text-[#dfe2ee] font-semibold">2,400+</span>{" "}
//                   educators already using QuizCraft
//                 </p>
//               </div>
//             </div>

//             <div className="relative w-full aspect-square max-w-[560px] mx-auto lg:mx-0">
//               <div className="absolute inset-0 bg-gradient-to-tr from-[#acc7ff]/10 to-[#45dfa4]/5 rounded-full blur-3xl" />
//               <div
//                 className="absolute inset-4 rounded-2xl p-6 flex flex-col gap-5 overflow-hidden border border-[#424753]/20"
//                 style={{
//                   background: "rgba(49,53,62,0.6)",
//                   backdropFilter: "blur(20px)",
//                   boxShadow:
//                     "inset 0.5px 0.5px 0 rgba(66,71,83,0.3), 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(79,142,247,0.05)",
//                   transform: "rotate(-2deg)",
//                   transition: "transform 0.5s ease",
//                 }}
//               >
//                 <div className="flex justify-between items-center border-b border-white/5 pb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded bg-[#acc7ff]/20 flex items-center justify-center">
//                       <span className="material-symbols-outlined text-[#acc7ff] text-sm">
//                         description
//                       </span>
//                     </div>
//                     <div className="h-4 w-36 bg-[#262a33] rounded animate-pulse" />
//                   </div>
//                   <div className="h-6 w-24 bg-[#45dfa4]/10 rounded-full border border-[#45dfa4]/20 flex items-center justify-center">
//                     <span
//                       className="text-[10px] text-[#45dfa4] font-bold uppercase"
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       Generating…
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-3">
//                   <div className="h-20 bg-[#181c24] rounded-xl p-4 flex flex-col gap-2">
//                     {[3, 4, 2].map((w, i) => (
//                       <div
//                         key={i}
//                         className="h-2.5 rounded bg-[#262a33]"
//                         style={{ width: `${w * 25}%` }}
//                       />
//                     ))}
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     {[
//                       {
//                         icon: "check_circle",
//                         color: "#acc7ff",
//                         val: "15",
//                         label: "Questions Drafted",
//                       },
//                       {
//                         icon: "lightbulb",
//                         color: "#ffb95f",
//                         val: "High",
//                         label: "Complexity",
//                       },
//                     ].map((card) => (
//                       <div
//                         key={card.label}
//                         className="rounded-xl p-4 flex flex-col justify-between h-28 border"
//                         style={{
//                           background: "rgba(49,53,62,0.6)",
//                           backdropFilter: "blur(20px)",
//                           borderColor: card.color + "20",
//                         }}
//                       >
//                         <span
//                           className="material-symbols-outlined text-xl"
//                           style={{ color: card.color }}
//                         >
//                           {card.icon}
//                         </span>
//                         <div>
//                           <div
//                             className="text-2xl font-black text-[#dfe2ee]"
//                             style={{ fontFamily: "Space Grotesk, sans-serif" }}
//                           >
//                             {card.val}
//                           </div>
//                           <div
//                             className="text-[10px] text-[#8c909e] uppercase tracking-wider mt-0.5"
//                             style={{ fontFamily: "Manrope, sans-serif" }}
//                           >
//                             {card.label}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="flex gap-2 mt-auto">
//                   {["MCQ", "True/False", "Short Answer"].map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#acc7ff]/10 text-[#acc7ff] border border-[#acc7ff]/20"
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── Features ── */}
//         <section id="features" className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
//           <div className="text-center mb-16">
//             <h2
//               className="text-[2.5rem] font-black tracking-tight mb-4 text-gradient"
//               style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
//             >
//               Everything you need to assess better
//             </h2>
//             <p
//               className="text-[#8c909e] max-w-xl mx-auto"
//               style={{ fontFamily: "Manrope, sans-serif" }}
//             >
//               From upload to publish in under 60 seconds. QuizCraft handles the
//               complexity so you can focus on teaching.
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               {
//                 icon: "upload_file",
//                 color: "#acc7ff",
//                 title: "Document Upload",
//                 desc: "Upload PDFs, DOCX, or paste text. Our AI parses and understands your content instantly.",
//               },
//               {
//                 icon: "psychology",
//                 color: "#45dfa4",
//                 title: "AI Question Generation",
//                 desc: "Gemini AI generates diverse, high-quality questions: MCQ, True/False, and short answers.",
//               },
//               {
//                 icon: "edit_note",
//                 color: "#ffb95f",
//                 title: "Smart Question Editor",
//                 desc: "Refine AI-generated questions with our intuitive editor. Reorder, modify, or regenerate any question.",
//               },
//               {
//                 icon: "share",
//                 color: "#c084fc",
//                 title: "One-Click Publishing",
//                 desc: "Publish with a shareable link or QR code. Control access, set time limits, and pass marks.",
//               },
//               {
//                 icon: "leaderboard",
//                 color: "#acc7ff",
//                 title: "Real-Time Analytics",
//                 desc: "Track performance with detailed charts. See question-level insights and identify learning gaps.",
//               },
//               {
//                 icon: "devices",
//                 color: "#45dfa4",
//                 title: "Student-Friendly View",
//                 desc: "Distraction-free, mobile-responsive quiz interface. Students need no account to take a quiz.",
//               },
//             ].map((f) => (
//               <div
//                 key={f.title}
//                 className="rounded-2xl p-6 flex flex-col gap-4 border border-[#424753]/20 hover:border-[#424753]/40 transition-all"
//                 style={{ background: "#181c24" }}
//               >
//                 <div
//                   className="w-10 h-10 rounded-xl flex items-center justify-center"
//                   style={{ background: f.color + "15" }}
//                 >
//                   <span
//                     className="material-symbols-outlined"
//                     style={{ color: f.color }}
//                   >
//                     {f.icon}
//                   </span>
//                 </div>
//                 <div>
//                   <h3
//                     className="font-bold text-[#dfe2ee] mb-2"
//                     style={{ fontFamily: "Space Grotesk, sans-serif" }}
//                   >
//                     {f.title}
//                   </h3>
//                   <p
//                     className="text-sm text-[#8c909e] leading-relaxed"
//                     style={{ fontFamily: "Manrope, sans-serif" }}
//                   >
//                     {f.desc}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ── Pricing ── */}
//         <section id="pricing" className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
//           <div className="text-center mb-12">
//             <h2
//               className="text-[2.5rem] font-black tracking-tight mb-3 text-gradient"
//               style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
//             >
//               Simple, transparent pricing
//             </h2>
//             <p
//               className="text-[#8c909e] mb-8"
//               style={{ fontFamily: "Manrope, sans-serif" }}
//             >
//               Start free, upgrade when you need more power.
//             </p>

//             {/* Monthly / Annual toggle */}
//             <div
//               className="inline-flex items-center gap-1 p-1 rounded-xl"
//               style={{ background: "#181c24", border: "1px solid #424753" }}
//             >
//               {(["monthly", "annual"] as const).map((cycle) => (
//                 <button
//                   key={cycle}
//                   onClick={() => setBilling(cycle)}
//                   className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all capitalize"
//                   style={{
//                     background: billing === cycle ? "#262a33" : "transparent",
//                     color: billing === cycle ? "#dfe2ee" : "#8c909e",
//                     fontFamily: "Manrope, sans-serif",
//                   }}
//                 >
//                   {cycle === "annual" ? "Annual" : "Monthly"}
//                   {cycle === "annual" && (
//                     <span
//                       className="px-2 py-0.5 rounded-full text-[10px] font-black"
//                       style={{ background: "#45dfa4", color: "#003825" }}
//                     >
//                       Save 54%
//                     </span>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//             {plans.map((tier) => (
//               <div
//                 key={tier.plan}
//                 className="rounded-2xl p-7 flex flex-col gap-5 border relative"
//                 style={{
//                   background: tier.featured
//                     ? "rgba(172,199,255,0.05)"
//                     : "#181c24",
//                   borderColor: tier.featured
//                     ? "rgba(172,199,255,0.3)"
//                     : "rgba(66,71,83,0.3)",
//                   boxShadow: tier.featured
//                     ? "0 0 40px rgba(172,199,255,0.08)"
//                     : undefined,
//                 }}
//               >
//                 {/* Badge */}
//                 {"badge" in tier && (
//                   <div
//                     className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-black whitespace-nowrap"
//                     style={{
//                       background: (tier as { badgeBg: string }).badgeBg,
//                       color: (tier as { badgeColor: string }).badgeColor,
//                       fontFamily: "Manrope, sans-serif",
//                     }}
//                   >
//                     {tier.badge}
//                   </div>
//                 )}

//                 {/* Plan label */}
//                 <p
//                   className="text-xs font-black uppercase tracking-widest"
//                   style={{
//                     color: tier.color,
//                     fontFamily: "Manrope, sans-serif",
//                   }}
//                 >
//                   {tier.plan}
//                 </p>

//                 {/* Price block */}
//                 <div>
//                   <div className="flex items-end gap-1.5 mb-1">
//                     <span
//                       className="font-black leading-none text-[#dfe2ee]"
//                       style={{
//                         fontFamily: "Space Grotesk, sans-serif",
//                         fontSize: tier.price === "Custom" ? "2rem" : "3rem",
//                       }}
//                     >
//                       {tier.price}
//                     </span>
//                     <span
//                       className="text-sm text-[#8c909e] mb-1.5"
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       {tier.period}
//                     </span>
//                   </div>
//                   {"subNote" in tier && (
//                     <p
//                       className="text-xs"
//                       style={{
//                         color: (tier as { subColor: string }).subColor,
//                         fontFamily: "Manrope, sans-serif",
//                       }}
//                     >
//                       {(tier as { subNote: string }).subNote}
//                     </p>
//                   )}
//                 </div>

//                 {/* Divider */}
//                 <div className="h-px" style={{ background: "#262a33" }} />

//                 {/* Features list */}
//                 <ul className="flex flex-col gap-2.5 flex-1">
//                   {tier.features.map((feat) => (
//                     <li
//                       key={feat}
//                       className="flex items-center gap-2.5 text-sm text-[#c2c6d5]"
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       <span
//                         className="material-symbols-outlined text-sm shrink-0"
//                         style={{ color: tier.color }}
//                       >
//                         check
//                       </span>
//                       {feat}
//                     </li>
//                   ))}
//                 </ul>

//                 {/* CTA button */}
//                 <Link
//                   href={tier.href}
//                   className="w-full py-3 rounded-xl font-bold text-sm text-center transition-all hover:brightness-110"
//                   style={{
//                     background: tier.featured
//                       ? "linear-gradient(to bottom, #acc7ff, #508ff8)"
//                       : "#262a33",
//                     color: tier.featured ? "#00285b" : "#c2c6d5",
//                     border: !tier.featured ? "1px solid #424753" : undefined,
//                     fontFamily: "Manrope, sans-serif",
//                     boxShadow: tier.featured
//                       ? "inset 0.5px 0.5px 0 rgba(255,255,255,0.15)"
//                       : undefined,
//                   }}
//                 >
//                   {tier.cta}
//                 </Link>
//               </div>
//             ))}
//           </div>

//           {/* Trust line */}
//           <p
//             className="text-center text-xs text-[#424753] mt-8"
//             style={{ fontFamily: "Manrope, sans-serif" }}
//           >
//             No credit card required for Free plan · Cancel anytime · Secure
//             payments via Stripe
//           </p>
//         </section>

//         {/* ── CTA ── */}
//         <section id="cta" className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
//           <div
//             className="rounded-2xl p-12 text-center relative overflow-hidden"
//             style={{
//               background: "rgba(49,53,62,0.4)",
//               border: "1px solid rgba(172,199,255,0.15)",
//               backdropFilter: "blur(20px)",
//             }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-tr from-[#acc7ff]/5 via-transparent to-[#45dfa4]/5 pointer-events-none" />
//             <h2
//               className="text-[2.5rem] font-black tracking-tight mb-4 text-gradient relative z-10"
//               style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
//             >
//               Ready to transform your assessments?
//             </h2>
//             <p
//               className="text-[#8c909e] mb-8 max-w-md mx-auto relative z-10"
//               style={{ fontFamily: "Manrope, sans-serif" }}
//             >
//               Join thousands of educators who save hours every week with
//               AI-powered quiz generation.
//             </p>
//             <Link
//               href="/auth/register"
//               className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[#00285b] transition-all hover:brightness-110 relative z-10"
//               style={{
//                 background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
//                 boxShadow:
//                   "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 30px rgba(79,142,247,0.4)",
//                 fontFamily: "Manrope, sans-serif",
//               }}
//             >
//               <span className="material-symbols-outlined text-sm">
//                 rocket_launch
//               </span>
//               Start Building for Free
//             </Link>
//           </div>
//         </section>
//       </main>

//       {/* ── Footer ── */}
//       <footer className="border-t border-white/5 py-12 mt-8">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 rounded bg-[#acc7ff]/20 flex items-center justify-center">
//               <span className="material-symbols-outlined text-[#acc7ff] text-xs">
//                 psychology
//               </span>
//             </div>
//             <span
//               className="font-black text-[#acc7ff] text-sm"
//               style={{ fontFamily: "Space Grotesk, sans-serif" }}
//             >
//               QuizCraft AI
//             </span>
//           </div>
//           <p
//             className="text-xs text-[#424753]"
//             style={{ fontFamily: "Manrope, sans-serif" }}
//           >
//             © 2025 QuizCraft AI. All rights reserved.
//           </p>
//           <div className="flex gap-6">
//             {["Privacy", "Terms", "Contact"].map((link) => (
//               <a
//                 key={link}
//                 href="#"
//                 className="text-xs text-[#8c909e] hover:text-[#dfe2ee] transition-colors"
//                 style={{ fontFamily: "Manrope, sans-serif" }}
//               >
//                 {link}
//               </a>
//             ))}
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// responsive

"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Academy", href: "#cta" },
];

function handleScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  const el = document.getElementById(href.slice(1));
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function LandingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const plans = [
    {
      plan: "Free",
      price: "$0",
      period: "forever",
      color: "#8c909e",
      featured: false,
      features: [
        "5 quizzes / month",
        "Up to 10 questions",
        "Basic analytics",
        "Share links",
        "Student quiz view",
      ],
      cta: "Get Started Free",
      href: "/auth/register",
    },
    {
      plan: "Pro",
      price: billing === "monthly" ? "$9" : "$49",
      period: billing === "monthly" ? "/ month" : "/ year",
      subNote:
        billing === "monthly"
          ? "Switch to annual — save $59/yr"
          : "≈ $4.08 / month, billed annually",
      subColor: billing === "monthly" ? "#8c909e" : "#45dfa4",
      badge: billing === "monthly" ? "Most Popular" : "Save 54%",
      badgeBg: billing === "monthly" ? "#acc7ff" : "#45dfa4",
      badgeColor: billing === "monthly" ? "#001a40" : "#003825",
      color: "#acc7ff",
      featured: true,
      features: [
        "Unlimited quizzes",
        "Unlimited questions",
        "Advanced analytics",
        "QR code sharing",
        "Custom branding",
        "Priority support",
      ],
      cta: billing === "monthly" ? "Start Monthly — $9" : "Start Annual — $49",
      href: "/auth/register",
    },
    {
      plan: "Enterprise",
      price: "Custom",
      period: "contact us",
      color: "#45dfa4",
      featured: false,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "SSO / SAML",
        "API access",
        "SLA guarantee",
        "Dedicated support",
      ],
      cta: "Contact Sales",
      href: "mailto:sales@quizcraft.ai",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f131c] text-[#dfe2ee] neural-mesh overflow-x-hidden">
      {/* ── Navbar ── */}
      <header className="fixed top-0 w-full z-50 bg-[#0f131c]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleScroll(e, "#hero")}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-[#acc7ff]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#acc7ff] text-sm">
                psychology
              </span>
            </div>
            <span
              className="text-base sm:text-lg font-black tracking-tight text-[#acc7ff]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              QuizCraft AI
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-sm text-[#8c909e] hover:text-[#dfe2ee] transition-colors cursor-pointer"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm text-[#c2c6d5] hover:text-[#dfe2ee] transition-colors"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2.5 rounded-lg text-sm font-bold text-[#00285b] transition-all hover:brightness-110"
              style={{
                background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
                fontFamily: "Manrope, sans-serif",
                boxShadow: "inset 0.5px 0.5px 0 rgba(255,255,255,0.2)",
              }}
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/5 transition-all"
          >
            <span className="material-symbols-outlined text-[#8c909e]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-t border-white/5 px-4 py-4 flex flex-col gap-3"
            style={{ background: "#0a0e16" }}
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  handleScroll(e, item.href);
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 text-sm font-medium text-[#c2c6d5] hover:text-[#dfe2ee] transition-colors"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm font-medium text-[#8c909e] text-center border border-[#424753]/40 rounded-xl"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm font-bold text-[#00285b] text-center rounded-xl"
                style={{
                  background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="pt-20 sm:pt-28">
        {/* ── Hero ── */}
        <section
          id="hero"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:pb-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#acc7ff]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left */}
            <div className="relative z-10 text-center lg:text-left">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#45dfa4]/10 border border-[#45dfa4]/20 text-[#45dfa4] text-xs font-bold mb-6 uppercase tracking-widest"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                <span className="w-2 h-2 rounded-full bg-[#45dfa4] animate-pulse" />
                AI Model 2.0 — Now Live
              </div>
              <h1
                className="text-[2.2rem] sm:text-[3rem] lg:text-[3.5rem] leading-[1.1] tracking-[-0.02em] mb-5 text-gradient"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Turn any document into an interactive quiz in seconds
              </h1>
              <p
                className="text-base sm:text-lg text-[#c2c6d5] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                AI-powered quiz generation for teachers, trainers, and HR teams.
                Stop writing questions manually — let our Neural Engine build
                comprehensive assessments from your PDFs, docs, and
                presentations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/auth/register"
                  className="relative overflow-hidden group px-7 py-3.5 rounded-xl font-bold text-[#00285b] transition-all hover:brightness-110 text-center"
                  style={{
                    background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
                    fontFamily: "Manrope, sans-serif",
                    boxShadow:
                      "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 20px rgba(79,142,247,0.3)",
                  }}
                >
                  <span className="relative z-10">Start for free</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </Link>
                <a
                  href="#features"
                  onClick={(e) => handleScroll(e, "#features")}
                  className="px-7 py-3.5 rounded-xl font-bold text-[#8c909e] hover:text-[#dfe2ee] border border-[#424753]/30 hover:bg-[#31353e]/30 transition-all text-center"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  View Demo →
                </a>
              </div>
              <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {["#acc7ff", "#45dfa4", "#ffb95f", "#c084fc"].map(
                    (color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                        style={{
                          background: color + "30",
                          color,
                          borderColor: "#0f131c",
                        }}
                      >
                        {["T", "H", "S", "R"][i]}
                      </div>
                    ),
                  )}
                </div>
                <p
                  className="text-sm text-[#8c909e]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  <span className="text-[#dfe2ee] font-semibold">2,400+</span>{" "}
                  educators using QuizCraft
                </p>
              </div>
            </div>

            {/* Right: Mockup — hidden on small screens */}
            <div className="hidden sm:block relative w-full aspect-square max-w-[480px] mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#acc7ff]/10 to-[#45dfa4]/5 rounded-full blur-3xl" />
              <div
                className="absolute inset-4 rounded-2xl p-5 flex flex-col gap-4 overflow-hidden border border-[#424753]/20"
                style={{
                  background: "rgba(49,53,62,0.6)",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "inset 0.5px 0.5px 0 rgba(66,71,83,0.3), 0 20px 40px rgba(0,0,0,0.4)",
                  transform: "rotate(-2deg)",
                }}
              >
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-[#acc7ff]/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#acc7ff] text-sm">
                        description
                      </span>
                    </div>
                    <div className="h-3.5 w-28 bg-[#262a33] rounded animate-pulse" />
                  </div>
                  <div className="h-5 w-20 bg-[#45dfa4]/10 rounded-full border border-[#45dfa4]/20 flex items-center justify-center">
                    <span
                      className="text-[9px] text-[#45dfa4] font-bold uppercase"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      Generating…
                    </span>
                  </div>
                </div>
                <div className="h-16 bg-[#181c24] rounded-xl p-3 flex flex-col gap-1.5">
                  {[3, 4, 2].map((w, i) => (
                    <div
                      key={i}
                      className="h-2 rounded bg-[#262a33]"
                      style={{ width: `${w * 25}%` }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      icon: "check_circle",
                      color: "#acc7ff",
                      val: "15",
                      label: "Questions",
                    },
                    {
                      icon: "lightbulb",
                      color: "#ffb95f",
                      val: "High",
                      label: "Complexity",
                    },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="rounded-xl p-3 flex flex-col justify-between h-24 border"
                      style={{
                        background: "rgba(49,53,62,0.6)",
                        backdropFilter: "blur(20px)",
                        borderColor: card.color + "20",
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-lg"
                        style={{ color: card.color }}
                      >
                        {card.icon}
                      </span>
                      <div>
                        <div
                          className="text-xl font-black text-[#dfe2ee]"
                          style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          {card.val}
                        </div>
                        <div
                          className="text-[9px] text-[#8c909e] uppercase tracking-wider"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          {card.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-1.5 flex-wrap mt-auto">
                  {["MCQ", "True/False", "Short Answer"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#acc7ff]/10 text-[#acc7ff] border border-[#acc7ff]/20"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section
          id="features"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
        >
          <div className="text-center mb-12">
            <h2
              className="text-[1.8rem] sm:text-[2.5rem] font-black tracking-tight mb-4 text-gradient"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Everything you need to assess better
            </h2>
            <p
              className="text-[#8c909e] max-w-xl mx-auto text-sm sm:text-base"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              From upload to publish in under 60 seconds. QuizCraft handles the
              complexity so you can focus on teaching.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: "upload_file",
                color: "#acc7ff",
                title: "Document Upload",
                desc: "Upload PDFs, DOCX, or paste text. Our AI parses and understands your content instantly.",
              },
              {
                icon: "psychology",
                color: "#45dfa4",
                title: "AI Question Generation",
                desc: "Gemini AI generates diverse, high-quality questions: MCQ, True/False, and short answers.",
              },
              {
                icon: "edit_note",
                color: "#ffb95f",
                title: "Smart Question Editor",
                desc: "Refine AI-generated questions with our intuitive editor. Reorder, modify, or regenerate any question.",
              },
              {
                icon: "share",
                color: "#c084fc",
                title: "One-Click Publishing",
                desc: "Publish with a shareable link or QR code. Control access, set time limits, and pass marks.",
              },
              {
                icon: "leaderboard",
                color: "#acc7ff",
                title: "Real-Time Analytics",
                desc: "Track performance with detailed charts. See question-level insights and identify learning gaps.",
              },
              {
                icon: "devices",
                color: "#45dfa4",
                title: "Student-Friendly View",
                desc: "Distraction-free, mobile-responsive quiz interface. Students need no account to take a quiz.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-5 sm:p-6 flex flex-col gap-4 border border-[#424753]/20 hover:border-[#424753]/40 transition-all"
                style={{ background: "#181c24" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: f.color + "15" }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: f.color }}
                  >
                    {f.icon}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-bold text-[#dfe2ee] mb-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-sm text-[#8c909e] leading-relaxed"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pricing ── */}
        <section
          id="pricing"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
        >
          <div className="text-center mb-10">
            <h2
              className="text-[1.8rem] sm:text-[2.5rem] font-black tracking-tight mb-3 text-gradient"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Simple, transparent pricing
            </h2>
            <p
              className="text-[#8c909e] mb-7 text-sm sm:text-base"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Start free, upgrade when you need more power.
            </p>
            {/* Toggle */}
            <div
              className="inline-flex items-center gap-1 p-1 rounded-xl"
              style={{ background: "#181c24", border: "1px solid #424753" }}
            >
              {(["monthly", "annual"] as const).map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBilling(cycle)}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-sm font-bold transition-all"
                  style={{
                    background: billing === cycle ? "#262a33" : "transparent",
                    color: billing === cycle ? "#dfe2ee" : "#8c909e",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  {cycle === "annual" ? "Annual" : "Monthly"}
                  {cycle === "annual" && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-black"
                      style={{ background: "#45dfa4", color: "#003825" }}
                    >
                      Save 54%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {plans.map((tier) => (
              <div
                key={tier.plan}
                className="rounded-2xl p-6 sm:p-7 flex flex-col gap-5 border relative"
                style={{
                  background: tier.featured
                    ? "rgba(172,199,255,0.05)"
                    : "#181c24",
                  borderColor: tier.featured
                    ? "rgba(172,199,255,0.3)"
                    : "rgba(66,71,83,0.3)",
                  boxShadow: tier.featured
                    ? "0 0 40px rgba(172,199,255,0.08)"
                    : undefined,
                }}
              >
                {"badge" in tier && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-black whitespace-nowrap"
                    style={{
                      background: (tier as { badgeBg: string }).badgeBg,
                      color: (tier as { badgeColor: string }).badgeColor,
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    {tier.badge}
                  </div>
                )}
                <p
                  className="text-xs font-black uppercase tracking-widest"
                  style={{
                    color: tier.color,
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  {tier.plan}
                </p>
                <div>
                  <div className="flex items-end gap-1.5 mb-1">
                    <span
                      className="font-black leading-none text-[#dfe2ee]"
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: tier.price === "Custom" ? "2rem" : "2.8rem",
                      }}
                    >
                      {tier.price}
                    </span>
                    <span
                      className="text-sm text-[#8c909e] mb-1.5"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {tier.period}
                    </span>
                  </div>
                  {"subNote" in tier && (
                    <p
                      className="text-xs"
                      style={{
                        color: (tier as { subColor: string }).subColor,
                        fontFamily: "Manrope, sans-serif",
                      }}
                    >
                      {(tier as { subNote: string }).subNote}
                    </p>
                  )}
                </div>
                <div className="h-px" style={{ background: "#262a33" }} />
                <ul className="flex flex-col gap-2.5 flex-1">
                  {tier.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2.5 text-sm text-[#c2c6d5]"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      <span
                        className="material-symbols-outlined text-sm shrink-0"
                        style={{ color: tier.color }}
                      >
                        check
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className="w-full py-3 rounded-xl font-bold text-sm text-center transition-all hover:brightness-110"
                  style={{
                    background: tier.featured
                      ? "linear-gradient(to bottom, #acc7ff, #508ff8)"
                      : "#262a33",
                    color: tier.featured ? "#00285b" : "#c2c6d5",
                    border: !tier.featured ? "1px solid #424753" : undefined,
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
          <p
            className="text-center text-xs text-[#424753] mt-7"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            No credit card required for Free plan · Cancel anytime · Secure
            payments via Stripe
          </p>
        </section>

        {/* ── CTA ── */}
        <section
          id="cta"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
        >
          <div
            className="rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden"
            style={{
              background: "rgba(49,53,62,0.4)",
              border: "1px solid rgba(172,199,255,0.15)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#acc7ff]/5 via-transparent to-[#45dfa4]/5 pointer-events-none" />
            <h2
              className="text-[1.8rem] sm:text-[2.5rem] font-black tracking-tight mb-4 text-gradient relative z-10"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Ready to transform your assessments?
            </h2>
            <p
              className="text-[#8c909e] mb-7 max-w-md mx-auto relative z-10 text-sm sm:text-base"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Join thousands of educators who save hours every week with
              AI-powered quiz generation.
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[#00285b] transition-all hover:brightness-110 relative z-10"
              style={{
                background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
                boxShadow:
                  "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 30px rgba(79,142,247,0.4)",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              <span className="material-symbols-outlined text-sm">
                rocket_launch
              </span>
              Start Building for Free
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#acc7ff]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#acc7ff] text-xs">
                psychology
              </span>
            </div>
            <span
              className="font-black text-[#acc7ff] text-sm"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              QuizCraft AI
            </span>
          </div>
          <p
            className="text-xs text-[#424753] order-last sm:order-none"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            © 2025 QuizCraft AI. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-[#8c909e] hover:text-[#dfe2ee] transition-colors"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
