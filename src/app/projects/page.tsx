import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Terminal, Globe, Server, Database, ArrowUpRight, FolderGit2 } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in"; // Assuming you have this from the home page

// --- DATA PRESERVED FROM YOUR FILE ---
export const webProjects = [
  {
    id: 0,
    title: "Prompt Portrait",
    description:
      "A beautiful AI prompt sharing platform with glassmorphic design, built with Next.js, Drizzle ORM, and AWS integration. Features real-time search, filtering, and social interactions.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Drizzle ORM",
      "PostgreSQL",
      "AWS S3",
      "CloudFront",
    ],
    image: "/projects/prompt-portrait.png",
    slug: "prompt-portrait",
    type: "hosted",
    link: "https://potraitprompt.vercel.app/",
  },
  {
    id: 1,
    title: "Sensai-AI",
    description:
      "A platform that uses AI to provide personalized learning experiences, including quizzes, flashcards, and study plans.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "OpenAI",
    ],
    image: "/projects/sensai.png",
    slug: "sensai",
    type: "hosted",
    link: "https://sensai-v0-archive.vercel.app/",
  },
  {
    id: 2,
    title: "Affiliate System",
    description:
      "A comprehensive platform for managing affiliate partnerships, tracking conversions, processing payments, and analyzing performance.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Node.js",
      "Prisma",
      "PostgreSQL",
    ],
    image: "/projects/affiliate.png",
    slug: "affiliate-commission-system",
    type: "hosted",
    link: "https://affiliate-commission.vercel.app/",
  },
  {
    id: 3,
    title: "DoodleVerse",
    description: "A WebSocket Based Drawing Application",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Socket.io",
      "Node.js",
      "Turborepo",
    ],
    image: "/projects/doodle-verse.png",
    slug: "doodle-verse",
    type: "hosted",
    link: "https://github.com/himanshuraimau/DoodleVerse",
  },
  {
    id: 4,
    title: "True Feedback",
    description:
      "An app that allows users to receive and manage anonymous questions or messages.",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    image: "/projects/AMA.png",
    slug: "true-feedback",
    type: "hosted",
    link: "https://ama-app-sooty.vercel.app/",
  },
  {
    id: 5,
    title: "Mood",
    description: "A Gen AI-based journaling application",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    image: "/projects/mood.png",
    slug: "mood",
    type: "hosted",
    link: "https://mood-nine-omega.vercel.app",
  },
  {
    id: 6,
    title: "College Nexus",
    description: "A Web Application for College Students",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    image: "/projects/college-nexus.png",
    slug: "college-nexus",
    type: "hosted",
    link: "https://collegenexus.tech",
  },
  {
    id: 7,
    title: "Music School",
    description: "A Next.js Frontend Application using Aceternity UI",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    image: "/projects/music-school.png",
    slug: "music-school",
    type: "hosted",
    link: "https://music-school-nextjs-lime-1.vercel.app",
  },
];

export const deepCSProjects = [
  {
    id: 5,
    title: "C-AI Chat Application",
    description:
      "A simple C-based chat application that uses the Gemini Pro API for conversations.",
    technologies: ["C", "libcurl", "json-c", "Python"],
    githubUrl: "https://github.com/himanshuraimau/c-ai",
    type: "github",
  },
  {
    id: 6,
    title: "Proxy Server w/ Cache",
    description:
      "Multi-threaded proxy server in C++ with LRU cache. Features concurrent connection handling and efficient thread management.",
    technologies: ["C++", "POSIX Threads", "Socket Programming", "HTTP"],
    githubUrl:
      "https://github.com/himanshuraimau/applied-os/tree/main/MultiThreadedProxyServerClient",
    type: "github",
  },
  {
    id: 7,
    title: "DropBin",
    description:
      "A small implementation of a paste bin application with minimal features.",
    technologies: ["JavaScript", "Node.js", "Express"],
    githubUrl: "https://github.com/himanshuraimau/dropBin",
    type: "github",
  },
  {
    id: 8,
    title: "URL Shortener",
    description: "A URL shortener application implemented in Go.",
    technologies: ["Go", "Gin", "Redis"],
    githubUrl: "https://github.com/himanshuraimau/url-shortner-go",
    type: "github",
  },
  {
    id: 9,
    title: "RFA Docker Proxy",
    description:
      "This project sets up a reverse proxy using Node.js, Express, and Docker.",
    technologies: ["Node.js", "Express", "Docker"],
    githubUrl: "https://github.com/himanshuraimau/rfa-docker-proxy",
    type: "github",
  },
  {
    id: 10,
    title: "RSS Aggregator",
    description:
      "A Go application that serves as a fully functional RSS aggregator.",
    technologies: ["Go", "PostgreSQL", "REST API"],
    githubUrl:
      "https://github.com/himanshuraimau/backend_projects/tree/main/rssaggregator",
    type: "github",
  },
  {
    id: 11,
    title: "Video Backend Service",
    description:
      "This project is a backend service designed to support a YouTube-like application.",
    technologies: ["Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/himanshuraimau/Backend_Project",
    type: "github",
  },
  {
    id: 12,
    title: "RC4 Cipher",
    description: "This project implements the RC4 stream cipher in C.",
    technologies: ["C", "Cryptography", "Algorithms"],
    githubUrl: "https://github.com/himanshuraimau/c-projects/tree/main/arcfour",
    type: "github",
  },
  {
    id: 13,
    title: "Proxy Connection",
    description:
      "Establishes a connection to a proxy server, sends a request, and forwards data through the proxy.",
    technologies: ["C", "Networking", "TCP/IP"],
    githubUrl:
      "https://github.com/himanshuraimau/c-projects/tree/main/toralize",
    type: "github",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pb-20">
      
      {/* Header Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
         <div className="container-custom">
            <div className="max-w-3xl">
             
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-6">
            <Terminal className="w-3 h-3" />
            <span>~/projects</span>
          </div>
        
              <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tight mb-6">
                Build <span className="text-muted-foreground">Log</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                A collection of deployed applications, system experiments, and engineering challenges.
              </p>
            </div>
         </div>
         {/* Background decoration
         <div className="absolute top-0 right-0 -z-10 opacity-10">
            <Server size={400} strokeWidth={0.5} />
         </div> */}
      </section>

      <section className="container-custom space-y-32">
        
        {/* 01. HOSTED WEB PROJECTS */}
        <div>
          <div className="flex items-baseline gap-4 mb-12 border-b border-border pb-4">
            <h2 className="text-2xl font-mono font-bold flex items-center gap-3">
              <Globe className="w-5 h-5 text-primary" />
              Full Stack & AI
            </h2>
            <span className="text-sm text-muted-foreground font-mono">
              {webProjects.length} Deployed
            </span>
          </div>

          <div className="grid gap-12">
            {webProjects.map((project, index) => (
              <div key={project.id} className="group relative grid md:grid-cols-12 gap-6 md:gap-12 items-center">
                
                {/* Visual Line Connector (Mobile hidden) */}
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-border -z-10 md:left-1/2" />

                {/* Content Side */}
                <div className={`md:col-span-6 relative z-10 ${index % 2 === 1 ? 'md:order-last md:pl-12' : 'md:pr-12'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                      v1.0.{index}
                    </span>
                    <div className="h-px bg-border flex-grow" />
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 font-mono group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs font-mono border border-border rounded bg-muted/30">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                     <Button asChild size="sm" className="gap-2">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          Live Demo <ExternalLink className="w-3 h-3" />
                        </a>
                     </Button>
                     {/* Assuming you might have github links for these later */}
                     {/* <Button variant="ghost" size="sm" asChild>
                        <a href="#" className="gap-2"><Github className="w-4 h-4" /> Code</a>
                     </Button> */}
                  </div>
                </div>

                {/* Image Side */}
                <div className={`md:col-span-6 ${index % 2 === 1 ? 'md:order-first' : ''}`}>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-muted shadow-2xl group-hover:shadow-primary/20 transition-all duration-500">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Scanline overlay effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    
                    {/* Floating Badge */}
                    <div className="absolute -bottom-4 -right-4 bg-background border border-border p-3 rounded-lg shadow-xl hidden md:block group-hover:-translate-y-2 transition-transform duration-300">
                      <ArrowUpRight className="w-6 h-6 text-primary" />
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 02. DEEP CS PROJECTS */}
        <div>
          <div className="flex items-baseline gap-4 mb-12 border-b border-border pb-4">
            <h2 className="text-2xl font-mono font-bold flex items-center gap-3">
              <Terminal className="w-5 h-5 text-primary" />
              Systems & Engineering
            </h2>
            <span className="text-sm text-muted-foreground font-mono">
              {deepCSProjects.length} Repositories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deepCSProjects.map((project) => (
              <a 
                key={project.id} 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="h-full bg-card hover:bg-muted/50 border border-border hover:border-primary/50 rounded-lg p-5 transition-all duration-300 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-muted rounded-md group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {/* Dynamic Icon based on tech hint */}
                      {project.technologies.includes('C') || project.technologies.includes('C++') 
                        ? <Server className="w-5 h-5" /> 
                        : <Database className="w-5 h-5" />
                      }
                    </div>
                    <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>

                  <h3 className="font-mono font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border/50">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.5">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}