import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Your other Next.js configs
}

const withMDX = createMDX({
  // Add markdown plugins here if needed
})

export default withMDX(nextConfig) 