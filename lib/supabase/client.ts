// lib/supabase/client.ts
// ─────────────────────────────────────────────────────────────────────
// Roman Urdu: Browser side ka Supabase client — NO @supabase/ssr needed
// Ye file Client Components mein use hoti hai (CandidateSelector etc.)
// ─────────────────────────────────────────────────────────────────────

import { createClient as _createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url) {
    throw new Error('❌ NEXT_PUBLIC_SUPABASE_URL .env.local mein missing hai!')
  }
  if (!key) {
    throw new Error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY .env.local mein missing hai!')
  }

  return _createSupabaseClient(url, key)
}