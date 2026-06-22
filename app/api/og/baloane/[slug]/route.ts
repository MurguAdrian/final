import React from 'react';
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
    const [cinzelData, playfairData] = await Promise.all([
      fetch(`${baseUrl}/fonts/Cinzel-SemiBold.ttf`).then(r => r.arrayBuffer()),
      fetch(`${baseUrl}/fonts/PlayfairDisplay-Italic.ttf`).then(r => r.arrayBuffer()),
    ]);

    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`
      SELECT bride_name, parents_names, wedding_date, location_name
      FROM wedding_settings
      WHERE custom_slug = ${params.slug}
      LIMIT 1
    `;

    const s = data?.[0];
    const rawChild   = s?.bride_name    || 'Botez';
    const rawParents = s?.parents_names || '';
    const location   = s?.location_name || '';

    const dateStr = s?.wedding_date
      ? new Date(s.wedding_date).toLocaleDateString('ro-RO', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '';

    const trim = (str: string, max: number) =>
      str.length > max ? str.slice(0, max - 1) + '…' : str;

    const childName  = trim(rawChild, 20);
    const parentsStr = trim(rawParents, 32);
    const loc        = trim(location, 30);

    const nameFontSize = Math.max(
      62,
      Math.min(108, Math.floor(1700 / Math.max(childName.length, 5)))
    );

    // ─── THEME CONFIG: FETITE (FLORAL PINK & BLUSH) ───────────────────────────
    const BG_PINK      = '#FFF5F8'; // Fundal principal roz pal cald
    const TEXT_MAIN    = '#7A2E4D'; // Roz-vișiniu elegant închis pentru text principal
    const TEXT_SUB     = '#9B4C6A'; // Roz prăfuit intens pentru elemente secundare
    const GOLD_ACCENT  = '#D4A373'; // Detalii aurii calde pentru contrast premium
    const PINK_ACCENT  = '#E35A87'; // Roz floral intens pentru accente/bulină
    const MIST         = 'rgba(155,76,106,0.45)';

    const img = new ImageResponse(
      React.createElement(
        'div',
        {
          style: {
            width: 1200,
            height: 630,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: BG_PINK,
            position: 'relative',
            overflow: 'hidden',
          },
        },

        /* BACKGROUND GRADIENT (SOFT BLUSH EFFECT) */
        React.createElement('div', {
          style: {
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'linear-gradient(135deg, #FFF5F8 0%, #FDEBF2 50%, #F8DCE7 100%)',
          },
        }),

        /* GLOW 1: TOP LEFT (SOFT BRIGHT PINK GLOW) */
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: -150,
            left: -100,
            width: 650,
            height: 650,
            display: 'flex',
            background:
              'radial-gradient(circle, rgba(251,227,237,0.8) 0%, transparent 70%)',
          },
        }),

        /* GLOW 2: BOTTOM RIGHT (WARM GOLD/CREAM REFLECTION) */
        React.createElement('div', {
          style: {
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 550,
            height: 550,
            display: 'flex',
            background:
              'radial-gradient(circle, rgba(255,241,214,0.5) 0%, transparent 70%)',
          },
        }),

        /* FRAME OUTER */
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: '1px solid rgba(227,90,135,0.25)',
            borderRadius: 26,
          },
        }),

        /* FRAME INNER DASHED */
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: '1px dashed rgba(247,193,213,0.5)',
            borderRadius: 22,
          },
        }),

        /* CONTENT CONTAINER */
        React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 10,
              width: '100%',
              padding: '0 90px',
            },
          },

          /* LABEL */
          React.createElement(
            'div',
            {
              style: {
                fontFamily: 'Cinzel',
                fontSize: 12,
                letterSpacing: 9,
                textTransform: 'uppercase',
                color: TEXT_MAIN,
                marginBottom: 18,
                display: 'flex',
                fontWeight: 600,
              },
            },
            'Invitatie la Botez'
          ),

          /* DIVIDER TOP */
          React.createElement(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 22,
                width: 380,
              },
            },
            React.createElement('div', {
              style: { flex: 1, height: 1, background: 'rgba(227,90,135,0.25)' },
            }),
            React.createElement('div', {
              style: {
                width: 8,
                height: 8,
                background: PINK_ACCENT,
                borderRadius: 999,
                border: '1px solid #7A2E4D',
              },
            }),
            React.createElement('div', {
              style: { flex: 1, height: 1, background: 'rgba(227,90,135,0.25)' },
            })
          ),

          /* CHILD NAME */
          React.createElement(
            'div',
            {
              style: {
                fontFamily: 'Playfair',
                fontStyle: 'italic',
                fontSize: nameFontSize,
                color: TEXT_MAIN,
                lineHeight: 1.1,
                textAlign: 'center',
              },
            },
            childName
          ),

          /* PARENTS */
          ...(parentsStr
            ? [
                React.createElement(
                  'div',
                  {
                    key: 'parents',
                    style: {
                      fontFamily: 'Cinzel',
                      fontSize: 13,
                      color: TEXT_SUB,
                      letterSpacing: 3,
                      marginTop: 14,
                      display: 'flex',
                    },
                  },
                  parentsStr
                ),
              ]
            : []),

          /* DIVIDER BOTTOM */
          React.createElement(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginTop: 24,
                marginBottom: 16,
                width: 380,
              },
            },
            React.createElement('div', {
              style: { flex: 1, height: 1, background: 'rgba(227,90,135,0.25)' },
            }),
            React.createElement('div', {
              style: {
                width: 8,
                height: 8,
                background: PINK_ACCENT,
                borderRadius: 999,
                border: '1px solid #7A2E4D',
              },
            }),
            React.createElement('div', {
              style: { flex: 1, height: 1, background: 'rgba(227,90,135,0.25)' },
            })
          ),

          /* DATE + LOCATION */
          ...(dateStr || loc
            ? [
                React.createElement(
                  'div',
                  {
                    key: 'meta',
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      fontFamily: 'Cinzel',
                      fontSize: 13,
                      color: GOLD_ACCENT,
                      letterSpacing: 2,
                      fontWeight: 600,
                    },
                  },
                  dateStr
                    ? React.createElement('span', null, dateStr)
                    : null,
                  dateStr && loc
                    ? React.createElement('span', { style: { opacity: 0.4, color: TEXT_SUB } }, '◆')
                    : null,
                  loc ? React.createElement('span', null, loc) : null
                ),
              ]
            : []),

          /* BRANDING EFFECT */
          React.createElement(
            'div',
            {
              style: {
                marginTop: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              },
            },
            React.createElement('div', {
              style: { width: 32, height: 1, background: 'rgba(227,90,135,0.2)' },
            }),
            React.createElement(
              'div',
              {
                style: {
                  fontFamily: 'Cinzel',
                  fontSize: 10,
                  letterSpacing: 6,
                  color: MIST,
                  textTransform: 'uppercase',
                },
              },
              'www.vibeinvite.ro'
            ),
            React.createElement('div', {
              style: { width: 32, height: 1, background: 'rgba(227,90,135,0.2)' },
            })
          )
        )
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: 'Cinzel', data: cinzelData, style: 'normal', weight: 600 },
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