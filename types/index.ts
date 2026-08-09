// ═══════════════════════════════════════════════════════════════════
// AI INTERVIEW AGENT — Updated for Hackathon Spec
// ═══════════════════════════════════════════════════════════════════

export interface SpecFeedback {
  summary: string;
  strengths: string[];
  gaps: string[];
  next: string[];
}

export interface SpecResponse {
  reply: string;
  done: boolean;
  feedback?: SpecFeedback;
}

export interface Candidate {
  id: string;
  external_id: string;
  name: string;
  email: string;
  current_day: number;
  progress_percentage: number;
  signals: any;
  status: string;
  jobRole?: string;
  yearsExperience?: number;
}