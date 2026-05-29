'use client'

import { useState } from 'react'

/* ═══════════════════════════════════════════════════════════════
   NOTE: metadata în layout.tsx (page e 'use client')
   Creează: andre/app/invitatii-online/layout.tsx  (vezi mai jos)
═══════════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.io * { box-sizing: border-box; margin: 0; padding: 0; }

.io {
  font-family: 'DM Sans', sans-serif;
  background: #FDFAF6;
  color: #1A1208;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

/* ── orbs ── */
@keyframes io-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-18px) scale(1.05)} 66%{transform:translate(-12px,14px) scale(.97)} }
.io-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(90px); }
.io-o1  { width: 600px; height: 600px; background: radial-gradient(circle,rgba(255,107,0,.14) 0%,transparent 70%); top: -120px; right: -100px; animation: io-orb 14s ease-in-out infinite; }
.io-o2  { width: 350px; height: 350px; background: radial-gradient(circle,rgba(255,107,0,.09) 0%,transparent 70%); bottom: 100px; left: -80px; animation: io-orb 19s ease-in-out infinite reverse; }
.io-o3  { width: 250px; height: 250px; background: radial-gradient(circle,rgba(255,200,120,.08) 0%,transparent 70%); top: 45%; left: 45%; animation: io-orb 24s ease-in-out infinite 5s; }

/* ── keyframes ── */
@keyframes io-up      { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
@keyframes io-in      { from{opacity:0} to{opacity:1} }
@keyframes io-dot     { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
@keyframes io-shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
@keyframes io-tick    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes io-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes io-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes io-pulse   { 0%{transform:scale(.9);opacity:.6} 70%{transform:scale(1.5);opacity:0} 100%{transform:scale(.9);opacity:0} }
@keyframes io-card-in { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

/* ── ticker ── */
.io-ticker   { overflow: hidden; background: #FF6B00; padding: 10px 0; }
.io-ti-inner { display: flex; width: max-content; animation: io-tick 28s linear infinite; }
.io-ti       { display: flex; align-items: center; gap: 10px; padding: 0 32px; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
.io-tdot     { width: 4px; height: 4px; background: rgba(255,255,255,.5); border-radius: 50%; }

/* ── inner ── */
.io-inner {
  position: relative; z-index: 10;
  max-width: 1200px; margin: 0 auto;
  padding: 52px 24px 80px;
}

/* ── hero ── */
.io-hero { text-align: center; margin-bottom: 52px; opacity: 0; animation: io-up .7s ease .1s forwards; }
.io-super {
  display: inline-flex; align-items: center; gap: 7px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px;
  padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500;
  color: #FF6B00; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 18px;
}
.io-sdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; animation: io-dot 1.8s ease-in-out infinite; }
.io-tagline {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg,#FF6B00,#FF8C35); color: #fff;
  border-radius: 12px; padding: 9px 20px; font-size: 13px; font-weight: 600;
  letter-spacing: .02em; margin-bottom: 20px;
}
.io-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(36px,5.5vw,64px); font-weight: 300; line-height: 1.07;
  color: #1A1208; margin-bottom: 18px;
}
.io-h1 em     { font-style: italic; color: #FF6B00; }
.io-h1 strong { font-weight: 600; }
.io-lead { font-size: 15px; line-height: 1.85; color: rgba(26,18,8,.62); max-width: 540px; margin: 0 auto 28px; }

/* count badge */
.io-count-badge {
  display: inline-flex; align-items: center; gap: 10px;
  background: #fff; border: 1px solid rgba(255,107,0,.18);
  border-radius: 100px; padding: 8px 20px 8px 12px;
  font-size: 13px; color: rgba(26,18,8,.6); font-weight: 400;
}
.io-cb-num {
  background: linear-gradient(135deg,#FF6B00,#FF8C35); color: #fff;
  border-radius: 100px; padding: 2px 12px; font-size: 13px; font-weight: 700;
}

/* ── filter bar ── */
.io-filters {
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
  gap: 10px; margin-bottom: 44px;
  opacity: 0; animation: io-up .7s ease .25s forwards;
}
.io-filter {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 20px; border-radius: 100px;
  border: 1.5px solid rgba(26,18,8,.13);
  font-size: 13px; font-weight: 500; color: rgba(26,18,8,.65);
  background: #fff; cursor: pointer; transition: all .2s; font-family: inherit;
  user-select: none;
}
.io-filter:hover  { border-color: rgba(255,107,0,.4); color: #FF6B00; background: #FFF4ED; }
.io-filter.active { border-color: #FF6B00; color: #FF6B00; background: #FFF4ED; font-weight: 600;
  box-shadow: 0 4px 16px rgba(255,107,0,.15); }

/* ── cards grid ── */
.io-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 22px;
}

/* ── single invitation card ── */
.io-card {
  background: #fff;
  border-radius: 24px;
  border: 1px solid rgba(255,107,0,.1);
  box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 8px 32px rgba(0,0,0,.06);
  overflow: hidden;
  transition: transform .25s, box-shadow .25s, border-color .25s;
  cursor: pointer;
  position: relative;
  animation: io-card-in .5s ease both;
}
.io-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0,0,0,.06), 0 24px 56px rgba(255,107,0,.14);
  border-color: rgba(255,107,0,.28);
}

/* preview area */
.io-card-preview {
  width: 100%; aspect-ratio: 3/4;
  position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}

/* abstract background patterns per theme */
.io-card-preview.theme-romantic {
  background: linear-gradient(145deg, #FFF0F5 0%, #FFD6E7 50%, #FFBCD9 100%);
}
.io-card-preview.theme-garden {
  background: linear-gradient(145deg, #F0FFF4 0%, #C6F6D5 50%, #9AE6B4 100%);
}
.io-card-preview.theme-royal {
  background: linear-gradient(145deg, #F5F0FF 0%, #D6C6FF 50%, #B794F4 100%);
}
.io-card-preview.theme-golden {
  background: linear-gradient(145deg, #FFFFF0 0%, #FEFCBF 50%, #FAF089 100%);
}
.io-card-preview.theme-ocean {
  background: linear-gradient(145deg, #EBF8FF 0%, #BEE3F8 50%, #90CDF4 100%);
}
.io-card-preview.theme-rustic {
  background: linear-gradient(145deg, #FFF5EB 0%, #FDDCB5 50%, #F6AD55 100%);
}
.io-card-preview.theme-noir {
  background: linear-gradient(145deg, #2D3748 0%, #1A202C 50%, #171923 100%);
}
.io-card-preview.theme-boho {
  background: linear-gradient(145deg, #FAF5FF 0%, #E9D8FD 50%, #D6BCFA 100%);
}
.io-card-preview.theme-minimal {
  background: linear-gradient(145deg, #F7FAFC 0%, #EDF2F7 50%, #E2E8F0 100%);
}
.io-card-preview.theme-floral {
  background: linear-gradient(145deg, #FFF5F7 0%, #FED7E2 50%, #FBB6CE 100%);
}
.io-card-preview.theme-vintage {
  background: linear-gradient(145deg, #FFFFF0 0%, #F6E05E 30%, #ECC94B 100%);
}
.io-card-preview.theme-luxury {
  background: linear-gradient(145deg, #1A1208 0%, #2D1F0E 50%, #3D2A12 100%);
}

/* decorative elements inside preview */
.io-prev-deco {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px; padding: 24px;
}
.io-prev-ring {
  width: 80px; height: 80px; border-radius: 50%;
  border: 1px solid currentColor; opacity: .2;
  position: absolute; animation: io-spin 30s linear infinite;
}
.io-prev-ring2 {
  width: 120px; height: 120px; border-radius: 50%;
  border: 1px dashed currentColor; opacity: .12;
  position: absolute; animation: io-spin 50s linear infinite reverse;
}
.io-prev-icon { font-size: 36px; animation: io-float 3s ease-in-out infinite; z-index: 2; }
.io-prev-line { width: 60px; height: 1px; background: currentColor; opacity: .25; z-index: 2; }
.io-prev-title-mock {
  font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 400;
  letter-spacing: .08em; text-align: center; z-index: 2; line-height: 1.5;
  opacity: .55;
}
.io-prev-date-mock {
  font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
  z-index: 2; opacity: .4; font-weight: 500;
}

/* ── "În curând" overlay for locked cards ── */
.io-locked-overlay {
  position: absolute; inset: 0; z-index: 10;
  background: rgba(253,250,246,.72);
  backdrop-filter: blur(6px);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
}
.io-lock-badge {
  background: #1A1208; color: #fff;
  border-radius: 100px; padding: 7px 20px;
  font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
}
.io-lock-sub { font-size: 12px; color: rgba(26,18,8,.55); }

/* shimmer on cards coming soon */
.io-shimmer-bar {
  position: absolute; inset: 0;
  background: linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
  background-size: 400px 100%; animation: io-shimmer 2.5s linear infinite;
  pointer-events: none;
}

/* card body */
.io-card-body { padding: 18px 20px 20px; }
.io-card-tag {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 10px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
  color: #FF6B00; background: #FFF4ED;
  border-radius: 100px; padding: 3px 10px; margin-bottom: 10px;
}
.io-card-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 19px; font-weight: 400; color: #1A1208; margin-bottom: 4px;
  line-height: 1.2;
}
.io-card-name em { font-style: italic; color: #FF6B00; }
.io-card-desc { font-size: 12px; color: rgba(26,18,8,.55); line-height: 1.6; margin-bottom: 14px; }

.io-card-footer { display: flex; align-items: center; justify-content: space-between; }
.io-card-price {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-weight: 600; color: #FF6B00;
}
.io-card-price span { font-size: 12px; font-weight: 400; color: rgba(26,18,8,.4); font-family: 'DM Sans', sans-serif; }
.io-card-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 100px;
  background: #FF6B00; color: #fff; font-size: 12px; font-weight: 600;
  border: none; cursor: pointer; font-family: inherit;
  transition: background .2s, transform .15s;
}
.io-card-btn:hover { background: #FF8C35; transform: scale(1.04); }
.io-card-btn-ghost {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 100px;
  border: 1.5px solid rgba(26,18,8,.15); color: rgba(26,18,8,.45); font-size: 12px; font-weight: 600;
  background: transparent; cursor: not-allowed; font-family: inherit;
}

/* ── coming soon banner ── */
.io-coming-soon {
  text-align: center; margin: 56px 0 0;
  opacity: 0; animation: io-up .7s ease .5s forwards;
}
.io-cs-card {
  background: linear-gradient(135deg,#1A1208 0%,#2d1f0e 100%);
  border-radius: 28px; padding: 48px 40px;
  display: inline-flex; flex-direction: column; align-items: center; gap: 16px;
  max-width: 560px; position: relative; overflow: hidden;
}
.io-cs-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg,#FF6B00,#FF8C35,#FF6B00);
}
.io-cs-ring { width: 64px; height: 64px; border-radius: 50%; background: rgba(255,107,0,.15); display: flex; align-items: center; justify-content: center; font-size: 28px; position: relative; }
.io-cs-ring::before { content:''; position:absolute; inset:-6px; border-radius:50%; border:1px solid rgba(255,107,0,.2); animation: io-pulse 2s ease-out infinite; }
.io-cs-h { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; color: #fff; }
.io-cs-h em { font-style: italic; color: #FF8C35; }
.io-cs-sub { font-size: 13px; color: rgba(255,255,255,.55); line-height: 1.7; max-width: 380px; }
.io-cs-dots { display: flex; gap: 8px; }
.io-cs-dot { width: 8px; height: 8px; border-radius: 50%; background: #FF6B00; animation: io-dot 1.8s ease-in-out infinite; }
.io-cs-dot:nth-child(2) { animation-delay: .3s; }
.io-cs-dot:nth-child(3) { animation-delay: .6s; }

/* ── guarantee bar ── */
.io-guarantee {
  display: flex; align-items: center; justify-content: center; gap: 28px; flex-wrap: wrap;
  background: #fff; border-radius: 20px; border: 1px solid rgba(255,107,0,.1);
  padding: 18px 28px; margin-top: 28px;
  opacity: 0; animation: io-up .7s ease .6s forwards;
}
.io-gi   { display: flex; align-items: center; gap: 9px; }
.io-gico { font-size: 20px; }
.io-gtxt { font-size: 12px; font-weight: 500; color: rgba(26,18,8,.65); }
.io-gtxt strong { color: #1A1208; display: block; font-size: 12.5px; }
.io-gdiv { width: 1px; height: 28px; background: rgba(26,18,8,.1); }

/* ── responsive ── */
@media (max-width: 639px) {
  .io-inner { padding: 32px 16px 52px; }
  .io-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
  .io-guarantee { gap: 14px; }
  .io-gdiv { display: none; }
  .io-cs-card { padding: 36px 24px; }
}
@media (max-width: 400px) {
  .io-grid { grid-template-columns: 1fr; }
}
`

const TICKER = [
  '💌 40+ Teme în pregătire', '✨ Design Premium', '📲 Trimite prin link sau QR',
  '🎊 Nunți · Botezuri · Petreceri', '💸 300 Lei · Plată Unică',
  '⭐ 4.9 Rating · 12K+ Invitații', '🔒 Plată securizată', '🛠️ Suport inclus',
]

const FILTERS = [
  { emoji: '✨', label: 'Toate' },
  { emoji: '💍', label: 'Nuntă' },
  { emoji: '🎀', label: 'Botez' },
  { emoji: '🎉', label: 'Petrecere' },
  { emoji: '🏢', label: 'Corporate' },
]

type Card = {
  id: number
  name: string
  desc: string
  theme: string
  icon: string
  category: string
  color: string
  available: boolean
}

const CARDS: Card[] = [
  { id: 1,  name: 'Rosa Eternă',    desc: 'Floral romantic cu accente roz și typography clasică.',  theme: 'theme-romantic', icon: '🌹', category: 'Nuntă',    color: '#D53F8C', available: true  },
  { id: 2,  name: 'Grădina Secretă',desc: 'Verde botanical, elegant și plin de prospețime.',        theme: 'theme-garden',   icon: '🌿', category: 'Nuntă',    color: '#276749', available: true  },
  { id: 3,  name: 'Regală',         desc: 'Violet regal, auriu și typography grandioasă.',           theme: 'theme-royal',    icon: '👑', category: 'Corporate', color: '#553C9A', available: false },
  { id: 4,  name: 'Aur & Lumină',   desc: 'Nuanțe calde de aur, rafinament clasic.',                theme: 'theme-golden',   icon: '✨', category: 'Nuntă',    color: '#B7791F', available: false },
  { id: 5,  name: 'Valuri Albastre',desc: 'Ocean bleu, proaspăt și modern — perfect pentru vară.',  theme: 'theme-ocean',    icon: '🌊', category: 'Botez',    color: '#2C7A7B', available: true  },
  { id: 6,  name: 'Rustic Cald',    desc: 'Tonuri de portocaliu și teracotă, atmosferă de toamnă.', theme: 'theme-rustic',   icon: '🍂', category: 'Nuntă',    color: '#C05621', available: true  },
  { id: 7,  name: 'Noir Elegant',   desc: 'Dark mode luxuriant — sofisticat și memorabil.',          theme: 'theme-noir',     icon: '🖤', category: 'Corporate', color: '#E2E8F0', available: false },
  { id: 8,  name: 'Boho Chic',      desc: 'Liber, creativ, cu accente de mov pastelat și flori.',   theme: 'theme-boho',     icon: '🌸', category: 'Petrecere', color: '#6B46C1', available: true  },
  { id: 9,  name: 'Pure Minimal',   desc: 'Curățenie și simplitate — pentru cei care apreciază mai puțin.',theme:'theme-minimal',icon:'◇', category: 'Corporate', color: '#4A5568', available: false },
  { id: 10, name: 'Flori de Cireș', desc: 'Sakura și romantism japonez într-un design delicat.',    theme: 'theme-floral',   icon: '🌸', category: 'Botez',    color: '#B83280', available: false },
  { id: 11, name: 'Vintage 1920',   desc: 'Art deco, aur și nostalgie — o eră de neuitat.',         theme: 'theme-vintage',  icon: '🥂', category: 'Nuntă',    color: '#744210', available: false },
  { id: 12, name: 'Luxury Black',   desc: 'Ultra-premium, negru și aur — pentru evenimentul anului.',theme:'theme-luxury',   icon: '💎', category: 'Corporate', color: '#F6E05E', available: false },
]

export default function InvitatiiOnlinePage() {
  const [activeFilter, setActiveFilter] = useState('Toate')

  const filtered = activeFilter === 'Toate'
    ? CARDS
    : CARDS.filter(c => c.category === activeFilter)

  const availableCount = CARDS.filter(c => c.available).length

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="io">
        <div className="io-orb io-o1" aria-hidden="true" />
        <div className="io-orb io-o2" aria-hidden="true" />
        <div className="io-orb io-o3" aria-hidden="true" />

        {/* ticker top */}
        <div className="io-ticker" aria-hidden="true">
          <div className="io-ti-inner">
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="io-ti">{t}<span className="io-tdot" /></div>
            ))}
          </div>
        </div>

        <div className="io-inner">

          {/* HERO */}
          <header className="io-hero">
            <p className="io-tagline">💌 Invitații digitale pentru momente speciale</p>
            <p className="io-super"><span className="io-sdot" aria-hidden="true" />Colecție Exclusivă</p>
            <h1 className="io-h1">
              Alege <em>invitația perfectă</em><br />
              pentru <strong>ziua ta specială</strong>
            </h1>
            <p className="io-lead">
              Fiecare temă este concepută cu atenție la detalii — de la tipografie la culori.
              Personalizezi conținutul, noi ne ocupăm de design. Simplu, elegant, memorabil.
            </p>
            <div className="io-count-badge">
              <span className="io-cb-num">{availableCount} disponibile</span>
              <span>· {CARDS.length - availableCount} teme în pregătire · lansăm în curând</span>
            </div>
          </header>

          {/* FILTERS */}
          <nav className="io-filters" aria-label="Filtrează după categorie">
            {FILTERS.map(f => (
              <button
                key={f.label}
                type="button"
                className={`io-filter${activeFilter === f.label ? ' active' : ''}`}
                onClick={() => setActiveFilter(f.label)}
                aria-pressed={activeFilter === f.label}
              >
                <span aria-hidden="true">{f.emoji}</span> {f.label}
              </button>
            ))}
          </nav>

          {/* CARDS GRID */}
          <div className="io-grid" role="list">
            {filtered.map((card, idx) => (
              <article
                key={card.id}
                className="io-card"
                role="listitem"
                style={{ animationDelay: `${0.05 * idx}s` }}
              >
                {/* Preview */}
                <div className={`io-card-preview ${card.theme}`} style={{ color: card.color }}>
                  <div className="io-prev-deco">
                    <span className="io-prev-ring" />
                    <span className="io-prev-ring2" />
                    <span className="io-prev-icon">{card.icon}</span>
                    <span className="io-prev-line" />
                    <span className="io-prev-title-mock">Prenume & Prenume<br />vă invită cu drag la</span>
                    <span className="io-prev-date-mock">00 · Lună · Anul</span>
                  </div>

                  {/* Locked overlay */}
                  {!card.available && (
                    <div className="io-locked-overlay">
                      <div className="io-shimmer-bar" aria-hidden="true" />
                      <span className="io-lock-badge">🚀 În curând</span>
                      <span className="io-lock-sub">Lansăm în curând</span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="io-card-body">
                  <span className="io-card-tag">
                    <span aria-hidden="true">{card.icon}</span> {card.category}
                  </span>
                  <h2 className="io-card-name"><em>{card.name}</em></h2>
                  <p className="io-card-desc">{card.desc}</p>
                  <div className="io-card-footer">
                    <div className="io-card-price">
                      300 lei <span>/ pachet complet</span>
                    </div>
                    {card.available ? (
                      <button type="button" className="io-card-btn">
                        Alege ↗
                      </button>
                    ) : (
                      <span className="io-card-btn-ghost" aria-label="Indisponibil momentan">
                        În curând
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* COMING SOON */}
          <div className="io-coming-soon">
            <div className="io-cs-card">
              <div className="io-cs-ring">🎨</div>
              <h2 className="io-cs-h">Lucrăm la <em>40+ teme</em></h2>
              <p className="io-cs-sub">
                Colecția noastră crește săptămânal. Urmărește-ne sau
                lasă-ne un mesaj — te anunțăm când tema preferată devine disponibilă.
              </p>
              <div className="io-cs-dots">
                <span className="io-cs-dot" /><span className="io-cs-dot" /><span className="io-cs-dot" />
              </div>
            </div>
          </div>

          {/* guarantee bar */}
          <div className="io-guarantee" aria-label="Garanții incluse">
            {[
              { icon: '🔒', strong: 'Plată securizată',   text: 'Tranzacție 100% sigură' },
              { icon: '🛠️', strong: 'Suport inclus',      text: 'Te ghidăm pas cu pas' },
              { icon: '♾️', strong: 'Acces 12 luni',      text: 'Fără abonament lunar' },
              { icon: '✏️', strong: 'Editabil oricând',   text: 'Modifici conținutul gratuit' },
            ].map((g, i, arr) => (
              <>
                <div key={g.strong} className="io-gi">
                  <span className="io-gico" aria-hidden="true">{g.icon}</span>
                  <span className="io-gtxt"><strong>{g.strong}</strong>{g.text}</span>
                </div>
                {i < arr.length - 1 && <div key={`d${i}`} className="io-gdiv" aria-hidden="true" />}
              </>
            ))}
          </div>

        </div>

        {/* ticker bottom */}
        <div className="io-ticker" aria-hidden="true">
          <div className="io-ti-inner" style={{ animationDirection: 'reverse' }}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="io-ti">{t}<span className="io-tdot" /></div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
