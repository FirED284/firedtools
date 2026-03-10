import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Regex Tester with Match Highlighting',
  description: 'Test regular expressions online with real-time highlighting. Supports all JS regex flags. Free and client-side.',
  openGraph: { title: 'Regex Tester | FiredTools', description: 'Free online regex tester with match highlighting' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
