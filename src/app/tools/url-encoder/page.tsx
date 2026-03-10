'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

const META = {
  title: 'URL Encoder & Decoder',
  description: 'Encode and decode URLs and URL components online. Handles special characters, spaces, unicode. Free and client-side.',
  faqs: [
    { q: 'What is URL encoding?', a: 'URL encoding (percent-encoding) converts characters into a format that can be safely transmitted over the internet. Special characters like spaces become %20, & becomes %26, etc.' },
    { q: 'What\'s the difference between encodeURI and encodeURIComponent?', a: 'encodeURI encodes a full URL, preserving characters like /, ?, &. encodeURIComponent encodes a single component (parameter value), encoding those characters too. Use Component for query parameter values.' },
    { q: 'When should I URL encode?', a: 'Always URL encode query parameter values before appending them to URLs. Don\'t encode the entire URL — only the values. This prevents injection attacks and malformed URLs.' },
  ],
}

export default function UrlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'full'|'component'>('component')
  const [action, setAction] = useState<'encode'|'decode'>('encode')

  const run = () => {
    try {
      if (action === 'encode') setOutput(mode === 'component' ? encodeURIComponent(input) : encodeURI(input))
      else setOutput(mode === 'component' ? decodeURIComponent(input) : decodeURI(input))
    } catch { setOutput('Invalid input') }
  }

  return (
    <ToolLayout title={META.title} description={META.description} faqs={META.faqs}>
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {(['encode','decode'] as const).map(a => <button key={a} onClick={() => setAction(a)} className={`px-4 py-2 rounded-lg text-sm font-medium ${action===a ? 'bg-accent text-white' : 'bg-dark-700 border border-dark-600 text-gray-400 hover:text-white'}`}>{a.charAt(0).toUpperCase()+a.slice(1)}</button>)}
          <div className="border-l border-dark-600 pl-2 flex gap-2">
            {(['component','full'] as const).map(m => <button key={m} onClick={() => setMode(m)} className={`px-3 py-2 rounded-lg text-xs ${mode===m ? 'bg-dark-600 text-white' : 'text-gray-500 hover:text-white'}`}>{m==='component' ? 'Component' : 'Full URL'}</button>)}
          </div>
          <button onClick={run} className="ml-auto px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover">Run</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text or URL..." className="h-48 bg-dark-800 border border-dark-600 rounded-lg p-4 text-sm font-mono text-gray-300 resize-none focus:border-accent" />
          <textarea readOnly value={output} className="h-48 bg-dark-800 border border-dark-600 rounded-lg p-4 text-sm font-mono text-green-400 resize-none" />
        </div>
      </div>
    </ToolLayout>
  )
}
