import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getBlogPosts } from "@/lib/blog"
import { Metadata } from "next"
import { notFound } from "next/navigation"

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
    title: `${formattedCategory} Posts | Blog`,
    description: `Articles in the ${formattedCategory} category`,
    openGraph: {
      title: `${formattedCategory} Posts | Blog`,
      description: `Articles in the ${formattedCategory} category`,
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
  
  // Get all unique categories
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
    <div className="pt-20">
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="heading-xl mb-6">{formattedCategory}</h1>
          <p className="body-lg text-muted-foreground">
            Articles in the {formattedCategory} category
          </p>
        </div>
        
        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button variant="outline" size="sm" asChild>
            <Link href="/blog">
              All
            </Link>
          </Button>
          {Array.from(categories).map((c) => (
            <Button 
              key={c} 
              variant="outline" 
              size="sm" 
              asChild
              className={c.toLowerCase() === decodedCategory.toLowerCase() ? "bg-primary text-primary-foreground" : ""}
            >
              <Link href={`/blog/category/${c.toLowerCase()}`}>
                {c}
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
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                        <Link href={`/blog/tag/${tag}`} className="hover:text-primary">
                          #{tag}
                        </Link>
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