"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Quiz, Question } from "@/types";

type Phase = "intro" | "quiz" | "submitted";

export default function TakeQuizPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const token = params.id as string;

  // إذا جاء من زر Preview في الـ editor يضيف ?preview=true
  const isPreview = searchParams.get("preview") === "true";

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    max: number;
    percentage: number;
  } | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    async function loadQuiz() {
      let quizData: Quiz | null = null;

      // ── 1. جرّب بـ share_token مع published ──
      const { data: byToken } = await supabase
        .from("quizzes")
        .select("*")
        .eq("share_token", token)
        .eq("status", "published")
        .single();

      if (byToken) {
        quizData = byToken;
      } else {
        // ── 2. جرّب بـ quiz ID (للـ preview من الـ editor) ──
        const { data: byId } = await supabase
          .from("quizzes")
          .select("*")
          .eq("id", token)
          .single();

        if (byId) {
          quizData = byId;
        }
      }

      if (!quizData) {
        setNotFound(true);
        return;
      }

      setQuiz(quizData);
      if (quizData.time_limit) setTimeLeft(quizData.time_limit * 60);

      // ── جلب الأسئلة ──
      const { data: questionsData } = await supabase
        .from("questions")
        .select("*")
        .eq("quiz_id", quizData.id)
        .order("order");

      if (questionsData) {
        setQuestions(
          questionsData.map((q) => ({
            ...q,
            options: q.options ? JSON.parse(q.options) : null,
            correct_answer: JSON.parse(q.correct_answer),
          })),
        );
      }
    }

    loadQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ── Timer ──
  useEffect(() => {
    if (phase !== "quiz" || timeLeft === null) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t === null || t <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timeLeft === null]);

  const handleSubmit = useCallback(async () => {
    if (submitting || !quiz) return;
    setSubmitting(true);

    let score = 0;
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0);

    questions.forEach((q) => {
      const answer = answers[q.id];
      const correct = q.correct_answer as string;
      if (
        answer &&
        answer.toLowerCase().trim() === correct.toLowerCase().trim()
      ) {
        score += q.points;
      }
    });

    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    const timeTaken = Math.round((Date.now() - startTime) / 1000);

    // لا تحفظ النتيجة إذا كان preview
    if (!isPreview) {
      await supabase.from("quiz_attempts").insert({
        quiz_id: quiz.id,
        student_name: studentName,
        student_email: studentEmail || null,
        answers: JSON.stringify(answers),
        score,
        max_score: maxScore,
        percentage,
        time_taken: timeTaken,
      });
    }

    setResult({ score, max: maxScore, percentage });
    setPhase("submitted");
    setSubmitting(false);
  }, [
    submitting,
    quiz,
    questions,
    answers,
    studentName,
    studentEmail,
    startTime,
    isPreview,
    supabase,
  ]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const currentQ = questions[currentIdx];
  const progress =
    questions.length > 0 ? ((currentIdx + 1) / questions.length) * 100 : 0;

  // ── Not Found ──
  if (notFound) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#0f131c" }}
      >
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#ffb4ab]/10 flex items-center justify-center mx-auto mb-5">
            <span className="material-symbols-outlined text-3xl text-[#ffb4ab]">
              error
            </span>
          </div>
          <h2
            className="text-xl font-black text-[#dfe2ee] mb-2"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            Quiz not found
          </h2>
          <p
            className="text-sm text-[#8c909e]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            This quiz may not be published yet or the link is invalid.
          </p>
        </div>
      </div>
    );
  }

  // ── Loading ──
  if (!quiz) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0f131c" }}
      >
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-[#acc7ff] animate-spin block mb-3">
            refresh
          </span>
          <p
            className="text-[#8c909e]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Loading quiz…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0f131c" }}>
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-10 border-b border-white/5 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between"
        style={{ background: "#0a0e16", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#acc7ff] text-base">
            psychology
          </span>
          <span
            className="font-black text-[#acc7ff] text-sm"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            QuizCraft AI
          </span>
          {/* Preview badge */}
          {isPreview && (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-black ml-1"
              style={{
                background: "#ffb95f20",
                color: "#ffb95f",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              PREVIEW
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {phase === "quiz" && timeLeft !== null && (
            <div
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold"
              style={{
                background: timeLeft < 60 ? "#ffb4ab20" : "#262a33",
                color: timeLeft < 60 ? "#ffb4ab" : "#dfe2ee",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              <span className="material-symbols-outlined text-sm">
                schedule
              </span>
              {formatTime(timeLeft)}
            </div>
          )}
          {phase === "quiz" && (
            <span
              className="text-xs text-[#8c909e]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {currentIdx + 1} / {questions.length}
            </span>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* ════════════════════════════
            INTRO PHASE
        ════════════════════════════ */}
        {phase === "intro" && (
          <div className="flex flex-col items-center text-center gap-5 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#acc7ff]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl sm:text-3xl text-[#acc7ff]">
                quiz
              </span>
            </div>

            <div>
              <h1
                className="text-2xl sm:text-3xl font-black text-[#dfe2ee] tracking-tight mb-2"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                {quiz.title}
              </h1>
              {quiz.description && (
                <p
                  className="text-[#8c909e] text-sm"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {quiz.description}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-sm">
              {[
                { icon: "quiz", label: "Questions", val: questions.length },
                {
                  icon: "schedule",
                  label: "Time",
                  val: quiz.time_limit ? `${quiz.time_limit}m` : "∞",
                },
                {
                  icon: "grade",
                  label: "Pass",
                  val: `${quiz.pass_mark || 60}%`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: "#181c24" }}
                >
                  <span className="material-symbols-outlined text-sm text-[#8c909e] block mb-1">
                    {item.icon}
                  </span>
                  <p
                    className="text-base sm:text-lg font-black text-[#dfe2ee]"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {item.val}
                  </p>
                  <p
                    className="text-[10px] text-[#424753] uppercase tracking-wider"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Student details */}
            <div
              className="rounded-2xl p-4 sm:p-6 border border-[#424753]/20 w-full"
              style={{ background: "#181c24" }}
            >
              <h3
                className="font-bold text-[#dfe2ee] mb-4 text-sm"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Your Details
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label
                    className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Name *
                  </label>
                  <input
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none"
                    style={{
                      background: "#0a0e16",
                      border: "1px solid #424753",
                      fontFamily: "Manrope, sans-serif",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#acc7ff";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#424753";
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Email{" "}
                    <span className="normal-case text-[#424753]">
                      (optional)
                    </span>
                  </label>
                  <input
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none"
                    style={{
                      background: "#0a0e16",
                      border: "1px solid #424753",
                      fontFamily: "Manrope, sans-serif",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#acc7ff";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#424753";
                    }}
                  />
                </div>
              </div>
            </div>

            {isPreview && (
              <p
                className="text-xs text-[#ffb95f] text-center"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                ⚠️ Preview mode — results will not be saved
              </p>
            )}

            <button
              onClick={() => {
                if (!studentName.trim()) return;
                setPhase("quiz");
                setStartTime(Date.now());
              }}
              disabled={!studentName.trim()}
              className="w-full max-w-sm py-3.5 sm:py-4 rounded-xl font-bold text-[#00285b] transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
                fontFamily: "Manrope, sans-serif",
                boxShadow: "0 0 20px rgba(79,142,247,0.3)",
              }}
            >
              Start Quiz →
            </button>
          </div>
        )}

        {/* ════════════════════════════
            QUIZ PHASE
        ════════════════════════════ */}
        {phase === "quiz" && currentQ && (
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Progress bar */}
            <div>
              <div
                className="h-1.5 rounded-full overflow-hidden mb-2"
                style={{ background: "#262a33" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(to right, #acc7ff, #508ff8)",
                  }}
                />
              </div>
              <div
                className="flex justify-between text-xs text-[#424753]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                <span>
                  {Math.round(
                    (Object.keys(answers).length / questions.length) * 100,
                  )}
                  % answered
                </span>
                <span>
                  {questions.length - Object.keys(answers).length} remaining
                </span>
              </div>
            </div>

            {/* Question Card */}
            <div
              className="rounded-2xl p-5 sm:p-7 border border-[#424753]/20"
              style={{ background: "#181c24" }}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-5">
                <span
                  className="w-6 h-6 rounded text-[11px] font-black flex items-center justify-center shrink-0"
                  style={{
                    background: "#acc7ff",
                    color: "#001a40",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  {currentIdx + 1}
                </span>
                <span
                  className="text-[11px] font-bold text-[#8c909e] uppercase tracking-wider"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {currentQ.type.replace("_", " ")} · {currentQ.points} pt
                  {currentQ.points > 1 ? "s" : ""}
                </span>
              </div>

              <p
                className="text-base sm:text-lg font-semibold text-[#dfe2ee] mb-5 sm:mb-7 leading-relaxed"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {currentQ.question}
              </p>

              {/* MCQ / True-False options */}
              {currentQ.options && (
                <div className="flex flex-col gap-2 sm:gap-3">
                  {(currentQ.options as string[]).map((option, i) => {
                    const isSelected = answers[currentQ.id] === option;
                    const labels = ["A", "B", "C", "D"];
                    return (
                      <button
                        key={i}
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentQ.id]: option,
                          }))
                        }
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border text-left transition-all"
                        style={{
                          background: isSelected
                            ? "rgba(172,199,255,0.1)"
                            : "#0a0e16",
                          borderColor: isSelected ? "#acc7ff60" : "#424753",
                        }}
                      >
                        <span
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0"
                          style={{
                            background: isSelected ? "#acc7ff" : "#262a33",
                            color: isSelected ? "#001a40" : "#8c909e",
                            fontFamily: "Manrope, sans-serif",
                          }}
                        >
                          {labels[i]}
                        </span>
                        <span
                          className="text-sm"
                          style={{
                            color: isSelected ? "#dfe2ee" : "#c2c6d5",
                            fontFamily: "Manrope, sans-serif",
                          }}
                        >
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Short Answer */}
              {currentQ.type === "short_answer" && (
                <textarea
                  value={answers[currentQ.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQ.id]: e.target.value,
                    }))
                  }
                  placeholder="Type your answer here…"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none resize-none transition-all"
                  style={{
                    background: "#0a0e16",
                    border: "1px solid #424753",
                    fontFamily: "Manrope, sans-serif",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#acc7ff";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#424753";
                  }}
                />
              )}
            </div>

            {/* Prev / Next / Submit */}
            <div className="flex justify-between gap-3">
              <button
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                disabled={currentIdx === 0}
                className="px-4 sm:px-5 py-3 rounded-xl font-bold text-sm text-[#8c909e] bg-[#262a33] hover:bg-[#31353e] transition-all disabled:opacity-30"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                ← Prev
              </button>

              {currentIdx < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx((i) => i + 1)}
                  className="flex-1 py-3 rounded-xl font-bold text-sm transition-all hover:brightness-110"
                  style={{
                    background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
                    color: "#00285b",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl font-bold text-sm transition-all hover:brightness-110 disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{
                    background: "#45dfa4",
                    color: "#003825",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  <span className="material-symbols-outlined text-sm">
                    check_circle
                  </span>
                  {submitting ? "Submitting…" : "Submit Quiz"}
                </button>
              )}
            </div>

            {/* Question dots */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(i)}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all"
                  style={{
                    background:
                      i === currentIdx
                        ? "#acc7ff"
                        : answers[q.id]
                          ? "#45dfa430"
                          : "#262a33",
                    color:
                      i === currentIdx
                        ? "#001a40"
                        : answers[q.id]
                          ? "#45dfa4"
                          : "#8c909e",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════
            RESULTS PHASE
        ════════════════════════════ */}
        {phase === "submitted" && result && (
          <div className="flex flex-col items-center text-center gap-6 sm:gap-7">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
              style={{
                background:
                  result.percentage >= (quiz.pass_mark || 60)
                    ? "#45dfa420"
                    : "#ffb4ab20",
              }}
            >
              <span
                className="material-symbols-outlined text-4xl sm:text-5xl"
                style={{
                  color:
                    result.percentage >= (quiz.pass_mark || 60)
                      ? "#45dfa4"
                      : "#ffb4ab",
                }}
              >
                {result.percentage >= (quiz.pass_mark || 60)
                  ? "emoji_events"
                  : "sentiment_dissatisfied"}
              </span>
            </div>

            <div>
              <h1
                className="text-2xl sm:text-3xl font-black text-[#dfe2ee] tracking-tight mb-2"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                {result.percentage >= (quiz.pass_mark || 60)
                  ? "Great job!"
                  : "Keep practicing!"}
              </h1>
              <p
                className="text-[#8c909e] text-sm sm:text-base"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                You scored{" "}
                <span
                  className="font-bold"
                  style={{
                    color:
                      result.percentage >= (quiz.pass_mark || 60)
                        ? "#45dfa4"
                        : "#ffb4ab",
                  }}
                >
                  {result.percentage}%
                </span>{" "}
                on {quiz.title}
              </p>
              {isPreview && (
                <p
                  className="text-xs text-[#ffb95f] mt-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Preview mode — this result was not saved
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-sm">
              {[
                {
                  label: "Score",
                  val: `${result.score}/${result.max}`,
                  color: "#acc7ff",
                },
                {
                  label: "Percentage",
                  val: `${result.percentage}%`,
                  color:
                    result.percentage >= (quiz.pass_mark || 60)
                      ? "#45dfa4"
                      : "#ffb4ab",
                },
                {
                  label: "Result",
                  val:
                    result.percentage >= (quiz.pass_mark || 60)
                      ? "Pass ✓"
                      : "Fail ✗",
                  color:
                    result.percentage >= (quiz.pass_mark || 60)
                      ? "#45dfa4"
                      : "#ffb4ab",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-3 sm:p-4 text-center"
                  style={{ background: "#181c24" }}
                >
                  <p
                    className="text-lg sm:text-xl font-black mb-1"
                    style={{
                      color: item.color,
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    {item.val}
                  </p>
                  <p
                    className="text-[10px] text-[#424753] uppercase tracking-wider"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
