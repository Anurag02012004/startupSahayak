"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Founder, EduTech Startup",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "StartupSahayak helped me refine my EdTech idea for tier 2 and 3 cities in India. The market insights were spot on, and the regulatory guidance saved me months of research.",
      stars: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Co-founder, FinTech Solution",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "When we were stuck between multiple ideas, this platform helped us identify which one had the most potential in the Indian market. The step-by-step roadmap was incredibly valuable.",
      stars: 5,
    },
    {
      name: "Ananya Patel",
      role: "CEO, Health & Wellness App",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "The AI evaluation pointed out critical gaps in our business model that we hadn't considered. After implementing the suggestions, we secured our first round of funding!",
      stars: 4,
    },
    {
      name: "Vikram Singh",
      role: "Founder, Agritech Startup",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "As someone building for rural India, I needed specific insights. StartupSahayak provided exactly that - from farmer adoption patterns to distribution challenges in villages.",
      stars: 5,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section className="py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Success Stories from Indian Entrepreneurs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Join thousands of founders who have validated their ideas and built successful startups across India.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex-shrink-0">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="h-20 w-20 rounded-full object-cover border-4 border-orange-100"
                />
              </div>
              <div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonials[currentIndex].stars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-4">"{testimonials[currentIndex].content}"</p>
                <div>
                  <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full h-10 w-10 border-gray-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full ${index === currentIndex ? "bg-orange-600" : "bg-gray-300"}`}
              />
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full h-10 w-10 border-gray-300"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

