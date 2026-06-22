"use client";
import React, { useState, useEffect, useRef } from 'react';
import UrsuletRsvpForm from './UrsuletRsvpForm';

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

const SKY_BG = 'radial-gradient(ellipse 75% 60% at 22% 18%, rgba(210,190,160,.22) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 82% 84%, rgba(184,210,232,.18) 0%, transparent 55%), linear-gradient(158deg, #FEFCF7 0%, #FBF5E8 46%, #F7EDD8 100%)';

const FLOAT_STARS = [
  { t:'8%',  l:'6%',  w:18, d:3.2, delay:0  },
  { t:'16%', l:'80%', w:14, d:3.8, delay:.6 },
  { t:'40%', l:'8%',  w:12, d:4.2, delay:.3 },
  { t:'58%', l:'88%', w:16, d:3.5, delay:.9 },
  { t:'72%', l:'20%', w:10, d:4.6, delay:.2 },
];

const BALLOONS_BG = [
  { l:'3%',  d:20, delay:0, c:'#B8D8F0' },
  { l:'18%', d:24, delay:4, c:'#E8C99A' },
  { l:'38%', d:22, delay:8, c:'#B8D8F0' },
  { l:'60%', d:26, delay:2, c:'#D4B896' },
  { l:'80%', d:21, delay:5, c:'#B8D8F0' },
  { l:'92%', d:23, delay:1, c:'#E8C99A' },
];

const CONFETTI_COLS = ['#B8D8F0','#D4A574','#C8A882','#90B8D8','#DDB896','#E8C99A'];

const StarSVG = ({ color='#D4A574' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width:'100%', height:'auto' }}>
    <path d="M12 1C12.8 6.6 17.4 11.2 23 12C17.4 12.8 12.8 17.4 12 23C11.2 17.4 6.6 12.8 1 12C6.6 11.2 11.2 6.6 12 1Z" fill={color} />
  </svg>
);

const BalloonBG = ({ c }: { c: string }) => (
  <svg viewBox="0 0 60 100" fill="none" style={{ width:'100%', height:'auto' }}>
    <ellipse cx="30" cy="34" rx="28" ry="32" fill={c} />
    <path d="M30 64L30 96" stroke="#B0B8C0" strokeWidth="1.4" />
    <path d="M22 56C26 64 34 64 38 56L30 64Z" fill={c} />
    <ellipse cx="18" cy="20" rx="6" ry="9" fill="#FFFFFF" opacity=".28" />
  </svg>
);

function TeddyWatercolor({ wiggle=false }: { wiggle?: boolean }) {
  return (
    <svg viewBox="0 0 240 380" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width:'100%', height:'auto', display:'block', overflow:'visible',
        animation: wiggle ? 'urs-tWiggle .3s ease-in-out infinite alternate' : 'urs-tFloat 3.8s ease-in-out infinite' }}>
      <defs>
        <radialGradient id="urs-t_head" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#F9F2E6"/>
          <stop offset="40%" stopColor="#EAD8BA"/>
          <stop offset="85%" stopColor="#D5BE99"/>
          <stop offset="100%" stopColor="#C4AA83"/>
        </radialGradient>
        <radialGradient id="urs-t_body" cx="45%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#F6ECD8"/>
          <stop offset="65%" stopColor="#DBBFA3"/>
          <stop offset="100%" stopColor="#BE9E7C"/>
        </radialGradient>
        <radialGradient id="urs-t_muzzle" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF"/>
          <stop offset="70%" stopColor="#FFF9F0"/>
          <stop offset="100%" stopColor="#EFE3CE"/>
        </radialGradient>
        <radialGradient id="urs-t_balloon" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF"/>
          <stop offset="25%" stopColor="#E2F1FA"/>
          <stop offset="75%" stopColor="#B4D7EE"/>
          <stop offset="100%" stopColor="#90BEDB"/>
        </radialGradient>
        <radialGradient id="urs-t_bow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E2F1FA"/>
          <stop offset="70%" stopColor="#A2CBE6"/>
          <stop offset="100%" stopColor="#7DAFD0"/>
        </radialGradient>
        <filter id="urs-watercolor_effect" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>
      <ellipse cx="115" cy="368" rx="55" ry="6" fill="#A89478" opacity=".15"/>
      <path d="M142 144C155 190 145 250 152 305" stroke="#B2A494" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M136 142L142 152L148 142Z" fill="#A2CBE6" filter="url(#urs-watercolor_effect)"/>
      <path d="M134 145C138 141 146 141 150 145" stroke="#8AB1CC" strokeWidth="1" fill="none"/>
      <circle cx="142" cy="74" r="50" fill="url(#urs-t_balloon)" filter="url(#urs-watercolor_effect)"/>
      <g opacity="0.45" fill="#FFFFFF">
        <path d="M142 54L144 60L150 60L145 64L147 70L142 66L137 70L139 64L134 60L140 60Z"/>
        <path d="M166 84L167 87L170 87L168 89L169 92L166 90L163 92L164 89L162 87L165 87Z" transform="scale(0.7) translate(60, 20)"/>
        <path d="M115 90L116 93L119 93L117 95L118 98L115 96L112 98L113 95L111 93L114 93Z" transform="scale(0.6) translate(65, 50)"/>
        <circle cx="130" cy="84" r="2.5"/>
        <circle cx="158" cy="62" r="2"/>
        <circle cx="152" cy="92" r="1.5"/>
      </g>
      <ellipse cx="124" cy="56" rx="14" ry="24" fill="#FFFFFF" opacity="0.3" transform="rotate(-30 124 56)"/>
      <g filter="url(#urs-watercolor_effect)" stroke="#8AB1CC" strokeWidth="1" fill="none">
        <path d="M142 144C132 144 126 132 136 135C142 137 142 144 142 144Z" fill="#C2DCED" opacity="0.8"/>
        <path d="M142 144C152 144 158 132 148 135C142 137 142 144 142 144Z" fill="#C2DCED" opacity="0.8"/>
      </g>
      <g filter="url(#urs-watercolor_effect)">
        <circle cx="64" cy="164" r="24" fill="url(#urs-t_head)"/>
        <ellipse cx="64" cy="164" rx="14" ry="12" fill="#E2CDAF" opacity="0.7"/>
        <circle cx="156" cy="160" r="24" fill="url(#urs-t_head)"/>
        <ellipse cx="156" cy="160" rx="14" ry="12" fill="#E2CDAF" opacity="0.7"/>
      </g>
      <circle cx="112" cy="274" r="54" fill="url(#urs-t_body)" filter="url(#urs-watercolor_effect)"/>
      <g filter="url(#urs-watercolor_effect)">
        <ellipse cx="88" cy="336" rx="22" ry="24" fill="url(#urs-t_body)"/>
        <ellipse cx="88" cy="340" rx="15" ry="16" fill="#EAD9C2" opacity="0.6"/>
        <ellipse cx="140" cy="334" rx="22" ry="24" fill="url(#urs-t_body)"/>
        <ellipse cx="140" cy="340" rx="15" ry="16" fill="#EAD9C2" opacity="0.6"/>
      </g>
      <ellipse cx="60" cy="264" rx="16" ry="22" fill="url(#urs-t_body)" filter="url(#urs-watercolor_effect)" transform="rotate(20 60 264)"/>
      <ellipse cx="110" cy="214" rx="60" ry="54" fill="url(#urs-t_head)" filter="url(#urs-watercolor_effect)"/>
      <ellipse cx="112" cy="234" rx="26" ry="20" fill="url(#urs-t_muzzle)" filter="url(#urs-watercolor_effect)"/>
      <circle cx="86" cy="218" r="7" fill="#3D2B1F"/>
      <circle cx="84.5" cy="216" r="2.2" fill="#FFFFFF"/>
      <circle cx="134" cy="216" r="7" fill="#3D2B1F"/>
      <circle cx="132.5" cy="214" r="2.2" fill="#FFFFFF"/>
      <ellipse cx="111" cy="225" rx="7" ry="4.5" fill="#422A1D"/>
      <ellipse cx="109.5" cy="223.5" rx="2" ry="1" fill="#FFFFFF" opacity="0.4"/>
      <path d="M105 231Q111 236 111 231Q111 236 117 231" stroke="#422A1D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <ellipse cx="76" cy="228" rx="10" ry="6" fill="#F3A395" opacity="0.32" filter="url(#urs-watercolor_effect)"/>
      <ellipse cx="142" cy="226" rx="10" ry="6" fill="#F3A395" opacity="0.32" filter="url(#urs-watercolor_effect)"/>
      <ellipse cx="146" cy="246" rx="15" ry="20" fill="url(#urs-t_body)" filter="url(#urs-watercolor_effect)" transform="rotate(-35 146 246)"/>
      <g filter="url(#urs-watercolor_effect)">
        <path d="M110 256C88 244 80 266 94 274C104 280 108 266 110 256Z" fill="url(#urs-t_bow)"/>
        <path d="M114 256C136 244 144 266 130 274C120 280 116 266 114 256Z" fill="url(#urs-t_bow)"/>
        <ellipse cx="112" cy="259" rx="8" ry="7" fill="#7DAFD0"/>
      </g>
      <g fill="#FFFFFF" opacity="0.85">
        <circle cx="92" cy="256" r="1.8"/>
        <circle cx="88" cy="266" r="1.5"/>
        <circle cx="100" cy="270" r="1.8"/>
        <circle cx="132" cy="256" r="1.8"/>
        <circle cx="136" cy="266" r="1.5"/>
        <circle cx="124" cy="270" r="1.8"/>
      </g>
      <g opacity="0.25">
        <path d="M34 260C34 257 31 255 29 257C27 259 29 263 34 266C39 263 41 259 39 257C37 255 34 257 34 260Z" fill="#90BEDB"/>
        <path d="M184 220C184 217 181 215 179 217C177 219 179 223 184 226C189 223 191 219 189 217C187 215 184 217 184 220Z" fill="#90BEDB"/>
        <path d="M30 180L31 183L34 183L32 185L33 188L30 186L27 188L28 185L26 183L29 183Z" fill="#EAD8BA"/>
      </g>
    </svg>
  );
}

function BgDecor() {
  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:1 }}>
      {FLOAT_STARS.map((s,i) => (
        <div key={i} style={{ position:'absolute', top:s.t, left:s.l, width:s.w, animation:`urs-twinkle ${s.d}s ease-in-out infinite ${s.delay}s` }}>
          <StarSVG color={i%2 ? '#D4A574' : '#98C0DC'} />
        </div>
      ))}
      {BALLOONS_BG.map((b,i) => (
        <div key={i} style={{ position:'absolute', bottom:'-20%', left:b.l, width:'clamp(30px,5.5vw,50px)', opacity:.38, animation:`urs-riseUp ${b.d}s linear infinite ${b.delay}s` }}>
          <BalloonBG c={b.c} />
        </div>
      ))}
      <div style={{ position:'absolute', top:'-8%', right:'-6%', width:'clamp(180px,32vw,360px)', aspectRatio:'1', borderRadius:'50%', background:'radial-gradient(circle,rgba(200,165,110,.12),transparent 70%)', animation:'urs-breathe 9s ease-in-out infinite' }} />
      <div style={{ position:'absolute', bottom:'-10%', left:'-6%', width:'clamp(150px,26vw,300px)', aspectRatio:'1', borderRadius:'50%', background:'radial-gradient(circle,rgba(152,192,220,.12),transparent 70%)', animation:'urs-breathe 12s ease-in-out infinite 2s' }} />
    </div>
  );
}

function ConfettiCanvas({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const frame = useRef(0);
  const pts = useRef<{ x:number; y:number; vx:number; vy:number; r:number; c:string; sp:number; sv:number }[]>([]);

  useEffect(() => {
    if (!active) return;
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d')!;
    cv.width = window.innerWidth; cv.height = window.innerHeight;
    pts.current = Array.from({ length:110 }, () => ({
      x: Math.random()*cv.width, y: -20 - Math.random()*180,
      vx: (Math.random()-.5)*3, vy: 2+Math.random()*3,
      r: 4+Math.random()*7, c: CONFETTI_COLS[Math.floor(Math.random()*CONFETTI_COLS.length)],
      sp: Math.random()*Math.PI*2, sv: (Math.random()-.5)*.18,
    }));
    const draw = () => {
      ctx.clearRect(0,0,cv.width,cv.height);
      pts.current.forEach(p => {
        p.x+=p.vx; p.y+=p.vy; p.sp+=p.sv;
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.sp);
        ctx.fillStyle=p.c; ctx.globalAlpha=.85;
        ctx.beginPath(); ctx.ellipse(0,0,p.r,p.r*.44,0,0,Math.PI*2); ctx.fill();
        ctx.restore();
      });
      pts.current = pts.current.filter(p => p.y < cv.height+40);
      if (pts.current.length > 0) frame.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame.current);
  }, [active]);

  if (!active) return null;
  return <canvas ref={ref} style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:400 }} />;
}

function useCountdown(targetISO: string | null) {
  const [t, setT] = useState({ d:0, h:0, m:0, s:0 });
  useEffect(() => {
    if (!targetISO) return;
    const ms = new Date(targetISO).getTime();
    const tick = () => {
      const diff = ms - Date.now();
      if (diff<=0) { setT({d:0,h:0,m:0,s:0}); return; }
      setT({ d:Math.floor(diff/864e5), h:Math.floor((diff%864e5)/36e5), m:Math.floor((diff%36e5)/6e4), s:Math.floor((diff%6e4)/1e3) });
    };
    tick();
    const id = setInterval(tick,1000);
    return () => clearInterval(id);
  }, [targetISO]);
  return t;
}
const pad = (n: number) => String(n).padStart(2,'0');

function getRsvpDeadline(mainDateISO: string | null): string | null {
  if (!mainDateISO) return null;
  const d = new Date(mainDateISO);
  d.setDate(d.getDate()-7);
  const MONTHS_RO = ['ianuarie','februarie','martie','aprilie','mai','iunie','iulie','august','septembrie','octombrie','noiembrie','decembrie'];
  return `${d.getDate()} ${MONTHS_RO[d.getMonth()]} ${d.getFullYear()}`;
}

const WazeIcon  = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:14,height:14}}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/></svg>);
const MapsIcon  = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:14,height:14}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>);
const WAIcon    = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:14,height:14}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>);
const PhIcon    = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const BkArrow   = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);

type Phase = 'intro' | 'bounce' | 'invite';

const CSS_ANIM = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;1,300;1,400&family=Quicksand:wght@400;500;600;700&family=Nunito:wght@300;400;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;-webkit-font-smoothing:antialiased;}
  body{font-family:'Nunito',sans-serif;background:#FBF5E8;color:#8B5E3C;}
  input,select,textarea{font-size:16px!important;}
  @keyframes urs-fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes urs-tFloat{0%,100%{transform:translateY(0) rotate(-.5deg)}50%{transform:translateY(-10px) rotate(.5deg)}}
  @keyframes urs-tWiggle{from{transform:rotate(-4deg) scale(1.02)}to{transform:rotate(4deg) scale(.98)}}
  @keyframes urs-riseUp{0%{transform:translateY(0) rotate(-2deg);opacity:0}10%{opacity:.4}85%{opacity:.4}100%{transform:translateY(-115vh) rotate(2deg);opacity:0}}
  @keyframes urs-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
  @keyframes urs-twinkle{0%,100%{opacity:.22;transform:scale(.78) rotate(0deg)}50%{opacity:.85;transform:scale(1.18) rotate(14deg)}}
  @keyframes urs-burstUp{0%{opacity:0;transform:scale(.2)}60%{opacity:1}100%{opacity:0;transform:scale(1) translateY(-55px)}}
  @keyframes urs-fadeOut{0%,72%{opacity:1}100%{opacity:0}}
  @keyframes urs-shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
  @keyframes urs-fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes urs-slideUp{from{opacity:0;transform:scale(.93) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes urs-pulse{0%,100%{opacity:.44}50%{opacity:.95}}
  @media(max-width:480px){body{overflow:hidden}}
`;

export default function UrsuletInviteClient(props: Props) {
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
  const [confetti, setConfetti] = useState(false);
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

  function startBounce() {
    if (phase !== 'intro') return;
    setPhase('bounce');
    setTimeout(() => setPhase('invite'), 2000);
  }

  const a = (d: number): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'none' : 'translateY(24px)',
    transition: `opacity .65s ease ${d}s, transform .65s ease ${d}s`,
  });

  const mH = (url: string) => url.startsWith('http') ? url : `https://google.com/maps/search/?api=1&query=${encodeURIComponent(url)}`;
  const wH = (url: string) => url.startsWith('http') ? url : `https://waze.com/ul?q=${encodeURIComponent(url)}&navigate=yes`;

  const glass: React.CSSProperties = {
    background:'rgba(255,255,255,.7)', backdropFilter:'blur(14px)',
    border:'1px solid rgba(122,170,192,.22)', borderRadius:20,
    boxShadow:'0 8px 28px rgba(139,94,60,.08)',
  };

  const chip = (active: boolean): React.CSSProperties => ({
    flex:1, textAlign:'center', padding:'11px 6px', borderRadius:12,
    border:`1.5px solid ${active ? '#7AAAC0' : 'rgba(122,170,192,.24)'}`,
    background: active ? 'rgba(122,170,192,.14)' : 'rgba(255,255,255,.72)',
    color:'#8B5E3C', cursor:'pointer', fontFamily:"'Nunito',sans-serif",
    fontSize:13, fontWeight:700, userSelect:'none', transition:'all .18s',
  });

  const bouncing = phase === 'bounce';

  const events = [
    ...(religiousLocation ? [{
      emoji:'⛪', type:'Taina Botezului',
      venue:religiousLocation, addr:'', time:religiousTime, dateDisplay:religiousDateDisplay,
      maps:religiousMaps, waze:religiousWaze, colorIdx:0,
    }] : []),
    ...(restaurantLocation ? [{
      emoji:'🎉', type:'Recepție',
      venue:restaurantLocation, addr:'', time:mainTime, dateDisplay:mainDateDisplay,
      maps:restaurantMaps, waze:restaurantWaze, colorIdx:1,
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
  background:'rgba(254,252,247,.93)',
  borderBottom:'1px solid rgba(122,170,192,.16)',
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
      color:'#8B5E3C',
      textDecoration:'none',
      transition:'color .2s'
    }}
    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color='#7AAAC0'}
    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color='#8B5E3C'}
  >
    Vibe<span style={{ color:'#7AAAC0' }}>Invite</span>
  </a>

  <div style={{
    position:'absolute',
    left:'50%',
    transform:'translateX(-50%)',
    fontFamily:"'Cormorant',serif",
    fontSize:15,
    fontStyle:'italic',
    color:'#A07850',
    letterSpacing:'.04em',
    overflow:'hidden',
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
    maxWidth:'40%',
    textAlign:'center',
    pointerEvents:'none'
  }}>
    {phase==='invite' ? (childName || 'Botez') : 'Invitație la Botez'}
  </div>
</header>

      {phase !== 'invite' && (
        <div style={{ position:'fixed', inset:0, top:56, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ position:'absolute', inset:0, background:SKY_BG }} />
          <BgDecor />
          <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:10, padding:'16px 22px', width:'100%', maxWidth:480 }}>
            <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(9px,1.1vw,11px)', letterSpacing:'.32em', textTransform:'uppercase', color:'#7AAAC0', fontWeight:700, opacity:bouncing?0:1, transition:'opacity .4s', animation:'urs-fadeUp .7s ease both' }}>Invitație la Botez</p>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(34px,7vw,66px)', fontWeight:500, fontStyle:'italic', color:'#8B5E3C', textAlign:'center', lineHeight:1.05, margin:0, opacity:bouncing?0:1, transition:'opacity .4s', textShadow:'0 3px 20px rgba(139,94,60,.14)', animation:'urs-fadeUp .8s ease both .08s' }}>
              {childName || 'Botez'}
            </h1>
            <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(14px,2vw,18px)', fontStyle:'italic', color:'#A07850', textAlign:'center', lineHeight:1.5, opacity:bouncing?0:1, transition:'opacity .4s', animation:'urs-fadeUp .9s ease both .16s' }}>
              Apasă ursuletul să îți deschidă inima
            </p>
            <div onClick={startBounce} role="button" tabIndex={0} onKeyDown={e => e.key==='Enter' && startBounce()}
              style={{ cursor:'pointer', width:'clamp(180px,40vw,260px)', position:'relative', marginTop:6 }}>
              <TeddyWatercolor wiggle={bouncing} />
              {bouncing && (
                <div style={{ position:'absolute', inset:0, pointerEvents:'none', animation:'urs-fadeOut 1.8s ease forwards' }}>
                  {['✨','🎈','💙','⭐'].map((em,i) => (
                    <span key={i} style={{ position:'absolute', fontSize:20, left:`${12+i*20}%`, top:`${20+(i%3)*18}%`, animation:`urs-burstUp .9s ease ${i*.12}s both` }}>{em}</span>
                  ))}
                </div>
              )}
            </div>
            <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(9px,1.1vw,11px)', letterSpacing:'.24em', textTransform:'uppercase', color:'#7AAAC0', fontWeight:700, animation:bouncing ? 'none' : 'urs-fadeUp 1s ease both .4s, urs-pulse 2.8s ease-in-out infinite 1.4s' }}>
              {bouncing ? '🧸  Se pregătește magia…' : 'Apasă pentru a deschide invitația'}
            </p>
          </div>
        </div>
      )}

      {phase === 'invite' && (
        <div style={{ position:'fixed', inset:0, top:56, overflowY:'auto', overflowX:'hidden' }}>
          <div style={{ position:'fixed', inset:0, background:SKY_BG, zIndex:0 }} />
          <BgDecor />
          <ConfettiCanvas active={confetti} />

          <div style={{ position:'relative', zIndex:2, maxWidth:860, margin:'0 auto', padding:'32px 18px 56px' }}>

            {/* HERO */}
            <div style={{ ...a(0), display:'flex', alignItems:'center', gap:'clamp(14px,4vw,44px)', marginBottom:24, flexWrap:'wrap', justifyContent:'center' }}>
              <div style={{ width:'clamp(150px,28vw,210px)', flexShrink:0 }}>
                <TeddyWatercolor />
              </div>
              <div style={{ flex:'1 1 240px', textAlign:'left' }}>
                <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'clamp(9px,1.1vw,11px)', letterSpacing:'.3em', textTransform:'uppercase', color:'#7AAAC0', fontWeight:700, marginBottom:8 }}>Invitație la Botez</p>
                <span style={{ display:'block', fontFamily:"'Playfair Display',serif", fontSize:'clamp(42px,8vw,90px)', fontWeight:500, fontStyle:'italic', color:'#8B5E3C', lineHeight:.95, textShadow:'0 4px 24px rgba(139,94,60,.12)' }}>{childName}</span>
                {parentsNames && (
                  <span style={{ display:'block', fontFamily:"'Cormorant',serif", fontSize:'clamp(14px,1.8vw,18px)', fontStyle:'italic', color:'#A07850', marginTop:10, lineHeight:1.5 }}>
                    Fiul lui {parentsNames}
                    {mainDateDisplay && <><br /><span style={{ fontSize:'clamp(11px,1.3vw,14px)', letterSpacing:'.05em' }}>{mainDateDisplay}</span></>}
                  </span>
                )}
              </div>
            </div>

            {/* COUNTDOWN */}
            {mainDateISO && (
              <div style={{ ...a(.1), ...glass, padding:'20px 24px', marginBottom:20 }}>
                <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:9, letterSpacing:'.24em', textTransform:'uppercase', color:'#7AAAC0', fontWeight:700, textAlign:'center', marginBottom:14 }}>Timp Rămas</p>
                <div style={{ display:'flex', justifyContent:'center' }}>
                  {[{ n:pad(cd.d), l:'Zile' }, { n:pad(cd.h), l:'Ore' }, { n:pad(cd.m), l:'Minute' }, { n:pad(cd.s), l:'Secunde', flip:flipS }].map((u,i) => (
                    <div key={u.l} style={{ flex:1, maxWidth:110, textAlign:'center', padding:'0 6px', borderRight:i<3 ? '1px solid rgba(122,170,192,.18)' : undefined }}>
                      <span style={{ display:'block', fontFamily:"'Cormorant',serif", fontSize:'clamp(34px,5.5vw,56px)', fontWeight:300, lineHeight:1, color:(u as any).flip ? '#7AAAC0' : '#8B5E3C', transition:'all .15s', transform:(u as any).flip ? 'scale(1.12) translateY(-3px)' : 'scale(1)' }}>{u.n}</span>
                      <span style={{ fontFamily:"'Quicksand',sans-serif", fontSize:8, letterSpacing:'.14em', textTransform:'uppercase', color:'#7AAAC0', fontWeight:700, display:'block', marginTop:2 }}>{u.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAMILY */}
            {(parentsNames || nasiNames) && (
              <div style={{ ...a(.2), display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:'clamp(8px,2vw,20px)', alignItems:'center', marginBottom:20 }}>
                {[
                  ...(parentsNames ? [{ emoji:'🧸', label:'Părinții', name:parentsNames }] : []),
                  ...(nasiNames    ? [{ emoji:'🎈', label:'Nașii',    name:nasiNames    }] : []),
                ].map((f, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div style={{ textAlign:'center', ...glass, padding:'16px 12px' }}>
                      <span style={{ fontSize:22, display:'block', marginBottom:5 }}>{f.emoji}</span>
                      <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:8.5, letterSpacing:'.2em', textTransform:'uppercase', color:'#7AAAC0', fontWeight:700, marginBottom:6 }}>{f.label}</p>
                      <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(15px,1.9vw,19px)', fontStyle:'italic', color:'#8B5E3C', lineHeight:1.3 }}>{f.name}</p>
                    </div>
                    {idx === 0 && arr.length > 1 && (
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
                        <div style={{ width:1, height:'clamp(36px,7vw,60px)', background:'linear-gradient(180deg,transparent,rgba(122,170,192,.35),transparent)' }} />
                        <div style={{ width:7, height:7, background:'#98C0DC', transform:'rotate(45deg)' }} />
                        <div style={{ width:1, height:'clamp(36px,7vw,60px)', background:'linear-gradient(180deg,rgba(122,170,192,.35),transparent)' }} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* EVENTS */}
            {events.length > 0 && (
              <div style={{ ...a(.3), display:'flex', flexDirection:'column', gap:12, marginBottom:20 }}>
                {events.map((ev, idx) => (
                  <div key={idx} style={{ ...glass, overflow:'hidden', display:'flex', alignItems:'stretch' }}>
                    <div style={{ width:5, background:idx===0 ? 'linear-gradient(180deg,#7AAAC0,#5090B0)' : 'linear-gradient(180deg,#D4A574,#B07840)', flexShrink:0 }} />
                    <div style={{ padding:'14px 16px', flex:1 }}>
                      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
                        <div>
                          <span style={{ fontSize:17, marginRight:5 }}>{ev.emoji}</span>
                          <span style={{ fontFamily:"'Quicksand',sans-serif", fontSize:8, letterSpacing:'.18em', textTransform:'uppercase', color:'#7AAAC0', fontWeight:700 }}>{ev.type}</span>
                          <p style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:'clamp(12px,1.3vw,14px)', color:'#8B5E3C', marginTop:3 }}>{ev.venue}</p>
                          {ev.dateDisplay && <p style={{ fontSize:'clamp(10px,1.1vw,12px)', color:'#A07850', lineHeight:1.5 }}>{ev.dateDisplay}</p>}
                        </div>
                        {ev.time && (
                          <div style={{ display:'inline-flex', alignItems:'center', gap:4, background:'rgba(122,170,192,.12)', border:'1px solid rgba(122,170,192,.24)', borderRadius:100, padding:'4px 11px', fontFamily:"'Quicksand',sans-serif", fontSize:8, letterSpacing:'.1em', textTransform:'uppercase', fontWeight:700, color:'#5090B0', flexShrink:0 }}>🕛 {ev.time}</div>
                        )}
                      </div>
                      {(ev.waze || ev.maps) && (
                        <div style={{ display:'flex', gap:8, marginTop:10 }}>
                          {ev.waze && <a href={wH(ev.waze)} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:5, padding:'8px 6px', borderRadius:10, background:'linear-gradient(135deg,#08A2D4,#0788B0)', color:'#fff', fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700, textDecoration:'none', whiteSpace:'nowrap' }}><WazeIcon /> Waze</a>}
                          {ev.maps && <a href={mH(ev.maps)} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:5, padding:'8px 6px', borderRadius:10, background:'linear-gradient(135deg,#4CAF4F,#388E3C)', color:'#fff', fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700, textDecoration:'none', whiteSpace:'nowrap' }}><MapsIcon /> Maps</a>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CONTACT + RSVP */}
            <div style={{ ...a(.4), display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:14, marginBottom:20 }}>

              {contactPhone && (
                <div style={{ ...glass, padding:'16px 18px' }}>
                  <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:8.5, letterSpacing:'.2em', textTransform:'uppercase', color:'#7AAAC0', fontWeight:700, marginBottom:10 }}>Contact Părinți</p>
                  <p style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontStyle:'italic', color:'#8B5E3C', marginBottom:2 }}>Familia</p>
                  <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:13, color:'#5090B0', letterSpacing:'.06em', fontWeight:700, marginBottom:12 }}>{contactPhone}</p>
                  <div style={{ display:'flex', gap:8 }}>
                    <a href={`tel:${contactPhone.replace(/\s/g,'')}`} style={{ flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:5, padding:'9px 6px', borderRadius:11, background:'linear-gradient(135deg,#7AAAC0,#4880A0)', color:'#fff', fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700, textDecoration:'none' }}>
                      <PhIcon /> Telefon
                    </a>
                    <a href={`https://wa.me/${contactPhone.replace(/[\s+]/g,'')}`} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:5, padding:'9px 6px', borderRadius:11, background:'linear-gradient(135deg,#25D366,#1DA851)', color:'#fff', fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700, textDecoration:'none' }}>
                      <WAIcon /> WhatsApp
                    </a>
                  </div>
                </div>
              )}

              <div style={{ ...glass, padding:'16px 18px', display:'flex', flexDirection:'column', justifyContent:'space-between', gap:10 }}>
                <div>
                  <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:8.5, letterSpacing:'.2em', textTransform:'uppercase', color:'#7AAAC0', fontWeight:700, marginBottom:8 }}>Confirmare Prezență</p>
                  <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(13px,1.5vw,16px)', fontStyle:'italic', color:'#A07850', lineHeight:1.6 }}>
                    {rsvpDeadline ? (
                      <>Vă rugăm să confirmați<br />până pe <strong style={{ color:'#8B5E3C', fontStyle:'normal' }}>{rsvpDeadline}</strong></>
                    ) : 'Vă rugăm să confirmați prezența'}
                  </p>
                </div>
                <button
                  onClick={() => setShowRsvp(true)}
                  style={{ width:'100%', padding:'14px 0', borderRadius:100, background:'linear-gradient(135deg,#7AAAC0 0%,#4880A0 100%)', color:'#fff', fontFamily:"'Quicksand',sans-serif", fontSize:12, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', cursor:'pointer', border:'none', boxShadow:'0 10px 30px rgba(72,128,160,.35)', transition:'transform .22s,box-shadow .22s', position:'relative', overflow:'hidden' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 18px 40px rgba(72,128,160,.5)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform=''; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 10px 30px rgba(72,128,160,.35)'; }}>
                  <span style={{ position:'relative', zIndex:1 }}>🧸 Confirmă Participarea</span>
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)', backgroundSize:'350px 100%', animation:'urs-shimmer 3s linear infinite' }} />
                </button>
              </div>
            </div>

            {/* CLOSING */}
            <div style={{ ...a(.5), ...glass, textAlign:'center', padding:'22px 26px', marginBottom:18 }}>
              <div style={{ width:75, margin:'0 auto 10px' }}><TeddyWatercolor /></div>
              <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(15px,2vw,21px)', fontStyle:'italic', color:'#8B5E3C', lineHeight:1.7 }}>
                Prezența voastră este cel mai frumos cadou pentru familia noastră.
              </p>
            </div>

            {/* CTA */}
            <div style={{ ...a(.58), ...glass, padding:'18px 22px 22px', display:'flex', flexDirection:'column', alignItems:'center', gap:11 }}>
              <p style={{ fontFamily:"'Cormorant',serif", fontSize:15, fontStyle:'italic', color:'#A07850', margin:0, textAlign:'center' }}>Îți place această temă? Personalizează-o pentru botezul copilului tău</p>
              <a href="/preturi?tema=botez-ursulet" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 34px', borderRadius:100, background:'linear-gradient(135deg,#7AAAC0,#4880A0)', color:'#fff', textDecoration:'none', fontFamily:"'Quicksand',sans-serif", fontSize:12, fontWeight:700, letterSpacing:'.15em', textTransform:'uppercase', boxShadow:'0 8px 26px rgba(72,128,160,.35)', transition:'transform .2s,box-shadow .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow='0 16px 40px rgba(72,128,160,.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform=''; (e.currentTarget as HTMLAnchorElement).style.boxShadow='0 8px 26px rgba(72,128,160,.35)'; }}>
                🧸 Alege Această Temă
              </a>
              <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(122,170,192,.55)', fontWeight:700, margin:0 }}>
                VibeInvite © {new Date().getFullYear()} · Toate drepturile rezervate
              </p>
            </div>

          </div>
        </div>
      )}

      {showRsvp && (
        <div
          onClick={() => setShowRsvp(false)}
          style={{ position:'fixed', inset:0, zIndex:300, background:'rgba(60,80,100,.38)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, animation:'urs-fadeIn .28s ease', overflowY:'auto' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background:'linear-gradient(165deg,#FEFCF7,#EEF6FF)', borderRadius:28, padding:'clamp(22px,4vw,36px) clamp(16px,4vw,30px)', maxWidth:450, width:'100%', border:'1px solid rgba(122,170,192,.26)', boxShadow:'0 40px 100px rgba(60,80,100,.22)', animation:'urs-slideUp .32s cubic-bezier(.4,0,.2,1)', maxHeight:'92dvh', overflowY:'auto', position:'relative' }}
          >
            <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(122,170,192,.5),transparent)' }} />
            <UrsuletRsvpForm
              orderId={orderId}
              onClose={() => setShowRsvp(false)}
              onSuccess={() => { setShowRsvp(false); setConfetti(true); setTimeout(() => setConfetti(false), 3500); }}
            />
          </div>
        </div>
      )}
    </>
  );
}