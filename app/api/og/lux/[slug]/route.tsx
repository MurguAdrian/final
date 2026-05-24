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

    // Cinzel font din public/fonts/ — nu fetch extern
    const baseUrl = new URL(request.url).origin;
    let cinzelData: ArrayBuffer | null = null;
    try {
      const r = await fetch(`${baseUrl}/fonts/Cinzel-SemiBold.woff2`);
      if (r.ok) cinzelData = await r.arrayBuffer();
    } catch (_) {}

    const fonts: any[] = cinzelData
      ? [{ name: 'Cinzel', data: cinzelData, style: 'normal', weight: 600 }]
      : [];

    const fontFamily = cinzelData ? 'Cinzel' : 'Georgia, serif';

    // Scurtam numele lungi pentru a nu iesi din cadru
    const trim = (s: string, max: number) =>
      s.length > max ? s.slice(0, max - 1) + '…' : s;

    const bride = trim(brideName, 18);
    const groom = trim(groomName, 18);
    const loc   = trim(location, 32);

    // Font size adaptiv dupa lungimea numelui
    const nameFontSize = Math.max(
      56,
      Math.min(104, Math.floor(1700 / Math.max(bride.length, groom.length, 6)))
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
          {/* ── BG gradient ── */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            background: 'radial-gradient(ellipse 90% 80% at 50% 35%, #1C1608 0%, #0C0A04 50%, #050401 100%)',
          }} />

          {/* ── Glow top-left ── */}
          <div style={{
            position: 'absolute', top: -80, left: -80, display: 'flex',
            width: 560, height: 560,
            background: 'radial-gradient(circle, rgba(212,175,55,0.13) 0%, transparent 65%)',
          }} />

          {/* ── Glow bottom-right ── */}
          <div style={{
            position: 'absolute', bottom: -80, right: -80, display: 'flex',
            width: 480, height: 480,
            background: 'radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 65%)',
          }} />

          {/* ── Glow center soft ── */}
          <div style={{
            position: 'absolute', top: '20%', left: '20%', display: 'flex',
            width: 760, height: 400,
            background: 'radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)',
          }} />

          {/* ── Outer frame ── */}
          <div style={{
            position: 'absolute', top: 28, left: 28, right: 28, bottom: 28,
            border: '1px solid rgba(212,175,55,0.30)',
            display: 'flex',
          }} />

          {/* ── Inner frame ── */}
          <div style={{
            position: 'absolute', top: 38, left: 38, right: 38, bottom: 38,
            border: '1px solid rgba(212,175,55,0.12)',
            display: 'flex',
          }} />

          {/* ── Corner TL ── */}
          <div style={{ position: 'absolute', top: 28, left: 28, width: 60, height: 2, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', top: 28, left: 28, width: 2, height: 60, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', top: 48, left: 48, width: 24, height: 1, background: 'rgba(212,175,55,0.4)', display: 'flex' }} />
          <div style={{ position: 'absolute', top: 48, left: 48, width: 1, height: 24, background: 'rgba(212,175,55,0.4)', display: 'flex' }} />

          {/* ── Corner TR ── */}
          <div style={{ position: 'absolute', top: 28, right: 28, width: 60, height: 2, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', top: 28, right: 28, width: 2, height: 60, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', top: 48, right: 48, width: 24, height: 1, background: 'rgba(212,175,55,0.4)', display: 'flex' }} />
          <div style={{ position: 'absolute', top: 48, right: 48, width: 1, height: 24, background: 'rgba(212,175,55,0.4)', display: 'flex' }} />

          {/* ── Corner BL ── */}
          <div style={{ position: 'absolute', bottom: 28, left: 28, width: 60, height: 2, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: 28, left: 28, width: 2, height: 60, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: 48, left: 48, width: 24, height: 1, background: 'rgba(212,175,55,0.4)', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: 48, left: 48, width: 1, height: 24, background: 'rgba(212,175,55,0.4)', display: 'flex' }} />

          {/* ── Corner BR ── */}
          <div style={{ position: 'absolute', bottom: 28, right: 28, width: 60, height: 2, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: 28, right: 28, width: 2, height: 60, background: '#D4AF37', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: 48, right: 48, width: 24, height: 1, background: 'rgba(212,175,55,0.4)', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: 48, right: 48, width: 1, height: 24, background: 'rgba(212,175,55,0.4)', display: 'flex' }} />

          {/* ── Top horizontal accent ── */}
          <div style={{
            position: 'absolute', top: 80, left: 120, right: 120, height: 1,
            background: 'rgba(212,175,55,0.18)', display: 'flex',
          }} />

          {/* ── Bottom horizontal accent ── */}
          <div style={{
            position: 'absolute', bottom: 80, left: 120, right: 120, height: 1,
            background: 'rgba(212,175,55,0.18)', display: 'flex',
          }} />

          {/* ── Diamond ornament top ── */}
          <div style={{
            position: 'absolute', top: 72, left: '50%', display: 'flex',
            width: 16, height: 16,
            background: '#D4AF37',
            transform: 'translateX(-50%) rotate(45deg)',
            opacity: 0.7,
          }} />

          {/* ── Diamond ornament bottom ── */}
          <div style={{
            position: 'absolute', bottom: 72, left: '50%', display: 'flex',
            width: 16, height: 16,
            background: '#D4AF37',
            transform: 'translateX(-50%) rotate(45deg)',
            opacity: 0.7,
          }} />

          {/* ── MAIN CONTENT ── */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            position: 'relative', zIndex: 10,
            width: '100%', padding: '0 100px',
            gap: 0,
          }}>

            {/* Label */}
            <div style={{
              fontFamily: fontFamily,
              fontSize: 13, letterSpacing: 10,
              textTransform: 'uppercase',
              color: 'rgba(212,175,55,0.55)',
              marginBottom: 22,
              display: 'flex',
            }}>
              Invitație de Nuntă
            </div>

            {/* Top divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, width: 360 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(212,175,55,0.4)', display: 'flex' }} />
              <div style={{ width: 6, height: 6, background: '#D4AF37', transform: 'rotate(45deg)', display: 'flex', opacity: 0.8 }} />
              <div style={{ flex: 1, height: 1, background: 'rgba(212,175,55,0.4)', display: 'flex' }} />
            </div>

            {/* Bride name */}
            <div style={{
              fontFamily: fontFamily,
              fontSize: nameFontSize,
              fontWeight: 600,
              color: '#F5E6A8',
              lineHeight: 1,
              letterSpacing: 2,
              display: 'flex',
              textShadow: '0 0 60px rgba(212,175,55,0.2)',
            }}>
              {bride}
            </div>

            {/* Ampersand */}
            <div style={{
              fontFamily: fontFamily,
              fontSize: 32,
              color: 'rgba(212,175,55,0.45)',
              margin: '8px 0',
              display: 'flex',
              letterSpacing: 8,
            }}>
              &amp;
            </div>

            {/* Groom name */}
            <div style={{
              fontFamily: fontFamily,
              fontSize: nameFontSize,
              fontWeight: 600,
              color: '#F5E6A8',
              lineHeight: 1,
              letterSpacing: 2,
              display: 'flex',
            }}>
              {groom}
            </div>

            {/* Bottom divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 28, marginBottom: 20, width: 360 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(212,175,55,0.4)', display: 'flex' }} />
              <div style={{ width: 6, height: 6, background: '#D4AF37', transform: 'rotate(45deg)', display: 'flex', opacity: 0.8 }} />
              <div style={{ flex: 1, height: 1, background: 'rgba(212,175,55,0.4)', display: 'flex' }} />
            </div>

            {/* Date + Location */}
            {(dateStr || loc) && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                fontFamily: fontFamily, fontSize: 15,
                color: 'rgba(212,175,55,0.65)',
                letterSpacing: 3,
                marginBottom: 4,
              }}>
                {dateStr && (
                  <span style={{ display: 'flex' }}>{dateStr}</span>
                )}
                {dateStr && loc && (
                  <span style={{ display: 'flex', color: 'rgba(212,175,55,0.3)', fontSize: 12 }}>◆</span>
                )}
                {loc && (
                  <span style={{ display: 'flex' }}>{loc}</span>
                )}
              </div>
            )}

            {/* Brand */}
            <div style={{
              marginTop: 24,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 40, height: 1,
                background: 'rgba(212,175,55,0.25)',
                display: 'flex',
              }} />
              <div style={{
                fontFamily: fontFamily,
                fontSize: 11, letterSpacing: 6,
                color: 'rgba(212,175,55,0.35)',
                textTransform: 'uppercase',
                display: 'flex',
              }}>
                vibeinvite.ro
              </div>
              <div style={{
                width: 40, height: 1,
                background: 'rgba(212,175,55,0.25)',
                display: 'flex',
              }} />
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
