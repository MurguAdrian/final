// ─── SEO METADATA — Next.js App Router ───────────────────────────────────────
// Acest bloc trebuie mutat într-un fișier separat layout.tsx sau într-un
// page.tsx parinte dacă folosești 'use client'. Poți exporta metadata direct
// din acest fișier doar dacă elimini 'use client' și muți logica client într-un
// component separat. Pentru demo rapid, metadata e inclusă ca comentariu gata
// de copiat în fișierul parinte.
//
// export const metadata = {
//   title: 'Invitații Nuntă Online | Demo Stil Boho - VibeInvite',
//   description: 'Invitație digitală de nuntă în stil Boho — caldă, naturală, artistică. Crează-ți invitația online în 3 minute. RSVP instant, link free, GPS inclus, upload poze invitați.',
//   keywords: [
//     'invitatii nunta online','invitatii nunta digitale','invitatie nunta boho',
//     'invitatie nunta stil boho','invitatie online free','link invitatie nunta',
//     'invitatii digitale nunta romania','creare invitatie nunta online',
//     'invitatie nunta ieftina','RSVP nunta online','confirmare prezenta nunta',
//     'invitatii nunta personalizate','invitatie digitala boho','invitatii botez online',
//     'invitatie nunta cu QR','upload poze nunta','meniu nunta QR cod',
//     'vibeinvite','invitatii nunta moderne','invitatie nunta naturala',
//   ],
//   alternates: { canonical: 'https://vibeinvite.ro/invitatii-digitale/demo/BahoDemo' },
//   openGraph: {
//     title: 'Invitații Nuntă Online — Stil Boho | VibeInvite Demo',
//     description: 'Demo invitație digitală de nuntă în stil Boho. Caldă, naturală, cu elemente handcrafted. RSVP instant, GPS, upload poze invitați.',
//     url: 'https://vibeinvite.ro/invitatii-digitale/demo/BahoDemo',
//     siteName: 'VibeInvite',
//     images: [{ url: '/og-baho.jpg', width: 1200, height: 630, alt: 'VibeInvite Invitație Boho' }],
//     locale: 'ro_RO', type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Invitații Nuntă Online Boho — VibeInvite',
//     description: 'Invitație digitală de nuntă în stil Boho. Naturală, caldă, artistică. RSVP, GPS, upload poze.',
//     images: ['/og-baho.jpg'],
//   },
//   robots: { index: true, follow: true },
// }

'use client'

import { useState, useEffect } from 'react'

function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const ms = target.getTime()
  useEffect(() => {
    const tick = () => {
      const diff = ms - Date.now()
      if (diff <= 0) { setT({ d:0,h:0,m:0,s:0 }); return }
      setT({ d:Math.floor(diff/864e5), h:Math.floor((diff%864e5)/36e5), m:Math.floor((diff%36e5)/6e4), s:Math.floor((diff%6e4)/1e3) })
    }
    tick(); const id = setInterval(tick,1000); return ()=>clearInterval(id)
  }, [ms])
  return t
}
const pad = (n: number) => String(n).padStart(2,'0')

const SunMandala = ({ size = 120 }: { size?: number }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: size, height: size }}>
    <circle cx="60" cy="60" r="18" stroke="#C17F3E" strokeWidth="1.2" strokeOpacity=".8"/>
    <circle cx="60" cy="60" r="12" stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".5"/>
    <circle cx="60" cy="60" r="6" fill="#C17F3E" fillOpacity=".4"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i) => {
      const rad = (deg * Math.PI) / 180
      const x1 = 60 + Math.cos(rad) * 22; const y1 = 60 + Math.sin(rad) * 22
      const x2 = 60 + Math.cos(rad) * (i%3===0?46:i%3===1?38:32)
      const y2 = 60 + Math.sin(rad) * (i%3===0?46:i%3===1?38:32)
      return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C17F3E" strokeWidth={i%3===0?"1.4":"0.9"} strokeOpacity={i%3===0?".75":".5"} strokeLinecap="round"/>
    })}
    {[0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345].map(deg => {
      const rad=(deg*Math.PI)/180; const x=60+Math.cos(rad)*54; const y=60+Math.sin(rad)*54
      return <circle key={deg} cx={x} cy={y} r="1" fill="#C17F3E" fillOpacity=".35"/>
    })}
    {[45,135,225,315].map(deg => {
      const rad=(deg*Math.PI)/180; const cx=60+Math.cos(rad)*28; const cy=60+Math.sin(rad)*28
      return <ellipse key={deg} cx={cx} cy={cy} rx="4" ry="8" fill="#7A9E6A" fillOpacity=".45" transform={`rotate(${deg+90} ${cx} ${cy})`}/>
    })}
  </svg>
)

const MacrameTop = () => (
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
    <path d="M55 18 Q22 50 18 72 Q38 56 55 18Z" fill="#7A9E6A" fillOpacity=".25"/>
    <path d="M245 18 Q278 50 282 72 Q262 56 245 18Z" fill="#7A9E6A" fillOpacity=".25"/>
  </svg>
)

const MeadowDivider = () => (
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
          const a=(i/p)*Math.PI*2
          return <ellipse key={i} cx={Math.cos(a)*r} cy={Math.sin(a)*r} rx="3" ry="5" fill={pc} fillOpacity=".55" transform={`rotate(${(i/p)*360})`}/>
        })}
        <circle cx="0" cy="0" r="3.5" fill={cc} fillOpacity=".7"/>
        <path d={`M0 0 L0 ${-r*2.5}`} stroke="#7A9E6A" strokeWidth="1" strokeOpacity=".5"/>
      </g>
    ))}
    {[30,70,110,150,190,230,270].map(x=>(
      <path key={x} d={`M${x} 38 Q${x+5} 28 ${x+10} 36`} fill="#7A9E6A" fillOpacity=".4"/>
    ))}
  </svg>
)

const Feather = ({ flip=false }: { flip?: boolean }) => (
  <svg viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width:'clamp(34px,5vw,56px)', transform: flip ? 'scaleX(-1)' : 'none' }}>
    <path d="M30 190 Q28 140 22 100 Q14 55 8 20 Q22 45 30 80 Q38 55 52 20 Q46 55 38 100 Q32 140 30 190Z"
      fill="#C17F3E" fillOpacity=".22" stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".38"/>
    <path d="M30 190 L30 80" stroke="#8B6343" strokeWidth="1" strokeOpacity=".45"/>
    {[80,100,120,140,160].map((y,i)=>{
      const w=14-i*1.5
      return (
        <g key={y}>
          <path d={`M30 ${y} Q${30-w} ${y-6} ${22-i*2} ${y-12}`} stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".38" fill="none"/>
          <path d={`M30 ${y} Q${30+w} ${y-6} ${38+i*2} ${y-12}`} stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".38" fill="none"/>
        </g>
      )
    })}
  </svg>
)

const CameraBoho = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 38, height: 38 }}>
    <rect x="4" y="14" width="40" height="28" rx="4" stroke="#C17F3E" strokeWidth="1.8" strokeOpacity=".7"/>
    <path d="M14 14 L17 8 L31 8 L34 14" stroke="#C17F3E" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round"/>
    <circle cx="24" cy="28" r="8" stroke="#C17F3E" strokeWidth="1.5" strokeOpacity=".7"/>
    <circle cx="24" cy="28" r="4" fill="#C17F3E" fillOpacity=".28"/>
    <circle cx="37" cy="20" r="2" fill="#C17F3E" fillOpacity=".5"/>
    <circle cx="10" cy="20" r="1.2" fill="#7A9E6A" fillOpacity=".6"/>
    <path d="M20 10 Q24 7 28 10" stroke="#7A9E6A" strokeWidth=".8" strokeOpacity=".5" fill="none"/>
  </svg>
)

const UploadArrow = () => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}>
    <path d="M18 26 L18 10 M11 17 L18 10 L25 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 30 Q5 30 3 26 Q1 22 5 19 Q4 16 6 14 Q8 6 16 6 Q22 4 26 9 Q32 9 34 14 Q38 16 36 21 Q35 26 30 26 L9 30Z" stroke="currentColor" strokeWidth="1.2" strokeOpacity=".45" fill="none"/>
  </svg>
)

const WazeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}>
    <path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/>
  </svg>
)
const MapsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
)
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)
const BackArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}>
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
)

type Phase = 'envelope' | 'opening' | 'invite'

function EnvelopeScreen({ onOpen, phase }: { onOpen:()=>void; phase:Phase }) {
  return (
    <div style={{position:'fixed',inset:0,top:56,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 70% at 50% 40%,#F5EDD8 0%,#EDE0C4 50%,#E5D5B0 100%)'}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 50% 45% at 18% 22%,rgba(193,127,62,.12) 0%,transparent 55%),radial-gradient(ellipse 45% 40% at 82% 78%,rgba(122,158,106,.1) 0%,transparent 55%)'}}/>
      <div style={{position:'absolute',inset:0,opacity:.04,backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:0,left:0,opacity:.7,pointerEvents:'none'}}><Feather/></div>
      <div style={{position:'absolute',top:0,right:0,opacity:.7,pointerEvents:'none'}}><Feather flip/></div>

      <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',gap:16,padding:'20px 24px'}}>
        <div style={{animation:'bh-fadeUp .7s ease both',marginBottom:-4,width:'clamp(180px,34vw,280px)'}}><MacrameTop/></div>
        <p style={{fontFamily:"'Dancing Script',cursive",fontSize:'clamp(13px,1.6vw,17px)',color:'#8B6343',opacity:.8,animation:'bh-fadeUp .75s ease both .06s',letterSpacing:'.06em'}}>o invitație cu suflet</p>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,4.5vw,54px)',fontWeight:400,fontStyle:'italic',color:'#4A3728',textAlign:'center',lineHeight:1.15,animation:'bh-fadeUp .8s ease both .1s',margin:0}}>
          <strong style={{fontWeight:700,fontStyle:'normal',color:'#6B4E2A'}}>Ioana</strong>{' '}
          <span style={{color:'#C17F3E',fontWeight:300}}>✦</span>{' '}
          <strong style={{fontWeight:700,fontStyle:'normal',color:'#6B4E2A'}}>Mihai</strong>
        </h1>

        {/* Envelope */}
        <div onClick={onOpen} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&onOpen()}
          style={{animation:'bh-float 5.5s ease-in-out infinite, bh-fadeUp .85s ease both .15s',position:'relative',width:'clamp(280px,42vw,500px)',cursor:'pointer',userSelect:'none',filter:'drop-shadow(0 28px 60px rgba(74,55,40,.22))'}}>
          <div style={{position:'absolute',bottom:-16,left:'8%',right:'8%',height:20,background:'radial-gradient(ellipse,rgba(74,55,40,.2) 0%,transparent 70%)',filter:'blur(10px)',zIndex:0}}/>
          {/* Letter */}
          <div style={{
            position:'absolute',left:'9%',right:'9%',bottom:'4%',height:'60%',
            zIndex:phase==='opening'?30:2,
            background:'linear-gradient(165deg,#FEFAF0 0%,#F5EDD8 100%)',
            border:'1px solid rgba(193,127,62,.3)',borderRadius:4,
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,
            boxShadow:phase==='opening'?'0 32px 80px rgba(74,55,40,.28),0 8px 24px rgba(74,55,40,.14)':'0 2px 8px rgba(0,0,0,.06)',
            transform:phase==='opening'?'translateY(-138%) scale(1.05) rotate(-0.5deg)':'translateY(0)',
            transition:'transform 1.4s cubic-bezier(.22,.1,.2,1) .25s,box-shadow 1.4s ease .25s',overflow:'hidden',
          }}>
            <div style={{position:'absolute',inset:0,opacity:.04,backgroundImage:'repeating-linear-gradient(0deg,#8B6343 0,#8B6343 1px,transparent 1px,transparent 24px)'}}/>
            <div style={{textAlign:'center',padding:'0 16px',position:'relative',zIndex:1}}>
              <div style={{marginBottom:6}}><SunMandala size={36}/></div>
              <p style={{fontFamily:"'Dancing Script',cursive",fontSize:'clamp(16px,2.6vw,26px)',color:'#6B4E2A',lineHeight:1.3}}>Ioana &amp; Mihai</p>
              <div style={{width:32,height:1,background:'rgba(193,127,62,.45)',margin:'8px auto'}}/>
              <p style={{fontFamily:"'EB Garamond',serif",fontSize:'clamp(8px,1vw,10px)',letterSpacing:'.18em',textTransform:'uppercase',color:'#8B6343',fontStyle:'italic'}}>3 Mai 2027 · Iași</p>
            </div>
          </div>
          {/* Envelope body */}
          <div style={{width:'100%',paddingTop:'60%',position:'relative',zIndex:5}}>
            <div style={{position:'absolute',inset:0,background:'#E8D8B8',borderRadius:6,border:'1.5px solid rgba(193,127,62,.38)',boxShadow:'0 4px 20px rgba(74,55,40,.12)',overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,bottom:0,left:0,width:'50%',background:'#DCC9A4',clipPath:'polygon(0 0,0 100%,100% 100%)'}}/>
              <div style={{position:'absolute',top:0,bottom:0,right:0,width:'50%',background:'#DCC9A4',clipPath:'polygon(100% 0,0 100%,100% 100%)'}}/>
              <div style={{position:'absolute',bottom:0,left:0,right:0,height:'50%',background:'#D4BF98',clipPath:'polygon(0 100%,50% 0,100% 100%)'}}/>
            </div>
            {/* Seal */}
            <div style={{
              position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-52%)',
              width:'clamp(52px,8.5vw,78px)',height:'clamp(52px,8.5vw,78px)',
              background:'radial-gradient(circle at 35% 35%,#E8C88A 0%,#C17F3E 55%,#8B5E28 100%)',
              borderRadius:'50%',border:'2px solid rgba(193,127,62,.55)',
              display:'flex',alignItems:'center',justifyContent:'center',
              boxShadow:'0 0 0 5px rgba(193,127,62,.1),0 6px 20px rgba(74,55,40,.2)',
              zIndex:10,opacity:phase==='opening'?0:1,transition:'opacity .25s',
            }}>
              <div style={{position:'absolute',inset:-8,border:'1px dashed rgba(193,127,62,.4)',borderRadius:'50%',animation:'bh-spin 25s linear infinite'}}/>
              <SunMandala size={30}/>
            </div>
            {/* Flap */}
            <div style={{
              position:'absolute',top:0,left:0,right:0,zIndex:8,height:'52%',
              background:'linear-gradient(160deg,#EBD9B8 0%,#E0CC9E 100%)',
              clipPath:'polygon(0 0,100% 0,50% 100%)',
              transformOrigin:'top center',
              transform:phase==='opening'?'perspective(700px) rotateX(192deg)':'perspective(700px) rotateX(0deg)',
              transition:'transform 1s cubic-bezier(.4,0,.2,1)',
              borderBottom:'1.5px solid rgba(193,127,62,.3)',
            }}>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(160deg,rgba(193,127,62,.06) 0%,transparent 50%)'}}/>
            </div>
          </div>
        </div>

        <p style={{fontFamily:"'Dancing Script',cursive",fontSize:'clamp(13px,1.5vw,16px)',color:'#8B6343',opacity:.75,
          animation:phase==='opening'?'none':'bh-fadeUp 1s ease both .4s, bh-pulse 3s ease-in-out infinite 1.4s'}}>
          {phase==='opening'?'✦ se deschide cu drag...':'apasă să deschizi '}
        </p>
      </div>
    </div>
  )
}

function InviteScreen({ onBack: _onBack }: { onBack: () => void }) {
  const WEDDING = new Date('2027-05-03T14:00:00')
  const [modal, setModal] = useState(false)
  const [uploadModal, setUploadModal] = useState(false)
  const [vis, setVis] = useState(false)
  const cd = useCountdown(WEDDING)
  const [flipS, setFlipS] = useState(false)

  useEffect(()=>{const t=setTimeout(()=>setVis(true),60);return()=>clearTimeout(t)},[])
  useEffect(()=>{setFlipS(true);const t=setTimeout(()=>setFlipS(false),160);return()=>clearTimeout(t)},[cd.s])

  const a=(d:number):React.CSSProperties=>({
    opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(20px)',
    transition:`opacity .75s ease ${d}s,transform .75s ease ${d}s`,
  })

  const btnD:React.CSSProperties={display:'inline-flex',alignItems:'center',justifyContent:'center',gap:6,padding:'9px 10px',borderRadius:12,fontFamily:"'EB Garamond',serif",fontSize:11,fontWeight:700,letterSpacing:'.04em',cursor:'default',flex:1,whiteSpace:'nowrap'}

  return (
    <div style={{position:'fixed',inset:0,top:56,overflowY:'auto',overflowX:'hidden'}}>
      <div style={{position:'fixed',inset:0,background:'radial-gradient(ellipse 90% 80% at 50% 30%,#F5EDD8 0%,#EDE0C4 50%,#E5D5B0 100%)',zIndex:0}}/>
      <div style={{position:'fixed',inset:0,background:'radial-gradient(ellipse 60% 50% at 15% 20%,rgba(193,127,62,.1) 0%,transparent 55%),radial-gradient(ellipse 50% 45% at 85% 80%,rgba(122,158,106,.08) 0%,transparent 55%)',zIndex:1,pointerEvents:'none'}}/>
      <div style={{position:'fixed',inset:0,opacity:.035,zIndex:1,pointerEvents:'none',backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"}}/>
      <div style={{position:'fixed',top:0,left:0,opacity:.65,pointerEvents:'none',zIndex:2}}><Feather/></div>
      <div style={{position:'fixed',top:0,right:0,opacity:.65,pointerEvents:'none',zIndex:2}}><Feather flip/></div>

      <div style={{position:'relative',zIndex:10,maxWidth:720,margin:'0 auto',padding:'clamp(36px,6vw,56px) clamp(16px,4vw,28px) 60px',display:'flex',flexDirection:'column',alignItems:'center',gap:0}}>

        <div style={{...a(0),width:'clamp(180px,38vw,280px)',marginBottom:12}}><MacrameTop/></div>
        <p style={{...a(.06),fontFamily:"'Dancing Script',cursive",fontSize:'clamp(14px,1.8vw,18px)',color:'#8B6343',opacity:vis?.8:0,marginBottom:8,letterSpacing:'.04em'}}>cu drag vă invităm la</p>
        <div style={{...a(.08),marginBottom:8}}><SunMandala size={80}/></div>

        <div style={{...a(.12),textAlign:'center',marginBottom:6}}>
          <span style={{display:'block',fontFamily:"'Playfair Display',serif",fontSize:'clamp(54px,9.5vw,104px)',fontWeight:700,fontStyle:'italic',color:'#4A3728',lineHeight:.92,letterSpacing:'-.01em'}}>Ioana</span>
          <span style={{display:'block',fontFamily:"'Dancing Script',cursive",fontSize:'clamp(26px,4vw,44px)',color:'#C17F3E',margin:'6px 0',lineHeight:1.1}}>&amp;</span>
          <span style={{display:'block',fontFamily:"'Playfair Display',serif",fontSize:'clamp(54px,9.5vw,104px)',fontWeight:700,fontStyle:'italic',color:'#4A3728',lineHeight:.92,letterSpacing:'-.01em'}}>Mihai</span>
        </div>

        <div style={{...a(.18),margin:'20px auto',width:'100%',maxWidth:360}}><MeadowDivider/></div>

        <div style={{...a(.22),textAlign:'center',marginBottom:20}}>
          <p style={{fontFamily:"'EB Garamond',serif",fontSize:'clamp(14px,1.8vw,18px)',letterSpacing:'.14em',color:'#4A3728',fontWeight:500,marginBottom:5,textTransform:'uppercase'}}>Duminică · 3 Mai 2027</p>
          <p style={{fontFamily:"'Dancing Script',cursive",fontSize:'clamp(16px,2vw,20px)',color:'#8B6343',letterSpacing:'.04em'}}>Iași, România</p>
        </div>

        {/* Nași */}
        <div style={{...a(.26),textAlign:'center',padding:'20px 28px',border:'1.5px solid rgba(193,127,62,.22)',borderRadius:24,background:'rgba(255,250,240,.6)',backdropFilter:'blur(8px)',maxWidth:340,width:'100%',boxShadow:'0 4px 24px rgba(74,55,40,.07)',marginBottom:0,position:'relative'}}>
          {['tl','tr','bl','br'].map(c=>(
            <div key={c} style={{position:'absolute',top:c.startsWith('t')?8:'auto',bottom:c.startsWith('b')?8:'auto',left:c.endsWith('l')?8:'auto',right:c.endsWith('r')?8:'auto',width:10,height:10,borderTop:c.startsWith('t')?'1.5px solid rgba(193,127,62,.45)':'none',borderBottom:c.startsWith('b')?'1.5px solid rgba(193,127,62,.45)':'none',borderLeft:c.endsWith('l')?'1.5px solid rgba(193,127,62,.45)':'none',borderRight:c.endsWith('r')?'1.5px solid rgba(193,127,62,.45)':'none'}}/>
          ))}
          <p style={{fontFamily:"'EB Garamond',serif",fontSize:'clamp(12px,1.4vw,14px)',fontStyle:'italic',color:'#8B6343',marginBottom:8,letterSpacing:'.04em'}}>alături de nașii noștri</p>
          <div style={{width:32,height:1,background:'rgba(193,127,62,.38)',margin:'0 auto 10px'}}/>
          <p style={{fontFamily:"'Dancing Script',cursive",fontSize:'clamp(20px,2.6vw,26px)',color:'#4A3728',letterSpacing:'.02em'}}>Ana &amp; Radu</p>
        </div>

        <div style={{...a(.30),margin:'22px auto',width:'100%',maxWidth:360}}><MeadowDivider/></div>

        {/* Countdown */}
        <div style={{...a(.34),width:'100%',maxWidth:460,background:'rgba(255,250,240,.65)',border:'1.5px solid rgba(193,127,62,.18)',borderRadius:24,padding:'22px 18px',backdropFilter:'blur(10px)',textAlign:'center',boxShadow:'0 6px 28px rgba(74,55,40,.07)'}}>
          <p style={{fontFamily:"'Dancing Script',cursive",fontSize:'clamp(14px,1.7vw,17px)',color:'#8B6343',marginBottom:14,opacity:.8,letterSpacing:'.02em'}}>timp rămas...</p>
          <div style={{display:'flex',gap:0,justifyContent:'center'}}>
            {[{n:pad(cd.d),l:'Zile'},{n:pad(cd.h),l:'Ore'},{n:pad(cd.m),l:'Minute'},{n:pad(cd.s),l:'Secunde',flip:flipS}].map(u=>(
              <div key={u.l} style={{flex:1,maxWidth:108,textAlign:'center',padding:'0 4px',borderRight:'1px solid rgba(193,127,62,.18)'}}>
                <span style={{display:'block',fontFamily:"'Playfair Display',serif",fontSize:'clamp(36px,5.8vw,58px)',fontWeight:400,lineHeight:1,transition:'transform .15s ease,color .15s ease',transform:(u as any).flip?'scale(1.1) translateY(-3px)':'scale(1)',color:(u as any).flip?'#C17F3E':'#4A3728'}}>{u.n}</span>
                <span style={{fontFamily:"'EB Garamond',serif",fontSize:'clamp(9px,.9vw,11px)',letterSpacing:'.12em',textTransform:'uppercase',color:'#8B6343',opacity:.65,display:'block',marginTop:3,fontStyle:'italic'}}>{u.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{...a(.38),margin:'22px auto',width:'100%',maxWidth:360}}><MeadowDivider/></div>

        {/* Location cards */}
        <div style={{...a(.42),width:'100%',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,256px),1fr))',gap:'clamp(12px,2vw,20px)',maxWidth:620}}>
          {[
            {type:'Ceremonia',name:'Cununia',venue:'Biserica Sfântul Prooroc Daniel',addr:'Șos. Nicolina, Iași',time:'14:00',
              icon:<svg viewBox="0 0 24 24" fill="none" stroke="#E8C88A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M12 2L12 6M10 4h4"/><rect x="4" y="9" width="16" height="12" rx="1"/><path d="M9 21V14a3 3 0 0 1 6 0v7"/><path d="M4 9l8-4 8 4"/></svg>},
            {type:'Petrecerea',name:'Banchetul',venue:'Chalette Events Paun',addr:'Iași, România',time:'18:00',
              icon:<svg viewBox="0 0 24 24" fill="none" stroke="#E8C88A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M8 18c0 1.65-1.35 3-3 3s-3-1.35-3-3c0-2 3-6 3-6s3 4 3 6z"/><path d="M5 12V4"/><path d="M19 14c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.5 2-4 2-4s2 2.5 2 4z"/><path d="M17 10V6"/><path d="M12 8l2-2M12 8l-2-2M12 8v4"/></svg>},
          ].map(card=>(
            <div key={card.type} style={{borderRadius:20,overflow:'hidden',border:'1.5px solid rgba(193,127,62,.2)',background:'rgba(255,250,240,.7)',backdropFilter:'blur(10px)',boxShadow:'0 6px 24px rgba(74,55,40,.08)',transition:'transform .25s ease,box-shadow .25s ease'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)';(e.currentTarget as HTMLDivElement).style.boxShadow='0 18px 48px rgba(74,55,40,.15)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform='';(e.currentTarget as HTMLDivElement).style.boxShadow='0 6px 24px rgba(74,55,40,.08)'}}>
              <div style={{padding:'16px 18px 12px',background:'linear-gradient(135deg,#6B4E2A 0%,#4A3728 100%)',display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:40,height:40,borderRadius:12,background:'rgba(255,255,255,.14)',border:'1px solid rgba(255,255,255,.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{card.icon}</div>
                <div>
                  <span style={{fontFamily:"'EB Garamond',serif",fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:'rgba(232,200,138,.65)',display:'block',marginBottom:2,fontStyle:'italic'}}>{card.type}</span>
                  <p style={{fontFamily:"'Dancing Script',cursive",fontSize:'clamp(15px,1.9vw,19px)',color:'#F5EDD8',lineHeight:1.2}}>{card.name}</p>
                </div>
              </div>
              <div style={{padding:'14px 18px 16px'}}>
                <p style={{fontFamily:"'EB Garamond',serif",fontWeight:600,fontSize:'clamp(11px,1.2vw,13px)',color:'#4A3728',marginBottom:3,letterSpacing:'.03em'}}>{card.venue}</p>
                <p style={{fontSize:'clamp(10px,1.1vw,12px)',color:'#8B6343',lineHeight:1.5,marginBottom:10,fontStyle:'italic',fontFamily:"'EB Garamond',serif"}}>{card.addr}</p>
                <div style={{display:'inline-flex',alignItems:'center',gap:5,background:'rgba(193,127,62,.1)',border:'1px solid rgba(193,127,62,.22)',borderRadius:100,padding:'4px 12px',fontFamily:"'EB Garamond',serif",fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',color:'#8B6343',marginBottom:12,fontStyle:'italic'}}>
                  ✿ 3 mai 2027 · ora {card.time}
                </div>
                <div style={{display:'flex',gap:8}}>
                  <div style={{...btnD,background:'linear-gradient(135deg,rgba(8,162,212,.2),rgba(8,162,212,.12))',border:'1px solid rgba(8,162,212,.28)',color:'rgba(80,180,220,.9)'}}><WazeIcon/> Waze</div>
                  <div style={{...btnD,background:'linear-gradient(135deg,rgba(76,175,79,.2),rgba(76,175,79,.12))',border:'1px solid rgba(76,175,79,.28)',color:'rgba(80,180,80,.9)'}}><MapsIcon/> Maps</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ PHOTO UPLOAD SECTION ═══ */}
        <div style={{...a(.48),margin:'22px auto',width:'100%',maxWidth:360}}><MeadowDivider/></div>

        <div style={{...a(.50),width:'100%',maxWidth:620,background:'linear-gradient(160deg,rgba(193,127,62,.1) 0%,rgba(122,158,106,.08) 100%)',border:'2px dashed rgba(193,127,62,.32)',borderRadius:28,padding:'clamp(22px,3vw,32px) clamp(18px,3vw,28px)',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',opacity:.04,pointerEvents:'none',transform:'scale(3)'}}><CameraBoho/></div>
          <div style={{position:'relative',zIndex:1}}>
            <div style={{display:'flex',justifyContent:'center',marginBottom:14}}>
              <div style={{width:72,height:72,borderRadius:'50%',background:'rgba(193,127,62,.14)',border:'2px solid rgba(193,127,62,.28)',display:'flex',alignItems:'center',justifyContent:'center'}}><CameraBoho/></div>
            </div>
            <h3 style={{fontFamily:"'Dancing Script',cursive",fontSize:'clamp(20px,3vw,28px)',color:'#4A3728',marginBottom:10,lineHeight:1.2}}>Împărtășiți momentele cu noi! 📸</h3>
            <p style={{fontFamily:"'EB Garamond',serif",fontSize:'clamp(13px,1.5vw,15px)',fontStyle:'italic',color:'#6B4E2A',lineHeight:1.8,marginBottom:18,maxWidth:420,margin:'0 auto 18px'}}>
              Faceți poze în timpul nunții și încărcați-le direct din telefon.<br/>
              Mirii vor accesa toate imaginile voastre într-un singur album privat — amintiri adunate din toate perspectivele.
            </p>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginBottom:20}}>
              {['📷 Poze din toate unghiurile','🌿 Album privat al mirilor','✨ Fără limită de fișiere','🔒 Acces securizat'].map(tag=>(
                <span key={tag} style={{fontFamily:"'EB Garamond',serif",fontSize:'clamp(10px,1.1vw,12px)',fontStyle:'italic',color:'#6B4E2A',background:'rgba(255,250,240,.7)',border:'1px solid rgba(193,127,62,.22)',borderRadius:100,padding:'4px 12px'}}>{tag}</span>
              ))}
            </div>
            <button onClick={()=>setUploadModal(true)} style={{display:'inline-flex',alignItems:'center',gap:10,padding:'14px 32px',borderRadius:100,background:'linear-gradient(135deg,#8B6343 0%,#6B4E2A 100%)',color:'#F5EDD8',border:'none',cursor:'pointer',fontFamily:"'EB Garamond',serif",fontSize:'clamp(13px,1.5vw,15px)',fontStyle:'italic',letterSpacing:'.06em',boxShadow:'0 8px 28px rgba(139,99,67,.3)',transition:'transform .2s,box-shadow .2s'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 14px 40px rgba(139,99,67,.42)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 8px 28px rgba(139,99,67,.3)'}}>
              <UploadArrow/> Încarcă pozele tale
            </button>
            <p style={{fontFamily:"'EB Garamond',serif",fontSize:11,fontStyle:'italic',color:'rgba(139,99,67,.55)',marginTop:10}}>funcție disponibilă în ziua nunții și 72h după eveniment</p>
          </div>
        </div>

        <div style={{...a(.54),margin:'22px auto',width:'100%',maxWidth:360}}><MeadowDivider/></div>

        {/* Contact */}
        <div style={{...a(.56),width:'100%',maxWidth:620,background:'rgba(255,250,240,.6)',border:'1.5px solid rgba(193,127,62,.18)',borderRadius:20,padding:'16px 20px',boxShadow:'0 4px 20px rgba(74,55,40,.06)'}}>
          <p style={{fontFamily:"'EB Garamond',serif",fontSize:9,letterSpacing:'.22em',textTransform:'uppercase',color:'#8B6343',marginBottom:12,opacity:.75,fontStyle:'italic'}}>Contact Mireasă</p>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <div>
              <p style={{fontFamily:"'Dancing Script',cursive",fontSize:'clamp(16px,2vw,20px)',color:'#4A3728',marginBottom:2}}>Miri</p>
              <p style={{fontFamily:"'EB Garamond',serif",fontSize:'clamp(12px,1.3vw,14px)',color:'#8B6343',letterSpacing:'.06em',fontStyle:'italic'}}>0752 954 258</p>
            </div>
            <div style={{display:'flex',gap:8}}>
              <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 16px',borderRadius:100,background:'rgba(139,99,67,.12)',border:'1px solid rgba(139,99,67,.25)',color:'#6B4E2A',fontFamily:"'EB Garamond',serif",fontSize:12,fontStyle:'italic',cursor:'default'}}><PhoneIcon/> Telefon</div>
              <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 16px',borderRadius:100,background:'rgba(37,211,102,.1)',border:'1px solid rgba(37,211,102,.28)',color:'rgba(40,140,60,.9)',fontFamily:"'EB Garamond',serif",fontSize:12,fontStyle:'italic',cursor:'default'}}><WaIcon/> WhatsApp</div>
            </div>
          </div>
        </div>

        <div style={{...a(.60),margin:'22px auto',width:'100%',maxWidth:360}}><MeadowDivider/></div>

        {/* RSVP */}
        <div style={{...a(.62),textAlign:'center',width:'100%',maxWidth:400}}>
          <p style={{fontFamily:"'Dancing Script',cursive",fontSize:'clamp(15px,1.8vw,18px)',color:'#8B6343',marginBottom:14,lineHeight:1.7}}>
            Confirmă-ți prezența până pe<br/><strong style={{color:'#6B4E2A',fontStyle:'normal'}}>1 Aprilie 2027</strong> 🌿
          </p>
          <button onClick={()=>setModal(true)} style={{display:'block',width:'100%',padding:'clamp(14px,1.8vw,18px) 0',borderRadius:100,background:'linear-gradient(135deg,#6B4E2A 0%,#4A3728 100%)',color:'#F5EDD8',textAlign:'center',fontFamily:"'EB Garamond',serif",fontSize:'clamp(13px,1.5vw,15px)',fontStyle:'italic',letterSpacing:'.1em',cursor:'pointer',border:'none',boxShadow:'0 10px 32px rgba(74,55,40,.3)',transition:'transform .22s,box-shadow .22s',position:'relative',overflow:'hidden'}}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-3px)';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 18px 44px rgba(74,55,40,.42)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 10px 32px rgba(74,55,40,.3)'}}>
            <span style={{position:'relative',zIndex:1}}>✦ Confirmă Prezența ✦</span>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent)',backgroundSize:'350px 100%',animation:'bh-shimmer 3s linear infinite'}}/>
          </button>
        </div>

        {/* Choose bar */}
        <div style={{...a(.68),width:'100%',padding:'22px 24px 24px',background:'rgba(255,250,240,.65)',border:'1.5px solid rgba(193,127,62,.18)',borderRadius:24,display:'flex',flexDirection:'column',alignItems:'center',gap:14,backdropFilter:'blur(8px)',marginTop:16,boxShadow:'0 4px 24px rgba(74,55,40,.06)'}}>
          <SunMandala size={40}/>
          <p style={{fontFamily:"'Dancing Script',cursive",fontSize:16,color:'#8B6343',letterSpacing:'.03em',margin:0,textAlign:'center'}}>Îți place această temă? Creează-ți propria invitație boho!</p>
          <a href="/preturi?tema=baho" style={{display:'inline-flex',alignItems:'center',gap:10,padding:'13px 36px',borderRadius:100,background:'linear-gradient(135deg,#8B6343 0%,#6B4E2A 100%)',color:'#F5EDD8',textDecoration:'none',fontFamily:"'EB Garamond',serif",fontSize:14,fontStyle:'italic',letterSpacing:'.08em',boxShadow:'0 8px 28px rgba(139,99,67,.3)',transition:'transform .2s,box-shadow .2s'}}
            onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLAnchorElement).style.boxShadow='0 14px 40px rgba(139,99,67,.45)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='';(e.currentTarget as HTMLAnchorElement).style.boxShadow='0 8px 28px rgba(139,99,67,.3)'}}>
            ✦ Alege Această Temă
          </a>
          <p style={{fontFamily:"'EB Garamond',serif",fontSize:10,fontStyle:'italic',letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(139,99,67,.45)',margin:0}}>VibeInvite © 2026 · Toate drepturile rezervate</p>
        </div>
      </div>

      {/* RSVP Modal — formular complet */}
      {modal&&(
        <div onClick={()=>setModal(false)} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(74,55,40,.6)',backdropFilter:'blur(10px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'16px',animation:'bh-fadeIn .28s ease',overflowY:'auto'}}>
          <div onClick={e=>e.stopPropagation()} style={{background:'linear-gradient(165deg,#FEFAF0,#F5EDD8)',borderRadius:28,padding:'clamp(28px,4vw,40px) clamp(20px,4vw,36px)',maxWidth:480,width:'100%',border:'1.5px solid rgba(193,127,62,.25)',boxShadow:'0 40px 100px rgba(74,55,40,.35)',animation:'bh-slideUp .32s cubic-bezier(.4,0,.2,1)',position:'relative',maxHeight:'90vh',overflowY:'auto'}}>
            {/* Header form */}
            <div style={{textAlign:'center',marginBottom:22}}>
              <div style={{display:'flex',justifyContent:'center',marginBottom:10}}><SunMandala size={52}/></div>
              <h2 style={{fontFamily:"'Dancing Script',cursive",fontSize:'clamp(24px,4vw,32px)',color:'#4A3728',marginBottom:6}}>Confirmă Prezența 🌿</h2>
              <div style={{width:36,height:1,background:'rgba(193,127,62,.4)',margin:'0 auto 10px'}}/>
              <p style={{fontFamily:"'EB Garamond',serif",fontSize:13,fontStyle:'italic',color:'#8B6343',lineHeight:1.7}}>
                Toate câmpurile sunt opționale — completează ce dorești.
              </p>
            </div>

            {/* FIELDS */}
            <div style={{display:'flex',flexDirection:'column',gap:16}}>

              {/* Nume */}
              <div>
                <label style={{display:'block',fontFamily:"'EB Garamond',serif",fontSize:13,fontStyle:'italic',color:'#6B4E2A',marginBottom:5,letterSpacing:'.04em'}}>
                  Nume și Prenume
                </label>
                <input type="text" placeholder="ex. Maria Popescu" style={{width:'100%',padding:'10px 14px',borderRadius:12,border:'1.5px solid rgba(193,127,62,.28)',background:'rgba(255,250,240,.8)',fontFamily:"'EB Garamond',serif",fontSize:14,color:'#4A3728',outline:'none'}}
                  onFocus={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(193,127,62,.7)'}
                  onBlur={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(193,127,62,.28)'}/>
                <p style={{fontFamily:"'EB Garamond',serif",fontSize:11,fontStyle:'italic',color:'rgba(139,99,67,.55)',marginTop:4}}>Numele și prenumele dumneavoastră.</p>
              </div>

              {/* Participare */}
              <div>
                <label style={{display:'block',fontFamily:"'EB Garamond',serif",fontSize:13,fontStyle:'italic',color:'#6B4E2A',marginBottom:8,letterSpacing:'.04em'}}>Răspuns</label>
                <div style={{display:'flex',gap:8}}>
                  {['Particip','Nu Particip'].map(opt=>(
                    <label key={opt} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'10px 12px',borderRadius:12,border:'1.5px solid rgba(193,127,62,.28)',background:'rgba(255,250,240,.8)',cursor:'pointer',fontFamily:"'EB Garamond',serif",fontSize:13,color:'#4A3728',fontStyle:'italic',transition:'all .2s',userSelect:'none'}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLLabelElement).style.borderColor='rgba(193,127,62,.7)';(e.currentTarget as HTMLLabelElement).style.background='rgba(193,127,62,.1)'}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLLabelElement).style.borderColor='rgba(193,127,62,.28)';(e.currentTarget as HTMLLabelElement).style.background='rgba(255,250,240,.8)'}}>
                      <input type="radio" name="raspuns" value={opt} style={{accentColor:'#C17F3E'}}/>{opt}
                    </label>
                  ))}
                </div>
                <p style={{fontFamily:"'EB Garamond',serif",fontSize:11,fontStyle:'italic',color:'rgba(139,99,67,.55)',marginTop:4}}>În cazul în care refuzați să participați, selectați "Nu Particip".</p>
              </div>

              {/* Însoțit */}
              <div>
                <label style={{display:'block',fontFamily:"'EB Garamond',serif",fontSize:13,fontStyle:'italic',color:'#6B4E2A',marginBottom:8,letterSpacing:'.04em'}}>Veți fi însoțit/ă la eveniment?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Da','Nu'].map(opt=>(
                    <label key={opt} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'10px 12px',borderRadius:12,border:'1.5px solid rgba(193,127,62,.28)',background:'rgba(255,250,240,.8)',cursor:'pointer',fontFamily:"'EB Garamond',serif",fontSize:13,color:'#4A3728',fontStyle:'italic',transition:'all .2s',userSelect:'none'}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLLabelElement).style.borderColor='rgba(193,127,62,.7)';(e.currentTarget as HTMLLabelElement).style.background='rgba(193,127,62,.1)'}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLLabelElement).style.borderColor='rgba(193,127,62,.28)';(e.currentTarget as HTMLLabelElement).style.background='rgba(255,250,240,.8)'}}>
                      <input type="radio" name="insotit" value={opt} style={{accentColor:'#C17F3E'}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>

              {/* Partener */}
              <div>
                <label style={{display:'block',fontFamily:"'EB Garamond',serif",fontSize:13,fontStyle:'italic',color:'#6B4E2A',marginBottom:5,letterSpacing:'.04em'}}>Nume și Prenume partener</label>
                <input type="text" placeholder="ex. Ion Popescu" style={{width:'100%',padding:'10px 14px',borderRadius:12,border:'1.5px solid rgba(193,127,62,.28)',background:'rgba(255,250,240,.8)',fontFamily:"'EB Garamond',serif",fontSize:14,color:'#4A3728',outline:'none'}}
                  onFocus={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(193,127,62,.7)'}
                  onBlur={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(193,127,62,.28)'}/>
                <p style={{fontFamily:"'EB Garamond',serif",fontSize:11,fontStyle:'italic',color:'rgba(139,99,67,.55)',marginTop:4}}>Numele și prenumele persoanei care vă va însoți.</p>
              </div>

              {/* Copii */}
              <div>
                <label style={{display:'block',fontFamily:"'EB Garamond',serif",fontSize:13,fontStyle:'italic',color:'#6B4E2A',marginBottom:8,letterSpacing:'.04em'}}>Veți veni însoțit/ă de copii?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Da','Nu'].map(opt=>(
                    <label key={opt} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'10px 12px',borderRadius:12,border:'1.5px solid rgba(193,127,62,.28)',background:'rgba(255,250,240,.8)',cursor:'pointer',fontFamily:"'EB Garamond',serif",fontSize:13,color:'#4A3728',fontStyle:'italic',transition:'all .2s',userSelect:'none'}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLLabelElement).style.borderColor='rgba(193,127,62,.7)';(e.currentTarget as HTMLLabelElement).style.background='rgba(193,127,62,.1)'}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLLabelElement).style.borderColor='rgba(193,127,62,.28)';(e.currentTarget as HTMLLabelElement).style.background='rgba(255,250,240,.8)'}}>
                      <input type="radio" name="copii" value={opt} style={{accentColor:'#C17F3E'}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>

              {/* Meniu */}
              <div>
                <label style={{display:'block',fontFamily:"'EB Garamond',serif",fontSize:13,fontStyle:'italic',color:'#6B4E2A',marginBottom:8,letterSpacing:'.04em'}}>Preferințe meniu</label>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {['2x Meniu Normal','2x Meniu Vegetarian','1x Meniu Normal, 1x Meniu Vegetarian'].map(opt=>(
                    <label key={opt} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:12,border:'1.5px solid rgba(193,127,62,.28)',background:'rgba(255,250,240,.8)',cursor:'pointer',fontFamily:"'EB Garamond',serif",fontSize:13,color:'#4A3728',fontStyle:'italic',transition:'all .2s',userSelect:'none'}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLLabelElement).style.borderColor='rgba(193,127,62,.7)';(e.currentTarget as HTMLLabelElement).style.background='rgba(193,127,62,.1)'}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLLabelElement).style.borderColor='rgba(193,127,62,.28)';(e.currentTarget as HTMLLabelElement).style.background='rgba(255,250,240,.8)'}}>
                      <input type="radio" name="meniu" value={opt} style={{accentColor:'#C17F3E',flexShrink:0}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>

              {/* Cazare */}
              <div>
                <label style={{display:'block',fontFamily:"'EB Garamond',serif",fontSize:13,fontStyle:'italic',color:'#6B4E2A',marginBottom:8,letterSpacing:'.04em'}}>Aveți nevoie de cazare?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Nu','Da'].map(opt=>(
                    <label key={opt} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'10px 12px',borderRadius:12,border:'1.5px solid rgba(193,127,62,.28)',background:'rgba(255,250,240,.8)',cursor:'pointer',fontFamily:"'EB Garamond',serif",fontSize:13,color:'#4A3728',fontStyle:'italic',transition:'all .2s',userSelect:'none'}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLLabelElement).style.borderColor='rgba(193,127,62,.7)';(e.currentTarget as HTMLLabelElement).style.background='rgba(193,127,62,.1)'}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLLabelElement).style.borderColor='rgba(193,127,62,.28)';(e.currentTarget as HTMLLabelElement).style.background='rgba(255,250,240,.8)'}}>
                      <input type="radio" name="cazare" value={opt} style={{accentColor:'#C17F3E'}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* Submit demo */}
            <div style={{marginTop:22,textAlign:'center'}}>
              <button onClick={()=>setModal(false)} style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:8,padding:'13px 36px',borderRadius:100,background:'linear-gradient(135deg,#8B6343,#6B4E2A)',color:'#F5EDD8',fontSize:14,fontFamily:"'EB Garamond',serif",fontStyle:'italic',letterSpacing:'.1em',border:'none',cursor:'pointer',boxShadow:'0 8px 28px rgba(139,99,67,.32)',width:'100%',transition:'transform .2s,box-shadow .2s'}}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 14px 40px rgba(139,99,67,.45)'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 8px 28px rgba(139,99,67,.32)'}}>
                ✦ Trimite Confirmarea ✦
              </button>
              <div style={{marginTop:18,padding:'14px 16px',background:'rgba(193,127,62,.06)',border:'1px solid rgba(193,127,62,.18)',borderRadius:12}}>
                <p style={{fontFamily:"'EB Garamond',serif",fontSize:13,fontStyle:'italic',color:'#8B6343',lineHeight:1.75}}>
                  Mulțumim! 🌿<br/>
                  Aceasta este o demonstrație a temei <strong style={{color:'#6B4E2A',fontStyle:'normal'}}>Boho</strong>.<br/>
                  Achiziționează pachetul pentru a activa confirmările.
                </p>
              </div>
              <button onClick={()=>setModal(false)} style={{marginTop:12,background:'none',border:'none',cursor:'pointer',fontFamily:"'EB Garamond',serif",fontSize:12,fontStyle:'italic',color:'rgba(139,99,67,.55)',letterSpacing:'.06em',textDecoration:'underline'}}>
                Închide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadModal&&(
        <div onClick={()=>setUploadModal(false)} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(74,55,40,.55)',backdropFilter:'blur(10px)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,animation:'bh-fadeIn .28s ease'}}>
          <div onClick={e=>e.stopPropagation()} style={{background:'linear-gradient(165deg,#FEFAF0,#F5EDD8)',borderRadius:28,padding:'40px 32px',maxWidth:380,width:'100%',border:'1.5px solid rgba(193,127,62,.25)',boxShadow:'0 40px 100px rgba(74,55,40,.35)',textAlign:'center',animation:'bh-slideUp .32s cubic-bezier(.4,0,.2,1)'}}>
            <div style={{display:'flex',justifyContent:'center',marginBottom:12}}><CameraBoho/></div>
            <h2 style={{fontFamily:"'Dancing Script',cursive",fontSize:30,color:'#4A3728',marginBottom:10}}>Încarcă pozele! 📸</h2>
            <div style={{width:36,height:1,background:'rgba(193,127,62,.4)',margin:'0 auto 14px'}}/>
            <p style={{fontFamily:"'EB Garamond',serif",fontSize:14,fontStyle:'italic',color:'#8B6343',marginBottom:24,lineHeight:1.8}}>
              Aceasta este o demonstrație a temei <strong style={{color:'#6B4E2A',fontStyle:'normal'}}>Boho</strong>.<br/>
              Funcția de upload foto este disponibilă după achiziționarea pachetului.
            </p>
            <button onClick={()=>setUploadModal(false)} style={{padding:'12px 36px',borderRadius:100,background:'linear-gradient(135deg,#8B6343,#6B4E2A)',color:'#F5EDD8',fontSize:13,fontFamily:"'EB Garamond',serif",fontStyle:'italic',letterSpacing:'.1em',border:'none',cursor:'pointer',boxShadow:'0 6px 24px rgba(139,99,67,.3)'}}>Închide</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('envelope')

  // ─── SEO: inject JSON-LD + meta tags în <head> ───────────────────────────
  useEffect(() => {
    // Title
    document.title = 'Invitații Nuntă Online | Demo Stil Boho — VibeInvite'

    // Meta description
    let desc = document.querySelector('meta[name="description"]')
    if (!desc) { desc = document.createElement('meta'); desc.setAttribute('name','description'); document.head.appendChild(desc) }
    desc.setAttribute('content','Invitație digitală de nuntă în stil Boho — caldă, naturală, artistică. Crează-ți invitația online în 3 minute. RSVP instant, link free, GPS inclus, upload poze invitați nuntă.')

    // Meta keywords
    let kw = document.querySelector('meta[name="keywords"]')
    if (!kw) { kw = document.createElement('meta'); kw.setAttribute('name','keywords'); document.head.appendChild(kw) }
    kw.setAttribute('content','invitatii nunta online, invitatii nunta digitale, invitatie nunta boho, invitatie online free, link invitatie nunta, invitatii digitale nunta romania, creare invitatie nunta online, invitatie nunta ieftina, RSVP nunta online, confirmare prezenta nunta, invitatii nunta personalizate, invitatie digitala boho, invitatii botez online, invitatie nunta QR, upload poze nunta, meniu nunta QR, vibeinvite, invitatii nunta moderne, invitatie nunta naturala, invitatie nunta stil rustic')

    // OG tags
    const ogTags: Record<string,string> = {
      'og:title': 'Invitații Nuntă Online — Stil Boho | VibeInvite Demo',
      'og:description': 'Demo invitație digitală de nuntă în stil Boho. Caldă, naturală, handcrafted. RSVP instant, GPS, upload poze invitați.',
      'og:type': 'website',
      'og:url': 'https://vibeinvite.ro/invitatii-digitale/demo/BahoDemo',
      'og:site_name': 'VibeInvite',
      'og:image': 'https://vibeinvite.ro/og-baho.jpg',
      'og:locale': 'ro_RO',
    }
    Object.entries(ogTags).forEach(([prop,content]) => {
      let el = document.querySelector(`meta[property="${prop}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute('property',prop); document.head.appendChild(el) }
      el.setAttribute('content',content)
    })

    // Twitter tags
    const twTags: Record<string,string> = {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'Invitații Nuntă Online Boho — VibeInvite',
      'twitter:description': 'Invitație digitală de nuntă în stil Boho. Naturală, caldă, artistică. RSVP, GPS, upload poze.',
      'twitter:image': 'https://vibeinvite.ro/og-baho.jpg',
    }
    Object.entries(twTags).forEach(([name,content]) => {
      let el = document.querySelector(`meta[name="${name}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute('name',name); document.head.appendChild(el) }
      el.setAttribute('content',content)
    })

    // Canonical
    let canon = document.querySelector('link[rel="canonical"]')
    if (!canon) { canon = document.createElement('link'); canon.setAttribute('rel','canonical'); document.head.appendChild(canon) }
    canon.setAttribute('href','https://vibeinvite.ro/invitatii-digitale/demo/BahoDemo')

    // JSON-LD structured data
    const existingLd = document.querySelector('script[data-ld="baho"]')
    if (!existingLd) {
      const ld = document.createElement('script')
      ld.setAttribute('type','application/ld+json')
      ld.setAttribute('data-ld','baho')
      ld.textContent = JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Invitații Nuntă Online — Demo Stil Boho',
          description: 'Demo invitație digitală de nuntă în stil Boho. Naturală, caldă, cu elemente handcrafted. RSVP instant, GPS, upload poze invitați.',
          url: 'https://vibeinvite.ro/invitatii-digitale/demo/BahoDemo',
          inLanguage: 'ro',
          isPartOf: { '@type': 'WebSite', name: 'VibeInvite', url: 'https://vibeinvite.ro' },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://vibeinvite.ro' },
              { '@type': 'ListItem', position: 2, name: 'Invitații Digitale', item: 'https://vibeinvite.ro/invitatii-digitale' },
              { '@type': 'ListItem', position: 3, name: 'Demo Stil Boho', item: 'https://vibeinvite.ro/invitatii-digitale/demo/BahoDemo' },
            ],
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'VibeInvite — Invitații Digitale',
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'Web, iOS, Android',
          description: 'Platformă de creare invitații digitale pentru nuntă și botez. RSVP online, GPS, meniu QR, upload poze invitați, export Excel.',
          url: 'https://vibeinvite.ro',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'RON', description: 'Link invitație online gratuit' },
          aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '1240' },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'Cum creez o invitație de nuntă online?', acceptedAnswer: { '@type': 'Answer', text: 'Pe VibeInvite poți crea o invitație digitală în 3 minute. Alegi stilul, completezi detaliile și primești un link personalizat gratuit.' } },
            { '@type': 'Question', name: 'Invitațiile digitale de nuntă sunt gratuite?', acceptedAnswer: { '@type': 'Answer', text: 'Da, linkul de invitație online este gratuit. Pachetele premium includ RSVP, meniu QR, upload poze invitați și export Excel.' } },
            { '@type': 'Question', name: 'Ce este stilul Boho pentru invitații de nuntă?', acceptedAnswer: { '@type': 'Answer', text: 'Stilul Boho este natural, cald și artistic. Folosește elemente handcrafted, culori pământii, floricele sălbatice și fonturi cursive pentru o atmosferă relaxată și autentică.' } },
            { '@type': 'Question', name: 'Pot colecta poze de la invitați în ziua nunții?', acceptedAnswer: { '@type': 'Answer', text: 'Da! VibeInvite include o funcție de upload foto prin care invitații pot încărca poze direct din telefon în ziua evenimentului. Mirii accesează toate imaginile într-un album privat.' } },
          ],
        },
      ])
      document.head.appendChild(ld)
    }
  }, [])

  function openEnvelope() {
    if(phase!=='envelope') return
    setPhase('opening')
    setTimeout(()=>setPhase('invite'),1700)
  }
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Dancing+Script:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{height:100%;overflow:hidden;-webkit-font-smoothing:antialiased;}
        body{font-family:'EB Garamond',serif;background:#EDE0C4;color:#4A3728;}
        @keyframes bh-fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bh-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes bh-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes bh-pulse{0%,100%{opacity:.45}50%{opacity:.9}}
        @keyframes bh-shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
        @keyframes bh-fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes bh-slideUp{from{opacity:0;transform:scale(.92) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
      `}</style>

      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:200,height:56,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 clamp(14px,4vw,24px)',background:'rgba(237,224,196,.94)',borderBottom:'1px solid rgba(193,127,62,.18)',backdropFilter:'blur(12px)'}}>
        <a href="/invitatii-digitale" style={{fontFamily:"'Dancing Script',cursive",fontSize:20,fontWeight:700,color:'#6B4E2A',textDecoration:'none',transition:'color .2s'}}
          onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.color='#C17F3E'}
          onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.color='#6B4E2A'}>
          Vibe<span style={{color:'#C17F3E'}}>Invite</span>
        </a>
        <div style={{fontFamily:"'Dancing Script',cursive",fontSize:15,color:'#8B6343',letterSpacing:'.04em'}}>
          {phase==='invite'?'Ioana & Mihai · 3 Mai 2027':'Invitație Boho'}
        </div>
        <a href="/invitatii-digitale" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:100,background:'rgba(139,99,67,.1)',border:'1px solid rgba(139,99,67,.22)',color:'#6B4E2A',textDecoration:'none',fontFamily:"'EB Garamond',serif",fontSize:13,fontStyle:'italic',letterSpacing:'.06em',cursor:'pointer',transition:'all .2s'}}
          onMouseEnter={e=>{const b=e.currentTarget as HTMLAnchorElement;b.style.background='rgba(139,99,67,.18)';b.style.borderColor='rgba(139,99,67,.38)'}}
          onMouseLeave={e=>{const b=e.currentTarget as HTMLAnchorElement;b.style.background='rgba(139,99,67,.1)';b.style.borderColor='rgba(139,99,67,.22)'}}>
          <BackArrow/> Înapoi
        </a>
      </header>

      {phase!=='invite'&&<EnvelopeScreen onOpen={openEnvelope} phase={phase}/>}
      {phase==='invite'&&<InviteScreen onBack={()=>setPhase('envelope')}/>}
    </>
  )
}
