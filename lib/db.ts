// This is a mock database implementation for demonstration purposes
// In a real application, you would use a real database like PostgreSQL, MongoDB, etc.

import { v4 as uuidv4 } from "uuid"

// Types
export interface User {
  id: string
  name: string
  email: string
  password: string // In a real app, this would be hashed
  createdAt: Date
}

export interface StartupIdea {
  id: string
  userId: string
  title: string
  description: string
  industry: string
  targetMarket: string
  businessModel: string
  uniqueValue: string
  competitorAnalysis: string
  challenges: string
  potentialScore: number
  status: "High Potential" | "Needs Improvement" | "Low Potential"
  evaluation: string
  createdAt: Date
}

// Mock data storage
const users: User[] = []
let startupIdeas: StartupIdea[] = []

// User functions
export async function createUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
  const newUser: User = {
    id: uuidv4(),
    ...userData,
    createdAt: new Date(),
  }

  users.push(newUser)
  return newUser
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return users.find((user) => user.email === email) || null
}

export async function getUserById(id: string): Promise<User | null> {
  return users.find((user) => user.id === id) || null
}

// Startup idea functions
export async function createStartupIdea(ideaData: Omit<StartupIdea, "id" | "createdAt">): Promise<StartupIdea> {
  const newIdea: StartupIdea = {
    id: uuidv4(),
    ...ideaData,
    createdAt: new Date(),
  }

  startupIdeas.push(newIdea)
  return newIdea
}

export async function getStartupIdeasByUserId(userId: string): Promise<StartupIdea[]> {
  return startupIdeas.filter((idea) => idea.userId === userId)
}

export async function getStartupIdeaById(id: string): Promise<StartupIdea | null> {
  return startupIdeas.find((idea) => idea.id === id) || null
}

export async function updateStartupIdea(id: string, ideaData: Partial<StartupIdea>): Promise<StartupIdea | null> {
  const ideaIndex = startupIdeas.findIndex((idea) => idea.id === id)

  if (ideaIndex === -1) {
    return null
  }

  startupIdeas[ideaIndex] = {
    ...startupIdeas[ideaIndex],
    ...ideaData,
  }

  return startupIdeas[ideaIndex]
}

export async function deleteStartupIdea(id: string): Promise<boolean> {
  const initialLength = startupIdeas.length
  startupIdeas = startupIdeas.filter((idea) => idea.id !== id)
  return startupIdeas.length !== initialLength
}

