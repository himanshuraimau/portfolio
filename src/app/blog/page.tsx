import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getBlogPosts, getAllTags } from "@/lib/blog"
import { Metadata } from "next"

// Generate metadata for the page
export const metadata: Metadata = {
  title: "Blog | Himanshu Rai",
  description: "Thoughts, insights, and perspectives on design, development, and the digital landscape.",
  openGraph: {
    title: "Blog | Himanshu Rai",
    description: "Thoughts, insights, and perspectives on design, development, and the digital landscape.",
    type: "website",
  },
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  const allTags = await getAllTags()
  
  return (
    <div className="pt-20">
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="heading-xl mb-6">Blog</h1>
          <p className="body-lg text-muted-foreground">
            Thoughts, insights, and perspectives on design, development, and the digital landscape.
          </p>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button variant="outline" size="sm" asChild>
              <Link href="/blog" className={!blogPosts.length ? "bg-primary text-primary-foreground" : ""}>
                All
              </Link>
            </Button>
            {allTags.map((tag) => (
              <Button key={tag} variant="outline" size="sm" asChild>
                <Link href={`/blog/tag/${tag}`}>
                  {tag}
                </Link>
              </Button>
            ))}
          </div>
        )}

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div className="mb-20">
            <Link href={`/blog/${blogPosts[0].slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {blogPosts[0].category} • {new Date(blogPosts[0].date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-xl text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Read Article
                  </Button>
                </div>
                <div className="order-1 md:order-2">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
                    {blogPosts[0].image ? (
                      <Image
                        src={blogPosts[0].image}
                        alt={blogPosts[0].title}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <span className="text-muted-foreground">No image available</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* All Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
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
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                        #{tag}
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

        {/* No Posts Message */}
        {blogPosts.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">No blog posts found</h2>
            <p className="text-muted-foreground mb-8">Check back later for new content!</p>
          </div>
        )}
      </section>
    </div>
  )
}