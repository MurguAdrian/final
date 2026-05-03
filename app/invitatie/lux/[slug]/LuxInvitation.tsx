'use client';

import { useState, useEffect, useCallback } from 'react';
import LuxRsvpForm from './LuxRsvpForm';

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */
interface Settings {
  id: string;
  bride_name: string;
  groom_name: string;
  wedding_date: string | null;
  wedding_time: string;
  location_name: string;
  waze_url: string;
  google_maps_url: string;
  nasi_names: string;
  parents_names: string;
  our_story: string;
  contact_phone_bride: string;
  contact_phone_groom: string;
  is_religious_active: boolean;
  religious_date: string | null;
  religious_time: string;
  religious_location: string;
  religious_waze: string;
  is_menu_active: boolean;
  menu_details: any;
  is_accommodation_active: boolean;
  is_transport_active: boolean;
  gallery_status: string;
  photos_expires_at: string | null;
  order_id: string;
  slug: string;
}

type Phase = 'envelope' | 'opening' | 'invite';

/* ══════════════════════════════════════════════════════════════
   COUNTDOWN HOOK
══════════════════════════════════════════════════════════════ */
function useCountdown(isoDate: string | null) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    if (!isoDate) return;
    const ms = new Date(isoDate).getTime();
    const tick = () => {
      const diff = ms - Date.now();
      if (diff <= 0) { setT({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setT({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff % 864e5) / 36e5),
        m: Math.floor((diff % 36e5) / 6e4),
        s: Math.floor((diff % 6e4) / 1e3),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isoDate]);
  return t;
}
const pad = (n: number) => String(n).padStart(2, '0');

/* ══════════════════════════════════════════════════════════════
   SVG HELPERS
══════════════════════════════════════════════════════════════ */
const CrownSVG = ({ size = 80 }: { size?: number }) => (
  <svg viewBox="0 0 120 60" fill="none" style={{ width: size, height: size * 0.5 }}>
    <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#cg)" strokeWidth="1.4" strokeLinejoin="round"/>
    <circle cx="60" cy="5" r="3.5" fill="url(#cg)"/>
    <circle cx="30" cy="40" r="2.5" fill="url(#cg)"/>
    <circle cx="90" cy="40" r="2.5" fill="url(#cg)"/>
    <circle cx="10" cy="20" r="2" fill="url(#cg)"/>
    <circle cx="110" cy="20" r="2" fill="url(#cg)"/>
    <path d="M4 50 L116 50" stroke="url(#cg)" strokeWidth="1"/>
    <defs>
      <linearGradient id="cg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8B6914"/>
        <stop offset="40%" stopColor="#D4AF37"/>
        <stop offset="60%" stopColor="#F5D678"/>
        <stop offset="100%" stopColor="#8B6914"/>
      </linearGradient>
    </defs>
  </svg>
);

const ArtDecoCorner = ({ flip = false, flipY = false }: { flip?: boolean; flipY?: boolean }) => (
  <svg viewBox="0 0 160 160" fill="none" style={{ transform: `scale(${flip ? -1 : 1},${flipY ? -1 : 1})`, width: '100%', height: '100%' }}>
    <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg)" strokeWidth="1.2"/>
    <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg)" strokeWidth=".7" strokeOpacity=".6"/>
    <path d="M28 28 L28 80 M28 28 L80 28" stroke="url(#dg)" strokeWidth=".5" strokeOpacity=".4"/>
    <path d="M8 50 L22 50 M8 70 L16 70 M8 90 L16 90" stroke="url(#dg)" strokeWidth=".8"/>
    <path d="M50 8 L50 22 M70 8 L70 16 M90 8 L90 16" stroke="url(#dg)" strokeWidth=".8"/>
    <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg)" fillOpacity=".8"/>
    <rect x="13" y="13" width="7" height="7" transform="rotate(45 18 18)" fill="none" stroke="url(#dg)" strokeWidth=".8" strokeOpacity=".5"/>
    <defs>
      <linearGradient id="dg" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D4AF37"/>
        <stop offset="50%" stopColor="#F5D678"/>
        <stop offset="100%" stopColor="#8B6914" stopOpacity=".4"/>
      </linearGradient>
    </defs>
  </svg>
);

const GoldDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 440 }}>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.6))' }}/>
    <svg viewBox="0 0 60 20" width="60" height="20" fill="none">
      <path d="M5 10 L20 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6"/>
      <path d="M40 10 L55 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6"/>
      <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".9"/>
      <circle cx="30" cy="10" r="2" fill="#D4AF37" fillOpacity=".8"/>
      <circle cx="18" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/>
      <circle cx="42" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/>
    </svg>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.6),transparent)' }}/>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   MODAL WRAPPER — cu buton back/close și full-screen pe mobile
══════════════════════════════════════════════════════════════ */
function LuxModal({ onClose, children, label }: { onClose: () => void; children: React.ReactNode; label: string }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,.88)', backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(10px,3vw,24px)', overflowY: 'auto',
        animation: 'lux-fadeIn .28s ease',
        WebkitOverflowScrolling: 'touch' as any,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(170deg,#1A1408,#0A0803)',
          border: '1px solid rgba(212,175,55,.28)',
          borderRadius: 'clamp(12px,2vw,20px)',
          padding: 'clamp(20px,4vw,40px) clamp(16px,4vw,32px)',
          maxWidth: 520, width: '100%',
          boxShadow: '0 40px 100px rgba(0,0,0,.95),0 0 60px rgba(212,175,55,.12)',
          animation: 'lux-slideUp .32s cubic-bezier(.4,0,.2,1)',
          maxHeight: '92vh', overflowY: 'auto', position: 'relative',
          WebkitOverflowScrolling: 'touch' as any,
          paddingBottom: 'max(clamp(20px,4vw,40px), env(safe-area-inset-bottom))',
        }}
      >
        {/* Top gold line */}
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)' }}/>

        {/* Back / Close button */}
        <button
          onClick={onClose}
          aria-label="Înapoi"
          style={{
            position: 'absolute', top: 12, left: 12,
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(212,175,55,.1)', border: '1px solid rgba(212,175,55,.25)',
            borderRadius: 100, padding: '6px 14px 6px 10px',
            color: '#D4AF37', cursor: 'pointer',
            fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.14em',
            textTransform: 'uppercase', transition: 'background .2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,.2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(212,175,55,.1)')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Înapoi
        </button>

        {children}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ENVELOPE SCREEN
══════════════════════════════════════════════════════════════ */
function EnvelopeScreen({ s, phase, onOpen }: { s: Settings; phase: Phase; onOpen: () => void }) {
  const bi = s.bride_name.charAt(0).toUpperCase() || 'M';
  const gi = s.groom_name.charAt(0).toUpperCase() || 'I';
  const dateLabel = s.wedding_date
    ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  const isOpening = phase === 'opening';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 20,
      background: 'radial-gradient(ellipse 90% 80% at 50% 40%,#1A1408 0%,#0A0803 55%,#040301 100%)',
      transition: 'opacity 0.9s ease, visibility 0.9s ease',
      opacity: isOpening ? 1 : 1,
    }}>
      {/* Art Deco corners */}
      {([['tl',false,false],['tr',true,false],['bl',false,true],['br',true,true]] as const).map(([k,fx,fy])=>(
        <div key={k} style={{
          position:'absolute',
          top: fy?'auto':0, bottom: fy?0:'auto',
          left: fx?'auto':0, right: fx?0:'auto',
          width:'min(200px,22vw)', height:'min(200px,22vw)',
          opacity:.7, pointerEvents:'none',
        }}>
          <ArtDecoCorner flip={fx} flipY={fy}/>
        </div>
      ))}
      <div style={{ position:'absolute', top:'10%', left:'5%', right:'5%', height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.22),transparent)', pointerEvents:'none'}}/>
      <div style={{ position:'absolute', bottom:'10%', left:'5%', right:'5%', height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.22),transparent)', pointerEvents:'none'}}/>

      <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:14, padding:'20px 24px' }}>
        {/* Crown */}
        <div style={{ animation:'lux-fadeUp .6s ease both', marginBottom:-2 }}><CrownSVG size={80}/></div>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(9px,1vw,11px)', letterSpacing:'.38em', textTransform:'uppercase', color:'rgba(212,175,55,.7)', animation:'lux-fadeUp .7s ease both .05s' }}>
          Invitație de Nuntă
        </p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(30px,4.5vw,54px)', fontWeight:300, fontStyle:'italic', color:'#F5D678', textAlign:'center', lineHeight:1.15, animation:'lux-fadeUp .8s ease both .12s', margin:0, textShadow:'0 0 40px rgba(212,175,55,.3)' }}>
          <strong style={{ fontWeight:600, fontStyle:'normal', color:'#F5E6A8' }}>{s.bride_name}</strong>
          <span style={{ color:'rgba(212,175,55,.5)', fontWeight:300, fontSize:'.75em', display:'block', margin:'2px 0', letterSpacing:'.2em', fontStyle:'normal' }}>&amp;</span>
          <strong style={{ fontWeight:600, fontStyle:'normal', color:'#F5E6A8' }}>{s.groom_name}</strong>
        </h1>

        {/* Envelope */}
        <div
          onClick={onOpen}
          role="button" tabIndex={0}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onOpen()}
          style={{
            animation: 'lux-envFloat 5s ease-in-out infinite, lux-fadeUp .9s ease both .2s',
            position: 'relative', width: 'clamp(270px,44vw,520px)',
            cursor: 'pointer', userSelect: 'none',
            filter: 'drop-shadow(0 40px 80px rgba(0,0,0,.7))',
          }}
        >
          <div style={{ position:'absolute', bottom:-20, left:'8%', right:'8%', height:24, background:'radial-gradient(ellipse,rgba(212,175,55,.18) 0%,transparent 70%)', filter:'blur(12px)', zIndex:0 }}/>

          {/* Letter */}
          <div style={{
            position:'absolute', left:'8%', right:'8%', bottom:'4%', height:'62%',
            zIndex: isOpening ? 30 : 2,
            background:'linear-gradient(170deg,#1A1408 0%,#0D0A04 100%)',
            border:'1px solid rgba(212,175,55,.35)', borderRadius:4,
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10,
            boxShadow: isOpening ? '0 40px 100px rgba(0,0,0,.9),0 0 60px rgba(212,175,55,.2)' : '0 2px 8px rgba(0,0,0,.4)',
            transform: isOpening ? 'translateY(-145%) scale(1.06) rotate(-0.6deg)' : 'translateY(0)',
            transition: 'transform 1.4s cubic-bezier(.22,.1,.2,1) .2s,box-shadow 1.4s ease .2s',
            overflow: 'hidden',
          }}>
            <div style={{ position:'absolute', inset:0, opacity:.07, backgroundImage:'repeating-linear-gradient(0deg,#D4AF37 0,#D4AF37 1px,transparent 1px,transparent 32px)' }}/>
            <div style={{ position:'absolute', top:8, left:8, right:8, bottom:8, border:'1px solid rgba(212,175,55,.2)', borderRadius:2 }}/>
            <div style={{ textAlign:'center', padding:'0 20px', position:'relative', zIndex:1 }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(16px,2.8vw,28px)', fontStyle:'italic', fontWeight:300, color:'#D4AF37', lineHeight:1.2 }}>
                {s.bride_name} &amp; {s.groom_name}
              </p>
              <div style={{ width:40, height:1, background:'linear-gradient(90deg,transparent,#D4AF37,transparent)', margin:'10px auto' }}/>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(7px,.9vw,9px)', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(212,175,55,.7)', fontWeight:400 }}>
                {dateLabel}
              </p>
            </div>
          </div>

          {/* Envelope body */}
          <div style={{ width:'100%', paddingTop:'60%', position:'relative', zIndex:5 }}>
            <div style={{ position:'absolute', inset:0, background:'#0A0803', borderRadius:6, border:'1px solid rgba(212,175,55,.28)', boxShadow:'0 8px 40px rgba(0,0,0,.8),inset 0 1px 0 rgba(212,175,55,.15)', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, bottom:0, left:0, width:'50%', background:'linear-gradient(160deg,#0E0C06,#080602)', clipPath:'polygon(0 0,0 100%,100% 100%)' }}/>
              <div style={{ position:'absolute', top:0, bottom:0, right:0, width:'50%', background:'linear-gradient(200deg,#0E0C06,#080602)', clipPath:'polygon(100% 0,0 100%,100% 100%)' }}/>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'50%', background:'linear-gradient(180deg,#0C0A04,#070601)', clipPath:'polygon(0 100%,50% 0,100% 100%)' }}/>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)' }}/>
            </div>
            {/* Seal */}
            <div style={{
              position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-52%)',
              width:'clamp(54px,9vw,84px)', height:'clamp(54px,9vw,84px)',
              background:'radial-gradient(circle at 35% 35%,#F5D678 0%,#D4AF37 40%,#8B6914 100%)',
              borderRadius:'50%', border:'2px solid rgba(245,214,120,.5)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 0 0 6px rgba(212,175,55,.08),0 0 0 12px rgba(212,175,55,.04),0 8px 30px rgba(0,0,0,.8)',
              zIndex:10, opacity: isOpening ? 0 : 1, transition:'opacity .25s',
            }}>
              <div style={{ position:'absolute', inset:-8, border:'1px solid rgba(212,175,55,.3)', borderRadius:'50%', borderStyle:'dashed', animation:'lux-spin 30s linear infinite' }}/>
              <div style={{ position:'absolute', inset:-14, border:'1px solid rgba(212,175,55,.12)', borderRadius:'50%' }}/>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(13px,2vw,20px)', fontStyle:'italic', color:'#0A0803', fontWeight:600, position:'relative', zIndex:1 }}>
                {bi}&amp;{gi}
              </span>
            </div>
            {/* Flap */}
            <div style={{
              position:'absolute', top:0, left:0, right:0, zIndex:8, height:'52%',
              background:'linear-gradient(160deg,#14100A,#0A0803)',
              clipPath:'polygon(0 0,100% 0,50% 100%)',
              transformOrigin:'top center',
              transform: isOpening ? 'perspective(800px) rotateX(192deg)' : 'perspective(800px) rotateX(0deg)',
              transition:'transform 1.05s cubic-bezier(.4,0,.2,1)',
              borderBottom:'1px solid rgba(212,175,55,.25)',
            }}>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg,rgba(212,175,55,.08) 0%,transparent 50%)' }}/>
            </div>
          </div>
        </div>

        <p style={{
          fontFamily:"'Cinzel',serif", fontSize:'clamp(8px,1vw,10px)',
          letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(212,175,55,.55)',
          animation: isOpening ? 'none' : 'lux-fadeUp 1s ease both .35s, lux-pulse 3s ease-in-out infinite 1.3s',
          opacity: isOpening ? .8 : undefined,
        }} id="open-hint">
          {isOpening ? '◆  Dezvăluind invitația  ◆' : 'Atinge pentru a deschide'}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   INVITATION SCREEN — full design matching demo
══════════════════════════════════════════════════════════════ */
function InvitationScreen({ s }: { s: Settings }) {
  const [vis, setVis]             = useState(false);
  const [rsvpOpen, setRsvpOpen]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [flipS, setFlipS]         = useState(false);
  const cd = useCountdown(s.wedding_date);

  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);
  useEffect(() => { setFlipS(true); const t = setTimeout(() => setFlipS(false), 160); return () => clearTimeout(t); }, [cd.s]);

  const a = (delay: number): React.CSSProperties => ({
    opacity:    vis ? 1 : 0,
    transform:  vis ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity .75s ease ${delay}s, transform .75s ease ${delay}s`,
  });

  const weddingDateLabel = s.wedding_date
    ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
    : '';

  const religiousDateLabel = s.religious_date
    ? new Date(s.religious_date).toLocaleDateString('ro-RO', { day:'numeric', month:'long', year:'numeric' })
    : '';

  const galleryActive = s.gallery_status === 'active'
    && s.photos_expires_at
    && new Date(s.photos_expires_at).getTime() > Date.now();

  const locCards = [
    ...(s.is_religious_active ? [{
      type: 'Cununia Religioasă',
      name: 'Slujba Religioasă',
      venue: s.religious_location,
      time: s.religious_time,
      date: religiousDateLabel,
      waze: s.religious_waze,
      maps: '',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width:20,height:20 }}>
          <path d="M12 2L12 6M10 4h4"/><rect x="4" y="9" width="16" height="12" rx="1"/>
          <path d="M9 21V14a3 3 0 0 1 6 0v7"/><path d="M4 9l8-4 8 4"/>
        </svg>
      ),
    }] : []),
    {
      type: 'Petrecerea',
      name: s.location_name,
      venue: s.location_name,
      time: s.wedding_time,
      date: weddingDateLabel,
      waze: s.waze_url,
      maps: s.google_maps_url,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width:20,height:20 }}>
          <path d="M8 18c0 1.65-1.35 3-3 3s-3-1.35-3-3c0-2 3-6 3-6s3 4 3 6z"/>
          <path d="M5 12V4"/><path d="M19 14c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.5 2-4 2-4s2 2.5 2 4z"/>
          <path d="M17 10V6"/><path d="M12 8l2-2M12 8l-2-2M12 8v4"/>
        </svg>
      ),
    },
  ];

  const locCard: React.CSSProperties = {
    borderRadius: 16, overflow: 'hidden',
    border: '1px solid rgba(212,175,55,.2)',
    background: 'rgba(255,255,255,.03)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 8px 40px rgba(0,0,0,.5)',
    transition: 'transform .25s ease, box-shadow .25s ease',
  };

  const navBtn: React.CSSProperties = {
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6,
    padding:'9px 14px', borderRadius:8,
    fontFamily:"'Cinzel',serif", fontSize:10, fontWeight:600, letterSpacing:'.12em',
    cursor:'pointer', flex:1, whiteSpace:'nowrap', border:'none', textDecoration:'none',
  };

  return (
    <div style={{ position:'fixed', inset:0, overflowY:'auto', overflowX:'hidden', WebkitOverflowScrolling:'touch' as any }}>
      {/* Background layers */}
      <div style={{ position:'fixed', inset:0, background:'radial-gradient(ellipse 90% 80% at 50% 30%,#1A1408 0%,#0A0803 55%,#050401 100%)', zIndex:0 }}/>
      <div style={{ position:'fixed', inset:0, background:'radial-gradient(ellipse 60% 50% at 15% 20%,rgba(212,175,55,.07) 0%,transparent 55%),radial-gradient(ellipse 50% 45% at 85% 80%,rgba(212,175,55,.06) 0%,transparent 55%)', zIndex:1, pointerEvents:'none' }}/>
      <div style={{ position:'fixed', inset:0, opacity:.04, zIndex:1, pointerEvents:'none', backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='.008' numOctaves='8' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='500' height='500' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }}/>

      {/* Art Deco corners (fixed) */}
      {([['tl',false,false],['tr',true,false],['bl',false,true],['br',true,true]] as const).map(([k,fx,fy])=>(
        <div key={k} style={{ position:'fixed', top:fy?'auto':0, bottom:fy?0:'auto', left:fx?'auto':0, right:fx?0:'auto', width:'min(180px,20vw)', height:'min(180px,20vw)', opacity:.65, pointerEvents:'none', zIndex:2 }}>
          <ArtDecoCorner flip={fx} flipY={fy}/>
        </div>
      ))}

      {/* Content */}
      <div style={{ position:'relative', zIndex:10, maxWidth:700, margin:'0 auto', padding:'clamp(40px,7vw,70px) clamp(16px,4vw,32px) 60px', display:'flex', flexDirection:'column', alignItems:'center', gap:0 }}>

        {/* Crown */}
        <div style={{ ...a(0), marginBottom:10 }}><CrownSVG size={80}/></div>
        <p style={{ ...a(.06), fontFamily:"'Cinzel',serif", fontSize:'clamp(8px,1vw,10px)', letterSpacing:'.36em', textTransform:'uppercase', color:'rgba(212,175,55,.65)', marginBottom:12 }}>
          Cu Onoare Vă Invităm
        </p>

        {/* Names */}
        <div style={{ ...a(.1), textAlign:'center', marginBottom:6 }}>
          <span style={{ display:'block', fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(52px,10vw,108px)', fontWeight:600, fontStyle:'italic', color:'#F5E6A8', lineHeight:.92, textShadow:'0 0 60px rgba(212,175,55,.25)' }}>
            {s.bride_name}
          </span>
          <span style={{ display:'block', fontFamily:"'Cinzel',serif", fontSize:'clamp(14px,2vw,22px)', fontWeight:400, color:'rgba(212,175,55,.6)', margin:'8px 0', letterSpacing:'.3em' }}>&amp;</span>
          <span style={{ display:'block', fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(52px,10vw,108px)', fontWeight:600, fontStyle:'italic', color:'#F5E6A8', lineHeight:.92, textShadow:'0 0 60px rgba(212,175,55,.25)' }}>
            {s.groom_name}
          </span>
        </div>

        <div style={{ ...a(.16), display:'flex', alignItems:'center', width:'100%', maxWidth:440, margin:'22px auto' }}><GoldDivider/></div>

        {/* Date */}
        <div style={{ ...a(.20), textAlign:'center', marginBottom:16 }}>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(13px,1.8vw,17px)', letterSpacing:'.18em', color:'#D4AF37', fontWeight:400, marginBottom:6, textTransform:'capitalize' }}>
            {weddingDateLabel}
          </p>
          {s.location_name && (
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(14px,1.7vw,18px)', fontStyle:'italic', fontWeight:300, color:'rgba(245,230,168,.55)', letterSpacing:'.06em' }}>
              {s.location_name}
            </p>
          )}
        </div>

        {/* Nași + Părinți */}
        {(s.nasi_names || s.parents_names) && (
          <div style={{ ...a(.25), textAlign:'center', padding:'22px 32px', border:'1px solid rgba(212,175,55,.2)', borderRadius:16, background:'rgba(212,175,55,.04)', backdropFilter:'blur(8px)', maxWidth:400, width:'100%', position:'relative', boxShadow:'0 4px 40px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.1)', marginBottom:0 }}>
            {[['tl',8,8,null,null],['tr',8,null,8,null],['bl',null,8,null,8],['br',null,null,8,8]].map(([k,top,left,bottom,right])=>(
              <div key={String(k)} style={{ position:'absolute', top:top??'auto', left:left??'auto', bottom:bottom??'auto', right:right??'auto', width:12, height:12, borderTop:top!==null?'1px solid rgba(212,175,55,.4)':'none', borderBottom:bottom!==null?'1px solid rgba(212,175,55,.4)':'none', borderLeft:left!==null?'1px solid rgba(212,175,55,.4)':'none', borderRight:right!==null?'1px solid rgba(212,175,55,.4)':'none' }}/>
            ))}
            {s.nasi_names && <>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(12px,1.4vw,14px)', fontStyle:'italic', color:'rgba(212,175,55,.6)', marginBottom:8 }}>Alături de nașii noștri</p>
              <div style={{ width:32, height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)', margin:'0 auto 10px' }}/>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(18px,2.5vw,24px)', fontStyle:'italic', fontWeight:300, color:'#F5E6A8' }}>{s.nasi_names}</p>
            </>}
            {s.parents_names && <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(13px,1.6vw,16px)', fontStyle:'italic', color:'rgba(212,175,55,.5)', marginTop:10 }}>Împreună cu {s.parents_names}</p>}
          </div>
        )}

        <div style={{ ...a(.30), display:'flex', alignItems:'center', width:'100%', maxWidth:440, margin:'24px auto' }}><GoldDivider/></div>

        {/* COUNTDOWN */}
        {s.wedding_date && (
          <div style={{ ...a(.34), width:'100%', maxWidth:480, background:'rgba(212,175,55,.04)', border:'1px solid rgba(212,175,55,.18)', borderRadius:20, padding:'24px 16px', boxShadow:'0 8px 50px rgba(0,0,0,.5),inset 0 1px 0 rgba(212,175,55,.08)', textAlign:'center', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)' }}/>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(7px,.9vw,9px)', letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(212,175,55,.55)', marginBottom:18 }}>
              Timp Rămas Până La Marea Sărbătoare
            </p>
            <div style={{ display:'flex', gap:0, justifyContent:'center' }}>
              {([
                { n: pad(cd.d), l: 'Zile' },
                { n: pad(cd.h), l: 'Ore' },
                { n: pad(cd.m), l: 'Minute' },
                { n: pad(cd.s), l: 'Secunde', flip: flipS },
              ] as any[]).map((u, i, arr) => (
                <div key={u.l} style={{ flex:1, maxWidth:112, textAlign:'center', padding:'0 4px', borderRight: i < arr.length-1 ? '1px solid rgba(212,175,55,.12)' : 'none' }}>
                  <span style={{ display:'block', fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(36px,6vw,62px)', fontWeight:300, lineHeight:1, color: u.flip ? '#F5D678' : '#D4AF37', transform: u.flip ? 'scale(1.08) translateY(-3px)' : 'scale(1)', transition:'transform .15s ease,color .15s ease', textShadow: u.flip ? '0 0 20px rgba(212,175,55,.4)' : 'none' }}>{u.n}</span>
                  <span style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(6px,.8vw,8px)', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(212,175,55,.45)', display:'block', marginTop:4 }}>{u.l}</span>
                </div>
              ))}
            </div>
            <div style={{ position:'absolute', bottom:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)' }}/>
          </div>
        )}

        <div style={{ ...a(.40), display:'flex', alignItems:'center', width:'100%', maxWidth:440, margin:'24px auto' }}><GoldDivider/></div>

        {/* LOCATION CARDS */}
        <div style={{ ...a(.44), width:'100%', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap:'clamp(12px,2vw,20px)', maxWidth:640 }}>
          {locCards.map(card => (
            <div key={card.type} style={locCard}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 20px 60px rgba(0,0,0,.7),0 0 30px rgba(212,175,55,.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.boxShadow = '0 8px 40px rgba(0,0,0,.5)'; }}
            >
              <div style={{ padding:'16px 18px 12px', background:'linear-gradient(135deg,rgba(212,175,55,.15) 0%,rgba(212,175,55,.06) 100%)', borderBottom:'1px solid rgba(212,175,55,.15)', display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:'rgba(212,175,55,.12)', border:'1px solid rgba(212,175,55,.3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{card.icon}</div>
                <div>
                  <span style={{ fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(212,175,55,.55)', display:'block', marginBottom:2 }}>{card.type}</span>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(14px,1.8vw,18px)', fontStyle:'italic', fontWeight:300, color:'#F5E6A8', lineHeight:1.2 }}>{card.name}</p>
                </div>
              </div>
              <div style={{ padding:'14px 18px 16px' }}>
                <div style={{ display:'inline-flex', alignItems:'center', gap:5, background:'rgba(212,175,55,.08)', border:'1px solid rgba(212,175,55,.2)', borderRadius:100, padding:'4px 12px', fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(212,175,55,.7)', marginBottom:14 }}>
                  ◆ {card.date}{card.time ? ` · ora ${card.time}` : ''}
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  {card.waze && (
                    <a href={card.waze} target="_blank" rel="noopener noreferrer" style={{ ...navBtn, background:'linear-gradient(135deg,rgba(8,162,212,.25),rgba(8,162,212,.15))', color:'rgba(140,210,240,.9)' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:13,height:13 }}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/></svg>
                      Waze
                    </a>
                  )}
                  {card.maps && (
                    <a href={card.maps} target="_blank" rel="noopener noreferrer" style={{ ...navBtn, background:'linear-gradient(135deg,rgba(76,175,79,.22),rgba(76,175,79,.12))', color:'rgba(120,210,120,.9)' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:13,height:13 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                      Maps
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CONTACT */}
        {(s.contact_phone_bride || s.contact_phone_groom) && (
          <div style={{ ...a(.50), width:'100%', maxWidth:640, background:'rgba(212,175,55,.04)', border:'1px solid rgba(212,175,55,.18)', borderRadius:16, padding:'16px 20px', backdropFilter:'blur(8px)', boxShadow:'0 6px 30px rgba(0,0,0,.4)', marginTop:'clamp(12px,2vw,20px)' }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(212,175,55,.5)', marginBottom:12 }}>Contact</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:16 }}>
              {[{name:s.bride_name,phone:s.contact_phone_bride},{name:s.groom_name,phone:s.contact_phone_groom}].filter(c=>c.phone).map(c=>(
                <div key={c.name} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flex:1, minWidth:200, flexWrap:'wrap', gap:8 }}>
                  <div>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(14px,1.8vw,18px)', fontStyle:'italic', color:'#F5E6A8', marginBottom:2 }}>{c.name}</p>
                    <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(11px,1.2vw,13px)', color:'#D4AF37', letterSpacing:'.08em', fontWeight:600 }}>{c.phone}</p>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <a href={`tel:${c.phone}`} style={{ ...navBtn, padding:'9px 16px', borderRadius:100, background:'rgba(212,175,55,.12)', border:'1px solid rgba(212,175,55,.3)', color:'#D4AF37' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width:13,height:13 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      Sună
                    </a>
                    <a href={`https://wa.me/${c.phone?.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" style={{ ...navBtn, padding:'9px 16px', borderRadius:100, background:'rgba(37,211,102,.12)', border:'1px solid rgba(37,211,102,.3)', color:'rgba(100,220,130,.9)' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:13,height:13 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ ...a(.54), display:'flex', alignItems:'center', width:'100%', maxWidth:440, margin:'24px auto' }}><GoldDivider/></div>

        {/* OUR STORY */}
        {s.our_story && (
          <div style={{ ...a(.56), maxWidth:560, textAlign:'center', padding:'0 8px', marginBottom:8 }}>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(15px,1.9vw,19px)', fontStyle:'italic', fontWeight:300, color:'rgba(245,230,168,.8)', lineHeight:1.9 }}>
              &ldquo;{s.our_story}&rdquo;
            </p>
          </div>
        )}

        {/* MENU BUTTON */}
        {s.is_menu_active && s.menu_details?.categories && (
          <>
            <div style={{ ...a(.58), display:'flex', alignItems:'center', width:'100%', maxWidth:440, margin:'24px auto' }}><GoldDivider/></div>
            <div style={{ ...a(.60), textAlign:'center' }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(9px,1.1vw,11px)', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(212,175,55,.6)', marginBottom:16 }}>MENIUL EVENIMENTULUI</p>
              <button onClick={() => setMenuOpen(true)} style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'13px 32px', borderRadius:4, background:'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)', color:'#0A0803', border:'none', cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:'clamp(10px,1.2vw,12px)', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', boxShadow:'0 8px 28px rgba(212,175,55,.3)', position:'relative', overflow:'hidden' }}>
                <span style={{ position:'relative', zIndex:1 }}>◆ Vezi Meniu ◆</span>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)', backgroundSize:'350px 100%', animation:'lux-shimmer 3s linear infinite' }}/>
              </button>
            </div>
          </>
        )}

        {/* PHOTO UPLOAD */}
        {galleryActive && (
          <>
            <div style={{ ...a(.62), display:'flex', alignItems:'center', width:'100%', maxWidth:440, margin:'24px auto' }}><GoldDivider/></div>
            <div style={{ ...a(.64), width:'100%', maxWidth:640, background:'linear-gradient(160deg,rgba(212,175,55,.07) 0%,rgba(212,175,55,.03) 100%)', border:'1.5px dashed rgba(212,175,55,.3)', borderRadius:20, padding:'clamp(22px,3vw,32px) clamp(18px,3vw,28px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ display:'flex', justifyContent:'center', marginBottom:14 }}>
                  <div style={{ width:72, height:72, borderRadius:'50%', background:'rgba(212,175,55,.1)', border:'2px solid rgba(212,175,55,.28)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg viewBox="0 0 48 48" fill="none" style={{ width:38, height:38 }}>
                      <rect x="4" y="14" width="40" height="28" rx="4" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7"/>
                      <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round"/>
                      <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".7"/>
                      <circle cx="24" cy="28" r="4" fill="#D4AF37" fillOpacity=".28"/>
                    </svg>
                  </div>
                </div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(18px,2.6vw,26px)', fontStyle:'italic', fontWeight:300, color:'#F5E6A8', marginBottom:8 }}>Împărtășiți momentele cu noi ✦</h3>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(13px,1.6vw,16px)', fontStyle:'italic', color:'rgba(212,175,55,.55)', lineHeight:1.8, marginBottom:18, maxWidth:440, margin:'0 auto 18px' }}>
                  Faceți poze și încărcați-le direct din telefon.<br/>Mirii vor accesa toate imaginile într-un album privat exclusivist.
                </p>
                <button onClick={() => setUploadOpen(true)} style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'13px 32px', borderRadius:4, background:'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)', color:'#0A0803', border:'none', cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:'clamp(10px,1.2vw,12px)', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', boxShadow:'0 8px 28px rgba(212,175,55,.3)', position:'relative', overflow:'hidden' }}>
                  <span style={{ position:'relative', zIndex:1 }}>◆ Încarcă Pozele Tale ◆</span>
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)', backgroundSize:'350px 100%', animation:'lux-shimmer 3s linear infinite' }}/>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Extras icons */}
        {(s.is_accommodation_active || s.is_transport_active) && (
          <div style={{ ...a(.66), display:'flex', gap:24, justifyContent:'center', marginTop:12 }}>
            {s.is_accommodation_active && <div style={{ fontSize:'2.2rem' }} title="Cazare disponibilă">🏠</div>}
            {s.is_transport_active && <div style={{ fontSize:'2.2rem' }} title="Transport asigurat">🚌</div>}
          </div>
        )}

        <div style={{ ...a(.68), display:'flex', alignItems:'center', width:'100%', maxWidth:440, margin:'24px auto' }}><GoldDivider/></div>

        {/* RSVP */}
        <div style={{ ...a(.70), textAlign:'center', width:'100%', maxWidth:420 }}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(14px,1.7vw,17px)', fontStyle:'italic', color:'rgba(212,175,55,.55)', marginBottom:16, lineHeight:1.7, letterSpacing:'.04em' }}>
            Vă rugăm să confirmați prezența Dvs.
          </p>
          <button
            onClick={() => setRsvpOpen(true)}
            style={{ display:'block', width:'100%', padding:'clamp(14px,2vw,18px) 0', borderRadius:4, background:'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)', color:'#0A0803', textAlign:'center', fontFamily:"'Cinzel',serif", fontSize:'clamp(11px,1.3vw,13px)', fontWeight:700, letterSpacing:'.22em', textTransform:'uppercase', cursor:'pointer', border:'none', boxShadow:'0 8px 40px rgba(212,175,55,.35),0 2px 0 rgba(245,214,120,.5) inset', position:'relative', overflow:'hidden' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 16px 60px rgba(212,175,55,.55)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 40px rgba(212,175,55,.35)'; }}
          >
            <span style={{ position:'relative', zIndex:1 }}>◆ Confirmă Prezența ◆</span>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)', backgroundSize:'350px 100%', animation:'lux-shimmer 3s linear infinite' }}/>
          </button>
        </div>

        {/* Footer */}
        <p style={{ ...a(.74), fontFamily:"'Cinzel',serif", fontSize:'clamp(8px,.9vw,10px)', letterSpacing:'.12em', color:'rgba(212,175,55,.25)', marginTop:40, textAlign:'center' }}>
          Contact: {s.contact_phone_bride}{s.contact_phone_bride && s.contact_phone_groom ? ' / ' : ''}{s.contact_phone_groom}
        </p>
      </div>

      {/* ── RSVP MODAL ── */}
      {rsvpOpen && (
        <LuxModal onClose={() => setRsvpOpen(false)} label="RSVP">
          <div style={{ textAlign:'center', marginBottom:22, paddingTop:20 }}>
            <div style={{ marginBottom:10 }}><CrownSVG size={64}/></div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(22px,3.5vw,30px)', fontStyle:'italic', fontWeight:300, color:'#F5E6A8', marginBottom:8 }}>Confirmă Prezența</h2>
            <div style={{ width:36, height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)', margin:'0 auto 8px' }}/>
          </div>
          <LuxRsvpForm
            orderId={s.order_id}
            showAccommodation={s.is_accommodation_active}
            showTransport={s.is_transport_active}
          />
        </LuxModal>
      )}

      {/* ── MENU MODAL ── */}
      {menuOpen && s.menu_details?.categories && (
        <LuxModal onClose={() => setMenuOpen(false)} label="Meniu">
          <div style={{ textAlign:'center', marginBottom:24, paddingTop:20 }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(8px,1vw,10px)', letterSpacing:'.36em', textTransform:'uppercase', color:'rgba(212,175,55,.55)', marginBottom:8 }}>◆ Gastronomie ◆</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(24px,3.5vw,32px)', fontStyle:'italic', fontWeight:300, color:'#F5E6A8', marginBottom:8 }}>Meniul Evenimentului</h2>
            <div style={{ width:36, height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)', margin:'0 auto 16px' }}/>
          </div>
          {s.menu_details.categories
            .filter((cat: any) => cat.active && cat.items?.length > 0)
            .map((cat: any, ci: number) => (
              <div key={ci} style={{ marginBottom:32 }}>
                <div style={{ display:'inline-block', borderBottom:'1px solid rgba(212,175,55,.3)', paddingBottom:10, marginBottom:16 }}>
                  <h4 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(12px,1.5vw,14px)', color:'#fff', fontWeight:300, letterSpacing:2, margin:0 }}>
                    {cat.emoji && <span style={{ marginRight:8 }}>{cat.emoji}</span>}{cat.label}
                  </h4>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {cat.items.map((item: any, ii: number) => (
                    <div key={ii}>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(14px,1.8vw,18px)', color:'#D4AF37', fontStyle:'italic' }}>{item.name}</div>
                      {item.description && <div style={{ fontSize:'clamp(11px,1.2vw,13px)', color:'rgba(212,175,55,.5)', fontStyle:'italic', marginTop:3, fontFamily:"'Cormorant Garamond',serif" }}>{item.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          <div style={{ textAlign:'center', marginTop:20 }}>
            <button onClick={() => setMenuOpen(false)} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'11px 28px', borderRadius:4, background:'linear-gradient(135deg,#8B6914,#D4AF37,#8B6914)', color:'#0A0803', border:'none', cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:11, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase' }}>
              ◆ Închide
            </button>
          </div>
        </LuxModal>
      )}

      {/* ── UPLOAD MODAL ── */}
      {uploadOpen && (
        <LuxModal onClose={() => setUploadOpen(false)} label="Upload">
          <div style={{ textAlign:'center', paddingTop:20 }}>
            <div style={{ display:'flex', justifyContent:'center', marginBottom:16 }}>
              <div style={{ width:68, height:68, borderRadius:'50%', background:'rgba(212,175,55,.1)', border:'2px solid rgba(212,175,55,.28)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg viewBox="0 0 48 48" fill="none" style={{ width:36, height:36 }}>
                  <rect x="4" y="14" width="40" height="28" rx="4" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7"/>
                  <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round"/>
                  <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".7"/>
                  <circle cx="24" cy="28" r="4" fill="#D4AF37" fillOpacity=".25"/>
                </svg>
              </div>
            </div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(22px,3vw,30px)', fontStyle:'italic', fontWeight:300, color:'#F5E6A8', marginBottom:10 }}>Încarcă pozele!</h2>
            <div style={{ width:36, height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)', margin:'0 auto 14px' }}/>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(13px,1.6vw,16px)', fontStyle:'italic', color:'rgba(212,175,55,.55)', marginBottom:24, lineHeight:1.8 }}>
              Faceți poze în timpul nunții și încărcați-le direct din telefon.<br/>
              Mirii vor accesa toate imaginile voastre într-un album privat exclusivist.
            </p>
            <a
              href={`/invitatie/lux/${s.slug}/upload`}
              style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'13px 32px', borderRadius:4, background:'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)', color:'#0A0803', textDecoration:'none', fontFamily:"'Cinzel',serif", fontSize:'clamp(10px,1.2vw,12px)', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', boxShadow:'0 8px 28px rgba(212,175,55,.3)' }}
            >
              ◆ Deschide Upload
            </a>
          </div>
        </LuxModal>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ROOT CLIENT COMPONENT
══════════════════════════════════════════════════════════════ */
export default function LuxInvitation({ settings }: { settings: Settings }) {
  const [phase, setPhase] = useState<Phase>('envelope');

  const openEnvelope = useCallback(() => {
    if (phase !== 'envelope') return;
    setPhase('opening');
    setTimeout(() => setPhase('invite'), 1700);
  }, [phase]);

  /* Auto-open after 1.5s */
  useEffect(() => {
    if (phase !== 'envelope') return;
    const t = setTimeout(openEnvelope, 1500);
    return () => clearTimeout(t);
  }, []);  // eslint-disable-line

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #050401; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

        @keyframes lux-fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes lux-envFloat{ 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes lux-spin    { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes lux-pulse   { 0%,100% { opacity:.45; } 50% { opacity:.9; } }
        @keyframes lux-shimmer { 0% { background-position:-350px 0; } 100% { background-position:350px 0; } }
        @keyframes lux-fadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes lux-slideUp { from { opacity:0; transform:scale(.93) translateY(18px); } to { opacity:1; transform:scale(1) translateY(0); } }

        /* Smooth scroll on invite screen */
        .lux-invite-scroll { scroll-behavior: smooth; }

        @media (max-width: 480px) {
          /* Ensure full-width modals on mobile */
        }
      `}</style>

      {phase !== 'invite' && (
        <EnvelopeScreen s={settings} phase={phase} onOpen={openEnvelope} />
      )}
      {phase === 'invite' && (
        <InvitationScreen s={settings} />
      )}
    </>
  );
}
