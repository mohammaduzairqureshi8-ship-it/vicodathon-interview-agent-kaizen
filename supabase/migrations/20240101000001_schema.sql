-- ═══════════════════════════════════════════════════════════════════
-- AI INTERVIEW AGENT — Database Schema v1.0
-- Roman Urdu: Poore system ki database tables yahan banein gi
-- Supabase SQL Editor mein is poori file ko paste karke RUN karo
-- ═══════════════════════════════════════════════════════════════════

-- Enable UUID extension (Supabase mein pehle se hoti hai, safety ke liye)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────
-- TABLE 1: curriculum_modules
-- Roman Urdu: 8 modules ki information — har module ka naam, days range
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS curriculum_modules (
  id          TEXT PRIMARY KEY,                    -- 'module_1', 'module_2', etc.
  name        TEXT NOT NULL,                       -- Module ka naam
  description TEXT,                                -- Module ki description
  order_index INTEGER NOT NULL,                    -- Sequence number (1-8)
  start_day   INTEGER NOT NULL,                    -- Pehla din (1-31)
  end_day     INTEGER NOT NULL,                    -- Aakhri din (1-31)
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────
-- TABLE 2: curriculum_days
-- Roman Urdu: Har din ka curriculum — topics, objectives, exercises
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS curriculum_days (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_number  INTEGER NOT NULL UNIQUE,             -- 1 se 31
  module_id   TEXT NOT NULL REFERENCES curriculum_modules(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,                       -- "Introduction to Python"
  topics      JSONB DEFAULT '[]'::jsonb,           -- Array of topic strings
  objectives  JSONB DEFAULT '[]'::jsonb,           -- Array of learning objectives
  exercises   JSONB DEFAULT '[]'::jsonb,           -- Array of exercise descriptions
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────
-- TABLE 3: candidates
-- Roman Urdu: 20 candidates ki profiles — name, progress, signals
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS candidates (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id         TEXT UNIQUE NOT NULL,        -- 'cand_001', 'cand_002', etc.
  name                TEXT NOT NULL,
  email               TEXT NOT NULL UNIQUE,
  current_day         INTEGER NOT NULL DEFAULT 1 CHECK (current_day BETWEEN 1 AND 31),
  module_id           TEXT NOT NULL REFERENCES curriculum_modules(id),
  progress_percentage INTEGER NOT NULL DEFAULT 0  CHECK (progress_percentage BETWEEN 0 AND 100),
  signals             JSONB NOT NULL DEFAULT '{
    "technical": "medium",
    "communication": "medium",
    "problemSolving": "medium",
    "consistency": "medium"
  }'::jsonb,
  status              TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','completed','paused')),
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────
-- TABLE 4: interview_sessions
-- Roman Urdu: Har interview ka session — kab shuru hua, kab khatam
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS interview_sessions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  status       TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','completed','abandoned')),
  turn_count   INTEGER NOT NULL DEFAULT 0,
  started_at   TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ─────────────────────────────────────────────────────────────────────
-- TABLE 5: interview_messages
-- Roman Urdu: Interview ki har ek message — user ne kya kaha, AI ne kya jawab diya
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS interview_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES interview_sessions(id) ON DELETE CASCADE,
  role       TEXT NOT NULL CHECK (role IN ('user','assistant','system')),
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────
-- TABLE 6: interview_feedback
-- Roman Urdu: Interview khatam hone ke baad AI ka analysis — scores, recommendation
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS interview_feedback (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id            UUID NOT NULL UNIQUE REFERENCES interview_sessions(id) ON DELETE CASCADE,
  candidate_id          UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  overall_score         INTEGER CHECK (overall_score BETWEEN 0 AND 100),
  technical_score       INTEGER CHECK (technical_score BETWEEN 0 AND 100),
  communication_score   INTEGER CHECK (communication_score BETWEEN 0 AND 100),
  problem_solving_score INTEGER CHECK (problem_solving_score BETWEEN 0 AND 100),
  strengths             JSONB DEFAULT '[]'::jsonb,
  areas_for_improvement JSONB DEFAULT '[]'::jsonb,
  recommendation        TEXT CHECK (recommendation IN ('strong_hire','hire','maybe','no_hire')),
  detailed_summary      TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────
-- INDEXES — Query fast karne ke liye
-- ─────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_candidates_external_id  ON candidates(external_id);
CREATE INDEX IF NOT EXISTS idx_candidates_status       ON candidates(status);
CREATE INDEX IF NOT EXISTS idx_sessions_candidate      ON interview_sessions(candidate_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status         ON interview_sessions(status);
CREATE INDEX IF NOT EXISTS idx_messages_session        ON interview_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_created        ON interview_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_feedback_candidate      ON interview_feedback(candidate_id);
CREATE INDEX IF NOT EXISTS idx_curriculum_days_number  ON curriculum_days(day_number);
CREATE INDEX IF NOT EXISTS idx_curriculum_days_module  ON curriculum_days(module_id);

-- ─────────────────────────────────────────────────────────────────────
-- AUTO-UPDATE updated_at trigger
-- ─────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER candidates_updated_at
  BEFORE UPDATE ON candidates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─────────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS) — Public read for now, adjust for auth later
-- ─────────────────────────────────────────────────────────────────────
ALTER TABLE curriculum_modules   ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum_days      ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates           ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_sessions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_messages   ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_feedback   ENABLE ROW LEVEL SECURITY;

-- Public read/write policies (API routes use service role, frontend uses anon)
CREATE POLICY "allow_all_curriculum_modules"   ON curriculum_modules   FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_curriculum_days"      ON curriculum_days      FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_candidates"           ON candidates           FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_interview_sessions"   ON interview_sessions   FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_interview_messages"   ON interview_messages   FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_interview_feedback"   ON interview_feedback   FOR ALL USING (true) WITH CHECK (true);