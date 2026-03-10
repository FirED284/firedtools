import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Diff Checker — Compare Two Texts',
  description: 'Compare two text blocks and highlight differences line by line. Free, instant, client-side.',
  openGraph: { title: 'Diff Checker | FiredTools', description: 'Free online text diff checker and comparison tool' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
