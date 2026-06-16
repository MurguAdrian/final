// app/(fotograf)/[slug]/layout.tsx
import { neon } from '@neondatabase/serverless';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

async function getProvider(slug: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${slug} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProvider(params.slug);
  if (!p) return { title: 'Furnizor negăsit' };
  return {
    title: `${p.name} – ${p.category} ${p.oras} | VibeInvite`,
    description: p.seo_description,
    openGraph: {
      title: `${p.name} – ${p.category} ${p.oras}`,
      description: p.seo_description,
      images: [
        `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_1200/${p.cloudinary_folder}/1.jpg`,
      ],
    },
  };
}

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}