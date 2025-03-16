"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Lightbulb, Send, User } from "lucide-react"
import { motion } from "framer-motion"
import DashboardNav from "@/components/dashboard-nav"

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything on the server
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNav />

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Startup Advisor Chat</h1>
            <p className="text-gray-600">
              Ask questions about your startup idea and get personalized advice for the Indian market
            </p>
          </div>

          <div className="flex-1 bg-white rounded-xl shadow-md flex flex-col overflow-hidden border border-gray-100">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="bg-orange-100 p-4 rounded-full mb-4">
                    <Lightbulb className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">StartupSahayak AI Advisor</h3>
                  <p className="text-gray-600 max-w-md">
                    Ask me anything about starting up in India! I can help with market insights, regulatory guidance,
                    funding options, and more.
                  </p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-lg">
                    <SuggestedQuestion>What are the key regulations for fintech startups in India?</SuggestedQuestion>
                    <SuggestedQuestion>How do I apply for Startup India recognition?</SuggestedQuestion>
                    <SuggestedQuestion>What funding options exist for early-stage startups in India?</SuggestedQuestion>
                    <SuggestedQuestion>How can I validate my product in tier 2 and 3 cities?</SuggestedQuestion>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start gap-3 max-w-[80%] ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className={message.role === "user" ? "bg-green-100" : "bg-orange-100"}>
                        {message.role === "user" ? (
                          <User className="h-5 w-5 text-green-600" />
                        ) : (
                          <Lightbulb className="h-5 w-5 text-orange-600" />
                        )}
                      </Avatar>
                      <div
                        className={`rounded-lg p-4 ${
                          message.role === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div className="prose max-w-none">
                          {message.content.split("\n").map((line, i) => (
                            <p key={i} className={message.role === "user" ? "text-white" : ""}>
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about starting up in India..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SuggestedQuestion({ children }: { children: React.ReactNode }) {
  const { input, handleInputChange, handleSubmit } = useChat()

  const handleClick = () => {
    // Set the input value to the suggested question
    const event = {
      target: { value: children as string },
    } as React.ChangeEvent<HTMLInputElement>

    handleInputChange(event)

    // Submit the form after a short delay to ensure the input is updated
    setTimeout(() => {
      handleSubmit(new Event("submit") as any)
    }, 100)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-left p-3 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
    >
      {children}
    </button>
  )
}

