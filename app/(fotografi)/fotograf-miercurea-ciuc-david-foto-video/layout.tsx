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
    title: 'David Foto-Video – Fotograf Nuntă Miercurea Ciuc, Harghita | VibeInvite',
    description: 'David Foto-Video – fotograf și videograf profesionist în Miercurea Ciuc, Harghita. Amintiri trăite din nou, emoții surprinse autentic. Nunți, botezuri, evenimente. Contact: 0724347993.',
    keywords: [
      'fotograf nuntă Miercurea Ciuc',
      'fotograf Harghita',
      'videograf nuntă Harghita',
      'David Foto Video',
      'foto video nuntă Miercurea Ciuc',
      'fotograf profesionist Harghita',
      'fotograf evenimente Miercurea Ciuc',
      'fotograf botez Harghita',
    ],
    metadataBase: new URL('https://www.vibeinvite.ro'),
    alternates: { canonical: 'https://www.vibeinvite.ro/fotograf-miercurea-ciuc-david-foto-video' },
    openGraph: {
      type: 'profile',
      url: 'https://www.vibeinvite.ro/fotograf-miercurea-ciuc-david-foto-video',
      title: 'David Foto-Video – Fotograf Nuntă Miercurea Ciuc | VibeInvite',
      description: 'Amintiri trăite din nou, emoții surprinse la momentul potrivit. Fotograf și videograf în Miercurea Ciuc, Harghita.',
      siteName: 'VibeInvite',
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'David Foto-Video fotograf nuntă Miercurea Ciuc' }],
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'David Foto-Video – Fotograf Nuntă Miercurea Ciuc',
      description: 'Fotograf și videograf profesionist în Miercurea Ciuc, Harghita.',
      images: [ogImage],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}