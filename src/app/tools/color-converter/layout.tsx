import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Color Converter — HEX, RGB, HSL',
  description: 'Convert colors between HEX, RGB, and HSL formats. Includes visual color picker. Free and client-side.',
  openGraph: { title: 'Color Converter | FiredTools', description: 'Free online color format converter' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
