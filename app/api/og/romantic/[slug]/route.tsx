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
    const cinzelData = await fetch(`${baseUrl}/fonts/Cinzel-SemiBold.ttf`)
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
    const loc   = trim(location, 36);

    const nameFontSize = Math.max(
      56, Math.min(96, Math.floor(1600 / Math.max(bride.length, groom.length, 6)))
    );

    /* Romantic palette */
    const CRIMSON  = '#7B1A2E';
    const ROSE     = '#A63248';
    const BLUSH    = '#E8A0A8';
    const BLUSH2   = '#F2C8CE';
    const PETAL    = '#F7DDE2';
    const CREAM    = '#FDF5F6';

    const img = new ImageResponse(
      (
        <div style={{
          width: 1200, height: 630,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: CREAM, position: 'relative', overflow: 'hidden',
        }}>
          {/* Soft radial bg */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            background: `radial-gradient(ellipse 90% 80% at 50% 40%, ${CREAM} 0%, ${PETAL} 45%, ${BLUSH2} 80%, ${BLUSH} 100%)`,
          }}/>

          {/* Glow TL */}
          <div style={{
            position: 'absolute', top: -80, left: -80, display: 'flex',
            width: 500, height: 500,
            background: `radial-gradient(circle, rgba(196,80,106,0.12) 0%, transparent 65%)`,
          }}/>

          {/* Glow BR */}
          <div style={{
            position: 'absolute', bottom: -80, right: -80, display: 'flex',
            width: 440, height: 440,
            background: `radial-gradient(circle, rgba(196,80,106,0.10) 0%, transparent 65%)`,
          }}/>

          {/* Outer frame */}
          <div style={{
            position: 'absolute', top: 28, left: 28, right: 28, bottom: 28,
            border: '1.5px solid rgba(196,80,106,0.28)', display: 'flex',
            borderRadius: 8,
          }}/>

          {/* Inner frame */}
          <div style={{
            position: 'absolute', top: 40, left: 40, right: 40, bottom: 40,
            border: '1px solid rgba(196,80,106,0.12)', display: 'flex',
            borderRadius: 6,
          }}/>

          {/* Corner TL – rose */}
          <div style={{ position: 'absolute', top: 28, left: 28, width: 56, height: 2, background: ROSE, display: 'flex' }}/>
          <div style={{ position: 'absolute', top: 28, left: 28, width: 2, height: 56, background: ROSE, display: 'flex' }}/>
          <div style={{ position: 'absolute', top: 48, left: 48, width: 18, height: 1, background: `rgba(196,80,106,0.4)`, display: 'flex' }}/>
          <div style={{ position: 'absolute', top: 48, left: 48, width: 1, height: 18, background: `rgba(196,80,106,0.4)`, display: 'flex' }}/>

          {/* Corner TR */}
          <div style={{ position: 'absolute', top: 28, right: 28, width: 56, height: 2, background: ROSE, display: 'flex' }}/>
          <div style={{ position: 'absolute', top: 28, right: 28, width: 2, height: 56, background: ROSE, display: 'flex' }}/>
          <div style={{ position: 'absolute', top: 48, right: 48, width: 18, height: 1, background: `rgba(196,80,106,0.4)`, display: 'flex' }}/>
          <div style={{ position: 'absolute', top: 48, right: 48, width: 1, height: 18, background: `rgba(196,80,106,0.4)`, display: 'flex' }}/>

          {/* Corner BL */}
          <div style={{ position: 'absolute', bottom: 28, left: 28, width: 56, height: 2, background: ROSE, display: 'flex' }}/>
          <div style={{ position: 'absolute', bottom: 28, left: 28, width: 2, height: 56, background: ROSE, display: 'flex' }}/>
          <div style={{ position: 'absolute', bottom: 48, left: 48, width: 18, height: 1, background: `rgba(196,80,106,0.4)`, display: 'flex' }}/>
          <div style={{ position: 'absolute', bottom: 48, left: 48, width: 1, height: 18, background: `rgba(196,80,106,0.4)`, display: 'flex' }}/>

          {/* Corner BR */}
          <div style={{ position: 'absolute', bottom: 28, right: 28, width: 56, height: 2, background: ROSE, display: 'flex' }}/>
          <div style={{ position: 'absolute', bottom: 28, right: 28, width: 2, height: 56, background: ROSE, display: 'flex' }}/>
          <div style={{ position: 'absolute', bottom: 48, right: 48, width: 18, height: 1, background: `rgba(196,80,106,0.4)`, display: 'flex' }}/>
          <div style={{ position: 'absolute', bottom: 48, right: 48, width: 1, height: 18, background: `rgba(196,80,106,0.4)`, display: 'flex' }}/>

          {/* Accent lines */}
          <div style={{ position: 'absolute', top: 80, left: 100, right: 100, height: 1, background: 'rgba(196,80,106,0.14)', display: 'flex' }}/>
          <div style={{ position: 'absolute', bottom: 80, left: 100, right: 100, height: 1, background: 'rgba(196,80,106,0.14)', display: 'flex' }}/>

          {/* Heart top */}
          <div style={{ position: 'absolute', top: 71, left: 592, display: 'flex', width: 16, height: 14, background: ROSE, borderRadius: '50% 50% 0 0', opacity: 0.55, transform: 'rotate(-45deg)' }}/>

          {/* CONTENT */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            position: 'relative', zIndex: 10,
            width: '100%', padding: '0 90px',
          }}>

            {/* Label */}
            <div style={{
              fontFamily: 'Cinzel', fontSize: 11, letterSpacing: 9,
              textTransform: 'uppercase', color: 'rgba(138,74,88,0.55)',
              marginBottom: 18, display: 'flex',
            }}>
              Invitatie de Nunta
            </div>

            {/* Divider sus */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22, width: 360 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(196,80,106,0.35)', display: 'flex' }}/>
              <div style={{ width: 7, height: 7, background: ROSE, transform: 'rotate(45deg)', display: 'flex', opacity: 0.7 }}/>
              <div style={{ flex: 1, height: 1, background: 'rgba(196,80,106,0.35)', display: 'flex' }}/>
            </div>

            {/* Bride */}
            <div style={{
              fontFamily: 'Cinzel', fontSize: nameFontSize, fontWeight: 600,
              color: CRIMSON, lineHeight: 1, letterSpacing: 3, display: 'flex',
            }}>
              {bride}
            </div>

            {/* & */}
            <div style={{
              fontFamily: 'Cinzel', fontSize: 26, color: 'rgba(196,80,106,0.45)',
              margin: '6px 0', display: 'flex', letterSpacing: 10,
            }}>
              &amp;
            </div>

            {/* Groom */}
            <div style={{
              fontFamily: 'Cinzel', fontSize: nameFontSize, fontWeight: 600,
              color: CRIMSON, lineHeight: 1, letterSpacing: 3, display: 'flex',
            }}>
              {groom}
            </div>

            {/* Divider jos */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22, marginBottom: 16, width: 360 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(196,80,106,0.35)', display: 'flex' }}/>
              <div style={{ width: 7, height: 7, background: ROSE, transform: 'rotate(45deg)', display: 'flex', opacity: 0.7 }}/>
              <div style={{ flex: 1, height: 1, background: 'rgba(196,80,106,0.35)', display: 'flex' }}/>
            </div>

            {/* Data + Locatie */}
            {(dateStr || loc) && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                fontFamily: 'Cinzel', fontSize: 13,
                color: 'rgba(138,74,88,0.65)', letterSpacing: 2,
                marginBottom: 6,
              }}>
                {dateStr && <span style={{ display: 'flex' }}>{dateStr}</span>}
                {dateStr && loc && <span style={{ display: 'flex', color: 'rgba(196,80,106,0.3)', fontSize: 10 }}>♥</span>}
                {loc && <span style={{ display: 'flex' }}>{loc}</span>}
              </div>
            )}

            {/* Brand */}
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 1, background: 'rgba(196,80,106,0.2)', display: 'flex' }}/>
              <div style={{
                fontFamily: 'Cinzel', fontSize: 10, letterSpacing: 6,
                color: 'rgba(138,74,88,0.35)', textTransform: 'uppercase', display: 'flex',
              }}>
                www.vibeinvite.ro
              </div>
              <div style={{ width: 32, height: 1, background: 'rgba(196,80,106,0.2)', display: 'flex' }}/>
            </div>

          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [{ name: 'Cinzel', data: cinzelData, style: 'normal', weight: 600 }],
      }
    );

    const headers = new Headers(img.headers);
    headers.set('Content-Type', 'image/png');
    headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('X-Content-Type-Options', 'nosniff');

    return new Response(img.body, { status: 200, headers });

  } catch (e) {
    console.error('OG Romantic Error:', e);
    return new Response(`OG Error: ${String(e)}`, { status: 500 });
  }
}
