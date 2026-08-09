// ═══════════════════════════════════════════════════════════════════
// SUPABASE — Browser-side Client (for Client Components)
// Roman Urdu: Ye file Frontend ke 'use client' components use karte hain
// IS FILE KO BILKUL MAT CHHEDNA
// ═══════════════════════════════════════════════════════════════════

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}