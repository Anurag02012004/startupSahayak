"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb, TrendingUp, Users } from "lucide-react"

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Validate Your Startup Idea for the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-green-600">
                  Indian Market
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-700 mb-8"
            >
              Get AI-powered insights on your startup idea's potential, step-by-step guidance, and tailored
              recommendations for the Indian ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Link href="/evaluate">
                  Evaluate Your Idea <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <Link href="/login">Sign In</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6"
            >
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-orange-600" />
                <span className="text-gray-700">10,000+ Ideas Evaluated</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">500+ Success Stories</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Indian Market Focus</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-gray-100">
                <div className="bg-gradient-to-r from-orange-600 to-green-600 h-3"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Startup Idea Evaluation</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 font-medium">Describe your startup idea:</p>
                      <p className="text-gray-500 mt-2">
                        An app that connects local farmers directly with urban consumers in India, eliminating middlemen
                        and ensuring fair prices.
                      </p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-orange-700 font-medium">Market Potential:</p>
                      <div className="mt-2 bg-gray-200 h-4 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-orange-500 to-green-500"
                          initial={{ width: "0%" }}
                          animate={{ width: isHovered ? "85%" : "75%" }}
                          transition={{ duration: 0.8 }}
                        ></motion.div>
                      </div>
                      <p className="text-right text-sm mt-1 text-gray-600">85% - High Potential</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-700 font-medium">Next Steps:</p>
                      <ul className="mt-2 space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="bg-green-100 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                            1
                          </span>
                          <span>Conduct market research with farmers in 3-5 agricultural states</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-green-100 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                            2
                          </span>
                          <span>Develop MVP focusing on supply chain logistics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-green-100 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                            3
                          </span>
                          <span>Apply for Startup India registration and DPIIT recognition</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-20 w-20 bg-orange-100 rounded-full opacity-70 z-[-1]"></div>
              <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-green-100 rounded-full opacity-70 z-[-1]"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

