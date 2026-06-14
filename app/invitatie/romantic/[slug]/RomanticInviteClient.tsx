'use client';

import { useState, useEffect } from 'react';
import RomanticRsvpForm from './RomanticRsvpForm';

type Phase = 'envelope' | 'opening' | 'invite';

export interface RomanticInviteClientProps {
  slug: string;
  brideName: string;
  groomName: string;
  initials: string;
  nasiNames: string;
  parentsNames: string;
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

/* ── Palette ── */
const P = {
  crimson: '#7B1A2E',
  rose: '#A63248',
  peony: '#C4506A',
  blush: '#E8A0A8',
  blush2: '#F2C8CE',
  petal: '#F7DDE2',
  cream: '#FDF5F6',
  cream2: '#F5E8EA',
  text: '#3D1520',
  textlt: '#8A4A58',
  white: '#FFFBFB',
};

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

/* ── SVG Components ── */
function HeartSVG({ size = 14, color = P.crimson }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 22" fill={color} style={{ width: size, height: size * 22 / 24 }}>
      <path d="M12 21C12 21 1 13.5 1 7.5C1 4.5 3.5 2 6.5 2C8.5 2 10.5 3 12 5C13.5 3 15.5 2 17.5 2C20.5 2 23 4.5 23 7.5C23 13.5 12 21 12 21Z"/>
    </svg>
  );
}

function PeonyBloom({ size = 100, opacity = 1 }: { size?: number; opacity?: number }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" style={{ width: size, height: size, opacity }}>
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 100 + Math.cos(rad) * 58, cy = 100 + Math.sin(rad) * 58;
        return <ellipse key={i} cx={cx} cy={cy} rx="28" ry="40" fill={P.blush} fillOpacity={.65 + i * .02} transform={`rotate(${deg} ${cx} ${cy})`}/>;
      })}
      {[22,67,112,157,202,247,292,337].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 100 + Math.cos(rad) * 44, cy = 100 + Math.sin(rad) * 44;
        return <ellipse key={i} cx={cx} cy={cy} rx="22" ry="32" fill={P.peony} fillOpacity=".5" transform={`rotate(${deg} ${cx} ${cy})`}/>;
      })}
      {[0,60,120,180,240,300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 100 + Math.cos(rad) * 28, cy = 100 + Math.sin(rad) * 28;
        return <ellipse key={i} cx={cx} cy={cy} rx="18" ry="26" fill={P.rose} fillOpacity=".6" transform={`rotate(${deg} ${cx} ${cy})`}/>;
      })}
      <circle cx="100" cy="100" r="14" fill={P.crimson} fillOpacity=".85"/>
      <circle cx="100" cy="100" r="7" fill={P.blush2} fillOpacity=".7"/>
    </svg>
  );
}

function RoseDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 440 }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${P.blush})` }}/>
      <svg viewBox="0 0 60 20" width="60" height="20" fill="none">
        <path d="M5 10 L22 10" stroke={P.blush} strokeWidth=".8" strokeOpacity=".7"/>
        <path d="M38 10 L55 10" stroke={P.blush} strokeWidth=".8" strokeOpacity=".7"/>
        <g transform="translate(30 10)">
          {[0,72,144,216,288].map(r => <ellipse key={r} cx="0" cy="-6" rx="4" ry="7" fill={P.peony} fillOpacity=".6" transform={`rotate(${r})`}/>)}
          <circle cx="0" cy="0" r="3" fill={P.crimson} fillOpacity=".7"/>
        </g>
        <circle cx="22" cy="10" r="1.5" fill={P.blush} fillOpacity=".8"/>
        <circle cx="38" cy="10" r="1.5" fill={P.blush} fillOpacity=".8"/>
      </svg>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${P.blush},transparent)` }}/>
    </div>
  );
}

function WazeIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/></svg>;
}

function MapsIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>;
}

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
}

function WaIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>;
}

const MODAL_OVERLAY: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 300,
  background: 'rgba(45,10,18,.45)', backdropFilter: 'blur(12px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 16, animation: 'rm-fadeIn .28s ease', overflowY: 'auto', overscrollBehavior: 'contain',
};

const MODAL_BOX: React.CSSProperties = {
  background: `linear-gradient(170deg,${P.white},${P.cream})`,
  borderRadius: 24, padding: 'clamp(24px,4vw,38px) clamp(18px,4vw,32px)',
  maxWidth: 480, width: '100%',
  border: '1.5px solid rgba(196,80,106,.22)',
  boxShadow: '0 40px 100px rgba(123,26,46,.2)',
  animation: 'rm-slideUp .32s cubic-bezier(.4,0,.2,1)',
  maxHeight: '90dvh', overflowY: 'auto', position: 'relative', overscrollBehavior: 'contain',
};

const NAV_BTN: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  gap: 6, padding: '9px 14px', borderRadius: 8,
  fontFamily: "'Cinzel',serif", fontSize: 10, fontWeight: 600, letterSpacing: '.12em',
  cursor: 'pointer', flex: 1, whiteSpace: 'nowrap' as const, border: 'none', textDecoration: 'none',
};

const ROSE_BTN: React.CSSProperties = {
  display: 'block', width: '100%', padding: '14px 0', borderRadius: 100,
  background: `linear-gradient(135deg,${P.crimson} 0%,${P.rose} 45%,${P.peony} 55%,${P.rose} 70%,${P.crimson} 100%)`,
  color: '#fff', fontFamily: "'Cinzel',serif", fontSize: 11, fontWeight: 600,
  letterSpacing: '.2em', textTransform: 'uppercase' as const,
  border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(123,26,46,.3)',
  transition: 'transform .2s,box-shadow .2s',
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,300;1,400;1,600&family=Lato:wght@300;400;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{
    height:100%;min-height:100dvh;overflow:hidden;overscroll-behavior:none;
    -webkit-font-smoothing:antialiased;
  }
  body{
    font-family:'Lato',sans-serif;background:${P.cream};color:${P.text};
    height:100%;min-height:100dvh;overflow:hidden;overscroll-behavior:none;
    position:fixed;width:100%;-webkit-text-size-adjust:100%;text-size-adjust:100%;
  }
  input,textarea,select{font-size:16px!important;-webkit-text-size-adjust:100%;text-size-adjust:100%;}
  @keyframes rm-fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes rm-envFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes rm-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes rm-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes rm-pulse{0%,100%{opacity:.45}50%{opacity:.9}}
  @keyframes rm-heartbeat{0%{transform:scale(1)}14%{transform:scale(1.22)}28%{transform:scale(1)}42%{transform:scale(1.12)}70%{transform:scale(1)}100%{transform:scale(1)}}
  @keyframes rm-shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
  @keyframes rm-fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes rm-slideUp{from{opacity:0;transform:scale(.93) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
`;

/* ── Envelope Screen ── */
function EnvelopeScreen({
  onOpen, phase, brideName, groomName, initials, weddingDateDisplay,
}: {
  onOpen: () => void; phase: Phase; brideName: string; groomName: string;
  initials: string; weddingDateDisplay: string | null;
}) {
  return (
    <div style={{ position: 'fixed', inset: 0, top: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', overscrollBehavior: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 85% 75% at 50% 42%,${P.cream} 0%,${P.petal} 40%,${P.blush2} 75%,${P.blush} 100%)` }}/>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 65% at 50% 45%,transparent 35%,rgba(123,26,46,.06) 100%)`, pointerEvents: 'none' }}/>
      {/* Decorative corner peonies */}
      <div style={{ position: 'absolute', top: -30, left: -30, opacity: .3, pointerEvents: 'none', animation: 'rm-float 8s ease-in-out infinite' }}><PeonyBloom size={180}/></div>
      <div style={{ position: 'absolute', top: -35, right: -35, opacity: .25, pointerEvents: 'none', animation: 'rm-float 9s ease-in-out infinite 1.5s', transform: 'scaleX(-1)' }}><PeonyBloom size={190}/></div>
      <div style={{ position: 'absolute', bottom: -35, left: -20, opacity: .22, pointerEvents: 'none', animation: 'rm-float 7.5s ease-in-out infinite 0.8s', transform: 'scaleY(-1)' }}><PeonyBloom size={160}/></div>
      <div style={{ position: 'absolute', bottom: -40, right: -25, opacity: .26, pointerEvents: 'none', animation: 'rm-float 8.5s ease-in-out infinite 2s', transform: 'scale(-1)' }}><PeonyBloom size={175}/></div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '20px 24px' }}>
        <div style={{ animation: 'rm-heartbeat 2.4s ease-in-out infinite, rm-fadeUp .6s ease both' }}>
          <HeartSVG size={26} color={P.crimson}/>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(12px,1.4vw,14px)', fontStyle: 'italic', color: P.textlt, animation: 'rm-fadeUp .7s ease both .05s', letterSpacing: '.08em' }}>
          o poveste de dragoste
        </p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 400, fontStyle: 'italic', color: P.text, textAlign: 'center', lineHeight: 1.12, animation: 'rm-fadeUp .8s ease both .12s', margin: 0 }}>
          <strong style={{ fontWeight: 600, fontStyle: 'normal', color: P.crimson }}>{brideName}</strong>
          <span style={{ display: 'block', fontFamily: "'Cormorant Garamond',serif", fontSize: '.55em', fontWeight: 300, color: P.blush, fontStyle: 'italic', letterSpacing: '.12em', margin: '2px 0' }}>&amp;</span>
          <strong style={{ fontWeight: 600, fontStyle: 'normal', color: P.crimson }}>{groomName}</strong>
        </h1>

        {/* Envelope */}
        <div
          onClick={onOpen} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onOpen()}
          style={{ animation: 'rm-envFloat 5.5s ease-in-out infinite, rm-fadeUp .85s ease both .2s', position: 'relative', width: 'clamp(290px,44vw,520px)', cursor: 'pointer', userSelect: 'none', filter: `drop-shadow(0 24px 50px rgba(123,26,46,.2))` }}
        >
          <div style={{ position: 'absolute', bottom: -18, left: '9%', right: '9%', height: 22, background: `radial-gradient(ellipse,rgba(123,26,46,.18) 0%,transparent 70%)`, filter: 'blur(10px)', zIndex: 0 }}/>
          {/* Letter inside envelope */}
          <div style={{
            position: 'absolute', left: '8%', right: '8%', bottom: '4%', height: '62%',
            zIndex: phase === 'opening' ? 30 : 2,
            background: `linear-gradient(165deg,${P.white} 0%,${P.cream} 60%,${P.petal} 100%)`,
            border: `1px solid rgba(196,80,106,.25)`, borderRadius: 4,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: phase === 'opening' ? `0 36px 80px rgba(123,26,46,.24)` : `0 2px 10px rgba(123,26,46,.06)`,
            transform: phase === 'opening' ? 'translateY(-145%) scale(1.05) rotate(-0.6deg)' : 'translateY(0)',
            transition: 'transform 1.4s cubic-bezier(.22,.1,.2,1) .2s,box-shadow 1.4s ease .2s',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 6, left: 6, right: 6, bottom: 6, border: `1px solid rgba(196,80,106,.14)`, borderRadius: 2 }}/>
            <div style={{ textAlign: 'center', padding: '0 20px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}><HeartSVG size={14} color={P.peony}/></div>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(14px,2.5vw,24px)', fontStyle: 'italic', fontWeight: 400, color: P.crimson, lineHeight: 1.2 }}>{brideName} &amp; {groomName}</p>
              <div style={{ width: 32, height: 1, background: `rgba(196,80,106,.3)`, margin: '8px auto' }}/>
              {weddingDateDisplay && <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(7px,.85vw,9px)', letterSpacing: '.26em', textTransform: 'uppercase', color: P.textlt }}>{weddingDateDisplay}</p>}
            </div>
          </div>
          {/* Envelope body */}
          <div style={{ width: '100%', paddingTop: '60%', position: 'relative', zIndex: 5 }}>
            <div style={{ position: 'absolute', inset: 0, background: P.petal, borderRadius: 6, border: `1.5px solid rgba(196,80,106,.28)`, boxShadow: `0 4px 24px rgba(123,26,46,.09)`, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%', background: P.blush2, clipPath: 'polygon(0 0,0 100%,100% 100%)' }}/>
              <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '50%', background: P.blush2, clipPath: 'polygon(100% 0,0 100%,100% 100%)' }}/>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: P.cream2, clipPath: 'polygon(0 100%,50% 0,100% 100%)' }}/>
            </div>
            {/* Wax seal */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-52%)',
              width: 'clamp(54px,9vw,84px)', height: 'clamp(54px,9vw,84px)',
              background: `radial-gradient(circle at 38% 38%,${P.blush} 0%,${P.peony} 40%,${P.crimson} 80%)`,
              borderRadius: '50%', border: `2px solid rgba(196,80,106,.45)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 0 5px rgba(196,80,106,.1),0 8px 24px rgba(123,26,46,.22)`,
              zIndex: 10, opacity: phase === 'opening' ? 0 : 1, transition: 'opacity .25s',
            }}>
              <div style={{ position: 'absolute', inset: -8, border: `1px dashed rgba(196,80,106,.38)`, borderRadius: '50%', animation: 'rm-spin 25s linear infinite' }}/>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(13px,2vw,20px)', fontStyle: 'italic', color: P.white, fontWeight: 600, position: 'relative', zIndex: 1 }}>{initials}</span>
            </div>
            {/* Flap */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, zIndex: 8, height: '52%',
              background: `linear-gradient(160deg,${P.cream2} 0%,${P.petal} 100%)`,
              clipPath: 'polygon(0 0,100% 0,50% 100%)', transformOrigin: 'top center',
              transform: phase === 'opening' ? 'perspective(700px) rotateX(192deg)' : 'perspective(700px) rotateX(0deg)',
              transition: 'transform 1s cubic-bezier(.4,0,.2,1)', borderBottom: `1.5px solid rgba(196,80,106,.25)`,
            }}/>
          </div>
        </div>

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(12px,1.4vw,14px)', fontStyle: 'italic', color: P.textlt, animation: phase === 'opening' ? 'none' : 'rm-fadeUp 1s ease both .3s, rm-pulse 3s ease-in-out infinite 1.2s' }}>
          {phase === 'opening' ? '♥  dezvăluind invitația  ♥' : 'atinge pentru a deschide'}
        </p>
      </div>
    </div>
  );
}

/* ── Invite Screen ── */
function InviteScreen({ props }: { props: RomanticInviteClientProps }) {
  const {
    slug, brideName, groomName, nasiNames, parentsNames,
    weddingDateISO, weddingDateDisplay, weddingTime, locationName, wazeUrl, googleMapsUrl,
    isReligiousActive, religiousDateDisplay, religiousTime, religiousLocation, religiousWaze,religiousMaps,
    ourStory, isMenuActive, menuDetails, isGalleryActive,
    isAccommodationActive, isTransportActive, contactPhoneBride, contactPhoneGroom, orderId,
  } = props;

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
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenuModal(false); setGalleryModal(false); setRsvpModal(false); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const a = (d: number): React.CSSProperties => ({
    opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity .75s ease ${d}s,transform .75s ease ${d}s`,
  });

  return (
    <div style={{ position: 'fixed', inset: 0, top: 56, overflowY: 'auto', overflowX: 'hidden', overscrollBehavior: 'contain' }}>
      <div style={{ position: 'fixed', inset: 0, background: `radial-gradient(ellipse 90% 80% at 50% 30%,${P.cream} 0%,${P.petal} 45%,${P.blush2} 80%,${P.blush} 100%)`, zIndex: 0 }}/>
      <div style={{ position: 'fixed', inset: 0, background: `radial-gradient(ellipse 65% 55% at 15% 22%,rgba(196,80,106,.06) 0%,transparent 55%),radial-gradient(ellipse 55% 48% at 85% 78%,rgba(196,80,106,.05) 0%,transparent 55%)`, zIndex: 1, pointerEvents: 'none' }}/>
      <div style={{ position: 'fixed', top: -20, left: -20, opacity: .18, pointerEvents: 'none', zIndex: 2, animation: 'rm-float 8s ease-in-out infinite' }}><PeonyBloom size={150}/></div>
      <div style={{ position: 'fixed', top: -25, right: -25, opacity: .15, pointerEvents: 'none', zIndex: 2, animation: 'rm-float 9s ease-in-out infinite 1.5s', transform: 'scaleX(-1)' }}><PeonyBloom size={160}/></div>
      <div style={{ position: 'fixed', bottom: -30, left: -15, opacity: .13, pointerEvents: 'none', zIndex: 2, animation: 'rm-float 7.5s ease-in-out infinite 0.8s', transform: 'scaleY(-1)' }}><PeonyBloom size={140}/></div>
      <div style={{ position: 'fixed', bottom: -35, right: -20, opacity: .16, pointerEvents: 'none', zIndex: 2, animation: 'rm-float 8.5s ease-in-out infinite 2s', transform: 'scale(-1)' }}><PeonyBloom size={150}/></div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 700, margin: '0 auto', padding: 'clamp(36px,6vw,64px) clamp(16px,4vw,32px) 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

        {/* Center peony */}
        <div style={{ ...a(0), marginBottom: 6, animation: vis ? 'rm-float 7s ease-in-out infinite' : 'none' }}>
          <PeonyBloom size={90}/>
        </div>

        <p style={{ ...a(0.06), fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(13px,1.5vw,15px)', fontStyle: 'italic', color: P.textlt, marginBottom: 10, letterSpacing: '.06em' }}>
          Cu dragoste vă invităm la
        </p>

        {/* Names */}
        <div style={{ ...a(0.1), textAlign: 'center', marginBottom: 6 }}>
          <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(56px,10vw,110px)', fontWeight: 600, fontStyle: 'italic', color: P.crimson, lineHeight: .9, letterSpacing: '-.01em' }}>{brideName}</span>
          <span style={{ display: 'block', fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(22px,3.5vw,38px)', fontStyle: 'italic', fontWeight: 300, color: P.peony, margin: '8px 0', lineHeight: 1.1 }}>&amp;</span>
          <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(56px,10vw,110px)', fontWeight: 600, fontStyle: 'italic', color: P.crimson, lineHeight: .9, letterSpacing: '-.01em' }}>{groomName}</span>
        </div>

        <div style={{ ...a(0.16), margin: '22px auto', width: '100%', maxWidth: 400 }}><RoseDivider/></div>

        {(weddingDateDisplay || locationName) && (
          <div style={{ ...a(0.22), textAlign: 'center', marginBottom: 20 }}>
            {weddingDateDisplay && <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(12px,1.6vw,15px)', letterSpacing: '.2em', color: P.text, fontWeight: 400, marginBottom: 5, textTransform: 'capitalize' }}>{weddingDateDisplay}</p>}
            {locationName && <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(15px,1.8vw,19px)', fontStyle: 'italic', color: P.textlt, letterSpacing: '.05em' }}>{locationName}</p>}
          </div>
        )}

        {nasiNames && (
          <div style={{ ...a(0.27), textAlign: 'center', padding: '22px 32px', border: `1px solid rgba(196,80,106,.2)`, borderRadius: 20, background: `rgba(255,251,251,.65)`, backdropFilter: 'blur(10px)', maxWidth: 360, width: '100%', boxShadow: `0 4px 28px rgba(123,26,46,.06)`, marginBottom: 0, position: 'relative' }}>
            {(['tl','tr','bl','br'] as const).map(c => (
              <div key={c} style={{ position: 'absolute', top: c.startsWith('t') ? 8 : 'auto', bottom: c.startsWith('b') ? 8 : 'auto', left: c.endsWith('l') ? 8 : 'auto', right: c.endsWith('r') ? 8 : 'auto', width: 12, height: 12, borderTop: c.startsWith('t') ? `1px solid rgba(196,80,106,.38)` : 'none', borderBottom: c.startsWith('b') ? `1px solid rgba(196,80,106,.38)` : 'none', borderLeft: c.endsWith('l') ? `1px solid rgba(196,80,106,.38)` : 'none', borderRight: c.endsWith('r') ? `1px solid rgba(196,80,106,.38)` : 'none' }}/>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}><HeartSVG size={13} color={P.blush}/></div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(12px,1.4vw,14px)', fontStyle: 'italic', color: P.textlt, marginBottom: 8 }}>alături de nașii noștri</p>
            <div style={{ width: 28, height: 1, background: `rgba(196,80,106,.3)`, margin: '0 auto 10px' }}/>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(18px,2.3vw,24px)', fontStyle: 'italic', fontWeight: 400, color: P.text }}>{nasiNames}</p>
          </div>
        )}

        {parentsNames && (
          <div style={{ ...a(0.3), textAlign: 'center', marginTop: 14, marginBottom: 4 }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(12px,1.4vw,14px)', fontStyle: 'italic', color: P.textlt }}>Împreună cu părinții</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(14px,1.6vw,16px)', fontStyle: 'italic', fontWeight: 300, color: `rgba(61,21,32,.65)` }}>{parentsNames}</p>
          </div>
        )}

        <div style={{ ...a(0.32), margin: '24px auto', width: '100%', maxWidth: 400 }}><RoseDivider/></div>

        {/* Countdown */}
        {weddingDate && (
          <div style={{ ...a(0.36), width: '100%', maxWidth: 480, background: `rgba(255,251,251,.6)`, border: `1px solid rgba(196,80,106,.18)`, borderRadius: 24, padding: '24px 18px', backdropFilter: 'blur(12px)', textAlign: 'center', boxShadow: `0 6px 32px rgba(123,26,46,.06)`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: '12%', right: '12%', height: 1, background: `linear-gradient(90deg,transparent,rgba(196,80,106,.38),transparent)` }}/>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}><HeartSVG size={12} color={P.blush}/></div>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(7px,.85vw,9px)', letterSpacing: '.3em', textTransform: 'uppercase', color: P.textlt, marginBottom: 16, opacity: .8 }}>Timp Rămas Până La Ziua Iubirii</p>
            <div style={{ display: 'flex', gap: 0, justifyContent: 'center' }}>
              {[{ n: pad(cd.d), l: 'Zile' }, { n: pad(cd.h), l: 'Ore' }, { n: pad(cd.m), l: 'Minute' }, { n: pad(cd.s), l: 'Secunde', flip: flipS }].map(u => (
                <div key={u.l} style={{ flex: 1, maxWidth: 108, textAlign: 'center', padding: '0 4px', borderRight: `1px solid rgba(196,80,106,.14)` }}>
                  <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(34px,5.5vw,58px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1, transition: 'transform .15s ease,color .15s ease', transform: (u as any).flip ? 'scale(1.08) translateY(-3px)' : 'scale(1)', color: (u as any).flip ? P.crimson : P.text }}>{u.n}</span>
                  <span style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(6px,.8vw,8px)', letterSpacing: '.16em', textTransform: 'uppercase', color: P.textlt, display: 'block', marginTop: 3 }}>{u.l}</span>
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: '12%', right: '12%', height: 1, background: `linear-gradient(90deg,transparent,rgba(196,80,106,.38),transparent)` }}/>
          </div>
        )}

        <div style={{ ...a(0.42), margin: '24px auto', width: '100%', maxWidth: 400 }}><RoseDivider/></div>

        {/* Location cards */}
        <div style={{ ...a(0.46), width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 'clamp(12px,2vw,20px)', maxWidth: 640 }}>
          <div style={{ borderRadius: 20, overflow: 'hidden', border: `1.5px solid rgba(196,80,106,.2)`, background: `rgba(255,251,251,.72)`, backdropFilter: 'blur(10px)', boxShadow: `0 6px 28px rgba(123,26,46,.08)`, transition: 'transform .24s ease,box-shadow .24s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 18px 50px rgba(123,26,46,.14)`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 6px 28px rgba(123,26,46,.08)`; }}>
            <div style={{ padding: '16px 18px 12px', background: `linear-gradient(135deg,${P.crimson} 0%,${P.rose} 100%)`, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M8 18c0 1.65-1.35 3-3 3s-3-1.35-3-3c0-2 3-6 3-6s3 4 3 6z"/><path d="M5 12V4"/><path d="M19 14c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.5 2-4 2-4s2 2.5 2 4z"/><path d="M17 10V6"/><path d="M12 8l2-2M12 8l-2-2M12 8v4"/><circle cx="12" cy="14" r=".7" fill="#fff" stroke="none"/></svg>
              </div>
              <div>
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)', display: 'block', marginBottom: 2 }}>Locatie</span>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(15px,1.8vw,19px)', fontStyle: 'italic', fontWeight: 300, color: '#fff', lineHeight: 1.2 }}>Petrecerea</p>
              </div>
            </div>
            <div style={{ padding: '14px 18px 16px' }}>
              <p style={{ fontFamily: "'Cinzel',serif", fontWeight: 600, fontSize: 'clamp(10px,1.1vw,12px)', color: P.crimson, marginBottom: 3, letterSpacing: '.05em' }}>{locationName}</p>
              {weddingDateDisplay && weddingTime && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: `rgba(196,80,106,.08)`, border: `1px solid rgba(196,80,106,.2)`, borderRadius: 100, padding: '4px 12px', fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '.14em', textTransform: 'uppercase', color: P.textlt, marginBottom: 12, marginTop: 4 }}>♥ {weddingDateDisplay} · ora {weddingTime}</div>}
              {(wazeUrl || googleMapsUrl) && (
                <div style={{ display: 'flex', gap: 8 }}>
                  {wazeUrl && <a href={wazeUrl} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, background: 'rgba(8,162,212,.15)', border: '1px solid rgba(8,162,212,.28)', color: 'rgba(8,162,212,.9)' }}><WazeIcon/> Waze</a>}
                  {googleMapsUrl && <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, background: 'rgba(76,175,79,.14)', border: '1px solid rgba(76,175,79,.25)', color: 'rgba(56,142,60,.9)' }}><MapsIcon/> Maps</a>}
                </div>
              )}
            </div>
          </div>

          {isReligiousActive && (
            <div style={{ borderRadius: 20, overflow: 'hidden', border: `1.5px solid rgba(196,80,106,.2)`, background: `rgba(255,251,251,.72)`, backdropFilter: 'blur(10px)', boxShadow: `0 6px 28px rgba(123,26,46,.08)`, transition: 'transform .24s ease,box-shadow .24s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 18px 50px rgba(123,26,46,.14)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 6px 28px rgba(123,26,46,.08)`; }}>
              <div style={{ padding: '16px 18px 12px', background: `linear-gradient(135deg,${P.crimson} 0%,${P.rose} 100%)`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M12 2L12 6M10 4h4"/><rect x="4" y="9" width="16" height="12" rx="1"/><path d="M9 21V14a3 3 0 0 1 6 0v7"/><path d="M4 9l8-4 8 4"/></svg>
                </div>
                <div>
                  <span style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)', display: 'block', marginBottom: 2 }}>Ceremonia Religioasă</span>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(15px,1.8vw,19px)', fontStyle: 'italic', fontWeight: 300, color: '#fff', lineHeight: 1.2 }}>Cununia</p>
                </div>
              </div>
              <div style={{ padding: '14px 18px 16px' }}>
                <p style={{ fontFamily: "'Cinzel',serif", fontWeight: 600, fontSize: 'clamp(10px,1.1vw,12px)', color: P.crimson, marginBottom: 3, letterSpacing: '.05em' }}>{religiousLocation}</p>
                {(religiousDateDisplay || religiousTime) && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: `rgba(196,80,106,.08)`, border: `1px solid rgba(196,80,106,.2)`, borderRadius: 100, padding: '4px 12px', fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '.14em', textTransform: 'uppercase', color: P.textlt, marginBottom: 12, marginTop: 4 }}>{religiousDateDisplay && `♥ ${religiousDateDisplay}`}{religiousTime && ` · ora ${religiousTime}`}</div>}
{/* ── START MODIFICARE AICI ── */}
                {(religiousWaze || religiousMaps) && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    {religiousWaze && <a href={religiousWaze} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, background: 'rgba(8,162,212,.15)', border: '1px solid rgba(8,162,212,.28)', color: 'rgba(8,162,212,.9)' }}><WazeIcon/> Waze</a>}
                    {religiousMaps && <a href={religiousMaps} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, background: 'rgba(76,175,79,.14)', border: '1px solid rgba(76,175,79,.25)', color: 'rgba(56,142,60,.9)' }}><MapsIcon/> Maps</a>}
                  </div>
                )}
                {/* ── END MODIFICARE AICI ── */}  
                            </div>
            </div>
          )}
        </div>

        {ourStory && (
          <>
            <div style={{ ...a(0.5), margin: '24px auto', width: '100%', maxWidth: 400 }}><RoseDivider/></div>
            <div style={{ ...a(0.52), width: '100%', maxWidth: 560, textAlign: 'center', padding: '10px 0' }}>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: P.textlt, marginBottom: 16, opacity: .7 }}>Povestea Noastră</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(16px,2vw,20px)', fontStyle: 'italic', fontWeight: 300, color: `rgba(61,21,32,.75)`, lineHeight: 1.85, letterSpacing: '.02em' }}>&ldquo;{ourStory}&rdquo;</p>
            </div>
          </>
        )}

        {(isAccommodationActive || isTransportActive) && (
          <div style={{ ...a(0.54), display: 'flex', gap: 16, justifyContent: 'center', padding: '16px 0', marginTop: 8 }}>
            {isAccommodationActive && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '16px 20px', background: `rgba(255,251,251,.7)`, border: `1px solid rgba(196,80,106,.18)`, borderRadius: 14 }}><span style={{ fontSize: '2rem' }}>🏠</span><span style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '.16em', textTransform: 'uppercase', color: P.textlt }}>Cazare</span></div>}
            {isTransportActive && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '16px 20px', background: `rgba(255,251,251,.7)`, border: `1px solid rgba(196,80,106,.18)`, borderRadius: 14 }}><span style={{ fontSize: '2rem' }}>🚌</span><span style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '.16em', textTransform: 'uppercase', color: P.textlt }}>Transport</span></div>}
          </div>
        )}

        {(contactPhoneBride || contactPhoneGroom) && (
          <div style={{ ...a(0.55), width: '100%', maxWidth: 640, background: `rgba(255,251,251,.65)`, border: `1px solid rgba(196,80,106,.18)`, borderRadius: 18, padding: '16px 20px', backdropFilter: 'blur(8px)', boxShadow: `0 4px 20px rgba(123,26,46,.06)`, marginTop: 'clamp(12px,2vw,20px)' }}>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: P.textlt, marginBottom: 12 }}>Contact</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
              {contactPhoneBride && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(15px,1.8vw,19px)', fontStyle: 'italic', color: P.text, marginBottom: 3 }}>{brideName}</p>
                    <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(11px,1.3vw,13px)', color: P.crimson, letterSpacing: '.08em', fontWeight: 600 }}>{contactPhoneBride}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href={`tel:${contactPhoneBride}`} style={{ ...NAV_BTN, padding: '10px 18px', borderRadius: 100, background: `rgba(196,80,106,.1)`, border: `1px solid rgba(196,80,106,.28)`, color: P.crimson }}><PhoneIcon/> Telefon</a>
                    <a href={`https://wa.me/${contactPhoneBride.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, padding: '10px 18px', borderRadius: 100, background: 'rgba(37,211,102,.1)', border: '1px solid rgba(37,211,102,.28)', color: 'rgba(30,142,60,.9)' }}><WaIcon/> WhatsApp</a>
                  </div>
                </div>
              )}
              {contactPhoneGroom && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(15px,1.8vw,19px)', fontStyle: 'italic', color: P.text, marginBottom: 3 }}>{groomName}</p>
                    <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(11px,1.3vw,13px)', color: P.crimson, letterSpacing: '.08em', fontWeight: 600 }}>{contactPhoneGroom}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href={`tel:${contactPhoneGroom}`} style={{ ...NAV_BTN, padding: '10px 18px', borderRadius: 100, background: `rgba(196,80,106,.1)`, border: `1px solid rgba(196,80,106,.28)`, color: P.crimson }}><PhoneIcon/> Telefon</a>
                    <a href={`https://wa.me/${contactPhoneGroom.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, padding: '10px 18px', borderRadius: 100, background: 'rgba(37,211,102,.1)', border: '1px solid rgba(37,211,102,.28)', color: 'rgba(30,142,60,.9)' }}><WaIcon/> WhatsApp</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ ...a(0.58), margin: '24px auto', width: '100%', maxWidth: 400 }}><RoseDivider/></div>

        {isMenuActive && menuDetails?.categories && (
          <div style={{ ...a(0.59), width: '100%', maxWidth: 400, marginBottom: 16 }}>
            <button onClick={() => setMenuModal(true)} style={{ ...ROSE_BTN, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 14px 40px rgba(123,26,46,.45)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 28px rgba(123,26,46,.3)`; }}>
              <span>🍽️</span> ♥ Meniu Eveniment ♥
            </button>
          </div>
        )}

        {isGalleryActive && (
          <div style={{ ...a(0.6), width: '100%', maxWidth: 640, background: `linear-gradient(160deg,rgba(255,240,242,.65) 0%,rgba(255,251,251,.55) 100%)`, border: `1.5px dashed rgba(196,80,106,.3)`, borderRadius: 24, padding: 'clamp(22px,3vw,32px) clamp(18px,3vw,28px)', textAlign: 'center', marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(18px,2.5vw,26px)', fontStyle: 'italic', fontWeight: 400, color: P.text, marginBottom: 8, lineHeight: 1.2 }}>Împărtășiți momentele cu noi ♥</h3>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(13px,1.6vw,16px)', fontStyle: 'italic', color: P.textlt, lineHeight: 1.8, marginBottom: 18, maxWidth: 440, margin: '0 auto 18px' }}>Faceți poze în timpul nunții și încărcați-le direct din telefon.</p>
            <button onClick={() => setGalleryModal(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 32px', borderRadius: 100, background: `linear-gradient(135deg,${P.crimson} 0%,${P.rose} 45%,${P.peony} 55%,${P.rose} 70%,${P.crimson} 100%)`, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: "'Cinzel',serif", fontSize: 'clamp(10px,1.2vw,12px)', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', boxShadow: `0 8px 28px rgba(123,26,46,.28)`, transition: 'transform .2s,box-shadow .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 14px 40px rgba(123,26,46,.45)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 28px rgba(123,26,46,.28)`; }}>
              📸 Galerie Foto Live
            </button>
          </div>
        )}

        {/* RSVP */}
        <div style={{ ...a(0.65), textAlign: 'center', width: '100%', maxWidth: 400 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, animation: vis ? 'rm-heartbeat 2.4s ease-in-out infinite' : undefined }}><HeartSVG size={20} color={P.peony}/></div>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(14px,1.7vw,17px)', fontStyle: 'italic', color: P.textlt, marginBottom: 16, lineHeight: 1.7 }}>Vă rugăm să confirmați prezența Dvs.<br/>până la data evenimentului.</p>
          <button onClick={() => setRsvpModal(true)} style={{ ...ROSE_BTN, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 18px 48px rgba(123,26,46,.5)`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 28px rgba(123,26,46,.3)`; }}>
            <span style={{ position: 'relative', zIndex: 1 }}>♥ Confirmă Prezența ♥</span>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent)', backgroundSize: '350px 100%', animation: 'rm-shimmer 3s linear infinite' }}/>
          </button>
        </div>

        <div style={{ ...a(0.72), marginTop: 32, textAlign: 'center', opacity: .35, fontSize: 11, fontFamily: "'Cinzel',serif", letterSpacing: '.1em', color: P.textlt }}>
          {contactPhoneBride && `${brideName}: ${contactPhoneBride}`}
          {contactPhoneBride && contactPhoneGroom && '  ·  '}
          {contactPhoneGroom && `${groomName}: ${contactPhoneGroom}`}
        </div>
      </div>

      {/* Menu Modal */}
      {menuModal && (
        <div onClick={() => setMenuModal(false)} style={MODAL_OVERLAY}>
          <div onClick={e => e.stopPropagation()} style={{ ...MODAL_BOX, maxWidth: 560 }}>
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1.5, background: `linear-gradient(90deg,transparent,${P.peony},transparent)` }}/>
            <div style={{ textAlign: 'center', marginBottom: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}><PeonyBloom size={60}/></div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3.5vw,30px)', fontStyle: 'italic', fontWeight: 400, color: P.crimson, marginBottom: 8 }}>Meniul Evenimentului</h2>
              <div style={{ width: 36, height: 1, background: `rgba(196,80,106,.4)`, margin: '0 auto' }}/>
            </div>
            {menuDetails.categories.filter((cat: any) => cat.active && cat.items && cat.items.length > 0).map((cat: any, cIdx: number) => (
              <div key={cIdx} style={{ marginBottom: 32 }}>
                <div style={{ display: 'inline-block', borderBottom: `1px solid rgba(196,80,106,.25)`, paddingBottom: 10, marginBottom: 16 }}>
                  <h4 style={{ color: P.text, fontSize: 'clamp(13px,1.6vw,16px)', margin: 0, fontWeight: 400, letterSpacing: '2px', fontFamily: "'Cinzel',serif" }}><span style={{ marginRight: 10 }}>{cat.emoji}</span>{cat.label}</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {cat.items.map((item: any, iIdx: number) => (
                    <div key={iIdx}>
                      <div style={{ color: P.rose, fontSize: 'clamp(14px,1.8vw,18px)', fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic' }}>{item.name}</div>
                      {item.description && <div style={{ fontSize: 'clamp(11px,1.2vw,13px)', opacity: .6, fontStyle: 'italic', marginTop: 4, fontFamily: "'Cormorant Garamond',serif", color: P.text }}>{item.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <button onClick={() => setMenuModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontStyle: 'italic', color: P.textlt, textDecoration: 'underline' }}>Închide</button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {galleryModal && (
        <div onClick={() => setGalleryModal(false)} style={MODAL_OVERLAY}>
          <div onClick={e => e.stopPropagation()} style={{ ...MODAL_BOX, maxWidth: 400, textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1.5, background: `linear-gradient(90deg,transparent,${P.peony},transparent)` }}/>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: `rgba(196,80,106,.08)`, border: `2px solid rgba(196,80,106,.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📸</div>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontStyle: 'italic', fontWeight: 400, color: P.crimson, marginBottom: 10 }}>Galerie Foto Live</h2>
            <div style={{ width: 36, height: 1, background: `rgba(196,80,106,.35)`, margin: '0 auto 16px' }}/>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontStyle: 'italic', color: P.textlt, marginBottom: 24, lineHeight: 1.8 }}>Împărtășește momentele surprinse de tine cu mirii.<br/>Apasă butonul de mai jos pentru a încărca pozele tale.</p>
            <a href={`/invitatie/romantic/${slug}/upload`} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 32px', borderRadius: 100, background: `linear-gradient(135deg,${P.crimson} 0%,${P.rose} 45%,${P.peony} 55%,${P.rose} 70%,${P.crimson} 100%)`, color: '#fff', textDecoration: 'none', fontFamily: "'Cinzel',serif", fontSize: 11, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', boxShadow: `0 8px 28px rgba(123,26,46,.28)`, marginBottom: 16 }}>📷 Încarcă Pozele</a>
            <br/>
            <button onClick={() => setGalleryModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontStyle: 'italic', color: P.textlt, textDecoration: 'underline' }}>Închide</button>
          </div>
        </div>
      )}

      {/* RSVP Modal */}
      {rsvpModal && (
        <div onClick={() => setRsvpModal(false)} style={MODAL_OVERLAY}>
          <div onClick={e => e.stopPropagation()} style={MODAL_BOX}>
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1.5, background: `linear-gradient(90deg,transparent,${P.peony},transparent)` }}/>
            <div style={{ textAlign: 'center', marginBottom: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10, animation: 'rm-heartbeat 2.4s ease-in-out infinite' }}><HeartSVG size={28} color={P.peony}/></div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3.5vw,30px)', fontStyle: 'italic', fontWeight: 400, color: P.crimson, marginBottom: 8 }}>Confirmă Prezența</h2>
              <div style={{ width: 36, height: 1, background: `rgba(196,80,106,.4)`, margin: '0 auto' }}/>
            </div>
            <RomanticRsvpForm orderId={orderId} showAccommodation={isAccommodationActive} showTransport={isTransportActive}/>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button onClick={() => setRsvpModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontStyle: 'italic', color: P.textlt, textDecoration: 'underline' }}>Închide</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RomanticInviteClient(props: RomanticInviteClientProps) {
  const [phase, setPhase] = useState<Phase>('envelope');

  function openEnvelope() {
    if (phase !== 'envelope') return;
    setPhase('opening');
    setTimeout(() => setPhase('invite'), 1700);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }}/>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(14px,4vw,28px)', background: `rgba(253,245,246,.95)`, borderBottom: `1px solid rgba(196,80,106,.14)`, backdropFilter: 'blur(14px)' }}>
        <a href="/" style={{ fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: P.crimson, textDecoration: 'none', transition: 'color .2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = P.rose)}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = P.crimson)}>
          Vibe<span style={{ color: P.blush }}>Invite</span>
        </a>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontStyle: 'italic', color: P.textlt, letterSpacing: '.06em' }}>
          {phase === 'invite' ? `${props.brideName} & ${props.groomName}` : 'Invitație de Nuntă'}
        </div>
        <div style={{ width: 80 }}/>
      </header>
      {phase !== 'invite' && (
        <EnvelopeScreen onOpen={openEnvelope} phase={phase} brideName={props.brideName} groomName={props.groomName} initials={props.initials} weddingDateDisplay={props.weddingDateDisplay}/>
      )}
      {phase === 'invite' && <InviteScreen props={props}/>}
    </>
  );
}
