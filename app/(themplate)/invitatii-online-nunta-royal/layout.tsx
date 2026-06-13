import { Metadata } from 'next'

// 1. Aici citește Google Titlul, Descrierea și Tag-urile Social Media (Facebook/Twitter)
export const metadata: Metadata = {
  title: 'Invitație Online Nuntă Regală și Elegantă | VibeInvite',
  description: 'Creează o invitație digitală de nuntă în stil regal. Design somptuos cu nuanțe de albastru profund, argintiu și detalii sofisticate. Include RSVP online, GPS și meniu QR.',
  keywords: 'invitatii nunta regale, invitatie digitala eleganta nunta, invitatie online somptuoasa, invitatii nunta albastru regal, RSVP nunta online, vibeinvite, invitatii nunta premium',
  alternates: {
    canonical: 'https://www.vibeinvite.ro/invitatie-online-nunta-royal',
  },
  openGraph: {
    title: 'Invitație Online Nuntă Stil Regal și Sofisticat | VibeInvite',
    description: 'Demo invitație digitală de nuntă în stil regal. Majestate și eleganță prin nuanțe profunde și detalii de catifea. RSVP instant, hărți GPS și album foto live.',
    type: 'website',
    url: 'https://www.vibeinvite.ro/invitatie-online-nunta-royal',
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
export default function RoyalLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Invitații Nuntă Online — Stil Regal',
      description: 'Demo invitație digitală de nuntă în stil regal. Majestate și eleganță pentru evenimente memorabile. RSVP instant, locație GPS și upload poze invitați.',
      url: 'https://www.vibeinvite.ro/invitatie-online-nunta-royal',
      inLanguage: 'ro',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Cum creez o invitație de nuntă online în stil regal?',
          acceptedAnswer: { '@type': 'Answer', text: 'Pe platforma VibeInvite alegi tema Royal, introduci datele evenimentului tău grandios și personalizezi invitația digitală pentru a reflecta eleganța și prestigiul nunții tale.' }
        },
        {
          '@type': 'Question',
          name: 'Ce detalii premium include tema Royal?',
          acceptedAnswer: { '@type': 'Answer', text: 'Tema Royal oferă un design impunător, cu nuanțe de albastru regal, formular RSVP digital, integrare GPS pentru locație, meniu QR sofisticat și album foto privat pentru ca invitații să împărtășească momentele din timpul nunții.' }
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