'use client'

import Link from 'next/link'

function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="translate(20, 10)">
        <g transform="translate(20, -10)">
          <path d="M150 130 L225 320 H255 L330 130 H290 L240 270 L190 130 Z" fill="#FF6B00" />
          <g transform="translate(295, 140)">
            <rect width="80" height="50" rx="4" fill="none" stroke="#FF6B00" strokeWidth="8" />
            <path d="M5 5 L40 28 L75 5" fill="none" stroke="#FF6B00" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      </g>
    </svg>
  )
}

interface NavItem {
  label: string
  href: string
  badge?: string
  external?: boolean
}

interface SocialItem {
  icon: string
  label: string
  href: string
}

const PRODUSE: NavItem[] = [
  { label: 'Invitatii Online', href: '/invitatii-online' },
  { label: 'Invitatii Digitale', href: '/invitatii-digitale' },
  { label: 'Meniu cu Cod QR', href: '/meniu-qr', badge: 'Nou' },
  { label: 'Upload Poze Invitati', href: '/upload-poze', badge: 'Nou' },
  { label: 'Export Excel', href: '/export-excel' },
  { label: 'RSVP Online', href: '/rsvp' },
  { label: 'Preturi', href: '/preturi' },
]

const RESURSE: NavItem[] = [
  { label: 'Modele Invitatii', href: '/modele' },
  { label: 'Blog Nunta', href: '/blog' },
  { label: 'Ghid Planificare', href: '/ghid' },
  { label: 'Intrebari Frecvente', href: '/faq' },
  { label: 'Demo Gratuit', href: '/demo' },
  { label: 'Program Afiliere', href: '/afiliati' },
]

const COMPANIE: NavItem[] = [
  { label: 'Despre Noi', href: '/despre' },
  { label: 'Contact', href: '/contact' },
  { label: 'Termeni si Conditii', href: '/termeni' },
  { label: 'Politica GDPR', href: '/confidentialitate' },
  { label: 'Politica Cookies', href: '/cookies' },
  { label: 'ANPC', href: 'https://anpc.ro', external: true },
]

const SOCIAL: SocialItem[] = [
  { icon: '📸', label: 'Instagram', href: 'https://instagram.com/vibeinvite' },
  { icon: '📘', label: 'Facebook', href: 'https://facebook.com/vibeinvite' },
  { icon: '🎵', label: 'TikTok', href: 'https://tiktok.com/@vibeinvite' },
  { icon: '📌', label: 'Pinterest', href: 'https://pinterest.com/vibeinvite' },
]

const TICKER: string[] = [
  '💍 Invitatii Nunta Online',
  '🎀 Invitatii Botez',
  '⚡ Link Invitatie Free',
  '✅ RSVP Instant',
  '📋 Lista Invitati Live',
  '📷 Upload Poze Invitati',
  '🍽️ Meniu cu Cod QR',
  '📊 Export Excel',
  '🗺️ GPS Integrat',
  '📱 Mobile Ready',
]

const CSS = [
  '@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap");',
  '.vf-footer *{box-sizing:border-box;margin:0;padding:0}',
  '@keyframes vf-shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}',
  '@keyframes vf-dot{0%,100%{opacity:.4;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}',
  '@keyframes vf-tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}',
  '@keyframes vf-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}',
  '.vf-footer{font-family:"DM Sans",sans-serif;background:#FDFAF6;color:#1A1208;position:relative;overflow:hidden;border-top:1px solid rgba(255,107,0,.12)}',
  '.vf-orb1{position:absolute;width:480px;height:480px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,0,.10) 0%,transparent 70%);bottom:-180px;left:-100px;pointer-events:none;z-index:0;filter:blur(72px)}',
  '.vf-orb2{position:absolute;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,0,.07) 0%,transparent 70%);top:-60px;right:-80px;pointer-events:none;z-index:0;filter:blur(60px)}',
  '.vf-ring1{position:absolute;width:340px;height:340px;border-radius:50%;border:1px solid rgba(255,107,0,.08);bottom:-140px;right:-80px;pointer-events:none;z-index:1}',
  '.vf-ring2{position:absolute;width:220px;height:220px;border-radius:50%;border:1px dashed rgba(255,107,0,.09);bottom:-80px;right:-20px;pointer-events:none;z-index:1;animation:vf-spin 44s linear infinite}',
  '.vf-inner{max-width:1280px;margin:0 auto;padding:64px 56px 0;position:relative;z-index:10;width:100%}',
  '.vf-cta-banner{background:#fff;border:1px solid rgba(255,107,0,.18);border-radius:28px;padding:48px 56px;display:flex;align-items:center;justify-content:space-between;gap:32px;position:relative;overflow:hidden;margin-bottom:64px}',
  '.vf-cta-banner::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,#FF6B00 40%,#FF8C35 60%,transparent)}',
  '.vf-cta-left h2{font-family:"Cormorant Garamond",serif;font-size:clamp(24px,3vw,38px);font-weight:300;color:#1A1208;line-height:1.1;margin-bottom:8px}',
  '.vf-cta-left h2 em{font-style:italic;color:#FF6B00}',
  '.vf-cta-left p{font-size:14px;color:rgba(26,18,8,.6);line-height:1.7;max-width:380px}',
  '.vf-cta-right{display:flex;flex-direction:column;align-items:flex-end;gap:12px;flex-shrink:0}',
  '.vf-cta-btn{display:inline-flex;align-items:center;gap:9px;background:#FF6B00;color:#fff;padding:14px 30px;border-radius:100px;font-size:14px;font-weight:600;text-decoration:none;position:relative;overflow:hidden;box-shadow:0 8px 28px rgba(255,107,0,.38);transition:all .25s;white-space:nowrap}',
  '.vf-cta-btn::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.16),transparent);background-size:400px 100%;animation:vf-shimmer 2.5s linear infinite}',
  '.vf-cta-btn:hover{background:#FF8C35;transform:translateY(-2px);box-shadow:0 14px 38px rgba(255,107,0,.45)}',
  '.vf-cta-note{font-size:12px;color:rgba(26,18,8,.45);display:flex;align-items:center;gap:6px}',
  '.vf-cta-dot{width:6px;height:6px;background:#FF6B00;border-radius:50%;animation:vf-dot 1.8s ease-in-out infinite}',
  '.vf-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;padding-bottom:48px;align-items:start}',
  '.vf-brand-logo{display:flex;align-items:center;gap:9px;margin-bottom:16px;text-decoration:none}',
  '.vf-brand-text{font-family:"DM Sans",sans-serif;font-size:18px;font-weight:700;color:#1A1208;letter-spacing:-.4px}',
  '.vf-brand-text span{color:#FF6B00}',
  '.vf-brand-desc{font-size:13.5px;color:rgba(26,18,8,.6);line-height:1.75;max-width:260px;margin-bottom:20px}',
  '.vf-nl{background:linear-gradient(135deg,#FFF4ED,#fff5e6);border:1px solid rgba(255,107,0,.2);border-radius:18px;padding:20px;margin-bottom:20px}',
  '.vf-nl-title{font-size:12px;font-weight:600;color:#1A1208;margin-bottom:4px}',
  '.vf-nl-sub{font-size:11.5px;color:rgba(26,18,8,.55);display:block;margin-bottom:12px}',
  '.vf-nl-form{display:flex;gap:6px}',
  '.vf-nl-input{flex:1;border:1px solid rgba(255,107,0,.25);border-radius:100px;padding:8px 14px;font-size:12px;font-family:"DM Sans",sans-serif;background:#fff;color:#1A1208;outline:none;transition:border-color .2s}',
  '.vf-nl-input:focus{border-color:#FF6B00}',
  '.vf-nl-btn{background:#FF6B00;color:#fff;border:none;border-radius:100px;padding:8px 16px;font-size:12px;font-weight:600;cursor:pointer;font-family:"DM Sans",sans-serif;transition:background .2s;white-space:nowrap}',
  '.vf-nl-btn:hover{background:#FF8C35}',
  '.vf-social{display:flex;gap:8px;margin-bottom:0}',
  '.vf-soc-btn{width:36px;height:36px;border-radius:50%;border:1px solid rgba(26,18,8,.13);background:#fff;display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:15px;transition:all .2s;flex-shrink:0}',
  '.vf-soc-btn:hover{border-color:rgba(255,107,0,.45);background:#FFF4ED;transform:translateY(-2px)}',
  '.vf-trust{display:flex;flex-wrap:wrap;gap:6px;margin-top:20px}',
  '.vf-trust-chip{display:inline-flex;align-items:center;gap:5px;background:#fff;border:1px solid rgba(255,107,0,.15);border-radius:100px;padding:4px 11px;font-size:11px;font-weight:500;color:rgba(26,18,8,.7)}',
  '.vf-col h3{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(26,18,8,.4);margin-bottom:16px}',
  '.vf-col ul{list-style:none;display:flex;flex-direction:column;gap:10px;padding:0;margin:0}',
  '.vf-col ul li{list-style:none;padding:0;margin:0}',
  '.vf-col ul li a{font-size:13.5px;color:rgba(26,18,8,.65);text-decoration:none;display:inline-flex;align-items:center;gap:5px;transition:color .2s}',
  '.vf-col ul li a:hover{color:#FF6B00}',
  '.vf-new-badge{background:#FFF4ED;color:#FF6B00;border-radius:100px;padding:1px 7px;font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}',
  '.vf-bottom{border-top:1px solid rgba(255,107,0,.1);padding:24px 0;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}',
  '.vf-copy{font-size:12.5px;color:rgba(26,18,8,.45);line-height:1.6}',
  '.vf-copy a{color:#FF6B00;text-decoration:none}',
  '.vf-copy a:hover{text-decoration:underline}',
  '.vf-badge-ro{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1px solid rgba(255,107,0,.15);border-radius:100px;padding:5px 13px;font-size:11px;font-weight:500;color:rgba(26,18,8,.6)}',
  '.vf-legal{display:flex;gap:20px;flex-wrap:wrap}',
  '.vf-legal a{font-size:12px;color:rgba(26,18,8,.45);text-decoration:none;transition:color .2s}',
  '.vf-legal a:hover{color:#FF6B00}',
  '.vf-ticker{overflow:hidden;background:#FF6B00;padding:9px 0;position:relative;z-index:10}',
  '.vf-ti-inner{display:flex;width:max-content;animation:vf-tick 26s linear infinite}',
  '.vf-ti{display:flex;align-items:center;gap:10px;padding:0 30px;color:#fff;font-size:11.5px;font-weight:500;white-space:nowrap;letter-spacing:.04em}',
  '.vf-tdot{width:4px;height:4px;background:rgba(255,255,255,.5);border-radius:50%;flex-shrink:0}',
  '@media(max-width:1024px){.vf-inner{padding:48px 32px 0}.vf-cta-banner{padding:36px 40px}.vf-grid{grid-template-columns:1.5fr 1fr 1fr;gap:36px}.vf-brand{grid-column:1/-1}}',
  '@media(max-width:768px){.vf-inner{padding:36px 24px 0}.vf-cta-banner{flex-direction:column;align-items:flex-start;padding:28px;gap:20px;margin-bottom:40px}.vf-cta-right{align-items:flex-start}.vf-grid{grid-template-columns:1fr 1fr;gap:28px}.vf-brand{grid-column:1/-1}.vf-bottom{flex-direction:column;align-items:flex-start;gap:12px}}',
  '@media(max-width:480px){.vf-inner{padding:28px 16px 0}.vf-cta-banner{padding:22px;border-radius:20px;margin-bottom:32px}.vf-cta-left h2{font-size:22px}.vf-grid{grid-template-columns:1fr;gap:24px}.vf-bottom{align-items:center;text-align:center}.vf-legal{justify-content:center}.vf-copy{text-align:center}}',
].join('\n')

const SCHEMA_ORG = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VibeInvite',
  url: 'https://vibeinvite.ro',
  logo: 'https://vibeinvite.ro/logo.png',
  description: 'Pachet all-in-one pentru nunta: invitatii digitale, meniu QR, upload poze invitati si export Excel.',
  address: { '@type': 'PostalAddress', addressCountry: 'RO' },
  sameAs: [
    'https://instagram.com/vibeinvite',
    'https://facebook.com/vibeinvite',
    'https://tiktok.com/@vibeinvite',
    'https://pinterest.com/vibeinvite',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1240',
    bestRating: '5',
  },
})

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_ORG }} />

      <footer className="vf-footer" role="contentinfo" aria-label="VibeInvite footer">

        <div className="vf-orb1" aria-hidden="true" />
        <div className="vf-orb2" aria-hidden="true" />
        <div className="vf-ring1" aria-hidden="true" />
        <div className="vf-ring2" aria-hidden="true" />

        <div className="vf-inner">

          {/* CTA Banner */}
          <div className="vf-cta-banner">
            <div className="vf-cta-left">
              <h2>
                Creaza-ti invitatia <em>digitala</em><br />
                in 3 minute &mdash; E Free
              </h2>
              <p>
                Trimite linkul invitatiei instant, urmaresti confirmarile live
                si colectezi poze de la invitati. Zero hartie, zero costuri ascunse.
              </p>
            </div>
            <div className="vf-cta-right">
              <Link href="/preturi" className="vf-cta-btn">
                <span aria-hidden="true">✨</span>
                Incepe Gratuit
              </Link>
              <span className="vf-cta-note">
                <span className="vf-cta-dot" aria-hidden="true" />
                Fara card bancar &middot; Link activ instant
              </span>
            </div>
          </div>

          {/* Grid */}
          <div className="vf-grid">

            {/* Brand */}
            <div className="vf-brand vf-col">
              <Link href="/" className="vf-brand-logo" aria-label="VibeInvite acasa">
                <Logo />
                <span className="vf-brand-text">Vibe<span>Invite</span></span>
              </Link>
              <p className="vf-brand-desc">
                Pachet all-in-one pentru nunta si botez: invitatii digitale,
                meniu QR, upload poze invitati si export Excel &mdash; totul intr-un singur link.
              </p>

              <div className="vf-nl">
                <p className="vf-nl-title">Sfaturi si oferte exclusive</p>
                <span className="vf-nl-sub">Inspiratie pentru nunta ta, lunar.</span>
                <div className="vf-nl-form">
                  <input
                    type="email"
                    className="vf-nl-input"
                    placeholder="adresa@email.ro"
                    aria-label="Adresa de email pentru newsletter"
                  />
                  <button type="button" className="vf-nl-btn">Aboneaza</button>
                </div>
              </div>



              <div className="vf-trust" aria-label="Certificari si garantii">
                <span className="vf-trust-chip">🔒 GDPR Conform</span>
                <span className="vf-trust-chip">🇷🇴 Produs in Romania</span>
                <span className="vf-trust-chip">⭐ 4.9/5 · 1240 recenzii</span>
              </div>
            </div>

            {/* Produse */}
            <div className="vf-col">
              <h3>Produse</h3>
              <ul>
                {PRODUSE.map((item: NavItem) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      {item.label}
                      {item.badge && (
                        <span className="vf-new-badge">{item.badge}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resurse */}
            <div className="vf-col">
              <h3>Resurse</h3>
              <ul>
                {RESURSE.map((item: NavItem) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Companie */}
            <div className="vf-col">
              <h3>Companie</h3>
              <ul>
                {COMPANIE.map((item: NavItem) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href}>{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom */}
          <div className="vf-bottom">
            <p className="vf-copy">
              &copy; {year} <Link href="/">VibeInvite</Link>. Toate drepturile rezervate.<br />
              Creat cu &#9829; in Romania pentru cupluri din toata lumea.
            </p>
            <span className="vf-badge-ro">🇷🇴 Made in Romania</span>
            <nav className="vf-legal" aria-label="Linkuri legale">
              <Link href="/termeni">Termeni</Link>
              <Link href="/confidentialitate">Confidentialitate</Link>
              <Link href="/cookies">Cookies</Link>
              <Link href="/sitemap.xml">Sitemap</Link>
            </nav>
          </div>

        </div>

        {/* Ticker */}
        <div className="vf-ticker" aria-hidden="true">
          <div className="vf-ti-inner">
            {[...TICKER, ...TICKER].map((t: string, i: number) => (
              <div key={i} className="vf-ti">
                {t}<span className="vf-tdot" />
              </div>
            ))}
          </div>
        </div>

      </footer>
    </>
  )
}