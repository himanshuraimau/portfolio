import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import MDXComponents from '@/components/MDXComponents'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
      <p className="text-gray-600 mb-8 ">{post.frontmatter.date}</p>
      <div className="prose lg:prose-xl">
        <MDXRemote source={post.content} components={MDXComponents} />
      </div>
    </article>
  )
}