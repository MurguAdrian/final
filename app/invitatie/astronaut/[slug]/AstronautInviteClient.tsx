"use client";
import React, { useState, useEffect } from 'react';
import AstronautRsvpForm from './AstronautRsvpForm';

/* ── PROPS ─────────────────────────────────────────────────── */
interface Props {
  slug:               string;
  childName:          string;
  parentsNames:       string;
  nasiNames:          string;
  religiousLocation:  string;
  religiousDateISO:   string | null;
  religiousDateDisplay: string | null;
  religiousTime:      string;
  religiousMaps:      string;
  religiousWaze:      string;
  restaurantLocation: string;
  mainDateISO:        string | null;
  mainDateDisplay:    string | null;
  mainTime:           string;
  restaurantMaps:     string;
  restaurantWaze:     string;
  contactPhone:       string;
  orderId:            number;
}

/* ── SVG COMPONENTS (din tema Astronaut) ───────────────────── */
const Star = ({ style, color = '#F4D87E' }: { style?: React.CSSProperties; color?: string }) => (
  <svg style={{ width: '100%', height: '100%', display: 'block', ...style }} viewBox="0 0 24 24" fill="none">
    <path d="M12 1C12.8 6.6 17.4 11.2 23 12C17.4 12.8 12.8 17.4 12 23C11.2 17.4 6.6 12.8 1 12C6.6 11.2 11.2 6.6 12 1Z" fill={color} />
  </svg>
);

const Planet = ({ style, c1 = '#7C6BC4', c2 = '#5848A0', ring = true }: { style?: React.CSSProperties; c1?: string; c2?: string; ring?: boolean }) => (
  <svg style={{ display: 'block', ...style }} viewBox="0 0 100 100" fill="none">
    {ring && <ellipse cx="50" cy="52" rx="46" ry="11" fill="none" stroke="#F4D87E" strokeWidth="3" strokeOpacity=".5" transform="rotate(-12 50 52)" />}
    <circle cx="50" cy="50" r="30" fill={c1} />
    <path d="M22 40C32 36 44 44 50 40C60 34 70 42 78 38A30 30 0 0 1 50 80A30 30 0 0 1 22 40Z" fill={c2} opacity=".55" />
    {ring && <ellipse cx="50" cy="48" rx="46" ry="11" fill="none" stroke="#F4D87E" strokeWidth="3" strokeOpacity=".85" transform="rotate(-12 50 48)" />}
  </svg>
);

const Comet = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={{ display: 'block', ...style }} viewBox="0 0 60 24" fill="none">
    <path d="M58 2L4 12L58 22C40 18 30 16 30 12C30 8 40 6 58 2Z" fill="url(#cometG)" opacity=".8" />
    <circle cx="6" cy="12" r="4" fill="#FFF8E0" />
    <defs><linearGradient id="cometG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#FFF8E0" stopOpacity="0" /><stop offset="1" stopColor="#FFF8E0" stopOpacity=".9" /></linearGradient></defs>
  </svg>
);

const RocketSVG = ({ flame = true }: { flame?: boolean }) => (
  <svg viewBox="0 0 120 220" fill="none" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id="rb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F0F4FB" /><stop offset="1" stopColor="#C7D4EA" /></linearGradient>
      <linearGradient id="rf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE6A0" /><stop offset=".5" stopColor="#F4A85E" /><stop offset="1" stopColor="#E8602E" /></linearGradient>
    </defs>
    {flame && (
      <g style={{ transformBox: 'fill-box', transformOrigin: 'center top', animation: 'astr-flame .22s ease-in-out infinite alternate' }}>
        <path d="M44 168C44 168 36 195 60 220C84 195 76 168 76 168Z" fill="url(#rf)" />
      </g>
    )}
    <path d="M60 4C84 30 92 78 92 120L92 158L28 158L28 120C28 78 36 30 60 4Z" fill="url(#rb)" stroke="#9FB2D0" strokeWidth="1.4" />
    <path d="M28 130L8 168L28 158Z" fill="#5848A0" />
    <path d="M92 130L112 168L92 158Z" fill="#5848A0" />
    <circle cx="60" cy="58" r="18" fill="#3C7E9C" stroke="#2E6480" strokeWidth="2" />
    <circle cx="60" cy="58" r="11" fill="#BFE6F4" opacity=".8" />
    <rect x="40" y="100" width="40" height="6" rx="3" fill="#E8602E" />
    <rect x="40" y="114" width="40" height="6" rx="3" fill="#5848A0" opacity=".7" />
    <path d="M28 158L92 158L88 172L32 172Z" fill="#9FB2D0" />
  </svg>
);

/* ── SPACE DECOR ────────────────────────────────────────────── */
const STARS_POS = [
  { t:'10%', l:'18%', w:14, d:2.8, delay:0 }, { t:'22%', l:'70%', w:10, d:3.4, delay:.5 },
  { t:'36%', l:'12%', w:8,  d:3.8, delay:.2 }, { t:'54%', l:'82%', w:12, d:3.1, delay:.8 },
  { t:'68%', l:'28%', w:9,  d:4.2, delay:.15 },{ t:'30%', l:'46%', w:7,  d:4.6, delay:1  },
  { t:'78%', l:'60%', w:10, d:3.6, delay:.65 },{ t:'16%', l:'52%', w:6,  d:5,   delay:.35 },
  { t:'60%', l:'8%',  w:8,  d:3.9, delay:.9  },
];

function SpaceDecor() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {STARS_POS.map((s, i) => (
        <div key={i} style={{ position: 'absolute', top: s.t, left: s.l, width: s.w, animation: `astr-twinkle ${s.d}s ease-in-out infinite ${s.delay}s` }}>
          <Star />
        </div>
      ))}
      <Planet style={{ position: 'absolute', top: '8%', right: '-4%', width: 'clamp(80px,16vw,150px)', opacity: .9, animation: 'astr-floatY 14s ease-in-out infinite' }} />
      <Planet style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 'clamp(70px,14vw,130px)', opacity: .85, animation: 'astr-floatY 12s ease-in-out infinite 1s' }} c1="#E8965E" c2="#C76B3A" ring={false} />
      <Planet style={{ position: 'absolute', top: '46%', left: '4%', width: 'clamp(40px,8vw,70px)', opacity: .6, animation: 'astr-floatY 9s ease-in-out infinite .5s' }} c1="#5EA8C7" c2="#3C7E9C" ring={false} />
      <Comet style={{ position: 'absolute', top: '20%', left: '8%', width: 'clamp(60px,12vw,110px)', opacity: .5, animation: 'astr-comet 9s linear infinite' }} />
      <Comet style={{ position: 'absolute', top: '64%', right: '6%', width: 'clamp(50px,10vw,90px)', opacity: .4, animation: 'astr-comet 11s linear infinite 3s reverse' }} />
    </div>
  );
}

/* ── COUNTDOWN HOOK ─────────────────────────────────────────── */
function useCountdown(targetISO: string | null) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
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

/* ── ICONS ──────────────────────────────────────────────────── */
const WazeIcon  = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:14,height:14}}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/></svg>);
const MapsIcon  = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:14,height:14}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>);
const PhoneIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);

type Phase = 'intro' | 'launch' | 'invite';

/* ── MAIN CLIENT COMPONENT ──────────────────────────────────── */
export default function AstronautInviteClient(props: Props) {
  const {
    childName, parentsNames, nasiNames,
    religiousLocation, religiousDateISO, religiousDateDisplay, religiousTime, religiousMaps, religiousWaze,
    restaurantLocation, mainDateISO, mainDateDisplay, mainTime, restaurantMaps, restaurantWaze,
    contactPhone, orderId, slug,
  } = props;

  const [phase, setPhase] = useState<Phase>('intro');
  const [vis, setVis]     = useState(false);
  const [flipS, setFlipS] = useState(false);
  const [showRsvp, setShowRsvp] = useState(false);
  const cd = useCountdown(mainDateISO);

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

  function startLaunch() {
    if (phase !== 'intro') return;
    setPhase('launch');
    setTimeout(() => setPhase('invite'), 1900);
  }

  const a = (d: number): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s ease ${d}s, transform .7s ease ${d}s`,
  });

  const mapsHref = (q: string) => q.startsWith('http') ? q : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  const wazeHref = (q: string) => q.startsWith('http') ? q : `https://waze.com/ul?q=${encodeURIComponent(q)}&navigate=yes`;

  const BG = 'radial-gradient(ellipse 70% 60% at 20% 15%, rgba(80,70,160,.35) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 85% 85%, rgba(40,50,120,.4) 0%, transparent 55%), linear-gradient(160deg, #14152B 0%, #1E2046 45%, #2A1F4D 100%)';

  const navBtn: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '6px 14px', borderRadius: 100,
    background: 'rgba(124,107,196,.12)', border: '1px solid rgba(124,107,196,.25)',
    color: '#F4F6FB', fontFamily: "'Nunito',sans-serif",
    fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase',
    cursor: 'pointer', textDecoration: 'none', transition: 'all .2s',
  };

  const locBtn = (grad: string): React.CSSProperties => ({
    flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 6, padding: '9px 8px', borderRadius: 11,
    background: grad, color: '#fff',
    fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700,
    textDecoration: 'none', whiteSpace: 'nowrap',
  });

  const events = [
    ...(religiousLocation ? [{
      type: 'Slujba Religioasă', name: 'Taina Botezului',
      venue: religiousLocation, time: religiousTime,
      dateDisplay: religiousDateDisplay,
      maps: religiousMaps, waze: religiousWaze,
      bg: 'linear-gradient(135deg,#5848A0,#3C2E78)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}>
          <path d="M12 2L12 6M10 4h4" /><rect x="4" y="9" width="16" height="12" rx="1" />
          <path d="M9 21V14a3 3 0 0 1 6 0v7" /><path d="M4 9l8-4 8 4" />
        </svg>
      ),
    }] : []),
    ...(restaurantLocation ? [{
      type: 'Petrecerea de După', name: 'Recepție',
      venue: restaurantLocation, time: mainTime,
      dateDisplay: mainDateDisplay,
      maps: restaurantMaps, waze: restaurantWaze,
      bg: 'linear-gradient(135deg,#3C7E9C,#2A5A78)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}>
          <ellipse cx="9" cy="8" rx="4" ry="5" /><ellipse cx="16" cy="10" rx="3.2" ry="4" />
          <path d="M9 13C9 16 8 17 8 19" /><path d="M16 14C16 16 17 17 17 19" /><path d="M8 19L17 19" />
        </svg>
      ),
    }] : []),
  ];

  return (
    <>
      <style>{CSS_ANIM}</style>

      {/* ── HEADER ── */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(16px,4vw,28px)', background: 'rgba(20,21,43,.9)', borderBottom: '1px solid rgba(156,182,232,.14)', backdropFilter: 'blur(14px)' }}>
        <a href="/invitatii-digitale" style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#F4F6FB', textDecoration: 'none' }}>
          Vibe<span style={{ color: '#7C6BC4' }}>Invite</span>
        </a>
        <div style={{ fontFamily: "'Cormorant',serif", fontSize: 15, fontStyle: 'italic', color: '#B8C4E8', letterSpacing: '.04em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '40%', textAlign: 'center' }}>
          {phase === 'invite' ? (childName || 'Botez') : 'Invitație la Botez'}
        </div>
        <a href="/preturi" style={navBtn}>Alege Tema</a>
      </header>

      {/* ── INTRO / LAUNCH PHASE ── */}
      {phase !== 'invite' && (
        <div style={{ position: 'fixed', inset: 0, top: 56, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: BG }} />
          <SpaceDecor />
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '16px 22px', width: '100%' }}>
            <p style={{ opacity: phase === 'launch' ? 0 : 1, transition: 'opacity .5s', fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(10px,1.2vw,12px)', letterSpacing: '.3em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600, animation: 'astr-fadeUp .7s ease both' }}>
              Invitație la Botez
            </p>
            <h1 style={{ opacity: phase === 'launch' ? 0 : 1, transition: 'opacity .5s', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(40px,8vw,76px)', fontWeight: 500, fontStyle: 'italic', color: '#F4F6FB', textAlign: 'center', lineHeight: 1, margin: 0, textShadow: '0 4px 30px rgba(124,107,196,.5)', animation: 'astr-fadeUp .8s ease both .08s' }}>
              {childName || 'Botez'}
            </h1>
            <p style={{ opacity: phase === 'launch' ? 0 : 1, transition: 'opacity .5s', fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,2vw,19px)', fontStyle: 'italic', color: '#B8C4E8', textAlign: 'center', maxWidth: 360, lineHeight: 1.5, animation: 'astr-fadeUp .9s ease both .16s' }}>
              Pregătiți rachetele — pornim într-o aventură cosmică plină de bucurie
            </p>
            <div
              onClick={startLaunch}
              role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && startLaunch()}
              style={{ position: 'relative', width: 'min(94vw,420px)', height: 'clamp(220px,46vw,340px)', cursor: 'pointer', marginTop: 6 }}
            >
              <div style={{
                position: 'absolute', left: '50%', bottom: '8%',
                width: 'clamp(80px,22vw,130px)',
                transform: phase === 'launch' ? 'translate(-50%,-160vh) scale(.7)' : 'translate(-50%,0)',
                transition: 'transform 1.85s cubic-bezier(.5,.03,.5,1)',
                zIndex: 5,
              }}>
                <div style={{ animation: phase === 'launch' ? 'none' : 'astr-bob 2.6s ease-in-out infinite' }}>
                  <RocketSVG flame={phase === 'launch'} />
                </div>
              </div>
              <div style={{ position: 'absolute', left: '50%', bottom: '6%', transform: 'translateX(-50%)', width: 'clamp(100px,30vw,180px)', height: 14, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(124,107,196,.35),transparent 70%)' }} />
            </div>
            <p style={{
              fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(10px,1.2vw,12px)',
              letterSpacing: '.24em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600,
              animation: phase === 'launch' ? 'none' : 'astr-pulse 2.8s ease-in-out infinite 1.4s',
            }}>
              {phase === 'launch' ? '✦  Decolare spre invitație…' : 'Atinge pentru lansare'}
            </p>
          </div>
        </div>
      )}

      {/* ── INVITE PHASE ── */}
      {phase === 'invite' && (
        <div style={{ position: 'fixed', inset: 0, top: 56, overflowY: 'auto', overflowX: 'hidden' }}>
          <div style={{ position: 'fixed', inset: 0, background: BG, zIndex: 0 }} />
          <SpaceDecor />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto', padding: 'clamp(32px,5vw,52px) clamp(18px,4vw,28px) 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

            {/* motif */}
            <div style={{ ...a(0), marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 'clamp(140px,28vw,200px)', height: 'clamp(76px,14vw,110px)' }}>
                <div style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: 24, animation: 'astr-twinkle 3s ease-in-out infinite' }}><Star /></div>
                <div style={{ position: 'absolute', top: 16, left: '14%', width: 13, animation: 'astr-twinkle 3.6s ease-in-out infinite .5s' }}><Star color="#9CB6E8" /></div>
                <div style={{ position: 'absolute', top: 20, right: '14%', width: 11, animation: 'astr-twinkle 4s ease-in-out infinite .9s' }}><Star color="#E8965E" /></div>
                <Planet style={{ position: 'absolute', left: '50%', top: '34%', transform: 'translateX(-50%)', width: '56%', filter: 'drop-shadow(0 8px 18px rgba(80,70,160,.4))', animation: 'astr-spinSlow 40s linear infinite' }} />
              </div>
            </div>

            {/* eyebrow */}
            <p style={{ ...a(.06), fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(10px,1.2vw,12px)', letterSpacing: '.3em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600, marginBottom: 10 }}>
              Invitație la Botez
            </p>

            {/* child name */}
            <div style={{ ...a(.12), textAlign: 'center', marginBottom: 6 }}>
              <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(52px,9vw,100px)', fontWeight: 500, fontStyle: 'italic', color: '#F4F6FB', lineHeight: .95, textShadow: '0 4px 32px rgba(124,107,196,.5)', letterSpacing: '-.01em' }}>
                {childName || ''}
              </span>
              {parentsNames && (
                <span style={{ display: 'block', fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.9vw,19px)', fontStyle: 'italic', color: '#B8C4E8', marginTop: 6 }}>
                  Fiul lui {parentsNames}
                </span>
              )}
            </div>

            {/* COUNTDOWN */}
            {mainDateISO && (
              <div style={{ ...a(.18), width: '100%', maxWidth: 440, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(156,182,232,.18)', borderRadius: 22, padding: 'clamp(18px,3vw,26px) clamp(12px,2vw,18px)', backdropFilter: 'blur(12px)', textAlign: 'center', boxShadow: '0 6px 30px rgba(20,20,50,.35)', marginTop: 22 }}>
                <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(8px,.95vw,10px)', letterSpacing: '.22em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600, marginBottom: 14 }}>
                  Numărătoare Inversă
                </p>
                <div style={{ display: 'flex', gap: 0, justifyContent: 'center' }}>
                  {[{ n: pad(cd.d), l: 'Zile' }, { n: pad(cd.h), l: 'Ore' }, { n: pad(cd.m), l: 'Minute' }, { n: pad(cd.s), l: 'Secunde', flip: flipS }].map(u => (
                    <div key={u.l} style={{ flex: 1, maxWidth: 100, textAlign: 'center', padding: '0 4px', borderRight: '1px solid rgba(156,182,232,.18)' }}>
                      <span style={{ display: 'block', fontFamily: "'Cormorant',serif", fontSize: 'clamp(34px,5.5vw,54px)', fontWeight: 300, lineHeight: 1, transition: 'transform .15s, color .15s', transform: (u as any).flip ? 'scale(1.1) translateY(-3px)' : '', color: (u as any).flip ? '#F4D87E' : '#F4F6FB' }}>
                        {u.n}
                      </span>
                      <span style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(7px,.85vw,9px)', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600, display: 'block', marginTop: 3 }}>{u.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* divider */}
            <div style={{ ...a(.24), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '22px auto' }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(156,182,232,.35),transparent)' }} />
              <div style={{ width: 16 }}><Star /></div>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(156,182,232,.35),transparent)' }} />
            </div>

            {/* date */}
            {mainDateDisplay && (
              <div style={{ ...a(.3), textAlign: 'center', marginBottom: 18 }}>
                <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(12px,1.7vw,15px)', letterSpacing: '.12em', color: '#F4F6FB', fontWeight: 600, marginBottom: 5 }}>
                  {mainDateDisplay}
                </p>
              </div>
            )}

            {/* family card */}
            {(parentsNames || nasiNames) && (
              <div style={{ ...a(.36), textAlign: 'center', padding: 'clamp(18px,3vw,26px) clamp(22px,4vw,32px)', border: '1px solid rgba(156,182,232,.18)', borderRadius: 20, background: 'rgba(255,255,255,.04)', backdropFilter: 'blur(10px)', maxWidth: 380, width: '100%', boxShadow: '0 4px 26px rgba(20,20,50,.3)' }}>
                <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(9px,1.1vw,10px)', letterSpacing: '.22em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600, marginBottom: 12 }}>Echipajul Misiunii</p>
                <div style={{ width: 36, height: 1, background: 'rgba(244,216,126,.4)', margin: '0 auto 14px' }} />
                {parentsNames && (
                  <>
                    <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(12px,1.5vw,14px)', fontStyle: 'italic', color: '#B8C4E8', marginBottom: 4 }}>Părinții</p>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(17px,2.2vw,22px)', fontStyle: 'italic', fontWeight: 400, color: '#F4F6FB' }}>{parentsNames}</p>
                  </>
                )}
                {parentsNames && nasiNames && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', margin: '14px auto' }}>
                    <div style={{ width: 40, height: 1, background: 'rgba(156,182,232,.25)' }} />
                    <div style={{ width: 7, height: 7, background: '#F4D87E', transform: 'rotate(45deg)' }} />
                    <div style={{ width: 40, height: 1, background: 'rgba(156,182,232,.25)' }} />
                  </div>
                )}
                {nasiNames && (
                  <>
                    <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(12px,1.5vw,14px)', fontStyle: 'italic', color: '#B8C4E8', marginBottom: 4 }}>Nașii</p>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(17px,2.2vw,22px)', fontStyle: 'italic', fontWeight: 400, color: '#F4F6FB' }}>{nasiNames}</p>
                  </>
                )}
              </div>
            )}

            {/* divider */}
            <div style={{ ...a(.42), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '22px auto' }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(156,182,232,.35),transparent)' }} />
              <div style={{ width: 8, height: 8, background: '#F4D87E', transform: 'rotate(45deg)', boxShadow: '0 0 0 3px rgba(244,216,126,.16)' }} />
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(156,182,232,.35),transparent)' }} />
            </div>

            {/* events timeline */}
            {events.length > 0 && (
              <div style={{ ...a(.48), width: '100%', maxWidth: 520, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 19, top: 10, bottom: 10, width: 2, background: 'linear-gradient(180deg,rgba(244,216,126,.5),rgba(156,182,232,.15))' }} />
                {events.map((ev, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 16, marginBottom: idx < events.length - 1 ? 22 : 0 }}>
                    <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', background: ev.bg, border: '2px solid rgba(244,216,126,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 18px rgba(20,20,50,.4)', zIndex: 1 }}>
                      {ev.icon}
                    </div>
                    <div style={{ flex: 1, borderRadius: 16, border: '1px solid rgba(156,182,232,.16)', background: 'rgba(255,255,255,.04)', backdropFilter: 'blur(10px)', padding: 'clamp(12px,2vw,16px) clamp(14px,2.5vw,20px)', boxShadow: '0 6px 26px rgba(20,20,50,.3)' }}>
                      <span style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 8.5, letterSpacing: '.2em', textTransform: 'uppercase', color: '#F4D87E', fontWeight: 600, display: 'block', marginBottom: 2 }}>{ev.type}</span>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(14px,1.8vw,17px)', fontStyle: 'italic', fontWeight: 400, color: '#F4F6FB', lineHeight: 1.2, marginBottom: 6 }}>{ev.name}</p>
                      <p style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: 'clamp(11px,1.3vw,13px)', color: '#F4F6FB', marginBottom: 2 }}>{ev.venue}</p>
                      {ev.time && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(244,216,126,.1)', border: '1px solid rgba(244,216,126,.25)', borderRadius: 100, padding: '3px 10px', fontFamily: "'Quicksand',sans-serif", fontSize: 8.5, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600, color: '#F4D87E', margin: '8px 0 10px' }}>
                          🚀 {ev.dateDisplay ?? ''} · ora {ev.time}
                        </div>
                      )}
                      {(ev.waze || ev.maps) && (
                        <div style={{ display: 'flex', gap: 8 }}>
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
            <div style={{ ...a(.56), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '26px auto' }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(156,182,232,.35),transparent)' }} />
              <div style={{ width: 8, height: 8, background: '#F4D87E', transform: 'rotate(45deg)', boxShadow: '0 0 0 3px rgba(244,216,126,.16)' }} />
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(156,182,232,.35),transparent)' }} />
            </div>

            {/* contact */}
            {contactPhone && (
              <div style={{ ...a(.6), width: '100%', maxWidth: 640, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(156,182,232,.16)', borderRadius: 18, padding: 'clamp(14px,2.5vw,20px) clamp(16px,3vw,24px)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 22px rgba(20,20,50,.3)' }}>
                <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600, marginBottom: 12 }}>Contact</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(14px,1.8vw,17px)', fontStyle: 'italic', color: '#F4F6FB', marginBottom: 2 }}>Familia</p>
                    <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(11px,1.3vw,13px)', color: '#F4D87E', letterSpacing: '.06em', fontWeight: 700 }}>{contactPhone}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href={`tel:${contactPhone.replace(/\s/g,'')}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 100, background: 'linear-gradient(135deg,#7C6BC4,#5848A0)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', boxShadow: '0 4px 16px rgba(88,72,160,.45)', textDecoration: 'none' }}>
                      <PhoneIcon /> Telefon
                    </a>
                    <a href={`https://wa.me/${contactPhone.replace(/[\s+]/g,'')}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 100, background: 'linear-gradient(135deg,#25D366,#1DA851)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', boxShadow: '0 4px 14px rgba(37,211,102,.35)', textDecoration: 'none' }}>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* divider */}
            <div style={{ ...a(.64), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '26px auto' }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(156,182,232,.35),transparent)' }} />
              <div style={{ width: 16 }}><Star color="#E8965E" /></div>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(156,182,232,.35),transparent)' }} />
            </div>

            {/* RSVP */}
            <div style={{ ...a(.68), textAlign: 'center', width: '100%', maxWidth: 380 }}>
              {!showRsvp ? (
                <>
                  <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.7vw,17px)', fontStyle: 'italic', color: '#B8C4E8', marginBottom: 16, lineHeight: 1.6, letterSpacing: '.03em' }}>
                    {mainDateDisplay ? (
                      <>Confirmați participarea până pe <strong style={{ color: '#F4D87E', fontStyle: 'normal' }}>{mainDateDisplay}</strong></>
                    ) : 'Confirmați participarea'}
                  </p>
                  <button onClick={() => setShowRsvp(true)} style={{ display: 'block', width: '100%', padding: 'clamp(14px,1.8vw,18px) 0', borderRadius: 100, background: 'linear-gradient(135deg,#7C6BC4,#5848A0)', color: '#fff', textAlign: 'center', fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(11px,1.3vw,13px)', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', boxShadow: '0 10px 36px rgba(88,72,160,.5)', transition: 'transform .22s,box-shadow .22s', position: 'relative', overflow: 'hidden' }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.transform='translateY(-3px)'; el.style.boxShadow='0 18px 46px rgba(88,72,160,.65)'; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.transform=''; el.style.boxShadow='0 10px 36px rgba(88,72,160,.5)'; }}>
                    <span style={{ position: 'relative', zIndex: 1 }}>Confirmă Participarea 🚀</span>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)', backgroundSize: '350px 100%', animation: 'astr-shimmer 3s linear infinite' }} />
                  </button>
                </>
              ) : (
                <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(156,182,232,.18)', borderRadius: 24, padding: 'clamp(22px,4vw,34px) clamp(18px,4vw,28px)', backdropFilter: 'blur(12px)', textAlign: 'left' }}>
                  <AstronautRsvpForm orderId={orderId} />
                </div>
              )}
            </div>

            {/* footer */}
            <div style={{ ...a(.76), marginTop: 28, width: '100%', maxWidth: 480, textAlign: 'center', padding: 'clamp(18px,3vw,26px)', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(156,182,232,.16)', borderRadius: 20, backdropFilter: 'blur(8px)' }}>
              <span style={{ fontSize: 28, display: 'block', marginBottom: 10 }}>🪐</span>
              <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(15px,2vw,20px)', fontStyle: 'italic', color: '#D6DEFA', lineHeight: 1.7, letterSpacing: '.01em' }}>
                Prezența voastră va face această misiune și mai memorabilă.
              </p>
              <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(184,196,232,.4)', fontWeight: 600, marginTop: 16 }}>
                VibeInvite © {new Date().getFullYear()} · Toate drepturile rezervate
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

/* ── CSS ANIMATIONS ─────────────────────────────────────────── */
const CSS_ANIM = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Cormorant:ital,wght@0,300;1,300;1,400&family=Quicksand:wght@400;500;600;700&family=Nunito:wght@300;400;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;-webkit-font-smoothing:antialiased;}
  body{font-family:'Nunito',sans-serif;background:#14152B;color:#F4F6FB;}
  input,select,textarea{font-size:16px!important;}
  @keyframes astr-fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  @keyframes astr-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes astr-flame{from{transform:scaleY(1) scaleX(1)}to{transform:scaleY(1.15) scaleX(.9)}}
  @keyframes astr-spinSlow{to{transform:translateX(-50%) rotate(360deg)}}
  @keyframes astr-floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
  @keyframes astr-twinkle{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}
  @keyframes astr-comet{0%{transform:translateX(-40px) translateY(0)}100%{transform:translateX(40px) translateY(20px)}}
  @keyframes astr-shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
  @keyframes astr-pulse{0%,100%{opacity:.42}50%{opacity:.9}}
  @media(max-width:480px){body{overflow:hidden}}
`;
