"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

// Mock data for success stories
const successStories = [
  {
    id: 1,
    name: "Priya Sharma",
    company: "EduReach",
    image: "/placeholder.svg?height=400&width=400",
    logo: "/placeholder.svg?height=80&width=80",
    title: "Revolutionizing Education in Rural India",
    description:
      "EduReach is making quality education accessible to students in rural India through low-bandwidth mobile learning solutions.",
    story:
      "When I first had the idea for EduReach, I was teaching in a small village in Bihar and saw firsthand how limited access to quality educational resources was holding back bright students. I wanted to create a mobile platform that would work even in areas with poor connectivity, but I wasn't sure if the idea was viable or how to approach it.\n\nStartupSahayak's evaluation gave me a clear roadmap and highlighted aspects of the Indian market I hadn't considered. The platform scored my idea at 82/100 and provided specific guidance on regulatory requirements for EdTech in India, potential funding sources, and strategies for user adoption in rural areas.\n\nWith this guidance, I was able to secure seed funding from an impact investor and launch a pilot in three districts. Today, EduReach serves over 50,000 students across five states, and we're growing rapidly. The step-by-step roadmap from StartupSahayak was instrumental in our journey.",
    funding: "₹1.5 Crore Seed Funding",
    category: "EdTech",
    location: "Bihar",
    year: 2022,
    rating: 5,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    company: "FarmConnect",
    image: "/placeholder.svg?height=400&width=400",
    logo: "/placeholder.svg?height=80&width=80",
    title: "Connecting Farmers Directly to Urban Consumers",
    description:
      "FarmConnect has eliminated middlemen in the agricultural supply chain, ensuring farmers get fair prices and urban consumers get fresh produce.",
    story:
      "I come from a farming family in Punjab, and I've always been frustrated by how little of the final price farmers actually receive. The idea for FarmConnect came from wanting to create a direct farm-to-consumer model that would benefit both farmers and consumers.\n\nWhen I evaluated my idea on StartupSahayak, it received a 76/100 score. The platform identified key challenges I would face in the Indian agricultural market, particularly around cold chain logistics and farmer onboarding. It also suggested specific government schemes I could leverage and provided a detailed competitive analysis of similar models in India.\n\nThe most valuable part was the roadmap that suggested starting with a single agricultural product category and a limited geographic area before expanding. Following this advice, we launched with just fruits in the Delhi NCR region, perfected our model, and then expanded. Today, we work with over 5,000 farmers across northern India and deliver to more than 100,000 customers. We've raised two rounds of funding and are profitable in three cities.",
    funding: "₹4 Crore Series A",
    category: "AgriTech",
    location: "Punjab",
    year: 2021,
    rating: 5,
  },
  {
    id: 3,
    name: "Ananya Patel",
    company: "MediTrack",
    image: "/placeholder.svg?height=400&width=400",
    logo: "/placeholder.svg?height=80&width=80",
    title: "Simplifying Healthcare Management for Indian Families",
    description:
      "MediTrack helps families manage medical records, appointments, and medication schedules across multiple healthcare providers.",
    story:
      "The idea for MediTrack came after my father was diagnosed with a chronic condition and I saw how difficult it was to manage his care across multiple specialists, especially with paper records. I wanted to create a solution that would work for Indian families dealing with similar challenges.\n\nStartupSahayak's evaluation gave my idea a 79/100 score and highlighted the importance of data privacy regulations in healthcare, which I hadn't fully considered. The platform also identified key partnerships I should pursue with hospital chains and insurance providers to accelerate adoption.\n\nThe competitive analysis showed that while there were several health apps in India, none were focusing specifically on family care coordination. This insight helped us refine our positioning and marketing strategy. The roadmap suggested starting with a freemium model focused on medication reminders before expanding to full medical record management.\n\nFollowing this guidance, we've grown to 200,000 users across India and recently closed our Series A funding round. We're now working on integrations with major hospital information systems and insurance providers.",
    funding: "₹3.5 Crore Series A",
    category: "HealthTech",
    location: "Gujarat",
    year: 2022,
    rating: 4,
  },
  {
    id: 4,
    name: "Vikram Singh",
    company: "RuralFinance",
    image: "/placeholder.svg?height=400&width=400",
    logo: "/placeholder.svg?height=80&width=80",
    title: "Microfinance Solutions for Village Entrepreneurs",
    description:
      "RuralFinance provides accessible microloans and financial education to small entrepreneurs in rural India.",
    story:
      "Growing up in a small village in Rajasthan, I saw how lack of access to formal banking and credit kept many talented entrepreneurs from growing their businesses. After working in the banking sector for several years, I wanted to create a solution specifically designed for rural entrepreneurs.\n\nWhen I evaluated my idea on StartupSahayak, it received a 74/100 score. The platform highlighted regulatory challenges I would face with RBI compliance and suggested focusing on a partnership model with existing NBFCs rather than trying to become a lender ourselves initially.\n\nThe market analysis showed that while there were many microfinance institutions in India, most weren't leveraging technology effectively for credit assessment and monitoring in rural areas. This insight helped us develop our proprietary credit scoring algorithm that uses alternative data points relevant to rural businesses.\n\nFollowing the roadmap provided, we first launched a pilot in 20 villages in Rajasthan, refined our model based on feedback, and then expanded. Today, we serve over 15,000 rural entrepreneurs across three states and have maintained a repayment rate of 98.5%. We've raised funding from impact investors and are now working on expanding to five more states in the next year.",
    funding: "₹2.8 Crore Seed Funding",
    category: "FinTech",
    location: "Rajasthan",
    year: 2021,
    rating: 4,
  },
  {
    id: 5,
    name: "Arjun Reddy",
    company: "WasteWorks",
    image: "/placeholder.svg?height=400&width=400",
    logo: "/placeholder.svg?height=80&width=80",
    title: "Turning Urban Waste into Valuable Resources",
    description:
      "WasteWorks has developed innovative technology to convert urban waste into energy and recycled products.",
    story:
      "After completing my environmental engineering degree, I was shocked by the waste management crisis in Indian cities. I wanted to create a solution that would not just manage waste but convert it into valuable resources.\n\nStartupSahayak's evaluation gave my idea a 71/100 score and provided crucial insights into the regulatory landscape for waste management in India. The platform highlighted the importance of working with municipal corporations and suggested starting with a B2B model focused on commercial establishments before expanding to residential waste.\n\nThe competitive analysis showed that while there were several players in waste collection, few were focusing on innovative processing technologies. This helped us focus our R&D efforts on proprietary waste-to-energy conversion methods.\n\nFollowing the roadmap, we first piloted our solution with three corporate campuses in Hyderabad, refined our technology, and then expanded to municipal partnerships. Today, we process over 50 tonnes of waste daily across two cities and have prevented thousands of tonnes of waste from reaching landfills. We've secured Series A funding and are expanding to three more cities this year.",
    funding: "₹5 Crore Series A",
    category: "CleanTech",
    location: "Telangana",
    year: 2020,
    rating: 5,
  },
]

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Sanjay Mehta",
    role: "Angel Investor",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "As an investor, I've seen a marked improvement in the quality of pitches from startups that have used StartupSahayak. The platform helps founders think through critical aspects of their business model and market approach specific to India.",
    stars: 5,
  },
  {
    id: 2,
    name: "Deepika Sharma",
    role: "Founder, D2C Brand",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "StartupSahayak helped me identify a critical gap in my go-to-market strategy for tier 2 cities. The insights were specific to Indian consumer behavior and saved me from making costly mistakes.",
    stars: 5,
  },
  {
    id: 3,
    name: "Rahul Jain",
    role: "Tech Entrepreneur",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The regulatory guidance provided by StartupSahayak was invaluable for our fintech startup. Navigating RBI regulations is complex, and the platform gave us a clear roadmap to compliance.",
    stars: 4,
  },
  {
    id: 4,
    name: "Meera Patel",
    role: "Healthcare Innovator",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "What impressed me most was how the platform understood the nuances of India's healthcare system. The recommendations were practical and helped us refine our approach to working with both public and private healthcare providers.",
    stars: 5,
  },
]

export default function SuccessStoriesPage() {
  const [activeStory, setActiveStory] = useState(0)
  const [activeTab, setActiveTab] = useState("all")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextStory = () => {
    setActiveStory((prev) => (prev === successStories.length - 1 ? 0 : prev + 1))
  }

  const prevStory = () => {
    setActiveStory((prev) => (prev === 0 ? successStories.length - 1 : prev - 1))
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  // Filter stories based on active tab
  const filteredStories =
    activeTab === "all"
      ? successStories
      : successStories.filter((story) => story.category.toLowerCase() === activeTab.toLowerCase())

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-4"
            >
              Success Stories
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Real entrepreneurs who validated their ideas and built successful startups in India
            </motion.p>
          </div>

          {/* Featured Success Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative">
              <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="lg:w-2/5 relative">
                  <img
                    src={successStories[activeStory].image || "/placeholder.svg"}
                    alt={successStories[activeStory].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center mb-2">
                      <img
                        src={successStories[activeStory].logo || "/placeholder.svg"}
                        alt={successStories[activeStory].company}
                        className="w-12 h-12 rounded-full bg-white p-1 mr-3"
                      />
                      <div>
                        <h3 className="font-bold text-xl">{successStories[activeStory].company}</h3>
                        <p>{successStories[activeStory].name}, Founder</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="bg-orange-600 px-2 py-1 rounded-full mr-2">
                        {successStories[activeStory].category}
                      </span>
                      <span className="mr-2">•</span>
                      <span>{successStories[activeStory].location}</span>
                      <span className="mx-2">•</span>
                      <span>{successStories[activeStory].year}</span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-3/5 p-8">
                  <h2 className="text-2xl font-bold mb-4">{successStories[activeStory].title}</h2>
                  <p className="text-gray-600 mb-6">{successStories[activeStory].description}</p>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">The Journey</h3>
                    <div className="prose max-w-none text-gray-700">
                      {successStories[activeStory].story.split("\n\n").map((paragraph, i) => (
                        <p key={i} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="bg-green-50 px-4 py-2 rounded-lg">
                      <span className="text-sm text-gray-600">Funding Raised</span>
                      <p className="font-semibold text-green-700">{successStories[activeStory].funding}</p>
                    </div>
                    <div className="bg-blue-50 px-4 py-2 rounded-lg">
                      <span className="text-sm text-gray-600">StartupSahayak Rating</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < successStories[activeStory].rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 left-4 -translate-y-1/2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/80 backdrop-blur-sm"
                  onClick={prevStory}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>
              <div className="absolute top-1/2 right-4 -translate-y-1/2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/80 backdrop-blur-sm"
                  onClick={nextStory}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex justify-center mt-4 gap-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStory(index)}
                  className={`h-3 w-3 rounded-full ${index === activeStory ? "bg-orange-600" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </motion.div>

          {/* All Success Stories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6">Browse Success Stories</h2>

            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="edtech">EdTech</TabsTrigger>
                <TabsTrigger value="agritech">AgriTech</TabsTrigger>
                <TabsTrigger value="healthtech">HealthTech</TabsTrigger>
                <TabsTrigger value="fintech">FinTech</TabsTrigger>
                <TabsTrigger value="cleantech">CleanTech</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStories.map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="h-full flex flex-col overflow-hidden">
                        <div className="relative h-48">
                          <img
                            src={story.image || "/placeholder.svg"}
                            alt={story.company}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                            <div>
                              <h3 className="font-bold text-white">{story.company}</h3>
                              <div className="flex items-center text-sm text-white">
                                <span className="bg-orange-600 px-2 py-0.5 rounded-full mr-2 text-xs">
                                  {story.category}
                                </span>
                                <span>{story.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="flex-grow flex flex-col p-4">
                          <h3 className="font-semibold mb-2">{story.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{story.description}</p>
                          <div className="mt-auto flex justify-between items-center">
                            <div className="flex items-center">
                              <img
                                src={story.logo || "/placeholder.svg"}
                                alt={story.name}
                                className="w-8 h-8 rounded-full mr-2"
                              />
                              <span className="text-sm">{story.name}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setActiveStory(successStories.findIndex((s) => s.id === story.id))}
                            >
                              Read More
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">What Our Users Say</h2>

            <div className="max-w-3xl mx-auto relative">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                        alt={testimonials[currentTestimonial].name}
                        className="h-20 w-20 rounded-full object-cover border-4 border-orange-100"
                      />
                      <div className="absolute -top-2 -left-2 bg-orange-100 rounded-full p-1">
                        <Quote className="h-4 w-4 text-orange-600" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonials[currentTestimonial].stars
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg mb-4">"{testimonials[currentTestimonial].content}"</p>
                    <div>
                      <h4 className="font-semibold text-lg">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
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
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-3 w-3 rounded-full ${index === currentTestimonial ? "bg-orange-600" : "bg-gray-300"}`}
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
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of Indian entrepreneurs who have transformed their ideas into successful businesses.
            </p>
            <Button
              className="bg-orange-600 hover:bg-orange-700"
              size="lg"
              onClick={() => (window.location.href = "/evaluate")}
            >
              Evaluate Your Idea Now
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

