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
      7. Localization needs (language, payment methods, distribution)
      8. Unit economics and profitability in Indian context
      
      Provide a comprehensive evaluation with:
      
      **STARTUP POTENTIAL SCORE: X/100**
      
      **Key Strengths for the Indian Market:**
      - [List 3-5 specific strengths]
      
      **Challenges Specific to India:**
      - [List 3-5 key challenges]
      
      **Competitive Analysis:**
      - [Identify existing players and differentiation opportunities]
      
      **For high potential ideas (>70)**, provide a detailed step-by-step roadmap:
      
      **Phase 1: Market Validation (Month 1-2)**
      - Specific steps for Indian market validation
      - Target customer segments to interview
      - Key metrics to track
      
      **Phase 2: MVP Development (Month 3-4)**
      - Core features for Indian users
      - Technology stack recommendations
      - Budget estimates for Indian market
      
      **Phase 3: Regulatory Compliance**
      - Required registrations and licenses in India
      - Data privacy and compliance (IT Act, Data Protection)
      - Tax implications (GST, Income Tax)
      
      **Phase 4: Go-to-Market Strategy**
      - Distribution channels for Indian market
      - Marketing strategies (digital, offline)
      - Pricing strategy for Indian consumers
      
      **Phase 5: Funding Strategy**
      - Bootstrap vs. funding decision
      - Indian funding options (angel investors, VCs, government schemes)
      - Startup India benefits and how to apply
      
      **For medium/low potential ideas (<70)**, provide:
      - Specific pivot suggestions tailored to Indian market
      - Areas needing improvement before market entry
      - Alternative approaches or markets within India
      
      Format your response clearly with markdown headings, bullet points, and bold text for emphasis.
      Be honest but constructive in your evaluation.
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

