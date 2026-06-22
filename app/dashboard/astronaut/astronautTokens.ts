// ─── ASTRONAUT DESIGN TOKENS ─────────────────────────────────────────────────
// Derivate din tema spațială (invitatie/astronaut)
 
// ─── COLORS ──────────────────────────────────────────────────────────────────
export const C = {
  // Primary palette
  accent:     '#7C6BC4',
  accentDark: '#5848A0',
  gold:       '#F4D87E',
  goldDim:    '#C4A84E',
 
  // Text
  text:       '#F4F6FB',
  textSub:    '#B8C4E8',
  textMuted:  '#9CB6E8',
  textFaint:  'rgba(184,196,232,.5)',
 
  // Backgrounds
  bgDeep:     '#14152B',
  bgMid:      '#1E2046',
  bgAccent:   '#2A1F4D',
  surface:    'rgba(255,255,255,.05)',
  surfaceHover: 'rgba(255,255,255,.08)',
 
  // Borders
  border:     'rgba(156,182,232,.18)',
  borderGold: 'rgba(244,216,126,.35)',
  borderAccent: 'rgba(124,107,196,.28)',
 
  // Planets
  purple1:    '#7C6BC4',
  purple2:    '#5848A0',
  orange1:    '#E8965E',
  orange2:    '#C76B3A',
  blue1:      '#5EA8C7',
  blue2:      '#3C7E9C',
 
  // Status
  success:    '#4CAF50',
  error:      '#E84040',
  warning:    '#F4D87E',
 
  // Util
  white:      '#ffffff',
  black:      '#000000',
} as const;
 
// ─── GRADIENTS ────────────────────────────────────────────────────────────────
export const GR = {
  // Main background
  bg: 'radial-gradient(ellipse 70% 60% at 20% 15%, rgba(80,70,160,.35) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 85% 85%, rgba(40,50,120,.4) 0%, transparent 55%), linear-gradient(160deg, #14152B 0%, #1E2046 45%, #2A1F4D 100%)',
 
  // Header
  header: 'rgba(20,21,43,.93)',
 
  // Sidebar (same as header for consistency)
  sidebar: 'rgba(20,21,43,.96)',
 
  // Buttons
  btnPrimary:  'linear-gradient(135deg, #7C6BC4 0%, #5848A0 100%)',
  btnDanger:   'rgba(232,64,64,.13)',
  btnGhost:    'rgba(124,107,196,.12)',
 
  // Cards
  cardChurch:      'linear-gradient(135deg,#5848A0 0%,#3C2E78 100%)',
  cardRestaurant:  'linear-gradient(135deg,#3C7E9C 0%,#2A5A78 100%)',
 
  // Rocket flame
  flame: 'linear-gradient(180deg, #FFE6A0 0%, #F4A85E 50%, #E8602E 100%)',
 
  // Planet
  rocketBody: 'linear-gradient(180deg, #F0F4FB 0%, #C7D4EA 100%)',
 
  // Divider
  dividerLeft:  'linear-gradient(90deg, transparent, rgba(156,182,232,.35), transparent)',
  dividerRight: 'linear-gradient(90deg, rgba(156,182,232,.35), transparent)',
  goldDivider:  'linear-gradient(90deg, transparent, rgba(244,216,126,.4), transparent)',
 
  // Status
  statusActive:   'linear-gradient(90deg, rgba(124,107,196,.12), transparent)',
  statusInactive: 'rgba(255,140,0,.05)',
} as const;
 
// ─── FONTS ────────────────────────────────────────────────────────────────────
export const F = {
  heading: "'Playfair Display', serif",
  body:    "'Cormorant', serif",
  ui:      "'Quicksand', sans-serif",
  mono:    "'Nunito', sans-serif",
} as const;
 
// ─── FONT SIZES ───────────────────────────────────────────────────────────────
export const FS = {
  micro:   9,
  tiny:    10,
  xs:      11,
  sm:      12,
  base:    13,
  md:      14,
  lg:      16,
  input:   16,       // never below 16 (prevents iOS zoom)
  xl:      19,
  xxl:     24,
  xxxl:    30,
 
  // Responsive clamps (as strings for use in style objects)
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
 
  // Layout padding
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
  card:      '0 6px 28px rgba(20,20,50,.3)',
  cardHover: '0 18px 48px rgba(80,70,160,.35)',
  cardLight: '0 4px 22px rgba(20,20,50,.3)',
  btnPrimary: '0 10px 36px rgba(88,72,160,.5)',
  btnHover:   '0 18px 46px rgba(88,72,160,.65)',
  sidebar:    '4px 0 24px rgba(10,10,30,.3)',
  header:     '0 2px 20px rgba(10,10,30,.4)',
  glow:       '0 0 0 3px rgba(124,107,196,.18)',
  goldGlow:   '0 0 0 3px rgba(244,216,126,.16)',
} as const;
 
// ─── LAYOUT ───────────────────────────────────────────────────────────────────
export const LY = {
  sidebarWidth:   240,
  mobileHeaderH:  56,
  tabletNavH:     48,
  mobileNavH:     64,
  bpTablet:       900,
  bpMobile:       480,
  maxContent:     840,
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