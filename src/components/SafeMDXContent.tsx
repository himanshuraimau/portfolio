// A comprehensive MDX content renderer with error handling and styling
import { MDXRemote } from 'next-mdx-remote/rsc';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import Link from 'next/link';
import Image from 'next/image';

interface SafeMDXContentProps {
  content: string;
}

// Define custom components for MDX rendering
const components = {
  a: ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 underline underline-offset-4"
        >
          {children}
        </a>
      );
    }
    return (
      <Link 
        href={href} 
        className="text-primary hover:text-primary/80 underline underline-offset-4"
      >
        {children}
      </Link>
    );
  },
  img: ({ src, alt }: { src: string; alt: string }) => (
    <div className="my-6">
      <div className="relative w-full max-w-2xl mx-auto">
        <Image 
          src={src} 
          alt={alt || ''} 
          width={800} 
          height={500} 
          className="rounded-lg mx-auto w-full h-auto object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 800px"
        />
        {alt && <p className="text-center text-sm text-muted-foreground mt-2">{alt}</p>}
      </div>
    </div>
  ),
  // Other components are handled by the default Tailwind prose styling
};

export async function SafeMDXContent({ content }: SafeMDXContentProps) {
  if (!content) {
    return (
      <div className="p-4 border-l-4 border-muted bg-muted/20 rounded-r-lg my-6">
        <p className="text-muted-foreground">No content available.</p>
      </div>
    );
  }

  try {
    // Serialize the MDX content with enhanced options
    await serialize(content, {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }]
        ],
        format: 'mdx',
        development: false
      },
      parseFrontmatter: true
    });

    // Return the MDXRemote component with custom components
    return (
      <div className="mdx-content prose prose-lg md:prose-xl dark:prose-invert max-w-none w-full overflow-x-hidden">
        <MDXRemote 
          source={content} 
          components={components} 
        />
      </div>
    );
  } catch (error) {
    console.error('Error in SafeMDXContent:', error);
    
    // Return a fallback component with error details
    return (
      <div className="p-4 border-l-4 border-destructive bg-destructive/10 rounded-r-lg my-6">
        <h3 className="text-xl font-bold text-destructive mb-2">Error Rendering Content</h3>
        <p className="text-destructive/80">
          There was an error rendering the content. Please try again later.
        </p>
        <details className="mt-4">
          <summary className="cursor-pointer text-sm">Error details</summary>
          <pre className="mt-2 p-2 bg-muted/20 rounded text-xs overflow-auto">
            {(error as Error).message}
          </pre>
        </details>
        
        {/* Display the raw content as a fallback */}
        <div className="mt-6 p-4 bg-muted/20 rounded">
          <h4 className="text-lg font-semibold mb-2">Raw Content:</h4>
          <pre className="whitespace-pre-wrap text-sm overflow-x-auto">
            {content.substring(0, 500)}
            {content.length > 500 ? '...' : ''}
          </pre>
        </div>
      </div>
    );
  }
} 