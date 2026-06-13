import { Metadata } from 'next'

// Metadatele pe care Google le citește direct de pe server
export const metadata: Metadata = {
  title: 'Invitație Online Botez Fată cu Baloane și Norișori | VibeInvite',
  description: 'Creează o invitație digitală de botez pentru fetiță cu tematică baloane festive. Design vesel, elegant și colorat cu nori pufoși. Include RSVP online și locație GPS.',
  keywords: 'invitatii botez fata baloane, invitatie digitala botez fetita, invitatie online baloane roz, rsvp botez online fetite, invitatii botez vesele, vibeinvite',
  alternates: {
    canonical: 'https://www.vibeinvite.ro/invitatie-botez-online-fata-baloane',
  },
  openGraph: {
    title: 'Invitație Digitală Botez Fetiță — Stil Festiv cu Baloane | VibeInvite',
    description: 'Demo invitație digitală de botez pentru fetiță. Tematică jucăușă cu baloane colorate și o atmosferă magică de sărbătoare. RSVP instant integrat și butoane GPS.',
    type: 'website',
    url: 'https://www.vibeinvite.ro/invitatie-botez-online-fata-baloane',
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
export default function BotezBaloaneLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Invitații Botez Online — Demo Stil Baloane Festive',
      description: 'Demo invitație digitală de botez pentru fetițe. Tematică veselă cu baloane și detalii magice pentru o zi de neuitat. RSVP instant, hărți GPS Waze și Google Maps.',
      url: 'https://www.vibeinvite.ro/invitatie-botez-online-fata-baloane',
      inLanguage: 'ro',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Cum creez o invitație de botez online cu tematică baloane pentru fetițe?',
          acceptedAnswer: { '@type': 'Answer', text: 'Pe platforma VibeInvite alegi tema Baloane, completezi câmpurile cu data, biserica și restaurantul, adaugi numele fetiței și generezi pe loc linkul gata de trimis pe WhatsApp sau rețelele sociale.' }
        },
        {
          '@type': 'Question',
          name: 'Cum primesc confirmările de la invitați pentru această temă?',
          acceptedAnswer: { '@type': 'Answer', text: 'Toate confirmările vin instant prin intermediul formularului RSVP digital integrat direct în invitație, unde oaspeții își lasă opțiunile de participare de pe telefon.' }
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