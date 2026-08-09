
TypeScript
'use client'
import type { Candidate, SpecFeedback } from '@/types'

interface FeedbackDisplayProps {
  feedback: SpecFeedback
  candidate: Candidate
  onReset: () => void
}

export function FeedbackDisplay({ feedback, candidate, onReset }: FeedbackDisplayProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-950">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-3 pb-4 border-b border-slate-800">
          <h2 className="text-3xl font-bold text-white">Interview Complete</h2>
          <p className="text-emerald-400 font-medium">
            {candidate?.name || 'Candidate'} {candidate?.jobRole ? (${candidate.jobRole}) : ''}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-2">
          <h3 className="font-semibold text-white text-lg">📝 Executive Summary</h3>
          <p className="text-slate-300 leading-relaxed">{feedback?.summary || 'No summary available.'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 rounded-2xl p-5 border border-emerald-900/50">
            <h3 className="font-semibold text-emerald-400 mb-4 flex items-center gap-2">✅ Strengths</h3>
            <ul className="space-y-3">
              {(feedback?.strengths || []).map((s, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-500 shrink-0">▸</span> {s}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-slate-900 rounded-2xl p-5 border border-red-900/50">
            <h3 className="font-semibold text-red-400 mb-4 flex items-center gap-2">⚠️ Gaps</h3>
            <ul className="space-y-3">
              {(feedback?.gaps || []).map((a, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-red-500 shrink-0">▸</span> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-blue-900/50">
          <h3 className="font-semibold text-blue-400 mb-4 flex items-center gap-2">🚀 Next Steps</h3>
          <ul className="space-y-3">
            {(feedback?.next || []).map((n, i) => (
              <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-blue-500 shrink-0">→</span> {n}
              </li>
            ))}
          </ul>
        </div>

        <button onClick={onReset} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
          🔄 Start New Session
        </button>
      </div>
    </div>
  )
}