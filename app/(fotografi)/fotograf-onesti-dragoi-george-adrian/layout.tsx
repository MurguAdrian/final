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
  const ogImage = `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/${p.profile_image}.jpg`;

  return {
    title: `${p.name} – Fotograf Evenimente Onești, Bacău | VibeInvite`,
    description: `${p.name} este fotograf profesionist de evenimente în Onești, județul Bacău. Servicii foto-video pentru nunți și evenimente speciale. Contact direct: ${p.phone}.`,
    keywords: [
      'fotograf Onești',
      'fotograf Bacău',
      'fotograf nuntă Onești',
      'fotograf evenimente Bacău',
      'foto-video nuntă Bacău',
      `${p.name} fotograf`,
      'fotograf profesionist Onești',
    ],
    metadataBase: new URL('https://www.vibeinvite.ro'),
    alternates: { canonical: `https://www.vibeinvite.ro/fotograf-onesti-dragoi-george-adrian` },
    openGraph: {
      type: 'profile',
      url: `https://www.vibeinvite.ro/fotograf-onesti-dragoi-george-adrian`,
      title: `Fotograf Onești,Bacău Nunti,Botezuri George Dragoi Adrian | VibeInvite`,
      description: `Fotograf profesionist de evenimente în Onești, Bacău. Servicii foto-video pentru nunți și evenimente speciale.`,
      siteName: 'VibeInvite',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${p.name} fotograf` }],
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Fotograf Onești,Bacău Nunti,Botezuri George Dragoi Adrian | VibeInvite`,
      description: `Fotograf profesionist de evenimente în Onești, Bacău.`,
      images: [ogImage],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}