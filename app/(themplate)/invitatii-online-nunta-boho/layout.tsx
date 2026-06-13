import { Metadata } from 'next'

// 1. Aici citește Google Titlul, Descrierea și Tag-urile Social Media (Facebook/Twitter)
export const metadata: Metadata = {
  title: 'Invitație Online Nuntă Boho | VibeInvite',
  description: 'Invitație digitală de nuntă în stil Boho — caldă, naturală, artistică. Personalizează-ți invitația online cu RSVP instant, locație GPS și album foto.',
  keywords: 'invitatii nunta online, invitatii nunta digitale, invitatie nunta boho, RSVP nunta online, confirmare prezenta nunta, vibeinvite',
  alternates: {
    canonical: 'https://www.vibeinvite.ro/invitatie-online-nunta-boho',
  },
  openGraph: {
    title: 'Invitație Online Nuntă Stil Boho | VibeInvite',
    description: 'Demo invitație digitală de nuntă în stil Boho. Caldă, naturală, handcrafted. RSVP instant, GPS, upload poze.',
    type: 'website',
    url: 'https://www.vibeinvite.ro/invitatie-online-nunta-boho',
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
export default function BohoLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Invitații Nuntă Online — Stil Boho',
      description: 'Demo invitație digitală de nuntă în stil Boho. Naturală, caldă, cu elemente handcrafted. RSVP instant, GPS, upload poze invitați.',
      url: 'https://www.vibeinvite.ro/invitatie-online-nunta-boho',
      inLanguage: 'ro',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Cum creez o invitație de nuntă online?',
          acceptedAnswer: { '@type': 'Answer', text: 'Pe VibeInvite poți crea o invitație digitală în 3 minute. Alegi stilul, completezi detaliile și primești un link personalizat.' }
        },
        {
          '@type': 'Question',
          name: 'Pot colecta poze de la invitați în ziua nunții?',
          acceptedAnswer: { '@type': 'Answer', text: 'Da! VibeInvite include o funcție de upload foto prin care invitații pot încărca poze direct din telefon în ziua evenimentului.' }
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