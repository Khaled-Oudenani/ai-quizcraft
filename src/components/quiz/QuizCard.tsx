import Link from "next/link";
import { formatRelativeTime, getDifficultyBg } from "@/lib/utils";
import type { Quiz } from "@/types";

interface QuizCardProps {
  quiz: Quiz;
  onDelete?: (id: string) => void;
}

const statusConfig = {
  published: { color: "#45dfa4", bg: "rgba(69,223,164,0.1)", border: "rgba(69,223,164,0.2)", label: "Published" },
  draft: { color: "#8c909e", bg: "#262a33", border: "#424753", label: "Draft" },
  archived: { color: "#424753", bg: "#1c2028", border: "#262a33", label: "Archived" },
};

export default function QuizCard({ quiz }: QuizCardProps) {
  const status = statusConfig[quiz.status] || statusConfig.draft;

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4 border border-[#424753]/20 hover:border-[#424753]/40 transition-all group"
      style={{ background: "#181c24" }}
    >
      {/* Top row */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
            style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}`, fontFamily: "Manrope, sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.color }} />
            {status.label}
          </span>
          {quiz.difficulty && (
            <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold ${getDifficultyBg(quiz.difficulty)}`} style={{ fontFamily: "Manrope, sans-serif" }}>
              {quiz.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="flex-1">
        <h3 className="font-bold text-[#dfe2ee] mb-1 line-clamp-2 leading-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          {quiz.title}
        </h3>
        {quiz.subject && (
          <p className="text-xs text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>{quiz.subject}</p>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-xs text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>
            <span className="material-symbols-outlined text-xs">quiz</span>
            {quiz.questions_count} Qs
          </span>
          <span className="flex items-center gap-1 text-xs text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>
            <span className="material-symbols-outlined text-xs">groups</span>
            {quiz.attempts_count}
          </span>
          {quiz.avg_score && (
            <span className="flex items-center gap-1 text-xs" style={{ color: quiz.avg_score >= 60 ? "#45dfa4" : "#8c909e", fontFamily: "Manrope, sans-serif" }}>
              <span className="material-symbols-outlined text-xs">grade</span>
              {Math.round(quiz.avg_score)}%
            </span>
          )}
        </div>
        <span className="text-xs text-[#424753]" style={{ fontFamily: "Manrope, sans-serif" }}>
          {formatRelativeTime(quiz.updated_at)}
        </span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Link
          href={`/quiz/${quiz.id}/edit`}
          className="py-2 rounded-xl text-xs font-bold text-center text-[#c2c6d5] hover:text-[#dfe2ee] bg-[#262a33] hover:bg-[#31353e] transition-all"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Edit
        </Link>
        <Link
          href={`/quiz/${quiz.id}/analytics`}
          className="py-2 rounded-xl text-xs font-bold text-center text-[#acc7ff] bg-[#acc7ff]/10 hover:bg-[#acc7ff]/20 transition-all"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Analytics
        </Link>
      </div>
    </div>
  );
}
