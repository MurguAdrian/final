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
          background: '#0F1A14',
          position: 'relative',
          overflow: 'hidden',
        }}>

          {/* FOREST DEPTH BACKGROUND */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background: 'radial-gradient(ellipse at top, #1C2B22 0%, #0F1A14 45%, #070D0A 100%)',
          }} />

          {/* soft green glow (nature light) */}
          <div style={{
            position: 'absolute',
            top: -120,
            left: -120,
            width: 600,
            height: 600,
            display: 'flex',
            background: 'radial-gradient(circle, rgba(120,180,140,0.18) 0%, transparent 65%)',
          }} />

          <div style={{
            position: 'absolute',
            bottom: -120,
            right: -120,
            width: 600,
            height: 600,
            display: 'flex',
            background: 'radial-gradient(circle, rgba(90,140,110,0.16) 0%, transparent 65%)',
          }} />

          {/* organic frame (rounded nature feel) */}
          <div style={{
            position: 'absolute',
            top: 30,
            left: 30,
            right: 30,
            bottom: 30,
            border: '1px solid rgba(160,200,170,0.25)',
            borderRadius: 28,
            display: 'flex',
          }} />

          <div style={{
            position: 'absolute',
            top: 44,
            left: 44,
            right: 44,
            bottom: 44,
            border: '1px dashed rgba(160,200,170,0.14)',
            borderRadius: 24,
            display: 'flex',
          }} />

          {/* leaf-like corner accents */}
          <div style={{
            position: 'absolute',
            top: 30,
            left: 30,
            width: 14,
            height: 14,
            background: '#7FBF9B',
            borderRadius: '0 100% 100% 100%',
            transform: 'rotate(45deg)',
          }} />

          <div style={{
            position: 'absolute',
            top: 30,
            right: 30,
            width: 14,
            height: 14,
            background: '#7FBF9B',
            borderRadius: '0 100% 100% 100%',
            transform: 'rotate(135deg)',
          }} />

          <div style={{
            position: 'absolute',
            bottom: 30,
            left: 30,
            width: 14,
            height: 14,
            background: '#7FBF9B',
            borderRadius: '0 100% 100% 100%',
            transform: 'rotate(-45deg)',
          }} />

          <div style={{
            position: 'absolute',
            bottom: 30,
            right: 30,
            width: 14,
            height: 14,
            background: '#7FBF9B',
            borderRadius: '0 100% 100% 100%',
            transform: 'rotate(225deg)',
          }} />

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
              letterSpacing: 10,
              textTransform: 'uppercase',
              color: 'rgba(170,210,185,0.55)',
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
              <div style={{ flex: 1, height: 1, background: 'rgba(160,200,170,0.25)', display: 'flex' }} />
              <div style={{ width: 6, height: 6, background: '#7FBF9B', borderRadius: 999 }} />
              <div style={{ flex: 1, height: 1, background: 'rgba(160,200,170,0.25)', display: 'flex' }} />
            </div>

            {/* Bride */}
            <div style={{
              fontFamily: 'Cinzel',
              fontSize: nameFontSize,
              fontWeight: 600,
              color: '#E6F3EA',
              letterSpacing: 2,
              lineHeight: 1,
              display: 'flex',
            }}>
              {bride}
            </div>

            {/* & */}
            <div style={{
              fontFamily: 'Cinzel',
              fontSize: 28,
              color: 'rgba(160,200,170,0.55)',
              margin: '6px 0',
              letterSpacing: 10,
              display: 'flex',
            }}>
              &amp;
            </div>

            {/* Groom */}
            <div style={{
              fontFamily: 'Cinzel',
              fontSize: nameFontSize,
              fontWeight: 600,
              color: '#E6F3EA',
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
              <div style={{ flex: 1, height: 1, background: 'rgba(160,200,170,0.25)', display: 'flex' }} />
              <div style={{ width: 6, height: 6, background: '#7FBF9B', borderRadius: 999 }} />
              <div style={{ flex: 1, height: 1, background: 'rgba(160,200,170,0.25)', display: 'flex' }} />
            </div>

            {/* Date + Location */}
            {(dateStr || loc) && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontFamily: 'Cinzel',
                fontSize: 14,
                color: 'rgba(170,210,185,0.65)',
                letterSpacing: 2,
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
              <div style={{ width: 40, height: 1, background: 'rgba(160,200,170,0.22)', display: 'flex' }} />
              <div style={{
                fontFamily: 'Cinzel',
                fontSize: 10,
                letterSpacing: 7,
                color: 'rgba(160,200,170,0.35)',
                textTransform: 'uppercase',
                display: 'flex',
              }}>
                www.vibeinvite.ro
              </div>
              <div style={{ width: 40, height: 1, background: 'rgba(160,200,170,0.22)', display: 'flex' }} />
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
    console.error('OG Error:', e);
    return new Response(`OG Error: ${String(e)}`, { status: 500 });
  }
}