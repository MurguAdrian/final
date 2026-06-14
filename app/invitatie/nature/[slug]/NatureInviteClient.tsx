'use client';

import { useState, useEffect } from 'react';
import NatureRsvpForm from './NatureRsvpForm';

type Phase = 'envelope' | 'opening' | 'invite';

export interface NatureInviteClientProps {
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

const FloralSprig = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 310 Q92 255 88 210 Q80 150 90 88 Q94 52 100 18" stroke="#5C8A52" strokeWidth="1.8" strokeOpacity=".48" fill="none" strokeLinecap="round" />
    <path d="M93 218 Q65 196 48 178" stroke="#5C8A52" strokeWidth="1.2" strokeOpacity=".4" fill="none" strokeLinecap="round" />
    <path d="M90 172 Q118 152 135 132" stroke="#5C8A52" strokeWidth="1.2" strokeOpacity=".4" fill="none" strokeLinecap="round" />
    <path d="M91 126 Q63 108 48 86" stroke="#5C8A52" strokeWidth="1.0" strokeOpacity=".35" fill="none" strokeLinecap="round" />
    <path d="M94 80 Q116 64 126 48" stroke="#5C8A52" strokeWidth=".9" strokeOpacity=".32" fill="none" strokeLinecap="round" />
    <ellipse cx="40" cy="174" rx="22" ry="9" fill="#7AB86A" fillOpacity=".4" transform="rotate(-38 40 174)" />
    <ellipse cx="140" cy="126" rx="19" ry="8" fill="#6AAE5A" fillOpacity=".36" transform="rotate(32 140 126)" />
    <ellipse cx="40" cy="80" rx="16" ry="7" fill="#7AB86A" fillOpacity=".32" transform="rotate(-44 40 80)" />
    <ellipse cx="130" cy="46" rx="14" ry="6" fill="#88C47A" fillOpacity=".3" transform="rotate(22 130 46)" />
    <g transform="translate(100 20)">
      {[0, 72, 144, 216, 288].map(r => (<ellipse key={r} cx="0" cy="-14" rx="10" ry="18" fill="white" fillOpacity=".85" transform={`rotate(${r})`} />))}
      <circle cx="0" cy="0" r="7" fill="#F2D98E" fillOpacity=".92" /><circle cx="0" cy="0" r="3.5" fill="#D4A843" fillOpacity=".78" />
    </g>
    <g transform="translate(40 174) scale(.78)">
      {[0, 72, 144, 216, 288].map(r => (<ellipse key={r} cx="0" cy="-12" rx="8" ry="15" fill="white" fillOpacity=".78" transform={`rotate(${r})`} />))}
      <circle cx="0" cy="0" r="5" fill="#F2D98E" fillOpacity=".88" />
    </g>
    <g transform="translate(140 126) scale(.68)">
      {[0, 72, 144, 216, 288].map(r => (<ellipse key={r} cx="0" cy="-11" rx="7" ry="13" fill="white" fillOpacity=".72" transform={`rotate(${r})`} />))}
      <circle cx="0" cy="0" r="4" fill="#F2D98E" fillOpacity=".82" />
    </g>
  </svg>
);

const CornerBotanical = ({ flip = false, flipY = false }: { flip?: boolean; flipY?: boolean }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `scale(${flip ? -1 : 1},${flipY ? -1 : 1})`, width: '100%', height: '100%' }}>
    <path d="M12 12 L12 96" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42" />
    <path d="M12 12 L96 12" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42" />
    <path d="M22 22 L22 78" stroke="#C4963C" strokeWidth=".7" strokeOpacity=".3" />
    <path d="M22 22 L78 22" stroke="#C4963C" strokeWidth=".7" strokeOpacity=".3" />
    <circle cx="12" cy="12" r="3.5" fill="none" stroke="#8A6B2E" strokeWidth="1" strokeOpacity=".38" />
    <circle cx="22" cy="22" r="2" fill="#C4963C" fillOpacity=".26" />
    <path d="M30 30 Q54 70 92 104" stroke="#5C8A52" strokeWidth="1.1" strokeOpacity=".35" fill="none" strokeLinecap="round" />
    <ellipse cx="52" cy="58" rx="14" ry="6" fill="#7AB86A" fillOpacity=".32" transform="rotate(44 52 58)" />
    <ellipse cx="78" cy="84" rx="12" ry="5" fill="#6AAE5A" fillOpacity=".28" transform="rotate(55 78 84)" />
    <g transform="translate(94 106) scale(.62)">
      {[0, 72, 144, 216, 288].map(r => (<ellipse key={r} cx="0" cy="-9" rx="6" ry="11" fill="white" fillOpacity=".7" transform={`rotate(${r})`} />))}
      <circle cx="0" cy="0" r="4" fill="#F0D87C" fillOpacity=".85" />
    </g>
    <g transform="translate(50 28) scale(.48)">
      {[0, 72, 144, 216, 288].map(r => (<ellipse key={r} cx="0" cy="-7" rx="5" ry="9" fill="white" fillOpacity=".6" transform={`rotate(${r})`} />))}
      <circle cx="0" cy="0" r="3" fill="#F0D87C" fillOpacity=".78" />
    </g>
  </svg>
);

function NatureDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360 }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(154,123,63,.4), transparent)' }} />
      <svg viewBox="0 0 40 20" width="40" height="20">
        <ellipse cx="20" cy="10" rx="6" ry="10" fill="#4A6741" fillOpacity=".32" />
        <ellipse cx="20" cy="10" rx="3" ry="6" fill="#4A6741" fillOpacity=".48" />
        <line x1="0" y1="10" x2="11" y2="10" stroke="#9A7B3F" strokeWidth=".8" strokeOpacity=".48" />
        <line x1="29" y1="10" x2="40" y2="10" stroke="#9A7B3F" strokeWidth=".8" strokeOpacity=".48" />
      </svg>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(154,123,63,.4), transparent)' }} />
    </div>
  );
}

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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
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
  background: 'rgba(18,26,16,.55)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  animation: 'fadeIn .28s ease',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
};

const MODAL_BOX: React.CSSProperties = {
  background: 'linear-gradient(165deg,#FEFCF7,#F5F0E2)',
  borderRadius: 26,
  padding: 'clamp(24px,4vw,38px) clamp(18px,4vw,32px)',
  maxWidth: 480,
  width: '100%',
  border: '1px solid rgba(154,123,63,.2)',
  boxShadow: '0 40px 100px rgba(0,0,0,.3)',
  animation: 'slideUp .32s cubic-bezier(.4,0,.2,1)',
  maxHeight: '90dvh',
  overflowY: 'auto',
  position: 'relative',
  overscrollBehavior: 'contain',
};

const GREEN_BTN: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: 'clamp(14px,1.8vw,18px) 0',
  borderRadius: 100,
  background: 'linear-gradient(135deg,#3A5E33 0%,#274422 100%)',
  color: '#fff',
  textAlign: 'center',
  fontFamily: "'Cinzel',serif",
  fontSize: 'clamp(11px,1.3vw,13px)',
  fontWeight: 600,
  letterSpacing: '.2em',
  textTransform: 'uppercase' as const,
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 10px 32px rgba(58,94,51,.4)',
  transition: 'transform .22s,box-shadow .22s',
  position: 'relative',
  overflow: 'hidden',
};

const NAV_BTN: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  padding: '9px 14px',
  borderRadius: 11,
  fontFamily: "'Lato',sans-serif",
  fontSize: 11,
  fontWeight: 700,
  cursor: 'pointer',
  flex: 1,
  whiteSpace: 'nowrap' as const,
  border: 'none',
  textDecoration: 'none',
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{
    height:100%;
    min-height:100dvh;
    overflow:hidden;
    overscroll-behavior:none;
    -webkit-font-smoothing:antialiased;
  }
  body{
    font-family:'Lato',sans-serif;
    background:#FDFAF2;
    color:#2E3828;
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
  @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  @keyframes envFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-11px)}}
  @keyframes nat-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes nat-pulse{0%,100%{opacity:.42}50%{opacity:.88}}
  @keyframes shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideUp{from{opacity:0;transform:scale(.92) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
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
    <div style={{ position: 'fixed', inset: 0, top: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', overscrollBehavior: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 18% 22%, rgba(140,190,130,.13) 0%, transparent 55%), radial-gradient(ellipse 60% 55% at 82% 78%, rgba(225,205,148,.16) 0%, transparent 55%), linear-gradient(155deg, #FDFAF2 0%, #F3EED8 45%, #EDF5E8 100%)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: 'min(180px,22vw)', height: 'min(180px,22vw)', opacity: .82, pointerEvents: 'none' }}><CornerBotanical /></div>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 'min(180px,22vw)', height: 'min(180px,22vw)', opacity: .82, pointerEvents: 'none' }}><CornerBotanical flip /></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 'min(180px,22vw)', height: 'min(180px,22vw)', opacity: .75, pointerEvents: 'none' }}><CornerBotanical flipY /></div>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 'min(180px,22vw)', height: 'min(180px,22vw)', opacity: .75, pointerEvents: 'none' }}><CornerBotanical flip flipY /></div>
      <div style={{ position: 'absolute', left: 0, top: '10%', width: 'min(18vw,220px)', opacity: .85, pointerEvents: 'none' }}><FloralSprig /></div>
      <div style={{ position: 'absolute', right: 0, top: '10%', width: 'min(18vw,220px)', opacity: .85, pointerEvents: 'none', transform: 'scaleX(-1)' }}><FloralSprig /></div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '20px 24px' }}>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(9px,1.1vw,11px)', letterSpacing: '.28em', textTransform: 'uppercase', color: '#9A7B3F', opacity: .82, animation: 'fadeUp .7s ease both' }}>
          Invitație de Nuntă
        </p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 400, fontStyle: 'italic', color: '#1C2218', textAlign: 'center', lineHeight: 1.15, animation: 'fadeUp .8s ease both .08s', margin: 0 }}>
          <strong style={{ fontWeight: 700, fontStyle: 'normal', color: '#3A5E33' }}>{brideName}</strong>
          {' '}<span style={{ color: '#C9A84C', fontWeight: 300 }}>&amp;</span>{' '}
          <strong style={{ fontWeight: 700, fontStyle: 'normal', color: '#3A5E33' }}>{groomName}</strong>
        </h1>

        <div onClick={onOpen} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onOpen()}
          style={{ position: 'relative', width: 'clamp(280px,42vw,500px)', cursor: 'pointer', userSelect: 'none', animation: 'envFloat 5s ease-in-out infinite, fadeUp .85s ease both .15s', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.12))' }}>

          <div style={{ position: 'absolute', bottom: -16, left: '8%', right: '8%', height: 20, background: 'radial-gradient(ellipse, rgba(36,56,28,.18) 0%, transparent 70%)', filter: 'blur(10px)', zIndex: 0 }} />

          {/* LETTER */}
          <div style={{
            position: 'absolute', left: '10%', right: '10%', bottom: '5%', height: '58%',
            zIndex: phase === 'opening' ? 30 : 2,
            background: 'linear-gradient(165deg, #FEFDF8 0%, #F7F2E4 100%)',
            border: '1px solid rgba(154,123,63,.3)', borderRadius: 6,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
            boxShadow: phase === 'opening' ? '0 32px 80px rgba(0,0,0,.28), 0 8px 24px rgba(0,0,0,.14)' : '0 2px 8px rgba(0,0,0,.05)',
            transform: phase === 'opening' ? 'translateY(-140%) scale(1.05) rotate(-0.8deg)' : 'translateY(0%)',
            transition: 'transform 1.4s cubic-bezier(.22,.1,.2,1) .25s, box-shadow 1.4s ease .25s',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, opacity: .035, backgroundImage: 'repeating-linear-gradient(0deg, #5C8A52 0, #5C8A52 1px, transparent 1px, transparent 26px)' }} />
            <div style={{ textAlign: 'center', padding: '0 16px', position: 'relative', zIndex: 1 }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(15px,2.6vw,26px)', fontStyle: 'italic', fontWeight: 400, color: '#3A5E33', lineHeight: 1.25 }}>{brideName} &amp; {groomName}</p>
              <div style={{ width: 36, height: 1, background: 'rgba(154,123,63,.42)', margin: '10px auto' }} />
              {weddingDateDisplay && (<p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(7px,.9vw,9.5px)', letterSpacing: '.2em', textTransform: 'uppercase', color: '#9A7B3F', fontWeight: 400 }}>{weddingDateDisplay}</p>)}
            </div>
          </div>

          {/* ENVELOPE BODY */}
          <div style={{ width: '100%', paddingTop: '60%', position: 'relative', zIndex: 5 }}>
            <div style={{ position: 'absolute', inset: 0, background: '#F0E8D0', borderRadius: 8, border: '1.5px solid rgba(154,123,63,.35)', boxShadow: '0 4px 20px rgba(0,0,0,.1)', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%', background: '#E5DCC4', clipPath: 'polygon(0 0,0 100%,100% 100%)' }} />
              <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '50%', background: '#E5DCC4', clipPath: 'polygon(100% 0,0 100%,100% 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: '#D8E5D0', clipPath: 'polygon(0 100%,50% 0,100% 100%)' }} />
            </div>
            {/* WAX SEAL */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-52%)', width: 'clamp(50px,8vw,76px)', height: 'clamp(50px,8vw,76px)', background: 'radial-gradient(circle, #F5FBF2 0%, #C8E8C0 100%)', borderRadius: '50%', border: '2px solid rgba(154,123,63,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 5px rgba(154,123,63,.1), 0 6px 20px rgba(0,0,0,.18)', zIndex: 10, opacity: phase === 'opening' ? 0 : 1, transition: 'opacity .25s ease' }}>
              <div style={{ position: 'absolute', inset: -7, border: '1px dashed rgba(154,123,63,.38)', borderRadius: '50%', animation: 'nat-spin 22s linear infinite' }} />
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(13px,2.2vw,20px)', fontStyle: 'italic', color: '#3A5E33', position: 'relative', zIndex: 1 }}>{initials}</span>
            </div>
            {/* FLAP */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 8, height: '52%', background: 'linear-gradient(155deg, #E8F0E4 0%, #DCE8D6 100%)', clipPath: 'polygon(0 0,100% 0,50% 100%)', transformOrigin: 'top center', transform: phase === 'opening' ? 'perspective(700px) rotateX(190deg)' : 'perspective(700px) rotateX(0deg)', transition: 'transform 1s cubic-bezier(.4,0,.2,1)', borderBottom: '1.5px solid rgba(154,123,63,.3)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(155deg,rgba(154,123,63,.05) 0%,transparent 55%)' }} />
            </div>
          </div>
        </div>

        <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(9px,1.1vw,11px)', letterSpacing: '.22em', textTransform: 'uppercase', color: '#9A7B3F', animation: phase === 'opening' ? 'none' : 'fadeUp 1s ease both .4s, nat-pulse 2.8s ease-in-out infinite 1.4s', opacity: phase === 'opening' ? .9 : undefined }}>
          {phase === 'opening' ? '✦  Se extrage invitația...' : 'Atinge pentru a deschide'}
        </p>
      </div>
    </div>
  );
}

function InviteScreen({ props }: { props: NatureInviteClientProps }) {
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
  useEffect(() => { setFlipS(true); const t = setTimeout(() => setFlipS(false), 155); return () => clearTimeout(t); }, [cd.s]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuModal(false); setGalleryModal(false); setRsvpModal(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const a = (d: number): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s ease ${d}s, transform .7s ease ${d}s`,
  });

  const cardHover = {
    onMouseEnter: (e: React.MouseEvent) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 18px 48px rgba(26,38,20,.13)'; },
    onMouseLeave: (e: React.MouseEvent) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.boxShadow = '0 6px 28px rgba(26,38,20,.07)'; },
  };

  return (
    <div style={{ position: 'fixed', inset: 0, top: 56, overflowY: 'auto', overflowX: 'hidden', overscrollBehavior: 'contain' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 16% 18%, rgba(140,190,130,.11) 0%, transparent 55%), radial-gradient(ellipse 58% 50% at 84% 82%, rgba(225,205,148,.14) 0%, transparent 55%), linear-gradient(155deg, #FDFAF2 0%, #F3EED8 45%, #EDF5E8 100%)', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: 0, left: 0, width: 'min(160px,20vw)', height: 'min(160px,20vw)', opacity: .78, pointerEvents: 'none', zIndex: 1 }}><CornerBotanical /></div>
      <div style={{ position: 'fixed', top: 0, right: 0, width: 'min(160px,20vw)', height: 'min(160px,20vw)', opacity: .78, pointerEvents: 'none', zIndex: 1 }}><CornerBotanical flip /></div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: 'min(140px,18vw)', height: 'min(140px,18vw)', opacity: .7, pointerEvents: 'none', zIndex: 1 }}><CornerBotanical flipY /></div>
      <div style={{ position: 'fixed', bottom: 0, right: 0, width: 'min(140px,18vw)', height: 'min(140px,18vw)', opacity: .7, pointerEvents: 'none', zIndex: 1 }}><CornerBotanical flip flipY /></div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto', padding: 'clamp(36px,6vw,48px) clamp(16px,4vw,24px) 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

        {/* Top botanical */}
        <div style={{ ...a(0), marginBottom: 16, width: 'clamp(160px,28vw,240px)' }}>
          <svg viewBox="0 0 300 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
            <path d="M150 80 Q108 52 92 26 Q84 8 104 4 Q122 0 136 18 Q144 30 150 55 Q156 30 164 18 Q178 0 196 4 Q216 8 208 26 Q192 52 150 80Z" fill="#5C8A52" fillOpacity=".26" />
            <path d="M150 80 L150 18" stroke="#5C8A52" strokeWidth=".9" strokeOpacity=".32" />
            <g transform="translate(150 14)">{[0, 72, 144, 216, 288].map(r => <ellipse key={r} cx="0" cy="-10" rx="7" ry="13" fill="white" fillOpacity=".72" transform={`rotate(${r})`} />)}<circle cx="0" cy="0" r="4.5" fill="#F0D87C" fillOpacity=".88" /></g>
            <g transform="translate(100 18) scale(.6)">{[0, 72, 144, 216, 288].map(r => <ellipse key={r} cx="0" cy="-8" rx="6" ry="10" fill="white" fillOpacity=".62" transform={`rotate(${r})`} />)}<circle cx="0" cy="0" r="3" fill="#F0D87C" fillOpacity=".78" /></g>
            <g transform="translate(200 18) scale(.6)">{[0, 72, 144, 216, 288].map(r => <ellipse key={r} cx="0" cy="-8" rx="6" ry="10" fill="white" fillOpacity=".62" transform={`rotate(${r})`} />)}<circle cx="0" cy="0" r="3" fill="#F0D87C" fillOpacity=".78" /></g>
          </svg>
        </div>

        <p style={{ ...a(.06), fontFamily: "'Cinzel',serif", fontSize: 'clamp(9px,1.1vw,11px)', letterSpacing: '.28em', textTransform: 'uppercase', color: '#9A7B3F', opacity: vis ? .82 : 0, marginBottom: 10 }}>Cu Dragoste Vă Invităm</p>

        {/* NAMES */}
        <div style={{ ...a(.12), textAlign: 'center', marginBottom: 4 }}>
          <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(54px,9.5vw,104px)', fontWeight: 500, fontStyle: 'italic', color: '#3A5E33', lineHeight: .95, textShadow: '0 4px 28px rgba(60,90,50,.14)', letterSpacing: '-.01em' }}>{brideName}</span>
          <span style={{ display: 'block', fontFamily: "'Cormorant',serif", fontSize: 'clamp(24px,3.8vw,40px)', fontStyle: 'italic', fontWeight: 300, color: '#C9A84C', margin: '4px 0', lineHeight: 1.2 }}>&amp;</span>
          <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(54px,9.5vw,104px)', fontWeight: 500, fontStyle: 'italic', color: '#3A5E33', lineHeight: .95, textShadow: '0 4px 28px rgba(60,90,50,.14)', letterSpacing: '-.01em' }}>{groomName}</span>
        </div>

        <div style={{ ...a(.18), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '20px auto' }}><NatureDivider /></div>

        {(weddingDateDisplay || locationName) && (
          <div style={{ ...a(.22), textAlign: 'center', marginBottom: 18 }}>
            {weddingDateDisplay && (<p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(12px,1.7vw,16px)', letterSpacing: '.16em', color: '#1C2218', fontWeight: 500, marginBottom: 5, textTransform: 'capitalize' }}>{weddingDateDisplay}</p>)}
            {locationName && (<p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.9vw,19px)', fontStyle: 'italic', color: '#6B7A5E', letterSpacing: '.04em' }}>{locationName}</p>)}
          </div>
        )}

        {nasiNames && (
          <div style={{ ...a(.3), textAlign: 'center', marginBottom: 0, padding: '18px 28px', border: '1px solid rgba(154,123,63,.18)', borderRadius: 18, background: 'rgba(255,255,255,.5)', backdropFilter: 'blur(10px)', maxWidth: 340, width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,.04)' }}>
            <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(13px,1.5vw,15px)', fontStyle: 'italic', color: '#6B7A5E', marginBottom: 8, letterSpacing: '.04em' }}>Alături de nașii noștri</p>
            <div style={{ width: 36, height: 1, background: 'rgba(201,168,76,.5)', margin: '0 auto 10px' }} />
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(18px,2.3vw,23px)', fontStyle: 'italic', fontWeight: 400, color: '#1C2218', letterSpacing: '.01em' }}>{nasiNames}</p>
          </div>
        )}

        {parentsNames && (
          <div style={{ ...a(.32), textAlign: 'center', marginTop: 14, marginBottom: 4 }}>
            <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(12px,1.4vw,14px)', fontStyle: 'italic', color: 'rgba(107,122,94,.7)', letterSpacing: '.04em' }}>Împreună cu părinții</p>
            <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.6vw,17px)', fontStyle: 'italic', fontWeight: 400, color: '#6B7A5E' }}>{parentsNames}</p>
          </div>
        )}

        <div style={{ ...a(.36), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '20px auto' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(154,123,63,.38), transparent)' }} /><span style={{ color: '#C9A84C', fontSize: 11, opacity: .68 }}>✦</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(154,123,63,.38), transparent)' }} />
        </div>

        {/* GALLERY UPLOAD */}
        {isGalleryActive && (
          <div style={{ ...a(.38), width: '100%', maxWidth: 620, background: 'linear-gradient(160deg, rgba(58,94,51,.08) 0%, rgba(201,168,76,.06) 100%)', border: '2px dashed rgba(154,123,63,.3)', borderRadius: 24, padding: 'clamp(20px,3vw,30px) clamp(16px,3vw,26px)', textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: 0 }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: .03, pointerEvents: 'none' }}>
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 160, height: 160 }}>
                <rect x="4" y="14" width="40" height="28" rx="4" stroke="#3A5E33" strokeWidth="1.8" />
                <path d="M14 14 L17 8 L31 8 L34 14" stroke="#3A5E33" strokeWidth="1.8" strokeLinejoin="round" />
                <circle cx="24" cy="28" r="8" stroke="#3A5E33" strokeWidth="1.5" />
                <circle cx="24" cy="28" r="4" fill="#3A5E33" />
                <circle cx="37" cy="20" r="2" fill="#3A5E33" />
              </svg>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(58,94,51,.1)', border: '2px solid rgba(58,94,51,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 38, height: 38 }}>
                    <rect x="4" y="14" width="40" height="28" rx="4" stroke="#3A5E33" strokeWidth="1.8" strokeOpacity=".7" />
                    <path d="M14 14 L17 8 L31 8 L34 14" stroke="#3A5E33" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round" />
                    <circle cx="24" cy="28" r="8" stroke="#3A5E33" strokeWidth="1.5" strokeOpacity=".7" />
                    <circle cx="24" cy="28" r="4" fill="#3A5E33" fillOpacity=".3" />
                    <circle cx="37" cy="20" r="2" fill="#3A5E33" fillOpacity=".5" />
                    <circle cx="10" cy="20" r="1.2" fill="#9A7B3F" fillOpacity=".6" />
                  </svg>
                </div>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(18px,2.6vw,26px)', fontStyle: 'italic', fontWeight: 400, color: '#1C2218', marginBottom: 8, lineHeight: 1.2 }}>Împărtășiți momentele cu noi! 📸</h3>
              <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.6vw,16px)', fontStyle: 'italic', color: '#6B7A5E', lineHeight: 1.8, marginBottom: 18, maxWidth: 440, margin: '0 auto 18px' }}>
                Faceți poze în timpul nunții și încărcați-le direct din telefon. Mirii vor accesa toate imaginile voastre într-un singur album privat.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center', marginBottom: 20 }}>
                {['📷 Poze din toate unghiurile', '🌿 Album privat al mirilor', '✨ Fără limită de fișiere', '🔒 Acces securizat'].map(tag => (
                  <span key={tag} style={{ fontFamily: "'Lato',sans-serif", fontSize: 'clamp(10px,1.1vw,12px)', color: '#3A5E33', background: 'rgba(255,255,255,.7)', border: '1px solid rgba(58,94,51,.18)', borderRadius: 100, padding: '4px 12px' }}>{tag}</span>
                ))}
              </div>
              <button onClick={() => setGalleryModal(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 30px', borderRadius: 100, background: 'linear-gradient(135deg,#3A5E33 0%,#274422 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: "'Cinzel',serif", fontSize: 'clamp(10px,1.2vw,12px)', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', boxShadow: '0 8px 28px rgba(58,94,51,.32)', transition: 'transform .2s,box-shadow .2s', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 14px 40px rgba(58,94,51,.45)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(58,94,51,.32)'; }}>
                📸 Galerie Foto Live
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent)', backgroundSize: '350px 100%', animation: 'shimmer 3s linear infinite' }} />
              </button>
              <p style={{ fontFamily: "'Cormorant',serif", fontSize: 12, fontStyle: 'italic', color: 'rgba(107,122,94,.6)', marginTop: 10 }}>funcție disponibilă în ziua nunții și 72h după eveniment</p>
            </div>
          </div>
        )}

        <div style={{ ...a(.42), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '20px auto' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(154,123,63,.38), transparent)' }} />
          <div style={{ width: 8, height: 8, background: '#C9A84C', transform: 'rotate(45deg)', boxShadow: '0 0 0 3px rgba(154,123,63,.15)' }} />
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(154,123,63,.38), transparent)' }} />
        </div>

        {/* COUNTDOWN */}
        {weddingDate && (
          <div style={{ ...a(.44), width: '100%', maxWidth: 440, background: 'rgba(255,255,255,.52)', border: '1px solid rgba(154,123,63,.15)', borderRadius: 22, padding: '22px 18px', backdropFilter: 'blur(12px)', textAlign: 'center', boxShadow: '0 6px 28px rgba(0,0,0,.05)' }}>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(7px,.95vw,9.5px)', letterSpacing: '.26em', textTransform: 'uppercase', color: '#9A7B3F', marginBottom: 14, opacity: .78 }}>Timp Rămas Până La Marele Eveniment</p>
            <div style={{ display: 'flex', gap: 0, justifyContent: 'center' }}>
              {[{ n: pad(cd.d), l: 'Zile' }, { n: pad(cd.h), l: 'Ore' }, { n: pad(cd.m), l: 'Minute' }, { n: pad(cd.s), l: 'Secunde', flip: flipS }].map(u => (
                <div key={u.l} style={{ flex: 1, maxWidth: 104, textAlign: 'center', padding: '0 4px', borderRight: '1px solid rgba(154,123,63,.18)' }}>
                  <span style={{ display: 'block', fontFamily: "'Cormorant',serif", fontSize: 'clamp(36px,5.8vw,58px)', fontWeight: 300, lineHeight: 1, transition: 'transform .15s ease, color .15s ease', transform: (u as any).flip ? 'scale(1.1) translateY(-3px)' : 'scale(1)', color: (u as any).flip ? '#3A5E33' : '#1C2218' }}>{u.n}</span>
                  <span style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(6px,.85vw,8.5px)', letterSpacing: '.14em', textTransform: 'uppercase', color: '#6B7A5E', display: 'block', marginTop: 3 }}>{u.l}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ ...a(.50), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '20px auto' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(154,123,63,.38), transparent)' }} />
          <div style={{ width: 8, height: 8, background: '#C9A84C', transform: 'rotate(45deg)', boxShadow: '0 0 0 3px rgba(154,123,63,.15)' }} />
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(154,123,63,.38), transparent)' }} />
        </div>

        {/* LOCATION CARDS */}
        <div style={{ ...a(.54), width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 'clamp(12px,2vw,22px)', maxWidth: 640 }}>
          <div style={{ borderRadius: 18, overflow: 'hidden', border: '1.5px solid rgba(154,123,63,.2)', background: 'rgba(255,255,255,.72)', backdropFilter: 'blur(10px)', boxShadow: '0 6px 28px rgba(26,38,20,.07)', transition: 'transform .24s ease,box-shadow .24s ease' }} {...cardHover}>
            <div style={{ padding: '16px 18px 12px', background: 'linear-gradient(135deg,#3A5E33 0%,#274422 100%)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                  <path d="M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3c0-2 3-6 3-6s3 4 3 6z" /><path d="M6 12V3" /><path d="M19 14c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.5 2-4 2-4s2 2.5 2 4z" /><path d="M17 10V6" /><path d="M12 8l2-2M12 8l-2-2M12 8v4" /><circle cx="12" cy="14" r=".8" fill="white" stroke="none" />
                </svg>
              </div>
              <div>
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: 8.5, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.68)', display: 'block', marginBottom: 2 }}>Recepție &amp; Petrecere</span>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(14px,1.7vw,17px)', fontStyle: 'italic', fontWeight: 400, color: '#fff', lineHeight: 1.2 }}>Banchetul</p>
              </div>
            </div>
            <div style={{ padding: '14px 18px 16px' }}>
              <p style={{ fontFamily: "'Lato',sans-serif", fontWeight: 700, fontSize: 'clamp(11px,1.2vw,13px)', color: '#1C2218', marginBottom: 3, letterSpacing: '.02em' }}>{locationName}</p>
              {weddingDateDisplay && weddingTime && (<div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#EBF4E7', border: '1px solid rgba(74,103,65,.18)', borderRadius: 100, padding: '4px 11px', fontFamily: "'Cinzel',serif", fontSize: 8.5, letterSpacing: '.13em', textTransform: 'uppercase', color: '#3A5E33', marginBottom: 12 }}>⏰ {weddingDateDisplay} · ora {weddingTime}</div>)}
              {(wazeUrl || googleMapsUrl) && (
                <div style={{ display: 'flex', gap: 8 }}>
                  {wazeUrl && (<a href={wazeUrl} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, background: 'linear-gradient(135deg,#08A2D4,#0788B0)', color: '#fff' }}><WazeIcon /> Waze</a>)}
                  {googleMapsUrl && (<a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{ ...NAV_BTN, background: 'linear-gradient(135deg,#4CAF4F,#388E3C)', color: '#fff' }}><MapsIcon /> Maps</a>)}
                </div>
              )}
            </div>
          </div>

          {isReligiousActive && (
            <div style={{ borderRadius: 18, overflow: 'hidden', border: '1.5px solid rgba(154,123,63,.2)', background: 'rgba(255,255,255,.72)', backdropFilter: 'blur(10px)', boxShadow: '0 6px 28px rgba(26,38,20,.07)', transition: 'transform .24s ease,box-shadow .24s ease' }} {...cardHover}>
              <div style={{ padding: '16px 18px 12px', background: 'linear-gradient(135deg,#6B4E1A 0%,#503A10 100%)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                    <path d="M12 2L12 6M10 4h4" /><rect x="4" y="9" width="16" height="12" rx="1" /><path d="M9 21V14a3 3 0 0 1 6 0v7" /><path d="M4 9l8-4 8 4" />
                  </svg>
                </div>
                <div>
                  <span style={{ fontFamily: "'Cinzel',serif", fontSize: 8.5, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.68)', display: 'block', marginBottom: 2 }}>Ceremonia Religioasă</span>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(14px,1.7vw,17px)', fontStyle: 'italic', fontWeight: 400, color: '#fff', lineHeight: 1.2 }}>Cununia</p>
                </div>
              </div>
              <div style={{ padding: '14px 18px 16px' }}>
                <p style={{ fontFamily: "'Lato',sans-serif", fontWeight: 700, fontSize: 'clamp(11px,1.2vw,13px)', color: '#1C2218', marginBottom: 3, letterSpacing: '.02em' }}>{religiousLocation}</p>
                {(religiousDateDisplay || religiousTime) && (<div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#EBF4E7', border: '1px solid rgba(74,103,65,.18)', borderRadius: 100, padding: '4px 11px', fontFamily: "'Cinzel',serif", fontSize: 8.5, letterSpacing: '.13em', textTransform: 'uppercase', color: '#3A5E33', marginBottom: 12 }}>⏰ {religiousDateDisplay && religiousDateDisplay}{religiousTime && ` · ora ${religiousTime}`}</div>)}
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

        {/* MENU */}
        {isMenuActive && menuDetails?.categories && (
          <div style={{ ...a(.56), width: '100%', maxWidth: 400, marginTop: 'clamp(12px,2vw,20px)' }}>
            <button onClick={() => setMenuModal(true)} style={{ ...GREEN_BTN, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 18px 42px rgba(58,94,51,.55)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 32px rgba(58,94,51,.4)'; }}>
              <span>🍽️</span> ✦ Meniu Eveniment ✦
            </button>
          </div>
        )}

        {ourStory && (
          <>
            <div style={{ ...a(.57), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '20px auto' }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(154,123,63,.38), transparent)' }} /><span style={{ color: '#C9A84C', fontSize: 11, opacity: .68 }}>✦</span>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(154,123,63,.38), transparent)' }} />
            </div>
            <div style={{ ...a(.58), width: '100%', maxWidth: 560, textAlign: 'center', padding: '10px 0' }}>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(107,122,94,.7)', marginBottom: 16 }}>Povestea Noastră</p>
              <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(16px,2vw,20px)', fontStyle: 'italic', fontWeight: 300, color: '#6B7A5E', lineHeight: 1.85, letterSpacing: '.02em' }}>&ldquo;{ourStory}&rdquo;</p>
            </div>
          </>
        )}

        {(isAccommodationActive || isTransportActive) && (
          <div style={{ ...a(.59), display: 'flex', gap: 16, justifyContent: 'center', padding: '16px 0', marginTop: 8 }}>
            {isAccommodationActive && (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '16px 20px', background: 'rgba(255,255,255,.5)', border: '1px solid rgba(154,123,63,.18)', borderRadius: 14 }}><span style={{ fontSize: '2rem' }}>🏠</span><span style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(107,122,94,.7)' }}>Cazare</span></div>)}
            {isTransportActive && (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '16px 20px', background: 'rgba(255,255,255,.5)', border: '1px solid rgba(154,123,63,.18)', borderRadius: 14 }}><span style={{ fontSize: '2rem' }}>🚌</span><span style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(107,122,94,.7)' }}>Transport</span></div>)}
          </div>
        )}

        {/* CONTACT */}
        {(contactPhoneBride || contactPhoneGroom) && (
          <div style={{ ...a(.60), width: '100%', maxWidth: 640, background: 'rgba(255,255,255,.6)', border: '1px solid rgba(154,123,63,.18)', borderRadius: 18, padding: '16px 20px', backdropFilter: 'blur(8px)', boxShadow: '0 4px 20px rgba(26,38,20,.05)', marginTop: 'clamp(12px,2vw,20px)' }}>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#9A7B3F', marginBottom: 12, opacity: .82 }}>Contact</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
              {contactPhoneBride && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(15px,1.8vw,18px)', fontStyle: 'italic', color: '#1C2218', marginBottom: 2 }}>{brideName}</p>
                    <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(11px,1.3vw,13px)', color: '#3A5E33', letterSpacing: '.06em', fontWeight: 600 }}>{contactPhoneBride}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href={`tel:${contactPhoneBride}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 100, background: 'linear-gradient(135deg,#3A5E33,#274422)', color: '#fff', fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', boxShadow: '0 4px 14px rgba(58,94,51,.28)', textDecoration: 'none' }}><PhoneIcon /> Telefon</a>
                    <a href={`https://wa.me/${contactPhoneBride.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 100, background: 'linear-gradient(135deg,#25D366,#1DA851)', color: '#fff', fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', boxShadow: '0 4px 14px rgba(37,211,102,.28)', textDecoration: 'none' }}><WaIcon /> WhatsApp</a>
                  </div>
                </div>
              )}
              {contactPhoneGroom && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(15px,1.8vw,18px)', fontStyle: 'italic', color: '#1C2218', marginBottom: 2 }}>{groomName}</p>
                    <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(11px,1.3vw,13px)', color: '#3A5E33', letterSpacing: '.06em', fontWeight: 600 }}>{contactPhoneGroom}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href={`tel:${contactPhoneGroom}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 100, background: 'linear-gradient(135deg,#3A5E33,#274422)', color: '#fff', fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', boxShadow: '0 4px 14px rgba(58,94,51,.28)', textDecoration: 'none' }}><PhoneIcon /> Telefon</a>
                    <a href={`https://wa.me/${contactPhoneGroom.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 100, background: 'linear-gradient(135deg,#25D366,#1DA851)', color: '#fff', fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', boxShadow: '0 4px 14px rgba(37,211,102,.28)', textDecoration: 'none' }}><WaIcon /> WhatsApp</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ ...a(.62), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '20px auto' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(154,123,63,.38),transparent)' }} />
          <div style={{ width: 8, height: 8, background: '#C9A84C', transform: 'rotate(45deg)', boxShadow: '0 0 0 3px rgba(154,123,63,.15)' }} />
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(154,123,63,.38),transparent)' }} />
        </div>

        {/* RSVP */}
        <div style={{ ...a(.66), textAlign: 'center', width: '100%', maxWidth: 380 }}>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.7vw,17px)', fontStyle: 'italic', color: '#6B7A5E', marginBottom: 14, lineHeight: 1.6, letterSpacing: '.03em' }}>
            Vă rugăm să ne anunțați prezența până la data evenimentului.
          </p>
          <button onClick={() => setRsvpModal(true)} style={{ ...GREEN_BTN }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 18px 42px rgba(58,94,51,.55)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 32px rgba(58,94,51,.4)'; }}>
            <span style={{ position: 'relative', zIndex: 1 }}>Confirmă Prezența ✦</span>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent)', backgroundSize: '350px 100%', animation: 'shimmer 3s linear infinite' }} />
          </button>
        </div>

        <div style={{ ...a(.72), marginTop: 32, textAlign: 'center', opacity: .35, fontSize: 11, fontFamily: "'Cinzel',serif", letterSpacing: '.1em', color: '#6B7A5E' }}>
          {contactPhoneBride && `${brideName}: ${contactPhoneBride}`}
          {contactPhoneBride && contactPhoneGroom && '  ·  '}
          {contactPhoneGroom && `${groomName}: ${contactPhoneGroom}`}
        </div>
      </div>

      {/* MENU MODAL */}
      {menuModal && (
        <div onClick={() => setMenuModal(false)} style={MODAL_OVERLAY}>
          <div onClick={e => e.stopPropagation()} style={{ ...MODAL_BOX, maxWidth: 560 }}>
            <div style={{ textAlign: 'center', marginBottom: 22 }}>
              <span style={{ fontSize: 40, display: 'block', marginBottom: 10 }}>🌿</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3.5vw,30px)', fontStyle: 'italic', fontWeight: 400, color: '#3A5E33', marginBottom: 8 }}>Meniul Evenimentului</h2>
              <div style={{ width: 36, height: 1, background: 'linear-gradient(90deg,transparent,rgba(154,123,63,.5),transparent)', margin: '0 auto' }} />
            </div>
            {menuDetails.categories.filter((cat: any) => cat.active && cat.items && cat.items.length > 0).map((cat: any, cIdx: number) => (
              <div key={cIdx} style={{ marginBottom: 28 }}>
                <div style={{ borderBottom: '1px solid rgba(154,123,63,.2)', paddingBottom: 8, marginBottom: 14 }}>
                  <h4 style={{ color: '#1C2218', fontSize: 'clamp(13px,1.6vw,16px)', margin: 0, fontWeight: 600, letterSpacing: '1px', fontFamily: "'Cinzel',serif" }}><span style={{ marginRight: 8 }}>{cat.emoji}</span>{cat.label}</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {cat.items.map((item: any, iIdx: number) => (
                    <div key={iIdx}>
                      <div style={{ color: '#3A5E33', fontSize: 'clamp(14px,1.8vw,18px)', fontFamily: "'Playfair Display',serif", fontStyle: 'italic' }}>{item.name}</div>
                      {item.description && (<div style={{ fontSize: 'clamp(11px,1.2vw,13px)', color: '#6B7A5E', fontStyle: 'italic', marginTop: 3, fontFamily: "'Cormorant',serif" }}>{item.description}</div>)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <button onClick={() => setMenuModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant',serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(107,122,94,.55)', textDecoration: 'underline' }}>Închide</button>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY MODAL */}
      {galleryModal && (
        <div onClick={() => setGalleryModal(false)} style={MODAL_OVERLAY}>
          <div onClick={e => e.stopPropagation()} style={{ ...MODAL_BOX, maxWidth: 400, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(58,94,51,.1)', border: '2px solid rgba(58,94,51,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📸</div>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontStyle: 'italic', fontWeight: 400, color: '#3A5E33', marginBottom: 10 }}>Galerie Foto Live</h2>
            <div style={{ width: 36, height: 1, background: 'rgba(154,123,63,.42)', margin: '0 auto 16px' }} />
            <p style={{ fontFamily: "'Cormorant',serif", fontSize: 15, fontStyle: 'italic', color: '#6B7A5E', marginBottom: 24, lineHeight: 1.8 }}>Împărtășește momentele surprinse de tine cu mirii. Apasă butonul de mai jos pentru a încărca pozele tale.</p>
            <a href={`/invitatie/nature/${slug}/upload`} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 32px', borderRadius: 100, background: 'linear-gradient(135deg,#3A5E33 0%,#274422 100%)', color: '#fff', textDecoration: 'none', fontFamily: "'Cinzel',serif", fontSize: 11, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', boxShadow: '0 8px 28px rgba(58,94,51,.32)', marginBottom: 16 }}>📷 Încarcă Pozele</a>
            <br />
            <button onClick={() => setGalleryModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant',serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(107,122,94,.55)', textDecoration: 'underline' }}>Închide</button>
          </div>
        </div>
      )}

      {/* RSVP MODAL */}
      {rsvpModal && (
        <div onClick={() => setRsvpModal(false)} style={MODAL_OVERLAY}>
          <div onClick={e => e.stopPropagation()} style={MODAL_BOX}>
            <div style={{ textAlign: 'center', marginBottom: 22 }}>
              <span style={{ fontSize: 40, display: 'block', marginBottom: 10 }}>🌿</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3.5vw,30px)', fontStyle: 'italic', fontWeight: 400, color: '#3A5E33', marginBottom: 8 }}>Confirmă Prezența</h2>
              <div style={{ width: 36, height: 1, background: 'linear-gradient(90deg,transparent,rgba(154,123,63,.5),transparent)', margin: '0 auto' }} />
            </div>
            <NatureRsvpForm orderId={orderId} showAccommodation={isAccommodationActive} showTransport={isTransportActive} />
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button onClick={() => setRsvpModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant',serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(107,122,94,.55)', textDecoration: 'underline' }}>Închide</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NatureInviteClient(props: NatureInviteClientProps) {
  const [phase, setPhase] = useState<Phase>('envelope');

  function openEnvelope() {
    if (phase !== 'envelope') return;
    setPhase('opening');
    setTimeout(() => setPhase('invite'), 1700);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(14px,4vw,24px)', background: 'rgba(253,250,242,.93)', borderBottom: '1px solid rgba(154,123,63,.14)', backdropFilter: 'blur(14px)' }}>
        <a href="/" style={{ fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#3A5E33', textDecoration: 'none', transition: 'color .2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#9A7B3F')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#3A5E33')}>
          Vibe<span style={{ color: '#C9A84C' }}>Invite</span>
        </a>
        <div style={{ fontFamily: "'Cormorant',serif", fontSize: 16, fontStyle: 'italic', color: '#6B7A5E', letterSpacing: '.04em' }}>
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
