import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import MDXComponents from '@/components/MDXComponents'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  return {
    title: post.metadata.title,
    description: post.metadata.description,
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  return (
    <article className="prose prose-lg max-w-none">
      <h1>{post.metadata.title}</h1>
      <MDXRemote source={post.content} components={MDXComponents} />
    </article>
  )
}