


import type { Metadata } from 'next'
import Footer from '../components/layout/Footer'
import HeaderWrapper from '../components/layout/HeaderWrapper'
import CookieConsent from '../components/CookieConsent'

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
      <head>
        {/* Google Analytics - Placeholder, loaded conditionally by CookieConsent */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PXVFHG23"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      </head>
      <body className="min-h-screen text-charcoal">
        <div className="flex min-h-screen flex-col">
          <HeaderWrapper />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* Cookie Consent Banner with GA4 Integration */}
          <CookieConsent />
        </div>
      </body>
    </html>
  )
}