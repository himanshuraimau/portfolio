"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

// Experience data
const experiences = [
  {
    id: 1,
    company: "Tech Innovations Inc.",
    role: "Senior Frontend Developer",
    period: "2023 - Present",
    description:
      "Leading the frontend development team in building modern web applications using React and Next.js. Implemented design systems and improved performance across multiple projects.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    image: "/placeholder.svg?height=120&width=120",
    link: "#",
  },
  {
    id: 2,
    company: "Digital Solutions Co.",
    role: "Full Stack Developer",
    period: "2020 - 2023",
    description:
      "Developed and maintained full-stack applications for clients across various industries. Worked with both frontend and backend technologies to deliver complete solutions.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    image: "/placeholder.svg?height=120&width=120",
    link: "#",
  },
  {
    id: 3,
    company: "WebCraft Agency",
    role: "Frontend Developer",
    period: "2018 - 2020",
    description:
      "Created responsive and accessible websites for clients. Collaborated with designers to implement pixel-perfect interfaces and interactive elements.",
    technologies: ["JavaScript", "HTML", "CSS", "jQuery"],
    image: "/placeholder.svg?height=120&width=120",
    link: "#",
  },
  {
    id: 4,
    company: "Startup Ventures",
    role: "Junior Web Developer",
    period: "2017 - 2018",
    description:
      "Assisted in developing web applications and websites. Gained experience in modern web development practices and collaborative workflows.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP"],
    image: "/placeholder.svg?height=120&width=120",
    link: "#",
  },
]

export function ExperienceTimeline({ limit }: { limit?: number }) {
  // If limit is provided, only show that many experiences
  const displayedExperiences = limit ? experiences.slice(0, limit) : experiences

  return (
    <div className="space-y-16">
      {displayedExperiences.map((experience, index) => (
        <TimelineItem
          key={experience.id}
          experience={experience}
          index={index}
          isLast={index === displayedExperiences.length - 1}
        />
      ))}
    </div>
  )
}

function TimelineItem({
  experience,
  index,
  isLast,
}: {
  experience: (typeof experiences)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <div ref={ref} className="relative">
      {/* Timeline connector */}
      {!isLast && (
        <motion.div
          className="absolute left-[60px] top-[120px] bottom-[-80px] w-px bg-amber-300"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ originY: 0 }}
        />
      )}

      <div className="grid md:grid-cols-[120px_1fr] gap-8">
        {/* Company logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="w-[120px] h-[120px] rounded-lg border border-border overflow-hidden bg-card flex-shrink-0"
        >
          <Image
            src={experience.image || "/placeholder.svg"}
            alt={experience.company}
            width={120}
            height={120}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Experience details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
            <div>
              <h3 className="text-2xl font-bold">{experience.role}</h3>
              <p className="text-xl text-muted-foreground">{experience.company}</p>
            </div>
            <span className="text-amber-600 font-medium">{experience.period}</span>
          </div>

          <p className="mb-6 text-lg">{experience.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {experience.technologies.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>

          <Button asChild variant="default" size="sm" className="bg-amber-500 hover:bg-amber-600 text-white gap-2">
            <a href={experience.link} target="_blank" rel="noopener noreferrer">
              <span>View Work Samples</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

