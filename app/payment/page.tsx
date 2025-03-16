"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { Check, CreditCard, Lock } from "lucide-react"

export default function PaymentPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    couponCode: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  // Get plan details from URL query params
  useState(() => {
    const params = new URLSearchParams(window.location.search)
    const plan = params.get("plan")
    if (plan) {
      setSelectedPlan(plan)
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19)

      setPaymentDetails((prev) => ({
        ...prev,
        [name]: formattedValue,
      }))
      return
    }

    // Format expiry date
    if (name === "expiryDate") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5)

      setPaymentDetails((prev) => ({
        ...prev,
        [name]: formattedValue,
      }))
      return
    }

    // Format CVV (numbers only, max 3 digits)
    if (name === "cvv") {
      const formattedValue = value.replace(/\D/g, "").slice(0, 3)

      setPaymentDetails((prev) => ({
        ...prev,
        [name]: formattedValue,
      }))
      return
    }

    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const errors = []

    if (!paymentDetails.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
      errors.push("Please enter a valid 16-digit card number")
    }

    if (!paymentDetails.cardName.trim()) {
      errors.push("Please enter the name on your card")
    }

    if (!paymentDetails.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      errors.push("Please enter a valid expiry date (MM/YY)")
    }

    if (!paymentDetails.cvv.match(/^\d{3}$/)) {
      errors.push("Please enter a valid 3-digit CVV")
    }

    return errors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const errors = validateForm()
    if (errors.length > 0) {
      toast({
        title: "Invalid payment details",
        description: errors[0],
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // In a real app, this would call your payment API

      // Save subscription info to localStorage for demo purposes
      if (session?.user?.email) {
        localStorage.setItem(`plan_${session.user.email}`, selectedPlan || "free")

        // Reset evaluation count for the new plan
        localStorage.setItem(`evaluations_${session.user.email}`, "0")
      }

      setIsProcessing(false)

      toast({
        title: "Payment successful!",
        description: `Your ${selectedPlan} subscription has been activated.`,
      })

      // Redirect to dashboard
      router.push("/dashboard")
    }, 2000)
  }

  // Plan details
  const plans = {
    pro: {
      name: "Pro",
      price: "₹999/month",
      features: [
        "10 startup idea evaluations per month",
        "Detailed potential score analysis",
        "Full access to resources library",
        "AI advisor chat (100 messages/month)",
        "Customized roadmap generation",
        "Competitor analysis",
        "Priority email support",
      ],
    },
    enterprise: {
      name: "Enterprise",
      price: "₹4,999/month",
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
    },
  }

  // If no plan is selected, redirect to pricing
  if (!selectedPlan || !["pro", "enterprise"].includes(selectedPlan)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Plan Selected</h1>
          <p className="text-gray-600 mb-6">Please select a subscription plan to continue.</p>
          <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => router.push("/pricing")}>
            View Plans
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
            <p className="text-gray-600">You're just one step away from unlocking premium features</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:w-2/3"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Enter your card information to complete your subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentDetails.cardNumber}
                          onChange={handleInputChange}
                          className="pl-10 bg-white"
                          maxLength={19}
                        />
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        placeholder="John Smith"
                        value={paymentDetails.cardName}
                        onChange={handleInputChange}
                        className="bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={paymentDetails.expiryDate}
                          onChange={handleInputChange}
                          className="bg-white"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <div className="relative">
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={paymentDetails.cvv}
                            onChange={handleInputChange}
                            className="pl-10 bg-white"
                            maxLength={3}
                          />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="couponCode">Coupon Code (Optional)</Label>
                      <Input
                        id="couponCode"
                        name="couponCode"
                        placeholder="Enter coupon code"
                        value={paymentDetails.couponCode}
                        onChange={handleInputChange}
                        className="bg-white"
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          `Pay ${selectedPlan === "pro" ? "₹999" : "₹4,999"}`
                        )}
                      </Button>
                    </div>

                    <div className="text-center text-sm text-gray-500 flex items-center justify-center">
                      <Lock className="h-3 w-3 mr-1" />
                      Your payment information is secure and encrypted
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-1/3"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Review your subscription details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-semibold">{plans[selectedPlan as keyof typeof plans].name} Plan</h3>
                        <p className="text-gray-600">{plans[selectedPlan as keyof typeof plans].price}</p>
                      </div>
                      <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                        Monthly Billing
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Plan Features:</h4>
                      <ul className="space-y-2">
                        {plans[selectedPlan as keyof typeof plans].features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>{selectedPlan === "pro" ? "₹999" : "₹4,999"}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>GST (18%)</span>
                        <span>{selectedPlan === "pro" ? "₹179.82" : "₹899.82"}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t border-gray-100">
                        <span>Total</span>
                        <span>{selectedPlan === "pro" ? "₹1,178.82" : "₹5,898.82"}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 text-sm text-gray-600">
                  <p>
                    By completing this purchase, you agree to our{" "}
                    <a href="/terms" className="text-orange-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-orange-600 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

