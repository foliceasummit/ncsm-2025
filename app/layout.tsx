import type { Metadata } from 'next'
import './globals.css'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import { AuthProvider } from './contexts/AuthContext'
import { checkPrismaBuild } from '@/lib/buildCheck'

// Ensure Prisma is available during build
if (typeof window === 'undefined') {
  checkPrismaBuild()
}

export const metadata: Metadata = {
  title: 'NCSM 2025 - National County Sports Meet',
  description: 'Official website for the National County Sports Meet 2025 in Liberia',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Mobile and cross-browser compatibility */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <Navigation />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
