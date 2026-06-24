import { neon } from "@neondatabase/serverless";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NatureInviteClient from "./NatureInviteClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const sql = neon(process.env.DATABASE_URL!);
  const data = await sql`
    SELECT bride_name, groom_name, wedding_date, location_name
    FROM wedding_settings
    WHERE custom_slug = ${params.slug}
    LIMIT 1
  `;
  if (!data || data.length === 0) return {};

  const s = data[0];
  const dateStr = s.wedding_date
    ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  const title = `${s.bride_name} & ${s.groom_name} — Invitație de Nuntă`;
  const description = `Vă invităm cu drag la nunta noastră${dateStr ? `, pe ${dateStr}` : ''}${s.location_name ? `, la ${s.location_name}` : ''}. Confirmați prezența online.`;

  const baseUrl = 'https://www.vibeinvite.ro';
  const url = `${baseUrl}/invitatie/nature/${params.slug}`;
  const ogImage = `${baseUrl}/api/og/nature/${params.slug}`;

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
      images: [{ url: ogImage, secureUrl: ogImage, width: 1200, height: 630, alt: title, type: 'image/png' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
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

export default async function InvitationPage({ params }: { params: { slug: string } }) {
  const sql = neon(process.env.DATABASE_URL!);

  const data = await sql`
    SELECT *
    FROM wedding_settings
    WHERE custom_slug = ${params.slug}
    LIMIT 1
  `;
  if (!data || data.length === 0) notFound();

  const s = data[0];

  await sql`
    UPDATE wedding_settings
    SET view_count = view_count + 1
    WHERE id = ${s.id}
  `;

  const isGalleryActive = s.gallery_status === 'active';

  const weddingDateISO = s.wedding_date ? new Date(s.wedding_date).toISOString() : null;

  const weddingDateDisplay = s.wedding_date
    ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  const religiousDateDisplay = s.religious_date
    ? new Date(s.religious_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  const brideInitial = s.bride_name ? s.bride_name.charAt(0) : '';
  const groomInitial = s.groom_name ? s.groom_name.charAt(0) : '';
  const initials = brideInitial && groomInitial ? `${brideInitial}&${groomInitial}` : '♦';

  return (
    <NatureInviteClient
      slug={params.slug}
      brideName={s.bride_name || ''}
      groomName={s.groom_name || ''}
      initials={initials}
      nasiNames={s.nasi_names || ''}
      parentsNames={s.parents_names || ''}
      parentsBride={s.parents_bride || ''}
      parentsGroom={s.parents_groom || ''}
      weddingDateISO={weddingDateISO}
      weddingDateDisplay={weddingDateDisplay}
      weddingTime={s.wedding_time || ''}
      locationName={s.location_name || ''}
      wazeUrl={s.waze_url || ''}
      googleMapsUrl={s.google_maps_url || ''}
      isReligiousActive={!!s.is_religious_active}
      religiousDateDisplay={religiousDateDisplay}
      religiousTime={s.religious_time || ''}
      religiousLocation={s.religious_location || ''}
      religiousWaze={s.religious_waze || ''}
      ourStory={s.our_story || ''}
      isMenuActive={!!s.is_menu_active}
      menuDetails={s.menu_details || null}
      isGalleryActive={!!isGalleryActive}
      isAccommodationActive={!!s.is_accommodation_active}
      isTransportActive={!!s.is_transport_active}
      contactPhoneBride={s.contact_phone_bride || ''}
      contactPhoneGroom={s.contact_phone_groom || ''}
      religiousMaps={s.religious_maps_url || ''} /* <--- ADAUGĂ LINIA ASTA */
      orderId={s.order_id}
    />
  );
}
