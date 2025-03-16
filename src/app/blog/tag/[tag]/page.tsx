import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getPostsByTag, getAllTags } from "@/lib/blog"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = params
  const decodedTag = decodeURIComponent(tag)
  
  return {
    title: `${decodedTag} Posts | Blog`,
    description: `Articles tagged with ${decodedTag}`,
    openGraph: {
      title: `${decodedTag} Posts | Blog`,
      description: `Articles tagged with ${decodedTag}`,
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  
  return tags.map((tag) => ({
    tag,
  }))
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = params
  const decodedTag = decodeURIComponent(tag)
  const posts = await getPostsByTag(decodedTag)
  const allTags = await getAllTags()
  
  if (!posts.length) {
    notFound()
  }
  
  return (
    <div className="pt-20">
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="heading-xl mb-6">#{decodedTag}</h1>
          <p className="body-lg text-muted-foreground">
            Articles tagged with "{decodedTag}"
          </p>
        </div>
        
        {/* Tags Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button variant="outline" size="sm" asChild>
            <Link href="/blog">
              All
            </Link>
          </Button>
          {allTags.map((t) => (
            <Button 
              key={t} 
              variant="outline" 
              size="sm" 
              asChild
              className={t === decodedTag ? "bg-primary text-primary-foreground" : ""}
            >
              <Link href={`/blog/tag/${t}`}>
                {t}
              </Link>
            </Button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-muted overflow-hidden">
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
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
                  {post.category} • {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((t) => (
                      <span 
                        key={t} 
                        className={`text-xs px-2 py-1 rounded-full ${
                          t === decodedTag 
                            ? "bg-primary/20 text-primary" 
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        #{t}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
} 