"use client";
import React, { useState, useEffect } from 'react';
import FlutureRsvpForm from './FlutureRsvpForm';

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

const SKY_BG = 'radial-gradient(ellipse 72% 60% at 18% 18%, rgba(255,200,224,.35) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 85% 82%, rgba(255,224,190,.3) 0%, transparent 55%), linear-gradient(160deg, #FFFFFF 0%, #FFF1F6 46%, #FDE6F0 100%)';

const STARS_POS = [
  { t:'12%', l:'20%', w:16, d:3.2, delay:0   },
  { t:'24%', l:'74%', w:12, d:3.8, delay:.6  },
  { t:'40%', l:'12%', w:10, d:4.2, delay:.3  },
  { t:'58%', l:'80%', w:14, d:3.5, delay:.9  },
  { t:'70%', l:'28%', w:9,  d:4.6, delay:.2  },
  { t:'34%', l:'50%', w:8,  d:5,   delay:1.1 },
];

const TRAIL = [
  { x:'14%', y:'14%', s:16, delay:.05, k:'f' },
  { x:'26%', y:'34%', s:20, delay:.18, k:'p' },
  { x:'40%', y:'18%', s:14, delay:.32, k:'f' },
  { x:'52%', y:'40%', s:22, delay:.46, k:'b' },
  { x:'64%', y:'20%', s:16, delay:.6,  k:'p' },
  { x:'76%', y:'36%', s:18, delay:.74, k:'f' },
  { x:'34%', y:'48%', s:12, delay:.4,  k:'p' },
  { x:'58%', y:'14%', s:14, delay:.66, k:'f' },
];

const Star = ({ className='', style, color='#F7B8CF' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <path d="M12 1C12.8 6.6 17.4 11.2 23 12C17.4 12.8 12.8 17.4 12 23C11.2 17.4 6.6 12.8 1 12C6.6 11.2 11.2 6.6 12 1Z" fill={color} />
  </svg>
);

const Petal = ({ className='', style, color='#F9A8C9' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C18 6 20 12 12 22C4 12 6 6 12 2Z" fill={color} />
  </svg>
);

const Flower = ({ className='', style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 80 80" fill="none">
    <g>
      <ellipse cx="40" cy="22" rx="13" ry="18" fill="#FBC4DD" transform="rotate(0 40 40)" />
      <ellipse cx="40" cy="22" rx="13" ry="18" fill="#FBC4DD" transform="rotate(72 40 40)" />
      <ellipse cx="40" cy="22" rx="13" ry="18" fill="#FBC4DD" transform="rotate(144 40 40)" />
      <ellipse cx="40" cy="22" rx="13" ry="18" fill="#FBC4DD" transform="rotate(216 40 40)" />
      <ellipse cx="40" cy="22" rx="13" ry="18" fill="#FBC4DD" transform="rotate(288 40 40)" />
    </g>
    <circle cx="40" cy="40" r="10" fill="#F7D88A" />
  </svg>
);

const ButterflySVG = ({ className='' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 160" fill="none" style={{ width:'100%', height:'auto', display:'block', overflow:'visible' }}>
    <defs>
      <linearGradient id="flt-wgPink" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFCBE1" /><stop offset="1" stopColor="#F98EC0" /></linearGradient>
      <linearGradient id="flt-wgGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFE6B0" /><stop offset="1" stopColor="#F9C66B" /></linearGradient>
    </defs>
    <ellipse cx="100" cy="86" rx="80" ry="8" fill="#F98EC0" opacity=".12" />
    <line x1="100" y1="42" x2="100" y2="112" stroke="#C77AA0" strokeWidth="3" strokeLinecap="round" />
    <circle cx="100" cy="40" r="7" fill="#C77AA0" />
    <path d="M100 40C94 30 86 26 80 28" stroke="#C77AA0" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M100 40C106 30 114 26 120 28" stroke="#C77AA0" strokeWidth="2" strokeLinecap="round" fill="none" />
    <g style={{ transformBox:'fill-box', transformOrigin:'100px 76px', animation:'flt-wingFlapL .42s ease-in-out infinite alternate' }}>
      <path d="M98 70C60 30 20 40 14 70C20 100 60 110 98 80Z" fill="url(#flt-wgPink)" stroke="#F472B6" strokeOpacity=".4" strokeWidth="1.4" />
      <path d="M96 86C66 76 40 90 38 112C56 122 84 110 96 92Z" fill="url(#flt-wgGold)" stroke="#F9C66B" strokeOpacity=".5" strokeWidth="1.2" />
      <circle cx="48" cy="60" r="5" fill="#FFFFFF" opacity=".7" />
      <circle cx="64" cy="100" r="4" fill="#FFFFFF" opacity=".7" />
    </g>
    <g style={{ transformBox:'fill-box', transformOrigin:'100px 76px', animation:'flt-wingFlapR .42s ease-in-out infinite alternate' }}>
      <path d="M102 70C140 30 180 40 186 70C180 100 140 110 102 80Z" fill="url(#flt-wgPink)" stroke="#F472B6" strokeOpacity=".4" strokeWidth="1.4" />
      <path d="M104 86C134 76 160 90 162 112C144 122 116 110 104 92Z" fill="url(#flt-wgGold)" stroke="#F9C66B" strokeOpacity=".5" strokeWidth="1.2" />
      <circle cx="152" cy="60" r="5" fill="#FFFFFF" opacity=".7" />
      <circle cx="136" cy="100" r="4" fill="#FFFFFF" opacity=".7" />
    </g>
    <ellipse cx="100" cy="78" rx="6" ry="34" fill="#D6608F" />
  </svg>
);

function SkyDecor() {
  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:1 }}>
      <Flower style={{ position:'absolute', top:'8%', left:'-3%', width:'clamp(80px,16vw,140px)', opacity:.85, animation:'flt-floatY 12s ease-in-out infinite' }} />
      <Flower style={{ position:'absolute', top:'14%', right:'-4%', width:'clamp(70px,14vw,120px)', opacity:.7, animation:'flt-floatY 14s ease-in-out infinite 1s' }} />
      <Flower style={{ position:'absolute', bottom:'8%', left:'4%', width:'clamp(60px,12vw,100px)', opacity:.6, animation:'flt-floatY 10s ease-in-out infinite .5s' }} />
      <Flower style={{ position:'absolute', bottom:'16%', right:'6%', width:'clamp(50px,10vw,90px)', opacity:.55, animation:'flt-floatY 11s ease-in-out infinite 1.5s' }} />
      {STARS_POS.map((s, i) => (
        <div key={i} style={{ position:'absolute', top:s.t, left:s.l, width:s.w, animation:`flt-twinkle ${s.d}s ease-in-out infinite ${s.delay}s` }}>
          <Star />
        </div>
      ))}
      <div style={{ position:'absolute', top:'28%', right:'12%', width:16, opacity:.55, animation:'flt-floatY 7s ease-in-out infinite' }}><Petal /></div>
      <div style={{ position:'absolute', bottom:'32%', left:'12%', width:14, opacity:.5, animation:'flt-floatY 8.5s ease-in-out infinite .5s' }}><Petal color="#FBD0E2" /></div>
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

type Phase = 'intro' | 'flying' | 'invite';

const CSS_ANIM = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Quicksand:wght@400;500;600;700&family=Nunito:wght@300;400;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;-webkit-font-smoothing:antialiased;}
  body{font-family:'Nunito',sans-serif;background:#FFF1F6;color:#7A4A60;}
  input,select,textarea{font-size:16px!important;}
  @keyframes flt-fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  @keyframes flt-butterflyBob{0%,100%{transform:translateY(-50%)}50%{transform:translateY(calc(-50% - 12px))}}
  @keyframes flt-wingFlapL{from{transform:rotateY(0deg)}to{transform:rotateY(50deg)}}
  @keyframes flt-wingFlapR{from{transform:rotateY(0deg)}to{transform:rotateY(-50deg)}}
  @keyframes flt-spinSlow{to{transform:rotate(360deg)}}
  @keyframes flt-floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  @keyframes flt-twinkle{0%,100%{opacity:.35;transform:scale(.82)}50%{opacity:1;transform:scale(1.12)}}
  @keyframes flt-trailPop{0%{opacity:0;transform:translateY(8px) scale(.3)}35%{opacity:1}100%{opacity:0;transform:translateY(-36px) scale(1)}}
  @keyframes flt-shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
  @keyframes flt-fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes flt-slideUp{from{opacity:0;transform:scale(.92) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes flt-pulse{0%,100%{opacity:.42}50%{opacity:.9}}
  @media(max-width:480px){body{overflow:hidden}}
`;

export default function FlutureClient(props: Props) {
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

  function startFly() {
    if (phase !== 'intro') return;
    setPhase('flying');
    setTimeout(() => setPhase('invite'), 1900);
  }

  const a = (d: number): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s ease ${d}s, transform .7s ease ${d}s`,
  });

  const flying = phase === 'flying';
  const fade: React.CSSProperties = { opacity: flying ? 0 : 1, transition: 'opacity .5s ease' };

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
    onMouseEnter: (e: React.MouseEvent) => { const el = e.currentTarget as HTMLDivElement; el.style.transform='translateY(-4px)'; el.style.boxShadow='0 18px 48px rgba(247,140,190,.24)'; },
    onMouseLeave: (e: React.MouseEvent) => { const el = e.currentTarget as HTMLDivElement; el.style.transform=''; el.style.boxShadow='0 6px 28px rgba(247,140,190,.12)'; },
  };

  const events = [
    ...(religiousLocation ? [{
      type:'Slujba Religioasă', name:'Taina Botezului',
      venue:religiousLocation, time:religiousTime, dateDisplay:religiousDateDisplay,
      maps:religiousMaps, waze:religiousWaze,
      bg:'linear-gradient(135deg,#F98EC0 0%,#D6608F 100%)',
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
      bg:'linear-gradient(135deg,#F9C66B 0%,#E8965E 100%)',
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
  background:'rgba(255,241,246,.93)',
  borderBottom:'1px solid rgba(247,140,190,.18)',
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
      color:'#C2487A',
      textDecoration:'none',
      transition:'color .2s'
    }}
    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color='#F9C66B'}
    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color='#C2487A'}
  >
    Vibe<span style={{ color:'#F98EC0' }}>Invite</span>
  </a>

  <div style={{
    position:'absolute',
    left:'50%',
    transform:'translateX(-50%)',
    fontFamily:"'Cormorant',serif",
    fontSize:15,
    fontStyle:'italic',
    color:'#B57890',
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
            <p style={{ ...fade, fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(10px,1.2vw,12px)', letterSpacing:'.3em', textTransform:'uppercase', color:'#E89AB8', fontWeight:600, animation:'flt-fadeUp .7s ease both' }}>Invitație la Botez</p>
            <h1 style={{ ...fade, fontFamily:"'Playfair Display',serif", fontSize:'clamp(40px,8vw,76px)', fontWeight:500, fontStyle:'italic', color:'#C2487A', textAlign:'center', lineHeight:1, margin:0, textShadow:'0 4px 24px rgba(247,140,190,.22)', animation:'flt-fadeUp .8s ease both .08s' }}>
              {childName || 'Botez'}
            </h1>
            <p style={{ ...fade, fontFamily:"'Cormorant',serif", fontSize:'clamp(14px,2vw,19px)', fontStyle:'italic', color:'#B57890', textAlign:'center', maxWidth:360, lineHeight:1.5, animation:'flt-fadeUp .9s ease both .16s' }}>
              Cu emoție și bucurie, vă invităm la botezul micuței noastre
            </p>
            <div onClick={startFly} role="button" tabIndex={0} onKeyDown={e => e.key==='Enter' && startFly()} style={{ position:'relative', width:'min(94vw,520px)', height:'clamp(170px,36vw,240px)', cursor:'pointer', marginTop:6 }}>
              {flying && TRAIL.map((it, i) => (
                <div key={i} style={{ position:'absolute', left:it.x, top:it.y, width:it.s, opacity:0, animation:`flt-trailPop 1s ease ${it.delay}s forwards`, zIndex:3, pointerEvents:'none' }}>
                  {it.k==='f' ? <Flower /> : it.k==='p' ? <Petal /> : <Star color="#F9C66B" />}
                </div>
              ))}
              <div style={{ position:'absolute', left:'8%', top:'50%', width:'clamp(110px,28vw,170px)', transform:flying ? 'translate(118vw,-60%) rotate(8deg)' : 'translate(0,-50%) rotate(0deg)', transition:'transform 1.85s cubic-bezier(.5,.03,.5,1)', zIndex:5 }}>
                <div style={{ animation:flying ? 'none' : 'flt-butterflyBob 2.6s ease-in-out infinite' }}>
                  <ButterflySVG />
                </div>
              </div>
            </div>
            <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(10px,1.2vw,12px)', letterSpacing:'.24em', textTransform:'uppercase', color:'#E89AB8', fontWeight:600, opacity:flying ? .9 : undefined, animation:flying ? 'none' : 'flt-fadeUp 1s ease both .4s, flt-pulse 2.8s ease-in-out infinite 1.4s' }}>
              {flying ? '✦  Zburăm spre invitație…' : 'Atinge pentru a deschide'}
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
                <div style={{ position:'absolute', top:-8, left:'50%', transform:'translateX(-50%)', width:26, animation:'flt-twinkle 3s ease-in-out infinite' }}><Star /></div>
                <div style={{ position:'absolute', top:12, left:'16%', width:16, animation:'flt-twinkle 3.6s ease-in-out infinite .5s' }}><Star /></div>
                <div style={{ position:'absolute', top:16, right:'16%', width:14, animation:'flt-twinkle 4s ease-in-out infinite .9s' }}><Star /></div>
                <Flower style={{ width:'100%', filter:'drop-shadow(0 8px 18px rgba(247,140,190,.25))', animation:'flt-spinSlow 50s linear infinite' }} />
                <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:26 }}><ButterflySVG /></div>
              </div>
            </div>

            <p style={{ ...a(.06), fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(10px,1.2vw,12px)', letterSpacing:'.3em', textTransform:'uppercase', color:'#E89AB8', fontWeight:600, marginBottom:10 }}>
              Invitație la Botez
            </p>

            <div style={{ ...a(.12), textAlign:'center', marginBottom:6 }}>
              <span style={{ display:'block', fontFamily:"'Playfair Display',serif", fontSize:'clamp(54px,9.5vw,104px)', fontWeight:500, fontStyle:'italic', color:'#C2487A', lineHeight:.95, textShadow:'0 4px 28px rgba(247,140,190,.22)', letterSpacing:'-.01em' }}>
                {childName}
              </span>
              {/* {parentsNames && (
                <span style={{ display:'block', fontFamily:"'Cormorant',serif", fontSize:'clamp(15px,1.9vw,20px)', fontStyle:'italic', fontWeight:400, color:'#B57890', marginTop:6 }}>
                  Fiica lui {parentsNames}
                </span>
              )} */}
            </div>

            {/* divider */}
            <div style={{ ...a(.18), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'20px auto' }}>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(247,140,190,.35),transparent)' }} />
              <div style={{ width:18 }}><Star /></div>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(247,140,190,.35),transparent)' }} />
            </div>

            {/* date */}
            {mainDateDisplay && (
              <div style={{ ...a(.24), textAlign:'center', marginBottom:18 }}>
                <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(12px,1.7vw,16px)', letterSpacing:'.12em', color:'#C2487A', fontWeight:600, marginBottom:5 }}>{mainDateDisplay}</p>
              </div>
            )}

            {/* countdown */}
            {mainDateISO && (
              <div style={{ ...a(.32), width:'100%', maxWidth:440, background:'rgba(255,255,255,.6)', border:'1px solid rgba(247,140,190,.2)', borderRadius:22, padding:'clamp(18px,3vw,24px) clamp(12px,2vw,18px)', backdropFilter:'blur(12px)', textAlign:'center', boxShadow:'0 6px 28px rgba(247,140,190,.1)' }}>
                <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(8px,.95vw,10px)', letterSpacing:'.22em', textTransform:'uppercase', color:'#E89AB8', fontWeight:600, marginBottom:14 }}>Timp Rămas Până La Botez</p>
                <div style={{ display:'flex', gap:0, justifyContent:'center' }}>
                  {[{ n:pad(cd.d), l:'Zile' }, { n:pad(cd.h), l:'Ore' }, { n:pad(cd.m), l:'Minute' }, { n:pad(cd.s), l:'Secunde', flip:flipS }].map(u => (
                    <div key={u.l} style={{ flex:1, maxWidth:104, textAlign:'center', padding:'0 4px', borderRight:'1px solid rgba(247,140,190,.2)' }}>
                      <span style={{ display:'block', fontFamily:"'Cormorant',serif", fontSize:'clamp(36px,5.8vw,58px)', fontWeight:300, lineHeight:1, transition:'transform .15s ease, color .15s ease', transform:(u as any).flip ? 'scale(1.1) translateY(-3px)' : 'scale(1)', color:(u as any).flip ? '#F472B6' : '#C2487A' }}>{u.n}</span>
                      <span style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(7px,.85vw,9px)', letterSpacing:'.12em', textTransform:'uppercase', color:'#E89AB8', fontWeight:600, display:'block', marginTop:3 }}>{u.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* divider */}
            <div style={{ ...a(.38), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'20px auto' }}>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(247,140,190,.35),transparent)' }} />
              <div style={{ width:16 }}><Star color="#F9C66B" /></div>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(247,140,190,.35),transparent)' }} />
            </div>

            {/* family */}
            {(parentsNames || nasiNames) && (
              <div style={{ ...a(.44), textAlign:'center', padding:'22px 28px', border:'1px solid rgba(247,140,190,.22)', borderRadius:20, background:'rgba(255,255,255,.6)', backdropFilter:'blur(10px)', maxWidth:360, width:'100%', boxShadow:'0 4px 24px rgba(247,140,190,.1)' }}>
                <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(9px,1.1vw,10px)', letterSpacing:'.22em', textTransform:'uppercase', color:'#E89AB8', fontWeight:600, marginBottom:12 }}>Cu Binecuvântarea Familiei</p>
                <div style={{ width:36, height:1, background:'rgba(247,140,190,.5)', margin:'0 auto 14px' }} />
                {parentsNames && (
                  <>
                    <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(13px,1.5vw,15px)', fontStyle:'italic', color:'#B57890', marginBottom:4 }}>Părinții</p>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(18px,2.3vw,23px)', fontStyle:'italic', fontWeight:400, color:'#C2487A' }}>{parentsNames}</p>
                  </>
                )}
                {parentsNames && nasiNames && (
                  <div style={{ display:'flex', alignItems:'center', gap:10, justifyContent:'center', margin:'14px auto' }}>
                    <div style={{ width:40, height:1, background:'rgba(247,140,190,.3)' }} />
                    <div style={{ width:7, height:7, background:'#F9C66B', transform:'rotate(45deg)' }} />
                    <div style={{ width:40, height:1, background:'rgba(247,140,190,.3)' }} />
                  </div>
                )}
                {nasiNames && (
                  <>
                    <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(13px,1.5vw,15px)', fontStyle:'italic', color:'#B57890', marginBottom:4 }}>Nașii</p>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(18px,2.3vw,23px)', fontStyle:'italic', fontWeight:400, color:'#C2487A' }}>{nasiNames}</p>
                  </>
                )}
              </div>
            )}

            {/* divider */}
            <div style={{ ...a(.50), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'20px auto' }}>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(247,140,190,.35),transparent)' }} />
              <div style={{ width:8, height:8, background:'#F9C66B', transform:'rotate(45deg)', boxShadow:'0 0 0 3px rgba(249,198,107,.18)' }} />
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(247,140,190,.35),transparent)' }} />
            </div>

            {/* events timeline */}
            {events.length > 0 && (
              <div style={{ ...a(.54), width:'100%', maxWidth:520, position:'relative' }}>
                <div style={{ position:'absolute', left:19, top:10, bottom:10, width:2, background:'linear-gradient(180deg,rgba(249,142,192,.5),rgba(247,140,190,.15))' }} />
                {events.map((ev, idx) => (
                  <div key={idx} style={{ display:'flex', gap:16, marginBottom:idx < events.length-1 ? 22 : 0 }}>
                    <div style={{ flexShrink:0, width:40, height:40, borderRadius:'50%', background:ev.bg, border:'2px solid rgba(249,198,107,.5)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 18px rgba(247,140,190,.25)', zIndex:1 }}>
                      {ev.icon}
                    </div>
                    <div style={{ flex:1, borderRadius:16, border:'1.5px solid rgba(247,140,190,.2)', background:'rgba(255,255,255,.78)', backdropFilter:'blur(10px)', padding:'clamp(12px,2vw,16px) clamp(14px,2.5vw,20px)', boxShadow:'0 6px 26px rgba(247,140,190,.12)', transition:'transform .24s ease,box-shadow .24s ease' }} {...cardHover}>
                      <span style={{ fontFamily:"'Quicksand',sans-serif", fontSize:8.5, letterSpacing:'.2em', textTransform:'uppercase', color:'#F98EC0', fontWeight:600, display:'block', marginBottom:2 }}>{ev.type}</span>
                      <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(14px,1.8vw,17px)', fontStyle:'italic', fontWeight:400, color:'#C2487A', lineHeight:1.2, marginBottom:6 }}>{ev.name}</p>
                      <p style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:'clamp(11px,1.3vw,13px)', color:'#C2487A', marginBottom:8 }}>{ev.venue}</p>
                      {ev.time && ev.dateDisplay && (
                        <div style={{ display:'inline-flex', alignItems:'center', gap:5, background:'#FDEAF2', border:'1px solid rgba(244,114,182,.22)', borderRadius:100, padding:'3px 10px', fontFamily:"'Quicksand',sans-serif", fontSize:8.5, letterSpacing:'.1em', textTransform:'uppercase', fontWeight:600, color:'#C2487A', marginBottom:10 }}>
                          🌸 {ev.dateDisplay} · ora {ev.time}
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
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(247,140,190,.35),transparent)' }} />
              <div style={{ width:8, height:8, background:'#F9C66B', transform:'rotate(45deg)', boxShadow:'0 0 0 3px rgba(249,198,107,.18)' }} />
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(247,140,190,.35),transparent)' }} />
            </div>

            {/* contact */}
            {contactPhone && (
              <div style={{ ...a(.62), width:'100%', maxWidth:640, background:'rgba(255,255,255,.65)', border:'1px solid rgba(247,140,190,.2)', borderRadius:18, padding:'clamp(14px,2.5vw,20px) clamp(16px,3vw,24px)', backdropFilter:'blur(8px)', boxShadow:'0 4px 20px rgba(247,140,190,.1)' }}>
                <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'#E89AB8', fontWeight:600, marginBottom:12 }}>Contact Părinți</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
                  <div>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(14px,1.8vw,17px)', fontStyle:'italic', color:'#C2487A', marginBottom:2 }}>Familia</p>
                    <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(11px,1.3vw,13px)', color:'#D6608F', letterSpacing:'.06em', fontWeight:700 }}>{contactPhone}</p>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <a href={`tel:${contactPhone.replace(/\s/g,'')}`} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'9px 16px', borderRadius:100, background:'linear-gradient(135deg,#F98EC0,#D6608F)', color:'#fff', fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.06em', boxShadow:'0 4px 14px rgba(214,96,143,.3)', textDecoration:'none' }}>
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
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(247,140,190,.35),transparent)' }} />
              <div style={{ width:8, height:8, background:'#F9C66B', transform:'rotate(45deg)', boxShadow:'0 0 0 3px rgba(249,198,107,.18)' }} />
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(247,140,190,.35),transparent)' }} />
            </div>

            {/* rsvp */}
            <div style={{ ...a(.70), textAlign:'center', width:'100%', maxWidth:380 }}>
              <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(14px,1.7vw,17px)', fontStyle:'italic', color:'#B57890', marginBottom:14, lineHeight:1.6, letterSpacing:'.03em' }}>
                {rsvpDeadline ? (
                  <>Vă rugăm să ne anunțați prezența până pe <strong style={{ color:'#C2487A', fontStyle:'normal' }}>{rsvpDeadline}</strong></>
                ) : 'Vă rugăm să ne anunțați prezența'}
              </p>
              <button
                onClick={() => setShowRsvp(true)}
                style={{ display:'block', width:'100%', padding:'clamp(14px,1.8vw,18px) 0', borderRadius:100, background:'linear-gradient(135deg,#F98EC0 0%,#D6608F 100%)', color:'#fff', textAlign:'center', fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(11px,1.3vw,13px)', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', cursor:'pointer', border:'none', boxShadow:'0 10px 32px rgba(214,96,143,.36)', transition:'transform .22s,box-shadow .22s', position:'relative', overflow:'hidden' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform='translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 18px 42px rgba(214,96,143,.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform=''; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 10px 32px rgba(214,96,143,.36)'; }}>
                <span style={{ position:'relative', zIndex:1 }}>Confirmă Participarea ✦</span>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent)', backgroundSize:'350px 100%', animation:'flt-shimmer 3s linear infinite' }} />
              </button>
            </div>

            {/* footer */}
            <div style={{ ...a(.76), width:'100%', maxWidth:480, textAlign:'center', marginTop:26, padding:'clamp(18px,3vw,26px)', background:'rgba(255,255,255,.55)', border:'1px solid rgba(247,140,190,.2)', borderRadius:20, backdropFilter:'blur(8px)' }}>
              <span style={{ fontSize:30, display:'block', marginBottom:10 }}>🌸</span>
              <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(15px,2vw,20px)', fontStyle:'italic', color:'#A85C7C', lineHeight:1.7, letterSpacing:'.01em' }}>
                Prezența dumneavoastră ne va aduce și mai multă bucurie într-o zi atât de specială pentru familia noastră.
              </p>
              <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(181,120,144,.5)', fontWeight:600, marginTop:16 }}>
                VibeInvite © {new Date().getFullYear()} · Toate drepturile rezervate
              </p>
            </div>

          </div>
        </div>
      )}

      {showRsvp && (
        <div
          onClick={() => setShowRsvp(false)}
          style={{ position:'fixed', inset:0, zIndex:400, background:'rgba(120,40,80,.4)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, animation:'flt-fadeIn .28s ease', overflowY:'auto' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background:'linear-gradient(165deg,#FFFFFF,#FFF1F6)', borderRadius:26, padding:'clamp(24px,4vw,38px) clamp(18px,4vw,32px)', maxWidth:460, width:'100%', border:'1px solid rgba(247,140,190,.25)', boxShadow:'0 40px 100px rgba(180,80,120,.28)', animation:'flt-slideUp .32s cubic-bezier(.4,0,.2,1)', maxHeight:'92dvh', overflowY:'auto', position:'relative' }}
          >
            <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(249,142,192,.6),transparent)' }} />
            <FlutureRsvpForm orderId={orderId} onClose={() => setShowRsvp(false)} />
          </div>
        </div>
      )}
    </>
  );
}