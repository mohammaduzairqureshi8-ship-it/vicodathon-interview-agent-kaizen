import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = createClient()

  const [{ count: totalCandidates }, { data: recentFeedback }, { count: activeSessions }] =
    await Promise.all([
      supabase.from('candidates').select('*', { count: 'exact', head: true }),
      supabase
        .from('interview_feedback')
        .select('*, candidates(name, current_day), interview_sessions(started_at)')
        .order('created_at', { ascending: false })
        .limit(15),
      supabase
        .from('interview_sessions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active'),
    ])

  const avgScore =
    recentFeedback && recentFeedback.length > 0
      ? Math.round(
          recentFeedback.reduce((sum: number, f: any) => sum + (f.overall_score ?? 0), 0) /
          recentFeedback.length
        )
      : 0

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">📊 Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">AI Interview Agent — All Candidates</p>
          </div>
          <Link
            href="/interview"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            🎯 Naya Interview →
          </Link>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Candidates', value: totalCandidates ?? 0, icon: '👥', color: 'text-blue-400'   },
            { label: 'Interviews Done',  value: recentFeedback?.length ?? 0, icon: '✅', color: 'text-green-400'  },
            { label: 'Active Sessions',  value: activeSessions ?? 0, icon: '⚡', color: 'text-yellow-400' },
            { label: 'Avg Score',        value: avgScore,            icon: '🏆', color: 'text-purple-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-slate-900 rounded-xl p-5 border border-slate-800">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`text-3xl font-bold tabular-nums ${stat.color}`}>{stat.value}</div>
              <div className="text-slate-400 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Interviews Table */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="font-semibold text-white">Recent Interviews</h2>
            <span className="text-xs text-slate-500">Last 15 results</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  {['Candidate', 'Day', 'Overall', 'Technical', 'Communication', 'Recommendation', 'Date'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs text-slate-500 uppercase tracking-wider font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentFeedback?.map((f: any) => {
                  const recoMap: Record<string, string> = {
                    strong_hire: '⭐ Strong Hire',
                    hire:        '✅ Hire',
                    maybe:       '🤔 Maybe',
                    no_hire:     '❌ No Hire',
                  }
                  const recoColor: Record<string, string> = {
                    strong_hire: 'bg-emerald-900/60 text-emerald-400',
                    hire:        'bg-green-900/60  text-green-400',
                    maybe:       'bg-yellow-900/60 text-yellow-400',
                    no_hire:     'bg-red-900/60    text-red-400',
                  }
                  return (
                    <tr key={f.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-white">{f.candidates?.name ?? '—'}</td>
                      <td className="px-5 py-3.5 text-slate-400">{f.candidates?.current_day ?? '—'}/31</td>
                      <td className="px-5 py-3.5 font-bold text-blue-400">{f.overall_score}</td>
                      <td className="px-5 py-3.5 text-slate-300">{f.technical_score}</td>
                      <td className="px-5 py-3.5 text-slate-300">{f.communication_score}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${recoColor[f.recommendation] ?? ''}`}>
                          {recoMap[f.recommendation] ?? f.recommendation}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 text-xs">
                        {new Date(f.created_at).toLocaleDateString('en-PK')}
                      </td>
                    </tr>
                  )
                })}
                {(!recentFeedback || recentFeedback.length === 0) && (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-slate-600">
                      Abhi koi interview complete nahi hua. /interview par jaao aur pehla interview karo!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}