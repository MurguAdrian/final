export const C = {
  accent:      '#059669',
  accentDark:  '#065F46',

  mint:        '#6EE7B7',
  mintLight:   '#D1FAE5',

  gold:        '#FCD34D',
  goldDim:     '#FBBF24',

  text:        '#065F46',
  textSub:     '#374151',
  textMuted:   '#6B7280',
  textFaint:   'rgba(5,95,70,.42)',

  bgDeep:      '#F0FDF9',
  bgMid:       '#ECFDF5',
  bgAccent:    '#D1FAE5',

  surface:      'rgba(255,255,255,.82)',
  surfaceHover: 'rgba(255,255,255,.96)',

  border:       'rgba(110,231,183,.25)',
  borderFaint:  'rgba(110,231,183,.10)',
  borderLight:  'rgba(110,231,183,.22)',
  borderMed:    'rgba(5,150,105,.3)',
  borderStrong: 'rgba(5,95,70,.42)',
  borderGold:   'rgba(252,211,77,.45)',
  borderAccent: 'rgba(5,150,105,.28)',

  green1:      '#6EE7B7',
  green2:      '#34D399',
  cream:       '#FFFBEB',

  success:     '#34D399',
  error:       '#E57373',
  warning:     '#FCD34D',

  white:       '#ffffff',
  black:       '#000000',
} as const;

export const GR = {
  bg: 'radial-gradient(ellipse 80% 60% at 10% 10%, rgba(110,231,183,.18) 0%, transparent 50%), radial-gradient(ellipse 70% 55% at 92% 88%, rgba(252,211,77,.22) 0%, transparent 52%), linear-gradient(148deg, #F0FDF9 0%, #ECFDF5 40%, #FFFBEB 100%)',
  header:         'rgba(240,253,249,.95)',
  sidebar:        'rgba(240,253,249,.98)',
  btnPrimary:     'linear-gradient(135deg, #34D399 0%, #059669 100%)',
  btnDanger:      'rgba(229,115,115,.08)',
  btnGhost:       'rgba(5,150,105,.10)',
  cardChurch:     'linear-gradient(135deg, #34D399 0%, #059669 100%)',
  cardRestaurant: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
  flame:          'linear-gradient(180deg, #FEF3C7 0%, #FCD34D 100%)',
  rocketBody:     'linear-gradient(180deg, #F0FDF9 0%, #D1FAE5 100%)',
  dividerLeft:    'linear-gradient(90deg, transparent, rgba(110,231,183,.4), transparent)',
  dividerRight:   'linear-gradient(90deg, rgba(110,231,183,.4), transparent)',
  goldDivider:    'linear-gradient(90deg, transparent, rgba(252,211,77,.4), transparent)',
  statusActive:   'linear-gradient(90deg, rgba(5,150,105,.10), transparent)',
  statusInactive: 'rgba(252,211,77,.05)',
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
  card:       '0 6px 28px rgba(5,150,105,.12)',
  cardHover:  '0 18px 48px rgba(5,150,105,.2)',
  cardLight:  '0 4px 22px rgba(5,150,105,.08)',
  btnPrimary: '0 10px 36px rgba(5,150,105,.38)',
  btnHover:   '0 18px 46px rgba(5,150,105,.52)',
  sidebar:    '4px 0 24px rgba(5,150,105,.08)',
  header:     '0 2px 20px rgba(5,150,105,.08)',
  glow:       '0 0 0 3px rgba(110,231,183,.22)',
  goldGlow:   '0 0 0 3px rgba(252,211,77,.18)',
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