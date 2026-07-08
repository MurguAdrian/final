// app/(fotografi)/fotograf-brasov-ireph-graphy/layout.tsx
import type { Metadata } from 'next';
import { neon } from '@neondatabase/serverless';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = 'fotograf-brasov-ireph-graphy' AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProvider();
  const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const ogImage = p?.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/${p?.profile_image}.jpg`;

  return {
    title: 'Ireph_graphy – Fotograf Evenimente Brașov | VibeInvite',
    description: 'Ireph_graphy – fotograf de evenimente în Brașov. Fotografie alb-negru și color cu suflet: nunți, botezuri, cununii, ședințe foto de familie. Contact: 0734537605.',
    keywords: [
      'fotograf Brașov',
      'fotograf nuntă Brașov',
      'fotograf evenimente Brașov',
      'Ireph_graphy',
      'fotograf botez Brașov',
      'fotograf cununie Brașov',
      'ședință foto familie Brașov',
      'fotograf alb-negru Brașov',
      'foto video nuntă Brașov',
    ],
    metadataBase: new URL('https://www.vibeinvite.ro'),
    alternates: { canonical: 'https://www.vibeinvite.ro/fotograf-brasov-ireph-graphy' },
    openGraph: {
      type: 'profile',
      url: 'https://www.vibeinvite.ro/fotograf-brasov-ireph-graphy',
      title: 'Ireph_graphy – Fotograf Evenimente Brașov | VibeInvite',
      description: 'Fotografie alb-negru și color cu suflet. Nunți, botezuri, cununii și ședințe foto de familie în Brașov.',
      siteName: 'VibeInvite',
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Ireph_graphy fotograf evenimente Brașov' }],
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ireph_graphy – Fotograf Evenimente Brașov',
      description: 'Fotografie cu suflet în Brașov. Nunți, botezuri, cununii, familie.',
      images: [ogImage],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}