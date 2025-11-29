'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { BlogPost } from '@/lib/blog';

// Dynamically import SafeMDXContent with no SSR to avoid React hook issues
const SafeMDXContent = dynamic(() => import('./SafeMDXContent').then(mod => ({ default: mod.SafeMDXContent })), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
      <div className="h-4 bg-muted rounded w-5/6"></div>
      <div className="h-4 bg-muted rounded w-2/3"></div>
    </div>
  )
});

// Static fallback content component
function StaticContent({ post }: { post: BlogPost }) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none px-0 sm:px-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
      <p className="lead text-base sm:text-lg">{post.excerpt}</p>
      <div className="p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 rounded-r-lg my-6">
        <p className="text-amber-700 dark:text-amber-300">
          The full content of this article is available when viewing the live site.
        </p>
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-3">Tags</h3>
          <ul className="flex flex-wrap gap-2 list-none p-0">
            {post.tags.map(tag => (
              <li key={tag} className="px-3 py-1 bg-muted rounded-full text-xs sm:text-sm">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface BlogContentProps {
  post: BlogPost;
  useStaticContent?: boolean;
}

export function BlogContent({ post, useStaticContent = false }: BlogContentProps) {
  // State to track if we're in the browser
  const [isBrowser, setIsBrowser] = useState(false);
  
  // Effect to update isBrowser state once component mounts
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  // Always use the full content when in the browser, regardless of the useStaticContent prop
  // This ensures that even in production, once the page loads in the browser, we show the full content
  if (isBrowser) {
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none w-full">
        <SafeMDXContent content={post.content} />
      </div>
    );
  }
  
  // During SSR, respect the useStaticContent prop
  if (useStaticContent) {
    return <StaticContent post={post} />;
  }
  
  // Fallback for SSR when not using static content
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none w-full">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
      </div>
    </div>
  );
} 