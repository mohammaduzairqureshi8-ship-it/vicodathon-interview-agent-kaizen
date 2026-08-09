'use client'

import type { Candidate, InterviewFeedback } from '@/types'

interface FeedbackDisplayProps {
  feedback:  InterviewFeedback
  candidate: Candidate
  onReset:   () => void
}

const RECOMMENDATION_CONFIG = {
  strong_hire: { label: '⭐ Strong Hire',  bg: 'bg-emerald-600',                 text: 'text-emerald-50' },
  hire:        { label: '✅ Hire',          bg: 'bg-green-600',                   text: 'text-green-50'   },
  maybe:       { label: '🤔 Maybe',         bg: 'bg-yellow-600',                  text: 'text-yellow-50'  },
  no_hire:     { label: '❌ No Hire',       bg: 'bg-red-600',                     text: 'text-red-50'     },
} as const

function ScoreBar({ label, score }: { label: string; score: number }) {
  const color =
    score >= 75 ? 'bg-emerald-500' :
    score >= 55 ? 'bg-yellow-500'  :
                  'bg-red-500'

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-300">{label}</span>
        <span className={`font-bold tabular-nums ${score >= 75 ? 'text-emerald-400' : score >= 55 ? 'text-yellow-400' : 'text-red-400'}`}>
          {score}<span className="text-slate-500 font-normal">/100</span>
        </span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
        <div
          className={`${color} h-2 rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

export function FeedbackDisplay({ feedback, candidate, onReset }: FeedbackDisplayProps) {
  const reco = RECOMMENDATION_CONFIG[feedback.recommendation] ?? RECOMMENDATION_CONFIG.maybe

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* ── Header ── */}
        <div className="text-center space-y-3 pb-2">
          <h2 className="text-2xl font-bold text-white">Interview Complete</h2>
          <p className="text-slate-400 text-sm">
            {candidate.name} · Day {candidate.current_day}/31 · {candidate.progress_percentage}% progress
          </p>
          <div className={`inline-block px-6 py-2 rounded-full font-bold text-base ${reco.bg} ${reco.text}`}>
            {reco.label}
          </div>
        </div>

        {/* ── Overall Score ── */}
        <div className="bg-slate-900 rounded-2xl p-6 text-center border border-slate-800">
          <div className="text-6xl font-black text-blue-400 tabular-nums">{feedback.overallScore}</div>
          <div className="text-slate-400 mt-1 text-sm font-medium">Overall Score · out of 100</div>
        </div>

        {/* ── Score Breakdown ── */}
        <div className="bg-slate-900 rounded-2xl p-6 space-y-4 border border-slate-800">
          <h3 className="font-semibold text-slate-200 text-sm uppercase tracking-wider">Score Breakdown</h3>
          <ScoreBar label="🧠 Technical Knowledge" score={feedback.technicalScore}      />
          <ScoreBar label="💬 Communication"        score={feedback.communicationScore}  />
          <ScoreBar label="🔧 Problem Solving"      score={feedback.problemSolvingScore} />
        </div>

        {/* ── Strengths + Improvements ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
            <h3 className="font-semibold text-emerald-400 mb-3 text-sm">✅ Strengths</h3>
            <ul className="space-y-2">
              {feedback.strengths.map((s, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5 shrink-0">▸</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
            <h3 className="font-semibold text-orange-400 mb-3 text-sm">🔧 Improve On</h3>
            <ul className="space-y-2">
              {feedback.areasForImprovement.map((a, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5 shrink-0">▸</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Detailed Summary ── */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-2">
          <h3 className="font-semibold text-slate-200 text-sm">📝 Detailed Summary</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{feedback.detailedSummary}</p>
        </div>

        {/* ── Reset Button ── */}
        <button
          onClick={onReset}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl
                     transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          🔄 Naya Interview Shuru Karo
        </button>
      </div>
    </div>
  )
}