"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Check, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
  }

  const plans = [
    {
      name: "Free",
      description: "For individuals just starting their entrepreneurial journey",
      price: {
        monthly: "₹0",
        yearly: "₹0",
      },
      features: [
        "3 startup idea evaluations per month",
        "Basic potential score analysis",
        "Limited access to resources",
        "Community forum access",
        "Email support",
      ],
      cta: "Get Started",
      popular: false,
      color: "bg-gray-100",
    },
    {
      name: "Pro",
      description: "For serious entrepreneurs building their startup",
      price: {
        monthly: "₹999",
        yearly: "₹9,990",
      },
      features: [
        "10 startup idea evaluations per month",
        "Detailed potential score analysis",
        "Full access to resources library",
        "AI advisor chat (100 messages/month)",
        "Customized roadmap generation",
        "Competitor analysis",
        "Priority email support",
      ],
      cta: "Upgrade to Pro",
      popular: true,
      color: "bg-orange-600",
    },
    {
      name: "Enterprise",
      description: "For startup accelerators and incubators",
      price: {
        monthly: "₹4,999",
        yearly: "₹49,990",
      },
      features: [
        "Unlimited startup idea evaluations",
        "Advanced market analysis for India",
        "Full access to resources library",
        "Unlimited AI advisor chat",
        "Custom report generation",
        "Funding readiness assessment",
        "Dedicated account manager",
        "API access",
      ],
      cta: "Contact Sales",
      popular: false,
      color: "bg-gray-800",
    },
  ]

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle. If you downgrade, the changes will take effect at the start of your next billing cycle.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied with our service within the first week, contact our support team for a full refund.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, UPI payments, and net banking for Indian customers. For Enterprise plans, we also offer invoice-based payments.",
    },
    {
      question: "Is there a discount for startups?",
      answer:
        "Yes! If you're a registered startup under the Startup India initiative, you can get 20% off any plan. Contact our support team with your DPIIT recognition number to avail this discount.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-4"
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Choose the plan that's right for your startup journey in the Indian ecosystem
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center mt-8"
            >
              <span className={`mr-2 ${billingCycle === "monthly" ? "font-semibold" : "text-gray-500"}`}>Monthly</span>
              <Switch checked={billingCycle === "yearly"} onCheckedChange={toggleBillingCycle} className="mx-2" />
              <span className={`ml-2 ${billingCycle === "yearly" ? "font-semibold" : "text-gray-500"}`}>Yearly</span>
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Save 20%</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className={`rounded-xl overflow-hidden ${
                  plan.popular ? "ring-2 ring-orange-600 shadow-xl" : "border border-gray-200 shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="bg-orange-600 text-white text-center py-2 font-medium">Most Popular</div>
                )}
                <div className="bg-white p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price[billingCycle]}</span>
                    <span className="text-gray-600">/{billingCycle === "monthly" ? "month" : "year"}</span>
                  </div>
                  <Button
                    asChild
                    className={`w-full ${
                      plan.popular
                        ? "bg-orange-600 hover:bg-orange-700"
                        : plan.name === "Enterprise"
                          ? "bg-gray-800 hover:bg-gray-900"
                          : ""
                    }`}
                  >
                    <Link href={plan.name === "Free" ? "/signup" : "/contact"}>{plan.cta}</Link>
                  </Button>

                  <div className="mt-8 space-y-4">
                    <p className="font-medium">Features include:</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className={`${plan.color} rounded-full p-1 mr-3 mt-0.5 flex-shrink-0`}>
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-8 mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Compare Plans</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4">Feature</th>
                    <th className="text-center py-4 px-4">Free</th>
                    <th className="text-center py-4 px-4 bg-orange-50">Pro</th>
                    <th className="text-center py-4 px-4">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 flex items-center">
                      Idea Evaluations
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-gray-400 ml-1" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">Number of startup ideas you can evaluate per month</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="text-center py-4 px-4">3/month</td>
                    <td className="text-center py-4 px-4 bg-orange-50">10/month</td>
                    <td className="text-center py-4 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 flex items-center">
                      AI Advisor Chat
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-gray-400 ml-1" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">Chat with our AI advisor about your startup idea</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4 bg-orange-50">100 messages/month</td>
                    <td className="text-center py-4 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4">Resource Library</td>
                    <td className="text-center py-4 px-4">Limited</td>
                    <td className="text-center py-4 px-4 bg-orange-50">Full Access</td>
                    <td className="text-center py-4 px-4">Full Access</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4">Roadmap Generation</td>
                    <td className="text-center py-4 px-4">Basic</td>
                    <td className="text-center py-4 px-4 bg-orange-50">Customized</td>
                    <td className="text-center py-4 px-4">Advanced</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4">Competitor Analysis</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4 bg-orange-50">✓</td>
                    <td className="text-center py-4 px-4">✓</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4">Support</td>
                    <td className="text-center py-4 px-4">Email</td>
                    <td className="text-center py-4 px-4 bg-orange-50">Priority Email</td>
                    <td className="text-center py-4 px-4">Dedicated Manager</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">API Access</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4 bg-orange-50">—</td>
                    <td className="text-center py-4 px-4">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-orange-600 text-white rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Our team is here to help you find the perfect plan for your startup journey in India. Contact us for
              custom pricing or special requirements.
            </p>
            <Button asChild variant="outline" className="bg-white text-orange-600 hover:bg-gray-100 border-white">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

