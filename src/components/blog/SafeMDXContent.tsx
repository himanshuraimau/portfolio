'use client';

import React, { useMemo } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Callout from '@/components/common/Callout';

const PrismCode = dynamic(() => import('@/components/common/PrismCode'), { ssr: false });

interface SafeMDXContentProps {
  content: unknown;
}

export function SafeMDXContent({ content }: SafeMDXContentProps) {
  const components = useMemo(() => ({
    // Custom link: Technical underline style
    a: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => {
      const isExternal = href?.startsWith('http');
      const classes = "text-primary font-medium hover:underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-all";
      
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
            {children}
          </a>
        );
      }
      return <Link href={href} className={classes} {...props}>{children}</Link>;
    },
    
    // Images: Added Technical Caption and Border
    img: ({ src, alt, ...props }: { src: string; alt: string }) => (
      <figure className="my-8 group">
        <div className="relative w-full overflow-hidden rounded-lg border border-border bg-muted">
          <Image 
            src={src} 
            alt={alt || ''} 
            width={800} 
            height={500} 
            className="w-full h-auto object-cover"
            {...props}
          />
        </div>
        {alt && (
            <figcaption className="text-center text-xs font-mono text-muted-foreground mt-3 flex items-center justify-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary" />
                {alt}
            </figcaption>
        )}
      </figure>
    ),
    
    // Code blocks
    pre: ({ children, className }: unknown) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'text';
      const code = children?.props?.children || '';
      return <PrismCode code={code} language={language} />;
    },
    
    // Inline code: Terminal style
    code: ({ className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      if (match) return <code className={className} {...props}>{children}</code>;
      return (
        <code 
          className="bg-muted border border-border text-primary px-1.5 py-0.5 rounded text-sm font-mono" 
          {...props}
        >
          {children}
        </code>
      );
    },
    
    // Typography overrides for Mono/Tech aesthetic
    h1: (props: any) => <h1 className="text-3xl sm:text-4xl font-mono font-bold mt-10 mb-6 tracking-tight text-foreground" {...props} />,
    h2: (props: any) => <h2 className="text-2xl sm:text-3xl font-mono font-bold mt-10 mb-5 tracking-tight text-foreground border-b border-border pb-2" {...props} />,
    h3: (props: any) => <h3 className="text-xl sm:text-2xl font-mono font-bold mt-8 mb-4 text-foreground" {...props} />,
    p: (props: any) => <p className="my-4 text-base sm:text-lg leading-7 text-muted-foreground" {...props} />,
    
    // Lists with custom markers
    ul: (props: any) => <ul className="my-4 pl-6 space-y-2 list-disc marker:text-primary" {...props} />,
    ol: (props: any) => <ol className="my-4 pl-6 space-y-2 list-decimal marker:text-primary marker:font-mono" {...props} />,
    li: (props: any) => <li className="pl-1 text-muted-foreground" {...props} />,
    
    // Blockquote: Tech documentation style
    blockquote: (props: any) => (
      <blockquote className="border-l-2 border-primary pl-6 my-6 italic text-muted-foreground bg-muted/10 py-2 pr-4 rounded-r-lg" {...props} />
    ),

    // Table: Data Grid style
    table: (props: any) => (
      <div className="w-full overflow-x-auto my-8 border border-border rounded-lg">
        <table className="w-full text-sm text-left" {...props} />
      </div>
    ),
    thead: (props: any) => <thead className="text-xs font-mono uppercase bg-muted/50 text-muted-foreground" {...props} />,
    th: (props: any) => <th className="px-6 py-3 border-b border-border font-bold" {...props} />,
    td: (props: any) => <td className="px-6 py-4 border-b border-border/50" {...props} />,
    
    Callout,
  }), []);

  if (!content) return null;

  // ... (Keep existing safe render logic from your file, it was good) ...
  try {
    if (typeof content === 'string') {
      return <div className="mdx-content w-full" dangerouslySetInnerHTML={{ __html: content }} />;
    }
    if (React.isValidElement(content)) {
      return <div className="mdx-content w-full">{content}</div>;
    }
    if (content && typeof content === 'object') {
       // @ts-ignore
       return <div className="mdx-content w-full"><MDXRemote {...content} components={components} /></div>;
    }
    return null;
  } catch (error) {
    return <div className="p-4 border border-destructive/50 text-destructive bg-destructive/5 rounded">Error rendering content</div>;
  }
}