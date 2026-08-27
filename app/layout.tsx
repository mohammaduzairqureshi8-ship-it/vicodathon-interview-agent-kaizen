import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Interview Agent | Powered by Groq',
  description: '31-day curriculum technical interview system built with Next.js, Supabase, and Groq',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-950 text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}