"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
} from "recharts";
import type { Quiz, QuizAttempt, Question } from "@/types";

export default function AnalyticsPage() {
  const params = useParams();
  const supabase = createClient();
  const quizId = params.id as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [quizRes, attemptsRes, questionsRes] = await Promise.all([
        supabase.from("quizzes").select("*").eq("id", quizId).single(),
        supabase.from("quiz_attempts").select("*").eq("quiz_id", quizId).order("completed_at", { ascending: false }),
        supabase.from("questions").select("*").eq("quiz_id", quizId).order("order"),
      ]);

      if (quizRes.data) setQuiz(quizRes.data);
      if (attemptsRes.data) setAttempts(attemptsRes.data);
      if (questionsRes.data) setQuestions(questionsRes.data.map((q) => ({
        ...q,
        options: q.options ? JSON.parse(q.options) : null,
        correct_answer: JSON.parse(q.correct_answer),
      })));
      setLoading(false);
    }
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  const avgScore = attempts.length > 0
    ? Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length)
    : 0;
  const passRate = attempts.length > 0
    ? Math.round(attempts.filter((a) => a.percentage >= (quiz?.pass_mark || 60)).length / attempts.length * 100)
    : 0;
  const avgTime = attempts.length > 0 && attempts.some((a) => a.time_taken)
    ? Math.round(attempts.filter((a) => a.time_taken).reduce((sum, a) => sum + (a.time_taken || 0), 0) / attempts.filter((a) => a.time_taken).length)
    : null;

  // Score distribution
  const distribution = [
    { range: "0-20%", count: attempts.filter((a) => a.percentage < 20).length },
    { range: "20-40%", count: attempts.filter((a) => a.percentage >= 20 && a.percentage < 40).length },
    { range: "40-60%", count: attempts.filter((a) => a.percentage >= 40 && a.percentage < 60).length },
    { range: "60-80%", count: attempts.filter((a) => a.percentage >= 60 && a.percentage < 80).length },
    { range: "80-100%", count: attempts.filter((a) => a.percentage >= 80).length },
  ];

  // Score over time (last 20)
  const scoreTimeline = attempts.slice(0, 20).reverse().map((a, i) => ({
    attempt: i + 1,
    score: Math.round(a.percentage),
  }));

  const customTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="px-3 py-2 rounded-lg border border-[#424753]/40 text-xs" style={{ background: "#262a33", fontFamily: "Manrope, sans-serif" }}>
          <p className="text-[#8c909e]">{label}</p>
          <p className="text-[#acc7ff] font-bold">{payload[0].value}{typeof payload[0].value === 'number' && payload[0].value <= 100 && label !== distribution[0]?.range ? "%" : ""}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex h-screen" style={{ background: "#0f131c" }}>
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-[#acc7ff] animate-spin">refresh</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#0f131c" }}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto neural-mesh p-8 lg:p-10" style={{ background: "#0a0e16" }}>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <Link href="/dashboard" className="text-xs text-[#8c909e] hover:text-[#acc7ff] flex items-center gap-1 mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>
                <span className="material-symbols-outlined text-xs">arrow_back</span>
                Dashboard
              </Link>
              <h1 className="text-3xl font-black text-[#dfe2ee] tracking-tight" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                Analytics
              </h1>
              <p className="text-[#8c909e] mt-1 text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>
                {quiz?.title} · {attempts.length} attempts
              </p>
            </div>
            <Link
              href={`/quiz/${quizId}/share`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all hover:brightness-110 text-[#00285b]"
              style={{ background: "linear-gradient(to bottom, #acc7ff, #508ff8)", fontFamily: "Manrope, sans-serif" }}
            >
              <span className="material-symbols-outlined text-sm">share</span>
              Share
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Attempts", val: attempts.length, icon: "groups", color: "#acc7ff" },
              { label: "Average Score", val: `${avgScore}%`, icon: "grade", color: "#45dfa4" },
              { label: "Pass Rate", val: `${passRate}%`, icon: "check_circle", color: "#ffb95f" },
              { label: "Avg Time", val: avgTime ? `${Math.floor(avgTime / 60)}m ${avgTime % 60}s` : "—", icon: "schedule", color: "#c084fc" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl p-5 border border-[#424753]/20" style={{ background: "#181c24" }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: stat.color + "15" }}>
                  <span className="material-symbols-outlined text-sm" style={{ color: stat.color }}>{stat.icon}</span>
                </div>
                <p className="text-2xl font-black text-[#dfe2ee]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{stat.val}</p>
                <p className="text-xs text-[#8c909e] mt-0.5 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {attempts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-[#424753]/20" style={{ background: "#181c24" }}>
              <div className="w-14 h-14 rounded-2xl bg-[#acc7ff]/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl text-[#acc7ff]">leaderboard</span>
              </div>
              <h3 className="font-bold text-[#dfe2ee] mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>No attempts yet</h3>
              <p className="text-sm text-[#8c909e] max-w-xs mb-5" style={{ fontFamily: "Manrope, sans-serif" }}>
                Share your quiz to start collecting responses and see analytics here.
              </p>
              <Link href={`/quiz/${quizId}/share`} className="px-4 py-2.5 rounded-xl text-sm font-bold text-[#00285b]" style={{ background: "linear-gradient(to bottom, #acc7ff, #508ff8)", fontFamily: "Manrope, sans-serif" }}>
                Share Quiz
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Score Distribution */}
              <div className="rounded-2xl p-6 border border-[#424753]/20" style={{ background: "#181c24" }}>
                <h3 className="font-bold text-[#dfe2ee] mb-5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Score Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={distribution} barSize={28}>
                    <XAxis dataKey="range" tick={{ fill: "#8c909e", fontSize: 11, fontFamily: "Manrope" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#8c909e", fontSize: 11, fontFamily: "Manrope" }} axisLine={false} tickLine={false} />
                    <Tooltip content={customTooltip} cursor={{ fill: "rgba(172,199,255,0.05)" }} />
                    <Bar dataKey="count" fill="#508ff8" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Score Timeline */}
              <div className="rounded-2xl p-6 border border-[#424753]/20" style={{ background: "#181c24" }}>
                <h3 className="font-bold text-[#dfe2ee] mb-5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Score Timeline</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={scoreTimeline}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262a33" />
                    <XAxis dataKey="attempt" tick={{ fill: "#8c909e", fontSize: 11, fontFamily: "Manrope" }} axisLine={false} tickLine={false} label={{ value: "Attempt #", position: "insideBottom", fill: "#424753", fontSize: 10 }} />
                    <YAxis tick={{ fill: "#8c909e", fontSize: 11, fontFamily: "Manrope" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip content={customTooltip} />
                    <Line type="monotone" dataKey="score" stroke="#45dfa4" strokeWidth={2} dot={{ fill: "#45dfa4", r: 3 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Recent Attempts Table */}
          {attempts.length > 0 && (
            <div className="rounded-2xl border border-[#424753]/20 overflow-hidden" style={{ background: "#181c24" }}>
              <div className="px-6 py-4 border-b border-white/5">
                <h3 className="font-bold text-[#dfe2ee]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Recent Attempts</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: "#0f131c" }}>
                      {["Student", "Score", "Time", "Date"].map((h) => (
                        <th key={h} className="px-6 py-3 text-left text-xs font-bold text-[#8c909e] uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {attempts.slice(0, 10).map((attempt) => (
                      <tr key={attempt.id} className="border-t border-white/5 hover:bg-white/2 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-[#dfe2ee]" style={{ fontFamily: "Manrope, sans-serif" }}>{attempt.student_name}</p>
                            {attempt.student_email && <p className="text-xs text-[#424753]" style={{ fontFamily: "Manrope, sans-serif" }}>{attempt.student_email}</p>}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-sm font-bold"
                              style={{
                                color: attempt.percentage >= (quiz?.pass_mark || 60) ? "#45dfa4" : "#ffb4ab",
                                fontFamily: "Space Grotesk, sans-serif",
                              }}
                            >
                              {Math.round(attempt.percentage)}%
                            </span>
                            <span className="text-xs text-[#424753]" style={{ fontFamily: "Manrope, sans-serif" }}>
                              ({attempt.score}/{attempt.max_score})
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>
                            {attempt.time_taken
                              ? `${Math.floor(attempt.time_taken / 60)}m ${attempt.time_taken % 60}s`
                              : "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-[#424753]" style={{ fontFamily: "Manrope, sans-serif" }}>
                            {new Date(attempt.completed_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
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
      </main>
    </div>
  );
}
