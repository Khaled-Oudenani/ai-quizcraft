import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuizCraft AI — Turn Documents into Interactive Quizzes",
  description:
    "AI-powered quiz generation for teachers, trainers, and HR teams. Generate comprehensive assessments from PDFs, presentations, and documents in seconds.",
  keywords: ["quiz", "AI", "education", "generator", "assessment"],
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
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
