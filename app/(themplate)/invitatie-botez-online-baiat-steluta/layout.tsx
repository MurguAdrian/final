import { Metadata } from 'next'

// Metadatele pe care Google le citește direct de pe server
export const metadata: Metadata = {
  title: 'Invitație Online Botez Băiat cu Steluțe și Lună | VibeInvite',
  description: 'Creează o invitație digitală de botez pentru băiat cu tematică steluțe și lună. Design elegant în nuanțe de bleu și auriu, cu o atmosferă magică de poveste. Include RSVP online și locație GPS.',
  keywords: 'invitatii botez baiat steluta, invitatie digitala botez baietel, invitatie online stele si luna, rsvp botez online baieti, invitatii botez bleu auriu, vibeinvite',
  alternates: {
    canonical: 'https://www.vibeinvite.ro/invitatie-botez-online-baiat-steluta',
  },
  openGraph: {
    title: 'Invitație Digitală Botez Băiețel — Stil Poveste cu Steluțe | VibeInvite',
    description: 'Demo invitație digitală de botez pentru băiat. Tematică de vis cu steluțe sclipitoare, norișori și lună. RSVP instant integrat și butoane GPS interactive.',
    type: 'website',
    url: 'https://www.vibeinvite.ro/invitatie-botez-online-baiat-steluta',
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
export default function BotezStelutaLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Invitații Botez Online — Demo Stil Steluțe și Lună',
      description: 'Demo invitație digitală de botez pentru băieți. Tematică caldă și elegantă cu stele sclipitoare pentru un eveniment de poveste. RSVP instant, hărți GPS Waze și Google Maps.',
      url: 'https://www.vibeinvite.ro/invitatie-botez-online-baiat-steluta',
      inLanguage: 'ro',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Cum creez o invitație de botez online cu tematică steluțe pentru băieți?',
          acceptedAnswer: { '@type': 'Answer', text: 'Pe platforma VibeInvite alegi tema Steluță, completezi datele despre slujba religioasă și petrecere, adaugi numele băiețelului tău și generezi instant linkul gata de trimis pe WhatsApp sau rețelele sociale.' }
        },
        {
          '@type': 'Question',
          name: 'Cum funcționează confirmările RSVP pentru invitația cu steluțe?',
          acceptedAnswer: { '@type': 'Answer', text: 'Oaspeții accesează linkul invitației direct de pe telefon și completează formularul RSVP integrat. Tu primești toate confirmările și opțiunile lor în timp real.' }
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