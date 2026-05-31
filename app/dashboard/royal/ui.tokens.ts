// ============================================================
//  ui.tokens.ts
//  Locație: andre/app/dashboard/royal/ui.tokens.ts
//  Toate culorile, dimensiunile și valorile de design
//  centralizate într-un singur loc.
// ============================================================
 
// ── PALETA DE CULORI ─────────────────────────────────────────
export const C = {
  // Fundaluri
  royalBg:  '#071220',
  navy:     '#0B1929',
  navy2:    '#0F2040',
  velvet2:  '#243870',
 
  // Argint / Text
  silver:   '#C8D8E8',
  silver2:  '#A8BDD0',
  silver3:  '#E8F0F8',
  silver4:  '#6888A8',
 
  // Accent
  accent:   '#7CA8D8',
  accent2:  '#9FBFE8',
 
  // Text general
  text:     '#E0EAF5',
  textlt:   '#8AAAC8',
 
  // Status
  success:  '#81c784',
  successBg:'rgba(76,175,80,.12)',
  successBd:'rgba(76,175,80,.3)',
 
  // Pericol / Delete
  danger:   'rgba(180,60,40,.82)',
  dangerLt: 'rgba(200,80,60,.08)',
  dangerBd: 'rgba(200,80,60,.2)',
 
  // Avertisment
  warn:     '#ffa500',
  warnBg:   'rgba(255,140,0,.06)',
  warnBd:   'rgba(255,140,0,.25)',
 
  // Overlay / glassmorphism
  glass1:   'rgba(15,32,64,.5)',
  glass2:   'rgba(15,32,64,.4)',
  glass3:   'rgba(11,25,41,.97)',
  glass4:   'rgba(7,18,32,.97)',
  glass5:   'rgba(7,18,32,.98)',
 
  // Borduri subtile
  border1:  'rgba(200,216,232,.25)',
  border2:  'rgba(200,216,232,.18)',
  border3:  'rgba(200,216,232,.15)',
  border4:  'rgba(200,216,232,.12)',
  border5:  'rgba(200,216,232,.1)',
 
  // Separator / decorativ
  sep1:     'rgba(200,216,232,.3)',
  sep2:     'rgba(200,216,232,.2)',
 
  // Interactiv hover
  hoverTab:  'rgba(124,168,216,.08)',
  hoverTabA: 'rgba(124,168,216,.12)',
  hoverCopy: 'rgba(124,168,216,.25)',
  hoverRow:  'rgba(124,168,216,.04)',
} as const;
 
// ── GRADIENTE ────────────────────────────────────────────────
export const G = {
  sidebar:    `linear-gradient(180deg,${C.navy2} 0%,${C.navy} 100%)`,
  btnPrimary: `linear-gradient(135deg,${C.navy2} 0%,${C.silver4} 45%,${C.silver2} 55%,${C.silver4} 70%,${C.navy2} 100%)`,
  btnGold:    `linear-gradient(135deg,#0F2040 0%,#6888A8 40%,#9FBFE8 55%,#6888A8 70%,#0F2040 100%)`,
  toggle:     `linear-gradient(90deg,${C.navy2},${C.accent})`,
  atmosphere: `
    radial-gradient(ellipse 70% 60% at 20% 50%, rgba(124,168,216,.04) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 80% 80%, rgba(124,168,216,.03) 0%, transparent 55%)
  `,
  shimmer:    'linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)',
  shimmerBtn: 'linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent)',
  topLine:    'linear-gradient(90deg,transparent,rgba(200,216,232,.4),transparent)',
  sepH:       `linear-gradient(90deg,transparent,${C.sep1})`,
  sepHRev:    `linear-gradient(90deg,${C.sep1},transparent)`,
} as const;
 
// ── TIPOGRAFIE ───────────────────────────────────────────────
export const F = {
  serif:    "'Cormorant Garamond', serif",
  display:  "'Cinzel', serif",
  body:     "'Lato', sans-serif",
} as const;
 
// ── DIMENSIUNI FONT ──────────────────────────────────────────
export const FS = {
  label:   7,   // etichete uppercase mici
  labelMd: 8,   // etichete uppercase medii
  labelLg: 9,   // etichete uppercase mari
  caption: 10,
  body:    13,
  bodyMd:  14,
  bodyLg:  15,
  bodyXl:  16,  // !! minim 16px pe input-uri mobile (previne zoom iOS)
  heading: 22,  // clamp min
  headingMd: 28,
  headingLg: 38,
} as const;
 
// ── SPACING ──────────────────────────────────────────────────
export const SP = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  xxl: 24,
  xxxl: 28,
  section: 32,
} as const;
 
// ── BORDER RADIUS ────────────────────────────────────────────
export const R = {
  xs:  4,
  sm:  6,
  md:  8,
  lg:  10,
  xl:  12,
  xxl: 14,
  full: 9999,
} as const;
 
// ── BREAKPOINTS (px) ────────────────────────────────────────
export const BP = {
  mobile:  767,   // ≤ phone bottom nav
  tablet: 1023,   // ≤ tablet horizontal nav
} as const;
 
// ── DIMENSIUNI LAYOUT ────────────────────────────────────────
export const LAYOUT = {
  sidebarWidth:      248,
  mobileHeaderH:      56,
  tabletNavH:         48,
  mobileNavH:         68,
  mainPaddingDesktop: 'clamp(28px,4vw,52px) clamp(20px,4vw,64px)',
  mainPaddingTablet:  '116px 16px 40px',
  mainPaddingMobile:  '80px 12px 100px', // top: header; bottom: nav + safe area
  mainPaddingMobileXs:'80px 8px 100px',
} as const;
 
// ── ANIMATII ─────────────────────────────────────────────────
export const ANIM = {
  spin:    'ry-spin 1s linear infinite',
  fadeIn:  'ry-fade-in .5s ease both',
  pulse:   'ry-pulse 2s ease-in-out infinite',
  shimmer: 'shimmer-ps 3s linear infinite',
} as const;
 
// ── SHADOW ───────────────────────────────────────────────────
export const SH = {
  sidebar:  '4px 0 30px rgba(0,0,0,.35)',
  card:     '0 8px 32px rgba(0,0,0,.4), 0 0 0 1px rgba(200,216,232,.18)',
  mobileNav:'0 -4px 24px rgba(0,0,0,.4)',
  btnPrime: '0 6px 24px rgba(124,168,216,.18)',
  btnHover: '0 10px 30px rgba(124,168,216,.3)',
} as const;