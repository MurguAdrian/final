import { ImageResponse } from 'next/og';
import { neon } from '@neondatabase/serverless';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const baseUrl = new URL(request.url).origin;
    const dmSansData = await fetch(`${baseUrl}/fonts/DMSans-Medium.ttf`)
      .then(r => r.arrayBuffer());
    const playfairData = await fetch(`${baseUrl}/fonts/PlayfairDisplay-Italic.ttf`)
      .then(r => r.arrayBuffer());

    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`
      SELECT bride_name, groom_name, wedding_date, location_name
      FROM wedding_settings
      WHERE custom_slug = ${params.slug}
      LIMIT 1
    `;

    const s = data?.[0];
    const brideName = s?.bride_name || 'Mireasă';
    const groomName = s?.groom_name || 'Mire';
    const location  = s?.location_name || '';
    const dateStr   = s?.wedding_date
      ? new Date(s.wedding_date).toLocaleDateString('ro-RO', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
      : '';

    const trim = (str: string, max: number) =>
      str.length > max ? str.slice(0, max - 1) + '…' : str;

    const bride = trim(brideName, 18);
    const groom = trim(groomName, 18);
    const loc   = trim(location, 40);

    const nameFontSize = Math.max(
      52, Math.min(88, Math.floor(1500 / Math.max(bride.length, groom.length, 6)))
    );

    const img = new ImageResponse(
      (
        <div style={{
          width: 1200, height: 630,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#F7F4F0', position: 'relative', overflow: 'hidden',
        }}>
          {/* Left accent stripe */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: 8, height: 630, background: '#C8503A', display: 'flex' }} />

          {/* Subtle background text watermark */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 320, fontFamily: 'Playfair', fontStyle: 'italic', color: 'rgba(0,0,0,.025)', lineHeight: 1, userSelect: 'none', display: 'flex', whiteSpace: 'nowrap' }}>
            {bride}
          </div>

          {/* Outer frame */}
          <div style={{ position: 'absolute', top: 36, left: 36, right: 36, bottom: 36, border: '1px solid rgba(200,80,58,.2)', display: 'flex' }} />

          {/* Bottom accent bar */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#C8503A 0%,#E8C4B8 60%,transparent 100%)', display: 'flex', opacity: 0.6 }} />

          {/* CONTENT */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start', justifyContent: 'center',
            position: 'relative', zIndex: 10,
            width: '100%', padding: '0 90px 0 80px',
          }}>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 3, background: '#C8503A', display: 'flex' }} />
              <div style={{ fontFamily: 'DMSans', fontSize: 11, letterSpacing: 8, textTransform: 'uppercase', color: '#AAAAAA', display: 'flex' }}>
                Invitație de Nuntă
              </div>
            </div>

            {/* Names */}
            <div style={{ fontFamily: 'Playfair', fontSize: nameFontSize, fontStyle: 'italic', fontWeight: 400, color: '#111', lineHeight: 0.9, letterSpacing: -1, display: 'flex' }}>
              {bride}
            </div>
            <div style={{ fontFamily: 'DMSans', fontSize: 13, fontWeight: 300, color: '#C8503A', margin: '10px 0', letterSpacing: 12, textTransform: 'uppercase', display: 'flex' }}>
              &amp;
            </div>
            <div style={{ fontFamily: 'Playfair', fontSize: nameFontSize, fontStyle: 'italic', fontWeight: 400, color: '#111', lineHeight: 0.9, letterSpacing: -1, display: 'flex' }}>
              {groom}
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24, marginBottom: 14 }}>
              <div style={{ width: 40, height: 1, background: '#E2E2E2', display: 'flex' }} />
              <div style={{ width: 6, height: 6, background: '#C8503A', transform: 'rotate(45deg)', display: 'flex', opacity: 0.7 }} />
              <div style={{ width: 120, height: 1, background: '#E2E2E2', display: 'flex' }} />
            </div>

            {/* Date + Location */}
            {(dateStr || loc) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'DMSans', fontSize: 13, color: '#555', letterSpacing: 2, marginBottom: 6 }}>
                {dateStr && <span style={{ display: 'flex', textTransform: 'uppercase' }}>{dateStr}</span>}
                {dateStr && loc && <span style={{ display: 'flex', color: '#C8503A', fontSize: 10 }}>◆</span>}
                {loc && <span style={{ display: 'flex' }}>{loc}</span>}
              </div>
            )}

            {/* Brand */}
            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 24, height: 2, background: '#C8503A', display: 'flex' }} />
              <div style={{ fontFamily: 'DMSans', fontSize: 11, letterSpacing: 6, color: '#AAAAAA', textTransform: 'uppercase', display: 'flex' }}>
                vibeinvite.ro
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: 'DMSans', data: dmSansData, style: 'normal', weight: 500 },
          { name: 'Playfair', data: playfairData, style: 'italic', weight: 400 },
        ],
      }
    );

    const headers = new Headers(img.headers);
    headers.set('Content-Type', 'image/png');
    headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('X-Content-Type-Options', 'nosniff');

    return new Response(img.body, { status: 200, headers });

  } catch (e) {
    console.error('OG Error:', e);
    return new Response(`OG Error: ${String(e)}`, { status: 500 });
  }
}