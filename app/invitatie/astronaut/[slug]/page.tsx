import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import AstronautInviteClient from './AstronautInviteClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const MONTHS_RO = ['ianuarie','februarie','martie','aprilie','mai','iunie','iulie','august','septembrie','octombrie','noiembrie','decembrie'];

function formatDateRo(iso: string | null): { display: string | null; iso: string | null } {
  if (!iso) return { display: null, iso: null };
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return { display: null, iso: null };
    const display = `${d.getDate()} ${MONTHS_RO[d.getMonth()]} ${d.getFullYear()}`;
    return { display, iso: d.toISOString() };
  } catch {
    return { display: null, iso: null };
  }
}

export default async function AstronautInvitationPage({ params }: { params: { slug: string } }) {
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

  const church   = formatDateRo(s.religious_date ?? null);
  const main     = formatDateRo(s.wedding_date ?? null);

  return (
    <AstronautInviteClient
      slug={params.slug}
      childName={s.bride_name        ?? ''}
      parentsNames={s.groom_name     ?? ''}
      nasiNames={s.nasi_names        ?? ''}
      religiousLocation={s.religious_location ?? ''}
      religiousDateISO={church.iso}
      religiousDateDisplay={church.display}
      religiousTime={s.religious_time ?? ''}
      religiousMaps={s.religious_maps ?? ''}
      religiousWaze={s.religious_waze ?? ''}
      restaurantLocation={s.location_name ?? ''}
      mainDateISO={main.iso}
      mainDateDisplay={main.display}
      mainTime={s.wedding_time       ?? ''}
      restaurantMaps={s.restaurant_maps ?? ''}
      restaurantWaze={s.restaurant_waze ?? ''}
      contactPhone={s.contact_phone  ?? ''}
      orderId={s.order_id}
    />
  );
}
