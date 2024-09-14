import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="p-7 text-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-12 text-green-300 text-center">Read My Blogs</h1>
      <ul className="space-y-8 max-w-2xl mx-auto">
        {posts.map((post) => (
          <li key={post.slug} className="border-l-3 border-green-300 pl-4 py-1 transition-all hover:border-green-400">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-lg font-semibold text-green-300 group-hover:text-teal-200 transition-colors">
                {post.metadata.title}
              </h2>
              <p className="text-gray-400 text-sm ">
                {new Date(post.metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-gray-300 mt-1 group-hover:text-gray-200 transition-colors">
                {post.metadata.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}