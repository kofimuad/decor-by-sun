import type { Metadata } from 'next'
import './globals.css'
import Providers from './Providers'
import ConditionalLayout from '@/components/layout/ConditionalLayout'

export const metadata: Metadata = {
  title: 'Decor by Sun — Timeless Elegance',
  description: 'Bespoke graduation cap toppers, lush bouquets, balloon installations, and full-scale event styling in Kumasi, Ghana.',
  keywords: ['decor', 'graduation', 'bouquet', 'balloon', 'event styling', 'Kumasi', 'Ghana'],
  openGraph: {
    title: 'Decor by Sun',
    description: 'Elevate Your Moments with Timeless Elegance.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  )
}
