// "use client";

// import { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { useRouter } from "next/navigation";
// import Sidebar from "@/components/layout/Sidebar";

// type Step = "upload" | "configure" | "generating" | "done";

// const difficultyOptions = [
//   { value: "easy", label: "Easy", desc: "Basic recall & comprehension", color: "#45dfa4" },
//   { value: "medium", label: "Medium", desc: "Application & analysis", color: "#ffb95f" },
//   { value: "hard", label: "Hard", desc: "Synthesis & evaluation", color: "#ffb4ab" },
// ];

// const questionTypes = [
//   { value: "multiple_choice", label: "Multiple Choice", icon: "radio_button_checked" },
//   { value: "true_false", label: "True / False", icon: "toggle_on" },
//   { value: "short_answer", label: "Short Answer", icon: "short_text" },
// ];

// export default function QuizCreatePage() {
//   const router = useRouter();
//   const [step, setStep] = useState<Step>("upload");
//   const [content, setContent] = useState("");
//   const [fileName, setFileName] = useState("");
//   const [inputMode, setInputMode] = useState<"file" | "text">("file");

//   // Config
//   const [title, setTitle] = useState("");
//   const [subject, setSubject] = useState("");
//   const [questionCount, setQuestionCount] = useState(10);
//   const [difficulty, setDifficulty] = useState("medium");
//   const [selectedTypes, setSelectedTypes] = useState(["multiple_choice"]);
//   const [timeLimit, setTimeLimit] = useState(0);
//   const [passMark, setPassMark] = useState(60);

//   const [generating, setGenerating] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState("");

//   const onDrop = useCallback(async (acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (!file) return;
//     setFileName(file.name);
//     const text = await file.text();
//     setContent(text.substring(0, 15000));
//     setStep("configure");
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "text/plain": [".txt"],
//       "application/pdf": [".pdf"],
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
//     },
//     maxFiles: 1,
//   });

//   const toggleType = (type: string) => {
//     setSelectedTypes((prev) =>
//       prev.includes(type)
//         ? prev.length > 1 ? prev.filter((t) => t !== type) : prev
//         : [...prev, type]
//     );
//   };

//   const handleGenerate = async () => {
//     if (!content.trim()) { setError("Please provide content first."); return; }
//     if (!title.trim()) { setError("Please enter a quiz title."); return; }

//     setStep("generating");
//     setGenerating(true);
//     setProgress(0);
//     setError("");

//     // Animate progress
//     const interval = setInterval(() => {
//       setProgress((p) => {
//         if (p >= 90) { clearInterval(interval); return 90; }
//         return p + Math.random() * 15;
//       });
//     }, 600);

//     try {
//       const res = await fetch("/api/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           content,
//           title,
//           subject,
//           questionCount,
//           difficulty,
//           questionTypes: selectedTypes,
//           timeLimit: timeLimit || null,
//           passMark,
//         }),
//       });

//       clearInterval(interval);

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || "Generation failed");
//       }

//       const data = await res.json();
//       setProgress(100);
//       setStep("done");
//       setTimeout(() => router.push(`/quiz/${data.quizId}/edit`), 1200);
//     } catch (err) {
//       clearInterval(interval);
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setStep("configure");
//       setGenerating(false);
//     }
//   };

//   return (
//     <div className="flex h-screen overflow-hidden" style={{ background: "#0f131c" }}>
//       <Sidebar />
//       <main className="flex-1 overflow-y-auto neural-mesh" style={{ background: "#0a0e16" }}>
//         <div className="max-w-4xl mx-auto px-6 lg:px-10 py-10">

//           {/* Header */}
//           <div className="mb-10">
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#45dfa4]/10 border border-[#45dfa4]/20 text-[#45dfa4] text-xs font-bold mb-4 uppercase tracking-widest" style={{ fontFamily: "Manrope, sans-serif" }}>
//               <span className="material-symbols-outlined text-xs">psychology</span>
//               AI Quiz Generator
//             </div>
//             <h1 className="text-4xl font-black tracking-tight text-[#dfe2ee]" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
//               Create a new quiz
//             </h1>
//             <p className="text-[#8c909e] mt-2" style={{ fontFamily: "Manrope, sans-serif" }}>
//               Upload your content and let AI build a comprehensive quiz in seconds.
//             </p>
//           </div>

//           {/* Step Indicator */}
//           <div className="flex items-center gap-3 mb-10">
//             {[
//               { key: "upload", label: "Upload" },
//               { key: "configure", label: "Configure" },
//               { key: "generating", label: "Generate" },
//             ].map((s, i, arr) => {
//               const stepOrder = ["upload", "configure", "generating", "done"];
//               const currentIdx = stepOrder.indexOf(step);
//               const thisIdx = stepOrder.indexOf(s.key);
//               const isActive = currentIdx === thisIdx;
//               const isDone = currentIdx > thisIdx;

//               return (
//                 <div key={s.key} className="flex items-center gap-3">
//                   <div className="flex items-center gap-2">
//                     <div
//                       className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
//                       style={{
//                         background: isActive ? "linear-gradient(to bottom, #acc7ff, #508ff8)" : isDone ? "#45dfa4" : "#262a33",
//                         color: isActive ? "#00285b" : isDone ? "#003825" : "#8c909e",
//                         fontFamily: "Manrope, sans-serif",
//                       }}
//                     >
//                       {isDone ? <span className="material-symbols-outlined text-sm">check</span> : i + 1}
//                     </div>
//                     <span
//                       className="text-sm font-medium"
//                       style={{ color: isActive ? "#dfe2ee" : isDone ? "#45dfa4" : "#424753", fontFamily: "Manrope, sans-serif" }}
//                     >
//                       {s.label}
//                     </span>
//                   </div>
//                   {i < arr.length - 1 && (
//                     <div className="w-12 h-px" style={{ background: isDone ? "#45dfa4" : "#262a33" }} />
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {error && (
//             <div className="mb-6 p-4 rounded-xl bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 text-[#ffb4ab] text-sm flex items-center gap-2" style={{ fontFamily: "Manrope, sans-serif" }}>
//               <span className="material-symbols-outlined text-sm">error</span>
//               {error}
//             </div>
//           )}

//           {/* Step: Upload */}
//           {step === "upload" && (
//             <div className="flex flex-col gap-6">
//               {/* Mode toggle */}
//               <div className="flex rounded-xl overflow-hidden border border-[#424753]/30 w-fit">
//                 {[{ key: "file", label: "Upload File", icon: "upload_file" }, { key: "text", label: "Paste Text", icon: "edit_note" }].map((m) => (
//                   <button
//                     key={m.key}
//                     onClick={() => setInputMode(m.key as "file" | "text")}
//                     className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all"
//                     style={{
//                       background: inputMode === m.key ? "#262a33" : "#181c24",
//                       color: inputMode === m.key ? "#dfe2ee" : "#8c909e",
//                       fontFamily: "Manrope, sans-serif",
//                     }}
//                   >
//                     <span className="material-symbols-outlined text-sm">{m.icon}</span>
//                     {m.label}
//                   </button>
//                 ))}
//               </div>

//               {inputMode === "file" ? (
//                 <div
//                   {...getRootProps()}
//                   className="rounded-2xl p-12 flex flex-col items-center justify-center gap-5 cursor-pointer transition-all border-2 border-dashed"
//                   style={{
//                     background: isDragActive ? "rgba(172,199,255,0.08)" : "#181c24",
//                     borderColor: isDragActive ? "#acc7ff" : "#424753",
//                   }}
//                 >
//                   <input {...getInputProps()} />
//                   <div className="w-16 h-16 rounded-2xl bg-[#acc7ff]/10 flex items-center justify-center">
//                     <span className="material-symbols-outlined text-3xl text-[#acc7ff]">
//                       {isDragActive ? "file_download" : "upload_file"}
//                     </span>
//                   </div>
//                   <div className="text-center">
//                     <p className="font-bold text-[#dfe2ee] mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
//                       {isDragActive ? "Drop it here!" : "Drag & drop your file"}
//                     </p>
//                     <p className="text-sm text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>
//                       or <span className="text-[#acc7ff]">browse to upload</span>
//                     </p>
//                   </div>
//                   <div className="flex gap-2 flex-wrap justify-center">
//                     {["PDF", "DOCX", "TXT"].map((ext) => (
//                       <span key={ext} className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#262a33] text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>
//                         .{ext}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col gap-4">
//                   <textarea
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     placeholder="Paste your educational content here — lecture notes, textbook excerpts, training material..."
//                     rows={12}
//                     className="w-full px-5 py-4 rounded-2xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none resize-none transition-all"
//                     style={{
//                       background: "#181c24",
//                       border: "1px solid #424753",
//                       fontFamily: "Manrope, sans-serif",
//                       lineHeight: "1.6",
//                     }}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = "#acc7ff";
//                       e.target.style.background = "#1c2028";
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = "#424753";
//                       e.target.style.background = "#181c24";
//                     }}
//                   />
//                   <div className="flex justify-between items-center">
//                     <span className="text-xs text-[#424753]" style={{ fontFamily: "Manrope, sans-serif" }}>
//                       {content.length.toLocaleString()} / 15,000 characters
//                     </span>
//                     <button
//                       onClick={() => { if (content.trim().length > 50) setStep("configure"); }}
//                       disabled={content.trim().length < 50}
//                       className="px-5 py-2.5 rounded-xl font-bold text-sm text-[#00285b] transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
//                       style={{
//                         background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
//                         fontFamily: "Manrope, sans-serif",
//                       }}
//                     >
//                       Continue →
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Step: Configure */}
//           {step === "configure" && (
//             <div className="flex flex-col gap-6">
//               {fileName && (
//                 <div className="flex items-center gap-3 p-4 rounded-xl bg-[#45dfa4]/10 border border-[#45dfa4]/20">
//                   <span className="material-symbols-outlined text-[#45dfa4]">check_circle</span>
//                   <div>
//                     <p className="text-sm font-bold text-[#45dfa4]" style={{ fontFamily: "Manrope, sans-serif" }}>File loaded: {fileName}</p>
//                     <p className="text-xs text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>{content.length.toLocaleString()} characters extracted</p>
//                   </div>
//                   <button
//                     onClick={() => { setStep("upload"); setFileName(""); setContent(""); }}
//                     className="ml-auto text-xs text-[#8c909e] hover:text-[#dfe2ee] transition-colors"
//                     style={{ fontFamily: "Manrope, sans-serif" }}
//                   >
//                     Change
//                   </button>
//                 </div>
//               )}

//               <div className="rounded-2xl p-6 border border-[#424753]/20" style={{ background: "#181c24" }}>
//                 <h3 className="font-bold text-[#dfe2ee] mb-5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Quiz Details</h3>
//                 <div className="grid md:grid-cols-2 gap-5">
//                   <div className="md:col-span-2">
//                     <label className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>Quiz Title *</label>
//                     <input
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                       placeholder="e.g. Chapter 5: Human Anatomy Quiz"
//                       className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none transition-all"
//                       style={{ background: "#0a0e16", border: "1px solid #424753", fontFamily: "Manrope, sans-serif" }}
//                       onFocus={(e) => { e.target.style.borderColor = "#acc7ff"; e.target.style.background = "#1c2028"; }}
//                       onBlur={(e) => { e.target.style.borderColor = "#424753"; e.target.style.background = "#0a0e16"; }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>Subject / Topic</label>
//                     <input
//                       value={subject}
//                       onChange={(e) => setSubject(e.target.value)}
//                       placeholder="e.g. Biology, History, Marketing..."
//                       className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none transition-all"
//                       style={{ background: "#0a0e16", border: "1px solid #424753", fontFamily: "Manrope, sans-serif" }}
//                       onFocus={(e) => { e.target.style.borderColor = "#acc7ff"; e.target.style.background = "#1c2028"; }}
//                       onBlur={(e) => { e.target.style.borderColor = "#424753"; e.target.style.background = "#0a0e16"; }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>
//                       Number of Questions: <span className="text-[#acc7ff]">{questionCount}</span>
//                     </label>
//                     <input
//                       type="range"
//                       min={3}
//                       max={30}
//                       value={questionCount}
//                       onChange={(e) => setQuestionCount(Number(e.target.value))}
//                       className="w-full accent-[#acc7ff]"
//                     />
//                     <div className="flex justify-between text-xs text-[#424753] mt-1" style={{ fontFamily: "Manrope, sans-serif" }}>
//                       <span>3</span><span>30</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Difficulty */}
//               <div className="rounded-2xl p-6 border border-[#424753]/20" style={{ background: "#181c24" }}>
//                 <h3 className="font-bold text-[#dfe2ee] mb-5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Difficulty Level</h3>
//                 <div className="grid grid-cols-3 gap-3">
//                   {difficultyOptions.map((opt) => (
//                     <button
//                       key={opt.value}
//                       onClick={() => setDifficulty(opt.value)}
//                       className="p-4 rounded-xl border transition-all text-left"
//                       style={{
//                         background: difficulty === opt.value ? opt.color + "15" : "#0a0e16",
//                         borderColor: difficulty === opt.value ? opt.color + "60" : "#424753",
//                       }}
//                     >
//                       <p className="font-bold text-sm mb-1" style={{ color: opt.color, fontFamily: "Space Grotesk, sans-serif" }}>{opt.label}</p>
//                       <p className="text-xs text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>{opt.desc}</p>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Question Types */}
//               <div className="rounded-2xl p-6 border border-[#424753]/20" style={{ background: "#181c24" }}>
//                 <h3 className="font-bold text-[#dfe2ee] mb-5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Question Types</h3>
//                 <div className="grid grid-cols-3 gap-3">
//                   {questionTypes.map((qt) => {
//                     const selected = selectedTypes.includes(qt.value);
//                     return (
//                       <button
//                         key={qt.value}
//                         onClick={() => toggleType(qt.value)}
//                         className="p-4 rounded-xl border transition-all flex flex-col items-center gap-2"
//                         style={{
//                           background: selected ? "rgba(172,199,255,0.1)" : "#0a0e16",
//                           borderColor: selected ? "#acc7ff40" : "#424753",
//                         }}
//                       >
//                         <span className="material-symbols-outlined text-xl" style={{ color: selected ? "#acc7ff" : "#8c909e" }}>
//                           {qt.icon}
//                         </span>
//                         <p className="text-xs font-bold text-center" style={{ color: selected ? "#acc7ff" : "#8c909e", fontFamily: "Manrope, sans-serif" }}>
//                           {qt.label}
//                         </p>
//                         {selected && <span className="w-4 h-4 rounded-full bg-[#acc7ff] flex items-center justify-center"><span className="material-symbols-outlined text-[10px] text-[#001a40]">check</span></span>}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Settings */}
//               <div className="rounded-2xl p-6 border border-[#424753]/20" style={{ background: "#181c24" }}>
//                 <h3 className="font-bold text-[#dfe2ee] mb-5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Quiz Settings</h3>
//                 <div className="grid md:grid-cols-2 gap-5">
//                   <div>
//                     <label className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>
//                       Time Limit (minutes, 0 = unlimited)
//                     </label>
//                     <input
//                       type="number"
//                       value={timeLimit}
//                       onChange={(e) => setTimeLimit(Number(e.target.value))}
//                       min={0} max={120}
//                       className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] outline-none transition-all"
//                       style={{ background: "#0a0e16", border: "1px solid #424753", fontFamily: "Manrope, sans-serif" }}
//                       onFocus={(e) => { e.target.style.borderColor = "#acc7ff"; e.target.style.background = "#1c2028"; }}
//                       onBlur={(e) => { e.target.style.borderColor = "#424753"; e.target.style.background = "#0a0e16"; }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>
//                       Pass Mark: <span className="text-[#acc7ff]">{passMark}%</span>
//                     </label>
//                     <input
//                       type="range"
//                       min={0} max={100}
//                       value={passMark}
//                       onChange={(e) => setPassMark(Number(e.target.value))}
//                       className="w-full accent-[#acc7ff] mt-2"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setStep("upload")}
//                   className="px-6 py-3 rounded-xl font-bold text-sm text-[#8c909e] hover:text-[#dfe2ee] bg-[#262a33] hover:bg-[#31353e] transition-all"
//                   style={{ fontFamily: "Manrope, sans-serif" }}
//                 >
//                   ← Back
//                 </button>
//                 <button
//                   onClick={handleGenerate}
//                   className="flex-1 py-3 rounded-xl font-bold text-[#00285b] text-sm transition-all hover:brightness-110 flex items-center justify-center gap-2"
//                   style={{
//                     background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
//                     fontFamily: "Manrope, sans-serif",
//                     boxShadow: "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 20px rgba(79,142,247,0.3)",
//                   }}
//                 >
//                   <span className="material-symbols-outlined text-sm">bolt</span>
//                   Generate Quiz with AI
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Step: Generating */}
//           {(step === "generating" || step === "done") && (
//             <div className="flex flex-col items-center justify-center py-20 gap-8">
//               <div className="relative w-24 h-24">
//                 <div
//                   className="w-24 h-24 rounded-full flex items-center justify-center"
//                   style={{
//                     background: step === "done" ? "#45dfa4" + "20" : "rgba(172,199,255,0.1)",
//                   }}
//                 >
//                   <span
//                     className={`material-symbols-outlined text-5xl ${step === "generating" ? "animate-spin" : ""}`}
//                     style={{ color: step === "done" ? "#45dfa4" : "#acc7ff", animationDuration: step === "generating" ? "2s" : undefined }}
//                   >
//                     {step === "done" ? "check_circle" : "psychology"}
//                   </span>
//                 </div>
//                 {step === "generating" && (
//                   <div className="absolute inset-0 rounded-full border-2 border-[#acc7ff]/20 border-t-[#acc7ff] animate-spin" />
//                 )}
//               </div>

//               <div className="text-center">
//                 <h2 className="text-2xl font-black text-[#dfe2ee] mb-2" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
//                   {step === "done" ? "Quiz generated!" : "AI is working…"}
//                 </h2>
//                 <p className="text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>
//                   {step === "done"
//                     ? "Redirecting to the question editor…"
//                     : `Analyzing content and generating ${questionCount} ${difficulty} questions`}
//                 </p>
//               </div>

//               <div className="w-full max-w-sm">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-xs text-[#8c909e]" style={{ fontFamily: "Manrope, sans-serif" }}>Progress</span>
//                   <span className="text-xs text-[#acc7ff] font-bold" style={{ fontFamily: "Manrope, sans-serif" }}>{Math.round(progress)}%</span>
//                 </div>
//                 <div className="h-2 rounded-full overflow-hidden" style={{ background: "#262a33" }}>
//                   <div
//                     className="h-full rounded-full transition-all duration-500"
//                     style={{
//                       width: `${progress}%`,
//                       background: step === "done"
//                         ? "#45dfa4"
//                         : "linear-gradient(to right, #acc7ff, #508ff8)",
//                     }}
//                   />
//                 </div>
//               </div>

//               {step === "generating" && (
//                 <div className="flex flex-col gap-2 text-center">
//                   {["Parsing document content…", "Identifying key concepts…", "Generating questions…", "Validating answers…"].map((msg, i) => (
//                     <p
//                       key={msg}
//                       className="text-xs text-[#424753] transition-all"
//                       style={{
//                         fontFamily: "Manrope, sans-serif",
//                         opacity: progress > i * 25 ? 1 : 0.3,
//                         color: progress > (i + 1) * 25 ? "#45dfa4" : "#424753",
//                       }}
//                     >
//                       {progress > i * 25 && progress <= (i + 1) * 25 && "→ "}{msg}
//                     </p>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// 222222222222222222222

// "use client";

// import { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { useRouter } from "next/navigation";
// import Sidebar from "@/components/layout/Sidebar";

// type Step = "upload" | "configure" | "generating" | "done";

// const difficultyOptions = [
//   {
//     value: "easy",
//     label: "Easy",
//     desc: "Basic recall & comprehension",
//     color: "#45dfa4",
//   },
//   {
//     value: "medium",
//     label: "Medium",
//     desc: "Application & analysis",
//     color: "#ffb95f",
//   },
//   {
//     value: "hard",
//     label: "Hard",
//     desc: "Synthesis & evaluation",
//     color: "#ffb4ab",
//   },
// ];

// const questionTypes = [
//   {
//     value: "multiple_choice",
//     label: "Multiple Choice",
//     icon: "radio_button_checked",
//   },
//   { value: "true_false", label: "True / False", icon: "toggle_on" },
//   { value: "short_answer", label: "Short Answer", icon: "short_text" },
// ];

// export default function QuizCreatePage() {
//   const router = useRouter();
//   const [step, setStep] = useState<Step>("upload");
//   const [content, setContent] = useState("");
//   const [fileName, setFileName] = useState("");
//   const [inputMode, setInputMode] = useState<"file" | "text">("file");

//   const [title, setTitle] = useState("");
//   const [subject, setSubject] = useState("");
//   const [questionCount, setQuestionCount] = useState(10);
//   const [difficulty, setDifficulty] = useState("medium");
//   const [selectedTypes, setSelectedTypes] = useState(["multiple_choice"]);
//   const [timeLimit, setTimeLimit] = useState(0);
//   const [passMark, setPassMark] = useState(60);

//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState("");

//   const onDrop = useCallback(async (acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (!file) return;
//     setFileName(file.name);
//     const text = await file.text();
//     setContent(text.substring(0, 15000));
//     setStep("configure");
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "text/plain": [".txt"],
//       "application/pdf": [".pdf"],
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
//         [".docx"],
//     },
//     maxFiles: 1,
//   });

//   const toggleType = (type: string) => {
//     setSelectedTypes((prev) =>
//       prev.includes(type)
//         ? prev.length > 1
//           ? prev.filter((t) => t !== type)
//           : prev
//         : [...prev, type],
//     );
//   };

//   const handleGenerate = async () => {
//     if (!content.trim()) {
//       setError("Please provide content first.");
//       return;
//     }
//     if (!title.trim()) {
//       setError("Please enter a quiz title.");
//       return;
//     }

//     setStep("generating");
//     setProgress(0);
//     setError("");

//     const interval = setInterval(() => {
//       setProgress((p) => {
//         if (p >= 90) {
//           clearInterval(interval);
//           return 90;
//         }
//         return p + Math.random() * 15;
//       });
//     }, 600);

//     try {
//       const res = await fetch("/api/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           content,
//           title,
//           subject,
//           questionCount,
//           difficulty,
//           questionTypes: selectedTypes,
//           timeLimit: timeLimit || null,
//           passMark,
//         }),
//       });

//       clearInterval(interval);

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || "Generation failed");
//       }

//       const data = await res.json();
//       setProgress(100);
//       setStep("done");
//       setTimeout(() => router.push(`/quiz/${data.quizId}/edit`), 1200);
//     } catch (err) {
//       clearInterval(interval);
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setStep("configure");
//     }
//   };

//   /* ── shared input style helpers ── */
//   const inputBase = {
//     background: "#0a0e16",
//     border: "1px solid #424753",
//     fontFamily: "Manrope, sans-serif",
//   };
//   const onFocusInput = (
//     e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     e.target.style.borderColor = "#acc7ff";
//     e.target.style.background = "#1c2028";
//   };
//   const onBlurInput = (
//     e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     e.target.style.borderColor = "#424753";
//     e.target.style.background = "#0a0e16";
//   };

//   return (
//     <div
//       className="flex h-screen overflow-hidden"
//       style={{ background: "#0f131c" }}
//     >
//       <Sidebar />

//       {/* ── Main scroll area ── */}
//       <main
//         className="flex-1 overflow-y-auto neural-mesh
//           pt-[56px] pb-[72px]
//           md:pt-0   md:pb-0"
//         style={{ background: "#0a0e16" }}
//       >
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
//           {/* ── Page Header ── */}
//           <div className="mb-7 sm:mb-10">
//             <div
//               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#45dfa4]/10 border border-[#45dfa4]/20 text-[#45dfa4] text-xs font-bold mb-4 uppercase tracking-widest"
//               style={{ fontFamily: "Manrope, sans-serif" }}
//             >
//               <span className="material-symbols-outlined text-xs">
//                 psychology
//               </span>
//               AI Quiz Generator
//             </div>
//             <h1
//               className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#dfe2ee]"
//               style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
//             >
//               Create a new quiz
//             </h1>
//             <p
//               className="text-[#8c909e] mt-2 text-sm sm:text-base"
//               style={{ fontFamily: "Manrope, sans-serif" }}
//             >
//               Upload your content and let AI build a comprehensive quiz in
//               seconds.
//             </p>
//           </div>

//           {/* ── Step Indicator ── */}
//           <div className="flex items-center gap-2 sm:gap-3 mb-7 sm:mb-10 overflow-x-auto pb-1">
//             {[
//               { key: "upload", label: "Upload" },
//               { key: "configure", label: "Configure" },
//               { key: "generating", label: "Generate" },
//             ].map((s, i, arr) => {
//               const order = ["upload", "configure", "generating", "done"];
//               const currentIdx = order.indexOf(step);
//               const thisIdx = order.indexOf(s.key);
//               const isActive = currentIdx === thisIdx;
//               const isDone = currentIdx > thisIdx;

//               return (
//                 <div
//                   key={s.key}
//                   className="flex items-center gap-2 sm:gap-3 shrink-0"
//                 >
//                   <div className="flex items-center gap-1.5 sm:gap-2">
//                     <div
//                       className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
//                       style={{
//                         background: isActive
//                           ? "linear-gradient(to bottom, #acc7ff, #508ff8)"
//                           : isDone
//                             ? "#45dfa4"
//                             : "#262a33",
//                         color: isActive
//                           ? "#00285b"
//                           : isDone
//                             ? "#003825"
//                             : "#8c909e",
//                         fontFamily: "Manrope, sans-serif",
//                       }}
//                     >
//                       {isDone ? (
//                         <span className="material-symbols-outlined text-xs">
//                           check
//                         </span>
//                       ) : (
//                         i + 1
//                       )}
//                     </div>
//                     <span
//                       className="text-xs sm:text-sm font-medium"
//                       style={{
//                         color: isActive
//                           ? "#dfe2ee"
//                           : isDone
//                             ? "#45dfa4"
//                             : "#424753",
//                         fontFamily: "Manrope, sans-serif",
//                       }}
//                     >
//                       {s.label}
//                     </span>
//                   </div>
//                   {i < arr.length - 1 && (
//                     <div
//                       className="w-8 sm:w-12 h-px shrink-0"
//                       style={{ background: isDone ? "#45dfa4" : "#262a33" }}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* ── Error Banner ── */}
//           {error && (
//             <div
//               className="mb-5 p-3 sm:p-4 rounded-xl bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 text-[#ffb4ab] text-sm flex items-start gap-2"
//               style={{ fontFamily: "Manrope, sans-serif" }}
//             >
//               <span className="material-symbols-outlined text-sm shrink-0 mt-0.5">
//                 error
//               </span>
//               {error}
//             </div>
//           )}

//           {/* ════════════════════════════════
//               STEP 1 — UPLOAD
//           ════════════════════════════════ */}
//           {step === "upload" && (
//             <div className="flex flex-col gap-5">
//               {/* Mode toggle */}
//               <div className="flex rounded-xl overflow-hidden border border-[#424753]/30 w-full sm:w-fit">
//                 {[
//                   { key: "file", label: "Upload File", icon: "upload_file" },
//                   { key: "text", label: "Paste Text", icon: "edit_note" },
//                 ].map((m) => (
//                   <button
//                     key={m.key}
//                     onClick={() => setInputMode(m.key as "file" | "text")}
//                     className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-all"
//                     style={{
//                       background: inputMode === m.key ? "#262a33" : "#181c24",
//                       color: inputMode === m.key ? "#dfe2ee" : "#8c909e",
//                       fontFamily: "Manrope, sans-serif",
//                     }}
//                   >
//                     <span className="material-symbols-outlined text-sm">
//                       {m.icon}
//                     </span>
//                     {m.label}
//                   </button>
//                 ))}
//               </div>

//               {/* File dropzone */}
//               {inputMode === "file" ? (
//                 <div
//                   {...getRootProps()}
//                   className="rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center gap-4 sm:gap-5 cursor-pointer transition-all border-2 border-dashed"
//                   style={{
//                     background: isDragActive
//                       ? "rgba(172,199,255,0.08)"
//                       : "#181c24",
//                     borderColor: isDragActive ? "#acc7ff" : "#424753",
//                   }}
//                 >
//                   <input {...getInputProps()} />
//                   <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#acc7ff]/10 flex items-center justify-center">
//                     <span className="material-symbols-outlined text-2xl sm:text-3xl text-[#acc7ff]">
//                       {isDragActive ? "file_download" : "upload_file"}
//                     </span>
//                   </div>
//                   <div className="text-center">
//                     <p
//                       className="font-bold text-[#dfe2ee] mb-1 text-sm sm:text-base"
//                       style={{ fontFamily: "Space Grotesk, sans-serif" }}
//                     >
//                       {isDragActive ? "Drop it here!" : "Drag & drop your file"}
//                     </p>
//                     <p
//                       className="text-xs sm:text-sm text-[#8c909e]"
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       or{" "}
//                       <span className="text-[#acc7ff]">browse to upload</span>
//                     </p>
//                   </div>
//                   <div className="flex gap-2 flex-wrap justify-center">
//                     {["PDF", "DOCX", "TXT"].map((ext) => (
//                       <span
//                         key={ext}
//                         className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#262a33] text-[#8c909e]"
//                         style={{ fontFamily: "Manrope, sans-serif" }}
//                       >
//                         .{ext}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 /* Paste text */
//                 <div className="flex flex-col gap-3">
//                   <textarea
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     placeholder="Paste your educational content here — lecture notes, textbook excerpts, training material..."
//                     rows={10}
//                     className="w-full px-4 sm:px-5 py-4 rounded-2xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none resize-none transition-all"
//                     style={{ ...inputBase, lineHeight: "1.6" }}
//                     onFocus={onFocusInput}
//                     onBlur={onBlurInput}
//                   />
//                   <div className="flex justify-between items-center">
//                     <span
//                       className="text-xs text-[#424753]"
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       {content.length.toLocaleString()} / 15,000
//                     </span>
//                     <button
//                       onClick={() => {
//                         if (content.trim().length > 50) setStep("configure");
//                       }}
//                       disabled={content.trim().length < 50}
//                       className="px-5 py-2.5 rounded-xl font-bold text-sm text-[#00285b] transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
//                       style={{
//                         background:
//                           "linear-gradient(to bottom, #acc7ff, #508ff8)",
//                         fontFamily: "Manrope, sans-serif",
//                       }}
//                     >
//                       Continue →
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ════════════════════════════════
//               STEP 2 — CONFIGURE
//           ════════════════════════════════ */}
//           {step === "configure" && (
//             <div className="flex flex-col gap-5">
//               {/* File loaded banner */}
//               {fileName && (
//                 <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-[#45dfa4]/10 border border-[#45dfa4]/20">
//                   <span className="material-symbols-outlined text-[#45dfa4] shrink-0">
//                     check_circle
//                   </span>
//                   <div className="flex-1 min-w-0">
//                     <p
//                       className="text-sm font-bold text-[#45dfa4] truncate"
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       File loaded: {fileName}
//                     </p>
//                     <p
//                       className="text-xs text-[#8c909e]"
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       {content.length.toLocaleString()} characters extracted
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setStep("upload");
//                       setFileName("");
//                       setContent("");
//                     }}
//                     className="text-xs text-[#8c909e] hover:text-[#dfe2ee] transition-colors shrink-0"
//                     style={{ fontFamily: "Manrope, sans-serif" }}
//                   >
//                     Change
//                   </button>
//                 </div>
//               )}

//               {/* Quiz Details */}
//               <div
//                 className="rounded-2xl p-4 sm:p-6 border border-[#424753]/20"
//                 style={{ background: "#181c24" }}
//               >
//                 <h3
//                   className="font-bold text-[#dfe2ee] mb-4 sm:mb-5"
//                   style={{ fontFamily: "Space Grotesk, sans-serif" }}
//                 >
//                   Quiz Details
//                 </h3>
//                 <div className="flex flex-col gap-4">
//                   <div>
//                     <label
//                       className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       Quiz Title *
//                     </label>
//                     <input
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                       placeholder="e.g. Chapter 5: Human Anatomy Quiz"
//                       className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none transition-all"
//                       style={inputBase}
//                       onFocus={onFocusInput}
//                       onBlur={onBlurInput}
//                     />
//                   </div>
//                   <div className="grid sm:grid-cols-2 gap-4">
//                     <div>
//                       <label
//                         className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
//                         style={{ fontFamily: "Manrope, sans-serif" }}
//                       >
//                         Subject / Topic
//                       </label>
//                       <input
//                         value={subject}
//                         onChange={(e) => setSubject(e.target.value)}
//                         placeholder="e.g. Biology, Marketing…"
//                         className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none transition-all"
//                         style={inputBase}
//                         onFocus={onFocusInput}
//                         onBlur={onBlurInput}
//                       />
//                     </div>
//                     <div>
//                       <label
//                         className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
//                         style={{ fontFamily: "Manrope, sans-serif" }}
//                       >
//                         Questions:{" "}
//                         <span className="text-[#acc7ff]">{questionCount}</span>
//                       </label>
//                       <input
//                         type="range"
//                         min={3}
//                         max={30}
//                         value={questionCount}
//                         onChange={(e) =>
//                           setQuestionCount(Number(e.target.value))
//                         }
//                         className="w-full accent-[#acc7ff] mt-2"
//                       />
//                       <div
//                         className="flex justify-between text-xs text-[#424753] mt-1"
//                         style={{ fontFamily: "Manrope, sans-serif" }}
//                       >
//                         <span>3</span>
//                         <span>30</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Difficulty */}
//               <div
//                 className="rounded-2xl p-4 sm:p-6 border border-[#424753]/20"
//                 style={{ background: "#181c24" }}
//               >
//                 <h3
//                   className="font-bold text-[#dfe2ee] mb-4 sm:mb-5"
//                   style={{ fontFamily: "Space Grotesk, sans-serif" }}
//                 >
//                   Difficulty Level
//                 </h3>
//                 <div className="grid grid-cols-3 gap-2 sm:gap-3">
//                   {difficultyOptions.map((opt) => (
//                     <button
//                       key={opt.value}
//                       onClick={() => setDifficulty(opt.value)}
//                       className="p-3 sm:p-4 rounded-xl border transition-all text-left"
//                       style={{
//                         background:
//                           difficulty === opt.value
//                             ? opt.color + "15"
//                             : "#0a0e16",
//                         borderColor:
//                           difficulty === opt.value
//                             ? opt.color + "60"
//                             : "#424753",
//                       }}
//                     >
//                       <p
//                         className="font-bold text-xs sm:text-sm mb-0.5 sm:mb-1"
//                         style={{
//                           color: opt.color,
//                           fontFamily: "Space Grotesk, sans-serif",
//                         }}
//                       >
//                         {opt.label}
//                       </p>
//                       <p
//                         className="text-[10px] sm:text-xs text-[#8c909e] leading-tight"
//                         style={{ fontFamily: "Manrope, sans-serif" }}
//                       >
//                         {opt.desc}
//                       </p>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Question Types */}
//               <div
//                 className="rounded-2xl p-4 sm:p-6 border border-[#424753]/20"
//                 style={{ background: "#181c24" }}
//               >
//                 <h3
//                   className="font-bold text-[#dfe2ee] mb-4 sm:mb-5"
//                   style={{ fontFamily: "Space Grotesk, sans-serif" }}
//                 >
//                   Question Types
//                 </h3>
//                 <div className="grid grid-cols-3 gap-2 sm:gap-3">
//                   {questionTypes.map((qt) => {
//                     const selected = selectedTypes.includes(qt.value);
//                     return (
//                       <button
//                         key={qt.value}
//                         onClick={() => toggleType(qt.value)}
//                         className="p-3 sm:p-4 rounded-xl border transition-all flex flex-col items-center gap-1.5 sm:gap-2"
//                         style={{
//                           background: selected
//                             ? "rgba(172,199,255,0.1)"
//                             : "#0a0e16",
//                           borderColor: selected ? "#acc7ff40" : "#424753",
//                         }}
//                       >
//                         <span
//                           className="material-symbols-outlined text-lg sm:text-xl"
//                           style={{ color: selected ? "#acc7ff" : "#8c909e" }}
//                         >
//                           {qt.icon}
//                         </span>
//                         <p
//                           className="text-[10px] sm:text-xs font-bold text-center leading-tight"
//                           style={{
//                             color: selected ? "#acc7ff" : "#8c909e",
//                             fontFamily: "Manrope, sans-serif",
//                           }}
//                         >
//                           {qt.label}
//                         </p>
//                         {selected && (
//                           <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#acc7ff] flex items-center justify-center">
//                             <span className="material-symbols-outlined text-[9px] sm:text-[10px] text-[#001a40]">
//                               check
//                             </span>
//                           </span>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Quiz Settings */}
//               <div
//                 className="rounded-2xl p-4 sm:p-6 border border-[#424753]/20"
//                 style={{ background: "#181c24" }}
//               >
//                 <h3
//                   className="font-bold text-[#dfe2ee] mb-4 sm:mb-5"
//                   style={{ fontFamily: "Space Grotesk, sans-serif" }}
//                 >
//                   Quiz Settings
//                 </h3>
//                 <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
//                   <div>
//                     <label
//                       className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       Time Limit{" "}
//                       <span className="normal-case text-[#424753]">
//                         (mins, 0 = unlimited)
//                       </span>
//                     </label>
//                     <input
//                       type="number"
//                       value={timeLimit}
//                       min={0}
//                       max={120}
//                       onChange={(e) => setTimeLimit(Number(e.target.value))}
//                       className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] outline-none transition-all"
//                       style={inputBase}
//                       onFocus={onFocusInput}
//                       onBlur={onBlurInput}
//                     />
//                   </div>
//                   <div>
//                     <label
//                       className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
//                       style={{ fontFamily: "Manrope, sans-serif" }}
//                     >
//                       Pass Mark:{" "}
//                       <span className="text-[#acc7ff]">{passMark}%</span>
//                     </label>
//                     <input
//                       type="range"
//                       min={0}
//                       max={100}
//                       value={passMark}
//                       onChange={(e) => setPassMark(Number(e.target.value))}
//                       className="w-full accent-[#acc7ff] mt-2"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Action buttons */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setStep("upload")}
//                   className="px-4 sm:px-6 py-3 rounded-xl font-bold text-sm text-[#8c909e] hover:text-[#dfe2ee] bg-[#262a33] hover:bg-[#31353e] transition-all shrink-0"
//                   style={{ fontFamily: "Manrope, sans-serif" }}
//                 >
//                   ← Back
//                 </button>
//                 <button
//                   onClick={handleGenerate}
//                   className="flex-1 py-3 rounded-xl font-bold text-[#00285b] text-sm transition-all hover:brightness-110 flex items-center justify-center gap-2"
//                   style={{
//                     background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
//                     fontFamily: "Manrope, sans-serif",
//                     boxShadow:
//                       "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 20px rgba(79,142,247,0.3)",
//                   }}
//                 >
//                   <span className="material-symbols-outlined text-sm">
//                     bolt
//                   </span>
//                   <span className="hidden sm:inline">
//                     Generate Quiz with AI
//                   </span>
//                   <span className="sm:hidden">Generate</span>
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* ════════════════════════════════
//               STEP 3 — GENERATING / DONE
//           ════════════════════════════════ */}
//           {(step === "generating" || step === "done") && (
//             <div className="flex flex-col items-center justify-center py-12 sm:py-20 gap-6 sm:gap-8">
//               <div className="relative w-20 h-20 sm:w-24 sm:h-24">
//                 <div
//                   className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
//                   style={{
//                     background:
//                       step === "done"
//                         ? "#45dfa4" + "20"
//                         : "rgba(172,199,255,0.1)",
//                   }}
//                 >
//                   <span
//                     className={`material-symbols-outlined text-4xl sm:text-5xl ${step === "generating" ? "animate-spin" : ""}`}
//                     style={{
//                       color: step === "done" ? "#45dfa4" : "#acc7ff",
//                       animationDuration: "2s",
//                     }}
//                   >
//                     {step === "done" ? "check_circle" : "psychology"}
//                   </span>
//                 </div>
//                 {step === "generating" && (
//                   <div className="absolute inset-0 rounded-full border-2 border-[#acc7ff]/20 border-t-[#acc7ff] animate-spin" />
//                 )}
//               </div>

//               <div className="text-center px-4">
//                 <h2
//                   className="text-xl sm:text-2xl font-black text-[#dfe2ee] mb-2"
//                   style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
//                 >
//                   {step === "done" ? "Quiz generated!" : "AI is working…"}
//                 </h2>
//                 <p
//                   className="text-sm text-[#8c909e]"
//                   style={{ fontFamily: "Manrope, sans-serif" }}
//                 >
//                   {step === "done"
//                     ? "Redirecting to the question editor…"
//                     : `Generating ${questionCount} ${difficulty} questions`}
//                 </p>
//               </div>

//               <div className="w-full max-w-xs sm:max-w-sm px-4 sm:px-0">
//                 <div className="flex justify-between items-center mb-2">
//                   <span
//                     className="text-xs text-[#8c909e]"
//                     style={{ fontFamily: "Manrope, sans-serif" }}
//                   >
//                     Progress
//                   </span>
//                   <span
//                     className="text-xs text-[#acc7ff] font-bold"
//                     style={{ fontFamily: "Manrope, sans-serif" }}
//                   >
//                     {Math.round(progress)}%
//                   </span>
//                 </div>
//                 <div
//                   className="h-2 rounded-full overflow-hidden"
//                   style={{ background: "#262a33" }}
//                 >
//                   <div
//                     className="h-full rounded-full transition-all duration-500"
//                     style={{
//                       width: `${progress}%`,
//                       background:
//                         step === "done"
//                           ? "#45dfa4"
//                           : "linear-gradient(to right, #acc7ff, #508ff8)",
//                     }}
//                   />
//                 </div>
//               </div>

//               {step === "generating" && (
//                 <div className="flex flex-col gap-2 text-center px-4">
//                   {[
//                     "Parsing document content…",
//                     "Identifying key concepts…",
//                     "Generating questions…",
//                     "Validating answers…",
//                   ].map((msg, i) => (
//                     <p
//                       key={msg}
//                       className="text-xs transition-all"
//                       style={{
//                         fontFamily: "Manrope, sans-serif",
//                         opacity: progress > i * 25 ? 1 : 0.3,
//                         color: progress > (i + 1) * 25 ? "#45dfa4" : "#424753",
//                       }}
//                     >
//                       {progress > i * 25 && progress <= (i + 1) * 25 && "→ "}
//                       {msg}
//                     </p>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// 333333333333

"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import * as pdfjsLib from "pdfjs-dist";

// ✅ Worker مطلوب لـ pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
type Step = "upload" | "configure" | "generating" | "done";

const difficultyOptions = [
  {
    value: "easy",
    label: "Easy",
    desc: "Basic recall & comprehension",
    color: "#45dfa4",
  },
  {
    value: "medium",
    label: "Medium",
    desc: "Application & analysis",
    color: "#ffb95f",
  },
  {
    value: "hard",
    label: "Hard",
    desc: "Synthesis & evaluation",
    color: "#ffb4ab",
  },
];

const questionTypes = [
  {
    value: "multiple_choice",
    label: "Multiple Choice",
    icon: "radio_button_checked",
  },
  { value: "true_false", label: "True / False", icon: "toggle_on" },
  { value: "short_answer", label: "Short Answer", icon: "short_text" },
];

export default function QuizCreatePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("upload");
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [inputMode, setInputMode] = useState<"file" | "text">("file");

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("medium");
  const [selectedTypes, setSelectedTypes] = useState(["multiple_choice"]);
  const [timeLimit, setTimeLimit] = useState(0);
  const [passMark, setPassMark] = useState(60);

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [extracting, setExtracting] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setExtracting(true);
    setError("");

    try {
      let extractedText = "";

      if (file.type === "application/pdf") {
        // ✅ استخراج النص من PDF صفحة بصفحة
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items
            .map((item: unknown) => {
              const t = item as { str?: string };
              return t.str ?? "";
            })
            .join(" ");
          extractedText += pageText + "\n";
        }
      } else {
        // ✅ TXT و DOCX نصية بسيطة
        extractedText = await file.text();
      }

      const finalText = extractedText.trim();

      if (finalText.length < 50) {
        setError(
          "Could not extract enough text from the file. Try a different file or paste the text manually.",
        );
        setExtracting(false);
        return;
      }

      setContent(finalText.substring(0, 15000));
      setStep("configure");
    } catch (err) {
      setError(
        "Failed to read the file. Please try again or paste the text manually.",
      );
      console.error("File extraction error:", err);
    } finally {
      setExtracting(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
  });

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.length > 1
          ? prev.filter((t) => t !== type)
          : prev
        : [...prev, type],
    );
  };

  const handleGenerate = async () => {
    if (!content.trim()) {
      setError("Please provide content first.");
      return;
    }
    if (!title.trim()) {
      setError("Please enter a quiz title.");
      return;
    }

    setStep("generating");
    setProgress(0);
    setError("");

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + Math.random() * 15;
      });
    }, 600);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          title,
          subject,
          questionCount,
          difficulty,
          questionTypes: selectedTypes,
          timeLimit: timeLimit || null,
          passMark,
        }),
      });

      clearInterval(interval);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Generation failed");
      }

      const data = await res.json();
      setProgress(100);
      setStep("done");
      setTimeout(() => router.push(`/quiz/${data.quizId}/edit`), 1200);
    } catch (err) {
      clearInterval(interval);
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("configure");
    }
  };

  /* ── shared input style helpers ── */
  const inputBase = {
    background: "#0a0e16",
    border: "1px solid #424753",
    fontFamily: "Manrope, sans-serif",
  };
  const onFocusInput = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.style.borderColor = "#acc7ff";
    e.target.style.background = "#1c2028";
  };
  const onBlurInput = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.style.borderColor = "#424753";
    e.target.style.background = "#0a0e16";
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#0f131c" }}
    >
      <Sidebar />

      {/* ── Main scroll area ── */}
      <main
        className="flex-1 overflow-y-auto neural-mesh
          pt-[56px] pb-[72px]
          md:pt-0   md:pb-0"
        style={{ background: "#0a0e16" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
          {/* ── Page Header ── */}
          <div className="mb-7 sm:mb-10">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#45dfa4]/10 border border-[#45dfa4]/20 text-[#45dfa4] text-xs font-bold mb-4 uppercase tracking-widest"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              <span className="material-symbols-outlined text-xs">
                psychology
              </span>
              AI Quiz Generator
            </div>
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#dfe2ee]"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Create a new quiz
            </h1>
            <p
              className="text-[#8c909e] mt-2 text-sm sm:text-base"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Upload your content and let AI build a comprehensive quiz in
              seconds.
            </p>
          </div>

          {/* ── Step Indicator ── */}
          <div className="flex items-center gap-2 sm:gap-3 mb-7 sm:mb-10 overflow-x-auto pb-1">
            {[
              { key: "upload", label: "Upload" },
              { key: "configure", label: "Configure" },
              { key: "generating", label: "Generate" },
            ].map((s, i, arr) => {
              const order = ["upload", "configure", "generating", "done"];
              const currentIdx = order.indexOf(step);
              const thisIdx = order.indexOf(s.key);
              const isActive = currentIdx === thisIdx;
              const isDone = currentIdx > thisIdx;

              return (
                <div
                  key={s.key}
                  className="flex items-center gap-2 sm:gap-3 shrink-0"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                      style={{
                        background: isActive
                          ? "linear-gradient(to bottom, #acc7ff, #508ff8)"
                          : isDone
                            ? "#45dfa4"
                            : "#262a33",
                        color: isActive
                          ? "#00285b"
                          : isDone
                            ? "#003825"
                            : "#8c909e",
                        fontFamily: "Manrope, sans-serif",
                      }}
                    >
                      {isDone ? (
                        <span className="material-symbols-outlined text-xs">
                          check
                        </span>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      className="text-xs sm:text-sm font-medium"
                      style={{
                        color: isActive
                          ? "#dfe2ee"
                          : isDone
                            ? "#45dfa4"
                            : "#424753",
                        fontFamily: "Manrope, sans-serif",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div
                      className="w-8 sm:w-12 h-px shrink-0"
                      style={{ background: isDone ? "#45dfa4" : "#262a33" }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Error Banner ── */}
          {error && (
            <div
              className="mb-5 p-3 sm:p-4 rounded-xl bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 text-[#ffb4ab] text-sm flex items-start gap-2"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              <span className="material-symbols-outlined text-sm shrink-0 mt-0.5">
                error
              </span>
              {error}
            </div>
          )}

          {/* ════════════════════════════════
              STEP 1 — UPLOAD
          ════════════════════════════════ */}
          {step === "upload" && (
            <div className="flex flex-col gap-5">
              {/* Mode toggle */}
              <div className="flex rounded-xl overflow-hidden border border-[#424753]/30 w-full sm:w-fit">
                {[
                  { key: "file", label: "Upload File", icon: "upload_file" },
                  { key: "text", label: "Paste Text", icon: "edit_note" },
                ].map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setInputMode(m.key as "file" | "text")}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-all"
                    style={{
                      background: inputMode === m.key ? "#262a33" : "#181c24",
                      color: inputMode === m.key ? "#dfe2ee" : "#8c909e",
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {m.icon}
                    </span>
                    {m.label}
                  </button>
                ))}
              </div>

              {/* File dropzone */}
              {inputMode === "file" ? (
                <div
                  {...getRootProps()}
                  className="rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center gap-4 sm:gap-5 cursor-pointer transition-all border-2 border-dashed"
                  style={{
                    background: isDragActive
                      ? "rgba(172,199,255,0.08)"
                      : "#181c24",
                    borderColor: isDragActive ? "#acc7ff" : "#424753",
                  }}
                >
                  <input {...getInputProps()} />

                  {extracting ? (
                    // ✅ Loading state أثناء استخراج النص
                    <>
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#acc7ff]/10 flex items-center justify-center">
                        <span
                          className="material-symbols-outlined text-2xl sm:text-3xl text-[#acc7ff] animate-spin"
                          style={{ animationDuration: "1.5s" }}
                        >
                          progress_activity
                        </span>
                      </div>
                      <div className="text-center">
                        <p
                          className="font-bold text-[#dfe2ee] mb-1 text-sm sm:text-base"
                          style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          Extracting text…
                        </p>
                        <p
                          className="text-xs sm:text-sm text-[#8c909e]"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          Reading {fileName}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#acc7ff]/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl sm:text-3xl text-[#acc7ff]">
                          {isDragActive ? "file_download" : "upload_file"}
                        </span>
                      </div>
                      <div className="text-center">
                        <p
                          className="font-bold text-[#dfe2ee] mb-1 text-sm sm:text-base"
                          style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          {isDragActive
                            ? "Drop it here!"
                            : "Drag & drop your file"}
                        </p>
                        <p
                          className="text-xs sm:text-sm text-[#8c909e]"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          or{" "}
                          <span className="text-[#acc7ff]">
                            browse to upload
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap justify-center">
                        {["PDF", "DOCX", "TXT"].map((ext) => (
                          <span
                            key={ext}
                            className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#262a33] text-[#8c909e]"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            .{ext}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* Paste text */
                <div className="flex flex-col gap-3">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Paste your educational content here — lecture notes, textbook excerpts, training material..."
                    rows={10}
                    className="w-full px-4 sm:px-5 py-4 rounded-2xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none resize-none transition-all"
                    style={{ ...inputBase, lineHeight: "1.6" }}
                    onFocus={onFocusInput}
                    onBlur={onBlurInput}
                  />
                  <div className="flex justify-between items-center">
                    <span
                      className="text-xs text-[#424753]"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {content.length.toLocaleString()} / 15,000
                    </span>
                    <button
                      onClick={() => {
                        if (content.trim().length > 50) setStep("configure");
                      }}
                      disabled={content.trim().length < 50}
                      className="px-5 py-2.5 rounded-xl font-bold text-sm text-[#00285b] transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background:
                          "linear-gradient(to bottom, #acc7ff, #508ff8)",
                        fontFamily: "Manrope, sans-serif",
                      }}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════
              STEP 2 — CONFIGURE
          ════════════════════════════════ */}
          {step === "configure" && (
            <div className="flex flex-col gap-5">
              {/* File loaded banner */}
              {fileName && (
                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-[#45dfa4]/10 border border-[#45dfa4]/20">
                  <span className="material-symbols-outlined text-[#45dfa4] shrink-0">
                    check_circle
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-bold text-[#45dfa4] truncate"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      File loaded: {fileName}
                    </p>
                    <p
                      className="text-xs text-[#8c909e]"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {content.length.toLocaleString()} characters extracted
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setStep("upload");
                      setFileName("");
                      setContent("");
                    }}
                    className="text-xs text-[#8c909e] hover:text-[#dfe2ee] transition-colors shrink-0"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Change
                  </button>
                </div>
              )}

              {/* Quiz Details */}
              <div
                className="rounded-2xl p-4 sm:p-6 border border-[#424753]/20"
                style={{ background: "#181c24" }}
              >
                <h3
                  className="font-bold text-[#dfe2ee] mb-4 sm:mb-5"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Quiz Details
                </h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      Quiz Title *
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Chapter 5: Human Anatomy Quiz"
                      className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none transition-all"
                      style={inputBase}
                      onFocus={onFocusInput}
                      onBlur={onBlurInput}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        Subject / Topic
                      </label>
                      <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Biology, Marketing…"
                        className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none transition-all"
                        style={inputBase}
                        onFocus={onFocusInput}
                        onBlur={onBlurInput}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        Questions:{" "}
                        <span className="text-[#acc7ff]">{questionCount}</span>
                      </label>
                      <input
                        type="range"
                        min={3}
                        max={30}
                        value={questionCount}
                        onChange={(e) =>
                          setQuestionCount(Number(e.target.value))
                        }
                        className="w-full accent-[#acc7ff] mt-2"
                      />
                      <div
                        className="flex justify-between text-xs text-[#424753] mt-1"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        <span>3</span>
                        <span>30</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Difficulty */}
              <div
                className="rounded-2xl p-4 sm:p-6 border border-[#424753]/20"
                style={{ background: "#181c24" }}
              >
                <h3
                  className="font-bold text-[#dfe2ee] mb-4 sm:mb-5"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Difficulty Level
                </h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {difficultyOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setDifficulty(opt.value)}
                      className="p-3 sm:p-4 rounded-xl border transition-all text-left"
                      style={{
                        background:
                          difficulty === opt.value
                            ? opt.color + "15"
                            : "#0a0e16",
                        borderColor:
                          difficulty === opt.value
                            ? opt.color + "60"
                            : "#424753",
                      }}
                    >
                      <p
                        className="font-bold text-xs sm:text-sm mb-0.5 sm:mb-1"
                        style={{
                          color: opt.color,
                          fontFamily: "Space Grotesk, sans-serif",
                        }}
                      >
                        {opt.label}
                      </p>
                      <p
                        className="text-[10px] sm:text-xs text-[#8c909e] leading-tight"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Types */}
              <div
                className="rounded-2xl p-4 sm:p-6 border border-[#424753]/20"
                style={{ background: "#181c24" }}
              >
                <h3
                  className="font-bold text-[#dfe2ee] mb-4 sm:mb-5"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Question Types
                </h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {questionTypes.map((qt) => {
                    const selected = selectedTypes.includes(qt.value);
                    return (
                      <button
                        key={qt.value}
                        onClick={() => toggleType(qt.value)}
                        className="p-3 sm:p-4 rounded-xl border transition-all flex flex-col items-center gap-1.5 sm:gap-2"
                        style={{
                          background: selected
                            ? "rgba(172,199,255,0.1)"
                            : "#0a0e16",
                          borderColor: selected ? "#acc7ff40" : "#424753",
                        }}
                      >
                        <span
                          className="material-symbols-outlined text-lg sm:text-xl"
                          style={{ color: selected ? "#acc7ff" : "#8c909e" }}
                        >
                          {qt.icon}
                        </span>
                        <p
                          className="text-[10px] sm:text-xs font-bold text-center leading-tight"
                          style={{
                            color: selected ? "#acc7ff" : "#8c909e",
                            fontFamily: "Manrope, sans-serif",
                          }}
                        >
                          {qt.label}
                        </p>
                        {selected && (
                          <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#acc7ff] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[9px] sm:text-[10px] text-[#001a40]">
                              check
                            </span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quiz Settings */}
              <div
                className="rounded-2xl p-4 sm:p-6 border border-[#424753]/20"
                style={{ background: "#181c24" }}
              >
                <h3
                  className="font-bold text-[#dfe2ee] mb-4 sm:mb-5"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Quiz Settings
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label
                      className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      Time Limit{" "}
                      <span className="normal-case text-[#424753]">
                        (mins, 0 = unlimited)
                      </span>
                    </label>
                    <input
                      type="number"
                      value={timeLimit}
                      min={0}
                      max={120}
                      onChange={(e) => setTimeLimit(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] outline-none transition-all"
                      style={inputBase}
                      onFocus={onFocusInput}
                      onBlur={onBlurInput}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-bold text-[#c2c6d5] mb-2 uppercase tracking-wider"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      Pass Mark:{" "}
                      <span className="text-[#acc7ff]">{passMark}%</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={passMark}
                      onChange={(e) => setPassMark(Number(e.target.value))}
                      className="w-full accent-[#acc7ff] mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("upload")}
                  className="px-4 sm:px-6 py-3 rounded-xl font-bold text-sm text-[#8c909e] hover:text-[#dfe2ee] bg-[#262a33] hover:bg-[#31353e] transition-all shrink-0"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleGenerate}
                  className="flex-1 py-3 rounded-xl font-bold text-[#00285b] text-sm transition-all hover:brightness-110 flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(to bottom, #acc7ff, #508ff8)",
                    fontFamily: "Manrope, sans-serif",
                    boxShadow:
                      "inset 0.5px 0.5px 0 rgba(255,255,255,0.2), 0 0 20px rgba(79,142,247,0.3)",
                  }}
                >
                  <span className="material-symbols-outlined text-sm">
                    bolt
                  </span>
                  <span className="hidden sm:inline">
                    Generate Quiz with AI
                  </span>
                  <span className="sm:hidden">Generate</span>
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════
              STEP 3 — GENERATING / DONE
          ════════════════════════════════ */}
          {(step === "generating" || step === "done") && (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20 gap-6 sm:gap-8">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      step === "done"
                        ? "#45dfa4" + "20"
                        : "rgba(172,199,255,0.1)",
                  }}
                >
                  <span
                    className={`material-symbols-outlined text-4xl sm:text-5xl ${step === "generating" ? "animate-spin" : ""}`}
                    style={{
                      color: step === "done" ? "#45dfa4" : "#acc7ff",
                      animationDuration: "2s",
                    }}
                  >
                    {step === "done" ? "check_circle" : "psychology"}
                  </span>
                </div>
                {step === "generating" && (
                  <div className="absolute inset-0 rounded-full border-2 border-[#acc7ff]/20 border-t-[#acc7ff] animate-spin" />
                )}
              </div>

              <div className="text-center px-4">
                <h2
                  className="text-xl sm:text-2xl font-black text-[#dfe2ee] mb-2"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  {step === "done" ? "Quiz generated!" : "AI is working…"}
                </h2>
                <p
                  className="text-sm text-[#8c909e]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {step === "done"
                    ? "Redirecting to the question editor…"
                    : `Generating ${questionCount} ${difficulty} questions`}
                </p>
              </div>

              <div className="w-full max-w-xs sm:max-w-sm px-4 sm:px-0">
                <div className="flex justify-between items-center mb-2">
                  <span
                    className="text-xs text-[#8c909e]"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Progress
                  </span>
                  <span
                    className="text-xs text-[#acc7ff] font-bold"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {Math.round(progress)}%
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "#262a33" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                      background:
                        step === "done"
                          ? "#45dfa4"
                          : "linear-gradient(to right, #acc7ff, #508ff8)",
                    }}
                  />
                </div>
              </div>

              {step === "generating" && (
                <div className="flex flex-col gap-2 text-center px-4">
                  {[
                    "Parsing document content…",
                    "Identifying key concepts…",
                    "Generating questions…",
                    "Validating answers…",
                  ].map((msg, i) => (
                    <p
                      key={msg}
                      className="text-xs transition-all"
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        opacity: progress > i * 25 ? 1 : 0.3,
                        color: progress > (i + 1) * 25 ? "#45dfa4" : "#424753",
                      }}
                    >
                      {progress > i * 25 && progress <= (i + 1) * 25 && "→ "}
                      {msg}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
