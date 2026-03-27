import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import {
  loadAllMDXFiles,
  getMDXFileBySlug,
  getAllMDXFilePathsFromDir,
} from './mdx-loader'

// Check if we're using Bun
const isBun = process.env.BUN_RUNTIME === '1';

// Custom remark plugin to fix the inTable issue
function remarkFixTables() {
  return (tree, file) => {
    // Initialize the data object to prevent "this.data.inTable" error
    file.data = file.data || {};
    file.data.inTable = false;
    return tree;
  };
}

// Function to convert markdown to simple HTML
function markdownToHtml(markdown: string): string {
  // Very basic markdown to HTML conversion
  const html = markdown
    // Headers
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
    // Bold
    .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*)\*/gm, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/gm, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/gm, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gm, '<a href="$2">$1</a>')
    // Lists
    .replace(/^\s*-\s*(.*)/gm, '<li>$1</li>')
    // Paragraphs
    .replace(/^(?!<[a-z])(.*$)/gm, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '');
  
  return html;
}

export interface BlogPost {
  title: string
  date: string
  category: string
  author: string
  authorImage?: string
  authorBio?: string
  image?: string
  content: any // Changed from string to any to support serialized MDX
  slug: string
  /** First path segment when slug is nested, e.g. `backend` for `backend/intro` */
  section?: string
  excerpt?: string
  readingTime?: number
  description: string
  tags?: string[]
}

export interface RelatedPost {
  title: string
  category: string
  image?: string
  slug: string
  description: string
}

function parseFrontmatterDateISO(date: unknown): string | null {
  if (date == null || date === '') return null
  const d = new Date(String(date))
  if (Number.isNaN(d.getTime())) return null
  return d.toISOString()
}

export function normalizePostImage(image: unknown): string | undefined {
  if (typeof image !== 'string') return undefined
  const t = image.trim()
  if (t.length === 0) return undefined
  // next/image requires an absolute path (leading /) or a full URL
  if (t.startsWith('/') || t.startsWith('http://') || t.startsWith('https://')) {
    return t
  }
  return undefined
}

export function sectionFromSlug(slug: string): string | undefined {
  const i = slug.indexOf('/')
  return i === -1 ? undefined : slug.slice(0, i)
}

export function postPathFromSlug(slug: string): string {
  return `/blog/${slug}`
}

export function getBlogFolders(posts: BlogPost[]): string[] {
  const s = new Set<string>()
  posts.forEach((p) => {
    if (p.section) s.add(p.section)
  })
  return Array.from(s).sort()
}

export function getPostsInFolder(posts: BlogPost[], folder: string): BlogPost[] {
  return posts.filter((p) => p.section === folder)
}

// Add caching for blog posts
const postsCache = new Map<string, BlogPost>();
const allPostsCache = new Map<string, BlogPost[]>();

// Function to get a single blog post
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // Check cache first
    if (postsCache.has(slug)) {
      return postsCache.get(slug) || null;
    }

    const postsDirectory = path.join(process.cwd(), 'content/blog');
    
    // Use optimized MDX loader if Bun is available
    if (isBun) {
      try {
        const mdxFile = await getMDXFileBySlug(postsDirectory, slug);
        
        if (!mdxFile) {
          return null;
        }
        
        const { frontmatter, content } = mdxFile;

        const formattedDate = parseFrontmatterDateISO(frontmatter.date)
        if (!formattedDate) {
          console.warn(`Blog post ${slug} has invalid or missing date`)
          return null
        }
        
        // Calculate reading time (average reading speed: 200 words per minute)
        const wordCount = content.toString().trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);
        
        // Process tags if they exist
        const tags = frontmatter.tags ? 
          (Array.isArray(frontmatter.tags) ? frontmatter.tags : frontmatter.tags.split(',').map((tag: string) => tag.trim())) : 
          [];
        
        // Create the blog post object
        const post: BlogPost = {
          title: frontmatter.title,
          date: formattedDate,
          category: frontmatter.category,
          author: frontmatter.author || 'Anonymous',
          authorImage: frontmatter.authorImage,
          authorBio: frontmatter.authorBio,
          image: normalizePostImage(frontmatter.image),
          content: content,
          slug,
          section: sectionFromSlug(slug),
          excerpt: frontmatter.excerpt || content.toString().substring(0, 150) + '...',
          readingTime,
          description: frontmatter.description || frontmatter.excerpt || content.toString().substring(0, 150) + '...',
          tags
        };
        
        // Cache the result before returning
        postsCache.set(slug, post);
        
        return post;
      } catch (error) {
        console.error(`Error using optimized MDX loader for ${slug}:`, error);
        // Fall back to standard implementation
      }
    }
    
    // Fallback to standard implementation
    const filePath = path.join(postsDirectory, `${slug}.mdx`)
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`File ${filePath} does not exist.`)
      return null
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    const formattedDate = parseFrontmatterDateISO(data.date)
    if (!formattedDate) {
      console.warn(`Blog post ${slug} has invalid or missing date`)
      return null
    }
    
    // Calculate reading time (average reading speed: 200 words per minute)
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    // Process tags if they exist
    const tags = data.tags ? 
      (Array.isArray(data.tags) ? data.tags : data.tags.split(',').map((tag: string) => tag.trim())) : 
      [];
    
    try {
      // Serialize the MDX content for client-side rendering
      const mdxSource = await serialize(content, {
        mdxOptions: {
          remarkPlugins: [
            remarkFixTables,
            [remarkGfm, { singleTilde: false }]
          ],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [rehypePrism, { ignoreMissing: true }]
          ],
          development: process.env.NODE_ENV === 'development',
        },
        scope: data,
      });
      
      const post: BlogPost = {
        title: data.title,
        date: formattedDate,
        category: data.category,
        author: data.author || 'Anonymous',
        authorImage: data.authorImage,
        authorBio: data.authorBio,
        image: normalizePostImage(data.image),
        content: mdxSource,
        slug,
        section: sectionFromSlug(slug),
        excerpt: data.excerpt || content.substring(0, 150) + '...',
        readingTime,
        description: data.description || data.excerpt || content.substring(0, 150) + '...',
        tags
      }
      
      // Cache the result before returning
      postsCache.set(slug, post);
      
      return post
    } catch (mdxError) {
      console.error(`Error serializing MDX for ${slug}:`, mdxError);
      
      // Create a fallback post with HTML content
      // Convert markdown to simple HTML as a fallback
      const htmlContent = markdownToHtml(content);
      
      const post: BlogPost = {
        title: data.title,
        date: formattedDate,
        category: data.category,
        author: data.author || 'Anonymous',
        authorImage: data.authorImage,
        authorBio: data.authorBio,
        image: normalizePostImage(data.image),
        content: htmlContent, // Use HTML content as fallback
        slug,
        section: sectionFromSlug(slug),
        excerpt: data.excerpt || content.substring(0, 150) + '...',
        readingTime,
        description: data.description || data.excerpt || content.substring(0, 150) + '...',
        tags
      }
      
      // Cache the result before returning
      postsCache.set(slug, post);
      
      return post;
    }
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error)
    return null
  }
}

// Function to get related posts
export async function getRelatedPosts(currentSlug: string, currentCategory: string): Promise<RelatedPost[]> {
  try {
    const allPosts = await getBlogPosts()
    return allPosts
      .filter((p) => p.slug !== currentSlug && p.category === currentCategory)
      .slice(0, 2)
      .map((p) => ({
        title: p.title,
        category: p.category,
        image: p.image,
        slug: p.slug,
        description: p.description,
      }))
  } catch (error) {
    console.error(`Error getting related posts for ${currentSlug}:`, error)
    return []
  }
}

// Function to get all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Check cache first (using a cache key for all posts)
    const cacheKey = 'all_posts';
    if (allPostsCache.has(cacheKey)) {
      return allPostsCache.get(cacheKey) || [];
    }

    const postsDirectory = path.join(process.cwd(), 'content/blog')
    
    // Use optimized MDX loader if Bun is available
    if (isBun) {
      const allMdxFiles = await loadAllMDXFiles(postsDirectory);

      const posts = allMdxFiles
        .map((file) => {
          const formattedDate = parseFrontmatterDateISO(file.frontmatter.date)
          if (!formattedDate) {
            console.warn(
              `Skipping blog listing for ${file.slug}: invalid or missing date`
            )
            return null
          }

          const wordCount = file.content.toString().trim().split(/\s+/).length
          const readingTime = Math.ceil(wordCount / 200)

          const tags = file.frontmatter.tags
            ? Array.isArray(file.frontmatter.tags)
              ? file.frontmatter.tags
              : file.frontmatter.tags
                  .split(',')
                  .map((tag: string) => tag.trim())
            : []

          return {
            title: file.frontmatter.title,
            date: formattedDate,
            category: file.frontmatter.category,
            author: file.frontmatter.author || 'Anonymous',
            authorImage: file.frontmatter.authorImage,
            authorBio: file.frontmatter.authorBio,
            excerpt:
              file.frontmatter.excerpt ||
              file.content.toString().substring(0, 150) + '...',
            image: normalizePostImage(file.frontmatter.image),
            content: '',
            slug: file.slug,
            section: sectionFromSlug(file.slug),
            readingTime,
            description:
              file.frontmatter.description ||
              file.frontmatter.excerpt ||
              file.content.toString().substring(0, 150) + '...',
            tags,
          } satisfies BlogPost
        })
        .filter((p): p is BlogPost => p !== null)

      const sortedPosts = posts.sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateB - dateA
      })

      allPostsCache.set(cacheKey, sortedPosts)

      return sortedPosts
    }

    const filePaths = getAllMDXFilePathsFromDir(postsDirectory)

    const posts = await Promise.all(
      filePaths.map(async (filePath) => {
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContent)
        const relativePath = path.relative(postsDirectory, filePath)
        const slug = relativePath.replace(/\.mdx$/, '').replace(/\\/g, '/')

        const formattedDate = parseFrontmatterDateISO(data.date)
        if (!formattedDate) {
          console.warn(
            `Skipping blog listing for ${slug}: invalid or missing date`
          )
          return null
        }

        const tags = data.tags
          ? Array.isArray(data.tags)
            ? data.tags
            : data.tags.split(',').map((tag: string) => tag.trim())
          : []

        return {
          title: data.title,
          date: formattedDate,
          category: data.category,
          author: data.author || 'Anonymous',
          authorImage: data.authorImage,
          authorBio: data.authorBio,
          excerpt: data.excerpt || content.substring(0, 150) + '...',
          image: normalizePostImage(data.image),
          content: '',
          slug,
          section: sectionFromSlug(slug),
          readingTime: Math.ceil(content.trim().split(/\s+/).length / 200),
          description:
            data.description || data.excerpt || content.substring(0, 150) + '...',
          tags,
        } satisfies BlogPost
      })
    )

    const validPosts = posts.filter((p): p is BlogPost => p !== null)

    const sortedPosts = validPosts.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })

    allPostsCache.set(cacheKey, sortedPosts)

    return sortedPosts
  } catch (error) {
    console.error('Error getting blog posts:', error)
    return []
  }
}

// Function to get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const allPosts = await getBlogPosts();
    return allPosts.filter(post => post.tags?.includes(tag));
  } catch (error) {
    console.error(`Error getting posts by tag ${tag}:`, error);
    return [];
  }
}

// Function to get all unique tags
export async function getAllTags(): Promise<string[]> {
  try {
    const allPosts = await getBlogPosts();
    const tagsSet = new Set<string>();
    
    allPosts.forEach(post => {
      post.tags?.forEach(tag => tagsSet.add(tag));
    });
    
    return Array.from(tagsSet).sort();
  } catch (error) {
    console.error('Error getting all tags:', error);
    return [];
  }
}
