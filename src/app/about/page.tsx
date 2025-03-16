import { Github, Linkedin, Mail, Twitter, Music, Code, BookOpen, MapPin } from "lucide-react"
import { SkillsToggle } from "@/components/skills-toggle"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerChildren } from "@/components/animations/stagger-children"
import { ImageReveal } from "@/components/animations/image-reveal"
import { AnimatedButton } from "@/components/animations/animated-button"
import { PhotographyGallery } from "@/components/photography-gallery"

export default function AboutPage() {
  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero Section */}
      <section className="container-custom section-spacing">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <FadeIn>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">About Me</h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6">
                I'm Himanshu Rai, a passionate software engineer with expertise in full-stack development, DevOps practices, and AI engineering.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground">
                With a strong foundation in computer science and a keen interest in emerging technologies, I strive to create innovative solutions that make a positive impact.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-md">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-muted rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-muted rounded-full opacity-50"></div>
              <div className="relative z-10 aspect-square bg-muted rounded-2xl overflow-hidden border border-border">
                <ImageReveal
                  src="/about-image.jpg"
                  alt="Himanshu Rai"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Journey Section */}
      <section className="container-custom section-spacing">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10">My Journey</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              My journey in technology began with a curiosity about how things work. From disassembling electronic devices as a child to writing my first lines of code in high school, I've always been fascinated by the power of technology to transform ideas into reality.
            </p>
            <p>
              After completing my education in Computer Science, I dove headfirst into the world of software development, working on a diverse range of projects that have shaped my technical expertise and problem-solving abilities.
            </p>
            <p>
              Throughout my career, I've had the opportunity to work with talented teams on challenging projects, from building scalable web applications to implementing robust DevOps pipelines and exploring the frontiers of artificial intelligence.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Experience Section */}
      <section className="container-custom section-spacing">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10">Professional Experience</h2>
          <div className="space-y-8">
            {/* Experience items would go here */}
          </div>
        </FadeIn>
      </section>

      {/* Education Section */}
      <section className="container-custom section-spacing">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10">Education</h2>
          <div className="space-y-8">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Bachelor of Technology in Computer Science</h3>
              <p className="text-muted-foreground mb-4">University Name • 2016 - 2020</p>
              <p className="text-base sm:text-lg">
                Graduated with honors, focusing on algorithms, data structures, and software engineering principles. Participated in various hackathons and coding competitions.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Contact Section */}
      <section className="container-custom section-spacing">
        <FadeIn>
          <div className="bg-muted/30 rounded-lg p-6 sm:p-8 md:p-10 border border-border text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Connect</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="mailto:himanshu@enghimanshu.tech" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}

