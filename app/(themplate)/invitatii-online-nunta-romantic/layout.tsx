import { Metadata } from 'next'

// 1. Aici citește Google Titlul, Descrierea și Tag-urile Social Media (Facebook/Twitter)
export const metadata: Metadata = {
  title: 'Invitație Online Nuntă Romantică și Florală | VibeInvite',
  description: 'Creează o invitație digitală de nuntă în stil romantic. Design elegant cu roșu trandafiriu adânc, roz pudrat și petale de bujori. Include RSVP online, GPS și meniu QR.',
  keywords: 'invitatii nunta romantice, invitatie digitala florala, invitatie online eleganta, invitatie nunta rosu trandafiriu, RSVP nunta online, invitatii digitale cu flori, vibeinvite',
  alternates: {
    canonical: 'https://www.vibeinvite.ro/invitatie-online-nunta-romantic',
  },
  openGraph: {
    title: 'Invitație Online Nuntă Stil Romantic și Floral | VibeInvite',
    description: 'Demo invitație digitală de nuntă în stil romantic. O poveste de iubire redată prin nuanțe senzoriale de trandafiri și bujori. RSVP instant, hărți GPS și foto live.',
    type: 'website',
    url: 'https://www.vibeinvite.ro/invitatie-online-nunta-romantic',
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
export default function RomanticLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Invitații Nuntă Online — Stil Romantic',
      description: 'Demo invitație digitală de nuntă în stil romantic și floral. Design senzorial și elegant pentru o nuntă de poveste. RSVP instant, locație GPS și upload poze.',
      url: 'https://www.vibeinvite.ro/invitatie-online-nunta-romantic',
      inLanguage: 'ro',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Cum creez o invitație de nuntă online în stil romantic?',
          acceptedAnswer: { '@type': 'Answer', text: 'Pe platforma VibeInvite selectezi tema Romantic, completezi datele voastre speciale, povestea voastră de dragoste, detaliile evenimentului și primești instant link-ul personalizat, gata de trimis pe WhatsApp.' }
        },
        {
          '@type': 'Question',
          name: 'Ce funcții include tema Romantică pentru invitații digitale?',
          acceptedAnswer: { '@type': 'Answer', text: 'Tema Romantic include un design elegant cu elemente florale, formular RSVP integrat pentru confirmări rapide, integrare hărți Google Maps și Waze, meniu digital și un album foto live unde invitații pot încărca poze direct de la nuntă.' }
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