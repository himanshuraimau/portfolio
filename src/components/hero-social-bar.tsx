"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSocialBar() {
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const socialLinks = [
    { name: "GitHub", icon: <Github size={24} />, url: "https://github.com/johndoe", color: "hover:text-gray-800" },
    {
      name: "LinkedIn",
      icon: <Linkedin size={24} />,
      url: "https://linkedin.com/in/johndoe",
      color: "hover:text-blue-600",
    },
    { name: "Twitter", icon: <Twitter size={24} />, url: "https://twitter.com/johndoe", color: "hover:text-sky-500" },
    { name: "Email", icon: <Mail size={24} />, url: "mailto:john.doe@example.com", color: "hover:text-amber-700" },
  ]

  return (
    <div className="flex items-center justify-center gap-8 mt-12">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-muted-foreground transition-colors ${social.color} dark:hover:text-white`}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.6 + index * 0.1,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={
            prefersReducedMotion
              ? {}
              : {
                  y: -5,
                  transition: { duration: 0.2 },
                }
          }
          aria-label={social.name}
        >
          {social.icon}
        </motion.a>
      ))}
    </div>
  )
}

