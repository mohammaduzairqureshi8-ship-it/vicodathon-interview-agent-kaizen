// types/index.ts
// ═══════════════════════════════════════════════════════════════════
// Roman Urdu: SABHI types YE FILE SE IMPORT HOTE HAIN
// ═══════════════════════════════════════════════════════════════════

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIGNAL LEVEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type SignalLevel = 'weak' | 'medium' | 'strong'

export interface CandidateSignals {
  technical:      SignalLevel
  communication:  SignalLevel
  problemSolving: SignalLevel
  consistency:    SignalLevel
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CANDIDATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface Candidate {
  id:                  string
  external_id:         string
  name:                string
  email:               string
  current_day:         number
  module_id:           string
  progress_percentage: number
  signals:             CandidateSignals
  status:              'active' | 'completed' | 'paused'
  created_at?:         string
  updated_at?:         string
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CURRICULUM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface CurriculumDay {
  id:         string
  day_number: number
  module_id:  string
  title:      string
  topics:     string[]
  objectives: string[]
  exercises:  string[]
}

export interface CurriculumModule {
  id:          string
  name:        string
  description: string
  order_index: number
  start_day:   number
  end_day:     number
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INTERVIEW FEEDBACK (technical-spec.md EXACTLY)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface InterviewFeedback {
  summary:   string
  strengths: string[]
  gaps:      string[]
  next:      string[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHAT MESSAGE (for frontend)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ChatMessage {
  role:      'user' | 'assistant'
  content:   string
  timestamp: Date
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API RESPONSES (technical-spec.md EXACTLY)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface InterviewOngoingResponse {
  reply: string
  done:  false
}

export interface InterviewDoneResponse {
  reply:    string
  done:     true
  feedback: InterviewFeedback
}

export type InterviewApiResponse = 
  | InterviewOngoingResponse 
  | InterviewDoneResponse

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GROQ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface GroqMessage {
  role:    'system' | 'user' | 'assistant'
  content: string
}