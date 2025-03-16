import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { SkillsToggle } from "@/components/skills-toggle"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerChildren } from "@/components/animations/stagger-children"
import { ImageReveal } from "@/components/animations/image-reveal"
import { AnimatedButton } from "@/components/animations/animated-button"
import { HeroSocialBar } from "@/components/hero-social-bar"
import { webProjects } from "./projects/page"
import { getBlogPosts } from '@/lib/blog';

export default async function HomePage() {
  const featuredProjects = webProjects.filter((project) => project.type === "hosted").slice(0, 3)
  const posts = await getBlogPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero Section */}
      <section className="container-custom section-spacing flex flex-col justify-center min-h-[80vh] sm:min-h-[90vh]">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <FadeIn direction="left" delay={0.2}>
            <div className="space-y-4 sm:space-y-8">
              <div>
                <p className="text-muted-foreground text-base sm:text-lg mb-1 sm:mb-2 font-medium">Hello, I'm</p>
                <h1 className="heading-lg mb-2 sm:mb-4">Himanshu Rai</h1>
                <h2 className="text-base sm:text-lg text-muted-foreground">Full Stack Developer • DevOps Engineer • AI Engineer</h2>
              </div>
              <p className="body-lg text-muted-foreground max-w-md">
                I specialize in building scalable applications, implementing robust DevOps practices, and developing AI solutions to create innovative tech experiences.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <AnimatedButton asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8">
                  <Link href="/about" className="no-underline">About Me</Link>
                </AnimatedButton>
                <AnimatedButton asChild variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8">
                  <Link href="/projects" className="no-underline">View Projects</Link>
                </AnimatedButton>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.4}>
            <div className="relative mx-auto max-w-sm sm:max-w-md md:max-w-lg">
              <div className="absolute -top-6 sm:-top-10 -left-6 sm:-left-10 w-24 sm:w-40 h-24 sm:h-40 bg-muted rounded-full opacity-50"></div>
              <div className="absolute -bottom-6 sm:-bottom-10 -right-6 sm:-right-10 w-32 sm:w-60 h-32 sm:h-60 bg-muted rounded-full opacity-50"></div>
              <div className="relative z-10 aspect-square bg-muted rounded-2xl overflow-hidden border border-border">
                <ImageReveal
                  src="/Cover.jpg?height=600&width=600"
                  alt="Himanshu Rai"
                  width={600}
                  height={600}
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </div>

        <HeroSocialBar />

        <div className="flex justify-center mt-8 sm:mt-16">
          <a href="#projects" className="animate-bounce no-underline">
            <ArrowRight className="h-8 w-8 sm:h-10 sm:w-10 rotate-90 text-muted-foreground" />
          </a>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="container-custom section-spacing">
        <FadeIn>
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8 sm:mb-16">
            <h2 className="heading-lg relative">
              Featured Projects
              <span className="absolute -z-10 text-[6rem] sm:text-[10rem] font-bold text-muted/20 -top-10 sm:-top-20 -left-3 sm:-left-6 opacity-80">02</span>
            </h2>
            <Link href="/projects" className="link-underline text-base sm:text-lg text-muted-foreground mt-4 md:mt-0 no-underline">
              View All Projects
            </Link>
          </div>
        </FadeIn>

        <div className="grid gap-16 sm:gap-24">
          {featuredProjects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.1}>
              <div className="group">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-center">
                  <div>
                    <span className="text-6xl sm:text-8xl font-bold text-muted/30 group-hover:text-muted/50 transition-colors">
                      0{index + 1}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-6 -mt-4 sm:-mt-8 group-hover:translate-x-2 transition-transform">
                      {project.title}
                    </h3>
                    <p className="text-base sm:text-xl text-muted-foreground mb-4 sm:mb-8">
                      {project.description}
                    </p>
                    <a
                      href={project.link || `https://project-${project.slug}.example.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-base sm:text-lg"
                    >
                      Visit Project <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden transition-transform group-hover:scale-105 duration-500">
                      <ImageReveal
                        src={project.image || `/placeholder.svg?height=270&width=480`}
                        alt={project.title}
                        width={480}
                        height={270}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container-custom section-spacing">
        <FadeIn>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-16 items-start">
            <h2 className="heading-xl">Skills</h2>
            <div className="w-full">
              <SkillsToggle />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Recent Blog Posts */}
      <section className="container-custom section-spacing">
        <FadeIn>
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8 sm:mb-16">
            <h2 className="heading-lg relative">
              Recent Articles
              <span className="absolute -z-10 text-[6rem] sm:text-[10rem] font-bold text-muted/20 -top-10 sm:-top-20 -left-3 sm:-left-6 opacity-80">04</span>
            </h2>
            <Link href="/blog" className="link-underline text-base sm:text-lg text-muted-foreground mt-4 md:mt-0">
              View All Articles
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={post.image || `/placeholder.svg?height=200&width=400`}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
              </div>
              <div className="p-4 sm:p-6">
                <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 sm:mb-2">
                  {post.category} • {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}