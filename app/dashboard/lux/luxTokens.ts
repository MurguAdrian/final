// FIȘIER: andre/app/dashboard/lux/luxTokens.ts
// MODIFICĂRI FAȚĂ DE ROMANTIC:
//   - Culori: romantic rose/cream → lux gold/black
//   - Fonturi: Playfair/Cormorant/Cinzel/Lato → Cormorant/Cinzel/Lato (same, dar fără Playfair în body)
//   - Import tokens: romanticTokens → luxTokens

export const C = {
  // Gold / Auriu
  crimson:        '#8B6914',
  rose:           '#D4AF37',
  peony:          '#F5D678',
  blush:          '#C9A84C',
  blush2:         '#E8D08A',
  blush3:         '#1A1408',
  petal:          '#2A1F06',

  // Dark backgrounds
  cream:          '#0A0803',
  cream2:         '#0E0C06',
  creamBg:        '#0A0803',
  creamDeep:      '#050401',

  // Aur accent
  gold:           '#D4AF37',
  gold2:          '#F5D678',

  // Texte
  dark:           '#F5E6A8',
  text:           '#F5D678',
  textLight:      '#C9A84C',
  textMuted:      '#8B6914',

  // Borduri & Overlay
  borderFaint:    'rgba(212,175,55,0.08)',
  borderLight:    'rgba(212,175,55,0.15)',
  borderMed:      'rgba(212,175,55,0.25)',
  borderStrong:   'rgba(212,175,55,0.45)',
  roseFaint:      'rgba(212,175,55,0.05)',
  roseDim:        'rgba(212,175,55,0.6)',
  roseAlpha08:    'rgba(212,175,55,0.08)',
  roseAlpha12:    'rgba(212,175,55,0.12)',

  // Overlay modal
  overlayBg:      'rgba(5,4,1,0.85)',

  // Status
  successGreen:   '#15803D',
  successBg:      '#DCFCE7',
  successBorder:  '#86EFAC',
  errorRed:       '#B91C1C',
  warningOrange:  '#C2410C',

  // White
  white:          '#0A0803',
  whiteSoft:      '#0E0C06',
} as const;

export const F = {
  display:   "'Cormorant Garamond', serif",
  heading:   "'Cinzel', serif",
  body:      "'Cormorant Garamond', serif",
  ui:        "'Lato', sans-serif",
  serif:     "'Cormorant Garamond', serif",
} as const;

// ─── FONT SIZES ──────────────────────────────────────────
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

// ─── SPACING ─────────────────────────────────────────────
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

// ─── BORDER RADIUS ───────────────────────────────────────
export const BR = {
  sm:     6,
  md:     10,
  lg:     12,
  xl:     14,
  xxl:    18,
  pill:   100,
  circle: '50%',
} as const;

// ─── ICON SIZES ──────────────────────────────────────────
export const IS = {
  xs:   12,
  sm:   13,
  md:   14,
  lg:   15,
  xl:   16,
  xxl:  18,
  hero: 26,
} as const;

// ─── SHADOWS ─────────────────────────────────────────────
export const SH = {
  card:        '0 2px 16px rgba(212,175,55,0.04), inset 0 1px 0 rgba(245,214,120,0.05)',
  cardHover:   '0 8px 32px rgba(212,175,55,0.08), 0 0 0 1px rgba(245,214,120,0.15)',
  cardActive:  '0 8px 32px rgba(212,175,55,0.09), inset 0 1px 0 rgba(245,214,120,0.12)',
  modal:       '0 24px 64px rgba(0,0,0,0.8)',
  sidebar:     '4px 0 30px rgba(212,175,55,0.06)',
  btnRose:     '0 6px 22px rgba(139,105,20,0.35)',
  btnRoseHover:'0 14px 40px rgba(212,175,55,0.45)',
  btnSave:     '0 10px 36px rgba(212,175,55,0.35)',
  toggleGlow:  '0 0 14px rgba(212,175,55,0.4)',
} as const;

// ─── LAYOUT ──────────────────────────────────────────────
export const LY = {
  sidebarWidth:  248,
  mobileHeaderH: 56,
  tabletNavH:    48,
  mobileNavH:    68,
  bpMobile:  767,
  bpTablet:  1023,
} as const;

// ─── GRADIENTS ───────────────────────────────────────────
export const GR = {
  roseBtn:     `linear-gradient(135deg, #8B6914 0%, #D4AF37 50%, #F5D678 100%)`,
  roseBtnFull: `linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)`,
  sidebar:     `linear-gradient(180deg, #0A0803 0%, #050401 100%)`,
  cardActive:  `linear-gradient(160deg, rgba(26,20,8,0.9) 0%, rgba(42,31,6,0.55) 100%)`,
  cardInactive:`rgba(14,12,6,0.5)`,
  masterActive:`linear-gradient(160deg, rgba(26,20,8,0.88) 0%, rgba(42,31,6,0.6) 100%)`,
  bgAtmosphere: `
    radial-gradient(ellipse 70% 60% at 15% 50%, rgba(212,175,55,0.06) 0%, transparent 55%),
    radial-gradient(ellipse 50% 40% at 85% 80%, rgba(139,105,20,0.05) 0%, transparent 50%)
  `,
} as const;

// ─── ANIMAȚII ────────────────────────────────────────────
export const KEYFRAMES = `
  @keyframes rm-spin      { from { transform: rotate(0deg) }   to { transform: rotate(360deg) } }
  @keyframes rm-fade-in   { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes rm-pulse     { 0%,100% { opacity: 1 } 50% { opacity: .5 } }
  @keyframes rm-shimmer   { 0% { background-position: -350px 0 } 100% { background-position: 350px 0 } }
  @keyframes rm-heartbeat { 0%{transform:scale(1)} 14%{transform:scale(1.18)} 28%{transform:scale(1)} 42%{transform:scale(1.1)} 70%{transform:scale(1)} 100%{transform:scale(1)} }
  @keyframes rm-float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
`;