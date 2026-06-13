import { Metadata } from 'next'

// Metadatele pe care Google le citește direct de pe server
export const metadata: Metadata = {
  title: 'Invitație Online Botez Băiat cu Mașinuță | VibeInvite',
  description: 'Creează o invitație digitală de botez pentru băiat în stil bleu elegant, cu mașinuță animată, norișori și steluțe. Include RSVP online și locație GPS.',
  keywords: 'invitatii botez online, invitatii botez digitale, invitatie botez baiat, invitatie botez masinuta, rsvp botez online, vibeinvite',
  alternates: {
    canonical: 'https://www.vibeinvite.ro/invitatie-botez-online-baiat-masinuta',
  },
  openGraph: {
    title: 'Invitație Digitală Botez Băiat — Stil Bleu Mașinuță | VibeInvite',
    description: 'Demo invitație digitală de botez pentru băiețel. Bleu, elegantă, cu animații interactive. RSVP instant integrat și butoane GPS.',
    type: 'website',
    url: 'https://www.vibeinvite.ro/invitatie-botez-online-baiat-masinuta',
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
export default function BotezMasinutaLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Invitații Botez Online — Demo Stil Bleu Mașinuță',
      description: 'Demo invitație digitală de botez pentru băiat. Bleu, elegantă, cu mașinuță animată. RSVP instant, hărți GPS Waze și Google Maps.',
      url: 'https://www.vibeinvite.ro/invitatie-botez-online-baiat-masinuta',
      inLanguage: 'ro',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Cum creez o invitație de botez online cu mașinuță?',
          acceptedAnswer: { '@type': 'Answer', text: 'Pe platforma VibeInvite alegi tema cu mașinuță, adaugi detaliile tainei botezului și ale petrecerii, completezi numele copilului și generezi linkul personalizat.' }
        },
        {
          '@type': 'Question',
          name: 'Invitațiile digitale de botez includ formular de confirmare?',
          acceptedAnswer: { '@type': 'Answer', text: 'Da! Toate invitațiile noastre premium vin cu modul RSVP integrat, prin care oaspeții pot selecta numărul de persoane direct de pe telefon.' }
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