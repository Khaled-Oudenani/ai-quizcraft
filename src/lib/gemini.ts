// import { GoogleGenerativeAI } from "@google/generative-ai";
// import type { GenerateQuizParams, Question } from "@/types";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function generateQuizFromContent(
//   params: GenerateQuizParams,
// ): Promise<Omit<Question, "id" | "quiz_id" | "created_at">[]> {
//   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//   const questionTypesStr = params.questionTypes.join(", ");
//   const difficultyInstructions = {
//     easy: "Use simple, direct questions testing basic recall and understanding.",
//     medium:
//       "Use questions requiring comprehension and application of concepts.",
//     hard: "Use complex questions requiring analysis, synthesis, and critical thinking.",
//   };

//   const prompt = `You are an expert educational quiz generator. Generate exactly ${params.questionCount} quiz questions from the following content.

// CONTENT:
// ${params.content.substring(0, 8000)}

// REQUIREMENTS:
// - Difficulty: ${params.difficulty} - ${difficultyInstructions[params.difficulty]}
// - Question types to use: ${questionTypesStr}
// - Subject area: ${params.subject || "General"}
// - Language: ${params.language || "English"}
// - Distribute question types evenly if multiple types specified

// STRICT OUTPUT FORMAT - Return ONLY a valid JSON array, no markdown, no explanation:
// [
//   {
//     "type": "multiple_choice",
//     "question": "Question text here?",
//     "options": ["Option A", "Option B", "Option C", "Option D"],
//     "correct_answer": "Option A",
//     "explanation": "Brief explanation of why this is correct",
//     "points": 1,
//     "order": 1
//   },
//   {
//     "type": "true_false",
//     "question": "Statement to evaluate as true or false?",
//     "options": ["True", "False"],
//     "correct_answer": "True",
//     "explanation": "Brief explanation",
//     "points": 1,
//     "order": 2
//   },
//   {
//     "type": "short_answer",
//     "question": "Question requiring a brief written answer?",
//     "options": null,
//     "correct_answer": "Expected answer or key points",
//     "explanation": "Brief explanation",
//     "points": 2,
//     "order": 3
//   }
// ]

// Rules:
// - For multiple_choice: always provide exactly 4 options
// - For true_false: options must be ["True", "False"]
// - For short_answer: options must be null
// - correct_answer must exactly match one of the options (for mc and tf)
// - Make questions diverse and cover different parts of the content
// - Ensure questions are clear and unambiguous`;

//   const result = await model.generateContent(prompt);
//   const text = result.response.text();

//   // Clean the response - remove markdown code blocks if present
//   const cleaned = text
//     .replace(/```json\n?/g, "")
//     .replace(/```\n?/g, "")
//     .trim();

//   const questions = JSON.parse(cleaned);

//   if (!Array.isArray(questions)) {
//     throw new Error("Invalid response format from AI");
//   }

//   return questions.map((q, index) => ({
//     type: q.type,
//     question: q.question,
//     options: q.options,
//     correct_answer: q.correct_answer,
//     explanation: q.explanation || "",
//     points: q.points || 1,
//     order: index + 1,
//   }));
// }

// export async function suggestQuizTitle(content: string): Promise<string> {
//   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//   const prompt = `Based on this educational content, suggest a concise, engaging quiz title (max 8 words). Return ONLY the title, nothing else.

// Content preview: ${content.substring(0, 500)}`;

//   const result = await model.generateContent(prompt);
//   return result.response.text().trim().replace(/["']/g, "");
// }

// export async function improveQuestion(
//   question: string,
//   options: string[],
// ): Promise<{ question: string; options: string[]; explanation: string }> {
//   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//   const prompt = `Improve this quiz question to be clearer and more educational. Return ONLY valid JSON.

// Original question: ${question}
// Options: ${options.join(", ")}

// Return format:
// {
//   "question": "improved question",
//   "options": ["option1", "option2", "option3", "option4"],
//   "explanation": "why this is a good question"
// }`;

//   const result = await model.generateContent(prompt);
//   const text = result.response
//     .text()
//     .replace(/```json\n?/g, "")
//     .replace(/```\n?/g, "")
//     .trim();
//   return JSON.parse(text);
// }

// 2222222

// import type { GenerateQuizParams, Question } from "@/types";

// // ── اختر النموذج الذي تريده من openrouter.ai/models ──
// // نماذج مجانية ممتازة:
// //   "google/gemini-2.0-flash-exp:free"
// //   "meta-llama/llama-3.3-70b-instruct:free"
// //   "deepseek/deepseek-chat:free"
// //   "mistralai/mistral-7b-instruct:free"
// const MODEL = "openrouter/free";

// async function callOpenRouter(
//   prompt: string,
//   systemPrompt?: string,
// ): Promise<string> {
//   const messages = [];

//   if (systemPrompt) {
//     messages.push({ role: "system", content: systemPrompt });
//   }
//   messages.push({ role: "user", content: prompt });

//   const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//       "Content-Type": "application/json",
//       "HTTP-Referer":
//         process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
//       "X-Title": "QuizCraft AI",
//     },
//     body: JSON.stringify({
//       model: MODEL,
//       messages,
//       temperature: 0.7,
//       max_tokens: 4000,
//     }),
//   });

//   if (!res.ok) {
//     const err = await res.json().catch(() => ({}));
//     throw new Error(err?.error?.message || `OpenRouter error: ${res.status}`);
//   }

//   const data = await res.json();
//   return data.choices?.[0]?.message?.content ?? "";
// }

// // ────────────────────────────────────────────
// // توليد أسئلة الكويز
// // ────────────────────────────────────────────
// export async function generateQuizFromContent(
//   params: GenerateQuizParams,
// ): Promise<Omit<Question, "id" | "quiz_id" | "created_at">[]> {
//   const difficultyInstructions = {
//     easy: "Use simple, direct questions testing basic recall and understanding.",
//     medium:
//       "Use questions requiring comprehension and application of concepts.",
//     hard: "Use complex questions requiring analysis, synthesis, and critical thinking.",
//   };

//   const prompt = `You are an expert educational quiz generator.
// Generate exactly ${params.questionCount} quiz questions from the content below.

// CONTENT:
// ${params.content.substring(0, 8000)}

// REQUIREMENTS:
// - Difficulty: ${params.difficulty} — ${difficultyInstructions[params.difficulty]}
// - Question types: ${params.questionTypes.join(", ")}
// - Subject: ${params.subject || "General"}
// - Language: ${params.language || "English"}

// Return ONLY a valid JSON array — no markdown, no explanation:
// [
//   {
//     "type": "multiple_choice",
//     "question": "Question text?",
//     "options": ["A", "B", "C", "D"],
//     "correct_answer": "A",
//     "explanation": "Why this is correct",
//     "points": 1,
//     "order": 1
//   },
//   {
//     "type": "true_false",
//     "question": "Statement?",
//     "options": ["True", "False"],
//     "correct_answer": "True",
//     "explanation": "Explanation",
//     "points": 1,
//     "order": 2
//   },
//   {
//     "type": "short_answer",
//     "question": "Question?",
//     "options": null,
//     "correct_answer": "Expected answer",
//     "explanation": "Explanation",
//     "points": 2,
//     "order": 3
//   }
// ]

// Rules:
// - multiple_choice: exactly 4 options
// - true_false: options must be ["True","False"]
// - short_answer: options must be null
// - correct_answer must match one of the options (for mc and tf)`;

//   const text = await callOpenRouter(prompt);

//   // تنظيف الـ response من markdown إذا وُجد
//   const cleaned = text
//     .replace(/```json\n?/g, "")
//     .replace(/```\n?/g, "")
//     .trim();

//   const questions = JSON.parse(cleaned);

//   if (!Array.isArray(questions)) {
//     throw new Error("Invalid response format from AI");
//   }

//   return questions.map((q, index) => ({
//     type: q.type,
//     question: q.question,
//     options: q.options,
//     correct_answer: q.correct_answer,
//     explanation: q.explanation || "",
//     points: q.points || 1,
//     order: index + 1,
//   }));
// }

// // ────────────────────────────────────────────
// // اقتراح عنوان للكويز
// // ────────────────────────────────────────────
// export async function suggestQuizTitle(content: string): Promise<string> {
//   const text = await callOpenRouter(
//     `Based on this educational content, suggest a concise engaging quiz title (max 8 words).
// Return ONLY the title, nothing else.

// Content preview: ${content.substring(0, 500)}`,
//   );
//   return text.trim().replace(/["']/g, "");
// }

// // ────────────────────────────────────────────
// // تحسين سؤال موجود
// // ────────────────────────────────────────────
// export async function improveQuestion(
//   question: string,
//   options: string[],
// ): Promise<{ question: string; options: string[]; explanation: string }> {
//   const text = await callOpenRouter(
//     `Improve this quiz question to be clearer and more educational.
// Return ONLY valid JSON, no markdown.

// Original: ${question}
// Options: ${options.join(", ")}

// Format:
// {
//   "question": "improved question",
//   "options": ["option1","option2","option3","option4"],
//   "explanation": "why this is a good question"
// }`,
//   );

//   const cleaned = text
//     .replace(/```json\n?/g, "")
//     .replace(/```\n?/g, "")
//     .trim();
//   return JSON.parse(cleaned);
// }

// 333333

import type { GenerateQuizParams, Question } from "@/types";

// ─── Config ────────────────────────────────────────────────────────────────
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

const DEFAULT_MODEL = "anthropic/claude-3.5-haiku";

async function callOpenRouter(
  prompt: string,
  systemPrompt?: string,
  model = DEFAULT_MODEL,
): Promise<string> {
  const messages: { role: string; content: string }[] = [];

  if (systemPrompt) {
    messages.push({ role: "system", content: systemPrompt });
  }
  messages.push({ role: "user", content: prompt });

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      "X-Title": "Quiz Generator App",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 4000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenRouter API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Empty response from OpenRouter");
  }

  return text;
}

// ─── Helper: clean + parse JSON ────────────────────────────────────────────
function parseJsonResponse<T>(text: string): T {
  const cleaned = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    throw new Error(
      `Failed to parse AI response as JSON.\nPreview: ${cleaned.substring(0, 300)}`,
    );
  }
}

// ─── Type للسؤال الخام من الـ AI ───────────────────────────────────────────
interface RawQuestion {
  type: string;
  question: string;
  options: string[] | null;
  correct_answer: string;
  explanation?: string;
  points?: number;
  order?: number;
}

// ─── 1. generateQuizFromContent ────────────────────────────────────────────
export async function generateQuizFromContent(
  params: GenerateQuizParams,
): Promise<Omit<Question, "id" | "quiz_id" | "created_at">[]> {
  const questionTypesStr = params.questionTypes.join(", ");
  const difficultyInstructions: Record<string, string> = {
    easy: "Use simple, direct questions testing basic recall and understanding.",
    medium:
      "Use questions requiring comprehension and application of concepts.",
    hard: "Use complex questions requiring analysis, synthesis, and critical thinking.",
  };

  const systemPrompt = `You are an expert educational quiz generator.
Return ONLY a valid JSON array with no markdown, no explanation, no preamble.`;

  const prompt = `Generate exactly ${params.questionCount} quiz questions from the content below.

CONTENT:
${params.content.substring(0, 8000)}

REQUIREMENTS:
- Difficulty: ${params.difficulty} - ${difficultyInstructions[params.difficulty]}
- Question types: ${questionTypesStr}
- Subject: ${params.subject || "General"}
- Language: ${params.language || "English"}
- Distribute question types evenly if multiple types are specified

OUTPUT FORMAT (JSON array only, no markdown):
[
  {
    "type": "multiple_choice",
    "question": "Question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_answer": "Option A",
    "explanation": "Why this answer is correct",
    "points": 1,
    "order": 1
  },
  {
    "type": "true_false",
    "question": "Statement to evaluate?",
    "options": ["True", "False"],
    "correct_answer": "True",
    "explanation": "Explanation",
    "points": 1,
    "order": 2
  },
  {
    "type": "short_answer",
    "question": "Question requiring a brief answer?",
    "options": null,
    "correct_answer": "Expected answer or key points",
    "explanation": "Explanation",
    "points": 2,
    "order": 3
  }
]

Rules:
- multiple_choice: exactly 4 options
- true_false: options must be ["True", "False"]
- short_answer: options must be null
- correct_answer must exactly match one of the options (for mc and tf)
- Questions must be diverse and cover different parts of the content`;

  const text = await callOpenRouter(prompt, systemPrompt);
  const raw = parseJsonResponse<RawQuestion[]>(text);

  if (!Array.isArray(raw)) {
    throw new Error("AI response is not an array");
  }

  const validQuestions = raw.filter(
    (q) => q.type && q.question && q.correct_answer !== undefined,
  );

  if (validQuestions.length === 0) {
    throw new Error("No valid questions were generated");
  }

  return validQuestions.map((q, index) => ({
    type: q.type,
    question: q.question,
    options: q.options ?? null,
    correct_answer: q.correct_answer,
    explanation: q.explanation ?? "",
    points: q.points ?? 1,
    order: index + 1,
  }));
}

// ─── 2. suggestQuizTitle ───────────────────────────────────────────────────
export async function suggestQuizTitle(content: string): Promise<string> {
  const prompt = `Based on this educational content, suggest a concise and engaging quiz title (max 8 words).
Return ONLY the title text, nothing else.

Content preview:
${content.substring(0, 500)}`;

  const title = await callOpenRouter(prompt);
  return title.trim().replace(/["']/g, "");
}

// ─── 3. improveQuestion ───────────────────────────────────────────────────
export async function improveQuestion(
  question: string,
  options: string[],
  correctAnswer: string,
): Promise<{
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}> {
  const systemPrompt = `You are an expert quiz editor. Return ONLY valid JSON, no markdown.`;

  const prompt = `Improve this quiz question to be clearer and more educational.

Original question: ${question}
Options: ${options.join(", ")}
Correct answer: ${correctAnswer}

Return this exact JSON structure:
{
  "question": "improved question text",
  "options": ["option1", "option2", "option3", "option4"],
  "correct_answer": "must match one of the options exactly",
  "explanation": "why this question is educationally valuable"
}`;

  const text = await callOpenRouter(prompt, systemPrompt);
  return parseJsonResponse(text);
}
