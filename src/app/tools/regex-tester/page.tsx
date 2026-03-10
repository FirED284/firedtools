'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

const META = {
  title: 'Regex Tester with Match Highlighting',
  description: 'Test regular expressions online with real-time match highlighting. Supports flags g, i, m. Free and client-side.',
  faqs: [
    { q: 'What regex flavors are supported?', a: 'This tool uses JavaScript\'s built-in RegExp engine, supporting standard regex syntax including lookaheads, lookbehinds, named groups, and all standard character classes.' },
    { q: 'What do the flags mean?', a: 'g=global (find all matches), i=case insensitive, m=multiline (^ and $ match line starts/ends), s=dotAll (. matches newlines).' },
    { q: 'How do I test named capture groups?', a: 'Use the (?<name>...) syntax. Named groups appear in the match details panel with their group names for easy identification.' },
  ],
}

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testStr, setTestStr] = useState('')
  const [matches, setMatches] = useState<RegExpMatchArray[]>([])
  const [error, setError] = useState('')

  const test = () => {
    if (!pattern) return
    try {
      const globalFlags = flags.includes('g') ? flags : flags+'g'
      const m = [...testStr.matchAll(new RegExp(pattern, globalFlags))]
      setMatches(m); setError('')
    } catch (e: unknown) { setError((e as Error).message); setMatches([]) }
  }

  const highlight = () => {
    if (!pattern || !testStr) return <span className="text-gray-400">{testStr || 'Test string will appear here...'}</span>
    try {
      const globalFlags = flags.includes('g') ? flags : flags+'g'
      const parts: React.ReactNode[] = []
      let last = 0
      for (const m of testStr.matchAll(new RegExp(pattern, globalFlags))) {
        if (m.index! > last) parts.push(<span key={last}>{testStr.slice(last, m.index)}</span>)
        parts.push(<mark key={m.index} className="bg-accent/30 text-accent rounded px-0.5">{m[0]}</mark>)
        last = m.index! + m[0].length
      }
      parts.push(<span key={last}>{testStr.slice(last)}</span>)
      return parts
    } catch { return <span>{testStr}</span> }
  }

  return (
    <ToolLayout title={META.title} description={META.description} faqs={META.faqs}>
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <span className="text-gray-500 font-mono">/</span>
          <input value={pattern} onChange={e => setPattern(e.target.value)} placeholder="([a-z]+)" className="flex-1 bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 text-sm font-mono text-gray-300 focus:border-accent transition-colors" />
          <span className="text-gray-500 font-mono">/</span>
          <input value={flags} onChange={e => setFlags(e.target.value)} placeholder="gi" className="w-20 bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 text-sm font-mono text-gray-300 focus:border-accent" />
          <button onClick={test} className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover text-sm font-medium">Test</button>
        </div>
        <textarea value={testStr} onChange={e => setTestStr(e.target.value)} placeholder="Enter test string..." rows={5} className="w-full bg-dark-800 border border-dark-600 rounded-lg p-4 text-sm font-mono text-gray-300 resize-none focus:border-accent transition-colors" />
        {error && <div className="bg-red-950 border border-red-800 rounded-lg p-3 text-red-400 text-sm">{error}</div>}
        <div className="bg-dark-800 border border-dark-600 rounded-lg p-4 font-mono text-sm leading-relaxed min-h-24">{highlight()}</div>
        <div className="text-sm text-gray-400">{matches.length} match{matches.length !== 1 ? 'es' : ''} found</div>
      </div>
    </ToolLayout>
  )
}
