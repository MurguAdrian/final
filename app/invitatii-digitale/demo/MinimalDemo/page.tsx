'use client'

import { useState, useEffect } from 'react'

/* ════════════════════════════
   SEO
════════════════════════════ */
function useSEO() {
  useEffect(() => {
    document.title = 'Invitații Nuntă Online | Demo Stil Minimal — VibeInvite'
    const m = (sel:string,attr:string,val:string,cnt:string) => {
      let el = document.querySelector(sel)
      if (!el) { el=document.createElement('meta'); el.setAttribute(attr,val); document.head.appendChild(el) }
      el.setAttribute('content',cnt)
    }
    m('meta[name="description"]','name','description','Invitație digitală de nuntă în stil Minimal — alb imaculat, negru pur, eleganță prin simplitate. Crează-ți invitația online în 3 minute. RSVP instant, link free, GPS, upload poze nuntă.')
    m('meta[name="keywords"]','name','keywords','invitatii nunta online, invitatii nunta minimale, invitatie nunta minimalista, invitatie nunta alb negru, invitatie nunta simpla eleganta, invitatie nunta moderna, invitatie online free, link invitatie nunta, invitatii digitale nunta romania, creare invitatie nunta online, invitatie nunta minimalista, RSVP nunta online, confirmare prezenta nunta, invitatii nunta personalizate, upload poze nunta, vibeinvite, invitatii nunta contemporane, invitatie nunta clean design')
    m('meta[property="og:title"]','property','og:title','Invitații Nuntă Online Minimal — VibeInvite Demo')
    m('meta[property="og:description"]','property','og:description','Demo invitație digitală de nuntă în stil Minimal. Alb imaculat, negru pur, eleganță prin simplitate. RSVP instant, GPS, upload poze.')
    m('meta[property="og:type"]','property','og:type','website')
    m('meta[property="og:url"]','property','og:url','https://vibeinvite.ro/invitatii-digitale/demo/MinimalDemo')
    m('meta[property="og:site_name"]','property','og:site_name','VibeInvite')
    m('meta[property="og:image"]','property','og:image','https://vibeinvite.ro/og-minimal.jpg')
    m('meta[property="og:locale"]','property','og:locale','ro_RO')
    m('meta[name="twitter:card"]','name','twitter:card','summary_large_image')
    m('meta[name="twitter:title"]','name','twitter:title','Invitații Nuntă Online Minimal — VibeInvite')
    m('meta[name="twitter:description"]','name','twitter:description','Invitație digitală de nuntă minimalistă. Alb negru, eleganță prin simplitate. RSVP, GPS.')
    m('meta[name="twitter:image"]','name','twitter:image','https://vibeinvite.ro/og-minimal.jpg')
    let canon = document.querySelector('link[rel="canonical"]')
    if (!canon) { canon=document.createElement('link'); canon.setAttribute('rel','canonical'); document.head.appendChild(canon) }
    canon.setAttribute('href','https://vibeinvite.ro/invitatii-digitale/demo/MinimalDemo')
    if (!document.querySelector('script[data-ld="minimal"]')) {
      const ld = document.createElement('script')
      ld.setAttribute('type','application/ld+json')
      ld.setAttribute('data-ld','minimal')
      ld.textContent = JSON.stringify([
        { '@context':'https://schema.org','@type':'WebPage', name:'Invitații Nuntă Online — Demo Stil Minimal', description:'Demo invitație digitală de nuntă în stil Minimal. Alb imaculat, negru pur, eleganță prin simplitate. RSVP, GPS, upload poze.', url:'https://vibeinvite.ro/invitatii-digitale/demo/MinimalDemo', inLanguage:'ro', isPartOf:{ '@type':'WebSite',name:'VibeInvite',url:'https://vibeinvite.ro'}, breadcrumb:{ '@type':'BreadcrumbList', itemListElement:[{ '@type':'ListItem',position:1,name:'Acasă',item:'https://vibeinvite.ro'},{ '@type':'ListItem',position:2,name:'Invitații Digitale',item:'https://vibeinvite.ro/invitatii-digitale'},{ '@type':'ListItem',position:3,name:'Demo Stil Minimal',item:'https://vibeinvite.ro/invitatii-digitale/demo/MinimalDemo'}]}},
        { '@context':'https://schema.org','@type':'SoftwareApplication', name:'VibeInvite — Invitații Digitale', applicationCategory:'LifestyleApplication', operatingSystem:'Web, iOS, Android', description:'Platformă de creare invitații digitale pentru nuntă și botez.', url:'https://vibeinvite.ro', offers:{ '@type':'Offer',price:'0',priceCurrency:'RON'}, aggregateRating:{ '@type':'AggregateRating',ratingValue:'4.9',ratingCount:'1240'}},
        { '@context':'https://schema.org','@type':'FAQPage', mainEntity:[
          { '@type':'Question',name:'Ce înseamnă o invitație de nuntă minimalistă?',acceptedAnswer:{ '@type':'Answer',text:'O invitație de nuntă minimalistă folosește spațiu alb, tipografie clară și un limbaj esențial. Eleganța vine din simplitate — fiecare element are un scop, nimic nu este în plus.'}},
          { '@type':'Question',name:'Invitațiile digitale minimaliste sunt elegante?',acceptedAnswer:{ '@type':'Answer',text:'Absolut. Stilul Minimal de pe VibeInvite combină alb imaculat cu negru pur și tipografie premium — potrivit pentru cuplurile moderne care apreciază rafinamentul discret.'}},
          { '@type':'Question',name:'Cum creez o invitație de nuntă online modernă?',acceptedAnswer:{ '@type':'Answer',text:'Pe VibeInvite poți crea o invitație digitală modernă în 3 minute. Alegi tema Minimal, completezi detaliile și primești un link personalizat gratuit.'}},
          { '@type':'Question',name:'Pot colecta poze de la invitați la nuntă?',acceptedAnswer:{ '@type':'Answer',text:'Da! VibeInvite include upload foto. Invitații pot încărca poze din telefon în ziua nunții, iar mirii accesează totul într-un album privat.'}},
        ]},
      ])
      document.head.appendChild(ld)
    }
  }, [])
}

/* ════════════════════════════
   COUNTDOWN
════════════════════════════ */
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

/* ════════════════════════════
   ICONS — thin stroke, minimal
════════════════════════════ */
const WazeIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/></svg>)
const MapsIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>)
const PhoneIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>)
const WaIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>)
const CameraIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M7 7l2-4h6l2 4"/><circle cx="12" cy="14" r="3"/><circle cx="18" cy="11" r="1" fill="currentColor" stroke="none"/></svg>)
const UpArrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}><path d="M12 19V5M5 12l7-7 7 7"/></svg>)
const BackArrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>)

type Phase = 'envelope' | 'opening' | 'invite'

/* ════════════════════════════
   ENVELOPE SCREEN
════════════════════════════ */
function EnvelopeScreen({ onOpen, phase }:{onOpen:()=>void,phase:Phase}) {
  return (
    <div style={{position:'fixed',inset:0,top:56,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',background:'#FAFAFA'}}>
      {/* Minimal grid lines — barely visible */}
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(0,0,0,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.03) 1px,transparent 1px)',backgroundSize:'80px 80px',pointerEvents:'none'}}/>
      {/* Very subtle radial center glow */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 50% at 50% 45%,rgba(0,0,0,.02) 0%,transparent 70%)',pointerEvents:'none'}}/>

      <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',gap:20,padding:'24px',maxWidth:520,width:'100%'}}>

        {/* Thin top rule */}
        <div style={{width:40,height:1,background:'#000',animation:'mn-fadeUp .5s ease both'}}/>

        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.32em',textTransform:'uppercase',color:'#888',animation:'mn-fadeUp .6s ease both .04s',fontWeight:400}}>
          Invitație de Nuntă
        </p>

        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(32px,5vw,60px)',fontWeight:400,fontStyle:'italic',color:'#0A0A0A',textAlign:'center',lineHeight:1.1,animation:'mn-fadeUp .7s ease both .08s',margin:0,letterSpacing:'-.01em'}}>
          Sofia<br/><span style={{fontWeight:300,fontSize:'.65em',fontStyle:'normal',letterSpacing:'.12em',color:'#888'}}>&amp;</span><br/>Andrei
        </h1>

        {/* ENVELOPE */}
        <div onClick={onOpen} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&onOpen()}
          style={{position:'relative',width:'clamp(280px,42vw,480px)',cursor:'pointer',userSelect:'none',animation:'mn-envFloat 6s ease-in-out infinite, mn-fadeUp .8s ease both .12s'}}>

          <div style={{position:'absolute',bottom:-12,left:'12%',right:'12%',height:16,background:'radial-gradient(ellipse,rgba(0,0,0,.08) 0%,transparent 70%)',filter:'blur(8px)',zIndex:0}}/>

          {/* LETTER */}
          <div style={{
            position:'absolute',left:'9%',right:'9%',bottom:'4%',height:'58%',
            zIndex:phase==='opening'?30:2,
            background:'#fff',
            border:'1px solid #E0E0E0',
            borderRadius:2,
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,
            boxShadow:phase==='opening'?'0 24px 60px rgba(0,0,0,.18),0 4px 16px rgba(0,0,0,.08)':'0 2px 8px rgba(0,0,0,.04)',
            transform:phase==='opening'?'translateY(-138%) scale(1.04) rotate(-0.4deg)':'translateY(0)',
            transition:'transform 1.3s cubic-bezier(.22,.1,.2,1) .22s,box-shadow 1.3s ease .22s',
            overflow:'hidden',
          }}>
            {/* Thin ruled lines */}
            <div style={{position:'absolute',inset:0,opacity:.04,backgroundImage:'repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 1px,transparent 22px)'}}/>
            <div style={{position:'absolute',top:6,left:6,right:6,bottom:6,border:'1px solid #F0F0F0'}}/>
            <div style={{textAlign:'center',padding:'0 18px',position:'relative',zIndex:1}}>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(14px,2.4vw,22px)',fontStyle:'italic',fontWeight:400,color:'#0A0A0A',lineHeight:1.3}}>Sofia &amp; Andrei</p>
              <div style={{width:24,height:1,background:'#000',opacity:.15,margin:'8px auto'}}/>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(7px,.85vw,9px)',letterSpacing:'.24em',textTransform:'uppercase',color:'#888',fontWeight:400}}>3 Mai 2027 · București</p>
            </div>
          </div>

          {/* ENVELOPE BODY */}
          <div style={{width:'100%',paddingTop:'60%',position:'relative',zIndex:5}}>
            <div style={{position:'absolute',inset:0,background:'#fff',border:'1px solid #D8D8D8',borderRadius:3,overflow:'hidden',boxShadow:'0 2px 16px rgba(0,0,0,.06)'}}>
              {/* Left triangle */}
              <div style={{position:'absolute',top:0,bottom:0,left:0,width:'50%',background:'#F5F5F5',clipPath:'polygon(0 0,0 100%,100% 100%)'}}/>
              {/* Right triangle */}
              <div style={{position:'absolute',top:0,bottom:0,right:0,width:'50%',background:'#F5F5F5',clipPath:'polygon(100% 0,0 100%,100% 100%)'}}/>
              {/* Bottom V */}
              <div style={{position:'absolute',bottom:0,left:0,right:0,height:'50%',background:'#EFEFEF',clipPath:'polygon(0 100%,50% 0,100% 100%)'}}/>
              {/* Very thin inner shadow line */}
              <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'rgba(0,0,0,.06)'}}/>
            </div>
            {/* WAX SEAL — black circle */}
            <div style={{
              position:'absolute',top:'50%',left:'50%',
              transform:'translate(-50%,-52%)',
              width:'clamp(48px,7.5vw,70px)',height:'clamp(48px,7.5vw,70px)',
              background:'#0A0A0A',
              borderRadius:'50%',
              display:'flex',alignItems:'center',justifyContent:'center',
              boxShadow:'0 4px 16px rgba(0,0,0,.2)',
              zIndex:10,
              opacity:phase==='opening'?0:1,
              transition:'opacity .2s',
            }}>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(12px,1.9vw,18px)',fontStyle:'italic',color:'#fff',letterSpacing:'.02em'}}>S·A</span>
            </div>
            {/* FLAP */}
            <div style={{
              position:'absolute',top:0,left:0,right:0,zIndex:8,height:'52%',
              background:'#EBEBEB',
              clipPath:'polygon(0 0,100% 0,50% 100%)',
              transformOrigin:'top center',
              transform:phase==='opening'?'perspective(700px) rotateX(192deg)':'perspective(700px) rotateX(0deg)',
              transition:'transform .95s cubic-bezier(.4,0,.2,1)',
              borderBottom:'1px solid #D0D0D0',
            }}/>
          </div>
        </div>

        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.24em',textTransform:'uppercase',color:'#AAAAAA',animation:phase==='opening'?'none':'mn-fadeUp .9s ease both .3s, mn-pulse 3s ease-in-out infinite 1.2s',fontWeight:400}}>
          {phase==='opening'?'Se deschide...':'Atinge pentru a deschide'}
        </p>

        {/* Thin bottom rule */}
        <div style={{width:40,height:1,background:'#000',opacity:.15,animation:'mn-fadeUp .5s ease both .35s'}}/>
      </div>
    </div>
  )
}

/* ════════════════════════════
   INVITE SCREEN
════════════════════════════ */
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

  const inputS:React.CSSProperties={ width:'100%', padding:'11px 14px', border:'none', borderBottom:'1px solid #D0D0D0', background:'transparent', fontFamily:"'Playfair Display',serif", fontSize:15, color:'#0A0A0A', outline:'none' }
  const radioL:React.CSSProperties={ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'11px 10px', border:'1px solid #E0E0E0', background:'transparent', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:12, letterSpacing:'.08em', color:'#555', transition:'all .18s', userSelect:'none' }

  const Divider = () => (
    <div style={{display:'flex',alignItems:'center',gap:20,width:'100%',maxWidth:480}}>
      <div style={{flex:1,height:1,background:'#E8E8E8'}}/>
      <div style={{width:4,height:4,background:'#0A0A0A',transform:'rotate(45deg)',opacity:.25}}/>
      <div style={{flex:1,height:1,background:'#E8E8E8'}}/>
    </div>
  )

  return (
    <div style={{position:'fixed',inset:0,top:56,overflowY:'auto',overflowX:'hidden',background:'#FAFAFA'}}>
      {/* Minimal grid */}
      <div style={{position:'fixed',inset:0,backgroundImage:'linear-gradient(rgba(0,0,0,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.025) 1px,transparent 1px)',backgroundSize:'80px 80px',zIndex:0,pointerEvents:'none'}}/>

      <div style={{position:'relative',zIndex:2,maxWidth:660,margin:'0 auto',padding:'clamp(48px,7vw,72px) clamp(20px,5vw,40px) 60px',display:'flex',flexDirection:'column',alignItems:'center',gap:0}}>

        {/* Top rule */}
        <div style={{...a(0),width:'100%',maxWidth:480,marginBottom:28,display:'flex',alignItems:'center',gap:16}}>
          <div style={{flex:1,height:1,background:'#0A0A0A',opacity:.12}}/>
          <div style={{width:5,height:5,background:'#0A0A0A',transform:'rotate(45deg)',opacity:.3}}/>
          <div style={{flex:1,height:1,background:'#0A0A0A',opacity:.12}}/>
        </div>

        {/* Eyebrow */}
        <p style={{...a(.04),fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.36em',textTransform:'uppercase',color:'#AAAAAA',marginBottom:12,fontWeight:400}}>
          Cu Drag Vă Invităm
        </p>

        {/* NAMES — massive, typographic */}
        <div style={{...a(.08),textAlign:'center',marginBottom:6,width:'100%',maxWidth:560}}>
          <span style={{display:'block',fontFamily:"'Playfair Display',serif",fontSize:'clamp(60px,11vw,116px)',fontWeight:400,fontStyle:'italic',color:'#0A0A0A',lineHeight:.88,letterSpacing:'-.02em'}}>
            Sofia
          </span>
          <span style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(11px,1.5vw,14px)',fontWeight:300,color:'#CCCCCC',margin:'12px 0',letterSpacing:'.4em',textTransform:'uppercase'}}>
            &amp;
          </span>
          <span style={{display:'block',fontFamily:"'Playfair Display',serif",fontSize:'clamp(60px,11vw,116px)',fontWeight:400,fontStyle:'italic',color:'#0A0A0A',lineHeight:.88,letterSpacing:'-.02em'}}>
            Andrei
          </span>
        </div>

        {/* Date — clean, centered */}
        <div style={{...a(.16),textAlign:'center',marginTop:24,marginBottom:24}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(11px,1.3vw,13px)',letterSpacing:'.26em',color:'#888',textTransform:'uppercase',fontWeight:400,marginBottom:4}}>
            Duminică · 3 Mai 2027
          </p>
          <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(16px,1.9vw,20px)',fontStyle:'italic',color:'#444',letterSpacing:'.04em'}}>
            București, România
          </p>
        </div>

        <div style={{...a(.20),width:'100%',maxWidth:480}}><Divider/></div>

        {/* Nași — simple text block */}
        <div style={{...a(.24),textAlign:'center',padding:'28px 0',width:'100%',maxWidth:360}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.3em',textTransform:'uppercase',color:'#BBBBBB',marginBottom:10,fontWeight:400}}>Nași</p>
          <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(22px,2.8vw,30px)',fontStyle:'italic',fontWeight:400,color:'#0A0A0A',letterSpacing:'.01em'}}>
            Elena &amp; Radu
          </p>
        </div>

        <div style={{...a(.28),width:'100%',maxWidth:480}}><Divider/></div>

        {/* COUNTDOWN — typographic */}
        <div style={{...a(.32),width:'100%',maxWidth:480,paddingTop:28,paddingBottom:28,textAlign:'center'}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.3em',textTransform:'uppercase',color:'#BBBBBB',marginBottom:20,fontWeight:400}}>Mai sunt</p>
          <div style={{display:'flex',gap:0,justifyContent:'center'}}>
            {[{n:pad(cd.d),l:'Zile'},{n:pad(cd.h),l:'Ore'},{n:pad(cd.m),l:'Minute'},{n:pad(cd.s),l:'Secunde',flip:flipS}].map((u,i)=>(
              <div key={u.l} style={{flex:1,maxWidth:110,textAlign:'center',padding:'0 8px',borderRight:i<3?'1px solid #ECECEC':'none'}}>
                <span style={{display:'block',fontFamily:"'Playfair Display',serif",fontSize:'clamp(38px,6.2vw,64px)',fontWeight:400,fontStyle:'italic',lineHeight:1,color:'#0A0A0A',transition:'opacity .12s ease',opacity:(u as any).flip?.5:1}}>{u.n}</span>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(7px,.82vw,9px)',letterSpacing:'.22em',textTransform:'uppercase',color:'#BBBBBB',display:'block',marginTop:4,fontWeight:400}}>{u.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{...a(.36),width:'100%',maxWidth:480}}><Divider/></div>

        {/* LOCATION — stacked text, clean */}
        <div style={{...a(.40),width:'100%',maxWidth:580,paddingTop:28,paddingBottom:4}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.3em',textTransform:'uppercase',color:'#BBBBBB',marginBottom:20,fontWeight:400,textAlign:'center'}}>Locații</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,240px),1fr))',gap:'clamp(1px,2vw,1px)'}}>
            {[
              {tag:'Cununia',venue:'Biserica Sfântul Iosif',addr:'Str. General Berthelot, București',time:'14:00'},
              {tag:'Recepția',venue:'Palatul Știrbey',addr:'Calea Victoriei, București',time:'18:00'},
            ].map((card,i)=>(
              <div key={card.tag} style={{padding:'24px 0',borderBottom:'1px solid #ECECEC',borderLeft:i===1?undefined:'none',paddingLeft:i===1?'clamp(0px,3vw,32px)':0,paddingRight:i===0?'clamp(0px,3vw,32px)':0}}>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.28em',textTransform:'uppercase',color:'#CCCCCC',marginBottom:6,fontWeight:400}}>{card.tag}</p>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(15px,1.8vw,19px)',fontStyle:'italic',fontWeight:400,color:'#0A0A0A',marginBottom:4,lineHeight:1.3}}>{card.venue}</p>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:'#999',marginBottom:8,letterSpacing:'.03em'}}>{card.addr}</p>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.2em',color:'#555',textTransform:'uppercase',fontWeight:500,marginBottom:14}}>3 mai 2027 · {card.time}</p>
                <div style={{display:'flex',gap:6}}>
                  <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'7px 12px',border:'1px solid #E0E0E0',background:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.08em',color:'#555',cursor:'default',flex:1,justifyContent:'center'}}>
                    <WazeIcon/> Waze
                  </div>
                  <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'7px 12px',border:'1px solid #E0E0E0',background:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.08em',color:'#555',cursor:'default',flex:1,justifyContent:'center'}}>
                    <MapsIcon/> Maps
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{...a(.46),width:'100%',maxWidth:480,marginTop:8}}><Divider/></div>

        {/* CONTACT */}
        <div style={{...a(.48),width:'100%',maxWidth:580,paddingTop:24,paddingBottom:24,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
          <div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.28em',textTransform:'uppercase',color:'#CCCCCC',marginBottom:4,fontWeight:400}}>Contact Mireasă</p>
            <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(16px,2vw,20px)',fontStyle:'italic',color:'#0A0A0A',marginBottom:2}}>Sofia</p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#555',letterSpacing:'.06em'}}>0752 954 258</p>
          </div>
          <div style={{display:'flex',gap:8}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 16px',border:'1px solid #0A0A0A',background:'transparent',fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:'.1em',color:'#0A0A0A',cursor:'default',transition:'all .18s'}}>
              <PhoneIcon/> Telefon
            </div>
            <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 16px',border:'1px solid #25D366',background:'transparent',fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:'.1em',color:'#1A9A4A',cursor:'default',transition:'all .18s'}}>
              <WaIcon/> WhatsApp
            </div>
          </div>
        </div>

        <div style={{...a(.52),width:'100%',maxWidth:480}}><Divider/></div>

        {/* PHOTO UPLOAD */}
        <div style={{...a(.54),width:'100%',maxWidth:580,paddingTop:28,paddingBottom:28}}>
          <div style={{border:'1px solid #E0E0E0',background:'#fff',padding:'clamp(24px,4vw,36px)',textAlign:'center'}}>
            <div style={{display:'flex',justifyContent:'center',marginBottom:16,color:'#0A0A0A',opacity:.4}}>
              <CameraIcon/>
            </div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(18px,2.4vw,24px)',fontStyle:'italic',fontWeight:400,color:'#0A0A0A',marginBottom:10,lineHeight:1.2}}>
              Împărtășiți momentele cu noi
            </h3>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(12px,1.4vw,14px)',color:'#888',lineHeight:1.9,marginBottom:20,maxWidth:400,margin:'0 auto 20px',fontWeight:300}}>
              Faceți poze în timpul nunții și încărcați-le din telefon. Mirii vor accesa toate imaginile voastre într-un album privat — amintiri adunate din toate unghiurile.
            </p>
            <div style={{display:'flex',flexWrap:'wrap',gap:6,justifyContent:'center',marginBottom:24}}>
              {['Poze din toate unghiurile','Album privat al mirilor','Fără limită de fișiere','Acces securizat'].map(tag=>(
                <span key={tag} style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:'.1em',color:'#888',border:'1px solid #E8E8E8',padding:'4px 12px',fontWeight:400}}>{tag}</span>
              ))}
            </div>
            <button onClick={()=>setUploadModal(true)} style={{display:'inline-flex',alignItems:'center',gap:10,padding:'12px 28px',background:'#0A0A0A',color:'#fff',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:12,letterSpacing:'.18em',textTransform:'uppercase',fontWeight:500,transition:'opacity .18s',position:'relative',overflow:'hidden'}}
              onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.opacity='.82'}
              onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.opacity='1'}>
              <UpArrow/> Încarcă pozele
            </button>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:'#CCCCCC',marginTop:10,letterSpacing:'.08em'}}>
              disponibil în ziua nunții și 72h după eveniment
            </p>
          </div>
        </div>

        <div style={{...a(.60),width:'100%',maxWidth:480}}><Divider/></div>

        {/* RSVP */}
        <div style={{...a(.62),textAlign:'center',width:'100%',maxWidth:480,paddingTop:24}}>
          <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(15px,1.8vw,18px)',fontStyle:'italic',color:'#888',marginBottom:16,lineHeight:1.7}}>
            Vă rugăm să confirmați până pe<br/>
            <strong style={{color:'#0A0A0A',fontStyle:'normal',fontWeight:500}}>1 Aprilie 2027</strong>
          </p>
          <button onClick={()=>setModal(true)} style={{display:'block',width:'100%',padding:'clamp(14px,2vw,18px) 0',background:'#0A0A0A',color:'#fff',textAlign:'center',fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(11px,1.3vw,13px)',fontWeight:500,letterSpacing:'.28em',textTransform:'uppercase',cursor:'pointer',border:'none',transition:'background .2s'}}
            onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background='#222'}
            onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background='#0A0A0A'}>
            Confirmă Prezența
          </button>
        </div>

        {/* CHOOSE BAR */}
        <div style={{...a(.68),width:'100%',maxWidth:580,marginTop:32,paddingTop:28,paddingBottom:28,borderTop:'1px solid #E8E8E8',display:'flex',flexDirection:'column',alignItems:'center',gap:14,textAlign:'center'}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#888',letterSpacing:'.06em',fontWeight:300}}>Îți place această temă? Personalizează-o pentru nunta ta.</p>
          <a href="/preturi?tema=minimal" style={{display:'inline-flex',alignItems:'center',gap:10,padding:'12px 32px',background:'transparent',color:'#0A0A0A',border:'1px solid #0A0A0A',textDecoration:'none',fontFamily:"'DM Sans',sans-serif",fontSize:12,letterSpacing:'.2em',textTransform:'uppercase',fontWeight:500,transition:'all .2s'}}
            onMouseEnter={e=>{const a=e.currentTarget as HTMLAnchorElement;a.style.background='#0A0A0A';a.style.color='#fff'}}
            onMouseLeave={e=>{const a=e.currentTarget as HTMLAnchorElement;a.style.background='transparent';a.style.color='#0A0A0A'}}>
            Alege Această Temă
          </a>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:'#CCCCCC',letterSpacing:'.2em',textTransform:'uppercase'}}>VibeInvite © 2026</p>
        </div>

      </div>

      {/* ═══ RSVP MODAL ═══ */}
      {modal&&(
        <div onClick={()=>setModal(false)} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(250,250,250,.92)',backdropFilter:'blur(16px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16,animation:'mn-fadeIn .22s ease',overflowY:'auto'}}>
          <div onClick={e=>e.stopPropagation()} style={{background:'#fff',padding:'clamp(28px,4vw,44px) clamp(22px,4vw,40px)',maxWidth:480,width:'100%',border:'1px solid #E0E0E0',boxShadow:'0 24px 80px rgba(0,0,0,.1)',animation:'mn-slideUp .28s cubic-bezier(.4,0,.2,1)',maxHeight:'92vh',overflowY:'auto'}}>
            {/* Top rule */}
            <div style={{width:'100%',height:1,background:'#0A0A0A',marginBottom:24}}/>
            <div style={{textAlign:'center',marginBottom:28}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(24px,3.5vw,32px)',fontStyle:'italic',fontWeight:400,color:'#0A0A0A',marginBottom:6}}>Confirmă Prezența</h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:'#BBBBBB',letterSpacing:'.14em',textTransform:'uppercase',fontWeight:400}}>toate câmpurile sunt opționale</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              {/* Nume */}
              <div style={{borderBottom:'1px solid #ECECEC',paddingBottom:16}}>
                <label style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.26em',textTransform:'uppercase',color:'#BBBBBB',marginBottom:6,fontWeight:400}}>Nume și Prenume</label>
                <input type="text" placeholder="Maria Popescu" style={inputS} onFocus={e=>(e.currentTarget as HTMLInputElement).style.borderBottomColor='#0A0A0A'} onBlur={e=>(e.currentTarget as HTMLInputElement).style.borderBottomColor='#D0D0D0'}/>
              </div>
              {/* Raspuns */}
              <div>
                <label style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.26em',textTransform:'uppercase',color:'#BBBBBB',marginBottom:8,fontWeight:400}}>Răspuns</label>
                <div style={{display:'flex',gap:8}}>
                  {['Particip','Nu Particip'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='#0A0A0A';el.style.color='#0A0A0A'}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='#E0E0E0';el.style.color='#555'}}>
                      <input type="radio" name="raspuns" value={opt} style={{accentColor:'#0A0A0A'}}/>{opt}
                    </label>
                  ))}
                </div>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:'#CCCCCC',marginTop:5,letterSpacing:'.04em'}}>Dacă refuzați, selectați "Nu Particip".</p>
              </div>
              {/* Insotit */}
              <div>
                <label style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.26em',textTransform:'uppercase',color:'#BBBBBB',marginBottom:8,fontWeight:400}}>Veți fi însoțit/ă?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Da','Nu'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='#0A0A0A';el.style.color='#0A0A0A'}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='#E0E0E0';el.style.color='#555'}}>
                      <input type="radio" name="insotit" value={opt} style={{accentColor:'#0A0A0A'}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* Partener */}
              <div style={{borderBottom:'1px solid #ECECEC',paddingBottom:16}}>
                <label style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.26em',textTransform:'uppercase',color:'#BBBBBB',marginBottom:6,fontWeight:400}}>Nume Partener</label>
                <input type="text" placeholder="Ion Popescu" style={inputS} onFocus={e=>(e.currentTarget as HTMLInputElement).style.borderBottomColor='#0A0A0A'} onBlur={e=>(e.currentTarget as HTMLInputElement).style.borderBottomColor='#D0D0D0'}/>
              </div>
              {/* Copii */}
              <div>
                <label style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.26em',textTransform:'uppercase',color:'#BBBBBB',marginBottom:8,fontWeight:400}}>Veniți cu copii?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Da','Nu'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='#0A0A0A';el.style.color='#0A0A0A'}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='#E0E0E0';el.style.color='#555'}}>
                      <input type="radio" name="copii" value={opt} style={{accentColor:'#0A0A0A'}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* Meniu */}
              <div>
                <label style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.26em',textTransform:'uppercase',color:'#BBBBBB',marginBottom:8,fontWeight:400}}>Preferințe Meniu</label>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {['2x Meniu Normal','2x Meniu Vegetarian','1x Meniu Normal, 1x Meniu Vegetarian'].map(opt=>(
                    <label key={opt} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',border:'1px solid #E8E8E8',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#555',transition:'all .18s',userSelect:'none'}}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='#0A0A0A';el.style.color='#0A0A0A'}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='#E8E8E8';el.style.color='#555'}}>
                      <input type="radio" name="meniu" value={opt} style={{accentColor:'#0A0A0A',flexShrink:0}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* Cazare */}
              <div>
                <label style={{display:'block',fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:'.26em',textTransform:'uppercase',color:'#BBBBBB',marginBottom:8,fontWeight:400}}>Cazare Necesară?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Nu','Da'].map(opt=>(
                    <label key={opt} style={radioL}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='#0A0A0A';el.style.color='#0A0A0A'}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='#E0E0E0';el.style.color='#555'}}>
                      <input type="radio" name="cazare" value={opt} style={{accentColor:'#0A0A0A'}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* Submit */}
            <div style={{marginTop:28}}>
              <button onClick={()=>setModal(false)} style={{display:'block',width:'100%',padding:'14px 0',background:'#0A0A0A',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,letterSpacing:'.24em',textTransform:'uppercase',border:'none',cursor:'pointer',transition:'background .18s'}}
                onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background='#222'}
                onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background='#0A0A0A'}>
                Trimite Confirmarea
              </button>
              <div style={{marginTop:16,padding:'16px',background:'#FAFAFA',border:'1px solid #ECECEC',textAlign:'center'}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontStyle:'italic',color:'#888',lineHeight:1.8}}>
                  Mulțumim.<br/>Aceasta este o demonstrație a temei <strong style={{color:'#0A0A0A',fontStyle:'normal'}}>Minimal</strong>.<br/>Achiziționează pachetul pentru a activa confirmările.
                </p>
              </div>
              <button onClick={()=>setModal(false)} style={{marginTop:10,background:'none',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:11,color:'#CCCCCC',letterSpacing:'.12em',textTransform:'uppercase',display:'block',width:'100%',textAlign:'center'}}>Închide</button>
            </div>
            {/* Bottom rule */}
            <div style={{width:'100%',height:1,background:'#0A0A0A',marginTop:24}}/>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {uploadModal&&(
        <div onClick={()=>setUploadModal(false)} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(250,250,250,.92)',backdropFilter:'blur(16px)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,animation:'mn-fadeIn .22s ease'}}>
          <div onClick={e=>e.stopPropagation()} style={{background:'#fff',padding:'40px 32px',maxWidth:380,width:'100%',border:'1px solid #E0E0E0',boxShadow:'0 24px 80px rgba(0,0,0,.1)',textAlign:'center',animation:'mn-slideUp .28s cubic-bezier(.4,0,.2,1)'}}>
            <div style={{width:'100%',height:1,background:'#0A0A0A',marginBottom:24}}/>
            <div style={{display:'flex',justifyContent:'center',marginBottom:14,color:'#0A0A0A',opacity:.35}}><CameraIcon/></div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontStyle:'italic',fontWeight:400,color:'#0A0A0A',marginBottom:10}}>Încarcă pozele</h2>
            <div style={{width:24,height:1,background:'#0A0A0A',opacity:.15,margin:'0 auto 14px'}}/>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:'#888',marginBottom:24,lineHeight:1.85,fontWeight:300}}>
              Aceasta este o demonstrație a temei <strong style={{color:'#0A0A0A',fontWeight:500}}>Minimal</strong>.<br/>Funcția de upload foto se activează după achiziționarea pachetului.
            </p>
            <button onClick={()=>setUploadModal(false)} style={{padding:'11px 32px',background:'#0A0A0A',color:'#fff',fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:'.2em',textTransform:'uppercase',border:'none',cursor:'pointer',fontWeight:500}}>Închide</button>
            <div style={{width:'100%',height:1,background:'#0A0A0A',opacity:.08,marginTop:24}}/>
          </div>
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════
   ROOT
════════════════════════════ */
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{height:100%;overflow:hidden;-webkit-font-smoothing:antialiased;}
        body{font-family:'DM Sans',sans-serif;background:#FAFAFA;color:#0A0A0A;}
        @keyframes mn-fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes mn-envFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes mn-pulse{0%,100%{opacity:.4}50%{opacity:.9}}
        @keyframes mn-fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes mn-slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:480px){body{overflow:hidden}}
      `}</style>

      {/* HEADER — ultra minimal */}
      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:200,height:56,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 clamp(16px,4vw,32px)',background:'rgba(250,250,250,.95)',borderBottom:'1px solid #ECECEC',backdropFilter:'blur(12px)'}}>
        <a href="/invitatii-digitale" style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,letterSpacing:'.18em',textTransform:'uppercase',color:'#0A0A0A',textDecoration:'none',transition:'opacity .2s'}}
          onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.opacity='.6'}
          onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.opacity='1'}>
          Vibe<span style={{fontWeight:300}}>Invite</span>
        </a>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontStyle:'italic',color:'#AAAAAA',letterSpacing:'.03em'}}>
          {phase==='invite'?'Sofia & Andrei · 3 Mai 2027':'Invitație Minimal'}
        </div>
        <a href="/invitatii-digitale" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 14px',border:'1px solid #E0E0E0',color:'#555',fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:500,letterSpacing:'.14em',textTransform:'uppercase',cursor:'pointer',textDecoration:'none',background:'transparent',transition:'all .18s'}}
          onMouseEnter={e=>{const b=e.currentTarget as HTMLAnchorElement;b.style.borderColor='#0A0A0A';b.style.color='#0A0A0A'}}
          onMouseLeave={e=>{const b=e.currentTarget as HTMLAnchorElement;b.style.borderColor='#E0E0E0';b.style.color='#555'}}>
          <BackArrow/> Înapoi
        </a>
      </header>

      {phase!=='invite'&&<EnvelopeScreen onOpen={openEnvelope} phase={phase}/>}
      {phase==='invite'&&<InviteScreen onBack={()=>setPhase('envelope')}/>}
    </>
  )
}
