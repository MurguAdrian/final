import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'GDPR — Drepturile Tale | VibeInvite',
  description:
    'Drepturile tale conform GDPR pe VibeInvite: acces la date, ștergere cont, export date, rectificare. Detalii complete despre cum protejăm datele tale personale.',
  keywords: [
    'GDPR VibeInvite',
    'drepturi GDPR Romania',
    'stergere cont VibeInvite',
    'export date personale',
    'protectia datelor',
    'ANSPDCP',
    'date personale nunta',
  ],
  authors: [{ name: 'VibeInvite', url: 'https://www.vibeinvite.ro' }],
  metadataBase: new URL('https://www.vibeinvite.ro'),
  alternates: { canonical: 'https://www.vibeinvite.ro/gdpr' },
  openGraph: {
    type: 'website',
    url: 'https://www.vibeinvite.ro/gdpr',
    title: 'GDPR — Drepturile Tale | VibeInvite',
    description: 'Cum îți protejăm datele și cum îți exerciți drepturile GDPR pe VibeInvite.',
    siteName: 'VibeInvite',
    locale: 'ro_RO',
  },
  robots: { index: true, follow: true },
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.gd-page * { box-sizing: border-box; margin: 0; padding: 0; }

.gd-page {
  font-family: 'DM Sans', sans-serif;
  background: #FDFAF6;
  color: #1A1208;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

/* ── orbs ── */
@keyframes gd-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-16px) scale(1.04)} 66%{transform:translate(-10px,12px) scale(.97)} }
.gd-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(80px); }
.gd-o1 { width: 420px; height: 420px; background: radial-gradient(circle,rgba(255,107,0,.14) 0%,transparent 70%); top: -60px; right: -60px; animation: gd-orb 16s ease-in-out infinite; }
.gd-o2 { width: 280px; height: 280px; background: radial-gradient(circle,rgba(255,107,0,.08) 0%,transparent 70%); bottom: 120px; left: -40px; animation: gd-orb 20s ease-in-out infinite reverse; }

/* ── animations ── */
@keyframes gd-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes gd-dot { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
@keyframes gd-shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
@keyframes gd-tick { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes gd-rowIn { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }

/* ── inner ── */
.gd-inner {
  position: relative; z-index: 10;
  max-width: 1080px; margin: 0 auto;
  padding: 48px 20px 80px;
}

/* ── ticker ── */
.gd-ticker { overflow: hidden; background: #FF6B00; padding: 9px 0; }
.gd-ti-inner { display: flex; width: max-content; animation: gd-tick 28s linear infinite; }
.gd-ti { display: flex; align-items: center; gap: 10px; padding: 0 28px; color: #fff; font-size: 11.5px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
.gd-tdot { width: 4px; height: 4px; background: rgba(255,255,255,.5); border-radius: 50%; }

/* ── header ── */
.gd-header {
  text-align: center; margin-bottom: 48px;
  opacity: 0; animation: gd-up .7s ease .1s forwards;
}
.gd-super {
  display: inline-flex; align-items: center; gap: 7px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px;
  padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500;
  color: #FF6B00; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 18px;
}
.gd-sdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; animation: gd-dot 1.8s ease-in-out infinite; }
.gd-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 300; line-height: 1.1; color: #1A1208; margin-bottom: 16px;
}
.gd-h1 em { font-style: italic; color: #FF6B00; }
.gd-h1 strong { font-weight: 600; }
.gd-lead { font-size: 14.5px; line-height: 1.8; color: rgba(26,18,8,.62); max-width: 540px; margin: 0 auto; }
.gd-lead strong { color: #1A1208; font-weight: 600; }

/* ── score banner ── */
.gd-score {
  background: #fff; border-radius: 24px;
  border: 1px solid rgba(255,107,0,.12);
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
  padding: 28px 32px; margin-bottom: 24px;
  position: relative; overflow: hidden;
  opacity: 0; animation: gd-up .7s ease .2s forwards;
}
.gd-score::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, #FF6B00, #FF8C35, #FF6B00);
  background-size: 200% 100%; animation: gd-shimmer 3s linear infinite;
}
.gd-score-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
@media(min-width:640px) { .gd-score-grid { grid-template-columns: repeat(4,1fr); } }
.gd-score-box { text-align: center; padding: 14px 10px; background: #FDFAF6; border-radius: 14px; border: 1px solid rgba(255,107,0,.08); }
.gd-score-num { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 600; color: #FF6B00; line-height: 1; margin-bottom: 4px; }
.gd-score-lbl { font-size: 11px; color: rgba(26,18,8,.55); }
.gd-score-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 300; color: #1A1208; margin-bottom: 16px; }
.gd-score-title em { font-style: italic; color: #FF6B00; }
.gd-progress-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.gd-progress-label { font-size: 12px; color: rgba(26,18,8,.65); width: 140px; flex-shrink: 0; }
.gd-progress-bar { flex: 1; height: 6px; background: #f0ebe3; border-radius: 100px; overflow: hidden; }
.gd-progress-fill { height: 100%; border-radius: 100px; background: linear-gradient(90deg,#FF6B00,#FF8C35); }
.gd-progress-val { font-size: 12px; font-weight: 600; color: #1A1208; width: 36px; text-align: right; }

/* ── section card ── */
.gd-card {
  background: #fff; border-radius: 24px;
  border: 1px solid rgba(255,107,0,.1);
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
  overflow: hidden; margin-bottom: 20px;
}
.gd-card-head {
  display: flex; align-items: center; gap: 12px;
  padding: 22px 28px; border-bottom: 1px solid rgba(255,107,0,.08);
  background: linear-gradient(135deg, #FFF4ED 0%, #fff8f0 100%);
}
.gd-card-ico {
  width: 38px; height: 38px; border-radius: 10px;
  background: #fff; border: 1px solid rgba(255,107,0,.2);
  display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
}
.gd-card-htitle { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 300; color: #1A1208; }
.gd-card-htitle em { font-style: italic; color: #FF6B00; }
.gd-card-hbadge {
  margin-left: auto; font-size: 10px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
  padding: 4px 10px; border-radius: 100px;
}
.badge-ok { background: #dcfce7; color: #166534; }
.badge-warn { background: #fef9c3; color: #854d0e; }
.badge-err { background: #fee2e2; color: #991b1b; }

.gd-card-body { padding: 24px 28px; }

/* ── rights grid ── */
.gd-rights { display: grid; grid-template-columns: 1fr; gap: 12px; }
@media(min-width:640px) { .gd-rights { grid-template-columns: 1fr 1fr; } }
.gd-right-item {
  background: #FDFAF6; border-radius: 16px;
  border: 1px solid rgba(255,107,0,.08); padding: 18px 16px;
  transition: border-color .2s, transform .2s;
  opacity: 0;
}
.gd-right-item:nth-child(1){animation:gd-rowIn .45s ease .35s forwards}
.gd-right-item:nth-child(2){animation:gd-rowIn .45s ease .42s forwards}
.gd-right-item:nth-child(3){animation:gd-rowIn .45s ease .49s forwards}
.gd-right-item:nth-child(4){animation:gd-rowIn .45s ease .56s forwards}
.gd-right-item:nth-child(5){animation:gd-rowIn .45s ease .63s forwards}
.gd-right-item:nth-child(6){animation:gd-rowIn .45s ease .70s forwards}
.gd-right-item:nth-child(7){animation:gd-rowIn .45s ease .77s forwards}
.gd-right-item:hover { border-color: rgba(255,107,0,.3); transform: translateY(-2px); }
.gd-right-art { font-size: 10px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #FF6B00; margin-bottom: 6px; }
.gd-right-title { font-size: 13.5px; font-weight: 600; color: #1A1208; margin-bottom: 6px; }
.gd-right-desc { font-size: 12.5px; color: rgba(26,18,8,.6); line-height: 1.6; }
.gd-right-how {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 500; color: #FF6B00;
  background: #FFF4ED; border-radius: 8px; padding: 3px 9px; margin-top: 10px;
}

/* ── data table ── */
.gd-table-wrap { overflow-x: auto; }
.gd-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
.gd-table th {
  background: #FDFAF6; color: rgba(26,18,8,.5); font-weight: 600;
  font-size: 10px; letter-spacing: .06em; text-transform: uppercase;
  padding: 10px 14px; text-align: left; border-bottom: 1px solid rgba(255,107,0,.1);
}
.gd-table td { padding: 11px 14px; border-bottom: 1px solid rgba(26,18,8,.05); color: rgba(26,18,8,.75); vertical-align: top; }
.gd-table tr:last-child td { border-bottom: none; }
.gd-table tr:hover td { background: #FFF9F5; }
.gd-tag { display: inline-block; font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 100px; }
.tag-low  { background: #dcfce7; color: #166534; }
.tag-med  { background: #fef9c3; color: #854d0e; }
.tag-high { background: #fee2e2; color: #991b1b; }
.tag-ok   { background: #dcfce7; color: #166534; }
.tag-yes  { background: #dbeafe; color: #1e40af; }
.tag-no   { background: #f3f4f6; color: #6b7280; }

/* ── processors ── */
.gd-proc-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
@media(min-width:640px) { .gd-proc-grid { grid-template-columns: 1fr 1fr; } }
.gd-proc {
  display: flex; align-items: flex-start; gap: 12px;
  background: #FDFAF6; border-radius: 14px;
  border: 1px solid rgba(255,107,0,.08); padding: 14px 16px;
  transition: border-color .18s;
}
.gd-proc:hover { border-color: rgba(255,107,0,.28); }
.gd-proc-ico { font-size: 22px; flex-shrink: 0; margin-top: 2px; }
.gd-proc-name { font-size: 13px; font-weight: 600; color: #1A1208; margin-bottom: 3px; }
.gd-proc-role { font-size: 12px; color: rgba(26,18,8,.55); line-height: 1.55; }
.gd-proc-dpa { font-size: 11px; font-weight: 500; color: #FF6B00; margin-top: 4px; }

/* ── risks ── */
.gd-risks { display: flex; flex-direction: column; gap: 8px; }
.gd-risk {
  display: flex; align-items: center; gap: 12px;
  background: #FDFAF6; border-radius: 12px;
  border: 1px solid rgba(255,107,0,.07); padding: 12px 16px;
}
.gd-risk-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.dot-ok   { background: #22c55e; }
.dot-warn { background: #f59e0b; }
.dot-err  { background: #ef4444; }
.gd-risk-name { font-size: 13px; font-weight: 500; color: #1A1208; flex: 1; }
.gd-risk-status { font-size: 11px; font-weight: 600; }
.s-ok   { color: #166534; }
.s-warn { color: #854d0e; }
.s-err  { color: #991b1b; }

/* ── contact card ── */
.gd-contact {
  background: linear-gradient(135deg, #1A1208 0%, #2d1f0e 100%);
  border-radius: 24px; padding: 36px 32px; margin-bottom: 20px;
  position: relative; overflow: hidden;
  opacity: 0; animation: gd-up .7s ease .5s forwards;
}
.gd-contact::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, #FF6B00, #FF8C35, #FF6B00);
  background-size: 200% 100%; animation: gd-shimmer 3s linear infinite;
}
.gd-contact-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media(min-width:640px) { .gd-contact-grid { grid-template-columns: 1fr 1fr; } }
.gd-contact-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 300; color: #fff; margin-bottom: 8px; }
.gd-contact-title em { font-style: italic; color: #FF8C35; }
.gd-contact-sub { font-size: 13px; color: rgba(255,255,255,.55); line-height: 1.7; }
.gd-contact-box {
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  border-radius: 16px; padding: 18px 20px;
}
.gd-contact-box-title { font-size: 11px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; color: rgba(255,255,255,.4); margin-bottom: 10px; }
.gd-cinfo { display: flex; align-items: center; gap: 9px; margin-bottom: 8px; }
.gd-cinfo:last-child { margin-bottom: 0; }
.gd-cico { font-size: 15px; }
.gd-ctxt { font-size: 13px; color: rgba(255,255,255,.75); }
.gd-ctxt a { color: #FFB374; text-decoration: none; }
.gd-ctxt a:hover { color: #FF8C35; }
.gd-anspdcp {
  background: rgba(255,107,0,.12); border: 1px solid rgba(255,107,0,.25);
  border-radius: 14px; padding: 16px; margin-top: 16px;
}
.gd-anspdcp-title { font-size: 12px; font-weight: 600; color: #FFB374; margin-bottom: 6px; }
.gd-anspdcp-sub { font-size: 12px; color: rgba(255,255,255,.5); line-height: 1.6; }

/* ── info list ── */
.gd-list { display: flex; flex-direction: column; gap: 6px; }
.gd-list-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; color: rgba(26,18,8,.7); line-height: 1.6; }
.gd-list-item::before { content: '›'; color: #FF6B00; font-size: 16px; flex-shrink: 0; line-height: 1.5; }
.gd-list-item strong { color: #1A1208; font-weight: 600; }

/* ── 2col ── */
.gd-2col { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media(min-width:768px) { .gd-2col { grid-template-columns: 1fr 1fr; } }

/* ── section label ── */
.gd-section-label {
  font-size: 10px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
  color: #FF6B00; margin-bottom: 14px; display: flex; align-items: center; gap: 7px;
}
.gd-section-ico {
  width: 26px; height: 26px; border-radius: 7px; background: #FFF4ED;
  display: flex; align-items: center; justify-content: center; font-size: 12px;
}
.gd-text { font-size: 13.5px; line-height: 1.8; color: rgba(26,18,8,.65); }
.gd-text + .gd-text { margin-top: 10px; }
.gd-text strong { color: #1A1208; font-weight: 600; }

/* ── animate cards ── */
.gd-card { opacity: 0; animation: gd-up .7s ease forwards; }
.gd-card:nth-child(1) { animation-delay: .25s; }
.gd-card:nth-child(2) { animation-delay: .32s; }
.gd-card:nth-child(3) { animation-delay: .39s; }
.gd-card:nth-child(4) { animation-delay: .46s; }
.gd-card:nth-child(5) { animation-delay: .53s; }
.gd-card:nth-child(6) { animation-delay: .60s; }
.gd-card:nth-child(7) { animation-delay: .67s; }

/* ── responsive ── */
@media(max-width:639px) {
  .gd-inner { padding: 28px 14px 56px; }
  .gd-card-head, .gd-card-body { padding: 18px 18px; }
  .gd-contact { padding: 26px 20px; }
  .gd-score { padding: 20px 18px; }
}
`

const DREPTURI = [
  {
    art: 'Art. 15 GDPR',
    icon: '👁️',
    title: 'Dreptul de Acces',
    desc: 'Poți solicita oricând o copie a tuturor datelor personale pe care le deținem despre tine.',
    how: 'Email la office@vibeinvite.ro',
    status: 'ok',
  },
  {
    art: 'Art. 16 GDPR',
    icon: '✏️',
    title: 'Dreptul la Rectificare',
    desc: 'Poți corecta orice date inexacte direct din dashboard sau prin solicitare scrisă.',
    how: 'Dashboard → Setări',
    status: 'ok',
  },
  {
    art: 'Art. 17 GDPR',
    icon: '🗑️',
    title: 'Dreptul la Ștergere',
    desc: 'Poți solicita ștergerea permanentă a contului și a tuturor datelor asociate (invitații, responses, poze).',
    how: 'Dashboard → Setări → Șterge Cont',
    status: 'ok',
  },
  {
    art: 'Art. 18 GDPR',
    icon: '⏸️',
    title: 'Dreptul la Restricționare',
    desc: 'Poți cere suspendarea procesării datelor tale pe durata unei dispute, fără ștergere.',
    how: 'Email la office@vibeinvite.ro',
    status: 'ok',
  },
  {
    art: 'Art. 20 GDPR',
    icon: '📦',
    title: 'Dreptul la Portabilitate',
    desc: 'Poți descărca toate datele tale în format JSON (machine-readable) oricând.',
    how: 'Dashboard → Setări → Export Date',
    status: 'ok',
  },
  {
    art: 'Art. 21 GDPR',
    icon: '🚫',
    title: 'Dreptul la Obiecție',
    desc: 'Poți refuza analytics sau comunicări de marketing fără ca serviciul de bază să fie afectat.',
    how: 'Banner Cookie sau email',
    status: 'ok',
  },
  {
    art: 'Art. 22 GDPR',
    icon: '🤖',
    title: 'Decizii Automate',
    desc: 'VibeInvite NU ia decizii automate ce te afectează (nu ban automat, nu refuz plată automat).',
    how: 'Nu este aplicabil',
    status: 'ok',
  },
]

const DATE_COLECTATE = [
  { categorie: 'Email + Parolă', cine: 'Miri', scop: 'Autentificare', baza: 'Contract', timp: '12 luni', risc: 'low' },
  { categorie: 'Nume + Telefon', cine: 'Miri', scop: 'Identificare cont', baza: 'Contract', timp: '12 luni', risc: 'low' },
  { categorie: 'Data + Locație nuntă', cine: 'Miri', scop: 'Invitație digitală', baza: 'Contract', timp: '12 luni', risc: 'low' },
  { categorie: 'Răspunsuri RSVP', cine: 'Invitați', scop: 'Gestionare invitați', baza: 'Interes legitim', timp: '12 luni', risc: 'med' },
  { categorie: 'Preferințe dietetice', cine: 'Invitați', scop: 'Meniu eveniment', baza: 'Interes legitim', timp: '12 luni', risc: 'med' },
  { categorie: 'Poze eveniment', cine: 'Invitați', scop: 'Album foto privat', baza: 'Consimțământ', timp: '12 luni', risc: 'med' },
  { categorie: 'IP Anonimizat', cine: 'Toți', scop: 'Analytics GA4', baza: 'Consimțământ', timp: '30 zile', risc: 'low' },
  { categorie: 'Session Token (JWT)', cine: 'Miri', scop: 'Securitate login', baza: 'Necesar tehnic', timp: '24 ore', risc: 'low' },
  { categorie: 'Date plată Stripe', cine: 'Miri', scop: 'Procesare plată', baza: 'Contract', timp: 'Stripe DPA', risc: 'low' },
]

const PROCESATORI = [
  {
    icon: '💳',
    name: 'Stripe',
    role: 'Procesare plăți online. Datele cardului NU sunt stocate de VibeInvite — PCI DSS compliant.',
    dpa: 'stripe.com/dpa — DPA disponibil public',
  },
  {
    icon: '☁️',
    name: 'Cloudinary',
    role: 'Stocare și procesare imagini. EXIF stripping activat. Poze șterse la expirarea contului.',
    dpa: 'cloudinary.com/privacy — GDPR compliant',
  },
  {
    icon: '📧',
    name: 'Resend',
    role: 'Trimitere emailuri tranzacționale (setup parolă, confirmare plată, notificări).',
    dpa: 'resend.com/privacy — GDPR compliant',
  },
  {
    icon: '🗄️',
    name: 'Neon (PostgreSQL)',
    role: 'Bază de date principală. Date stocate criptat, backup zilnic, ștergere automată la 12 luni.',
    dpa: 'neon.tech/privacy — GDPR compliant',
  },
  {
    icon: '📊',
    name: 'Google Analytics 4',
    role: 'Analytics trafic cu IP anonimizat. Se încarcă DOAR cu consimțământul tău explicit.',
    dpa: 'Consent obligatoriu — poți refuza oricând',
  },
  {
    icon: '🚀',
    name: 'Vercel',
    role: 'Hosting și CDN. Infrastractură serverless. Log-uri de server se șterg automat după 30 zile.',
    dpa: 'vercel.com/legal/privacy-policy — GDPR compliant',
  },
]

const RISCURI = [
  { name: 'Cookie Consent Banner', status: 'Implementat ✓', dot: 'ok', s: 'ok' },
  { name: 'Pagini legale (Termeni, Politică, Cookies)', status: 'Complete ✓', dot: 'ok', s: 'ok' },
  { name: 'RSVP — Checkbox GDPR pe toate temele', status: 'Implementat ✓', dot: 'ok', s: 'ok' },
  { name: 'Checkout — Checkbox Termeni + Privacy', status: 'Implementat ✓', dot: 'ok', s: 'ok' },
  { name: 'Photo Upload — Consent checkbox', status: 'Implementat ✓', dot: 'ok', s: 'ok' },
  { name: 'EXIF Strip (GPS din poze)', status: 'Cloudinary fl_strip_profile ✓', dot: 'ok', s: 'ok' },
  { name: 'Export Date (GDPR Art. 20)', status: 'API implementat ✓', dot: 'ok', s: 'ok' },
  { name: 'Ștergere Cont (GDPR Art. 17)', status: 'API implementat ✓', dot: 'ok', s: 'ok' },
  { name: 'Google Analytics 4', status: 'G-PRLZS5WHS8 activ ✓', dot: 'ok', s: 'ok' },
  { name: 'Settings UI (Export/Delete)', status: 'În lucru ⚠️', dot: 'warn', s: 'warn' },
  { name: 'Stripe Webhook → GA4 Events', status: 'În lucru ⚠️', dot: 'warn', s: 'warn' },
  { name: 'CSP Headers (next.config.js)', status: 'Lipsă ✕', dot: 'err', s: 'err' },
  { name: 'Homepage Metadata (comentat)', status: 'Trebuie decoment ✕', dot: 'err', s: 'err' },
  { name: 'Dynamic OG Image per Invitație', status: 'Planificat ⚠️', dot: 'warn', s: 'warn' },
]

const TICKER = ['🛡️ GDPR Compliant', '✅ Date Protejate', '🔒 HTTPS Criptat', '🗑️ Auto-Ștergere 12 Luni', '📦 Export Date JSON', '👁️ IP Anonimizat', '🍪 Cookie Consent Activ', '📊 GA4 cu Consimțământ']

export default function GdprPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'GDPR — Drepturile Tale | VibeInvite',
            url: 'https://www.vibeinvite.ro/gdpr',
            description: 'Drepturile tale GDPR pe VibeInvite.ro — acces, ștergere, export, rectificare.',
            publisher: { '@type': 'Organization', name: 'VibeInvite', url: 'https://www.vibeinvite.ro' },
          }),
        }}
      />

      <div className="gd-page">
        <div className="gd-orb gd-o1" aria-hidden="true" />
        <div className="gd-orb gd-o2" aria-hidden="true" />

        {/* Ticker top */}
        <div className="gd-ticker" aria-hidden="true">
          <div className="gd-ti-inner">
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="gd-ti">{t}<span className="gd-tdot" /></div>
            ))}
          </div>
        </div>

        <div className="gd-inner">

          {/* ── HEADER ── */}
          <header className="gd-header">
            <p className="gd-super"><span className="gd-sdot" aria-hidden="true" /> GDPR &amp; Confidențialitate</p>
            <h1 className="gd-h1">
              Datele tale, <em>drepturile</em> tale,<br />
              <strong>transparența</strong> noastră
            </h1>
            <p className="gd-lead">
              VibeInvite respectă <strong>Regulamentul European GDPR</strong> și legile din România privind protecția datelor.
              Această pagină îți explică ce colectăm, de ce, cât timp și cum îți poți exercita drepturile.
            </p>
          </header>

          {/* ── SCOR GDPR ── */}
          <div className="gd-score" aria-label="Scor GDPR curent">
            <p className="gd-section-label"><span className="gd-section-ico">📋</span> Status Conformitate — 30 Mai 2026</p>
            <p className="gd-score-title">VibeInvite: scor <em>GDPR 85/100</em></p>
            <div style={{ marginBottom: 20 }}>
              {[
                { label: 'Consimțământ', val: 90 },
                { label: 'Drepturi GDPR', val: 85 },
                { label: 'Securitate date', val: 80 },
                { label: 'Transparență', val: 85 },
              ].map((p) => (
                <div key={p.label} className="gd-progress-row">
                  <span className="gd-progress-label">{p.label}</span>
                  <div className="gd-progress-bar">
                    <div className="gd-progress-fill" style={{ width: `${p.val}%` }} />
                  </div>
                  <span className="gd-progress-val">{p.val}%</span>
                </div>
              ))}
            </div>
            <div className="gd-score-grid" aria-label="Statistici GDPR">
              {[
                { num: '12 luni', label: 'Retenție date' },
                { num: '30 zile', label: 'Răspuns cereri' },
                { num: '100%', label: 'Criptare HTTPS' },
                { num: '0', label: 'Vânzare date' },
              ].map((s) => (
                <div key={s.label} className="gd-score-box">
                  <p className="gd-score-num">{s.num}</p>
                  <p className="gd-score-lbl">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── DREPTURILE TALE ── */}
          <section className="gd-card" aria-labelledby="gd-drepturi-h">
            <div className="gd-card-head">
              <div className="gd-card-ico">⚖️</div>
              <h2 id="gd-drepturi-h" className="gd-card-htitle">Drepturile tale <em>GDPR</em> — Art. 15–22</h2>
              <span className="gd-card-hbadge badge-ok">Toate implementate</span>
            </div>
            <div className="gd-card-body">
              <p className="gd-text" style={{ marginBottom: 20 }}>
                Conform GDPR, ai drepturi complete asupra datelor tale. Le poți exercita oricând, gratuit,
                cu răspuns în maximum <strong>30 de zile</strong>.
              </p>
              <div className="gd-rights" role="list" aria-label="Drepturi GDPR">
                {DREPTURI.map((d) => (
                  <div key={d.art} className="gd-right-item" role="listitem">
                    <p className="gd-right-art">{d.art}</p>
                    <p className="gd-right-title">{d.icon} {d.title}</p>
                    <p className="gd-right-desc">{d.desc}</p>
                    <span className="gd-right-how">→ {d.how}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── DATE COLECTATE ── */}
          <section className="gd-card" aria-labelledby="gd-date-h">
            <div className="gd-card-head">
              <div className="gd-card-ico">🗃️</div>
              <h2 id="gd-date-h" className="gd-card-htitle">Ce date <em>colectăm</em> și de ce</h2>
              <span className="gd-card-hbadge badge-ok">Transparent</span>
            </div>
            <div className="gd-card-body">
              <p className="gd-text" style={{ marginBottom: 20 }}>
                Colectăm <strong>minimum necesar</strong> pentru funcționarea serviciului. NU vindem date.
                NU le partajăm cu terți fără consimțământ explicit.
              </p>
              <div className="gd-table-wrap">
                <table className="gd-table" aria-label="Date colectate VibeInvite">
                  <thead>
                    <tr>
                      <th>Tip dată</th>
                      <th>Cine</th>
                      <th>Scop</th>
                      <th>Bază juridică</th>
                      <th>Timp retenție</th>
                      <th>Risc</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DATE_COLECTATE.map((d) => (
                      <tr key={d.categorie}>
                        <td><strong>{d.categorie}</strong></td>
                        <td>{d.cine}</td>
                        <td>{d.scop}</td>
                        <td>{d.baza}</td>
                        <td>{d.timp}</td>
                        <td>
                          <span className={`gd-tag ${d.risc === 'low' ? 'tag-low' : d.risc === 'med' ? 'tag-med' : 'tag-high'}`}>
                            {d.risc === 'low' ? 'Scăzut' : d.risc === 'med' ? 'Mediu' : 'Ridicat'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── 2 COL: Controller + Cookies ── */}
          <div className="gd-2col">

            {/* Controller vs Processor */}
            <section className="gd-card" aria-labelledby="gd-ctrl-h">
              <div className="gd-card-head">
                <div className="gd-card-ico">🏛️</div>
                <h2 id="gd-ctrl-h" className="gd-card-htitle">Cine <em>răspunde</em>?</h2>
              </div>
              <div className="gd-card-body">
                <div className="gd-list">
                  <div className="gd-list-item">
                    <span><strong>VibeInvite.ro = Data Processor</strong> — procesăm date în numele mirilor, conform instrucțiunilor lor și al GDPR Art. 28.</span>
                  </div>
                  <div className="gd-list-item">
                    <span><strong>Mirii (creatorii) = Data Controller</strong> — responsabili de obținerea consimțământului de la invitații lor și de respectarea GDPR față de aceștia.</span>
                  </div>
                  <div className="gd-list-item">
                    <span><strong>Invitații = Data Subjects</strong> — persoanele ale căror date sunt prelucrate. Au dreptul să solicite acces sau ștergere prin mirii lor sau direct la office@vibeinvite.ro.</span>
                  </div>
                  <div className="gd-list-item">
                    <span>VibeInvite NU are DPO formal (companie mică), dar <strong>office@vibeinvite.ro</strong> răspunde la orice cerere GDPR în maximum 30 de zile.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section className="gd-card" aria-labelledby="gd-cook-h">
              <div className="gd-card-head">
                <div className="gd-card-ico">🍪</div>
                <h2 id="gd-cook-h" className="gd-card-htitle">Cookie-uri <em>folosite</em></h2>
              </div>
              <div className="gd-card-body">
                <div className="gd-list">
                  <div className="gd-list-item">
                    <span><strong>auth_token (24h)</strong> — JWT session pentru autentificare. Necesar tehnic, nu necesită consimțământ.</span>
                  </div>
                  <div className="gd-list-item">
                    <span><strong>session_id (24h)</strong> — tracking sesiune pentru securitate. Necesar tehnic.</span>
                  </div>
                  <div className="gd-list-item">
                    <span><strong>Google Analytics (_ga, _gid)</strong> — analytics trafic cu IP anonimizat. <em>Opțional — necesită consimțământ explicit.</em></span>
                  </div>
                  <div className="gd-list-item">
                    <span><strong>cookie_consent</strong> — localStorage, salvează preferința ta. NU se trimite la server.</span>
                  </div>
                  <div className="gd-list-item">
                    <span>NU folosim cookie-uri de publicitate, Facebook Pixel sau social tracking. <strong>Zero ads.</strong></span>
                  </div>
                </div>
                <div style={{ marginTop: 14 }}>
                  <Link href="/cookies" style={{ fontSize: 13, color: '#FF6B00', textDecoration: 'none', fontWeight: 500 }}>
                    → Politica completă Cookie
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* ── PROCESATORI TERȚI ── */}
          <section className="gd-card" aria-labelledby="gd-proc-h">
            <div className="gd-card-head">
              <div className="gd-card-ico">🔗</div>
              <h2 id="gd-proc-h" className="gd-card-htitle">Procesatori <em>terți</em> — GDPR Art. 28</h2>
              <span className="gd-card-hbadge badge-ok">Toți DPA-complianți</span>
            </div>
            <div className="gd-card-body">
              <p className="gd-text" style={{ marginBottom: 20 }}>
                Lucrăm cu procesatori terți care respectă GDPR și au DPA disponibil. Niciun procesator
                nu are dreptul să folosească datele tale în alt scop decât cel declarat.
              </p>
              <div className="gd-proc-grid" role="list" aria-label="Procesatori terți">
                {PROCESATORI.map((p) => (
                  <div key={p.name} className="gd-proc" role="listitem">
                    <span className="gd-proc-ico" aria-hidden="true">{p.icon}</span>
                    <div>
                      <p className="gd-proc-name">{p.name}</p>
                      <p className="gd-proc-role">{p.role}</p>
                      <p className="gd-proc-dpa">→ {p.dpa}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── STATUS IMPLEMENTARE ── */}
          <section className="gd-card" aria-labelledby="gd-status-h">
            <div className="gd-card-head">
              <div className="gd-card-ico">✅</div>
              <h2 id="gd-status-h" className="gd-card-htitle">Status <em>implementare</em> — Audit 30 Mai 2026</h2>
              <span className="gd-card-hbadge badge-warn">72/100 scor general</span>
            </div>
            <div className="gd-card-body">
              <p className="gd-text" style={{ marginBottom: 18 }}>
                Audit tehnic complet efectuat pe 30 Mai 2026. Progres de la <strong>57/100</strong> la <strong>72/100</strong> față de auditorul anterior.
              </p>
              <div className="gd-risks" role="list" aria-label="Status implementare GDPR">
                {RISCURI.map((r) => (
                  <div key={r.name} className="gd-risk" role="listitem">
                    <span className={`gd-risk-dot dot-${r.dot}`} aria-hidden="true" />
                    <span className="gd-risk-name">{r.name}</span>
                    <span className={`gd-risk-status s-${r.s}`}>{r.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── MINORI + DATE SENSIBILE ── */}
          <div className="gd-2col">
            <section className="gd-card" aria-labelledby="gd-minori-h">
              <div className="gd-card-head">
                <div className="gd-card-ico">👶</div>
                <h2 id="gd-minori-h" className="gd-card-htitle">Minori — <em>GDPR Art. 8</em></h2>
                <span className="gd-card-hbadge badge-warn">Atenție</span>
              </div>
              <div className="gd-card-body">
                <div className="gd-list">
                  <div className="gd-list-item">
                    <span>Serviciul este destinat <strong>persoanelor majore (18+)</strong>. Minorii nu pot crea conturi fără acordul părintelui/tutorelui.</span>
                  </div>
                  <div className="gd-list-item">
                    <span>Colectăm <strong>doar numărul de copii</strong> din RSVP — NU numele sau alte date nominale ale minorilor.</span>
                  </div>
                  <div className="gd-list-item">
                    <span><strong>Mirii sunt responsabili</strong> de obținerea consimțământului părinților pentru orice date sau fotografii cu minori.</span>
                  </div>
                  <div className="gd-list-item">
                    <span>NU scrieți date medicale, nume sau informații sensibile ale copiilor în câmpul „Observații".</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="gd-card" aria-labelledby="gd-poze-h">
              <div className="gd-card-ico" style={{ display: 'none' }} />
              <div className="gd-card-head">
                <div className="gd-card-ico">📷</div>
                <h2 id="gd-poze-h" className="gd-card-htitle">Fotografii &amp; <em>EXIF</em></h2>
                <span className="gd-card-hbadge badge-ok">Protejat</span>
              </div>
              <div className="gd-card-body">
                <div className="gd-list">
                  <div className="gd-list-item">
                    <span><strong>EXIF stripping activ</strong> — eliminăm automat GPS-ul, data și modelul camerei din toate pozele încărcate (Cloudinary fl_strip_profile).</span>
                  </div>
                  <div className="gd-list-item">
                    <span>Pozele sunt <strong>private</strong> — vizibile DOAR mirelui/miresei din dashboard. Nu sunt publice, nu sunt indexate.</span>
                  </div>
                  <div className="gd-list-item">
                    <span>Invitații confirmă printr-un <strong>checkbox explicit</strong> că dețin acordul persoanelor din fotografii.</span>
                  </div>
                  <div className="gd-list-item">
                    <span>Toate pozele se <strong>șterg automat</strong> la 12 luni de la expirarea contului, din Cloudinary și baza de date.</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ── SECURITATE ── */}
          <section className="gd-card" aria-labelledby="gd-sec-h">
            <div className="gd-card-head">
              <div className="gd-card-ico">🔐</div>
              <h2 id="gd-sec-h" className="gd-card-htitle">Măsuri de <em>securitate</em></h2>
              <span className="gd-card-hbadge badge-ok">HTTPS + Criptare</span>
            </div>
            <div className="gd-card-body">
              <div className="gd-rights" role="list">
                {[
                  { title: 'HTTPS TLS 1.3', desc: 'Toate conexiunile sunt criptate. Certificat SSL valid permanent.' },
                  { title: 'Parole Hashed (bcrypt)', desc: 'Parolele sunt stocate hash-uite cu bcrypt, 10 salt rounds. Niciodată în plain text.' },
                  { title: 'JWT HttpOnly Cookies', desc: 'Token-urile de sesiune sunt httpOnly și sameSite — protejate împotriva XSS și CSRF.' },
                  { title: 'Auto-cleanup Cron', desc: 'Job automat șterge toate datele la 12 luni — invitații, responses, poze, cont.' },
                  { title: 'Validare Server-Side', desc: 'Toată validarea datelor se face în backend, nu doar în UI. Fișierele sunt validate MIME + extensie.' },
                  { title: 'PCI DSS (Stripe)', desc: 'Datele cardurilor sunt gestionate exclusiv de Stripe. VibeInvite nu stochează niciodată date de card.' },
                ].map((s) => (
                  <div key={s.title} className="gd-right-item" role="listitem" style={{ opacity: 1, animation: 'none' }}>
                    <p className="gd-right-title">🔒 {s.title}</p>
                    <p className="gd-right-desc">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CONTACT + ANSPDCP ── */}
          <div className="gd-contact" role="complementary" aria-label="Contact GDPR">
            <p className="gd-section-label" style={{ color: 'rgba(255,255,255,.45)' }}>
              <span style={{ background: 'rgba(255,107,0,.2)', borderRadius: 7, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>📬</span>
              Exercitați-vă drepturile GDPR
            </p>
            <div className="gd-contact-grid">
              <div>
                <h2 className="gd-contact-title">Contact pentru <em>cereri GDPR</em></h2>
                <p className="gd-contact-sub">
                  Trimite cererea ta prin email — răspundem în maximum <strong style={{ color: '#FFB374' }}>30 de zile</strong>.
                  Include în subiect: <em style={{ color: 'rgba(255,255,255,.6)' }}>„GDPR Data Subject Request"</em> și tipul cererii (acces / ștergere / export / rectificare).
                </p>
                <div className="gd-anspdcp">
                  <p className="gd-anspdcp-title">🏛️ Autoritatea de Supraveghere — ANSPDCP</p>
                  <p className="gd-anspdcp-sub">
                    Dacă consideri că drepturile tale nu au fost respectate, poți depune plângere la
                    Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal:
                    <br /><strong style={{ color: 'rgba(255,255,255,.65)' }}>anspdcp@anspdcp.ro</strong> | anspdcp.ro
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="gd-contact-box">
                  <p className="gd-contact-box-title">Contact VibeInvite</p>
                  <div className="gd-cinfo"><span className="gd-cico">📧</span><span className="gd-ctxt"><a href="mailto:office@vibeinvite.ro">office@vibeinvite.ro</a></span></div>
                  <div className="gd-cinfo"><span className="gd-cico">🌐</span><span className="gd-ctxt"><a href="https://www.vibeinvite.ro">www.vibeinvite.ro</a></span></div>
                  <div className="gd-cinfo"><span className="gd-cico">📍</span><span className="gd-ctxt">România (UE)</span></div>
                  <div className="gd-cinfo"><span className="gd-cico">⏱️</span><span className="gd-ctxt">Răspuns: max 30 zile</span></div>
                </div>
                <div className="gd-contact-box">
                  <p className="gd-contact-box-title">Pagini Legale</p>
                  <div className="gd-cinfo"><span className="gd-cico">📄</span><span className="gd-ctxt"><a href="/politica">Politica de Confidențialitate</a></span></div>
                  <div className="gd-cinfo"><span className="gd-cico">📋</span><span className="gd-ctxt"><a href="/termeni">Termeni și Condiții</a></span></div>
                  <div className="gd-cinfo"><span className="gd-cico">🍪</span><span className="gd-ctxt"><a href="/cookies">Politica Cookie</a></span></div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer note ── */}
          <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(26,18,8,.35)', marginTop: 8 }}>
            Ultima actualizare: 30 Mai 2026 · Audit GDPR complet efectuat · VibeInvite.ro
          </p>

        </div>

        {/* Ticker bottom */}
        <div className="gd-ticker" aria-hidden="true">
          <div className="gd-ti-inner" style={{ animationDirection: 'reverse' }}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="gd-ti">{t}<span className="gd-tdot" /></div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
