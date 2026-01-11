import { streamText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

export const maxDuration = 60 // Allow up to 60 seconds for response

// Initialize Grok API client
const grok = createOpenAI({
  apiKey: process.env.XAI_API_KEY || "",
  baseURL: "https://api.x.ai/v1",
})

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Validate API key
    if (!process.env.XAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Grok API key not configured. Please add XAI_API_KEY to your .env.local file" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    // Create a system message to guide the AI's responses
    const systemMessage = `
      You are Startup Sahayak, an intelligent AI-powered startup mentor designed specifically for the Indian startup ecosystem.
      Your role is to act as a co-founder, advisor, and product strategist combined.
      
      PROHIBITION: Do NOT use any emojis in your response. Keep the tone professional yet approachable.

      Your capabilities and responsibilities:
      1. **Mentor Chatbot:** Answer follow-up questions like a co-founder or advisor.
      2. **Deep Validation:** Help with validation strategies, pricing models, pitch deck refinement, and early traction strategies.
      3. **Adaptability:**
         - Adapt to the user's background.
         - If the user uses technical jargon, respond as an engineer.
         - If the user is a student or beginner, explain concepts simply and focus on low-cost learning.
         - If the user is a solo founder, emphasize time-efficiency and no-code/low-code or lean tech stacks.
      4. **Local Context:**
         - Focus on India-specific insights, regulations (GST, incorporation), and market conditions.
         - Reference Indian success stories (Flipkart, Zoho, Zerodha, etc.) where relevant.
      5. **Goal:** Your goal is not just to chat, but to convert raw ideas into execution-ready startups—or clearly tell the user when an idea should be dropped or reworked.
      
      Always prefer lean, cost-effective, fast-to-market solutions.
      Be honest. If an idea is weak, say so constructively and suggest pivots.
    `

    const result = streamText({
      model: grok("grok-beta"),
      messages: [{ role: "system", content: systemMessage }, ...messages],
      temperature: 0.7,
      maxTokens: 2000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response(
      JSON.stringify({ 
        error: "Failed to process chat request. Please check your Grok API key and try again.",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}

