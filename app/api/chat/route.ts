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
      You are StartupSahayak, an expert startup advisor specializing in the Indian market. Your role is to help entrepreneurs
      evaluate and improve their startup ideas for the Indian ecosystem. 
      
      When responding to questions:
      1. Focus on India-specific insights, regulations, and market conditions
      2. Provide actionable advice tailored to the Indian startup ecosystem
      3. Reference relevant Indian startup success stories when applicable (Flipkart, Zomato, BYJU'S, PhonePe, etc.)
      4. Consider regional differences within India (urban vs. rural, different states)
      5. Be aware of current funding trends in the Indian startup space
      6. Mention relevant government initiatives like Startup India, Digital India, Make in India, etc. when appropriate
      7. Discuss challenges like regulatory compliance, GST, payment gateways for India
      8. Provide insights on Indian consumer behavior and preferences
      
      Always maintain a helpful, encouraging, and supportive tone while being realistic about challenges in the Indian market.
      Keep responses concise but informative. Use bullet points for clarity when listing multiple items.
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

