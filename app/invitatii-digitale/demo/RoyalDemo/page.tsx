'use client'

import { useState, useEffect } from 'react'

/* ════════════════════════════════
   SEO
════════════════════════════════ */
function useSEO() {
  useEffect(() => {
    document.title = 'Invitații Nuntă Online | Demo Stil Royal — VibeInvite'
    const m = (sel:string,attr:string,val:string,content:string) => {
      let el = document.querySelector(sel)
      if (!el) { el=document.createElement('meta'); el.setAttribute(attr,val); document.head.appendChild(el) }
      el.setAttribute('content',content)
    }
    m('meta[name="description"]','name','description','Invitație digitală de nuntă în stil Royal — albastru regal, argint, catifea, inspirat din palatele europene. Crează-ți invitația online în 3 minute. RSVP instant, link free, GPS, upload poze nuntă.')
    m('meta[name="keywords"]','name','keywords','invitatii nunta online, invitatii nunta royal, invitatii nunta regale, invitatie nunta albastru, invitatie nunta argintie, invitatie nunta eleganta, invitatie nunta palat, invitatie online free, link invitatie nunta, invitatii digitale nunta romania, creare invitatie nunta online, invitatie nunta premium, RSVP nunta online, confirmare prezenta nunta, invitatii nunta personalizate, upload poze nunta, vibeinvite, invitatii nunta regale, invitatie nunta catifea, invitatie nunta albastra, invitatii nunta europene')
    m('meta[property="og:title"]','property','og:title','Invitații Nuntă Online Royal — VibeInvite Demo')
    m('meta[property="og:description"]','property','og:description','Demo invitație digitală de nuntă în stil Royal. Albastru regal, argint, catifea, palate europene. RSVP instant, GPS, upload poze invitați.')
    m('meta[property="og:type"]','property','og:type','website')
    m('meta[property="og:url"]','property','og:url','https://vibeinvite.ro/invitatii-digitale/demo/RoyalDemo')
    m('meta[property="og:site_name"]','property','og:site_name','VibeInvite')
    m('meta[property="og:image"]','property','og:image','https://vibeinvite.ro/og-royal.jpg')
    m('meta[property="og:locale"]','property','og:locale','ro_RO')
    m('meta[name="twitter:card"]','name','twitter:card','summary_large_image')
    m('meta[name="twitter:title"]','name','twitter:title','Invitații Nuntă Online Royal — VibeInvite')
    m('meta[name="twitter:description"]','name','twitter:description','Invitație digitală de nuntă Royal. Albastru regal, argint, catifea. RSVP, GPS, upload poze.')
    m('meta[name="twitter:image"]','name','twitter:image','https://vibeinvite.ro/og-royal.jpg')
    let canon = document.querySelector('link[rel="canonical"]')
    if (!canon) { canon=document.createElement('link'); canon.setAttribute('rel','canonical'); document.head.appendChild(canon) }
    canon.setAttribute('href','https://vibeinvite.ro/invitatii-digitale/demo/RoyalDemo')
    if (!document.querySelector('script[data-ld="royal"]')) {
      const ld = document.createElement('script')
      ld.setAttribute('type','application/ld+json')
      ld.setAttribute('data-ld','royal')
      ld.textContent = JSON.stringify([
        { '@context':'https://schema.org','@type':'WebPage', name:'Invitații Nuntă Online — Demo Stil Royal', description:'Demo invitație digitală de nuntă în stil Royal. Albastru regal, argint, catifea, palatele europene.', url:'https://vibeinvite.ro/invitatii-digitale/demo/RoyalDemo', inLanguage:'ro', isPartOf:{ '@type':'WebSite',name:'VibeInvite',url:'https://vibeinvite.ro'}, breadcrumb:{ '@type':'BreadcrumbList', itemListElement:[{ '@type':'ListItem',position:1,name:'Acasă',item:'https://vibeinvite.ro'},{ '@type':'ListItem',position:2,name:'Invitații Digitale',item:'https://vibeinvite.ro/invitatii-digitale'},{ '@type':'ListItem',position:3,name:'Demo Stil Royal',item:'https://vibeinvite.ro/invitatii-digitale/demo/RoyalDemo'}]}},
        { '@context':'https://schema.org','@type':'SoftwareApplication', name:'VibeInvite — Invitații Digitale', applicationCategory:'LifestyleApplication', operatingSystem:'Web, iOS, Android', description:'Platformă de creare invitații digitale pentru nuntă și botez. RSVP online, GPS, meniu QR, upload poze invitați, export Excel.', url:'https://vibeinvite.ro', offers:{ '@type':'Offer',price:'0',priceCurrency:'RON',description:'Link invitație online gratuit'}, aggregateRating:{ '@type':'AggregateRating',ratingValue:'4.9',ratingCount:'1240'}},
        { '@context':'https://schema.org','@type':'FAQPage', mainEntity:[
          { '@type':'Question',name:'Ce este stilul Royal pentru invitații de nuntă?',acceptedAnswer:{ '@type':'Answer',text:'Stilul Royal folosește albastru regal profund, argint și detalii de catifea. Este inspirat din palatele europene și potrivit pentru nunți elegante care vor fi povești transmise din generație în generație.'}},
          { '@type':'Question',name:'Cum creez o invitație de nuntă elegantă online?',acceptedAnswer:{ '@type':'Answer',text:'Pe VibeInvite poți crea o invitație digitală elegantă în 3 minute. Alegi tema Royal, completezi detaliile și primești un link personalizat gratuit, gata de trimis pe WhatsApp sau email.'}},
          { '@type':'Question',name:'Pot colecta poze de la invitați în ziua nunții?',acceptedAnswer:{ '@type':'Answer',text:'Da! VibeInvite include o funcție de upload foto prin care invitații pot încărca poze direct din telefon în ziua evenimentului. Mirii accesează toate imaginile într-un album privat.'}},
          { '@type':'Question',name:'Invitațiile digitale sunt potrivite pentru nunți regale?',acceptedAnswer:{ '@type':'Answer',text:'Absolut. Tema Royal de pe VibeInvite îmbină albastrul regal cu accente argintii și tipografie nobilă — perfectă pentru nunți cu atmosferă de palat european.'}},
        ]},
      ])
      document.head.appendChild(ld)
    }
  }, [])
}

/* ════════════════════════════════
   COUNTDOWN
════════════════════════════════ */
function useCountdown(target: Date) {
  const [t, setT] = useState({ d:0,h:0,m:0,s:0 })
  const ms = target.getTime()
  useEffect(() => {
    const tick = () => {
      const diff = ms - Date.now()
      if (diff<=0) { setT({d:0,h:0,m:0,s:0}); return }
      setT({ d:Math.floor(diff/864e5), h:Math.floor((diff%864e5)/36e5), m:Math.floor((diff%36e5)/6e4), s:Math.floor((diff%6e4)/1e3) })
    }
    tick(); const id=setInterval(tick,1000); return ()=>clearInterval(id)
  }, [ms])
  return t
}
const pad = (n:number) => String(n).padStart(2,'0')

/* ════════════════════════════════
   COLORS
════════════════════════════════ */
// Royal palette
const R = {
  navy:    '#0B1929',
  navy2:   '#0F2040',
  navy3:   '#152B52',
  royalBg: '#071220',
  silver:  '#C8D8E8',
  silver2: '#A8BDD0',
  silver3: '#E8F0F8',
  silver4: '#6888A8',
  velvet:  '#1A3060',
  velvet2: '#243870',
  accent:  '#7CA8D8',
  accent2: '#9FBFE8',
  gold:    '#B8A878',
  text:    '#E0EAF5',
  textlt:  '#8AAAC8',
}

/* ════════════════════════════════
   SVG COMPONENTS — Royal / Heraldic
════════════════════════════════ */

// Heraldic crest with fleur-de-lis
const HeraldCrest = ({ size=100 }:{size?:number}) => (
  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:size,height:size*1.2}}>
    <defs>
      <linearGradient id="sg" x1="0" y1="0" x2="100" y2="120" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E8F0F8"/>
        <stop offset="40%" stopColor="#C8D8E8"/>
        <stop offset="70%" stopColor="#9FBFE8"/>
        <stop offset="100%" stopColor="#6888A8" stopOpacity=".7"/>
      </linearGradient>
    </defs>
    {/* Shield shape */}
    <path d="M50 8 L88 20 L88 60 Q88 90 50 112 Q12 90 12 60 L12 20 Z"
      fill="url(#sg)" fillOpacity=".12" stroke="url(#sg)" strokeWidth="1.2"/>
    {/* Inner shield */}
    <path d="M50 16 L82 26 L82 60 Q82 84 50 104 Q18 84 18 60 L18 26 Z"
      fill="none" stroke="url(#sg)" strokeWidth=".6" strokeOpacity=".5"/>

    {/* Fleur-de-lis center */}
    <g transform="translate(50 58)" fill="url(#sg)">
      <path d="M0-20 Q-3-14 0-10 Q3-14 0-20Z" fillOpacity=".9"/>
      <ellipse cx="-6" cy="-6" rx="4" ry="7" fillOpacity=".75" transform="rotate(-20 -6 -6)"/>
      <ellipse cx="6" cy="-6" rx="4" ry="7" fillOpacity=".75" transform="rotate(20 6 -6)"/>
      <path d="M-3-4 L3-4 L2 4 L0 6 L-2 4Z" fillOpacity=".85"/>
      <rect x="-1.5" y="4" width="3" height="10" rx="1" fillOpacity=".7"/>
      <path d="M-8 10 Q0 8 8 10 L6 14 L-6 14Z" fillOpacity=".6"/>
    </g>

    {/* Corner stars */}
    {[[-22,-18],[22,-18],[-22,32],[22,32]].map(([x,y],i) => (
      <g key={i} transform={`translate(${50+x} ${58+y})`} fill="url(#sg)" fillOpacity=".7">
        {[0,72,144,216,288].map(r => (
          <path key={r} d="M0-5 L1-2 L4-2 L2 0 L3 3 L0 1 L-3 3 L-2 0 L-4-2 L-1-2Z"
            transform={`rotate(${r})`} fillOpacity=".6"/>
        ))}
      </g>
    ))}

    {/* Crown on top */}
    <path d="M30 14 L35 6 L42 12 L50 4 L58 12 L65 6 L70 14 L30 14Z"
      fill="url(#sg)" fillOpacity=".85"/>
    <rect x="30" y="12" width="40" height="4" rx="1" fill="url(#sg)" fillOpacity=".7"/>

    {/* Scroll banner at bottom */}
    <path d="M16 102 Q33 98 50 100 Q67 98 84 102 L82 110 Q67 106 50 108 Q33 106 18 110Z"
      fill="url(#sg)" fillOpacity=".18" stroke="url(#sg)" strokeWidth=".8" strokeOpacity=".5"/>
    <text x="50" y="107" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="5"
      fill="url(#sg)" fillOpacity=".7" letterSpacing="2">ROYAL</text>
  </svg>
)

// Palace-style corner frame
const PalaceCorner = ({ flip=false, flipY=false }:{flip?:boolean,flipY?:boolean}) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{transform:`scale(${flip?-1:1},${flipY?-1:1})`,width:'100%',height:'100%'}}>
    <defs>
      <linearGradient id="pcg" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C8D8E8"/>
        <stop offset="50%" stopColor="#9FBFE8"/>
        <stop offset="100%" stopColor="#6888A8" stopOpacity=".3"/>
      </linearGradient>
    </defs>
    {/* Outer frame lines */}
    <path d="M8 8 L8 130 M8 8 L130 8" stroke="url(#pcg)" strokeWidth="1.4" strokeOpacity=".6"/>
    <path d="M18 18 L18 110 M18 18 L110 18" stroke="url(#pcg)" strokeWidth=".8" strokeOpacity=".4"/>
    <path d="M30 30 L30 88 M30 30 L88 30" stroke="url(#pcg)" strokeWidth=".5" strokeOpacity=".3"/>
    {/* Tick marks */}
    <path d="M8 40 L20 40 M8 60 L16 60 M8 80 L16 80 M8 100 L20 100" stroke="url(#pcg)" strokeWidth=".8" strokeOpacity=".5"/>
    <path d="M40 8 L40 20 M60 8 L60 16 M80 8 L80 16 M100 8 L100 20" stroke="url(#pcg)" strokeWidth=".8" strokeOpacity=".5"/>
    {/* Corner ornament */}
    <rect x="2" y="2" width="12" height="12" transform="rotate(45 8 8)" fill="url(#pcg)" fillOpacity=".7"/>
    <rect x="13" y="13" width="8" height="8" transform="rotate(45 18 18)" fill="none" stroke="url(#pcg)" strokeWidth=".8" strokeOpacity=".5"/>
    <circle cx="8" cy="8" r="3" fill={R.royalBg} fillOpacity=".8"/>
    {/* Velvet diagonal fill in corner */}
    <path d="M8 8 Q30 24 48 48" stroke="url(#pcg)" strokeWidth=".5" strokeOpacity=".25" fill="none"/>
    <path d="M8 8 Q24 30 48 48" stroke="url(#pcg)" strokeWidth=".5" strokeOpacity=".2" fill="none"/>
    {/* Small fleur at bend */}
    <g transform="translate(50 50) scale(.55)" fill="url(#pcg)" fillOpacity=".55">
      <path d="M0-10 Q-2-7 0-5 Q2-7 0-10Z"/>
      <ellipse cx="-3" cy="-3" rx="2" ry="4" transform="rotate(-20 -3 -3)"/>
      <ellipse cx="3" cy="-3" rx="2" ry="4" transform="rotate(20 3 -3)"/>
      <rect x="-1" y="2" width="2" height="5" rx=".5"/>
    </g>
  </svg>
)

// Silver divider with heraldic diamond
const SilverDivider = () => (
  <div style={{display:'flex',alignItems:'center',width:'100%',maxWidth:460}}>
    <div style={{flex:1,height:1,background:'linear-gradient(90deg,transparent,rgba(200,216,232,.55))'}}/>
    <svg viewBox="0 0 80 24" width="80" height="24" fill="none">
      <line x1="2" y1="12" x2="22" y2="12" stroke="#C8D8E8" strokeWidth=".8" strokeOpacity=".55"/>
      <line x1="58" y1="12" x2="78" y2="12" stroke="#C8D8E8" strokeWidth=".8" strokeOpacity=".55"/>
      <rect x="30" y="6" width="12" height="12" transform="rotate(45 36 12)" fill="none" stroke="#C8D8E8" strokeWidth="1" strokeOpacity=".85"/>
      <rect x="33" y="9" width="6" height="6" transform="rotate(45 36 12)" fill="#C8D8E8" fillOpacity=".25"/>
      <circle cx="36" cy="12" r="2" fill="#C8D8E8" fillOpacity=".7"/>
      <circle cx="20" cy="12" r="1.2" fill="#C8D8E8" fillOpacity=".45"/>
      <circle cx="52" cy="12" r="1.2" fill="#C8D8E8" fillOpacity=".45"/>
    </svg>
    <div style={{flex:1,height:1,background:'linear-gradient(90deg,rgba(200,216,232,.55),transparent)'}}/>
  </div>
)

// Velvet texture SVG for envelope
const VelvetPattern = () => (
  <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.06}}>
    <filter id="vf"><feTurbulence type="turbulence" baseFrequency=".018" numOctaves="6" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    <rect width="400" height="400" filter="url(#vf)" opacity="1"/>
  </svg>
)

const WazeIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/></svg>)
const MapsIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>)
const PhoneIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>)
const WaIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>)
const BackArrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>)

type Phase = 'envelope' | 'opening' | 'invite'

/* ════════════════════════════════
   ENVELOPE SCREEN
════════════════════════════════ */
function EnvelopeScreen({ onOpen, phase }:{onOpen:()=>void,phase:Phase}) {
  return (
    <div style={{position:'fixed',inset:0,top:56,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
      {/* Deep royal blue background */}
      <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse 85% 75% at 50% 40%,${R.navy} 0%,${R.royalBg} 55%,#040D18 100%)`}}/>
      {/* Silver shimmer ambient */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 55% 45% at 22% 22%,rgba(160,192,230,.07) 0%,transparent 55%), radial-gradient(ellipse 45% 38% at 78% 78%,rgba(124,168,216,.06) 0%,transparent 55%)'}}/>
      {/* Velvet micro-texture */}
      <div style={{position:'absolute',inset:0,opacity:.04,backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='v'%3E%3CfeTurbulence type='turbulence' baseFrequency='.025' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23v)' opacity='1'/%3E%3C/svg%3E\")"}}/>

      {/* Palace corners */}
      <div style={{position:'absolute',top:0,left:0,width:'min(200px,22vw)',height:'min(200px,22vw)',opacity:.65,pointerEvents:'none'}}><PalaceCorner/></div>
      <div style={{position:'absolute',top:0,right:0,width:'min(200px,22vw)',height:'min(200px,22vw)',opacity:.65,pointerEvents:'none'}}><PalaceCorner flip/></div>
      <div style={{position:'absolute',bottom:0,left:0,width:'min(180px,20vw)',height:'min(180px,20vw)',opacity:.55,pointerEvents:'none'}}><PalaceCorner flipY/></div>
      <div style={{position:'absolute',bottom:0,right:0,width:'min(180px,20vw)',height:'min(180px,20vw)',opacity:.55,pointerEvents:'none'}}><PalaceCorner flip flipY/></div>

      {/* Silver horizontal rules */}
      <div style={{position:'absolute',top:'11%',left:'5%',right:'5%',height:1,background:'linear-gradient(90deg,transparent,rgba(200,216,232,.22),transparent)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:'11%',left:'5%',right:'5%',height:1,background:'linear-gradient(90deg,transparent,rgba(200,216,232,.22),transparent)',pointerEvents:'none'}}/>

      {/* Center content */}
      <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',gap:16,padding:'20px 24px'}}>

        {/* Crest */}
        <div style={{animation:'ry-fadeUp .65s ease both',marginBottom:-4}}>
          <HeraldCrest size={88}/>
        </div>

        <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(8px,.95vw,10px)',letterSpacing:'.42em',textTransform:'uppercase',color:`${R.silver2}`,opacity:.75,animation:'ry-fadeUp .7s ease both .05s'}}>
          Invitație Regală · de Nuntă
        </p>

        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(28px,4.2vw,52px)',fontWeight:300,fontStyle:'italic',color:R.silver3,textAlign:'center',lineHeight:1.18,animation:'ry-fadeUp .8s ease both .1s',margin:0,textShadow:`0 0 50px rgba(124,168,216,.35)`}}>
          <strong style={{fontWeight:600,fontStyle:'normal',color:R.silver3}}>Elisabeta</strong>
          <span style={{color:R.silver4,fontWeight:300,fontSize:'.72em',display:'block',margin:'3px 0',letterSpacing:'.25em',fontStyle:'normal'}}>&amp;</span>
          <strong style={{fontWeight:600,fontStyle:'normal',color:R.silver3}}>Alexandru</strong>
        </h1>

        {/* ENVELOPE */}
        <div onClick={onOpen} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&onOpen()}
          style={{animation:'ry-envFloat 5.5s ease-in-out infinite, ry-fadeUp .9s ease both .18s',position:'relative',width:'clamp(290px,44vw,540px)',cursor:'pointer',userSelect:'none',filter:`drop-shadow(0 40px 80px rgba(4,18,40,.85)) drop-shadow(0 0 40px rgba(124,168,216,.12))`}}>

          {/* Ambient floor shadow */}
          <div style={{position:'absolute',bottom:-22,left:'8%',right:'8%',height:26,background:'radial-gradient(ellipse,rgba(124,168,216,.15) 0%,transparent 70%)',filter:'blur(14px)',zIndex:0}}/>

          {/* LETTER inside */}
          <div style={{
            position:'absolute',left:'8%',right:'8%',bottom:'4%',height:'62%',
            zIndex:phase==='opening'?30:2,
            background:`linear-gradient(170deg,${R.navy2} 0%,${R.navy} 100%)`,
            border:`1px solid rgba(200,216,232,.3)`,
            borderRadius:4,
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:10,
            boxShadow:phase==='opening'?`0 40px 100px rgba(4,18,40,.95),0 0 60px rgba(124,168,216,.18)`:' 0 2px 8px rgba(0,0,0,.5)',
            transform:phase==='opening'?'translateY(-148%) scale(1.06) rotate(-0.5deg)':'translateY(0)',
            transition:'transform 1.4s cubic-bezier(.22,.1,.2,1) .2s,box-shadow 1.4s ease .2s',
            overflow:'hidden',
          }}>
            {/* Silver filigree lines */}
            <div style={{position:'absolute',inset:0,opacity:.06,backgroundImage:`repeating-linear-gradient(0deg,${R.silver} 0,${R.silver} 1px,transparent 1px,transparent 30px)`}}/>
            <div style={{position:'absolute',top:8,left:8,right:8,bottom:8,border:`1px solid rgba(200,216,232,.18)`,borderRadius:2}}/>
            <div style={{textAlign:'center',padding:'0 20px',position:'relative',zIndex:1}}>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(15px,2.6vw,26px)',fontStyle:'italic',fontWeight:300,color:R.silver,lineHeight:1.2,letterSpacing:'.05em'}}>
                Elisabeta &amp; Alexandru
              </p>
              <div style={{width:40,height:1,background:`linear-gradient(90deg,transparent,${R.silver2},transparent)`,margin:'10px auto'}}/>
              <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(7px,.85vw,9px)',letterSpacing:'.32em',textTransform:'uppercase',color:R.silver4,fontWeight:400}}>
                3 Mai 2027 · Palatul Regal
              </p>
            </div>
          </div>

          {/* ENVELOPE BODY */}
          <div style={{width:'100%',paddingTop:'60%',position:'relative',zIndex:5}}>
            <div style={{position:'absolute',inset:0,background:R.velvet,borderRadius:6,border:`1px solid rgba(200,216,232,.24)`,boxShadow:`0 8px 40px rgba(4,18,40,.85),inset 0 1px 0 rgba(200,216,232,.12)`,overflow:'hidden'}}>
              <VelvetPattern/>
              {/* Side triangles */}
              <div style={{position:'absolute',top:0,bottom:0,left:0,width:'50%',background:`linear-gradient(160deg,${R.velvet2},${R.velvet})`,clipPath:'polygon(0 0,0 100%,100% 100%)'}}/>
              <div style={{position:'absolute',top:0,bottom:0,right:0,width:'50%',background:`linear-gradient(200deg,${R.velvet2},${R.velvet})`,clipPath:'polygon(100% 0,0 100%,100% 100%)'}}/>
              {/* Bottom V */}
              <div style={{position:'absolute',bottom:0,left:0,right:0,height:'50%',background:`linear-gradient(180deg,${R.navy3},${R.navy})`,clipPath:'polygon(0 100%,50% 0,100% 100%)'}}/>
              {/* Silver top edge */}
              <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,rgba(200,216,232,.45),transparent)`}}/>
            </div>

            {/* WAX SEAL — royal blue with silver */}
            <div style={{
              position:'absolute',top:'50%',left:'50%',
              transform:'translate(-50%,-52%)',
              width:'clamp(54px,9vw,84px)',height:'clamp(54px,9vw,84px)',
              background:`radial-gradient(circle at 35% 35%,${R.silver3} 0%,${R.silver} 35%,${R.silver4} 70%,${R.navy3} 100%)`,
              borderRadius:'50%',
              border:`2px solid rgba(200,216,232,.55)`,
              display:'flex',alignItems:'center',justifyContent:'center',
              boxShadow:`0 0 0 6px rgba(124,168,216,.1),0 0 0 12px rgba(124,168,216,.05),0 8px 30px rgba(4,18,40,.85)`,
              zIndex:10,
              opacity:phase==='opening'?0:1,
              transition:'opacity .25s',
            }}>
              <div style={{position:'absolute',inset:-8,border:`1px solid rgba(200,216,232,.28)`,borderRadius:'50%',borderStyle:'dashed',animation:'ry-spin 28s linear infinite'}}/>
              <div style={{position:'absolute',inset:-14,border:`1px solid rgba(200,216,232,.1)`,borderRadius:'50%'}}/>
              <div style={{position:'relative',zIndex:1}}>
                <HeraldCrest size={32}/>
              </div>
            </div>

            {/* FLAP — deep royal blue */}
            <div style={{
              position:'absolute',top:0,left:0,right:0,zIndex:8,height:'52%',
              background:`linear-gradient(160deg,${R.navy3},${R.navy2})`,
              clipPath:'polygon(0 0,100% 0,50% 100%)',
              transformOrigin:'top center',
              transform:phase==='opening'?'perspective(800px) rotateX(192deg)':'perspective(800px) rotateX(0deg)',
              transition:'transform 1.05s cubic-bezier(.4,0,.2,1)',
              borderBottom:`1px solid rgba(200,216,232,.22)`,
            }}>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(160deg,rgba(124,168,216,.08) 0%,transparent 50%)'}}/>
            </div>
          </div>
        </div>

        <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(8px,.95vw,10px)',letterSpacing:'.28em',textTransform:'uppercase',color:R.silver4,animation:phase==='opening'?'none':'ry-fadeUp 1s ease both .35s, ry-pulse 3s ease-in-out infinite 1.3s',opacity:phase==='opening'?.7:undefined}}>
          {phase==='opening'?'✦  Dezvăluind invitația regală  ✦':'Atinge pentru a deschide'}
        </p>
      </div>
    </div>
  )
}

/* ════════════════════════════════
   INVITE SCREEN
════════════════════════════════ */
function InviteScreen({ onBack:_onBack }:{onBack:()=>void}) {
  const WEDDING = new Date('2027-05-03T15:00:00')
  const [modal, setModal] = useState(false)
  const [uploadModal, setUploadModal] = useState(false)
  const [vis, setVis] = useState(false)
  const cd = useCountdown(WEDDING)
  const [flipS, setFlipS] = useState(false)

  useEffect(()=>{ const t=setTimeout(()=>setVis(true),60); return()=>clearTimeout(t) },[])
  useEffect(()=>{ setFlipS(true); const t=setTimeout(()=>setFlipS(false),160); return()=>clearTimeout(t) },[cd.s])

  const a=(d:number):React.CSSProperties=>({ opacity:vis?1:0, transform:vis?'translateY(0)':'translateY(22px)', transition:`opacity .75s ease ${d}s,transform .75s ease ${d}s` })

  const locCard:React.CSSProperties={ borderRadius:16, overflow:'hidden', border:`1px solid rgba(200,216,232,.18)`, background:`rgba(15,32,64,.6)`, backdropFilter:'blur(14px)', boxShadow:`0 8px 40px rgba(4,18,40,.6)`, transition:'transform .25s ease,box-shadow .25s ease' }
  const btn:React.CSSProperties={ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, padding:'9px 14px', borderRadius:8, fontFamily:"'Cinzel',serif", fontSize:10, fontWeight:600, letterSpacing:'.12em', cursor:'default', flex:1, whiteSpace:'nowrap' }
  const inputS:React.CSSProperties={ width:'100%', padding:'10px 14px', borderRadius:8, border:`1px solid rgba(200,216,232,.22)`, background:`rgba(15,32,64,.5)`, fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:R.silver, outline:'none' }
  const radioL:React.CSSProperties={ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'10px 10px', borderRadius:8, border:`1px solid rgba(200,216,232,.18)`, background:`rgba(15,32,64,.4)`, cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'.1em', color:R.silver2, transition:'all .2s', userSelect:'none' }

  return (
    <div style={{position:'fixed',inset:0,top:56,overflowY:'auto',overflowX:'hidden'}}>
      {/* Fixed royal bg */}
      <div style={{position:'fixed',inset:0,background:`radial-gradient(ellipse 90% 80% at 50% 30%,${R.navy} 0%,${R.royalBg} 55%,#040D18 100%)`,zIndex:0}}/>
      <div style={{position:'fixed',inset:0,background:`radial-gradient(ellipse 60% 50% at 15% 20%,rgba(124,168,216,.07) 0%,transparent 55%),radial-gradient(ellipse 50% 45% at 85% 80%,rgba(124,168,216,.06) 0%,transparent 55%)`,zIndex:1,pointerEvents:'none'}}/>
      <div style={{position:'fixed',inset:0,opacity:.04,zIndex:1,pointerEvents:'none',backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='v'%3E%3CfeTurbulence type='turbulence' baseFrequency='.022' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23v)' opacity='1'/%3E%3C/svg%3E\")"}}/>

      {/* Fixed palace corners */}
      <div style={{position:'fixed',top:0,left:0,width:'min(180px,20vw)',height:'min(180px,20vw)',opacity:.6,pointerEvents:'none',zIndex:2}}><PalaceCorner/></div>
      <div style={{position:'fixed',top:0,right:0,width:'min(180px,20vw)',height:'min(180px,20vw)',opacity:.6,pointerEvents:'none',zIndex:2}}><PalaceCorner flip/></div>
      <div style={{position:'fixed',bottom:0,left:0,width:'min(160px,18vw)',height:'min(160px,18vw)',opacity:.5,pointerEvents:'none',zIndex:2}}><PalaceCorner flipY/></div>
      <div style={{position:'fixed',bottom:0,right:0,width:'min(160px,18vw)',height:'min(160px,18vw)',opacity:.5,pointerEvents:'none',zIndex:2}}><PalaceCorner flip flipY/></div>
      <div style={{position:'fixed',top:'7%',left:'4%',right:'4%',height:1,background:'linear-gradient(90deg,transparent,rgba(200,216,232,.18),transparent)',zIndex:2,pointerEvents:'none'}}/>

      <div style={{position:'relative',zIndex:10,maxWidth:720,margin:'0 auto',padding:'clamp(36px,6vw,64px) clamp(16px,4vw,32px) 60px',display:'flex',flexDirection:'column',alignItems:'center',gap:0}}>

        {/* Crest top */}
        <div style={{...a(0),marginBottom:8}}><HeraldCrest size={80}/></div>

        <p style={{...a(.06),fontFamily:"'Cinzel',serif",fontSize:'clamp(8px,.95vw,10px)',letterSpacing:'.4em',textTransform:'uppercase',color:R.silver4,opacity:vis?.7:0,marginBottom:12}}>
          Cu Onoare Regală Vă Invităm
        </p>

        {/* NAMES */}
        <div style={{...a(.1),textAlign:'center',marginBottom:6}}>
          <span style={{display:'block',fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(52px,9.5vw,108px)',fontWeight:600,fontStyle:'italic',color:R.silver3,lineHeight:.92,letterSpacing:'-.01em',textShadow:`0 0 60px rgba(124,168,216,.3)`}}>
            Elisabeta
          </span>
          <span style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:'clamp(13px,1.8vw,20px)',fontWeight:400,color:R.silver4,margin:'8px 0',letterSpacing:'.32em'}}>
            &amp;
          </span>
          <span style={{display:'block',fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(52px,9.5vw,108px)',fontWeight:600,fontStyle:'italic',color:R.silver3,lineHeight:.92,letterSpacing:'-.01em',textShadow:`0 0 60px rgba(124,168,216,.3)`}}>
            Alexandru
          </span>
        </div>

        <div style={{...a(.18),display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:460,margin:'22px auto'}}><SilverDivider/></div>

        {/* DATE */}
        <div style={{...a(.22),textAlign:'center',marginBottom:20}}>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(13px,1.7vw,17px)',letterSpacing:'.2em',color:R.silver,fontWeight:400,marginBottom:6}}>
            Duminică, 3 Mai 2027
          </p>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(13px,1.6vw,17px)',fontStyle:'italic',fontWeight:300,color:R.textlt,letterSpacing:'.06em'}}>
            București, România
          </p>
        </div>

        {/* Nași */}
        <div style={{...a(.27),textAlign:'center',padding:'22px 32px',border:`1px solid rgba(200,216,232,.18)`,borderRadius:16,background:`rgba(15,32,64,.5)`,backdropFilter:'blur(10px)',maxWidth:380,width:'100%',position:'relative',boxShadow:`0 4px 40px rgba(4,18,40,.5),inset 0 1px 0 rgba(200,216,232,.1)`,marginBottom:0}}>
          {['topleft','topright','bottomleft','bottomright'].map(pos=>(
            <div key={pos} style={{position:'absolute',top:pos.includes('top')?8:'auto',bottom:pos.includes('bottom')?8:'auto',left:pos.includes('left')?8:'auto',right:pos.includes('right')?8:'auto',width:12,height:12,borderTop:pos.includes('top')?`1px solid rgba(200,216,232,.45)`:'none',borderBottom:pos.includes('bottom')?`1px solid rgba(200,216,232,.45)`:'none',borderLeft:pos.includes('left')?`1px solid rgba(200,216,232,.45)`:'none',borderRight:pos.includes('right')?`1px solid rgba(200,216,232,.45)`:'none'}}/>
          ))}
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(12px,1.4vw,14px)',fontStyle:'italic',color:R.textlt,marginBottom:8,letterSpacing:'.06em'}}>Alături de nașii noștri</p>
          <div style={{width:32,height:1,background:`linear-gradient(90deg,transparent,rgba(200,216,232,.5),transparent)`,margin:'0 auto 10px'}}/>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(20px,2.5vw,26px)',fontStyle:'italic',fontWeight:300,color:R.silver3,letterSpacing:'.04em'}}>Maria &amp; Victor</p>
        </div>

        <div style={{...a(.32),display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:460,margin:'24px auto'}}><SilverDivider/></div>

        {/* COUNTDOWN */}
        <div style={{...a(.36),width:'100%',maxWidth:480,background:`rgba(15,32,64,.5)`,border:`1px solid rgba(200,216,232,.16)`,borderRadius:20,padding:'24px 20px',boxShadow:`0 8px 50px rgba(4,18,40,.6),inset 0 1px 0 rgba(200,216,232,.08)`,textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:'10%',right:'10%',height:1,background:`linear-gradient(90deg,transparent,rgba(200,216,232,.4),transparent)`}}/>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(7px,.85vw,9px)',letterSpacing:'.3em',textTransform:'uppercase',color:R.textlt,marginBottom:18}}>Timp Rămas Până La Marea Sărbătoare</p>
          <div style={{display:'flex',gap:0,justifyContent:'center'}}>
            {[{n:pad(cd.d),l:'Zile'},{n:pad(cd.h),l:'Ore'},{n:pad(cd.m),l:'Minute'},{n:pad(cd.s),l:'Secunde',flip:flipS}].map(u=>(
              <div key={u.l} style={{flex:1,maxWidth:112,textAlign:'center',padding:'0 6px',borderRight:`1px solid rgba(200,216,232,.1)`}}>
                <span style={{display:'block',fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(36px,5.8vw,62px)',fontWeight:300,lineHeight:1,transition:'transform .15s ease,color .15s ease',transform:(u as any).flip?'scale(1.08) translateY(-3px)':'scale(1)',color:(u as any).flip?R.silver3:R.silver,textShadow:(u as any).flip?`0 0 20px rgba(124,168,216,.4)`:'none'}}>{u.n}</span>
                <span style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(6px,.78vw,8px)',letterSpacing:'.18em',textTransform:'uppercase',color:R.silver4,display:'block',marginTop:4}}>{u.l}</span>
              </div>
            ))}
          </div>
          <div style={{position:'absolute',bottom:0,left:'10%',right:'10%',height:1,background:`linear-gradient(90deg,transparent,rgba(200,216,232,.4),transparent)`}}/>
        </div>

        <div style={{...a(.42),display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:460,margin:'24px auto'}}><SilverDivider/></div>

        {/* LOCATION CARDS */}
        <div style={{...a(.46),width:'100%',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,258px),1fr))',gap:'clamp(12px,2vw,20px)',maxWidth:650}}>
          {[
            {type:'Ceremonia Religioasă',name:'Cununia Regală',venue:'Catedrala Patriarhală',addr:'Dealul Mitropoliei, București',time:'15:00',
              icon:<svg viewBox="0 0 24 24" fill="none" stroke={R.silver} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M12 2L12 6M10 4h4"/><rect x="4" y="9" width="16" height="12" rx="1"/><path d="M9 21V14a3 3 0 0 1 6 0v7"/><path d="M4 9l8-4 8 4"/></svg>},
            {type:'Recepție Regală',name:'Banchetul Palatului',venue:'Palatul Mogoșoaia',addr:'Calea Mogoșoaia, București',time:'19:00',
              icon:<svg viewBox="0 0 24 24" fill="none" stroke={R.silver} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M8 18c0 1.65-1.35 3-3 3s-3-1.35-3-3c0-2 3-6 3-6s3 4 3 6z"/><path d="M5 12V4"/><path d="M19 14c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.5 2-4 2-4s2 2.5 2 4z"/><path d="M17 10V6"/><path d="M12 8l2-2M12 8l-2-2M12 8v4"/><circle cx="12" cy="14" r=".8" fill={R.silver} stroke="none"/></svg>},
          ].map(card=>(
            <div key={card.type} style={locCard}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)';(e.currentTarget as HTMLDivElement).style.boxShadow=`0 20px 60px rgba(4,18,40,.75),0 0 30px rgba(124,168,216,.12)`}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform='';(e.currentTarget as HTMLDivElement).style.boxShadow=`0 8px 40px rgba(4,18,40,.6)`}}>
              <div style={{padding:'16px 18px 12px',background:`linear-gradient(135deg,rgba(124,168,216,.18) 0%,rgba(124,168,216,.07) 100%)`,borderBottom:`1px solid rgba(200,216,232,.14)`,display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:40,height:40,borderRadius:10,background:`rgba(124,168,216,.12)`,border:`1px solid rgba(200,216,232,.28)`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{card.icon}</div>
                <div>
                  <span style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.22em',textTransform:'uppercase',color:R.silver4,display:'block',marginBottom:2}}>{card.type}</span>
                  <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(14px,1.7vw,18px)',fontStyle:'italic',fontWeight:300,color:R.silver3,lineHeight:1.2}}>{card.name}</p>
                </div>
              </div>
              <div style={{padding:'14px 18px 16px'}}>
                <p style={{fontFamily:"'Cinzel',serif",fontWeight:600,fontSize:'clamp(10px,1.1vw,12px)',color:R.silver,marginBottom:3,letterSpacing:'.05em'}}>{card.venue}</p>
                <p style={{fontSize:'clamp(10px,1.1vw,12px)',color:R.textlt,lineHeight:1.5,marginBottom:10,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{card.addr}</p>
                <div style={{display:'inline-flex',alignItems:'center',gap:5,background:`rgba(124,168,216,.1)`,border:`1px solid rgba(200,216,232,.18)`,borderRadius:100,padding:'4px 12px',fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.14em',textTransform:'uppercase',color:R.silver2,marginBottom:12}}>✦ 3 mai 2027 · ora {card.time}</div>
                <div style={{display:'flex',gap:8}}>
                  <div style={{...btn,background:'linear-gradient(135deg,rgba(8,162,212,.22),rgba(8,162,212,.12))',border:'1px solid rgba(8,162,212,.28)',color:'rgba(140,210,240,.9)'}}><WazeIcon/> Waze</div>
                  <div style={{...btn,background:'linear-gradient(135deg,rgba(76,175,79,.2),rgba(76,175,79,.1))',border:'1px solid rgba(76,175,79,.25)',color:'rgba(120,210,120,.9)'}}><MapsIcon/> Maps</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CONTACT */}
        <div style={{...a(.52),width:'100%',maxWidth:650,background:`rgba(15,32,64,.5)`,border:`1px solid rgba(200,216,232,.16)`,borderRadius:16,padding:'16px 20px',backdropFilter:'blur(10px)',boxShadow:`0 6px 30px rgba(4,18,40,.5)`,marginTop:'clamp(12px,2vw,20px)'}}>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.28em',textTransform:'uppercase',color:R.silver4,marginBottom:12}}>Contact Mireasă</p>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(15px,1.8vw,19px)',fontStyle:'italic',color:R.silver3,marginBottom:3}}>Elisabeta</p>
              <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(11px,1.3vw,13px)',color:R.silver,letterSpacing:'.08em',fontWeight:600}}>0752 954 258</p>
            </div>
            <div style={{display:'flex',gap:8}}>
              <div style={{...btn,padding:'10px 18px',borderRadius:100,background:`rgba(124,168,216,.12)`,border:`1px solid rgba(200,216,232,.28)`,color:R.silver}}><PhoneIcon/> Telefon</div>
              <div style={{...btn,padding:'10px 18px',borderRadius:100,background:'rgba(37,211,102,.1)',border:'1px solid rgba(37,211,102,.28)',color:'rgba(100,220,130,.9)'}}><WaIcon/> WhatsApp</div>
            </div>
          </div>
        </div>

        <div style={{...a(.56),display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:460,margin:'24px auto'}}><SilverDivider/></div>

        {/* PHOTO UPLOAD */}
        <div style={{...a(.58),width:'100%',maxWidth:650,background:`linear-gradient(160deg,rgba(124,168,216,.08) 0%,rgba(124,168,216,.03) 100%)`,border:`1.5px dashed rgba(200,216,232,.28)`,borderRadius:20,padding:'clamp(22px,3vw,32px) clamp(18px,3vw,28px)',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',opacity:.025,pointerEvents:'none',transform:'scale(3)'}}>
            <svg viewBox="0 0 48 48" fill="none" style={{width:80,height:80}}>
              <rect x="4" y="14" width="40" height="28" rx="4" stroke={R.silver} strokeWidth="1.5"/>
              <path d="M14 14 L17 8 L31 8 L34 14" stroke={R.silver} strokeWidth="1.5" strokeLinejoin="round"/>
              <circle cx="24" cy="28" r="8" stroke={R.silver} strokeWidth="1.5"/>
              <circle cx="24" cy="28" r="4" fill={R.silver}/>
            </svg>
          </div>
          <div style={{position:'relative',zIndex:1}}>
            <div style={{display:'flex',justifyContent:'center',marginBottom:14}}>
              <div style={{width:72,height:72,borderRadius:'50%',background:`rgba(124,168,216,.1)`,border:`2px solid rgba(200,216,232,.26)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}>
                  <rect x="4" y="14" width="40" height="28" rx="4" stroke={R.silver} strokeWidth="1.8" strokeOpacity=".65"/>
                  <path d="M14 14 L17 8 L31 8 L34 14" stroke={R.silver} strokeWidth="1.8" strokeOpacity=".65" strokeLinejoin="round"/>
                  <circle cx="24" cy="28" r="8" stroke={R.silver} strokeWidth="1.5" strokeOpacity=".65"/>
                  <circle cx="24" cy="28" r="4" fill={R.silver} fillOpacity=".25"/>
                  <circle cx="37" cy="20" r="2" fill={R.silver} fillOpacity=".5"/>
                  <circle cx="10" cy="20" r="1.2" fill={R.accent} fillOpacity=".55"/>
                </svg>
              </div>
            </div>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(18px,2.5vw,26px)',fontStyle:'italic',fontWeight:300,color:R.silver3,marginBottom:8,lineHeight:1.2}}>
              Împărtășiți momentele cu noi ✦
            </h3>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(13px,1.5vw,16px)',fontStyle:'italic',color:R.textlt,lineHeight:1.8,marginBottom:18,maxWidth:440,margin:'0 auto 18px'}}>
              Faceți poze în timpul nunții și încărcați-le direct din telefon.<br/>
              Mirii vor accesa toate imaginile voastre într-un album regal privat — amintiri adunate din toate perspectivele.
            </p>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginBottom:20}}>
              {['✦ Poze din toate unghiurile','◆ Album privat al mirilor','✦ Fără limită de fișiere','◆ Acces securizat'].map(tag=>(
                <span key={tag} style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(9px,.95vw,10px)',letterSpacing:'.1em',color:R.silver2,background:`rgba(124,168,216,.08)`,border:`1px solid rgba(200,216,232,.18)`,borderRadius:100,padding:'4px 14px'}}>{tag}</span>
              ))}
            </div>
            <button onClick={()=>setUploadModal(true)} style={{display:'inline-flex',alignItems:'center',gap:10,padding:'13px 32px',borderRadius:6,background:`linear-gradient(135deg,${R.navy3} 0%,${R.velvet2} 45%,${R.accent} 55%,${R.velvet2} 70%,${R.navy3} 100%)`,color:R.silver3,border:`1px solid rgba(200,216,232,.3)`,cursor:'pointer',fontFamily:"'Cinzel',serif",fontSize:'clamp(10px,1.1vw,12px)',fontWeight:600,letterSpacing:'.16em',textTransform:'uppercase',boxShadow:`0 8px 28px rgba(4,18,40,.5),0 0 20px rgba(124,168,216,.15)`,transition:'transform .2s,box-shadow .2s',position:'relative',overflow:'hidden'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 14px 40px rgba(4,18,40,.65),0 0 30px rgba(124,168,216,.25)`}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 8px 28px rgba(4,18,40,.5),0 0 20px rgba(124,168,216,.15)`}}>
              <svg viewBox="0 0 36 36" fill="none" style={{width:16,height:16}}>
                <path d="M18 26 L18 10 M11 17 L18 10 L25 17" stroke={R.silver3} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 30 Q5 30 3 26 Q1 22 5 19 Q4 16 6 14 Q8 6 16 6 Q22 4 26 9 Q32 9 34 14 Q38 16 36 21 Q35 26 30 26 L9 30Z" stroke={R.silver3} strokeWidth="1.4" strokeOpacity=".45" fill="none"/>
              </svg>
              Încarcă pozele tale
              <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)',backgroundSize:'350px 100%',animation:'shimmer 3s linear infinite'}}/>
            </button>
            <p style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.14em',color:R.silver4,opacity:.55,marginTop:10}}>funcție disponibilă în ziua nunții și 72h după eveniment</p>
          </div>
        </div>

        <div style={{...a(.63),display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:460,margin:'24px auto'}}><SilverDivider/></div>

        {/* RSVP BUTTON */}
        <div style={{...a(.65),textAlign:'center',width:'100%',maxWidth:420}}>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(14px,1.7vw,17px)',fontStyle:'italic',color:R.textlt,marginBottom:16,lineHeight:1.7,letterSpacing:'.04em'}}>
            Vă rugăm să confirmați prezența Dvs.<br/>până pe <strong style={{color:R.silver,fontStyle:'normal'}}>1 Aprilie 2027</strong>
          </p>
          <button onClick={()=>setModal(true)} style={{display:'block',width:'100%',padding:'clamp(14px,1.8vw,18px) 0',borderRadius:6,background:`linear-gradient(135deg,${R.navy3} 0%,${R.velvet2} 35%,${R.accent2} 50%,${R.velvet2} 65%,${R.navy3} 100%)`,color:R.silver3,textAlign:'center',fontFamily:"'Cinzel',serif",fontSize:'clamp(11px,1.3vw,13px)',fontWeight:600,letterSpacing:'.22em',textTransform:'uppercase',cursor:'pointer',border:`1px solid rgba(200,216,232,.3)`,boxShadow:`0 8px 40px rgba(4,18,40,.55),0 0 24px rgba(124,168,216,.18),0 2px 0 rgba(200,216,232,.2) inset`,transition:'transform .22s,box-shadow .22s',position:'relative',overflow:'hidden'}}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 16px 60px rgba(4,18,40,.7),0 0 40px rgba(124,168,216,.3),0 2px 0 rgba(200,216,232,.2) inset`}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 8px 40px rgba(4,18,40,.55),0 0 24px rgba(124,168,216,.18),0 2px 0 rgba(200,216,232,.2) inset`}}>
            <span style={{position:'relative',zIndex:1}}>✦ Confirmă Prezența ✦</span>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent)',backgroundSize:'350px 100%',animation:'shimmer 3s linear infinite'}}/>
          </button>
        </div>

        {/* CHOOSE BAR */}
        <div style={{...a(.70),width:'100%',padding:'22px 24px 24px',background:`rgba(15,32,64,.5)`,border:`1px solid rgba(200,216,232,.14)`,borderRadius:16,display:'flex',flexDirection:'column',alignItems:'center',gap:14,backdropFilter:'blur(10px)',marginTop:16,boxShadow:`0 4px 30px rgba(4,18,40,.45),inset 0 1px 0 rgba(200,216,232,.08)`}}>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontStyle:'italic',color:R.textlt,letterSpacing:'.04em',margin:0,textAlign:'center'}}>Îți place această temă? Personalizează-o pentru evenimentul tău regal</p>
          <a href="/preturi?tema=royal" style={{display:'inline-flex',alignItems:'center',gap:10,padding:'12px 36px',borderRadius:6,background:`linear-gradient(135deg,${R.navy3},${R.velvet2},${R.accent2},${R.velvet2},${R.navy3})`,color:R.silver3,textDecoration:'none',fontFamily:"'Cinzel',serif",fontSize:11,fontWeight:600,letterSpacing:'.18em',textTransform:'uppercase',border:`1px solid rgba(200,216,232,.28)`,boxShadow:`0 6px 28px rgba(4,18,40,.45),0 0 20px rgba(124,168,216,.15)`,transition:'transform .2s,box-shadow .2s'}}
            onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLAnchorElement).style.boxShadow=`0 14px 44px rgba(4,18,40,.6),0 0 32px rgba(124,168,216,.25)`}}
            onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='';(e.currentTarget as HTMLAnchorElement).style.boxShadow=`0 6px 28px rgba(4,18,40,.45),0 0 20px rgba(124,168,216,.15)`}}>
            ✦ Alege Această Temă
          </a>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.2em',textTransform:'uppercase',color:R.silver4,opacity:.4,margin:0}}>VibeInvite © 2026 · Toate drepturile rezervate</p>
        </div>
      </div>

      {/* ═══ RSVP MODAL ═══ */}
      {modal&&(
        <div onClick={()=>setModal(false)} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(4,13,24,.82)',backdropFilter:'blur(14px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16,animation:'ry-fadeIn .28s ease',overflowY:'auto'}}>
          <div onClick={e=>e.stopPropagation()} style={{background:`linear-gradient(170deg,${R.navy2},${R.royalBg})`,borderRadius:20,padding:'clamp(24px,4vw,38px) clamp(18px,4vw,32px)',maxWidth:480,width:'100%',border:`1px solid rgba(200,216,232,.22)`,boxShadow:`0 40px 100px rgba(4,18,40,.95),0 0 60px rgba(124,168,216,.1)`,animation:'ry-slideUp .32s cubic-bezier(.4,0,.2,1)',maxHeight:'90vh',overflowY:'auto',position:'relative'}}>
            <div style={{position:'absolute',top:0,left:'10%',right:'10%',height:1,background:`linear-gradient(90deg,transparent,rgba(200,216,232,.45),transparent)`}}/>
            <div style={{textAlign:'center',marginBottom:22}}>
              <div style={{display:'flex',justifyContent:'center',marginBottom:10}}><HeraldCrest size={56}/></div>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(22px,3.5vw,30px)',fontStyle:'italic',fontWeight:300,color:R.silver3,marginBottom:8}}>Confirmă Prezența</h2>
              <div style={{width:36,height:1,background:`linear-gradient(90deg,transparent,rgba(200,216,232,.45),transparent)`,margin:'0 auto 10px'}}/>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontStyle:'italic',color:R.textlt,lineHeight:1.7}}>Toate câmpurile sunt opționale.</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {/* Nume */}
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:R.silver4,marginBottom:6}}>Nume și Prenume</label>
                <input type="text" placeholder="ex. Maria Ionescu" style={inputS} onFocus={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(200,216,232,.55)'} onBlur={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(200,216,232,.22)'}/>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,fontStyle:'italic',color:`${R.textlt}88`,marginTop:4}}>Numele și prenumele dumneavoastră.</p>
              </div>
              {/* Raspuns */}
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:R.silver4,marginBottom:8}}>Răspuns</label>
                <div style={{display:'flex',gap:8}}>
                  {['Particip','Nu Particip'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(200,216,232,.45)';el.style.background=`rgba(124,168,216,.1)`}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(200,216,232,.18)';el.style.background=`rgba(15,32,64,.4)`}}>
                      <input type="radio" name="raspuns" value={opt} style={{accentColor:R.accent}}/>{opt}
                    </label>
                  ))}
                </div>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,fontStyle:'italic',color:`${R.textlt}88`,marginTop:4}}>În cazul în care refuzați, selectați "Nu Particip".</p>
              </div>
              {/* Insotit */}
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:R.silver4,marginBottom:8}}>Veți fi însoțit/ă?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Da','Nu'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(200,216,232,.45)';el.style.background=`rgba(124,168,216,.1)`}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(200,216,232,.18)';el.style.background=`rgba(15,32,64,.4)`}}>
                      <input type="radio" name="insotit" value={opt} style={{accentColor:R.accent}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* Partener */}
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:R.silver4,marginBottom:6}}>Nume și Prenume partener</label>
                <input type="text" placeholder="ex. Ion Ionescu" style={inputS} onFocus={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(200,216,232,.55)'} onBlur={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(200,216,232,.22)'}/>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,fontStyle:'italic',color:`${R.textlt}88`,marginTop:4}}>Numele persoanei care vă va însoți.</p>
              </div>
              {/* Copii */}
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:R.silver4,marginBottom:8}}>Veți veni cu copii?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Da','Nu'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(200,216,232,.45)';el.style.background=`rgba(124,168,216,.1)`}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(200,216,232,.18)';el.style.background=`rgba(15,32,64,.4)`}}>
                      <input type="radio" name="copii" value={opt} style={{accentColor:R.accent}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* Meniu */}
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:R.silver4,marginBottom:8}}>Preferințe meniu</label>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {['2x Meniu Normal','2x Meniu Vegetarian','1x Meniu Normal, 1x Meniu Vegetarian'].map(opt=>(
                    <label key={opt} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:8,border:`1px solid rgba(200,216,232,.18)`,background:`rgba(15,32,64,.4)`,cursor:'pointer',fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:'.09em',color:R.silver2,transition:'all .2s',userSelect:'none'}}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(200,216,232,.45)';el.style.background=`rgba(124,168,216,.1)`}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(200,216,232,.18)';el.style.background=`rgba(15,32,64,.4)`}}>
                      <input type="radio" name="meniu" value={opt} style={{accentColor:R.accent,flexShrink:0}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* Cazare */}
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:R.silver4,marginBottom:8}}>Aveți nevoie de cazare?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Nu','Da'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(200,216,232,.45)';el.style.background=`rgba(124,168,216,.1)`}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(200,216,232,.18)';el.style.background=`rgba(15,32,64,.4)`}}>
                      <input type="radio" name="cazare" value={opt} style={{accentColor:R.accent}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* Submit */}
            <div style={{marginTop:22,textAlign:'center'}}>
              <button onClick={()=>setModal(false)} style={{display:'block',width:'100%',padding:'14px 0',borderRadius:6,background:`linear-gradient(135deg,${R.navy3},${R.velvet2},${R.accent2},${R.velvet2},${R.navy3})`,color:R.silver3,fontFamily:"'Cinzel',serif",fontSize:11,fontWeight:600,letterSpacing:'.2em',textTransform:'uppercase',border:`1px solid rgba(200,216,232,.28)`,cursor:'pointer',boxShadow:`0 8px 28px rgba(4,18,40,.5),0 0 20px rgba(124,168,216,.15)`,transition:'transform .2s,box-shadow .2s'}}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 14px 40px rgba(4,18,40,.65),0 0 30px rgba(124,168,216,.25)`}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 8px 28px rgba(4,18,40,.5),0 0 20px rgba(124,168,216,.15)`}}>
                ✦ Trimite Confirmarea ✦
              </button>
              <div style={{marginTop:16,padding:'14px 16px',background:`rgba(124,168,216,.06)`,border:`1px solid rgba(200,216,232,.14)`,borderRadius:8}}>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontStyle:'italic',color:R.textlt,lineHeight:1.8}}>
                  Mulțumim!<br/>Aceasta este o demonstrație a temei <strong style={{color:R.silver,fontStyle:'normal'}}>Royal</strong>.<br/>Achiziționează pachetul pentru a activa confirmările.
                </p>
              </div>
              <button onClick={()=>setModal(false)} style={{marginTop:10,background:'none',border:'none',cursor:'pointer',fontFamily:"'Cormorant Garamond',serif",fontSize:12,fontStyle:'italic',color:R.silver4,opacity:.5,textDecoration:'underline'}}>Închide</button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {uploadModal&&(
        <div onClick={()=>setUploadModal(false)} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(4,13,24,.82)',backdropFilter:'blur(14px)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,animation:'ry-fadeIn .28s ease'}}>
          <div onClick={e=>e.stopPropagation()} style={{background:`linear-gradient(170deg,${R.navy2},${R.royalBg})`,borderRadius:20,padding:'38px 32px',maxWidth:380,width:'100%',border:`1px solid rgba(200,216,232,.22)`,boxShadow:`0 40px 100px rgba(4,18,40,.95)`,textAlign:'center',animation:'ry-slideUp .32s cubic-bezier(.4,0,.2,1)',position:'relative'}}>
            <div style={{position:'absolute',top:0,left:'10%',right:'10%',height:1,background:`linear-gradient(90deg,transparent,rgba(200,216,232,.45),transparent)`}}/>
            <div style={{display:'flex',justifyContent:'center',marginBottom:14}}>
              <div style={{width:64,height:64,borderRadius:'50%',background:`rgba(124,168,216,.1)`,border:`2px solid rgba(200,216,232,.24)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <svg viewBox="0 0 48 48" fill="none" style={{width:34,height:34}}>
                  <rect x="4" y="14" width="40" height="28" rx="4" stroke={R.silver} strokeWidth="1.8" strokeOpacity=".65"/>
                  <path d="M14 14 L17 8 L31 8 L34 14" stroke={R.silver} strokeWidth="1.8" strokeOpacity=".65" strokeLinejoin="round"/>
                  <circle cx="24" cy="28" r="8" stroke={R.silver} strokeWidth="1.5" strokeOpacity=".65"/>
                  <circle cx="24" cy="28" r="4" fill={R.silver} fillOpacity=".22"/>
                </svg>
              </div>
            </div>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontStyle:'italic',fontWeight:300,color:R.silver3,marginBottom:10}}>Încarcă pozele!</h2>
            <div style={{width:36,height:1,background:`linear-gradient(90deg,transparent,rgba(200,216,232,.45),transparent)`,margin:'0 auto 14px'}}/>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontStyle:'italic',color:R.textlt,marginBottom:24,lineHeight:1.8}}>
              Aceasta este o demonstrație a temei <strong style={{color:R.silver,fontStyle:'normal'}}>Royal</strong>.<br/>Funcția de upload foto este disponibilă după achiziționarea pachetului.
            </p>
            <button onClick={()=>setUploadModal(false)} style={{padding:'12px 36px',borderRadius:6,background:`linear-gradient(135deg,${R.navy3},${R.velvet2},${R.navy3})`,color:R.silver3,fontSize:11,fontWeight:600,fontFamily:"'Cinzel',serif",letterSpacing:'.2em',textTransform:'uppercase',border:`1px solid rgba(200,216,232,.28)`,cursor:'pointer',boxShadow:`0 6px 24px rgba(4,18,40,.45)`}}>Închide</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════
   ROOT
════════════════════════════════ */
export default function App() {
  const [phase, setPhase] = useState<Phase>('envelope')
  useSEO()
  function openEnvelope() {
    if(phase!=='envelope') return
    setPhase('opening')
    setTimeout(()=>setPhase('invite'),1700)
  }
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{height:100%;overflow:hidden;-webkit-font-smoothing:antialiased;}
        body{font-family:'Lato',sans-serif;background:#071220;color:#E0EAF5;}
        @keyframes ry-fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ry-envFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes ry-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes ry-pulse{0%,100%{opacity:.42}50%{opacity:.88}}
        @keyframes shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
        @keyframes ry-fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes ry-slideUp{from{opacity:0;transform:scale(.92) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @media(max-width:480px){body{overflow:hidden}}
      `}</style>

      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:200,height:56,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 clamp(14px,4vw,28px)',background:`rgba(7,18,32,.96)`,borderBottom:`1px solid rgba(200,216,232,.12)`,backdropFilter:'blur(18px)'}}>
        <a href="/invitatii-digitale" style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:600,letterSpacing:'.24em',textTransform:'uppercase',color:R.silver,textDecoration:'none',transition:'color .2s'}}
          onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.color=R.silver3}
          onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.color=R.silver}>
          Vibe<span style={{color:R.silver4}}>Invite</span>
        </a>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontStyle:'italic',color:R.textlt,letterSpacing:'.06em'}}>
          {phase==='invite'?'Elisabeta & Alexandru · 3 Mai 2027':'Invitație Royal'}
        </div>
        <a href="/invitatii-digitale" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:4,background:`rgba(124,168,216,.08)`,border:`1px solid rgba(200,216,232,.18)`,color:R.silver,fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:600,letterSpacing:'.14em',textTransform:'uppercase',cursor:'pointer',textDecoration:'none',transition:'all .2s'}}
          onMouseEnter={e=>{const b=e.currentTarget as HTMLAnchorElement;b.style.background=`rgba(124,168,216,.16)`;b.style.borderColor='rgba(200,216,232,.38)'}}
          onMouseLeave={e=>{const b=e.currentTarget as HTMLAnchorElement;b.style.background=`rgba(124,168,216,.08)`;b.style.borderColor='rgba(200,216,232,.18)'}}>
          <BackArrow/> Înapoi
        </a>
      </header>

      {phase!=='invite'&&<EnvelopeScreen onOpen={openEnvelope} phase={phase}/>}
      {phase==='invite'&&<InviteScreen onBack={()=>setPhase('envelope')}/>}
    </>
  )
}
