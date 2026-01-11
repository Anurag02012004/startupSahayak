"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useCompletion } from "ai/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Send, ArrowRight, Save, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function EvaluatePage() {
  const router = useRouter()
  const { toast } = useToast()

  const [step, setStep] = useState(1)
  
  const { complete, completion, isLoading, error } = useCompletion({
    api: "/api/evaluate",
    onError: (error) => {
      console.error("Evaluation error:", error)
      toast({
        title: "Error",
        description: "Failed to evaluate your idea. Please try again.",
        variant: "destructive",
      })
    }
  })

  // Sync completion to result for persistence if needed, or just use completion
  const result = completion;

  const [formData, setFormData] = useState({
    ideaTitle: "",
    ideaDescription: "",
    targetMarket: "",
    industry: "",
    businessModel: "",
    uniqueValue: "",
    competitorAnalysis: "",
    challenges: "",
  });
  

  const [errors, setErrors] = useState<Record<string, string>>({})
  // const [isLoading, setIsLoading] = useState(false) // Removed manual loading state
  // const [result, setResult] = useState<string | null>(null) // Removed manual result state

  // Removed authentication requirement - anyone can use the evaluation feature now

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.ideaTitle.trim()) newErrors.ideaTitle = "Idea title is required"
      if (!formData.ideaDescription.trim()) newErrors.ideaDescription = "Idea description is required"
      if (!formData.industry) newErrors.industry = "Industry is required"
    } else if (currentStep === 2) {
      if (!formData.targetMarket.trim()) newErrors.targetMarket = "Target market is required"
      if (!formData.businessModel.trim()) newErrors.businessModel = "Business model is required"
      if (!formData.uniqueValue.trim()) newErrors.uniqueValue = "Unique value proposition is required"
    } else if (currentStep === 3) {
      if (!formData.competitorAnalysis.trim()) newErrors.competitorAnalysis = "Competitor analysis is required"
      if (!formData.challenges.trim()) newErrors.challenges = "Challenges are required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1)
    } else {
      toast({
        title: "Please fill all required fields",
        description: "All fields marked with * are required.",
        variant: "destructive",
      })
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const submitEvaluation = async () => {
    if (!validateStep(step)) {
      toast({
        title: "Please fill all required fields",
        description: "All fields marked with * are required.",
        variant: "destructive",
      })
      return
    }

    try {
      // Prepare the prompt for the AI
      const messages = [
        { role: "user", content: `
        Please evaluate this startup idea for the Indian market:
        
        Idea Title: ${formData.ideaTitle}
        
        Idea Description: ${formData.ideaDescription}
        
        Target Market: ${formData.targetMarket}
        
        Industry: ${formData.industry}
        
        Business Model: ${formData.businessModel}
        
        Unique Value Proposition: ${formData.uniqueValue}
        
        Competitor Analysis: ${formData.competitorAnalysis}
        
        Challenges: ${formData.challenges}
        ` }
      ]
      
      // Since the API expects { messages: [] }, and useCompletion sends { prompt: string }
      // The API implementation I saw earlier expects { messages }.
      // If I use useCompletion, it sends { prompt }. 
      // I should update the API to handle 'prompt' OR update call to use 'useChat' logic but simplistic.
      // Actually, my API route uses streamText({ messages: ... }). 
      // If I use useCompletion, 'api/evaluate' receives { prompt: "..." }.
      // So I neeed to fix the API to accept 'prompt' OR change this to send messages.
      
      // Let's fix the API to be flexible or just send the prompt as a user message in the API.
      // But here, I will just call complete which sends the prompt string.
      
      setStep(4) // Move to results step immediately
      
      await complete(`
        Idea Title: ${formData.ideaTitle}
        Idea Description: ${formData.ideaDescription}
        Target Market: ${formData.targetMarket}
        Industry: ${formData.industry}
        Business Model: ${formData.businessModel}
        Unique Value Proposition: ${formData.uniqueValue}
        Competitor Analysis: ${formData.competitorAnalysis}
        Challenges: ${formData.challenges}
      `)

    } catch (error) {
      console.error("Error evaluating idea:", error)
      toast({
        title: "Error",
        description: "Failed to evaluate your idea. Please try again.",
        variant: "destructive",
      })
    }
  }

  const saveResult = () => {
    if (!result) return

    // Save to localStorage (no authentication required)
    const savedIdeas = JSON.parse(localStorage.getItem(`saved_ideas`) || "[]")
    savedIdeas.push({
      id: Date.now(),
      title: formData.ideaTitle,
      description: formData.ideaDescription,
      industry: formData.industry,
      evaluation: result,
      date: new Date().toISOString(),
      score: Number.parseInt(result.match(/OVERALL SCORE.*?(\d+)\/100/i)?.[1] || "0"),
    })
    localStorage.setItem(`saved_ideas`, JSON.stringify(savedIdeas))

    toast({
      title: "Idea saved",
      description: "Your evaluated idea has been saved locally.",
    })
  }

  const downloadResult = () => {
    if (!result) return

    const element = document.createElement("a")
    const file = new Blob([result], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${formData.ideaTitle.replace(/\s+/g, "_")}_evaluation.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Evaluate Your Startup Idea</h1>
            <p className="text-gray-600 mt-2">Get AI-powered insights tailored for the Indian market - No login required!</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      step >= i ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i}
                  </div>
                  <span className={`text-sm mt-2 ${step >= i ? "text-orange-600" : "text-gray-500"}`}>
                    {i === 1 ? "Basic Info" : i === 2 ? "Market Details" : i === 3 ? "Challenges" : "Results"}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
              <div
                className="absolute top-0 left-0 h-1 bg-orange-600 transition-all duration-500"
                style={{ width: `${(step - 1) * 33.33}%` }}
              ></div>
            </div>
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Tell us about your idea</h2>

                <div>
                  <Label htmlFor="ideaTitle">
                    Idea Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ideaTitle"
                    name="ideaTitle"
                    value={formData.ideaTitle}
                    onChange={handleChange}
                    placeholder="E.g., FarmConnect - Direct Farm to Consumer Platform"
                    className={`bg-white ${errors.ideaTitle ? "border-red-500" : ""}`}
                  />
                  {errors.ideaTitle && <p className="text-red-500 text-sm mt-1">{errors.ideaTitle}</p>}
                </div>

                <div>
                  <Label htmlFor="ideaDescription">
                    Describe your idea in detail <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="ideaDescription"
                    name="ideaDescription"
                    value={formData.ideaDescription}
                    onChange={handleChange}
                    placeholder="What problem does it solve? How does it work? What makes it unique?"
                    className={`min-h-[120px] bg-white ${errors.ideaDescription ? "border-red-500" : ""}`}
                  />
                  {errors.ideaDescription && <p className="text-red-500 text-sm mt-1">{errors.ideaDescription}</p>}
                </div>

                <div>
                  <Label htmlFor="industry">
                    Industry <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange("industry", value)} value={formData.industry}>
                    <SelectTrigger className={`bg-white ${errors.industry ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={nextStep}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Market & Business Model</h2>

                <div>
                  <Label htmlFor="targetMarket">
                    Target Market in India <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="targetMarket"
                    name="targetMarket"
                    value={formData.targetMarket}
                    onChange={handleChange}
                    placeholder="Describe your target customers in India (age, location, income level, etc.)"
                    className={`min-h-[100px] bg-white ${errors.targetMarket ? "border-red-500" : ""}`}
                  />
                  {errors.targetMarket && <p className="text-red-500 text-sm mt-1">{errors.targetMarket}</p>}
                </div>

                <div>
                  <Label htmlFor="businessModel">
                    Business Model <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="businessModel"
                    name="businessModel"
                    value={formData.businessModel}
                    onChange={handleChange}
                    placeholder="How will you make money? (subscription, freemium, marketplace, etc.)"
                    className={`min-h-[100px] bg-white ${errors.businessModel ? "border-red-500" : ""}`}
                  />
                  {errors.businessModel && <p className="text-red-500 text-sm mt-1">{errors.businessModel}</p>}
                </div>

                <div>
                  <Label htmlFor="uniqueValue">
                    Unique Value Proposition <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="uniqueValue"
                    name="uniqueValue"
                    value={formData.uniqueValue}
                    onChange={handleChange}
                    placeholder="What makes your idea unique in the Indian market?"
                    className={`min-h-[100px] bg-white ${errors.uniqueValue ? "border-red-500" : ""}`}
                  />
                  {errors.uniqueValue && <p className="text-red-500 text-sm mt-1">{errors.uniqueValue}</p>}
                </div>

                <div className="flex justify-between">
                  <Button onClick={prevStep} variant="outline">
                    Back
                  </Button>
                  <Button onClick={nextStep} className="bg-orange-600 hover:bg-orange-700">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Challenges & Competition</h2>

                <div>
                  <Label htmlFor="competitorAnalysis">
                    Competitors in India <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="competitorAnalysis"
                    name="competitorAnalysis"
                    value={formData.competitorAnalysis}
                    onChange={handleChange}
                    placeholder="Who are your main competitors in India? What are their strengths and weaknesses?"
                    className={`min-h-[120px] bg-white ${errors.competitorAnalysis ? "border-red-500" : ""}`}
                  />
                  {errors.competitorAnalysis && (
                    <p className="text-red-500 text-sm mt-1">{errors.competitorAnalysis}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="challenges">
                    Anticipated Challenges <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="challenges"
                    name="challenges"
                    value={formData.challenges}
                    onChange={handleChange}
                    placeholder="What challenges do you expect to face in the Indian market? (regulations, adoption, infrastructure, etc.)"
                    className={`min-h-[120px] bg-white ${errors.challenges ? "border-red-500" : ""}`}
                  />
                  {errors.challenges && <p className="text-red-500 text-sm mt-1">{errors.challenges}</p>}
                </div>

                <div className="flex justify-between">
                  <Button onClick={prevStep} variant="outline">
                    Back
                  </Button>
                  <Button
                    onClick={submitEvaluation}
                    className="bg-orange-600 hover:bg-orange-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Evaluating...
                      </>
                    ) : (
                      <>
                        Get Evaluation <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Your Idea Evaluation</h2>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-12 w-12 text-orange-600 animate-spin mb-4" />
                    <p className="text-gray-600">Our AI is analyzing your startup idea for the Indian market...</p>
                    <p className="text-gray-500 text-sm mt-2">This may take up to 30 seconds</p>
                  </div>
                ) : result ? (
                  <div className="space-y-6">
                    <div className="bg-orange-50 p-6 rounded-lg">
                      <div className="prose max-w-none">
                        {result.split("\n").map((line, i) => {
                          if (line.startsWith("# ")) {
                            return (
                              <h1 key={i} className="text-2xl font-bold">
                                {line.replace("# ", "")}
                              </h1>
                            )
                          } else if (line.startsWith("## ")) {
                            return (
                              <h2 key={i} className="text-xl font-semibold mt-4">
                                {line.replace("## ", "")}
                              </h2>
                            )
                          } else if (line.startsWith("### ")) {
                            return (
                              <h3 key={i} className="text-lg font-semibold mt-4">
                                {line.replace("### ", "")}
                              </h3>
                            )
                          } else if (line.startsWith("#### ")) {
                            return (
                              <h4 key={i} className="text-base font-semibold mt-3">
                                {line.replace("#### ", "")}
                              </h4>
                            )
                          } else if (line.startsWith("- ")) {
                            return (
                              <li key={i} className="ml-4">
                                {line.replace("- ", "")}
                              </li>
                            )
                          } else if (
                            line.startsWith("1. ") ||
                            line.startsWith("2. ") ||
                            line.startsWith("3. ") ||
                            line.startsWith("4. ")
                          ) {
                            return (
                              <li key={i} className="ml-4">
                                {line.replace(/^\d+\.\s/, "")}
                              </li>
                           && !result ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-12 w-12 text-orange-600 animate-spin mb-4" />
                    <p className="text-gray-600">Our AI is analyzing your startup idea for the Indian market...</p>
                  </div>
                ) : result || isLoading ? (
                  <div className="space-y-6">
                    <div className="bg-orange-50 p-6 rounded-lg">
                      <div className="prose max-w-none">
                        {result?.split("\n").map((line, i) => {
                          if (line.startsWith("# ")) {
                            return (
                              <h1 key={i} className="text-2xl font-bold">
                                {line.replace("# ", "")}
                              </h1>
                            )
                          } else if (line.startsWith("## ")) {
                            return (
                              <h2 key={i} className="text-xl font-semibold mt-4">
                                {line.replace("## ", "")}
                              </h2>
                            )
                          } else if (line.startsWith("### ")) {
                            return (
                              <h3 key={i} className="text-lg font-semibold mt-4">
                                {line.replace("### ", "")}
                              </h3>
                            )
                          } else if (line.startsWith("#### ")) {
                            return (
                              <h4 key={i} className="text-base font-semibold mt-3">
                                {line.replace("#### ", "")}
                              </h4>
                            )
                          } else if (line.startsWith("- ")) {
                            return (
                              <li key={i} className="ml-4">
                                {line.replace("- ", "")}
                              </li>
                            )
                          } else if (
                            line.startsWith("1. ") ||
                            line.startsWith("2. ") ||
                            line.startsWith("3. ") ||
                            line.startsWith("4. ")
                          ) {
                            return (
                              <li key={i} className="ml-4">
                                {line.replace(/^\d+\.\s/, "")}
                              </li>
                            )
                          } else if (line.startsWith("**") && line.endsWith("**")) {
                            return (
                              <p key={i} className="font-bold mt-2">
                                {line.replace(/\*\*/g, "")}
                              </p