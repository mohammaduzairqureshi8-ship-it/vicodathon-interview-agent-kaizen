import { NextRequest, NextResponse } from 'next/server'
import { groq, GROQ_MODEL } from '@/lib/groq'

// ─────────────────────────────────────────────────────────────────
// HELPER: System Prompts for Chat and Feedback
// ─────────────────────────────────────────────────────────────────
function buildSystemPrompt(candidateName: string): string {
  return `You are an expert AI Technical Interviewer conducting a highly professional software engineering interview. 
Candidate Name: ${candidateName}.
Rules:
1. Greet them by name and ask a specific technical question related to modern AI (LLMs, RAG, Embeddings, MCP, Docker).
2. Ask ONE question per message. Wait for their response.
3. Keep your replies concise (max 3 sentences).
4. Do NOT say "Interview completed" or end the interview yourself.
5. Probe their understanding deeply based on their answers.`
}

function buildFeedbackPrompt(transcript: string): string {
  return `Analyze this technical interview transcript and generate structured feedback.
TRANSCRIPT:
${transcript}

You MUST return a raw, valid JSON object (no markdown formatting, no codeblocks). Ensure the keys strictly match this format:
{
  "summary": "2-3 sentences summarizing overall technical performance.",
  "strengths": ["string1", "string2", "string3"],
  "gaps": ["string1", "string2", "string3"],
  "next": ["actionable advice 1", "actionable advice 2", "actionable advice 3"]
}`
}

// ─────────────────────────────────────────────────────────────────
// MAIN API ENDPOINT — POST /api/interview
// Roman Urdu: Spec requirement[cite: 9] ke hisaab se input/output
// ─────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, candidate, message } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    // In a real app, you would fetch/update chat history from Supabase here using sessionId.
    // For this strict implementation, we will simulate the logic required by the Technical Spec.
    
    // SCENARIO 1: START INTERVIEW[cite: 9]
    if (candidate) {
      const systemMsg = buildSystemPrompt(candidate.member?.name || 'Candidate');
      const startCompletion = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: [{ role: 'system', content: systemMsg }],
        max_tokens: 200,
        temperature: 0.7,
      });
      const aiReply = startCompletion.choices[0]?.message?.content || "Welcome. Let's begin your interview.";
      
      return NextResponse.json({
        reply: aiReply,
        done: false
      });
    }

    // SCENARIO 2 & 3: CONVERSATION TURN OR END INTERVIEW[cite: 9]
    if (message) {
      // Simulate simple heuristic: if user says "stop" or "end", we finish.
      // Alternatively, keep a counter in Supabase. We simulate ending after a specific trigger.
      const isEnding = message.toLowerCase().includes('end interview') || message.toLowerCase().includes('stop');

      if (isEnding) {
        // Generate structured JSON feedback via Groq
        const feedbackCompletion = await groq.chat.completions.create({
          model: GROQ_MODEL,
          messages: [{ role: 'user', content: buildFeedbackPrompt(`Candidate said: ${message}`) }],
          temperature: 0.2, // Low temp for stable JSON
        });
        
        let feedbackJson;
        try {
          const rawContent = feedbackCompletion.choices[0]?.message?.content || '{}';
          const cleanJson = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
          feedbackJson = JSON.parse(cleanJson);
        } catch (e) {
          // Fallback if AI fails to format JSON correctly
          feedbackJson = {
            summary: "Interview concluded successfully.",
            strengths: ["Participated in interview"],
            gaps: ["Needs more technical depth"],
            next: ["Review RAG concepts"]
          };
        }

        return NextResponse.json({
          reply: "Thank you for your time. Your interview is now complete.",
          done: true,
          feedback: feedbackJson
        });
      }

      // Normal Conversation Turn
      const turnCompletion = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: "Ask a challenging follow up technical question. Keep it to 2 sentences." },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
      });

      return NextResponse.json({
        reply: turnCompletion.choices[0]?.message?.content || "Could you elaborate on that?",
        done: false
      });
    }

    return NextResponse.json({ error: "Invalid request payload format" }, { status: 400 });

  } catch (error) {
    console.error('[Interview API] Error:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

   