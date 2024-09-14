import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import MDXComponents from '@/components/MDXComponents'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const filePath = path.join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  const mdxSource = await compileMDX({
    source: content,
    components: MDXComponents,
    options: { parseFrontmatter: true }
  })

  return {
    slug: realSlug,
    frontmatter: data,
    content: mdxSource,
  }
}

export async function getAllPosts() {
  const slugs = fs.readdirSync(postsDirectory)
  const posts = await Promise.all(slugs.map(slug => getPostBySlug(slug)))

  return posts.sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1))
}