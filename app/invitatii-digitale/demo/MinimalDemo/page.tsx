'use client'

import { useState, useEffect } from 'react'

function useSEO() {
  useEffect(() => {
    document.title = 'Invitații Nuntă Online | Demo Stil Minimal — VibeInvite'
    const m = (sel:string,attr:string,val:string,cnt:string) => {
      let el = document.querySelector(sel)
      if (!el) { el=document.createElement('meta'); el.setAttribute(attr,val); document.head.appendChild(el) }
      el.setAttribute('content',cnt)
    }
    m('meta[name="description"]','name','description','Invitație digitală de nuntă în stil Minimal — alb imaculat, negru pur, eleganță prin simplitate. Crează-ți invitația online în 3 minute. RSVP instant, link free, GPS, upload poze nuntă.')
    m('meta[name="keywords"]','name','keywords','invitatii nunta online, invitatii nunta minimale, invitatie nunta minimalista, invitatie nunta alb negru, invitatie nunta simpla eleganta, invitatie nunta moderna, invitatie online free, link invitatie nunta, invitatii digitale nunta romania, creare invitatie nunta online, RSVP nunta online, confirmare prezenta nunta, upload poze nunta, vibeinvite, invitatii nunta contemporane, invitatie nunta clean design, invitatii nunta editorial')
    m('meta[property="og:title"]','property','og:title','Invitații Nuntă Online Minimal — VibeInvite Demo')
    m('meta[property="og:description"]','property','og:description','Demo invitație digitală de nuntă în stil Minimal Editorial. Alb, negru, accente îndrăznețe. RSVP instant, GPS, upload poze.')
    m('meta[property="og:type"]','property','og:type','website')
    m('meta[property="og:url"]','property','og:url','https://vibeinvite.ro/invitatii-digitale/demo/MinimalDemo')
    m('meta[property="og:site_name"]','property','og:site_name','VibeInvite')
    m('meta[property="og:image"]','property','og:image','https://vibeinvite.ro/og-minimal.jpg')
    m('meta[property="og:locale"]','property','og:locale','ro_RO')
    m('meta[name="twitter:card"]','name','twitter:card','summary_large_image')
    m('meta[name="twitter:title"]','name','twitter:title','Invitații Nuntă Online Minimal — VibeInvite')
    m('meta[name="twitter:description"]','name','twitter:description','Invitație digitală de nuntă minimalistă editorial. Alb negru cu accente. RSVP, GPS.')
    m('meta[name="twitter:image"]','name','twitter:image','https://vibeinvite.ro/og-minimal.jpg')
    let canon = document.querySelector('link[rel="canonical"]')
    if (!canon) { canon=document.createElement('link'); canon.setAttribute('rel','canonical'); document.head.appendChild(canon) }
    canon.setAttribute('href','https://vibeinvite.ro/invitatii-digitale/demo/MinimalDemo')
    if (!document.querySelector('script[data-ld="minimal"]')) {
      const ld = document.createElement('script')
      ld.setAttribute('type','application/ld+json')
      ld.setAttribute('data-ld','minimal')
      ld.textContent = JSON.stringify([
        { '@context':'https://schema.org','@type':'WebPage', name:'Invitații Nuntă Online — Demo Stil Minimal', description:'Demo invitație digitală de nuntă în stil Minimal Editorial.', url:'https://vibeinvite.ro/invitatii-digitale/demo/MinimalDemo', inLanguage:'ro', isPartOf:{ '@type':'WebSite',name:'VibeInvite',url:'https://vibeinvite.ro'}, breadcrumb:{ '@type':'BreadcrumbList', itemListElement:[{ '@type':'ListItem',position:1,name:'Acasă',item:'https://vibeinvite.ro'},{ '@type':'ListItem',position:2,name:'Invitații Digitale',item:'https://vibeinvite.ro/invitatii-digitale'},{ '@type':'ListItem',position:3,name:'Demo Stil Minimal',item:'https://vibeinvite.ro/invitatii-digitale/demo/MinimalDemo'}]}},
        { '@context':'https://schema.org','@type':'SoftwareApplication', name:'VibeInvite', applicationCategory:'LifestyleApplication', operatingSystem:'Web', url:'https://vibeinvite.ro', offers:{ '@type':'Offer',price:'0',priceCurrency:'RON'}, aggregateRating:{ '@type':'AggregateRating',ratingValue:'4.9',ratingCount:'1240'}},
        { '@context':'https://schema.org','@type':'FAQPage', mainEntity:[
          { '@type':'Question',name:'Ce înseamnă o invitație de nuntă minimalistă?',acceptedAnswer:{ '@type':'Answer',text:'O invitație de nuntă minimalistă folosește spațiu alb, tipografie clară și un limbaj esențial. Eleganța vine din simplitate — fiecare element are un scop.'}},
          { '@type':'Question',name:'Invitațiile digitale minimaliste sunt elegante?',acceptedAnswer:{ '@type':'Answer',text:'Absolut. Stilul Minimal Editorial de pe VibeInvite combină tipografie puternică cu accente de culoare îndrăznețe — potrivit pentru cuplurile moderne și rafinate.'}},
          { '@type':'Question',name:'Cum creez o invitație de nuntă online modernă?',acceptedAnswer:{ '@type':'Answer',text:'Pe VibeInvite poți crea o invitație digitală modernă în 3 minute. Alegi tema, completezi detaliile și primești un link gratuit.'}},
          { '@type':'Question',name:'Pot colecta poze de la invitați la nuntă?',acceptedAnswer:{ '@type':'Answer',text:'Da! VibeInvite include upload foto. Invitații pot încărca poze din telefon, iar mirii accesează totul într-un album privat.'}},
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

// ── ACCENT COLOR — warm terracotta/blush for that editorial pop
const ACCENT = '#C8503A'
const ACCENT2 = '#E8C4B8'
const DARK = '#111111'
const MID = '#555555'
const LIGHT = '#AAAAAA'
const RULE = '#E2E2E2'

// ── SVG COMPONENTS ──
const WazeIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/></svg>)
const MapsIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>)
const PhoneIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>)
const WaIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>)
const BackArrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>)

type Phase = 'envelope' | 'opening' | 'invite'

/* ── ENVELOPE ── */
function EnvelopeScreen({ onOpen, phase }:{onOpen:()=>void,phase:Phase}) {
  return (
    <div style={{position:'fixed',inset:0,top:56,background:'#F7F4F0',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
      {/* Large editorial background text */}
      <div aria-hidden style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none',overflow:'hidden'}}>
        <span style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(140px,28vw,340px)',fontWeight:700,fontStyle:'italic',color:'rgba(0,0,0,.035)',letterSpacing:'-.04em',userSelect:'none',lineHeight:1,whiteSpace:'nowrap'}}>
          Sofia
        </span>
      </div>

      {/* Accent stripe top-left */}
      <div style={{position:'absolute',top:0,left:0,width:'clamp(4px,0.5vw,6px)',height:'100%',background:ACCENT,zIndex:1}}/>

      {/* Center content */}
      <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',gap:18,padding:'24px',maxWidth:560,width:'100%'}}>

        {/* Eyebrow with accent line */}
        <div style={{display:'flex',alignItems:'center',gap:12,animation:'mn-fadeUp .5s ease both'}}>
          <div style={{width:28,height:2,background:ACCENT}}/>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.36em',textTransform:'uppercase',color:LIGHT,fontWeight:500}}>
            Invitație · 2027
          </p>
          <div style={{width:28,height:2,background:ACCENT}}/>
        </div>

        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(38px,6vw,72px)',fontWeight:400,fontStyle:'italic',color:DARK,textAlign:'center',lineHeight:1.08,animation:'mn-fadeUp .65s ease both .06s',margin:0,letterSpacing:'-.01em'}}>
          Sofia &amp; Andrei
        </h1>

        {/* ENVELOPE */}
        <div onClick={onOpen} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&onOpen()}
          style={{position:'relative',width:'clamp(290px,44vw,500px)',cursor:'pointer',userSelect:'none',animation:'mn-envFloat 6s ease-in-out infinite, mn-fadeUp .75s ease both .1s'}}>

          <div style={{position:'absolute',bottom:-14,left:'10%',right:'10%',height:18,background:'radial-gradient(ellipse,rgba(0,0,0,.1) 0%,transparent 70%)',filter:'blur(10px)',zIndex:0}}/>

          {/* LETTER */}
          <div style={{
            position:'absolute',left:'9%',right:'9%',bottom:'4%',height:'60%',
            zIndex:phase==='opening'?30:2,
            background:'#fff',
            borderLeft:`4px solid ${ACCENT}`,
            display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center',gap:6,
            paddingLeft:20, paddingRight:16,
            boxShadow:phase==='opening'?'0 28px 70px rgba(0,0,0,.2),0 4px 20px rgba(0,0,0,.1)':'0 2px 8px rgba(0,0,0,.05)',
            transform:phase==='opening'?'translateY(-142%) scale(1.04) rotate(-0.5deg)':'translateY(0)',
            transition:'transform 1.3s cubic-bezier(.22,.1,.2,1) .22s,box-shadow 1.3s ease .22s',
            overflow:'hidden',
          }}>
            {/* Subtle ruled paper */}
            <div style={{position:'absolute',inset:0,opacity:.03,backgroundImage:'repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 1px,transparent 20px)'}}/>
            <div style={{position:'relative',zIndex:1}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(7px,.8vw,9px)',letterSpacing:'.28em',textTransform:'uppercase',color:ACCENT,fontWeight:600,marginBottom:4}}>Nuntă · 3 Mai 2027</p>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(15px,2.5vw,24px)',fontStyle:'italic',fontWeight:400,color:DARK,lineHeight:1.2}}>Sofia &amp; Andrei</p>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(8px,.9vw,10px)',letterSpacing:'.12em',color:LIGHT,fontWeight:400,marginTop:4}}>București, România</p>
            </div>
          </div>

          {/* ENVELOPE BODY */}
          <div style={{width:'100%',paddingTop:'60%',position:'relative',zIndex:5}}>
            <div style={{position:'absolute',inset:0,background:'#E8E4DE',overflow:'hidden',boxShadow:'0 4px 24px rgba(0,0,0,.08)'}}>
              <div style={{position:'absolute',top:0,bottom:0,left:0,width:'50%',background:'#DDD8D0',clipPath:'polygon(0 0,0 100%,100% 100%)'}}/>
              <div style={{position:'absolute',top:0,bottom:0,right:0,width:'50%',background:'#DDD8D0',clipPath:'polygon(100% 0,0 100%,100% 100%)'}}/>
              <div style={{position:'absolute',bottom:0,left:0,right:0,height:'50%',background:'#D4CFC8',clipPath:'polygon(0 100%,50% 0,100% 100%)'}}/>
              {/* Top edge line */}
              <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:ACCENT,opacity:.6}}/>
            </div>
            {/* WAX SEAL — accent colored */}
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-52%)',width:'clamp(52px,8.5vw,76px)',height:'clamp(52px,8.5vw,76px)',background:DARK,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 0 0 3px #F7F4F0, 0 0 0 5px ${ACCENT}, 0 8px 24px rgba(0,0,0,.2)`,zIndex:10,opacity:phase==='opening'?0:1,transition:'opacity .2s'}}>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(11px,1.8vw,17px)',fontStyle:'italic',color:'#fff',letterSpacing:'.02em'}}>S·A</span>
            </div>
            {/* FLAP */}
            <div style={{position:'absolute',top:0,left:0,right:0,zIndex:8,height:'52%',background:'#D8D3CC',clipPath:'polygon(0 0,100% 0,50% 100%)',transformOrigin:'top center',transform:phase==='opening'?'perspective(700px) rotateX(192deg)':'perspective(700px) rotateX(0deg)',transition:'transform .95s cubic-bezier(.4,0,.2,1)',borderBottom:'1px solid #C8C4BC'}}/>
          </div>
        </div>

        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.28em',textTransform:'uppercase',color:LIGHT,animation:phase==='opening'?'none':'mn-fadeUp .85s ease both .28s, mn-pulse 3s ease-in-out infinite 1.1s',fontWeight:400}}>
          {phase==='opening'?'Se deschide...':'Atinge pentru a deschide'}
        </p>
      </div>

      {/* Bottom accent bar */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${ACCENT} 0%,${ACCENT2} 60%,transparent 100%)`,opacity:.6}}/>
    </div>
  )
}

/* ── INVITE SCREEN ── */
function InviteScreen({ onBack:_onBack }:{onBack:()=>void}) {
  const WEDDING = new Date('2027-05-03T14:00:00')
  const [modal, setModal] = useState(false)
  const [uploadModal, setUploadModal] = useState(false)
  const [vis, setVis] = useState(false)
  const cd = useCountdown(WEDDING)
  const [flipS, setFlipS] = useState(false)

  useEffect(()=>{ const t=setTimeout(()=>setVis(true),60); return()=>clearTimeout(t) },[])
  useEffect(()=>{ setFlipS(true); const t=setTimeout(()=>setFlipS(false),155); return()=>clearTimeout(t) },[cd.s])

  const a=(d:number):React.CSSProperties=>({ opacity:vis?1:0, transform:vis?'translateY(0)':'translateY(18px)', transition:`opacity .65s ease ${d}s,transform .65s ease ${d}s` })

  const inputS:React.CSSProperties={ width:'100%', padding:'11px 0', border:'none', borderBottom:`1px solid ${RULE}`, background:'transparent', fontFamily:"'Playfair Display',serif", fontSize:15, color:DARK, outline:'none' }
  const radioL:React.CSSProperties={ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'11px 10px', border:`1px solid ${RULE}`, background:'#fff', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:12, letterSpacing:'.08em', color:MID, transition:'all .18s', userSelect:'none' }

  return (
    <div style={{position:'fixed',inset:0,top:56,overflowY:'auto',overflowX:'hidden',background:'#F7F4F0'}}>
      {/* Left accent stripe — always visible */}
      <div style={{position:'fixed',top:0,left:0,width:'clamp(4px,0.5vw,6px)',height:'100%',background:ACCENT,zIndex:10,pointerEvents:'none'}}/>

      <div style={{position:'relative',zIndex:2,maxWidth:720,margin:'0 auto',padding:'clamp(44px,7vw,72px) clamp(24px,6vw,56px) 60px clamp(28px,6vw,60px)',display:'flex',flexDirection:'column',alignItems:'flex-start',gap:0}}>

        {/* HERO BLOCK — editorial asymmetric layout */}
        <div style={{...a(0),width:'100%',marginBottom:48}}>
          {/* Eyebrow */}
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
            <div style={{width:40,height:3,background:ACCENT}}/>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.38em',textTransform:'uppercase',color:LIGHT,fontWeight:500}}>Invitație de Nuntă</p>
          </div>
          {/* Massive serif names — left aligned, editorial */}
          <div style={{position:'relative'}}>
            <span style={{display:'block',fontFamily:"'Playfair Display',serif",fontSize:'clamp(56px,10vw,118px)',fontWeight:400,fontStyle:'italic',color:DARK,lineHeight:.88,letterSpacing:'-.02em'}}>
              Sofia
            </span>
            {/* Accent & between */}
            <span style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(10px,1.3vw,13px)',fontWeight:300,color:ACCENT,margin:'8px 0',letterSpacing:'.5em',textTransform:'uppercase'}}>
              &amp;
            </span>
            <span style={{display:'block',fontFamily:"'Playfair Display',serif",fontSize:'clamp(56px,10vw,118px)',fontWeight:400,fontStyle:'italic',color:DARK,lineHeight:.88,letterSpacing:'-.02em'}}>
              Andrei
            </span>
            {/* Large decorative number — editorial watermark */}
            <span aria-hidden style={{position:'absolute',right:-8,top:'50%',transform:'translateY(-50%)',fontFamily:"'Playfair Display',serif",fontSize:'clamp(80px,18vw,220px)',fontWeight:700,color:'rgba(200,80,58,.07)',lineHeight:1,userSelect:'none',pointerEvents:'none',letterSpacing:'-.04em'}}>
              27
            </span>
          </div>
          {/* Date — inline editorial */}
          <div style={{display:'flex',alignItems:'center',gap:16,marginTop:20}}>
            <div style={{width:40,height:1,background:RULE}}/>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(10px,1.2vw,12px)',letterSpacing:'.22em',color:MID,textTransform:'uppercase',fontWeight:400}}>
              Duminică · 3 Mai 2027 · București
            </p>
          </div>
        </div>

        {/* Full-width accent rule */}
        <div style={{...a(.1),width:'100%',height:1,background:`linear-gradient(90deg,${ACCENT},${ACCENT2},transparent)`,marginBottom:40}}/>

        {/* NAȘI — two-column editorial block */}
        <div style={{...a(.14),width:'100%',display:'grid',gridTemplateColumns:'auto 1fr',gap:'clamp(16px,3vw,32px)',alignItems:'center',marginBottom:40,paddingBottom:32,borderBottom:`1px solid ${RULE}`}}>
          <div style={{width:'clamp(48px,6vw,64px)',height:'clamp(48px,6vw,64px)',background:DARK,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{width:24,height:24}}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.3em',textTransform:'uppercase',color:ACCENT,fontWeight:600,marginBottom:4}}>Nași de onoare</p>
            <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,2.6vw,28px)',fontStyle:'italic',fontWeight:400,color:DARK}}>Elena &amp; Radu Ionescu</p>
          </div>
        </div>

        {/* COUNTDOWN — high contrast blocks */}
        <div style={{...a(.20),width:'100%',marginBottom:40}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.3em',textTransform:'uppercase',color:LIGHT,marginBottom:16,fontWeight:500}}>Timp rămas</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'clamp(4px,1vw,8px)'}}>
            {[{n:pad(cd.d),l:'Zile'},{n:pad(cd.h),l:'Ore'},{n:pad(cd.m),l:'Minute'},{n:pad(cd.s),l:'Secunde',flip:flipS}].map((u,i)=>(
              <div key={u.l} style={{background: i===0 ? DARK : i===1 ? ACCENT : i===2 ? '#fff' : '#F7F4F0', padding:'clamp(14px,2vw,22px) clamp(8px,1.5vw,16px)', border:`1px solid ${i===2||i===3?RULE:'transparent'}`}}>
                <span style={{display:'block',fontFamily:"'Playfair Display',serif",fontSize:'clamp(32px,5.5vw,56px)',fontWeight:400,fontStyle:'italic',lineHeight:1,color: i===0||i===1 ? '#fff' : DARK,transition:'opacity .12s',opacity:(u as any).flip?.5:1}}>{u.n}</span>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(7px,.78vw,9px)',letterSpacing:'.22em',textTransform:'uppercase',color: i===0||i===1 ? 'rgba(255,255,255,.6)' : LIGHT,display:'block',marginTop:4,fontWeight:400}}>{u.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* LOCATION CARDS — strong editorial cards */}
        <div style={{...a(.28),width:'100%',marginBottom:40}}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
            <div style={{width:24,height:2,background:ACCENT}}/>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.3em',textTransform:'uppercase',color:LIGHT,fontWeight:500}}>Locații</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))',gap:'clamp(10px,2vw,16px)'}}>
            {/* Church — dark card */}
            <div style={{background:DARK,padding:'clamp(20px,3vw,28px)',position:'relative',overflow:'hidden',transition:'transform .22s ease,box-shadow .22s ease'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform='translateY(-3px)';(e.currentTarget as HTMLDivElement).style.boxShadow=`0 16px 44px rgba(0,0,0,.25)`}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform='';(e.currentTarget as HTMLDivElement).style.boxShadow=''}}>
              {/* Accent left border */}
              <div style={{position:'absolute',top:0,left:0,width:4,height:'100%',background:ACCENT}}/>
              <div style={{paddingLeft:12}}>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.3em',textTransform:'uppercase',color:ACCENT,fontWeight:600,marginBottom:8}}>Cununia</p>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(17px,2.2vw,22px)',fontStyle:'italic',fontWeight:400,color:'#fff',marginBottom:4,lineHeight:1.25}}>Biserica Sfântul Iosif</p>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:'rgba(255,255,255,.45)',marginBottom:12,letterSpacing:'.03em'}}>Str. General Berthelot, București</p>
                <div style={{display:'inline-block',background:ACCENT,padding:'4px 12px',marginBottom:16}}>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'#fff',fontWeight:600}}>3 mai · 14:00</span>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'8px 12px',border:'1px solid rgba(255,255,255,.18)',fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.08em',color:'rgba(255,255,255,.65)',cursor:'default',flex:1,justifyContent:'center',transition:'all .18s'}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor='rgba(255,255,255,.4)';(e.currentTarget as HTMLDivElement).style.color='#fff'}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor='rgba(255,255,255,.18)';(e.currentTarget as HTMLDivElement).style.color='rgba(255,255,255,.65)'}}>
                    <WazeIcon/> Waze
                  </div>
                  <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'8px 12px',border:'1px solid rgba(255,255,255,.18)',fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.08em',color:'rgba(255,255,255,.65)',cursor:'default',flex:1,justifyContent:'center',transition:'all .18s'}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor='rgba(255,255,255,.4)';(e.currentTarget as HTMLDivElement).style.color='#fff'}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor='rgba(255,255,255,.18)';(e.currentTarget as HTMLDivElement).style.color='rgba(255,255,255,.65)'}}>
                    <MapsIcon/> Maps
                  </div>
                </div>
              </div>
              {/* Large ghost number */}
              <span aria-hidden style={{position:'absolute',right:-8,bottom:-16,fontFamily:"'Playfair Display',serif",fontSize:80,fontWeight:700,color:'rgba(255,255,255,.04)',userSelect:'none',lineHeight:1}}>01</span>
            </div>

            {/* Reception — accent card */}
            <div style={{background:ACCENT,padding:'clamp(20px,3vw,28px)',position:'relative',overflow:'hidden',transition:'transform .22s ease,box-shadow .22s ease'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform='translateY(-3px)';(e.currentTarget as HTMLDivElement).style.boxShadow=`0 16px 44px rgba(200,80,58,.35)`}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform='';(e.currentTarget as HTMLDivElement).style.boxShadow=''}}>
              <div style={{position:'absolute',top:0,left:0,width:4,height:'100%',background:'#fff',opacity:.4}}/>
              <div style={{paddingLeft:12}}>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.3em',textTransform:'uppercase',color:'rgba(255,255,255,.75)',fontWeight:600,marginBottom:8}}>Recepția</p>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(17px,2.2vw,22px)',fontStyle:'italic',fontWeight:400,color:'#fff',marginBottom:4,lineHeight:1.25}}>Palatul Știrbey</p>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:'rgba(255,255,255,.55)',marginBottom:12,letterSpacing:'.03em'}}>Calea Victoriei, București</p>
                <div style={{display:'inline-block',background:'rgba(0,0,0,.25)',padding:'4px 12px',marginBottom:16}}>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(255,255,255,.9)',fontWeight:600}}>3 mai · 18:00</span>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'8px 12px',border:'1px solid rgba(255,255,255,.35)',fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.08em',color:'rgba(255,255,255,.8)',cursor:'default',flex:1,justifyContent:'center',transition:'all .18s'}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background='rgba(255,255,255,.15)';(e.currentTarget as HTMLDivElement).style.color='#fff'}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background='transparent';(e.currentTarget as HTMLDivElement).style.color='rgba(255,255,255,.8)'}}>
                    <WazeIcon/> Waze
                  </div>
                  <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'8px 12px',border:'1px solid rgba(255,255,255,.35)',fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.08em',color:'rgba(255,255,255,.8)',cursor:'default',flex:1,justifyContent:'center',transition:'all .18s'}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background='rgba(255,255,255,.15)';(e.currentTarget as HTMLDivElement).style.color='#fff'}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background='transparent';(e.currentTarget as HTMLDivElement).style.color='rgba(255,255,255,.8)'}}>
                    <MapsIcon/> Maps
                  </div>
                </div>
              </div>
              <span aria-hidden style={{position:'absolute',right:-8,bottom:-16,fontFamily:"'Playfair Display',serif",fontSize:80,fontWeight:700,color:'rgba(255,255,255,.1)',userSelect:'none',lineHeight:1}}>02</span>
            </div>
          </div>
        </div>

        {/* CONTACT — horizontal strip */}
        <div style={{...a(.36),width:'100%',marginBottom:40,background:'#fff',padding:'clamp(18px,2.5vw,24px) clamp(20px,3vw,28px)',borderLeft:`4px solid ${DARK}`,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16,boxShadow:'0 2px 16px rgba(0,0,0,.05)'}}>
          <div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.3em',textTransform:'uppercase',color:ACCENT,fontWeight:600,marginBottom:3}}>Contact Mireasă</p>
            <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(17px,2.2vw,22px)',fontStyle:'italic',color:DARK,marginBottom:2}}>Sofia</p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:MID,letterSpacing:'.06em',fontWeight:400}}>0752 954 258</p>
          </div>
          <div style={{display:'flex',gap:8}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:7,padding:'10px 18px',background:DARK,color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',cursor:'default',fontWeight:500,transition:'opacity .18s'}}
              onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.opacity='.75'}
              onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.opacity='1'}>
              <PhoneIcon/> Telefon
            </div>
            <div style={{display:'inline-flex',alignItems:'center',gap:7,padding:'10px 18px',background:'#25D366',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',cursor:'default',fontWeight:500,transition:'opacity .18s'}}
              onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.opacity='.82'}
              onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.opacity='1'}>
              <WaIcon/> WhatsApp
            </div>
          </div>
        </div>

        {/* PHOTO UPLOAD — editorial full-width */}
        <div style={{...a(.42),width:'100%',marginBottom:40}}>
          <div style={{background:DARK,padding:'clamp(28px,4vw,44px)',position:'relative',overflow:'hidden'}}>
            {/* Accent stripe right */}
            <div style={{position:'absolute',top:0,right:0,width:4,height:'100%',background:ACCENT,opacity:.7}}/>
            {/* Ghost camera watermark */}
            <div aria-hidden style={{position:'absolute',right:24,top:'50%',transform:'translateY(-50%)',opacity:.04,pointerEvents:'none'}}>
              <svg viewBox="0 0 80 80" fill="white" style={{width:'clamp(60px,12vw,110px)',height:'clamp(60px,12vw,110px)'}}>
                <rect x="4" y="22" width="72" height="50" rx="4"/>
                <path d="M24 22L28 12h24l4 10"/>
                <circle cx="40" cy="47" r="14"/>
                <circle cx="40" cy="47" r="8"/>
                <circle cx="62" cy="32" r="4"/>
              </svg>
            </div>
            <div style={{position:'relative',zIndex:1,maxWidth:440}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.3em',textTransform:'uppercase',color:ACCENT,fontWeight:600,marginBottom:10}}>Upload foto · Live</p>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,2.8vw,30px)',fontStyle:'italic',fontWeight:400,color:'#fff',marginBottom:12,lineHeight:1.2}}>
                Împărtășiți momentele<br/>cu noi
              </h3>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(12px,1.4vw,14px)',color:'rgba(255,255,255,.5)',lineHeight:1.85,marginBottom:20,fontWeight:300}}>
                Faceți poze în timpul nunții și încărcați-le direct din telefon. Mirii vor accesa toate imaginile voastre într-un album privat — amintiri adunate din toate unghiurile.
              </p>
              <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:24}}>
                {['Poze din toate unghiurile','Album privat','Fără limită','Acces securizat'].map(tag=>(
                  <span key={tag} style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.1em',color:'rgba(255,255,255,.45)',border:'1px solid rgba(255,255,255,.15)',padding:'4px 10px',fontWeight:400}}>{tag}</span>
                ))}
              </div>
              <button onClick={()=>setUploadModal(true)} style={{display:'inline-flex',alignItems:'center',gap:10,padding:'12px 24px',background:ACCENT,color:'#fff',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:12,letterSpacing:'.18em',textTransform:'uppercase',fontWeight:500,transition:'opacity .18s'}}
                onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.opacity='.82'}
                onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.opacity='1'}>
                <svg viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><path d="M9 13V3M4 8l5-5 5 5"/><path d="M2 15h14"/></svg>
                Încarcă pozele
              </button>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:'rgba(255,255,255,.28)',marginTop:10,letterSpacing:'.08em'}}>disponibil în ziua nunții și 72h după</p>
            </div>
          </div>
        </div>

        {/* RSVP */}
        <div style={{...a(.50),width:'100%',marginBottom:40}}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
            <div style={{width:24,height:2,background:ACCENT}}/>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.3em',textTransform:'uppercase',color:LIGHT,fontWeight:500}}>Confirmare prezență</p>
          </div>
          <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(14px,1.7vw,18px)',fontStyle:'italic',color:MID,marginBottom:16,lineHeight:1.7}}>
            Vă rugăm să confirmați până pe <strong style={{color:DARK,fontStyle:'normal',fontWeight:500}}>1 Aprilie 2027</strong>
          </p>
          <button onClick={()=>setModal(true)} style={{display:'inline-flex',alignItems:'center',gap:12,padding:'clamp(13px,1.8vw,16px) clamp(24px,3vw,36px)',background:DARK,color:'#fff',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(11px,1.3vw,13px)',fontWeight:500,letterSpacing:'.24em',textTransform:'uppercase',transition:'background .2s',position:'relative',overflow:'hidden'}}
            onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background=ACCENT}
            onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background=DARK}>
            Confirmă Prezența
            <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:12,height:12}}><path d="M2 8h12M9 3l5 5-5 5"/></svg>
          </button>
        </div>

        {/* CHOOSE BAR */}
        <div style={{...a(.58),width:'100%',paddingTop:28,borderTop:`2px solid ${DARK}`,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:14}}>
          <div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.28em',textTransform:'uppercase',color:LIGHT,marginBottom:4,fontWeight:400}}>VibeInvite · Tema Minimal</p>
            <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(14px,1.6vw,16px)',fontStyle:'italic',color:MID}}>Îți place? Personalizează-o pentru nunta ta.</p>
          </div>
          <a href="/preturi?tema=minimal" style={{display:'inline-flex',alignItems:'center',gap:10,padding:'12px 24px',background:ACCENT,color:'#fff',textDecoration:'none',fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',fontWeight:500,transition:'opacity .18s'}}
            onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.opacity='.82'}
            onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.opacity='1'}>
            Alege Această Temă
          </a>
        </div>
        <p style={{...a(.62),fontFamily:"'DM Sans',sans-serif",fontSize:9,color:LIGHT,letterSpacing:'.2em',textTransform:'uppercase',marginTop:12}}>VibeInvite © 2026</p>

      </div>

      {/* ═══ RSVP MODAL ═══ */}
      {modal&&(
        <div onClick={()=>setModal(false)} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(247,244,240,.94)',backdropFilter:'blur(14px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16,animation:'mn-fadeIn .22s ease',overflowY:'auto'}}>
          <div onClick={e=>e.stopPropagation()} style={{background:'#fff',padding:'clamp(28px,4vw,44px) clamp(22px,4vw,40px)',maxWidth:500,width:'100%',borderTop:`4px solid ${ACCENT}`,boxShadow:'0 24px 80px rgba(0,0,0,.12)',animation:'mn-slideUp .28s cubic-bezier(.4,0,.2,1)',maxHeight:'92vh',overflowY:'auto'}}>
            <div style={{marginBottom:28}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                <div style={{width:20,height:3,background:ACCENT}}/>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.3em',textTransform:'uppercase',color:ACCENT,fontWeight:600}}>Confirmare</p>
              </div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(24px,3.5vw,32px)',fontStyle:'italic',fontWeight:400,color:DARK,marginBottom:4}}>Confirmă Prezența</h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:LIGHT,letterSpacing:'.12em',textTransform:'uppercase',fontWeight:400}}>toate câmpurile sunt opționale</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              {/* Nume */}
              <div>
                <label style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.26em',textTransform:'uppercase',color:LIGHT,marginBottom:6,fontWeight:500}}>Nume și Prenume</label>
                <input type="text" placeholder="Maria Popescu" style={inputS} onFocus={e=>{(e.currentTarget as HTMLInputElement).style.borderBottomColor=ACCENT}} onBlur={e=>{(e.currentTarget as HTMLInputElement).style.borderBottomColor=RULE}}/>
              </div>
              {/* Raspuns */}
              <div>
                <label style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.26em',textTransform:'uppercase',color:LIGHT,marginBottom:8,fontWeight:500}}>Răspuns</label>
                <div style={{display:'flex',gap:8}}>
                  {['Particip','Nu Particip'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor=ACCENT;el.style.color=DARK;el.style.background=`${ACCENT}10`}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor=RULE;el.style.color=MID;el.style.background='#fff'}}>
                      <input type="radio" name="raspuns" value={opt} style={{accentColor:ACCENT}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* Insotit */}
              <div>
                <label style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.26em',textTransform:'uppercase',color:LIGHT,marginBottom:8,fontWeight:500}}>Veți fi însoțit/ă?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Da','Nu'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor=ACCENT;el.style.color=DARK;el.style.background=`${ACCENT}10`}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor=RULE;el.style.color=MID;el.style.background='#fff'}}>
                      <input type="radio" name="insotit" value={opt} style={{accentColor:ACCENT}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* Partener */}
              <div>
                <label style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.26em',textTransform:'uppercase',color:LIGHT,marginBottom:6,fontWeight:500}}>Nume Partener</label>
                <input type="text" placeholder="Ion Popescu" style={inputS} onFocus={e=>{(e.currentTarget as HTMLInputElement).style.borderBottomColor=ACCENT}} onBlur={e=>{(e.currentTarget as HTMLInputElement).style.borderBottomColor=RULE}}/>
              </div>
              {/* Copii */}
              <div>
                <label style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.26em',textTransform:'uppercase',color:LIGHT,marginBottom:8,fontWeight:500}}>Veniți cu copii?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Da','Nu'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor=ACCENT;el.style.color=DARK;el.style.background=`${ACCENT}10`}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor=RULE;el.style.color=MID;el.style.background='#fff'}}>
                      <input type="radio" name="copii" value={opt} style={{accentColor:ACCENT}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* Meniu */}
              <div>
                <label style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.26em',textTransform:'uppercase',color:LIGHT,marginBottom:8,fontWeight:500}}>Preferințe Meniu</label>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {['2x Meniu Normal','2x Meniu Vegetarian','1x Meniu Normal, 1x Meniu Vegetarian'].map(opt=>(
                    <label key={opt} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',border:`1px solid ${RULE}`,background:'#fff',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:12,color:MID,transition:'all .18s',userSelect:'none'}}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor=ACCENT;el.style.color=DARK;el.style.background=`${ACCENT}08`}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor=RULE;el.style.color=MID;el.style.background='#fff'}}>
                      <input type="radio" name="meniu" value={opt} style={{accentColor:ACCENT,flexShrink:0}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* Cazare */}
              <div>
                <label style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.26em',textTransform:'uppercase',color:LIGHT,marginBottom:8,fontWeight:500}}>Cazare Necesară?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Nu','Da'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor=ACCENT;el.style.color=DARK;el.style.background=`${ACCENT}10`}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor=RULE;el.style.color=MID;el.style.background='#fff'}}>
                      <input type="radio" name="cazare" value={opt} style={{accentColor:ACCENT}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div style={{marginTop:28}}>
              <button onClick={()=>setModal(false)} style={{display:'block',width:'100%',padding:'14px 0',background:DARK,color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,letterSpacing:'.24em',textTransform:'uppercase',border:'none',cursor:'pointer',transition:'background .18s'}}
                onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background=ACCENT}
                onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background=DARK}>
                Trimite Confirmarea →
              </button>
              <div style={{marginTop:16,padding:'16px',background:'#F7F4F0',borderLeft:`3px solid ${ACCENT}`}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontStyle:'italic',color:MID,lineHeight:1.8}}>
                  Mulțumim.<br/>Aceasta este o demonstrație a temei <strong style={{color:DARK,fontStyle:'normal'}}>Minimal</strong>.<br/>Achiziționează pachetul pentru a activa confirmările.
                </p>
              </div>
              <button onClick={()=>setModal(false)} style={{marginTop:10,background:'none',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:10,color:LIGHT,letterSpacing:'.16em',textTransform:'uppercase',display:'block',width:'100%',textAlign:'center'}}>Închide</button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {uploadModal&&(
        <div onClick={()=>setUploadModal(false)} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(247,244,240,.94)',backdropFilter:'blur(14px)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,animation:'mn-fadeIn .22s ease'}}>
          <div onClick={e=>e.stopPropagation()} style={{background:DARK,padding:'40px 32px',maxWidth:380,width:'100%',borderTop:`4px solid ${ACCENT}`,boxShadow:'0 24px 80px rgba(0,0,0,.2)',textAlign:'center',animation:'mn-slideUp .28s cubic-bezier(.4,0,.2,1)'}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.3em',textTransform:'uppercase',color:ACCENT,fontWeight:600,marginBottom:16}}>Upload Foto</p>
            <div style={{display:'flex',justifyContent:'center',marginBottom:16,color:'rgba(255,255,255,.35)'}}>
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:44,height:44}}>
                <rect x="4" y="14" width="40" height="28" rx="2"/>
                <path d="M14 14l3-8h14l3 8"/>
                <circle cx="24" cy="28" r="8"/>
                <circle cx="24" cy="28" r="4"/>
                <circle cx="38" cy="21" r="2" fill="currentColor" stroke="none"/>
              </svg>
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontStyle:'italic',fontWeight:400,color:'#fff',marginBottom:10}}>Încarcă pozele</h2>
            <div style={{width:24,height:2,background:ACCENT,margin:'0 auto 14px'}}/>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:'rgba(255,255,255,.5)',marginBottom:24,lineHeight:1.85,fontWeight:300}}>
              Aceasta este o demonstrație a temei <strong style={{color:'#fff',fontWeight:500}}>Minimal</strong>.<br/>Funcția de upload foto se activează după achiziționarea pachetului.
            </p>
            <button onClick={()=>setUploadModal(false)} style={{padding:'11px 32px',background:ACCENT,color:'#fff',fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:'.2em',textTransform:'uppercase',border:'none',cursor:'pointer',fontWeight:500}}>Închide</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('envelope')
  useSEO()
  function openEnvelope() {
    if(phase!=='envelope') return
    setPhase('opening')
    setTimeout(()=>setPhase('invite'),1600)
  }
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{height:100%;overflow:hidden;-webkit-font-smoothing:antialiased;}
        body{font-family:'DM Sans',sans-serif;background:#F7F4F0;color:#111;}
        @keyframes mn-fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes mn-envFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes mn-pulse{0%,100%{opacity:.38}50%{opacity:.85}}
        @keyframes mn-fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes mn-slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:480px){body{overflow:hidden}}
      `}</style>

      {/* HEADER */}
      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:200,height:56,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 clamp(20px,4vw,40px)',background:'rgba(247,244,240,.97)',borderBottom:`1px solid #E8E4E0`,backdropFilter:'blur(12px)'}}>
        {/* Left accent */}
        <div style={{position:'absolute',top:0,left:0,width:'clamp(3px,0.4vw,5px)',height:'100%',background:ACCENT}}/>
        <a href="/invitatii-digitale" style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,letterSpacing:'.18em',textTransform:'uppercase',color:DARK,textDecoration:'none',paddingLeft:'clamp(8px,1.2vw,14px)',transition:'color .2s'}}
          onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.color=ACCENT}
          onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.color=DARK}>
          Vibe<span style={{fontWeight:300,color:MID}}>Invite</span>
        </a>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontStyle:'italic',color:LIGHT,letterSpacing:'.03em'}}>
          {phase==='invite'?'Sofia & Andrei · 3 Mai 2027':'Invitație Minimal'}
        </div>
        <a href="/invitatii-digitale" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 14px',border:`1px solid ${DARK}`,color:DARK,fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:500,letterSpacing:'.14em',textTransform:'uppercase',cursor:'pointer',textDecoration:'none',background:'transparent',transition:'all .18s'}}
          onMouseEnter={e=>{const b=e.currentTarget as HTMLAnchorElement;b.style.background=DARK;b.style.color='#fff'}}
          onMouseLeave={e=>{const b=e.currentTarget as HTMLAnchorElement;b.style.background='transparent';b.style.color=DARK}}>
          <BackArrow/> Înapoi
        </a>
      </header>

      {phase!=='invite'&&<EnvelopeScreen onOpen={openEnvelope} phase={phase}/>}
      {phase==='invite'&&<InviteScreen onBack={()=>setPhase('envelope')}/>}
    </>
  )
}
