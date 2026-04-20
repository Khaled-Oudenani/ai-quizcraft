// import { createClient } from "@/lib/supabase/server";
// import Link from "next/link";

// export default async function AnalyticsDashboardPage() {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   const { data: quizzes } = await supabase
//     .from("quizzes")
//     .select("id, title, attempts_count, avg_score, status, difficulty, questions_count")
//     .eq("user_id", user?.id)
//     .order("attempts_count", { ascending: false });

//   const totalAttempts = quizzes?.reduce((s, q) => s + (q.attempts_count || 0), 0) || 0;
//   const avgScore = quizzes?.filter((q) => q.avg_score).length
//     ? Math.round(quizzes!.filter((q) => q.avg_score).reduce((s, q) => s + q.avg_score, 0) / quizzes!.filter((q) => q.avg_score).length)
//     : 0;

//   return (
//     <div className="max-w-5xl mx-auto p-8 lg:p-10">
//       <div className="mb-8">
//         <h1 className="text-3xl font-black text-[#dfe2ee] tracking-tight" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
//           Analytics Overview
//         </h1>
//         <p className="text-[#8c909e] mt-1 text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>
//           Performance across all your quizzes
//         </p>
//       </div>

//       {/* Summary stats */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         {[
//           { label: "Total Quizzes", val: quizzes?.length || 0, icon: "inventory_2", color: "#acc7ff" },
//           { label: "Total Attempts", val: totalAttempts, icon: "groups", color: "#45dfa4" },
//           { label: "Avg Score", val: `${avgScore}%`, icon: "grade", color: "#ffb95f" },
//           { label: "Published", val: quizzes?.filter((q) => q.status === "published").length || 0, icon: "public", color: "#c084fc" },
//         ].map((stat) => (
//           <div key={stat.label} className="rounded-2xl p-5 border border-[#424753]/20" style={{ background: "#181c24" }}>
//             <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: stat.color + "15" }}>
//               <span className="material-symbols-outlined text-sm" style={{ color: stat.color }}>{stat.icon}</span>
//             </div>
//             <p className="text-2xl font-black text-[#dfe2ee]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{stat.val}</p>
//             <p className="text-xs text-[#8c909e] uppercase tracking-wider mt-0.5" style={{ fontFamily: "Manrope, sans-serif" }}>{stat.label}</p>
//           </div>
//         ))}
//       </div>

//       {/* Per-quiz breakdown */}
//       <div className="rounded-2xl border border-[#424753]/20 overflow-hidden" style={{ background: "#181c24" }}>
//         <div className="px-6 py-4 border-b border-white/5">
//           <h3 className="font-bold text-[#dfe2ee]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Per-Quiz Performance</h3>
//         </div>
//         {!quizzes || quizzes.length === 0 ? (
//           <div className="py-16 text-center">
//             <p className="text-[#8c909e] text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>No quizzes yet. <Link href="/quiz/create" className="text-[#acc7ff] hover:underline">Create one →</Link></p>
//           </div>
//         ) : (
//           <div className="divide-y divide-white/5">
//             {quizzes.map((quiz) => (
//               <div key={quiz.id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
//                 <div className="flex-1 min-w-0">
//                   <p className="font-semibold text-[#dfe2ee] text-sm truncate" style={{ fontFamily: "Manrope, sans-serif" }}>{quiz.title}</p>
//                   <p className="text-xs text-[#424753] mt-0.5" style={{ fontFamily: "Manrope, sans-serif" }}>
//                     {quiz.questions_count} questions · {quiz.difficulty}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-6 shrink-0">
//                   <div className="text-center">
//                     <p className="text-sm font-bold text-[#dfe2ee]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{quiz.attempts_count}</p>
//                     <p className="text-[10px] text-[#424753] uppercase tracking-wide" style={{ fontFamily: "Manrope, sans-serif" }}>attempts</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-sm font-bold" style={{ color: quiz.avg_score >= 60 ? "#45dfa4" : quiz.avg_score > 0 ? "#ffb95f" : "#424753", fontFamily: "Space Grotesk, sans-serif" }}>
//                       {quiz.avg_score ? `${Math.round(quiz.avg_score)}%` : "—"}
//                     </p>
//                     <p className="text-[10px] text-[#424753] uppercase tracking-wide" style={{ fontFamily: "Manrope, sans-serif" }}>avg score</p>
//                   </div>
//                   <Link
//                     href={`/quiz/${quiz.id}/analytics`}
//                     className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#acc7ff] bg-[#acc7ff]/10 hover:bg-[#acc7ff]/20 transition-all"
//                     style={{ fontFamily: "Manrope, sans-serif" }}
//                   >
//                     Details →
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// responsive design

import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const revalidate = 60;
export default async function AnalyticsDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: quizzes } = await supabase
    .from("quizzes")
    .select(
      "id, title, attempts_count, avg_score, status, difficulty, questions_count",
    )
    .eq("user_id", user?.id)
    .order("attempts_count", { ascending: false });

  const totalAttempts =
    quizzes?.reduce((s, q) => s + (q.attempts_count || 0), 0) || 0;
  const avgScore = quizzes?.filter((q) => q.avg_score).length
    ? Math.round(
        quizzes!
          .filter((q) => q.avg_score)
          .reduce((s, q) => s + q.avg_score, 0) /
          quizzes!.filter((q) => q.avg_score).length,
      )
    : 0;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-10">
      {/* ── Header ── */}
      <div className="mb-7">
        <h1
          className="text-2xl sm:text-3xl font-black text-[#dfe2ee] tracking-tight"
          style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
        >
          Analytics Overview
        </h1>
        <p
          className="text-[#8c909e] mt-1 text-sm"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Performance across all your quizzes
        </p>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-7">
        {[
          {
            label: "Total Quizzes",
            val: quizzes?.length || 0,
            icon: "inventory_2",
            color: "#acc7ff",
          },
          {
            label: "Total Attempts",
            val: totalAttempts,
            icon: "groups",
            color: "#45dfa4",
          },
          {
            label: "Avg Score",
            val: `${avgScore}%`,
            icon: "grade",
            color: "#ffb95f",
          },
          {
            label: "Published",
            val: quizzes?.filter((q) => q.status === "published").length || 0,
            icon: "public",
            color: "#c084fc",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-4 sm:p-5 border border-[#424753]/20"
            style={{ background: "#181c24" }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
              style={{ background: stat.color + "15" }}
            >
              <span
                className="material-symbols-outlined text-sm"
                style={{ color: stat.color }}
              >
                {stat.icon}
              </span>
            </div>
            <p
              className="text-2xl sm:text-2xl font-black text-[#dfe2ee]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {stat.val}
            </p>
            <p
              className="text-[10px] sm:text-xs text-[#8c909e] uppercase tracking-wider mt-0.5"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Per-Quiz Table ── */}
      <div
        className="rounded-2xl border border-[#424753]/20 overflow-hidden"
        style={{ background: "#181c24" }}
      >
        <div className="px-4 sm:px-6 py-4 border-b border-white/5">
          <h3
            className="font-bold text-[#dfe2ee] text-sm sm:text-base"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Per-Quiz Performance
          </h3>
        </div>

        {!quizzes || quizzes.length === 0 ? (
          <div className="py-16 text-center">
            <p
              className="text-[#8c909e] text-sm"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              No quizzes yet.{" "}
              <Link
                href="/quiz/create"
                className="text-[#acc7ff] hover:underline"
              >
                Create one →
              </Link>
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="px-4 sm:px-6 py-4 hover:bg-white/[0.02] transition-colors"
              >
                {/* Mobile */}
                <div className="flex flex-col gap-3 sm:hidden">
                  <div>
                    <p
                      className="font-semibold text-[#dfe2ee] text-sm truncate"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {quiz.title}
                    </p>
                    <p
                      className="text-xs text-[#424753] mt-0.5"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {quiz.questions_count} questions · {quiz.difficulty}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p
                          className="text-sm font-bold text-[#dfe2ee]"
                          style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          {quiz.attempts_count}
                        </p>
                        <p
                          className="text-[10px] text-[#424753] uppercase"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          attempts
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-sm font-bold"
                          style={{
                            color:
                              quiz.avg_score >= 60
                                ? "#45dfa4"
                                : quiz.avg_score > 0
                                  ? "#ffb95f"
                                  : "#424753",
                            fontFamily: "Space Grotesk, sans-serif",
                          }}
                        >
                          {quiz.avg_score
                            ? `${Math.round(quiz.avg_score)}%`
                            : "—"}
                        </p>
                        <p
                          className="text-[10px] text-[#424753] uppercase"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          avg score
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/quiz/${quiz.id}/analytics`}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#acc7ff] bg-[#acc7ff]/10 hover:bg-[#acc7ff]/20 transition-all"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      Details →
                    </Link>
                  </div>
                </div>

                {/* Desktop */}
                <div className="hidden sm:flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-[#dfe2ee] text-sm truncate"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {quiz.title}
                    </p>
                    <p
                      className="text-xs text-[#424753] mt-0.5"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {quiz.questions_count} questions · {quiz.difficulty}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-center">
                      <p
                        className="text-sm font-bold text-[#dfe2ee]"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {quiz.attempts_count}
                      </p>
                      <p
                        className="text-[10px] text-[#424753] uppercase tracking-wide"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        attempts
                      </p>
                    </div>
                    <div className="text-center">
                      <p
                        className="text-sm font-bold"
                        style={{
                          color:
                            quiz.avg_score >= 60
                              ? "#45dfa4"
                              : quiz.avg_score > 0
                                ? "#ffb95f"
                                : "#424753",
                          fontFamily: "Space Grotesk, sans-serif",
                        }}
                      >
                        {quiz.avg_score
                          ? `${Math.round(quiz.avg_score)}%`
                          : "—"}
                      </p>
                      <p
                        className="text-[10px] text-[#424753] uppercase tracking-wide"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        avg score
                      </p>
                    </div>
                    <Link
                      href={`/quiz/${quiz.id}/analytics`}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#acc7ff] bg-[#acc7ff]/10 hover:bg-[#acc7ff]/20 transition-all"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
