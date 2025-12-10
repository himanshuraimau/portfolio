"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ExternalLink,
    Github,
    Zap,
    Terminal,
    Server,
    Database,
    ArrowUpRight,
} from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
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

interface FeaturedProjectsProps {
    webProjects: Project[];
    deepCSProjects: Project[];
}

export function FeaturedProjects({
    webProjects,
    deepCSProjects,
}: FeaturedProjectsProps) {
    const [activeTab, setActiveTab] = useState<"hosted" | "system">("hosted");

    const displayedProjects =
        activeTab === "hosted" ? webProjects.slice(0, 3) : deepCSProjects.slice(0, 3);

    return (
        <section id="projects" className="container-custom section-spacing">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-primary" />
                        <span className="font-mono text-sm text-primary uppercase tracking-wider">
                            Deployments
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold">Featured Work</h2>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
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

                    <Link
                        href="/projects"
                        className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm ml-4"
                    >
                        /view_all_projects <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
                <AnimatePresence mode="wait">
                    {displayedProjects.map((project, index) => (
                        <FadeIn key={`${activeTab}-${project.id}`} delay={index * 0.1}>
                            {activeTab === "hosted" ? (
                                <div className="group relative h-full bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col">
                                    {/* Image Window */}
                                    <div className="aspect-[16/10] w-full bg-muted relative overflow-hidden border-b border-border">
                                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-20 transition-opacity z-10" />
                                        <Image
                                            src={project.image || "/icons/placeholder.svg"}
                                            alt={project.title}
                                            width={600}
                                            height={400}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-bold font-mono group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                                            {project.description}
                                        </p>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                                            {project.technologies?.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded border border-border/50"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {(project.technologies?.length || 0) > 3 && (
                                                <span className="text-[10px] font-mono text-muted-foreground px-1 py-1">
                                                    +{project.technologies!.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block h-full"
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
                            )}

                        </FadeIn>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-10 text-center md:hidden">
                <AnimatedButton asChild variant="outline" className="w-full">
                    <Link href="/projects">View All Projects</Link>
                </AnimatedButton>
            </div>
        </section>
    );
}

import { AnimatedButton } from "@/components/animations/animated-button";
