"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const routes = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
  ]

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-background/80 backdrop-blur-sm",
        "border-b border-border"
      )}>
        <div className="container-custom flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="font-playfair text-xl sm:text-2xl font-bold tracking-tight">
            Himanshu<span className="text-muted-foreground">Rai</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "link-underline text-base lg:text-lg transition-colors",
                  pathname === route.path ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {route.name}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={cn(
            "md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav className="flex flex-col space-y-6 p-6 pt-10 text-center h-full">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "text-2xl py-2 transition-colors",
                  pathname === route.path ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.name}
              </Link>
            ))}
            <div className="mt-auto pb-8">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Himanshu Rai
              </p>
            </div>
          </nav>
        </div>
      </header>
      
      {/* Overlay for background blur when mobile menu is open */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-background/30 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}

