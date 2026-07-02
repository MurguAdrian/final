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

    // Butterfly Pink & Rose Gold Palette
    const BG_DEEP     = '#FFF5F7'; // Roz extrem de pal / fin
    const ROSE_GOLD   = 'rgba(231, 154, 169, 0.85)';
    const ROSE_DIM    = 'rgba(244, 194, 203, 0.45)';
    const SPARKLE_PINK= 'rgba(251, 182, 206, 0.4)';
    const TEXT        = '#741D3B'; // Magenta închis / Burgundy regal pentru lizibilitate
    const TEXT_SUB    = '#B85C77'; // Roz prăfuit intens pentru subtitluri
    const PINK_DOT    = '#F472B6'; // Punct central roz vibrant strălucitor
    const TEXT_META   = '#881337'; // Culoare text dată și locație

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

        /* BACKGROUND GRADIENT WITH PINK/BUTTERFLY VIBES */
        React.createElement('div', {
          style: {
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'radial-gradient(ellipse 80% 60% at 10% 10%, rgba(251,182,206,0.22) 0%, transparent 50%), radial-gradient(ellipse 70% 55% at 92% 88%, rgba(231,154,169,0.25) 0%, transparent 52%), linear-gradient(148deg, #FFF5F7 0%, #FFE4E6 40%, #FFFDFA 100%)',
          },
        }),

        /* SPARKLE ACCENT TOP-LEFT (Butterfly Magic) */
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 60,
            left: 80,
            width: 120,
            height: 120,
            display: 'flex',
            background: 'radial-gradient(circle, rgba(251,182,206,0.35) 0%, transparent 70%)',
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
            background: 'radial-gradient(circle, rgba(231,154,169,0.3) 0%, transparent 70%)',
          },
        }),

        /* ROSE GOLD ACCENT TOP-RIGHT */
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 40,
            right: 120,
            width: 100,
            height: 100,
            display: 'flex',
            background: 'radial-gradient(circle, rgba(231,154,169,0.22) 0%, transparent 65%)',
          },
        }),

        /* OUTER FRAME (Rose Tinted) */
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: '1.5px solid rgba(231,154,169,0.45)',
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
            border: '1px dashed rgba(231,154,169,0.25)',
            borderRadius: 22,
          },
        }),

        /* CORNER SPARKLES / DOTS (Rose Gold / Blush Pink) */
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 54,
            left: 54,
            width: 16,
            height: 16,
            display: 'flex',
            background: ROSE_GOLD,
            borderRadius: 999,
            opacity: 0.7,
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
            background: ROSE_GOLD,
            borderRadius: 999,
            opacity: 0.7,
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
            background: 'rgba(251,182,206,0.8)',
            borderRadius: 999,
            opacity: 0.7,
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
            background: 'rgba(251,182,206,0.8)',
            borderRadius: 999,
            opacity: 0.7,
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
                opacity: 0.85,
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
                background: 'linear-gradient(90deg, transparent, rgba(231,154,169,0.6))',
              },
            }),
            React.createElement('div', {
              style: {
                width: 8,
                height: 8,
                background: PINK_DOT,
                borderRadius: 999,
                boxShadow: '0 0 8px rgba(244,114,182,0.6)',
              },
            }),
            React.createElement('div', {
              style: {
                flex: 1,
                height: 1,
                background: 'linear-gradient(90deg, rgba(231,154,169,0.6), transparent)',
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
                textShadow: '0 2px 20px rgba(251,182,206,0.25)',
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
                      opacity: 0.8,
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
                background: 'linear-gradient(90deg, transparent, rgba(231,154,169,0.5))',
              },
            }),
            React.createElement('div', {
              style: {
                width: 8,
                height: 8,
                background: '#E79AA9',
                borderRadius: 999,
                boxShadow: '0 0 8px rgba(231,154,169,0.5)',
              },
            }),
            React.createElement('div', {
              style: {
                flex: 1,
                height: 1,
                background: 'linear-gradient(90deg, rgba(231,154,169,0.5), transparent)',
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
                      color: TEXT_META,
                      letterSpacing: 2,
                      opacity: 0.85,
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
                background: 'rgba(231,154,169,0.35)',
              },
            }),
            React.createElement(
              'div',
              {
                style: {
                  fontFamily: 'Cinzel',
                  fontSize: 10,
                  letterSpacing: 6,
                  color: 'rgba(184,92,119,0.6)',
                  textTransform: 'uppercase',
                },
              },
              'www.vibeinvite.ro'
            ),
            React.createElement('div', {
              style: {
                width: 36,
                height: 1,
                background: 'rgba(231,154,169,0.35)',
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