// app/(fotografi)/fotograf-bucuresti-razvan-ristea/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fotograf Nuntă București – Răzvan Ristea | Recomandat VibeInvite',
  description: 'Cauți un fotograf de nuntă cu suflet în București? Răzvan Ristea surprinde emoția reală, nu poza aranjată. Rezervă o ședință: +40726711251.',
  keywords: [
    'fotograf nuntă București',
    'fotograf profesionist București',
    'Răzvan Ristea fotograf',
    'foto video nuntă București',
    'fotograf evenimente Ilfov',
    'fotograf cuplu București',
    'fotograf stil documentary',
    'fotograf recomandat nuntă',
    'ședință foto logodnă București',
  ],
  metadataBase: new URL('https://www.vibeinvite.ro'),
  alternates: { canonical: 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea' },
  openGraph: {
    type: 'profile',
    url: 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea',
    title: 'Răzvan Ristea, fotograf de nuntă în București',
    description: 'Emoție surprinsă natural, fără regizare. Portofoliu de nunți și evenimente din București și Ilfov.',
    siteName: 'VibeInvite',
    images: [{ url: 'https://www.vibeinvite.ro/weed.jpg', width: 1200, height: 630, alt: 'Portofoliu foto nuntă semnat Răzvan Ristea, București' }],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Răzvan Ristea, fotograf nuntă București',
    description: 'Poze de nuntă în stil documentary, cu emoție reală, în București.',
    images: ['https://www.vibeinvite.ro/weed.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea#person',
        name: 'Răzvan Ristea',
        jobTitle: 'Fotograf de nuntă',
        image: 'https://www.vibeinvite.ro/weed.jpg',
        telephone: '+40726711251',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'București',
          addressCountry: 'RO',
        },
        worksFor: { '@id': 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea#business' },
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea#business',
        name: 'Răzvan Ristea Fotografie',
        image: 'https://www.vibeinvite.ro/weed.jpg',
        url: 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea',
        telephone: '+40726711251',
        priceRange: '$$',
        areaServed: [
          { '@type': 'City', name: 'București' },
          { '@type': 'AdministrativeArea', name: 'Ilfov' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'București',
          addressCountry: 'RO',
        },
        makesOffer: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            serviceType: 'Fotografie nuntă documentary',
            name: 'Foto-video nuntă, logodnă și evenimente',
          },
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea#webpage',
        url: 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea',
        name: 'Fotograf Nuntă București – Răzvan Ristea',
        isPartOf: { '@id': 'https://www.vibeinvite.ro#website' },
        about: { '@id': 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea#person' },
        primaryImageOfPage: { '@type': 'ImageObject', url: 'https://www.vibeinvite.ro/weed.jpg' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea' },
          { '@type': 'ListItem', position: 2, name: 'Fotografi', item: 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea' },
          { '@type': 'ListItem', position: 3, name: 'București', item: 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea' },
          { '@type': 'ListItem', position: 4, name: 'Răzvan Ristea', item: 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea' },
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