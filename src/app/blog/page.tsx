import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
              <h2 className="text-xl font-semibold">{post.frontmatter.title}</h2>
            </Link>
            <p className="text-gray-600">{post.frontmatter.date}</p>
            {/* {post.frontmatter.excerpt && (
              <p className="mt-2">{post.frontmatter.excerpt}</p>
            )} */}
          </li>
        ))}
      </ul>
    </div>
  )
}