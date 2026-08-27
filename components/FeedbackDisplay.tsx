'use client'

interface Candidate {
  name: string
  current_day: number
  progress_percentage: number
}

interface InterviewFeedback {
  summary: string
  strengths?: string[]
  gaps?: string[]
  next?: string[]
}

interface FeedbackDisplayProps {
  feedback: InterviewFeedback
  candidate: Candidate
  onReset: () => void
}

export function FeedbackDisplay({
  feedback,
  candidate,
  onReset,
}: FeedbackDisplayProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-3 pb-2">
          <div className="text-5xl">🎉</div>
          <h2 className="text-3xl font-bold text-white">
            Interview Complete!
          </h2>
          <p className="text-slate-400 text-sm">
            {candidate.name} · Day {candidate.current_day} of 31 · {candidate.progress_percentage}% progress
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-lg">
          <h3 className="font-bold text-slate-100 mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
            <span>📋</span> Assessment Summary
          </h3>
          <p className="text-slate-300 leading-relaxed text-sm">
            {feedback.summary}
          </p>
        </div>

        {/* Strengths + Gaps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Strengths */}
          <div className="bg-slate-900 rounded-2xl p-5 border border-emerald-900/50 shadow">
            <h3 className="font-bold text-emerald-400 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
              <span>✅</span> What Went Well
            </h3>
            <ul className="space-y-2.5">
              {feedback.strengths && feedback.strengths.length > 0 ? (
                feedback.strengths.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-slate-300"
                  >
                    <span className="text-emerald-400 font-bold text-lg leading-none shrink-0 mt-0.5">
                      ▸
                    </span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-500 italic text-xs">
                  No strengths recorded
                </li>
              )}
            </ul>
          </div>

          {/* Knowledge Gaps */}
          <div className="bg-slate-900 rounded-2xl p-5 border border-orange-900/50 shadow">
            <h3 className="font-bold text-orange-400 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
              <span>🔍</span> Areas to Improve
            </h3>
            <ul className="space-y-2.5">
              {feedback.gaps && feedback.gaps.length > 0 ? (
                feedback.gaps.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-slate-300"
                  >
                    <span className="text-orange-400 font-bold text-lg leading-none shrink-0 mt-0.5">
                      ▸
                    </span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-500 italic text-xs">
                  No gaps identified
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-blue-900/50 shadow">
          <h3 className="font-bold text-blue-400 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
            <span>🚀</span> Recommended Next Steps
          </h3>
          <ol className="space-y-2.5">
            {feedback.next && feedback.next.length > 0 ? (
              feedback.next.map((item: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-slate-300"
                >
                  <span className="text-blue-400 font-bold tabular-nums shrink-0 .min-w-\[1\.5rem\] {
 min-width: 1.5rem /* 24px */;
} text-center">
                    {i + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic text-xs">
                No next steps recorded
              </li>
            )}
          </ol>
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="w-full py-3.5 px-4 .bg-gradient-to-r {
 --tw-gradient-position: to right in oklab;
 background-image: linear-gradient(var(--tw-gradient-stops));
} from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 shadow-lg"
        >
          🔄 Start Another Interview
        </button>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-500">
            Keep practicing! You're making great progress through the curriculum.
          </p>
        </div>

      </div>
    </div>
  )
}