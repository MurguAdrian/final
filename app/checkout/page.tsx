
'use client'

import { useState, useRef } from 'react'

const THEME_STRIPE: Record<string, { productId: string; priceId: string }> = {
  lux:      { productId: 'prod_UPFVZEqqszPz9R',       priceId: 'price_1TQR0jRdGrZezAYw5PKeEPhU' },
  nature:   { productId: 'prod_UPFUYpfsXc7N4x',    priceId: 'price_1TQQzARdGrZezAYwBWhsj59z' },
  boho:     { productId: 'prod_UoLdZhzAQZDVrJ', priceId: 'price_1ToiwgRdGrZezAYwpCr3yVRS' },
  royal:    { productId: 'prod_UoLgxzjb3M1jj5', priceId: 'price_1ToizORdGrZezAYww53LF1AT' },
  minimal:  { productId: 'prod_UoLi4ost7VW5p3', priceId: 'price_1Toj0gRdGrZezAYwk3gQh0Kd' },//TEST PE BANI REALI
  romantic: { productId: 'prod_UoLfbDgBzhMcH6', priceId: 'price_1ToixyRdGrZezAYwRXwpIOyL' },
  masinuta: { productId: 'prod_UoLtSfYKUORmMw', priceId: 'price_1TojBkRdGrZezAYwQsB6nKB0' },
  astronaut:{ productId: 'prod_UoLp15apSKeKya', priceId: 'price_1Toj86RdGrZezAYwXMRwA6dc' },//Test pe bani reali
  fluture:  { productId: 'prod_UoM0ZpfNg8e2Zt', priceId: 'price_1TojI6RdGrZezAYwlPPwz4fq' },
  baloane:  { productId: 'prod_UoLy6eMp5qeUNu', priceId: 'price_1TojGIRdGrZezAYwAxJhuksY' },
  ursulet:  { productId: 'prod_UoM15FaHlR9QlQ', priceId: 'price_1TojJNRdGrZezAYwGeKanoDf' },
  steluta:  { productId: 'prod_UoLv7KGfv0eZbQ', priceId: 'price_1TojDpRdGrZezAYwth0UVC8l' }
}

type Category = 'nunta' | 'botez'

type Theme = {
  id: string
  name: string
  icon: string
  tagline: string
  headline: string
  hook: string
  bullets: string[]
  accent: string
  accentText: string
  pillBg: string
  pillText: string
  barGrad: string
  category: Category
  badge?: string
  popular?: boolean
}

const THEMES: Theme[] = [
  // ── NUNTĂ — boho primul, cu popular ──
  {
    id: 'boho',
    name: 'BOHO',
    icon: '🌸',
    tagline: 'Autenticitate & căldură',
    headline: 'Cu suflet și naturalețe.',
    hook: 'Terracotta cald și roz prăfuit — ca o îmbrățișare caldă trimisă înainte de nuntă.',
  bullets: [
    'Dashboard confirmări invitați',
    'Meniu personalizat',
    'Album foto colectiv (25 GB)',
    'Localizare GPS eveniment',
    'Tablou de bord participare',
    'Export listă invitați (Excel)',
    'Link personalizat cu editări nelimitate',
    'Actualizare instant a informațiilor',
    'Invitații nelimitate',
    'Acces 12 luni, fără abonament'
  ],     accent: '#C47A5A',
    accentText: '#fff',
    pillBg: '#FDE8DC',
    pillText: '#7D3C1E',
    barGrad: 'linear-gradient(90deg,#7D3C1E,#C47A5A,#E8A87C,#C47A5A,#7D3C1E)',
    category: 'nunta',
    popular: true,
  },
  {
    id: 'lux',
    name: 'LUX',
    icon: '✨',
    tagline: 'Cel mai ales',
    headline: 'Opulență pură. Aur pe negru.',
    hook: 'Invitații care șochează plăcut înainte să ajungi la altar.',
  bullets: [
    'Dashboard confirmări invitați',
    'Meniu personalizat',
    'Album foto colectiv (25 GB)',
    'Localizare GPS eveniment',
    'Tablou de bord participare',
    'Export listă invitați (Excel)',
    'Link personalizat cu editări nelimitate',
    'Actualizare instant a informațiilor',
    'Invitații nelimitate',
    'Acces 12 luni, fără abonament'
  ],     accent: '#C9A84C',
    accentText: '#1A1208',
    pillBg: '#FFF8E6',
    pillText: '#7D5A1E',
    barGrad: 'linear-gradient(90deg,#7D5A1E,#C9A84C,#E8C96A,#C9A84C,#7D5A1E)',
    category: 'nunta',
  },
  {
    id: 'romantic',
    name: 'ROMANTIC',
    icon: '🌹',
    tagline: 'Valoare maximă',
    headline: 'Iubire în fiecare pixel.',
    hook: 'Roșu trandafiriu și bujori — o declarație de dragoste înainte de ziua cea mare.',
  bullets: [
    'Dashboard confirmări invitați',
    'Meniu personalizat',
    'Album foto colectiv (25 GB)',
    'Localizare GPS eveniment',
    'Tablou de bord participare',
    'Export listă invitați (Excel)',
    'Link personalizat cu editări nelimitate',
    'Actualizare instant a informațiilor',
    'Invitații nelimitate',
    'Acces 12 luni, fără abonament'
  ],     accent: '#9B2335',
    accentText: '#fff',
    pillBg: '#FDEAED',
    pillText: '#6B1520',
    barGrad: 'linear-gradient(90deg,#4a0a11,#9B2335,#D4687A,#9B2335,#4a0a11)',
    category: 'nunta',
  },
  {
    id: 'royal',
    name: 'ROYAL',
    icon: '👑',
    tagline: 'Majestate regală',
    headline: 'O nuntă de poveste merită o invitație regală.',
    hook: 'Albastru regal profund cu argintiu inspirat din palatele europene.',
  bullets: [
    'Dashboard confirmări invitați',
    'Meniu personalizat',
    'Album foto colectiv (25 GB)',
    'Localizare GPS eveniment',
    'Tablou de bord participare',
    'Export listă invitați (Excel)',
    'Link personalizat cu editări nelimitate',
    'Actualizare instant a informațiilor',
    'Invitații nelimitate',
    'Acces 12 luni, fără abonament'
  ],     accent: '#2C3E8C',
    accentText: '#fff',
    pillBg: '#EEF2FF',
    pillText: '#1A2654',
    barGrad: 'linear-gradient(90deg,#0f1a3d,#2C3E8C,#8B9FE8,#2C3E8C,#0f1a3d)',
    category: 'nunta',
  },
  {
    id: 'nature',
    name: 'NATURE',
    icon: '🌿',
    tagline: 'Prospețime botanică',
    headline: 'Natura ca backdrop de nuntă.',
    hook: 'Verde mint și tonuri botanice pentru cupluri care iubesc autenticul.',
  bullets: [
    'Dashboard confirmări invitați',
    'Meniu personalizat',
    'Album foto colectiv (25 GB)',
    'Localizare GPS eveniment',
    'Tablou de bord participare',
    'Export listă invitați (Excel)',
    'Link personalizat cu editări nelimitate',
    'Actualizare instant a informațiilor',
    'Invitații nelimitate',
    'Acces 12 luni, fără abonament'
  ],     accent: '#2D6A4F',
    accentText: '#fff',
    pillBg: '#D8F3DC',
    pillText: '#1B4332',
    barGrad: 'linear-gradient(90deg,#1B4332,#2D6A4F,#52B788,#2D6A4F,#1B4332)',
    category: 'nunta',
  },
  {
    id: 'minimal',
    name: 'MINIMAL',
    icon: '◻️',
    tagline: 'Eleganță prin simplitate',
    headline: 'Când mai puțin spune totul.',
    hook: 'Alb imaculat și negru pur pentru cupluri moderne care nu au nevoie de podoabe.',
  bullets: [
    'Dashboard confirmări invitați',
    'Meniu personalizat',
    'Album foto colectiv (25 GB)',
    'Localizare GPS eveniment',
    'Tablou de bord participare',
    'Export listă invitați (Excel)',
    'Link personalizat cu editări nelimitate',
    'Actualizare instant a informațiilor',
    'Invitații nelimitate',
    'Acces 12 luni, fără abonament'
  ],    accent: '#1A1208',
    accentText: '#fff',
    pillBg: '#F2F0ED',
    pillText: '#1A1208',
    barGrad: 'linear-gradient(90deg,#000,#1A1208,#5A4F44,#1A1208,#000)',
    category: 'nunta',
  },
  // ── BOTEZ — astronaut primul, cu popular ──
  {
    id: 'astronaut',
    name: 'ASTRONAUT',
    icon: '🚀',
    tagline: 'Până la stele',
    headline: 'Micul explorator a aterizat.',
    hook: 'Cosmos violet-albastru și rachete — pentru băiețelul care va cuceri lumea.',
bullets: [
  'Dashboard confirmări invitați',
  'Localizare GPS eveniment',
  'Tablou de bord participare',
  'Export listă invitați (Excel)',
  'Link personalizat cu editări nelimitate',
  'Actualizare instant a informațiilor',
  'Invitații nelimitate',
  'Acces 12 luni, fără abonament'
],    accent: '#7C6BC4',
    accentText: '#fff',
    pillBg: '#EEEAFF',
    pillText: '#2A1F4D',
    barGrad: 'linear-gradient(90deg,#14152B,#1E2046,#5848A0,#7C6BC4,#A78BFA,#7C6BC4,#5848A0,#14152B)',
    category: 'botez',
    badge: '👶 Băiat',
    popular: true,
  },
  {
    id: 'masinuta',
    name: 'MAȘINUȚĂ',
    icon: '🚗',
    tagline: 'Aventura începe',
    headline: 'Prima lui cursă în lume.',
    hook: 'Albastru cer și nori pufoși — pentru un băiețel plin de energie și curiozitate.',
bullets: [
  'Dashboard confirmări invitați',
  'Localizare GPS eveniment',
  'Tablou de bord participare',
  'Export listă invitați (Excel)',
  'Link personalizat cu editări nelimitate',
  'Actualizare instant a informațiilor',
  'Invitații nelimitate',
  'Acces 12 luni, fără abonament'
],    accent: '#4A8BC2',
    accentText: '#fff',
    pillBg: '#DDECF8',
    pillText: '#1E466E',
    barGrad: 'linear-gradient(90deg,#1E466E,#2E6299,#4A8BC2,#A9CBEA,#4A8BC2,#2E6299,#1E466E)',
    category: 'botez',
    badge: '👶 Băiat',
  },
  {
    id: 'steluta',
    name: 'STÉLUȚĂ',
    icon: '⭐',
    tagline: 'Strălucire naturală',
    headline: 'Luminos de la primul moment.',
    hook: 'Verde smarald cu accente aurii — rafinament neutru pentru un botez de excepție.',
bullets: [
  'Dashboard confirmări invitați',
  'Localizare GPS eveniment',
  'Tablou de bord participare',
  'Export listă invitați (Excel)',
  'Link personalizat cu editări nelimitate',
  'Actualizare instant a informațiilor',
  'Invitații nelimitate',
  'Acces 12 luni, fără abonament'
],      accent: '#059669',
    accentText: '#fff',
    pillBg: '#D1FAE5',
    pillText: '#065F46',
    barGrad: 'linear-gradient(90deg,#022c22,#047857,#059669,#34d399,#059669,#047857,#022c22)',
    category: 'botez',
    badge: '🧸 Unisex',
  },
  {
    id: 'baloane',
    name: 'BALOANE',
    icon: '🎈',
    tagline: 'Bucurie pură',
    headline: 'Sărbătoarea ei a început.',
    hook: 'Roz-lavandă și baloane colorate — o petrecere de botez gata de amintiri.',
bullets: [
  'Dashboard confirmări invitați',
  'Localizare GPS eveniment',
  'Tablou de bord participare',
  'Export listă invitați (Excel)',
  'Link personalizat cu editări nelimitate',
  'Actualizare instant a informațiilor',
  'Invitații nelimitate',
  'Acces 12 luni, fără abonament'
],      accent: '#E46BAE',
    accentText: '#fff',
    pillBg: '#FCEAF4',
    pillText: '#5B3A66',
    barGrad: 'linear-gradient(90deg,#5B3A66,#C44A8C,#E46BAE,#BFA7F2,#E46BAE,#C44A8C,#5B3A66)',
    category: 'botez',
    badge: '👧 Fată',
  },
  {
    id: 'fluture',
    name: 'FLUTURE',
    icon: '🦋',
    tagline: 'Delicată & fermecătoare',
    headline: 'Micuța ta a sosit.',
    hook: 'Roz-vișiniu cu fluturi delicați și flori de primăvară — pentru prințesa care schimbă totul.',
bullets: [
  'Dashboard confirmări invitați',
  'Localizare GPS eveniment',
  'Tablou de bord participare',
  'Export listă invitați (Excel)',
  'Link personalizat cu editări nelimitate',
  'Actualizare instant a informațiilor',
  'Invitații nelimitate',
  'Acces 12 luni, fără abonament'
],      accent: '#E35A87',
    accentText: '#fff',
    pillBg: '#F8DCE7',
    pillText: '#7A2E4D',
    barGrad: 'linear-gradient(90deg,#7A2E4D,#C94772,#E35A87,#F7C1D5,#E35A87,#C94772,#7A2E4D)',
    category: 'botez',
    badge: '👧 Fată',
  },
  {
    id: 'ursulet',
    name: 'URSULEȚ',
    icon: '🐻',
    tagline: 'Cald & iubit',
    headline: 'Bej cald, suflet mare.',
    hook: 'Bej-caramel cu accente albastre delicate — un botez cu căldură, potrivit oricărui copil.',
bullets: [
  'Dashboard confirmări invitați',
  'Localizare GPS eveniment',
  'Tablou de bord participare',
  'Export listă invitați (Excel)',
  'Link personalizat cu editări nelimitate',
  'Actualizare instant a informațiilor',
  'Invitații nelimitate',
  'Acces 12 luni, fără abonament'
],      accent: '#59B0E3',
    accentText: '#fff',
    pillBg: '#F5EAD9',
    pillText: '#76563F',
    barGrad: 'linear-gradient(90deg,#76563F,#3A8CBF,#59B0E3,#B8D8F0,#59B0E3,#3A8CBF,#76563F)',
    category: 'botez',
    badge: '🧸 Unisex',
  },
]

export default function CheckoutPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>('nunta')
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null)
  const [emailFocused, setEmailFocused] = useState(false)

  const emailBlockRef = useRef<HTMLDivElement>(null)

  const isReady = accepted && privacyAccepted && email.includes('@') && email.length > 4
  const filteredThemes = THEMES.filter((t) => t.category === activeCategory)
  const selectedTheme = THEMES.find((t) => t.id === selectedThemeId) ?? null

  const handleSelectTheme = (themeId: string, isCurrentlyOn: boolean) => {
    const newId = isCurrentlyOn ? null : themeId
    setSelectedThemeId(newId)
    if (!isCurrentlyOn) {
      setTimeout(() => {
        emailBlockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    }
  }

  const handlePayment = async () => {
    if (!selectedTheme) return
    if (!accepted || !privacyAccepted) {
      alert('Trebuie să accepți Termenii și Politica de Confidențialitate.')
      return
    }
    if (!email || !email.includes('@')) {
      alert('Te rugăm să introduci o adresă de email validă!')
      return
    }
    const stripe = THEME_STRIPE[selectedTheme.id]
    if (!stripe) { alert('Tema selectată nu este disponibilă momentan.'); return }
    setLoading(selectedTheme.id)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, priceId: stripe.priceId, productId: stripe.productId, themeName: selectedTheme.id }),
      })
      const data = await res.json()
      if (res.ok && data.url) { window.location.href = data.url }
      else { alert(data.error || 'Eroare la inițierea plății.'); setLoading('') }
    } catch { alert('A apărut o eroare de conexiune.'); setLoading('') }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pg-root {
          font-family: 'DM Sans', sans-serif;
          background: #0E0C09;
          color: #1A1208;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
        }

        .pg-topbar {
          position: sticky; top: 0; z-index: 60;
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px clamp(16px, 5vw, 32px);
          background: rgba(14,12,9,0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .pg-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: #fff; letter-spacing: 0.02em; }
        .pg-logo em { font-style: italic; color: #C9A84C; }
        .pg-secure { font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.38); display: flex; align-items: center; gap: 5px; }

        .pg-scroll { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; }

        .pg-hero {
          background: #0E0C09;
          padding: clamp(40px, 8vw, 72px) clamp(16px, 5vw, 32px) clamp(32px, 6vw, 56px);
          text-align: center;
        }
        .pg-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(201,168,76,0.12); border: 1px solid rgba(201,168,76,0.28);
          border-radius: 100px; padding: 5px 14px; margin-bottom: 20px;
          font-size: 11px; font-weight: 700; color: #C9A84C;
          text-transform: uppercase; letter-spacing: 0.12em;
        }
        .pg-hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 7vw, 60px);
          font-weight: 300; line-height: 1.12; color: #fff;
          margin-bottom: 16px;
        }
        .pg-hero-h1 em { font-style: italic; color: #C9A84C; }
        .pg-hero-sub {
          font-size: clamp(14px, 3.5vw, 16px); color: rgba(255,255,255,0.45);
          line-height: 1.65; max-width: 500px; margin: 0 auto 32px;
        }
        .pg-trust-row {
          display: flex; align-items: center; justify-content: center;
          gap: clamp(16px, 4vw, 32px); flex-wrap: wrap;
        }
        .pg-trust-item {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.35);
        }
        .pg-trust-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.15); }

        .pg-content {
          background: #F8F5F1;
          border-radius: 28px 28px 0 0;
          padding: clamp(28px, 5vw, 48px) clamp(16px, 5vw, 32px) 140px;
          min-height: 60vh;
        }
        .pg-inner { max-width: 800px; margin: 0 auto; }

        .pg-section-label {
          font-size: 10px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.14em; color: rgba(26,18,8,0.3);
          margin-bottom: 12px;
        }

        .pg-cat-wrap {
          background: #EDEAE5; border-radius: 18px; padding: 5px;
          display: flex; gap: 6px; margin-bottom: 32px;
        }
        .pg-cat-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 16px; border-radius: 14px; border: none;
          font-family: inherit; font-size: clamp(13px, 3.5vw, 15px); font-weight: 600;
          cursor: pointer; transition: all 0.22s cubic-bezier(.4,0,.2,1);
          -webkit-tap-highlight-color: transparent; touch-action: manipulation;
          min-height: 50px; outline: none;
        }
        .pg-cat-btn-on  { background: #1A1208; color: #fff; box-shadow: 0 4px 16px rgba(26,18,8,0.22); }
        .pg-cat-btn-off { background: transparent; color: rgba(26,18,8,0.42); }
        .pg-cat-btn-off:hover { color: rgba(26,18,8,0.7); background: rgba(26,18,8,0.05); }

        .pg-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-bottom: 36px;
        }
        @media (min-width: 620px) {
          .pg-grid { grid-template-columns: 1fr 1fr; }
        }

        .pg-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1);
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          border: 2px solid transparent;
          display: flex; flex-direction: column;
        }
        .pg-card:hover { transform: translateY(-3px); }
        .pg-card:active { transform: scale(0.985); }
        .pg-card-on {
          border-color: var(--c-accent);
          box-shadow: 0 0 0 4px var(--c-accent-glow), 0 12px 40px rgba(0,0,0,0.12);
          transform: translateY(-3px);
        }
        .pg-card-off { box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
        .pg-card-off:hover { box-shadow: 0 6px 28px rgba(0,0,0,0.1); }

        .pg-ribbon {
          position: absolute; top: 16px; right: -1px;
          display: flex; align-items: center; gap: 4px;
          padding: 4px 12px 4px 10px;
          border-radius: 100px 0 0 100px;
          font-size: 10px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.08em;
          white-space: nowrap; z-index: 2;
        }

        .pg-card-bar { height: 5px; flex-shrink: 0; }
        .pg-card-body { padding: clamp(16px,4vw,22px); flex: 1; display: flex; flex-direction: column; }
        .pg-card-top { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 16px; }
        .pg-card-icon {
          width: 54px; height: 54px; min-width: 54px;
          border-radius: 14px; display: flex; align-items: center;
          justify-content: center; font-size: 26px; flex-shrink: 0;
        }
        .pg-card-meta { flex: 1; min-width: 0; }
        .pg-card-badge-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 5px; }
        .pg-card-tagline {
          font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; border-radius: 100px;
          padding: 3px 10px; white-space: nowrap;
        }
        .pg-card-cat-badge {
          font-size: 10px; font-weight: 600;
          background: #F2F0ED; color: rgba(26,18,8,0.45);
          border-radius: 100px; padding: 3px 9px; white-space: nowrap;
        }
        .pg-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 5vw, 28px);
          font-weight: 600; line-height: 1.1; margin-bottom: 4px;
        }
        .pg-card-hook {
          font-size: clamp(12px, 3vw, 13px); line-height: 1.55;
          color: rgba(26,18,8,0.48); overflow-wrap: break-word;
        }
        .pg-card-div { height: 1px; background: rgba(0,0,0,0.06); margin: 14px 0; }
        .pg-card-bullets { display: flex; flex-direction: column; gap: 7px; margin-bottom: 18px; }
        .pg-card-bullet {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: clamp(11px, 2.8vw, 12px); color: rgba(26,18,8,0.6); line-height: 1.4;
        }
        .pg-card-bullet-dot {
          width: 16px; height: 16px; min-width: 16px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 800; color: #fff; flex-shrink: 0; margin-top: 1px;
        }
        .pg-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: auto; padding-top: 14px;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .pg-card-price { display: flex; align-items: baseline; gap: 5px; }
        .pg-card-price-main { font-size: 24px; font-weight: 700; color: #1A1208; }
        .pg-card-price-sub { font-size: 11px; color: rgba(26,18,8,0.35); font-weight: 400; }
        .pg-card-select {
          display: flex; align-items: center; gap: 6px;
          padding: 9px 16px; border-radius: 100px; border: 2px solid transparent;
          font-family: inherit; font-size: 12px; font-weight: 700;
          cursor: pointer; transition: all 0.18s; white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
        .pg-card-select:hover { opacity: 0.85; }

        .pg-email-block {
          background: #fff; border-radius: 20px;
          padding: clamp(20px, 5vw, 28px);
          box-shadow: 0 2px 16px rgba(0,0,0,0.05);
          margin-bottom: 20px;
          scroll-margin-top: 24px;
        }
        .pg-email-label {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: rgba(26,18,8,0.4); margin-bottom: 10px;
          display: block;
        }
        .pg-email-input {
          display: block; width: 100%;
          padding: 15px 16px;
          border-radius: 13px;
          font-size: max(16px,1em) !important;
          font-family: inherit; color: #1A1208;
          background: #F8F5F1;
          border: 1.5px solid #E8E4DF;
          transition: border-color 0.2s, box-shadow 0.2s;
          -webkit-appearance: none; appearance: none;
          outline: none; caret-color: #FF6B00;
          margin-bottom: 20px;
        }
        .pg-email-input:focus {
          border-color: #FF6B00;
          box-shadow: 0 0 0 3px rgba(255,107,0,0.12);
        }
        .pg-divider { height: 1px; background: rgba(0,0,0,0.07); margin-bottom: 18px; }
        .pg-check-row {
          display: flex; gap: 12px; align-items: flex-start;
          cursor: pointer; margin-bottom: 14px;
        }
        .pg-check-row:last-child { margin-bottom: 0; }
        .pg-check-text {
          font-size: clamp(12px,3.2vw,13px); color: rgba(26,18,8,0.52);
          line-height: 1.6;
        }
        .pg-check-link {
          color: #1A1208; font-weight: 700;
          text-decoration: underline; text-underline-offset: 3px;
        }

        .pg-cta-bar {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
          background: rgba(14,12,9,0.97);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 14px clamp(16px,5vw,32px) max(14px,env(safe-area-inset-bottom));
        }
        .pg-cta-inner {
          max-width: 800px; margin: 0 auto;
          display: flex; align-items: center; gap: 14px;
        }
        .pg-cta-recap { flex: 1; min-width: 0; }
        .pg-cta-recap-hint { font-size: 11px; color: rgba(255,255,255,0.32); font-weight: 400; margin-bottom: 1px; }
        .pg-cta-recap-name {
          font-size: 14px; font-weight: 700; color: #fff;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .pg-cta-recap-empty { font-size: 13px; color: rgba(255,255,255,0.28); }
        .pg-cta-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 16px 28px; border-radius: 14px; border: none; outline: none;
          font-family: inherit; font-size: clamp(14px,3.5vw,15px); font-weight: 700;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          transition: opacity 0.18s, transform 0.15s;
          -webkit-tap-highlight-color: transparent; touch-action: manipulation;
          min-width: 180px;
        }
        .pg-cta-btn:active { transform: scale(0.97); }
        .pg-cta-btn-ready { background: #FF6B00; color: #fff; box-shadow: 0 4px 24px rgba(255,107,0,0.4); }
        .pg-cta-btn-disabled { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.22); cursor: not-allowed; }

        @media (max-width: 500px) {
          .pg-cta-inner { flex-direction: column; gap: 10px; }
          .pg-cta-btn { width: 100%; min-width: unset; }
        }
      `}</style>

      <div className="pg-root">

        <div className="pg-topbar">
          <span className="pg-logo">Vibe<em>Invite</em></span>
          <span className="pg-secure">🔒 Plată securizată Stripe</span>
        </div>

        <div className="pg-scroll">

          <div className="pg-hero">
            <div className="pg-hero-eyebrow">
              <span>💌</span> Invitații digitale premium
            </div>
            <h1 className="pg-hero-h1">
              Invitația care face<br /><em>prima impresie</em>
            </h1>
            <p className="pg-hero-sub">
              Alege tema, completează email-ul și primești accesul imediat după plată.
              O singură dată. Fără abonament. Fără surprize.
            </p>
<div className="pg-trust-row">
  <span className="pg-trust-item">✓ Acces 12 luni, fără abonament</span>
  <span className="pg-trust-dot" />
  <span className="pg-trust-item">✓ Dashboard invitați & participare</span>
  <span className="pg-trust-dot" />
  <span className="pg-trust-item">✓ Editări nelimitate, actualizare instant</span>
  <span className="pg-trust-dot" />
  <span className="pg-trust-item">✓ Invitații nelimitate</span>
  <span className="pg-trust-dot" />
  <span className="pg-trust-item">✓ Localizare GPS eveniment</span>
  <span className="pg-trust-dot" />
  <span className="pg-trust-item">✓ Export listă invitați (Excel)</span>
  <span className="pg-trust-dot" />
  <span className="pg-trust-item">✓ Album foto colectiv 25 GB</span>
  <span className="pg-trust-dot" />
  <span className="pg-trust-item">✓ Meniu personalizat eveniment</span>
  <span className="pg-trust-dot" />
  <span className="pg-trust-item">✓ Link personalizat editabil</span>
  <span className="pg-trust-dot" />
  <span className="pg-trust-item">✓ Plată unică 300 Lei</span>
</div>
          </div>

          <div className="pg-content">
            <div className="pg-inner">

              <p className="pg-section-label">Categorie eveniment</p>
              <div className="pg-cat-wrap">
                {([
                  { id: 'nunta' as Category, icon: '💍', label: 'Nunți' },
                  { id: 'botez' as Category, icon: '🕊️', label: 'Botez' },
                ]).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`pg-cat-btn ${activeCategory === c.id ? 'pg-cat-btn-on' : 'pg-cat-btn-off'}`}
                    onClick={() => { setActiveCategory(c.id); setSelectedThemeId(null) }}
                  >
                    <span style={{ fontSize: 18 }}>{c.icon}</span>
                    {c.label}
                  </button>
                ))}
              </div>

              <p className="pg-section-label" style={{ marginBottom: 16 }}>
                {filteredThemes.length} teme disponibile · 300 Lei 
              </p>

              <div className="pg-grid">
                {filteredThemes.map((theme) => {
                  const isOn = selectedThemeId === theme.id
                  return (
                    <div
                      key={theme.id}
                      className={`pg-card ${isOn ? 'pg-card-on' : 'pg-card-off'}`}
                      style={{
                        '--c-accent': theme.accent,
                        '--c-accent-glow': theme.accent + '28',
                      } as React.CSSProperties}
                      onClick={() => handleSelectTheme(theme.id, isOn)}
                    >
                      {theme.popular && (
                        <div
                          className="pg-ribbon"
                          style={{ background: theme.accent, color: theme.accentText }}
                        >
                          ⭐ Cel mai ales
                        </div>
                      )}

                      <div className="pg-card-bar" style={{ background: theme.barGrad }} />

                      <div className="pg-card-body">
                        <div className="pg-card-top">
                          <div className="pg-card-icon" style={{ background: theme.pillBg }}>
                            {theme.icon}
                          </div>
                          <div className="pg-card-meta">
                            <div className="pg-card-badge-row">
                              <span
                                className="pg-card-tagline"
                                style={{ background: theme.pillBg, color: theme.pillText }}
                              >
                                {theme.tagline}
                              </span>
                              {theme.badge && (
                                <span className="pg-card-cat-badge">{theme.badge}</span>
                              )}
                            </div>
                            <div className="pg-card-name" style={{ color: theme.accent }}>
                              {theme.name}
                            </div>
                          </div>
                        </div>

                        <p style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 'clamp(16px,4vw,19px)',
                          fontWeight: 600,
                          lineHeight: 1.3,
                          color: '#1A1208',
                          marginBottom: 6,
                        }}>
                          {theme.headline}
                        </p>
                        <p className="pg-card-hook">{theme.hook}</p>

                        <div className="pg-card-div" />

                        <div className="pg-card-bullets">
                          {theme.bullets.map((b, i) => (
                            <div key={i} className="pg-card-bullet">
                              <div
                                className="pg-card-bullet-dot"
                                style={{ background: theme.accent }}
                              >
                                ✓
                              </div>
                              {b}
                            </div>
                          ))}
                        </div>

                        <div className="pg-card-footer">
                          <div className="pg-card-price">
                            <span className="pg-card-price-main">300 Lei</span>
                            <span className="pg-card-price-sub">· o singură dată</span>
                          </div>
                          <button
                            type="button"
                            className="pg-card-select"
                            onClick={(e) => { e.stopPropagation(); handleSelectTheme(theme.id, isOn) }}
                            style={isOn
                              ? { background: theme.accent, color: theme.accentText, borderColor: theme.accent }
                              : { background: theme.pillBg, color: theme.pillText, borderColor: 'transparent' }
                            }
                          >
                            {isOn ? '✓ Selectată' : 'Alege tema'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="pg-email-block" ref={emailBlockRef}>
                <p className="pg-section-label" style={{ marginBottom: 14 }}>📧 Date de acces</p>
                <label htmlFor="pg-email" className="pg-email-label">
                  Email — vei primi accesul imediat după plată
                </label>
                <input
                  id="pg-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  placeholder="nume@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className="pg-email-input"
                />
                <div className="pg-divider" />
                <div className="pg-check-row" onClick={() => setAccepted((v) => !v)}>
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                    style={{ width: 18, height: 18, minWidth: 18, accentColor: '#1A1208', cursor: 'pointer', marginTop: 2, flexShrink: 0 }}
                  />
                  <span className="pg-check-text">
                    Sunt de acord cu{' '}
                    <a href="/termeni" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="pg-check-link">
                      Termenii și Condițiile
                    </a>
                    {' '}și confirm că am dreptul legal de a prelucra datele invitaților.
                  </span>
                </div>
                <div className="pg-check-row" onClick={() => setPrivacyAccepted((v) => !v)}>
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                    style={{ width: 18, height: 18, minWidth: 18, accentColor: '#1A1208', cursor: 'pointer', marginTop: 2, flexShrink: 0 }}
                  />
                  <span className="pg-check-text">
                    Am citit și accept{' '}
                    <a href="/politica" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="pg-check-link">
                      Politica de Confidențialitate
                    </a>
                    {' '}și prelucrarea datelor conform GDPR.
                  </span>
                </div>
              </div>

              <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(26,18,8,0.32)', lineHeight: 1.6 }}>
                <strong style={{ color: 'rgba(26,18,8,0.5)' }}>Plată unică · Acces permanent.</strong>{' '}
                Inclus: dashboard invitați, meniu personalizat și album foto colectiv.
              </p>

            </div>
          </div>
        </div>

        <div className="pg-cta-bar">
          <div className="pg-cta-inner">
            <div className="pg-cta-recap">
              {selectedTheme ? (
                <>
                  <p className="pg-cta-recap-hint">Temă selectată</p>
                  <p className="pg-cta-recap-name">
                    {selectedTheme.icon} {selectedTheme.name}
                    <span style={{ color: selectedTheme.accent, marginLeft: 8 }}>· 300 Lei</span>
                  </p>
                </>
              ) : (
                <p className="pg-cta-recap-empty">👆 Selectează o temă pentru a continua</p>
              )}
            </div>
            <button
              type="button"
              className={`pg-cta-btn ${selectedTheme && isReady && loading === '' ? 'pg-cta-btn-ready' : 'pg-cta-btn-disabled'}`}
              disabled={!selectedTheme || !isReady || loading !== ''}
              onClick={handlePayment}
            >
              {loading !== '' ? 'Se procesează…' : 'Continuă către plată →'}
            </button>
          </div>
        </div>

      </div>
    </>
  )
}