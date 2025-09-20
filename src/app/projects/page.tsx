import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

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
    image: "/prompt-portrait.png",
    slug: "prompt-portrait",
    type: "hosted",
    link: "https://potraitprompt.vercel.app/",
  },
  {
    id: 1,
    title: "Sensai-AI-Powered Learning Platform",
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
    image: "/sensai.png",
    slug: "sensai",
    type: "hosted",
    link: "https://sensai-v0-archive.vercel.app/",
  },
  {
    id: 2,
    title: "Affiliate Commission System",
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
    image: "/affiliate.png",
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
    image: "/doodle-verse.png",
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
    image: "/AMA.png",
    slug: "true-feedback",
    type: "hosted",
    link: "https://ama-app-sooty.vercel.app/",
  },
  {
    id: 5,
    title: "Mood",
    description: "A Gen AI-based journaling application",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    image: "/mood.png",
    slug: "mood",
    type: "hosted",
    link: "https://mood-nine-omega.vercel.app",
  },
  {
    id: 6,
    title: "College Nexus",
    description: "A Web Application for College Students",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    image: "/college-nexus.png",
    slug: "college-nexus",
    type: "hosted",
    link: "https://collegenexus.tech",
  },
  {
    id: 7,
    title: "Music School",
    description: "A Next.js Frontend Application using Aceternity UI",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    image: "/music-school.png",
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
    title: "MultiThreadedProxyServerClient with LRU Cache",
    description:
      "Implemented a robust multi-threaded proxy server and client system in C++ with an LRU cache. Features include concurrent connection handling, HTTP request forwarding, and efficient thread management.",
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
    title: "YouTube-like Backend Service",
    description:
      "This project is a backend service designed to support a YouTube-like application.",
    technologies: ["Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/himanshuraimau/Backend_Project",
    type: "github",
  },
  {
    id: 12,
    title: "Arcfour Project",
    description: "This project implements the RC4 stream cipher.",
    technologies: ["C", "Cryptography"],
    githubUrl: "https://github.com/himanshuraimau/c-projects/tree/main/arcfour",
    type: "github",
  },
  {
    id: 13,
    title: "Proxy Connection Project",
    description:
      "This project establishes a connection to a proxy server, sends a request, and forwards data through the proxy.",
    technologies: ["C", "Networking"],
    githubUrl:
      "https://github.com/himanshuraimau/c-projects/tree/main/toralize",
    type: "github",
  },
];

export default function ProjectsPage() {
  // Separate hosted and GitHub-only projects
  const hostedProjects = webProjects;
  const githubProjects = deepCSProjects;

  return (
    <div className="pt-20">
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="heading-xl mb-6">Projects</h1>
          <p className="body-lg text-muted-foreground">
            A showcase of my work, featuring web applications, design projects,
            and experiments.
          </p>
        </div>

        {/* Hosted Projects */}
        <div className="mb-24">
          <h2 className="heading-lg mb-10 relative">
            Web Projects
            <span className="absolute -z-10 text-[8rem] font-bold text-muted/20 -top-16 -left-6 opacity-80">
              01
            </span>
          </h2>

          <div className="grid gap-16 md:gap-24">
            {hostedProjects.map((project, index) => (
              <div key={project.id} className="group">
                <div
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "md:grid-flow-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                    <span className="text-8xl font-bold text-muted/30 group-hover:text-muted/50 transition-colors">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <h2 className="text-4xl font-bold mb-6 -mt-8 group-hover:translate-x-2 transition-transform">
                      {project.title}
                    </h2>
                    <p className="text-xl text-muted-foreground mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={
                        project.link ||
                        `https://project-${project.slug}.example.com`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                    >
                      Visit Project <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <div
                    className={`overflow-hidden rounded-lg ${
                      index % 2 === 1 ? "md:col-start-1" : ""
                    }`}
                  >
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden transition-transform group-hover:scale-105 duration-500">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub-only Projects */}
        <div>
          <h2 className="heading-lg mb-10 relative">
            Deep CS Projects
            <span className="absolute -z-10 text-[8rem] font-bold text-muted/20 -top-16 -left-6 opacity-80">
              02
            </span>
          </h2>

          <p className="text-xl text-muted-foreground mb-10 max-w-3xl">
            These projects focus on computer science fundamentals and systems
            programming. They&apos;re available on GitHub for code review and
            educational purposes.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {githubProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-[16rem]"
              >
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-3 line-clamp-3 text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors mt-auto"
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                      <span>View on GitHub</span>
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
