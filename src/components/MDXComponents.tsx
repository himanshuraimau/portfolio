import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const MDXComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold mt-8 mb-4" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-semibold mt-6 mb-3" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-medium mt-4 mb-2" {...props}>{children}</h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4" {...props}>{children}</p>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className="text-blue-500 hover:underline" {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" {...props}>
        {children}
      </a>
    )
  },
  img: ({ src, alt, width, height, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { width?: string | number, height?: string | number }) => {
    const imgWidth = typeof width === 'string' ? parseInt(width, 10) : width || 800
    const imgHeight = typeof height === 'string' ? parseInt(height, 10) : height || 400
    return (
      <Image
        src={src || ''}
        alt={alt || ''}
        width={imgWidth}
        height={imgHeight}
        className="rounded-lg"
        {...props}
      />
    )
  },
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-gray-100 rounded px-1 py-0.5" {...props}>{children}</code>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-gray-100 rounded p-4 overflow-x-auto my-4" {...props}>{children}</pre>
  ),
  blockquote: ({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-4 italic" {...props}>{children}</blockquote>
  ),
  Callout: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4" {...props}>
      {children}
    </div>
  ),
}

export default MDXComponents