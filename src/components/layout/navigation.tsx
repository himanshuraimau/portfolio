"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Terminal, Slash, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const routes = [
    { name: "home", path: "/" },
    { name: "projects", path: "/projects" },
    { name: "blog", path: "/blog" },
    { name: "about", path: "/about" },
    { name: "photography", path: "/photography" } // Kept this as requested
  ]

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          className={cn(
            "flex items-center justify-between transition-all duration-300 rounded-xl border px-4 py-2.5",
            scrolled 
              ? "w-full max-w-5xl bg-background/80 backdrop-blur-md border-border/60 shadow-lg shadow-primary/5" 
              : "w-full max-w-6xl bg-transparent border-transparent"
          )}
        >
          {/* --- Logo Area: Terminal Path Style --- */}
          <Link href="/" className="group flex items-center gap-2 font-mono text-sm tracking-tight hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
               <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col leading-none">
                <span className="text-xs text-muted-foreground"></span>
                <span className="font-bold flex items-center">
                    ~himanshu
                </span>
            </div>
          </Link>

          {/* --- Desktop Nav: Command List --- */}
          <nav className="hidden md:flex items-center gap-1 bg-muted/30 p-1 rounded-lg border border-border/40">
            {routes.map((route) => {
              const isActive = pathname === route.path
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-mono transition-all duration-200 rounded-md flex items-center gap-2",
                    isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-background border border-border/50 shadow-sm rounded-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center">
                    {isActive && <ChevronRight className="w-3 h-3 mr-1 text-primary animate-pulse" />}
                    {route.name}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* --- Right Actions --- */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            {/* Mobile Toggle */}
            <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden rounded-md border border-border/50 hover:bg-muted" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </motion.div>
      </header>

      {/* --- Mobile Menu Overlay: System Popup Style --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden"
          >
            <div className="bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden p-4">
               <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/50">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Navigation_Menu</span>
                  <ThemeToggle />
               </div>
               
               <nav className="flex flex-col space-y-1">
                {routes.map((route) => {
                  const isActive = pathname === route.path
                  return (
                    <Link
                        key={route.path}
                        href={route.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                        "group flex items-center justify-between px-4 py-3 rounded-lg font-mono text-sm transition-colors",
                        isActive 
                            ? "bg-primary/10 text-primary border border-primary/20" 
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <span className="flex items-center gap-3">
                            <span className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-primary" : "bg-muted-foreground/30 group-hover:bg-primary/50")} />
                            {route.name}
                        </span>
                        {isActive && <Terminal className="w-4 h-4 opacity-50" />}
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-4 pt-4 border-t border-border/50 flex justify-center">
                 <div className="text-[10px] font-mono text-muted-foreground">
                    system status: <span className="text-green-500">online</span>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}