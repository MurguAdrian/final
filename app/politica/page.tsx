import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politica de Confidențialitate & Cookie | VibeInvite',
  description:
    'Politica de confidențialitate și cookie-uri a platformei VibeInvite.ro — cum colectăm, utilizăm și protejăm datele tale personale.',
  alternates: { canonical: 'https://www.vibeinvite.ro/politica' },
  robots: { index: true, follow: true },
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.vp-page * { box-sizing: border-box; margin: 0; padding: 0; }

.vp-page {
  font-family: 'DM Sans', sans-serif;
  background: #FDFAF6;
  color: #1A1208;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

@keyframes vp-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-20px) scale(1.05)} 66%{transform:translate(-14px,14px) scale(.96)} }
.vp-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(80px); }
.vp-o1  { width: 480px; height: 480px; background: radial-gradient(circle,rgba(255,107,0,.12) 0%,transparent 70%); top: -80px; right: -80px; animation: vp-orb 14s ease-in-out infinite; }
.vp-o2  { width: 280px; height: 280px; background: radial-gradient(circle,rgba(255,107,0,.07) 0%,transparent 70%); bottom: 80px; left: -50px; animation: vp-orb 18s ease-in-out infinite reverse; }

@keyframes vp-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

.vp-inner {
  position: relative; z-index: 10;
  max-width: 860px; margin: 0 auto;
  padding: 48px 20px 80px;
}

.vp-header {
  text-align: center; margin-bottom: 48px;
  opacity: 0; animation: vp-up .7s ease .1s forwards;
}
.vp-super {
  display: inline-flex; align-items: center; gap: 7px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px;
  padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500;
  color: #FF6B00; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 18px;
}
.vp-sdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; }
.vp-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(30px, 5vw, 50px);
  font-weight: 300; line-height: 1.1; color: #1A1208; margin-bottom: 12px;
}
.vp-h1 em { font-style: italic; color: #FF6B00; }
.vp-date { font-size: 12px; color: rgba(26,18,8,.45); letter-spacing: .04em; }

.vp-infobox {
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.25); border-radius: 16px;
  padding: 18px 22px; margin-bottom: 32px; font-size: 13px; line-height: 1.75;
  color: rgba(26,18,8,.7);
  opacity: 0; animation: vp-up .7s ease .2s forwards;
}
.vp-infobox strong { color: #1A1208; }

.vp-card {
  background: #fff; border-radius: 20px;
  border: 1px solid rgba(255,107,0,.1);
  box-shadow: 0 2px 10px rgba(0,0,0,.04);
  padding: 32px 36px; margin-bottom: 20px;
  opacity: 0; animation: vp-up .7s ease .25s forwards;
  position: relative;
}
.vp-card::before {
  content: ''; position: absolute; top: 0; left: 32px; right: 32px; height: 2px;
  background: linear-gradient(90deg, #FF6B00, transparent);
  border-radius: 0 0 2px 2px;
}

.vp-card-label {
  font-size: 10px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
  color: #FF6B00; margin-bottom: 8px;
}
.vp-card-h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-weight: 400; color: #1A1208; margin-bottom: 18px; line-height: 1.25;
}
.vp-card-h2 em { font-style: italic; color: #FF6B00; }

.vp-body { font-size: 13.5px; line-height: 1.85; color: rgba(26,18,8,.68); }
.vp-body p { margin-bottom: 12px; }
.vp-body p:last-child { margin-bottom: 0; }
.vp-body strong { color: #1A1208; font-weight: 600; }

.vp-list { list-style: none; padding: 0; margin: 10px 0; display: flex; flex-direction: column; gap: 7px; }
.vp-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: rgba(26,18,8,.68); line-height: 1.65; }
.vp-li-dot { width: 6px; height: 6px; border-radius: 50%; background: #FF6B00; flex-shrink: 0; margin-top: 7px; }

.vp-table-wrap { overflow-x: auto; margin: 16px 0; }
.vp-table {
  width: 100%; border-collapse: collapse; font-size: 12.5px;
}
.vp-table th {
  background: #FFF4ED; color: #FF6B00; font-weight: 600; font-size: 11px;
  letter-spacing: .05em; text-transform: uppercase;
  padding: 10px 14px; text-align: left; border-bottom: 1px solid rgba(255,107,0,.15);
}
.vp-table td {
  padding: 10px 14px; border-bottom: 1px solid rgba(26,18,8,.06);
  color: rgba(26,18,8,.65); vertical-align: top; line-height: 1.6;
}
.vp-table tr:last-child td { border-bottom: none; }
.vp-table tr:hover td { background: rgba(255,107,0,.03); }

.vp-dark {
  background: linear-gradient(135deg, #1A1208 0%, #2d1f0e 100%);
  border-radius: 20px; padding: 28px 32px; margin-bottom: 20px;
  border: 1px solid rgba(255,107,0,.2);
  opacity: 0; animation: vp-up .7s ease .3s forwards;
}
.vp-dark-label { font-size: 10px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: #FF8C35; margin-bottom: 8px; }
.vp-dark-h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-weight: 400; color: #fff; margin-bottom: 16px; line-height: 1.25;
}
.vp-dark-h2 em { font-style: italic; color: #FF8C35; }
.vp-dark-body { font-size: 13px; line-height: 1.85; color: rgba(255,255,255,.65); }
.vp-dark-body p { margin-bottom: 10px; }
.vp-dark-body p:last-child { margin-bottom: 0; }
.vp-dark-body strong { color: #FFB374; font-weight: 600; }

.vp-operator {
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.2); border-radius: 16px;
  padding: 22px 28px; margin-top: 32px; font-size: 13px; color: rgba(26,18,8,.65); line-height: 1.75;
  opacity: 0; animation: vp-up .7s ease .4s forwards;
}
.vp-operator strong { color: #1A1208; font-weight: 600; display: block; margin-bottom: 4px; font-size: 14px; }

@media (max-width: 600px) {
  .vp-inner { padding: 32px 16px 60px; }
  .vp-card  { padding: 24px 20px; }
  .vp-dark  { padding: 22px 20px; }
}
`

function Card({ no, label, title, children }: { no: string; label: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="vp-card">
      <p className="vp-card-label">Art. {no} — {label}</p>
      <h2 className="vp-card-h2">{title}</h2>
      <div className="vp-body">{children}</div>
    </div>
  )
}

function Dark({ label, title, children }: { label: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="vp-dark">
      <p className="vp-dark-label">{label}</p>
      <h2 className="vp-dark-h2">{title}</h2>
      <div className="vp-dark-body">{children}</div>
    </div>
  )
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <span className="vp-li-dot" aria-hidden="true" />
      <span>{children}</span>
    </li>
  )
}

export default function PoliticaPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="vp-page">
        <div className="vp-orb vp-o1" aria-hidden="true" />
        <div className="vp-orb vp-o2" aria-hidden="true" />

        <div className="vp-inner">

          {/* HEADER */}
          <header className="vp-header">
            <p className="vp-super">
              <span className="vp-sdot" aria-hidden="true" />
              Document Legal
            </p>
            <h1 className="vp-h1">
              Politica de <em>Confidențialitate</em> și Cookie
            </h1>
            <p className="vp-date">Versiunea 1.0 — Data intrării în vigoare: 20.05.2026</p>
          </header>

          {/* INFO BOX */}
          <div className="vp-infobox" role="note">
            <strong>Protecția datelor tale personale este o prioritate pentru noi.</strong>{' '}
            Acest document explică ce date colectăm, de ce, cât timp le păstrăm și ce drepturi ai
            în calitate de utilizator al platformei VibeInvite.ro, în conformitate cu
            Regulamentul (UE) 2016/679 (GDPR) și legislația română aplicabilă.
          </div>

          {/* ART. 1 */}
          <Card no="1" label="Operatorul de Date" title={<>Cine <em>Răspunde</em> de Datele Tale</>}>
            <p>
              Operatorul de date cu caracter personal este:
            </p>
            <p>
              <strong>MURGU ADRIAN PERSOANĂ FIZICĂ AUTORIZATĂ</strong><br />
              Aleea Parcului nr. 7, et. 9, Ap. 1, Municipiul Onești, Județul Bacău, România<br />
              Email: office@vibeinvite.ro &nbsp;·&nbsp; Web: www.vibeinvite.ro
            </p>
            <p>
              Pentru orice întrebări legate de prelucrarea datelor tale personale, ne poți contacta
              la adresa de email de mai sus. Îți vom răspunde în cel mult 30 de zile calendaristice.
            </p>
          </Card>

          {/* ART. 2 */}
          <Card no="2" label="Date Colectate" title={<>Ce Date <em>Colectăm</em></>}>
            <p>Colectăm următoarele categorii de date, în funcție de modul în care utilizezi platforma:</p>

            <div className="vp-table-wrap">
              <table className="vp-table">
                <thead>
                  <tr>
                    <th>Categorie</th>
                    <th>Date colectate</th>
                    <th>De la cine</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Cont</strong></td>
                    <td>Email, parolă (criptată), temă selectată</td>
                    <td>Miri (la checkout)</td>
                  </tr>
                  <tr>
                    <td><strong>Eveniment</strong></td>
                    <td>Nume miri, date nuntă, locație, telefoane, povestea</td>
                    <td>Miri (în dashboard)</td>
                  </tr>
                  <tr>
                    <td><strong>RSVP</strong></td>
                    <td>Nume invitat, prezență, preferințe dietetice, cazare, transport</td>
                    <td>Invitați (formular public)</td>
                  </tr>
                  <tr>
                    <td><strong>Fotografii</strong></td>
                    <td>Imagini încărcate (stocate pe Cloudinary)</td>
                    <td>Invitați (galerie foto)</td>
                  </tr>
                  <tr>
                    <td><strong>Tehnice</strong></td>
                    <td>Adresă IP, User-Agent, cookie sesiune</td>
                    <td>Toți utilizatorii (automat)</td>
                  </tr>
                  <tr>
                    <td><strong>Plată</strong></td>
                    <td>Email, ID sesiune Stripe (datele cardului nu sunt stocate de noi)</td>
                    <td>Miri (la checkout)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* ART. 3 */}
          <Card no="3" label="Scopul Prelucrării" title={<>De Ce <em>Folosim</em> Datele Tale</>}>
            <p>Datele colectate sunt utilizate exclusiv pentru:</p>
            <ul className="vp-list">
              <Li><strong>Furnizarea serviciului</strong> — crearea și gestionarea contului, procesarea plăților, personalizarea invitației.</Li>
              <Li><strong>Comunicare</strong> — trimiterea emailului de configurare parolă, notificări despre eveniment (reminder 2 zile înainte de nuntă, alertă expirare galerie foto).</Li>
              <Li><strong>Funcționalitate RSVP</strong> — colectarea și afișarea confirmărilor de participare pentru Miri.</Li>
              <Li><strong>Galerie foto</strong> — stocarea temporară a fotografiilor încărcate de invitați, accesibile Mirilor.</Li>
              <Li><strong>Securitate și prevenirea fraudei</strong> — monitorizarea accesului neautorizat și protejarea conturilor.</Li>
              <Li><strong>Obligații legale</strong> — conformarea cu cerințele legale aplicabile.</Li>
            </ul>
            <p>
              <strong>Nu utilizăm datele tale în scopuri de marketing fără consimțământul tău explicit
              și nu vindem datele tale niciunui terț.</strong>
            </p>
          </Card>

          {/* ART. 4 */}
          <Card no="4" label="Temeiul Legal" title={<>Baza <em>Legală</em> a Prelucrării</>}>
            <p>Prelucrăm datele tale în baza următoarelor temeiuri legale (art. 6 GDPR):</p>
            <ul className="vp-list">
              <Li><strong>Executarea contractului</strong> (art. 6 alin. 1 lit. b) — pentru datele necesare furnizării serviciului plătit.</Li>
              <Li><strong>Consimțământ</strong> (art. 6 alin. 1 lit. a) — pentru comunicări opționale și cookie-uri non-esențiale.</Li>
              <Li><strong>Interes legitim</strong> (art. 6 alin. 1 lit. f) — pentru securitatea platformei și prevenirea fraudei.</Li>
              <Li><strong>Obligație legală</strong> (art. 6 alin. 1 lit. c) — pentru păstrarea datelor impusă de lege.</Li>
            </ul>
          </Card>

          {/* ART. 5 */}
          <Card no="5" label="Retenție Date" title={<>Cât Timp <em>Păstrăm</em> Datele</>}>
            <div className="vp-table-wrap">
              <table className="vp-table">
                <thead>
                  <tr>
                    <th>Tip date</th>
                    <th>Perioadă de retenție</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Date cont (email, parolă)</td>
                    <td>12 luni de la activare, șterse automat la expirare</td>
                  </tr>
                  <tr>
                    <td>Date eveniment (miri, locație)</td>
                    <td>12 luni de la activare, șterse automat la expirare</td>
                  </tr>
                  <tr>
                    <td>Date RSVP (invitați)</td>
                    <td>12 luni de la activare, șterse automat la expirare</td>
                  </tr>
                  <tr>
                    <td>Fotografii invitați</td>
                    <td>30 de zile de la activarea galeriei, șterse automat</td>
                  </tr>
                  <tr>
                    <td>Tokens autentificare</td>
                    <td>24 ore (sesiune) sau 1 oră (reset parolă)</td>
                  </tr>
                  <tr>
                    <td>Date plată (Stripe)</td>
                    <td>Conform politicii Stripe și obligațiilor fiscale (5 ani)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* ART. 6 */}
          <Card no="6" label="Servicii Terțe" title={<>Parteneri și <em>Procesatori</em></>}>
            <p>
              Utilizăm următorii sub-procesatori de date, cu care am încheiat sau urmăm să încheiem
              acorduri de prelucrare a datelor (DPA):
            </p>
            <ul className="vp-list">
              <Li><strong>Stripe</strong> (stripe.com) — procesare plăți. Date transmise: email, ID sesiune. Certificat PCI DSS.</Li>
              <Li><strong>Cloudinary</strong> (cloudinary.com) — stocare fotografii. Date transmise: fișiere imagine.</Li>
              <Li><strong>Resend</strong> (resend.com) — trimitere emailuri tranzacționale. Date transmise: adresă email, linkuri.</Li>
              <Li><strong>Neon</strong> (neon.tech) — bază de date PostgreSQL serverless. Date transmise: toate datele platformei.</Li>
              <Li><strong>Vercel</strong> (vercel.com) — hosting și infrastructură. Date transmise: trafic, log-uri tehnice.</Li>
            </ul>
            <p>
              Toți partenerii sunt selectați în conformitate cu cerințele GDPR și oferă garanții adecvate
              de protecție a datelor. Datele nu sunt transferate în afara Spațiului Economic European
              fără garanții adecvate (clauze contractuale standard sau echivalent).
            </p>
          </Card>

          {/* ART. 7 — COOKIE */}
          <Dark label="Cookie-uri" title={<>Ce <em>Cookie-uri</em> Folosim</>}>
            <p>
              <strong>Cookie-uri strict necesare (nu pot fi dezactivate):</strong>
            </p>
            <p>
              <strong>auth_token</strong> — cookie HTTP-only, Secure, SameSite=Lax. Stochează sesiunea de
              autentificare a Mirilor. Expiră după 24 de ore. Esențial pentru funcționarea platformei.
              Nu conține date personale în clar — doar un token JWT semnat criptografic.
            </p>
            <p>
              <strong>Cookie-uri de analiză și marketing:</strong> În prezent, platforma VibeInvite.ro
              nu utilizează cookie-uri de analiză, tracking sau marketing de la terți. Dacă această
              politică se va schimba, documentul va fi actualizat și vei fi notificat.
            </p>
            <p>
              Poți gestiona cookie-urile din setările browserului tău. Dezactivarea cookie-ului de
              autentificare va face imposibil accesul la dashboard.
            </p>
          </Dark>

          {/* ART. 8 */}
          <Card no="8" label="Drepturile Tale" title={<>Drepturile Tale <em>GDPR</em></>}>
            <p>În calitate de persoană vizată, ai următoarele drepturi, pe care le poți exercita
            contactând-ne la office@vibeinvite.ro:</p>
            <ul className="vp-list">
              <Li><strong>Dreptul de acces</strong> — poți solicita o copie a datelor pe care le deținem despre tine.</Li>
              <Li><strong>Dreptul la rectificare</strong> — poți solicita corectarea datelor inexacte sau incomplete.</Li>
              <Li><strong>Dreptul la ștergere</strong> — poți solicita ștergerea datelor tale, în condițiile prevăzute de GDPR.</Li>
              <Li><strong>Dreptul la restricționarea prelucrării</strong> — poți solicita limitarea prelucrării în anumite circumstanțe.</Li>
              <Li><strong>Dreptul la portabilitatea datelor</strong> — poți primi datele tale într-un format structurat, utilizat frecvent.</Li>
              <Li><strong>Dreptul la opoziție</strong> — poți obiecta față de prelucrarea bazată pe interes legitim.</Li>
              <Li><strong>Dreptul de a retrage consimțământul</strong> — oricând, fără a afecta legalitatea prelucrării anterioare.</Li>
            </ul>
            <p>
              Ai de asemenea dreptul de a depune o plângere la <strong>Autoritatea Națională de Supraveghere
              a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong>, accesibilă la anspdcp.eu.ro.
            </p>
          </Card>

          {/* ART. 9 */}
          <Card no="9" label="Securitate" title={<>Cum <em>Protejăm</em> Datele</>}>
            <p>
              Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor personale,
              inclusiv:
            </p>
            <ul className="vp-list">
              <Li>Parolele sunt stocate exclusiv în format criptat (hash bcrypt, 10 runde).</Li>
              <Li>Autentificarea se realizează prin token JWT semnat, stocat în cookie HTTP-only.</Li>
              <Li>Comunicațiile sunt protejate prin HTTPS (TLS) în mod obligatoriu.</Li>
              <Li>Accesul la date este restricționat — fiecare utilizator vede exclusiv propriile date.</Li>
              <Li>Datele de plată nu sunt stocate de VibeInvite — procesarea este delegată integral Stripe.</Li>
            </ul>
            <p>
              În cazul unui incident de securitate care afectează datele tale, te vom notifica în
              termenele prevăzute de GDPR (maxim 72 de ore pentru notificarea autorității, respectiv
              fără întârziere nejustificată pentru notificarea persoanelor afectate, dacă există
              risc ridicat).
            </p>
          </Card>

          {/* ART. 10 */}
          <Card no="10" label="Modificări" title={<>Actualizarea <em>Politicii</em></>}>
            <p>
              Această politică poate fi actualizată periodic pentru a reflecta modificările legislative,
              tehnice sau organizatorice. Versiunea curentă este întotdeauna disponibilă la
              www.vibeinvite.ro/politica, cu data intrării în vigoare afișată în antet.
            </p>
            <p>
              Continuarea utilizării platformei după publicarea modificărilor constituie acceptarea
              noii versiuni. Modificările semnificative vor fi comunicate și prin email, acolo unde
              este posibil.
            </p>
          </Card>

          {/* OPERATOR */}
          <div className="vp-operator">
            <strong>MURGU ADRIAN PERSOANĂ FIZICĂ AUTORIZATĂ</strong>
            Aleea Parcului nr. 7, et. 9, Ap. 1, Municipiul Onești, Județul Bacău, România
            <br />
            Email: office@vibeinvite.ro &nbsp;·&nbsp; Web: www.vibeinvite.ro
            <br /><br />
            Document intrat în vigoare la data de <strong>20.05.2026</strong>.
            Orice versiune anterioară este înlocuită integral de prezentul document.
          </div>

        </div>
      </div>
    </>
  )
}
