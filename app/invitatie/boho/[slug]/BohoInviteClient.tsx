'use client';

import { useState, useEffect } from 'react';
import BohoRsvpForm from './BohoRsvpForm';

type Phase = 'envelope' | 'opening' | 'invite';

export interface BohoInviteClientProps {
  slug: string;
  brideName: string;
  groomName: string;
  initials: string;
  nasiNames: string;
  parentsNames: string;
  parentsBride?: string;
  parentsGroom?: string;
  weddingDateISO: string | null;
  weddingDateDisplay: string | null;
  weddingTime: string;
  locationName: string;
  religiousMaps: string; // AICI AM MODIFICAT
  wazeUrl: string;
  googleMapsUrl: string;
  isReligiousActive: boolean;
  religiousDateDisplay: string | null;
  religiousTime: string;
  religiousLocation: string;
  religiousWaze: string;
  ourStory: string;
  isMenuActive: boolean;
  menuDetails: any;
  isGalleryActive: boolean;
  isAccommodationActive: boolean;
  isTransportActive: boolean;
  contactPhoneBride: string;
  contactPhoneGroom: string;
  orderId: string | number;
}

function useCountdown(target: Date | null) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    if (!target) return;
    const ms = target.getTime();
    const tick = () => {
      const diff = ms - Date.now();
      if (diff <= 0) { setT({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setT({ d: Math.floor(diff / 864e5), h: Math.floor((diff % 864e5) / 36e5), m: Math.floor((diff % 36e5) / 6e4), s: Math.floor((diff % 6e4) / 1e3) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

const pad = (n: number) => String(n).padStart(2, '0');

function SunMandala({ size = 80 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: size, height: size }}>
      <circle cx="60" cy="60" r="18" stroke="#C17F3E" strokeWidth="1.2" strokeOpacity=".8"/>
      <circle cx="60" cy="60" r="12" stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".5"/>
      <circle cx="60" cy="60" r="6" fill="#C17F3E" fillOpacity=".4"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 60 + Math.cos(rad) * 22; const y1 = 60 + Math.sin(rad) * 22;
        const x2 = 60 + Math.cos(rad) * (i%3===0?46:i%3===1?38:32);
        const y2 = 60 + Math.sin(rad) * (i%3===0?46:i%3===1?38:32);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C17F3E" strokeWidth={i%3===0?"1.4":"0.9"} strokeOpacity={i%3===0?".75":".5"} strokeLinecap="round"/>;
      })}
      {[0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345].map(deg => {
        const rad=(deg*Math.PI)/180; const x=60+Math.cos(rad)*54; const y=60+Math.sin(rad)*54;
        return <circle key={deg} cx={x} cy={y} r="1" fill="#C17F3E" fillOpacity=".35"/>;
      })}
      {[45,135,225,315].map(deg => {
        const rad=(deg*Math.PI)/180; const cx=60+Math.cos(rad)*28; const cy=60+Math.sin(rad)*28;
        return <ellipse key={deg} cx={cx} cy={cy} rx="4" ry="8" fill="#7A9E6A" fillOpacity=".45" transform={`rotate(${deg+90} ${cx} ${cy})`}/>;
      })}
    </svg>
  );
}

function MacrameTop() {
  return (
    <svg viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 280 }}>
      <path d="M150 5 Q138 20 142 35 Q146 50 150 55 Q154 50 158 35 Q162 20 150 5Z" fill="#C17F3E" fillOpacity=".3" stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".5"/>
      <path d="M150 55 L150 100" stroke="#8B6343" strokeWidth="1.5" strokeOpacity=".4" strokeLinecap="round"/>
      <path d="M150 55 L120 75 L108 100" stroke="#8B6343" strokeWidth="1.2" strokeOpacity=".35" strokeLinecap="round"/>
      <path d="M150 55 L180 75 L192 100" stroke="#8B6343" strokeWidth="1.2" strokeOpacity=".35" strokeLinecap="round"/>
      <path d="M150 55 L100 85 L88 100" stroke="#8B6343" strokeWidth=".9" strokeOpacity=".28" strokeLinecap="round"/>
      <path d="M150 55 L200 85 L212 100" stroke="#8B6343" strokeWidth=".9" strokeOpacity=".28" strokeLinecap="round"/>
      <path d="M60 18 L240 18" stroke="#8B6343" strokeWidth="2.5" strokeOpacity=".5" strokeLinecap="round"/>
      {[70,90,110,130,150,170,190,210,230].map((x,i) => (
        <path key={x} d={`M${x} 18 Q${x+(i%2===0?3:-3)} ${40+i*2} ${x+(i%2===0?5:-5)} ${55+i}`} stroke="#8B6343" strokeWidth="1" strokeOpacity=".3" strokeLinecap="round" fill="none"/>
      ))}
      {[80,110,150,190,220].map(x => (
        <circle key={x} cx={x} cy={18} r="3" fill="#C17F3E" fillOpacity=".45" stroke="#8B6343" strokeWidth=".8" strokeOpacity=".4"/>
      ))}
      <path d="M55 18 Q28 30 20 52 Q36 42 55 18Z" fill="#7A9E6A" fillOpacity=".35"/>
      <path d="M245 18 Q272 30 280 52 Q264 42 245 18Z" fill="#7A9E6A" fillOpacity=".35"/>
    </svg>
  );
}

function MeadowDivider() {
  return (
    <svg viewBox="0 0 320 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 320 }}>
      <path d="M10 40 Q80 38 160 40 Q240 42 310 40" stroke="#8B6343" strokeWidth=".7" strokeOpacity=".4"/>
      {[
        {x:40,p:5,r:7,pc:'#D4A853',cc:'#C17F3E'},{x:80,p:6,r:6,pc:'#E8C88A',cc:'#C17F3E'},
        {x:120,p:5,r:8,pc:'#B8896A',cc:'#8B6343'},{x:160,p:7,r:7,pc:'#D4A853',cc:'#C17F3E'},
        {x:200,p:5,r:6,pc:'#E8C88A',cc:'#C17F3E'},{x:240,p:6,r:8,pc:'#B8896A',cc:'#8B6343'},
        {x:280,p:5,r:7,pc:'#D4A853',cc:'#C17F3E'},
      ].map(({x,p,r,pc,cc}) => (
        <g key={x} transform={`translate(${x} 36)`}>
          {Array.from({length:p}).map((_,i) => {
            const a=(i/p)*Math.PI*2;
            return <ellipse key={i} cx={Math.cos(a)*r} cy={Math.sin(a)*r} rx="3" ry="5" fill={pc} fillOpacity=".55" transform={`rotate(${(i/p)*360})`}/>;
          })}
          <circle cx="0" cy="0" r="3.5" fill={cc} fillOpacity=".7"/>
          <path d={`M0 0 L0 ${-r*2.5}`} stroke="#7A9E6A" strokeWidth="1" strokeOpacity=".5"/>
        </g>
      ))}
      {[30,70,110,150,190,230,270].map(x=>(
        <path key={x} d={`M${x} 38 Q${x+5} 28 ${x+10} 36`} fill="#7A9E6A" fillOpacity=".4"/>
      ))}
    </svg>
  );
}

function Feather({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(34px,5vw,56px)', transform: flip ? 'scaleX(-1)' : 'none' }}>
      <path d="M30 190 Q28 140 22 100 Q14 55 8 20 Q22 45 30 80 Q38 55 52 20 Q46 55 38 100 Q32 140 30 190Z" fill="#C17F3E" fillOpacity=".22" stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".38"/>
      <path d="M30 190 L30 80" stroke="#8B6343" strokeWidth="1" strokeOpacity=".45"/>
      {[80,100,120,140,160].map((y,i)=>{
        const w=14-i*1.5;
        return (<g key={y}><path d={`M30 ${y} Q${30-w} ${y-6} ${22-i*2} ${y-12}`} stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".38" fill="none"/><path d={`M30 ${y} Q${30+w} ${y-6} ${38+i*2} ${y-12}`} stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".38" fill="none"/></g>);
      })}
    </svg>
  );
}

function WazeIcon() { return (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/></svg>); }
function MapsIcon() { return (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>); }
function PhoneIcon() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>); }
function WaIcon() { return (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>); }

const MODAL_OVERLAY: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 300,
  background: 'rgba(74,55,40,.6)', backdropFilter: 'blur(10px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 16, animation: 'bh-fadeIn .28s ease',
  overflowY: 'auto', overscrollBehavior: 'contain',
};
const MODAL_BOX: React.CSSProperties = {
  background: 'linear-gradient(165deg,#FEFAF0,#F5EDD8)',
  borderRadius: 28, padding: 'clamp(24px,4vw,38px) clamp(18px,4vw,32px)',
  maxWidth: 480, width: '100%',
  border: '1.5px solid rgba(193,127,62,.25)',
  boxShadow: '0 40px 100px rgba(74,55,40,.3)',
  animation: 'bh-slideUp .32s cubic-bezier(.4,0,.2,1)',
  maxHeight: '90dvh', overflowY: 'auto', position: 'relative',
  overscrollBehavior: 'contain',
};
const BROWN_BTN: React.CSSProperties = {
  display: 'block', width: '100%', padding: '14px 0', borderRadius: 100,
  background: 'linear-gradient(135deg,#8B6343 0%,#6B4E2A 100%)',
  color: '#F5EDD8', fontFamily: "'EB Garamond',serif",
  fontSize: 14, fontStyle: 'italic', letterSpacing: '.1em',
  border: 'none', cursor: 'pointer',
  boxShadow: '0 8px 28px rgba(139,99,67,.28)',
  transition: 'transform .2s,box-shadow .2s',
};
const NAV_BTN: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  gap: 6, padding: '9px 14px', borderRadius: 12,
  fontFamily: "'EB Garamond',serif", fontSize: 11, fontStyle: 'italic',
  cursor: 'pointer', flex: 1, whiteSpace: 'nowrap' as const,
  border: 'none', textDecoration: 'none',
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Dancing+Script:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{
    height:100%; min-height:100dvh;
    overflow:hidden; overscroll-behavior:none;
    -webkit-font-smoothing:antialiased;
  }
  body{
    font-family:'EB Garamond',serif;
    background:#EDE0C4; color:#4A3728;
    height:100%; min-height:100dvh;
    overflow:hidden; overscroll-behavior:none;
    position:fixed; width:100%;
    -webkit-text-size-adjust:100%; text-size-adjust:100%;
  }
  input,textarea,select{
    font-size:16px !important;
    -webkit-text-size-adjust:100%; text-size-adjust:100%;
  }
  @keyframes bh-fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes bh-envFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes bh-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes bh-pulse{0%,100%{opacity:.45}50%{opacity:.9}}
  @keyframes bh-shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
  @keyframes bh-fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes bh-slideUp{from{opacity:0;transform:scale(.92) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
`;

function EnvelopeScreen({ onOpen, phase, brideName, groomName, weddingDateDisplay }: {
  onOpen: () => void; phase: Phase; brideName: string; groomName: string; weddingDateDisplay: string | null;
}) {
  return (
    <div style={{ position:'fixed', inset:0, top:56, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', overscrollBehavior:'none' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 70% at 50% 40%,#F5EDD8 0%,#EDE0C4 50%,#E5D5B0 100%)' }}/>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 45% at 18% 22%,rgba(193,127,62,.12) 0%,transparent 55%),radial-gradient(ellipse 45% 40% at 82% 78%,rgba(122,158,106,.1) 0%,transparent 55%)' }}/>
      <div style={{ position:'absolute', inset:0, opacity:.04, backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", pointerEvents:'none' }}/>
      <div style={{ position:'absolute', top:0, left:0, opacity:.7, pointerEvents:'none' }}><Feather/></div>
      <div style={{ position:'absolute', top:0, right:0, opacity:.7, pointerEvents:'none' }}><Feather flip/></div>

      <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:18, padding:'20px 24px' }}>
        <div style={{ animation:'bh-fadeUp .7s ease both', width:'clamp(180px,34vw,280px)', marginBottom:-4 }}><MacrameTop/></div>
        <p style={{ fontFamily:"'Dancing Script',cursive", fontSize:'clamp(13px,1.6vw,17px)', color:'#8B6343', opacity:.8, animation:'bh-fadeUp .75s ease both .06s', letterSpacing:'.06em' }}>o invitație cu suflet</p>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(30px,4.5vw,54px)', fontWeight:400, fontStyle:'italic', color:'#4A3728', textAlign:'center', lineHeight:1.15, animation:'bh-fadeUp .8s ease both .12s', margin:0 }}>
          <strong style={{ fontWeight:700, fontStyle:'normal', color:'#6B4E2A' }}>{brideName}</strong>
          <span style={{ color:'#C17F3E', fontWeight:300, fontSize:'.75em', display:'block', margin:'2px 0', letterSpacing:'.2em', fontStyle:'normal' }}>✦</span>
          <strong style={{ fontWeight:700, fontStyle:'normal', color:'#6B4E2A' }}>{groomName}</strong>
        </h1>

        <div onClick={onOpen} role="button" tabIndex={0} onKeyDown={(e)=>e.key==='Enter'&&onOpen()}
          style={{ animation:'bh-envFloat 5s ease-in-out infinite, bh-fadeUp .9s ease both .2s', position:'relative', width:'clamp(290px,44vw,540px)', cursor:'pointer', userSelect:'none', filter:'drop-shadow(0 28px 60px rgba(74,55,40,.22))' }}>
          <div style={{ position:'absolute', bottom:-20, left:'8%', right:'8%', height:24, background:'radial-gradient(ellipse,rgba(74,55,40,.18) 0%,transparent 70%)', filter:'blur(12px)', zIndex:0 }}/>
          {/* Letter */}
          <div style={{
            position:'absolute', left:'8%', right:'8%', bottom:'4%', height:'62%',
            zIndex:phase==='opening'?30:2,
            background:'linear-gradient(165deg,#FEFAF0 0%,#F5EDD8 100%)',
            border:'1px solid rgba(193,127,62,.3)', borderRadius:4,
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10,
            boxShadow:phase==='opening'?'0 40px 100px rgba(74,55,40,.28)':'0 2px 8px rgba(0,0,0,.06)',
            transform:phase==='opening'?'translateY(-145%) scale(1.06) rotate(-0.6deg)':'translateY(0)',
            transition:'transform 1.4s cubic-bezier(.22,.1,.2,1) .2s,box-shadow 1.4s ease .2s', overflow:'hidden',
          }}>
            <div style={{ position:'absolute', inset:0, opacity:.04, backgroundImage:'repeating-linear-gradient(0deg,#8B6343 0,#8B6343 1px,transparent 1px,transparent 24px)' }}/>
            <div style={{ textAlign:'center', padding:'0 20px', position:'relative', zIndex:1 }}>
              <div style={{ marginBottom:6 }}><SunMandala size={36}/></div>
              <p style={{ fontFamily:"'Dancing Script',cursive", fontSize:'clamp(16px,2.8vw,28px)', color:'#6B4E2A', lineHeight:1.2 }}>{brideName} &amp; {groomName}</p>
              <div style={{ width:40, height:1, background:'rgba(193,127,62,.45)', margin:'10px auto' }}/>
              {weddingDateDisplay && (<p style={{ fontFamily:"'EB Garamond',serif", fontSize:'clamp(8px,1vw,10px)', letterSpacing:'.22em', textTransform:'uppercase', color:'#8B6343', fontStyle:'italic' }}>{weddingDateDisplay}</p>)}
            </div>
          </div>
          {/* Envelope body */}
          <div style={{ width:'100%', paddingTop:'60%', position:'relative', zIndex:5 }}>
            <div style={{ position:'absolute', inset:0, background:'#E8D8B8', borderRadius:6, border:'1.5px solid rgba(193,127,62,.38)', boxShadow:'0 4px 20px rgba(74,55,40,.12)', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, bottom:0, left:0, width:'50%', background:'#DCC9A4', clipPath:'polygon(0 0,0 100%,100% 100%)' }}/>
              <div style={{ position:'absolute', top:0, bottom:0, right:0, width:'50%', background:'#DCC9A4', clipPath:'polygon(100% 0,0 100%,100% 100%)' }}/>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'50%', background:'#D4BF98', clipPath:'polygon(0 100%,50% 0,100% 100%)' }}/>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(193,127,62,.35),transparent)' }}/>
            </div>
            {/* Seal */}
            <div style={{
              position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-52%)',
              width:'clamp(54px,9vw,84px)', height:'clamp(54px,9vw,84px)',
              background:'radial-gradient(circle at 35% 35%,#E8C88A 0%,#C17F3E 55%,#8B5E28 100%)',
              borderRadius:'50%', border:'2px solid rgba(193,127,62,.55)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 0 0 6px rgba(193,127,62,.08),0 0 0 12px rgba(193,127,62,.04),0 8px 30px rgba(74,55,40,.2)',
              zIndex:10, opacity:phase==='opening'?0:1, transition:'opacity .25s',
            }}>
              <div style={{ position:'absolute', inset:-8, border:'1px dashed rgba(193,127,62,.4)', borderRadius:'50%', animation:'bh-spin 30s linear infinite' }}/>
              <SunMandala size={30}/>
            </div>
            {/* Flap */}
            <div style={{
              position:'absolute', top:0, left:0, right:0, zIndex:8, height:'52%',
              background:'linear-gradient(160deg,#EBD9B8 0%,#E0CC9E 100%)',
              clipPath:'polygon(0 0,100% 0,50% 100%)',
              transformOrigin:'top center',
              transform:phase==='opening'?'perspective(800px) rotateX(192deg)':'perspective(800px) rotateX(0deg)',
              transition:'transform 1.05s cubic-bezier(.4,0,.2,1)',
              borderBottom:'1.5px solid rgba(193,127,62,.28)',
            }}>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg,rgba(193,127,62,.06) 0%,transparent 50%)' }}/>
            </div>
          </div>
        </div>

        <p style={{ fontFamily:"'Dancing Script',cursive", fontSize:'clamp(13px,1.5vw,16px)', color:'#8B6343', opacity:.75,
          animation:phase==='opening'?'none':'bh-fadeUp 1s ease both .35s, bh-pulse 3s ease-in-out infinite 1.3s' }}>
          {phase==='opening'?'✦ se deschide cu drag...':'apasă să deschizi'}
        </p>
      </div>
    </div>
  );
}

function InviteScreen({ props }: { props: BohoInviteClientProps }) {
  const {
    slug, brideName, groomName, nasiNames, parentsNames, parentsBride, parentsGroom,
    weddingDateISO, weddingDateDisplay, weddingTime, locationName, wazeUrl, googleMapsUrl,
    isReligiousActive, religiousDateDisplay, religiousTime, religiousLocation, religiousWaze,religiousMaps,
    ourStory, isMenuActive, menuDetails, isGalleryActive,
    isAccommodationActive, isTransportActive, contactPhoneBride, contactPhoneGroom, orderId,
  } = props;
  const resolvedParentsBride = parentsBride?.trim() || '';
  const resolvedParentsGroom = parentsGroom?.trim() || '';
  const hasSeparateParents = !!(resolvedParentsBride || resolvedParentsGroom);
  let fallbackBride = '';
  let fallbackGroom = '';
  if (!hasSeparateParents && parentsNames) {
    const parts = parentsNames.split(' si ');
    fallbackBride = parts[0]?.trim() || '';
    fallbackGroom = parts.slice(1).join(' si ').trim() || '';
  }
  const displayParentsBride = resolvedParentsBride || fallbackBride;
  const displayParentsGroom = resolvedParentsGroom || fallbackGroom;
  const hasAnyParents = !!(displayParentsBride || displayParentsGroom);
  const weddingDate = weddingDateISO ? new Date(weddingDateISO) : null;
  const cd = useCountdown(weddingDate);
  const [flipS, setFlipS] = useState(false);
  const [vis, setVis] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const [galleryModal, setGalleryModal] = useState(false);
  const [rsvpModal, setRsvpModal] = useState(false);

  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);
  useEffect(() => { setFlipS(true); const t = setTimeout(() => setFlipS(false), 160); return () => clearTimeout(t); }, [cd.s]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key==='Escape') { setMenuModal(false); setGalleryModal(false); setRsvpModal(false); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const a = (d: number): React.CSSProperties => ({
    opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity .75s ease ${d}s,transform .75s ease ${d}s`,
  });

  return (
    <div style={{ position:'fixed', inset:0, top:56, overflowY:'auto', overflowX:'hidden', overscrollBehavior:'contain' }}>
      <div style={{ position:'fixed', inset:0, background:'radial-gradient(ellipse 90% 80% at 50% 30%,#F5EDD8 0%,#EDE0C4 55%,#E5D5B0 100%)', zIndex:0 }}/>
      <div style={{ position:'fixed', inset:0, background:'radial-gradient(ellipse 60% 50% at 15% 20%,rgba(193,127,62,.1) 0%,transparent 55%),radial-gradient(ellipse 50% 45% at 85% 80%,rgba(122,158,106,.08) 0%,transparent 55%)', zIndex:1, pointerEvents:'none' }}/>
      <div style={{ position:'fixed', inset:0, opacity:.035, zIndex:1, pointerEvents:'none', backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }}/>
      <div style={{ position:'fixed', top:0, left:0, opacity:.65, pointerEvents:'none', zIndex:2 }}><Feather/></div>
      <div style={{ position:'fixed', top:0, right:0, opacity:.65, pointerEvents:'none', zIndex:2 }}><Feather flip/></div>
      <div style={{ position:'fixed', top:'8%', left:'4%', right:'4%', height:1, background:'linear-gradient(90deg,transparent,rgba(193,127,62,.18),transparent)', zIndex:2, pointerEvents:'none' }}/>

      <div style={{ position:'relative', zIndex:10, maxWidth:700, margin:'0 auto', padding:'clamp(36px,6vw,64px) clamp(16px,4vw,32px) 60px', display:'flex', flexDirection:'column', alignItems:'center', gap:0 }}>

        <div style={{ ...a(0), width:'clamp(180px,38vw,280px)', marginBottom:12 }}><MacrameTop/></div>
        <p style={{ ...a(.06), fontFamily:"'Dancing Script',cursive", fontSize:'clamp(14px,1.8vw,18px)', color:'#8B6343', opacity:vis?.8:0, marginBottom:8, letterSpacing:'.04em' }}>cu drag vă invităm la</p>
        <div style={{ ...a(.08), marginBottom:8 }}><SunMandala size={80}/></div>

        <div style={{ ...a(.12), textAlign:'center', marginBottom:6 }}>
          <span style={{ display:'block', fontFamily:"'Playfair Display',serif", fontSize:'clamp(54px,9.5vw,104px)', fontWeight:700, fontStyle:'italic', color:'#4A3728', lineHeight:.92, letterSpacing:'-.01em' }}>{brideName}</span>
          <span style={{ display:'block', fontFamily:"'Dancing Script',cursive", fontSize:'clamp(26px,4vw,44px)', color:'#C17F3E', margin:'6px 0', lineHeight:1.1 }}>&amp;</span>
          <span style={{ display:'block', fontFamily:"'Playfair Display',serif", fontSize:'clamp(54px,9.5vw,104px)', fontWeight:700, fontStyle:'italic', color:'#4A3728', lineHeight:.92, letterSpacing:'-.01em' }}>{groomName}</span>
        </div>

        <div style={{ ...a(.18), margin:'20px auto', width:'100%', maxWidth:360 }}><MeadowDivider/></div>

        {(weddingDateDisplay || locationName) && (
          <div style={{ ...a(.22), textAlign:'center', marginBottom:20 }}>
            {weddingDateDisplay && (<p style={{ fontFamily:"'EB Garamond',serif", fontSize:'clamp(14px,1.8vw,18px)', letterSpacing:'.14em', color:'#4A3728', fontWeight:500, marginBottom:5, textTransform:'capitalize' }}>{weddingDateDisplay}</p>)}
            {locationName && (<p style={{ fontFamily:"'Dancing Script',cursive", fontSize:'clamp(16px,2vw,20px)', color:'#8B6343', letterSpacing:'.04em' }}>{locationName}</p>)}
          </div>
        )}

        {nasiNames && (
          <div style={{ ...a(.26), textAlign:'center', padding:'20px 28px', border:'1.5px solid rgba(193,127,62,.22)', borderRadius:24, background:'rgba(255,250,240,.6)', backdropFilter:'blur(8px)', maxWidth:380, width:'100%', boxShadow:'0 4px 24px rgba(74,55,40,.07)', marginBottom:0, position:'relative' }}>
            {['tl','tr','bl','br'].map(c=>(
              <div key={c} style={{ position:'absolute', top:c.startsWith('t')?8:'auto', bottom:c.startsWith('b')?8:'auto', left:c.endsWith('l')?8:'auto', right:c.endsWith('r')?8:'auto', width:10, height:10, borderTop:c.startsWith('t')?'1.5px solid rgba(193,127,62,.45)':'none', borderBottom:c.startsWith('b')?'1.5px solid rgba(193,127,62,.45)':'none', borderLeft:c.endsWith('l')?'1.5px solid rgba(193,127,62,.45)':'none', borderRight:c.endsWith('r')?'1.5px solid rgba(193,127,62,.45)':'none' }}/>
            ))}
            <p style={{ fontFamily:"'EB Garamond',serif", fontSize:'clamp(12px,1.4vw,14px)', fontStyle:'italic', color:'#8B6343', marginBottom:8, letterSpacing:'.04em' }}>alături de nașii noștri</p>
            <div style={{ width:32, height:1, background:'rgba(193,127,62,.38)', margin:'0 auto 10px' }}/>
            <p style={{ fontFamily:"'Dancing Script',cursive", fontSize:'clamp(20px,2.5vw,26px)', color:'#4A3728', letterSpacing:'.02em' }}>{nasiNames}</p>
          </div>
        )}

        {hasAnyParents && (
          <div style={{ ...a(.30), textAlign:'center', marginTop:14, marginBottom:4 }}>
            <p style={{ fontFamily:"'EB Garamond',serif", fontSize:'clamp(12px,1.4vw,14px)', fontStyle:'italic', color:'rgba(139,99,67,.6)', letterSpacing:'.04em' }}>împreună cu părinții</p>
            {displayParentsBride && (
              <p style={{ fontFamily:"'EB Garamond',serif", fontSize:'clamp(14px,1.6vw,16px)', fontStyle:'italic', fontWeight:400, color:'rgba(74,55,40,.75)', letterSpacing:'.04em', marginBottom: displayParentsGroom ? 4 : 0 }}>
                {displayParentsBride}
              </p>
            )}
            {displayParentsGroom && (
              <p style={{ fontFamily:"'EB Garamond',serif", fontSize:'clamp(14px,1.6vw,16px)', fontStyle:'italic', fontWeight:400, color:'rgba(74,55,40,.75)', letterSpacing:'.04em', marginBottom: 0 }}>
                {displayParentsGroom}
              </p>
            )}
          </div>
        )}

        <div style={{ ...a(.32), margin:'22px auto', width:'100%', maxWidth:360 }}><MeadowDivider/></div>

        {weddingDate && (
          <div style={{ ...a(.36), width:'100%', maxWidth:460, background:'rgba(255,250,240,.65)', border:'1.5px solid rgba(193,127,62,.18)', borderRadius:24, padding:'22px 18px', backdropFilter:'blur(10px)', textAlign:'center', boxShadow:'0 6px 28px rgba(74,55,40,.07)' }}>
            <p style={{ fontFamily:"'Dancing Script',cursive", fontSize:'clamp(14px,1.7vw,17px)', color:'#8B6343', marginBottom:14, opacity:.8, letterSpacing:'.02em' }}>timp rămas...</p>
            <div style={{ display:'flex', gap:0, justifyContent:'center' }}>
              {[{n:pad(cd.d),l:'Zile'},{n:pad(cd.h),l:'Ore'},{n:pad(cd.m),l:'Minute'},{n:pad(cd.s),l:'Secunde',flip:flipS}].map(u=>(
                <div key={u.l} style={{ flex:1, maxWidth:112, textAlign:'center', padding:'0 4px', borderRight:'1px solid rgba(193,127,62,.18)' }}>
                  <span style={{ display:'block', fontFamily:"'Playfair Display',serif", fontSize:'clamp(36px,5.8vw,58px)', fontWeight:400, lineHeight:1, transition:'transform .15s ease,color .15s ease', transform:(u as any).flip?'scale(1.1) translateY(-3px)':'scale(1)', color:(u as any).flip?'#C17F3E':'#4A3728' }}>{u.n}</span>
                  <span style={{ fontFamily:"'EB Garamond',serif", fontSize:'clamp(9px,.9vw,11px)', letterSpacing:'.12em', textTransform:'uppercase', color:'#8B6343', opacity:.65, display:'block', marginTop:3, fontStyle:'italic' }}>{u.l}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ ...a(.42), margin:'22px auto', width:'100%', maxWidth:360 }}><MeadowDivider/></div>

        <div style={{ ...a(.46), width:'100%', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap:'clamp(12px,2vw,20px)', maxWidth:640 }}>
          {/* Reception card */}
          <div style={{ borderRadius:20, overflow:'hidden', border:'1.5px solid rgba(193,127,62,.2)', background:'rgba(255,250,240,.7)', backdropFilter:'blur(10px)', boxShadow:'0 6px 24px rgba(74,55,40,.08)', transition:'transform .25s ease,box-shadow .25s ease' }}
            onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)';(e.currentTarget as HTMLDivElement).style.boxShadow='0 18px 48px rgba(74,55,40,.15)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform='';(e.currentTarget as HTMLDivElement).style.boxShadow='0 6px 24px rgba(74,55,40,.08)'}}>
            <div style={{ padding:'16px 18px 12px', background:'linear-gradient(135deg,#6B4E2A 0%,#4A3728 100%)', display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:12, background:'rgba(255,255,255,.14)', border:'1px solid rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#E8C88A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M8 18c0 1.65-1.35 3-3 3s-3-1.35-3-3c0-2 3-6 3-6s3 4 3 6z"/><path d="M5 12V4"/><path d="M19 14c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.5 2-4 2-4s2 2.5 2 4z"/><path d="M17 10V6"/><path d="M12 8l2-2M12 8l-2-2M12 8v4"/><circle cx="12" cy="14" r=".7" fill="#E8C88A" stroke="none"/></svg>
              </div>
              <div>
                <span style={{ fontFamily:"'EB Garamond',serif", fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(232,200,138,.65)', display:'block', marginBottom:2, fontStyle:'italic' }}>Recepție</span>
                <p style={{ fontFamily:"'Dancing Script',cursive", fontSize:'clamp(15px,1.9vw,19px)', color:'#F5EDD8', lineHeight:1.2 }}>Petrecerea</p>
              </div>
            </div>
            <div style={{ padding:'14px 18px 16px' }}>
              <p style={{ fontFamily:"'EB Garamond',serif", fontWeight:600, fontSize:'clamp(11px,1.2vw,13px)', color:'#4A3728', marginBottom:3, letterSpacing:'.03em' }}>{locationName}</p>
              {weddingDateDisplay && weddingTime && (<div style={{ display:'inline-flex', alignItems:'center', gap:5, background:'rgba(193,127,62,.1)', border:'1px solid rgba(193,127,62,.22)', borderRadius:100, padding:'4px 12px', fontFamily:"'EB Garamond',serif", fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'#8B6343', marginBottom:12, marginTop:4, fontStyle:'italic' }}>✿ {weddingDateDisplay} · ora {weddingTime}</div>)}
              {(wazeUrl || googleMapsUrl) && (
                <div style={{ display:'flex', gap:8, marginTop:8 }}>
                  {wazeUrl && (<a href={wazeUrl} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, background:'linear-gradient(135deg,rgba(8,162,212,.2),rgba(8,162,212,.12))', border:'1px solid rgba(8,162,212,.28)', color:'rgba(80,180,220,.9)' }}><WazeIcon/> Waze</a>)}
                  {googleMapsUrl && (<a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, background:'linear-gradient(135deg,rgba(76,175,79,.2),rgba(76,175,79,.12))', border:'1px solid rgba(76,175,79,.28)', color:'rgba(80,180,80,.9)' }}><MapsIcon/> Maps</a>)}
                </div>
              )}
            </div>
          </div>

          {isReligiousActive && (
            <div style={{ borderRadius:20, overflow:'hidden', border:'1.5px solid rgba(193,127,62,.2)', background:'rgba(255,250,240,.7)', backdropFilter:'blur(10px)', boxShadow:'0 6px 24px rgba(74,55,40,.08)', transition:'transform .25s ease,box-shadow .25s ease' }}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)';(e.currentTarget as HTMLDivElement).style.boxShadow='0 18px 48px rgba(74,55,40,.15)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform='';(e.currentTarget as HTMLDivElement).style.boxShadow='0 6px 24px rgba(74,55,40,.08)'}}>
              <div style={{ padding:'16px 18px 12px', background:'linear-gradient(135deg,#6B4E2A 0%,#4A3728 100%)', display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:12, background:'rgba(255,255,255,.14)', border:'1px solid rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#E8C88A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M12 2L12 6M10 4h4"/><rect x="4" y="9" width="16" height="12" rx="1"/><path d="M9 21V14a3 3 0 0 1 6 0v7"/><path d="M4 9l8-4 8 4"/></svg>
                </div>
                <div>
                  <span style={{ fontFamily:"'EB Garamond',serif", fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(232,200,138,.65)', display:'block', marginBottom:2, fontStyle:'italic' }}>Ceremonia Religioasă</span>
                  <p style={{ fontFamily:"'Dancing Script',cursive", fontSize:'clamp(15px,1.9vw,19px)', color:'#F5EDD8', lineHeight:1.2 }}>Cununia</p>
                </div>
              </div>
              <div style={{ padding:'14px 18px 16px' }}>
                <p style={{ fontFamily:"'EB Garamond',serif", fontWeight:600, fontSize:'clamp(11px,1.2vw,13px)', color:'#4A3728', marginBottom:3, letterSpacing:'.03em' }}>{religiousLocation}</p>
                {(religiousDateDisplay || religiousTime) && (<div style={{ display:'inline-flex', alignItems:'center', gap:5, background:'rgba(193,127,62,.1)', border:'1px solid rgba(193,127,62,.22)', borderRadius:100, padding:'4px 12px', fontFamily:"'EB Garamond',serif", fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'#8B6343', marginBottom:12, marginTop:4, fontStyle:'italic' }}>{religiousDateDisplay&&`✿ ${religiousDateDisplay}`}{religiousTime&&` · ora ${religiousTime}`}</div>)}
{/* ── START MODIFICARE AICI ── */}
                {(religiousWaze || religiousMaps) && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    {religiousWaze && <a href={religiousWaze} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, background: 'rgba(8,162,212,.15)', border: '1px solid rgba(8,162,212,.28)', color: 'rgba(8,162,212,.9)' }}><WazeIcon/> Waze</a>}
                    {religiousMaps && <a href={religiousMaps} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, background: 'rgba(76,175,79,.14)', border: '1px solid rgba(76,175,79,.25)', color: 'rgba(56,142,60,.9)' }}><MapsIcon/> Maps</a>}
                  </div>
                )}
                {/* ── END MODIFICARE AICI ── */}                </div>
            </div>
          )}
        </div>

        {ourStory && (
          <>
            <div style={{ ...a(.5), margin:'22px auto', width:'100%', maxWidth:360 }}><MeadowDivider/></div>
            <div style={{ ...a(.52), width:'100%', maxWidth:560, textAlign:'center', padding:'10px 0' }}>
              <p style={{ fontFamily:"'EB Garamond',serif", fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(139,99,67,.55)', marginBottom:16, fontStyle:'italic' }}>povestea noastră</p>
              <p style={{ fontFamily:"'EB Garamond',serif", fontSize:'clamp(16px,2vw,20px)', fontStyle:'italic', fontWeight:400, color:'rgba(74,55,40,.75)', lineHeight:1.85, letterSpacing:'.02em' }}>&ldquo;{ourStory}&rdquo;</p>
            </div>
          </>
        )}

        {(isAccommodationActive || isTransportActive) && (
          <div style={{ ...a(.54), display:'flex', gap:16, justifyContent:'center', padding:'16px 0', marginTop:8 }}>
            {isAccommodationActive && (<div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, padding:'16px 20px', background:'rgba(255,250,240,.6)', border:'1.5px solid rgba(193,127,62,.2)', borderRadius:18 }}><span style={{ fontSize:'2rem' }}>🏠</span><span style={{ fontFamily:"'EB Garamond',serif", fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(139,99,67,.6)', fontStyle:'italic' }}>Cazare</span></div>)}
            {isTransportActive && (<div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, padding:'16px 20px', background:'rgba(255,250,240,.6)', border:'1.5px solid rgba(193,127,62,.2)', borderRadius:18 }}><span style={{ fontSize:'2rem' }}>🚌</span><span style={{ fontFamily:"'EB Garamond',serif", fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(139,99,67,.6)', fontStyle:'italic' }}>Transport</span></div>)}
          </div>
        )}

        {(contactPhoneBride || contactPhoneGroom) && (
          <div style={{ ...a(.55), width:'100%', maxWidth:640, background:'rgba(255,250,240,.6)', border:'1.5px solid rgba(193,127,62,.18)', borderRadius:20, padding:'16px 20px', backdropFilter:'blur(8px)', boxShadow:'0 4px 20px rgba(74,55,40,.06)', marginTop:'clamp(12px,2vw,20px)' }}>
            <p style={{ fontFamily:"'EB Garamond',serif", fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'#8B6343', marginBottom:12, fontStyle:'italic', opacity:.75 }}>Contact</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:20, justifyContent:'center' }}>
              {contactPhoneBride && (
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
                  <div>
                    <p style={{ fontFamily:"'Dancing Script',cursive", fontSize:'clamp(16px,2vw,20px)', color:'#4A3728', marginBottom:2 }}>{brideName}</p>
                    <p style={{ fontFamily:"'EB Garamond',serif", fontSize:'clamp(12px,1.3vw,14px)', color:'#8B6343', letterSpacing:'.06em', fontStyle:'italic' }}>{contactPhoneBride}</p>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <a href={`tel:${contactPhoneBride}`} style={{ ...NAV_BTN, padding:'10px 18px', borderRadius:100, background:'rgba(139,99,67,.12)', border:'1px solid rgba(139,99,67,.28)', color:'#6B4E2A' }}><PhoneIcon/> Telefon</a>
                    <a href={`https://wa.me/${contactPhoneBride.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, padding:'10px 18px', borderRadius:100, background:'rgba(37,211,102,.1)', border:'1px solid rgba(37,211,102,.28)', color:'rgba(40,140,60,.9)' }}><WaIcon/> WhatsApp</a>
                  </div>
                </div>
              )}
              {contactPhoneGroom && (
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
                  <div>
                    <p style={{ fontFamily:"'Dancing Script',cursive", fontSize:'clamp(16px,2vw,20px)', color:'#4A3728', marginBottom:2 }}>{groomName}</p>
                    <p style={{ fontFamily:"'EB Garamond',serif", fontSize:'clamp(12px,1.3vw,14px)', color:'#8B6343', letterSpacing:'.06em', fontStyle:'italic' }}>{contactPhoneGroom}</p>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <a href={`tel:${contactPhoneGroom}`} style={{ ...NAV_BTN, padding:'10px 18px', borderRadius:100, background:'rgba(139,99,67,.12)', border:'1px solid rgba(139,99,67,.28)', color:'#6B4E2A' }}><PhoneIcon/> Telefon</a>
                    <a href={`https://wa.me/${contactPhoneGroom.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, padding:'10px 18px', borderRadius:100, background:'rgba(37,211,102,.1)', border:'1px solid rgba(37,211,102,.28)', color:'rgba(40,140,60,.9)' }}><WaIcon/> WhatsApp</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ ...a(.58), margin:'22px auto', width:'100%', maxWidth:360 }}><MeadowDivider/></div>

        {isMenuActive && menuDetails?.categories && (
          <div style={{ ...a(.59), width:'100%', maxWidth:400, marginBottom:16 }}>
            <button onClick={() => setMenuModal(true)} style={{ ...BROWN_BTN, display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 14px 40px rgba(139,99,67,.42)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 8px 28px rgba(139,99,67,.28)'}}>
              <span>🍽️</span> ✿ Meniu Eveniment ✿
            </button>
          </div>
        )}

        {isGalleryActive && (
          <div style={{ ...a(.60), width:'100%', maxWidth:640, background:'linear-gradient(160deg,rgba(193,127,62,.1) 0%,rgba(122,158,106,.08) 100%)', border:'2px dashed rgba(193,127,62,.32)', borderRadius:28, padding:'clamp(22px,3vw,32px) clamp(18px,3vw,28px)', textAlign:'center', marginBottom:16 }}>
            <h3 style={{ fontFamily:"'Dancing Script',cursive", fontSize:'clamp(20px,3vw,28px)', color:'#4A3728', marginBottom:10, lineHeight:1.2 }}>Împărtășiți momentele cu noi! 📸</h3>
            <p style={{ fontFamily:"'EB Garamond',serif", fontSize:'clamp(13px,1.6vw,15px)', fontStyle:'italic', color:'#6B4E2A', lineHeight:1.8, marginBottom:18, maxWidth:440, margin:'0 auto 18px' }}>Faceți poze în timpul nunții și încărcați-le direct din telefon.</p>
            <button onClick={() => setGalleryModal(true)} style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 32px', borderRadius:100, background:'linear-gradient(135deg,#8B6343 0%,#6B4E2A 100%)', color:'#F5EDD8', border:'none', cursor:'pointer', fontFamily:"'EB Garamond',serif", fontSize:'clamp(13px,1.5vw,15px)', fontStyle:'italic', letterSpacing:'.06em', boxShadow:'0 8px 28px rgba(139,99,67,.3)', transition:'transform .2s,box-shadow .2s' }}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 14px 40px rgba(139,99,67,.42)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 8px 28px rgba(139,99,67,.3)'}}>
              📸 Galerie Foto Live
            </button>
          </div>
        )}

        <div style={{ ...a(.65), textAlign:'center', width:'100%', maxWidth:400 }}>
          <p style={{ fontFamily:"'Dancing Script',cursive", fontSize:'clamp(15px,1.8vw,18px)', color:'#8B6343', marginBottom:14, lineHeight:1.7 }}>
            Confirmă-ți prezența la eveniment 🌿
          </p>
          <button onClick={() => setRsvpModal(true)} style={{ ...BROWN_BTN, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 16px 44px rgba(139,99,67,.45)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 8px 28px rgba(139,99,67,.28)'}}>
            <span style={{ position:'relative', zIndex:1 }}>✦ Confirmă Prezența ✦</span>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent)', backgroundSize:'350px 100%', animation:'bh-shimmer 3s linear infinite' }}/>
          </button>
        </div>

        <div style={{ ...a(.72), marginTop:32, textAlign:'center', opacity:.3, fontSize:11, fontFamily:"'EB Garamond',serif", letterSpacing:'.1em', fontStyle:'italic' }}>
          {contactPhoneBride && `${brideName}: ${contactPhoneBride}`}
          {contactPhoneBride && contactPhoneGroom && '  ·  '}
          {contactPhoneGroom && `${groomName}: ${contactPhoneGroom}`}
        </div>
      </div>

      {menuModal && (
        <div onClick={() => setMenuModal(false)} style={MODAL_OVERLAY}>
          <div onClick={e => e.stopPropagation()} style={{ ...MODAL_BOX, maxWidth:560 }}>
            <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(193,127,62,.45),transparent)' }}/>
            <div style={{ textAlign:'center', marginBottom:22 }}>
              <div style={{ marginBottom:10 }}><SunMandala size={52}/></div>
              <h2 style={{ fontFamily:"'Dancing Script',cursive", fontSize:'clamp(22px,3.5vw,30px)', color:'#4A3728', marginBottom:8 }}>Meniul Evenimentului</h2>
              <div style={{ width:36, height:1, background:'rgba(193,127,62,.4)', margin:'0 auto' }}/>
            </div>
            {menuDetails.categories.filter((cat: any) => cat.active && cat.items && cat.items.length > 0).map((cat: any, cIdx: number) => (
              <div key={cIdx} style={{ marginBottom:32 }}>
                <div style={{ display:'inline-block', borderBottom:'1px solid rgba(193,127,62,.3)', paddingBottom:10, marginBottom:16 }}>
                  <h4 style={{ color:'#4A3728', fontSize:'clamp(13px,1.6vw,16px)', margin:0, fontWeight:400, letterSpacing:'2px', fontFamily:"'EB Garamond',serif", fontStyle:'italic' }}><span style={{ marginRight:10 }}>{cat.emoji}</span>{cat.label}</h4>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {cat.items.map((item: any, iIdx: number) => (
                    <div key={iIdx}>
                      <div style={{ color:'#8B6343', fontSize:'clamp(14px,1.8vw,18px)', fontFamily:"'Dancing Script',cursive" }}>{item.name}</div>
                      {item.description && (<div style={{ fontSize:'clamp(11px,1.2vw,13px)', opacity:.6, fontStyle:'italic', marginTop:4, fontFamily:"'EB Garamond',serif", color:'#4A3728' }}>{item.description}</div>)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ textAlign:'center', marginTop:8 }}>
              <button onClick={() => setMenuModal(false)} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:"'EB Garamond',serif", fontSize:13, fontStyle:'italic', color:'rgba(139,99,67,.55)', textDecoration:'underline' }}>Închide</button>
            </div>
          </div>
        </div>
      )}

      {galleryModal && (
        <div onClick={() => setGalleryModal(false)} style={MODAL_OVERLAY}>
          <div onClick={e => e.stopPropagation()} style={{ ...MODAL_BOX, maxWidth:400, textAlign:'center' }}>
            <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(193,127,62,.45),transparent)' }}/>
            <div style={{ display:'flex', justifyContent:'center', marginBottom:14 }}>
              <div style={{ width:64, height:64, borderRadius:'50%', background:'rgba(193,127,62,.12)', border:'2px solid rgba(193,127,62,.28)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>📸</div>
            </div>
            <h2 style={{ fontFamily:"'Dancing Script',cursive", fontSize:28, color:'#4A3728', marginBottom:10 }}>Galerie Foto Live</h2>
            <div style={{ width:36, height:1, background:'rgba(193,127,62,.4)', margin:'0 auto 16px' }}/>
            <p style={{ fontFamily:"'EB Garamond',serif", fontSize:15, fontStyle:'italic', color:'rgba(139,99,67,.7)', marginBottom:24, lineHeight:1.8 }}>Împărtășește momentele surprinse de tine cu mirii.<br/>Apasă butonul de mai jos pentru a încărca pozele tale.</p>
            <a href={`/invitatie/boho/${slug}/upload`} style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'13px 32px', borderRadius:100, background:'linear-gradient(135deg,#8B6343 0%,#6B4E2A 100%)', color:'#F5EDD8', textDecoration:'none', fontFamily:"'EB Garamond',serif", fontSize:14, fontStyle:'italic', letterSpacing:'.08em', boxShadow:'0 8px 28px rgba(139,99,67,.3)', marginBottom:16 }}>📷 Încarcă Pozele</a>
            <br/>
            <button onClick={() => setGalleryModal(false)} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:"'EB Garamond',serif", fontSize:13, fontStyle:'italic', color:'rgba(139,99,67,.55)', textDecoration:'underline' }}>Închide</button>
          </div>
        </div>
      )}

      {rsvpModal && (
        <div onClick={() => setRsvpModal(false)} style={MODAL_OVERLAY}>
          <div onClick={e => e.stopPropagation()} style={MODAL_BOX}>
            <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(193,127,62,.45),transparent)' }}/>
            <div style={{ textAlign:'center', marginBottom:22 }}>
              <div style={{ marginBottom:10 }}><SunMandala size={52}/></div>
              <h2 style={{ fontFamily:"'Dancing Script',cursive", fontSize:'clamp(22px,3.5vw,30px)', color:'#4A3728', marginBottom:8 }}>Confirmă Prezența</h2>
              <div style={{ width:36, height:1, background:'rgba(193,127,62,.4)', margin:'0 auto' }}/>
            </div>
            <BohoRsvpForm orderId={orderId} showAccommodation={isAccommodationActive} showTransport={isTransportActive} />
            <div style={{ textAlign:'center', marginTop:16 }}>
              <button onClick={() => setRsvpModal(false)} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:"'EB Garamond',serif", fontSize:13, fontStyle:'italic', color:'rgba(139,99,67,.55)', textDecoration:'underline' }}>Închide</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BohoInviteClient(props: BohoInviteClientProps) {
  const [phase, setPhase] = useState<Phase>('envelope');

  function openEnvelope() {
    if (phase !== 'envelope') return;
    setPhase('opening');
    setTimeout(() => setPhase('invite'), 1700);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:200, height:56, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 clamp(14px,4vw,28px)', background:'rgba(237,224,196,.94)', borderBottom:'1px solid rgba(193,127,62,.18)', backdropFilter:'blur(12px)' }}>
        <a href="/" style={{ fontFamily:"'Dancing Script',cursive", fontSize:20, fontWeight:700, color:'#6B4E2A', textDecoration:'none', transition:'color .2s' }}
          onMouseEnter={e=>((e.currentTarget as HTMLAnchorElement).style.color='#C17F3E')}
          onMouseLeave={e=>((e.currentTarget as HTMLAnchorElement).style.color='#6B4E2A')}>
          Vibe<span style={{ color:'#C17F3E' }}>Invite</span>
        </a>
        <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:15, color:'#8B6343', letterSpacing:'.04em' }}>
          {phase === 'invite' ? `${props.brideName} & ${props.groomName}` : 'Invitație de Nuntă'}
        </div>
        <div style={{ width:80 }}/>
      </header>
      {phase !== 'invite' && (
        <EnvelopeScreen onOpen={openEnvelope} phase={phase} brideName={props.brideName} groomName={props.groomName} weddingDateDisplay={props.weddingDateDisplay} />
      )}
      {phase === 'invite' && <InviteScreen props={props} />}
    </>
  );
}