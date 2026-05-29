


import type { Metadata } from 'next'
import Footer from '../components/layout/Footer'
import HeaderWrapper from '../components/layout/HeaderWrapper'

import { SITE_DOMAIN } from '../constants/marketingDefaults'

export const metadata: Metadata = {
  title: 'VibeInvite - Invitații Digitale Premium',
  description:
    'VibeInvite.ro oferă invitații digitale moderne pentru nunți, botezuri și evenimente speciale, cu design elegant și experiență premium.',
  metadataBase: new URL(SITE_DOMAIN),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body className="min-h-screen text-charcoal">
        <div className="flex min-h-screen flex-col">
          <HeaderWrapper />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}