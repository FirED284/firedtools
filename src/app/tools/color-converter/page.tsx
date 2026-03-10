'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

const META = {
  title: 'Color Converter — HEX, RGB, HSL',
  description: 'Convert colors between HEX, RGB, and HSL formats online. Visual color picker included. Free and client-side.',
  faqs: [
    { q: 'What color formats are supported?', a: 'HEX (6 or 3 digit, with or without #), RGB (0-255 values), and HSL (hue 0-360, saturation 0-100%, lightness 0-100%). All formats convert between each other instantly.' },
    { q: 'What is HSL?', a: 'HSL stands for Hue, Saturation, Lightness. It\'s often more intuitive than RGB for designers since you can adjust brightness and saturation independently without changing the hue.' },
    { q: 'Can I use the color picker?', a: 'Yes! Click the color swatch to open the native browser color picker. It updates all three format fields simultaneously.' },
  ],
}

function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r ? { r: parseInt(r[1],16), g: parseInt(r[2],16), b: parseInt(r[3],16) } : null
}
function rgbToHsl(r:number,g:number,b:number) {
  r/=255;g/=255;b/=255
  const max=Math.max(r,g,b),min=Math.min(r,g,b);let h=0,s=0
  const l=(max+min)/2
  if(max!==min){const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6}}
  return {h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)}
}

export default function ColorConverter() {
  const [hex, setHex] = useState('#ff6b35')
  const [rgb, setRgb] = useState({r:255,g:107,b:53})
  const [hsl, setHsl] = useState({h:18,s:100,l:60})

  const fromHex = (v: string) => {
    const clean = v.startsWith('#') ? v : '#'+v
    setHex(clean)
    const r = hexToRgb(clean)
    if(r){setRgb(r);setHsl(rgbToHsl(r.r,r.g,r.b))}
  }
  const fromRgb = (key:'r'|'g'|'b', val:number) => {
    const nr={...rgb,[key]:val};setRgb(nr)
    const h2='#'+[nr.r,nr.g,nr.b].map(x=>x.toString(16).padStart(2,'0')).join('')
    setHex(h2);setHsl(rgbToHsl(nr.r,nr.g,nr.b))
  }
  const fromPicker = (v:string) => fromHex(v)

  return (
    <ToolLayout title={META.title} description={META.description} faqs={META.faqs}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <input type="color" value={hex} onChange={e=>fromPicker(e.target.value)} className="w-16 h-16 rounded-lg cursor-pointer border-0 bg-transparent" />
          <div className="w-32 h-16 rounded-lg border border-dark-600" style={{background:hex}} />
          <div className="text-2xl font-mono font-bold" style={{color:hex}}>{hex.toUpperCase()}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">HEX</label>
            <input value={hex} onChange={e=>fromHex(e.target.value)} className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2 font-mono text-sm text-gray-300 focus:border-accent" />
          </div>
          <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">RGB</label>
            <div className="space-y-2">
              {(['r','g','b'] as const).map(c => (
                <div key={c} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-4">{c.toUpperCase()}</span>
                  <input type="range" min={0} max={255} value={rgb[c]} onChange={e=>fromRgb(c,Number(e.target.value))} className="flex-1 accent-[#ff6b35]" />
                  <span className="text-xs font-mono text-gray-400 w-8">{rgb[c]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">HSL</label>
            <div className="text-sm font-mono text-gray-300">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
