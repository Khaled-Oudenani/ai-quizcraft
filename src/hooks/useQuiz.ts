"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Quiz, Question } from "@/types";

export function useQuiz(quizId: string) {
  const supabase = createClient();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quizId) return;
    loadQuiz();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  async function loadQuiz() {
    setLoading(true);
    setError(null);

    const [quizRes, questionsRes] = await Promise.all([
      supabase.from("quizzes").select("*").eq("id", quizId).single(),
      supabase.from("questions").select("*").eq("quiz_id", quizId).order("order"),
    ]);

    if (quizRes.error) {
      setError(quizRes.error.message);
    } else {
      setQuiz(quizRes.data);
    }

    if (questionsRes.data) {
      setQuestions(
        questionsRes.data.map((q) => ({
          ...q,
          options: q.options ? JSON.parse(q.options) : null,
          correct_answer: JSON.parse(q.correct_answer),
        }))
      );
    }

    setLoading(false);
  }

  async function updateQuiz(updates: Partial<Quiz>) {
    if (!quiz) return;
    const { data } = await supabase
      .from("quizzes")
      .update(updates)
      .eq("id", quizId)
      .select()
      .single();
    if (data) setQuiz(data);
  }

  async function publishQuiz() {
    await updateQuiz({ status: "published" });
  }

  async function unpublishQuiz() {
    await updateQuiz({ status: "draft" });
  }

  return {
    quiz,
    questions,
    loading,
    error,
    refetch: loadQuiz,
    updateQuiz,
    publishQuiz,
    unpublishQuiz,
  };
}

export function useQuizList() {
  const supabase = createClient();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadQuizzes() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data } = await supabase
      .from("quizzes")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (data) setQuizzes(data);
    setLoading(false);
  }

  async function deleteQuiz(quizId: string) {
    await supabase.from("quizzes").delete().eq("id", quizId);
    setQuizzes((prev) => prev.filter((q) => q.id !== quizId));
  }

  return { quizzes, loading, refetch: loadQuizzes, deleteQuiz };
}
