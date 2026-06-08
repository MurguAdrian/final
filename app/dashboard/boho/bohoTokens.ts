export const C = {
  // Teracotă / Sienna / Rust
  crimson:        '#7A3B1E',
  rose:           '#A0522D',
  peony:          '#C1714A',
  blush:          '#E5B89A',
  blush2:         '#F0D5C0',
  blush3:         '#FAF3EE',
  petal:          '#F5E0D0',

  // Ecru / Linen / Sand
  cream:          '#F9F4EE',
  cream2:         '#F0E8DC',
  creamBg:        '#FDFAF6',
  creamDeep:      '#F2E9DC',

  // Aur pământiu
  gold:           '#A08840',
  gold2:          '#D4B880',

  // Texte (dark espresso / warm brown)
  dark:           '#2C1A0E',
  text:           '#3D2314',
  textLight:      '#6B4226',
  textMuted:      '#8B6347',

  // Borduri & Overlay
  borderFaint:    'rgba(44,26,14,0.08)',
  borderLight:    'rgba(44,26,14,0.15)',
  borderMed:      'rgba(44,26,14,0.25)',
  borderStrong:   'rgba(44,26,14,0.45)',
  roseFaint:      'rgba(160,82,45,0.05)',
  roseDim:        'rgba(160,82,45,0.6)',
  roseAlpha08:    'rgba(160,82,45,0.08)',
  roseAlpha12:    'rgba(160,82,45,0.12)',

  // Overlay modal
  overlayBg:      'rgba(44,26,14,0.6)',

  // Status
  successGreen:   '#15803D',
  successBg:      '#DCFCE7',
  successBorder:  '#86EFAC',
  errorRed:       '#B91C1C',
  warningOrange:  '#C2410C',

  // White
  white:          '#FFFFFF',
  whiteSoft:      '#FAF7F4',
} as const;


export const F = {
  display:   "'Playfair Display', serif",
  heading:   "'Cinzel', serif",
  body:      "'Cormorant Garamond', serif",
  ui:        "'Lato', sans-serif",
  serif:     "'Lora', serif",
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
  card:        '0 2px 16px rgba(122,59,30,0.04), inset 0 1px 0 rgba(193,113,74,0.05)',
  cardHover:   '0 8px 32px rgba(122,59,30,0.08), 0 0 0 1px rgba(193,113,74,0.15)',
  cardActive:  '0 8px 32px rgba(122,59,30,0.09), inset 0 1px 0 rgba(255,255,255,0.8)',
  modal:       '0 24px 64px rgba(80,40,20,0.25)',
  sidebar:     '4px 0 30px rgba(122,59,30,0.06)',
  btnRose:     '0 6px 22px rgba(122,59,30,0.25)',
  btnRoseHover:'0 14px 40px rgba(122,59,30,0.38)',
  btnSave:     '0 10px 36px rgba(122,59,30,0.35)',
  toggleGlow:  '0 0 14px rgba(122,59,30,0.28)',
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
  roseBtn:     `linear-gradient(135deg, ${C.crimson} 0%, ${C.rose} 50%, ${C.peony} 100%)`,
  roseBtnFull: `linear-gradient(135deg,${C.crimson} 0%,${C.rose} 45%,${C.peony} 55%,${C.rose} 70%,${C.crimson} 100%)`,
  sidebar:     `linear-gradient(180deg, ${C.creamBg} 0%, ${C.creamDeep} 100%)`,
  cardActive:  `linear-gradient(160deg, rgba(249,244,238,0.9) 0%, rgba(245,224,208,0.55) 100%)`,
  cardInactive:`rgba(249,244,238,0.5)`,
  masterActive:`linear-gradient(160deg, rgba(249,244,238,0.88) 0%, rgba(245,224,208,0.6) 100%)`,
  bgAtmosphere: `
    radial-gradient(ellipse 70% 60% at 15% 50%, rgba(229,184,154,0.1) 0%, transparent 55%),
    radial-gradient(ellipse 50% 40% at 85% 80%, rgba(193,113,74,0.06) 0%, transparent 50%)
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