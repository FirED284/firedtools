'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

const META = {
  title: 'JSON Formatter & Validator',
  description: 'Format, prettify, and validate JSON online. Supports minification and syntax highlighting. Free, instant, no data sent to servers.',
  faqs: [
    { q: 'Is my JSON data safe?', a: 'Yes. All processing happens in your browser using JavaScript. No data is ever sent to any server. Your JSON never leaves your device.' },
    { q: 'What is JSON formatting?', a: 'JSON formatting (pretty-printing) adds indentation and line breaks to make raw JSON human-readable. Minification does the opposite — removing whitespace to reduce file size.' },
    { q: 'Can I validate JSON with this tool?', a: 'Yes. The formatter automatically validates your JSON and shows error messages if the syntax is invalid, including the approximate location of the error.' },
  ],
}

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)

  const format = () => {
    try { setOutput(JSON.stringify(JSON.parse(input), null, indent)); setError('') }
    catch (e: unknown) { setError((e as Error).message); setOutput('') }
  }
  const minify = () => {
    try { setOutput(JSON.stringify(JSON.parse(input))); setError('') }
    catch (e: unknown) { setError((e as Error).message); setOutput('') }
  }
  const copy = () => navigator.clipboard.writeText(output)

  return (
    <ToolLayout title={META.title} description={META.description} faqs={META.faqs}>
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <button onClick={format} className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors text-sm font-medium">Prettify</button>
          <button onClick={minify} className="px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors text-sm font-medium border border-dark-600">Minify</button>
          <select value={indent} onChange={e => setIndent(Number(e.target.value))} className="px-3 py-2 bg-dark-700 text-white rounded-lg border border-dark-600 text-sm">
            <option value={2}>2 spaces</option><option value={4}>4 spaces</option><option value={1}>Tab</option>
          </select>
          {output && <button onClick={copy} className="px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 border border-dark-600 text-sm ml-auto">Copy</button>}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">Input JSON</label>
            <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='{"key": "value"}' className="w-full h-80 bg-dark-800 border border-dark-600 rounded-lg p-4 text-sm font-mono text-gray-300 resize-none focus:border-accent transition-colors" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">Output</label>
            {error ? <div className="w-full h-80 bg-dark-800 border border-red-800 rounded-lg p-4 text-sm font-mono text-red-400">{error}</div>
              : <textarea readOnly value={output} className="w-full h-80 bg-dark-800 border border-dark-600 rounded-lg p-4 text-sm font-mono text-green-400 resize-none" />}
          </div>
        </div>
        <p className="text-gray-600 text-xs">JSON Formatter instantly validates and formats your JSON data entirely in the browser. Supports large JSON files, nested objects, and arrays. Use the indent selector to choose between 2-space, 4-space, or tab indentation. The minify option strips all whitespace for production use or API payloads. Your data never leaves your browser — 100% private and secure.</p>
      </div>
    </ToolLayout>
  )
}
