export const C = {
  // Verde Forest — culori principale
  forest:         '#274422',
  green:          '#3A5E33',
  fern:           '#5C8A52',
  sage:           '#7AB86A',
  mist:           '#B8D4B0',
  mist2:          '#D6EAD0',
  mist3:          '#EDF5E8',

  // Creme / Ivory
  cream:          '#FDFAF2',
  cream2:         '#F3EED8',
  creamBg:        '#FDFAF2',
  creamDeep:      '#EDF5E8',

  // Aur botanical
  gold:           '#9A7B3F',
  gold2:          '#C9A84C',

  // Texte (bleumarin-închis — același ca Romantic pentru contrast optim)
  dark:           '#0F172A',
  text:           '#1C2218',
  textLight:      '#4A5C42',
  textMuted:      '#6B7A5E',

  // Borduri & Overlay
  borderFaint:    'rgba(58,94,51,0.08)',
  borderLight:    'rgba(154,123,63,0.15)',
  borderMed:      'rgba(154,123,63,0.25)',
  borderStrong:   'rgba(58,94,51,0.45)',
  greenFaint:     'rgba(58,94,51,0.05)',
  greenDim:       'rgba(58,94,51,0.6)',
  greenAlpha08:   'rgba(58,94,51,0.08)',
  greenAlpha12:   'rgba(58,94,51,0.12)',

  // Overlay modal
  overlayBg:      'rgba(15,34,12,0.55)',

  // Status
  successGreen:   '#15803D',
  successBg:      '#DCFCE7',
  successBorder:  '#86EFAC',
  errorRed:       '#B91C1C',
  warningOrange:  '#C2410C',

  // White
  white:          '#FFFFFF',
  whiteSoft:      '#F8FAF6',
} as const;


export const F = {
  display:   "'Playfair Display', serif",
  heading:   "'Cinzel', serif",
  body:      "'Cormorant', serif",
  ui:        "'Lato', sans-serif",
  serif:     "'Cormorant', serif",
} as const;

// ─── FONT SIZES ──────────────────────────────────────────
export const FS = {
  /** 7px – micro labels, copyright */
  micro:     7,
  /** 8px – uppercase eyebrow labels */
  tiny:      8,
  /** 9px – badge text, small caps */
  xs:        9,
  /** 10px – nav labels, button text */
  sm:        10,
  /** 11px – secondary info */
  base:      11,
  /** 13px – body copy */
  md:        13,
  /**
   * 16px – input text.
   * OBLIGATORIU ≥16px pe mobile pentru a evita zoom iOS la focus.
   */
  input:     16,
  /** clamp pentru titluri responsive */
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
  /** Padding card interior */
  cardPad:  'clamp(16px, 3vw, 24px)',
  /** Padding main content */
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
  card:        '0 2px 16px rgba(39,68,34,0.05), inset 0 1px 0 rgba(58,94,51,0.06)',
  cardHover:   '0 8px 32px rgba(39,68,34,0.1), 0 0 0 1px rgba(58,94,51,0.18)',
  cardActive:  '0 8px 32px rgba(39,68,34,0.09), inset 0 1px 0 rgba(255,255,255,0.8)',
  modal:       '0 24px 64px rgba(20,40,16,0.28)',
  sidebar:     '4px 0 30px rgba(58,94,51,0.08)',
  btnGreen:    '0 6px 22px rgba(39,68,34,0.28)',
  btnGreenHover:'0 14px 40px rgba(39,68,34,0.38)',
  btnSave:     '0 10px 36px rgba(39,68,34,0.38)',
  toggleGlow:  '0 0 14px rgba(58,94,51,0.32)',
} as const;

// ─── LAYOUT ──────────────────────────────────────────────
export const LY = {
  sidebarWidth:  248,
  mobileHeaderH: 56,
  tabletNavH:    48,
  mobileNavH:    68,
  /** Breakpoints */
  bpMobile:  767,
  bpTablet:  1023,
} as const;

// ─── GRADIENTS ───────────────────────────────────────────
export const GR = {
  greenBtn:     `linear-gradient(135deg, #274422 0%, #3A5E33 50%, #5C8A52 100%)`,
  greenBtnFull: `linear-gradient(135deg,#274422 0%,#3A5E33 40%,#5C8A52 55%,#3A5E33 70%,#274422 100%)`,
  sidebar:      `linear-gradient(180deg, #FDFAF2 0%, #EDF5E8 100%)`,
  cardActive:   `linear-gradient(160deg, rgba(237,245,232,0.9) 0%, rgba(214,234,208,0.55) 100%)`,
  cardInactive: `rgba(237,245,232,0.5)`,
  masterActive: `linear-gradient(160deg, rgba(237,245,232,0.88) 0%, rgba(214,234,208,0.6) 100%)`,
  bgAtmosphere: `
    radial-gradient(ellipse 65% 55% at 16% 18%, rgba(140,190,130,0.11) 0%, transparent 55%),
    radial-gradient(ellipse 58% 50% at 84% 82%, rgba(225,205,148,0.14) 0%, transparent 55%),
    linear-gradient(155deg, #FDFAF2 0%, #F3EED8 45%, #EDF5E8 100%)
  `,
} as const;

// ─── ANIMAȚII ────────────────────────────────────────────
export const KEYFRAMES = `
  @keyframes nat-spin      { from { transform: rotate(0deg) }   to { transform: rotate(360deg) } }
  @keyframes nat-fade-in   { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes nat-pulse     { 0%,100% { opacity: 1 } 50% { opacity: .5 } }
  @keyframes nat-shimmer   { 0% { background-position: -350px 0 } 100% { background-position: 350px 0 } }
  @keyframes nat-heartbeat { 0%{transform:scale(1)} 14%{transform:scale(1.18)} 28%{transform:scale(1)} 42%{transform:scale(1.1)} 70%{transform:scale(1)} 100%{transform:scale(1)} }
  @keyframes nat-float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
`;