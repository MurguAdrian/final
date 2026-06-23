"use client";
import React, { useState, useEffect } from 'react';
import MasinutaRsvpForm from './MasinutaRsvpForm';

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

const SKY_BG = 'radial-gradient(ellipse 72% 60% at 16% 20%, rgba(126,184,232,.20) 0%, transparent 55%), radial-gradient(ellipse 62% 55% at 84% 80%, rgba(168,208,240,.22) 0%, transparent 55%), linear-gradient(162deg, #FFFFFF 0%, #ECF5FD 46%, #DBEEFB 100%)';

const STARS_POS = [
  { t:'12%', l:'22%', w:18, d:3.2, delay:0   },
  { t:'24%', l:'72%', w:14, d:3.8, delay:.6  },
  { t:'40%', l:'14%', w:12, d:4.2, delay:.3  },
  { t:'58%', l:'80%', w:16, d:3.5, delay:.9  },
  { t:'70%', l:'30%', w:11, d:4.6, delay:.2  },
  { t:'34%', l:'48%', w:10, d:5,   delay:1.1 },
];

const TRAIL = [
  { x:'14%', y:'16%', s:16, delay:.05, k:'h' },
  { x:'26%', y:'36%', s:20, delay:.18, k:'s' },
  { x:'40%', y:'20%', s:14, delay:.32, k:'h' },
  { x:'52%', y:'42%', s:24, delay:.46, k:'c' },
  { x:'64%', y:'22%', s:16, delay:.6,  k:'s' },
  { x:'76%', y:'38%', s:18, delay:.74, k:'h' },
  { x:'34%', y:'50%', s:12, delay:.4,  k:'s' },
  { x:'58%', y:'16%', s:14, delay:.66, k:'h' },
];

const Cloud = ({ className='', style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 130 64" fill="none">
    <ellipse cx="62" cy="50" rx="46" ry="12" fill="#CFE5F7" />
    <ellipse cx="42" cy="40" rx="26" ry="18" fill="#FFFFFF" />
    <ellipse cx="72" cy="34" rx="24" ry="20" fill="#FFFFFF" />
    <ellipse cx="94" cy="42" rx="20" ry="14" fill="#FFFFFF" />
    <ellipse cx="58" cy="44" rx="34" ry="14" fill="#FFFFFF" />
  </svg>
);

const Star = ({ className='', style, color='#F0CE72' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <path d="M12 1C12.8 6.6 17.4 11.2 23 12C17.4 12.8 12.8 17.4 12 23C11.2 17.4 6.6 12.8 1 12C6.6 11.2 11.2 6.6 12 1Z" fill={color} />
  </svg>
);

const Heart = ({ className='', style, color='#8FBDE8' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <path d="M12 21C12 21 2.6 14.4 2.6 8.4C2.6 5.2 5 3 7.8 3C9.7 3 11.3 4.1 12 5.7C12.7 4.1 14.3 3 16.2 3C19 3 21.4 5.2 21.4 8.4C21.4 14.4 12 21 12 21Z" fill={color} />
  </svg>
);

const CarSVG = ({ className='' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 248 150" fill="none" style={{ width:'100%', height:'auto', display:'block', overflow:'visible' }}>
    <defs>
      <linearGradient id="msn-cb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#62A6E0" /><stop offset="1" stopColor="#3D7DC0" /></linearGradient>
      <linearGradient id="msn-cw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E8F4FE" /><stop offset="1" stopColor="#C2E0F8" /></linearGradient>
    </defs>
    <ellipse cx="124" cy="132" rx="98" ry="9" fill="#3D7DC0" opacity=".14" />
    <path d="M26 110C19 110 16 102 16 93L16 83C16 74 23 69 32 67L60 63C72 46 92 36 124 36C156 36 176 46 188 63L216 67C225 69 232 74 232 83L232 93C232 102 229 110 222 110Z" fill="url(#msn-cb)" stroke="#2E6299" strokeWidth="1.4" strokeOpacity=".25" />
    <path d="M40 70C60 56 92 48 124 48C150 48 168 53 180 62" stroke="#FFFFFF" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M66 64C77 50 94 43 122 43L122 64Z" fill="url(#msn-cw)" />
    <path d="M126 64L126 43C152 44 166 51 176 64Z" fill="url(#msn-cw)" />
    <rect x="121.5" y="43" width="5" height="22" rx="2" fill="#3D7DC0" />
    <path d="M124 70L124 104" stroke="#2E6299" strokeWidth="1.4" strokeOpacity=".3" />
    <rect x="98" y="82" width="14" height="4" rx="2" fill="#2E6299" fillOpacity=".4" />
    <ellipse cx="226" cy="86" rx="4" ry="6" fill="#FFE6A0" />
    <ellipse cx="18" cy="86" rx="3.4" ry="6" fill="#F4A8A8" />
    <path d="M150 80C150 80 144 76 144 72.4C144 70.5 145.4 69 147.2 69C148.4 69 149.5 69.7 150 70.7C150.5 69.7 151.6 69 152.8 69C154.6 69 156 70.5 156 72.4C156 76 150 80 150 80Z" fill="#FFFFFF" fillOpacity=".85" />
    <circle cx="70" cy="108" r="21" fill="#33414F" />
    <circle cx="70" cy="108" r="21" fill="none" stroke="#222B35" strokeWidth="2.4" />
    <g style={{ transformBox:'fill-box', transformOrigin:'center', animation:'msn-wheelSpin 1.1s linear infinite' }}>
      <circle cx="70" cy="108" r="11" fill="#E4EFF8" />
      <line x1="70" y1="99" x2="70" y2="117" stroke="#9DB6CC" strokeWidth="2.4" />
      <line x1="61" y1="108" x2="79" y2="108" stroke="#9DB6CC" strokeWidth="2.4" />
      <line x1="63.6" y1="101.6" x2="76.4" y2="114.4" stroke="#9DB6CC" strokeWidth="2" />
      <line x1="63.6" y1="114.4" x2="76.4" y2="101.6" stroke="#9DB6CC" strokeWidth="2" />
      <circle cx="70" cy="108" r="3.6" fill="#33414F" />
    </g>
    <circle cx="178" cy="108" r="21" fill="#33414F" />
    <circle cx="178" cy="108" r="21" fill="none" stroke="#222B35" strokeWidth="2.4" />
    <g style={{ transformBox:'fill-box', transformOrigin:'center', animation:'msn-wheelSpin 1.1s linear infinite' }}>
      <circle cx="178" cy="108" r="11" fill="#E4EFF8" />
      <line x1="178" y1="99" x2="178" y2="117" stroke="#9DB6CC" strokeWidth="2.4" />
      <line x1="169" y1="108" x2="187" y2="108" stroke="#9DB6CC" strokeWidth="2.4" />
      <line x1="171.6" y1="101.6" x2="184.4" y2="114.4" stroke="#9DB6CC" strokeWidth="2" />
      <line x1="171.6" y1="114.4" x2="184.4" y2="101.6" stroke="#9DB6CC" strokeWidth="2" />
      <circle cx="178" cy="108" r="3.6" fill="#33414F" />
    </g>
  </svg>
);

function SkyDecor() {
  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:1 }}>
      <Cloud style={{ position:'absolute', top:'9%', left:'-4%', width:'clamp(120px,22vw,200px)', opacity:.9, animation:'msn-drift 26s ease-in-out infinite' }} />
      <Cloud style={{ position:'absolute', top:'17%', right:'-3%', width:'clamp(100px,18vw,170px)', opacity:.72, animation:'msn-drift 32s ease-in-out infinite reverse' }} />
      <Cloud style={{ position:'absolute', bottom:'9%', left:'2%', width:'clamp(90px,16vw,150px)', opacity:.6, animation:'msn-floatY 9s ease-in-out infinite' }} />
      <Cloud style={{ position:'absolute', top:'44%', left:'7%', width:'clamp(70px,12vw,110px)', opacity:.48, animation:'msn-floatY 11s ease-in-out infinite' }} />
      <Cloud style={{ position:'absolute', bottom:'20%', right:'4%', width:'clamp(80px,14vw,130px)', opacity:.5, animation:'msn-floatY 10s ease-in-out infinite .8s' }} />
      {STARS_POS.map((s, i) => (
        <div key={i} style={{ position:'absolute', top:s.t, left:s.l, width:s.w, animation:`msn-twinkle ${s.d}s ease-in-out infinite ${s.delay}s` }}>
          <Star />
        </div>
      ))}
      <div style={{ position:'absolute', top:'30%', right:'13%', width:18, opacity:.5, animation:'msn-floatY 7s ease-in-out infinite' }}><Heart /></div>
      <div style={{ position:'absolute', bottom:'30%', left:'14%', width:14, opacity:.42, animation:'msn-floatY 8.5s ease-in-out infinite .5s' }}><Heart color="#A9CBEC" /></div>
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

type Phase = 'intro' | 'driving' | 'invite';

const CSS_ANIM = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Quicksand:wght@400;500;600;700&family=Nunito:wght@300;400;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;-webkit-font-smoothing:antialiased;}
  body{font-family:'Nunito',sans-serif;background:#EAF4FC;color:#27435C;}
  input,select,textarea{font-size:16px!important;}
  @keyframes msn-fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  @keyframes msn-carBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
  @keyframes msn-wheelSpin{to{transform:rotate(360deg)}}
  @keyframes msn-drift{0%,100%{transform:translateX(0)}50%{transform:translateX(28px)}}
  @keyframes msn-floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  @keyframes msn-twinkle{0%,100%{opacity:.35;transform:scale(.82)}50%{opacity:1;transform:scale(1.12)}}
  @keyframes msn-trailPop{0%{opacity:0;transform:translateY(8px) scale(.3)}35%{opacity:1}100%{opacity:0;transform:translateY(-36px) scale(1)}}
  @keyframes msn-shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
  @keyframes msn-fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes msn-slideUp{from{opacity:0;transform:scale(.92) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes msn-pulse{0%,100%{opacity:.42}50%{opacity:.9}}
  @media(max-width:480px){body{overflow:hidden}}
`;

export default function MasinutaClient(props: Props) {
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

  function startDrive() {
    if (phase !== 'intro') return;
    setPhase('driving');
    setTimeout(() => setPhase('invite'), 1900);
  }

  const a = (d: number): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s ease ${d}s, transform .7s ease ${d}s`,
  });

  const driving = phase === 'driving';
  const fade: React.CSSProperties = { opacity: driving ? 0 : 1, transition: 'opacity .5s ease' };

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
    onMouseEnter: (e: React.MouseEvent) => { const el = e.currentTarget as HTMLDivElement; el.style.transform='translateY(-4px)'; el.style.boxShadow='0 18px 48px rgba(40,90,150,.16)'; },
    onMouseLeave: (e: React.MouseEvent) => { const el = e.currentTarget as HTMLDivElement; el.style.transform=''; el.style.boxShadow='0 6px 28px rgba(40,90,150,.10)'; },
  };

  const events = [
    ...(religiousLocation ? [{
      type:'Slujba Religioasă', name:'Taina Botezului',
      venue:religiousLocation, time:religiousTime, dateDisplay:religiousDateDisplay,
      maps:religiousMaps, waze:religiousWaze,
      bg:'linear-gradient(135deg,#3D7DB8 0%,#285C92 100%)',
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
      bg:'linear-gradient(135deg,#6BA3D4 0%,#4682B8 100%)',
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
  background:'rgba(234,244,252,.93)',
  borderBottom:'1px solid rgba(110,150,190,.16)',
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
      color:'#2E6299',
      textDecoration:'none',
      transition:'color .2s'
    }}
    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color='#7EB8E8'}
    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color='#2E6299'}
  >
    Vibe<span style={{ color:'#4A8BC2' }}>Invite</span>
  </a>

  <div style={{
    position:'absolute',
    left:'50%',
    transform:'translateX(-50%)',
    fontFamily:"'Cormorant',serif",
    fontSize:15,
    fontStyle:'italic',
    color:'#5E7C95',
    letterSpacing:'.04em',
    overflow:'hidden',
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
    maxWidth:'60%',
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
            <p style={{ ...fade, fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(10px,1.2vw,12px)', letterSpacing:'.3em', textTransform:'uppercase', color:'#6B8FB5', fontWeight:600, animation:'msn-fadeUp .7s ease both' }}>Invitație la Botez</p>
            <h1 style={{ ...fade, fontFamily:"'Playfair Display',serif", fontSize:'clamp(40px,8vw,76px)', fontWeight:500, fontStyle:'italic', color:'#1E466E', textAlign:'center', lineHeight:1, margin:0, textShadow:'0 4px 24px rgba(60,120,190,.16)', animation:'msn-fadeUp .8s ease both .08s' }}>
              {childName || 'Botez'}
            </h1>
            <p style={{ ...fade, fontFamily:"'Cormorant',serif", fontSize:'clamp(14px,2vw,19px)', fontStyle:'italic', color:'#5E7C95', textAlign:'center', maxWidth:360, lineHeight:1.5, animation:'msn-fadeUp .9s ease both .16s' }}>
              Cu emoție și bucurie, vă invităm la botezul micuțului nostru
            </p>
            <div onClick={startDrive} role="button" tabIndex={0} onKeyDown={e => e.key==='Enter' && startDrive()} style={{ position:'relative', width:'min(94vw,560px)', height:'clamp(150px,32vw,220px)', cursor:'pointer', marginTop:6 }}>
              <div style={{ position:'absolute', left:'5%', right:'5%', bottom:'11%', height:3, borderRadius:3, background:'linear-gradient(90deg,transparent,rgba(110,143,176,.4) 14%,rgba(110,143,176,.4) 86%,transparent)' }} />
              <div style={{ position:'absolute', left:'12%', right:'12%', bottom:'11%', height:3, backgroundImage:'repeating-linear-gradient(90deg,#FFFFFF 0 16px, transparent 16px 34px)', opacity:.55 }} />
              {driving && TRAIL.map((it, i) => (
                <div key={i} style={{ position:'absolute', left:it.x, bottom:it.y, width:it.s, opacity:0, animation:`msn-trailPop 1s ease ${it.delay}s forwards`, zIndex:3, pointerEvents:'none' }}>
                  {it.k==='h' ? <Heart /> : it.k==='s' ? <Star /> : <Cloud />}
                </div>
              ))}
              <div style={{ position:'absolute', left:'50%', bottom:'13%', width:'clamp(150px,40vw,250px)', transform:driving ? 'translate(calc(-50% + 132vw),0)' : 'translate(-50%,0)', transition:'transform 1.85s cubic-bezier(.5,.03,.5,1)', zIndex:5 }}>
                <div style={{ animation:driving ? 'none' : 'msn-carBob 2.4s ease-in-out infinite' }}>
                  <CarSVG />
                </div>
              </div>
            </div>
            <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(10px,1.2vw,12px)', letterSpacing:'.24em', textTransform:'uppercase', color:'#6B8FB5', fontWeight:600, opacity:driving ? .9 : undefined, animation:driving ? 'none' : 'msn-fadeUp 1s ease both .4s, msn-pulse 2.8s ease-in-out infinite 1.4s' }}>
              {driving ? '✦  Pornim spre invitație…' : 'Atinge pentru a deschide'}
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
            <div style={{ ...a(0), marginBottom:14, display:'flex', justifyContent:'center', width:'100%' }}>
              <div style={{ position:'relative', width:'clamp(150px,30vw,220px)' }}>
                <div style={{ position:'absolute', top:-8, left:'50%', transform:'translateX(-50%)', width:26, animation:'msn-twinkle 3s ease-in-out infinite' }}><Star /></div>
                <div style={{ position:'absolute', top:12, left:'16%', width:16, animation:'msn-twinkle 3.6s ease-in-out infinite .5s' }}><Star /></div>
                <div style={{ position:'absolute', top:16, right:'16%', width:14, animation:'msn-twinkle 4s ease-in-out infinite .9s' }}><Star /></div>
                <Cloud style={{ width:'100%', filter:'drop-shadow(0 8px 18px rgba(90,140,200,.18))' }} />
                <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:24 }}><Heart color="#7EB0DE" /></div>
              </div>
            </div>

            <p style={{ ...a(.06), fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(10px,1.2vw,12px)', letterSpacing:'.3em', textTransform:'uppercase', color:'#6B8FB5', fontWeight:600, marginBottom:10 }}>
              Invitație la Botez
            </p>

            <div style={{ ...a(.12), textAlign:'center', marginBottom:6 }}>
              <span style={{ display:'block', fontFamily:"'Playfair Display',serif", fontSize:'clamp(54px,9.5vw,104px)', fontWeight:500, fontStyle:'italic', color:'#1E466E', lineHeight:.95, textShadow:'0 4px 28px rgba(60,120,190,.16)', letterSpacing:'-.01em' }}>
                {childName}
              </span>
              {/* {parentsNames && (
                <span style={{ display:'block', fontFamily:"'Cormorant',serif", fontSize:'clamp(15px,1.9vw,20px)', fontStyle:'italic', fontWeight:400, color:'#5E7C95', marginTop:6 }}>
                  Fiul lui {parentsNames}
                </span>
              )} */}
            </div>

            {/* divider */}
            <div style={{ ...a(.18), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'20px auto' }}>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(110,150,190,.4),transparent)' }} />
              <div style={{ width:18 }}><Star /></div>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(110,150,190,.4),transparent)' }} />
            </div>

            {/* date */}
            {mainDateDisplay && (
              <div style={{ ...a(.24), textAlign:'center', marginBottom:18 }}>
                <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(12px,1.7vw,16px)', letterSpacing:'.12em', color:'#1E466E', fontWeight:600, marginBottom:5 }}>{mainDateDisplay}</p>
              </div>
            )}

            {/* family */}
            {(parentsNames || nasiNames) && (
              <div style={{ ...a(.3), textAlign:'center', padding:'22px 28px', border:'1px solid rgba(110,150,190,.2)', borderRadius:20, background:'rgba(255,255,255,.55)', backdropFilter:'blur(10px)', maxWidth:360, width:'100%', boxShadow:'0 4px 24px rgba(40,90,150,.06)' }}>
                <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(9px,1.1vw,10px)', letterSpacing:'.22em', textTransform:'uppercase', color:'#6B8FB5', fontWeight:600, marginBottom:12 }}>Cu Binecuvântarea Familiei</p>
                <div style={{ width:36, height:1, background:'rgba(126,184,232,.6)', margin:'0 auto 14px' }} />
                {parentsNames && (
                  <>
                    <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(13px,1.5vw,15px)', fontStyle:'italic', color:'#5E7C95', marginBottom:4 }}>Părinții</p>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(18px,2.3vw,23px)', fontStyle:'italic', fontWeight:400, color:'#1E466E' }}>{parentsNames}</p>
                  </>
                )}
                {parentsNames && nasiNames && (
                  <div style={{ display:'flex', alignItems:'center', gap:10, justifyContent:'center', margin:'14px auto' }}>
                    <div style={{ width:40, height:1, background:'rgba(110,150,190,.3)' }} />
                    <div style={{ width:7, height:7, background:'#7EB8E8', transform:'rotate(45deg)' }} />
                    <div style={{ width:40, height:1, background:'rgba(110,150,190,.3)' }} />
                  </div>
                )}
                {nasiNames && (
                  <>
                    <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(13px,1.5vw,15px)', fontStyle:'italic', color:'#5E7C95', marginBottom:4 }}>Nașii</p>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(18px,2.3vw,23px)', fontStyle:'italic', fontWeight:400, color:'#1E466E' }}>{nasiNames}</p>
                  </>
                )}
              </div>
            )}

            {/* divider */}
            <div style={{ ...a(.36), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'20px auto' }}>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(110,150,190,.4),transparent)' }} />
              <div style={{ width:16 }}><Star color="#7EB8E8" /></div>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(110,150,190,.4),transparent)' }} />
            </div>

            {/* countdown */}
            {mainDateISO && (
              <div style={{ ...a(.44), width:'100%', maxWidth:440, background:'rgba(255,255,255,.55)', border:'1px solid rgba(110,150,190,.18)', borderRadius:22, padding:'clamp(18px,3vw,24px) clamp(12px,2vw,18px)', backdropFilter:'blur(12px)', textAlign:'center', boxShadow:'0 6px 28px rgba(40,90,150,.06)' }}>
                <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(8px,.95vw,10px)', letterSpacing:'.22em', textTransform:'uppercase', color:'#6B8FB5', fontWeight:600, marginBottom:14 }}>Timp Rămas Până La Botez</p>
                <div style={{ display:'flex', gap:0, justifyContent:'center' }}>
                  {[{ n:pad(cd.d), l:'Zile' }, { n:pad(cd.h), l:'Ore' }, { n:pad(cd.m), l:'Minute' }, { n:pad(cd.s), l:'Secunde', flip:flipS }].map(u => (
                    <div key={u.l} style={{ flex:1, maxWidth:104, textAlign:'center', padding:'0 4px', borderRight:'1px solid rgba(110,150,190,.18)' }}>
                      <span style={{ display:'block', fontFamily:"'Cormorant',serif", fontSize:'clamp(36px,5.8vw,58px)', fontWeight:300, lineHeight:1, transition:'transform .15s ease, color .15s ease', transform:(u as any).flip ? 'scale(1.1) translateY(-3px)' : 'scale(1)', color:(u as any).flip ? '#2E6299' : '#1E466E' }}>{u.n}</span>
                      <span style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(7px,.85vw,9px)', letterSpacing:'.12em', textTransform:'uppercase', color:'#6B8FB5', fontWeight:600, display:'block', marginTop:3 }}>{u.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* divider */}
            <div style={{ ...a(.50), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'20px auto' }}>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(110,150,190,.4),transparent)' }} />
              <div style={{ width:8, height:8, background:'#7EB8E8', transform:'rotate(45deg)', boxShadow:'0 0 0 3px rgba(126,184,232,.18)' }} />
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(110,150,190,.4),transparent)' }} />
            </div>

            {/* events timeline */}
            {events.length > 0 && (
              <div style={{ ...a(.54), width:'100%', maxWidth:520, position:'relative' }}>
                <div style={{ position:'absolute', left:19, top:10, bottom:10, width:2, background:'linear-gradient(180deg,rgba(126,184,232,.5),rgba(110,150,190,.15))' }} />
                {events.map((ev, idx) => (
                  <div key={idx} style={{ display:'flex', gap:16, marginBottom:idx < events.length-1 ? 22 : 0 }}>
                    <div style={{ flexShrink:0, width:40, height:40, borderRadius:'50%', background:ev.bg, border:'2px solid rgba(126,184,232,.5)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 18px rgba(40,90,150,.2)', zIndex:1 }}>
                      {ev.icon}
                    </div>
                    <div style={{ flex:1, borderRadius:16, border:'1.5px solid rgba(110,150,190,.2)', background:'rgba(255,255,255,.72)', backdropFilter:'blur(10px)', padding:'clamp(12px,2vw,16px) clamp(14px,2.5vw,20px)', boxShadow:'0 6px 26px rgba(40,90,150,.10)', transition:'transform .24s ease,box-shadow .24s ease' }} {...cardHover}>
                      <span style={{ fontFamily:"'Quicksand',sans-serif", fontSize:8.5, letterSpacing:'.2em', textTransform:'uppercase', color:'#4A8BC2', fontWeight:600, display:'block', marginBottom:2 }}>{ev.type}</span>
                      <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(14px,1.8vw,17px)', fontStyle:'italic', fontWeight:400, color:'#1E466E', lineHeight:1.2, marginBottom:6 }}>{ev.name}</p>
                      <p style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:'clamp(11px,1.3vw,13px)', color:'#1E466E', marginBottom:8 }}>{ev.venue}</p>
                      {ev.time && ev.dateDisplay && (
                        <div style={{ display:'inline-flex', alignItems:'center', gap:5, background:'#E4F0FB', border:'1px solid rgba(74,139,194,.2)', borderRadius:100, padding:'3px 10px', fontFamily:"'Quicksand',sans-serif", fontSize:8.5, letterSpacing:'.1em', textTransform:'uppercase', fontWeight:600, color:'#2E6299', marginBottom:10 }}>
                          ⏰ {ev.dateDisplay} · ora {ev.time}
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
            <div style={{ ...a(.58), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'20px auto' }}>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(110,150,190,.4),transparent)' }} />
              <div style={{ width:8, height:8, background:'#7EB8E8', transform:'rotate(45deg)', boxShadow:'0 0 0 3px rgba(126,184,232,.18)' }} />
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(110,150,190,.4),transparent)' }} />
            </div>

            {/* contact */}
            {contactPhone && (
              <div style={{ ...a(.62), width:'100%', maxWidth:640, background:'rgba(255,255,255,.6)', border:'1px solid rgba(110,150,190,.18)', borderRadius:18, padding:'clamp(14px,2.5vw,20px) clamp(16px,3vw,24px)', backdropFilter:'blur(8px)', boxShadow:'0 4px 20px rgba(40,90,150,.06)' }}>
                <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'#6B8FB5', fontWeight:600, marginBottom:12 }}>Contact Părinți</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
                  <div>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(14px,1.8vw,17px)', fontStyle:'italic', color:'#1E466E', marginBottom:2 }}>Familia</p>
                    <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(11px,1.3vw,13px)', color:'#2E6299', letterSpacing:'.06em', fontWeight:700 }}>{contactPhone}</p>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <a href={`tel:${contactPhone.replace(/\s/g,'')}`} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'9px 16px', borderRadius:100, background:'linear-gradient(135deg,#4A8BC2,#2E6299)', color:'#fff', fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.06em', boxShadow:'0 4px 14px rgba(46,98,153,.28)', textDecoration:'none' }}>
                      <PhoneIcon /> Telefon
                    </a>
                    <a href={`https://wa.me/${contactPhone.replace(/[\s+]/g,'')}`} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'9px 16px', borderRadius:100, background:'linear-gradient(135deg,#25D366,#1DA851)', color:'#fff', fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.06em', boxShadow:'0 4px 14px rgba(37,211,102,.28)', textDecoration:'none' }}>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* divider */}
            <div style={{ ...a(.66), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'20px auto' }}>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(110,150,190,.4),transparent)' }} />
              <div style={{ width:8, height:8, background:'#7EB8E8', transform:'rotate(45deg)', boxShadow:'0 0 0 3px rgba(126,184,232,.18)' }} />
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(110,150,190,.4),transparent)' }} />
            </div>

            {/* rsvp */}
            <div style={{ ...a(.70), textAlign:'center', width:'100%', maxWidth:380 }}>
              <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(14px,1.7vw,17px)', fontStyle:'italic', color:'#5E7C95', marginBottom:14, lineHeight:1.6, letterSpacing:'.03em' }}>
                {rsvpDeadline ? (
                  <>Vă rugăm să ne anunțați prezența până pe <strong style={{ color:'#2E6299', fontStyle:'normal' }}>{rsvpDeadline}</strong></>
                ) : 'Vă rugăm să ne anunțați prezența'}
              </p>
              <button
                onClick={() => setShowRsvp(true)}
                style={{ display:'block', width:'100%', padding:'clamp(14px,1.8vw,18px) 0', borderRadius:100, background:'linear-gradient(135deg,#4A8BC2 0%,#2E6299 100%)', color:'#fff', textAlign:'center', fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(11px,1.3vw,13px)', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', cursor:'pointer', border:'none', boxShadow:'0 10px 32px rgba(46,98,153,.4)', transition:'transform .22s,box-shadow .22s', position:'relative', overflow:'hidden' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform='translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 18px 42px rgba(46,98,153,.55)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform=''; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 10px 32px rgba(46,98,153,.4)'; }}>
                <span style={{ position:'relative', zIndex:1 }}>Confirmă Participarea ✦</span>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent)', backgroundSize:'350px 100%', animation:'msn-shimmer 3s linear infinite' }} />
              </button>
            </div>

            {/* footer */}
            <div style={{ ...a(.76), width:'100%', maxWidth:480, textAlign:'center', marginTop:26, padding:'clamp(18px,3vw,26px)', background:'rgba(255,255,255,.5)', border:'1px solid rgba(110,150,190,.18)', borderRadius:20, backdropFilter:'blur(8px)' }}>
              <span style={{ fontSize:30, display:'block', marginBottom:10 }}>☁️</span>
              <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(15px,2vw,20px)', fontStyle:'italic', color:'#3D5E7E', lineHeight:1.7, letterSpacing:'.01em' }}>
                Prezența dumneavoastră ne va aduce și mai multă bucurie într-o zi atât de specială pentru familia noastră.
              </p>
              <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(94,124,149,.5)', fontWeight:600, marginTop:16 }}>
                VibeInvite © {new Date().getFullYear()} · Toate drepturile rezervate
              </p>
            </div>

          </div>
        </div>
      )}

      {showRsvp && (
        <div
          onClick={() => setShowRsvp(false)}
          style={{ position:'fixed', inset:0, zIndex:400, background:'rgba(16,34,54,.55)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, animation:'msn-fadeIn .28s ease', overflowY:'auto' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background:'linear-gradient(165deg,#FFFFFF,#EFF6FD)', borderRadius:26, padding:'clamp(24px,4vw,38px) clamp(18px,4vw,32px)', maxWidth:460, width:'100%', border:'1px solid rgba(110,150,190,.2)', boxShadow:'0 40px 100px rgba(16,34,54,.3)', animation:'msn-slideUp .32s cubic-bezier(.4,0,.2,1)', maxHeight:'92dvh', overflowY:'auto', position:'relative' }}
          >
            <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(74,139,194,.5),transparent)' }} />
            <MasinutaRsvpForm orderId={orderId} onClose={() => setShowRsvp(false)} />
          </div>
        </div>
      )}
    </>
  );
}