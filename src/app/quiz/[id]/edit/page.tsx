"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import type { Quiz, Question } from "@/types";

export default function QuizEditPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const quizId = params.id as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [editingQuiz, setEditingQuiz] = useState(false);

  useEffect(() => {
    loadQuiz();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  async function loadQuiz() {
    setLoading(true);
    const [quizRes, questionsRes] = await Promise.all([
      supabase.from("quizzes").select("*").eq("id", quizId).single(),
      supabase.from("questions").select("*").eq("quiz_id", quizId).order("order"),
    ]);

    if (quizRes.data) setQuiz(quizRes.data);
    if (questionsRes.data) setQuestions(questionsRes.data.map((q) => ({
      ...q,
      options: q.options ? JSON.parse(q.options) : null,
      correct_answer: JSON.parse(q.correct_answer),
    })));
    setLoading(false);
  }

  async function handlePublish() {
    setSaving(true);
    await supabase.from("quizzes").update({ status: "published" }).eq("id", quizId);
    setQuiz((prev) => prev ? { ...prev, status: "published" } : null);
    setSaving(false);
    router.push(`/quiz/${quizId}/share`);
  }

  async function updateQuestion(qId: string, updates: Partial<Question>) {
    setQuestions((prev) => prev.map((q) => q.id === qId ? { ...q, ...updates } : q));
    const dbUpdates: Record<string, unknown> = { ...updates };
    if (updates.options) dbUpdates.options = JSON.stringify(updates.options);
    if (updates.correct_answer) dbUpdates.correct_answer = JSON.stringify(updates.correct_answer);
    await supabase.from("questions").update(dbUpdates).eq("id", qId);
  }

  async function deleteQuestion(qId: string) {
    await supabase.from("questions").delete().eq("id", qId);
    setQuestions((prev) => prev.filter((q) => q.id !== qId));
    if (activeQuestion === qId) setActiveQuestion(null);
  }

  if (loading) {
    return (
      <div className="flex h-screen" style={{ background: "#0f131c" }}>
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-[#acc7ff] animate-spin">refresh</span>
            <p className="text-[#8c909e] text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>Loading quiz…</p>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex h-screen" style={{ background: "#0f131c" }}>
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>Quiz not found.</p>
        </div>
      </div>
    );
  }

  const activeQ = questions.find((q) => q.id === activeQuestion);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#0f131c" }}>
      <Sidebar />
      <div className="flex-1 flex overflow-hidden">
        {/* Question List Panel */}
        <div
          className="w-80 flex flex-col border-r border-white/5 overflow-y-auto"
          style={{ background: "#0a0e16" }}
        >
          {/* Header */}
          <div className="p-5 border-b border-white/5">
            <div className="flex justify-between items-start gap-2 mb-4">
              <div className="flex-1 min-w-0">
                {editingQuiz ? (
                  <input
                    autoFocus
                    value={quiz.title}
                    onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                    onBlur={async () => {
                      await supabase.from("quizzes").update({ title: quiz.title }).eq("id", quizId);
                      setEditingQuiz(false);
                    }}
                    className="w-full bg-transparent text-[#dfe2ee] font-bold outline-none border-b border-[#acc7ff]"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  />
                ) : (
                  <h2
                    className="font-bold text-[#dfe2ee] truncate cursor-pointer hover:text-[#acc7ff] transition-colors"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    onClick={() => setEditingQuiz(true)}
                  >
                    {quiz.title}
                  </h2>
                )}
                <p className="text-xs text-[#8c909e] mt-0.5" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {questions.length} questions
                </p>
              </div>
              <span
                className="px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0"
                style={{
                  background: quiz.status === "published" ? "#45dfa4" + "20" : "#262a33",
                  color: quiz.status === "published" ? "#45dfa4" : "#8c909e",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {quiz.status}
              </span>
            </div>

            <button
              onClick={handlePublish}
              disabled={saving || quiz.status === "published"}
              className="w-full py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{
                background: quiz.status === "published" ? "#262a33" : "linear-gradient(to bottom, #acc7ff, #508ff8)",
                color: quiz.status === "published" ? "#8c909e" : "#00285b",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              <span className="material-symbols-outlined text-sm">
                {quiz.status === "published" ? "public" : "rocket_launch"}
              </span>
              {quiz.status === "published" ? "Published" : saving ? "Publishing…" : "Publish Quiz"}
            </button>
          </div>

          {/* Quick actions */}
          <div className="flex gap-1 p-3 border-b border-white/5">
            {[
              { icon: "share", label: "Share", href: `/quiz/${quizId}/share` },
              { icon: "leaderboard", label: "Analytics", href: `/quiz/${quizId}/analytics` },
              { icon: "visibility", label: "Preview", href: `/quiz/${quizId}/take` },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex-1 flex flex-col items-center gap-1 py-2 rounded-lg hover:bg-white/5 transition-all"
              >
                <span className="material-symbols-outlined text-sm text-[#8c909e]">{action.icon}</span>
                <span className="text-[10px] text-[#424753]" style={{ fontFamily: "Manrope, sans-serif" }}>{action.label}</span>
              </Link>
            ))}
          </div>

          {/* Questions List */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setActiveQuestion(q.id === activeQuestion ? null : q.id)}
                className="w-full text-left p-3 rounded-xl border transition-all"
                style={{
                  background: activeQuestion === q.id ? "rgba(172,199,255,0.08)" : "#181c24",
                  borderColor: activeQuestion === q.id ? "#acc7ff40" : "#424753" + "40",
                }}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className="w-5 h-5 rounded text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: activeQuestion === q.id ? "#acc7ff" : "#262a33",
                      color: activeQuestion === q.id ? "#001a40" : "#8c909e",
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs text-[#dfe2ee] line-clamp-2 leading-relaxed"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {q.question}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                        style={{
                          background: "#262a33",
                          color: "#8c909e",
                          fontFamily: "Manrope, sans-serif",
                        }}
                      >
                        {q.type.replace("_", " ")}
                      </span>
                      <span className="text-[10px] text-[#424753]" style={{ fontFamily: "Manrope, sans-serif" }}>
                        {q.points}pt
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Question Editor Panel */}
        <div className="flex-1 overflow-y-auto neural-mesh" style={{ background: "#0f131c" }}>
          {activeQ ? (
            <div className="max-w-2xl mx-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[#dfe2ee]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Edit Question {questions.findIndex((q) => q.id === activeQ.id) + 1}
                </h3>
                <button
                  onClick={() => deleteQuestion(activeQ.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#ffb4ab] bg-[#ffb4ab]/10 hover:bg-[#ffb4ab]/20 transition-all"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                  Delete
                </button>
              </div>

              <div className="flex flex-col gap-5">
                {/* Question text */}
                <div>
                  <label className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>
                    Question
                  </label>
                  <textarea
                    value={activeQ.question}
                    onChange={(e) => updateQuestion(activeQ.id, { question: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none resize-none transition-all"
                    style={{ background: "#181c24", border: "1px solid #424753", fontFamily: "Manrope, sans-serif" }}
                    onFocus={(e) => { e.target.style.borderColor = "#acc7ff"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#424753"; }}
                  />
                </div>

                {/* Options for MCQ/TF */}
                {activeQ.options && (
                  <div>
                    <label className="block text-xs font-bold text-[#c2c6d5] mb-3 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>
                      Answer Options
                    </label>
                    <div className="flex flex-col gap-2">
                      {(activeQ.options as string[]).map((option, idx) => {
                        const isCorrect = activeQ.correct_answer === option;
                        return (
                          <div key={idx} className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuestion(activeQ.id, { correct_answer: option })}
                              className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0"
                              style={{
                                borderColor: isCorrect ? "#45dfa4" : "#424753",
                                background: isCorrect ? "#45dfa4" : "transparent",
                              }}
                            >
                              {isCorrect && <span className="material-symbols-outlined text-[10px] text-[#003825]">check</span>}
                            </button>
                            <input
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(activeQ.options as string[])];
                                const wasCorrect = activeQ.correct_answer === option;
                                newOptions[idx] = e.target.value;
                                updateQuestion(activeQ.id, {
                                  options: newOptions,
                                  ...(wasCorrect ? { correct_answer: e.target.value } : {}),
                                });
                              }}
                              className="flex-1 px-3 py-2.5 rounded-xl text-sm text-[#dfe2ee] outline-none transition-all"
                              style={{
                                background: isCorrect ? "#45dfa4" + "15" : "#181c24",
                                border: `1px solid ${isCorrect ? "#45dfa4" + "40" : "#424753"}`,
                                fontFamily: "Manrope, sans-serif",
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-xs text-[#8c909e] mt-2" style={{ fontFamily: "Manrope, sans-serif" }}>
                      Click the circle to mark the correct answer
                    </p>
                  </div>
                )}

                {/* Short answer correct answer */}
                {activeQ.type === "short_answer" && (
                  <div>
                    <label className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>
                      Expected Answer / Key Points
                    </label>
                    <textarea
                      value={activeQ.correct_answer as string}
                      onChange={(e) => updateQuestion(activeQ.id, { correct_answer: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] outline-none resize-none"
                      style={{ background: "#181c24", border: "1px solid #424753", fontFamily: "Manrope, sans-serif" }}
                      onFocus={(e) => { e.target.style.borderColor = "#acc7ff"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#424753"; }}
                    />
                  </div>
                )}

                {/* Explanation */}
                <div>
                  <label className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>
                    Explanation (optional)
                  </label>
                  <textarea
                    value={activeQ.explanation || ""}
                    onChange={(e) => updateQuestion(activeQ.id, { explanation: e.target.value })}
                    rows={2}
                    placeholder="Explain why this is the correct answer…"
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none resize-none"
                    style={{ background: "#181c24", border: "1px solid #424753", fontFamily: "Manrope, sans-serif" }}
                    onFocus={(e) => { e.target.style.borderColor = "#acc7ff"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#424753"; }}
                  />
                </div>

                {/* Points */}
                <div>
                  <label className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>Points</label>
                  <input
                    type="number"
                    value={activeQ.points}
                    onChange={(e) => updateQuestion(activeQ.id, { points: Number(e.target.value) })}
                    min={1} max={10}
                    className="w-24 px-4 py-3 rounded-xl text-sm text-[#dfe2ee] outline-none"
                    style={{ background: "#181c24", border: "1px solid #424753", fontFamily: "Manrope, sans-serif" }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
              <div className="w-14 h-14 rounded-2xl bg-[#acc7ff]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-[#acc7ff]">edit_note</span>
              </div>
              <div>
                <p className="font-bold text-[#dfe2ee]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Select a question to edit</p>
                <p className="text-sm text-[#8c909e] mt-1" style={{ fontFamily: "Manrope, sans-serif" }}>Click any question from the left panel</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
