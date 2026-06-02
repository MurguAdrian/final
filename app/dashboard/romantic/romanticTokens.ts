// export const C = {
//   // Roșuri / Rose
//   crimson:        '#7B1A2E',
//   rose:           '#A63248',
//   peony:          '#C4506A',
//   blush:          '#E8A0A8',
//   blush2:         '#F2C8CE',
//   blush3:         '#FAF0F2',
//   petal:          '#F7DDE2',
 
//   // Creme / Ivory
//   cream:          '#FDF5F6',
//   cream2:         '#F5E8EA',
//   creamBg:        '#FEF8F8',
//   creamDeep:      '#FAF0F2',
 
//   // Aur
//   gold:           '#C8A87A',
//   gold2:          '#E8CEAA',
 
//   // Texte
//   dark:           '#2A0A12',
//   text:           '#3D1520',
//   textLight:      '#8A4A58',
//   textMuted:      'rgba(61,21,32,0.5)',
 
//   // Borduri & Overlay
//   borderFaint:    'rgba(196,80,106,0.1)',
//   borderLight:    'rgba(196,80,106,0.15)',
//   borderMed:      'rgba(196,80,106,0.22)',
//   borderStrong:   'rgba(196,80,106,0.35)',
//   roseFaint:      'rgba(196,80,106,0.05)',
//   roseDim:        'rgba(166,50,72,0.5)',
//   roseAlpha08:    'rgba(196,80,106,0.08)',
//   roseAlpha12:    'rgba(196,80,106,0.12)',
 
//   // Overlay modal
//   overlayBg:      'rgba(30,20,15,0.55)',
 
//   // Status
//   successGreen:   '#5a9e5d',
//   successBg:      'rgba(76,175,80,0.09)',
//   successBorder:  'rgba(76,175,80,0.28)',
//   errorRed:       'rgba(200,80,60,0.82)',
//   warningOrange:  'rgba(255,165,0,0.8)',
 
//   // White
//   white:          '#FFFBFB',
//   whiteSoft:      '#FDF8F0',
// } as const;
 




// ─── FONTURI ─────────────────────────────────────────────



export const C = {
  // Roșuri / Rose (Saturate și întunecate pentru butoane/acțiuni)
  crimson:        '#5C0E1E', // Mai închis, contrast excelent pe fundal deschis
  rose:           '#8A2539',
  peony:          '#A63B52',
  blush:          '#CD7784',
  blush2:         '#E3AAB3',
  blush3:         '#F7E6E8',
  petal:          '#F4D2D7',
 
  // Creme / Ivory (Curățate de tentă gălbuie/murdară pentru fundaluri curate)
  cream:          '#FDF8F9',
  cream2:         '#F4E4E6',
  creamBg:        '#FFFBFB',
  creamDeep:      '#F5E6E8',
 
  // Aur (Accentuat pentru a nu părea un maro șters)
  gold:           '#A3804E', // Direcționat spre un bronz cu contrast ridicat
  gold2:          '#D4B98B',
 
  // Texte (AICI E SCHIMBAREA MAJORĂ: Contrast maxim, lizibile instant)
  dark:           '#1A0509', // Aproape negru pentru titluri mari
  text:           '#261115', // Textul principal (lizibilitate 100%)
  textLight:      '#5C4045', // Text secundar / Labels
  textMuted:      '#7D6065', // Text dezactivat/sugestii (fără opacități care blurează pe mobile)
 
  // Borduri & Overlay (Întărite pentru a delimita clar tabelele și cardurile)
  borderFaint:    'rgba(138,37,57,0.15)',
  borderLight:    'rgba(138,37,57,0.25)',
  borderMed:      'rgba(138,37,57,0.4)',
  borderStrong:   'rgba(138,37,57,0.6)',
  roseFaint:      'rgba(138,37,57,0.06)',
  roseDim:        'rgba(138,37,57,0.65)',
  roseAlpha08:    'rgba(138,37,57,0.08)',
  roseAlpha12:    'rgba(138,37,57,0.14)',
 
  // Overlay modal
  overlayBg:      'rgba(26,5,9,0.7)',
 
  // Status (Culori standard de Dashboard: aprinse și clare pentru decizii rapide)
  successGreen:   '#166534', // Verde închis, lizibil ca text (Tailwind green-800)
  successBg:      '#F0FDF4', // Fundal curat pentru badge
  successBorder:  '#BBF7D0',
  errorRed:       '#991B1B', // Roșu alertă
  warningOrange:  '#9A3412', // Portocaliu ars pentru contrast
 
  // White
  white:          '#FFFFFF',
  whiteSoft:      '#FAFAFA',
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
  card:        '0 2px 16px rgba(123,26,46,0.04), inset 0 1px 0 rgba(196,80,106,0.05)',
  cardHover:   '0 8px 32px rgba(123,26,46,0.08), 0 0 0 1px rgba(196,80,106,0.15)',
  cardActive:  '0 8px 32px rgba(123,26,46,0.09), inset 0 1px 0 rgba(255,255,255,0.8)',
  modal:       '0 24px 64px rgba(80,40,20,0.25)',
  sidebar:     '4px 0 30px rgba(123,26,46,0.06)',
  btnRose:     '0 6px 22px rgba(123,26,46,0.25)',
  btnRoseHover:'0 14px 40px rgba(123,26,46,0.38)',
  btnSave:     '0 10px 36px rgba(123,26,46,0.35)',
  toggleGlow:  '0 0 14px rgba(123,26,46,0.28)',
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
  roseBtn:     `linear-gradient(135deg, ${C.crimson} 0%, ${C.rose} 50%, ${C.peony} 100%)`,
  roseBtnFull: `linear-gradient(135deg,${C.crimson} 0%,${C.rose} 45%,${C.peony} 55%,${C.rose} 70%,${C.crimson} 100%)`,
  sidebar:     `linear-gradient(180deg, ${C.creamBg} 0%, ${C.creamDeep} 100%)`,
  cardActive:  `linear-gradient(160deg, rgba(253,245,246,0.9) 0%, rgba(247,221,226,0.55) 100%)`,
  cardInactive:`rgba(253,245,246,0.5)`,
  masterActive:`linear-gradient(160deg, rgba(253,245,246,0.88) 0%, rgba(247,221,226,0.6) 100%)`,
  bgAtmosphere: `
    radial-gradient(ellipse 70% 60% at 15% 50%, rgba(232,160,168,0.1) 0%, transparent 55%),
    radial-gradient(ellipse 50% 40% at 85% 80%, rgba(196,80,106,0.06) 0%, transparent 50%)
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