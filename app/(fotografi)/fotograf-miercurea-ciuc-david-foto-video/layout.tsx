// app/(fotografi)/fotograf-miercurea-ciuc-david-foto-video/layout.tsx
import type { Metadata } from 'next';
import { neon } from '@neondatabase/serverless';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = 'fotograf-miercurea-ciuc-david-foto-video' AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProvider();
  const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const ogImage = p?.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/${p?.profile_image}.jpg`;

  return {
    title: 'Fotograf Miercurea Ciuc – David Foto-Video, Harghita | VibeInvite',
    description: 'David Foto-Video retrăiește nunta ta prin imagini autentice, în Miercurea Ciuc și tot județul Harghita. Foto-video complet pentru nunți și botezuri. Sună: 0724347993.',
    keywords: [
      'fotograf Miercurea Ciuc',
      'fotograf Harghita',
      'David Foto Video',
      'videograf nuntă Harghita',
      'foto video nuntă Miercurea Ciuc',
      'fotograf botez Harghita',
      'fotograf evenimente Miercurea Ciuc',
      'fotograf autentic Harghita',
    ],
    metadataBase: new URL('https://www.vibeinvite.ro'),
    alternates: { canonical: 'https://www.vibeinvite.ro/fotograf-miercurea-ciuc-david-foto-video' },
    openGraph: {
      type: 'profile',
      url: 'https://www.vibeinvite.ro/fotograf-miercurea-ciuc-david-foto-video',
      title: 'David Foto-Video, fotograf în Miercurea Ciuc',
      description: 'Portofoliu foto-video de nuntă și botez, realizat în Miercurea Ciuc pentru tot județul Harghita.',
      siteName: 'VibeInvite',
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Portofoliu David Foto-Video, fotograf Miercurea Ciuc, Harghita' }],
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'David Foto-Video, fotograf Miercurea Ciuc',
      description: 'Foto-video de nuntă cu emoție autentică, în Harghita.',
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
        '@id': 'https://www.vibeinvite.ro/fotograf-miercurea-ciuc-david-foto-video#business',
        name: 'David Foto-Video',
        image: ogImage,
        url: 'https://www.vibeinvite.ro/fotograf-miercurea-ciuc-david-foto-video',
        telephone: '0724347993',
        priceRange: '$$',
        areaServed: [
          { '@type': 'City', name: 'Miercurea Ciuc' },
          { '@type': 'AdministrativeArea', name: 'Harghita' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Miercurea Ciuc',
          addressRegion: 'Harghita',
          addressCountry: 'RO',
        },
        makesOffer: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            serviceType: 'Foto-video nuntă și botez',
            name: 'Servicii foto-video evenimente',
          },
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.vibeinvite.ro/fotograf-miercurea-ciuc-david-foto-video#webpage',
        url: 'https://www.vibeinvite.ro/fotograf-miercurea-ciuc-david-foto-video',
        name: 'Fotograf Miercurea Ciuc – David Foto-Video, Harghita',
        isPartOf: { '@id': 'https://www.vibeinvite.ro#website' },
        about: { '@id': 'https://www.vibeinvite.ro/fotograf-miercurea-ciuc-david-foto-video#business' },
        primaryImageOfPage: { '@type': 'ImageObject', url: ogImage },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://www.vibeinvite.ro/fotograf-miercurea-ciuc-david-foto-video' },
          { '@type': 'ListItem', position: 2, name: 'Fotografi', item: 'https://www.vibeinvite.ro/fotograf-miercurea-ciuc-david-foto-video' },
          { '@type': 'ListItem', position: 3, name: 'Miercurea Ciuc', item: 'https://www.vibeinvite.ro/fotograf-miercurea-ciuc-david-foto-video' },
          { '@type': 'ListItem', position: 4, name: 'David Foto-Video', item: 'https://www.vibeinvite.ro/fotograf-miercurea-ciuc-david-foto-video' },
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