"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { useSession, signOut } from "next-auth/react"
import { User, Settings, CreditCard, FileText, LogOut, Edit, Save, Trash, Check } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"

interface SavedIdea {
  id: number
  title: string
  description: string
  industry: string
  evaluation: string
  date: string
  score: number
}

export default function ProfilePage() {
  const session = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([])
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    location: "",
  })

  const isAuthenticated = session.status === "authenticated"
  const isLoading = session.status === "loading"
  const userData = session.data?.user

  // Redirect if not logged in
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login")
    }
  }, [session.status, router])

  // Load user data
  useEffect(() => {
    if (userData) {
      setUserProfile({
        name: userData.name || "",
        email: userData.email || "",
        phone: localStorage.getItem(`user_phone_${userData.email}`) || "",
        company: localStorage.getItem(`user_company_${userData.email}`) || "",
        role: localStorage.getItem(`user_role_${userData.email}`) || "",
        location: localStorage.getItem(`user_location_${userData.email}`) || "",
      })

      // Load saved ideas
      if (userData.email) {
        const ideas = JSON.parse(localStorage.getItem(`saved_ideas_${userData.email}`) || "[]")
        setSavedIdeas(ideas)
      }
    }
  }, [userData])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const saveProfile = () => {
    if (userData?.email) {
      localStorage.setItem(`user_phone_${userData.email}`, userProfile.phone)
      localStorage.setItem(`user_company_${userData.email}`, userProfile.company)
      localStorage.setItem(`user_role_${userData.email}`, userProfile.role)
      localStorage.setItem(`user_location_${userData.email}`, userProfile.location)

      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      })

      setIsEditing(false)
    }
  }

  const deleteIdea = (id: number) => {
    if (userData?.email) {
      const updatedIdeas = savedIdeas.filter((idea) => idea.id !== id)
      setSavedIdeas(updatedIdeas)
      localStorage.setItem(`saved_ideas_${userData.email}`, JSON.stringify(updatedIdeas))

      toast({
        title: "Idea deleted",
        description: "The idea has been removed from your saved ideas.",
      })
    }
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/" })
  }

  // Show loading state while checking session
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <User className="h-10 w-10" />
                    </Avatar>
                    <CardTitle>{userProfile.name || "User"}</CardTitle>
                    <CardDescription className="text-center mt-1">{userProfile.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="profile" orientation="vertical" onValueChange={setActiveTab}>
                    <TabsList className="flex flex-col h-auto w-full bg-transparent justify-start items-start gap-2">
                      <TabsTrigger
                        value="profile"
                        className="w-full justify-start text-left px-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600"
                      >
                        <User className="mr-2 h-4 w-4" /> Profile
                      </TabsTrigger>
                      <TabsTrigger
                        value="ideas"
                        className="w-full justify-start text-left px-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600"
                      >
                        <FileText className="mr-2 h-4 w-4" /> Saved Ideas
                      </TabsTrigger>
                      <TabsTrigger
                        value="subscription"
                        className="w-full justify-start text-left px-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600"
                      >
                        <CreditCard className="mr-2 h-4 w-4" /> Subscription
                      </TabsTrigger>
                      <TabsTrigger
                        value="settings"
                        className="w-full justify-start text-left px-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600"
                      >
                        <Settings className="mr-2 h-4 w-4" /> Settings
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log Out
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Main content */}
            <div className="md:w-3/4">
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Manage your personal information</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? (
                        <>
                          <Save className="mr-2 h-4 w-4" /> Save
                        </>
                      ) : (
                        <>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault()
                        saveProfile()
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={userProfile.name}
                            onChange={handleProfileChange}
                            disabled={!isEditing}
                            className="bg-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" value={userProfile.email} disabled className="bg-white" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={userProfile.phone}
                            onChange={handleProfileChange}
                            disabled={!isEditing}
                            className="bg-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Company/Organization</Label>
                          <Input
                            id="company"
                            name="company"
                            value={userProfile.company}
                            onChange={handleProfileChange}
                            disabled={!isEditing}
                            className="bg-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="role">Role/Position</Label>
                          <Input
                            id="role"
                            name="role"
                            value={userProfile.role}
                            onChange={handleProfileChange}
                            disabled={!isEditing}
                            className="bg-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={userProfile.location}
                            onChange={handleProfileChange}
                            disabled={!isEditing}
                            className="bg-white"
                          />
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex justify-end">
                          <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ideas" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Ideas</CardTitle>
                    <CardDescription>Your evaluated startup ideas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {savedIdeas.length > 0 ? (
                      <div className="space-y-4">
                        {savedIdeas.map((idea) => (
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
                                    <CardDescription className="mt-1">
                                      {idea.description.substring(0, 100)}...
                                    </CardDescription>
                                  </div>
                                  <div
                                    className={`px-3 py-1 rounded-full text-sm ${
                                      idea.score >= 70 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {idea.score >= 70 ? "High Potential" : "Needs Improvement"}
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="flex items-center mb-2">
                                  <span className="text-sm text-gray-500 mr-2">Potential Score:</span>
                                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full ${
                                        idea.score >= 70
                                          ? "bg-green-600"
                                          : idea.score >= 50
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
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
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => router.push(`/dashboard/ideas/${idea.id}`)}
                                >
                                  View Details
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:bg-red-50"
                                  onClick={() => deleteIdea(idea.id)}
                                >
                                  <Trash className="mr-2 h-4 w-4" /> Delete
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No saved ideas yet</h3>
                        <p className="text-gray-600 mb-4">Evaluate your startup ideas to save them here</p>
                        <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => router.push("/evaluate")}>
                          Evaluate an Idea
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="subscription" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Subscription</CardTitle>
                    <CardDescription>Manage your subscription plan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold mb-2">Current Plan: Free</h3>
                      <p className="text-gray-600 mb-4">You are currently on the Free plan with limited features.</p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <div className="bg-green-100 rounded-full p-1 mr-3">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span>1 startup idea evaluation per month</span>
                        </li>
                        <li className="flex items-center">
                          <div className="bg-green-100 rounded-full p-1 mr-3">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span>Basic potential score analysis</span>
                        </li>
                        <li className="flex items-center">
                          <div className="bg-green-100 rounded-full p-1 mr-3">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span>Limited access to resources</span>
                        </li>
                      </ul>
                      <Button
                        className="bg-orange-600 hover:bg-orange-700 w-full"
                        onClick={() => router.push("/pricing")}
                      >
                        Upgrade Your Plan
                      </Button>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Usage Statistics</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Idea Evaluations</span>
                            <span className="text-sm font-medium">1/1 used</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Resource Downloads</span>
                            <span className="text-sm font-medium">3/5 used</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marketing" className="flex-1">
                            Marketing emails
                          </Label>
                          <input type="checkbox" id="marketing" className="toggle" defaultChecked={true} />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="updates" className="flex-1">
                            Product updates
                          </Label>
                          <input type="checkbox" id="updates" className="toggle" defaultChecked={true} />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="newsletter" className="flex-1">
                            Weekly newsletter
                          </Label>
                          <input type="checkbox" id="newsletter" className="toggle" defaultChecked={false} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Security</h3>
                      <Button variant="outline">Change Password</Button>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h3>
                      <Button variant="outline" className="text-red-600 hover:bg-red-50 border-red-200">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

