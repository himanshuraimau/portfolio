import Link from "next/link"
import Image from "next/image"
import {  Calendar, Clock, User, ChevronRight, Share2, Hash, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getBlogPost, getRelatedPosts, getBlogPosts } from '@/lib/blog'
import { BlogContent } from '@/components/blog/BlogContent'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const slug = await Promise.resolve(params.slug);
  const post = await getBlogPost(slug);
  
  if (!post) return { title: '404 - Not Found' }
  
  return {
    title: `${post.title} | Engineering Log`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : [],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = await Promise.resolve(params.slug);
  const { isEnabled: isDraftMode } = await draftMode();
  const post = await getBlogPost(slug);
  
  if (!post) notFound();
  
  const relatedPosts = await getRelatedPosts(slug, post.category);
  const useStaticContent = process.env.NODE_ENV === 'production' && !isDraftMode;
  
  return (
    <div className="min-h-screen pt-24 pb-20">
      
      {/* Article Header */}
      <div className="container-custom max-w-4xl mb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap">
           <Link href="/blog" className="hover:text-primary transition-colors">~/blog</Link>
           <ChevronRight className="w-3 h-3" />
           <Link href={`/blog/category/${post.category.toLowerCase()}`} className="hover:text-primary transition-colors">{post.category.toLowerCase()}</Link>
           <ChevronRight className="w-3 h-3" />
           <span className="text-foreground">{slug}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-mono font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Metadata Bar */}
        <div className="flex flex-wrap gap-4 md:gap-8 border-y border-border py-4 text-sm font-mono text-muted-foreground bg-muted/20 px-4 rounded-sm">
           <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="text-foreground">{post.author || 'Himanshu Rai'}</span>
           </div>
           <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
           </div>
           <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min read</span>
           </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.image && (
        <div className="container-custom max-w-5xl mb-12">
           <div className="relative aspect-[21/9] rounded-lg overflow-hidden border border-border bg-muted">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10" />
           </div>
        </div>
      )}

      {/* Content */}
      <div className="container-custom max-w-3xl">
        <article className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-mono prose-headings:font-bold prose-code:font-mono prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-border">
          <BlogContent post={post} useStaticContent={useStaticContent} />
        </article>

        {/* Footer / Tags */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
             <div className="flex flex-wrap gap-2">
                {post.tags && post.tags.map((tag: string) => (
                  <Link 
                    key={tag}
                    href={`/blog/tag/${encodeURIComponent(tag)}`}
                    className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Hash className="w-3 h-3" />
                    {tag}
                  </Link>
                ))}
             </div>
             <Button variant="outline" size="sm" className="gap-2 font-mono text-xs">
                <Share2 className="w-3 h-3" /> Share Log
             </Button>
          </div>
        </div>
      </div>

      {/* Related Logs */}
      {relatedPosts.length > 0 && (
        <div className="container-custom max-w-5xl mt-24">
          <h3 className="text-2xl font-mono font-bold mb-8 border-b border-border pb-4">
            Related_Logs
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group p-5 rounded-lg border border-border bg-card hover:border-primary/50 transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-3">
                   <span className="text-xs font-mono text-primary">{relatedPost.category}</span>
                   <ArrowRight className="w-4 h-4 text-muted-foreground -rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
                <h4 className="text-lg font-bold font-mono mb-2 group-hover:text-primary transition-colors">
                  {relatedPost.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {relatedPost.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}