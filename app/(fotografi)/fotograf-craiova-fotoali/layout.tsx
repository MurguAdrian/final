// app/(fotografi)/foto-ali/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fotograf Craiova FotoAli – Nunți & Evenimente Dolj | VibeInvite',
  description: 'FotoAli surprinde poveștile de nuntă din Craiova cu un ochi artistic și atenție la detalii. Foto-video premium în Dolj și Oltenia. Sună: 0769217174.',
  keywords: [
    'fotograf Craiova',
    'fotograf nuntă Dolj',
    'FotoAli fotograf',
    'foto video nuntă Craiova',
    'fotograf artistic Craiova',
    'fotograf nuntă Oltenia',
    'fotograf botez Craiova',
    'ședință foto mireasă Craiova',
    'fotograf disponibil România',
  ],
  metadataBase: new URL('https://www.vibeinvite.ro'),
  alternates: { canonical: 'https://www.vibeinvite.ro/fotograf-craiova-fotoali' },
  openGraph: {
    type: 'profile',
    url: 'https://www.vibeinvite.ro/fotograf-craiova-fotoali',
    title: 'FotoAli, fotograf de nuntă din Craiova',
    description: 'Poveștile de nuntă din Dolj, spuse prin imagini. Portofoliu foto-video, disponibil oriunde în țară.',
    siteName: 'VibeInvite',
    images: [{ url: 'https://www.vibeinvite.ro/weed.jpg', width: 1200, height: 630, alt: 'Portofoliu FotoAli, fotograf nuntă Craiova, Dolj' }],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FotoAli, fotograf nuntă Craiova',
    description: 'Foto-video de nuntă cu stil, din Craiova pentru toată Oltenia.',
    images: ['https://www.vibeinvite.ro/weed.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://www.vibeinvite.ro/fotograf-craiova-fotoali#business',
        name: 'FotoAli',
        image: 'https://www.vibeinvite.ro/weed.jpg',
        url: 'https://www.vibeinvite.ro/fotograf-craiova-fotoali',
        telephone: '0769217174',
        priceRange: '$$',
        areaServed: [
          { '@type': 'City', name: 'Craiova' },
          { '@type': 'AdministrativeArea', name: 'Dolj' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Craiova',
          addressRegion: 'Dolj',
          addressCountry: 'RO',
        },
        makesOffer: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            serviceType: 'Fotografie nuntă documentar și artistic',
            name: 'Foto-video nuntă, botez, evenimente',
          },
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.vibeinvite.ro/fotograf-craiova-fotoali#webpage',
        url: 'https://www.vibeinvite.ro/fotograf-craiova-fotoali',
        name: 'Fotograf Craiova FotoAli – Nunți & Evenimente Dolj',
        isPartOf: { '@id': 'https://www.vibeinvite.ro#website' },
        about: { '@id': 'https://www.vibeinvite.ro/fotograf-craiova-fotoali#business' },
        primaryImageOfPage: { '@type': 'ImageObject', url: 'https://www.vibeinvite.ro/weed.jpg' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://www.vibeinvite.ro/fotograf-craiova-fotoali' },
          { '@type': 'ListItem', position: 2, name: 'Fotografi', item: 'https://www.vibeinvite.ro/fotograf-craiova-fotoali' },
          { '@type': 'ListItem', position: 3, name: 'Craiova', item: 'https://www.vibeinvite.ro/fotograf-craiova-fotoali' },
          { '@type': 'ListItem', position: 4, name: 'FotoAli', item: 'https://www.vibeinvite.ro/fotograf-craiova-fotoali' },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}