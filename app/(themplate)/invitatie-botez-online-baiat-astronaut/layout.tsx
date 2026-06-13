import { Metadata } from 'next'

// Metadatele pe care Google le citește direct de pe server
export const metadata: Metadata = {
  title: 'Invitație Online Botez Băiat Stil Astronaut și Spațiu | VibeInvite',
  description: 'Creează o invitație digitală de botez pentru băiat în stil astronaut, cosmos și rachete cosmice. Design de poveste cu steluțe și planete. Include RSVP și hărți GPS.',
  keywords: 'invitatii botez astronaut, invitatie digitala spatiu cosmic, invitatie online racheta, invitatie botez baiat cosmos, rsvp botez online, vibeinvite, invitatie botez stele planete',
  alternates: {
    canonical: 'https://www.vibeinvite.ro/invitatie-botez-online-baiat-astronaut',
  },
  openGraph: {
    title: 'Invitație Digitală Botez Băiat — Stil Galactic Astronaut | VibeInvite',
    description: 'Demo invitație digitală de botez pentru băiețel. Tematică spațială intergalactică, rachete și stele sclipitoare. RSVP instant integrat și butoane GPS.',
    type: 'website',
    url: 'https://www.vibeinvite.ro/invitatie-botez-online-baiat-astronaut',
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

// Datele Structurate (Schema.org / JSON-LD) pentru sitemaps și FAQ
export default function BotezAstronautLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Invitații Botez Online — Demo Stil Astronaut și Cosmos',
      description: 'Demo invitație digitală de botez pentru băiat. Tematică spațială cu astronaut și rachete. RSVP instant, hărți GPS Waze și Google Maps.',
      url: 'https://www.vibeinvite.ro/invitatie-botez-online-baiat-astronaut',
      inLanguage: 'ro',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Cum creez o invitație de botez online cu tematică spațială sau astronaut?',
          acceptedAnswer: { '@type': 'Answer', text: 'Pe platforma VibeInvite alegi tema cu Astronaut, introduci detaliile despre biserică și restaurant, numele micului tău explorator galactic și generezi pe loc linkul gata de trimis pe WhatsApp.' }
        },
        {
          '@type': 'Question',
          name: 'Se pot selecta meniurile sau numărul de persoane în formularul RSVP de botez?',
          acceptedAnswer: { '@type': 'Answer', text: 'Da! Invitația digitală premium vine cu un sistem inteligent de RSVP prin care oaspeții confirmă participarea direct de pe telefon și își pot lăsa opțiunile de prezență.' }
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