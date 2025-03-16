"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function FAQSection() {
  const faqs = [
    {
      question: "How accurate is the startup idea evaluation?",
      answer:
        "Our AI evaluation system is trained on data from thousands of Indian startups, market reports, and investment patterns. While no prediction is 100% accurate, our system provides a comprehensive analysis based on 20+ parameters specific to the Indian market, with an accuracy rate of approximately 85% when compared to expert evaluations.",
    },
    {
      question: "Is my startup idea secure on your platform?",
      answer:
        "Absolutely. We take data privacy very seriously. Your idea submissions are encrypted and only accessible to you. We do not share your ideas with third parties, and our team members sign strict NDAs. You can also enable additional privacy features from your account settings.",
    },
    {
      question: "How is this different from general AI tools like ChatGPT?",
      answer:
        "Unlike general AI tools, StartupSahayak is specifically trained on Indian startup ecosystem data, including regional market trends, state-specific regulations, funding patterns in India, and consumer behavior across different Indian demographics. Our system provides actionable insights tailored to the unique challenges and opportunities of building in India.",
    },
    {
      question: "Do you provide support for funding and investor connections?",
      answer:
        "Yes, for high-potential ideas, we provide guidance on funding strategies and can connect you with relevant investors from our network of 200+ Indian angel investors and VC firms. Premium members also get access to pitch deck reviews and investor matching services.",
    },
    {
      question: "Can I evaluate multiple ideas?",
      answer:
        "Yes! Free accounts can evaluate up to 3 startup ideas per month. Premium members get unlimited evaluations and can compare multiple ideas side by side to determine which has the highest potential in the Indian market.",
    },
    {
      question: "How does the roadmap generation work?",
      answer:
        "Based on your idea evaluation, our system generates a customized roadmap that includes market validation steps, regulatory requirements specific to your industry in India, recommended business model adaptations for the Indian market, and milestone planning aligned with typical Indian startup growth patterns.",
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Everything you need to know about validating your startup idea for the Indian market.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-6 rounded-lg flex justify-between items-center ${
                  openIndex === index
                    ? "bg-orange-50 border-orange-200 border"
                    : "bg-gray-50 border border-gray-100 hover:bg-gray-100"
                }`}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    openIndex === index ? "transform rotate-180 text-orange-600" : "text-gray-500"
                  }`}
                />
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 border border-t-0 border-gray-100 rounded-b-lg"
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

