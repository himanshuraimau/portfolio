import createMDX from '@next/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

// Check if we're using Bun
const isBun = process.env.BUN_RUNTIME === '1';

// Custom remark plugin to fix the inTable issue
function remarkInitializeData() {
  return (tree, file) => {
    // Initialize the data object to prevent "this.data.inTable" error
    file.data = file.data || {};
    file.data.inTable = false;
    
    // Visit all nodes to ensure data is properly initialized
    function visit(node) {
      if (node.type === 'table') {
        file.data.inTable = true;
      }
      
      if (node.children) {
        node.children.forEach(visit);
      }
    }
    
    visit(tree);
    
    return tree;
  };
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkInitializeData,
      [remarkGfm, { singleTilde: false }]
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrism, { ignoreMissing: true }]
    ],
    providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ['placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  // Move transpilePackages from experimental to root config
  ...(isBun ? {
    transpilePackages: ['next-mdx-remote'],
  } : {}),
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    // Use Bun for faster builds if available
    ...(isBun ? {
      optimizePackageImports: ['next-mdx-remote', 'rehype-slug', 'rehype-autolink-headings', 'rehype-prism-plus'],
    } : {}),
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Configure webpack to use polling instead of file system events
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // Delay the rebuild after the first change
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.next/**',
          '**/build/**',
          '**/dist/**',
          '**/public/**',
        ]
      }
    }
    return config
  },
}

export default withMDX(nextConfig)