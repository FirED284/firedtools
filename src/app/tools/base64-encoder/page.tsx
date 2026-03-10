'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

const META = {
  title: 'Base64 Encoder & Decoder',
  description: 'Encode text or decode Base64 strings online. Supports Unicode. Free, instant, client-side only.',
  faqs: [
    { q: 'What is Base64 encoding?', a: 'Base64 is a binary-to-text encoding scheme that converts binary data into ASCII characters. It\'s commonly used to embed binary data in text formats like HTML, CSS, JSON, or email.' },
    { q: 'Is Base64 encryption?', a: 'No. Base64 is encoding, not encryption. Anyone can decode a Base64 string. It provides no security. Use it for data transport, not for hiding sensitive data.' },
    { q: 'Does this support Unicode?', a: 'Yes. This tool handles full Unicode including emojis by using TextEncoder/TextDecoder APIs for proper UTF-8 encoding before Base64 conversion.' },
  ],
}

export default function Base64Encoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode'|'decode'>('encode')
  const [error, setError] = useState('')

  const process = (m = mode) => {
    try {
      if (m === 'encode') { setOutput(btoa(unescape(encodeURIComponent(input)))); setError('') }
      else { setOutput(decodeURIComponent(escape(atob(input)))); setError('') }
    } catch { setError('Invalid input for ' + m) }
  }

  return (
    <ToolLayout title={META.title} description={META.description} faqs={META.faqs}>
      <div className="space-y-4">
        <div className="flex gap-2">
          {(['encode','decode'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); process(m) }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode===m ? 'bg-accent text-white' : 'bg-dark-700 text-gray-400 border border-dark-600 hover:text-white'}`}>{m.charAt(0).toUpperCase()+m.slice(1)}</button>
          ))}
          <button onClick={() => process()} className="px-4 py-2 bg-dark-600 text-white rounded-lg border border-dark-500 text-sm hover:bg-dark-500 ml-auto">Run</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">{mode==='encode' ? 'Plain Text' : 'Base64 String'}</label>
            <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-64 bg-dark-800 border border-dark-600 rounded-lg p-4 text-sm font-mono text-gray-300 resize-none focus:border-accent transition-colors" placeholder={mode==='encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'} />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">{mode==='encode' ? 'Base64 Output' : 'Decoded Text'}</label>
            {error ? <div className="w-full h-64 bg-dark-800 border border-red-800 rounded-lg p-4 text-sm text-red-400">{error}</div>
              : <textarea readOnly value={output} className="w-full h-64 bg-dark-800 border border-dark-600 rounded-lg p-4 text-sm font-mono text-green-400 resize-none" />}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
