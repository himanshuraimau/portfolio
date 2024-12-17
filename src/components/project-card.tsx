import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle,CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  href: string
  description: string
  imageSrc?: string
  imageAlt?: string
  tech: string[]
  github?: boolean
}

export function ProjectCard({ title, href, description, imageSrc, imageAlt, tech, github }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-transparent border border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <a href={href} target="_blank" rel="noopener noreferrer" className="block flex flex-col h-full">
        {imageSrc && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image src={imageSrc} alt={imageAlt || title} fill className="object-cover" />
          </div>
        )}
        <CardHeader className="p-2 flex-grow">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            {github && (
              <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            )}
          </div>
          <CardDescription className="text-xs mt-1">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-2 pt-0">
          <div className="flex flex-wrap gap-2">
            {tech.map((item, index) => (
              <Badge key={index} variant="secondary" className="text-[10px] font-normal px-2 py-0.5">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </a>
    </Card>
  )
}