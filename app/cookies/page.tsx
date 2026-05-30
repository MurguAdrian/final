import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politica Cookie | VibeInvite',
  description:
    'Politica de cookie-uri a VibeInvite.ro. Scopuri, tipuri de cookie-uri și cum le poți gestiona. Transparență completă privind tracking-ul și analytics.',
  alternates: { canonical: 'https://vibeinvite.ro/cookies' },
  robots: { index: true, follow: true },
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.vc-page * { box-sizing: border-box; margin: 0; padding: 0; }
.vc-page {
  font-family: 'DM Sans', sans-serif;
  background: #FDFAF6;
  color: #1A1208;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

@keyframes vc-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-20px) scale(1.05)} 66%{transform:translate(-14px,14px) scale(.96)} }
.vc-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(80px); }
.vc-o1  { width: 480px; height: 480px; background: radial-gradient(circle,rgba(255,107,0,.12) 0%,transparent 70%); top: -80px; right: -80px; animation: vc-orb 14s ease-in-out infinite; }
.vc-o2  { width: 280px; height: 280px; background: radial-gradient(circle,rgba(255,107,0,.07) 0%,transparent 70%); bottom: 80px; left: -50px; animation: vc-orb 18s ease-in-out infinite reverse; }

@keyframes vc-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

.vc-inner {
  position: relative; z-index: 10;
  max-width: 860px; margin: 0 auto;
  padding: 48px 20px 80px;
}

.vc-header {
  text-align: center; margin-bottom: 48px;
  opacity: 0; animation: vc-up .7s ease .1s forwards;
}
.vc-super {
  display: inline-flex; align-items: center; gap: 7px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px;
  padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500;
  color: #FF6B00; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 18px;
}
.vc-sdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; }
.vc-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(30px, 5vw, 50px);
  font-weight: 300; line-height: 1.1; color: #1A1208; margin-bottom: 12px;
}
.vc-h1 em { font-style: italic; color: #FF6B00; }
.vc-date { font-size: 12px; color: rgba(26,18,8,.45); letter-spacing: .04em; }

.vc-infobox {
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.25); border-radius: 16px;
  padding: 18px 22px; margin-bottom: 32px; font-size: 13px; line-height: 1.75;
  color: rgba(26,18,8,.7);
  opacity: 0; animation: vc-up .7s ease .2s forwards;
}
.vc-infobox strong { color: #1A1208; }

.vc-card {
  background: #fff; border-radius: 20px;
  border: 1px solid rgba(255,107,0,.1);
  box-shadow: 0 2px 10px rgba(0,0,0,.04);
  padding: 32px 36px; margin-bottom: 20px;
  opacity: 0; animation: vc-up .7s ease .25s forwards;
}

.vc-card-label {
  font-size: 10px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
  color: #FF6B00; margin-bottom: 8px;
}
.vc-card-h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-weight: 400; color: #1A1208; margin-bottom: 18px; line-height: 1.25;
}

.vc-body { font-size: 13.5px; line-height: 1.85; color: rgba(26,18,8,.68); }
.vc-body p { margin-bottom: 12px; }
.vc-body strong { color: #1A1208; font-weight: 600; }

.vc-list { list-style: none; padding: 0; margin: 10px 0; }
.vc-list li {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 13px; color: rgba(26,18,8,.68); line-height: 1.65; margin-bottom: 8px;
}
.vc-li-dot { width: 6px; height: 6px; border-radius: 50%; background: #FF6B00; flex-shrink: 0; margin-top: 7px; }

.vc-table-wrap { overflow-x: auto; margin: 16px 0; border-radius: 12px; border: 1px solid rgba(255,107,0,.1); }
.vc-table {
  width: 100%; border-collapse: collapse; font-size: 12px; background: #fff;
}
.vc-table th {
  background: #FFF4ED; padding: 12px 14px; text-align: left; font-weight: 600; color: #1A1208; border-bottom: 1px solid rgba(255,107,0,.1);
}
.vc-table td {
  padding: 12px 14px; border-bottom: 1px solid rgba(255,107,0,.08); color: rgba(26,18,8,.68);
}
.vc-table tr:last-child td { border-bottom: 0; }

.vc-badge {
  display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
  text-transform: uppercase; letter-spacing: .04em;
}
.vc-badge-required { background: #FFE8DB; color: #FF6B00; }
.vc-badge-optional { background: #E8F0E8; color: #248C3C; }

.vc-highlight {
  background: linear-gradient(135deg, #1A1208 0%, #2d1f0e 100%);
  border-radius: 20px; padding: 28px 32px; margin-bottom: 20px;
  border: 1px solid rgba(255,107,0,.2);
  opacity: 0; animation: vc-up .7s ease .3s forwards;
}
.vc-highlight h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; font-weight: 400; color: #fff; margin-bottom: 14px;
}
.vc-highlight-body { font-size: 13px; line-height: 1.85; color: rgba(255,255,255,.65); }
.vc-highlight-body p { margin-bottom: 10px; }
.vc-highlight-body strong { color: #FFB374; }

@media (max-width: 600px) {
  .vc-inner { padding: 32px 16px 60px; }
  .vc-card  { padding: 24px 20px; }
  .vc-table { font-size: 11px; }
  .vc-table th, .vc-table td { padding: 10px 10px; }
}
`

export default function CookiesPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="vc-page">
        <div className="vc-orb vc-o1" aria-hidden="true" />
        <div className="vc-orb vc-o2" aria-hidden="true" />

        <div className="vc-inner">

          {/* HEADER */}
          <header className="vc-header">
            <p className="vc-super">
              <span className="vc-sdot" aria-hidden="true" />
              Transparență
            </p>
            <h1 className="vc-h1">
              Politica <em>Cookie-urilor</em>
            </h1>
            <p className="vc-date">Data efectivă: 30 mai 2026 | Ultima actualizare: 30 mai 2026</p>
          </header>

          {/* INFO BOX */}
          <div className="vc-infobox">
            <strong>Transparență completă.</strong> Această pagină explică în detaliu cookie-urile pe care le 
            utilizează VibeInvite.ro, de ce sunt necesare și cum le poți gestiona. Citește cu atenție!
          </div>

          {/* SECTION 1: CE SUNT COOKIES */}
          <div className="vc-card">
            <p className="vc-card-label">Capitolul 1</p>
            <h2 className="vc-card-h2">Ce sunt <em>cookie-urile</em>?</h2>
            <div className="vc-body">
              <p>
                Cookie-urile sunt fișiere mici de text (obișnuit 1-10 KB) care sunt stocate pe hard disk-ul 
                computerului sau dispozitivului tău (telefon, tablet) atunci când vizitezi un website. 
                Ele servesc mai multor scopuri:
              </p>
              <ul className="vc-list">
                <li>
                  <span className="vc-li-dot" />
                  <span><strong>Autentificare:</strong> Reţin faptul că ți-ai conectat contul.</span>
                </li>
                <li>
                  <span className="vc-li-dot" />
                  <span><strong>Preferințe:</strong> Reţin setările tale (limbă, apariție, etc).</span>
                </li>
                <li>
                  <span className="vc-li-dot" />
                  <span><strong>Analytics:</strong> Urmăresc comportamentul pentru a îmbunătăți site-ul.</span>
                </li>
                <li>
                  <span className="vc-li-dot" />
                  <span><strong>Securitate:</strong> Protejează contul de acces neautorizat.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* SECTION 2: CATEGORII COOKIES */}
          <div className="vc-card">
            <p className="vc-card-label">Capitolul 2</p>
            <h2 className="vc-card-h2">Tipuri de <em>cookie-uri</em> utilizate</h2>
            <div className="vc-body">
              <p style={{ marginBottom: '20px', fontStyle: 'italic', color: '#FF6B00' }}>
                Platforma VibeInvite utilizează cookie-uri din următoarele categorii:
              </p>

              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', marginTop: '20px' }}>
                1️⃣ Cookie-uri Necesare (Obligatorii)
              </h3>
              <p>
                Aceste cookie-uri sunt <strong>esențiale</strong> pentru funcționarea corectă a platformei. 
                <strong>NU pot fi dezactivate</strong> fără a afecta accesul.
              </p>

              <div className="vc-table-wrap">
                <table className="vc-table">
                  <thead>
                    <tr>
                      <th>Cookie</th>
                      <th>Valabilitate</th>
                      <th>Scop</th>
                      <th>Tip</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>auth_token</code></td>
                      <td>24 ore</td>
                      <td>Sesiune de autentificare (JWT)</td>
                      <td><span className="vc-badge vc-badge-required">Necesar</span></td>
                    </tr>
                    <tr>
                      <td><code>session_id</code></td>
                      <td>24 ore</td>
                      <td>Tracking sesiune utilizator</td>
                      <td><span className="vc-badge vc-badge-required">Necesar</span></td>
                    </tr>
                    <tr>
                      <td><code>csrf_token</code></td>
                      <td>Session</td>
                      <td>Protecție CSRF (securitate)</td>
                      <td><span className="vc-badge vc-badge-required">Necesar</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p style={{ marginTop: '14px', fontSize: '12px', color: 'rgba(26,18,8,.5)' }}>
                <strong>Status:</strong> Activate implicit (NU ai control). Fără acestea, site-ul NU funcționează.
              </p>

              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', marginTop: '20px' }}>
                2️⃣ Cookie-uri Analytics (Opțional)
              </h3>
              <p>
                Aceste cookie-uri permit VibeInvite să analizeze comportamentul vizitatorilor 
                și să îmbunătățească experiența. <strong>Necesită consimțământul tău</strong> (banner de mai jos).
              </p>

              <div className="vc-table-wrap">
                <table className="vc-table">
                  <thead>
                    <tr>
                      <th>Cookie</th>
                      <th>Setare</th>
                      <th>Scop</th>
                      <th>Tip</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>_ga</code></td>
                      <td>Google Analytics</td>
                      <td>ID unic sesiune (anonimizat)</td>
                      <td><span className="vc-badge vc-badge-optional">Opțional</span></td>
                    </tr>
                    <tr>
                      <td><code>_gid</code></td>
                      <td>Google Analytics</td>
                      <td>ID sesiune Google (24h)</td>
                      <td><span className="vc-badge vc-badge-optional">Opțional</span></td>
                    </tr>
                    <tr>
                      <td><code>_gat</code></td>
                      <td>Google Analytics</td>
                      <td>Rate limiting Google requests</td>
                      <td><span className="vc-badge vc-badge-optional">Opțional</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p style={{ marginTop: '14px', fontSize: '12px', color: 'rgba(26,18,8,.5)' }}>
                <strong>Status:</strong> Activate doar dacă accepți din banner. Site-ul funcționează complet și fără acestea.
              </p>

              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', marginTop: '20px' }}>
                3️⃣ Cookie-uri Marketing & Social (Neutilizate)
              </h3>
              <p>
                VibeInvite <strong>NU utilizează</strong> în prezent cookie-uri de publicitate sau social media:
              </p>
              <ul className="vc-list">
                <li>
                  <span className="vc-li-dot" />
                  <span>❌ Facebook Pixel — NU</span>
                </li>
                <li>
                  <span className="vc-li-dot" />
                  <span>❌ Google Ads Tracking — NU</span>
                </li>
                <li>
                  <span className="vc-li-dot" />
                  <span>❌ YouTube Embedding — NU</span>
                </li>
                <li>
                  <span className="vc-li-dot" />
                  <span>❌ Hotjar / Heatmaps — NU</span>
                </li>
              </ul>
            </div>
          </div>

          {/* SECTION 3: GDPR & CONFIDENTIALITATE */}
          <div className="vc-highlight">
            <h3>🔒 Confidențialitate & GDPR</h3>
            <div className="vc-highlight-body">
              <p>
                <strong>Google Analytics anonimizează IP:</strong> Adresa IP a ta NU e stocată de VibeInvite. 
                Google Analytics o prelucrează în mod anonim conform configurării noastre.
              </p>
              <p style={{ marginTop: '12px' }}>
                <strong>NU transmitem date terților:</strong> Cookie-urile necesare rămân local pe dispozitivul tău. 
                Niciodată nu le trimitem către părți terțe (cu excepția Google Analytics dacă ai consimțit).
              </p>
              <p style={{ marginTop: '12px' }}>
                <strong>Dreptul de a refuza:</strong> Poți alege să refuzi cookie-urile analytics din banner 
                și site-ul va funcționa normal. NU e penalizare.
              </p>
            </div>
          </div>

          {/* SECTION 4: CUM GESTIONEZI */}
          <div className="vc-card">
            <p className="vc-card-label">Capitolul 3</p>
            <h2 className="vc-card-h2">Cum să <em>gestionezi</em> cookie-urile</h2>
            <div className="vc-body">
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px', marginTop: '16px' }}>
                ✅ OPȚIUNE 1: Acceptă din Banner
              </h3>
              <p>
                Când vizitezi VibeInvite pentru prima dată, vei vedea un banner în partea de jos a ecranului:
              </p>
              <ul className="vc-list">
                <li>
                  <span className="vc-li-dot" />
                  <span><strong>"Accept All"</strong> → Google Analytics se activează.</span>
                </li>
                <li>
                  <span className="vc-li-dot" />
                  <span><strong>"Reject Analytics"</strong> → Doar cookie-urile necesare rămân active.</span>
                </li>
              </ul>

              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px', marginTop: '16px' }}>
                ✅ OPȚIUNE 2: Șterge Manual
              </h3>

              <p style={{ fontWeight: '600', marginTop: '14px', marginBottom: '8px' }}>📱 GOOGLE CHROME:</p>
              <ol style={{ marginLeft: '20px', color: 'rgba(26,18,8,.68)', fontSize: '13px' }}>
                <li>Settings → Privacy and security → Cookies and other site data</li>
                <li>Caută "vibeinvite.ro"</li>
                <li>Apasă Delete</li>
              </ol>

              <p style={{ fontWeight: '600', marginTop: '14px', marginBottom: '8px' }}>🦊 FIREFOX:</p>
              <ol style={{ marginLeft: '20px', color: 'rgba(26,18,8,.68)', fontSize: '13px' }}>
                <li>Preferences → Privacy & Security</li>
                <li>Cookies and Site Data → Manage Data</li>
                <li>Caută "vibeinvite.ro" → Remove</li>
              </ol>

              <p style={{ fontWeight: '600', marginTop: '14px', marginBottom: '8px' }}>🧭 SAFARI:</p>
              <ol style={{ marginLeft: '20px', color: 'rgba(26,18,8,.68)', fontSize: '13px' }}>
                <li>Preferences → Privacy → Manage Website Data</li>
                <li>Caută "vibeinvite.ro"</li>
                <li>Apasă Remove</li>
              </ol>

              <p style={{ fontWeight: '600', marginTop: '14px', marginBottom: '8px' }}>🔵 EDGE:</p>
              <ol style={{ marginLeft: '20px', color: 'rgba(26,18,8,.68)', fontSize: '13px' }}>
                <li>Settings → Privacy, search, and services → Cookies and other site data</li>
                <li>Manage and delete cookies and site data → Caută "vibeinvite.ro"</li>
                <li>Apasă Delete</li>
              </ol>
            </div>
          </div>

          {/* SECTION 5: DO NOT TRACK */}
          <div className="vc-card">
            <p className="vc-card-label">Capitolul 4</p>
            <h2 className="vc-card-h2">„<em>Do Not Track</em>" (DNT)</h2>
            <div className="vc-body">
              <p>
                Dacă ai activat "Do Not Track" (DNT) în browserul tău, <strong>VibeInvite și Google Analytics 
                vor respecta această preferință</strong>. Cookie-urile analytics NU vor fi încărcate.
              </p>
              <p>
                Ca să activezi DNT:
              </p>
              <ul className="vc-list">
                <li>
                  <span className="vc-li-dot" />
                  <span><strong>Chrome:</strong> Settings → Privacy → Send "Do Not Track" (OFF implicit).</span>
                </li>
                <li>
                  <span className="vc-li-dot" />
                  <span><strong>Firefox:</strong> Preferences → Privacy → Turn on "Tell sites I don't want to be tracked".</span>
                </li>
                <li>
                  <span className="vc-li-dot" />
                  <span><strong>Safari:</strong> Preferences → Privacy → Prevent cross-site tracking.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* SECTION 6: MODIFICARI POLITICA */}
          <div className="vc-card">
            <p className="vc-card-label">Capitolul 5</p>
            <h2 className="vc-card-h2">Modificări ale <em>Politicii</em></h2>
            <div className="vc-body">
              <p>
                VibeInvite poate modifica oricând lista de cookie-uri utilizate. Dacă adaugă cookie-uri 
                <strong>NORI și cu scop diferit</strong> (ex: publicitate), te vom notifica prin email și 
                vei putea refuza din noua versiune de banner.
              </p>
              <p>
                Data ultimei actualizări e indicată în header-ul acestei pagini.
              </p>
            </div>
          </div>

          {/* SECTION 7: CONTACT */}
          <div className="vc-card">
            <p className="vc-card-label">Capitolul 6</p>
            <h2 className="vc-card-h2">Întrebări? <em>Contactează-ne</em></h2>
            <div className="vc-body">
              <p>
                Dacă ai întrebări despre politica cookie-urilor noastre, contactează-ne la:
              </p>
              <p style={{ marginTop: '14px', fontSize: '14px', fontWeight: '600', color: '#1A1208' }}>
                📧 office@vibeinvite.ro
              </p>
              <p style={{ marginTop: '12px', color: 'rgba(26,18,8,.65)' }}>
                Vei primi răspuns în maximum 48 de ore lucrătoare.
              </p>
            </div>
          </div>

          {/* LINKS */}
          <div style={{ background: '#FFF4ED', border: '1px solid rgba(255,107,0,.2)', borderRadius: '16px', padding: '18px 22px', marginTop: '32px' }}>
            <p style={{ fontSize: '13px', color: 'rgba(26,18,8,.7)', lineHeight: '1.75' }}>
              <strong>Vezi și:</strong>{' '}
              <Link href="/termeni" style={{ color: '#FF6B00', textDecoration: 'underline' }}>
                Termeni și Condiții
              </Link>
              {' '} | {' '}
              <Link href="/politica" style={{ color: '#FF6B00', textDecoration: 'underline' }}>
                Politica de Confidențialitate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
