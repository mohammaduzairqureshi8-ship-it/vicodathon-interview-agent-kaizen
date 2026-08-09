// lib/supabase/server.ts
// ─────────────────────────────────────────────────────────────────────
// Roman Urdu: Server side ka Supabase client — API routes mein use hota hai
// Service Role Key use karta hai taake RLS bypass ho sake (screenshots mein
// SUPABASE_SERVICE_ROLE_KEY dikh rahi hai .env.local mein — yahan use ki)
// ─────────────────────────────────────────────────────────────────────

import { createClient as _createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  
  // Server side par Service Role Key prefer karo (RLS bypass karta hai)
  // Agar service role key nahi hai toh anon key use karo
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url) {
    throw new Error('❌ NEXT_PUBLIC_SUPABASE_URL .env.local mein missing hai!')
  }
  if (!key) {
    throw new Error('❌ SUPABASE_SERVICE_ROLE_KEY ya NEXT_PUBLIC_SUPABASE_ANON_KEY missing hai!')
  }

  return _createSupabaseClient(url, key, {
    auth: {
      // Server side par cookies nahi chahiye, simple JWT auth kaafi hai
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}