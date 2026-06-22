export const C = {
  // Primary palette
  accent:      '#59B0E3',   // albastru balon / papion ursuleț
  accentDark:  '#3A8CBF',

  blush:        '#D7BEA8',   // maro deschis / blană ursuleț
  blushLight:   '#F0E5DA',

  gold:         '#E3A859',   // accent cald (ursuleț emoji / detalii)
  goldDim:      '#C98E40',

  // Text
  text:         '#76563F',   // maro închis elegant (Matei Alexandru)
  textSub:      '#8F6D54',
  textMuted:    '#AA8971',
  textFaint:    'rgba(118,86,63,.45)',

  // Backgrounds
  bgDeep:       '#FDF8F2',   // crem foarte deschis cald din fundal
  bgMid:        '#FAF2E7',
  bgAccent:     '#F5EAD9',

  surface:      'rgba(255,255,255,.90)', // cardurile albe curate din secțiuni
  surfaceHover: 'rgba(255,255,255,.98)',

  // Borders
  border:       'rgba(118,86,63,.12)',
  borderFaint:  'rgba(118,86,63,.06)',
  borderLight:  'rgba(215,190,168,.30)',
  borderMed:    'rgba(118,86,63,.22)',
  borderStrong: 'rgba(118,86,63,.35)',
  borderGold:   'rgba(227,168,89,.35)',
  borderAccent: 'rgba(89,176,227,.30)',

  // Floral accents
  pink1:        '#D7BEA8',   // adaptat la tematica ursuleț
  pink2:        '#59B0E3',   // accent albastru
  cream:        '#F9F0E4',   // crem cald

  // Status
  success:      '#7BC8A4',
  error:        '#E57373',
  warning:      '#E3A859',

  // Util
  white:        '#ffffff',
  black:        '#000000',
} as const;

// ─── GRADIENTS ────────────────────────────────────────────────────────────────
export const GR = {
  bg: 'linear-gradient(180deg, #FDF8F2 0%, #FAF0E1 100%)', // gradientul cald, catifelat de pe fundal
  header:         'rgba(253,248,242,.93)',
  sidebar:        'rgba(253,248,242,.96)',
  btnPrimary:     'linear-gradient(135deg, #76563F 0%, #543B2A 100%)', // maro închis premium pentru butoane principale
  btnDanger:      'rgba(229,115,115,.13)',
  btnGhost:       'rgba(118,86,63,.10)',
  cardChurch:     'linear-gradient(135deg, #FAF2E7 0%, #EFE1CE 100%)',
  cardRestaurant: 'linear-gradient(135deg, #EAF4FA 0%, #D4E9F5 100%)', // tentă foarte discretă de albastru pentru diversitate
  flame:          'linear-gradient(180deg, #81C7F0 0%, #59B0E3 100%)', // gradient albastru-bebe jucăuș
  rocketBody:     'linear-gradient(180deg, #FAF2E7 0%, #D7BEA8 100%)',
  dividerLeft:    'linear-gradient(90deg, transparent, rgba(118,86,63,.20), transparent)',
  dividerRight:   'linear-gradient(90deg, rgba(118,86,63,.20), transparent)',
  goldDivider:    'linear-gradient(90deg, transparent, rgba(227,168,89,.30), transparent)',
  statusActive:   'linear-gradient(90deg, rgba(89,176,227,.12), transparent)',
  statusInactive: 'rgba(118,86,63,.05)',
} as const;

// ─── FONTS ────────────────────────────────────────────────────────────────────
export const F = {
  display: "'Playfair Display', serif",
  heading: "'Quicksand', sans-serif",
  body:    "'Cormorant', serif",
  ui:      "'Nunito', sans-serif",
  mono:    "'Nunito', sans-serif",
} as const;

// ─── FONT SIZES ───────────────────────────────────────────────────────────────
export const FS = {
  micro:   7,
  tiny:    10,
  xs:      11,
  sm:      12,
  base:    13,
  md:      14,
  lg:      16,
  input:   16,
  xl:      19,
  xxl:     24,
  xxxl:    30,
  titleLg:  'clamp(40px,8vw,76px)',
  titleMd:  'clamp(22px,4vw,38px)',
  titleSm:  'clamp(16px,2.2vw,19px)',
  cardHead: 'clamp(15px,1.8vw,18px)',
  stat:     'clamp(30px,5vw,44px)',
  statLg:   'clamp(36px,5.8vw,58px)',
  label:    'clamp(9px,1.8vw,11px)',
} as const;

// ─── SPACING ─────────────────────────────────────────────────────────────────
export const SP = {
  xs:      4,
  sm:      8,
  md:      12,
  lg:      16,
  xl:      20,
  xxl:     24,
  xxxl:    32,
  section: 44,
  mainPad:  'clamp(20px,4vw,36px)',
  mainPadH: 'clamp(14px,4vw,28px)',
} as const;

// ─── BORDER RADIUS ────────────────────────────────────────────────────────────
export const BR = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  22,
  card: 20,
  pill: 100,
} as const;

// ─── ICON SIZES ───────────────────────────────────────────────────────────────
export const IS = {
  xs:  11,
  sm:  13,
  md:  15,
  lg:  18,
  xl:  20,
  xxl: 24,
} as const;

// ─── SHADOWS ─────────────────────────────────────────────────────────────────
export const SH = {
  card:       '0 6px 28px rgba(20,20,50,.3)',
  cardHover:  '0 18px 48px rgba(80,70,160,.35)',
  cardLight:  '0 4px 22px rgba(20,20,50,.3)',
  btnPrimary: '0 10px 36px rgba(88,72,160,.5)',
  btnHover:   '0 18px 46px rgba(88,72,160,.65)',
  sidebar:    '4px 0 24px rgba(10,10,30,.3)',
  header:     '0 2px 20px rgba(10,10,30,.4)',
  glow:       '0 0 0 3px rgba(124,107,196,.18)',
  goldGlow:   '0 0 0 3px rgba(244,216,126,.16)',
} as const;

// ─── LAYOUT ───────────────────────────────────────────────────────────────────
export const LY = {
  sidebarWidth:  240,
  mobileHeaderH: 56,
  tabletNavH:    48,
  mobileNavH:    64,
  bpTablet:      900,
  bpMobile:      480,
  maxContent:    840,
} as const;

// ─── STAR CONFIG ─────────────────────────────────────────────────────────────
export const STARS = [
  { t: '10%', l: '18%', w: 14, d: 2.8, delay: 0 },
  { t: '22%', l: '70%', w: 10, d: 3.4, delay: .5 },
  { t: '36%', l: '12%', w: 8,  d: 3.8, delay: .2 },
  { t: '54%', l: '82%', w: 12, d: 3.1, delay: .8 },
  { t: '68%', l: '28%', w: 9,  d: 4.2, delay: .15 },
  { t: '30%', l: '46%', w: 7,  d: 4.6, delay: 1 },
  { t: '78%', l: '60%', w: 10, d: 3.6, delay: .65 },
  { t: '16%', l: '52%', w: 6,  d: 5,   delay: .35 },
  { t: '60%', l: '8%',  w: 8,  d: 3.9, delay: .9 },
] as const;

// ─── KEYFRAMES ───────────────────────────────────────────────────────────────
export const KEYFRAMES = `
  @keyframes ast-spin       { from{transform:rotate(0deg)}    to{transform:rotate(360deg)} }
  @keyframes ast-fade-in    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ast-fade-up    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ast-float-y    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes ast-twinkle    { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1.15)} }
  @keyframes ast-rocket-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes ast-flame      { from{transform:scaleY(1) scaleX(1)} to{transform:scaleY(1.15) scaleX(.9)} }
  @keyframes ast-spin-slow  { to{transform:translateX(-50%) rotate(360deg)} }
  @keyframes ast-comet      { 0%{transform:translateX(-40px) translateY(0)} 100%{transform:translateX(40px) translateY(20px)} }
  @keyframes ast-trail-pop  { 0%{opacity:0;transform:translateY(8px) scale(.3)} 35%{opacity:1} 100%{opacity:0;transform:translateY(-60px) scale(1)} }
  @keyframes ast-shimmer    { 0%{background-position:-350px 0} 100%{background-position:350px 0} }
  @keyframes ast-fade-modal { from{opacity:0} to{opacity:1} }
  @keyframes ast-slide-up   { from{opacity:0;transform:scale(.92) translateY(18px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes ast-pulse      { 0%,100%{opacity:.42} 50%{opacity:.9} }
`;

// ─── FONTS IMPORT ─────────────────────────────────────────────────────────────
export const FONTS_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,300;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;1,300;1,400&family=Quicksand:wght@400;500;600;700&family=Nunito:wght@300;400;600;700&display=swap');`;
