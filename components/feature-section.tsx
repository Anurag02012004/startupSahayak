"use client"

import { motion } from "framer-motion"
import { BarChart3, Lightbulb, TrendingUp, Map, Users, Building2 } from "lucide-react"

export default function FeatureSection() {
  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-orange-600" />,
      title: "Idea Potential Analysis",
      description: "Our AI evaluates your startup idea across 20+ parameters specific to the Indian market conditions.",
    },
    {
      icon: <Map className="h-10 w-10 text-green-600" />,
      title: "Roadmap Generation",
      description: "Get a customized step-by-step plan to validate and launch your startup in the Indian ecosystem.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-blue-600" />,
      title: "Market Insights",
      description: "Access real-time data about market trends, competition, and growth opportunities in India.",
    },
    {
      icon: <Users className="h-10 w-10 text-purple-600" />,
      title: "Target Audience Analysis",
      description: "Understand your potential customers across different Indian demographics and regions.",
    },
    {
      icon: <Building2 className="h-10 w-10 text-red-600" />,
      title: "Regulatory Guidance",
      description: "Navigate India-specific regulations, compliance requirements, and startup schemes.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-yellow-600" />,
      title: "Idea Improvement",
      description: "Receive tailored suggestions to enhance your idea's viability in the Indian context.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            How StartupSahayak Helps You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our platform is designed specifically for the Indian startup ecosystem, providing you with all the tools you
            need to validate and refine your business idea.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

