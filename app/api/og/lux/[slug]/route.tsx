// app/api/og/lux/[slug]/route.tsx
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
      SELECT bride_name, groom_name, wedding_date, location_name, wedding_time
      FROM wedding_settings
      WHERE custom_slug = ${params.slug}
      LIMIT 1
    `;

    const s = data?.[0];
    const brideName  = s?.bride_name   || 'Mireasă';
    const groomName  = s?.groom_name   || 'Mire';
    const location   = s?.location_name || '';
    const dateStr = s?.wedding_date
      ? new Date(s.wedding_date).toLocaleDateString('ro-RO', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        })
      : '';

    // Font-uri: Cormorant Garamond italic + Cinzel
    const cormorantItalic = await fetch(
      'https://fonts.gstatic.com/s/cormorantgaramond/v22/BXRovF3Pi-DLmxcpJB-qbNtyBVDWrtnIpA.woff2'
    ).then(r => r.arrayBuffer());

    const cinzel = await fetch(
      'https://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-tbnTQ.woff2'
    ).then(r => r.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#050401',
            position: 'relative',
            fontFamily: 'Cinzel',
          }}
        >
          {/* Background radial gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 80% 70% at 50% 40%, #1A1408 0%, #0A0803 55%, #050401 100%)',
            display: 'flex',
          }} />

          {/* Ambient gold glow top-left */}
          <div style={{
            position: 'absolute', top: -60, left: -60,
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 70%)',
            display: 'flex',
          }} />

          {/* Ambient gold glow bottom-right */}
          <div style={{
            position: 'absolute', bottom: -60, right: -60,
            width: 360, height: 360,
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
            display: 'flex',
          }} />

          {/* Top border line */}
          <div style={{
            position: 'absolute', top: 40, left: 80, right: 80, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.45), transparent)',
            display: 'flex',
          }} />

          {/* Bottom border line */}
          <div style={{
            position: 'absolute', bottom: 40, left: 80, right: 80, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.45), transparent)',
            display: 'flex',
          }} />

          {/* Left vertical accent */}
          <div style={{
            position: 'absolute', top: 40, bottom: 40, left: 40, width: 1,
            background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.35), transparent)',
            display: 'flex',
          }} />

          {/* Right vertical accent */}
          <div style={{
            position: 'absolute', top: 40, bottom: 40, right: 40, width: 1,
            background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.35), transparent)',
            display: 'flex',
          }} />

          {/* Corner decorations — top left */}
          <div style={{ position: 'absolute', top: 40, left: 40, display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ width: 40, height: 1, background: '#D4AF37', opacity: 0.6, display: 'flex' }} />
            <div style={{ width: 1, height: 40, background: '#D4AF37', opacity: 0.6, display: 'flex' }} />
          </div>

          {/* Corner decorations — top right */}
          <div style={{ position: 'absolute', top: 40, right: 40, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
            <div style={{ width: 40, height: 1, background: '#D4AF37', opacity: 0.6, display: 'flex' }} />
            <div style={{ width: 1, height: 40, background: '#D4AF37', opacity: 0.6, display: 'flex', alignSelf: 'flex-end' }} />
          </div>

          {/* Corner decorations — bottom left */}
          <div style={{ position: 'absolute', bottom: 40, left: 40, display: 'flex', flexDirection: 'column-reverse', gap: 0 }}>
            <div style={{ width: 40, height: 1, background: '#D4AF37', opacity: 0.6, display: 'flex' }} />
            <div style={{ width: 1, height: 40, background: '#D4AF37', opacity: 0.6, display: 'flex' }} />
          </div>

          {/* Corner decorations — bottom right */}
          <div style={{ position: 'absolute', bottom: 40, right: 40, display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-end', gap: 0 }}>
            <div style={{ width: 40, height: 1, background: '#D4AF37', opacity: 0.6, display: 'flex' }} />
            <div style={{ width: 1, height: 40, background: '#D4AF37', opacity: 0.6, display: 'flex', alignSelf: 'flex-end' }} />
          </div>

          {/* Main content */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 0, padding: '0 100px', position: 'relative', zIndex: 10,
            textAlign: 'center',
          }}>

            {/* "Invitație de Nuntă" label */}
            <div style={{
              fontFamily: 'Cinzel',
              fontSize: 13, letterSpacing: 8,
              textTransform: 'uppercase',
              color: 'rgba(212,175,55,0.65)',
              marginBottom: 28,
              display: 'flex',
            }}>
              Invitație de Nuntă
            </div>

            {/* Divider top */}
            <div style={{
              width: 280, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)',
              marginBottom: 36, display: 'flex',
            }} />

            {/* Bride name */}
            <div style={{
              fontFamily: 'Cinzel',
              fontSize: 88, fontWeight: 600,
              color: '#F5E6A8',
              lineHeight: 1,
              letterSpacing: -1,
              textShadow: '0 0 80px rgba(212,175,55,0.3)',
              display: 'flex',
            }}>
              {brideName}
            </div>

            {/* Ampersand */}
            <div style={{
              fontFamily: 'Cinzel',
              fontSize: 28, fontWeight: 400,
              color: 'rgba(212,175,55,0.55)',
              letterSpacing: 12,
              margin: '12px 0',
              display: 'flex',
            }}>
              &amp;
            </div>

            {/* Groom name */}
            <div style={{
              fontFamily: 'Cinzel',
              fontSize: 88, fontWeight: 600,
              color: '#F5E6A8',
              lineHeight: 1,
              letterSpacing: -1,
              textShadow: '0 0 80px rgba(212,175,55,0.3)',
              display: 'flex',
            }}>
              {groomName}
            </div>

            {/* Divider bottom */}
            <div style={{
              width: 280, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)',
              marginTop: 36, marginBottom: 24, display: 'flex',
            }} />

            {/* Date + Location row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 20,
              fontFamily: 'Cinzel', fontSize: 14,
              color: 'rgba(212,175,55,0.7)',
              letterSpacing: 3, textTransform: 'uppercase',
            }}>
              {dateStr && (
                <span style={{ display: 'flex', textTransform: 'capitalize' }}>{dateStr}</span>
              )}
              {dateStr && location && (
                <span style={{ display: 'flex', color: 'rgba(212,175,55,0.35)' }}>◆</span>
              )}
              {location && (
                <span style={{ display: 'flex' }}>{location}</span>
              )}
            </div>

            {/* VibeInvite branding */}
            <div style={{
              marginTop: 36,
              fontFamily: 'Cinzel',
              fontSize: 11, letterSpacing: 5,
              color: 'rgba(212,175,55,0.3)',
              textTransform: 'uppercase',
              display: 'flex',
            }}>
              vibeinvite.ro
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: 'Cinzel', data: cinzel, style: 'normal', weight: 600 },
        ],
      }
    );
  } catch (e) {
    // Fallback dacă ceva pică
    return new Response('OG image error', { status: 500 });
  }
}