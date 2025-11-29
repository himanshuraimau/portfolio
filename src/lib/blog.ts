import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import {  loadAllMDXFiles, getMDXFileBySlug } from './mdx-loader'

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
        
        // Calculate reading time (average reading speed: 200 words per minute)
        const wordCount = content.toString().trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);
        
        // Process tags if they exist
        const tags = frontmatter.tags ? 
          (Array.isArray(frontmatter.tags) ? frontmatter.tags : frontmatter.tags.split(',').map((tag: string) => tag.trim())) : 
          [];
        
        // Format the date
        const formattedDate = new Date(frontmatter.date).toISOString();
        
        // Create the blog post object
        const post: BlogPost = {
          title: frontmatter.title,
          date: formattedDate,
          category: frontmatter.category,
          author: frontmatter.author || 'Anonymous',
          authorImage: frontmatter.authorImage,
          authorBio: frontmatter.authorBio,
          image: frontmatter.image,
          content: content,
          slug,
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
      
      // Format the date
      const formattedDate = new Date(data.date).toISOString();
      
      const post: BlogPost = {
        title: data.title,
        date: formattedDate,
        category: data.category,
        author: data.author || 'Anonymous',
        authorImage: data.authorImage,
        authorBio: data.authorBio,
        image: data.image,
        content: mdxSource,
        slug,
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
      const formattedDate = new Date(data.date).toISOString();
      
      // Convert markdown to simple HTML as a fallback
      const htmlContent = markdownToHtml(content);
      
      const post: BlogPost = {
        title: data.title,
        date: formattedDate,
        category: data.category,
        author: data.author || 'Anonymous',
        authorImage: data.authorImage,
        authorBio: data.authorBio,
        image: data.image,
        content: htmlContent, // Use HTML content as fallback
        slug,
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
    const postsDirectory = path.join(process.cwd(), 'content/blog')
    
    // Use optimized MDX loader if Bun is available
    if (isBun) {
      const allMdxFiles = await loadAllMDXFiles(postsDirectory);
      
      const relatedPosts = allMdxFiles
        .filter(file => file.slug !== currentSlug)
        .map(file => ({
          title: file.frontmatter.title,
          category: file.frontmatter.category,
          image: file.frontmatter.image,
          slug: file.slug,
          description: file.frontmatter.excerpt || file.content.toString().substring(0, 150) + '...'
        }))
        .filter(post => post.category === currentCategory)
        .slice(0, 2);
      
      return relatedPosts;
    }
    
    // Fallback to standard implementation
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
    // Check cache first (using a cache key for all posts)
    const cacheKey = 'all_posts';
    if (allPostsCache.has(cacheKey)) {
      return allPostsCache.get(cacheKey) || [];
    }

    const postsDirectory = path.join(process.cwd(), 'content/blog')
    
    // Use optimized MDX loader if Bun is available
    if (isBun) {
      const allMdxFiles = await loadAllMDXFiles(postsDirectory);
      
      const posts = allMdxFiles.map(file => {
        // Calculate reading time
        const wordCount = file.content.toString().trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);
        
        // Process tags if they exist
        const tags = file.frontmatter.tags ? 
          (Array.isArray(file.frontmatter.tags) ? file.frontmatter.tags : file.frontmatter.tags.split(',').map((tag: string) => tag.trim())) : 
          [];
        
        // Format the date
        const dateObj = new Date(file.frontmatter.date);
        const formattedDate = dateObj.toISOString();
        
        return {
          title: file.frontmatter.title,
          date: formattedDate,
          category: file.frontmatter.category,
          author: file.frontmatter.author || 'Anonymous',
          authorImage: file.frontmatter.authorImage,
          authorBio: file.frontmatter.authorBio,
          excerpt: file.frontmatter.excerpt || file.content.toString().substring(0, 150) + '...',
          image: file.frontmatter.image,
          content: '', // Don't load full content for listing
          slug: file.slug,
          readingTime,
          description: file.frontmatter.description || file.frontmatter.excerpt || file.content.toString().substring(0, 150) + '...',
          tags
        };
      });
      
      // Sort posts by date (newest first)
      const sortedPosts = posts.sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateB - dateA
      });
      
      // Cache the result before returning
      allPostsCache.set(cacheKey, sortedPosts);
      
      return sortedPosts;
    }
    
    // Fallback to standard implementation
    const filenames = fs.readdirSync(postsDirectory)
    
    const posts = await Promise.all(filenames.map(async (filename) => {
      // Read file content
      const filePath = path.join(postsDirectory, filename)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      
      // Parse frontmatter
      const { data, content } = matter(fileContent)
      
      // Get slug from filename (remove .mdx extension)
      const slug = filename.replace(/\.mdx$/, '')
      
      // Process tags if they exist
      const tags = data.tags ? 
        (Array.isArray(data.tags) ? data.tags : data.tags.split(',').map((tag: string) => tag.trim())) : 
        [];

      // Format the date for sorting
      const dateObj = new Date(data.date);
      const formattedDate = dateObj.toISOString();
      const displayDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      return {
        title: data.title,
        date: formattedDate,
        displayDate,
        category: data.category,
        author: data.author || 'Anonymous',
        authorImage: data.authorImage,
        authorBio: data.authorBio,
        excerpt: data.excerpt || content.substring(0, 150) + '...',
        image: data.image,
        content: '', // Don't load full content for listing
        slug,
        readingTime: Math.ceil(content.trim().split(/\s+/).length / 200),
        description: data.description || data.excerpt || content.substring(0, 150) + '...',
        tags
      }
    }))
    
    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    });

    // Cache the result before returning
    allPostsCache.set(cacheKey, sortedPosts);
    
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
