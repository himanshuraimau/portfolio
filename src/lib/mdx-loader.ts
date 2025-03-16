import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

// Check if we're using Bun
const isBun = process.env.BUN_RUNTIME === '1';

// Custom remark plugin to fix the inTable issue
function remarkInitializeData() {
  return (tree, file) => {
    // Initialize the data object to prevent "this.data.inTable" error
    file.data = file.data || {};
    file.data.inTable = false;
    
    // Visit all nodes to ensure data is properly initialized
    function visit(node) {
      if (node.type === 'table') {
        file.data.inTable = true;
      }
      
      if (node.children) {
        node.children.forEach(visit);
      }
    }
    
    visit(tree);
    
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

/**
 * Optimized MDX loader that uses Bun's faster file system operations when available
 */
export async function loadMDXContent(filePath: string) {
  try {
    // Use Bun's faster file system operations if available
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter
    const { data, content: mdxContent } = matter(content);
    
    try {
      // Serialize MDX content for client-side rendering
      const mdxSource = await serialize(mdxContent, {
        mdxOptions: {
          remarkPlugins: [
            remarkInitializeData,
            // Use remark-gfm with specific options to avoid the inTable issue
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
      
      return {
        frontmatter: data,
        content: mdxSource,
      };
    } catch (mdxError) {
      console.error(`Error serializing MDX in loadMDXContent: ${filePath}`, mdxError);
      
      // Fallback to simple HTML conversion
      const htmlContent = markdownToHtml(mdxContent);
      
      return {
        frontmatter: data,
        content: htmlContent,
      };
    }
  } catch (error) {
    console.error(`Error loading MDX file: ${filePath}`, error);
    throw error;
  }
}

/**
 * Load all MDX files from a directory
 */
export async function loadAllMDXFiles(directory: string) {
  const files = fs.readdirSync(directory);
  const mdxFiles = files.filter(file => file.endsWith('.mdx'));
  
  return Promise.all(
    mdxFiles.map(async (file) => {
      const filePath = path.join(directory, file);
      const slug = file.replace(/\.mdx$/, '');
      
      try {
        const { frontmatter, content } = await loadMDXContent(filePath);
        return {
          slug,
          frontmatter,
          content,
        };
      } catch (error) {
        console.error(`Error loading MDX file: ${filePath}`, error);
        return null;
      }
    })
  ).then(results => results.filter(Boolean));
}

/**
 * Get a specific MDX file by slug
 */
export async function getMDXFileBySlug(directory: string, slug: string) {
  const filePath = path.join(directory, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  try {
    const { frontmatter, content } = await loadMDXContent(filePath);
    return {
      slug,
      frontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error loading MDX file: ${filePath}`, error);
    return null;
  }
} 