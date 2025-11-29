import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight, FileText, Terminal } from "lucide-react"

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
  readTime?: number;
  image?: string;
  tags?: string[];
  index?: number; // Optional index for decorative numbering
}

export function BlogCard({ 
  title, 
  excerpt, 
  slug, 
  category, 
  date,  
  image, 
  tags,
  index 
}: BlogCardProps) {
  return (
    <Link 
      href={`/blog/${slug}`}
      className="group block h-full"
    >
      <article className="relative h-full flex flex-col p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden">
        
        {/* Decorative Index Number (if provided) */}
        {index !== undefined && (
          <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-10 transition-opacity text-8xl font-mono font-bold select-none pointer-events-none">
            {(index + 1).toString().padStart(2, '0')}
          </div>
        )}

        {/* Image Thumbnail */}
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted border border-border relative mb-5">
            {image ? (
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                <FileText className="w-12 h-12" />
            </div>
            )}
            {/* Tech Scanline Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow z-10">
            {/* Meta Header */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground mb-3">
                <span className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-0.5 rounded">
                    <Terminal className="w-3 h-3" />
                    {category}
                </span>
                <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
            </div>

            <h3 className="text-xl font-bold mb-3 font-mono group-hover:text-primary transition-colors leading-tight">
                {title}
            </h3>
            
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed flex-grow">
                {excerpt}
            </p>

            {/* Footer / Read More */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                <div className="flex gap-2">
                    {tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                            #{tag}
                        </span>
                    ))}
                </div>
                <span className="text-xs font-mono font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read_Log <ArrowRight className="w-3 h-3" />
                </span>
            </div>
        </div>
      </article>
    </Link>
  );
}