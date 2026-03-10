import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FiredTools — Free Developer Tools Online',
  description: 'Free, fast, client-side developer tools. No signup, no tracking. JSON formatter, Base64, Regex tester, JWT decoder and more.',
}

const tools = [
  { slug: 'json-formatter', name: 'JSON Formatter', desc: 'Prettify or minify JSON instantly', icon: '{}' },
  { slug: 'base64-encoder', name: 'Base64 Encoder', desc: 'Encode and decode Base64 strings', icon: '64' },
  { slug: 'regex-tester', name: 'Regex Tester', desc: 'Test regular expressions with highlights', icon: '.*' },
  { slug: 'url-encoder', name: 'URL Encoder', desc: 'Encode and decode URL components', icon: '%' },
  { slug: 'hash-generator', name: 'Hash Generator', desc: 'Generate MD5, SHA1, SHA256 hashes', icon: '#' },
  { slug: 'color-converter', name: 'Color Converter', desc: 'Convert HEX, RGB, HSL colors', icon: '🎨' },
  { slug: 'cron-generator', name: 'Cron Generator', desc: 'Build cron expressions visually', icon: '⏰' },
  { slug: 'jwt-decoder', name: 'JWT Decoder', desc: 'Decode and inspect JWT tokens', icon: '🔑' },
  { slug: 'markdown-preview', name: 'Markdown Preview', desc: 'Live markdown renderer', icon: 'MD' },
  { slug: 'diff-checker', name: 'Diff Checker', desc: 'Compare two text blocks', icon: '±' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-900">
      <header className="border-b border-dark-700 bg-dark-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white">fired<span className="text-accent">tools</span></h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Developer Tools,<br /><span className="text-accent">Zero Friction</span></h2>
          <p className="text-gray-400 text-xl">Free, fast, client-side. No account required.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map(tool => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`}
              className="bg-dark-800 border border-dark-700 rounded-xl p-5 hover:border-accent hover:bg-dark-700 transition-all group">
              <div className="text-2xl font-mono font-bold text-accent mb-3">{tool.icon}</div>
              <h3 className="text-white font-semibold mb-1 group-hover:text-accent transition-colors">{tool.name}</h3>
              <p className="text-gray-500 text-sm">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </main>
      <footer className="border-t border-dark-700 mt-16 py-8 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} FiredTools — Free developer tools, no signup required.</p>
      </footer>
    </div>
  )
}
