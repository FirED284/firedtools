import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'FiredTools — Free Developer Tools', template: '%s | FiredTools' },
  description: 'Free online developer tools. JSON formatter, Base64 encoder, Regex tester, Hash generator and more.',
  openGraph: { type: 'website', siteName: 'FiredTools', locale: 'en_US' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXX');` }} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
