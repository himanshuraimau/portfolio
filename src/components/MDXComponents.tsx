import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const MDXComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-2xl sm:text-3xl md:text-4xl text-green-400 font-bold mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-5 md:mb-6" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl sm:text-2xl md:text-3xl text-green-300 font-semibold mt-6 sm:mt-7 md:mt-8 mb-3 sm:mb-3.5 md:mb-4" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg sm:text-xl md:text-2xl text-green-200 font-medium mt-4 sm:mt-5 md:mt-6 mb-2 sm:mb-2.5 md:mb-3" {...props}>{children}</h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-3 sm:my-3.5 md:my-4 text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed" {...props}>{children}</p>
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
      <div className="my-4 sm:my-6 md:my-8">
        <Image
          src={src || ''}
          alt={alt || ''}
          width={imgWidth}
          height={imgHeight}
          className="rounded-lg border border-green-700 shadow-lg w-full h-auto"
          {...props}
        />
      </div>
    )
  },
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-gray-800 text-green-300 px-1 sm:px-1.5 py-0.5 font-mono text-xs sm:text-sm" {...props}>{children}</code>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="rounded-lg p-3 sm:p-4 bg-gray-800 text-green-100 overflow-x-auto my-4 sm:my-5 md:my-6 shadow-md text-sm sm:text-base" {...props}>{children}</pre>
  ),
  blockquote: ({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-yellow-500 pl-3 sm:pl-4 py-1 sm:py-2 my-4 sm:my-5 md:my-6 italic text-gray-300 text-sm sm:text-base" {...props}>{children}</blockquote>
  ),
  Callout: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className="text-sm sm:text-base text-gray-200 bg-green-900 border-l-4 border-yellow-500 p-3 sm:p-4 my-4 sm:my-5 md:my-6 rounded-r-lg" {...props}>
      {children}
    </div>
  ),
}

export default MDXComponents