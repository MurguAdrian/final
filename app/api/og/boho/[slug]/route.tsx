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

    const dateStr = s?.wedding_date
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

    const img = new ImageResponse(
      (
        <div style={{
          width: 1200,
          height: 630,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F6F1E7',
          position: 'relative',
          overflow: 'hidden',
        }}>

          {/* BOHO background texture feel */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background: 'radial-gradient(ellipse at top, #F6F1E7 0%, #E9DDCF 45%, #DCCBB8 100%)',
          }} />

          {/* soft earthy glow */}
          <div style={{
            position: 'absolute',
            top: -120,
            left: -120,
            width: 600,
            height: 600,
            display: 'flex',
            background: 'radial-gradient(circle, rgba(160,120,90,0.10) 0%, transparent 65%)',
          }} />

          <div style={{
            position: 'absolute',
            bottom: -120,
            right: -120,
            width: 600,
            height: 600,
            display: 'flex',
            background: 'radial-gradient(circle, rgba(120,140,120,0.10) 0%, transparent 65%)',
          }} />

          {/* organic frame (no sharp gold luxury look) */}
          <div style={{
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: '1px solid rgba(120,100,80,0.25)',
            borderRadius: 24,
            display: 'flex',
          }} />

          <div style={{
            position: 'absolute',
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: '1px dashed rgba(120,100,80,0.12)',
            borderRadius: 20,
            display: 'flex',
          }} />

          {/* subtle corner dots (boho detail) */}
          <div style={{ position: 'absolute', top: 28, left: 28, width: 10, height: 10, background: '#A78B6D', borderRadius: 999 }} />
          <div style={{ position: 'absolute', top: 28, right: 28, width: 10, height: 10, background: '#A78B6D', borderRadius: 999 }} />
          <div style={{ position: 'absolute', bottom: 28, left: 28, width: 10, height: 10, background: '#A78B6D', borderRadius: 999 }} />
          <div style={{ position: 'absolute', bottom: 28, right: 28, width: 10, height: 10, background: '#A78B6D', borderRadius: 999 }} />

          {/* CONTENT */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            width: '100%',
            padding: '0 90px',
          }}>

            {/* Label */}
            <div style={{
              fontFamily: 'Cinzel',
              fontSize: 12,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: 'rgba(90,70,50,0.55)',
              marginBottom: 18,
              display: 'flex',
            }}>
              Invitatie de Nunta
            </div>

            {/* divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 22,
              width: 380,
            }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(120,100,80,0.25)', display: 'flex' }} />
              <div style={{ width: 6, height: 6, background: '#A78B6D', borderRadius: 999, display: 'flex' }} />
              <div style={{ flex: 1, height: 1, background: 'rgba(120,100,80,0.25)', display: 'flex' }} />
            </div>

            {/* Bride */}
            <div style={{
              fontFamily: 'Cinzel',
              fontSize: nameFontSize,
              fontWeight: 600,
              color: '#4A3B2F',
              letterSpacing: 2,
              lineHeight: 1,
              display: 'flex',
            }}>
              {bride}
            </div>

            {/* & */}
            <div style={{
              fontFamily: 'Cinzel',
              fontSize: 26,
              color: 'rgba(120,100,80,0.55)',
              margin: '6px 0',
              letterSpacing: 6,
              display: 'flex',
            }}>
              &amp;
            </div>

            {/* Groom */}
            <div style={{
              fontFamily: 'Cinzel',
              fontSize: nameFontSize,
              fontWeight: 600,
              color: '#4A3B2F',
              letterSpacing: 2,
              lineHeight: 1,
              display: 'flex',
            }}>
              {groom}
            </div>

            {/* divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginTop: 22,
              marginBottom: 16,
              width: 380,
            }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(120,100,80,0.25)', display: 'flex' }} />
              <div style={{ width: 6, height: 6, background: '#A78B6D', borderRadius: 999, display: 'flex' }} />
              <div style={{ flex: 1, height: 1, background: 'rgba(120,100,80,0.25)', display: 'flex' }} />
            </div>

            {/* Date + Location */}
            {(dateStr || loc) && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontFamily: 'Cinzel',
                fontSize: 14,
                color: 'rgba(90,70,50,0.65)',
                letterSpacing: 1,
              }}>
                {dateStr && <span style={{ display: 'flex' }}>{dateStr}</span>}
                {dateStr && loc && <span style={{ display: 'flex', opacity: 0.4 }}>◆</span>}
                {loc && <span style={{ display: 'flex' }}>{loc}</span>}
              </div>
            )}

            {/* Brand */}
            <div style={{
              marginTop: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <div style={{ width: 40, height: 1, background: 'rgba(120,100,80,0.2)', display: 'flex' }} />
              <div style={{
                fontFamily: 'Cinzel',
                fontSize: 10,
                letterSpacing: 6,
                color: 'rgba(120,100,80,0.35)',
                textTransform: 'uppercase',
                display: 'flex',
              }}>
                www.vibeinvite.ro
              </div>
              <div style={{ width: 40, height: 1, background: 'rgba(120,100,80,0.2)', display: 'flex' }} />
            </div>

          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: 'Cinzel', data: cinzelData, style: 'normal', weight: 600 }
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