import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Import the blog utilities
import { getBlogPosts, type BlogPost } from '@/lib/blog'

// Generate metadata for the page
export const metadata = {
  title: 'Blog',
  description: 'Thoughts, insights, and perspectives on design, development, and the digital landscape.'
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  
  return (
    <div className="pt-20">
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="heading-xl mb-6">Blog</h1>
          <p className="body-lg text-muted-foreground">
            Thoughts, insights, and perspectives on design, development, and the digital landscape.
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div className="mb-20">
            <Link href={`/blog/${blogPosts[0].slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {blogPosts[0].category} • {blogPosts[0].date}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 group-hover:text-muted-foreground transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-xl text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group-hover:bg-zinc-900 group-hover:text-white transition-colors"
                  >
                    Read Article
                  </Button>
                </div>
                <div className="order-1 md:order-2 overflow-hidden rounded-lg">
                  <div className="aspect-video bg-zinc-200 rounded-lg overflow-hidden">
                    <Image
                      src={blogPosts[0].image || "/api/placeholder/600/400"}
                      alt={blogPosts[0].title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Post Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-muted overflow-hidden">
                <Image
                  src={post.image || "/api/placeholder/400/200"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  {post.category} • {post.date}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}