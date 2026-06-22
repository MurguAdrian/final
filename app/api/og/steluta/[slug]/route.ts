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

    // Mint & Gold palette
    const BG_DEEP  = '#F0FDF9';
    const BG_MID   = '#ECFDF5';
    const MINT     = 'rgba(110,231,183,0.45)';
    const MINT_DIM = 'rgba(110,231,183,0.22)';
    const GOLD     = 'rgba(252,211,77,0.85)';
    const GOLD_DIM = 'rgba(252,211,77,0.45)';
    const TEXT     = '#065F46';
    const TEXT_SUB = '#059669';
    const GREEN_DOT= '#34D399';

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
            background: BG_DEEP,
            position: 'relative',
            overflow: 'hidden',
          },
        },

        /* BACKGROUND GRADIENT */
        React.createElement('div', {
          style: {
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'radial-gradient(ellipse 80% 60% at 10% 10%, rgba(110,231,183,0.18) 0%, transparent 50%), radial-gradient(ellipse 70% 55% at 92% 88%, rgba(252,211,77,0.20) 0%, transparent 52%), linear-gradient(148deg, #F0FDF9 0%, #ECFDF5 40%, #FFFBEB 100%)',
          },
        }),

        /* SPARKLE ACCENT TOP-LEFT */
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 60,
            left: 80,
            width: 120,
            height: 120,
            display: 'flex',
            background: 'radial-gradient(circle, rgba(110,231,183,0.25) 0%, transparent 70%)',
          },
        }),

        /* SPARKLE ACCENT BOTTOM-RIGHT */
        React.createElement('div', {
          style: {
            position: 'absolute',
            bottom: 60,
            right: 80,
            width: 160,
            height: 160,
            display: 'flex',
            background: 'radial-gradient(circle, rgba(252,211,77,0.22) 0%, transparent 70%)',
          },
        }),

        /* GOLD ACCENT TOP-RIGHT */
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 40,
            right: 120,
            width: 100,
            height: 100,
            display: 'flex',
            background: 'radial-gradient(circle, rgba(252,211,77,0.18) 0%, transparent 65%)',
          },
        }),

        /* OUTER FRAME */
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: '1.5px solid rgba(110,231,183,0.38)',
            borderRadius: 28,
          },
        }),

        /* INNER DASHED FRAME */
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 42,
            left: 42,
            right: 42,
            bottom: 42,
            border: '1px dashed rgba(110,231,183,0.18)',
            borderRadius: 22,
          },
        }),

        /* CORNER SPARKLES */
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 54,
            left: 54,
            width: 16,
            height: 16,
            display: 'flex',
            background: GOLD,
            borderRadius: 999,
            opacity: 0.6,
          },
        }),
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 54,
            right: 54,
            width: 16,
            height: 16,
            display: 'flex',
            background: GOLD,
            borderRadius: 999,
            opacity: 0.6,
          },
        }),
        React.createElement('div', {
          style: {
            position: 'absolute',
            bottom: 54,
            left: 54,
            width: 16,
            height: 16,
            display: 'flex',
            background: 'rgba(110,231,183,0.7)',
            borderRadius: 999,
            opacity: 0.6,
          },
        }),
        React.createElement('div', {
          style: {
            position: 'absolute',
            bottom: 54,
            right: 54,
            width: 16,
            height: 16,
            display: 'flex',
            background: 'rgba(110,231,183,0.7)',
            borderRadius: 999,
            opacity: 0.6,
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
              padding: '0 100px',
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
                color: TEXT_SUB,
                marginBottom: 18,
                display: 'flex',
                opacity: 0.75,
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
                marginBottom: 24,
                width: 400,
              },
            },
            React.createElement('div', {
              style: {
                flex: 1,
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(110,231,183,0.5))',
              },
            }),
            React.createElement('div', {
              style: {
                width: 8,
                height: 8,
                background: GREEN_DOT,
                borderRadius: 999,
                boxShadow: '0 0 8px rgba(52,211,153,0.5)',
              },
            }),
            React.createElement('div', {
              style: {
                flex: 1,
                height: 1,
                background: 'linear-gradient(90deg, rgba(110,231,183,0.5), transparent)',
              },
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
                textShadow: '0 2px 20px rgba(110,231,183,0.15)',
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
                      marginTop: 12,
                      display: 'flex',
                      opacity: 0.7,
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
                marginBottom: 18,
                width: 400,
              },
            },
            React.createElement('div', {
              style: {
                flex: 1,
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(252,211,77,0.45))',
              },
            }),
            React.createElement('div', {
              style: {
                width: 8,
                height: 8,
                background: '#FCD34D',
                borderRadius: 999,
                boxShadow: '0 0 8px rgba(252,211,77,0.4)',
              },
            }),
            React.createElement('div', {
              style: {
                flex: 1,
                height: 1,
                background: 'linear-gradient(90deg, rgba(252,211,77,0.45), transparent)',
              },
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
                      color: '#92400E',
                      letterSpacing: 2,
                      opacity: 0.8,
                    },
                  },
                  dateStr
                    ? React.createElement('span', null, dateStr)
                    : null,
                  dateStr && loc
                    ? React.createElement('span', { style: { opacity: 0.4, color: '#D97706' } }, '◆')
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
                marginTop: 22,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              },
            },
            React.createElement('div', {
              style: {
                width: 36,
                height: 1,
                background: 'rgba(110,231,183,0.3)',
              },
            }),
            React.createElement(
              'div',
              {
                style: {
                  fontFamily: 'Cinzel',
                  fontSize: 10,
                  letterSpacing: 6,
                  color: 'rgba(5,150,105,0.5)',
                  textTransform: 'uppercase',
                },
              },
              'www.vibeinvite.ro'
            ),
            React.createElement('div', {
              style: {
                width: 36,
                height: 1,
                background: 'rgba(110,231,183,0.3)',
              },
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