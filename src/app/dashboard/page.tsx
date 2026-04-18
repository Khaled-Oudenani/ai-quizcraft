import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatRelativeTime, getDifficultyBg } from "@/lib/utils";
import type { Quiz } from "@/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("*")
    .eq("user_id", user?.id)
    .order("updated_at", { ascending: false })
    .limit(6);

  const totalQuizzes = quizzes?.length || 0;
  const publishedQuizzes = quizzes?.filter((q) => q.status === "published").length || 0;
  const totalAttempts = quizzes?.reduce((sum, q) => sum + (q.attempts_count || 0), 0) || 0;
  const avgScore = quizzes?.filter((q) => q.avg_score).reduce((sum, q, _, arr) => sum + q.avg_score / arr.length, 0) || 0;

  const firstName = profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "there";

  const stats = [
    { label: "Total Quizzes", value: totalQuizzes, icon: "inventory_2", color: "#acc7ff", change: "+2 this week" },
    { label: "Published", value: publishedQuizzes, icon: "public", color: "#45dfa4", change: `${totalQuizzes - publishedQuizzes} drafts` },
    { label: "Total Attempts", value: totalAttempts, icon: "groups", color: "#ffb95f", change: "from all quizzes" },
    { label: "Avg. Score", value: avgScore > 0 ? `${Math.round(avgScore)}%` : "—", icon: "grade", color: "#c084fc", change: "across all quizzes" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <p className="text-[#8c909e] text-sm font-medium mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1
            className="text-4xl font-black tracking-tight text-[#dfe2ee]"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            Good morning, {firstName} 👋
          </h1>
        </div>
        <Link
          href="/quiz/create"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[#00285b] text-sm transition-all hover:brightness-110 whitespace-nowrap"
          style={{
            background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
            fontFamily: "Manrope, sans-serif",
            boxShadow: "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 20px rgba(79,142,247,0.2)",
          }}
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Quiz
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-5 flex flex-col gap-3 border border-[#424753]/20"
            style={{ background: "#181c24" }}
          >
            <div className="flex justify-between items-start">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: stat.color + "15" }}
              >
                <span className="material-symbols-outlined text-base" style={{ color: stat.color }}>{stat.icon}</span>
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-black text-[#dfe2ee] mb-0.5"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-bold text-[#8c909e] uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>
                {stat.label}
              </div>
              <div className="text-xs text-[#424753] mt-1" style={{ fontFamily: "Manrope, sans-serif" }}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Quizzes */}
      <div className="mb-6 flex justify-between items-center">
        <h2
          className="text-xl font-bold text-[#dfe2ee]"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Recent Quizzes
        </h2>
        <Link href="/dashboard/quizzes" className="text-sm text-[#acc7ff] hover:text-[#dfe2ee] transition-colors flex items-center gap-1" style={{ fontFamily: "Manrope, sans-serif" }}>
          View all
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      {!quizzes || quizzes.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {quizzes.map((quiz: Quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
          <CreateNewCard />
        </div>
      )}
    </div>
  );
}

function QuizCard({ quiz }: { quiz: Quiz }) {
  const statusConfig = {
    published: { color: "#45dfa4", bg: "bg-[#45dfa4]/10", label: "Published" },
    draft: { color: "#8c909e", bg: "bg-[#8c909e]/10", label: "Draft" },
    archived: { color: "#424753", bg: "bg-[#424753]/10", label: "Archived" },
  };
  const status = statusConfig[quiz.status] || statusConfig.draft;

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4 border border-[#424753]/20 hover:border-[#424753]/40 transition-all group cursor-pointer"
      style={{ background: "#181c24" }}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${status.bg}`}
            style={{ color: status.color, fontFamily: "Manrope, sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.color }} />
            {status.label}
          </span>
          {quiz.difficulty && (
            <span
              className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold ${getDifficultyBg(quiz.difficulty)}`}
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {quiz.difficulty}
            </span>
          )}
        </div>
        <Link
          href={`/quiz/${quiz.id}/edit`}
          className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
        >
          <span className="material-symbols-outlined text-sm text-[#8c909e]">more_horiz</span>
        </Link>
      </div>

      <div className="flex-1">
        <h3
          className="font-bold text-[#dfe2ee] mb-1 line-clamp-2 leading-tight"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {quiz.title}
        </h3>
        {quiz.subject && (
          <p className="text-xs text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>{quiz.subject}</p>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-xs text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>
            <span className="material-symbols-outlined text-xs">quiz</span>
            {quiz.questions_count} Qs
          </span>
          <span className="flex items-center gap-1 text-xs text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>
            <span className="material-symbols-outlined text-xs">groups</span>
            {quiz.attempts_count} attempts
          </span>
        </div>
        <span className="text-xs text-[#424753]" style={{ fontFamily: "Manrope, sans-serif", fontVariantNumeric: "tabular-nums" }}>
          {formatRelativeTime(quiz.updated_at)}
        </span>
      </div>

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

function CreateNewCard() {
  return (
    <Link
      href="/quiz/create"
      className="rounded-2xl p-5 flex flex-col items-center justify-center gap-3 border border-dashed border-[#424753]/40 hover:border-[#acc7ff]/40 hover:bg-[#acc7ff]/5 transition-all group cursor-pointer min-h-[200px]"
    >
      <div className="w-10 h-10 rounded-xl bg-[#acc7ff]/10 group-hover:bg-[#acc7ff]/20 flex items-center justify-center transition-all">
        <span className="material-symbols-outlined text-[#acc7ff]">add</span>
      </div>
      <div className="text-center">
        <p className="font-bold text-[#8c909e] group-hover:text-[#acc7ff] transition-colors text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Create New Quiz
        </p>
        <p className="text-xs text-[#424753] mt-1" style={{ fontFamily: "Manrope, sans-serif" }}>
          AI-powered generation
        </p>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#acc7ff]/10 flex items-center justify-center mb-5">
        <span className="material-symbols-outlined text-3xl text-[#acc7ff]">psychology</span>
      </div>
      <h3 className="text-xl font-bold text-[#dfe2ee] mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
        No quizzes yet
      </h3>
      <p className="text-sm text-[#8c909e] max-w-xs mb-7" style={{ fontFamily: "Manrope, sans-serif" }}>
        Upload a document and let AI generate your first quiz in under 60 seconds.
      </p>
      <Link
        href="/quiz/create"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[#00285b] text-sm transition-all hover:brightness-110"
        style={{
          background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
          fontFamily: "Manrope, sans-serif",
        }}
      >
        <span className="material-symbols-outlined text-sm">bolt</span>
        Generate First Quiz
      </Link>
    </div>
  );
}
