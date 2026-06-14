// import { DEFAULT_OG, SITE_DOMAIN, OG_WIDTH, OG_HEIGHT } from '../../constants/marketingDefaults'

// export const metadata = {
//   title: 'Prețuri — VibeInvite',
//   description: 'Află planurile și prețurile pentru invitații digitale și pachetele noastre premium.',
//   openGraph: {
//     type: 'website',
//     siteName: 'VibeInvite',
//     url: SITE_DOMAIN + '/preturi',
//     title: 'Prețuri — VibeInvite',
//     description: 'Află planurile și prețurile pentru invitații digitale și pachetele noastre premium.',
//     images: [
//       { url: DEFAULT_OG, width: OG_WIDTH, height: OG_HEIGHT, alt: 'VibeInvite — Prețuri' },
//     ],
//   },
//   alternates: { canonical: SITE_DOMAIN + '/preturi' },
// }

// export default function PreturiLayout({ children }: { children: React.ReactNode }) {
//   return <>{children}</>
// }

import { DEFAULT_OG, SITE_DOMAIN, OG_WIDTH, OG_HEIGHT } from '../../constants/marketingDefaults'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prețuri | VibeInvite — Pachet Complet 300 Lei, Plată Unică',
  description:
    'Un singur pachet all-in-one pentru nuntă și botez: invitații digitale nelimitate, album foto 25 GB, meniu integrat, GPS integrat, RSVP, countdown, export Excel. 300 lei, plată unică, fără abonament.',
  keywords: [
    'pret invitatii digitale',
    'invitatii nunta pret',
    'pachet invitatii online',
    'invitatii digitale 300 lei',
    'invitatii nelimitate nunta',
    'meniu nunta integrat',
    'upload poze nunta invitati',
    'export excel invitatii nunta',
    'pachet all-in-one nunta',
    'invitatii online plata unica',
    'album foto nunta invitati',
    'invitatii digitale botez',
  ],
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: SITE_DOMAIN + '/preturi',
    title: 'VibeInvite — Pachet Complet 300 Lei, Plată Unică',
    description:
      'Tot ce ai nevoie pentru nuntă într-un singur pachet: invitații nelimitate, album foto 25 GB, meniu integrat, GPS integrat, RSVP cu logistică, countdown, export Excel. 300 lei, o singură dată.',
    images: [
      { url: DEFAULT_OG, width: OG_WIDTH, height: OG_HEIGHT, alt: 'VibeInvite — Prețuri' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeInvite — Pachet Complet 300 Lei, Plată Unică',
    description:
      'Invitații digitale nelimitate, album foto 25 GB, meniu integrat, GPS, RSVP, export Excel. 300 lei, fără abonament.',
    images: [DEFAULT_OG],
  },
  alternates: { canonical: SITE_DOMAIN + '/preturi' },
}

export default function PreturiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'VibeInvite — Pachet All-in-One Nuntă',
            description:
              'Invitații digitale nelimitate, album foto 25 GB, meniu integrat, GPS integrat, RSVP cu logistică, countdown, export Excel. 300 lei, plată unică.',
            url: SITE_DOMAIN + '/preturi',
            offers: {
              '@type': 'Offer',
              price: '300',
              priceCurrency: 'RON',
              priceValidUntil: '2026-12-31',
              availability: 'https://schema.org/InStock',
              url: SITE_DOMAIN + '/checkout',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '1240',
            },
          }),
        }}
      />
      {children}
    </>
  )
}