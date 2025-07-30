"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

interface NavigationProps {
  activeSection: string
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setIsMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Circular Avatar */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                <AvatarImage
                  src="/images/profile-suliman.png"
                  alt="Suliman Sultan - Mobile App Developer"
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white font-semibold">
                  SS
                </AvatarFallback>
              </Avatar>
              {/* Online status indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
            </div>
            <Link href="/" className="text-2xl font-bold gradient-text hover:scale-105 transition-transform">
              Sultan
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.href.replace("#", "") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle & Dashboard Link */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="transition-all duration-300 hover:scale-105 bg-transparent"
              >
                Dashboard
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="transition-all duration-300 hover:scale-110 hover:rotate-12"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-blue-500" />
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="transition-all duration-300 hover:scale-110"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-blue-500" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
              {/* Mobile Avatar */}
              <div className="flex items-center gap-3 px-3 py-2 mb-2">
                <Avatar className="h-8 w-8 border border-primary/20">
                  <AvatarImage src="/images/profile-suliman.png" alt="Suliman Sultan" className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-sm">
                    SS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">Suliman Sultan</p>
                  <p className="text-xs text-muted-foreground">Mobile App Developer</p>
                </div>
              </div>

              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors hover:text-primary ${
                    activeSection === item.href.replace("#", "") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
