'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

const META = {
  title: 'Diff Checker — Compare Two Texts',
  description: 'Compare two text blocks and highlight differences line by line. Free, instant, and runs entirely in your browser.',
  faqs: [
    { q: 'How does the diff work?', a: 'This tool performs a line-by-line comparison. Lines only in the left text are shown in red (removed), lines only in the right text in green (added). Identical lines appear in gray.' },
    { q: 'Can I compare code files?', a: 'Yes. Paste any text — code, prose, config files, JSON, etc. The diff is purely text-based and works with any content.' },
    { q: 'Is there a size limit?', a: 'No hard limit, but very large texts (100k+ lines) may be slow due to browser JavaScript limits. For huge files, use git diff or a dedicated diff tool instead.' },
  ],
}

function diff(a: string, b: string) {
  const la = a.split('\n'), lb = b.split('\n')
  const result: {type:'same'|'add'|'remove', text:string}[] = []
  const setA = new Set(la), setB = new Set(lb)
  const aOnly = la.filter(l => !setB.has(l))
  const bOnly = lb.filter(l => !setA.has(l))
  const same = la.filter(l => setB.has(l))
  same.forEach(l => result.push({type:'same',text:l}))
  aOnly.forEach(l => result.push({type:'remove',text:l}))
  bOnly.forEach(l => result.push({type:'add',text:l}))
  return result.sort((a,b) => {
    const order = {same:0,remove:1,add:2}
    return order[a.type]-order[b.type]
  })
}

export default function DiffChecker() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [result, setResult] = useState<{type:'same'|'add'|'remove',text:string}[]|null>(null)

  const compare = () => setResult(diff(left, right))

  return (
    <ToolLayout title={META.title} description={META.description} faqs={META.faqs}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">Original</label>
            <textarea value={left} onChange={e=>setLeft(e.target.value)} placeholder="Paste original text..." className="w-full h-64 bg-dark-800 border border-dark-600 rounded-lg p-4 text-sm font-mono text-gray-300 resize-none focus:border-accent" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">Modified</label>
            <textarea value={right} onChange={e=>setRight(e.target.value)} placeholder="Paste modified text..." className="w-full h-64 bg-dark-800 border border-dark-600 rounded-lg p-4 text-sm font-mono text-gray-300 resize-none focus:border-accent" />
          </div>
        </div>
        <button onClick={compare} className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover text-sm font-medium">Compare</button>
        {result && (
          <div className="bg-dark-800 border border-dark-600 rounded-lg overflow-hidden">
            <div className="flex text-xs text-gray-500 border-b border-dark-600 px-4 py-2 gap-6">
              <span className="text-red-400">— Removed: {result.filter(r=>r.type==='remove').length}</span>
              <span className="text-green-400">+ Added: {result.filter(r=>r.type==='add').length}</span>
              <span>= Same: {result.filter(r=>r.type==='same').length}</span>
            </div>
            <div className="divide-y divide-dark-700 max-h-96 overflow-auto">
              {result.map((line, i) => (
                <div key={i} className={`px-4 py-1 font-mono text-sm flex gap-3 ${line.type==='add'?'bg-green-950 text-green-300':line.type==='remove'?'bg-red-950 text-red-300':'text-gray-500'}`}>
                  <span className="w-4 shrink-0">{line.type==='add'?'+':line.type==='remove'?'-':' '}</span>
                  <span>{line.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
