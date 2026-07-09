// app/(fotografi)/fotograf-ilfov-dgc-media-wedding/layout.tsx
import type { Metadata } from 'next';
import { neon } from '@neondatabase/serverless';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = 'fotograf-ilfov-dgc-media-wedding' AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProvider();
  const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const ogImage = p?.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/${p?.profile_image}.jpg`;

  return {
    title: 'Foto-Video Nuntă Ilfov – DGC Media Wedding | VibeInvite',
    description: 'Nunta ta filmată și fotografiată profesionist în Ilfov și București. DGC Media Wedding livrează montaj modern rapid, cu contract și factură fiscală. Sună: 0769656065.',
    keywords: [
      'fotograf nuntă Ilfov',
      'videograf nuntă Ilfov',
      'DGC Media Wedding',
      'foto video nuntă București',
      'filmări nuntă profesionale Ilfov',
      'pachet foto video nuntă',
      'montaj video nuntă modern',
      'fotograf nuntă cu contract',
    ],
    metadataBase: new URL('https://www.vibeinvite.ro'),
    alternates: { canonical: 'https://www.vibeinvite.ro/fotograf-ilfov-dgc-media-wedding' },
    openGraph: {
      type: 'profile',
      url: 'https://www.vibeinvite.ro/fotograf-ilfov-dgc-media-wedding',
      title: 'DGC Media Wedding, foto-video nuntă în Ilfov',
      description: 'Echipă completă de fotografie și filmare pentru nunți în Ilfov și București, cu livrare rapidă.',
      siteName: 'VibeInvite',
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Portofoliu DGC Media Wedding, foto-video nuntă Ilfov' }],
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DGC Media Wedding, foto-video nuntă Ilfov',
      description: 'Filmări și fotografii de nuntă cu montaj modern, în Ilfov și București.',
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
        '@id': 'https://www.vibeinvite.ro/fotograf-ilfov-dgc-media-wedding#business',
        name: 'DGC Media Wedding',
        image: ogImage,
        url: 'https://www.vibeinvite.ro/fotograf-ilfov-dgc-media-wedding',
        telephone: '0769656065',
        priceRange: '$$',
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Ilfov' },
          { '@type': 'City', name: 'București' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Ilfov',
          addressCountry: 'RO',
        },
        makesOffer: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            serviceType: 'Foto-video nuntă',
            name: 'Pachet complet fotografie și filmare nuntă',
          },
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.vibeinvite.ro/fotograf-ilfov-dgc-media-wedding#webpage',
        url: 'https://www.vibeinvite.ro/fotograf-ilfov-dgc-media-wedding',
        name: 'Foto-Video Nuntă Ilfov – DGC Media Wedding',
        isPartOf: { '@id': 'https://www.vibeinvite.ro#website' },
        about: { '@id': 'https://www.vibeinvite.ro/fotograf-ilfov-dgc-media-wedding#business' },
        primaryImageOfPage: { '@type': 'ImageObject', url: ogImage },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://www.vibeinvite.ro/fotograf-ilfov-dgc-media-wedding' },
          { '@type': 'ListItem', position: 2, name: 'Fotografi', item: 'https://www.vibeinvite.ro/fotograf-ilfov-dgc-media-wedding' },
          { '@type': 'ListItem', position: 3, name: 'Ilfov', item: 'https://www.vibeinvite.ro/fotograf-ilfov-dgc-media-wedding' },
          { '@type': 'ListItem', position: 4, name: 'DGC Media Wedding', item: 'https://www.vibeinvite.ro/fotograf-ilfov-dgc-media-wedding' },
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