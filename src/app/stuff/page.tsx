'use client'

import { useEffect, useState } from "react"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { ExpandableCardDemo } from "@/components/ExpandableCardDemo"

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
      title: "MultiThreadedProxyServerClient with LRU Cache",
      href: "https://github.com/himanshuraimau/applied-os/tree/main/MultiThreadedProxyServerClient",
      description: "Implemented a robust multi-threaded proxy server and client system in C++ with an LRU cache. Features include concurrent connection handling, HTTP request forwarding, and efficient thread management.",
      tech: ["C++", "POSIX Threads", "Socket Programming", "HTTP"],
      github: true,
      ctaLink: "https://github.com/himanshuraimau/applied-os/tree/main/MultiThreadedProxyServerClient",
      ctaText: "View on GitHub",
      content: "Detailed description of the MultiThreaded Proxy Server project...",
    },
    {
      title: "DropBin",
      href: "https://github.com/himanshuraimau/dropBin",
      description: "A small implementation of a paste bin application with minimal features.",
      tech: ["JavaScript", "Node.js", "Express"],
      github: true,
      ctaLink: "https://github.com/himanshuraimau/dropBin",
      ctaText: "View on GitHub",
      content: "Detailed description of the DropBin project...",
    },
    {
      title: "URL Shortener",
      href: "https://github.com/himanshuraimau/url-shortner-go",
      description: "A URL shortener application implemented in Go.",
      tech: ["Go", "Gin", "Redis"],
      github: true,
      ctaLink: "https://github.com/himanshuraimau/url-shortner-go",
      ctaText: "View on GitHub",
      content: "Detailed description of the URL Shortener project...",
    },
    {
      title: "RFA Docker Proxy",
      href: "https://github.com/himanshuraimau/rfa-docker-proxy",
      description: "This project sets up a reverse proxy using Node.js, Express, and Docker. The reverse proxy routes incoming requests based on the subdomain to the appropriate Docker container. Additionally, it includes a management API for handling Docker container operations.",
      tech: ["Node.js", "Express", "Docker"],
      github: true,
      ctaLink: "https://github.com/himanshuraimau/rfa-docker-proxy",
      ctaText: "View on GitHub",
      content: "Detailed description of the RFA Docker Proxy project...",
    },
    {
      title: "RSS Aggregator",
      href: "https://github.com/himanshuraimau/backend_projects/tree/main/rssaggregator",
      description: "A Go application that serves as a fully functional RSS aggregator, interacting with a PostgreSQL database and providing a REST API to manage RSS feeds and retrieve posts.",
      tech: ["Go", "PostgreSQL", "REST API"],
      github: true,
      ctaLink: "https://github.com/himanshuraimau/backend_projects/tree/main/rssaggregator",
      ctaText: "View on GitHub",
      content: "Detailed description of the RSS Aggregator project...",
    },
    {
      title: "YouTube-like Backend Service",
      href: "https://github.com/himanshuraimau/Backend_Project",
      description: "This project is a backend service designed to support a YouTube-like application. It provides various functionalities such as managing users, videos, comments, playlists, subscriptions, tweets, and more.",
      tech: ["Node.js", "Express", "MongoDB"],
      github: true,
      ctaLink: "https://github.com/himanshuraimau/Backend_Project",
      ctaText: "View on GitHub",
      content: "Detailed description of the YouTube-like Backend Service project...",
    },
    {
      title: "Arcfour Project",
      href: "https://github.com/himanshuraimau/c-projects/tree/main/arcfour",
      description: "This project implements the RC4 stream cipher. It includes functions to initialize the cipher, encrypt data, and decrypt data.",
      tech: ["C", "Cryptography"],
      github: true,
      ctaLink: "https://github.com/himanshuraimau/c-projects/tree/main/arcfour",
      ctaText: "View on GitHub",
      content: "Detailed description of the Arcfour project...",
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
          <h2 className="text-xl font-medium text-center mb-4 text-title-color">Web-Based Projects</h2>
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
          <h2 className="text-xl font-medium text-center mb-4 text-title-color">Fun Projects</h2>
          <ExpandableCardDemo cards={projects.core} />
        </section>
      </div>
    </div>
  )
}

