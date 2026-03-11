import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'FiredTools — Free Developer Tools', template: '%s | FiredTools' },
  description: 'Free online developer tools. JSON formatter, Base64 encoder, Regex tester, Hash generator and more.',
  openGraph: { type: 'website', siteName: 'FiredTools', locale: 'en_US' },
  verification: { other: { 'msvalidate.01': 'D334637F7320918BF75090F0EC5DDA87' } },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LF8B20GMKV" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-LF8B20GMKV');` }} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1862812082553841" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
