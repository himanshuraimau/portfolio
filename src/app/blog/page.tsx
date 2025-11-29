import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getBlogPosts, getAllTags } from "@/lib/blog"
import { Metadata } from "next"
import { Terminal, Hash, Calendar, Clock, ArrowRight, FileText, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Engineering Logs | Himanshu Rai",
  description: "Technical deep dives, system architecture notes, and development insights.",
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  const allTags = await getAllTags()
  
  // Sort by date desc
  const sortedPosts = blogPosts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen pt-24 pb-20">
      
      {/* Header Section */}
      <section className="container-custom mb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-6">
            <Terminal className="w-3 h-3" />
            <span>~/blogs</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-mono font-bold tracking-tight mb-6">
            Knowledge <span className="text-muted-foreground">Base</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
             A collection of thoughts on distributed systems, AI engineering, and software architecture.
          </p>
        </div>
      </section>

      <section className="container-custom">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Sidebar / Filters (Desktop) */}
          <div className="lg:col-span-3 space-y-8">
            <div className="p-5 border border-border rounded-lg bg-card/50 backdrop-blur-sm sticky top-24">
              <div className="flex items-center gap-2 mb-4 text-sm font-mono text-muted-foreground">
                <Search className="w-4 h-4" />
                <span>Filter by Tag</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="/blog" 
                  className="text-xs font-mono px-2 py-1 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
                >
                  ./all
                </Link>
                {allTags.map((tag) => (
                  <Link 
                    key={tag} 
                    href={`/blog/tag/${tag}`}
                    className="text-xs font-mono px-2 py-1 bg-muted text-muted-foreground border border-transparent hover:border-border hover:text-foreground rounded transition-all"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Feed */}
          <div className="lg:col-span-9 space-y-6">
            {sortedPosts.map((post, index) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="relative grid md:grid-cols-12 gap-6 p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300">
                  
                  {/* Decorative Index Number */}
                  <div className="absolute -right-4 -top-4 opacity-0 group-hover:opacity-10 transition-opacity text-6xl font-mono font-bold select-none">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>

                  {/* Image Thumbnail (Small & Technical) */}
                  <div className="md:col-span-4 lg:col-span-3">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted border border-border relative">
                       {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <FileText className="w-8 h-8 opacity-20" />
                        </div>
                      )}
                      {/* Scanline overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-xs font-mono text-muted-foreground">
                      <span className="flex items-center gap-1 text-primary">
                        <Terminal className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="w-px h-3 bg-border" />
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="w-px h-3 bg-border" />
                      <span className="flex items-center gap-1">
                         <Clock className="w-3 h-3" />
                         {/* Assuming readingTime exists or default to 5 */}
                         {post.readingTime || 5} min read
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors font-mono tracking-tight">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 mt-auto">
                        <span className="text-xs font-mono font-bold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">
                           Read_File <ArrowRight className="w-3 h-3" />
                        </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            {blogPosts.length === 0 && (
              <div className="p-12 border border-dashed border-border rounded-lg text-center font-mono">
                <Terminal className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-bold mb-2">No Logs Found</h3>
                <p className="text-muted-foreground text-sm">Query returned 0 results.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}