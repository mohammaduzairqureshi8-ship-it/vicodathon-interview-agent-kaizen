// ═══════════════════════════════════════════════════════════════════
// SUPABASE — Server-side Client (for API Routes & Server Components)
// Roman Urdu: Ye file API routes aur Server Components use karte hain
// IS FILE KO BILKUL MAT CHHEDNA
// ═══════════════════════════════════════════════════════════════════

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Components mein cookies set nahi hoti — ye normal hai
          }
        },
      },
    }
  )
}