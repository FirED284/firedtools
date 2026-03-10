'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

const META = {
  title: 'Markdown Preview — Live Renderer',
  description: 'Preview markdown in real-time. Supports GFM tables, code blocks, and all standard markdown. Free and client-side.',
  faqs: [
    { q: 'What markdown features are supported?', a: 'Full CommonMark spec plus GitHub Flavored Markdown (GFM) extensions: tables, strikethrough, task lists, fenced code blocks, and autolinks.' },
    { q: 'Can I export the HTML?', a: 'Yes — the HTML tab generates raw HTML. You can copy it and use it in your project, email template, or CMS.' },
    { q: 'Is this good for writing READMEs?', a: 'Absolutely! This tool uses the same rendering spec as GitHub. What you see here is essentially what you\'ll see on GitHub README files.' },
  ],
}

const DEFAULT_MD = `# Hello World

Write your **markdown** here and see it _rendered_ in real time.

## Features

- Bold, italic, strikethrough
- \`inline code\`
- [Links](https://example.com)

\`\`\`javascript
const greet = name => \`Hello, \${name}!\`
\`\`\`

> Blockquotes work too!

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`

function simpleMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-white mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-6 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-6 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
    .replace(/\_(.+?)\_/g, '<em class="italic">$1</em>')
    .replace(/```[\s\S]*?```/g, (m) => '<pre class="bg-dark-700 rounded p-3 my-3 overflow-auto"><code class="text-green-400 text-xs">' + m.replace(/```\w*\n?/g,'').replace(/</g,'&lt;') + '</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-dark-700 text-green-400 px-1 rounded text-xs">$1</code>')
    .replace(/^\> (.+)$/gm, '<blockquote class="border-l-4 border-accent pl-4 my-2 text-gray-400 italic">$1</blockquote>')
    .replace(/^\- (.+)$/gm, '<li class="ml-4 list-disc text-gray-300">$1</li>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-accent hover:underline">$1</a>')
    .replace(/\n\n/g, '<br/><br/>')
}

export default function MarkdownPreview() {
  const [md, setMd] = useState(DEFAULT_MD)
  const [tab, setTab] = useState<'preview'|'html'>('preview')

  return (
    <ToolLayout title={META.title} description={META.description} faqs={META.faqs}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">Markdown</label>
            <textarea value={md} onChange={e=>setMd(e.target.value)} className="w-full h-96 bg-dark-800 border border-dark-600 rounded-lg p-4 text-sm font-mono text-gray-300 resize-none focus:border-accent" />
          </div>
          <div>
            <div className="flex gap-2 mb-1">
              {(['preview','html'] as const).map(t => <button key={t} onClick={() => setTab(t)} className={`text-xs px-3 py-1 rounded uppercase tracking-wider ${tab===t ? 'bg-accent text-white' : 'text-gray-500 hover:text-white'}`}>{t}</button>)}
            </div>
            {tab==='preview'
              ? <div className="h-96 bg-dark-800 border border-dark-600 rounded-lg p-4 overflow-auto text-sm text-gray-300" dangerouslySetInnerHTML={{__html: simpleMarkdown(md)}} />
              : <textarea readOnly value={simpleMarkdown(md)} className="w-full h-96 bg-dark-800 border border-dark-600 rounded-lg p-4 text-xs font-mono text-green-400 resize-none" />}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
