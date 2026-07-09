// app/(fotografi)/fotograf-targoviste-bianca-sfetcu/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fotograf Nuntă Târgoviște – Bianca Sfetcu, Dâmbovița | VibeInvite',
  description: 'Bianca Sfetcu transformă ziua nunții tale în amintiri vizuale autentice, în Târgoviște și tot județul Dâmbovița. Rezervă o sesiune: 0771622171.',
  keywords: [
    'fotograf Târgoviște',
    'fotograf Dâmbovița',
    'Bianca Sfetcu fotograf',
    'fotograf nuntă Muntenia',
    'foto video nuntă Târgoviște',
    'fotograf logodnă Dâmbovița',
    'fotograf cuplu Târgoviște',
    'ședință foto cuplu Dâmbovița',
    'fotograf artistic Târgoviște',
  ],
  metadataBase: new URL('https://www.vibeinvite.ro'),
  alternates: { canonical: 'https://www.vibeinvite.ro/fotograf-targoviste-bianca-sfetcu' },
  openGraph: {
    type: 'profile',
    url: 'https://www.vibeinvite.ro/fotograf-targoviste-bianca-sfetcu',
    title: 'Bianca Sfetcu, fotograf de nuntă în Târgoviște',
    description: 'Portofoliu foto-video de nuntă, logodnă și cuplu, realizat în Târgoviște pentru Dâmbovița.',
    siteName: 'VibeInvite',
    images: [{ url: 'https://www.vibeinvite.ro/weed.jpg', width: 1200, height: 630, alt: 'Portofoliu Bianca Sfetcu, fotograf nuntă Târgoviște, Dâmbovița' }],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bianca Sfetcu, fotograf Târgoviște',
    description: 'Foto-video nuntă și logodnă, în Dâmbovița.',
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
        '@id': 'https://www.vibeinvite.ro/fotograf-targoviste-bianca-sfetcu#business',
        name: 'Bianca Sfetcu Foto-Video',
        image: 'https://www.vibeinvite.ro/weed.jpg',
        url: 'https://www.vibeinvite.ro/fotograf-targoviste-bianca-sfetcu',
        telephone: '0771622171',
        priceRange: '$$',
        areaServed: [
          { '@type': 'City', name: 'Târgoviște' },
          { '@type': 'AdministrativeArea', name: 'Dâmbovița' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Târgoviște',
          addressRegion: 'Dâmbovița',
          addressCountry: 'RO',
        },
        makesOffer: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            serviceType: 'Foto-video nuntă și logodnă',
            name: 'Servicii fotografie evenimente',
          },
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.vibeinvite.ro/fotograf-targoviste-bianca-sfetcu#webpage',
        url: 'https://www.vibeinvite.ro/fotograf-targoviste-bianca-sfetcu',
        name: 'Fotograf Nuntă Târgoviște – Bianca Sfetcu, Dâmbovița',
        isPartOf: { '@id': 'https://www.vibeinvite.ro#website' },
        about: { '@id': 'https://www.vibeinvite.ro/fotograf-targoviste-bianca-sfetcu#business' },
        primaryImageOfPage: { '@type': 'ImageObject', url: 'https://www.vibeinvite.ro/weed.jpg' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://www.vibeinvite.ro/fotograf-targoviste-bianca-sfetcu' },
          { '@type': 'ListItem', position: 2, name: 'Fotografi', item: 'https://www.vibeinvite.ro/fotograf-targoviste-bianca-sfetcu' },
          { '@type': 'ListItem', position: 3, name: 'Târgoviște', item: 'https://www.vibeinvite.ro/fotograf-targoviste-bianca-sfetcu' },
          { '@type': 'ListItem', position: 4, name: 'Bianca Sfetcu', item: 'https://www.vibeinvite.ro/fotograf-targoviste-bianca-sfetcu' },
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