import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'JWT Decoder — Inspect JSON Web Tokens',
  description: 'Decode and inspect JWT tokens. View header, payload, signature and verify expiration. No data leaves your browser.',
  openGraph: { title: 'JWT Decoder | FiredTools', description: 'Free online JWT token decoder and inspector' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
