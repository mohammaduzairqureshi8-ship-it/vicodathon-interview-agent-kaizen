# 🏆 Vicodthon: Vibe Coding Hackathon - Prompt Log

**Project Name:** AI Interview Agent  
**Developer:** Mohammed Uzair  
**Event:** Vicodthon by AB Talks  
**Objective:** Documenting the vibe coding process, rapid iterations, and AI collaborations to build a highly structured, auto-grader-compliant AI application.

---

## 📊 Executive Summary

This project involves building an AI Interview Agent using a modern stack: **Next.js, Supabase, and Groq (LLaMA 3.3 70B)**. The vibe coding process demonstrated adaptability and rapid iteration. Initial scaffolding was done to establish a robust architecture, but when hitting rate limits and encountering missing data contexts, the workflow seamlessly pivoted between AI models (Claude to Gemini). A major focus of the development was ensuring the API strictly adhered to the hackathon's required `{ reply, done, feedback }` JSON contract to pass the auto-graders.

---

## 🚀 Phase 1: Architecture Scaffolding & Setup

### Iteration 1.1: The Zero-to-One Foundation

- **Goal:** Initialize the base Next.js structure, establish the Supabase database schema, and configure the Groq AI SDK with extreme clarity for a "0-level beginner" team setup.
- **Prompt 🗣️:**
  > _Summary:_ "You are an Elite Solutions Architect. We are building an AI Interview Agent. Integrate technical-spec.md, candidates.json, and curriculum.json into a Next.js + Supabase + Groq architecture. Output in 4 strict modules (Master Overview, Frontend, Database, AI-Brain) using Roman Urdu for explanations."
- **Model Output 🤖:**
  Generated a massive, production-grade 10-file architecture.
  ```text
  // Key Architecture Established:
  ├── app/api/interview/route.ts  (AI Brain)
  ├── components/CandidateSelector.tsx & ChatInterface.tsx
  ├── supabase/migrations/20240101000001_initial_schema.sql
  └── lib/groq.ts & lib/supabase/client.ts
  Vibe Check 🎯: The AI nailed the file structure and database schema beautifully. However, there was a critical flaw: the actual JSON files (technical-spec.md, candidates.json, curriculum.json) were not properly uploaded before the model's usage limit was exhausted. The AI hallucinated dummy data. I realized that proceeding with this would cause the app to fail the hackathon's auto-grader constraints. A pivot was required.
  ```

⚙️ Phase 2: Data Integration & Strict API Compliance
Iteration 2.1: Model Pivot & Auto-Grader Alignment
Goal: Switch to Gemini, upload the real JSON datasets, and strictly enforce the hackathon's exact API contract to prevent system failures.

Prompt 🗣️:

Summary: "The previous JSON files were not uploaded. I am providing the real technical-spec.md, candidates.json, and curriculum.json. Update the codebase—specifically the AI-Brain route and Database seed—to strictly follow the { reply, done, feedback } specification."

Model Output 🤖:
The AI rewrote the critical components. It generated the exact SQL seed data for 20 candidates and 31 curriculum days. More importantly, it refactored the Next.js API route to strictly return the required JSON response.

TypeScript
// Updated POST /api/interview endpoint (Strict Spec Compliance)
// SCENARIO 2 & 3: CONVERSATION TURN OR END INTERVIEW
if (isEnding) {
// Generate structured JSON feedback via Groq
return NextResponse.json({
reply: "Thank you for your time. Your interview is now complete.",
done: true,
feedback: feedbackJson // { summary, strengths, gaps, next }
});
}
Vibe Check 🎯: Success. By feeding the real JSON files into the new prompt, the AI perfectly mapped the database seed. The API logic was successfully bottlenecked into the strict SpecResponse interface (reply, done, feedback), ensuring the frontend UI and the backend AI-Brain are now fully aligned with the Vicodthon evaluation criteria.

## ⚙️ Phase 3: Logic, Debugging & Refinement

### Iteration 3.1: Escaping Dependency Hell & Downstream Errors

- **Goal:** Resolve a cascading build failure in Next.js caused by missing Supabase modules (`@supabase/ssr`) and ensure 100% error-free execution across the frontend and backend.
- **Prompt 🗣️:**
  > _Summary:_ "We have errors on some parts of the code. `lib/supabase/client.ts` has an error saying module `@supabase/ssr` is not found. The frontend is also throwing errors. Make the code 100% working and error-free."
- **Model Output 🤖:**
  The AI identified that the root cause was a missing dependency in `package.json` that was breaking the entire import chain. It provided a completely updated dependency list, refactored the auth clients to bypass the missing module, and provided a "nuclear" clean-install sequence.
  ```powershell
  # AI's Complete Restart Sequence to clear ghost errors
  Remove-Item -Recurse -Force node_modules
  Remove-Item -Force package-lock.json
  Remove-Item -Recurse -Force .next
  npm install
  npm run dev
  TypeScript
  // Refactored lib/supabase/server.ts (Bypassing @supabase/ssr)
  import { createClient as _createSupabaseClient } from '@supabase/supabase-js'
  export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return _createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  })
  }
  Vibe Check 🎯: This interaction was a lifesaver. Instead of just patching a single line, the AI explained the chain of errors (one missing module breaking everything downstream). It downgraded the complex @supabase/ssr implementation to a simpler, stable @supabase/supabase-js approach, updated the tsconfig.json paths, and provided the exact terminal commands to wipe the .next cache. This rapid debugging vibe kept the momentum going without getting stuck in dependency hell.
  ```
