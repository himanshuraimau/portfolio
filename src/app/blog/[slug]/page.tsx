import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import type { Metadata } from 'next'

// Import the blog utilities
import { getBlogPost, getRelatedPosts, type BlogPost, type RelatedPost } from '@/lib/blog'

// Import MDX components
import { SafeMDXContent } from '@/components/SafeMDXContent'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for the page
export async function generateMetadata({
  params
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Himanshu Raimau'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: '@himanshuraimau',
    },
  };
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

// Main page component with improved error handling
export default async function BlogPostPage({
  params
}: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  const relatedPosts = await getRelatedPosts(params.slug);

  if (!post) {
    notFound();
  }

  // Log the first part of the content for debugging
  console.log(`Blog post content for ${params.slug} (first 100 chars):`, 
    post.content ? post.content.substring(0, 100) + '...' : 'No content');

  return (
    <article className="container-custom pt-28 pb-16 md:pt-32 md:pb-20">
      {/* Back to Blog */}
      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <div className="max-w-[900px] mx-auto">
        <header className="mb-10">
          <h1 className="heading-lg mb-6 font-playfair">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground text-lg mb-8">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
            <span>·</span>
            <span>{post.readingTime} min read</span>
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
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="mt-20">
          <div className="max-w-[900px] mx-auto">
            <h2 className="heading-md mb-10 font-playfair">Related Posts</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group block"
              >
                <article className="space-y-5">
                  {relatedPost.image && (
                    <div className="aspect-video overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        width={600}
                        height={340}
                        className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-90"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors font-playfair">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}