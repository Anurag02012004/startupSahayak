"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3, Bell, FileText, Home, Lightbulb, LogOut, Menu, Settings, User, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Lightbulb className="h-6 w-6 text-orange-600" />
              <span className="font-bold text-lg">StartupSahayak</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center ml-10 space-x-6">
              <NavLink href="/dashboard" icon={<Home className="h-4 w-4 mr-1" />}>
                Dashboard
              </NavLink>
              <NavLink href="/dashboard/ideas" icon={<FileText className="h-4 w-4 mr-1" />}>
                My Ideas
              </NavLink>
              <NavLink href="/dashboard/analytics" icon={<BarChart3 className="h-4 w-4 mr-1" />}>
                Analytics
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <img src="/placeholder.svg?height=32&width=32" alt="User" className="rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <MobileNavLink
              href="/dashboard"
              icon={<Home className="h-5 w-5 mr-2" />}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </MobileNavLink>
            <MobileNavLink
              href="/dashboard/ideas"
              icon={<FileText className="h-5 w-5 mr-2" />}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Ideas
            </MobileNavLink>
            <MobileNavLink
              href="/dashboard/analytics"
              icon={<BarChart3 className="h-5 w-5 mr-2" />}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Analytics
            </MobileNavLink>
            <MobileNavLink
              href="/profile"
              icon={<User className="h-5 w-5 mr-2" />}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </MobileNavLink>
            <MobileNavLink
              href="/settings"
              icon={<Settings className="h-5 w-5 mr-2" />}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Settings
            </MobileNavLink>
            <div className="pt-2 border-t border-gray-100">
              <MobileNavLink
                href="/logout"
                icon={<LogOut className="h-5 w-5 mr-2" />}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log out
              </MobileNavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-orange-600 font-medium transition-colors flex items-center text-sm"
    >
      {icon}
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  icon,
  onClick,
  children,
}: {
  href: string
  icon: React.ReactNode
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-gray-700 hover:text-orange-600 font-medium transition-colors flex items-center py-2"
    >
      {icon}
      {children}
    </Link>
  )
}

