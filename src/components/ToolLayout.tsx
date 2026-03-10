import AdSlot from './AdSlot'
import Link from 'next/link'

interface ToolLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  faqs: { q: string; a: string }[]
}

export default function ToolLayout({ title, description, children, faqs }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-dark-900">
      <header className="border-b border-dark-700 bg-dark-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">fired<span className="text-accent">tools</span></Link>
          <nav className="hidden md:flex gap-6 text-sm text-gray-400">
            <Link href="/tools/json-formatter" className="hover:text-white transition-colors">JSON</Link>
            <Link href="/tools/base64-encoder" className="hover:text-white transition-colors">Base64</Link>
            <Link href="/tools/regex-tester" className="hover:text-white transition-colors">Regex</Link>
            <Link href="/tools/hash-generator" className="hover:text-white transition-colors">Hash</Link>
            <Link href="/tools/jwt-decoder" className="hover:text-white transition-colors">JWT</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400">{description}</p>
        </div>
        <AdSlot slot="top-banner" />
        <div className="my-6">{children}</div>
        <AdSlot slot="bottom-banner" />
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-dark-800 border border-dark-700 rounded-lg p-5">
                <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-dark-700 mt-16 py-8 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} FiredTools — Free developer tools, no signup required.</p>
      </footer>
    </div>
  )
}
