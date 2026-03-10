'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

const META = {
  title: 'Cron Expression Generator',
  description: 'Build and understand cron expressions visually. See human-readable descriptions of your cron schedule. Free and client-side.',
  faqs: [
    { q: 'What is a cron expression?', a: 'A cron expression is a string of 5 fields (minute, hour, day, month, weekday) that defines a schedule. The * wildcard means "every". For example, "0 9 * * 1" means every Monday at 9:00 AM.' },
    { q: 'What does the @ syntax mean?', a: '@hourly, @daily, @weekly, @monthly, @yearly are shortcuts for common cron schedules. @reboot runs once when the system starts.' },
    { q: 'Are cron minutes 0-based?', a: 'Yes. Minutes range from 0-59, hours from 0-23, days 1-31, months 1-12, and weekdays 0-7 (0 and 7 both represent Sunday).' },
  ],
}

const PRESETS = [
  { label: 'Every minute', value: '* * * * *' },
  { label: 'Every hour', value: '0 * * * *' },
  { label: 'Every day at midnight', value: '0 0 * * *' },
  { label: 'Every Monday at 9am', value: '0 9 * * 1' },
  { label: 'Every weekday at 8am', value: '0 8 * * 1-5' },
  { label: 'Every Sunday at noon', value: '0 12 * * 0' },
  { label: 'First of month midnight', value: '0 0 1 * *' },
  { label: 'Every 15 minutes', value: '*/15 * * * *' },
]

function describe(expr: string) {
  const [min, hr, dom, mon, dow] = expr.trim().split(/\s+/)
  if (!min) return ''
  const parts: string[] = []
  if (min === '*') parts.push('every minute')
  else if (min.startsWith('*/')) parts.push(`every ${min.slice(2)} minutes`)
  else parts.push(`at minute ${min}`)
  if (hr === '*') { if (min !== '*') parts.push('of every hour') }
  else parts.push(`at ${hr}:${min==='*'?'00':min.padStart(2,'0')}`)
  if (dom !== '*') parts.push(`on day ${dom}`)
  if (mon !== '*') parts.push(`in month ${mon}`)
  if (dow !== '*') { const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']; parts.push(`on ${dow.split(',').map(d=>days[Number(d)]||d).join(', ')}`) }
  return parts.join(', ')
}

export default function CronGenerator() {
  const [expr, setExpr] = useState('* * * * *')
  const fields = expr.split(/\s+/)

  const update = (i: number, val: string) => {
    const f = [...fields]; while(f.length<5) f.push('*')
    f[i]=val; setExpr(f.join(' '))
  }

  const labels = ['Minute\n0-59', 'Hour\n0-23', 'Day\n1-31', 'Month\n1-12', 'Weekday\n0-7']

  return (
    <ToolLayout title={META.title} description={META.description} faqs={META.faqs}>
      <div className="space-y-6">
        <div className="flex gap-2 flex-wrap">
          {PRESETS.map(p => <button key={p.value} onClick={() => setExpr(p.value)} className="px-3 py-1.5 text-xs bg-dark-700 border border-dark-600 rounded-lg text-gray-400 hover:text-white hover:border-accent transition-colors">{p.label}</button>)}
        </div>
        <div className="grid grid-cols-5 gap-3">
          {labels.map((label, i) => (
            <div key={i} className="bg-dark-800 border border-dark-600 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 whitespace-pre-line mb-2">{label}</div>
              <input value={fields[i] || '*'} onChange={e => update(i, e.target.value)} className="w-full bg-dark-700 border border-dark-600 rounded px-2 py-1 text-center font-mono text-sm text-accent focus:border-accent" />
            </div>
          ))}
        </div>
        <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
          <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Expression</div>
          <div className="font-mono text-xl text-accent">{expr}</div>
          <div className="text-sm text-gray-400 mt-2">{describe(expr)}</div>
        </div>
      </div>
    </ToolLayout>
  )
}
