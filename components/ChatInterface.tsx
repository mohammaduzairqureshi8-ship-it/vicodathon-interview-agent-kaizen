'use client'

import { useEffect, useRef } from 'react'
import { Send } from 'lucide-react'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  messages:      ChatMessage[]
  isLoading:     boolean
  userInput:     string
  onInputChange: (value: string) => void
  onSend:        () => void
}

export function ChatInterface({
  messages,
  isLoading,
  userInput,
  onInputChange,
  onSend,
}: ChatInterfaceProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Enter = send, Shift+Enter = new line
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  function formatTime(date: Date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col h-full">

      {/* ── Messages scroll area ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-slate-600 text-sm">
            Interview shuru hone ka wait kar rahe hain...
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={[
                'max-w-[78%] rounded-2xl px-4 py-3 text-sm shadow-lg',
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-slate-800 text-slate-100 rounded-bl-sm border border-slate-700',
              ].join(' ')}
            >
              {/* AI badge on assistant messages */}
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                    AI
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Interview Agent</span>
                </div>
              )}

              {/* Message text */}
              <p className="leading-relaxed whitespace-pre-wrap wrap-break-word">
                {msg.content}
              </p>

              {/* Timestamp */}
              <p className={`text-[10px] mt-1.5 text-right ${msg.role === 'user' ? 'text-blue-200' : 'text-slate-500'}`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {/* Loading indicator (three bouncing dots) */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-sm px-4 py-3.5 flex items-center gap-1">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.32s]" />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.16s]" />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
            </div>
          </div>
        )}

        {/* Invisible scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <div className="border-t border-slate-800 bg-slate-950 p-4">
        <div className="flex items-end gap-3 max-w-4xl mx-auto">
          <textarea
            value={userInput}
            onChange={e => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Apna jawab yahan likhein... (Enter = send, Shift+Enter = naya line)"
            rows={2}
            disabled={isLoading}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white
                       placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={onSend}
            disabled={isLoading || !userInput.trim()}
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            title="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-xs text-slate-700 mt-2">
          Enter bhaijo · Shift+Enter naya line · AI 2-3 seconds mein jawab deta hai
        </p>
      </div>
    </div>
  )
}