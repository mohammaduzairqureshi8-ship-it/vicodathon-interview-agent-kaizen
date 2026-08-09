// ═══════════════════════════════════════════════════════════════════
// AI INTERVIEW AGENT — TypeScript Type Definitions
// Roman Urdu: Yahan sab types define hain — sab teams is file ko reference kare
// ═══════════════════════════════════════════════════════════════════

// ─── Candidate Signals ───────────────────────────────────────────
export type SignalLevel = 'weak' | 'medium' | 'strong'

export interface CandidateSignals {
  technical:      SignalLevel
  communication:  SignalLevel
  problemSolving: SignalLevel
  consistency:    SignalLevel
}

// ─── Candidate ───────────────────────────────────────────────────
export interface Candidate {
  id:                  string
  external_id:         string     // 'cand_001', 'cand_002', etc.
  name:                string
  email:               string
  current_day:         number     // 1 to 31
  module_id:           string     // 'module_1' to 'module_8'
  progress_percentage: number     // 0 to 100
  signals:             CandidateSignals
  status:              'active' | 'completed' | 'paused'
  created_at:          string
  updated_at:          string
}

// ─── Curriculum ───────────────────────────────────────────────────
export interface CurriculumModule {
  id:          string
  name:        string
  description: string
  order_index: number
  start_day:   number
  end_day:     number
  created_at:  string
}

export interface CurriculumDay {
  id:          string
  day_number:  number
  module_id:   string
  title:       string
  topics:      string[]
  objectives:  string[]
  exercises:   string[]
  created_at:  string
  // Joined relation
  curriculum_modules?: CurriculumModule
}

// ─── Interview Session ────────────────────────────────────────────
export interface InterviewSession {
  id:           string
  candidate_id: string
  status:       'active' | 'completed' | 'abandoned'
  turn_count:   number
  started_at:   string
  completed_at: string | null
}

// ─── Interview Message ────────────────────────────────────────────
export interface InterviewMessage {
  id:         string
  session_id: string
  role:       'user' | 'assistant' | 'system'
  content:    string
  created_at: string
}

// ─── Interview Feedback ───────────────────────────────────────────
export interface InterviewFeedback {
  overallScore:         number          // 0-100
  technicalScore:       number          // 0-100
  communicationScore:   number          // 0-100
  problemSolvingScore:  number          // 0-100
  strengths:            string[]        // 3 specific strengths
  areasForImprovement:  string[]        // 3 areas to improve
  recommendation:       'strong_hire' | 'hire' | 'maybe' | 'no_hire'
  detailedSummary:      string          // 2-3 sentences
}

// ─── API Contract — MUST match technical-spec.md ─────────────────
export interface InterviewRequest {
  action:      'reply' | 'done' | 'feedback'
  candidateId: string                   // external_id: 'cand_001'
  sessionId?:  string | null            // UUID, null for first message
  message?:    string | null            // Candidate's answer text
}

export interface InterviewReplyResponse {
  success:   true
  sessionId: string
  message:   string     // AI's question/response
  turn:      number     // Which turn we're on
}

export interface InterviewDoneResponse {
  success:   true
  sessionId: string
  status:    'completed'
}

export interface InterviewFeedbackResponse {
  success:  true
  feedback: InterviewFeedback
}

export interface InterviewErrorResponse {
  success: false
  error:   string
}

export type InterviewResponse =
  | InterviewReplyResponse
  | InterviewDoneResponse
  | InterviewFeedbackResponse
  | InterviewErrorResponse

// ─── Groq Message Format ─────────────────────────────────────────
export interface GroqMessage {
  role:    'system' | 'user' | 'assistant'
  content: string
}