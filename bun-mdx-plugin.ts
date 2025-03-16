import type { BunPlugin } from 'bun';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

/**
 * A Bun plugin for optimized MDX processing
 */
export const mdxPlugin: BunPlugin = {
  name: 'mdx-plugin',
  setup(build) {
    // Match .mdx files
    build.onLoad({ filter: /\.mdx$/ }, async (args) => {
      try {
        // Read the file content
        const content = readFileSync(args.path, 'utf8');
        
        // Parse frontmatter
        const { data, content: mdxContent } = matter(content);
        
        // Process MDX content with rehype plugins
        // Note: In a real implementation, you would use a proper MDX processor here
        // This is a simplified version for demonstration
        
        // Return the processed content
        return {
          loader: 'jsx',
          contents: `
            import { MDXContent } from 'next-mdx-remote/rsc';
            
            export const frontmatter = ${JSON.stringify(data)};
            
            export default function MDXPage() {
              return (
                <MDXContent>
                  ${mdxContent}
                </MDXContent>
              );
            }
          `,
        };
      } catch (error) {
        return {
          loader: 'js',
          contents: `
            console.error('Error processing MDX file: ${args.path}', ${JSON.stringify(error.message)});
            export default function ErrorComponent() {
              return <div>Error loading MDX content</div>;
            }
          `,
        };
      }
    });
  },
};

export default mdxPlugin; 