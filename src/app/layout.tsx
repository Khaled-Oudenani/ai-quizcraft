// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "QuizCraft AI — Turn Documents into Interactive Quizzes",
//   description:
//     "AI-powered quiz generation for teachers, trainers, and HR teams. Generate comprehensive assessments from PDFs, presentations, and documents in seconds.",
//   keywords: ["quiz", "AI", "education", "generator", "assessment"],
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className="dark">
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin="anonymous"
//         />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Manrope:wght@200..800&family=JetBrains+Mono:wght@400;500&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body className="antialiased">{children}</body>
//     </html>
//   );
// }

// 222222222222

import type { Metadata } from "next";
import "./globals.css";

// ─── تغيير هنا: ضع رابط موقعك الحقيقي ───
const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://ai-quizcraft.vercel.app/";

export const metadata: Metadata = {
  // ── أساسيات SEO ──────────────────────────────────────
  metadataBase: new URL(APP_URL),
  title: {
    default: "QuizCraft AI — Turn Documents into Interactive Quizzes",
    template: "%s | QuizCraft AI",
  },
  description:
    "AI-powered quiz generator for teachers, trainers & HR teams. Upload a PDF or document and generate MCQ, True/False, and short-answer quizzes in seconds with Gemini AI.",
  keywords: [
    "AI quiz generator",
    "quiz maker",
    "quiz from PDF",
    "automatic quiz creator",
    "teacher tools AI",
    "online assessment tool",
    "educational quiz app",
    "AI flashcards",
    "quiz builder",
    "e-learning quiz",
    "HR training quiz",
    "MCQ generator",
    "quiz from document",
    "Gemini AI quiz",
    "quizcraft",
  ],
  authors: [{ name: "QuizCraft AI", url: APP_URL }],
  creator: "QuizCraft AI",
  publisher: "QuizCraft AI",
  category: "Education Technology",

  // ── Canonical & Alternates ────────────────────────────
  alternates: {
    canonical: APP_URL,
    languages: {
      "en-US": APP_URL,
    },
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp) ─────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "QuizCraft AI",
    title: "QuizCraft AI — Turn Documents into Interactive Quizzes",
    description:
      "Upload any PDF or document and generate a full quiz in seconds. AI-powered MCQ, True/False, and short-answer questions for teachers and trainers.",
    images: [
      {
        url: `${APP_URL}/og-image.png`, // ← ضع صورة 1200x630px في /public/og-image.png
        width: 1200,
        height: 630,
        alt: "QuizCraft AI — AI-powered quiz generator",
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@quizcraftai", // ← غيّر لحسابك
    creator: "@quizcraftai",
    title: "QuizCraft AI — Turn Documents into Interactive Quizzes",
    description:
      "Generate quizzes from any PDF or document in seconds using Gemini AI. Free to start.",
    images: [`${APP_URL}/og-image.png`],
  },

  // ── Robots ────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── App & Icons ───────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",

  // ── Google Search Console Verification ───────────────
  // ← ضع الكود الذي تحصل عليه من Search Console هنا
  verification: {
    google: "PASTE_YOUR_GOOGLE_VERIFICATION_CODE_HERE",
    // yandex: "...",
    // bing: "...",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Manrope:wght@200..800&family=JetBrains+Mono:wght@400;500&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />

        {/* ── JSON-LD Structured Data (Google Rich Results) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "QuizCraft AI",
              url: APP_URL,
              description:
                "AI-powered quiz generator. Upload PDFs and documents to automatically create interactive quizzes using Google Gemini AI.",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
              offers: [
                {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                  name: "Free Plan",
                },
                {
                  "@type": "Offer",
                  price: "9",
                  priceCurrency: "USD",
                  billingIncrement: "P1M",
                  name: "Pro Monthly",
                },
                {
                  "@type": "Offer",
                  price: "49",
                  priceCurrency: "USD",
                  billingIncrement: "P1Y",
                  name: "Pro Annual",
                },
              ],
              featureList: [
                "AI quiz generation from PDFs",
                "Multiple question types: MCQ, True/False, Short Answer",
                "Real-time analytics dashboard",
                "QR code sharing",
                "Student quiz view",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "240",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
