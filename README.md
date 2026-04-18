# QuizCraft AI 🧠

**Turn any document into an interactive quiz in seconds.**

AI-powered quiz generation SaaS platform for teachers, trainers, and HR teams. Built with Next.js 15, Supabase, Tailwind CSS v4, and Google Gemini AI.

---

## ✨ Features

- **AI Quiz Generation** — Upload PDF/DOCX/TXT or paste text → Gemini AI generates MCQ, True/False, and Short Answer questions
- **Question Editor** — Edit, reorder, and refine AI-generated questions
- **One-Click Publishing** — Publish with shareable links and QR codes
- **Student Quiz View** — Distraction-free quiz-taking experience (no account needed)
- **Real-Time Analytics** — Score distributions, pass rates, attempt history with charts
- **Authentication** — Email/password auth via Supabase
- **Dark Mode** — Academic Futurism design system

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Database | Supabase (PostgreSQL + Auth + RLS) |
| Styling | Tailwind CSS v4 |
| AI | Google Gemini 1.5 Flash |
| Charts | Recharts |
| QR Codes | qrcode.react |
| File Upload | react-dropzone |
| Animations | Framer Motion |

---

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone <your-repo>
cd quizcraft-ai
npm install
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your dashboard
3. Run the contents of `supabase/schema.sql`
4. Copy your **Project URL** and **Anon Key** from **Settings → API**

### 4. Get a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Add it to `.env.local` as `GEMINI_API_KEY`

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── auth/
│   │   ├── login/page.tsx          # Login
│   │   ├── register/page.tsx       # Register
│   │   └── callback/route.ts       # OAuth callback
│   ├── dashboard/
│   │   ├── layout.tsx              # Dashboard layout with sidebar
│   │   ├── page.tsx                # Dashboard home
│   │   └── quizzes/page.tsx        # All quizzes list
│   ├── quiz/
│   │   ├── create/page.tsx         # AI Quiz Creator
│   │   └── [id]/
│   │       ├── edit/page.tsx       # Question Editor
│   │       ├── share/page.tsx      # Share & Publish
│   │       ├── analytics/page.tsx  # Analytics Dashboard
│   │       └── take/page.tsx       # Student Quiz View
│   └── api/
│       ├── generate/route.ts       # AI generation endpoint
│       └── quiz/route.ts           # Quiz CRUD
├── components/
│   └── layout/
│       └── Sidebar.tsx             # Navigation sidebar
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Browser client
│   │   ├── server.ts               # Server client
│   │   └── middleware.ts           # Auth middleware
│   ├── gemini.ts                   # Gemini AI integration
│   └── utils.ts                    # Utility functions
├── types/
│   └── index.ts                    # TypeScript types
└── middleware.ts                   # Route protection
```

---

## 🎨 Design System

**Academic Futurism** — Dark mode SaaS with glassmorphism.

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0f131c` | Page background |
| Surface | `#181c24` | Cards |
| Primary | `#acc7ff` | Electric blue accents |
| Secondary | `#45dfa4` | Emerald green (success) |
| Tertiary | `#ffb95f` | Amber (AI badges) |

Fonts: **Bricolage Grotesque** (headlines), **Manrope** (body), **Space Grotesk** (UI), **JetBrains Mono** (code)

---

## 🗄 Database Schema

Five tables: `profiles`, `quizzes`, `questions`, `quiz_attempts`

All tables have **Row Level Security (RLS)** enabled:
- Users can only manage their own quizzes/questions
- Students can submit attempts to published quizzes
- Published quizzes are publicly readable by share token

---

## 📝 Key Pages

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page |
| `/auth/login` | Sign in |
| `/auth/register` | Create account |
| `/dashboard` | Stats overview + recent quizzes |
| `/dashboard/quizzes` | Full quiz list |
| `/quiz/create` | AI quiz generation wizard |
| `/quiz/[id]/edit` | Question editor |
| `/quiz/[id]/share` | Share links + QR code |
| `/quiz/[id]/analytics` | Performance charts |
| `/quiz/[token]/take` | Student quiz-taking view |

---

## 🔒 Security

- Auth handled by Supabase with RLS policies
- Protected routes via Next.js middleware
- Server-side validation on all API routes
- Environment variables never exposed to client (except `NEXT_PUBLIC_*`)

---

## 📦 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

Set all environment variables in Vercel dashboard under **Settings → Environment Variables**.

---

## 📄 License

MIT
