import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 60 // Allow up to 60 seconds for response

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Get the latest user message
  const userMessage = messages[messages.length - 1].content

  // Create a system message to guide the AI's evaluation
  const systemMessage = `
    You are an expert startup advisor specializing in the Indian market. Your task is to evaluate startup ideas
    specifically for the Indian ecosystem. Consider the following factors in your evaluation:
    
    1. Market size and growth potential in India
    2. Competitive landscape in the Indian market
    3. Regulatory environment and challenges specific to India
    4. Cultural and consumer behavior factors in India
    5. Infrastructure and technological readiness in India
    6. Funding environment for this type of startup in India
    
    Provide a comprehensive evaluation with:
    - A potential score from 0-100
    - Key strengths for the Indian market
    - Challenges specific to India
    - For high potential ideas (>70), provide a detailed step-by-step roadmap including:
      * Market validation steps
      * MVP development
      * Regulatory compliance specific to India
      * Go-to-market strategy for Indian consumers
      * Funding options in the Indian ecosystem
    - For medium/low potential ideas (<70), provide specific suggestions to improve the idea for the Indian market
    
    Format your response clearly with headings and bullet points.
  `

  const result = streamText({
    model: openai("gpt-4o"),
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  })

  return result.toDataStreamResponse()
}

