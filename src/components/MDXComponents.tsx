import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import { highlight } from 'sugar-high';
import Image from 'next/image';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components: MDXComponents = {
  h1: (props: HeadingProps) => (
    <h1 className="font-medium text-3xl pt-12 mb-4 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-2xl text-gray-800 dark:text-gray-200 font-medium mt-8 mb-3" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-xl text-gray-800 dark:text-gray-200 font-medium mt-8 mb-3" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="text-gray-800 dark:text-gray-200 leading-7 mb-4" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="text-gray-800 dark:text-gray-200 list-decimal pl-5 space-y-2 mb-4" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="text-gray-800 dark:text-gray-200 list-disc pl-5 space-y-2 mb-4" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="italic" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = 'text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    if (typeof children === 'string') {
      const codeHTML = highlight(children);
      return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
    }
    return <code {...props}>{children}</code>;
  },
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto mb-4" {...props} />
  ),
  img: (props: ComponentPropsWithoutRef<'img'>) => (
    <div className="relative w-full h-64 my-4">
      <Image
        src={props.src || ''}
        alt={props.alt || ''}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-md"
      />
    </div>
  ),
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {data.headers.map((header, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {data.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic text-gray-700 dark:text-gray-300 my-4"
      {...props}
    />
  ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...components,
  };
}

export default components;