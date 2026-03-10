export default function AdSlot({ slot }: { slot: string }) {
  return (
    <div className="w-full bg-dark-700 border border-dark-600 rounded-lg flex items-center justify-center h-24 text-dark-500 text-sm">
      <ins className="adsbygoogle block w-full h-full" data-ad-client="ca-pub-XXXXXXXX" data-ad-slot={slot} data-ad-format="auto" />
    </div>
  )
}
