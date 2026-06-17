// app/[shortSlug]/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

async function getProvider(shortSlug: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE short_slug = ${shortSlug} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

export async function generateMetadata({ params }: { params: { shortSlug: string } }): Promise<Metadata> {
  const p = await getProvider(params.shortSlug);
  if (!p) return { title: 'VibeInvite' };

  const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const ogImage = p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/${p.profile_image}.jpg`;

  return {
    title: `${p.name} – ${p.category} ${p.oras} | VibeInvite`,
    description: p.seo_description || `${p.name} – ${p.category} profesionist în ${p.oras}, ${p.judet}.`,
    metadataBase: new URL('https://www.vibeinvite.ro'),
    openGraph: {
      title: `${p.name} – ${p.category} ${p.oras} | VibeInvite`,
      description: p.seo_description || `${p.name} – ${p.category} profesionist în ${p.oras}, ${p.judet}.`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: p.name }],
      url: `https://www.vibeinvite.ro/${p.short_slug}`,
      siteName: 'VibeInvite',
      locale: 'ro_RO',
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.name} – ${p.category} ${p.oras}`,
      description: p.seo_description || `${p.name} – ${p.category} profesionist în ${p.oras}, ${p.judet}.`,
      images: [ogImage],
    },
    robots: { index: false, follow: false },
  };
}

export default async function ShortSlugPage({ params }: { params: { shortSlug: string } }) {
  const p = await getProvider(params.shortSlug);
  if (!p) notFound();

  const targetUrl = `/${p.slug}`;

  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${targetUrl}`} />
      <script dangerouslySetInnerHTML={{ __html: `window.location.replace('${targetUrl}');` }} />
      <style>{`body{background:#1A1208;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;font-family:sans-serif;}`}</style>
      <div style={{textAlign:'center',color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>
        Redirecționare...
      </div>
    </>
  );
}