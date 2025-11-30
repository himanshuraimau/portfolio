import { Github, Linkedin, Mail, Twitter, Terminal, ArrowRight, Download } from "lucide-react"
import { SkillsToggle } from "@/components/features/skills-toggle"
import { FadeIn } from "@/components/animations/fade-in"

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <section className="container-custom">
        
        {/* Minimal Header */}
        <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-6">
            <Terminal className="w-3 h-3" />
            <span>~/about</span>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            
          {/* LEFT COL: Bio & Socials */}
          <div className="lg:col-span-7 space-y-12">
            <FadeIn direction="up" delay={0.1}>
                {/* Terminal Window Style Bio */}
                <div className="border border-border rounded-lg bg-card/50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-b border-border">
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                        </div>
                        <div className="text-xs font-mono text-muted-foreground">README.md</div>
                    </div>
                    
                    <div className="p-6 md:p-8 font-mono text-sm leading-relaxed text-muted-foreground space-y-4">
                        <p>
                            <span className="text-primary mr-2">{`>`}</span>
                            Hey, I'm <span className="text-foreground font-bold">Himanshu Rai</span>—a third-year student at Siddaganga Institute of Technology studying AI & Data Science (CGPA: 8.76).
                        </p>
                        <p>
                            I build full-stack web applications and AI-powered systems from the ground up. My work includes <span className="text-foreground">Voltstream</span>, a live-streaming platform with WebRTC and AWS, and <span className="text-foreground">Project0</span>, an AI study platform that converts PDFs and videos into notes, flashcards, and courses using Gemini + OpenAI.
                        </p>
                        <p>
                            I also built <span className="text-foreground">Sonex</span> (self-hosted TTS/VC with PyTorch models), <span className="text-foreground">Uply</span> (distributed monitoring with Redis + Docker), and <span className="text-foreground">Drift</span> (a P2P file system in Go with AES-256 encryption). On the side, I mentor 50+ students as a Technical Workshop Lead and led workshops on GenAI for 40+ participants.
                        </p>
                        <p>
                            Ranked <span className="text-foreground">288/10,000+</span> in Amazon ML Challenge 2025. Won multiple hackathons including WrapSpeed AWS Startup Track and Browse Hyperthon. Actively write technical content at <a href="https://enghimanshu.space" target="_blank" className="text-foreground underline hover:text-primary">enghimanshu.space</a>.
                        </p>
                        <p className="text-foreground">
                           Currently open to remote internship opportunities in full-stack development or AI engineering.
                        </p>
                        <div className="pt-4 flex flex-wrap gap-4">
                             <a href="/resume.pdf" target="_blank" className="inline-flex items-center gap-2 text-foreground border-b border-primary pb-0.5 hover:opacity-80 transition-opacity">
                                <Download className="w-4 h-4" /> Download CV
                             </a>
                             <a href="mailto:himanshuraimau9@gmail.com" className="inline-flex items-center gap-2 text-foreground border-b border-primary pb-0.5 hover:opacity-80 transition-opacity">
                                <Mail className="w-4 h-4" /> Contact Me
                             </a>
                        </div>
                    </div>
                </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
                <h3 className="text-sm font-mono font-bold uppercase text-muted-foreground mb-6 flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> Connect_Nodes
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { icon: Github, label: "GitHub", href: "https://github.com/himanshuraimau" },
                      { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/himanshu-rai-246121278/" },
                      { icon: Twitter, label: "X / Twitter", href: "https://twitter.com/himanshura_i" },
                      { icon: Mail, label: "Email", href: "mailto:himanshuraimau9@gmail.com" }
                    ].map((item) => (
                       <a 
                         key={item.label}
                         href={item.href}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex flex-col items-center justify-center p-4 border border-border rounded bg-muted/10 hover:bg-muted/30 hover:border-primary/50 transition-all group"
                       >
                          <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground mb-3 transition-colors" />
                          <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">{item.label}</span>
                       </a>
                    ))}
                </div>
            </FadeIn>
          </div>

          {/* RIGHT COL: Tech Stack */}
          <div className="lg:col-span-5">
            <FadeIn direction="left" delay={0.3}>
                <div className="sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-mono font-bold">Stack_Trace</h2>
                        <span className="text-xs font-mono text-muted-foreground px-2 py-1 bg-muted rounded">v1.0</span>
                    </div>
                    
                    {/* Reusing your existing Skills Component */}
                    <SkillsToggle />
                    
                    <div className="mt-8 p-4 border border-dashed border-border rounded bg-muted/5">
                        <div className="text-xs font-mono text-muted-foreground mb-2">CURRENT_FOCUS</div>
                        <ul className="space-y-2 text-sm font-mono">
                            <li className="flex items-center gap-2">
                                <ArrowRight className="w-3 h-3 text-primary" />
                                Agentic AI Workflows
                            </li>
                            <li className="flex items-center gap-2">
                                <ArrowRight className="w-3 h-3 text-primary" />
                                System Architecture
                            </li>
                        </ul>
                    </div>
                </div>
            </FadeIn>
          </div>

        </div>
      </section>
    </div>
  )
}