import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GenerateQuizParams, Question } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateQuizFromContent(
  params: GenerateQuizParams,
): Promise<Omit<Question, "id" | "quiz_id" | "created_at">[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const questionTypesStr = params.questionTypes.join(", ");
  const difficultyInstructions = {
    easy: "Use simple, direct questions testing basic recall and understanding.",
    medium:
      "Use questions requiring comprehension and application of concepts.",
    hard: "Use complex questions requiring analysis, synthesis, and critical thinking.",
  };

  const prompt = `You are an expert educational quiz generator. Generate exactly ${params.questionCount} quiz questions from the following content.

CONTENT:
${params.content.substring(0, 8000)}

REQUIREMENTS:
- Difficulty: ${params.difficulty} - ${difficultyInstructions[params.difficulty]}
- Question types to use: ${questionTypesStr}
- Subject area: ${params.subject || "General"}
- Language: ${params.language || "English"}
- Distribute question types evenly if multiple types specified

STRICT OUTPUT FORMAT - Return ONLY a valid JSON array, no markdown, no explanation:
[
  {
    "type": "multiple_choice",
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_answer": "Option A",
    "explanation": "Brief explanation of why this is correct",
    "points": 1,
    "order": 1
  },
  {
    "type": "true_false",
    "question": "Statement to evaluate as true or false?",
    "options": ["True", "False"],
    "correct_answer": "True",
    "explanation": "Brief explanation",
    "points": 1,
    "order": 2
  },
  {
    "type": "short_answer",
    "question": "Question requiring a brief written answer?",
    "options": null,
    "correct_answer": "Expected answer or key points",
    "explanation": "Brief explanation",
    "points": 2,
    "order": 3
  }
]

Rules:
- For multiple_choice: always provide exactly 4 options
- For true_false: options must be ["True", "False"]
- For short_answer: options must be null
- correct_answer must exactly match one of the options (for mc and tf)
- Make questions diverse and cover different parts of the content
- Ensure questions are clear and unambiguous`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Clean the response - remove markdown code blocks if present
  const cleaned = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  const questions = JSON.parse(cleaned);

  if (!Array.isArray(questions)) {
    throw new Error("Invalid response format from AI");
  }

  return questions.map((q, index) => ({
    type: q.type,
    question: q.question,
    options: q.options,
    correct_answer: q.correct_answer,
    explanation: q.explanation || "",
    points: q.points || 1,
    order: index + 1,
  }));
}

export async function suggestQuizTitle(content: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Based on this educational content, suggest a concise, engaging quiz title (max 8 words). Return ONLY the title, nothing else.

Content preview: ${content.substring(0, 500)}`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim().replace(/["']/g, "");
}

export async function improveQuestion(
  question: string,
  options: string[],
): Promise<{ question: string; options: string[]; explanation: string }> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Improve this quiz question to be clearer and more educational. Return ONLY valid JSON.

Original question: ${question}
Options: ${options.join(", ")}

Return format:
{
  "question": "improved question",
  "options": ["option1", "option2", "option3", "option4"],
  "explanation": "why this is a good question"
}`;

  const result = await model.generateContent(prompt);
  const text = result.response
    .text()
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();
  return JSON.parse(text);
}
