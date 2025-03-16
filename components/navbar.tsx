"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Lightbulb, Menu, X, User } from "lucide-react"
import { useSession } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar } from "@/components/ui/avatar"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const session = useSession()
  const isAuthenticated = session?.status === "authenticated"

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Lightbulb className="h-8 w-8 text-orange-600" />
            <span className="font-bold text-xl">StartupSahayak</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/how-it-works">How It Works</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/success-stories">Success Stories</NavLink>
            <NavLink href="/resources">Resources</NavLink>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar>
                      <User className="h-5 w-5" />
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/evaluate">Evaluate Idea</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-gray-700 hover:text-orange-600">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-b border-gray-100"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink href="/how-it-works" onClick={toggleMenu}>
                How It Works
              </MobileNavLink>
              <MobileNavLink href="/pricing" onClick={toggleMenu}>
                Pricing
              </MobileNavLink>
              <MobileNavLink href="/success-stories" onClick={toggleMenu}>
                Success Stories
              </MobileNavLink>
              <MobileNavLink href="/resources" onClick={toggleMenu}>
                Resources
              </MobileNavLink>
            </nav>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
              {isAuthenticated ? (
                <>
                  <Button asChild variant="outline" className="w-full justify-center">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-center">
                    <Link href="/profile">Profile</Link>
                  </Button>
                  <Button asChild className="w-full justify-center bg-orange-600 hover:bg-orange-700">
                    <Link href="/evaluate">Evaluate Idea</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-center">
                    <Link href="/api/auth/signout">Log Out</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full justify-center">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="w-full justify-center bg-orange-600 hover:bg-orange-700">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-700 hover:text-orange-600 font-medium transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full" />
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-gray-700 hover:text-orange-600 font-medium transition-colors py-2"
    >
      {children}
    </Link>
  )
}

