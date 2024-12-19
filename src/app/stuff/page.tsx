'use client'

import { useEffect, useState } from "react"
import { HoverEffect } from "@/components/ui/card-hover-effect"

const projects = {
  web: [
    {
      title: "True Feedback",
      href: "https://ama-app-sooty.vercel.app/",
      description: "An app that allows users to receive and manage anonymous questions or messages.",
      imageSrc: "/AMA.png",
      imageAlt: "True Feedback Application",
      tech: ["Next.js", "TypeScript", "Tailwind"],
    },
    {
      title: "Mood",
      href: "https://mood-nine-omega.vercel.app",
      description: "A Gen AI-based journaling application",
      imageSrc: "/mood.png",
      imageAlt: "Mood Application",
      tech: ["Next.js", "TypeScript", "Tailwind"],
    },
    {
      title: "College Nexus",
      href: "https://collegenexus.tech",
      description: "A Web Application for College Students",
      imageSrc: "/college-nexus.png",
      imageAlt: "College Nexus Application",
      tech: ["Next.js", "TypeScript", "Tailwind"],
    },
    {
      title: "Music School",
      href: "https://music-school-nextjs-lime-1.vercel.app",
      description: "A Next.js Frontend Application using Aceternity UI",
      imageSrc: "/music-school.png",
      imageAlt: "Music School Application",
      tech: ["Next.js", "TypeScript", "Tailwind"],
    },
  ],
  core: [
    {
      title: "MultiThreaded Proxy Server",
      href: "https://github.com/himanshuraimau/applied-os/tree/main/MultiThreadedProxyServerClient",
      description: "Implemented a robust multi-threaded proxy server and client system in C++. Features include concurrent connection handling, HTTP request forwarding, and efficient thread management.",
      tech: ["C++", "POSIX Threads", "Socket Programming", "HTTP"],
      github: true,
    },
    {
      title: "Cache Implementation",
      href: "https://github.com/himanshuraimau/applied-os/tree/main/cache",
      description: "Memory cache system with LRU implementation",
      tech: ["C++", "Data Structures"],
      github: true,
    },
  ],
}

export default function Page() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-medium text-center mb-4 text-title-color">Web Development Projects</h2>
          <HoverEffect
            items={projects.web.map(project => ({
              title: project.title,
              description: project.description,
              link: project.href,
              imageSrc: project.imageSrc,
              imageAlt: project.imageAlt,
            }))}
          />
        </section>

        <section>
          <h2 className="text-xl font-medium text-center mb-4 text-title-color">Core Computer Science Projects</h2>
          <HoverEffect
            items={projects.core.map(project => ({
              title: project.title,
              description: project.description,
              link: project.href,
            }))}
          />
        </section>
      </div>
    </div>
  )
}

