import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invitație Majorat 18 Ani Online | Invitatie Digitală Elegantă — VibeInvite',
  description: 'Invitație digitală majorat 18 ani online, elegantă și personalizată. RSVP instant, GPS inclus, upload poze, countdown live. Crează-ți invitația în 3 minute!',
  keywords: [
    'invitatie majorat online','invitatie majorat 18 ani','invitatii majorat digitale','invitatie digitala majorat','invitatie aniversare 18 ani','invitatii online majorat fete','invitatii majorat elegante','invitatie majorat personalizata','creare invitatie majorat online','link invitatie majorat','RSVP majorat online','invitatie majorat premium','invitatii digitale personalizate','invitatie majorat roz','invitatie majorat auriu','invitatie digitala aniversare','majorat 18 ani invitatii online','invitatie majorat moderna','invitatii digitale majorat romania','vibeinvite majorat','invitatie petrecere majorat','confirmare prezenta majorat','invitatie majorat gratuit','upload poze majorat','invitatie majorat luxury'
  ].join(', '),
  metadataBase: new URL('https://www.vibeinvite.ro'),
  alternates: {
    canonical: '/invitatie-online-aniversare-majorat-18-ani',
  },
  openGraph: {
    title: 'Invitație Majorat 18 Ani Online — VibeInvite Demo',
    description: 'Demo invitație digitală de majorat 18 ani. Elegantă, feminină, roz & auriu. RSVP instant, GPS, upload poze invitați.',
    type: 'website',
    url: 'https://www.vibeinvite.ro/invitatie-online-aniversare-majorat-18-ani',
    siteName: 'VibeInvite',
    images: [{ url: 'https://www.vibeinvite.ro/og-majorat.jpg', width: 1200, height: 630, alt: 'Invitatie Majorat 18 Ani Online VibeInvite' }],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invitație Majorat 18 Ani Online — VibeInvite',
    description: 'Invitație digitală majorat 18 ani. Elegantă, feminină, roz & auriu. RSVP, GPS, upload poze.',
    images: ['https://www.vibeinvite.ro/og-majorat.jpg'],
  },
  robots: { index: true, follow: true },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Majorat Andreea Maria — 18 Ani',
    startDate: '2027-06-14T20:00:00+03:00',
    endDate: '2027-06-15T04:00:00+03:00',
    location: {
      '@type': 'Place',
      name: 'Grand Ballroom Events',
      address: { '@type': 'PostalAddress', streetAddress: 'Calea Floreasca 169', addressLocality: 'București', addressCountry: 'RO' },
    },
    description: 'Petrecere de majorat 18 ani pentru Andreea Maria. Invitație digitală cu RSVP online, GPS și upload poze.',
    organizer: { '@type': 'Person', name: 'Andreea Maria' },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'RON', description: 'Invitație online gratuită' },
    image:     {
        url: 'https://www.vibeinvite.ro/og-main.jpg', // Imaginea ta generală din public
        width: 1200,
        height: 630,
      },
    url: 'https://www.vibeinvite.ro/invitatie-online-aniversare-majorat-18-ani',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Invitație Majorat 18 Ani Online — Demo VibeInvite',
    description: 'Demo invitație digitală majorat 18 ani. Elegantă, feminină. RSVP instant, GPS, upload poze.',
    url: 'https://www.vibeinvite.ro/invitatie-online-aniversare-majorat-18-ani',
    inLanguage: 'ro',
    isPartOf: { '@type': 'WebSite', name: 'VibeInvite', url: 'https://www.vibeinvite.ro' },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://www.vibeinvite.ro' },
        { '@type': 'ListItem', position: 2, name: 'Invitații Digitale', item: 'https://www.vibeinvite.ro/invitatii-digitale' },
        { '@type': 'ListItem', position: 3, name: 'Demo Majorat 18 Ani', item: 'https://www.vibeinvite.ro/invitatie-online-aniversare-majorat-18-ani' },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Ce este o invitație digitală de majorat?', acceptedAnswer: { '@type': 'Answer', text: 'O invitație digitală de majorat este un link online elegant pe care îl trimiți invitaților în loc de invitație fizică. Pe VibeInvite, tema Majorat are design feminin roz-auriu cu RSVP, countdown și upload poze.' } },
      { '@type': 'Question', name: 'Pot face o invitație de majorat online gratuit?', acceptedAnswer: { '@type': 'Answer', text: 'Da! Pe VibeInvite primești un link de invitație gratuit. Pachetele premium includ RSVP, countdown live, upload poze și export Excel.' } },
      { '@type': 'Question', name: 'Cum colectez confirmările de la invitați la majorat?', acceptedAnswer: { '@type': 'Answer', text: 'VibeInvite include un formular RSVP online. Invitații confirmă prezența direct din link, iar tu vezi răspunsurile într-un panou de control și le poți exporta în Excel.' } },
    ],
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
        {jsonLd.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </head>
      <body>
        {children}
        {/* SEO hidden text — indexable */}
        <div style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }} aria-hidden="true">
          Invitație majorat online 18 ani elegantă și personalizată. Invitații digitale majorat fete tinere femei. Creare invitație majorat online gratuit România. RSVP majorat online confirmare prezență. Invitatie digitala personalizata aniversare 18 ani luxury premium roz auriu. VibeInvite platformă invitații digitale nuntă botez majorat.
        </div>
      </body>
    </html>
  )
}
