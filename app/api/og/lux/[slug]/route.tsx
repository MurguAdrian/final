import { ImageResponse } from 'next/og';
import { neon } from '@neondatabase/serverless';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
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

    const baseUrl = new URL(request.url).origin;

    // Incarca fontul TTF din /public/fonts/
    let cinzelData: ArrayBuffer | null = null;
    try {
      const r = await fetch(`${baseUrl}/fonts/Cinzel-SemiBold.ttf`);
      if (r.ok) cinzelData = await r.arrayBuffer();
    } catch (_) {}

    const fonts: any[] = cinzelData
      ? [{ name: 'Cinzel', data: cinzelData, style: 'normal' as const, weight: 600 }]
      : [];

    const fontFamily = cinzelData ? 'Cinzel' : 'serif';

    const trim = (str: string, max: number) =>
      str.length > max ? str.slice(0, max - 1) + '…' : str;

    const bride = trim(brideName, 18);
    const groom = trim(groomName, 18);
    const loc   = trim(location, 36);

    const nameFontSize = Math.max(
      56,
      Math.min(96, Math.floor(1600 / Math.max(bride.length, groom.length, 6)))
    );

    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#080602',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* BG gradient */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            background: 'radial-gradient(ellipse 90% 80% at 50% 35%, #1C1608 0%, #0C0A04 50%, #050401 100%)',
          }} />

          {/* Glow top-left */}
          <div style={{
            position: 'absolute', top: -100, left: -100, display: 'flex',
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 65%)',
          }} />

          {/* Glow bottom-right */}
          <div style={{
            position: 'absolute', bottom: -100, right: -100, display: 'flex',
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 65%)',
          }} />

          {/* Outer frame */}
          <div style={{
            position: 'absolute', top: 28, left: 28, right: 28, bottom: 28,
            border: '1px solid rgba(212,175,55,0.30)', display: 'flex',
          }} />

          {/* Inner frame */}
          <div style={{
            position: 'absolute', top: 40, left: 40, right: 40, bottom: 40,
            border: '1px solid rgba(212,175,55,0.10)', display: 'flex',
          }} />

          {/* Corner TL */}
          <div style={{ position: 'absolute', top: 28, left: 28, width: 64, height: 2, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', top: 28, left: 28, width: 2, height: 64, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', top: 50, left: 50, width: 20, height: 1, background: 'rgba(212,175,55,0.45)', display: 'flex' }} />
          <div style={{ position: 'absolute', top: 50, left: 50, width: 1, height: 20, background: 'rgba(212,175,55,0.45)', display: 'flex' }} />

          {/* Corner TR */}
          <div style={{ position: 'absolute', top: 28, right: 28, width: 64, height: 2, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', top: 28, right: 28, width: 2, height: 64, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', top: 50, right: 50, width: 20, height: 1, background: 'rgba(212,175,55,0.45)', display: 'flex' }} />
          <div style={{ position: 'absolute', top: 50, right: 50, width: 1, height: 20, background: 'rgba(212,175,55,0.45)', display: 'flex' }} />

          {/* Corner BL */}
          <div style={{ position: 'absolute', bottom: 28, left: 28, width: 64, height: 2, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: 28, left: 28, width: 2, height: 64, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: 50, left: 50, width: 20, height: 1, background: 'rgba(212,175,55,0.45)', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: 50, left: 50, width: 1, height: 20, background: 'rgba(212,175,55,0.45)', display: 'flex' }} />

          {/* Corner BR */}
          <div style={{ position: 'absolute', bottom: 28, right: 28, width: 64, height: 2, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: 28, right: 28, width: 2, height: 64, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: 50, right: 50, width: 20, height: 1, background: 'rgba(212,175,55,0.45)', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: 50, right: 50, width: 1, height: 20, background: 'rgba(212,175,55,0.45)', display: 'flex' }} />

          {/* Top accent line */}
          <div style={{
            position: 'absolute', top: 82, left: 100, right: 100, height: 1,
            background: 'rgba(212,175,55,0.15)', display: 'flex',
          }} />

          {/* Bottom accent line */}
          <div style={{
            position: 'absolute', bottom: 82, left: 100, right: 100, height: 1,
            background: 'rgba(212,175,55,0.15)', display: 'flex',
          }} />

          {/* Diamond top center */}
          <div style={{
            position: 'absolute', top: 74, left: 592, display: 'flex',
            width: 16, height: 16,
            background: '#D4AF37',
            transform: 'rotate(45deg)',
            opacity: 0.65,
          }} />

          {/* Diamond bottom center */}
          <div style={{
            position: 'absolute', bottom: 74, left: 592, display: 'flex',
            width: 16, height: 16,
            background: '#D4AF37',
            transform: 'rotate(45deg)',
            opacity: 0.65,
          }} />

          {/* MAIN CONTENT */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            position: 'relative', zIndex: 10,
            width: '100%', padding: '0 90px',
          }}>

            {/* Label sus */}
            <div style={{
              fontFamily: fontFamily,
              fontSize: 12, letterSpacing: 10,
              textTransform: 'uppercase',
              color: 'rgba(212,175,55,0.50)',
              marginBottom: 18,
              display: 'flex',
            }}>
              Invitatie de Nunta
            </div>

            {/* Divider sus */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, width: '100%', maxWidth: 380 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(212,175,55,0.38)', display: 'flex' }} />
              <div style={{ width: 7, height: 7, background: '#D4AF37', transform: 'rotate(45deg)', display: 'flex', opacity: 0.75 }} />
              <div style={{ flex: 1, height: 1, background: 'rgba(212,175,55,0.38)', display: 'flex' }} />
            </div>

            {/* Bride */}
            <div style={{
              fontFamily: fontFamily,
              fontSize: nameFontSize,
              fontWeight: 600,
              color: '#F5E6A8',
              lineHeight: 1,
              letterSpacing: 3,
              display: 'flex',
            }}>
              {bride}
            </div>

            {/* & */}
            <div style={{
              fontFamily: fontFamily,
              fontSize: 28,
              color: 'rgba(212,175,55,0.42)',
              margin: '6px 0',
              display: 'flex',
              letterSpacing: 10,
            }}>
              &amp;
            </div>

            {/* Groom */}
            <div style={{
              fontFamily: fontFamily,
              fontSize: nameFontSize,
              fontWeight: 600,
              color: '#F5E6A8',
              lineHeight: 1,
              letterSpacing: 3,
              display: 'flex',
            }}>
              {groom}
            </div>

            {/* Divider jos */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 24, marginBottom: 16, width: '100%', maxWidth: 380 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(212,175,55,0.38)', display: 'flex' }} />
              <div style={{ width: 7, height: 7, background: '#D4AF37', transform: 'rotate(45deg)', display: 'flex', opacity: 0.75 }} />
              <div style={{ flex: 1, height: 1, background: 'rgba(212,175,55,0.38)', display: 'flex' }} />
            </div>

            {/* Data + Locatie */}
            {(dateStr || loc) && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                fontFamily: fontFamily, fontSize: 14,
                color: 'rgba(212,175,55,0.62)',
                letterSpacing: 2,
                marginBottom: 6,
              }}>
                {dateStr && <span style={{ display: 'flex' }}>{dateStr}</span>}
                {dateStr && loc && <span style={{ display: 'flex', color: 'rgba(212,175,55,0.28)', fontSize: 11 }}>◆</span>}
                {loc && <span style={{ display: 'flex' }}>{loc}</span>}
              </div>
            )}

            {/* Brand */}
            <div style={{
              marginTop: 20,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 36, height: 1, background: 'rgba(212,175,55,0.22)', display: 'flex' }} />
              <div style={{
                fontFamily: fontFamily,
                fontSize: 10, letterSpacing: 7,
                color: 'rgba(212,175,55,0.32)',
                textTransform: 'uppercase',
                display: 'flex',
              }}>
                vibeinvite.ro
              </div>
              <div style={{ width: 36, height: 1, background: 'rgba(212,175,55,0.22)', display: 'flex' }} />
            </div>

          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: fonts,
      }
    );
  } catch (e) {
    console.error('OG Error:', e);
    return new Response(`OG Error: ${String(e)}`, { status: 500 });
  }
}
