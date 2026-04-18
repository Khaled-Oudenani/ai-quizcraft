export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Quiz {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  subject?: string;
  difficulty: "easy" | "medium" | "hard";
  status: "draft" | "published" | "archived";
  time_limit?: number; // in minutes
  pass_mark?: number; // percentage
  questions_count: number;
  attempts_count: number;
  avg_score?: number;
  share_token?: string;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  quiz_id: string;
  type: "multiple_choice" | "true_false" | "short_answer";
  question: string;
  options?: string[];
  correct_answer: string | string[];
  explanation?: string;
  points: number;
  order: number;
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  student_name: string;
  student_email?: string;
  answers: Record<string, string | string[]>;
  score: number;
  max_score: number;
  percentage: number;
  time_taken?: number; // in seconds
  completed_at: string;
}

export interface GenerateQuizParams {
  content: string;
  questionCount: number;
  difficulty: "easy" | "medium" | "hard";
  questionTypes: Array<"multiple_choice" | "true_false" | "short_answer">;
  subject?: string;
  language?: string;
}

export interface QuizStats {
  totalQuizzes: number;
  totalAttempts: number;
  avgScore: number;
  publishedQuizzes: number;
}
