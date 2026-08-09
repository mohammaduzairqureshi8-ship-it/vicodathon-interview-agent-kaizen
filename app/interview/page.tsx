'use client'

import { useState } from 'react'
import { CandidateSelector }       from '@/components/CandidateSelector'
import { ChatInterface, ChatMessage } from '@/components/ChatInterface'
import { FeedbackDisplay }          from '@/components/FeedbackDisplay'
import { Badge }                    from '@/components/ui/badge'
import type { Candidate, InterviewFeedback } from '@/types'

type Phase = 'setup' | 'active' | 'completed'

export default function InterviewPage() {
  const [phase,             setPhase]             = useState<Phase>('setup')
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [sessionId,         setSessionId]         = useState<string | null>(null)
  const [messages,          setMessages]          = useState<ChatMessage[]>([])
  const [feedback,          setFeedback]          = useState<InterviewFeedback | null>(null)
  const [isLoading,         setIsLoading]         = useState(false)
  const [userInput,         setUserInput]         = useState('')
  const [errorMsg,          setErrorMsg]          = useState<string | null>(null)

  // Central API caller
  async function callAPI(action: string, message?: string) {
    const res = await fetch('/api/interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        candidateId: selectedCandidate?.external_id,
        sessionId,
        message,
      }),
    })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
  }

  async function startInterview() {
    if (!selectedCandidate) return
    setIsLoading(true)
    setErrorMsg(null)
    setPhase('active')
    try {
      const data = await callAPI('reply')
      if (data.success) {
        setSessionId(data.sessionId)
        setMessages([{ role: 'assistant', content: data.message, timestamp: new Date() }])
      }
    } catch {
      setErrorMsg('Interview shuru nahi ho saka. API check karo.')
      setPhase('setup')
    } finally {
      setIsLoading(false)
    }
  }

  async function sendMessage() {
    if (!userInput.trim() || isLoading) return
    const text = userInput.trim()
    setUserInput('')
    setMessages(prev => [...prev, { role: 'user', content: text, timestamp: new Date() }])
    setIsLoading(true)
    try {
      const data = await callAPI('reply', text)
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message, timestamp: new Date() }])
      }
    } catch {
      setErrorMsg('Message send nahi hua. Dobara try karo.')
    } finally {
      setIsLoading(false)
    }
  }

  async function endInterview() {
    setIsLoading(true)
    setErrorMsg(null)
    try {
      await callAPI('done')
      const feedbackData = await callAPI('feedback')
      if (feedbackData.success) {
        setFeedback(feedbackData.feedback)
        setPhase('completed')
      }
    } catch {
      setErrorMsg('Feedback generate nahi hua. Dobara try karo.')
    } finally {
      setIsLoading(false)
    }
  }

  function resetAll() {
    setPhase('setup')
    setSelectedCandidate(null)
    setSessionId(null)
    setMessages([])
    setFeedback(null)
    setErrorMsg(null)
    setUserInput('')
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden">

      {/* ── Top Navbar ── */}
      <header className="shrink-0 border-b border-slate-800 px-5 py-3.5 flex items-center justify-between bg-slate-950 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-xs font-bold">AI</div>
          <div>
            <h1 className="text-sm font-semibold text-white leading-none">Interview Agent</h1>
            <p className="text-xs text-slate-500 leading-none mt-0.5">Powered by Groq + Supabase</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {phase === 'active' && (
            <Badge variant="live">● Live Interview</Badge>
          )}
          {phase === 'setup' && selectedCandidate && (
            <button
              onClick={startInterview}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              ▶ Interview Shuru Karo
            </button>
          )}
          {phase === 'active' && (
            <button
              onClick={endInterview}
              disabled={isLoading}
              className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              ■ Khatam Karo & Feedback Lo
            </button>
          )}
          {phase === 'completed' && (
            <button
              onClick={resetAll}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              🔄 Reset
            </button>
          )}
        </div>
      </header>

      {/* ── Error Banner ── */}
      {errorMsg && (
        <div className="shrink-0 bg-red-950 border-b border-red-900 px-5 py-2.5 text-sm text-red-400 flex justify-between items-center">
          ⚠️ {errorMsg}
          <button onClick={() => setErrorMsg(null)} className="text-red-600 hover:text-red-400 ml-4">✕</button>
        </div>
      )}

      {/* ── Main Body ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left Sidebar — Candidate Info */}
        <aside className="w-72 shrink-0 border-r border-slate-800 flex flex-col bg-slate-950 overflow-y-auto">
          <div className="p-4 space-y-4">

            {/* Candidate selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Candidate Chunein
              </label>
              <CandidateSelector
                onSelect={setSelectedCandidate}
                disabled={phase !== 'setup'}
              />
            </div>

            {/* Candidate detail card */}
            {selectedCandidate && (
              <div className="bg-slate-900 rounded-xl p-4 space-y-4 border border-slate-800">
                <div>
                  <h3 className="font-semibold text-white">{selectedCandidate.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedCandidate.email}</p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Progress</span>
                    <span className="font-medium text-blue-400">
                      Day {selectedCandidate.current_day}/31 · {selectedCandidate.progress_percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${selectedCandidate.progress_percentage}%` }}
                    />
                  </div>
                </div>

                {/* Signals grid */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Performance Signals</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {Object.entries(selectedCandidate.signals).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-1.5 text-xs">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${
                          value === 'strong' ? 'bg-emerald-400' :
                          value === 'medium' ? 'bg-yellow-400' :
                                              'bg-red-400'
                        }`} />
                        <span className="text-slate-400 capitalize truncate">{key}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Empty state */}
            {!selectedCandidate && (
              <div className="text-center py-8 text-slate-600 text-sm space-y-2">
                <div className="text-3xl">👤</div>
                <p>Upar se candidate select karo</p>
              </div>
            )}
          </div>
        </aside>

        {/* Right Main Panel */}
        <main className="flex-1 flex flex-col overflow-hidden">

          {/* Setup state */}
          {phase === 'setup' && (
            <div className="flex-1 flex items-center justify-center text-center px-8">
              <div className="space-y-4 max-w-sm">
                <div className="text-5xl">🎯</div>
                <h2 className="text-xl font-semibold text-slate-200">Interview Shuru Karne ke Liye</h2>
                <ol className="text-sm text-slate-500 text-left space-y-1.5 list-decimal list-inside">
                  <li>Baayen taraf se candidate choose karo</li>
                  <li>Upar "Interview Shuru Karo" button dabaao</li>
                  <li>AI pehla sawaal poochega — jawab do</li>
                  <li>Jab khatam hona ho — "Khatam Karo" dabaao</li>
                </ol>
              </div>
            </div>
          )}

          {/* Active interview */}
          {phase === 'active' && (
            <ChatInterface
              messages={messages}
              isLoading={isLoading}
              userInput={userInput}
              onInputChange={setUserInput}
              onSend={sendMessage}
            />
          )}

          {/* Feedback */}
          {phase === 'completed' && feedback && (
            <FeedbackDisplay
              feedback={feedback}
              candidate={selectedCandidate!}
              onReset={resetAll}
            />
          )}
        </main>
      </div>
    </div>
  )
}