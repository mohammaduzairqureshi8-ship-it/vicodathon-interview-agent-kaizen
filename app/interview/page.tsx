'use client'

import { useState }              from 'react'
import type { ComponentProps }   from 'react'
import { CandidateSelector }     from '@/components/CandidateSelector'
import { ChatInterface }         from '@/components/ChatInterface'
import { FeedbackDisplay }       from '@/components/FeedbackDisplay'

type Candidate = {
  name: string
  email: string
  progress_percentage: number
  current_day: number
  signals?: Record<string, 'strong' | 'medium' | 'weak'>
}

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

type InterviewFeedback = ComponentProps<typeof FeedbackDisplay>['feedback']

type InterviewApiResponse = {
  reply: string
  done?: boolean
  feedback?: InterviewFeedback
}

type Phase = 'setup' | 'active' | 'completed'

// Generate unique session ID
function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export default function InterviewPage() {
  const [phase,             setPhase]             = useState<Phase>('setup')
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [sessionId,         setSessionId]         = useState<string>('')
  const [messages,          setMessages]          = useState<ChatMessage[]>([])
  const [feedback,          setFeedback]          = useState<InterviewFeedback | null>(null)
  const [isLoading,         setIsLoading]         = useState(false)
  const [userInput,         setUserInput]         = useState('')
  const [errorMsg,          setErrorMsg]          = useState<string | null>(null)

  // ─── API call helper (technical-spec.md ke mutabiq) ───────────────
  async function callInterviewAPI(
    body: Record<string, unknown>
  ): Promise<InterviewApiResponse> {
    const res = await fetch('/api/interview', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || `API error: ${res.status}`)
    }

    return data as InterviewApiResponse
  }

  // ─── Start Interview ───────────────────────────────────────────────
  async function startInterview() {
    if (!selectedCandidate) return

    const newSessionId = generateSessionId()
    setSessionId(newSessionId)
    setIsLoading(true)
    setErrorMsg(null)
    setPhase('active')
    setMessages([])

    try {
      // technical-spec.md: POST { sessionId, candidate }
      const response = await callInterviewAPI({
        sessionId:  newSessionId,
        candidate:  selectedCandidate,
      })

      // Add AI's first message
      setMessages([{
        role:      'assistant',
        content:   response.reply,
        timestamp: new Date(),
      }])

      // Handle early completion (shouldn't happen but be safe)
      if ('done' in response && response.done && response.feedback) {
        setFeedback(response.feedback)
        setPhase('completed')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Server se response nahi aaya'
      setErrorMsg('❌ ' + msg)
      setPhase('setup')
    } finally {
      setIsLoading(false)
    }
  }

  // ─── Send User Message ────────────────────────────────────────────
  async function sendMessage() {
    const text = userInput.trim()
    if (!text || isLoading || !sessionId) return

    // Show user message immediately
    const userMsg: ChatMessage = {
      role:      'user',
      content:   text,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setUserInput('')
    setIsLoading(true)
    setErrorMsg(null)

    try {
      // technical-spec.md: POST { sessionId, message }
      const response = await callInterviewAPI({
        sessionId,
        message: text,
      })

      // Add AI's response
      setMessages(prev => [...prev, {
        role:      'assistant',
        content:   response.reply,
        timestamp: new Date(),
      }])

      // Check if interview is done
      if ('done' in response && response.done && response.feedback) {
        setFeedback(response.feedback)
        setPhase('completed')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Message send nahi hua'
      setErrorMsg('❌ ' + msg)
    } finally {
      setIsLoading(false)
    }
  }

  // ─── Reset everything ─────────────────────────────────────────────
  function resetAll() {
    setPhase('setup')
    setSelectedCandidate(null)
    setSessionId('')
    setMessages([])
    setFeedback(null)
    setErrorMsg(null)
    setUserInput('')
  }

  // ═════════════════════════════════════════════════════════════════
  // RENDER
  // ═════════════════════════════════════════════════════════════════
  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden">

      {/* ── TOP NAVBAR ── */}
      <header className="shrink-0 border-b border-slate-800 px-5 py-4 flex items-center justify-between bg-slate-950 z-10 shadow-sm">

        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow">
            AI
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">
              Interview Agent
            </h1>
            <p className="text-xs text-slate-400 leading-tight mt-0.5">
              Powered by Groq
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">

          {phase === 'active' && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-green-900/60 text-green-300 border border-green-800 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Live Interview
            </span>
          )}

          {phase === 'setup' && selectedCandidate && (
            <button
              onClick={startInterview}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white text-sm font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              ▶ Start Interview
            </button>
          )}

          {phase === 'completed' && (
            <button
              onClick={resetAll}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              🔄 New Interview
            </button>
          )}
        </div>
      </header>

      {/* ── ERROR BANNER ── */}
      {errorMsg && (
        <div className="shrink-0 bg-red-950/90 border-b border-red-900/50 px-5 py-3 flex items-center justify-between backdrop-blur-sm">
          <p className="text-sm text-red-300 font-medium">{errorMsg}</p>
          <button
            onClick={() => setErrorMsg(null)}
            className="text-red-400 hover:text-red-300 text-lg leading-none ml-4 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="w-72 shrink-0 border-r border-slate-800 flex flex-col bg-slate-950/50 backdrop-blur-sm overflow-y-auto">
          <div className="p-4 space-y-4">

            {/* Candidate Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                👤 Select Candidate
              </label>
              <CandidateSelector
                onSelect={(candidate) =>
                  setSelectedCandidate(candidate as unknown as Candidate)
                }
                disabled={phase !== 'setup'}
              />
            </div>

            {/* Candidate Detail Card */}
            {selectedCandidate && (
              <div className="bg-slate-900/80 backdrop-blur rounded-2xl p-4 space-y-4 border border-slate-800 shadow-md">

                {/* Name + Email */}
                <div className="space-y-1">
                  <h3 className="font-semibold text-white text-base">
                    {selectedCandidate.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedCandidate.email}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span className="font-medium">Curriculum Progress</span>
                    <span className="font-bold text-blue-400">
                      {selectedCandidate.progress_percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${selectedCandidate.progress_percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 text-right">
                    Day {selectedCandidate.current_day} / 31
                  </p>
                </div>

                {/* Performance Signals */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    📊 Performance Signals
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedCandidate.signals || {}).map(([key, level]) => (
                      <div
                        key={key}
                        className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-800/60 rounded-lg text-xs"
                      >
                        <span
                          className={[
                            'w-2.5 h-2.5 rounded-full shrink-0',
                            level === 'strong'
                              ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50'
                              : level === 'medium'
                              ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
                              : 'bg-red-400 shadow-lg shadow-red-400/50',
                          ].join(' ')}
                        />
                        <span className="text-slate-300 capitalize truncate">
                          {key}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!selectedCandidate && (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="text-4xl mb-3">👤</div>
                <p className="text-slate-500 text-sm font-medium">
                  Select a candidate to begin
                </p>
              </div>
            )}

          </div>
        </aside>

        {/* ── MAIN PANEL ── */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">

          {/* Setup Phase */}
          {phase === 'setup' && (
            <div className="flex-1 flex items-center justify-center px-8">
              <div className="space-y-6 max-w-sm text-center">
                <div className="text-6xl">🎯</div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">
                    Welcome to AI Interview Agent
                  </h2>
                  <p className="text-sm text-slate-400">
                    Prepare for technical interviews with AI-powered practice
                  </p>
                </div>
                <ol className="text-sm text-slate-400 text-left space-y-2.5 bg-slate-900/60 rounded-xl p-4 border border-slate-800">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 font-bold shrink-0">1.</span>
                    <span>Choose a candidate from the left sidebar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 font-bold shrink-0">2.</span>
                    <span>Click "Start Interview" button above</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 font-bold shrink-0">3.</span>
                    <span>Answer AI questions thoughtfully</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 font-bold shrink-0">4.</span>
                    <span>Receive detailed feedback and next steps</span>
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* Active Interview Phase */}
          {phase === 'active' && (
            <ChatInterface
              messages={messages}
              isLoading={isLoading}
              userInput={userInput}
              onInputChange={setUserInput}
              onSend={sendMessage}
            />
          )}

          {/* Completed Phase */}
          {phase === 'completed' && feedback && selectedCandidate && (
            <FeedbackDisplay
              feedback={feedback}
              candidate={selectedCandidate}
              onReset={resetAll}
            />
          )}

        </main>
      </div>
    </div>
  )
}