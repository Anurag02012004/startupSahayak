"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, Search } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for resources
const resources = [
  {
    id: "startup-india-registration",
    title: "Complete Guide to Startup India Registration",
    description: "Step-by-step process to register under the Startup India initiative and access government benefits.",
    category: "Legal",
    type: "Guide",
    downloadUrl: "#",
    popular: true,
  },
  {
    id: "indian-startup-funding-2024",
    title: "Indian Startup Funding Landscape 2024",
    description:
      "Comprehensive analysis of funding trends, active investors, and hot sectors in the Indian startup ecosystem.",
    category: "Funding",
    type: "Report",
    downloadUrl: "#",
    popular: true,
  },
  {
    id: "gst-compliance-indian-startups",
    title: "GST Compliance for Indian Startups",
    description: "Everything founders need to know about GST registration, filing, and compliance requirements.",
    category: "Tax",
    type: "Guide",
    downloadUrl: "#",
    popular: false,
  },
  {
    id: "market-entry-tier2-tier3",
    title: "Market Entry Strategy for Tier 2 & 3 Cities",
    description: "Research-backed strategies for expanding your startup beyond metro cities in India.",
    category: "Market Research",
    type: "Report",
    downloadUrl: "#",
    popular: true,
  },
  {
    id: "ip-rights-indian-startups",
    title: "Intellectual Property Rights for Indian Startups",
    description: "Guide to patents, trademarks, and copyright protection for your startup in India.",
    category: "Legal",
    type: "Guide",
    downloadUrl: "#",
    popular: false,
  },
  {
    id: "consumer-behavior-trends-2024",
    title: "Indian Consumer Behavior Trends 2024",
    description: "Analysis of changing consumer preferences and behaviors across different Indian demographics.",
    category: "Market Research",
    type: "Report",
    downloadUrl: "#",
    popular: true,
  },
  {
    id: "startup-pitch-deck-template",
    title: "Startup Pitch Deck Template for Indian Investors",
    description:
      "Customizable pitch deck template designed specifically for pitching to Indian VCs and angel investors.",
    category: "Funding",
    type: "Template",
    downloadUrl: "#",
    popular: true,
  },
  {
    id: "digital-marketing-playbook",
    title: "Digital Marketing Playbook for Indian Startups",
    description: "Effective digital marketing strategies tailored for the Indian market and consumer behavior.",
    category: "Marketing",
    type: "Guide",
    downloadUrl: "#",
    popular: false,
  },
  {
    id: "hiring-guide-early-stage",
    title: "Hiring Guide for Early-Stage Indian Startups",
    description:
      "Best practices for recruiting, compensating, and retaining talent in the competitive Indian job market.",
    category: "HR",
    type: "Guide",
    downloadUrl: "#",
    popular: false,
  },
  {
    id: "startup-policy-comparison",
    title: "State-by-State Startup Policy Comparison",
    description: "Detailed comparison of startup policies, incentives, and support across different Indian states.",
    category: "Policy",
    type: "Report",
    downloadUrl: "#",
    popular: true,
  },
  {
    id: "financial-modeling-template",
    title: "Financial Modeling Template for Indian Startups",
    description: "Excel-based financial model template with India-specific tax rates and accounting standards.",
    category: "Finance",
    type: "Template",
    downloadUrl: "#",
    popular: false,
  },
  {
    id: "regulatory-compliance-checklist",
    title: "Regulatory Compliance Checklist for Indian Startups",
    description: "Comprehensive checklist of regulatory requirements based on industry and business model.",
    category: "Legal",
    type: "Checklist",
    downloadUrl: "#",
    popular: true,
  },
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  // Filter resources based on search query and active tab
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "popular") return matchesSearch && resource.popular
    return matchesSearch && resource.category.toLowerCase() === activeTab.toLowerCase()
  })

  // Get unique categories for tabs
  const categories = ["all", "popular", ...new Set(resources.map((r) => r.category.toLowerCase()))]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-4"
            >
              Startup Resources for the Indian Market
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Access guides, reports, templates, and tools specifically designed for entrepreneurs building in India
            </motion.p>
          </div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search resources..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="w-full h-auto flex flex-wrap justify-start gap-2 bg-transparent">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-orange-600 data-[state=active]:text-white capitalize"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Resources grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index % 6) }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          <CardDescription className="mt-2">{resource.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {resource.category}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {resource.type}
                        </span>
                        {resource.popular && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Popular</span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => router.push(`/resources/${resource.id}`)}
                      >
                        <FileText className="mr-2 h-4 w-4" /> View Resource
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Request resource section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 bg-white p-8 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
                <p className="text-gray-600 mb-4">
                  If you need specific resources or information about the Indian startup ecosystem, let us know and our
                  team will create it for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input placeholder="What resource do you need?" className="flex-grow" />
                  <Button className="bg-orange-600 hover:bg-orange-700 whitespace-nowrap">Request Resource</Button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-orange-50 p-6 rounded-full">
                  <BookOpen className="h-16 w-16 text-orange-600" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

