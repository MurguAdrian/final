import { Metadata } from 'next'

// 1. Aici citește Google Titlul, Descrierea și Tag-urile Social Media (Facebook/Twitter)
export const metadata: Metadata = {
  title: 'Invitație Online Nuntă Nature, Botanică și Verde | VibeInvite',
  description: 'Creează o invitație digitală de nuntă în stil Nature. Design proaspăt cu tonuri botanice de verde și mint, inspirat din grădini înflorite. Include RSVP, GPS și meniu QR.',
  keywords: 'invitatii nunta nature, invitatie digitala botanica, invitatie online verde, invitatie nunta stil rustic, RSVP nunta online, invitatii digitale gradina, vibeinvite',
  alternates: {
    canonical: 'https://www.vibeinvite.ro/invitatie-online-nunta-nature',
  },
  openGraph: {
    title: 'Invitație Online Nuntă Stil Nature și Botanic | VibeInvite',
    description: 'Demo invitație digitală de nuntă în stil botanic. Prospețime și eleganță naturală prin nuanțe de verde, mint și elemente organice. RSVP instant, hărți GPS și foto live.',
    type: 'website',
    url: 'https://www.vibeinvite.ro/invitatie-online-nunta-nature',
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
export default function NatureLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Invitații Nuntă Online — Stil Nature',
      description: 'Demo invitație digitală de nuntă în stil nature și botanic. Design organic și proaspăt pentru cuplurile care iubesc natura. RSVP instant, locație GPS și upload poze.',
      url: 'https://www.vibeinvite.ro/invitatie-online-nunta-natura',
      inLanguage: 'ro',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Cum creez o invitație de nuntă online în stil nature sau botanic?',
          acceptedAnswer: { '@type': 'Answer', text: 'Pe platforma VibeInvite alegi tema Nature, adaugi detaliile voastre, locația petrecerii în aer liber sau la piscină, personalizezi mesajele și primești pe loc link-ul ecologic și digital, gata de trimis pe WhatsApp sau rețele sociale.' }
        },
        {
          '@type': 'Question',
          name: 'Ce beneficii are tema botanică Nature pentru invitația digitală?',
          acceptedAnswer: { '@type': 'Answer', text: 'Tema Nature oferă un design curat cu elemente de frunze și verdeață, formular RSVP integrat pentru managementul listei de invitați, butoane GPS interactive (Waze/Google Maps), meniu QR și un flux live pentru încărcarea pozelor direct de către invitați.' }
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