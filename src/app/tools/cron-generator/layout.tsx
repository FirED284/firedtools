import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Cron Expression Generator',
  description: 'Build cron expressions visually with presets. Get human-readable descriptions of your cron schedule. Free and client-side.',
  openGraph: { title: 'Cron Generator | FiredTools', description: 'Free online cron expression generator' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
