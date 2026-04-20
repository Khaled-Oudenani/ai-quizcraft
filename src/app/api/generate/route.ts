// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";
// import { generateQuizFromContent } from "@/lib/gemini";
// import { v4 as uuidv4 } from "uuid";

// export async function POST(request: NextRequest) {
//   try {
//     const supabase = await createClient();
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await request.json();
//     const {
//       content,
//       title,
//       subject,
//       questionCount,
//       difficulty,
//       questionTypes,
//       timeLimit,
//       passMark,
//     } = body;

//     if (!content || content.trim().length < 50) {
//       return NextResponse.json(
//         { error: "Content is too short. Please provide more text." },
//         { status: 400 },
//       );
//     }

//     if (!title || title.trim().length === 0) {
//       return NextResponse.json(
//         { error: "Quiz title is required." },
//         { status: 400 },
//       );
//     }

//     // Generate questions using Gemini
//     const generatedQuestions = await generateQuizFromContent({
//       content,
//       questionCount: Math.min(questionCount || 10, 30),
//       difficulty: difficulty || "medium",
//       questionTypes: questionTypes || ["multiple_choice"],
//       subject,
//       language: "English",
//     });

//     // Create quiz in Supabase
//     const quizId = uuidv4();
//     const { error: quizError } = await supabase.from("quizzes").insert({
//       id: quizId,
//       user_id: user.id,
//       title: title.trim(),
//       subject: subject?.trim() || null,
//       difficulty: difficulty || "medium",
//       status: "draft",
//       time_limit: timeLimit || null,
//       pass_mark: passMark || 60,
//       source_type: "text",
//     });

//     if (quizError) {
//       console.error("Quiz creation error:", quizError);
//       return NextResponse.json(
//         { error: "Failed to save quiz: " + quizError.message },
//         { status: 500 },
//       );
//     }

//     // Insert questions
//     const questionsToInsert = generatedQuestions.map((q, index) => ({
//       id: uuidv4(),
//       quiz_id: quizId,
//       type: q.type,
//       question: q.question,
//       options: q.options ? JSON.stringify(q.options) : null,
//       correct_answer: JSON.stringify(q.correct_answer),
//       explanation: q.explanation || null,
//       points: q.points || 1,
//       order: index + 1,
//     }));

//     const { error: questionsError } = await supabase
//       .from("questions")
//       .insert(questionsToInsert);

//     if (questionsError) {
//       console.error("Questions insertion error:", questionsError);
//       // Clean up quiz
//       await supabase.from("quizzes").delete().eq("id", quizId);
//       return NextResponse.json(
//         { error: "Failed to save questions: " + questionsError.message },
//         { status: 500 },
//       );
//     }

//     // Update profile quiz count
//     try {
//       await supabase.rpc("increment_quizzes_generated", { user_id: user.id });
//     } catch {
//       // Ignore error - this is non-critical
//     }

//     return NextResponse.json({
//       quizId,
//       questionsCount: generatedQuestions.length,
//     });
//   } catch (error) {
//     console.error("Generate API error:", error);
//     return NextResponse.json(
//       {
//         error: error instanceof Error ? error.message : "Internal server error",
//       },
//       { status: 500 },
//     );
//   }
// }

// 22222222

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateQuizFromContent } from "@/lib/gemini";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      content,
      title,
      subject,
      questionCount,
      difficulty,
      questionTypes,
      timeLimit,
      passMark,
    } = body;

    // ✅ Debug: نرى ما يصل من الـ frontend
    console.log("=== CONTENT DEBUG ===");
    console.log("Content type:", typeof content);
    console.log("Content length:", content?.length);
    console.log("Content preview:", content?.substring(0, 500));
    console.log("====================");

    if (!content || content.trim().length < 50) {
      return NextResponse.json(
        { error: "Content is too short." },
        { status: 400 },
      );
    }
    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Quiz title is required." },
        { status: 400 },
      );
    }

    // توليد الأسئلة
    const generatedQuestions = await generateQuizFromContent({
      content,
      questionCount: Math.min(questionCount || 10, 30),
      difficulty: difficulty || "medium",
      questionTypes: questionTypes || ["multiple_choice"],
      subject,
      language: "English",
    });

    // ✅ Debug: نرى ما أرجعه الـ AI
    console.log("=== GENERATED QUESTIONS DEBUG ===");
    console.log("Questions count:", generatedQuestions.length);
    console.log(
      "First question:",
      JSON.stringify(generatedQuestions[0], null, 2),
    );
    console.log("=================================");

    // حفظ الكويز في Supabase
    const quizId = uuidv4();
    const { error: quizError } = await supabase.from("quizzes").insert({
      id: quizId,
      user_id: user.id,
      title: title.trim(),
      subject: subject?.trim() || null,
      difficulty: difficulty || "medium",
      status: "draft",
      time_limit: timeLimit || null,
      pass_mark: passMark || 60,
      source_type: "text",
    });

    if (quizError) {
      return NextResponse.json(
        { error: "Failed to save quiz: " + quizError.message },
        { status: 500 },
      );
    }

    // حفظ الأسئلة
    const questionsToInsert = generatedQuestions.map((q, index) => ({
      id: uuidv4(),
      quiz_id: quizId,
      type: q.type,
      question: q.question,
      options: q.options ? JSON.stringify(q.options) : null,
      correct_answer: JSON.stringify(q.correct_answer),
      explanation: q.explanation || null,
      points: q.points || 1,
      order: index + 1,
    }));

    const { error: questionsError } = await supabase
      .from("questions")
      .insert(questionsToInsert);

    if (questionsError) {
      await supabase.from("quizzes").delete().eq("id", quizId);
      return NextResponse.json(
        { error: "Failed to save questions: " + questionsError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      quizId,
      questionsCount: generatedQuestions.length,
    });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
