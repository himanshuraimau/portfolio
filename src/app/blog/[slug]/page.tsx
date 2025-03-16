import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import type { Metadata } from 'next'

// Import the blog utilities
import { getBlogPost, getRelatedPosts, getBlogPosts, type BlogPost, type RelatedPost } from '@/lib/blog'

// Import MDX components
import { SafeMDXContent } from '@/components/SafeMDXContent'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const slug = params.slug;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }
  
  return {
    title: `${post.title} | Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    }
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Loading component for MDX content
function MDXLoading() {
  return (
    <div className="py-8 text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
      <p className="mt-4 text-muted-foreground">Loading content...</p>
    </div>
  );
}

export default async function BlogPostPage({
  params
}: BlogPostPageProps) {
  const slug = params.slug;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }
  
  const relatedPosts = await getRelatedPosts(slug, post.category);
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="pt-20">
      <article className="container-custom pb-16">
        <div className="mb-8">
          <Button variant="ghost" size="sm" className="mb-6" asChild>
            <Link href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
        
        <div className="max-w-[900px] mx-auto">
          <header className="mb-10">
            <h1 className="heading-lg mb-6 font-playfair">{post.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground text-lg mb-8">
              <time dateTime={post.date}>{formattedDate}</time>
              <span>·</span>
              <span>{post.readingTime} min read</span>
              {post.category && (
                <>
                  <span>·</span>
                  <Link href={`/blog/category/${post.category.toLowerCase()}`} className="hover:text-primary transition-colors">
                    {post.category}
                  </Link>
                </>
              )}
            </div>
            {post.image && (
              <div className="relative w-full aspect-[21/9] mb-12">
                <Image
                  src={post.image}
                  alt={`Cover image for ${post.title}`}
                  fill
                  className="object-cover rounded-xl shadow-lg"
                  priority
                />
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-playfair prose-headings:font-bold prose-img:rounded-lg prose-img:shadow-md prose-img:my-8 prose-h1:mt-0">
            <Suspense fallback={<MDXLoading />}>
              {post.content ? (
                <SafeMDXContent content={post.content} />
              ) : (
                <div className="p-4 border-l-4 border-muted bg-muted/20 rounded-r-lg my-6">
                  <p className="text-muted-foreground">No content available for this post.</p>
                </div>
              )}
            </Suspense>
          </div>

          {/* Author Bio */}
          {post.authorBio && (
            <div className="mt-16 p-6 bg-muted/20 rounded-lg border border-border">
              <div className="flex items-center gap-4 mb-4">
                {post.authorImage && (
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold">{post.author}</h3>
                  <p className="text-muted-foreground">Author</p>
                </div>
              </div>
              <p className="text-muted-foreground">{post.authorBio}</p>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Button key={tag} variant="secondary" size="sm" asChild>
                  <Link href={`/blog/tag/${tag}`}>#{tag}</Link>
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                >
                  {relatedPost.image && (
                    <div className="aspect-video bg-muted overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        width={600}
                        height={340}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      {relatedPost.category}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                      {relatedPost.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}