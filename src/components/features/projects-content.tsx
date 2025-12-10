"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Github,
    ExternalLink,
    Terminal,
    Globe,
    Server,
    Database,
    ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    image?: string;
    slug?: string;
    type: string;
    link?: string;
    githubUrl?: string;
}

interface ProjectsContentProps {
    webProjects: Project[];
    deepCSProjects: Project[];
}

export function ProjectsContent({
    webProjects,
    deepCSProjects,
}: ProjectsContentProps) {
    const [activeTab, setActiveTab] = useState<"hosted" | "system">("hosted");

    return (
        <div className="space-y-12">
            {/* Toggle Section */}
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-border pb-4">
                <div className="flex items-baseline gap-4 mb-4 md:mb-0">
                    <h2 className="text-2xl font-mono font-bold flex items-center gap-3">
                        {activeTab === "hosted" ? (
                            <Globe className="w-5 h-5 text-primary" />
                        ) : (
                            <Terminal className="w-5 h-5 text-primary" />
                        )}
                        {activeTab === "hosted" ? "Full Stack & AI" : "Systems & Engineering"}
                    </h2>
                    <span className="text-sm text-muted-foreground font-mono">
                        {activeTab === "hosted" ? webProjects.length : deepCSProjects.length}{" "}
                        {activeTab === "hosted" ? "Deployed" : "Repositories"}
                    </span>
                </div>

                <div className="flex p-1 bg-muted/30 rounded-lg border border-border">
                    <button
                        onClick={() => setActiveTab("hosted")}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-mono transition-all",
                            activeTab === "hosted"
                                ? "bg-background text-primary shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Deployed
                    </button>
                    <button
                        onClick={() => setActiveTab("system")}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-mono transition-all",
                            activeTab === "system"
                                ? "bg-background text-primary shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        System
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div>
                {activeTab === "hosted" ? (
                    /* 01. HOSTED WEB PROJECTS */
                    <div className="grid gap-12">
                        {webProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="group relative grid md:grid-cols-12 gap-6 md:gap-12 items-center"
                            >
                                {/* Visual Line Connector (Mobile hidden) */}
                                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-border -z-10 md:left-1/2" />

                                {/* Content Side */}
                                <div
                                    className={`md:col-span-6 relative z-10 ${index % 2 === 1 ? "md:order-last md:pl-12" : "md:pr-12"
                                        }`}
                                >
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
                                            <span
                                                key={tech}
                                                className="px-2 py-1 text-xs font-mono border border-border rounded bg-muted/30"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button asChild size="sm" className="gap-2">
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Live Demo <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>

                                {/* Image Side */}
                                <div
                                    className={`md:col-span-6 ${index % 2 === 1 ? "md:order-first" : ""
                                        }`}
                                >
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block relative"
                                    >
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
                ) : (
                    /* 02. DEEP CS PROJECTS */
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
                                            {project.technologies.includes("C") ||
                                                project.technologies.includes("C++") ? (
                                                <Server className="w-5 h-5" />
                                            ) : (
                                                <Database className="w-5 h-5" />
                                            )}
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
                                            <span
                                                key={tech}
                                                className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border/50"
                                            >
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
                )}
            </div>
        </div>
    );
}
