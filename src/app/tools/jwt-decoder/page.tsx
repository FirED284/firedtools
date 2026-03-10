'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

const META = {
  title: 'JWT Decoder — Inspect JSON Web Tokens',
  description: 'Decode and inspect JWT tokens online. View header, payload, and signature. Verify expiration. No data sent to servers.',
  faqs: [
    { q: 'Is it safe to paste my JWT here?', a: 'All processing is done in your browser — no data is sent to any server. However, never share JWTs with signing secrets or sensitive data with untrusted parties. Treat JWTs like passwords.' },
    { q: 'Can this tool verify JWT signatures?', a: 'Not currently. Signature verification requires the secret key, which you should never expose client-side. This tool decodes and inspects the claims only — perfect for debugging.' },
    { q: 'What is a JWT?', a: 'JSON Web Token (JWT) is a compact, URL-safe token format. It has three base64url-encoded parts: header (algorithm), payload (claims), and signature. Used for authentication and authorization.' },
  ],
}

function decodeJwt(token: string) {
  const parts = token.split('.')
  if (parts.length !== 3) throw new Error('Invalid JWT: must have 3 parts separated by dots')
  const decode = (s: string) => JSON.parse(atob(s.replace(/-/g,'+').replace(/_/g,'/')))
  return { header: decode(parts[0]), payload: decode(parts[1]), signature: parts[2] }
}

export default function JwtDecoder() {
  const [input, setInput] = useState('')
  const [decoded, setDecoded] = useState<{header: Record<string, unknown>, payload: Record<string, unknown>, signature: string}|null>(null)
  const [error, setError] = useState('')

  const decode = () => {
    try { setDecoded(decodeJwt(input.trim())); setError('') }
    catch(e: unknown) { setError((e as Error).message); setDecoded(null) }
  }

  const isExpired = decoded?.payload?.exp ? (decoded.payload.exp as number) * 1000 < Date.now() : null

  return (
    <ToolLayout title={META.title} description={META.description} faqs={META.faqs}>
      <div className="space-y-4">
        <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Paste your JWT token here... eyJhbGciOiJIUzI1NiJ9..." rows={4} className="w-full bg-dark-800 border border-dark-600 rounded-lg p-4 text-sm font-mono text-gray-300 resize-none focus:border-accent" />
        <button onClick={decode} className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover text-sm font-medium">Decode</button>
        {error && <div className="bg-red-950 border border-red-800 rounded-lg p-3 text-red-400 text-sm">{error}</div>}
        {decoded && (
          <div className="space-y-4">
            {isExpired !== null && <div className={`px-4 py-2 rounded-lg text-sm ${isExpired ? 'bg-red-950 border border-red-800 text-red-400' : 'bg-green-950 border border-green-800 text-green-400'}`}>{isExpired ? 'Token is EXPIRED' : 'Token is valid (not expired)'}</div>}
            {(['header','payload'] as const).map(part => (
              <div key={part} className="bg-dark-800 border border-dark-600 rounded-lg p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{part}</div>
                <pre className="text-sm font-mono text-green-400 overflow-auto">{JSON.stringify(decoded[part], null, 2)}</pre>
              </div>
            ))}
            <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Signature</div>
              <div className="font-mono text-sm text-yellow-400 break-all">{decoded.signature}</div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
