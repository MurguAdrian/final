
// 'use client'

// import { useState } from 'react'

// const THEME_STRIPE: Record<string, { productId: string; priceId: string }> = {
//   lux:      { productId: 'prod_TODO_LUX',       priceId: 'price_1TQR40DLRG6cKGjIoripBApH' },
//   nature:   { productId: 'prod_TODO_NATURE',    priceId: 'price_1TQR3UDLRG6cKGjIUYoD8nVZ' },
//   boho:     { productId: 'prod_UWtAhTz7QpGP2m', priceId: 'price_1TXpNtDLRG6cKGjIYlxLA2fP' },
//   royal:    { productId: 'prod_UbiaArWhOjNjF2', priceId: 'price_1TcV9iDLRG6cKGjIcPjYoUoK' },
//   minimal:  { productId: 'prod_UWtBC0f4i3qLIg', priceId: 'price_1TXpP8DLRG6cKGjIWTkmUYUn' },
//   romantic: { productId: 'prod_UWtCXrDQ6We3Du', priceId: 'price_1TXpPlDLRG6cKGjIGRosuloE' },
// }

// type Theme = {
//   id: string
//   name: string
//   icon: string
//   tagline: string
//   desc: string
//   accent: string
//   accentText: string
//   pillBg: string
//   pillText: string
//   barGrad: string
//   category: 'nunta' | 'aniversare' | 'botez'
// }

// const THEMES: Theme[] = [
//   {
//     id: 'lux',
//     name: 'Tema LUX',
//     icon: '✨',
//     tagline: 'Opulență & Grandoare',
//     desc: 'Aur veritabil pe negru profund. Invitație digitală care impresionează înainte de eveniment.',
//     accent: '#C9A84C',
//     accentText: '#1A1208',
//     pillBg: '#FFF8E6',
//     pillText: '#7D5A1E',
//     barGrad: 'linear-gradient(90deg,#7D5A1E,#C9A84C,#E8C96A,#C9A84C,#7D5A1E)',
//     category: 'nunta',
//   },
//   {
//     id: 'nature',
//     name: 'Tema NATURE',
//     icon: '🌿',
//     tagline: 'Prospețime & Nou Început',
//     desc: 'Tonuri botanice de verde mint. Perfectă pentru cupluri care iubesc natura și aerul curat.',
//     accent: '#2D6A4F',
//     accentText: '#fff',
//     pillBg: '#D8F3DC',
//     pillText: '#1B4332',
//     barGrad: 'linear-gradient(90deg,#1B4332,#2D6A4F,#52B788,#2D6A4F,#1B4332)',
//     category: 'nunta',
//   },
//   {
//     id: 'boho',
//     name: 'Tema BOHO',
//     icon: '🌸',
//     tagline: 'Libertate & Autenticitate',
//     desc: 'Terracotta cald și roz prăfuit. O invitație ca o îmbrățișare caldă — cu suflet și naturalețe.',
//     accent: '#C47A5A',
//     accentText: '#fff',
//     pillBg: '#FDE8DC',
//     pillText: '#7D3C1E',
//     barGrad: 'linear-gradient(90deg,#7D3C1E,#C47A5A,#E8A87C,#C47A5A,#7D3C1E)',
//     category: 'nunta',
//   },
//   {
//     id: 'royal',
//     name: 'Tema ROYAL',
//     icon: '👑',
//     tagline: 'Majestate & Eleganță Regală',
//     desc: 'Albastru regal profund cu argintiu. Inspirat din palatele europene — pentru nunți de poveste.',
//     accent: '#2C3E8C',
//     accentText: '#fff',
//     pillBg: '#EEF2FF',
//     pillText: '#1A2654',
//     barGrad: 'linear-gradient(90deg,#0f1a3d,#2C3E8C,#8B9FE8,#2C3E8C,#0f1a3d)',
//     category: 'nunta',
//   },
//   {
//     id: 'minimal',
//     name: 'Tema MINIMAL',
//     icon: '⬜',
//     tagline: 'Mai Puțin Înseamnă Mai Mult',
//     desc: 'Alb imaculat și negru pur. Pentru cupluri moderne care cred că eleganța stă în simplitate.',
//     accent: '#1A1208',
//     accentText: '#fff',
//     pillBg: '#F2F0ED',
//     pillText: '#1A1208',
//     barGrad: 'linear-gradient(90deg,#000,#1A1208,#5A4F44,#1A1208,#000)',
//     category: 'nunta',
//   },
//   {
//     id: 'romantic',
//     name: 'Tema ROMANTIC',
//     icon: '🌹',
//     tagline: 'Iubire & Pasiune Eternă',
//     desc: 'Roșu trandafiriu și bujori. O declarație de dragoste în sine — caldă, senzorială, de neuitat.',
//     accent: '#9B2335',
//     accentText: '#fff',
//     pillBg: '#FDEAED',
//     pillText: '#6B1520',
//     barGrad: 'linear-gradient(90deg,#4a0a11,#9B2335,#D4687A,#9B2335,#4a0a11)',
//     category: 'nunta',
//   },
// ]

// type TabId = 'toate' | 'nunta' | 'aniversare' | 'botez'

// const TABS: { id: TabId; label: string; icon: string }[] = [
//   { id: 'toate',      label: 'Toate',      icon: '🎉' },
//   { id: 'nunta',      label: 'Nuntă',      icon: '💍' },
//   { id: 'aniversare', label: 'Aniversare', icon: '🎂' },
//   { id: 'botez',      label: 'Botez',      icon: '🕊️' },
// ]

// export default function CheckoutPage() {
//   const [email, setEmail]              = useState('')
//   const [loading, setLoading]          = useState('')
//   const [accepted, setAccepted]        = useState(false)
//   const [privacyAccepted, setPrivacyAccepted] = useState(false)
//   const [activeTab, setActiveTab]      = useState<TabId>('toate')
//   const [emailFocused, setEmailFocused]= useState(false)

//   const isReady = accepted && privacyAccepted && email.includes('@') && email.length > 4

//   const filteredThemes =
//     activeTab === 'toate' ? THEMES : THEMES.filter((t) => t.category === activeTab)

//   const handlePayment = async (theme: Theme) => {
//     if (!accepted || !privacyAccepted) {
//       alert('Trebuie să accepți Termenii, Politica de Confidențialitate și colectarea datelor pentru a continua.')
//       return
//     }
//     if (!email || !email.includes('@')) {
//       alert('Te rugăm să introduci o adresă de email validă!')
//       return
//     }
//     const stripe = THEME_STRIPE[theme.id]
//     if (!stripe) {
//       alert('Tema selectată nu este disponibilă momentan.')
//       return
//     }
//     setLoading(theme.id)
//     try {
//       const res = await fetch('/api/checkout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email,
//           priceId: stripe.priceId,
//           productId: stripe.productId,
//           themeName: theme.id,
//         }),
//       })
//       const data = await res.json()
//       if (res.ok && data.url) {
//         window.location.href = data.url
//       } else {
//         alert(data.error || 'Eroare la inițierea plății.')
//         setLoading('')
//       }
//     } catch {
//       alert('A apărut o eroare de conexiune.')
//       setLoading('')
//     }
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');

//         /* ── ROOT ── */
//         .co-root {
//           font-family: 'DM Sans', sans-serif;
//           background: #FDFAF6;
//           color: #1A1208;
//           min-height: 100dvh;
//           display: flex;
//           flex-direction: column;
//           overflow-x: hidden;
//         }
//         .co-scroll { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; }
//         .co-inner {
//           max-width: 720px;
//           margin: 0 auto;
//           padding: clamp(24px, 5vw, 40px) clamp(16px, 5vw, 20px) clamp(60px, 10vw, 80px);
//         }

//         /* ── INPUT ── */
//         .co-input {
//           display: block;
//           width: 100%;
//           padding: 14px 16px;
//           border-radius: 12px;
//           font-size: max(16px, 1em) !important; /* anti-zoom iOS */
//           line-height: 1.5;
//           font-family: inherit;
//           color: #1A1208;
//           background: #FDFAF6;
//           box-sizing: border-box;
//           caret-color: #FF6B00;
//           -webkit-appearance: none;
//           appearance: none;
//           transition: border-color 0.2s, box-shadow 0.2s;
//           scroll-margin-top: 16px;
//           scroll-margin-bottom: 16px;
//         }
//         .co-input:focus { outline: none; }
//         @media (hover: none) and (pointer: coarse) {
//           .co-input:focus { outline: none !important; box-shadow: none !important; }
//           button:focus { outline: none !important; }
//         }

//         /* ── TABS ── */
//         .co-tabs::-webkit-scrollbar { display: none; }
//         .co-tab {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           flex-shrink: 0;
//           padding: 9px clamp(12px, 3vw, 16px);
//           border-radius: 100px;
//           font-size: clamp(12px, 3.2vw, 13px);
//           font-family: inherit;
//           cursor: pointer;
//           transition: background 0.18s, color 0.18s;
//           -webkit-tap-highlight-color: transparent;
//           touch-action: manipulation;
//           min-height: 44px;
//           outline: none;
//         }
//         .co-tab-active   { border: 1.5px solid #1A1208; background: #1A1208; color: #fff; font-weight: 600; box-shadow: 0 2px 8px rgba(26,18,8,0.15); }
//         .co-tab-inactive { border: 1.5px solid rgba(0,0,0,0.12); background: #fff; color: rgba(26,18,8,0.6); font-weight: 500; }

//         /* ── PAY BUTTON ── */
//         .co-pay-btn {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           padding: 11px 22px;
//           border-radius: 100px;
//           border: none;
//           outline: none;
//           font-size: clamp(12px, 3.2vw, 13px);
//           font-weight: 600;
//           font-family: inherit;
//           white-space: nowrap;
//           transition: opacity 0.2s;
//           -webkit-tap-highlight-color: transparent;
//           touch-action: manipulation;
//           min-height: 44px;
//         }

//         /* ── CHECKBOX ROWS ── */
//         .co-check-row { display: flex; gap: 12px; align-items: flex-start; cursor: pointer; }
//         .co-check-row + .co-check-row { margin-top: 14px; }

//         /* ── THEME CARD LAYOUT ── */
//         /* Mobile-first: stacked */
//         .co-card-body {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//           padding: clamp(14px, 4vw, 20px);
//         }
//         .co-card-top {
//           display: flex;
//           align-items: flex-start;
//           gap: clamp(12px, 3vw, 16px);
//         }
//         .co-card-bottom {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 12px;
//         }
//         .co-pay-btn-mobile {
//           flex: 1;
//         }

//         /* Tablet+: side-by-side (original layout) */
//         @media (min-width: 480px) {
//           .co-card-body {
//             flex-direction: row;
//             align-items: center;
//             gap: clamp(12px, 3vw, 16px);
//             padding: clamp(16px, 4vw, 20px);
//           }
//           .co-card-top {
//             flex: 1;
//             min-width: 0;
//           }
//           .co-card-bottom {
//             flex-direction: column;
//             align-items: flex-end;
//             justify-content: flex-start;
//             flex-shrink: 0;
//             gap: 10px;
//           }
//           .co-pay-btn-mobile {
//             flex: unset;
//           }
//         }

//         /* ── TAGLINE PILL ── */
//         .co-tagline {
//           font-size: clamp(10px, 2.5vw, 11px);
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.07em;
//           overflow-wrap: break-word;
//           word-break: break-word;
//         }

//         /* ── THEME DESC ── */
//         .co-desc {
//           font-size: clamp(12px, 3.2vw, 12.5px);
//           line-height: 1.5;
//           margin: 0;
//           overflow-wrap: break-word;
//           word-break: break-word;
//         }

//         /* ── THEME NAME ── */
//         .co-theme-name {
//           font-size: clamp(17px, 4.5vw, 21px);
//           font-weight: 600;
//           line-height: 1.2;
//           overflow-wrap: break-word;
//           word-break: break-word;
//         }

//         /* ── TOP BAR ── */
//         .co-topbar {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           flex-shrink: 0;
//           padding: clamp(10px, 2.5vw, 14px) clamp(16px, 5vw, 24px);
//           background: #1A1208;
//         }
//         .co-topbar-lock {
//           font-size: clamp(10px, 2.5vw, 11px);
//           font-weight: 500;
//           color: rgba(255,255,255,0.5);
//         }
//       `}</style>

//       <div className="co-root">

//         {/* Top bar */}
//         <div className="co-topbar">
//           <span className="font-serif text-xl font-semibold text-white tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
//             Vibe<em className="italic" style={{ color: '#C9A84C' }}>Invite</em>
//           </span>
//           <span className="co-topbar-lock">🔒 Plată securizată Stripe</span>
//         </div>

//         {/* Scroll area */}
//         <div className="co-scroll">
//           <div className="co-inner">

//             {/* Title */}
//             <div className="text-center mb-9">
//               <div className="inline-flex items-center gap-1.5 bg-[#FFF4ED] border border-orange-200 rounded-full px-3.5 py-1 mb-4" style={{ fontSize: 'clamp(10px,2.5vw,11px)', fontWeight: 700, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
//                 💌 Invitații digitale nuntă
//               </div>
//               <h1 className="font-light leading-tight text-[#1A1208] mb-2.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px, 5vw, 42px)', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
//                 Alege tema{' '}
//                 <em className="italic" style={{ color: '#FF6B00' }}>invitației</em>
//                 {' '}tale
//               </h1>
//               <p className="leading-relaxed max-w-md mx-auto" style={{ fontSize: 'clamp(13px, 3.5vw, 14px)', color: 'rgba(26,18,8,0.55)', overflowWrap: 'break-word' }}>
//                 Introdu email-ul, alege o temă și finalizează comanda.
//                 Accesul la invitația ta de nuntă online sosește imediat după plată.
//               </p>
//             </div>

//             {/* Email + Terms card */}
//             <div className="bg-white border border-black/[0.07] rounded-2xl p-6 mb-9 shadow-sm">
//               <label htmlFor="co-email" className="block font-semibold text-[#1A1208] uppercase tracking-widest mb-2" style={{ fontSize: 'clamp(11px, 2.8vw, 12px)' }}>
//                 Email pentru acces
//               </label>
//               <input
//                 id="co-email"
//                 type="email"
//                 inputMode="email"
//                 autoComplete="email"
//                 autoCorrect="off"
//                 autoCapitalize="off"
//                 spellCheck={false}
//                 placeholder="nume@gmail.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 onFocus={() => setEmailFocused(true)}
//                 onBlur={() => setEmailFocused(false)}
//                 className="co-input"
//                 style={{
//                   border: emailFocused ? '1.5px solid #FF6B00' : '1.5px solid #E8E4DF',
//                   boxShadow: emailFocused ? '0 0 0 3px rgba(255,107,0,0.12)' : 'none',
//                 }}
//               />

//               <div className="h-px bg-black/[0.06] my-5" />

//               <div
//                 className="co-check-row"
//                 onClick={() => setAccepted((v) => !v)}
//               >
//                 <input
//                   type="checkbox"
//                   checked={accepted}
//                   onChange={(e) => setAccepted(e.target.checked)}
//                   onClick={(e) => e.stopPropagation()}
//                   className="mt-0.5 flex-shrink-0"
//                   style={{ width: 18, height: 18, minWidth: 18, accentColor: '#1A1208', cursor: 'pointer' }}
//                 />
//                 <span className="leading-relaxed" style={{ fontSize: 'clamp(12px, 3.2vw, 13px)', color: 'rgba(26,18,8,0.6)' }}>
//                   Sunt de acord cu{' '}
//                   <a
//                     href="/termeni"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     onClick={(e) => e.stopPropagation()}
//                     className="text-[#1A1208] font-semibold underline underline-offset-2"
//                   >
//                     Termenii și Condițiile
//                   </a>
//                   {' '}și confirm că am dreptul legal de a prelucra datele invitaților.
//                 </span>
//               </div>

//               <div
//                 className="co-check-row"
//                 onClick={() => setPrivacyAccepted((v) => !v)}
//               >
//                 <input
//                   type="checkbox"
//                   checked={privacyAccepted}
//                   onChange={(e) => setPrivacyAccepted(e.target.checked)}
//                   onClick={(e) => e.stopPropagation()}
//                   className="mt-0.5 flex-shrink-0"
//                   style={{ width: 18, height: 18, minWidth: 18, accentColor: '#1A1208', cursor: 'pointer' }}
//                 />
//                 <span className="leading-relaxed" style={{ fontSize: 'clamp(12px, 3.2vw, 13px)', color: 'rgba(26,18,8,0.6)' }}>
//                   Am citit și accept Politica de Confidențialitate și prelucrarea datelor conform GDPR.
//                 </span>
//               </div>
//             </div>

//             {/* Tabs */}
//             <div className="mb-5">
//               <p className="font-bold uppercase text-[#1A1208]/40 mb-3.5" style={{ fontSize: 'clamp(10px, 2.5vw, 11px)', letterSpacing: '0.08em' }}>
//                 Teme disponibile · 300 Lei fiecare
//               </p>
//               <div
//                 className="co-tabs flex gap-2 overflow-x-auto pb-0.5"
//                 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
//               >
//                 {TABS.map((tab) => (
//                   <button
//                     key={tab.id}
//                     type="button"
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`co-tab ${activeTab === tab.id ? 'co-tab-active' : 'co-tab-inactive'}`}
//                   >
//                     <span style={{ fontSize: 14 }}>{tab.icon}</span>
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Theme cards */}
//             <div className="flex flex-col gap-3.5">
//               {filteredThemes.length === 0 ? (
//                 <div className="text-center py-12 px-6 bg-white rounded-2xl border border-black/[0.07] leading-relaxed" style={{ fontSize: 'clamp(13px, 3.5vw, 14px)', color: 'rgba(26,18,8,0.4)' }}>
//                   <div className="text-3xl mb-3">🚧</div>
//                   <strong className="block mb-1" style={{ color: 'rgba(26,18,8,0.65)' }}>În curând</strong>
//                   Temele pentru această categorie sunt în pregătire.
//                 </div>
//               ) : (
//                 filteredThemes.map((theme) => {
//                   const isLoading  = loading === theme.id
//                   const anyLoading = loading !== ''
//                   return (
//                     <div
//                       key={theme.id}
//                       className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden"
//                       style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
//                     >
//                       <div style={{ height: 3, background: theme.barGrad }} />

//                       <div className="co-card-body">
//                         {/* Top section: icon + info */}
//                         <div className="co-card-top">
//                           {/* Icon */}
//                           <div
//                             className="flex-shrink-0 flex items-center justify-center rounded-2xl"
//                             style={{ width: 52, height: 52, minWidth: 52, background: theme.pillBg, fontSize: 24 }}
//                           >
//                             {theme.icon}
//                           </div>

//                           {/* Info */}
//                           <div className="flex-1 min-w-0">
//                             <div
//                               className="co-tagline inline-flex items-center rounded-full mb-1.5 px-2.5 py-0.5"
//                               style={{ background: theme.pillBg, color: theme.pillText }}
//                             >
//                               {theme.tagline}
//                             </div>
//                             <div
//                               className="co-theme-name mb-1"
//                               style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.accent }}
//                             >
//                               {theme.name}
//                             </div>
//                             <p className="co-desc" style={{ color: 'rgba(26,18,8,0.55)' }}>
//                               {theme.desc}
//                             </p>
//                           </div>
//                         </div>

//                         {/* Bottom section: price + CTA */}
//                         <div className="co-card-bottom">
//                           <span className="text-lg font-bold text-[#1A1208] whitespace-nowrap">
//                             300 Lei
//                           </span>
//                           <button
//                             type="button"
//                             onClick={() => handlePayment(theme)}
//                             disabled={anyLoading || !isReady}
//                             className="co-pay-btn co-pay-btn-mobile"
//                             style={{
//                               background: isLoading ? '#ccc' : theme.accent,
//                               color: isLoading ? '#666' : theme.accentText,
//                               opacity: anyLoading || !isReady ? 0.45 : 1,
//                               cursor: anyLoading || !isReady ? 'not-allowed' : 'pointer',
//                             }}
//                           >
//                             {isLoading ? 'Se încarcă...' : 'Alege →'}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 })
//               )}
//             </div>

//             <p className="text-center mt-7 leading-relaxed" style={{ fontSize: 'clamp(11px, 2.8vw, 12px)', color: 'rgba(26,18,8,0.4)' }}>
//               <strong style={{ color: 'rgba(26,18,8,0.65)' }}>Plată unică · Acces permanent.</strong>{' '}
//               Invitațiile personalizate nuntă includ dashboard invitați, meniu QR și album foto colectiv.
//             </p>

//           </div>
//         </div>
//       </div>
//     </>
//   )
// }



// andre/app/checkout/page.tsx
'use client'

import { useState } from 'react'

const THEME_STRIPE: Record<string, { productId: string; priceId: string }> = {
  lux:      { productId: 'prod_TODO_LUX',       priceId: 'price_1TQR40DLRG6cKGjIoripBApH' },
  nature:   { productId: 'prod_TODO_NATURE',    priceId: 'price_1TQR3UDLRG6cKGjIUYoD8nVZ' },
  boho:     { productId: 'prod_UWtAhTz7QpGP2m', priceId: 'price_1TXpNtDLRG6cKGjIYlxLA2fP' },
  royal:    { productId: 'prod_UbiaArWhOjNjF2', priceId: 'price_1TcV9iDLRG6cKGjIcPjYoUoK' },
  minimal:  { productId: 'prod_UWtBC0f4i3qLIg', priceId: 'price_1TXpP8DLRG6cKGjIWTkmUYUn' },
  romantic: { productId: 'prod_UWtCXrDQ6We3Du', priceId: 'price_1TXpPlDLRG6cKGjIGRosuloE' },
  botezb1:  { productId: 'prod_TODO_BOTEZB1',   priceId: 'price_TODO_BOTEZB1' },
  botezb2:  { productId: 'prod_TODO_BOTEZB2',   priceId: 'price_TODO_BOTEZB2' },
  botezf1:  { productId: 'prod_TODO_BOTEZF1',   priceId: 'price_TODO_BOTEZF1' },
  botezf2:  { productId: 'prod_TODO_BOTEZF2',   priceId: 'price_TODO_BOTEZF2' },
  botezn1:  { productId: 'prod_TODO_BOTEZN1',   priceId: 'price_TODO_BOTEZN1' },
  botezn2:  { productId: 'prod_TODO_BOTEZN2',   priceId: 'price_TODO_BOTEZN2' },
}

type Category = 'nunta' | 'botez'

type Theme = {
  id: string
  name: string
  icon: string
  tagline: string
  desc: string
  accent: string
  accentText: string
  pillBg: string
  pillText: string
  barGrad: string
  category: Category
  badge?: string
}

const THEMES: Theme[] = [
  {
    id: 'lux',
    name: 'Tema LUX',
    icon: '✨',
    tagline: 'Opulență & Grandoare',
    desc: 'Aur veritabil pe negru profund. Invitație digitală care impresionează înainte de eveniment.',
    accent: '#C9A84C',
    accentText: '#1A1208',
    pillBg: '#FFF8E6',
    pillText: '#7D5A1E',
    barGrad: 'linear-gradient(90deg,#7D5A1E,#C9A84C,#E8C96A,#C9A84C,#7D5A1E)',
    category: 'nunta',
  },
  {
    id: 'nature',
    name: 'Tema NATURE',
    icon: '🌿',
    tagline: 'Prospețime & Nou Început',
    desc: 'Tonuri botanice de verde mint. Perfectă pentru cupluri care iubesc natura și aerul curat.',
    accent: '#2D6A4F',
    accentText: '#fff',
    pillBg: '#D8F3DC',
    pillText: '#1B4332',
    barGrad: 'linear-gradient(90deg,#1B4332,#2D6A4F,#52B788,#2D6A4F,#1B4332)',
    category: 'nunta',
  },
  {
    id: 'boho',
    name: 'Tema BOHO',
    icon: '🌸',
    tagline: 'Libertate & Autenticitate',
    desc: 'Terracotta cald și roz prăfuit. O invitație ca o îmbrățișare caldă — cu suflet și naturalețe.',
    accent: '#C47A5A',
    accentText: '#fff',
    pillBg: '#FDE8DC',
    pillText: '#7D3C1E',
    barGrad: 'linear-gradient(90deg,#7D3C1E,#C47A5A,#E8A87C,#C47A5A,#7D3C1E)',
    category: 'nunta',
  },
  {
    id: 'royal',
    name: 'Tema ROYAL',
    icon: '👑',
    tagline: 'Majestate & Eleganță Regală',
    desc: 'Albastru regal profund cu argintiu. Inspirat din palatele europene — pentru nunți de poveste.',
    accent: '#2C3E8C',
    accentText: '#fff',
    pillBg: '#EEF2FF',
    pillText: '#1A2654',
    barGrad: 'linear-gradient(90deg,#0f1a3d,#2C3E8C,#8B9FE8,#2C3E8C,#0f1a3d)',
    category: 'nunta',
  },
  {
    id: 'minimal',
    name: 'Tema MINIMAL',
    icon: '⬜',
    tagline: 'Mai Puțin Înseamnă Mai Mult',
    desc: 'Alb imaculat și negru pur. Pentru cupluri moderne care cred că eleganța stă în simplitate.',
    accent: '#1A1208',
    accentText: '#fff',
    pillBg: '#F2F0ED',
    pillText: '#1A1208',
    barGrad: 'linear-gradient(90deg,#000,#1A1208,#5A4F44,#1A1208,#000)',
    category: 'nunta',
  },
  {
    id: 'romantic',
    name: 'Tema ROMANTIC',
    icon: '🌹',
    tagline: 'Iubire & Pasiune Eternă',
    desc: 'Roșu trandafiriu și bujori. O declarație de dragoste în sine — caldă, senzorială, de neuitat.',
    accent: '#9B2335',
    accentText: '#fff',
    pillBg: '#FDEAED',
    pillText: '#6B1520',
    barGrad: 'linear-gradient(90deg,#4a0a11,#9B2335,#D4687A,#9B2335,#4a0a11)',
    category: 'nunta',
  },
  {
    id: 'botezb1',
    name: 'Tema MAȘINUȚĂ',
    icon: '🚗',
    tagline: 'Aventura Începe Acum',
    desc: 'Mașinuțe și culori primare vesele. Perfectă pentru un botez de băiețel plin de energie și culoare.',
    accent: '#1E6BB8',
    accentText: '#fff',
    pillBg: '#DDEEFF',
    pillText: '#0A3D6B',
    barGrad: 'linear-gradient(90deg,#0A3D6B,#1E6BB8,#5BA3E8,#1E6BB8,#0A3D6B)',
    category: 'botez',
    badge: '👶 Băiat',
  },
  {
    id: 'botezb2',
    name: 'Tema ASTRONAUT',
    icon: '🚀',
    tagline: 'Până la Stele și Înapoi',
    desc: 'Rachete, stele și cosmos albastru închis. O invitație de botez care lansează micul explorator în univers.',
    accent: '#2D1B6B',
    accentText: '#fff',
    pillBg: '#EBE6FF',
    pillText: '#1A0A4A',
    barGrad: 'linear-gradient(90deg,#0D0728,#2D1B6B,#7B5FC4,#2D1B6B,#0D0728)',
    category: 'botez',
    badge: '👶 Băiat',
  },
  {
    id: 'botezf1',
    name: 'Tema FLUTURE',
    icon: '🦋',
    tagline: 'Delicată ca un Fluture',
    desc: 'Lavandă și roz pudrat cu fluturi delicați. O invitație de botez fermecătoare pentru micuța prințesă.',
    accent: '#A855C8',
    accentText: '#fff',
    pillBg: '#F5E8FF',
    pillText: '#6B2A8A',
    barGrad: 'linear-gradient(90deg,#4A0D6B,#A855C8,#D4A0F0,#A855C8,#4A0D6B)',
    category: 'botez',
    badge: '👧 Fată',
  },
  {
    id: 'botezf2',
    name: 'Tema BALOANE',
    icon: '🎈',
    tagline: 'Bucurie & Sărbătoare',
    desc: 'Baloane colorate pe roz coral. O petrecere de botez plină de voie bună și amintiri frumoase.',
    accent: '#E84393',
    accentText: '#fff',
    pillBg: '#FFE8F3',
    pillText: '#8A1550',
    barGrad: 'linear-gradient(90deg,#8A1550,#E84393,#F5A0CF,#E84393,#8A1550)',
    category: 'botez',
    badge: '👧 Fată',
  },
  {
    id: 'botezn1',
    name: 'Tema URSULEȚ',
    icon: '🧸',
    tagline: 'Cald & Iubit',
    desc: 'Bej cald și maro caramel cu ursuleți. Un botez cu suflet, potrivit oricărui copil și oricărei familii.',
    accent: '#8B5E3C',
    accentText: '#fff',
    pillBg: '#F5EAD8',
    pillText: '#5C3518',
    barGrad: 'linear-gradient(90deg,#3D2010,#8B5E3C,#C4956A,#8B5E3C,#3D2010)',
    category: 'botez',
    badge: '🧸 Unisex',
  },
  {
    id: 'botezn2',
    name: 'Tema SCLIPICI',
    icon: '🌟',
    tagline: 'Elegant & Strălucitor',
    desc: 'Alb perla cu accente aurii și sclipici discret. Botez elegant, neutru, de un rafinament aparte.',
    accent: '#B8920A',
    accentText: '#fff',
    pillBg: '#FBF5D8',
    pillText: '#6B5200',
    barGrad: 'linear-gradient(90deg,#5C4200,#B8920A,#E8CC6A,#B8920A,#5C4200)',
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

  const isReady = accepted && privacyAccepted && email.includes('@') && email.length > 4

  const filteredThemes = THEMES.filter((t) => t.category === activeCategory)
  const selectedTheme = THEMES.find((t) => t.id === selectedThemeId) ?? null

  const handlePayment = async () => {
    if (!selectedTheme) return
    if (!accepted || !privacyAccepted) {
      alert('Trebuie să accepți Termenii, Politica de Confidențialitate și colectarea datelor pentru a continua.')
      return
    }
    if (!email || !email.includes('@')) {
      alert('Te rugăm să introduci o adresă de email validă!')
      return
    }
    const stripe = THEME_STRIPE[selectedTheme.id]
    if (!stripe) {
      alert('Tema selectată nu este disponibilă momentan.')
      return
    }
    setLoading(selectedTheme.id)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          priceId: stripe.priceId,
          productId: stripe.productId,
          themeName: selectedTheme.id,
        }),
      })
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Eroare la inițierea plății.')
        setLoading('')
      }
    } catch {
      alert('A apărut o eroare de conexiune.')
      setLoading('')
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .co-root {
          font-family: 'DM Sans', sans-serif;
          background: #F8F5F1;
          color: #1A1208;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }

        .co-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          padding: 14px clamp(16px, 5vw, 28px);
          background: #1A1208;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .co-scroll { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; }

        .co-inner {
          max-width: 780px;
          margin: 0 auto;
          padding: clamp(28px, 5vw, 48px) clamp(16px, 5vw, 24px) 120px;
        }

        /* ── CATEGORY TABS ── */
        .co-cat-tabs {
          display: flex;
          gap: 8px;
          background: #EDEAE5;
          border-radius: 16px;
          padding: 5px;
        }
        .co-cat-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 16px;
          border-radius: 12px;
          border: none;
          font-family: inherit;
          font-size: clamp(13px, 3.5vw, 14px);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          min-height: 48px;
          outline: none;
        }
        .co-cat-tab-active {
          background: #1A1208;
          color: #fff;
          box-shadow: 0 2px 12px rgba(26,18,8,0.2);
        }
        .co-cat-tab-inactive {
          background: transparent;
          color: rgba(26,18,8,0.5);
        }

        /* ── THEME CARDS ── */
        .co-theme-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          position: relative;
        }
        .co-theme-card:active { transform: scale(0.985); }
        .co-theme-card-selected {
          box-shadow: 0 0 0 2.5px var(--card-accent), 0 8px 32px rgba(0,0,0,0.1);
        }
        .co-theme-card-unselected {
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }

        .co-card-body {
          padding: clamp(16px, 4vw, 24px);
          display: flex;
          gap: clamp(14px, 3vw, 20px);
          align-items: flex-start;
        }

        .co-card-icon {
          flex-shrink: 0;
          width: 60px;
          height: 60px;
          min-width: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        .co-card-info { flex: 1; min-width: 0; }

        .co-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 6px;
        }

        .co-pill {
          display: inline-flex;
          align-items: center;
          border-radius: 100px;
          padding: 3px 10px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        .co-badge {
          display: inline-flex;
          align-items: center;
          border-radius: 100px;
          padding: 3px 9px;
          font-size: 10px;
          font-weight: 600;
          background: #F2F0ED;
          color: rgba(26,18,8,0.5);
          white-space: nowrap;
        }

        .co-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(20px, 5vw, 26px);
          font-weight: 600;
          line-height: 1.15;
          margin-bottom: 6px;
          overflow-wrap: break-word;
        }

        .co-card-desc {
          font-size: clamp(12px, 3.2vw, 13px);
          line-height: 1.55;
          color: rgba(26,18,8,0.5);
          overflow-wrap: break-word;
          margin: 0;
        }

        .co-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px clamp(16px, 4vw, 24px);
          border-top: 1px solid rgba(0,0,0,0.06);
          background: rgba(0,0,0,0.015);
        }

        .co-select-indicator {
          width: 24px;
          height: 24px;
          min-width: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          transition: all 0.2s;
        }
        .co-select-indicator-on {
          color: #fff;
        }
        .co-select-indicator-off {
          border: 2px solid rgba(0,0,0,0.15);
          background: transparent;
        }

        /* ── EMAIL CARD ── */
        .co-email-card {
          background: #fff;
          border-radius: 20px;
          padding: clamp(20px, 5vw, 28px);
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }

        .co-input {
          display: block;
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          font-size: max(16px, 1em) !important;
          line-height: 1.5;
          font-family: inherit;
          color: #1A1208;
          background: #F8F5F1;
          border: 1.5px solid #E8E4DF;
          box-sizing: border-box;
          caret-color: #FF6B00;
          -webkit-appearance: none;
          appearance: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .co-input-focused {
          border-color: #FF6B00 !important;
          box-shadow: 0 0 0 3px rgba(255,107,0,0.12) !important;
        }

        /* ── STICKY CTA ── */
        .co-sticky-cta {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 40;
          background: rgba(248,245,241,0.97);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(0,0,0,0.08);
          padding: 12px clamp(16px, 5vw, 24px) max(12px, env(safe-area-inset-bottom));
        }

        .co-cta-inner {
          max-width: 780px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .co-cta-recap {
          flex: 1;
          min-width: 0;
        }

        .co-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 15px 28px;
          border-radius: 14px;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: clamp(14px, 3.5vw, 15px);
          font-weight: 700;
          white-space: nowrap;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          flex-shrink: 0;
        }
        .co-cta-btn:active { transform: scale(0.97); }

        .co-check-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          cursor: pointer;
        }
        .co-check-row + .co-check-row { margin-top: 14px; }

        @media (max-width: 480px) {
          .co-cta-inner { flex-direction: column; gap: 10px; }
          .co-cta-btn { width: 100%; }
        }
      `}</style>

      <div className="co-root">

        {/* Top bar */}
        <div className="co-topbar">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: '#fff', letterSpacing: '0.02em' }}>
            Vibe<em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Invite</em>
          </span>
          <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 5 }}>
            🔒 Plată securizată Stripe
          </span>
        </div>

        <div className="co-scroll">
          <div className="co-inner">

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FFF4ED', border: '1px solid #FDDCB5', borderRadius: 100, padding: '5px 14px', marginBottom: 16, fontSize: 11, fontWeight: 700, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                💌 Invitații digitale premium
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 6vw, 46px)', fontWeight: 300, lineHeight: 1.2, color: '#1A1208', margin: '0 0 12px' }}>
                Alege tema{' '}
                <em style={{ fontStyle: 'italic', color: '#FF6B00' }}>perfectă</em>
              </h1>
              <p style={{ fontSize: 'clamp(13px, 3.5vw, 15px)', color: 'rgba(26,18,8,0.5)', maxWidth: 460, margin: '0 auto', lineHeight: 1.6 }}>
                Selectează o temă, completează email-ul și finalizează comanda în câteva secunde.
              </p>
            </div>

            {/* Category tabs */}
            <div style={{ marginBottom: 28 }}>
              <div className="co-cat-tabs">
                {([
                  { id: 'nunta' as Category, icon: '💍', label: 'Nunți' },
                  { id: 'botez' as Category, icon: '🕊️', label: 'Botez' },
                ]).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => { setActiveCategory(cat.id); setSelectedThemeId(null) }}
                    className={`co-cat-tab ${activeCategory === cat.id ? 'co-cat-tab-active' : 'co-cat-tab-inactive'}`}
                  >
                    <span style={{ fontSize: 18 }}>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Themes label */}
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(26,18,8,0.35)', marginBottom: 14 }}>
              {filteredThemes.length} teme disponibile · 300 Lei fiecare
            </p>

            {/* Theme cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
              {filteredThemes.map((theme) => {
                const isSelected = selectedThemeId === theme.id
                return (
                  <div
                    key={theme.id}
                    className={`co-theme-card ${isSelected ? 'co-theme-card-selected' : 'co-theme-card-unselected'}`}
                    style={{ '--card-accent': theme.accent } as React.CSSProperties}
                    onClick={() => setSelectedThemeId(isSelected ? null : theme.id)}
                  >
                    <div style={{ height: 4, background: theme.barGrad }} />

                    <div className="co-card-body">
                      <div className="co-card-icon" style={{ background: theme.pillBg }}>
                        {theme.icon}
                      </div>

                      <div className="co-card-info">
                        <div className="co-card-meta">
                          <span className="co-pill" style={{ background: theme.pillBg, color: theme.pillText }}>
                            {theme.tagline}
                          </span>
                          {theme.badge && (
                            <span className="co-badge">{theme.badge}</span>
                          )}
                        </div>
                        <div className="co-card-name" style={{ color: theme.accent }}>
                          {theme.name}
                        </div>
                        <p className="co-card-desc">{theme.desc}</p>
                      </div>
                    </div>

                    <div className="co-card-footer">
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                        <span style={{ fontSize: 22, fontWeight: 700, color: '#1A1208' }}>300 Lei</span>
                        <span style={{ fontSize: 12, color: 'rgba(26,18,8,0.4)', fontWeight: 400 }}>· plată unică</span>
                      </div>
                      <div
                        className={`co-select-indicator ${isSelected ? 'co-select-indicator-on' : 'co-select-indicator-off'}`}
                        style={isSelected ? { background: theme.accent } : {}}
                      >
                        {isSelected ? '✓' : ''}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Email + Terms */}
            <div className="co-email-card">
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(26,18,8,0.4)', marginBottom: 16 }}>
                📧 Date de acces
              </p>

              <label htmlFor="co-email" style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1A1208', marginBottom: 8 }}>
                Email pentru acces la dashboard
              </label>
              <input
                id="co-email"
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
                className={`co-input ${emailFocused ? 'co-input-focused' : ''}`}
              />

              <div style={{ height: 1, background: 'rgba(0,0,0,0.07)', margin: '20px 0' }} />

              <div
                className="co-check-row"
                onClick={() => setAccepted((v) => !v)}
              >
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ width: 18, height: 18, minWidth: 18, accentColor: '#1A1208', cursor: 'pointer', marginTop: 2 }}
                />
                <span style={{ fontSize: 'clamp(12px, 3.2vw, 13px)', color: 'rgba(26,18,8,0.55)', lineHeight: 1.55 }}>
                  Sunt de acord cu{' '}
                  <a
                    href="/termeni"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: '#1A1208', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3 }}
                  >
                    Termenii și Condițiile
                  </a>
                  {' '}și confirm că am dreptul legal de a prelucra datele invitaților.
                </span>
              </div>

              <div
                className="co-check-row"
                onClick={() => setPrivacyAccepted((v) => !v)}
              >
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ width: 18, height: 18, minWidth: 18, accentColor: '#1A1208', cursor: 'pointer', marginTop: 2 }}
                />
                <span style={{ fontSize: 'clamp(12px, 3.2vw, 13px)', color: 'rgba(26,18,8,0.55)', lineHeight: 1.55 }}>
                  Am citit și accept{' '}
                  <a
                    href="/confidentialitate"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: '#1A1208', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3 }}
                  >
                    Politica de Confidențialitate
                  </a>
                  {' '}și prelucrarea datelor conform GDPR.
                </span>
              </div>
            </div>

            <p style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'rgba(26,18,8,0.35)', lineHeight: 1.6 }}>
              <strong style={{ color: 'rgba(26,18,8,0.55)' }}>Plată unică · Acces permanent.</strong>{' '}
              Inclus: dashboard invitați, meniu QR și album foto colectiv.
            </p>

          </div>
        </div>

        {/* Sticky CTA */}
        <div className="co-sticky-cta">
          <div className="co-cta-inner">
            <div className="co-cta-recap">
              {selectedTheme ? (
                <>
                  <p style={{ margin: 0, fontSize: 12, color: 'rgba(26,18,8,0.45)', fontWeight: 500 }}>Temă selectată</p>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1A1208', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {selectedTheme.icon} {selectedTheme.name} · <span style={{ color: selectedTheme.accent }}>300 Lei</span>
                  </p>
                </>
              ) : (
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(26,18,8,0.4)', fontWeight: 400 }}>
                  👆 Selectează o temă pentru a continua
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={!selectedTheme || !isReady || loading !== ''}
              className="co-cta-btn"
              style={{
                background: selectedTheme && isReady && loading === '' ? selectedTheme.accent : '#D0CBC4',
                color: selectedTheme && isReady && loading === '' ? selectedTheme.accentText : 'rgba(26,18,8,0.35)',
                cursor: !selectedTheme || !isReady || loading !== '' ? 'not-allowed' : 'pointer',
                opacity: !selectedTheme || !isReady || loading !== '' ? 0.7 : 1,
              }}
            >
              {loading !== '' ? (
                <>Se procesează…</>
              ) : (
                <>Continuă către plată →</>
              )}
            </button>
          </div>
        </div>

      </div>
    </>
  )
}