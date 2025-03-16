import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 60 // Allow up to 60 seconds for response

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Create a system message to guide the AI's responses
  const systemMessage = `
    You are an expert startup advisor specializing in the Indian market. Your role is to help entrepreneurs
    evaluate and improve their startup ideas for the Indian ecosystem. 
    
    When responding to questions:
    1. Focus on India-specific insights, regulations, and market conditions
    2. Provide actionable advice tailored to the Indian startup ecosystem
    3. Reference relevant Indian startup success stories when applicable
    4. Consider regional differences within India (urban vs. rural, different states)
    5. Be aware of current funding trends in the Indian startup space
    6. Mention relevant government initiatives like Startup India, Digital India, etc. when appropriate
    
    Always maintain a helpful, encouraging tone while being realistic about challenges in the Indian market.
  `

  const result = streamText({
    model: openai("gpt-4o"),
    messages: [{ role: "system", content: systemMessage }, ...messages],
  })

  return result.toDataStreamResponse()
}

