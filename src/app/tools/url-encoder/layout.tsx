import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'URL Encoder & Decoder',
  description: 'Encode and decode URLs and URL components online. Handles special characters and unicode. Free and client-side.',
  openGraph: { title: 'URL Encoder | FiredTools', description: 'Free online URL encoder and decoder' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
