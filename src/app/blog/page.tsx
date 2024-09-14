import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="p-7 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-12 text-teal-400 text-center">Read My Blogs</h1>
      <ul className="space-y-8 max-w-2xl mx-auto">
        {posts.map((post) => (
          <li key={post.slug} className="border-l-4 border-teal-500 pl-6 py-4 transition-all hover:border-teal-400">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-2xl font-semibold text-teal-300 group-hover:text-teal-200 transition-colors">
                {post.metadata.title}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {new Date(post.metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-gray-300 mt-3 group-hover:text-gray-200 transition-colors">
                {post.metadata.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}