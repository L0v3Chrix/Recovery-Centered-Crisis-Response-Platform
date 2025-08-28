import type { Metadata, Viewport } from 'next'
import './globals.css'
import OverlayAppBar from '../components/OverlayAppBar'
import SiteFooter from '../components/SiteFooter'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#2B50E2',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://helpnowatx.org'),
  title: 'HelpNow ATX - Real help, verified daily',
  description: 'Find verified crisis, food, shelter, and recovery resources in Central Texas. 516+ resources updated weekly.',
  keywords: ['crisis', 'food', 'shelter', 'recovery', 'resources', 'Austin', 'Travis County', 'Central Texas', 'help', 'emergency'],
  authors: [{ name: 'Raise the Vibe' }],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512' }
    ]
  },
  openGraph: {
    title: 'HelpNow ATX - Real help, verified daily',
    description: 'Find verified crisis, food, shelter, and recovery resources in Central Texas.',
    url: 'https://helpnowatx.org',
    siteName: 'HelpNow ATX',
    images: ['/og/default-1200x630.png'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HelpNow ATX - Real help, verified daily',
    description: 'Find verified crisis, food, shelter, and recovery resources in Central Texas.',
    images: ['/og/default-1200x675.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HelpNow ATX'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        {/* Skip to content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sky-500 text-white px-4 py-2 rounded-lg font-medium z-50 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
        >
          Skip to content
        </a>
        
        {/* Overlay navigation (floating) */}
        <OverlayAppBar />
        
        {/* Main content - relative z-index to stay behind nav */}
        <main id="main-content" className="relative z-[1]">
          {children}
        </main>
        
        {/* Footer */}
        <SiteFooter />
      </body>
    </html>
  )
}