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
    title: 'Iordănescu Orchestra – Formație Profesională Nuntă București | VibeInvite',
    description: 'Iordănescu Orchestra – formație profesională pentru evenimente în București. Muzică live de calitate pentru nunți, petreceri și evenimente corporate. Contact: 0725474491.',
    keywords: [
      'formație nuntă București',
      'formație muzică live București',
      'Iordănescu Orchestra',
      'formație evenimente București',
      'muzică live nuntă',
      'formație profesională nuntă',
      'orchestra nuntă București',
      'formație botez București',
    ],
    metadataBase: new URL('https://www.vibeinvite.ro'),
    alternates: { canonical: 'https://www.vibeinvite.ro/formatie-bucuresti-iordanescu-orchestra' },
    openGraph: {
      type: 'profile',
      url: 'https://www.vibeinvite.ro/formatie-bucuresti-iordanescu-orchestra',
      title: 'Iordănescu Orchestra – Formație Profesională Nuntă București | VibeInvite',
      description: 'Formație profesională pentru evenimente. Muzică live de calitate pentru nunți și petreceri în București.',
      siteName: 'VibeInvite',
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Iordănescu Orchestra formație nuntă București' }],
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Iordănescu Orchestra – Formație Nuntă București',
      description: 'Formație profesională pentru evenimente în București.',
      images: [ogImage],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}