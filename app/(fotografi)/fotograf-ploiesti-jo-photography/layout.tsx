// app/(fotografi)/fotograf-ploiesti-jo-photography/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fotograf Nuntă Ploiești – JoPhotography, Prahova | VibeInvite',
  description: 'Vrei fotografii de nuntă care rămân mărturie peste ani? JoPhotography lucrează în Ploiești și tot județul Prahova. Rezervă acum: 0728433155.',
  keywords: [
    'fotograf Ploiești',
    'fotograf Prahova',
    'JoPhotography fotograf',
    'fotograf nuntă Muntenia',
    'foto video nuntă Ploiești',
    'fotograf evenimente Prahova',
    'fotograf artistic Ploiești',
    'ședință foto mireasă Ploiești',
    'fotograf disponibil Prahova',
  ],
  metadataBase: new URL('https://www.vibeinvite.ro'),
  alternates: { canonical: 'https://www.vibeinvite.ro/fotograf-ploiesti-jo-photography' },
  openGraph: {
    type: 'profile',
    url: 'https://www.vibeinvite.ro/fotograf-ploiesti-jo-photography',
    title: 'JoPhotography, fotograf de nuntă în Ploiești',
    description: 'Imagini care surprind emoția reală a zilei de nuntă, în Ploiești și Prahova.',
    siteName: 'VibeInvite',
    images: [{ url: 'https://www.vibeinvite.ro/weed.jpg', width: 1200, height: 630, alt: 'Portofoliu JoPhotography, fotograf nuntă Ploiești, Prahova' }],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoPhotography, fotograf Ploiești',
    description: 'Fotografii de nuntă cu emoție autentică, în Prahova.',
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
        '@id': 'https://www.vibeinvite.ro/fotograf-ploiesti-jo-photography#business',
        name: 'JoPhotography',
        image: 'https://www.vibeinvite.ro/weed.jpg',
        url: 'https://www.vibeinvite.ro/fotograf-ploiesti-jo-photography',
        telephone: '0728433155',
        priceRange: '$$',
        areaServed: [
          { '@type': 'City', name: 'Ploiești' },
          { '@type': 'AdministrativeArea', name: 'Prahova' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ploiești',
          addressRegion: 'Prahova',
          addressCountry: 'RO',
        },
        makesOffer: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            serviceType: 'Fotografie nuntă',
            name: 'Servicii foto nuntă și evenimente',
          },
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.vibeinvite.ro/fotograf-ploiesti-jo-photography#webpage',
        url: 'https://www.vibeinvite.ro/fotograf-ploiesti-jo-photography',
        name: 'Fotograf Nuntă Ploiești – JoPhotography, Prahova',
        isPartOf: { '@id': 'https://www.vibeinvite.ro#website' },
        about: { '@id': 'https://www.vibeinvite.ro/fotograf-ploiesti-jo-photography#business' },
        primaryImageOfPage: { '@type': 'ImageObject', url: 'https://www.vibeinvite.ro/weed.jpg' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://www.vibeinvite.ro/fotograf-ploiesti-jo-photography' },
          { '@type': 'ListItem', position: 2, name: 'Fotografi', item: 'https://www.vibeinvite.ro/fotograf-ploiesti-jo-photography' },
          { '@type': 'ListItem', position: 3, name: 'Ploiești', item: 'https://www.vibeinvite.ro/fotograf-ploiesti-jo-photography' },
          { '@type': 'ListItem', position: 4, name: 'JoPhotography', item: 'https://www.vibeinvite.ro/fotograf-ploiesti-jo-photography' },
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