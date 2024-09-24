import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const MDXComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-xl sm:text-2xl md:text-3xl text-black dark:text-white font-mono mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-5 md:mb-6 glow-text" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-lg sm:text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-semibold font-mono mt-6 sm:mt-8 md:mt-10 mb-3 sm:mb-4 md:mb-5 glow-text" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-md sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-3 md:mb-4 glow-text" {...props}>{children}</h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-3 sm:my-4 md:my-5 text-base sm:text-md md:text-lg text-gray-900 dark:text-gray-100 leading-relaxed" {...props}>{children}</p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside my-3 sm:my-4 md:my-5 text-base sm:text-md md:text-lg text-gray-900 dark:text-gray-100 leading-relaxed" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside my-3 sm:my-4 md:my-5 text-base sm:text-md md:text-lg text-gray-900 dark:text-gray-100 leading-relaxed" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="my-1 sm:my-2" {...props}>{children}</li>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className="text-blue-600 dark:text-yellow-300 hover:text-blue-500 dark:hover:text-yellow-200 transition-colors underline" {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-yellow-300 hover:text-blue-500 dark:hover:text-yellow-200 transition-colors underline" {...props}>
        {children}
      </a>
    )
  },
  img: ({ src, alt, width, height, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { width?: string | number, height?: string | number }) => {
    const imgWidth = typeof width === 'string' ? parseInt(width, 10) : width || 800
    const imgHeight = typeof height === 'string' ? parseInt(height, 10) : height || 400
    return (
      <div className="my-6 sm:my-8 md:my-10">
        <Image
          src={src || ''}
          alt={alt || ''}
          width={imgWidth}
          height={imgHeight}
          className="rounded-lg border-2 border-black dark:border-white shadow-lg dark:shadow-white/20 w-full h-auto"
          {...props}
        />
      </div>
    )
  },
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-1.5 sm:px-2 py-0.5 font-mono text-sm sm:text-base" {...props}>{children}</code>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="rounded-lg p-4 sm:p-5 bg-gray-100 dark:bg-gray-900 text-black dark:text-white overflow-x-auto my-4 sm:my-6 md:my-8 shadow-md text-sm sm:text-base" {...props}>{children}</pre>
  ),
  blockquote: ({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-blue-500 dark:border-yellow-400 pl-4 sm:pl-5 py-2 sm:py-3 my-4 sm:my-6 md:my-8 italic text-gray-700 dark:text-gray-200 text-base sm:text-lg" {...props}>{children}</blockquote>
  ),
  Callout: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className="text-base sm:text-lg text-black dark:text-white bg-gray-100 dark:bg-gray-800 border-l-4 border-blue-500 dark:border-yellow-400 p-4 sm:p-5 my-4 sm:my-6 md:my-8 rounded-r-lg shadow-md" {...props}>
      {children}
    </div>
  ),
}

export default MDXComponents
