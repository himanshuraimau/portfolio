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
    <div className="pt-20">
      <section className="container-custom section-spacing">
        <FadeIn>
          <h1 className="heading-xl mb-16 text-center">About Me</h1>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <FadeIn direction="left">
            <div>
              <p className="body-lg mb-6">
                Hi, I'm a Full Stack Developer who enjoys building web applications and exploring new technologies.
                I work with modern frameworks and have an interest in DevOps and AI development.
              </p>
              <p className="body-lg mb-10">
                Besides coding, I enjoy sharing knowledge through college workshops and helping others learn about
                web development and technology.
              </p>

              <h2 className="text-2xl font-bold mb-6">My Interests</h2>
              <StaggerChildren className="grid grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-3">
                  <Code className="h-6 w-6 text-primary" />
                  <span className="text-lg">Programming</span>
                </div>
                <div className="flex items-center gap-3">
                  <Music className="h-6 w-6 text-primary" />
                  <span className="text-lg">Singing</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span className="text-lg">Teaching</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span className="text-lg">Traveling</span>
                </div>
              </StaggerChildren>

              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              <StaggerChildren className="flex flex-col gap-4">
                <a
                  href="himanshuraimau9@gmail.com"
                  className="flex items-center gap-4 text-lg text-muted-foreground hover:text-foreground group"
                >
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="link-underline">himanshuraimau9@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/himanshu-rai-246121278/"
                  className="flex items-center gap-4 text-lg text-muted-foreground hover:text-foreground group"
                >
                  <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="link-underline">linkedin.com/in/himanshu-rai</span>
                </a>
                <a
                  href="github.com/himanshuraimau"
                  className="flex items-center gap-4 text-lg text-muted-foreground hover:text-foreground group"
                >
                  <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="link-underline">github.com/himanshuraimau</span>
                </a>
                <a
                  href="https://twitter.com/himanshura_i"
                  className="flex items-center gap-4 text-lg text-muted-foreground hover:text-foreground group"
                >
                  <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="link-underline">x.com/himanshura_i</span>
                </a>
              </StaggerChildren>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden relative">
                    <ImageReveal
                      src={`/images/image${index}.jpeg?height=300&width=300`}
                      alt={`Image ${index}`}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

            {/* <div className="p-6 bg-muted/30 rounded-lg border border-border">
                <h2 className="text-xl font-bold mb-4">Workshop Experience</h2>
                <p className="mb-4">I've conducted over 20 workshops on various topics including:</p>
                <StaggerChildren as="ul" className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Advanced React Patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>TypeScript for JavaScript Developers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Building with Next.js</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Responsive Web Design</span>
                  </li>
                </StaggerChildren>
                <p>If you're interested in having me conduct a workshop for your team or event, please get in touch!</p>
              </div> */}
        </div>
      </FadeIn>
    </div>

        {/* Photography Section */ }
  <div className="mb-20">
    <FadeIn>
      <h2 className="heading-lg mb-8 text-center">Photography</h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        Photography is one of my passions. I enjoy capturing moments and perspectives through my lens, focusing
        primarily on landscapes, architecture, and street photography.
      </p>
      <PhotographyGallery />
    </FadeIn>
  </div>

  {/* Professional Experience Section
        <div id="experience" className="mb-16">
          <FadeIn>
            <h2 className="heading-lg mb-12 text-center">Professional Experience</h2>
          </FadeIn>
          <StaggerChildren staggerTime={0.15}>
            <ExperienceTimeline />
          </StaggerChildren>
        </div> */}

  {/* Skills Section */ }
        <div className="mb-16">
          <FadeIn>
            <div className="grid md:grid-cols-[300px_1fr] gap-16">
              <h2 className="heading-xl">Skills</h2>
              <div>
                <SkillsToggle />
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-10">
          <FadeIn direction="up">
            <form className="max-w-2xl mx-auto bg-card p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-bold mb-6 text-center">Send Me a Message</h2>
              <div className="grid gap-6">
                <div>
                  <label htmlFor="name" className="block text-lg mb-2 font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full border-b-2 border-input py-3 text-lg bg-transparent focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg mb-2 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full border-b-2 border-input py-3 text-lg bg-transparent focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full border-b-2 border-input py-3 text-lg bg-transparent focus:outline-none focus:border-primary transition-colors"
                  ></textarea>
                </div>
                <div>
                  <AnimatedButton size="lg" className="text-lg px-8 w-full md:w-auto">
                    Send Message
                  </AnimatedButton>
                </div>
              </div>
            </form>
          </FadeIn>
        </div>
      </section >
    </div >
  )
}

