import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-xl">
        
        {/* Logo area */}
        <div className="space-y-3">
          <div className="text-7xl">🤖</div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            AI Interview Agent
          </h1>
          <p className="text-slate-400 text-lg">
            31-Day Curriculum · 20 Candidates · Powered by Groq
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {['Next.js 14', 'Supabase', 'Groq LLaMA', 'TypeScript'].map(tech => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/interview"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-center"
          >
            🎯 Start Interview
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors border border-slate-700 text-center"
          >
            📊 View Dashboard
          </Link>
        </div>

        <p className="text-slate-600 text-sm">
          Select a candidate → Start interview → Get AI feedback
        </p>
      </div>
    </div>
  )
}