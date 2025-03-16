import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-8 sm:py-12 mt-10 sm:mt-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          <div>
            <Link href="/" className="font-playfair text-2xl sm:text-3xl font-bold tracking-tight">
              Himanshu<span className="text-muted-foreground">Rai</span>
            </Link>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
              A versatile engineer blending full-stack development, DevOps practices, and AI solutions to create innovative tech experiences.
            </p>
          </div>

          <div className="sm:px-4">
            <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:px-4">
            <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="mailto:himanshu@enghimanshu.tech" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a 
                href="https://linkedin.com/in/himanshurai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a 
                href="https://github.com/himanshurajora" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a 
                href="https://twitter.com/himanshura_i" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-border text-center text-xs sm:text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Himanshu Rai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

