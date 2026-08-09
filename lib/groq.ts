// ═══════════════════════════════════════════════════════════════════
// AI INTERVIEW AGENT — Groq SDK Client
// Roman Urdu: Groq AI ka connection yahan setup hota hai
// ═══════════════════════════════════════════════════════════════════

import Groq from 'groq-sdk'

if (!process.env.GROQ_API_KEY) {
  throw new Error(
    '❌ GROQ_API_KEY environment variable missing!\n' +
    'Roman Urdu: .env.local file mein GROQ_API_KEY daalo.\n' +
    'Groq API key yahan se lo: https://console.groq.com/keys'
  )
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

// Model to use — LLaMA 3.3 70B (fast, accurate, free tier)
export const GROQ_MODEL = 'llama-3.3-70b-versatile' as const

// Token limits
export const INTERVIEW_MAX_TOKENS  = 500   // Per interview turn
export const FEEDBACK_MAX_TOKENS   = 1000  // For feedback generation