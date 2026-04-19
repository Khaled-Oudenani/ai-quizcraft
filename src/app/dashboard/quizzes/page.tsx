// import { createClient } from "@/lib/supabase/server";
// import Link from "next/link";
// import { formatRelativeTime, getDifficultyBg } from "@/lib/utils";
// import type { Quiz } from "@/types";
// import DeleteQuizButton from "@/components/ui/DeleteQuizButton"; // عدّل المسار حسب مشروعك

// export default async function QuizzesPage() {
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   const { data: quizzes } = await supabase
//     .from("quizzes")
//     .select("*")
//     .eq("user_id", user?.id)
//     .order("updated_at", { ascending: false });

//   return (
//     <div className="max-w-5xl mx-auto p-8 lg:p-10">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1
//             className="text-3xl font-black text-[#dfe2ee] tracking-tight"
//             style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
//           >
//             My Quizzes
//           </h1>
//           <p
//             className="text-[#8c909e] mt-1 text-sm"
//             style={{ fontFamily: "Manrope, sans-serif" }}
//           >
//             {quizzes?.length || 0} quizzes total
//           </p>
//         </div>
//         <Link
//           href="/quiz/create"
//           className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[#00285b] text-sm transition-all hover:brightness-110"
//           style={{
//             background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
//             fontFamily: "Manrope, sans-serif",
//           }}
//         >
//           <span className="material-symbols-outlined text-sm">add</span>
//           New Quiz
//         </Link>
//       </div>

//       {!quizzes || quizzes.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-20 text-center">
//           <div className="w-14 h-14 rounded-2xl bg-[#acc7ff]/10 flex items-center justify-center mb-4">
//             <span className="material-symbols-outlined text-2xl text-[#acc7ff]">
//               inventory_2
//             </span>
//           </div>
//           <h3
//             className="font-bold text-[#dfe2ee] mb-2"
//             style={{ fontFamily: "Space Grotesk, sans-serif" }}
//           >
//             No quizzes yet
//           </h3>
//           <p
//             className="text-sm text-[#8c909e] max-w-xs mb-5"
//             style={{ fontFamily: "Manrope, sans-serif" }}
//           >
//             Create your first AI-powered quiz.
//           </p>
//           <Link
//             href="/quiz/create"
//             className="px-5 py-3 rounded-xl text-sm font-bold text-[#00285b]"
//             style={{
//               background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
//               fontFamily: "Manrope, sans-serif",
//             }}
//           >
//             Create Quiz
//           </Link>
//         </div>
//       ) : (
//         <div className="flex flex-col gap-3">
//           {quizzes.map((quiz: Quiz) => (
//             <div
//               key={quiz.id}
//               className="rounded-2xl p-5 border border-[#424753]/20 hover:border-[#424753]/40 transition-all flex items-center gap-4"
//               style={{ background: "#181c24" }}
//             >
//               <div
//                 className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
//                 style={{ background: "#262a33" }}
//               >
//                 <span className="material-symbols-outlined text-sm text-[#8c909e]">
//                   quiz
//                 </span>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2 mb-1 flex-wrap">
//                   <h3
//                     className="font-bold text-[#dfe2ee] truncate"
//                     style={{ fontFamily: "Space Grotesk, sans-serif" }}
//                   >
//                     {quiz.title}
//                   </h3>
//                   {quiz.difficulty && (
//                     <span
//                       className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${getDifficultyBg(quiz.difficulty)}`}
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       {quiz.difficulty}
//                     </span>
//                   )}
//                 </div>
//                 <div
//                   className="flex items-center gap-3 text-xs text-[#424753]"
//                   style={{ fontFamily: "Manrope, sans-serif" }}
//                 >
//                   <span className="flex items-center gap-1">
//                     <span className="material-symbols-outlined text-xs">
//                       quiz
//                     </span>
//                     {quiz.questions_count} Qs
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <span className="material-symbols-outlined text-xs">
//                       groups
//                     </span>
//                     {quiz.attempts_count} attempts
//                   </span>
//                   {quiz.avg_score && (
//                     <span className="flex items-center gap-1">
//                       <span className="material-symbols-outlined text-xs">
//                         grade
//                       </span>
//                       {Math.round(quiz.avg_score)}% avg
//                     </span>
//                   )}
//                   <span>{formatRelativeTime(quiz.updated_at)}</span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 shrink-0">
//                 <span
//                   className="px-2.5 py-1 rounded-full text-[11px] font-bold"
//                   style={{
//                     background:
//                       quiz.status === "published"
//                         ? "#45dfa4" + "20"
//                         : "#262a33",
//                     color: quiz.status === "published" ? "#45dfa4" : "#8c909e",
//                     fontFamily: "Manrope, sans-serif",
//                   }}
//                 >
//                   {quiz.status}
//                 </span>
//                 <Link
//                   href={`/quiz/${quiz.id}/edit`}
//                   className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8c909e] hover:text-[#acc7ff] hover:bg-[#acc7ff]/10 transition-all"
//                 >
//                   <span className="material-symbols-outlined text-sm">
//                     edit
//                   </span>
//                 </Link>
//                 <Link
//                   href={`/quiz/${quiz.id}/analytics`}
//                   className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8c909e] hover:text-[#acc7ff] hover:bg-[#acc7ff]/10 transition-all"
//                 >
//                   <span className="material-symbols-outlined text-sm">
//                     leaderboard
//                   </span>
//                 </Link>
//                 <Link
//                   href={`/quiz/${quiz.id}/share`}
//                   className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8c909e] hover:text-[#acc7ff] hover:bg-[#acc7ff]/10 transition-all"
//                 >
//                   <span className="material-symbols-outlined text-sm">
//                     share
//                   </span>
//                 </Link>
//                 <DeleteQuizButton quizId={quiz.id} />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// 2222222222222

import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatRelativeTime, getDifficultyBg } from "@/lib/utils";
import type { Quiz } from "@/types";
import DeleteQuizButton from "@/components/ui/DeleteQuizButton";

export default async function QuizzesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("*")
    .eq("user_id", user?.id)
    .order("updated_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-10">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-7">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-black text-[#dfe2ee] tracking-tight"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            My Quizzes
          </h1>
          <p
            className="text-[#8c909e] mt-1 text-sm"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {quizzes?.length || 0} quizzes total
          </p>
        </div>
        <Link
          href="/quiz/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[#00285b] text-sm transition-all hover:brightness-110 shrink-0"
          style={{
            background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Quiz
        </Link>
      </div>

      {!quizzes || quizzes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#acc7ff]/10 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-2xl text-[#acc7ff]">
              inventory_2
            </span>
          </div>
          <h3
            className="font-bold text-[#dfe2ee] mb-2"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            No quizzes yet
          </h3>
          <p
            className="text-sm text-[#8c909e] max-w-xs mb-5"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Create your first AI-powered quiz.
          </p>
          <Link
            href="/quiz/create"
            className="px-5 py-3 rounded-xl text-sm font-bold text-[#00285b]"
            style={{
              background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Create Quiz
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {quizzes.map((quiz: Quiz) => (
            <div
              key={quiz.id}
              className="rounded-2xl p-4 sm:p-5 border border-[#424753]/20 hover:border-[#424753]/40 transition-all"
              style={{ background: "#181c24" }}
            >
              {/* Mobile layout */}
              <div className="flex items-start gap-3 sm:hidden">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "#262a33" }}
                >
                  <span className="material-symbols-outlined text-sm text-[#8c909e]">
                    quiz
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3
                      className="font-bold text-[#dfe2ee] text-sm truncate"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {quiz.title}
                    </h3>
                    {quiz.difficulty && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getDifficultyBg(quiz.difficulty)}`}
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {quiz.difficulty}
                      </span>
                    )}
                  </div>
                  <div
                    className="flex items-center gap-2 text-xs text-[#424753] flex-wrap mb-3"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    <span>{quiz.questions_count} Qs</span>
                    <span>·</span>
                    <span>{quiz.attempts_count} attempts</span>
                    <span>·</span>
                    <span>{formatRelativeTime(quiz.updated_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold"
                      style={{
                        background:
                          quiz.status === "published" ? "#45dfa420" : "#262a33",
                        color:
                          quiz.status === "published" ? "#45dfa4" : "#8c909e",
                        fontFamily: "Manrope, sans-serif",
                      }}
                    >
                      {quiz.status}
                    </span>
                    <div className="flex items-center gap-1 ml-auto">
                      <Link
                        href={`/quiz/${quiz.id}/edit`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8c909e] hover:text-[#acc7ff] hover:bg-[#acc7ff]/10 transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">
                          edit
                        </span>
                      </Link>
                      <Link
                        href={`/quiz/${quiz.id}/analytics`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8c909e] hover:text-[#acc7ff] hover:bg-[#acc7ff]/10 transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">
                          leaderboard
                        </span>
                      </Link>
                      <Link
                        href={`/quiz/${quiz.id}/share`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8c909e] hover:text-[#acc7ff] hover:bg-[#acc7ff]/10 transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">
                          share
                        </span>
                      </Link>
                      <DeleteQuizButton quizId={quiz.id} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop layout */}
              <div className="hidden sm:flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#262a33" }}
                >
                  <span className="material-symbols-outlined text-sm text-[#8c909e]">
                    quiz
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3
                      className="font-bold text-[#dfe2ee] truncate"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {quiz.title}
                    </h3>
                    {quiz.difficulty && (
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${getDifficultyBg(quiz.difficulty)}`}
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {quiz.difficulty}
                      </span>
                    )}
                  </div>
                  <div
                    className="flex items-center gap-3 text-xs text-[#424753]"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">
                        quiz
                      </span>
                      {quiz.questions_count} Qs
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">
                        groups
                      </span>
                      {quiz.attempts_count} attempts
                    </span>
                    {quiz.avg_score && (
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">
                          grade
                        </span>
                        {Math.round(quiz.avg_score)}% avg
                      </span>
                    )}
                    <span>{formatRelativeTime(quiz.updated_at)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold"
                    style={{
                      background:
                        quiz.status === "published" ? "#45dfa420" : "#262a33",
                      color:
                        quiz.status === "published" ? "#45dfa4" : "#8c909e",
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    {quiz.status}
                  </span>
                  <Link
                    href={`/quiz/${quiz.id}/edit`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8c909e] hover:text-[#acc7ff] hover:bg-[#acc7ff]/10 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">
                      edit
                    </span>
                  </Link>
                  <Link
                    href={`/quiz/${quiz.id}/analytics`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8c909e] hover:text-[#acc7ff] hover:bg-[#acc7ff]/10 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">
                      leaderboard
                    </span>
                  </Link>
                  <Link
                    href={`/quiz/${quiz.id}/share`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8c909e] hover:text-[#acc7ff] hover:bg-[#acc7ff]/10 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">
                      share
                    </span>
                  </Link>
                  <DeleteQuizButton quizId={quiz.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
