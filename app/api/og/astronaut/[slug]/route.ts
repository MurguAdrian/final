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

    const SPACE  = '#0B1410';
    const MIST   = 'rgba(170,210,190,0.35)';
    const SOFT   = 'rgba(190,230,210,0.55)';
    const GOLD   = 'rgba(220,200,160,0.75)';
    const TEXT   = '#EAF6EE';
    const GREEN  = '#7FBF9B';

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
            background: SPACE,
            position: 'relative',
            overflow: 'hidden',
          },
        },

        /* BACKGROUND */
        React.createElement('div', {
          style: {
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'radial-gradient(ellipse at top, #1A2C22 0%, #0B1410 55%, #070C09 100%)',
          },
        }),

        /* GLOW */
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: -120,
            left: -80,
            width: 600,
            height: 600,
            display: 'flex',
            background:
              'radial-gradient(circle, rgba(127,191,155,0.20) 0%, transparent 65%)',
          },
        }),

        React.createElement('div', {
          style: {
            position: 'absolute',
            bottom: -120,
            right: -90,
            width: 520,
            height: 520,
            display: 'flex',
            background:
              'radial-gradient(circle, rgba(180,220,200,0.12) 0%, transparent 70%)',
          },
        }),

        /* FRAME */
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: '1px solid rgba(127,191,155,0.25)',
            borderRadius: 26,
          },
        }),

        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: '1px dashed rgba(127,191,155,0.12)',
            borderRadius: 22,
          },
        }),

        /* CONTENT */
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
                fontSize: 11,
                letterSpacing: 9,
                textTransform: 'uppercase',
                color: MIST,
                marginBottom: 18,
                display: 'flex',
              },
            },
            'Invitatie la Botez'
          ),

          /* DIVIDER */
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
              style: { flex: 1, height: 1, background: MIST },
            }),
            React.createElement('div', {
              style: {
                width: 7,
                height: 7,
                background: GREEN,
                borderRadius: 999,
              },
            }),
            React.createElement('div', {
              style: { flex: 1, height: 1, background: MIST },
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
                color: TEXT,
                lineHeight: 1,
              },
            },
            childName
          ),

          /* PARENTS (SAFE - NO NULL) */
          ...(parentsStr
            ? [
                React.createElement(
                  'div',
                  {
                    key: 'parents',
                    style: {
                      fontFamily: 'Cinzel',
                      fontSize: 13,
                      color: 'rgba(170,210,190,0.65)',
                      letterSpacing: 3,
                      marginTop: 10,
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
                marginTop: 22,
                marginBottom: 16,
                width: 380,
              },
            },
            React.createElement('div', {
              style: { flex: 1, height: 1, background: MIST },
            }),
            React.createElement('div', {
              style: {
                width: 7,
                height: 7,
                background: GREEN,
                borderRadius: 999,
              },
            }),
            React.createElement('div', {
              style: { flex: 1, height: 1, background: MIST },
            })
          ),

          /* DATE + LOCATION SAFE */
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
                      color: GOLD,
                      letterSpacing: 2,
                    },
                  },
                  dateStr
                    ? React.createElement('span', null, dateStr)
                    : null,
                  dateStr && loc
                    ? React.createElement('span', { style: { opacity: 0.4 } }, '◆')
                    : null,
                  loc ? React.createElement('span', null, loc) : null
                ),
              ]
            : []),

          /* BRAND */
          React.createElement(
            'div',
            {
              style: {
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              },
            },
            React.createElement('div', {
              style: { width: 32, height: 1, background: 'rgba(127,191,155,0.25)' },
            }),
            React.createElement(
              'div',
              {
                style: {
                  fontFamily: 'Cinzel',
                  fontSize: 10,
                  letterSpacing: 6,
                  color: 'rgba(170,210,190,0.45)',
                  textTransform: 'uppercase',
                },
              },
              'www.vibeinvite.ro'
            ),
            React.createElement('div', {
              style: { width: 32, height: 1, background: 'rgba(127,191,155,0.25)' },
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