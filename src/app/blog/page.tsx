import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Welcome to My MDX Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
              <h2 className="text-xl font-semibold">{post.metadata.title}</h2>
            </Link>
            <p className="text-gray-600">{post.metadata.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}