'use client';

import React, { useMemo } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Import custom components
import Callout from './Callout';

// Dynamically import components that use client-side features
const PrismCode = dynamic(() => import('./PrismCode'), { ssr: false });

interface SafeMDXContentProps {
  content: any; // Support for serialized MDX content
}

export function SafeMDXContent({ content }: SafeMDXContentProps) {
  // Handle empty content
  if (!content) {
    return (
      <div className="p-4 border-l-4 border-muted bg-muted/20 rounded-r-lg my-6">
        <p className="text-muted-foreground">No content available.</p>
      </div>
    );
  }

  // Define custom components for MDX rendering
  const components = useMemo(() => ({
    // Custom link component
    a: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => {
      const isExternal = href?.startsWith('http');
      if (isExternal) {
        return (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline underline-offset-4"
            {...props}
          >
            {children}
          </a>
        );
      }
      return (
        <Link 
          href={href} 
          className="text-primary hover:text-primary/80 underline underline-offset-4"
          {...props}
        >
          {children}
        </Link>
      );
    },
    
    // Custom image component - Updated for better responsiveness
    img: ({ src, alt, ...props }: { src: string; alt: string }) => (
      <div className="my-6">
        <div className="relative w-full max-w-full mx-auto overflow-hidden">
          <Image 
            src={src} 
            alt={alt || ''} 
            width={800} 
            height={500} 
            className="rounded-lg mx-auto w-full h-auto object-cover"
            sizes="(max-width: 480px) 100vw, (max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 800px"
            {...props}
          />
          {alt && <p className="text-center text-xs sm:text-sm text-muted-foreground mt-2">{alt}</p>}
        </div>
      </div>
    ),
    
    // Custom code block component
    pre: ({ children, className, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'text';
      const code = children?.props?.children || '';
      
      return (
        <div className="w-full max-w-full overflow-x-auto">
          <PrismCode code={code} language={language} />
        </div>
      );
    },
    
    // Custom inline code component
    code: ({ className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      
      // If it has a language class, it's a code block and will be handled by the pre component
      if (match) {
        return <code className={className} {...props}>{children}</code>;
      }
      
      // Otherwise it's an inline code element
      return (
        <code 
          className="bg-muted text-primary px-1.5 py-0.5 rounded text-sm font-mono break-words" 
          {...props}
        >
          {children}
        </code>
      );
    },
    
    // Custom heading components for better mobile spacing
    h1: ({ children, ...props }: any) => (
      <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-4" {...props}>{children}</h1>
    ),
    
    h2: ({ children, ...props }: any) => (
      <h2 className="text-2xl sm:text-3xl font-bold mt-8 mb-4" {...props}>{children}</h2>
    ),
    
    h3: ({ children, ...props }: any) => (
      <h3 className="text-xl sm:text-2xl font-bold mt-6 mb-3" {...props}>{children}</h3>
    ),
    
    h4: ({ children, ...props }: any) => (
      <h4 className="text-lg sm:text-xl font-bold mt-6 mb-3" {...props}>{children}</h4>
    ),
    
    // Custom paragraph component
    p: ({ children, ...props }: any) => (
      <p className="my-4 text-base sm:text-lg" {...props}>{children}</p>
    ),
    
    // Custom list components
    ul: ({ children, ...props }: any) => (
      <ul className="my-4 pl-6 list-disc" {...props}>{children}</ul>
    ),
    
    ol: ({ children, ...props }: any) => (
      <ol className="my-4 pl-6 list-decimal" {...props}>{children}</ol>
    ),
    
    li: ({ children, ...props }: any) => (
      <li className="my-2 text-base sm:text-lg" {...props}>{children}</li>
    ),
    
    // Custom blockquote component
    blockquote: ({ children, ...props }: any) => (
      <blockquote 
        className="border-l-4 border-primary pl-4 py-1 my-6 text-base sm:text-lg italic" 
        {...props}
      >
        {children}
      </blockquote>
    ),
    
    // Custom table components for better mobile experience
    table: ({ children, ...props }: any) => (
      <div className="w-full overflow-x-auto my-6">
        <table className="w-full border-collapse" {...props}>{children}</table>
      </div>
    ),
    
    // Custom callout component
    Callout,
  }), []);

  try {
    // Handle different content types
    if (typeof content === 'string') {
      // If content is a string, just render it as HTML
      return (
        <div 
          className="mdx-content prose prose-lg dark:prose-invert max-w-none w-full overflow-x-auto px-0 sm:px-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    
    // If content is a React element, render it directly
    if (React.isValidElement(content)) {
      return (
        <div className="mdx-content prose prose-lg dark:prose-invert max-w-none w-full overflow-x-auto px-0 sm:px-2">
          {content}
        </div>
      );
    }
    
    // If content is a serialized MDX object from next-mdx-remote
    if (content && typeof content === 'object') {
      // Check if it's a fallback content object with compiledSource
      if (content.compiledSource) {
        try {
          return (
            <div className="mdx-content prose prose-lg dark:prose-invert max-w-none w-full overflow-x-auto px-0 sm:px-2">
              <MDXRemote {...content} components={components} />
            </div>
          );
        } catch (mdxRenderError: unknown) {
          console.error('Error rendering MDXRemote with compiledSource:', mdxRenderError);
          
          // If there's a React not defined error, provide a simpler fallback
          if (mdxRenderError instanceof Error && mdxRenderError.message?.includes('React is not defined')) {
            return (
              <div className="mdx-content prose prose-lg dark:prose-invert max-w-none w-full overflow-x-auto px-0 sm:px-2">
                <h1>{content.scope?.title || 'Blog Post'}</h1>
                <p>{content.scope?.excerpt || 'No excerpt available.'}</p>
                <div className="p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 rounded-r-lg my-6">
                  <p className="text-amber-700 dark:text-amber-300">
                    The content couldn't be rendered due to a technical issue. Please try again later.
                  </p>
                </div>
              </div>
            );
          }
          
          // Re-throw for other errors
          throw mdxRenderError;
        }
      }
      
      // For other object types, try to render as MDXRemote
      try {
        return (
          <div className="mdx-content prose prose-lg dark:prose-invert max-w-none w-full overflow-x-auto px-0 sm:px-2">
            <MDXRemote {...content} components={components} />
          </div>
        );
      } catch (mdxError) {
        console.error('Error rendering MDXRemote:', mdxError);
        
        // Fallback to displaying frontmatter content
        if (content.frontmatter) {
          return (
            <div className="mdx-content prose prose-lg dark:prose-invert max-w-none w-full overflow-x-auto px-0 sm:px-2">
              <h1>{content.frontmatter.title}</h1>
              <p>{content.frontmatter.excerpt || 'No excerpt available.'}</p>
              <div className="p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 rounded-r-lg my-6">
                <p className="text-amber-700 dark:text-amber-300">
                  The full content couldn't be rendered. Please try again later.
                </p>
              </div>
            </div>
          );
        }
      }
    }
    
    // Fallback for unknown content types
    return (
      <div className="p-4 border-l-4 border-muted bg-muted/20 rounded-r-lg my-6">
        <p className="text-muted-foreground">Content format not supported.</p>
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
            {typeof content === 'string' 
              ? content.substring(0, 500) 
              : JSON.stringify(content, null, 2).substring(0, 500)}
            {(typeof content === 'string' 
              ? content.length 
              : JSON.stringify(content, null, 2).length) > 500 ? '...' : ''}
          </pre>
        </div>
      </div>
    );
  }
} 