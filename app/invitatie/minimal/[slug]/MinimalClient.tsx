'use client';

import { useState, useEffect } from 'react';
import MinimalRsvpForm from './MinimalRsvpForm';

type Phase = 'envelope' | 'opening' | 'invite';

export interface MinimalClientProps {
  religiousMaps: string;
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
  }, [target]);
  return t;
}

const pad = (n: number) => String(n).padStart(2, '0');

const ACCENT = '#C8503A';
const DARK = '#111111';
const MID = '#555555';
const LIGHT = '#AAAAAA';
const RULE = '#E2E2E2';
const BG = '#F7F4F0';

function WazeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}>
      <path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z" />
    </svg>
  );
}

function MapsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

const MODAL_OVERLAY: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 300,
  background: `rgba(247,244,240,.94)`,
  backdropFilter: 'blur(14px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  animation: 'mn-fadeIn .22s ease',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
};

const MODAL_BOX: React.CSSProperties = {
  background: '#fff',
  borderRadius: 0,
  padding: 'clamp(28px,4vw,44px) clamp(22px,4vw,40px)',
  maxWidth: 480,
  width: '100%',
  borderTop: `4px solid ${ACCENT}`,
  boxShadow: '0 24px 80px rgba(0,0,0,.12)',
  animation: 'mn-slideUp .28s cubic-bezier(.4,0,.2,1)',
  maxHeight: '90dvh',
  overflowY: 'auto',
  position: 'relative',
  overscrollBehavior: 'contain',
};

const DARK_BTN: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '14px 0',
  background: DARK,
  color: '#fff',
  fontFamily: "'DM Sans',sans-serif",
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: '.22em',
  textTransform: 'uppercase' as const,
  border: 'none',
  cursor: 'pointer',
  transition: 'background .18s',
};

const NAV_BTN: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  padding: '8px 14px',
  fontFamily: "'DM Sans',sans-serif",
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: '.1em',
  cursor: 'pointer',
  flex: 1,
  whiteSpace: 'nowrap' as const,
  border: 'none',
  textDecoration: 'none',
  textTransform: 'uppercase' as const,
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{
    height:100%;
    min-height:100dvh;
    overflow:hidden;
    overscroll-behavior:none;
    -webkit-font-smoothing:antialiased;
  }
  body{
    font-family:'DM Sans',sans-serif;
    background:${BG};
    color:${DARK};
    height:100%;
    min-height:100dvh;
    overflow:hidden;
    overscroll-behavior:none;
    position:fixed;
    width:100%;
    -webkit-text-size-adjust:100%;
    text-size-adjust:100%;
  }
  input,textarea,select{
    font-size:16px !important;
    -webkit-text-size-adjust:100%;
    text-size-adjust:100%;
  }
  @keyframes mn-fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes mn-envFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes mn-pulse{0%,100%{opacity:.38}50%{opacity:.85}}
  @keyframes mn-fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes mn-slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
`;

function EnvelopeScreen({
  onOpen,
  phase,
  brideName,
  groomName,
  initials,
  weddingDateDisplay,
}: {
  onOpen: () => void;
  phase: Phase;
  brideName: string;
  groomName: string;
  initials: string;
  weddingDateDisplay: string | null;
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        top: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        overscrollBehavior: 'none',
        background: BG,
      }}
    >
      {/* Left accent stripe */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 'clamp(4px,0.5vw,6px)', height: '100%', background: ACCENT, zIndex: 1 }} />

      {/* Large editorial background text */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(120px,24vw,300px)', fontWeight: 700, fontStyle: 'italic', color: 'rgba(0,0,0,.03)', letterSpacing: '-.04em', userSelect: 'none', lineHeight: 1, whiteSpace: 'nowrap' }}>
          {brideName}
        </span>
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '20px 24px' }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, animation: 'mn-fadeUp .5s ease both' }}>
          <div style={{ width: 28, height: 2, background: ACCENT }} />
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: '.36em', textTransform: 'uppercase', color: LIGHT, fontWeight: 500 }}>
            Invitație de Nuntă
          </p>
          <div style={{ width: 28, height: 2, background: ACCENT }} />
        </div>

        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(34px,5.5vw,64px)', fontWeight: 400, fontStyle: 'italic', color: DARK, textAlign: 'center', lineHeight: 1.1, animation: 'mn-fadeUp .65s ease both .06s', margin: 0, letterSpacing: '-.01em' }}>
          <strong style={{ fontWeight: 500, fontStyle: 'italic' }}>{brideName}</strong>
          <span style={{ color: ACCENT, fontWeight: 300, fontSize: '.7em', display: 'block', margin: '2px 0', letterSpacing: '.3em', fontStyle: 'normal' }}>&amp;</span>
          <strong style={{ fontWeight: 500, fontStyle: 'italic' }}>{groomName}</strong>
        </h1>

        {/* ENVELOPE */}
        <div
          onClick={onOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpen()}
          style={{ animation: 'mn-envFloat 6s ease-in-out infinite, mn-fadeUp .75s ease both .1s', position: 'relative', width: 'clamp(290px,44vw,500px)', cursor: 'pointer', userSelect: 'none', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.1))' }}
        >
          <div style={{ position: 'absolute', bottom: -10, left: '10%', right: '10%', height: 14, background: 'radial-gradient(ellipse,rgba(0,0,0,.08) 0%,transparent 70%)', filter: 'blur(8px)', zIndex: 0 }} />

          {/* LETTER inside */}
          <div style={{ position: 'absolute', left: '9%', right: '9%', bottom: '4%', height: '60%', zIndex: phase === 'opening' ? 30 : 2, background: '#fff', borderLeft: `4px solid ${ACCENT}`, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: 4, paddingLeft: 18, paddingRight: 14, boxShadow: phase === 'opening' ? '0 24px 60px rgba(0,0,0,.18)' : '0 2px 8px rgba(0,0,0,.05)', transform: phase === 'opening' ? 'translateY(-142%) scale(1.04) rotate(-0.5deg)' : 'translateY(0)', transition: 'transform 1.3s cubic-bezier(.22,.1,.2,1) .22s,box-shadow 1.3s ease .22s', overflow: 'hidden' }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(7px,.8vw,9px)', letterSpacing: '.28em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, marginBottom: 2 }}>{weddingDateDisplay}</p>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(14px,2.2vw,22px)', fontStyle: 'italic', fontWeight: 400, color: DARK, lineHeight: 1.2 }}>{brideName} &amp; {groomName}</p>
          </div>

          {/* ENVELOPE BODY */}
          <div style={{ width: '100%', paddingTop: '60%', position: 'relative', zIndex: 5 }}>
            <div style={{ position: 'absolute', inset: 0, background: '#E8E4DE', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,.08)' }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%', background: '#DDD8D0', clipPath: 'polygon(0 0,0 100%,100% 100%)' }} />
              <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '50%', background: '#DDD8D0', clipPath: 'polygon(100% 0,0 100%,100% 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: '#D4CFC8', clipPath: 'polygon(0 100%,50% 0,100% 100%)' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: ACCENT, opacity: .6 }} />
            </div>
            {/* Seal */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-52%)', width: 'clamp(52px,8.5vw,76px)', height: 'clamp(52px,8.5vw,76px)', background: DARK, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 3px ${BG}, 0 0 0 5px ${ACCENT}, 0 8px 24px rgba(0,0,0,.15)`, zIndex: 10, opacity: phase === 'opening' ? 0 : 1, transition: 'opacity .2s' }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(11px,1.8vw,16px)', fontStyle: 'italic', color: '#fff' }}>{initials}</span>
            </div>
            {/* Flap */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 8, height: '52%', background: '#D8D3CC', clipPath: 'polygon(0 0,100% 0,50% 100%)', transformOrigin: 'top center', transform: phase === 'opening' ? 'perspective(700px) rotateX(192deg)' : 'perspective(700px) rotateX(0deg)', transition: 'transform .95s cubic-bezier(.4,0,.2,1)', borderBottom: '1px solid #C8C4BC' }} />
          </div>
        </div>

        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: LIGHT, animation: phase === 'opening' ? 'none' : 'mn-fadeUp .85s ease both .28s, mn-pulse 3s ease-in-out infinite 1.1s', fontWeight: 400 }}>
          {phase === 'opening' ? 'Se deschide...' : 'Atinge pentru a deschide'}
        </p>
      </div>

      {/* Bottom accent bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${ACCENT} 0%,#E8C4B8 60%,transparent 100%)`, opacity: .6 }} />
    </div>
  );
}

function InviteScreen({ props }: { props: MinimalClientProps }) {
  const { slug, brideName, groomName, nasiNames, parentsNames, religiousMaps, weddingDateISO, weddingDateDisplay, weddingTime, locationName, wazeUrl, googleMapsUrl, isReligiousActive, religiousDateDisplay, religiousTime, religiousLocation, religiousWaze, ourStory, isMenuActive, menuDetails, isGalleryActive, isAccommodationActive, isTransportActive, contactPhoneBride, contactPhoneGroom, orderId } = props;

  const weddingDate = weddingDateISO ? new Date(weddingDateISO) : null;
  const cd = useCountdown(weddingDate);
  const [flipS, setFlipS] = useState(false);
  const [vis, setVis] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const [galleryModal, setGalleryModal] = useState(false);
  const [rsvpModal, setRsvpModal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setFlipS(true);
    const t = setTimeout(() => setFlipS(false), 160);
    return () => clearTimeout(t);
  }, [cd.s]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuModal(false); setGalleryModal(false); setRsvpModal(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const a = (d: number): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity .65s ease ${d}s,transform .65s ease ${d}s`,
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        top: 56,
        overflowY: 'auto',
        overflowX: 'hidden',
        overscrollBehavior: 'contain',
        background: BG,
      }}
    >
      {/* Left accent stripe */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: 'clamp(4px,0.5vw,6px)', height: '100%', background: ACCENT, zIndex: 10, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto', padding: 'clamp(44px,6vw,72px) clamp(24px,6vw,56px) 60px clamp(28px,6vw,60px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>

        {/* HERO */}
        <div style={{ ...a(0), width: '100%', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 3, background: ACCENT }} />
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.38em', textTransform: 'uppercase', color: LIGHT, fontWeight: 500 }}>Cu Onoare Vă Invităm</p>
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(52px,9vw,108px)', fontWeight: 400, fontStyle: 'italic', color: DARK, lineHeight: .9, letterSpacing: '-.01em' }}>{brideName}</span>
            <span style={{ display: 'block', fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(10px,1.3vw,13px)', fontWeight: 300, color: ACCENT, margin: '8px 0', letterSpacing: '.5em', textTransform: 'uppercase' }}>&amp;</span>
            <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(52px,9vw,108px)', fontWeight: 400, fontStyle: 'italic', color: DARK, lineHeight: .9, letterSpacing: '-.01em' }}>{groomName}</span>
          </div>
          {(weddingDateDisplay || locationName) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 20 }}>
              <div style={{ width: 40, height: 1, background: RULE }} />
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(9px,1.1vw,11px)', letterSpacing: '.22em', color: MID, textTransform: 'uppercase', fontWeight: 400 }}>
                {weddingDateDisplay}{weddingTime ? ` · ora ${weddingTime}` : ''}{locationName ? ` · ${locationName}` : ''}
              </p>
            </div>
          )}
        </div>

        {/* Full-width rule */}
        <div style={{ ...a(.1), width: '100%', height: 1, background: `linear-gradient(90deg,${ACCENT},#E8C4B8,transparent)`, marginBottom: 36 }} />

        {/* NAȘI */}
        {nasiNames && (
          <div style={{ ...a(.14), width: '100%', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(16px,3vw,28px)', alignItems: 'center', marginBottom: 32, paddingBottom: 28, borderBottom: `1px solid ${RULE}` }}>
            <div style={{ width: 'clamp(44px,6vw,60px)', height: 'clamp(44px,6vw,60px)', background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, marginBottom: 4 }}>Nași de onoare</p>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(18px,2.4vw,26px)', fontStyle: 'italic', fontWeight: 400, color: DARK }}>{nasiNames}</p>
            </div>
          </div>
        )}

        {/* PARENTS */}
        {parentsNames && (
          <div style={{ ...a(.18), width: '100%', marginBottom: 28, paddingBottom: 24, borderBottom: `1px solid ${RULE}` }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: LIGHT, marginBottom: 6, fontWeight: 500 }}>Împreună cu părinții</p>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(14px,1.6vw,17px)', fontStyle: 'italic', fontWeight: 400, color: MID }}>{parentsNames}</p>
          </div>
        )}

        {/* COUNTDOWN */}
        {weddingDate && (
          <div style={{ ...a(.22), width: '100%', marginBottom: 36 }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: LIGHT, marginBottom: 12, fontWeight: 500 }}>Timp rămas</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(4px,1vw,8px)' }}>
              {[{ n: pad(cd.d), l: 'Zile', dark: true }, { n: pad(cd.h), l: 'Ore', accent: true }, { n: pad(cd.m), l: 'Minute' }, { n: pad(cd.s), l: 'Secunde', flip: flipS }].map((u: any) => (
                <div key={u.l} style={{ background: u.dark ? DARK : u.accent ? ACCENT : '#fff', padding: 'clamp(14px,2vw,20px) clamp(8px,1.5vw,14px)', border: `1px solid ${(u.dark || u.accent) ? 'transparent' : RULE}` }}>
                  <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,5.5vw,52px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1, color: (u.dark || u.accent) ? '#fff' : DARK, transition: 'opacity .12s', opacity: u.flip ? .5 : 1 }}>{u.n}</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(7px,.78vw,9px)', letterSpacing: '.22em', textTransform: 'uppercase', color: (u.dark || u.accent) ? 'rgba(255,255,255,.6)' : LIGHT, display: 'block', marginTop: 4, fontWeight: 400 }}>{u.l}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOCATION CARDS */}
        <div style={{ ...a(.28), width: '100%', marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 24, height: 2, background: ACCENT }} />
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: LIGHT, fontWeight: 500 }}>Locații</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 'clamp(10px,2vw,16px)' }}>
            {/* Reception card — dark */}
            <div style={{ background: DARK, padding: 'clamp(20px,3vw,28px)', position: 'relative', overflow: 'hidden', transition: 'transform .22s ease,box-shadow .22s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 44px rgba(0,0,0,.18)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: ACCENT }} />
              <div style={{ paddingLeft: 12 }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, marginBottom: 8 }}>Recepție Gală</p>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(16px,2.2vw,22px)', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: 4, lineHeight: 1.25 }}>{locationName}</p>
                {weddingDateDisplay && weddingTime && (
                  <div style={{ display: 'inline-block', background: ACCENT, padding: '4px 12px', marginBottom: 14 }}>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: '#fff', fontWeight: 600 }}>{weddingDateDisplay} · ora {weddingTime}</span>
                  </div>
                )}
                {(wazeUrl || googleMapsUrl) && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    {wazeUrl && (<a href={wazeUrl} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, background: 'transparent', border: '1px solid rgba(255,255,255,.2)', color: 'rgba(255,255,255,.7)', transition: 'all .18s' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,.5)'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,.2)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,.7)'; }}>
                      <WazeIcon /> Waze</a>)}
                    {googleMapsUrl && (<a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, background: 'transparent', border: '1px solid rgba(255,255,255,.2)', color: 'rgba(255,255,255,.7)', transition: 'all .18s' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,.5)'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,.2)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,.7)'; }}>
                      <MapsIcon /> Maps</a>)}
                  </div>
                )}
              </div>
            </div>

            {/* Religious card — accent */}
       {isReligiousActive && (
  <div style={{ background: ACCENT, padding: 'clamp(20px,3vw,28px)', position: 'relative', overflow: 'hidden', transition: 'transform .22s ease,box-shadow .22s ease' }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 44px rgba(200,80,58,.3)`; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}>
    <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: '#fff', opacity: .4 }} />
    <div style={{ paddingLeft: 12 }}>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,.75)', fontWeight: 600, marginBottom: 8 }}>Cununia</p>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(16px,2.2vw,22px)', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: 4, lineHeight: 1.25 }}>{religiousLocation}</p>
      {(religiousDateDisplay || religiousTime) && (
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,.2)', padding: '4px 12px', marginBottom: 14 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.9)', fontWeight: 600 }}>
            {religiousDateDisplay && religiousDateDisplay}{religiousTime && ` · ora ${religiousTime}`}
          </span>
        </div>
      )}
      {(religiousWaze || religiousMaps) && (
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {religiousWaze && (
            <a href={religiousWaze} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, background: 'transparent', border: '1px solid rgba(255,255,255,.35)', color: 'rgba(255,255,255,.85)', transition: 'all .18s', flex: 'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,.15)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}>
              <WazeIcon /> Waze
            </a>
          )}
          {religiousMaps && (
            <a href={religiousMaps} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, background: 'transparent', border: '1px solid rgba(255,255,255,.35)', color: 'rgba(255,255,255,.85)', transition: 'all .18s', flex: 'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,.15)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}>
              <MapsIcon /> Maps
            </a>
          )}
        </div>
      )}
    </div>
  </div>
)}
          </div>
        </div>

        {/* OUR STORY */}
        {ourStory && (
          <>
            <div style={{ ...a(.36), width: '100%', height: 1, background: RULE, marginBottom: 28 }} />
            <div style={{ ...a(.38), width: '100%', maxWidth: 540, marginBottom: 32 }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: LIGHT, marginBottom: 12, fontWeight: 500 }}>Povestea Noastră</p>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(15px,1.9vw,19px)', fontStyle: 'italic', fontWeight: 400, color: MID, lineHeight: 1.85 }}>&ldquo;{ourStory}&rdquo;</p>
            </div>
          </>
        )}

        {/* ACCOMMODATION / TRANSPORT INDICATORS */}
        {(isAccommodationActive || isTransportActive) && (
          <div style={{ ...a(.42), display: 'flex', gap: 12, marginBottom: 28 }}>
            {isAccommodationActive && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: '#fff', border: `1px solid ${RULE}` }}>
                <span style={{ fontSize: '1.4rem' }}>🏠</span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: MID, fontWeight: 500 }}>Cazare</span>
              </div>
            )}
            {isTransportActive && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: '#fff', border: `1px solid ${RULE}` }}>
                <span style={{ fontSize: '1.4rem' }}>🚌</span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: MID, fontWeight: 500 }}>Transport</span>
              </div>
            )}
          </div>
        )}

        {/* CONTACT */}
        {(contactPhoneBride || contactPhoneGroom) && (
          <div style={{ ...a(.46), width: '100%', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 24, height: 2, background: ACCENT }} />
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: LIGHT, fontWeight: 500 }}>Contact</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {contactPhoneBride && (
                <div style={{ background: '#fff', padding: 'clamp(16px,2.5vw,22px) clamp(18px,3vw,26px)', borderLeft: `4px solid ${DARK}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, flex: 1, minWidth: 240, boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}>
                  <div>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, marginBottom: 2 }}>Mireasă</p>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(16px,2vw,20px)', fontStyle: 'italic', color: DARK, marginBottom: 2 }}>{brideName}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: MID, letterSpacing: '.06em' }}>{contactPhoneBride}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href={`tel:${contactPhoneBride}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 14px', background: DARK, color: '#fff', fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none', fontWeight: 500 }}><PhoneIcon /> Tel</a>
                    <a href={`https://wa.me/${contactPhoneBride.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 14px', background: '#25D366', color: '#fff', fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none', fontWeight: 500 }}><WaIcon /> WA</a>
                  </div>
                </div>
              )}
              {contactPhoneGroom && (
                <div style={{ background: '#fff', padding: 'clamp(16px,2.5vw,22px) clamp(18px,3vw,26px)', borderLeft: `4px solid ${DARK}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, flex: 1, minWidth: 240, boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}>
                  <div>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, marginBottom: 2 }}>Mire</p>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(16px,2vw,20px)', fontStyle: 'italic', color: DARK, marginBottom: 2 }}>{groomName}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: MID, letterSpacing: '.06em' }}>{contactPhoneGroom}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href={`tel:${contactPhoneGroom}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 14px', background: DARK, color: '#fff', fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none', fontWeight: 500 }}><PhoneIcon /> Tel</a>
                    <a href={`https://wa.me/${contactPhoneGroom.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 14px', background: '#25D366', color: '#fff', fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none', fontWeight: 500 }}><WaIcon /> WA</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MENU */}
        {isMenuActive && menuDetails?.categories && (
          <div style={{ ...a(.50), width: '100%', maxWidth: 400, marginBottom: 16 }}>
            <button onClick={() => setMenuModal(true)} style={{ ...DARK_BTN, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = ACCENT; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = DARK; }}>
              <span>🍽️</span> Meniu Eveniment →
            </button>
          </div>
        )}

        {/* GALLERY */}
        {isGalleryActive && (
          <div style={{ ...a(.54), width: '100%', background: DARK, padding: 'clamp(24px,3.5vw,36px) clamp(20px,3vw,32px)', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 4, height: '100%', background: ACCENT, opacity: .7 }} />
            <div style={{ maxWidth: 420 }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, marginBottom: 10 }}>Upload foto · Live</p>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(18px,2.4vw,26px)', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: 10, lineHeight: 1.2 }}>Împărtășiți momentele cu noi</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(12px,1.4vw,14px)', color: 'rgba(255,255,255,.5)', lineHeight: 1.85, marginBottom: 20, fontWeight: 300 }}>Faceți poze în timpul nunții și încărcați-le direct din telefon.</p>
              <button onClick={() => setGalleryModal(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '11px 24px', background: ACCENT, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 500, transition: 'opacity .18s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '.82'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
                📸 Galerie Foto Live
              </button>
            </div>
          </div>
        )}

        {/* RSVP */}
        <div style={{ ...a(.58), width: '100%', maxWidth: 440, marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: ACCENT }} />
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: LIGHT, fontWeight: 500 }}>Confirmare prezență</p>
          </div>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(13px,1.6vw,16px)', fontStyle: 'italic', color: MID, marginBottom: 16, lineHeight: 1.7 }}>Vă rugăm să confirmați prezența Dvs. până la data evenimentului.</p>
          <button onClick={() => setRsvpModal(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: 'clamp(12px,1.8vw,15px) clamp(22px,3vw,34px)', background: DARK, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(10px,1.2vw,12px)', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', transition: 'background .18s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = ACCENT; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = DARK; }}>
            Confirmă Prezența
            <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}><path d="M2 8h12M9 3l5 5-5 5" /></svg>
          </button>
        </div>

        {/* Footer contacts */}
        <div style={{ ...a(.64), paddingTop: 20, borderTop: `1px solid ${RULE}`, fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: LIGHT, letterSpacing: '.1em', opacity: .7 }}>
          {contactPhoneBride && `${brideName}: ${contactPhoneBride}`}
          {contactPhoneBride && contactPhoneGroom && '  ·  '}
          {contactPhoneGroom && `${groomName}: ${contactPhoneGroom}`}
        </div>
      </div>

      {/* MENU MODAL */}
      {menuModal && (
        <div onClick={() => setMenuModal(false)} style={MODAL_OVERLAY}>
          <div onClick={(e) => e.stopPropagation()} style={{ ...MODAL_BOX, maxWidth: 560 }}>
            <div style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 20, height: 3, background: ACCENT }} />
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600 }}>Meniu</p>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3.5vw,28px)', fontStyle: 'italic', fontWeight: 400, color: DARK }}>Meniul Evenimentului</h2>
            </div>
            {menuDetails.categories.filter((cat: any) => cat.active && cat.items && cat.items.length > 0).map((cat: any, cIdx: number) => (
              <div key={cIdx} style={{ marginBottom: 28, paddingBottom: 24, borderBottom: `1px solid ${RULE}` }}>
                <h4 style={{ color: DARK, fontSize: 'clamp(12px,1.5vw,14px)', margin: '0 0 12px', fontWeight: 500, letterSpacing: '1px', fontFamily: "'DM Sans',sans-serif", textTransform: 'uppercase' }}>
                  <span style={{ marginRight: 8 }}>{cat.emoji}</span>{cat.label}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {cat.items.map((item: any, iIdx: number) => (
                    <div key={iIdx}>
                      <div style={{ color: ACCENT, fontSize: 'clamp(15px,1.8vw,18px)', fontFamily: "'Playfair Display',serif", fontStyle: 'italic' }}>{item.name}</div>
                      {item.description && (<div style={{ fontSize: 'clamp(11px,1.2vw,13px)', color: MID, fontStyle: 'italic', marginTop: 3, fontFamily: "'Playfair Display',serif" }}>{item.description}</div>)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setMenuModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: LIGHT, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 400 }}>Închide</button>
          </div>
        </div>
      )}

      {/* GALLERY MODAL */}
      {galleryModal && (
        <div onClick={() => setGalleryModal(false)} style={MODAL_OVERLAY}>
          <div onClick={(e) => e.stopPropagation()} style={{ ...MODAL_BOX, maxWidth: 400, background: DARK, borderTop: `4px solid ${ACCENT}` }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
              <div style={{ width: 56, height: 56, background: 'rgba(200,80,58,.2)', border: `1px solid rgba(200,80,58,.35)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📸</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 8 }}>
              <div style={{ width: 16, height: 2, background: ACCENT }} />
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600 }}>Upload Foto</p>
              <div style={{ width: 16, height: 2, background: ACCENT }} />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: 10, textAlign: 'center' }}>Galerie Foto Live</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: 'rgba(255,255,255,.5)', marginBottom: 22, lineHeight: 1.85, fontWeight: 300, textAlign: 'center' }}>Împărtășește momentele surprinse cu mirii.<br />Apasă pentru a încărca pozele tale.</p>
            <a href={`/invitatie/minimal/${slug}/upload`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '12px 28px', background: ACCENT, color: '#fff', textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 14, width: '100%', boxSizing: 'border-box' }}>
              📷 Încarcă Pozele
            </a>
            <button onClick={() => setGalleryModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: 'rgba(255,255,255,.35)', letterSpacing: '.14em', textTransform: 'uppercase', display: 'block', width: '100%', textAlign: 'center' }}>Închide</button>
          </div>
        </div>
      )}

      {/* RSVP MODAL */}
      {rsvpModal && (
        <div onClick={() => setRsvpModal(false)} style={MODAL_OVERLAY}>
          <div onClick={(e) => e.stopPropagation()} style={MODAL_BOX}>
            <div style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 20, height: 3, background: ACCENT }} />
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600 }}>Confirmare</p>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3.5vw,28px)', fontStyle: 'italic', fontWeight: 400, color: DARK }}>Confirmă Prezența</h2>
            </div>
            <MinimalRsvpForm orderId={orderId} showAccommodation={isAccommodationActive} showTransport={isTransportActive} />
            <div style={{ textAlign: 'center', marginTop: 14 }}>
              <button onClick={() => setRsvpModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: LIGHT, letterSpacing: '.14em', textTransform: 'uppercase' }}>Închide</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MinimalClient(props: MinimalClientProps) {
  const [phase, setPhase] = useState<Phase>('envelope');

  function openEnvelope() {
    if (phase !== 'envelope') return;
    setPhase('opening');
    setTimeout(() => setPhase('invite'), 1700);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(20px,4vw,40px)', background: `rgba(247,244,240,.97)`, borderBottom: `1px solid #E8E4E0`, backdropFilter: 'blur(12px)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: 'clamp(3px,0.4vw,5px)', height: '100%', background: ACCENT }} />
        <a href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: DARK, textDecoration: 'none', paddingLeft: 'clamp(8px,1.2vw,14px)', transition: 'color .2s' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = ACCENT)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = DARK)}>
          Vibe<span style={{ fontWeight: 300, color: LIGHT }}>Invite</span>
        </a>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontStyle: 'italic', color: LIGHT, letterSpacing: '.03em' }}>
          {phase === 'invite' ? `${props.brideName} & ${props.groomName}` : 'Invitație de Nuntă'}
        </div>
        <div style={{ width: 80 }} />
      </header>
      {phase !== 'invite' && (
        <EnvelopeScreen onOpen={openEnvelope} phase={phase} brideName={props.brideName} groomName={props.groomName} initials={props.initials} weddingDateDisplay={props.weddingDateDisplay} />
      )}
      {phase === 'invite' && <InviteScreen props={props} />}
    </>
  );
}
