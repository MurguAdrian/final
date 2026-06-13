import { Metadata } from 'next'

// Metadatele pe care Google le citește direct de pe server
export const metadata: Metadata = {
  title: 'Invitație Online Botez Fată cu Fluturi și Flori | VibeInvite',
  description: 'Creează o invitație digitală de botez pentru fetiță în stil fluture elegant, cu nuanțe pastelate, fluturași animați și flori delicate. Include RSVP online și locație GPS.',
  keywords: 'invitatii botez fata fluture, invitatii botez fete, invitatie digitala fluturi, invitatie online botez fetita, rsvp botez online, vibeinvite, invitatie botez roz pastel',
  alternates: {
    canonical: 'https://www.vibeinvite.ro/invitatie-botez-online-fata-fluture',
  },
  openGraph: {
    title: 'Invitație Digitală Botez Fetiță — Stil Elegant Fluture | VibeInvite',
    description: 'Demo invitație digitală de botez pentru fetiță. Tematică delicată cu fluturași magici, flori și detalii diafane. RSVP instant integrat și butoane GPS.',
    type: 'website',
    url: 'https://www.vibeinvite.ro/invitatie-botez-online-fata-fluture',
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
export default function BotezFlutureLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Invitații Botez Online — Demo Stil Fluture și Flori',
      description: 'Demo invitație digitală de botez pentru fetițe. Tematică diafană cu fluturași pastel și detalii magice. RSVP instant, hărți GPS Waze și Google Maps.',
      url: 'https://www.vibeinvite.ro/invitatie-botez-online-fata-fluture',
      inLanguage: 'ro',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Cum creez o invitație de botez online cu tematică fluture pentru o fetiță?',
          acceptedAnswer: { '@type': 'Answer', text: 'Pe platforma VibeInvite alegi tema Fluture, completezi detaliile despre Taina Sfântului Botez și petrecere, adaugi numele micuței tale prințese și generezi instant linkul gata de trimis pe WhatsApp.' }
        },
        {
          '@type': 'Question',
          name: 'Invitația digitală cu fluturi include confirmare RSVP pentru invitați?',
          acceptedAnswer: { '@type': 'Answer', text: 'Da! Toate invitațiile VibeInvite premium vin cu modul RSVP digital prin care oaspeții pot confirma participarea direct din browser, de pe telefon sau desktop.' }
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