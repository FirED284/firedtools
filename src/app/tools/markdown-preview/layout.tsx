import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Markdown Preview — Live Renderer',
  description: 'Preview markdown in real-time. Supports GFM, tables, code blocks. Free and client-side.',
  openGraph: { title: 'Markdown Preview | FiredTools', description: 'Free online live markdown renderer' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
