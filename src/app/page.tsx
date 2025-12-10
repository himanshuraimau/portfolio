import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  Terminal,
  Cpu,
  Layers,
  ChevronRight,
  Zap,
} from "lucide-react";
import { SkillsToggle } from "@/components/features/skills-toggle";
import { FadeIn } from "@/components/animations/fade-in";
import { AnimatedButton } from "@/components/animations/animated-button";
import { HeroSocialBar } from "@/components/social/hero-social-bar";
import { webProjects, deepCSProjects } from "@/lib/projects-data";
import { FeaturedProjects } from "@/components/features/featured-projects";
import { getBlogPosts } from "@/lib/blog";

export default async function HomePage() {
  const posts = await getBlogPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="overflow-hidden bg-background">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center border-b border-border/50">
        {/* --- Background Pattern Start --- */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background">
          {/* Cartesian Grid Pattern */}
          <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          {/* Radial Gradient for Focus (The Glow) */}
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

          {/* Vignette Mask to fade grid at edges */}
          <div className="absolute inset-0 bg-background/0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
        </div>
        {/* --- Background Pattern End --- */}

        <FadeIn direction="up" delay={0.1}>
          <div className="container-custom max-w-5xl mx-auto text-center relative z-10 px-4">
            {/* System Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border/60 bg-muted/20 backdrop-blur-md text-xs font-mono text-muted-foreground mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="tracking-wide uppercase">
                Open to internship opportunities (Remote)
              </span>
            </div>
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6 text-foreground">
              Architecting <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground">
                Intelligent Systems.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
              I am{" "}
              <span className="text-foreground font-medium">Himanshu Rai</span>.
              I build{" "}
              <span className="text-foreground font-medium">
                scalable web applications
              </span>{" "}
              and{" "}
              <span className="text-foreground font-medium">
                intelligent AI systems
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <AnimatedButton
                asChild
                size="lg"
                className="h-12 px-8 text-base shadow-xl shadow-primary/10"
              >
                <Link
                  href="/projects"
                  className="no-underline flex items-center gap-2"
                >
                  View Projects <ChevronRight className="w-4 h-4" />
                </Link>
              </AnimatedButton>
            </div>

            {/* Social Links */}
            <div className="pt-10 opacity-90">
              <HeroSocialBar />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Expertise Marquee / Badges */}
      <div className="w-full border-b border-border bg-muted/10 py-6">
        <div className="container-custom flex flex-wrap justify-center gap-6 md:gap-16 text-muted-foreground font-mono text-xs sm:text-sm tracking-wider">
          <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border/50 shadow-sm">
            <Terminal className="w-4 h-4 text-primary" /> FULL STACK
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border/50 shadow-sm">
            <Cpu className="w-4 h-4 text-primary" /> AI ENGINEERING
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border/50 shadow-sm">
            <Layers className="w-4 h-4 text-primary" /> SYSTEM ARCHITECTURE
          </span>
        </div>
      </div>

      {/* ================= PROJECTS SECTION ================= */}
      <FeaturedProjects
        webProjects={webProjects}
        deepCSProjects={deepCSProjects}
      />

      {/* ================= TECH STACK SECTION ================= */}
      <section className="border-y border-border bg-muted/20 py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute left-0 top-0 opacity-[0.03] pointer-events-none">
          <Terminal size={400} />
        </div>

        <div className="container-custom relative z-10">
          <FadeIn>
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <div className="inline-block p-2 rounded-lg bg-primary/10 mb-4">
                    <Layers className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Technical
                    <br />
                    Arsenal
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    I constantly explore new technologies to find the best tools
                    for solving complex problems. My current stack focuses on
                    scalable web architecture and machine learning pipelines.
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center text-primary font-mono text-sm hover:underline underline-offset-4"
                  >
                    View Full System Profile{" "}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-8 w-full">
                <SkillsToggle />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================= BLOG SECTION ================= */}
      <section className="container-custom section-spacing">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Engineering Logs</h2>
            <p className="text-muted-foreground">
              Thoughts on development, systems, and AI.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex text-sm font-mono border border-border px-4 py-2 rounded hover:bg-muted transition-colors"
          >
            ~/read_all_logs
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {recentPosts.map((post) => (
            <FadeIn key={post.slug} direction="up">
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="md:w-[200px] shrink-0">
                    <span className="text-xs font-mono text-muted-foreground block mb-2">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <div className="inline-block px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-wider font-bold">
                      {post.category}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors font-mono">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-end md:w-[50px]">
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                      <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="text-primary font-medium">
            Read All Logs
          </Link>
        </div>
      </section>
    </div>
  );
}
