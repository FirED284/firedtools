import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder',
  description: 'Encode text to Base64 or decode Base64 strings online. Supports Unicode. Free and client-side.',
  openGraph: { title: 'Base64 Encoder | FiredTools', description: 'Free online Base64 encoder and decoder' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
