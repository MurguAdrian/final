'use client'

import { useState, useEffect } from 'react'

function useSEO() {
  useEffect(() => {
    document.title = 'Invitații Nuntă Online | Demo Stil Romantic — VibeInvite'
    const m = (sel:string,attr:string,val:string,cnt:string) => {
      let el = document.querySelector(sel)
      if (!el) { el=document.createElement('meta'); el.setAttribute(attr,val); document.head.appendChild(el) }
      el.setAttribute('content',cnt)
    }
    m('meta[name="description"]','name','description','Invitație digitală de nuntă în stil Romantic — roșu trandafiriu, roz pudrat, petale de bujori. O declarație de dragoste în sine. Crează-ți invitația online în 3 minute. RSVP instant, link free, GPS, upload poze nuntă.')
    m('meta[name="keywords"]','name','keywords','invitatii nunta romantice, invitatii nunta rosii, invitatie nunta trandafiri, invitatie nunta bujori, invitatie nunta roz, invitatie nunta eleganta romantica, invitatii nunta online, invitatie nunta dragostea, invitatie nunta pasiune, invitatie online free, link invitatie nunta, invitatii digitale nunta romania, creare invitatie nunta online, RSVP nunta online, upload poze nunta, vibeinvite, invitatii nunta florale, invitatie nunta petal')
    m('meta[property="og:title"]','property','og:title','Invitații Nuntă Online Romantic — VibeInvite Demo')
    m('meta[property="og:description"]','property','og:description','Demo invitație digitală de nuntă în stil Romantic. Roșu trandafiriu, roz pudrat, bujori. RSVP instant, GPS, upload poze.')
    m('meta[property="og:type"]','property','og:type','website')
    m('meta[property="og:url"]','property','og:url','https://vibeinvite.ro/invitatii-digitale/demo/RomanticDemo')
    m('meta[property="og:image"]','property','og:image','https://vibeinvite.ro/og-romantic.jpg')
    m('meta[property="og:locale"]','property','og:locale','ro_RO')
    m('meta[name="twitter:card"]','name','twitter:card','summary_large_image')
    m('meta[name="twitter:title"]','name','twitter:title','Invitații Nuntă Online Romantic — VibeInvite')
    m('meta[name="twitter:description"]','name','twitter:description','Invitație digitală de nuntă romantică. Roșu, roz, bujori. RSVP, GPS, upload poze.')
    let canon = document.querySelector('link[rel="canonical"]')
    if (!canon) { canon=document.createElement('link'); canon.setAttribute('rel','canonical'); document.head.appendChild(canon) }
    canon.setAttribute('href','https://vibeinvite.ro/invitatii-digitale/demo/RomanticDemo')
    if (!document.querySelector('script[data-ld="romantic"]')) {
      const ld = document.createElement('script')
      ld.setAttribute('type','application/ld+json')
      ld.setAttribute('data-ld','romantic')
      ld.textContent = JSON.stringify([
        { '@context':'https://schema.org','@type':'WebPage', name:'Invitații Nuntă Online — Demo Stil Romantic', description:'Demo invitație digitală de nuntă romantică. Roșu trandafiriu, roz pudrat, bujori.', url:'https://vibeinvite.ro/invitatii-digitale/demo/RomanticDemo', inLanguage:'ro', isPartOf:{ '@type':'WebSite',name:'VibeInvite',url:'https://vibeinvite.ro'}, breadcrumb:{ '@type':'BreadcrumbList', itemListElement:[{ '@type':'ListItem',position:1,name:'Acasă',item:'https://vibeinvite.ro'},{ '@type':'ListItem',position:2,name:'Invitații Digitale',item:'https://vibeinvite.ro/invitatii-digitale'},{ '@type':'ListItem',position:3,name:'Demo Stil Romantic',item:'https://vibeinvite.ro/invitatii-digitale/demo/RomanticDemo'}]}},
        { '@context':'https://schema.org','@type':'FAQPage', mainEntity:[
          { '@type':'Question',name:'Ce este o invitație de nuntă romantică?',acceptedAnswer:{ '@type':'Answer',text:'O invitație de nuntă romantică folosește culori calde — roșu trandafiriu, roz pudrat — și elemente florale ca bujori și trandafiri. Este caldă, senzorială și transmite emoție profundă.'}},
          { '@type':'Question',name:'Pot face o invitație de nuntă online cu trandafiri?',acceptedAnswer:{ '@type':'Answer',text:'Da! Tema Romantic de pe VibeInvite include elemente florale premium — bujori, trandafiri, petale — totul personalizabil în 3 minute.'}},
          { '@type':'Question',name:'Cum pot colecta poze de la invitați?',acceptedAnswer:{ '@type':'Answer',text:'VibeInvite include upload foto. Invitații încarcă poze din telefon în ziua nunții, iar mirii accesează totul într-un album privat.'}},
        ]},
      ])
      document.head.appendChild(ld)
    }
  }, [])
}

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
   PALETTE — Rich & Sensorial
════════════════════════════════ */
const P = {
  crimson:   '#7B1A2E',   // deep rose
  rose:      '#A63248',   // mid rose
  blush:     '#E8A0A8',   // soft blush
  blush2:    '#F2C8CE',   // pale blush
  blush3:    '#FAF0F2',   // near white blush
  peony:     '#C4506A',   // peony pink
  petal:     '#F7DDE2',   // petal cream
  cream:     '#FDF5F6',   // background
  cream2:    '#F5E8EA',   // card bg
  gold:      '#C8A87A',   // warm gold accent
  gold2:     '#E8CEAA',   // light gold
  dark:      '#2A0A12',   // deep dark
  text:      '#3D1520',   // rich text
  textlt:    '#8A4A58',   // muted
  white:     '#FFFBFB',
}

/* ════════════════════════════════
   SVG — Peony / Rose / Ornaments
════════════════════════════════ */

// Full peony bloom — hand-crafted SVG
const PeonyBloom = ({ size=180, opacity=1 }:{size?:number,opacity?:number}) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:size,height:size,opacity}}>
    {/* Outer petals layer 1 */}
    {[0,45,90,135,180,225,270,315].map((deg,i)=>{
      const rad=(deg*Math.PI)/180
      const cx=100+Math.cos(rad)*58
      const cy=100+Math.sin(rad)*58
      return <ellipse key={i} cx={cx} cy={cy} rx="28" ry="40" fill={P.blush} fillOpacity={.7+i*.02} transform={`rotate(${deg} ${cx} ${cy})`}/>
    })}
    {/* Outer petals layer 2 — offset 22.5deg */}
    {[22,67,112,157,202,247,292,337].map((deg,i)=>{
      const rad=(deg*Math.PI)/180
      const cx=100+Math.cos(rad)*46
      const cy=100+Math.sin(rad)*46
      return <ellipse key={i} cx={cx} cy={cy} rx="24" ry="35" fill={P.peony} fillOpacity=".55" transform={`rotate(${deg} ${cx} ${cy})`}/>
    })}
    {/* Middle petals */}
    {[0,60,120,180,240,300].map((deg,i)=>{
      const rad=(deg*Math.PI)/180
      const cx=100+Math.cos(rad)*32
      const cy=100+Math.sin(rad)*32
      return <ellipse key={i} cx={cx} cy={cy} rx="20" ry="28" fill={P.rose} fillOpacity=".65" transform={`rotate(${deg} ${cx} ${cy})`}/>
    })}
    {/* Inner petals */}
    {[30,90,150,210,270,330].map((deg,i)=>{
      const rad=(deg*Math.PI)/180
      const cx=100+Math.cos(rad)*18
      const cy=100+Math.sin(rad)*18
      return <ellipse key={i} cx={cx} cy={cy} rx="14" ry="20" fill={P.crimson} fillOpacity=".7" transform={`rotate(${deg} ${cx} ${cy})`}/>
    })}
    {/* Center */}
    <circle cx="100" cy="100" r="14" fill={P.crimson} fillOpacity=".9"/>
    <circle cx="100" cy="100" r="8" fill={P.gold} fillOpacity=".7"/>
    <circle cx="100" cy="100" r="4" fill={P.gold2} fillOpacity=".9"/>
    {/* Petal veins — subtle */}
    {[0,45,90,135,180,225,270,315].map((deg,i)=>{
      const rad=(deg*Math.PI)/180
      const x1=100+Math.cos(rad)*16; const y1=100+Math.sin(rad)*16
      const x2=100+Math.cos(rad)*72; const y2=100+Math.sin(rad)*72
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={P.crimson} strokeWidth=".6" strokeOpacity=".25"/>
    })}
  </svg>
)

// Falling petals (single petal shape)
const Petal = ({ style }:{style:React.CSSProperties}) => (
  <div style={{position:'absolute',pointerEvents:'none',...style}}>
    <svg viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <path d="M12 2 Q20 8 20 18 Q20 28 12 34 Q4 28 4 18 Q4 8 12 2Z" fill={P.blush} fillOpacity=".65"/>
      <path d="M12 6 Q16 12 16 18 Q16 24 12 30" stroke={P.rose} strokeWidth=".5" strokeOpacity=".4" fill="none"/>
    </svg>
  </div>
)

// Rose vine / stem ornament
const RoseVine = ({ flip=false }:{flip?:boolean}) => (
  <svg viewBox="0 0 80 280" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{width:'clamp(44px,6vw,80px)',transform:flip?'scaleX(-1)':'none'}}>
    {/* Main stem */}
    <path d="M40 280 Q36 240 34 200 Q30 160 38 120 Q42 90 40 60 Q38 35 40 10" stroke={P.crimson} strokeWidth="1.4" strokeOpacity=".4" fill="none" strokeLinecap="round"/>
    {/* Side stems */}
    <path d="M36 220 Q20 210 14 195" stroke={P.crimson} strokeWidth=".9" strokeOpacity=".35" fill="none" strokeLinecap="round"/>
    <path d="M38 170 Q58 158 64 142" stroke={P.crimson} strokeWidth=".9" strokeOpacity=".35" fill="none" strokeLinecap="round"/>
    <path d="M39 130 Q18 118 14 102" stroke={P.crimson} strokeWidth=".85" strokeOpacity=".3" fill="none" strokeLinecap="round"/>
    <path d="M39 90 Q60 78 65 62" stroke={P.crimson} strokeWidth=".8" strokeOpacity=".28" fill="none" strokeLinecap="round"/>
    {/* Leaves */}
    <ellipse cx="12" cy="192" rx="12" ry="6" fill={P.textlt} fillOpacity=".28" transform="rotate(-40 12 192)"/>
    <ellipse cx="65" cy="140" rx="11" ry="5" fill={P.textlt} fillOpacity=".25" transform="rotate(35 65 140)"/>
    <ellipse cx="12" cy="100" rx="10" ry="5" fill={P.textlt} fillOpacity=".22" transform="rotate(-45 12 100)"/>
    <ellipse cx="66" cy="60" rx="9" ry="4" fill={P.textlt} fillOpacity=".2" transform="rotate(30 66 60)"/>
    {/* Mini rose buds */}
    <g transform="translate(40 12) scale(.52)">
      {[0,72,144,216,288].map(r=><ellipse key={r} cx="0" cy="-12" rx="8" ry="14" fill={P.peony} fillOpacity=".7" transform={`rotate(${r})`}/>)}
      <circle cx="0" cy="0" r="5" fill={P.crimson} fillOpacity=".8"/>
    </g>
    <g transform="translate(14 192) scale(.42)">
      {[0,72,144,216,288].map(r=><ellipse key={r} cx="0" cy="-10" rx="7" ry="12" fill={P.peony} fillOpacity=".65" transform={`rotate(${r})`}/>)}
      <circle cx="0" cy="0" r="4" fill={P.crimson} fillOpacity=".75"/>
    </g>
    <g transform="translate(65 140) scale(.38)">
      {[0,72,144,216,288].map(r=><ellipse key={r} cx="0" cy="-9" rx="6" ry="11" fill={P.blush} fillOpacity=".7" transform={`rotate(${r})`}/>)}
      <circle cx="0" cy="0" r="3.5" fill={P.rose} fillOpacity=".7"/>
    </g>
  </svg>
)

// Romantic ornamental divider
const RoseDivider = () => (
  <div style={{display:'flex',alignItems:'center',width:'100%',maxWidth:480,gap:0}}>
    <div style={{flex:1,height:1,background:`linear-gradient(90deg,transparent,${P.blush})`}}/>
    <svg viewBox="0 0 80 30" width="80" height="30" fill="none">
      <path d="M5 15 L22 15" stroke={P.blush} strokeWidth=".8" strokeOpacity=".7"/>
      <path d="M58 15 L75 15" stroke={P.blush} strokeWidth=".8" strokeOpacity=".7"/>
      {/* Mini rose */}
      <g transform="translate(40 15)">
        {[0,72,144,216,288].map(r=><ellipse key={r} cx="0" cy="-7" rx="5" ry="8" fill={P.peony} fillOpacity=".65" transform={`rotate(${r})`}/>)}
        <circle cx="0" cy="0" r="3.5" fill={P.crimson} fillOpacity=".75"/>
        <circle cx="0" cy="0" r="1.5" fill={P.gold} fillOpacity=".7"/>
      </g>
      <circle cx="22" cy="15" r="1.5" fill={P.blush} fillOpacity=".8"/>
      <circle cx="58" cy="15" r="1.5" fill={P.blush} fillOpacity=".8"/>
    </svg>
    <div style={{flex:1,height:1,background:`linear-gradient(90deg,${P.blush},transparent)`}}/>
  </div>
)

// Heart SVG
const HeartSVG = ({ size=14, color=P.crimson }:{size?:number,color?:string}) => (
  <svg viewBox="0 0 24 22" fill={color} xmlns="http://www.w3.org/2000/svg" style={{width:size,height:size*22/24}}>
    <path d="M12 21C12 21 1 13.5 1 7.5C1 4.5 3.5 2 6.5 2C8.5 2 10.5 3 12 5C13.5 3 15.5 2 17.5 2C20.5 2 23 4.5 23 7.5C23 13.5 12 21 12 21Z"/>
  </svg>
)

const WazeIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/></svg>)
const MapsIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>)
const PhoneIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>)
const WaIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>)
const BackArrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>)
const CameraIcon = () => (<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:36,height:36}}><rect x="4" y="14" width="40" height="28" rx="4"/><path d="M14 14l3-8h14l3 8"/><circle cx="24" cy="28" r="8"/><circle cx="24" cy="28" r="4" fill="currentColor" stroke="none" opacity=".3"/><circle cx="38" cy="21" r="2" fill="currentColor" stroke="none"/></svg>)

type Phase = 'envelope' | 'opening' | 'invite'

/* ════════════════════════════════
   ENVELOPE SCREEN
════════════════════════════════ */
function EnvelopeScreen({ onOpen, phase }:{onOpen:()=>void,phase:Phase}) {
  // Animated petals data
  const petals = [
    {w:18,top:'8%',left:'6%',delay:'0s',dur:'7s',rot:-25},
    {w:14,top:'22%',left:'2%',delay:'1.2s',dur:'8.4s',rot:12},
    {w:20,top:'55%',left:'4%',delay:'0.6s',dur:'6.8s',rot:-40},
    {w:12,top:'78%',left:'8%',delay:'2.1s',dur:'9.2s',rot:20},
    {w:16,top:'12%',right:'5%',delay:'0.4s',dur:'7.6s',rot:35},
    {w:22,top:'40%',right:'3%',delay:'1.8s',dur:'8s',rot:-15},
    {w:13,top:'68%',right:'6%',delay:'0.9s',dur:'7.2s',rot:45},
    {w:18,top:'88%',right:'10%',delay:'1.5s',dur:'8.8s',rot:-30},
  ] as any[]

  return (
    <div style={{position:'fixed',inset:0,top:56,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
      {/* Lush romantic background — deep rose gradient */}
      <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse 85% 75% at 50% 42%,${P.cream} 0%,${P.petal} 40%,${P.blush2} 75%,${P.blush} 100%)`}}/>
      {/* Soft vignette */}
      <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse 70% 65% at 50% 45%,transparent 35%,rgba(123,26,46,.08) 100%)`,pointerEvents:'none'}}/>
      {/* Velvet grain texture */}
      <div style={{position:'absolute',inset:0,opacity:.025,backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",pointerEvents:'none'}}/>

      {/* Floating petals */}
      {petals.map((p,i) => (
        <Petal key={i} style={{
          width:p.w, height:p.w*1.6,
          top:p.top, left:p.left, right:p.right,
          animation:`rm-petal ${p.dur} ease-in-out infinite ${p.delay}`,
          transform:`rotate(${p.rot}deg)`,
          opacity:.7,
        }}/>
      ))}

      {/* Large decorative peonies — corners */}
      <div style={{position:'absolute',top:-30,left:-30,opacity:.35,pointerEvents:'none',animation:'rm-float 8s ease-in-out infinite'}}>
        <PeonyBloom size={200}/>
      </div>
      <div style={{position:'absolute',top:-40,right:-40,opacity:.3,pointerEvents:'none',animation:'rm-float 9s ease-in-out infinite 1.5s',transform:'scaleX(-1)'}}>
        <PeonyBloom size={220}/>
      </div>
      <div style={{position:'absolute',bottom:-40,left:-20,opacity:.28,pointerEvents:'none',animation:'rm-float 7.5s ease-in-out infinite 0.8s',transform:'scaleY(-1)'}}>
        <PeonyBloom size={180}/>
      </div>
      <div style={{position:'absolute',bottom:-50,right:-30,opacity:.32,pointerEvents:'none',animation:'rm-float 8.5s ease-in-out infinite 2s',transform:'scale(-1)'}}>
        <PeonyBloom size={200}/>
      </div>

      {/* Rose vines — sides */}
      <div style={{position:'absolute',left:0,top:'5%',opacity:.7,pointerEvents:'none'}}><RoseVine/></div>
      <div style={{position:'absolute',right:0,top:'5%',opacity:.7,pointerEvents:'none'}}><RoseVine flip/></div>

      {/* Center */}
      <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',gap:16,padding:'24px'}}>

        {/* Heart ornament */}
        <div style={{animation:'rm-heartbeat 2.4s ease-in-out infinite, rm-fadeUp .6s ease both'}}>
          <HeartSVG size={28} color={P.crimson}/>
        </div>

        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(12px,1.4vw,14px)',fontStyle:'italic',color:P.textlt,animation:'rm-fadeUp .7s ease both .05s',letterSpacing:'.08em'}}>
          o poveste de dragoste
        </p>

        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(32px,5vw,60px)',fontWeight:400,fontStyle:'italic',color:P.dark,textAlign:'center',lineHeight:1.12,animation:'rm-fadeUp .8s ease both .1s',margin:0,textShadow:`0 2px 20px rgba(123,26,46,.15)`}}>
          <strong style={{fontWeight:600,fontStyle:'normal',color:P.crimson}}>Isabela</strong>
          <span style={{display:'block',fontFamily:"'Cormorant Garamond',serif",fontSize:'.55em',fontWeight:300,color:P.blush,fontStyle:'italic',letterSpacing:'.12em',margin:'2px 0'}}>&amp;</span>
          <strong style={{fontWeight:600,fontStyle:'normal',color:P.crimson}}>Octavian</strong>
        </h1>

        {/* ENVELOPE */}
        <div onClick={onOpen} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&onOpen()}
          style={{position:'relative',width:'clamp(290px,44vw,520px)',cursor:'pointer',userSelect:'none',animation:'rm-envFloat 5.5s ease-in-out infinite, rm-fadeUp .85s ease both .15s',filter:`drop-shadow(0 24px 50px rgba(123,26,46,.22))`}}>

          <div style={{position:'absolute',bottom:-18,left:'9%',right:'9%',height:22,background:`radial-gradient(ellipse,rgba(123,26,46,.2) 0%,transparent 70%)`,filter:'blur(10px)',zIndex:0}}/>

          {/* LETTER */}
          <div style={{
            position:'absolute',left:'8%',right:'8%',bottom:'4%',height:'62%',
            zIndex:phase==='opening'?30:2,
            background:`linear-gradient(165deg,${P.white} 0%,${P.cream} 60%,${P.petal} 100%)`,
            border:`1px solid rgba(196,80,106,.25)`,
            borderRadius:4,
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,
            boxShadow:phase==='opening'?`0 36px 80px rgba(123,26,46,.28),0 6px 20px rgba(123,26,46,.12)`:`0 2px 10px rgba(123,26,46,.06)`,
            transform:phase==='opening'?'translateY(-145%) scale(1.05) rotate(-0.6deg)':'translateY(0)',
            transition:'transform 1.4s cubic-bezier(.22,.1,.2,1) .22s,box-shadow 1.4s ease .22s',
            overflow:'hidden',
          }}>
            <div style={{position:'absolute',inset:0,opacity:.03,backgroundImage:`repeating-linear-gradient(0deg,${P.crimson} 0,${P.crimson} 1px,transparent 1px,transparent 24px)`}}/>
            <div style={{position:'absolute',top:6,left:6,right:6,bottom:6,border:`1px solid rgba(196,80,106,.15)`,borderRadius:2}}/>
            <div style={{textAlign:'center',padding:'0 20px',position:'relative',zIndex:1}}>
              <div style={{display:'flex',justifyContent:'center',marginBottom:6}}><HeartSVG size={16} color={P.peony}/></div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(14px,2.5vw,24px)',fontStyle:'italic',fontWeight:400,color:P.crimson,lineHeight:1.2,letterSpacing:'.04em'}}>Isabela &amp; Octavian</p>
              <div style={{width:32,height:1,background:`rgba(196,80,106,.3)`,margin:'8px auto'}}/>
              <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(7px,.85vw,9px)',letterSpacing:'.26em',textTransform:'uppercase',color:P.textlt,fontWeight:400}}>3 Mai 2027 · București</p>
            </div>
          </div>

          {/* ENVELOPE BODY */}
          <div style={{width:'100%',paddingTop:'60%',position:'relative',zIndex:5}}>
            <div style={{position:'absolute',inset:0,background:P.petal,borderRadius:6,border:`1.5px solid rgba(196,80,106,.3)`,boxShadow:`0 4px 24px rgba(123,26,46,.1)`,overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,bottom:0,left:0,width:'50%',background:P.blush2,clipPath:'polygon(0 0,0 100%,100% 100%)'}}/>
              <div style={{position:'absolute',top:0,bottom:0,right:0,width:'50%',background:P.blush2,clipPath:'polygon(100% 0,0 100%,100% 100%)'}}/>
              <div style={{position:'absolute',bottom:0,left:0,right:0,height:'50%',background:P.cream2,clipPath:'polygon(0 100%,50% 0,100% 100%)'}}/>
              <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${P.crimson},transparent)`,opacity:.35}}/>
            </div>
            {/* WAX SEAL — peony */}
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-52%)',width:'clamp(54px,9vw,84px)',height:'clamp(54px,9vw,84px)',background:`radial-gradient(circle at 38% 38%,${P.blush} 0%,${P.peony} 40%,${P.crimson} 80%)`,borderRadius:'50%',border:`2px solid rgba(196,80,106,.45)`,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 0 0 5px rgba(196,80,106,.1),0 0 0 10px rgba(196,80,106,.05),0 8px 24px rgba(123,26,46,.25)`,zIndex:10,opacity:phase==='opening'?0:1,transition:'opacity .25s'}}>
              <div style={{position:'absolute',inset:-8,border:`1px dashed rgba(196,80,106,.38)`,borderRadius:'50%',animation:'rm-spin 25s linear infinite'}}/>
              <div style={{zIndex:1}}><PeonyBloom size={36}/></div>
            </div>
            {/* FLAP */}
            <div style={{position:'absolute',top:0,left:0,right:0,zIndex:8,height:'52%',background:`linear-gradient(160deg,${P.cream2} 0%,${P.petal} 100%)`,clipPath:'polygon(0 0,100% 0,50% 100%)',transformOrigin:'top center',transform:phase==='opening'?'perspective(700px) rotateX(192deg)':'perspective(700px) rotateX(0deg)',transition:'transform 1s cubic-bezier(.4,0,.2,1)',borderBottom:`1.5px solid rgba(196,80,106,.28)`}}>
              <div style={{position:'absolute',inset:0,background:`linear-gradient(160deg,rgba(196,80,106,.06) 0%,transparent 50%)`}}/>
            </div>
          </div>
        </div>

        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(12px,1.4vw,14px)',fontStyle:'italic',color:P.textlt,animation:phase==='opening'?'none':'rm-fadeUp 1s ease both .3s, rm-pulse 3s ease-in-out infinite 1.2s'}}>
          {phase==='opening'?'♥  dezvăluind invitația  ♥':'atinge pentru a deschide'}
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
  useEffect(()=>{ setFlipS(true); const t=setTimeout(()=>setFlipS(false),158); return()=>clearTimeout(t) },[cd.s])

  const a=(d:number):React.CSSProperties=>({ opacity:vis?1:0, transform:vis?'translateY(0)':'translateY(20px)', transition:`opacity .7s ease ${d}s,transform .7s ease ${d}s` })

  const inputS:React.CSSProperties={ width:'100%', padding:'11px 14px', border:`1px solid rgba(196,80,106,.22)`, borderRadius:8, background:`rgba(255,251,251,.8)`, fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:P.dark, outline:'none' }
  const radioL:React.CSSProperties={ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'11px 10px', border:`1px solid rgba(196,80,106,.2)`, borderRadius:8, background:`rgba(255,251,251,.8)`, cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'.1em', color:P.textlt, transition:'all .18s', userSelect:'none' }

  return (
    <div style={{position:'fixed',inset:0,top:56,overflowY:'auto',overflowX:'hidden'}}>
      {/* Fixed romantic bg */}
      <div style={{position:'fixed',inset:0,background:`radial-gradient(ellipse 90% 80% at 50% 30%,${P.cream} 0%,${P.petal} 45%,${P.blush2} 80%,${P.blush} 100%)`,zIndex:0}}/>
      <div style={{position:'fixed',inset:0,background:`radial-gradient(ellipse 65% 55% at 15% 22%,rgba(196,80,106,.07) 0%,transparent 55%),radial-gradient(ellipse 55% 48% at 85% 78%,rgba(196,80,106,.06) 0%,transparent 55%)`,zIndex:1,pointerEvents:'none'}}/>
      <div style={{position:'fixed',inset:0,opacity:.02,backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",zIndex:1,pointerEvents:'none'}}/>

      {/* Fixed vines */}
      <div style={{position:'fixed',top:0,left:0,opacity:.65,pointerEvents:'none',zIndex:2}}><RoseVine/></div>
      <div style={{position:'fixed',top:0,right:0,opacity:.65,pointerEvents:'none',zIndex:2}}><RoseVine flip/></div>
      {/* Fixed corner peonies */}
      <div style={{position:'fixed',top:-20,left:-20,opacity:.2,pointerEvents:'none',zIndex:2,animation:'rm-float 8s ease-in-out infinite'}}><PeonyBloom size={160}/></div>
      <div style={{position:'fixed',top:-25,right:-25,opacity:.18,pointerEvents:'none',zIndex:2,animation:'rm-float 9s ease-in-out infinite 1.5s',transform:'scaleX(-1)'}}><PeonyBloom size={170}/></div>
      <div style={{position:'fixed',bottom:-30,left:-20,opacity:.16,pointerEvents:'none',zIndex:2,animation:'rm-float 7.5s ease-in-out infinite 0.8s',transform:'scaleY(-1)'}}><PeonyBloom size={150}/></div>
      <div style={{position:'fixed',bottom:-35,right:-25,opacity:.18,pointerEvents:'none',zIndex:2,animation:'rm-float 8.5s ease-in-out infinite 2s',transform:'scale(-1)'}}><PeonyBloom size={160}/></div>

      <div style={{position:'relative',zIndex:10,maxWidth:720,margin:'0 auto',padding:'clamp(44px,7vw,64px) clamp(20px,5vw,32px) 60px',display:'flex',flexDirection:'column',alignItems:'center',gap:0}}>

        {/* Center peony */}
        <div style={{...a(0),marginBottom:4,animation:vis?'rm-float 7s ease-in-out infinite':'none'}}>
          <PeonyBloom size={clamp(80,14,120)}/>
        </div>

        {/* Eyebrow */}
        <p style={{...a(.06),fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(13px,1.5vw,15px)',fontStyle:'italic',color:P.textlt,marginBottom:8,letterSpacing:'.06em'}}>
          Cu dragoste vă invităm la
        </p>

        {/* NAMES */}
        <div style={{...a(.1),textAlign:'center',marginBottom:6}}>
          <span style={{display:'block',fontFamily:"'Playfair Display',serif",fontSize:'clamp(56px,10vw,110px)',fontWeight:600,fontStyle:'italic',color:P.crimson,lineHeight:.9,textShadow:`0 4px 32px rgba(123,26,46,.18)`,letterSpacing:'-.01em'}}>
            Isabela
          </span>
          <span style={{display:'block',fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(22px,3.5vw,38px)',fontStyle:'italic',fontWeight:300,color:P.peony,margin:'8px 0',lineHeight:1.1}}>
            &amp;
          </span>
          <span style={{display:'block',fontFamily:"'Playfair Display',serif",fontSize:'clamp(56px,10vw,110px)',fontWeight:600,fontStyle:'italic',color:P.crimson,lineHeight:.9,textShadow:`0 4px 32px rgba(123,26,46,.18)`,letterSpacing:'-.01em'}}>
            Octavian
          </span>
        </div>

        {/* Rose divider */}
        <div style={{...a(.16),margin:'22px auto',width:'100%',maxWidth:400}}><RoseDivider/></div>

        {/* Date */}
        <div style={{...a(.20),textAlign:'center',marginBottom:20}}>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(12px,1.6vw,15px)',letterSpacing:'.2em',color:P.dark,fontWeight:400,marginBottom:5}}>
            Duminică · 3 Mai 2027
          </p>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(15px,1.8vw,19px)',fontStyle:'italic',color:P.textlt,letterSpacing:'.05em'}}>
            București, România
          </p>
        </div>

        {/* Nași — elegant card */}
        <div style={{...a(.24),textAlign:'center',padding:'22px 32px',border:`1px solid rgba(196,80,106,.2)`,borderRadius:20,background:`rgba(255,251,251,.65)`,backdropFilter:'blur(10px)',maxWidth:360,width:'100%',boxShadow:`0 4px 28px rgba(123,26,46,.07)`,marginBottom:0,position:'relative'}}>
          {['tl','tr','bl','br'].map(c=>(
            <div key={c} style={{position:'absolute',top:c.startsWith('t')?8:'auto',bottom:c.startsWith('b')?8:'auto',left:c.endsWith('l')?8:'auto',right:c.endsWith('r')?8:'auto',width:12,height:12,borderTop:c.startsWith('t')?`1px solid rgba(196,80,106,.4)`:'none',borderBottom:c.startsWith('b')?`1px solid rgba(196,80,106,.4)`:'none',borderLeft:c.endsWith('l')?`1px solid rgba(196,80,106,.4)`:'none',borderRight:c.endsWith('r')?`1px solid rgba(196,80,106,.4)`:'none'}}/>
          ))}
          <div style={{display:'flex',justifyContent:'center',marginBottom:8}}><HeartSVG size={14} color={P.blush}/></div>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(12px,1.4vw,14px)',fontStyle:'italic',color:P.textlt,marginBottom:8,letterSpacing:'.04em'}}>alături de nașii noștri</p>
          <div style={{width:28,height:1,background:`rgba(196,80,106,.35)`,margin:'0 auto 10px'}}/>
          <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(18px,2.3vw,24px)',fontStyle:'italic',fontWeight:400,color:P.dark,letterSpacing:'.02em'}}>Elena &amp; Victor</p>
        </div>

        <div style={{...a(.28),margin:'22px auto',width:'100%',maxWidth:400}}><RoseDivider/></div>

        {/* COUNTDOWN */}
        <div style={{...a(.32),width:'100%',maxWidth:460,background:`rgba(255,251,251,.6)`,border:`1px solid rgba(196,80,106,.18)`,borderRadius:24,padding:'24px 18px',backdropFilter:'blur(12px)',textAlign:'center',boxShadow:`0 6px 32px rgba(123,26,46,.06)`,position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:'12%',right:'12%',height:1,background:`linear-gradient(90deg,transparent,rgba(196,80,106,.4),transparent)`}}/>
          <div style={{display:'flex',justifyContent:'center',marginBottom:10}}><HeartSVG size={12} color={P.blush}/></div>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(7px,.85vw,9px)',letterSpacing:'.3em',textTransform:'uppercase',color:P.textlt,marginBottom:16,opacity:.8}}>Timp Rămas Până La Ziua Iubirii</p>
          <div style={{display:'flex',gap:0,justifyContent:'center'}}>
            {[{n:pad(cd.d),l:'Zile'},{n:pad(cd.h),l:'Ore'},{n:pad(cd.m),l:'Minute'},{n:pad(cd.s),l:'Secunde',flip:flipS}].map(u=>(
              <div key={u.l} style={{flex:1,maxWidth:108,textAlign:'center',padding:'0 4px',borderRight:`1px solid rgba(196,80,106,.15)`}}>
                <span style={{display:'block',fontFamily:"'Playfair Display',serif",fontSize:'clamp(34px,5.5vw,58px)',fontWeight:400,fontStyle:'italic',lineHeight:1,transition:'transform .15s ease,color .15s ease',transform:(u as any).flip?'scale(1.08) translateY(-3px)':'scale(1)',color:(u as any).flip?P.crimson:P.dark,textShadow:(u as any).flip?`0 0 20px rgba(123,26,46,.2)`:undefined}}>{u.n}</span>
                <span style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(6px,.8vw,8px)',letterSpacing:'.16em',textTransform:'uppercase',color:P.textlt,display:'block',marginTop:3}}>{u.l}</span>
              </div>
            ))}
          </div>
          <div style={{position:'absolute',bottom:0,left:'12%',right:'12%',height:1,background:`linear-gradient(90deg,transparent,rgba(196,80,106,.4),transparent)`}}/>
        </div>

        <div style={{...a(.38),margin:'22px auto',width:'100%',maxWidth:400}}><RoseDivider/></div>

        {/* LOCATION CARDS */}
        <div style={{...a(.42),width:'100%',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,262px),1fr))',gap:'clamp(12px,2vw,20px)',maxWidth:640}}>
          {[
            {tag:'Cununia',label:'Ceremonia Religioasă',venue:'Catedrala Sfântul Iosif',addr:'Str. General Berthelot, București',time:'15:00',
              icon:<svg viewBox="0 0 24 24" fill="none" stroke={P.cream} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M12 2L12 6M10 4h4"/><rect x="4" y="9" width="16" height="12" rx="1"/><path d="M9 21V14a3 3 0 0 1 6 0v7"/><path d="M4 9l8-4 8 4"/></svg>},
            {tag:'Recepția',label:'Banchetul & Petrecerea',venue:'Palazzo Brancoveanu',addr:'Bd. Unirii, București',time:'19:00',
              icon:<svg viewBox="0 0 24 24" fill="none" stroke={P.cream} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M8 18c0 1.65-1.35 3-3 3s-3-1.35-3-3c0-2 3-6 3-6s3 4 3 6z"/><path d="M5 12V4"/><path d="M19 14c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.5 2-4 2-4s2 2.5 2 4z"/><path d="M17 10V6"/><path d="M12 8l2-2M12 8l-2-2M12 8v4"/><circle cx="12" cy="14" r=".8" fill={P.cream} stroke="none"/></svg>},
          ].map(card=>(
            <div key={card.tag} style={{borderRadius:20,overflow:'hidden',border:`1.5px solid rgba(196,80,106,.2)`,background:`rgba(255,251,251,.72)`,backdropFilter:'blur(10px)',boxShadow:`0 6px 28px rgba(123,26,46,.08)`,transition:'transform .24s ease,box-shadow .24s ease'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)';(e.currentTarget as HTMLDivElement).style.boxShadow=`0 18px 50px rgba(123,26,46,.15)`}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform='';(e.currentTarget as HTMLDivElement).style.boxShadow=`0 6px 28px rgba(123,26,46,.08)`}}>
              <div style={{padding:'16px 18px 12px',background:`linear-gradient(135deg,${P.crimson} 0%,${P.rose} 100%)`,display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:40,height:40,borderRadius:12,background:'rgba(255,255,255,.15)',border:'1px solid rgba(255,255,255,.25)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{card.icon}</div>
                <div>
                  <span style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.22em',textTransform:'uppercase',color:'rgba(255,255,255,.65)',display:'block',marginBottom:2}}>{card.label}</span>
                  <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(15px,1.8vw,19px)',fontStyle:'italic',fontWeight:300,color:'#fff',lineHeight:1.2}}>{card.tag}</p>
                </div>
              </div>
              <div style={{padding:'14px 18px 16px'}}>
                <p style={{fontFamily:"'Cinzel',serif",fontWeight:600,fontSize:'clamp(10px,1.1vw,12px)',color:P.crimson,marginBottom:3,letterSpacing:'.05em'}}>{card.venue}</p>
                <p style={{fontSize:'clamp(10px,1.1vw,12px)',color:P.textlt,lineHeight:1.5,marginBottom:10,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{card.addr}</p>
                <div style={{display:'inline-flex',alignItems:'center',gap:5,background:`rgba(196,80,106,.09)`,border:`1px solid rgba(196,80,106,.2)`,borderRadius:100,padding:'4px 12px',fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.14em',textTransform:'uppercase',color:P.textlt,marginBottom:12}}>
                  ♥ 3 mai 2027 · ora {card.time}
                </div>
                <div style={{display:'flex',gap:8}}>
                  <div style={{flex:1,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:5,padding:'9px 8px',borderRadius:10,background:'linear-gradient(135deg,rgba(8,162,212,.22),rgba(8,162,212,.12))',border:'1px solid rgba(8,162,212,.28)',color:'rgba(8,162,212,.9)',fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:600,letterSpacing:'.08em',cursor:'default'}}><WazeIcon/> Waze</div>
                  <div style={{flex:1,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:5,padding:'9px 8px',borderRadius:10,background:'linear-gradient(135deg,rgba(76,175,79,.2),rgba(76,175,79,.1))',border:'1px solid rgba(76,175,79,.25)',color:'rgba(56,142,60,.9)',fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:600,letterSpacing:'.08em',cursor:'default'}}><MapsIcon/> Maps</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CONTACT */}
        <div style={{...a(.48),width:'100%',maxWidth:640,background:`rgba(255,251,251,.65)`,border:`1px solid rgba(196,80,106,.18)`,borderRadius:18,padding:'16px 20px',backdropFilter:'blur(8px)',boxShadow:`0 4px 20px rgba(123,26,46,.06)`,marginTop:'clamp(12px,2vw,20px)'}}>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.28em',textTransform:'uppercase',color:P.textlt,marginBottom:12,opacity:.8}}>Contact Mireasă</p>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(16px,2vw,20px)',fontStyle:'italic',color:P.dark,marginBottom:2}}>Isabela</p>
              <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(11px,1.3vw,13px)',color:P.crimson,letterSpacing:'.07em',fontWeight:600}}>0752 954 258</p>
            </div>
            <div style={{display:'flex',gap:8}}>
              <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 16px',borderRadius:100,background:`linear-gradient(135deg,${P.crimson},${P.rose})`,color:'#fff',fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:600,letterSpacing:'.1em',boxShadow:`0 4px 14px rgba(123,26,46,.3)`,cursor:'default'}}><PhoneIcon/> Telefon</div>
              <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 16px',borderRadius:100,background:'linear-gradient(135deg,#25D366,#1DA851)',color:'#fff',fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:600,letterSpacing:'.1em',boxShadow:`0 4px 14px rgba(37,211,102,.28)`,cursor:'default'}}><WaIcon/> WhatsApp</div>
            </div>
          </div>
        </div>

        <div style={{...a(.52),margin:'22px auto',width:'100%',maxWidth:400}}><RoseDivider/></div>

        {/* PHOTO UPLOAD */}
        <div style={{...a(.54),width:'100%',maxWidth:640,background:`linear-gradient(160deg,rgba(255,240,242,.65) 0%,rgba(255,251,251,.55) 100%)`,border:`1.5px dashed rgba(196,80,106,.3)`,borderRadius:24,padding:'clamp(24px,3.5vw,36px) clamp(18px,3vw,28px)',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-30,right:-30,opacity:.08,pointerEvents:'none'}}><PeonyBloom size={120}/></div>
          <div style={{position:'absolute',bottom:-20,left:-20,opacity:.06,pointerEvents:'none'}}><PeonyBloom size={100}/></div>
          <div style={{position:'relative',zIndex:1}}>
            <div style={{display:'flex',justifyContent:'center',marginBottom:14}}>
              <div style={{width:72,height:72,borderRadius:'50%',background:`rgba(196,80,106,.1)`,border:`2px solid rgba(196,80,106,.25)`,display:'flex',alignItems:'center',justifyContent:'center',color:P.peony}}>
                <CameraIcon/>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'center',marginBottom:8}}><HeartSVG size={16} color={P.blush}/></div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(18px,2.5vw,26px)',fontStyle:'italic',fontWeight:400,color:P.dark,marginBottom:8,lineHeight:1.2}}>Împărtășiți momentele cu noi</h3>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(14px,1.6vw,16px)',fontStyle:'italic',color:P.textlt,lineHeight:1.85,marginBottom:18,maxWidth:440,margin:'0 auto 18px'}}>
              Faceți poze în timpul nunții și încărcați-le direct din telefon.<br/>
              Mirii vor accesa toate imaginile voastre într-un album privat al iubirii — amintiri adunate din toate perspectivele.
            </p>
            <div style={{display:'flex',flexWrap:'wrap',gap:7,justifyContent:'center',marginBottom:22}}>
              {['♥ Poze din toate unghiurile','♥ Album privat al mirilor','♥ Fără limită de fișiere','♥ Acces securizat'].map(tag=>(
                <span key={tag} style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(9px,1vw,10px)',letterSpacing:'.1em',color:P.textlt,background:`rgba(255,251,251,.75)`,border:`1px solid rgba(196,80,106,.2)`,borderRadius:100,padding:'4px 14px'}}>{tag}</span>
              ))}
            </div>
            <button onClick={()=>setUploadModal(true)} style={{display:'inline-flex',alignItems:'center',gap:10,padding:'13px 32px',borderRadius:100,background:`linear-gradient(135deg,${P.crimson} 0%,${P.rose} 100%)`,color:'#fff',border:'none',cursor:'pointer',fontFamily:"'Cinzel',serif",fontSize:'clamp(10px,1.2vw,12px)',fontWeight:600,letterSpacing:'.16em',textTransform:'uppercase',boxShadow:`0 8px 28px rgba(123,26,46,.32)`,transition:'transform .2s,box-shadow .2s',position:'relative',overflow:'hidden'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 14px 40px rgba(123,26,46,.48)`}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 8px 28px rgba(123,26,46,.32)`}}>
              <svg viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><path d="M9 14V4M4 9l5-5 5 5"/><path d="M2 16h14"/></svg>
              Încarcă pozele tale
              <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent)',backgroundSize:'350px 100%',animation:'rm-shimmer 3s linear infinite'}}/>
            </button>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,fontStyle:'italic',color:`rgba(138,74,88,.5)`,marginTop:10}}>funcție disponibilă în ziua nunții și 72h după eveniment</p>
          </div>
        </div>

        <div style={{...a(.60),margin:'22px auto',width:'100%',maxWidth:400}}><RoseDivider/></div>

        {/* RSVP */}
        <div style={{...a(.62),textAlign:'center',width:'100%',maxWidth:400}}>
          <div style={{display:'flex',justifyContent:'center',marginBottom:10,animation:vis?'rm-heartbeat 2.4s ease-in-out infinite':undefined}}><HeartSVG size={20} color={P.peony}/></div>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(14px,1.7vw,17px)',fontStyle:'italic',color:P.textlt,marginBottom:14,lineHeight:1.7,letterSpacing:'.03em'}}>
            Vă rugăm să confirmați prezența<br/>până pe <strong style={{color:P.crimson,fontStyle:'normal'}}>1 Aprilie 2027</strong>
          </p>
          <button onClick={()=>setModal(true)} style={{display:'block',width:'100%',padding:'clamp(14px,1.8vw,18px) 0',borderRadius:100,background:`linear-gradient(135deg,${P.crimson} 0%,${P.rose} 50%,${P.peony} 100%)`,color:'#fff',textAlign:'center',fontFamily:"'Cinzel',serif",fontSize:'clamp(11px,1.3vw,13px)',fontWeight:600,letterSpacing:'.2em',textTransform:'uppercase',cursor:'pointer',border:'none',boxShadow:`0 10px 36px rgba(123,26,46,.38)`,transition:'transform .22s,box-shadow .22s',position:'relative',overflow:'hidden'}}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-3px)';(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 18px 48px rgba(123,26,46,.55)`}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 10px 36px rgba(123,26,46,.38)`}}>
            <span style={{position:'relative',zIndex:1}}>♥ Confirmă Prezența ♥</span>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent)',backgroundSize:'350px 100%',animation:'rm-shimmer 3s linear infinite'}}/>
          </button>
        </div>

        {/* CHOOSE BAR */}
        <div style={{...a(.68),width:'100%',padding:'22px 24px 26px',background:`rgba(255,251,251,.65)`,border:`1px solid rgba(196,80,106,.18)`,borderRadius:22,display:'flex',flexDirection:'column',alignItems:'center',gap:14,backdropFilter:'blur(8px)',marginTop:16,boxShadow:`0 4px 24px rgba(123,26,46,.06)`,position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-20,right:-20,opacity:.08,pointerEvents:'none'}}><PeonyBloom size={90}/></div>
          <div style={{display:'flex',justifyContent:'center'}}><HeartSVG size={18} color={P.blush}/></div>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontStyle:'italic',color:P.textlt,letterSpacing:'.04em',margin:0,textAlign:'center'}}>
            Îți place această temă? Creează-ți propria poveste de dragoste
          </p>
          <a href="/preturi?tema=romantic" style={{display:'inline-flex',alignItems:'center',gap:10,padding:'13px 36px',borderRadius:100,background:`linear-gradient(135deg,${P.crimson},${P.rose})`,color:'#fff',textDecoration:'none',fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:600,letterSpacing:'.15em',textTransform:'uppercase',boxShadow:`0 8px 28px rgba(123,26,46,.32)`,transition:'transform .2s,box-shadow .2s'}}
            onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLAnchorElement).style.boxShadow=`0 14px 40px rgba(123,26,46,.48)`}}
            onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='';(e.currentTarget as HTMLAnchorElement).style.boxShadow=`0 8px 28px rgba(123,26,46,.32)`}}>
            ♥ Alege Această Temă
          </a>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.2em',textTransform:'uppercase',color:`rgba(138,74,88,.4)`,margin:0}}>VibeInvite © 2026 · Toate drepturile rezervate</p>
        </div>
      </div>

      {/* ═══ RSVP MODAL ═══ */}
      {modal&&(
        <div onClick={()=>setModal(false)} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(45,10,18,.55)',backdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16,animation:'rm-fadeIn .28s ease',overflowY:'auto'}}>
          <div onClick={e=>e.stopPropagation()} style={{background:`linear-gradient(165deg,${P.white},${P.cream})`,borderRadius:24,padding:'clamp(26px,4vw,40px) clamp(20px,4vw,34px)',maxWidth:480,width:'100%',border:`1.5px solid rgba(196,80,106,.22)`,boxShadow:`0 40px 100px rgba(45,10,18,.35)`,animation:'rm-slideUp .3s cubic-bezier(.4,0,.2,1)',maxHeight:'92vh',overflowY:'auto',position:'relative'}}>
            <div style={{position:'absolute',top:0,left:'12%',right:'12%',height:2,background:`linear-gradient(90deg,transparent,${P.peony},transparent)`}}/>
            <div style={{textAlign:'center',marginBottom:22}}>
              <div style={{display:'flex',justifyContent:'center',marginBottom:10,animation:'rm-heartbeat 2.4s ease-in-out infinite'}}><HeartSVG size={28} color={P.peony}/></div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(22px,3.5vw,30px)',fontStyle:'italic',fontWeight:400,color:P.crimson,marginBottom:6}}>Confirmă Prezența</h2>
              <div style={{width:32,height:1,background:`rgba(196,80,106,.35)`,margin:'0 auto 10px'}}/>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontStyle:'italic',color:P.textlt,lineHeight:1.7}}>Toate câmpurile sunt opționale.</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:P.textlt,marginBottom:6}}>Nume și Prenume</label>
                <input type="text" placeholder="Maria Popescu" style={inputS} onFocus={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(196,80,106,.55)'} onBlur={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(196,80,106,.22)'}/>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,fontStyle:'italic',color:`rgba(138,74,88,.55)`,marginTop:4}}>Numele și prenumele dumneavoastră.</p>
              </div>
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:P.textlt,marginBottom:8}}>Răspuns</label>
                <div style={{display:'flex',gap:8}}>
                  {['Particip','Nu Particip'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(196,80,106,.5)';el.style.background=`rgba(255,240,242,.8)`;el.style.color=P.crimson}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(196,80,106,.2)';el.style.background=`rgba(255,251,251,.8)`;el.style.color=P.textlt}}>
                      <input type="radio" name="raspuns" value={opt} style={{accentColor:P.crimson}}/>{opt}
                    </label>
                  ))}
                </div>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,fontStyle:'italic',color:`rgba(138,74,88,.5)`,marginTop:4}}>Dacă refuzați, selectați "Nu Particip".</p>
              </div>
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:P.textlt,marginBottom:8}}>Veți fi însoțit/ă?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Da','Nu'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(196,80,106,.5)';el.style.background=`rgba(255,240,242,.8)`;el.style.color=P.crimson}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(196,80,106,.2)';el.style.background=`rgba(255,251,251,.8)`;el.style.color=P.textlt}}>
                      <input type="radio" name="insotit" value={opt} style={{accentColor:P.crimson}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:P.textlt,marginBottom:6}}>Nume Partener</label>
                <input type="text" placeholder="Ion Popescu" style={inputS} onFocus={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(196,80,106,.55)'} onBlur={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(196,80,106,.22)'}/>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,fontStyle:'italic',color:`rgba(138,74,88,.55)`,marginTop:4}}>Persoana care vă va însoți.</p>
              </div>
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:P.textlt,marginBottom:8}}>Veniți cu copii?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Da','Nu'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(196,80,106,.5)';el.style.background=`rgba(255,240,242,.8)`;el.style.color=P.crimson}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(196,80,106,.2)';el.style.background=`rgba(255,251,251,.8)`;el.style.color=P.textlt}}>
                      <input type="radio" name="copii" value={opt} style={{accentColor:P.crimson}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:P.textlt,marginBottom:8}}>Preferințe Meniu</label>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {['2x Meniu Normal','2x Meniu Vegetarian','1x Meniu Normal, 1x Meniu Vegetarian'].map(opt=>(
                    <label key={opt} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:8,border:`1px solid rgba(196,80,106,.2)`,background:`rgba(255,251,251,.8)`,cursor:'pointer',fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:'.08em',color:P.textlt,transition:'all .18s',userSelect:'none'}}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(196,80,106,.5)';el.style.background=`rgba(255,240,242,.8)`;el.style.color=P.crimson}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(196,80,106,.2)';el.style.background=`rgba(255,251,251,.8)`;el.style.color=P.textlt}}>
                      <input type="radio" name="meniu" value={opt} style={{accentColor:P.crimson,flexShrink:0}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:P.textlt,marginBottom:8}}>Cazare Necesară?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Nu','Da'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(196,80,106,.5)';el.style.background=`rgba(255,240,242,.8)`;el.style.color=P.crimson}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(196,80,106,.2)';el.style.background=`rgba(255,251,251,.8)`;el.style.color=P.textlt}}>
                      <input type="radio" name="cazare" value={opt} style={{accentColor:P.crimson}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div style={{marginTop:24}}>
              <button onClick={()=>setModal(false)} style={{display:'block',width:'100%',padding:'14px 0',borderRadius:100,background:`linear-gradient(135deg,${P.crimson},${P.rose},${P.peony})`,color:'#fff',fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:600,letterSpacing:'.2em',textTransform:'uppercase',border:'none',cursor:'pointer',boxShadow:`0 8px 28px rgba(123,26,46,.32)`,transition:'transform .2s'}}
                onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)'}
                onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.transform=''}>
                ♥ Trimite Confirmarea ♥
              </button>
              <div style={{marginTop:14,padding:'14px 16px',background:`rgba(255,240,242,.5)`,border:`1px solid rgba(196,80,106,.18)`,borderRadius:12}}>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontStyle:'italic',color:P.textlt,lineHeight:1.8}}>
                  Mulțumim! ♥<br/>Aceasta este o demonstrație a temei <strong style={{color:P.crimson,fontStyle:'normal'}}>Romantic</strong>.<br/>Achiziționează pachetul pentru a activa confirmările.
                </p>
              </div>
              <button onClick={()=>setModal(false)} style={{marginTop:10,background:'none',border:'none',cursor:'pointer',fontFamily:"'Cinzel',serif",fontSize:9,color:`rgba(138,74,88,.45)`,letterSpacing:'.14em',textTransform:'uppercase',display:'block',width:'100%',textAlign:'center'}}>Închide</button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {uploadModal&&(
        <div onClick={()=>setUploadModal(false)} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(45,10,18,.58)',backdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,animation:'rm-fadeIn .28s ease'}}>
          <div onClick={e=>e.stopPropagation()} style={{background:`linear-gradient(165deg,${P.white},${P.cream})`,borderRadius:24,padding:'38px 32px',maxWidth:380,width:'100%',border:`1.5px solid rgba(196,80,106,.22)`,boxShadow:`0 40px 100px rgba(45,10,18,.35)`,textAlign:'center',animation:'rm-slideUp .3s cubic-bezier(.4,0,.2,1)',position:'relative'}}>
            <div style={{position:'absolute',top:0,left:'12%',right:'12%',height:2,background:`linear-gradient(90deg,transparent,${P.peony},transparent)`}}/>
            <div style={{display:'flex',justifyContent:'center',marginBottom:14}}>
              <div style={{width:68,height:68,borderRadius:'50%',background:`rgba(196,80,106,.1)`,border:`2px solid rgba(196,80,106,.25)`,display:'flex',alignItems:'center',justifyContent:'center',color:P.peony}}><CameraIcon/></div>
            </div>
            <div style={{display:'flex',justifyContent:'center',marginBottom:10}}><HeartSVG size={16} color={P.blush}/></div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontStyle:'italic',fontWeight:400,color:P.crimson,marginBottom:8}}>Încarcă pozele!</h2>
            <div style={{width:28,height:1,background:`rgba(196,80,106,.35)`,margin:'0 auto 12px'}}/>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontStyle:'italic',color:P.textlt,marginBottom:24,lineHeight:1.8}}>
              Aceasta este o demonstrație a temei <strong style={{color:P.crimson,fontStyle:'normal'}}>Romantic</strong>.<br/>Funcția de upload foto se activează după achiziționarea pachetului.
            </p>
            <button onClick={()=>setUploadModal(false)} style={{padding:'12px 36px',borderRadius:100,background:`linear-gradient(135deg,${P.crimson},${P.rose})`,color:'#fff',fontSize:11,fontWeight:600,fontFamily:"'Cinzel',serif",letterSpacing:'.18em',textTransform:'uppercase',border:'none',cursor:'pointer',boxShadow:`0 6px 22px rgba(123,26,46,.3)`}}>Închide</button>
          </div>
        </div>
      )}
    </div>
  )
}

function clamp(val:number,min:number,max:number){ return Math.min(Math.max(val,min),max) }

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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,300;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{height:100%;overflow:hidden;-webkit-font-smoothing:antialiased;}
        body{font-family:'Lato',sans-serif;background:${P.cream};color:${P.dark};}

        @keyframes rm-fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes rm-envFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes rm-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes rm-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes rm-pulse{0%,100%{opacity:.45}50%{opacity:.9}}
        @keyframes rm-heartbeat{0%{transform:scale(1)}14%{transform:scale(1.22)}28%{transform:scale(1)}42%{transform:scale(1.12)}70%{transform:scale(1)}100%{transform:scale(1)}}
        @keyframes rm-shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
        @keyframes rm-fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes rm-slideUp{from{opacity:0;transform:scale(.93) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes rm-petal{0%,100%{transform:translateY(0) rotate(0deg)}33%{transform:translateY(-18px) rotate(8deg)}66%{transform:translateY(-8px) rotate(-5deg)}}
        @media(max-width:480px){body{overflow:hidden}}
      `}</style>

      {/* HEADER — rose tinted */}
      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:200,height:56,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 clamp(16px,4vw,28px)',background:`rgba(253,245,246,.95)`,borderBottom:`1px solid rgba(196,80,106,.14)`,backdropFilter:'blur(14px)'}}>
        <a href="/invitatii-digitale" style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:600,letterSpacing:'.22em',textTransform:'uppercase',color:P.crimson,textDecoration:'none',transition:'color .2s'}}
          onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.color=P.rose}
          onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.color=P.crimson}>
          Vibe<span style={{color:P.blush}}>Invite</span>
        </a>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontStyle:'italic',color:P.textlt,letterSpacing:'.05em'}}>
          {phase==='invite'?'Isabela & Octavian · 3 Mai 2027':'Invitație Romantic'}
        </div>
        <a href="/invitatii-digitale" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:100,background:`rgba(196,80,106,.08)`,border:`1px solid rgba(196,80,106,.2)`,color:P.crimson,fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',cursor:'pointer',textDecoration:'none',transition:'all .2s'}}
          onMouseEnter={e=>{const b=e.currentTarget as HTMLAnchorElement;b.style.background=`rgba(196,80,106,.16)`;b.style.borderColor='rgba(196,80,106,.38)'}}
          onMouseLeave={e=>{const b=e.currentTarget as HTMLAnchorElement;b.style.background=`rgba(196,80,106,.08)`;b.style.borderColor='rgba(196,80,106,.2)'}}>
          <BackArrow/> Înapoi
        </a>
      </header>

      {phase!=='invite'&&<EnvelopeScreen onOpen={openEnvelope} phase={phase}/>}
      {phase==='invite'&&<InviteScreen onBack={()=>setPhase('envelope')}/>}
    </>
  )
}
