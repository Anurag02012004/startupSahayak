"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, FileText, Plus, Star, TrendingUp, Users, Calendar, BookOpen, Lightbulb } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"

// Mock data for the dashboard
const mockIdeas = [
  {
    id: 1,
    title: "EduTech Platform for Rural India",
    description: "Mobile-first education platform designed for low-bandwidth areas in rural India",
    score: 82,
    date: "2023-11-15",
    status: "High Potential",
  },
  {
    id: 2,
    title: "HealthTrack - Preventive Healthcare App",
    description: "AI-powered health monitoring and preventive care recommendations for Indian users",
    score: 76,
    date: "2023-12-03",
    status: "High Potential",
  },
  {
    id: 3,
    title: "LocalBazaar - Hyperlocal Marketplace",
    description: "Connecting local vendors with consumers in tier 2 and 3 cities",
    score: 65,
    date: "2024-01-10",
    status: "Needs Improvement",
  },
]

const mockResources = [
  {
    id: 1,
    title: "Startup India Registration Guide",
    category: "Legal",
    type: "Guide",
  },
  {
    id: 2,
    title: "DPIIT Recognition Process",
    category: "Legal",
    type: "Guide",
  },
  {
    id: 3,
    title: "GST for Startups in India",
    category: "Tax",
    type: "Guide",
  },
  {
    id: 4,
    title: "Funding Options for Early-Stage Startups",
    category: "Funding",
    type: "Guide",
  },
]

const mockEvents = [
  {
    id: 1,
    title: "Startup India Venture Capital Summit",
    date: "2024-04-15",
    location: "Mumbai",
  },
  {
    id: 2,
    title: "TiE Global Summit",
    date: "2024-05-22",
    location: "Delhi",
  },
  {
    id: 3,
    title: "Bengaluru Tech Summit",
    date: "2024-06-10",
    location: "Bengaluru",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("ideas")

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href="/evaluate">
                  <Plus className="mr-2 h-4 w-4" /> Evaluate New Idea
                </Link>
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Ideas Evaluated</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-orange-600 mr-2" />
                      <span className="text-2xl font-bold">3</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Average Potential</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <BarChart3 className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-2xl font-bold">74%</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">High Potential Ideas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-2xl font-bold">2</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="ideas" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="ideas">My Ideas</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="events">Upcoming Events</TabsTrigger>
              </TabsList>

              <TabsContent value="ideas" className="space-y-4">
                {mockIdeas.map((idea) => (
                  <motion.div
                    key={idea.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{idea.title}</CardTitle>
                            <CardDescription className="mt-1">{idea.description}</CardDescription>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-sm ${
                              idea.score >= 70 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {idea.status}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center mb-2">
                          <span className="text-sm text-gray-500 mr-2">Potential Score:</span>
                          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                idea.score >= 70 ? "bg-green-600" : idea.score >= 50 ? "bg-yellow-500" : "bg-red-500"
                              }`}
                              style={{ width: `${idea.score}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 font-semibold">{idea.score}%</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Evaluated on {new Date(idea.date).toLocaleDateString()}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Download Report
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockResources.map((resource) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-base">{resource.title}</CardTitle>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {resource.type}
                            </span>
                          </div>
                          <CardDescription>{resource.category}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Button variant="outline" size="sm" className="w-full">
                            <BookOpen className="mr-2 h-4 w-4" /> Read Guide
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{event.title}</CardTitle>
                          <CardDescription className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm">
                            <span className="font-medium">Location:</span> {event.location}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm" className="w-full">
                            Add to Calendar
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Lightbulb className="mr-2 h-4 w-4" /> New Idea
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" /> Find Co-founder
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="mr-2 h-4 w-4" /> Upgrade Plan
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trending in India</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Top Industries</h3>
                  <ul className="mt-2 space-y-1">
                    <li className="text-sm flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      FinTech
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                      HealthTech
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                      EdTech
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-2 w-2 rounded-full bg-orange-500 mr-2"></span>
                      AgriTech
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium">Funding News</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="text-sm">
                      <a href="#" className="text-blue-600 hover:underline">
                        Sequoia India announces $75M seed fund
                      </a>
                    </li>
                    <li className="text-sm">
                      <a href="#" className="text-blue-600 hover:underline">
                        Government launches ₹1000 Cr startup fund
                      </a>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

