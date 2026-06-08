
export const C = {
  // Negru / Charcoal (echivalent Roșuri / Rose din Romantic)
  crimson:        '#0f0f0f',   // cel mai închis — era #7B1A2E
  rose:           '#1a1a1a',   // charcoal principal — era #A63248
  peony:          '#2d2d2d',   // gri închis — era #C4506A
  blush:          '#9ca3af',   // gri mediu — era #E8A0A8
  blush2:         '#d1d5db',   // gri deschis — era #F2C8CE
  blush3:         '#f9fafb',   // gri foarte deschis — era #FAF0F2
  petal:          '#f3f4f6',   // gri aproape alb — era #F7DDE2
 
  // Alb / Off-white (echivalent Creme / Ivory)
  cream:          '#ffffff',   // alb pur — era #FCF9F9
  cream2:         '#f9fafb',   // off-white rece — era #F5ECEE
  creamBg:        '#FFFFFF',   // alb pur — era #FFFFFF
  creamDeep:      '#f3f4f6',   // gri foarte deschis — era #F7ECEF
 
  // Argint / Gri neutru (echivalent Aur)
  gold:           '#6b7280',   // gri mediu neutru — era #B59461
  gold2:          '#e5e7eb',   // gri deschis — era #E3CDA6
 
  // Texte — identice semantic, valori ajustate pentru minimal monochromatic
  dark:           '#0F172A',   // Slate 900 — IDENTIC
  text:           '#1E293B',   // Slate 800 — IDENTIC
  textLight:      '#475569',   // Slate 600 — IDENTIC
  textMuted:      '#64748B',   // Slate 500 — IDENTIC
 
  // Borduri & Overlay — toate rgba-urile de rose devin rgba de negru
  borderFaint:    'rgba(15,23,42,0.06)',    // era rgba(30,41,59,0.08)
  borderLight:    'rgba(15,23,42,0.10)',    // era rgba(30,41,59,0.15)
  borderMed:      'rgba(15,23,42,0.14)',    // era rgba(30,41,59,0.25)
  borderStrong:   'rgba(15,23,42,0.35)',    // era rgba(30,41,59,0.45)
  roseFaint:      'rgba(26,26,26,0.04)',    // era rgba(166,50,72,0.05)
  roseDim:        'rgba(26,26,26,0.55)',    // era rgba(166,50,72,0.6)
  roseAlpha08:    'rgba(26,26,26,0.06)',    // era rgba(166,50,72,0.08)
  roseAlpha12:    'rgba(26,26,26,0.09)',    // era rgba(166,50,72,0.12)
 
  // Overlay modal
  overlayBg:      'rgba(15,23,42,0.6)',     // IDENTIC
 
  // Status — IDENTICE (nu sunt culori de temă, sunt culori semantice universale)
  successGreen:   '#15803D',
  successBg:      '#DCFCE7',
  successBorder:  '#86EFAC',
  errorRed:       '#B91C1C',
  warningOrange:  '#C2410C',
 
  // White — IDENTICE
  white:          '#FFFFFF',
  whiteSoft:      '#F8FAFC',
} as const;
 
 
export const F = {
  display:   "'Plus Jakarta Sans', sans-serif",   // era 'Playfair Display', serif
  heading:   "'DM Sans', sans-serif",             // era 'Cinzel', serif
  body:      "'Spectral', serif",                 // era 'Cormorant Garamond', serif
  ui:        "'DM Sans', sans-serif",             // era 'Lato', sans-serif
  serif:     "'Spectral', serif",                 // era 'Lora', serif
} as const;
 
// ─── FONT SIZES — IDENTICE CU ROMANTIC ───────────────────
export const FS = {
  micro:     7,
  tiny:      8,
  xs:        9,
  sm:        10,
  base:      11,
  md:        13,
  input:     16,
  titleSm:   'clamp(16px, 3vw, 22px)',
  titleMd:   'clamp(20px, 4vw, 30px)',
  titleLg:   'clamp(22px, 5vw, 38px)',
  titleXl:   'clamp(22px, 4vw, 34px)',
  statNum:   'clamp(24px, 3.5vw, 38px)',
} as const;
 
// ─── SPACING — IDENTIC CU ROMANTIC ───────────────────────
export const SP = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  24,
  xxxl: 28,
  cardPad:  'clamp(16px, 3vw, 24px)',
  mainPad:  'clamp(28px, 4vw, 52px)',
  mainPadH: 'clamp(20px, 4vw, 64px)',
} as const;
 
// ─── BORDER RADIUS — IDENTIC CU ROMANTIC ─────────────────
export const BR = {
  sm:     6,
  md:     10,
  lg:     12,
  xl:     14,
  xxl:    18,
  pill:   100,
  circle: '50%',
} as const;
 
// ─── ICON SIZES — IDENTICE CU ROMANTIC ───────────────────
export const IS = {
  xs:   12,
  sm:   13,
  md:   14,
  lg:   15,
  xl:   16,
  xxl:  18,
  hero: 26,
} as const;
 
// ─── SHADOWS — aceleași structuri dimensionale, culori → negru/gri ──────────
export const SH = {
  card:        '0 2px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(0,0,0,0.03)',
  cardHover:   '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.08)',
  cardActive:  '0 8px 32px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)',
  modal:       '0 24px 64px rgba(0,0,0,0.18)',
  sidebar:     '4px 0 30px rgba(0,0,0,0.05)',
  btnRose:     '0 6px 22px rgba(0,0,0,0.18)',
  btnRoseHover:'0 14px 40px rgba(0,0,0,0.28)',
  btnSave:     '0 10px 36px rgba(0,0,0,0.22)',
  toggleGlow:  '0 0 14px rgba(0,0,0,0.15)',
} as const;
 
// ─── LAYOUT — IDENTIC CU ROMANTIC ────────────────────────
export const LY = {
  sidebarWidth:  248,
  mobileHeaderH: 56,
  tabletNavH:    48,
  mobileNavH:    68,
  bpMobile:  767,
  bpTablet:  1023,
} as const;
 
// ─── GRADIENTS — aceleași structuri, culori → charcoal/gri ──────────────────
export const GR = {
  roseBtn:     `linear-gradient(135deg, ${C.crimson} 0%, ${C.rose} 50%, ${C.peony} 100%)`,
  roseBtnFull: `linear-gradient(135deg,${C.crimson} 0%,${C.rose} 45%,${C.peony} 55%,${C.rose} 70%,${C.crimson} 100%)`,
  sidebar:     `linear-gradient(180deg, ${C.creamBg} 0%, ${C.creamDeep} 100%)`,
  cardActive:  `linear-gradient(160deg, rgba(249,250,251,0.95) 0%, rgba(243,244,246,0.6) 100%)`,
  cardInactive:`rgba(249,250,251,0.5)`,
  masterActive:`linear-gradient(160deg, rgba(249,250,251,0.92) 0%, rgba(243,244,246,0.65) 100%)`,
  bgAtmosphere: `
    radial-gradient(ellipse 70% 60% at 15% 50%, rgba(156,163,175,0.07) 0%, transparent 55%),
    radial-gradient(ellipse 50% 40% at 85% 80%, rgba(107,114,128,0.04) 0%, transparent 50%)
  `,
} as const;
 
// ─── ANIMAȚII — IDENTICE CU ROMANTIC (doar prefixul rm- păstrat) ─────────────
export const KEYFRAMES = `
  @keyframes rm-spin      { from { transform: rotate(0deg) }   to { transform: rotate(360deg) } }
  @keyframes rm-fade-in   { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes rm-pulse     { 0%,100% { opacity: 1 } 50% { opacity: .5 } }
  @keyframes rm-shimmer   { 0% { background-position: -350px 0 } 100% { background-position: 350px 0 } }
  @keyframes rm-heartbeat { 0%{transform:scale(1)} 14%{transform:scale(1.18)} 28%{transform:scale(1)} 42%{transform:scale(1.1)} 70%{transform:scale(1)} 100%{transform:scale(1)} }
  @keyframes rm-float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
`;
 
