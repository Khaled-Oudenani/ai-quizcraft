import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function StudentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get all quiz IDs for this user
  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("id, title")
    .eq("user_id", user?.id);

  const quizIds = quizzes?.map((q) => q.id) || [];

  // Get all attempts across all quizzes
  const { data: attempts } = quizIds.length
    ? await supabase
        .from("quiz_attempts")
        .select("*, quiz:quiz_id(title)")
        .in("quiz_id", quizIds)
        .order("completed_at", { ascending: false })
        .limit(50)
    : { data: [] };

  // Aggregate unique students
  const studentMap = new Map<string, { name: string; email?: string; attempts: number; avgScore: number; lastAttempt: string }>();
  (attempts || []).forEach((a) => {
    const key = a.student_email || a.student_name;
    if (studentMap.has(key)) {
      const s = studentMap.get(key)!;
      s.attempts += 1;
      s.avgScore = (s.avgScore * (s.attempts - 1) + a.percentage) / s.attempts;
      if (new Date(a.completed_at) > new Date(s.lastAttempt)) s.lastAttempt = a.completed_at;
    } else {
      studentMap.set(key, {
        name: a.student_name,
        email: a.student_email,
        attempts: 1,
        avgScore: a.percentage,
        lastAttempt: a.completed_at,
      });
    }
  });

  const students = Array.from(studentMap.values()).sort((a, b) => new Date(b.lastAttempt).getTime() - new Date(a.lastAttempt).getTime());

  return (
    <div className="max-w-5xl mx-auto p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#dfe2ee] tracking-tight" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
          Students
        </h1>
        <p className="text-[#8c909e] mt-1 text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>
          {students.length} unique students across all quizzes
        </p>
      </div>

      {students.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-[#424753]/20" style={{ background: "#181c24" }}>
          <div className="w-14 h-14 rounded-2xl bg-[#acc7ff]/10 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-2xl text-[#acc7ff]">group</span>
          </div>
          <h3 className="font-bold text-[#dfe2ee] mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>No students yet</h3>
          <p className="text-sm text-[#8c909e] max-w-xs mb-5" style={{ fontFamily: "Manrope, sans-serif" }}>
            Publish a quiz and share the link to start collecting student responses.
          </p>
          <Link href="/quiz/create" className="px-5 py-3 rounded-xl text-sm font-bold text-[#00285b]" style={{ background: "linear-gradient(to bottom, #acc7ff, #508ff8)", fontFamily: "Manrope, sans-serif" }}>
            Create Quiz
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-[#424753]/20 overflow-hidden" style={{ background: "#181c24" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#0f131c" }}>
                  {["Student", "Attempts", "Avg Score", "Last Active"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-bold text-[#8c909e] uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((student, i) => (
                  <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                          style={{ background: "#acc7ff" + "20", color: "#acc7ff", fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#dfe2ee]" style={{ fontFamily: "Manrope, sans-serif" }}>{student.name}</p>
                          {student.email && <p className="text-xs text-[#424753]" style={{ fontFamily: "Manrope, sans-serif" }}>{student.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-[#dfe2ee]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{student.attempts}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-sm font-bold"
                        style={{ color: student.avgScore >= 60 ? "#45dfa4" : "#ffb4ab", fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {Math.round(student.avgScore)}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#424753]" style={{ fontFamily: "Manrope, sans-serif" }}>
                        {new Date(student.lastAttempt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
