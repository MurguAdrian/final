export const C = {
  accent:       '#59B0E3',
  accentDark:   '#3A8CBF',

  bear:         '#D7BEA8',
  bearLight:    '#F0E5DA',

  gold:         '#E3A859',
  goldDim:      '#C98E40',

  text:         '#76563F',
  textSub:      '#8F6D54',
  textMuted:    '#AA8971',
  textFaint:    'rgba(118,86,63,.42)',

  bgDeep:       '#FDF8F2',
  bgMid:        '#FAF2E7',
  bgAccent:     '#F5EAD9',

  surface:      'rgba(255,255,255,.88)',
  surfaceHover: 'rgba(255,255,255,.98)',

  border:       'rgba(118,86,63,.12)',
  borderFaint:  'rgba(118,86,63,.06)',
  borderLight:  'rgba(215,190,168,.28)',
  borderMed:    'rgba(118,86,63,.22)',
  borderStrong: 'rgba(118,86,63,.35)',
  borderGold:   'rgba(227,168,89,.35)',
  borderAccent: 'rgba(89,176,227,.28)',

  blue1:        '#B8D8F0',
  blue2:        '#7AAAC0',
  cream:        '#F9F0E4',

  success:      '#7BC8A4',
  error:        '#E57373',
  warning:      '#E3A859',

  white:        '#ffffff',
  black:        '#000000',
} as const;

export const GR = {
  bg: 'radial-gradient(ellipse 75% 60% at 22% 18%, rgba(210,190,160,.18) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 82% 84%, rgba(184,210,232,.14) 0%, transparent 55%), linear-gradient(158deg, #FEFCF7 0%, #FBF5E8 46%, #F7EDD8 100%)',
  header:         'rgba(254,252,247,.95)',
  sidebar:        'rgba(254,252,247,.98)',
  btnPrimary:     'linear-gradient(135deg, #8B5E3C 0%, #6A4229 100%)',
  btnDanger:      'rgba(229,115,115,.08)',
  btnGhost:       'rgba(118,86,63,.08)',
  cardChurch:     'linear-gradient(135deg, #7AAAC0 0%, #4880A0 100%)',
  cardRestaurant: 'linear-gradient(135deg, #E3A859 0%, #C98E40 100%)',
  flame:          'linear-gradient(180deg, #B8D8F0 0%, #7AAAC0 100%)',
  rocketBody:     'linear-gradient(180deg, #FAF2E7 0%, #D7BEA8 100%)',
  dividerLeft:    'linear-gradient(90deg, transparent, rgba(122,170,192,.35), transparent)',
  dividerRight:   'linear-gradient(90deg, rgba(122,170,192,.35), transparent)',
  goldDivider:    'linear-gradient(90deg, transparent, rgba(227,168,89,.35), transparent)',
  statusActive:   'linear-gradient(90deg, rgba(89,176,227,.10), transparent)',
  statusInactive: 'rgba(118,86,63,.04)',
} as const;

export const F = {
  display: "'Playfair Display', serif",
  heading: "'Quicksand', sans-serif",
  body:    "'Cormorant', serif",
  ui:      "'Nunito', sans-serif",
  mono:    "'Nunito', sans-serif",
} as const;

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

export const IS = {
  xs:  11,
  sm:  13,
  md:  15,
  lg:  18,
  xl:  20,
  xxl: 24,
} as const;

export const SH = {
  card:       '0 6px 28px rgba(118,86,63,.10)',
  cardHover:  '0 18px 48px rgba(118,86,63,.16)',
  cardLight:  '0 4px 22px rgba(118,86,63,.07)',
  btnPrimary: '0 10px 36px rgba(106,66,41,.38)',
  btnHover:   '0 18px 46px rgba(106,66,41,.52)',
  sidebar:    '4px 0 24px rgba(118,86,63,.08)',
  header:     '0 2px 20px rgba(118,86,63,.08)',
  glow:       '0 0 0 3px rgba(122,170,192,.20)',
  goldGlow:   '0 0 0 3px rgba(227,168,89,.16)',
} as const;

export const LY = {
  sidebarWidth:  240,
  mobileHeaderH: 56,
  tabletNavH:    48,
  mobileNavH:    64,
  bpTablet:      900,
  bpMobile:      480,
  maxContent:    840,
} as const;

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

export const FONTS_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,300;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;1,300;1,400&family=Quicksand:wght@400;500;600;700&family=Nunito:wght@300;400;600;700&display=swap');`;