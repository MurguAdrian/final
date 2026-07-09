// app/fotograf-onesti-dragoi-george-adrian/layout.tsx
import type { Metadata } from 'next';
import { neon } from '@neondatabase/serverless';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = 'fotograf-onesti-dragoi-george-adrian' AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProvider();
  const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const ogImage = p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/${p.profile_image}.jpg`;

  return {
    title: `Fotograf Onești – ${p.name}, Nunți & Botezuri Bacău | VibeInvite`,
    description: `${p.name} surprinde momentele importante ale evenimentului tău în Onești și tot județul Bacău. Foto-video pentru nunți și botezuri. Sună acum: ${p.phone}.`,
    keywords: [
      'fotograf Onești',
      'fotograf Bacău',
      `${p.name} fotograf`,
      'fotograf nuntă Onești',
      'fotograf botez Bacău',
      'foto video evenimente Onești',
      'fotograf profesionist Bacău',
      'ședință foto Onești',
    ],
    metadataBase: new URL('https://www.vibeinvite.ro'),
    alternates: { canonical: `https://www.vibeinvite.ro/fotograf-onesti-dragoi-george-adrian` },
    openGraph: {
      type: 'profile',
      url: `https://www.vibeinvite.ro/fotograf-onesti-dragoi-george-adrian`,
      title: `${p.name}, fotograf de evenimente în Onești`,
      description: `Portofoliu foto-video pentru nunți și botezuri, realizat în Onești pentru tot județul Bacău.`,
      siteName: 'VibeInvite',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `Portofoliu ${p.name}, fotograf Onești, Bacău` }],
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.name}, fotograf Onești`,
      description: `Foto-video nuntă și botez, în Onești, Bacău.`,
      images: [ogImage],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const p = await getProvider();
  const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const ogImage = p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/${p.profile_image}.jpg`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://www.vibeinvite.ro/fotograf-onesti-dragoi-george-adrian#business',
        name: p.name,
        image: ogImage,
        url: 'https://www.vibeinvite.ro/fotograf-onesti-dragoi-george-adrian',
        telephone: p.phone,
        priceRange: '$$',
        areaServed: [
          { '@type': 'City', name: 'Onești' },
          { '@type': 'AdministrativeArea', name: 'Bacău' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Onești',
          addressRegion: 'Bacău',
          addressCountry: 'RO',
        },
        makesOffer: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            serviceType: 'Fotografie evenimente',
            name: 'Foto-video nuntă și botez',
          },
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.vibeinvite.ro/fotograf-onesti-dragoi-george-adrian#webpage',
        url: 'https://www.vibeinvite.ro/fotograf-onesti-dragoi-george-adrian',
        name: `Fotograf Onești – ${p.name}, Nunți & Botezuri Bacău`,
        isPartOf: { '@id': 'https://www.vibeinvite.ro#website' },
        about: { '@id': 'https://www.vibeinvite.ro/fotograf-onesti-dragoi-george-adrian#business' },
        primaryImageOfPage: { '@type': 'ImageObject', url: ogImage },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://www.vibeinvite.ro/fotograf-onesti-dragoi-george-adrian' },
          { '@type': 'ListItem', position: 2, name: 'Fotografi', item: 'https://www.vibeinvite.ro/fotograf-onesti-dragoi-george-adrian' },
          { '@type': 'ListItem', position: 3, name: 'Onești', item: 'https://www.vibeinvite.ro/fotograf-onesti-dragoi-george-adrian' },
          { '@type': 'ListItem', position: 4, name: p.name, item: 'https://www.vibeinvite.ro/fotograf-onesti-dragoi-george-adrian' },
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