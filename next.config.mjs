import createMDX from '@next/mdx'

const withMDX = createMDX({
  // Add any MDX options here if needed
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Add any other Next.js config options here
}

export default withMDX(nextConfig)