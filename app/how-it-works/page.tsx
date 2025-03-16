"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BarChart3, Brain, FileText, Lightbulb, Map, MessageSquare, Upload } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Upload className="h-12 w-12 text-orange-600" />,
      title: "Submit Your Idea",
      description:
        "Fill out our comprehensive form with details about your startup idea, target market, and business model.",
    },
    {
      icon: <Brain className="h-12 w-12 text-green-600" />,
      title: "AI Analysis",
      description:
        "Our AI analyzes your idea across 20+ parameters specific to the Indian market, including regulations, consumer behavior, and funding landscape.",
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-blue-600" />,
      title: "Receive Potential Score",
      description:
        "Get a detailed potential score (0-100) that indicates how viable your idea is for the Indian market.",
    },
    {
      icon: <Map className="h-12 w-12 text-purple-600" />,
      title: "Custom Roadmap",
      description:
        "For high-potential ideas, receive a step-by-step roadmap tailored to the Indian startup ecosystem, including regulatory guidance and funding options.",
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-yellow-600" />,
      title: "Improvement Suggestions",
      description:
        "For ideas with lower potential, get specific suggestions to improve your concept for the Indian market context.",
    },
    {
      icon: <MessageSquare className="h-12 w-12 text-red-600" />,
      title: "Expert Insights",
      description:
        "Access AI-generated insights based on data from thousands of Indian startups, market reports, and investment patterns.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4"
          >
            How StartupSahayak Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Our AI-powered platform helps you validate and refine your startup idea specifically for the Indian market
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                <div className="md:w-1/2 flex justify-center">
                  <div className="bg-white p-6 rounded-xl shadow-lg relative">
                    {/* Circle connector for desktop */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-orange-600 hidden md:block
                      ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}"
                    ></div>
                    <div className="flex flex-col items-center text-center p-4">
                      <div className="mb-4 p-3 bg-gray-50 rounded-full">{step.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-6"
          >
            Ready to Validate Your Startup Idea?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of Indian entrepreneurs who have transformed their ideas into successful businesses.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link href="/evaluate">
                Evaluate Your Idea <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <Link href="/signup">Create Free Account</Link>
            </Button>
          </motion.div>
        </div>

        <div className="mt-20 bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Our AI Technology</h3>
              <p className="text-gray-600 mb-4">
                StartupSahayak uses advanced AI models trained on data from thousands of Indian startups, market
                reports, investment patterns, and regulatory frameworks.
              </p>
              <p className="text-gray-600 mb-4">
                Our system analyzes your idea across multiple dimensions specific to the Indian market, including:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-orange-100 text-orange-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                    ✓
                  </span>
                  <span>Regional market dynamics across different Indian states</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-orange-100 text-orange-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                    ✓
                  </span>
                  <span>Consumer behavior patterns specific to Indian demographics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-orange-100 text-orange-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                    ✓
                  </span>
                  <span>Regulatory environment and compliance requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-orange-100 text-orange-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                    ✓
                  </span>
                  <span>Infrastructure and technological readiness factors</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <FileText className="h-12 w-12 text-orange-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Sample Evaluation Report</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Idea Potential Score:</span>
                    <span className="ml-2 text-green-600 font-semibold">82/100 (High Potential)</span>
                  </div>
                  <div>
                    <span className="font-medium">Market Size in India:</span>
                    <span className="ml-2">₹12,500 Cr by 2025 (CAGR 24%)</span>
                  </div>
                  <div>
                    <span className="font-medium">Key Strength:</span>
                    <span className="ml-2">Addresses critical pain point for tier 2/3 cities</span>
                  </div>
                  <div>
                    <span className="font-medium">Key Challenge:</span>
                    <span className="ml-2">Last-mile logistics infrastructure</span>
                  </div>
                  <div>
                    <span className="font-medium">Regulatory Consideration:</span>
                    <span className="ml-2">FSSAI certification required</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 mt-2">
                    <span className="font-medium">Next Steps:</span>
                    <ul className="mt-1 space-y-1 pl-5 list-disc">
                      <li>Conduct market validation in 3 target states</li>
                      <li>Develop MVP with focus on mobile-first experience</li>
                      <li>Apply for Startup India recognition</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

