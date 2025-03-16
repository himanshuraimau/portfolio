import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  title: string
  date: string
  category: string
  author: string
  authorImage?: string
  authorBio?: string
  image?: string
  content: string
  slug: string
  excerpt?: string
  readingTime?: number
  description: string
  tags?: string[]
}

export interface RelatedPost {
  title: string
  slug: string
  category: string
  image?: string
  description?: string
}

// Add caching for blog posts
const postsCache = new Map<string, BlogPost>();

// Function to get a single blog post
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // Check cache first
    if (postsCache.has(slug)) {
      return postsCache.get(slug) || null;
    }

    const postsDirectory = path.join(process.cwd(), 'content/blog')
    const filePath = path.join(postsDirectory, `${slug}.mdx`)
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`File ${filePath} does not exist.`)
      return null
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    console.log(`Frontmatter data for ${slug}:`, data)

    // Calculate reading time (average reading speed: 200 words per minute)
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Cache the result before returning
    postsCache.set(slug, {
      title: data.title,
      date: new Date(data.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      category: data.category,
      author: data.author,
      authorImage: data.authorImage,
      authorBio: data.authorBio,
      image: data.image,
      content,
      slug,
      excerpt: data.excerpt || content.substring(0, 150) + '...',
      readingTime,
      description: data.description || content.substring(0, 150) + '...'
    });

    return postsCache.get(slug) || null;
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error)
    return null
  } finally {
    console.log(`getBlogPost(${slug}) returning:`, postsCache.get(slug) || null)
  }
}

// Add validation for frontmatter
function validateFrontmatter(data: any): boolean {
  const requiredFields = ['title', 'date', 'category', 'author'];
  return requiredFields.every(field => !!data[field]);
}

// Function to get related posts
export async function getRelatedPosts(currentSlug: string, currentCategory: string): Promise<RelatedPost[]> {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/blog')
    const filenames = fs.readdirSync(postsDirectory)
    
    const relatedPosts = filenames
      .filter(filename => {
        const slug = filename.replace(/\.mdx$/, '')
        return slug !== currentSlug
      })
      .map(filename => {
        const filePath = path.join(postsDirectory, filename)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContent)
        const slug = filename.replace(/\.mdx$/, '')
        
        return {
          title: data.title,
          category: data.category,
          image: data.image,
          slug,
          description: data.excerpt || content.substring(0, 150) + '...'
        }
      })
      .filter(post => post.category === currentCategory)
      .slice(0, 2)
    
    return relatedPosts
  } catch (error) {
    console.error(`Error getting related posts for ${currentSlug}:`, error)
    return []
  }
}

// Function to get all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/blog')
    const filenames = fs.readdirSync(postsDirectory)
    
    const posts = filenames.map(filename => {
      // Read file content
      const filePath = path.join(postsDirectory, filename)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      
      // Parse frontmatter
      const { data, content } = matter(fileContent)
      
      // Get slug from filename (remove .mdx extension)
      const slug = filename.replace(/\.mdx$/, '')
      
      return {
        title: data.title,
        date: new Date(data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        category: data.category,
        author: data.author || 'Anonymous',
        excerpt: data.excerpt || content.substring(0, 150) + '...',
        image: data.image,
        content: '', // Don't load full content for listing
        slug,
        readingTime: Math.ceil(content.trim().split(/\s+/).length / 200),
        description: data.description || content.substring(0, 150) + '...'
      }
    })
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })
  } catch (error) {
    console.error('Error getting blog posts:', error)
    return []
  }
}
