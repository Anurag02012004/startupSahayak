"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { ArrowLeft, Download, FileText, Share } from "lucide-react"

// Mock resource data
const resources = [
  {
    id: "startup-india-registration",
    title: "Complete Guide to Startup India Registration",
    description: "Step-by-step process to register under the Startup India initiative and access government benefits.",
    category: "Legal",
    type: "Guide",
    pdfUrl: "https://www.startupindia.gov.in/content/dam/invest-india/Templates/public/198117.pdf",
    coverImage: "/placeholder.svg?height=400&width=600",
    pages: 24,
    lastUpdated: "2023-12-15",
    author: "Ministry of Commerce and Industry",
    verified: true,
  },
  {
    id: "gst-compliance",
    title: "GST Compliance for Indian Startups",
    description: "Everything founders need to know about GST registration, filing, and compliance requirements.",
    category: "Tax",
    type: "Guide",
    pdfUrl: "https://cbic-gst.gov.in/pdf/gst-concept-status-ason01052017.pdf",
    coverImage: "/placeholder.svg?height=400&width=600",
    pages: 32,
    lastUpdated: "2023-10-20",
    author: "Central Board of Indirect Taxes and Customs",
    verified: true,
  },
  {
    id: "pitch-deck-template",
    title: "Startup Pitch Deck Template for Indian Investors",
    description:
      "Customizable pitch deck template designed specifically for pitching to Indian VCs and angel investors.",
    category: "Funding",
    type: "Template",
    pdfUrl: "https://www.startupindia.gov.in/content/dam/invest-india/Templates/public/Pitch%20Deck%20Template.pdf",
    coverImage: "/placeholder.svg?height=400&width=600",
    pages: 15,
    lastUpdated: "2024-01-10",
    author: "Startup India",
    verified: true,
  },
  {
    id: "regulatory-compliance-checklist",
    title: "Regulatory Compliance Checklist for Indian Startups",
    description: "Comprehensive checklist of regulatory requirements based on industry and business model.",
    category: "Legal",
    type: "Checklist",
    pdfUrl:
      "https://www.startupindia.gov.in/content/dam/invest-india/compendium/Compendium%20of%20Good%20Practices%20for%20Promotion%20of%20Startup%20Ecosystem.pdf",
    coverImage: "/placeholder.svg?height=400&width=600",
    pages: 18,
    lastUpdated: "2023-11-05",
    author: "Ministry of Corporate Affairs",
    verified: true,
  },
  {
    id: "state-policy-comparison",
    title: "State-by-State Startup Policy Comparison",
    description: "Detailed comparison of startup policies, incentives, and support across different Indian states.",
    category: "Policy",
    type: "Report",
    pdfUrl: "https://www.startupindia.gov.in/content/dam/invest-india/compendium/Startup%20India%20Compendium.pdf",
    coverImage: "/placeholder.svg?height=400&width=600",
    pages: 42,
    lastUpdated: "2023-09-30",
    author: "Startup India",
    verified: true,
  },
]

export default function ResourceDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [resource, setResource] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Find the resource by ID
    const foundResource = resources.find((r) => r.id === params.id)

    if (foundResource) {
      setResource(foundResource)
    } else {
      // Resource not found, redirect to resources page
      router.push("/resources")
    }

    setIsLoading(false)
  }, [params.id, router])

  const handleDownload = () => {
    // Check if user is logged in
    if (!session) {
      toast({
        title: "Login required",
        description: "Please login to download this resource.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // In a real app, you would track downloads and check limits
    // For demo, we'll just open the PDF
    window.open(resource.pdfUrl, "_blank")

    toast({
      title: "Download started",
      description: "Your resource is being downloaded.",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Resource Not Found</h1>
          <p className="text-gray-600 mb-6">The resource you're looking for doesn't exist or has been moved.</p>
          <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => router.push("/resources")}>
            Back to Resources
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" className="mb-6" onClick={() => router.push("/resources")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
          </Button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <img
                  src={resource.coverImage || "/placeholder.svg"}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm mr-2">
                        {resource.category}
                      </span>
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{resource.type}</span>
                      {resource.verified && (
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm ml-2">Verified</span>
                      )}
                    </div>
                    <h1 className="text-2xl font-bold text-white">{resource.title}</h1>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-2/3">
                    <h2 className="text-xl font-semibold mb-4">About this Resource</h2>
                    <p className="text-gray-700 mb-6">{resource.description}</p>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Why this matters for Indian startups:</h3>
                        <p className="text-gray-700">
                          This resource provides critical information specific to the Indian startup ecosystem, helping
                          founders navigate the unique challenges and opportunities in the market.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold">Who should use this:</h3>
                        <p className="text-gray-700">
                          Founders, entrepreneurs, and startup teams looking to understand{" "}
                          {resource.category.toLowerCase()}
                          requirements and best practices in the Indian context.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/3">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <Button className="w-full bg-orange-600 hover:bg-orange-700 mb-4" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" /> Download PDF
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full mb-6"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href)
                          toast({
                            title: "Link copied",
                            description: "Resource link copied to clipboard",
                          })
                        }}
                      >
                        <Share className="mr-2 h-4 w-4" /> Share
                      </Button>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Format:</span>
                          <span className="font-medium">PDF</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pages:</span>
                          <span className="font-medium">{resource.pages}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Updated:</span>
                          <span className="font-medium">{new Date(resource.lastUpdated).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Author:</span>
                          <span className="font-medium">{resource.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold mb-4">Related Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resources
                .filter((r) => r.id !== resource.id && r.category === resource.category)
                .slice(0, 3)
                .map((relatedResource) => (
                  <Card key={relatedResource.id} className="overflow-hidden">
                    <div className="relative h-40">
                      <img
                        src={relatedResource.coverImage || "/placeholder.svg"}
                        alt={relatedResource.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-1">{relatedResource.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedResource.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => router.push(`/resources/${relatedResource.id}`)}
                      >
                        View Resource
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

