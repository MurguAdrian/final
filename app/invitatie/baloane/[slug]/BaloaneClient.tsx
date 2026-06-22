"use client";
import React, { useState, useEffect } from 'react';
import BaloaneRsvpForm from './BaloaneRsvpForm';

interface Props {
  slug:                 string;
  childName:            string;
  parentsNames:         string;
  nasiNames:            string;
  religiousLocation:    string;
  religiousDateISO:     string | null;
  religiousDateDisplay: string | null;
  religiousTime:        string;
  religiousMaps:        string;
  religiousWaze:        string;
  restaurantLocation:   string;
  mainDateISO:          string | null;
  mainDateDisplay:      string | null;
  mainTime:             string;
  restaurantMaps:       string;
  restaurantWaze:       string;
  contactPhone:         string;
  orderId:              number;
}

const SKY_BG = 'radial-gradient(ellipse 75% 60% at 20% 15%, rgba(216,180,254,.4) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 85% 85%, rgba(255,214,165,.35) 0%, transparent 55%), linear-gradient(155deg, #FFF9F0 0%, #FDEFFA 45%, #F3E4FF 100%)';

const STARS_POS = [
  { t:'10%', l:'18%', w:16, d:2.8, delay:0 },
  { t:'20%', l:'76%', w:12, d:3.4, delay:.5 },
  { t:'38%', l:'10%', w:10, d:3.8, delay:.2 },
  { t:'55%', l:'82%', w:14, d:3.1, delay:.8 },
  { t:'68%', l:'26%', w:9,  d:4.2, delay:.15 },
  { t:'30%', l:'48%', w:8,  d:4.6, delay:1 },
  { t:'78%', l:'60%', w:10, d:3.6, delay:.65 },
  { t:'14%', l:'52%', w:7,  d:5,   delay:.35 },
];

const BALLOONS = [
  { l:'6%',  d:18, delay:0, c:'#F472B6' },
  { l:'22%', d:22, delay:4, c:'#A78BFA' },
  { l:'40%', d:20, delay:2, c:'#FDBA74' },
  { l:'60%', d:24, delay:6, c:'#F9A8D4' },
  { l:'78%', d:19, delay:1, c:'#C4B5FD' },
  { l:'90%', d:23, delay:5, c:'#FDE68A' },
];

const TRAIL = [
  { x:'14%', y:'14%', s:16, delay:.05, k:'star' },
  { x:'26%', y:'34%', s:20, delay:.18, k:'confetti' },
  { x:'40%', y:'18%', s:14, delay:.32, k:'star' },
  { x:'52%', y:'40%', s:22, delay:.46, k:'crown' },
  { x:'64%', y:'20%', s:16, delay:.6,  k:'confetti' },
  { x:'76%', y:'36%', s:18, delay:.74, k:'star' },
  { x:'34%', y:'48%', s:12, delay:.4,  k:'confetti' },
  { x:'58%', y:'14%', s:14, delay:.66, k:'star' },
];

const Star = ({ className='', style, color='#FDBA74' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <path d="M12 1C12.8 6.6 17.4 11.2 23 12C17.4 12.8 12.8 17.4 12 23C11.2 17.4 6.6 12.8 1 12C6.6 11.2 11.2 6.6 12 1Z" fill={color} />
  </svg>
);

const Confetti = ({ className='', style, color='#F472B6' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="6" rx="2" fill={color} transform="rotate(20 12 12)" />
  </svg>
);

const Crown = ({ className='', style, color='#FBBF24' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <path d="M3 18L3 9L8 13L12 6L16 13L21 9L21 18Z" fill={color} />
    <circle cx="3" cy="7" r="1.6" fill={color} />
    <circle cx="12" cy="4" r="1.6" fill={color} />
    <circle cx="21" cy="7" r="1.6" fill={color} />
    <rect x="3" y="18" width="18" height="2.4" rx="1" fill={color} />
  </svg>
);

const Balloon = ({ className='', style, color='#F472B6' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 60 100" fill="none">
    <ellipse cx="30" cy="34" rx="28" ry="32" fill={color} />
    <path d="M22 60C22 64 26 64 28 66C30 68 30 72 28 74" stroke={color} strokeWidth="2" fill="none" opacity=".7" />
    <path d="M30 64L30 96" stroke="#D9C2B0" strokeWidth="1.6" />
    <path d="M22 56C26 64 34 64 38 56L30 64Z" fill={color} />
    <ellipse cx="20" cy="20" rx="6" ry="9" fill="#FFFFFF" opacity=".35" />
  </svg>
);

const CarouselSVG = ({ className='' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 240 240" fill="none" style={{ width:'100%', height:'auto', display:'block', overflow:'visible' }}>
    <defs>
      <linearGradient id="blcpole" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FBBF24" /><stop offset="1" stopColor="#F59E0B" /></linearGradient>
      <radialGradient id="blcglow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#FDE68A" stopOpacity=".55" /><stop offset="1" stopColor="#FDE68A" stopOpacity="0" /></radialGradient>
    </defs>
    <ellipse cx="120" cy="216" rx="92" ry="10" fill="#A78BFA" opacity=".15" />
    <circle cx="120" cy="120" r="116" fill="url(#blcglow)" />
    <path d="M120 18L168 58L72 58Z" fill="#A78BFA" />
    <circle cx="120" cy="14" r="8" fill="#FBBF24" />
    <ellipse cx="120" cy="58" rx="56" ry="10" fill="#F9A8D4" />
    <g style={{ transformBox:'fill-box', transformOrigin:'center', animation:'blc-carouselSpin 5s linear infinite' }}>
      <line x1="120" y1="68" x2="46"  y2="186" stroke="url(#blcpole)" strokeWidth="4" />
      <line x1="120" y1="68" x2="194" y2="186" stroke="url(#blcpole)" strokeWidth="4" />
      <line x1="120" y1="68" x2="120" y2="190" stroke="url(#blcpole)" strokeWidth="4" />
      <g transform="translate(46 150)">
        <ellipse cx="0" cy="36" rx="22" ry="9" fill="#F9A8D4" />
        <path d="M-16 30C-22 10-10-8 8-6C20-4 22 14 14 28C8 36-8 38-16 30Z" fill="#FBCFE8" />
        <path d="M8-6C16-14 28-16 28-6C28 0 18 2 12 0Z" fill="#FBCFE8" />
        <circle cx="20" cy="-2" r="2" fill="#7C3AED" />
        <path d="M2-8C6-16 14-18 16-12" stroke="#FBBF24" strokeWidth="3" fill="none" />
      </g>
      <g transform="translate(194 150) scale(-1,1)">
        <ellipse cx="0" cy="36" rx="22" ry="9" fill="#C4B5FD" />
        <path d="M-16 30C-22 10-10-8 8-6C20-4 22 14 14 28C8 36-8 38-16 30Z" fill="#DDD6FE" />
        <path d="M8-6C16-14 28-16 28-6C28 0 18 2 12 0Z" fill="#DDD6FE" />
        <circle cx="20" cy="-2" r="2" fill="#7C3AED" />
        <path d="M2-8C6-16 14-18 16-12" stroke="#FBBF24" strokeWidth="3" fill="none" />
      </g>
      <g transform="translate(120 174)">
        <ellipse cx="0" cy="20" rx="22" ry="9" fill="#FDE68A" />
        <path d="M-16 14C-22-6-10-24 8-22C20-20 22-2 14 12C8 20-8 22-16 14Z" fill="#FEF3C7" />
        <path d="M8-22C16-30 28-32 28-22C28-16 18-14 12-16Z" fill="#FEF3C7" />
        <circle cx="20" cy="-18" r="2" fill="#7C3AED" />
        <path d="M2-24C6-32 14-34 16-28" stroke="#F472B6" strokeWidth="3" fill="none" />
      </g>
    </g>
    <ellipse cx="120" cy="190" rx="70" ry="12" fill="#FBBF24" opacity=".35" />
  </svg>
);

function SkyDecor() {
  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:1 }}>
      {STARS_POS.map((s, i) => (
        <div key={i} style={{ position:'absolute', top:s.t, left:s.l, width:s.w, animation:`blc-twinkle ${s.d}s ease-in-out infinite ${s.delay}s` }}>
          <Star />
        </div>
      ))}
      {BALLOONS.map((b, i) => (
        <Balloon key={i} color={b.c} style={{ position:'absolute', bottom:'-22%', left:b.l, width:'clamp(36px,7vw,64px)', opacity:.55, animation:`blc-riseUp ${b.d}s linear infinite ${b.delay}s` }} />
      ))}
    </div>
  );
}

function useCountdown(targetISO: string | null) {
  const [t, setT] = useState({ d:0, h:0, m:0, s:0 });
  useEffect(() => {
    if (!targetISO) return;
    const ms = new Date(targetISO).getTime();
    const tick = () => {
      const diff = ms - Date.now();
      if (diff <= 0) { setT({ d:0, h:0, m:0, s:0 }); return; }
      setT({ d: Math.floor(diff/864e5), h: Math.floor((diff%864e5)/36e5), m: Math.floor((diff%36e5)/6e4), s: Math.floor((diff%6e4)/1e3) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetISO]);
  return t;
}
const pad = (n: number) => String(n).padStart(2, '0');

function getRsvpDeadline(mainDateISO: string | null): string | null {
  if (!mainDateISO) return null;
  const d = new Date(mainDateISO);
  d.setDate(d.getDate() - 7);
  const MONTHS_RO = ['ianuarie','februarie','martie','aprilie','mai','iunie','iulie','august','septembrie','octombrie','noiembrie','decembrie'];
  return `${d.getDate()} ${MONTHS_RO[d.getMonth()]} ${d.getFullYear()}`;
}

const WazeIcon  = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:14,height:14}}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/></svg>);
const MapsIcon  = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:14,height:14}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>);
const PhoneIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const BackArrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);

type Phase = 'intro' | 'spin' | 'invite';

const CSS_ANIM = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Quicksand:wght@400;500;600;700&family=Nunito:wght@300;400;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;-webkit-font-smoothing:antialiased;}
  body{font-family:'Nunito',sans-serif;background:#FDF2FF;color:#7C3AED;}
  input,select,textarea{font-size:16px!important;}
  @keyframes blc-fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  @keyframes blc-carouselSpin{to{transform:rotate(360deg)}}
  @keyframes blc-shineText{0%{background-position:0% 0}100%{background-position:300% 0}}
  @keyframes blc-floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  @keyframes blc-riseUp{0%{transform:translateY(0) translateX(0)}50%{transform:translateY(-60vh) translateX(18px)}100%{transform:translateY(-120vh) translateX(-12px)}}
  @keyframes blc-twinkle{0%,100%{opacity:.35;transform:scale(.82)}50%{opacity:1;transform:scale(1.15)}}
  @keyframes blc-trailPop{0%{opacity:0;transform:translateY(8px) scale(.3) rotate(0deg)}35%{opacity:1}100%{opacity:0;transform:translateY(-50px) scale(1) rotate(120deg)}}
  @keyframes blc-fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes blc-slideUp{from{opacity:0;transform:scale(.92) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes blc-pulse{0%,100%{opacity:.42}50%{opacity:.9}}
  @keyframes blc-shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
  @media(max-width:480px){body{overflow:hidden}}
`;

export default function BaloaneClient(props: Props) {
  const {
    childName, parentsNames, nasiNames,
    religiousLocation, religiousDateISO, religiousDateDisplay, religiousTime, religiousMaps, religiousWaze,
    restaurantLocation, mainDateISO, mainDateDisplay, mainTime, restaurantMaps, restaurantWaze,
    contactPhone, orderId,
  } = props;

  const [phase,    setPhase]    = useState<Phase>('intro');
  const [vis,      setVis]      = useState(false);
  const [flipS,    setFlipS]    = useState(false);
  const [showRsvp, setShowRsvp] = useState(false);
  const cd = useCountdown(mainDateISO);
  const rsvpDeadline = getRsvpDeadline(mainDateISO);

  useEffect(() => {
    if (phase === 'invite') {
      const t = setTimeout(() => setVis(true), 60);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    setFlipS(true);
    const t = setTimeout(() => setFlipS(false), 155);
    return () => clearTimeout(t);
  }, [cd.s]);

  useEffect(() => {
    if (showRsvp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showRsvp]);

  function startSpin() {
    if (phase !== 'intro') return;
    setPhase('spin');
    setTimeout(() => setPhase('invite'), 1900);
  }

  const a = (d: number): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s ease ${d}s, transform .7s ease ${d}s`,
  });

  const spinning = phase === 'spin';
  const fade: React.CSSProperties = { opacity: spinning ? 0 : 1, transition: 'opacity .5s ease' };

  const mapsHref = (url: string) => url.startsWith('http') ? url : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(url)}`;
  const wazeHref = (url: string) => url.startsWith('http') ? url : `https://waze.com/ul?q=${encodeURIComponent(url)}&navigate=yes`;

  const locBtn = (grad: string): React.CSSProperties => ({
    flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center',
    gap:6, padding:'9px 8px', borderRadius:11,
    background:grad, color:'#fff',
    fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700,
    textDecoration:'none', whiteSpace:'nowrap',
  });

  const cardHover = {
    onMouseEnter: (e: React.MouseEvent) => { const el = e.currentTarget as HTMLDivElement; el.style.transform='translateY(-5px) scale(1.015)'; el.style.boxShadow='0 20px 50px rgba(167,139,250,.28)'; },
    onMouseLeave: (e: React.MouseEvent) => { const el = e.currentTarget as HTMLDivElement; el.style.transform=''; el.style.boxShadow='0 6px 28px rgba(167,139,250,.14)'; },
  };

  const events = [
    ...(religiousLocation ? [{
      type:'Slujba Religioasă', name:'Taina Botezului',
      venue:religiousLocation, time:religiousTime, dateDisplay:religiousDateDisplay,
      maps:religiousMaps, waze:religiousWaze,
      bg:'linear-gradient(135deg,#A78BFA 0%,#7C3AED 100%)',
      icon:(
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}>
          <path d="M12 2L12 6M10 4h4"/><rect x="4" y="9" width="16" height="12" rx="1"/>
          <path d="M9 21V14a3 3 0 0 1 6 0v7"/><path d="M4 9l8-4 8 4"/>
        </svg>
      ),
    }] : []),
    ...(restaurantLocation ? [{
      type:'Petrecerea de După', name:'Recepție',
      venue:restaurantLocation, time:mainTime, dateDisplay:mainDateDisplay,
      maps:restaurantMaps, waze:restaurantWaze,
      bg:'linear-gradient(135deg,#F472B6 0%,#DB2777 100%)',
      icon:(
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}>
          <ellipse cx="9" cy="8" rx="4" ry="5"/><ellipse cx="16" cy="10" rx="3.2" ry="4"/>
          <path d="M9 13C9 16 8 17 8 19"/><path d="M16 14C16 16 17 17 17 19"/><path d="M8 19L17 19"/>
        </svg>
      ),
    }] : []),
  ];

  return (
    <>
      <style>{CSS_ANIM}</style>

<header style={{
  position:'fixed',
  top:0,
  left:0,
  right:0,
  zIndex:200,
  height:56,
  display:'flex',
  alignItems:'center',
  padding:'0 clamp(16px,4vw,28px)',
  background:'rgba(253,242,255,.92)',
  borderBottom:'1px solid rgba(167,139,250,.2)',
  backdropFilter:'blur(14px)'
}}>
  <a
    href="/invitatii-digitale"
    style={{
      fontFamily:"'Quicksand',sans-serif",
      fontSize:12,
      fontWeight:700,
      letterSpacing:'.22em',
      textTransform:'uppercase',
      color:'#7C3AED',
      textDecoration:'none',
      transition:'color .2s'
    }}
    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color='#F472B6'}
    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color='#7C3AED'}
  >
    Vibe<span style={{ color:'#F472B6' }}>Invite</span>
  </a>

  <div style={{
    position:'absolute',
    left:'50%',
    transform:'translateX(-50%)',
    fontFamily:"'Cormorant',serif",
    fontSize:15,
    fontStyle:'italic',
    color:'#9D7BB0',
    letterSpacing:'.04em',
    overflow:'hidden',
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
    maxWidth:'40%',
    textAlign:'center',
    pointerEvents:'none'
  }}>
    {phase === 'invite' ? (childName || 'Botez') : 'Invitație la Botez'}
  </div>
</header>

      {phase !== 'invite' && (
        <div style={{ position:'fixed', inset:0, top:56, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ position:'absolute', inset:0, background:SKY_BG }} />
          <SkyDecor />
          <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:14, padding:'16px 22px', width:'100%' }}>
            <p style={{ ...fade, fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(10px,1.2vw,12px)', letterSpacing:'.3em', textTransform:'uppercase', color:'#A78BFA', fontWeight:700, animation:'blc-fadeUp .7s ease both' }}>Invitație la Botez</p>
            <h1 style={{ ...fade, fontFamily:"'Playfair Display',serif", fontSize:'clamp(42px,9vw,84px)', fontWeight:600, fontStyle:'italic', textAlign:'center', lineHeight:1, margin:0, animation:'blc-fadeUp .8s ease both .08s, blc-shineText 3.5s linear infinite', background:'linear-gradient(90deg,#F472B6,#FBBF24,#A78BFA,#F472B6)', backgroundSize:'300% 100%', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent' }}>
              {childName || 'Botez'}
            </h1>
            <p style={{ ...fade, fontFamily:"'Cormorant',serif", fontSize:'clamp(14px,2vw,19px)', fontStyle:'italic', color:'#9D7BB0', textAlign:'center', maxWidth:360, lineHeight:1.5, animation:'blc-fadeUp .9s ease both .16s' }}>
              Vă invităm la o poveste magică — botezul micuței noastre prințese
            </p>
            <div onClick={startSpin} role="button" tabIndex={0} onKeyDown={e => e.key==='Enter' && startSpin()} style={{ position:'relative', width:'min(86vw,300px)', height:'min(86vw,300px)', cursor:'pointer', marginTop:6 }}>
              {spinning && TRAIL.map((it, i) => (
                <div key={i} style={{ position:'absolute', left:it.x, top:it.y, width:it.s, opacity:0, animation:`blc-trailPop 1.1s ease ${it.delay}s forwards`, zIndex:3, pointerEvents:'none' }}>
                  {it.k==='star' ? <Star /> : it.k==='crown' ? <Crown /> : <Confetti color={i%2 ? '#A78BFA' : '#F472B6'} />}
                </div>
              ))}
              <div style={{ width:'100%', height:'100%', transform:spinning ? 'scale(1.3) rotate(360deg)' : 'scale(1)', opacity:spinning ? 0 : 1, transition:'transform 1.85s cubic-bezier(.5,.03,.5,1), opacity 1.6s ease' }}>
                <CarouselSVG />
              </div>
            </div>
            <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(10px,1.2vw,12px)', letterSpacing:'.24em', textTransform:'uppercase', color:'#A78BFA', fontWeight:700, opacity:spinning ? .9 : undefined, animation:spinning ? 'none' : 'blc-fadeUp 1s ease both .4s, blc-pulse 2.8s ease-in-out infinite 1.4s' }}>
              {spinning ? '✦  Pornește magia…' : 'Atinge caruselul pentru a începe'}
            </p>
          </div>
        </div>
      )}

      {phase === 'invite' && (
        <div style={{ position:'fixed', inset:0, top:56, overflowY:'auto', overflowX:'hidden' }}>
          <div style={{ position:'fixed', inset:0, background:SKY_BG, zIndex:0 }} />
          <SkyDecor />

          <div style={{ position:'relative', zIndex:2, maxWidth:720, margin:'0 auto', padding:'clamp(32px,5vw,52px) clamp(18px,4vw,28px) 60px', display:'flex', flexDirection:'column', alignItems:'center', gap:0 }}>

            {/* motif */}
            <div style={{ ...a(0), marginBottom:8, display:'flex', justifyContent:'center' }}>
              <div style={{ position:'relative', width:'clamp(140px,28vw,200px)', height:'clamp(76px,14vw,110px)' }}>
                <div style={{ position:'absolute', top:-6, left:'50%', transform:'translateX(-50%)', width:28, animation:'blc-floatY 4s ease-in-out infinite' }}><Crown /></div>
                <div style={{ position:'absolute', top:14, left:'14%', width:14, animation:'blc-twinkle 3.6s ease-in-out infinite .5s' }}><Star color="#F472B6" /></div>
                <div style={{ position:'absolute', top:18, right:'14%', width:12, animation:'blc-twinkle 4s ease-in-out infinite .9s' }}><Star color="#A78BFA" /></div>
                <div style={{ position:'absolute', left:'50%', top:'34%', transform:'translateX(-50%)', width:'56%' }}>
                  <CarouselSVG />
                </div>
              </div>
            </div>

            <p style={{ ...a(.06), fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(10px,1.2vw,12px)', letterSpacing:'.3em', textTransform:'uppercase', color:'#A78BFA', fontWeight:700, marginBottom:10 }}>
              Invitație la Botez
            </p>

            <div style={{ ...a(.12), textAlign:'center', marginBottom:6 }}>
              <span style={{ display:'block', fontFamily:"'Playfair Display',serif", fontSize:'clamp(52px,9vw,100px)', fontWeight:600, fontStyle:'italic', lineHeight:.95, letterSpacing:'-.01em', backgroundImage:'linear-gradient(90deg,#F472B6,#FBBF24,#A78BFA,#F472B6)', backgroundSize:'300% 100%', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent', animation:'blc-shineText 5s linear infinite' }}>
                {childName}
              </span>
              {parentsNames && (
                <span style={{ display:'block', fontFamily:"'Cormorant',serif", fontSize:'clamp(14px,1.9vw,19px)', fontStyle:'italic', color:'#9D7BB0', marginTop:6 }}>
                  Fiica lui {parentsNames}
                </span>
              )}
            </div>

            {/* date badge */}
            {mainDateDisplay && (
              <div style={{ ...a(.16), display:'inline-flex', alignItems:'center', gap:10, marginTop:18, padding:'10px 24px', borderRadius:100, background:'linear-gradient(135deg,rgba(167,139,250,.16),rgba(244,114,182,.16))', border:'1px solid rgba(167,139,250,.3)' }}>
                <span style={{ fontSize:16 }}>🎈</span>
                <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(11px,1.5vw,14px)', letterSpacing:'.1em', color:'#7C3AED', fontWeight:700 }}>{mainDateDisplay}</p>
              </div>
            )}

            {/* countdown */}
            {mainDateISO && (
              <div style={{ ...a(.22), width:'100%', maxWidth:440, background:'rgba(255,255,255,.65)', border:'1px solid rgba(167,139,250,.22)', borderRadius:24, padding:'clamp(18px,3vw,26px) clamp(12px,2vw,18px)', backdropFilter:'blur(14px)', textAlign:'center', boxShadow:'0 10px 36px rgba(167,139,250,.18)', marginTop:22 }}>
                <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(8px,.95vw,10px)', letterSpacing:'.22em', textTransform:'uppercase', color:'#A78BFA', fontWeight:700, marginBottom:14 }}>Numărătoare Magică</p>
                <div style={{ display:'flex', gap:0, justifyContent:'center' }}>
                  {[{ n:pad(cd.d), l:'Zile' }, { n:pad(cd.h), l:'Ore' }, { n:pad(cd.m), l:'Minute' }, { n:pad(cd.s), l:'Secunde', flip:flipS }].map(u => (
                    <div key={u.l} style={{ flex:1, maxWidth:104, textAlign:'center', padding:'0 4px', borderRight:'1px solid rgba(167,139,250,.18)' }}>
                      <span style={{ display:'block', fontFamily:"'Cormorant',serif", fontSize:'clamp(36px,5.8vw,58px)', fontWeight:400, lineHeight:1, transition:'transform .15s ease, color .15s ease', transform:(u as any).flip ? 'scale(1.12) translateY(-3px)' : 'scale(1)', color:(u as any).flip ? '#F472B6' : '#7C3AED' }}>{u.n}</span>
                      <span style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(7px,.85vw,9px)', letterSpacing:'.12em', textTransform:'uppercase', color:'#A78BFA', fontWeight:700, display:'block', marginTop:3 }}>{u.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* divider */}
            <div style={{ ...a(.28), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'22px auto' }}>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(167,139,250,.35),transparent)' }} />
              <div style={{ width:16 }}><Star /></div>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(167,139,250,.35),transparent)' }} />
            </div>

            {/* family */}
            {(parentsNames || nasiNames) && (
              <div style={{ ...a(.34), display:'flex', gap:14, width:'100%', maxWidth:480, flexWrap:'wrap', justifyContent:'center' }}>
                {parentsNames && (
                  <div style={{ flex:'1 1 200px', textAlign:'center', padding:'20px 18px', borderRadius:18, background:'rgba(255,255,255,.65)', border:'1px solid rgba(244,114,182,.22)', backdropFilter:'blur(10px)', boxShadow:'0 8px 28px rgba(244,114,182,.14)', transition:'transform .24s ease,box-shadow .24s ease' }} {...cardHover}>
                    <span style={{ fontSize:22, display:'block', marginBottom:6 }}>👑</span>
                    <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'#A78BFA', fontWeight:700, marginBottom:8 }}>Părinții</p>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(17px,2.2vw,22px)', fontStyle:'italic', color:'#7C3AED' }}>{parentsNames}</p>
                  </div>
                )}
                {nasiNames && (
                  <div style={{ flex:'1 1 200px', textAlign:'center', padding:'20px 18px', borderRadius:18, background:'rgba(255,255,255,.65)', border:'1px solid rgba(167,139,250,.22)', backdropFilter:'blur(10px)', boxShadow:'0 8px 28px rgba(167,139,250,.14)', transition:'transform .24s ease,box-shadow .24s ease' }} {...cardHover}>
                    <span style={{ fontSize:22, display:'block', marginBottom:6 }}>✨</span>
                    <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'#A78BFA', fontWeight:700, marginBottom:8 }}>Nașii</p>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(17px,2.2vw,22px)', fontStyle:'italic', color:'#7C3AED' }}>{nasiNames}</p>
                  </div>
                )}
              </div>
            )}

            {/* divider */}
            <div style={{ ...a(.4), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'22px auto' }}>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(167,139,250,.35),transparent)' }} />
              <div style={{ width:8, height:8, background:'#FBBF24', transform:'rotate(45deg)', boxShadow:'0 0 0 3px rgba(251,191,36,.16)' }} />
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(167,139,250,.35),transparent)' }} />
            </div>

            {/* events */}
            {events.length > 0 && (
              <div style={{ ...a(.46), width:'100%', maxWidth:520, position:'relative' }}>
                <div style={{ position:'absolute', left:19, top:10, bottom:10, width:2, background:'linear-gradient(180deg,rgba(167,139,250,.5),rgba(244,114,182,.15))' }} />
                {events.map((ev, idx) => (
                  <div key={idx} style={{ display:'flex', gap:16, marginBottom:idx < events.length-1 ? 22 : 0 }}>
                    <div style={{ flexShrink:0, width:40, height:40, borderRadius:'50%', background:ev.bg, border:'2px solid rgba(251,191,36,.5)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 18px rgba(167,139,250,.3)', zIndex:1 }}>
                      {ev.icon}
                    </div>
                    <div style={{ flex:1, borderRadius:16, border:'1px solid rgba(167,139,250,.2)', background:'rgba(255,255,255,.72)', backdropFilter:'blur(10px)', padding:'clamp(12px,2vw,16px) clamp(14px,2.5vw,20px)', boxShadow:'0 6px 26px rgba(167,139,250,.16)', transition:'transform .24s ease,box-shadow .24s ease' }} {...cardHover}>
                      <span style={{ fontFamily:"'Quicksand',sans-serif", fontSize:8.5, letterSpacing:'.2em', textTransform:'uppercase', color:'#F472B6', fontWeight:700, display:'block', marginBottom:2 }}>{ev.type}</span>
                      <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(14px,1.8vw,17px)', fontStyle:'italic', fontWeight:400, color:'#7C3AED', lineHeight:1.2, marginBottom:6 }}>{ev.name}</p>
                      <p style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:'clamp(11px,1.3vw,13px)', color:'#7C3AED', marginBottom:8 }}>{ev.venue}</p>
                      {ev.time && ev.dateDisplay && (
                        <div style={{ display:'inline-flex', alignItems:'center', gap:5, background:'rgba(167,139,250,.1)', border:'1px solid rgba(167,139,250,.25)', borderRadius:100, padding:'3px 10px', fontFamily:"'Quicksand',sans-serif", fontSize:8.5, letterSpacing:'.1em', textTransform:'uppercase', fontWeight:700, color:'#7C3AED', marginBottom:10 }}>
                          🎉 {ev.dateDisplay} · ora {ev.time}
                        </div>
                      )}
                      {(ev.waze || ev.maps) && (
                        <div style={{ display:'flex', gap:8 }}>
                          {ev.waze && <a href={wazeHref(ev.waze)} target="_blank" rel="noopener noreferrer" style={locBtn('linear-gradient(135deg,#08A2D4,#0788B0)')}><WazeIcon /> Waze</a>}
                          {ev.maps && <a href={mapsHref(ev.maps)} target="_blank" rel="noopener noreferrer" style={locBtn('linear-gradient(135deg,#4CAF4F,#388E3C)')}><MapsIcon /> Maps</a>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* divider */}
            <div style={{ ...a(.52), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'26px auto' }}>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(167,139,250,.35),transparent)' }} />
              <div style={{ width:8, height:8, background:'#FBBF24', transform:'rotate(45deg)', boxShadow:'0 0 0 3px rgba(251,191,36,.16)' }} />
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(167,139,250,.35),transparent)' }} />
            </div>

            {/* contact */}
            {contactPhone && (
              <div style={{ ...a(.58), width:'100%', maxWidth:640, background:'rgba(255,255,255,.65)', border:'1px solid rgba(167,139,250,.2)', borderRadius:18, padding:'clamp(14px,2.5vw,20px) clamp(16px,3vw,24px)', backdropFilter:'blur(8px)', boxShadow:'0 8px 26px rgba(167,139,250,.14)' }}>
                <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'#A78BFA', fontWeight:700, marginBottom:12 }}>Contact Părinți</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
                  <div>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(14px,1.8vw,17px)', fontStyle:'italic', color:'#7C3AED', marginBottom:2 }}>Familia</p>
                    <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(11px,1.3vw,13px)', color:'#DB2777', letterSpacing:'.06em', fontWeight:700 }}>{contactPhone}</p>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <a href={`tel:${contactPhone.replace(/\s/g,'')}`} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'9px 16px', borderRadius:100, background:'linear-gradient(135deg,#A78BFA,#7C3AED)', color:'#fff', fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.06em', boxShadow:'0 4px 16px rgba(124,58,237,.35)', textDecoration:'none' }}>
                      <PhoneIcon /> Telefon
                    </a>
                    <a href={`https://wa.me/${contactPhone.replace(/[\s+]/g,'')}`} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'9px 16px', borderRadius:100, background:'linear-gradient(135deg,#25D366,#1DA851)', color:'#fff', fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.06em', boxShadow:'0 4px 14px rgba(37,211,102,.3)', textDecoration:'none' }}>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* divider */}
            <div style={{ ...a(.64), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'26px auto' }}>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(167,139,250,.35),transparent)' }} />
              <div style={{ width:16 }}><Star color="#F472B6" /></div>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(167,139,250,.35),transparent)' }} />
            </div>

            {/* rsvp */}
            <div style={{ ...a(.68), textAlign:'center', width:'100%', maxWidth:380 }}>
              <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(14px,1.7vw,17px)', fontStyle:'italic', color:'#9D7BB0', marginBottom:16, lineHeight:1.6, letterSpacing:'.03em' }}>
                {rsvpDeadline ? (
                  <>Confirmați participarea până pe <strong style={{ color:'#DB2777', fontStyle:'normal' }}>{rsvpDeadline}</strong></>
                ) : 'Confirmați participarea'}
              </p>
              <button
                onClick={() => setShowRsvp(true)}
                style={{ display:'block', width:'100%', padding:'clamp(14px,1.8vw,18px) 0', borderRadius:100, backgroundImage:'linear-gradient(90deg,#F472B6,#FBBF24,#A78BFA,#F472B6)', backgroundSize:'300% 100%', animation:'blc-shineText 5s linear infinite', color:'#fff', textAlign:'center', fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(11px,1.3vw,13px)', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', cursor:'pointer', border:'none', boxShadow:'0 12px 38px rgba(167,139,250,.4)', transition:'transform .22s,box-shadow .22s', position:'relative', overflow:'hidden' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform='translateY(-3px) scale(1.02)'; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 20px 50px rgba(167,139,250,.55)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform=''; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 12px 38px rgba(167,139,250,.4)'; }}>
                <span style={{ position:'relative', zIndex:1 }}>Confirmă Participarea 👑</span>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent)', backgroundSize:'350px 100%', animation:'blc-shimmer 3s linear infinite' }} />
              </button>
            </div>

            {/* footer */}
            <div style={{ ...a(.76), marginTop:28, width:'100%', maxWidth:480, textAlign:'center', padding:'clamp(18px,3vw,26px)', background:'rgba(255,255,255,.6)', border:'1px solid rgba(167,139,250,.2)', borderRadius:20, backdropFilter:'blur(8px)' }}>
              <span style={{ fontSize:30, display:'block', marginBottom:10 }}>🎠</span>
              <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(15px,2vw,20px)', fontStyle:'italic', color:'#7C5C99', lineHeight:1.7, letterSpacing:'.01em' }}>
                Prezența voastră va transforma această zi într-o amintire de neuitat pentru familia noastră.
              </p>
              <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(157,123,176,.55)', fontWeight:700, marginTop:16 }}>
                VibeInvite © {new Date().getFullYear()} · Toate drepturile rezervate
              </p>
            </div>

          </div>
        </div>
      )}

      {showRsvp && (
        <div
          onClick={() => setShowRsvp(false)}
          style={{ position:'fixed', inset:0, zIndex:400, background:'rgba(124,58,237,.3)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, animation:'blc-fadeIn .28s ease', overflowY:'auto' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background:'linear-gradient(165deg,#FFFFFF,#FDF2FF)', borderRadius:28, padding:'clamp(24px,4vw,38px) clamp(18px,4vw,32px)', maxWidth:460, width:'100%', border:'1px solid rgba(167,139,250,.28)', boxShadow:'0 40px 110px rgba(124,58,237,.28)', animation:'blc-slideUp .32s cubic-bezier(.4,0,.2,1)', maxHeight:'92dvh', overflowY:'auto', position:'relative' }}
          >
            <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(167,139,250,.6),transparent)' }} />
            <BaloaneRsvpForm orderId={orderId} onClose={() => setShowRsvp(false)} />
          </div>
        </div>
      )}
    </>
  );
}