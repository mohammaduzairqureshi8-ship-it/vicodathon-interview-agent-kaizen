'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Candidate } from '@/types'

interface CandidateSelectorProps {
  onSelect: (candidate: Candidate) => void
  disabled?: boolean
}

export function CandidateSelector({ onSelect, disabled }: CandidateSelectorProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('candidates')
          .select('*')
          .eq('status', 'active')
          .order('name', { ascending: true })

        if (error) throw error
        setCandidates((data as Candidate[]) || [])
      } catch (err) {
        setError('Candidates load nahi ho sake. Database check karo.')
        console.error('CandidateSelector error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCandidates()
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const externalId = e.target.value
    setSelectedId(externalId)
    const found = candidates.find(c => c.external_id === externalId)
    if (found) onSelect(found)
  }

  // Signal badge color
  function signalColor(level: string) {
    if (level === 'strong') return '🟢'
    if (level === 'medium') return '🟡'
    return '🔴'
  }

  if (error) {
    return (
      <div className="w-full bg-red-950 border border-red-800 rounded-lg px-3 py-2 text-sm text-red-400">
        ⚠️ {error}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <select
        value={selectedId}
        onChange={handleChange}
        disabled={disabled || loading}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
      >
        <option value="">
          {loading ? '⏳ Candidates load ho rahe hain...' : '👤 Candidate chunein...'}
        </option>
        {candidates.map(candidate => (
          <option key={candidate.external_id} value={candidate.external_id}>
            {candidate.name} · Day {candidate.current_day}/31 · {candidate.progress_percentage}%
          </option>
        ))}
      </select>

      {/* Live stats when selected */}
      {selectedId && !disabled && (() => {
        const c = candidates.find(x => x.external_id === selectedId)
        if (!c) return null
        return (
          <div className="text-xs text-slate-500 px-1 grid grid-cols-2 gap-x-3 gap-y-0.5">
            <span>{signalColor(c.signals.technical)} Technical: {c.signals.technical}</span>
            <span>{signalColor(c.signals.communication)} Comms: {c.signals.communication}</span>
            <span>{signalColor(c.signals.problemSolving)} Problem Solving: {c.signals.problemSolving}</span>
            <span>{signalColor(c.signals.consistency)} Consistency: {c.signals.consistency}</span>
          </div>
        )
      })()}
    </div>
  )
}