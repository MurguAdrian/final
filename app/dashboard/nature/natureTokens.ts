export const C = {
  // Verzi / Forest
  crimson:        '#274422',
  rose:           '#3A5E33',
  peony:          '#5C8A52',
  blush:          '#A8C89A',
  blush2:         '#C8DEC2',
  blush3:         '#F0F5EE',
  petal:          '#DCE8D6',
 
  // Creme / Ivory Natural
  cream:          '#FDFAF2',
  cream2:         '#F3EED8',
  creamBg:        '#FFFFFF',
  creamDeep:      '#EDF5E8',
 
  // Aur / Honey
  gold:           '#C9A84C',
  gold2:          '#E5D4A0',
 
  // Texte
  dark:           '#0F172A',
  text:           '#1C2218',
  textLight:      '#4A6741',
  textMuted:      '#6B7A5E',
 
  // Borduri & Overlay
  borderFaint:    'rgba(26,38,20,0.08)',
  borderLight:    'rgba(26,38,20,0.15)',
  borderMed:      'rgba(26,38,20,0.25)',
  borderStrong:   'rgba(26,38,20,0.45)',
  roseFaint:      'rgba(58,94,51,0.05)',
  roseDim:        'rgba(58,94,51,0.6)',
  roseAlpha08:    'rgba(58,94,51,0.08)',
  roseAlpha12:    'rgba(58,94,51,0.12)',
 
  // Overlay modal
  overlayBg:      'rgba(15,23,42,0.6)',
 
  // Status
  successGreen:   '#15803D',
  successBg:      '#DCFCE7',
  successBorder:  '#86EFAC',
  errorRed:       '#B91C1C',
  warningOrange:  '#C2410C',
 
  // White
  white:          '#FFFFFF',
  whiteSoft:      '#F8FAFC',
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
  card:        '0 2px 16px rgba(26,38,20,0.04), inset 0 1px 0 rgba(58,94,51,0.05)',
  cardHover:   '0 8px 32px rgba(26,38,20,0.08), 0 0 0 1px rgba(58,94,51,0.15)',
  cardActive:  '0 8px 32px rgba(26,38,20,0.09), inset 0 1px 0 rgba(255,255,255,0.8)',
  modal:       '0 24px 64px rgba(20,40,18,0.25)',
  sidebar:     '4px 0 30px rgba(26,38,20,0.06)',
  btnRose:     '0 6px 22px rgba(26,38,20,0.25)',
  btnRoseHover:'0 14px 40px rgba(26,38,20,0.38)',
  btnSave:     '0 10px 36px rgba(26,38,20,0.35)',
  toggleGlow:  '0 0 14px rgba(26,38,20,0.28)',
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
  cardActive:  `linear-gradient(160deg, rgba(253,250,242,0.9) 0%, rgba(220,232,214,0.55) 100%)`,
  cardInactive:`rgba(253,250,242,0.5)`,
  masterActive:`linear-gradient(160deg, rgba(253,250,242,0.88) 0%, rgba(220,232,214,0.6) 100%)`,
  bgAtmosphere: `
    radial-gradient(ellipse 70% 60% at 15% 50%, rgba(168,200,154,0.1) 0%, transparent 55%),
    radial-gradient(ellipse 50% 40% at 85% 80%, rgba(58,94,51,0.06) 0%, transparent 50%)
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