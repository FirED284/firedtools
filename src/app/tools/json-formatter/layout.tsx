import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'JSON Formatter & Validator',
  description: 'Format, prettify, validate and minify JSON online. Free, instant, client-side.',
  openGraph: { title: 'JSON Formatter | FiredTools', description: 'Free online JSON formatter and validator' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
