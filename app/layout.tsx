


// import type { Metadata } from 'next'
// import Footer from '../components/layout/Footer'
// import HeaderWrapper from '../components/layout/HeaderWrapper'
// import CookieConsent from '../components/CookieConsent'

// import { SITE_DOMAIN } from '../constants/marketingDefaults'

// export const metadata: Metadata = {
//   title: 'VibeInvite - Invitații Digitale Premium',
//   description:
//     'VibeInvite.ro oferă invitații digitale moderne pentru nunți, botezuri și evenimente speciale, cu design elegant și experiență premium.',
//   metadataBase: new URL(SITE_DOMAIN),
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="ro">
//       <head>
//         {/* Google Analytics - Placeholder, loaded conditionally by CookieConsent */}
//         <noscript>
//           <iframe
//             src="https://www.googletagmanager.com/ns.html?id=GTM-PXVFHG23"
//             height="0"
//             width="0"
//             style={{ display: 'none', visibility: 'hidden' }}
//           ></iframe>
//         </noscript>
//       </head>
//       <body className="min-h-screen text-charcoal">
//         <div className="flex min-h-screen flex-col">
//           <HeaderWrapper />
//           <main className="flex-1">{children}</main>
//           <Footer />
//           {/* Cookie Consent Banner with GA4 Integration */}
//           <CookieConsent />
//         </div>
//       </body>
//     </html>
//   )
// }
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

import Footer from '../components/layout/Footer'
import HeaderWrapper from '../components/layout/HeaderWrapper'
import CookieConsent from '../components/CookieConsent'

import { SITE_DOMAIN } from '../constants/marketingDefaults'

// CONFIGURARE VIEWPORT GLOBALA (Rezolvă problema cu textele mici pe iPhone)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Permite utilizatorului să dea zoom manual dacă dorește, dar pornește la scară corectă (100%)
  viewportFit: 'cover', // FIX: unifică safe-area și viewport iOS cu singură sursă de adevăr
}

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
        {/* =========================
            GOOGLE TAG MANAGER
        ========================= */}

        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PXVFHG23');
          `}
        </Script>

        {/* =========================
            GOOGLE ANALYTICS 4 (fallback direct)
            (poți să-l scoți dacă îl ai în GTM)
        ========================= */}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PRLZS5WHS8"
          strategy="afterInteractive"
        />

        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('js', new Date());
            gtag('config', 'G-PRLZS5WHS8');
          `}
        </Script>

        {/* noscript GTM fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PXVFHG23"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </head>

      <body className="min-h-screen text-charcoal">
        <div className="flex min-h-screen flex-col">
          <HeaderWrapper />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Cookie Consent Banner */}
          <CookieConsent />
        </div>
      </body>
    </html>
  )
}