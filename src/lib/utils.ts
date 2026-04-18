import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 7) return formatDate(dateStr);
  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMins > 0) return `${diffMins}m ago`;
  return "just now";
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

export function getDifficultyColor(
  difficulty: "easy" | "medium" | "hard"
): string {
  const colors = {
    easy: "text-secondary",
    medium: "text-tertiary",
    hard: "text-error",
  };
  return colors[difficulty];
}

export function getDifficultyBg(
  difficulty: "easy" | "medium" | "hard"
): string {
  const bgs = {
    easy: "bg-secondary/10 text-secondary border border-secondary/20",
    medium: "bg-tertiary/10 text-tertiary border border-tertiary/20",
    hard: "bg-error/10 text-error border border-error/20",
  };
  return bgs[difficulty];
}

export function getScoreColor(percentage: number): string {
  if (percentage >= 80) return "text-secondary";
  if (percentage >= 60) return "text-tertiary";
  return "text-error";
}

export async function extractTextFromFile(file: File): Promise<string> {
  const text = await file.text();
  return text;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + "...";
}

export function generateShareUrl(token: string): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${baseUrl}/quiz/${token}/take`;
}
