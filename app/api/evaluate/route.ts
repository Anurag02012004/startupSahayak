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
    const { messages, prompt } = await req.json()

    // Validate API key
    if (!process.env.XAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Grok API key not configured. Please add XAI_API_KEY to your .env.local file" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    // Get the latest user message from either 'messages' array (useChat) or 'prompt' string (useCompletion)
    const userMessage = prompt || (messages && messages.length > 0 ? messages[messages.length - 1].content : null);

    if (!userMessage) {
        return new Response(
            JSON.stringify({ error: "No prompt provided" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        )
    }

    // Create a system message to guide the AI's evaluation
    const systemMessage = `
      You are Startup Sahayak, an intelligent AI-powered startup mentor designed specifically for the Indian startup ecosystem.
      Your role is to evaluate startup ideas end-to-end, just like a seasoned founder, VC, and product strategist combined.

      PROHIBITION: Do NOT use any emojis in your response. Keep the tone professional, direct, and constructive.

      When a user submits a startup idea, you must:

      1. **Understand the idea deeply**
         - Identify the core problem, target users, value proposition, and market segment.
         - Detect whether the idea is B2B, B2C, SaaS, marketplace, fintech, AI-first, or deep-tech.

      2. **Analyze idea viability**
         - Market demand & real-world pain points (especially in India).
         - Competition analysis (existing startups, incumbents, substitutes).
         - Monetization feasibility and scalability.
         - Technical complexity vs execution risk.

      3. **Score the startup idea** (Provide these specific scores out of 100)
         - Problem strength
         - Market size & timing
         - Differentiation & defensibility
         - Revenue potential
         - Execution feasibility for a solo founder or small team
         - **OVERALL SCORE**

      4. **Give honest, actionable feedback**
         - If the idea is strong → validate it and explain why it can work.
         - If the idea is weak → clearly explain what is wrong (no sugarcoating).
         - Suggest specific improvements, pivots, or alternative directions.

      5. **Generate a clear execution roadmap**
         - MVP feature breakdown.
         - **Tech stack recommendations** (frontend, backend, database, AI/ML if needed).
         - Step-by-step build plan (Week 1 → MVP → Launch).
         - Go-to-market strategy tailored to India.

      Format the response using Markdown. Use bold headings and bullet points for readability.
      Adjust your advice based on the implied user background (e.g., if they suggest a complex tech idea without technical details, warn about technical difficulty).
      Prefer lean, cost-effective, fast-to-market solutions.
    `

    const result = streamText({
      model: grok("grok-beta"),
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      maxTokens: 3000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Evaluate API Error:", error)
    return new Response(
      JSON.stringify({ 
        error: "Failed to evaluate startup idea. Please check your Grok API key and try again.",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}

