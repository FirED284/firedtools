import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Hash Generator — MD5, SHA1, SHA256',
  description: 'Generate MD5, SHA1, and SHA256 cryptographic hashes online. Uses Web Crypto API. No data sent to servers.',
  openGraph: { title: 'Hash Generator | FiredTools', description: 'Free online MD5, SHA1, SHA256 hash generator' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
