// app/(fotografi)/fotograf-bucuresti-raluca-storylens/layout.tsx
import type { Metadata } from 'next';
import { neon } from '@neondatabase/serverless';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = 'fotograf-bucuresti-raluca-storylens' AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProvider();
  const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const ogImage = p?.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/${p?.profile_image}.jpg`;

  return {
    title: 'Raluca StoryLens – Fotograf Botezuri & Cununii București | VibeInvite',
    description: 'Raluca StoryLens – fotograf de evenimente în București, specializată în botezuri și cununii. Povești de familie spuse prin imagini, cu emoție și delicatețe. Contact: 0773824267.',
    keywords: [
      'fotograf botez București',
      'fotograf cununie București',
      'Raluca StoryLens',
      'fotograf bebeluși București',
      'fotograf evenimente București',
      'ședință foto botez',
      'fotograf cununie civilă București',
      'fotograf familie București',
      'poze botez București',
    ],
    metadataBase: new URL('https://www.vibeinvite.ro'),
    alternates: { canonical: 'https://www.vibeinvite.ro/fotograf-bucuresti-raluca-storylens' },
    openGraph: {
      type: 'profile',
      url: 'https://www.vibeinvite.ro/fotograf-bucuresti-raluca-storylens',
      title: 'Raluca StoryLens – Fotograf Botezuri & Cununii București | VibeInvite',
      description: 'Povești de familie spuse prin imagini. Botezuri, cununii și momente care rămân — fotografiate cu emoție și delicatețe.',
      siteName: 'VibeInvite',
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Raluca StoryLens fotograf botez cununie București' }],
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Raluca StoryLens – Fotograf Botezuri & Cununii București',
      description: 'Povești de familie spuse prin imagini, cu emoție și delicatețe.',
      images: [ogImage],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}