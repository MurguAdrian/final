// andre/app/invitatii-digitale/layout.tsx
import React from 'react'
import { Metadata } from 'next'
import { DEFAULT_OG, SITE_DOMAIN, OG_WIDTH, OG_HEIGHT } from '../../constants/marketingDefaults'

export const metadata: Metadata = {
  title: 'Invitații Online Majorat, Nuntă și Botez | VibeInvite',
  description: 'Invitații digitale premium pentru nuntă, botez și majorat 18 ani. Design luxury, RSVP online, meniu QR. Descoperă catalogul complet VibeInvite.',
  keywords: [
    'invitatii online', 'invitatii digitale', 'invitatii nunta online', 'invitatii botez premium',
    'invitatie online aniversare majorat 18 ani', 'invitatii majorat 18 ani', 'invitatii nunta digitale',
    'invitatii botez online', 'invitatie digitala nunta', 'invitatii premium romania',
    'invitatii online botez baiat', 'invitatii online botez fata', 'rsvp online nunta', 'modele invitatii digitale'
  ],
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
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: SITE_DOMAIN + '/invitatii-digitale',
    title: 'Catalog Invitații Online Majorat, Nuntă și Botez | VibeInvite',
    description: 'Alege dintr-o colecție premium de invitații digitale pentru nunți, botezuri și majorate. Design luxury cu RSVP inteligent și hărți GPS.',
    images: [
      { url: DEFAULT_OG, width: OG_WIDTH, height: OG_HEIGHT, alt: 'VibeInvite — Invitații Digitale Premium' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invitații Online Majorat, Nuntă și Botez | VibeInvite',
    description: 'Invitații digitale premium pentru nuntă, botez și majorat 18 ani. Design luxury, RSVP online, meniu QR.',
    images: [DEFAULT_OG],
  },
  alternates: { canonical: SITE_DOMAIN + '/invitatii-digitale' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Catalog Modele Invitații Digitale Premium — VibeInvite',
  description: 'Colecție completă de invitații online și digitale pentru nuntă, botez, majorat de 18 ani și aniversări.',
  url: SITE_DOMAIN + '/invitatii-digitale',
  isPartOf: {
    '@type': 'WebSite',
    name: 'VibeInvite',
    url: SITE_DOMAIN
  },
  hasPart: [
    { '@type': 'WebPage', name: 'Invitație Botez Online Băiat Astronaut', url: SITE_DOMAIN + '/invitatie-botez-online-baiat-astronaut' },
    { '@type': 'WebPage', name: 'Invitație Botez Online Băiat Mașinuță', url: SITE_DOMAIN + '/invitatie-botez-online-baiat-masinuta' },
    { '@type': 'WebPage', name: 'Invitație Botez Online Băiat Steluță', url: SITE_DOMAIN + '/invitatie-botez-online-baiat-steluta' },
    { '@type': 'WebPage', name: 'Invitație Botez Online Ursuțel', url: SITE_DOMAIN + '/invitatie-botez-online-ursulet' },
    { '@type': 'WebPage', name: 'Invitație Botez Online Fată Baloane', url: SITE_DOMAIN + '/invitatie-botez-online-fata-baloane' },
    { '@type': 'WebPage', name: 'Invitație Botez Online Fată Fluture', url: SITE_DOMAIN + '/invitatie-botez-online-fata-fluture' },
    { '@type': 'WebPage', name: 'Invitație Online Aniversare Majorat 18 Ani', url: SITE_DOMAIN + '/invitatie-online-aniversare-majorat-18-ani' },
    { '@type': 'WebPage', name: 'Invitații Online Nuntă Boho', url: SITE_DOMAIN + '/invitatii-online-nunta-boho' },
    { '@type': 'WebPage', name: 'Invitații Online Nuntă Lux / Luxury', url: SITE_DOMAIN + '/invitatii-online-nunta-lux' },
    { '@type': 'WebPage', name: 'Invitații Online Nuntă Minimalistă', url: SITE_DOMAIN + '/invitatii-online-nunta-minimal' },
    { '@type': 'WebPage', name: 'Invitații Online Nuntă Natură / Greenery', url: SITE_DOMAIN + '/invitatii-online-nunta-natura' },
    { '@type': 'WebPage', name: 'Invitații Online Nuntă Romantică', url: SITE_DOMAIN + '/invitatii-online-nunta-romantic' },
    { '@type': 'WebPage', name: 'Invitații Online Nuntă Royal / Regală', url: SITE_DOMAIN + '/invitatii-online-nunta-royal' }
  ]
}

export default function InvitatiiDigitaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}