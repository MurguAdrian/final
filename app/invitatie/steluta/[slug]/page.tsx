import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import StelutaInviteClient from './StelutaInviteClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const sql = neon(process.env.DATABASE_URL!);
  const data = await sql`
    SELECT bride_name, parents_names, wedding_date, location_name
    FROM wedding_settings
    WHERE custom_slug = ${params.slug}
    LIMIT 1
  `;
  if (!data || data.length === 0) return {};

  const s = data[0];
  const dateStr = s.wedding_date
    ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { day:'numeric', month:'long', year:'numeric' })
    : '';
  const childName = s.bride_name || '';
  const title = `${childName} — Invitație la Botez`;
  const description = `Vă invităm cu drag la botezul lui ${childName}${dateStr ? `, pe ${dateStr}` : ''}${s.location_name ? `, la ${s.location_name}` : ''}. Confirmați prezența online.`;

  const baseUrl = 'https://www.vibeinvite.ro';
  const url = `${baseUrl}/invitatie/steluta/${params.slug}`;
  const ogImage = `${baseUrl}/api/og/steluta/${params.slug}`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'VibeInvite',
      locale: 'ro_RO',
      images: [{ url:ogImage, secureUrl:ogImage, width:1200, height:630, alt:title, type:'image/png' }],
    },
    twitter: { card:'summary_large_image', title, description, images:[ogImage] },
    alternates: { canonical: url },
    other: {
      'og:image': ogImage,
      'og:image:secure_url': ogImage,
      'og:image:type': 'image/png',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': title,
      'fb:app_id': '1234567890123456',
    },
  };
}

const MONTHS_RO = ['ianuarie','februarie','martie','aprilie','mai','iunie','iulie','august','septembrie','octombrie','noiembrie','decembrie'];

function formatDateRo(iso: string | null): { display: string | null; iso: string | null } {
  if (!iso) return { display:null, iso:null };
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return { display:null, iso:null };
    const display = `${d.getDate()} ${MONTHS_RO[d.getMonth()]} ${d.getFullYear()}`;
    return { display, iso: d.toISOString() };
  } catch {
    return { display:null, iso:null };
  }
}

export default async function StelutaInvitationPage({ params }: { params: { slug: string } }) {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`
    SELECT * FROM wedding_settings
    WHERE custom_slug = ${params.slug}
    LIMIT 1
  `;

  if (!rows || rows.length === 0) notFound();
  const s = rows[0];

  await sql`
    UPDATE wedding_settings
    SET view_count = view_count + 1
    WHERE id = ${s.id}
  `;

  const church = formatDateRo(s.religious_date ?? null);
  const main   = formatDateRo(s.wedding_date   ?? null);

  return (
    <StelutaInviteClient
      slug={params.slug}
      childName={s.bride_name              ?? ''}
      parentsNames={s.parents_names        ?? ''}
      nasiNames={s.nasi_names              ?? ''}
      religiousLocation={s.religious_location ?? ''}
      religiousDateISO={church.iso}
      religiousDateDisplay={church.display}
      religiousTime={s.religious_time      ? String(s.religious_time).substring(0,5) : ''}
      religiousMaps={s.religious_maps_url  ?? ''}
      religiousWaze={s.religious_waze      ?? ''}
      restaurantLocation={s.location_name  ?? ''}
      mainDateISO={main.iso}
      mainDateDisplay={main.display}
      mainTime={s.wedding_time             ? String(s.wedding_time).substring(0,5) : ''}
      restaurantMaps={s.google_maps_url    ?? ''}
      restaurantWaze={s.waze_url           ?? ''}
      contactPhone={s.contact_phone_bride  ?? ''}
      orderId={s.order_id}
    />
  );
}