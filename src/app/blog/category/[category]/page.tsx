import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getBlogPosts } from "@/lib/blog"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { FolderOpen, ArrowLeft, Terminal, Calendar, FileText, Hash } from "lucide-react"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = params
  const decodedCategory = decodeURIComponent(category)
  const formattedCategory = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)
  
  return {
    title: `Directory: ${formattedCategory} | Engineering Logs`,
    description: `Technical documentation and logs filed under ${formattedCategory}`,
    openGraph: {
      title: `${formattedCategory} | Engineering Logs`,
      description: `Technical documentation and logs filed under ${formattedCategory}`,
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  const categories = new Set<string>()
  
  posts.forEach(post => {
    if (post.category) {
      categories.add(post.category.toLowerCase())
    }
  })
  
  return Array.from(categories).map(category => ({
    category,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params
  const decodedCategory = decodeURIComponent(category)
  const formattedCategory = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)
  
  const allPosts = await getBlogPosts()
  const posts = allPosts.filter(post => 
    post.category && post.category.toLowerCase() === decodedCategory.toLowerCase()
  )
  
  // Get all unique categories for the filter/navigation sidebar
  const categories = new Set<string>()
  allPosts.forEach(post => {
    if (post.category) {
      categories.add(post.category)
    }
  })
  
  if (!posts.length) {
    notFound()
  }
  
  return (
    <div className="min-h-screen pt-24 pb-20">
      <section className="container-custom mb-16">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-8">
            <Link href="/blog" className="hover:text-primary transition-colors">~/blog</Link>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-primary flex items-center gap-1">
                <FolderOpen className="w-3 h-3" />
                {decodedCategory.toLowerCase()}
            </span>
        </div>

        {/* Header */}
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 flex items-center gap-3">
            <span className="text-primary opacity-50">{`{`}</span>
            {formattedCategory}
            <span className="text-primary opacity-50">{`}`}</span>
          </h1>
          <p className="text-lg text-muted-foreground font-mono">
            {posts.length} file(s) found in this directory.
          </p>
        </div>
      </section>

      <section className="container-custom">
        <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Sidebar / Category Navigation */}
            <div className="lg:col-span-3">
                <div className="sticky top-24 space-y-6">
                    <div className="border border-border rounded-lg p-4 bg-card/50">
                        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                            Subdirectories
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link 
                                href="/blog" 
                                className="text-sm font-mono px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-all text-left flex items-center gap-2"
                            >
                                <Terminal className="w-3 h-3" /> ./all
                            </Link>
                            {Array.from(categories).map((c) => (
                                <Link 
                                    key={c} 
                                    href={`/blog/category/${c.toLowerCase()}`}
                                    className={`text-sm font-mono px-3 py-2 rounded-md transition-all text-left flex items-center gap-2 ${
                                        c.toLowerCase() === decodedCategory.toLowerCase()
                                            ? "bg-primary/10 text-primary font-bold"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                                >
                                    <FolderOpen className="w-3 h-3" /> ./{c.toLowerCase()}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="lg:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all"
                    >
                    <div className="aspect-video bg-muted relative overflow-hidden border-b border-border">
                        {post.image ? (
                        <Image
                            src={post.image}
                            alt={post.title}
                            width={600}
                            height={340}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                        />
                        ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-8 h-8 text-muted-foreground/20" />
                        </div>
                        )}
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                            <span className="text-primary/70">
                                {post.readingTime ? `${post.readingTime}m read` : 'Log entry'}
                            </span>
                        </div>
                        
                        <h3 className="text-xl font-bold font-mono mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                            {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                        {post.tags && post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="flex items-center gap-1 text-[10px] font-mono bg-muted px-2 py-1 rounded text-muted-foreground group-hover:text-foreground transition-colors">
                                <Hash className="w-2 h-2" /> {tag}
                            </span>
                        ))}
                        </div>
                    </div>
                    </Link>
                ))}
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}