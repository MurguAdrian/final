import { Metadata } from 'next'

// 1. Aici citește Google Titlul, Descrierea și Tag-urile Social Media (Facebook/Twitter)
export const metadata: Metadata = {
  title: 'Invitație Online Nuntă Elegantă și Lux | VibeInvite',
  description: 'Creează o invitație digitală de nuntă în stil lux. Design premium cu accente aurii, negru profund și champagne satinat. Include RSVP online și meniu QR.',
  keywords: 'invitatii nuntă lux, invitatie digitala eleganta, invitatie online premium, invitatii nunta aur negru, RSVP nuntă online, vibeinvite',
  alternates: {
    canonical: 'https://www.vibeinvite.ro/invitatie-online-nunta-lux',
  },
  openGraph: {
    title: 'Invitație Online Nuntă Stil Lux și Elegant | VibeInvite',
    description: 'Demo invitație digitală de nuntă în stil lux. Opulență, grandoare, accente aurii și champagne satinat. RSVP instant, hărți GPS și album foto live.',
    type: 'website',
    url: 'https://www.vibeinvite.ro/invitatie-online-nunta-lux',
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
export default function LuxLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Invitații Nuntă Online — Stil Lux',
      description: 'Demo invitație digitală de nuntă în stil lux. Opulență și grandoare cu detalii premium. RSVP instant, locație GPS și upload poze invitați.',
      url: 'https://www.vibeinvite.ro/invitatie-online-nunta-lux',
      inLanguage: 'ro',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Cum creez o invitație de nuntă online în stil lux?',
          acceptedAnswer: { '@type': 'Answer', text: 'Pe VibeInvite alegi tema Lux, completezi detaliile evenimentului tău premium, personalizezi textul și primești instant link-ul tău elegant de invitație.' }
        },
        {
          '@type': 'Question',
          name: 'Ce funcții include tema Lux pentru invitații?',
          acceptedAnswer: { '@type': 'Answer', text: 'Tema premium Lux include design exclusiv, formular RSVP integrat pentru confirmări în timp real, butoane GPS pentru locație, meniu digital QR și album foto privat pentru invitați.' }
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