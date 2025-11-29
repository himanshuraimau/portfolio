// app/blog/tag/[tag]/page.tsx (Unified design for Tags/Categories)
import Link from "next/link"
import Image from "next/image"
import { getPostsByTag} from "@/lib/blog"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"

export default async function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params
  const decodedTag = decodeURIComponent(tag)
  const posts = await getPostsByTag(decodedTag);
  
  if (!posts.length) notFound()
  
  return (
    <div className="min-h-screen pt-24 pb-20">
      <section className="container-custom mb-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm font-mono transition-colors">
          <ArrowLeft className="w-4 h-4" />
          ../back
        </Link>
        <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">
          <span className="text-primary">#</span>{decodedTag}
        </h1>
        <p className="text-muted-foreground font-mono">
          Found {posts.length} entries tagged with &quot;{decodedTag}&quot;
        </p>
      </section>

      <section className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
             <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all"
            >
              <div className="aspect-video bg-muted relative overflow-hidden">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h3 className="text-xl font-bold font-mono mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                   {post.tags?.slice(0, 3).map(t => (
                     <span key={t} className="text-[10px] font-mono bg-muted px-2 py-1 rounded">#{t}</span>
                   ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}