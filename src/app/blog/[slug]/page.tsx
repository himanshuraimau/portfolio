import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'

// Import the blog utilities
import { getBlogPost, getRelatedPosts, getBlogPosts, type BlogPost, type RelatedPost } from '@/lib/blog'

// Import the BlogContent client component
import { BlogContent } from '@/components/BlogContent'

// Import the blog card component
import { BlogCard } from '@/components/BlogCard'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  // Ensure params.slug is properly awaited
  const slug = await Promise.resolve(params.slug);
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    // Ensure params.slug is properly awaited
    const slug = await Promise.resolve(params.slug);
    
    // Check if we're in draft mode (for development)
    const { isEnabled: isDraftMode } = await draftMode();
    
    // Get the blog post data
    const post = await getBlogPost(slug);
    
    // If post doesn't exist, return a 404 page
    if (!post) {
      notFound();
    }
    
    // Get related posts
    const relatedPosts = await getRelatedPosts(slug, post.category);
    
    // Format the date for display
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Determine if we should use static content during build
    // This is a workaround for the React hooks issue during static site generation
    const useStaticContent = process.env.NODE_ENV === 'production' && !isDraftMode;
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="mb-12">
          {/* Blog post header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Link 
                href="/blog"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                href={`/blog/category/${encodeURIComponent(post.category.toLowerCase())}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {post.category}
              </Link>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {formattedDate}
                </time>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
            
            {post.image && (
              <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  priority
                />
              </div>
            )}
          </div>
          
          {/* Blog post content */}
          <BlogContent post={post} useStaticContent={useStaticContent} />
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Link 
                    key={tag}
                    href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                    className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Author info */}
          <div className="mt-12 p-6 bg-muted/20 rounded-lg">
            <div className="flex items-center gap-4">
              {post.authorImage ? (
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              ) : (
                <div className="w-[60px] h-[60px] bg-muted rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              
              <div>
                <h3 className="font-semibold text-lg">{post.author}</h3>
                <p className="text-muted-foreground text-sm">{post.authorBio || 'Author'}</p>
              </div>
            </div>
          </div>
        </article>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.slug}
                  title={relatedPost.title}
                  description={relatedPost.description}
                  slug={relatedPost.slug}
                  category={relatedPost.category}
                  image={relatedPost.image}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error(`Error rendering blog post page for slug: ${params.slug}`, error);
    
    // Return a fallback error page
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link 
            href="/blog"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
        
        <div className="p-6 border-l-4 border-destructive bg-destructive/10 rounded-r-lg my-6">
          <h1 className="text-2xl font-bold mb-4">Error Loading Blog Post</h1>
          <p className="mb-4">
            We encountered an error while trying to load this blog post. Please try again later or check out our other blog posts.
          </p>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }
}