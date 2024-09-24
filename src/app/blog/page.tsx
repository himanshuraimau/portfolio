import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8 dark:bg-black">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-mono mb-12  text-center">
          Read My Blogs
        </h1>
        <ul className="space-y-8">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="border-l-4 border-green-300 pl-6  dark:bg-black transition-all hover:border-green-400 rounded-r-lg shadow-md"
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <article>
                  <h2 className="text-xl font-semibold font-mono  group-hover:text-green-400 transition-colors mb-2">
                    {post.metadata.title}
                  </h2>
                  <time
                    dateTime={post.metadata.date}
                    className="text-gray-400 text-sm font-mono block mb-2"
                  >
                    {new Date(post.metadata.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <p className="text-gray-600 font-mono group-hover:text-gray-500 transition-colors">
                    {post.metadata.excerpt}
                  </p>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}