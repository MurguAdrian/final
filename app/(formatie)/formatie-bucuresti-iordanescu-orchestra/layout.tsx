// app/(formatie)/formatie-bucuresti-iordanescu-orchestra/layout.tsx
import type { Metadata } from 'next';
import { neon } from '@neondatabase/serverless';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = 'formatie-bucuresti-iordanescu-orchestra' AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProvider();
  const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const ogImage = p?.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/${p?.profile_image}.jpg`;

  return {
    title: 'Formație Nuntă București – Iordănescu Orchestra | VibeInvite',
    description: 'Iordănescu Orchestra aduce energie și eleganță la petrecerea ta din București. Muzică live pentru nunți, botezuri și evenimente corporate. Sună: 0725474491.',
    keywords: [
      'formație nuntă București',
      'Iordănescu Orchestra',
      'formație muzică live București',
      'orchestra nuntă București',
      'formație botez București',
      'formație evenimente corporate',
      'trupă live nuntă București',
      'formație profesională muzică',
    ],
    metadataBase: new URL('https://www.vibeinvite.ro'),
    alternates: { canonical: 'https://www.vibeinvite.ro/formatie-bucuresti-iordanescu-orchestra' },
    openGraph: {
      type: 'profile',
      url: 'https://www.vibeinvite.ro/formatie-bucuresti-iordanescu-orchestra',
      title: 'Iordănescu Orchestra, formație de nuntă în București',
      description: 'Repertoriu live variat pentru nunți, botezuri și evenimente corporate din București.',
      siteName: 'VibeInvite',
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Iordănescu Orchestra, formație muzică live București' }],
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Iordănescu Orchestra, formație București',
      description: 'Muzică live pentru nunți și evenimente, în București.',
      images: [ogImage],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const p = await getProvider();
  const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const ogImage = p?.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/${p?.profile_image}.jpg`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://www.vibeinvite.ro/formatie-bucuresti-iordanescu-orchestra#business',
        name: 'Iordănescu Orchestra',
        image: ogImage,
        url: 'https://www.vibeinvite.ro/formatie-bucuresti-iordanescu-orchestra',
        telephone: '0725474491',
        priceRange: '$$',
        areaServed: { '@type': 'City', name: 'București' },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'București',
          addressCountry: 'RO',
        },
        makesOffer: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            serviceType: 'Muzică live evenimente',
            name: 'Formație pentru nunți, botezuri și evenimente corporate',
          },
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.vibeinvite.ro/formatie-bucuresti-iordanescu-orchestra#webpage',
        url: 'https://www.vibeinvite.ro/formatie-bucuresti-iordanescu-orchestra',
        name: 'Formație Nuntă București – Iordănescu Orchestra',
        isPartOf: { '@id': 'https://www.vibeinvite.ro#website' },
        about: { '@id': 'https://www.vibeinvite.ro/formatie-bucuresti-iordanescu-orchestra#business' },
        primaryImageOfPage: { '@type': 'ImageObject', url: ogImage },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://www.vibeinvite.ro/formatie-bucuresti-iordanescu-orchestra' },
          { '@type': 'ListItem', position: 2, name: 'Formații', item: 'https://www.vibeinvite.ro/formatie-bucuresti-iordanescu-orchestra' },
          { '@type': 'ListItem', position: 3, name: 'București', item: 'https://www.vibeinvite.ro/formatie-bucuresti-iordanescu-orchestra' },
          { '@type': 'ListItem', position: 4, name: 'Iordănescu Orchestra', item: 'https://www.vibeinvite.ro/formatie-bucuresti-iordanescu-orchestra' },
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