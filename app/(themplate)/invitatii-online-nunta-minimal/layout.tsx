import { Metadata } from 'next'

// 1. Aici citește Google Titlul, Descrierea și Tag-urile Social Media (Facebook/Twitter)
export const metadata: Metadata = {
  title: 'Invitație Online Nuntă Minimalistă și Modernă | VibeInvite',
  description: 'Creează o invitație digitală de nuntă în stil minimal. Design modern, curat și elegant, bazat pe simplitate, alb imaculat și negru pur. Include RSVP online, GPS și meniu QR.',
  keywords: 'invitatii nunta minimale, invitatie digitala moderna, invitatie online simpla, design invitatie nunta curat, RSVP nunta online, invitatii nunta alb negru, vibeinvite',
  alternates: {
    canonical: 'https://www.vibeinvite.ro/invitatie-online-nunta-minimal',
  },
  openGraph: {
    title: 'Invitație Online Nuntă Stil Minimal și Modern | VibeInvite',
    description: 'Demo invitație digitală de nuntă în stil minimalist. Eleganța care stă în simplitate, cu o tipografie impecabilă și spații aerisite. RSVP instant, hărți GPS și foto live.',
    type: 'website',
    url: 'https://www.vibeinvite.ro/invitatie-online-nunta-minimal',
    siteName: 'VibeInvite',
    images: [
     {
        url: 'https://www.vibeinvite.ro/og-main.jpg', // Imaginea ta generală din public
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ro_RO',
  },
}

// 2. Aici se injectează datele structurate (Schema.org / JSON-LD) pentru Google-Sitemaps și FAQ
export default function MinimalLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Invitații Nuntă Online — Stil Minimal',
      description: 'Demo invitație digitală de nuntă în stil minimal și modern. Pentru cuplurile care cred că mai puțin înseamnă mai mult. RSVP instant, locație GPS și upload poze.',
      url: 'https://www.vibeinvite.ro/invitatie-online-nunta-minimal',
      inLanguage: 'ro',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Cum creez o invitație de nuntă online în stil minimalist?',
          acceptedAnswer: { '@type': 'Answer', text: 'Pe platforma VibeInvite alegi tema Minimal, completezi detaliile esențiale ale nunții fără elemente grafice încărcate, și generezi pe loc link-ul tău elegant și aerisit, perfect pentru cuplurile moderne.' }
        },
        {
          '@type': 'Question',
          name: 'Ce caracteristici are tema modernă Minimal pentru invitații?',
          acceptedAnswer: { '@type': 'Answer', text: 'Tema Minimal îmbină o estetică simplă, alb-negru, cu funcții digitale avansate: formular RSVP curat pentru confirmări, butoane rapide de navigare GPS (Waze și Google Maps), meniu digital prin cod QR și album foto privat pentru invitați.' }
        }
      ]
    }
  ]

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