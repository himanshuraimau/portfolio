'use client';

import React from 'react';
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
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <h1>{post.title}</h1>
      <p className="lead">{post.excerpt}</p>
      <div className="p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 rounded-r-lg my-6">
        <p className="text-amber-700 dark:text-amber-300">
          The full content of this article is available when viewing the live site.
        </p>
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8">
          <h3>Tags</h3>
          <ul className="flex flex-wrap gap-2 list-none p-0">
            {post.tags.map(tag => (
              <li key={tag} className="px-3 py-1 bg-muted rounded-full text-sm">
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
  // Use static content if specified, otherwise use SafeMDXContent
  if (useStaticContent) {
    return <StaticContent post={post} />;
  }
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <SafeMDXContent content={post.content} />
    </div>
  );
} 