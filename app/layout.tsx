
// import type { Metadata, Viewport } from 'next'
// import Script from 'next/script'

// import Footer from '../components/layout/Footer'
// import HeaderWrapper from '../components/layout/HeaderWrapper'
// import CookieConsent from '../components/CookieConsent'

// import { SITE_DOMAIN } from '../constants/marketingDefaults'

// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   minimumScale: 1,
//   maximumScale: 5,
// }

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
//         <Script id="gtm-script" strategy="afterInteractive">
//           {`
//             (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//             new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//             j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//             'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//             })(window,document,'script','dataLayer','GTM-PXVFHG23');
//           `}
//         </Script>

//         <Script
//           src="https://www.googletagmanager.com/gtag/js?id=G-PRLZS5WHS8"
//           strategy="afterInteractive"
//         />

//         <Script id="ga4-init" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-PRLZS5WHS8');
//           `}
//         </Script>

//         <noscript>
//           <iframe
//             src="https://www.googletagmanager.com/ns.html?id=GTM-PXVFHG23"
//             height="0"
//             width="0"
//             style={{ display: 'none', visibility: 'hidden' }}
//           />
//         </noscript>
//       </head>

//       <body className="min-h-screen text-charcoal">
//         <div className="flex min-h-screen flex-col">
//           <HeaderWrapper />
//           <main className="flex-1">{children}</main>
//           <Footer />
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

import { SITE_DOMAIN, DEFAULT_OG, OG_WIDTH, OG_HEIGHT } from '../constants/marketingDefaults'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: 'VibeInvite - Invitații Digitale Premium pentru Nuntă, Botez și Majorat',
    template: '%s | VibeInvite',
  },
  description:
    'Invitații digitale premium cu RSVP online, meniu personalizat, hartă GPS eveniment, album foto colectiv 25 GB, export invitați Excel și link editabil nelimitat. Acces 12 luni fără abonament.',
  keywords: [
    'invitatii digitale', 'invitatii online', 'invitatii nunta', 'invitatii botez',
    'invitatii majorat', 'rsvp online', 'dashboard confirmari invitati',
    'meniu personalizat nunta', 'album foto colectiv nunta', 'localizare gps eveniment',
    'export lista invitati excel', 'invitatie link personalizat', 'invitatii nelimitate',
  ],
  metadataBase: new URL(SITE_DOMAIN),
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: SITE_DOMAIN,
    title: 'VibeInvite - Invitații Digitale Premium pentru Nuntă, Botez și Majorat',
    description:
      'RSVP online, dashboard confirmări, meniu personalizat, album foto colectiv 25 GB, hartă GPS, export Excel, link editabil nelimitat. Acces 12 luni fără abonament.',
    images: [
      { url: DEFAULT_OG, width: OG_WIDTH, height: OG_HEIGHT, alt: 'VibeInvite' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeInvite - Invitații Digitale Premium pentru Nuntă, Botez și Majorat',
    description:
      'RSVP online, dashboard confirmări, meniu personalizat, album foto colectiv 25 GB, hartă GPS, export Excel, link editabil nelimitat. Acces 12 luni fără abonament.',
    images: [DEFAULT_OG],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PXVFHG23');
          `}
        </Script>

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
          <CookieConsent />
        </div>
      </body>
    </html>
  )
}