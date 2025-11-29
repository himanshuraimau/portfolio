import { Github, Linkedin, Mail, Twitter, Music, Code, BookOpen, MapPin} from "lucide-react"
import { SkillsToggle } from "@/components/skills-toggle"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerChildren } from "@/components/animations/stagger-children"
import { AnimatedButton } from "@/components/animations/animated-button"

export default function AboutPage() {
  return (
    <div className="pt-12 sm:pt-20">
      <section className="container-custom section-spacing">
        <FadeIn>
          <h1 className="heading-xl mb-8 sm:mb-16 text-center">About Me</h1>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-16 mb-12 sm:mb-16">
          <FadeIn direction="left">
            <div>
              <p className="body-lg mb-4 sm:mb-6">
                Hi, I&apos;m a Full Stack Developer who enjoys building web applications and exploring new technologies.
                I work with modern frameworks and have an interest in DevOps and AI development.
              </p>
              <p className="body-lg mb-6 sm:mb-10">
                Besides coding, I enjoy sharing knowledge through college workshops and helping others learn about
                web development and technology.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">My Interests</h2>
              <StaggerChildren className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-6 sm:mb-10">
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  <span className="text-base sm:text-lg">Programming</span>
                </div>
                <div className="flex items-center gap-3">
                  <Music className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  <span className="text-base sm:text-lg">Singing</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  <span className="text-base sm:text-lg">Teaching</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  <span className="text-base sm:text-lg">Traveling</span>
                </div>
              </StaggerChildren>

              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Get In Touch</h2>
              <StaggerChildren className="flex flex-col gap-3 sm:gap-4">
                <a
                  href="mailto:himanshuraimau9@gmail.com"
                  className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg text-muted-foreground hover:text-foreground group"
                >
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="link-underline truncate">himanshuraimau9@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/himanshu-rai-246121278/"
                  className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg text-muted-foreground hover:text-foreground group"
                >
                  <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="link-underline truncate">linkedin.com/in/himanshu-rai</span>
                </a>
                <a
                  href="https://github.com/himanshuraimau"
                  className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg text-muted-foreground hover:text-foreground group"
                >
                  <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="link-underline truncate">github.com/himanshuraimau</span>
                </a>
                <a
                  href="https://twitter.com/himanshura_i"
                  className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg text-muted-foreground hover:text-foreground group"
                >
                  <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="link-underline truncate">x.com/himanshura_i</span>
                </a>
              </StaggerChildren>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-6">
              {/* Personal images removed */}
              <div className="p-6 bg-muted/30 rounded-lg border border-border">
                <h2 className="text-xl font-bold mb-4">About My Work</h2>
                <p className="mb-4">I enjoy working on various projects that challenge me to learn and grow:</p>
                <StaggerChildren as="ul" className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Full Stack Web Development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>DevOps and Cloud Technologies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>AI and Machine Learning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Teaching and Knowledge Sharing</span>
                  </li>
                </StaggerChildren>
                <p>If you&apos;re interested in collaborating or have any questions, please get in touch!</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Skills Section */}
        <div className="mb-12 sm:mb-16">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 sm:gap-10 md:gap-16">
              <h2 className="heading-xl text-center md:text-left">Skills</h2>
              <div className="w-full overflow-hidden">
                <SkillsToggle />
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-8 sm:mt-10 px-4 sm:px-0">
          <FadeIn direction="up">
            <form className="max-w-2xl mx-auto bg-card p-6 sm:p-8 rounded-lg border border-border">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Send Me a Message</h2>
              <div className="grid gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-base sm:text-lg mb-2 font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full border-b-2 border-input py-2 sm:py-3 text-base sm:text-lg bg-transparent focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-base sm:text-lg mb-2 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full border-b-2 border-input py-2 sm:py-3 text-base sm:text-lg bg-transparent focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-base sm:text-lg mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full border-b-2 border-input py-2 sm:py-3 text-base sm:text-lg bg-transparent focus:outline-none focus:border-primary transition-colors"
                  ></textarea>
                </div>
                <div className="mt-2">
                  <AnimatedButton size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full">
                    Send Message
                  </AnimatedButton>
                </div>
              </div>
            </form>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
