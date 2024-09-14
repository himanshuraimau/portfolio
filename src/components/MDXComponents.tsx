import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const MDXComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl text-green-400 font-bold mt-12 mb-6" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl text-green-300 font-semibold mt-8 mb-4" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl text-green-200 font-medium mt-6 mb-3" {...props}>{children}</h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 text-gray-200 leading-relaxed" {...props}>{children}</p>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className="text-yellow-400 hover:text-yellow-300 transition-colors" {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-colors" {...props}>
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
        className="rounded-lg border border-green-700 my-8 shadow-lg"
        {...props}
      />
    )
  },
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-gray-800 text-green-300 px-1.5 py-0.5 font-mono text-sm" {...props}>{children}</code>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="rounded-lg p-4 bg-gray-800 text-green-100 overflow-x-auto my-6 shadow-md" {...props}>{children}</pre>
  ),
  blockquote: ({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-yellow-500 pl-4 py-2 my-6 italic text-gray-300" {...props}>{children}</blockquote>
  ),
  Callout: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className="text-gray-200 bg-green-900 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg" {...props}>
      {children}
    </div>
  ),
}

export default MDXComponents