"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Cpu, Database, Layout, Server, Terminal, Wrench } from "lucide-react"

// Skill data organized by category
const skillsData = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "React Native", "Expo"],
  backend: ["Node.js", "Express", "Nginx", "RabbitMQ", "Prisma"],
  tools: ["Git", "Docker", "Kubernetes", "Linux", "AWS (Basic)", "CI/CD"],
  languages: ["Python", "C++", "C", "Go", "Java"],
  ai_ml: ["LangChain", "OpenAI", "PyTorch", "TensorFlow", "Scikit-learn"],
  databases: ["MongoDB", "PostgreSQL", "Redis"]
}

type SkillCategory = "frontend" | "backend" | "tools" | "languages" | "ai_ml" | "databases"

const categoryIcons = {
  frontend: Layout,
  backend: Server,
  tools: Wrench,
  languages: Terminal,
  ai_ml: Cpu,
  databases: Database
}

export function SkillsToggle() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("frontend")
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden">
      
      {/* Category Toggle Bar */}
      <div className="flex flex-wrap border-b border-border bg-muted/20">
        {[
          { id: "frontend", label: "Frontend" },
          { id: "backend", label: "Backend" },
          { id: "ai_ml", label: "AI / ML" },
          { id: "tools", label: "DevOps" },
          { id: "languages", label: "Langs" },
          { id: "databases", label: "Data" },
        ].map((category) => {
           // @ts-ignore
           const Icon = categoryIcons[category.id] || Terminal
           return (
            <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as SkillCategory)}
                className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-mono transition-all border-r border-border last:border-r-0 flex-grow sm:flex-grow-0",
                activeCategory === category.id 
                    ? "bg-background text-primary border-b-2 border-b-primary -mb-[1px]" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
            >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">{category.label.slice(0, 3)}</span>
            </button>
           )
        })}
      </div>

      {/* Skills Grid Area */}
      <div className="p-6 sm:p-8 bg-background/50 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {skillsData[activeCategory].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="group relative border border-border bg-card/50 hover:bg-muted/30 p-3 rounded-lg flex items-center justify-between transition-colors overflow-hidden"
              >
                 {/* Progress Bar Decoration */}
                 <div className="absolute bottom-0 left-0 h-0.5 bg-primary/20 w-full group-hover:bg-primary transition-colors">
                    <div className="h-full bg-primary w-[70%]" /> 
                 </div>

                 <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground/50 group-hover:text-primary transition-colors">
                        {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="font-medium font-mono text-sm">{skill}</span>
                 </div>
                 
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 group-hover:bg-green-500 group-hover:shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}