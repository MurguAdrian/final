import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!);
  const resend = new Resend(process.env.RESEND_API_KEY!);

  const results = {
    weddingReminders: 0,
    galleryExpiredReminders: 0,
    errors: [] as string[],
  };

  try {
    // ─────────────────────────────────────────────────────────
    // 1. EMAIL — Cu 1 zi înainte de nuntă
    //    Condiție: wedding_date între mâine 00:00 și mâine 23:59
    //    și galeria nu e activă (să îi îndemne să o activeze)
    // ─────────────────────────────────────────────────────────
    const weddingTomorrow = await sql`
      SELECT
        o.email,
        ws.bride_name,
        ws.groom_name,
        ws.wedding_date,
        ws.gallery_status,
        ws.photos_expires_at,
        ws.custom_slug
      FROM wedding_settings ws
      JOIN orders o ON o.id = ws.order_id
      WHERE
        ws.wedding_date IS NOT NULL
        AND ws.wedding_date >= NOW() + INTERVAL '1 day'
        AND ws.wedding_date <  NOW() + INTERVAL '2 days'
    `;

    for (const row of weddingTomorrow) {
      const isGalleryActive =
        row.gallery_status === 'active' &&
        row.photos_expires_at &&
        new Date(row.photos_expires_at).getTime() > Date.now();

      const brideName = row.bride_name || 'Mireasă';
      const groomName = row.groom_name || 'Mire';

      try {
        if (!isGalleryActive) {
          // Galeria nu e activă — îi îndemn să o activeze
          await resend.emails.send({
            from: 'VibeInvite <office@vibeinvite.ro>',
            to: row.email,
            subject: `🎊 Mâine e ziua cea mare, ${brideName} & ${groomName}! Activați galeria foto`,
            html: `
              <!DOCTYPE html>
              <html>
              <head><meta charset="utf-8"></head>
              <body style="margin:0;padding:0;background:#050401;font-family:Georgia,serif;">
                <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
                  <div style="text-align:center;margin-bottom:32px;">
                    <p style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:rgba(212,175,55,.6);margin:0 0 8px;">
                      VIBEINVITE
                    </p>
                    <h1 style="font-size:28px;font-style:italic;font-weight:300;color:#F5E6A8;margin:0;line-height:1.3;">
                      Mâine scrieți una dintre<br/>cele mai frumoase povești ✦
                    </h1>
                  </div>

                  <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent);margin:0 0 32px;"></div>

                  <p style="font-size:16px;font-style:italic;color:rgba(245,230,168,.75);line-height:1.8;margin:0 0 24px;">
                    Dragii noștri <strong style="color:#D4AF37;">${brideName} & ${groomName}</strong>,
                    <br/><br/>
                    mâine este ziua voastră. Invitații vor fi acolo, momentele vor fi unice —
                    și fiecare fotografie surprinsă de ei face parte din povestea voastră.
                  </p>

                  <div style="background:rgba(212,175,55,.06);border:1px solid rgba(212,175,55,.25);border-radius:14px;padding:24px;margin:0 0 28px;text-align:center;">
                    <p style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(212,175,55,.55);margin:0 0 10px;">
                      GALERIE FOTO LIVE
                    </p>
                    <p style="font-size:15px;font-style:italic;color:rgba(245,230,168,.7);margin:0 0 20px;line-height:1.7;">
                      Activați galeria foto din dashboard și invitații vor putea încărca fotografii direct de pe telefon în timpul nunții.
                    </p>
                    <a href="https://www.vibeinvite.ro/dashboard/lux"
                       style="display:inline-block;padding:13px 32px;border-radius:6px;background:linear-gradient(135deg,#8B6914 0%,#D4AF37 40%,#F5D678 55%,#D4AF37 70%,#8B6914 100%);color:#0A0803;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;">
                      Activează Galeria Foto
                    </a>
                  </div>

                  <p style="font-size:14px;font-style:italic;color:rgba(212,175,55,.45);text-align:center;margin:0;">
                    Vă dorim o zi de neuitat ✦
                  </p>

                  <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,.2),transparent);margin:32px 0 20px;"></div>

                  <p style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(212,175,55,.25);text-align:center;margin:0;">
                    VIBEINVITE · vibeinvite.ro
                  </p>
                </div>
              </body>
              </html>
            `,
          });
          results.weddingReminders++;
          console.log(`📧 Email nuntă mâine (galerie inactivă) → ${row.email}`);
        } else {
          // Galeria e deja activă — îi felicităm și le amintim că invitații pot încărca
          await resend.emails.send({
            from: 'VibeInvite <office@vibeinvite.ro>',
            to: row.email,
            subject: `🎊 Mâine e ziua cea mare! Galeria foto este pregătită`,
            html: `
              <!DOCTYPE html>
              <html>
              <head><meta charset="utf-8"></head>
              <body style="margin:0;padding:0;background:#050401;font-family:Georgia,serif;">
                <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
                  <div style="text-align:center;margin-bottom:32px;">
                    <p style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:rgba(212,175,55,.6);margin:0 0 8px;">
                      VIBEINVITE
                    </p>
                    <h1 style="font-size:28px;font-style:italic;font-weight:300;color:#F5E6A8;margin:0;line-height:1.3;">
                      Mâine scrieți una dintre<br/>cele mai frumoase povești ✦
                    </h1>
                  </div>

                  <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent);margin:0 0 32px;"></div>

                  <p style="font-size:16px;font-style:italic;color:rgba(245,230,168,.75);line-height:1.8;margin:0 0 24px;">
                    Dragii noștri <strong style="color:#D4AF37;">${brideName} & ${groomName}</strong>,
                    <br/><br/>
                    galeria foto este activă și pregătită. Invitații voștri pot încărca fotografii direct de pe invitație în timpul nunții.
                  </p>

                  <div style="background:rgba(76,175,80,.06);border:1px solid rgba(76,175,80,.25);border-radius:14px;padding:20px 24px;margin:0 0 28px;text-align:center;">
                    <p style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(76,175,80,.7);margin:0 0 8px;">
                      ✓ GALERIE ACTIVĂ
                    </p>
                    <p style="font-size:14px;font-style:italic;color:rgba(245,230,168,.6);margin:0;line-height:1.6;">
                      Fotografiile invitaților apar în timp real în dashboard-ul tău.
                    </p>
                  </div>

                  <p style="font-size:14px;font-style:italic;color:rgba(212,175,55,.45);text-align:center;margin:0;">
                    Vă dorim o zi de neuitat ✦
                  </p>

                  <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,.2),transparent);margin:32px 0 20px;"></div>

                  <p style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(212,175,55,.25);text-align:center;margin:0;">
                    VIBEINVITE · vibeinvite.ro
                  </p>
                </div>
              </body>
              </html>
            `,
          });
          results.weddingReminders++;
          console.log(`📧 Email nuntă mâine (galerie activă) → ${row.email}`);
        }
      } catch (e: any) {
        console.error(`Eroare email nuntă pentru ${row.email}:`, e);
        results.errors.push(`wedding-${row.email}: ${e.message}`);
      }
    }

    // ─────────────────────────────────────────────────────────
    // 2. EMAIL — Galeria a expirat (în ultimele 24h)
    //    Condiție: photos_expires_at între acum-24h și acum
    //    și gallery_status = 'active' (nu a fost reactivată)
    //    Notă: status în DB rămâne 'active', expirarea e
    //    calculată client-side din photos_expires_at
    // ─────────────────────────────────────────────────────────
    const recentlyExpired = await sql`
      SELECT
        o.email,
        ws.bride_name,
        ws.groom_name,
        ws.photos_expires_at,
        ws.custom_slug,
        ws.order_id
      FROM wedding_settings ws
      JOIN orders o ON o.id = ws.order_id
      WHERE
        ws.photos_expires_at IS NOT NULL
        AND ws.photos_expires_at < NOW()
        AND ws.photos_expires_at > NOW() - INTERVAL '24 hours'
        AND ws.photos_activated_at IS NOT NULL
    `;

    for (const row of recentlyExpired) {
      const brideName = row.bride_name || 'Mireasă';
      const groomName = row.groom_name || 'Mire';

      try {
        await resend.emails.send({
          from: 'VibeInvite <office@vibeinvite.ro>',
          to: row.email,
          subject: `📸 Galeria foto a expirat — Reactivează și păstrează momentele`,
          html: `
            <!DOCTYPE html>
            <html>
            <head><meta charset="utf-8"></head>
            <body style="margin:0;padding:0;background:#050401;font-family:Georgia,serif;">
              <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
                <div style="text-align:center;margin-bottom:32px;">
                  <p style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:rgba(212,175,55,.6);margin:0 0 8px;">
                    VIBEINVITE
                  </p>
                  <h1 style="font-size:26px;font-style:italic;font-weight:300;color:#F5E6A8;margin:0;line-height:1.3;">
                    Fotografiile sunt acolo.<br/>Reactivează accesul ✦
                  </h1>
                </div>

                <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent);margin:0 0 32px;"></div>

                <p style="font-size:16px;font-style:italic;color:rgba(245,230,168,.75);line-height:1.8;margin:0 0 24px;">
                  Dragii noștri <strong style="color:#D4AF37;">${brideName} & ${groomName}</strong>,
                  <br/><br/>
                  perioada de 3 zile a galeriei foto a expirat. Fotografiile încărcate de invitații voștri sunt în siguranță — dar accesul la ele este momentan blocat.
                </p>

                <div style="background:rgba(212,175,55,.06);border:1px solid rgba(212,175,55,.25);border-radius:14px;padding:24px;margin:0 0 28px;text-align:center;">
                  <p style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(212,175,55,.55);margin:0 0 10px;">
                    REACTIVARE GALERIE
                  </p>
                  <p style="font-size:15px;font-style:italic;color:rgba(245,230,168,.7);margin:0 0 8px;line-height:1.7;">
                    Reactivează galeria pentru alte <strong style="color:#D4AF37;">3 zile</strong> și descarcă toate fotografiile din ziua nunții.
                  </p>
                  <p style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#D4AF37;margin:0 0 20px;letter-spacing:.06em;">
                    200 RON · Același album · Pozele păstrate
                  </p>
                  <a href="https://www.vibeinvite.ro/dashboard/lux"
                     style="display:inline-block;padding:13px 32px;border-radius:6px;background:linear-gradient(135deg,#8B6914 0%,#D4AF37 40%,#F5D678 55%,#D4AF37 70%,#8B6914 100%);color:#0A0803;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;">
                    Reactivează Galeria — 200 RON
                  </a>
                </div>

                <p style="font-size:13px;font-style:italic;color:rgba(212,175,55,.4);text-align:center;margin:0;line-height:1.7;">
                  Fotografiile rămân stocate în siguranță pe toată durata contractului.<br/>
                  Poți reactiva oricând din dashboard.
                </p>

                <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,.2),transparent);margin:32px 0 20px;"></div>

                <p style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(212,175,55,.25);text-align:center;margin:0;">
                  VIBEINVITE · vibeinvite.ro
                </p>
              </div>
            </body>
            </html>
          `,
        });
        results.galleryExpiredReminders++;
        console.log(`📧 Email galerie expirată → ${row.email}`);
      } catch (e: any) {
        console.error(`Eroare email expirare pentru ${row.email}:`, e);
        results.errors.push(`expired-${row.email}: ${e.message}`);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error("Eroare email-reminders:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}