
// 'use client'

// import { useState, useEffect } from 'react'

// /* ═══════════════════════════════════════
//    COUNTDOWN
// ═══════════════════════════════════════ */
// function useCountdown(target: Date) {
//   const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
//   const ms = target.getTime()
//   useEffect(() => {
//     const tick = () => {
//       const diff = ms - Date.now()
//       if (diff <= 0) { setT({ d:0,h:0,m:0,s:0 }); return }
//       setT({ d:Math.floor(diff/864e5), h:Math.floor((diff%864e5)/36e5), m:Math.floor((diff%36e5)/6e4), s:Math.floor((diff%6e4)/1e3) })
//     }
//     tick(); const id = setInterval(tick,1000); return ()=>clearInterval(id)
//   }, [ms])
//   return t
// }
// const pad = (n:number) => String(n).padStart(2,'0')

// /* ═══════════════════════════════════════
//    SVG COMPONENTS — Custom luxury
// ═══════════════════════════════════════ */

// // Ornamental crown SVG
// const CrownSVG = () => (
//   <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:80,height:40}}>
//     <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#cg)" strokeWidth="1.4" strokeLinejoin="round"/>
//     <circle cx="60" cy="5" r="3.5" fill="url(#cg)"/>
//     <circle cx="30" cy="40" r="2.5" fill="url(#cg)"/>
//     <circle cx="90" cy="40" r="2.5" fill="url(#cg)"/>
//     <circle cx="10" cy="20" r="2" fill="url(#cg)"/>
//     <circle cx="110" cy="20" r="2" fill="url(#cg)"/>
//     <path d="M4 50 L116 50" stroke="url(#cg)" strokeWidth="1"/>
//     <defs>
//       <linearGradient id="cg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
//         <stop offset="0%" stopColor="#8B6914"/>
//         <stop offset="40%" stopColor="#D4AF37"/>
//         <stop offset="60%" stopColor="#F5D678"/>
//         <stop offset="100%" stopColor="#8B6914"/>
//       </linearGradient>
//     </defs>
//   </svg>
// )

// // Art Deco corner ornament
// const ArtDecoCorner = ({ flip=false, flipY=false }:{flip?:boolean,flipY?:boolean}) => (
//   <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"
//     style={{transform:`scale(${flip?-1:1},${flipY?-1:1})`, width:'100%', height:'100%'}}>
//     <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg)" strokeWidth="1.2"/>
//     <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg)" strokeWidth=".7" strokeOpacity=".6"/>
//     <path d="M28 28 L28 80 M28 28 L80 28" stroke="url(#dg)" strokeWidth=".5" strokeOpacity=".4"/>
//     {/* Vertical decorative lines */}
//     <path d="M8 50 L22 50 M8 70 L16 70 M8 90 L16 90" stroke="url(#dg)" strokeWidth=".8"/>
//     <path d="M50 8 L50 22 M70 8 L70 16 M90 8 L90 16" stroke="url(#dg)" strokeWidth=".8"/>
//     {/* Corner diamond */}
//     <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg)" fillOpacity=".8"/>
//     {/* Inner diamond */}
//     <rect x="13" y="13" width="7" height="7" transform="rotate(45 18 18)" fill="none" stroke="url(#dg)" strokeWidth=".8" strokeOpacity=".5"/>
//     {/* Fan lines */}
//     <path d="M8 8 L40 50" stroke="url(#dg)" strokeWidth=".4" strokeOpacity=".3"/>
//     <path d="M8 8 L50 40" stroke="url(#dg)" strokeWidth=".4" strokeOpacity=".3"/>
//     <path d="M8 8 L25 65" stroke="url(#dg)" strokeWidth=".4" strokeOpacity=".25"/>
//     <path d="M8 8 L65 25" stroke="url(#dg)" strokeWidth=".4" strokeOpacity=".25"/>
//     <defs>
//       <linearGradient id="dg" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
//         <stop offset="0%" stopColor="#D4AF37"/>
//         <stop offset="50%" stopColor="#F5D678"/>
//         <stop offset="100%" stopColor="#8B6914" stopOpacity=".4"/>
//       </linearGradient>
//     </defs>
//   </svg>
// )

// // Luxury envelope — dark with gold
// const EnvelopeLuxSVG = ({ phase }:{phase:string}) => (
//   <div style={{position:'relative',width:'clamp(290px,44vw,540px)',cursor:'pointer',userSelect:'none',filter:'drop-shadow(0 40px 80px rgba(0,0,0,.7))'}}>
//     {/* Floor shadow */}
//     <div style={{position:'absolute',bottom:-20,left:'8%',right:'8%',height:24,background:'radial-gradient(ellipse,rgba(212,175,55,.18) 0%,transparent 70%)',filter:'blur(12px)',zIndex:0}}/>

//     {/* LETTER — hidden inside, flies out */}
//     <div style={{
//       position:'absolute',
//       left:'8%',right:'8%',bottom:'4%',
//       height:'62%',
//       zIndex: phase==='opening' ? 30 : 2,
//       background:'linear-gradient(170deg,#1A1408 0%,#0D0A04 100%)',
//       border:'1px solid rgba(212,175,55,.35)',
//       borderRadius:4,
//       display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:10,
//       boxShadow: phase==='opening' ? '0 40px 100px rgba(0,0,0,.9),0 0 60px rgba(212,175,55,.2)' : '0 2px 8px rgba(0,0,0,.4)',
//       transform: phase==='opening' ? 'translateY(-145%) scale(1.06) rotate(-0.6deg)' : 'translateY(0)',
//       transition:'transform 1.4s cubic-bezier(.22,.1,.2,1) .2s,box-shadow 1.4s ease .2s',
//       overflow:'hidden',
//     }}>
//       {/* Gold filigree lines on letter */}
//       <div style={{position:'absolute',inset:0,opacity:.07,backgroundImage:'repeating-linear-gradient(0deg,#D4AF37 0,#D4AF37 1px,transparent 1px,transparent 32px)'}}/>
//       <div style={{position:'absolute',top:8,left:8,right:8,bottom:8,border:'1px solid rgba(212,175,55,.2)',borderRadius:2}}/>
//       <div style={{textAlign:'center',padding:'0 20px',position:'relative',zIndex:1}}>
//         <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(16px,2.8vw,28px)',fontStyle:'italic',fontWeight:300,color:'#D4AF37',lineHeight:1.2,letterSpacing:'.04em'}}>
//           Alexandra &amp; Dragoș
//         </p>
//         <div style={{width:40,height:1,background:'linear-gradient(90deg,transparent,#D4AF37,transparent)',margin:'10px auto'}}/>
//         <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(7px,.9vw,9px)',letterSpacing:'.3em',textTransform:'uppercase',color:'rgba(212,175,55,.7)',fontWeight:400}}>
//           III · Mai · MMXXVII
//         </p>
//       </div>
//     </div>

//     {/* ENVELOPE BODY */}
//     <div style={{width:'100%',paddingTop:'60%',position:'relative',zIndex:5}}>
//       <div style={{position:'absolute',inset:0,background:'#0A0803',borderRadius:6,border:'1px solid rgba(212,175,55,.28)',boxShadow:'0 8px 40px rgba(0,0,0,.8),inset 0 1px 0 rgba(212,175,55,.15)',overflow:'hidden'}}>
//         {/* Marble texture overlay */}
//         <div style={{position:'absolute',inset:0,opacity:.06,backgroundImage:'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'400\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'turbulence\' baseFrequency=\'.012\' numOctaves=\'6\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'400\' height=\'400\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")'}}/>
//         {/* Side triangles */}
//         <div style={{position:'absolute',top:0,bottom:0,left:0,width:'50%',background:'linear-gradient(160deg,#0E0C06 0%,#080602 100%)',clipPath:'polygon(0 0,0 100%,100% 100%)'}}/>
//         <div style={{position:'absolute',top:0,bottom:0,right:0,width:'50%',background:'linear-gradient(200deg,#0E0C06 0%,#080602 100%)',clipPath:'polygon(100% 0,0 100%,100% 100%)'}}/>
//         {/* Bottom V */}
//         <div style={{position:'absolute',bottom:0,left:0,right:0,height:'50%',background:'linear-gradient(180deg,#0C0A04 0%,#070601 100%)',clipPath:'polygon(0 100%,50% 0,100% 100%)'}}/>
//         {/* Gold edge lines */}
//         <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)'}}/>
//         <div style={{position:'absolute',bottom:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.3),transparent)'}}/>
//       </div>

//       {/* WAX SEAL — gold, front */}
//       <div style={{
//         position:'absolute',top:'50%',left:'50%',
//         transform:'translate(-50%,-52%)',
//         width:'clamp(54px,9vw,84px)',height:'clamp(54px,9vw,84px)',
//         background:'radial-gradient(circle at 35% 35%,#F5D678 0%,#D4AF37 40%,#8B6914 100%)',
//         borderRadius:'50%',
//         border:'2px solid rgba(245,214,120,.5)',
//         display:'flex',alignItems:'center',justifyContent:'center',
//         boxShadow:'0 0 0 6px rgba(212,175,55,.08),0 0 0 12px rgba(212,175,55,.04),0 8px 30px rgba(0,0,0,.8)',
//         zIndex:10,
//         opacity: phase==='opening' ? 0 : 1,
//         transition:'opacity .25s',
//       }}>
//         <div style={{position:'absolute',inset:-8,border:'1px solid rgba(212,175,55,.3)',borderRadius:'50%',borderStyle:'dashed',animation:'lux-spin 30s linear infinite'}}/>
//         <div style={{position:'absolute',inset:-14,border:'1px solid rgba(212,175,55,.12)',borderRadius:'50%'}}/>
//         <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(13px,2vw,20px)',fontStyle:'italic',color:'#0A0803',fontWeight:600,position:'relative',zIndex:1}}>
//           A&amp;D
//         </span>
//       </div>

//       {/* FLAP — dark gold interior */}
//       <div style={{
//         position:'absolute',top:0,left:0,right:0,zIndex:8,height:'52%',
//         background:'linear-gradient(160deg,#14100A 0%,#0A0803 100%)',
//         clipPath:'polygon(0 0,100% 0,50% 100%)',
//         transformOrigin:'top center',
//         transform: phase==='opening' ? 'perspective(800px) rotateX(192deg)' : 'perspective(800px) rotateX(0deg)',
//         transition:'transform 1.05s cubic-bezier(.4,0,.2,1)',
//         borderBottom:'1px solid rgba(212,175,55,.25)',
//       }}>
//         <div style={{position:'absolute',inset:0,background:'linear-gradient(160deg,rgba(212,175,55,.08) 0%,transparent 50%)'}}/>
//       </div>
//     </div>
//   </div>
// )

// // Gold divider ornament
// const GoldDivider = () => (
//   <div style={{display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:440}}>
//     <div style={{flex:1,height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.6))'}}/>
//     <svg viewBox="0 0 60 20" width="60" height="20" fill="none">
//       <path d="M5 10 L20 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6"/>
//       <path d="M40 10 L55 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6"/>
//       <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".9"/>
//       <circle cx="30" cy="10" r="2" fill="#D4AF37" fillOpacity=".8"/>
//       <circle cx="18" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/>
//       <circle cx="42" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/>
//     </svg>
//     <div style={{flex:1,height:1,background:'linear-gradient(90deg,rgba(212,175,55,.6),transparent)'}}/>
//   </div>
// )

// // Waze icon
// const WazeIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}>
//     <path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/>
//   </svg>
// )

// const MapsIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}>
//     <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
//   </svg>
// )

// const PhoneIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}>
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
//   </svg>
// )

// const WaIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}>
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
//     <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
//   </svg>
// )

// const BackArrow = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}>
//     <path d="M19 12H5M12 5l-7 7 7 7"/>
//   </svg>
// )

// type Phase = 'envelope' | 'opening' | 'invite'

// /* ═══════════════════════════════════════
//    ENVELOPE SCREEN
// ═══════════════════════════════════════ */
// function EnvelopeScreen({ onOpen, phase }:{onOpen:()=>void,phase:Phase}) {
//   return (
//     <div style={{position:'fixed',inset:0,top:56,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
//       {/* Deep dark background */}
//       <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 70% at 50% 40%,#1A1408 0%,#0A0803 50%,#050401 100%)'}}/>
//       {/* Gold particle ambient */}
//       <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 50% 40% at 20% 20%,rgba(212,175,55,.06) 0%,transparent 60%), radial-gradient(ellipse 40% 35% at 80% 80%,rgba(212,175,55,.05) 0%,transparent 60%)'}}/>

//       {/* Art Deco corners */}
//       <div style={{position:'absolute',top:0,left:0,width:'min(200px,22vw)',height:'min(200px,22vw)',opacity:.7,pointerEvents:'none'}}><ArtDecoCorner/></div>
//       <div style={{position:'absolute',top:0,right:0,width:'min(200px,22vw)',height:'min(200px,22vw)',opacity:.7,pointerEvents:'none'}}><ArtDecoCorner flip/></div>
//       <div style={{position:'absolute',bottom:0,left:0,width:'min(180px,20vw)',height:'min(180px,20vw)',opacity:.6,pointerEvents:'none'}}><ArtDecoCorner flipY/></div>
//       <div style={{position:'absolute',bottom:0,right:0,width:'min(180px,20vw)',height:'min(180px,20vw)',opacity:.6,pointerEvents:'none'}}><ArtDecoCorner flip flipY/></div>

//       {/* Horizontal gold rules */}
//       <div style={{position:'absolute',top:'12%',left:'5%',right:'5%',height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.25),transparent)',pointerEvents:'none'}}/>
//       <div style={{position:'absolute',bottom:'12%',left:'5%',right:'5%',height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.25),transparent)',pointerEvents:'none'}}/>

//       {/* Center content */}
//       <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',gap:18,padding:'20px 24px'}}>
//         {/* Crown */}
//         <div style={{animation:'fadeUp .6s ease both',marginBottom:-6}}>
//           <CrownSVG/>
//         </div>

//         <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(9px,1vw,11px)',letterSpacing:'.38em',textTransform:'uppercase',color:'rgba(212,175,55,.7)',animation:'fadeUp .7s ease both .05s'}}>
//           Invitație de Nuntă
//         </p>

//         <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(30px,4.5vw,54px)',fontWeight:300,fontStyle:'italic',color:'#F5D678',textAlign:'center',lineHeight:1.15,animation:'fadeUp .8s ease both .12s',margin:0,textShadow:'0 0 40px rgba(212,175,55,.3)'}}>
//           <strong style={{fontWeight:600,fontStyle:'normal',color:'#F5E6A8'}}>Alexandra</strong>
//           <span style={{color:'rgba(212,175,55,.5)',fontWeight:300,fontSize:'.75em',display:'block',margin:'2px 0',letterSpacing:'.2em',fontStyle:'normal'}}>&amp;</span>
//           <strong style={{fontWeight:600,fontStyle:'normal',color:'#F5E6A8'}}>Dragoș</strong>
//         </h1>

//         {/* Envelope */}
//         <div
//           onClick={onOpen}
//           role="button"
//           tabIndex={0}
//           onKeyDown={e=>e.key==='Enter'&&onOpen()}
//           style={{animation:'envFloat 5s ease-in-out infinite, fadeUp .9s ease both .2s'}}
//         >
//           <EnvelopeLuxSVG phase={phase}/>
//         </div>

//         <p style={{
//           fontFamily:"'Cinzel',serif",
//           fontSize:'clamp(8px,1vw,10px)',
//           letterSpacing:'.28em',textTransform:'uppercase',
//           color:'rgba(212,175,55,.55)',
//           animation: phase==='opening' ? 'none' : 'fadeUp 1s ease both .35s, lux-pulse 3s ease-in-out infinite 1.3s',
//           opacity: phase==='opening' ? .8 : undefined,
//         }}>
//           {phase==='opening' ? '◆  Dezvăluind invitația  ◆' : 'Atinge pentru a deschide'}
//         </p>
//       </div>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════
//    INVITE SCREEN — OPULENCE FULL
// ═══════════════════════════════════════ */
// function InviteScreen({ onBack:_onBack }:{onBack:()=>void}) {
//   const WEDDING = new Date('2027-05-03T16:00:00')
//   const [modal, setModal] = useState(false)
//   const [vis, setVis] = useState(false)
//   const cd = useCountdown(WEDDING)
//   const [flipS, setFlipS] = useState(false)

//   useEffect(()=>{ const t=setTimeout(()=>setVis(true),60); return()=>clearTimeout(t) },[])
//   useEffect(()=>{ setFlipS(true); const t=setTimeout(()=>setFlipS(false),160); return()=>clearTimeout(t) },[cd.s])

//   const a = (d:number):React.CSSProperties => ({
//     opacity: vis?1:0,
//     transform: vis?'translateY(0)':'translateY(22px)',
//     transition:`opacity .75s ease ${d}s, transform .75s ease ${d}s`,
//   })

//   const locCardStyle:React.CSSProperties = {
//     borderRadius:16,overflow:'hidden',
//     border:'1px solid rgba(212,175,55,.2)',
//     background:'rgba(255,255,255,.03)',
//     backdropFilter:'blur(12px)',
//     boxShadow:'0 8px 40px rgba(0,0,0,.5)',
//     transition:'transform .25s ease,box-shadow .25s ease',
//   }

//   const btnDeco:React.CSSProperties = {
//     display:'inline-flex',alignItems:'center',justifyContent:'center',gap:6,
//     padding:'9px 14px',borderRadius:8,
//     fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:600,letterSpacing:'.12em',
//     cursor:'default',flex:1,whiteSpace:'nowrap',
//   }

//   return (
//     <div style={{position:'fixed',inset:0,top:56,overflowY:'auto',overflowX:'hidden'}}>
//       {/* Fixed deep bg */}
//       <div style={{position:'fixed',inset:0,background:'radial-gradient(ellipse 90% 80% at 50% 30%,#1A1408 0%,#0A0803 55%,#050401 100%)',zIndex:0}}/>
//       {/* Gold dust ambient */}
//       <div style={{position:'fixed',inset:0,background:'radial-gradient(ellipse 60% 50% at 15% 20%,rgba(212,175,55,.07) 0%,transparent 55%),radial-gradient(ellipse 50% 45% at 85% 80%,rgba(212,175,55,.06) 0%,transparent 55%)',zIndex:1,pointerEvents:'none'}}/>
//       {/* Marble texture */}
//       <div style={{position:'fixed',inset:0,opacity:.04,zIndex:1,pointerEvents:'none',backgroundImage:'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'500\' height=\'500\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'turbulence\' baseFrequency=\'.008\' numOctaves=\'8\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'500\' height=\'500\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")'}}/>

//       {/* Fixed Art Deco corners */}
//       <div style={{position:'fixed',top:0,left:0,width:'min(180px,20vw)',height:'min(180px,20vw)',opacity:.65,pointerEvents:'none',zIndex:2}}><ArtDecoCorner/></div>
//       <div style={{position:'fixed',top:0,right:0,width:'min(180px,20vw)',height:'min(180px,20vw)',opacity:.65,pointerEvents:'none',zIndex:2}}><ArtDecoCorner flip/></div>
//       <div style={{position:'fixed',bottom:0,left:0,width:'min(160px,18vw)',height:'min(160px,18vw)',opacity:.55,pointerEvents:'none',zIndex:2}}><ArtDecoCorner flipY/></div>
//       <div style={{position:'fixed',bottom:0,right:0,width:'min(160px,18vw)',height:'min(160px,18vw)',opacity:.55,pointerEvents:'none',zIndex:2}}><ArtDecoCorner flip flipY/></div>

//       {/* Horizontal rules */}
//       <div style={{position:'fixed',top:'8%',left:'4%',right:'4%',height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.2),transparent)',zIndex:2,pointerEvents:'none'}}/>

//       {/* Scrollable content */}
//       <div style={{position:'relative',zIndex:10,maxWidth:700,margin:'0 auto',padding:'clamp(36px,6vw,64px) clamp(16px,4vw,32px) 60px',display:'flex',flexDirection:'column',alignItems:'center',gap:0}}>

//         {/* Crown top */}
//         <div style={{...a(0),marginBottom:10}}><CrownSVG/></div>

//         {/* Eyebrow */}
//         <p style={{...a(.06),fontFamily:"'Cinzel',serif",fontSize:'clamp(8px,1vw,10px)',letterSpacing:'.36em',textTransform:'uppercase',color:'rgba(212,175,55,.65)',marginBottom:12}}>
//           Cu Onoare Vă Invităm
//         </p>

//         {/* NAMES — massive */}
//         <div style={{...a(.1),textAlign:'center',marginBottom:6}}>
//           <span style={{display:'block',fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(58px,10vw,112px)',fontWeight:600,fontStyle:'italic',color:'#F5E6A8',lineHeight:.92,letterSpacing:'-.01em',textShadow:'0 0 60px rgba(212,175,55,.25)'}}>
//             Alexandra
//           </span>
//           <span style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:'clamp(14px,2vw,22px)',fontWeight:400,color:'rgba(212,175,55,.6)',margin:'8px 0',letterSpacing:'.3em',textShadow:'none'}}>
//             &amp;
//           </span>
//           <span style={{display:'block',fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(58px,10vw,112px)',fontWeight:600,fontStyle:'italic',color:'#F5E6A8',lineHeight:.92,letterSpacing:'-.01em',textShadow:'0 0 60px rgba(212,175,55,.25)'}}>
//             Dragoș
//           </span>
//         </div>

//         {/* Gold divider */}
//         <div style={{...a(.18),display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:440,margin:'22px auto'}}>
//           <GoldDivider/>
//         </div>

//         {/* Roman date */}
//         <div style={{...a(.22),textAlign:'center',marginBottom:20}}>
//           <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(14px,1.8vw,18px)',letterSpacing:'.22em',color:'#D4AF37',fontWeight:400,marginBottom:6}}>
//             III · Mai · MMXXVII
//           </p>
//           <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(14px,1.7vw,18px)',fontStyle:'italic',fontWeight:300,color:'rgba(245,230,168,.55)',letterSpacing:'.06em'}}>
//             București, România
//           </p>
//         </div>

//         {/* Nași */}
//         <div style={{
//           ...a(.27),
//           textAlign:'center',padding:'22px 32px',
//           border:'1px solid rgba(212,175,55,.2)',
//           borderRadius:16,
//           background:'rgba(212,175,55,.04)',
//           backdropFilter:'blur(8px)',
//           maxWidth:380,width:'100%',
//           position:'relative',
//           boxShadow:'0 4px 40px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.1)',
//           marginBottom:0,
//         }}>
//           {/* Corner accents */}
//           {['topleft','topright','bottomleft','bottomright'].map(pos=>(
//             <div key={pos} style={{
//               position:'absolute',
//               top: pos.includes('top') ? 8 : 'auto',
//               bottom: pos.includes('bottom') ? 8 : 'auto',
//               left: pos.includes('left') ? 8 : 'auto',
//               right: pos.includes('right') ? 8 : 'auto',
//               width:12,height:12,
//               borderTop: pos.includes('top') ? '1px solid rgba(212,175,55,.5)' : 'none',
//               borderBottom: pos.includes('bottom') ? '1px solid rgba(212,175,55,.5)' : 'none',
//               borderLeft: pos.includes('left') ? '1px solid rgba(212,175,55,.5)' : 'none',
//               borderRight: pos.includes('right') ? '1px solid rgba(212,175,55,.5)' : 'none',
//             }}/>
//           ))}
//           <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(12px,1.4vw,14px)',fontStyle:'italic',color:'rgba(212,175,55,.6)',marginBottom:8,letterSpacing:'.06em'}}>
//             Alături de nașii noștri
//           </p>
//           <div style={{width:32,height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)',margin:'0 auto 10px'}}/>
//           <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(20px,2.5vw,26px)',fontStyle:'italic',fontWeight:300,color:'#F5E6A8',letterSpacing:'.04em'}}>
//             Elena &amp; Cristian
//           </p>
//         </div>

//         {/* Gold divider */}
//         <div style={{...a(.32),display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:440,margin:'24px auto'}}>
//           <GoldDivider/>
//         </div>

//         {/* COUNTDOWN */}
//         <div style={{
//           ...a(.36),
//           width:'100%',maxWidth:480,
//           background:'rgba(212,175,55,.04)',
//           border:'1px solid rgba(212,175,55,.18)',
//           borderRadius:20,padding:'24px 20px',
//           boxShadow:'0 8px 50px rgba(0,0,0,.5),inset 0 1px 0 rgba(212,175,55,.08)',
//           textAlign:'center',
//           position:'relative',
//           overflow:'hidden',
//         }}>
//           <div style={{position:'absolute',top:0,left:'10%',right:'10%',height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)'}}/>
//           <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(7px,.9vw,9px)',letterSpacing:'.32em',textTransform:'uppercase',color:'rgba(212,175,55,.55)',marginBottom:18}}>
//             Timp Rămas Până La Marea Sărbătoare
//           </p>
//           <div style={{display:'flex',gap:0,justifyContent:'center'}}>
//             {[{n:pad(cd.d),l:'Zile'},{n:pad(cd.h),l:'Ore'},{n:pad(cd.m),l:'Minute'},{n:pad(cd.s),l:'Secunde',flip:flipS}].map(u=>(
//               <div key={u.l} style={{flex:1,maxWidth:112,textAlign:'center',padding:'0 6px',borderRight:'1px solid rgba(212,175,55,.12)'}}>
//                 <span style={{
//                   display:'block',
//                   fontFamily:"'Cormorant Garamond',serif",
//                   fontSize:'clamp(38px,6vw,64px)',
//                   fontWeight:300,
//                   lineHeight:1,
//                   transition:'transform .15s ease,color .15s ease',
//                   transform: (u as any).flip ? 'scale(1.08) translateY(-3px)' : 'scale(1)',
//                   color: (u as any).flip ? '#F5D678' : '#D4AF37',
//                   textShadow: (u as any).flip ? '0 0 20px rgba(212,175,55,.4)' : 'none',
//                 }}>
//                   {u.n}
//                 </span>
//                 <span style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(6px,.8vw,8px)',letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(212,175,55,.45)',display:'block',marginTop:4}}>
//                   {u.l}
//                 </span>
//               </div>
//             ))}
//           </div>
//           <div style={{position:'absolute',bottom:0,left:'10%',right:'10%',height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)'}}/>
//         </div>

//         {/* Gold divider */}
//         <div style={{...a(.42),display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:440,margin:'24px auto'}}>
//           <GoldDivider/>
//         </div>

//         {/* LOCATION CARDS */}
//         <div style={{
//           ...a(.46),
//           width:'100%',
//           display:'grid',
//           gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,260px),1fr))',
//           gap:'clamp(12px,2vw,20px)',
//           maxWidth:640,
//         }}>
//           {/* Church */}
//           <div style={locCardStyle}
//             onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)';(e.currentTarget as HTMLDivElement).style.boxShadow='0 20px 60px rgba(0,0,0,.7),0 0 30px rgba(212,175,55,.1)'}}
//             onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform='';(e.currentTarget as HTMLDivElement).style.boxShadow='0 8px 40px rgba(0,0,0,.5)'}}
//           >
//             <div style={{padding:'16px 18px 12px',background:'linear-gradient(135deg,rgba(212,175,55,.15) 0%,rgba(212,175,55,.06) 100%)',borderBottom:'1px solid rgba(212,175,55,.15)',display:'flex',alignItems:'center',gap:12}}>
//               <div style={{width:40,height:40,borderRadius:10,background:'rgba(212,175,55,.12)',border:'1px solid rgba(212,175,55,.3)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}>
//                   <path d="M12 2L12 6M10 4h4"/>
//                   <rect x="4" y="9" width="16" height="12" rx="1"/>
//                   <path d="M9 21V14a3 3 0 0 1 6 0v7"/>
//                   <path d="M4 9l8-4 8 4"/>
//                 </svg>
//               </div>
//               <div>
//                 <span style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.22em',textTransform:'uppercase',color:'rgba(212,175,55,.55)',display:'block',marginBottom:2}}>Ceremonia Religioasă</span>
//                 <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(15px,1.8vw,19px)',fontStyle:'italic',fontWeight:300,color:'#F5E6A8',lineHeight:1.2}}>Cununia</p>
//               </div>
//             </div>
//             <div style={{padding:'14px 18px 16px'}}>
//               <p style={{fontFamily:"'Cinzel',serif",fontWeight:600,fontSize:'clamp(10px,1.1vw,12px)',color:'#D4AF37',marginBottom:3,letterSpacing:'.05em'}}>Catedrala Sfântul Iosif</p>
//               <p style={{fontSize:'clamp(10px,1.1vw,12px)',color:'rgba(212,175,55,.45)',lineHeight:1.5,marginBottom:10,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Strada General Berthelot, București</p>
//               <div style={{display:'inline-flex',alignItems:'center',gap:5,background:'rgba(212,175,55,.08)',border:'1px solid rgba(212,175,55,.2)',borderRadius:100,padding:'4px 12px',fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.14em',textTransform:'uppercase',color:'rgba(212,175,55,.7)',marginBottom:12}}>
//                 ◆ 3 mai 2027 · ora 14:00
//               </div>
//               <div style={{display:'flex',gap:8}}>
//                 <div style={{...btnDeco,background:'linear-gradient(135deg,rgba(8,162,212,.25) 0%,rgba(8,162,212,.15) 100%)',border:'1px solid rgba(8,162,212,.3)',color:'rgba(140,210,240,.9)'}}>
//                   <WazeIcon/> Waze
//                 </div>
//                 <div style={{...btnDeco,background:'linear-gradient(135deg,rgba(76,175,79,.22) 0%,rgba(76,175,79,.12) 100%)',border:'1px solid rgba(76,175,79,.28)',color:'rgba(120,210,120,.9)'}}>
//                   <MapsIcon/> Maps
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Reception — custom party SVG */}
//           <div style={locCardStyle}
//             onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)';(e.currentTarget as HTMLDivElement).style.boxShadow='0 20px 60px rgba(0,0,0,.7),0 0 30px rgba(212,175,55,.1)'}}
//             onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform='';(e.currentTarget as HTMLDivElement).style.boxShadow='0 8px 40px rgba(0,0,0,.5)'}}
//           >
//             <div style={{padding:'16px 18px 12px',background:'linear-gradient(135deg,rgba(212,175,55,.15) 0%,rgba(212,175,55,.06) 100%)',borderBottom:'1px solid rgba(212,175,55,.15)',display:'flex',alignItems:'center',gap:12}}>
//               <div style={{width:40,height:40,borderRadius:10,background:'rgba(212,175,55,.12)',border:'1px solid rgba(212,175,55,.3)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
//                 {/* Custom party SVG — lumânări duble + raze */}
//                 <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}>
//                   <path d="M8 18c0 1.65-1.35 3-3 3s-3-1.35-3-3c0-2 3-6 3-6s3 4 3 6z"/>
//                   <path d="M5 12V4"/>
//                   <path d="M19 14c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.5 2-4 2-4s2 2.5 2 4z"/>
//                   <path d="M17 10V6"/>
//                   <path d="M12 8l2-2M12 8l-2-2M12 8v4"/>
//                   <path d="M22 5l-1 1M20 3l1 1"/>
//                   <circle cx="12" cy="14" r=".7" fill="#D4AF37" stroke="none"/>
//                   <circle cx="22" cy="7" r=".7" fill="#D4AF37" stroke="none"/>
//                 </svg>
//               </div>
//               <div>
//                 <span style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.22em',textTransform:'uppercase',color:'rgba(212,175,55,.55)',display:'block',marginBottom:2}}>Recepție Gală</span>
//                 <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(15px,1.8vw,19px)',fontStyle:'italic',fontWeight:300,color:'#F5E6A8',lineHeight:1.2}}>Banchetul Imperial</p>
//               </div>
//             </div>
//             <div style={{padding:'14px 18px 16px'}}>
//               <p style={{fontFamily:"'Cinzel',serif",fontWeight:600,fontSize:'clamp(10px,1.1vw,12px)',color:'#D4AF37',marginBottom:3,letterSpacing:'.05em'}}>Grand Hotel Continental</p>
//               <p style={{fontSize:'clamp(10px,1.1vw,12px)',color:'rgba(212,175,55,.45)',lineHeight:1.5,marginBottom:10,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Calea Victoriei 56, București</p>
//               <div style={{display:'inline-flex',alignItems:'center',gap:5,background:'rgba(212,175,55,.08)',border:'1px solid rgba(212,175,55,.2)',borderRadius:100,padding:'4px 12px',fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.14em',textTransform:'uppercase',color:'rgba(212,175,55,.7)',marginBottom:12}}>
//                 ◆ 3 mai 2027 · ora 18:00
//               </div>
//               <div style={{display:'flex',gap:8}}>
//                 <div style={{...btnDeco,background:'linear-gradient(135deg,rgba(8,162,212,.25) 0%,rgba(8,162,212,.15) 100%)',border:'1px solid rgba(8,162,212,.3)',color:'rgba(140,210,240,.9)'}}>
//                   <WazeIcon/> Waze
//                 </div>
//                 <div style={{...btnDeco,background:'linear-gradient(135deg,rgba(76,175,79,.22) 0%,rgba(76,175,79,.12) 100%)',border:'1px solid rgba(76,175,79,.28)',color:'rgba(120,210,120,.9)'}}>
//                   <MapsIcon/> Maps
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contact */}
//         <div style={{
//           ...a(.52),
//           width:'100%',maxWidth:640,
//           background:'rgba(212,175,55,.04)',
//           border:'1px solid rgba(212,175,55,.18)',
//           borderRadius:16,padding:'16px 20px',
//           backdropFilter:'blur(8px)',
//           boxShadow:'0 6px 30px rgba(0,0,0,.4)',
//           marginTop:'clamp(12px,2vw,20px)',
//         }}>
//           <p style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.28em',textTransform:'uppercase',color:'rgba(212,175,55,.5)',marginBottom:12}}>
//             Contact Mireasă
//           </p>
//           <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
//             <div>
//               <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(15px,1.8vw,19px)',fontStyle:'italic',color:'#F5E6A8',marginBottom:3}}>Alexandra</p>
//               <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(11px,1.3vw,13px)',color:'#D4AF37',letterSpacing:'.08em',fontWeight:600}}>0752 954 258</p>
//             </div>
//             <div style={{display:'flex',gap:8}}>
//               <div style={{...btnDeco,padding:'10px 18px',borderRadius:100,background:'rgba(212,175,55,.12)',border:'1px solid rgba(212,175,55,.3)',color:'#D4AF37'}}>
//                 <PhoneIcon/> Telefon
//               </div>
//               <div style={{...btnDeco,padding:'10px 18px',borderRadius:100,background:'rgba(37,211,102,.12)',border:'1px solid rgba(37,211,102,.3)',color:'rgba(100,220,130,.9)'}}>
//                 <WaIcon/> WhatsApp
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Gold divider */}
//         <div style={{...a(.56),display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:440,margin:'24px auto'}}>
//           <GoldDivider/>
//         </div>

//         {/* RSVP */}
//         <div style={{...a(.60),textAlign:'center',width:'100%',maxWidth:400}}>
//           <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(14px,1.7vw,17px)',fontStyle:'italic',color:'rgba(212,175,55,.55)',marginBottom:16,lineHeight:1.7,letterSpacing:'.04em'}}>
//             Vă rugăm să confirmați prezența Dvs.<br/>până pe <strong style={{color:'#D4AF37',fontStyle:'normal'}}>1 Aprilie 2027</strong>
//           </p>
//           <button onClick={()=>setModal(true)} style={{
//             display:'block',width:'100%',
//             padding:'clamp(14px,1.8vw,18px) 0',
//             borderRadius:4,
//             background:'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)',
//             color:'#0A0803',textAlign:'center',
//             fontFamily:"'Cinzel',serif",
//             fontSize:'clamp(11px,1.3vw,13px)',
//             fontWeight:700,letterSpacing:'.22em',textTransform:'uppercase',
//             cursor:'pointer',border:'none',
//             boxShadow:'0 8px 40px rgba(212,175,55,.35),0 2px 0 rgba(245,214,120,.5) inset',
//             transition:'transform .22s,box-shadow .22s',
//             position:'relative',overflow:'hidden',
//           }}
//             onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 16px 60px rgba(212,175,55,.55),0 2px 0 rgba(245,214,120,.5) inset'}}
//             onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 8px 40px rgba(212,175,55,.35),0 2px 0 rgba(245,214,120,.5) inset'}}
//           >
//             <span style={{position:'relative',zIndex:1}}>◆ Confirmă Prezența ◆</span>
//             <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)',backgroundSize:'350px 100%',animation:'shimmer 3s linear infinite'}}/>
//           </button>
//         </div>

//         {/* Choose theme bar */}
//         <div style={{
//           ...a(.65),
//           width:'100%',
//           padding:'22px 24px 24px',
//           background:'rgba(212,175,55,.05)',
//           border:'1px solid rgba(212,175,55,.15)',
//           borderRadius:16,
//           display:'flex',flexDirection:'column',alignItems:'center',gap:14,
//           backdropFilter:'blur(8px)',
//           marginTop:16,
//           boxShadow:'0 4px 30px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.1)',
//         }}>
//           <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontStyle:'italic',color:'rgba(212,175,55,.6)',letterSpacing:'.04em',margin:0,textAlign:'center'}}>
//             Îți place această temă? Personalizează-o pentru evenimentul tău
//           </p>
//           <a href="/preturi?tema=lux" style={{
//             display:'inline-flex',alignItems:'center',gap:10,
//             padding:'12px 36px',borderRadius:4,
//             background:'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)',
//             color:'#0A0803',textDecoration:'none',
//             fontFamily:"'Cinzel',serif",fontSize:11,fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',
//             boxShadow:'0 6px 28px rgba(212,175,55,.35)',
//             transition:'transform .2s,box-shadow .2s',
//           }}
//             onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLAnchorElement).style.boxShadow='0 14px 44px rgba(212,175,55,.55)'}}
//             onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='';(e.currentTarget as HTMLAnchorElement).style.boxShadow='0 6px 28px rgba(212,175,55,.35)'}}
//           >
//             ◆ Alege Această Temă
//           </a>
//           <p style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.2em',textTransform:'uppercase',color:'rgba(212,175,55,.3)',margin:0}}>
//             VibeInvite © 2026 · Toate drepturile rezervate
//           </p>
//         </div>
//       </div>

//       {/* Modal */}
//       {modal && (
//         <div onClick={()=>setModal(false)} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,.75)',backdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,animation:'fadeIn .28s ease'}}>
//           <div onClick={e=>e.stopPropagation()} style={{background:'linear-gradient(170deg,#1A1408,#0A0803)',borderRadius:20,padding:'40px 34px',maxWidth:360,width:'100%',border:'1px solid rgba(212,175,55,.25)',boxShadow:'0 40px 100px rgba(0,0,0,.9),0 0 60px rgba(212,175,55,.12)',textAlign:'center',animation:'slideUp .32s cubic-bezier(.4,0,.2,1)',position:'relative'}}>
//             <div style={{position:'absolute',top:0,left:'15%',right:'15%',height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)'}}/>
//             <div style={{marginBottom:16}}><CrownSVG/></div>
//             <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontStyle:'italic',fontWeight:300,color:'#F5E6A8',marginBottom:10}}>Mulțumim!</h2>
//             <div style={{width:36,height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)',margin:'0 auto 14px'}}/>
//             <p style={{fontSize:13,color:'rgba(212,175,55,.55)',marginBottom:24,lineHeight:1.8,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>
//               Aceasta este o demonstrație a temei <strong style={{color:'#D4AF37',fontStyle:'normal'}}>Lux</strong>.<br/>Achiziționează pachetul pentru a activa confirmările de prezență.
//             </p>
//             <button onClick={()=>setModal(false)} style={{padding:'12px 36px',borderRadius:4,background:'linear-gradient(135deg,#8B6914,#D4AF37,#8B6914)',color:'#0A0803',fontSize:11,fontWeight:700,fontFamily:"'Cinzel',serif",letterSpacing:'.2em',textTransform:'uppercase',border:'none',cursor:'pointer',boxShadow:'0 6px 24px rgba(212,175,55,.3)'}}>
//               Închide
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// /* ═══════════════════════════════════════
//    ROOT
// ═══════════════════════════════════════ */
// export default function App() {
//   const [phase, setPhase] = useState<Phase>('envelope')

//   function openEnvelope() {
//     if(phase!=='envelope') return
//     setPhase('opening')
//     setTimeout(()=>setPhase('invite'),1700)
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');
//         *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
//         html,body{height:100%;overflow:hidden;-webkit-font-smoothing:antialiased;}
//         body{font-family:'Lato',sans-serif;background:#050401;color:#F5E6A8;}

//         @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
//         @keyframes envFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
//         @keyframes lux-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
//         @keyframes lux-pulse{0%,100%{opacity:.45}50%{opacity:.9}}
//         @keyframes shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
//         @keyframes fadeIn{from{opacity:0}to{opacity:1}}
//         @keyframes slideUp{from{opacity:0;transform:scale(.92) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}

//         /* Responsive */
//         @media(max-width:480px){
//           body{overflow:hidden}
//         }
//         @media(max-width:360px){
//           body{font-size:14px}
//         }
//       `}</style>

//       {/* HEADER */}
//       <header style={{
//         position:'fixed',top:0,left:0,right:0,zIndex:200,
//         height:56,
//         display:'flex',alignItems:'center',justifyContent:'space-between',
//         padding:'0 clamp(14px,4vw,28px)',
//         background:'rgba(5,4,1,.95)',
//         borderBottom:'1px solid rgba(212,175,55,.15)',
//         backdropFilter:'blur(16px)',
//       }}>
//         {/* Logo */}
//         <a href="/invitatii-digitale" style={{
//           fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:600,
//           letterSpacing:'.24em',textTransform:'uppercase',
//           color:'#D4AF37',textDecoration:'none',
//           transition:'color .2s',
//         }}
//           onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.color='#F5D678'}
//           onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.color='#D4AF37'}
//         >
//           Vibe<span style={{color:'rgba(212,175,55,.5)'}}>Invite</span>
//         </a>

//         <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontStyle:'italic',color:'rgba(212,175,55,.5)',letterSpacing:'.06em'}}>
//           {phase==='invite' ? 'Alexandra & Dragoș · III Mai MMXXVII' : 'Invitație Lux'}
//         </div>

//         <a href="/invitatii-digitale" style={{
//           display:'inline-flex',alignItems:'center',gap:6,
//           padding:'6px 14px',borderRadius:3,
//           background:'rgba(212,175,55,.08)',
//           border:'1px solid rgba(212,175,55,.2)',
//           color:'#D4AF37',
//           fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:600,letterSpacing:'.14em',textTransform:'uppercase',
//           cursor:'pointer',textDecoration:'none',
//           transition:'all .2s',
//         }}
//           onMouseEnter={e=>{const b=e.currentTarget as HTMLAnchorElement;b.style.background='rgba(212,175,55,.16)';b.style.borderColor='rgba(212,175,55,.4)'}}
//           onMouseLeave={e=>{const b=e.currentTarget as HTMLAnchorElement;b.style.background='rgba(212,175,55,.08)';b.style.borderColor='rgba(212,175,55,.2)'}}
//         >
//           <BackArrow/> Înapoi
//         </a>
//       </header>

//       {phase!=='invite' && <EnvelopeScreen onOpen={openEnvelope} phase={phase}/>}
//       {phase==='invite' && <InviteScreen onBack={()=>setPhase('envelope')}/>}
//     </>
//   )
// }
'use client'

import { useState, useEffect } from 'react'

/* ════════════════════════════════
   SEO
════════════════════════════════ */
function useSEO() {
  useEffect(() => {
    document.title = 'Invitații Nuntă Online | Demo Stil Lux — VibeInvite'
    const m = (sel:string, attr:string, val:string, content:string) => {
      let el = document.querySelector(sel)
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, val); document.head.appendChild(el) }
      el.setAttribute('content', content)
    }
    m('meta[name="description"]','name','description','Invitație digitală de nuntă în stil Lux — opulentă, rafinată, Art Deco cu accente aurii. Crează-ți invitația online în 3 minute. RSVP instant, link free, GPS inclus, upload poze nuntă.')
    m('meta[name="keywords"]','name','keywords','invitatii nunta online, invitatii nunta lux, invitatii nunta elegante, invitatie nunta gold, invitatie nunta premium, invitatie nunta art deco, invitatie online free, link invitatie nunta, invitatii digitale nunta romania, creare invitatie nunta online, invitatie nunta de lux, RSVP nunta online, confirmare prezenta nunta, invitatii nunta personalizate, invitatie digitala nunta, invitatie nunta aurie, invitatii nunta rafinate, upload poze nunta, vibeinvite, invitatii nunta moderne, invitatie nunta neagra, invitatie nunta opulenta')
    m('meta[property="og:title"]','property','og:title','Invitații Nuntă Online Lux — VibeInvite Demo')
    m('meta[property="og:description"]','property','og:description','Demo invitație digitală de nuntă în stil Lux. Opulentă, Art Deco, cu accente aurii. RSVP instant, GPS, upload poze invitați.')
    m('meta[property="og:type"]','property','og:type','website')
    m('meta[property="og:url"]','property','og:url','https://vibeinvite.ro/invitatii-digitale/demo/LuxDemo')
    m('meta[property="og:site_name"]','property','og:site_name','VibeInvite')
    m('meta[property="og:image"]','property','og:image','https://vibeinvite.ro/og-lux.jpg')
    m('meta[property="og:locale"]','property','og:locale','ro_RO')
    m('meta[name="twitter:card"]','name','twitter:card','summary_large_image')
    m('meta[name="twitter:title"]','name','twitter:title','Invitații Nuntă Online Lux — VibeInvite')
    m('meta[name="twitter:description"]','name','twitter:description','Invitație digitală de nuntă lux. Opulentă, aurie, Art Deco. RSVP, GPS, upload poze.')
    m('meta[name="twitter:image"]','name','twitter:image','https://vibeinvite.ro/og-lux.jpg')
    let canon = document.querySelector('link[rel="canonical"]')
    if (!canon) { canon = document.createElement('link'); canon.setAttribute('rel','canonical'); document.head.appendChild(canon) }
    canon.setAttribute('href','https://vibeinvite.ro/invitatii-digitale/demo/LuxDemo')
    if (!document.querySelector('script[data-ld="lux"]')) {
      const ld = document.createElement('script')
      ld.setAttribute('type','application/ld+json')
      ld.setAttribute('data-ld','lux')
      ld.textContent = JSON.stringify([
        { '@context':'https://schema.org','@type':'WebPage', name:'Invitații Nuntă Online — Demo Stil Lux', description:'Demo invitație digitală de nuntă în stil Lux. Opulentă, Art Deco, aurie. RSVP instant, GPS, upload poze invitați.', url:'https://vibeinvite.ro/invitatii-digitale/demo/LuxDemo', inLanguage:'ro', isPartOf:{ '@type':'WebSite', name:'VibeInvite', url:'https://vibeinvite.ro' }, breadcrumb:{ '@type':'BreadcrumbList', itemListElement:[{ '@type':'ListItem',position:1,name:'Acasă',item:'https://vibeinvite.ro'},{ '@type':'ListItem',position:2,name:'Invitații Digitale',item:'https://vibeinvite.ro/invitatii-digitale'},{ '@type':'ListItem',position:3,name:'Demo Stil Lux',item:'https://vibeinvite.ro/invitatii-digitale/demo/LuxDemo'}] } },
        { '@context':'https://schema.org','@type':'SoftwareApplication', name:'VibeInvite — Invitații Digitale', applicationCategory:'LifestyleApplication', operatingSystem:'Web, iOS, Android', description:'Platformă de creare invitații digitale pentru nuntă și botez. RSVP online, GPS, meniu QR, upload poze invitați, export Excel.', url:'https://vibeinvite.ro', offers:{ '@type':'Offer',price:'0',priceCurrency:'RON',description:'Link invitație online gratuit'}, aggregateRating:{ '@type':'AggregateRating',ratingValue:'4.9',ratingCount:'1240'} },
        { '@context':'https://schema.org','@type':'FAQPage', mainEntity:[
          { '@type':'Question',name:'Ce este o invitație digitală de nuntă lux?',acceptedAnswer:{ '@type':'Answer',text:'O invitație digitală de nuntă lux combină design opulent, tipografie rafinată și animații elegante. Pe VibeInvite, tema Lux folosește culori negru și auriu cu elemente Art Deco.'}},
          { '@type':'Question',name:'Pot trimite invitații de nuntă online gratuit?',acceptedAnswer:{ '@type':'Answer',text:'Da! Pe VibeInvite primești un link de invitație gratuit. Pachetele premium includ RSVP, meniu QR, upload poze invitați și export Excel.'}},
          { '@type':'Question',name:'Cum pot colecta poze de la invitați în ziua nunții?',acceptedAnswer:{ '@type':'Answer',text:'VibeInvite include o funcție de upload foto. Invitații pot încărca poze direct din telefon în timpul evenimentului, iar mirii accesează toate imaginile într-un album privat.'}},
          { '@type':'Question',name:'Invitațiile digitale de nuntă sunt elegante?',acceptedAnswer:{ '@type':'Answer',text:'Absolut. VibeInvite oferă teme premium precum Lux (negru-auriu Art Deco), Nature (verde botanical) și Boho (cald, natural). Fiecare temă este designată profesional.'}},
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
const pad = (n:number) => String(n).padStart(2,'0')

/* ════════════════════════════════
   SVG COMPONENTS
════════════════════════════════ */
const CrownSVG = () => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:80,height:40}}>
    <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#cg)" strokeWidth="1.4" strokeLinejoin="round"/>
    <circle cx="60" cy="5" r="3.5" fill="url(#cg)"/>
    <circle cx="30" cy="40" r="2.5" fill="url(#cg)"/>
    <circle cx="90" cy="40" r="2.5" fill="url(#cg)"/>
    <circle cx="10" cy="20" r="2" fill="url(#cg)"/>
    <circle cx="110" cy="20" r="2" fill="url(#cg)"/>
    <path d="M4 50 L116 50" stroke="url(#cg)" strokeWidth="1"/>
    <defs><linearGradient id="cg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#8B6914"/><stop offset="40%" stopColor="#D4AF37"/><stop offset="60%" stopColor="#F5D678"/><stop offset="100%" stopColor="#8B6914"/></linearGradient></defs>
  </svg>
)

const ArtDecoCorner = ({ flip=false, flipY=false }:{flip?:boolean,flipY?:boolean}) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform:`scale(${flip?-1:1},${flipY?-1:1})`,width:'100%',height:'100%'}}>
    <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg)" strokeWidth="1.2"/>
    <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg)" strokeWidth=".7" strokeOpacity=".6"/>
    <path d="M28 28 L28 80 M28 28 L80 28" stroke="url(#dg)" strokeWidth=".5" strokeOpacity=".4"/>
    <path d="M8 50 L22 50 M8 70 L16 70 M8 90 L16 90" stroke="url(#dg)" strokeWidth=".8"/>
    <path d="M50 8 L50 22 M70 8 L70 16 M90 8 L90 16" stroke="url(#dg)" strokeWidth=".8"/>
    <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg)" fillOpacity=".8"/>
    <rect x="13" y="13" width="7" height="7" transform="rotate(45 18 18)" fill="none" stroke="url(#dg)" strokeWidth=".8" strokeOpacity=".5"/>
    <path d="M8 8 L40 50" stroke="url(#dg)" strokeWidth=".4" strokeOpacity=".3"/>
    <path d="M8 8 L50 40" stroke="url(#dg)" strokeWidth=".4" strokeOpacity=".3"/>
    <defs><linearGradient id="dg" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="50%" stopColor="#F5D678"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".4"/></linearGradient></defs>
  </svg>
)

const GoldDivider = () => (
  <div style={{display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:440}}>
    <div style={{flex:1,height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.6))'}}/>
    <svg viewBox="0 0 60 20" width="60" height="20" fill="none">
      <path d="M5 10 L20 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6"/>
      <path d="M40 10 L55 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6"/>
      <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".9"/>
      <circle cx="30" cy="10" r="2" fill="#D4AF37" fillOpacity=".8"/>
      <circle cx="18" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/>
      <circle cx="42" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/>
    </svg>
    <div style={{flex:1,height:1,background:'linear-gradient(90deg,rgba(212,175,55,.6),transparent)'}}/>
  </div>
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
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 70% at 50% 40%,#1A1408 0%,#0A0803 50%,#050401 100%)'}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 50% 40% at 20% 20%,rgba(212,175,55,.06) 0%,transparent 60%), radial-gradient(ellipse 40% 35% at 80% 80%,rgba(212,175,55,.05) 0%,transparent 60%)'}}/>
      <div style={{position:'absolute',top:0,left:0,width:'min(200px,22vw)',height:'min(200px,22vw)',opacity:.7,pointerEvents:'none'}}><ArtDecoCorner/></div>
      <div style={{position:'absolute',top:0,right:0,width:'min(200px,22vw)',height:'min(200px,22vw)',opacity:.7,pointerEvents:'none'}}><ArtDecoCorner flip/></div>
      <div style={{position:'absolute',bottom:0,left:0,width:'min(180px,20vw)',height:'min(180px,20vw)',opacity:.6,pointerEvents:'none'}}><ArtDecoCorner flipY/></div>
      <div style={{position:'absolute',bottom:0,right:0,width:'min(180px,20vw)',height:'min(180px,20vw)',opacity:.6,pointerEvents:'none'}}><ArtDecoCorner flip flipY/></div>
      <div style={{position:'absolute',top:'12%',left:'5%',right:'5%',height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.25),transparent)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:'12%',left:'5%',right:'5%',height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.25),transparent)',pointerEvents:'none'}}/>

      <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',gap:18,padding:'20px 24px'}}>
        <div style={{animation:'fadeUp .6s ease both',marginBottom:-6}}><CrownSVG/></div>
        <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(9px,1vw,11px)',letterSpacing:'.38em',textTransform:'uppercase',color:'rgba(212,175,55,.7)',animation:'fadeUp .7s ease both .05s'}}>Invitație de Nuntă</p>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(30px,4.5vw,54px)',fontWeight:300,fontStyle:'italic',color:'#F5D678',textAlign:'center',lineHeight:1.15,animation:'fadeUp .8s ease both .12s',margin:0,textShadow:'0 0 40px rgba(212,175,55,.3)'}}>
          <strong style={{fontWeight:600,fontStyle:'normal',color:'#F5E6A8'}}>Alexandra</strong>
          <span style={{color:'rgba(212,175,55,.5)',fontWeight:300,fontSize:'.75em',display:'block',margin:'2px 0',letterSpacing:'.2em',fontStyle:'normal'}}>&amp;</span>
          <strong style={{fontWeight:600,fontStyle:'normal',color:'#F5E6A8'}}>Dragoș</strong>
        </h1>

        {/* Envelope */}
        <div onClick={onOpen} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&onOpen()}
          style={{animation:'envFloat 5s ease-in-out infinite, fadeUp .9s ease both .2s',position:'relative',width:'clamp(290px,44vw,540px)',cursor:'pointer',userSelect:'none',filter:'drop-shadow(0 40px 80px rgba(0,0,0,.7))'}}>
          <div style={{position:'absolute',bottom:-20,left:'8%',right:'8%',height:24,background:'radial-gradient(ellipse,rgba(212,175,55,.18) 0%,transparent 70%)',filter:'blur(12px)',zIndex:0}}/>
          {/* Letter */}
          <div style={{position:'absolute',left:'8%',right:'8%',bottom:'4%',height:'62%',zIndex:phase==='opening'?30:2,background:'linear-gradient(170deg,#1A1408 0%,#0D0A04 100%)',border:'1px solid rgba(212,175,55,.35)',borderRadius:4,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:10,boxShadow:phase==='opening'?'0 40px 100px rgba(0,0,0,.9),0 0 60px rgba(212,175,55,.2)':'0 2px 8px rgba(0,0,0,.4)',transform:phase==='opening'?'translateY(-145%) scale(1.06) rotate(-0.6deg)':'translateY(0)',transition:'transform 1.4s cubic-bezier(.22,.1,.2,1) .2s,box-shadow 1.4s ease .2s',overflow:'hidden'}}>
            <div style={{position:'absolute',inset:0,opacity:.07,backgroundImage:'repeating-linear-gradient(0deg,#D4AF37 0,#D4AF37 1px,transparent 1px,transparent 32px)'}}/>
            <div style={{position:'absolute',top:8,left:8,right:8,bottom:8,border:'1px solid rgba(212,175,55,.2)',borderRadius:2}}/>
            <div style={{textAlign:'center',padding:'0 20px',position:'relative',zIndex:1}}>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(16px,2.8vw,28px)',fontStyle:'italic',fontWeight:300,color:'#D4AF37',lineHeight:1.2,letterSpacing:'.04em'}}>Alexandra &amp; Dragoș</p>
              <div style={{width:40,height:1,background:'linear-gradient(90deg,transparent,#D4AF37,transparent)',margin:'10px auto'}}/>
              <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(7px,.9vw,9px)',letterSpacing:'.3em',textTransform:'uppercase',color:'rgba(212,175,55,.7)',fontWeight:400}}>3 Mai 2027</p>
            </div>
          </div>
          {/* Body */}
          <div style={{width:'100%',paddingTop:'60%',position:'relative',zIndex:5}}>
            <div style={{position:'absolute',inset:0,background:'#0A0803',borderRadius:6,border:'1px solid rgba(212,175,55,.28)',boxShadow:'0 8px 40px rgba(0,0,0,.8),inset 0 1px 0 rgba(212,175,55,.15)',overflow:'hidden'}}>
              <div style={{position:'absolute',inset:0,opacity:.06,backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='.012' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"}}/>
              <div style={{position:'absolute',top:0,bottom:0,left:0,width:'50%',background:'linear-gradient(160deg,#0E0C06,#080602)',clipPath:'polygon(0 0,0 100%,100% 100%)'}}/>
              <div style={{position:'absolute',top:0,bottom:0,right:0,width:'50%',background:'linear-gradient(200deg,#0E0C06,#080602)',clipPath:'polygon(100% 0,0 100%,100% 100%)'}}/>
              <div style={{position:'absolute',bottom:0,left:0,right:0,height:'50%',background:'linear-gradient(180deg,#0C0A04,#070601)',clipPath:'polygon(0 100%,50% 0,100% 100%)'}}/>
              <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)'}}/>
            </div>
            {/* Seal */}
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-52%)',width:'clamp(54px,9vw,84px)',height:'clamp(54px,9vw,84px)',background:'radial-gradient(circle at 35% 35%,#F5D678 0%,#D4AF37 40%,#8B6914 100%)',borderRadius:'50%',border:'2px solid rgba(245,214,120,.5)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 0 6px rgba(212,175,55,.08),0 0 0 12px rgba(212,175,55,.04),0 8px 30px rgba(0,0,0,.8)',zIndex:10,opacity:phase==='opening'?0:1,transition:'opacity .25s'}}>
              <div style={{position:'absolute',inset:-8,border:'1px solid rgba(212,175,55,.3)',borderRadius:'50%',borderStyle:'dashed',animation:'lux-spin 30s linear infinite'}}/>
              <div style={{position:'absolute',inset:-14,border:'1px solid rgba(212,175,55,.12)',borderRadius:'50%'}}/>
              <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(13px,2vw,20px)',fontStyle:'italic',color:'#0A0803',fontWeight:600,position:'relative',zIndex:1}}>A&amp;D</span>
            </div>
            {/* Flap */}
            <div style={{position:'absolute',top:0,left:0,right:0,zIndex:8,height:'52%',background:'linear-gradient(160deg,#14100A,#0A0803)',clipPath:'polygon(0 0,100% 0,50% 100%)',transformOrigin:'top center',transform:phase==='opening'?'perspective(800px) rotateX(192deg)':'perspective(800px) rotateX(0deg)',transition:'transform 1.05s cubic-bezier(.4,0,.2,1)',borderBottom:'1px solid rgba(212,175,55,.25)'}}>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(160deg,rgba(212,175,55,.08) 0%,transparent 50%)'}}/>
            </div>
          </div>
        </div>

        <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(8px,1vw,10px)',letterSpacing:'.28em',textTransform:'uppercase',color:'rgba(212,175,55,.55)',animation:phase==='opening'?'none':'fadeUp 1s ease both .35s, lux-pulse 3s ease-in-out infinite 1.3s',opacity:phase==='opening'?.8:undefined}}>
          {phase==='opening'?'◆  Dezvăluind invitația  ◆':'Atinge pentru a deschide'}
        </p>
      </div>
    </div>
  )
}

/* ════════════════════════════════
   INVITE SCREEN
════════════════════════════════ */
function InviteScreen({ onBack:_onBack }:{onBack:()=>void}) {
  const WEDDING = new Date('2027-05-03T16:00:00')
  const [modal, setModal] = useState(false)
  const [uploadModal, setUploadModal] = useState(false)
  const [vis, setVis] = useState(false)
  const cd = useCountdown(WEDDING)
  const [flipS, setFlipS] = useState(false)

  useEffect(()=>{ const t=setTimeout(()=>setVis(true),60); return()=>clearTimeout(t) },[])
  useEffect(()=>{ setFlipS(true); const t=setTimeout(()=>setFlipS(false),160); return()=>clearTimeout(t) },[cd.s])

  const a=(d:number):React.CSSProperties=>({ opacity:vis?1:0, transform:vis?'translateY(0)':'translateY(22px)', transition:`opacity .75s ease ${d}s,transform .75s ease ${d}s` })

  const locCard:React.CSSProperties={ borderRadius:16, overflow:'hidden', border:'1px solid rgba(212,175,55,.2)', background:'rgba(255,255,255,.03)', backdropFilter:'blur(12px)', boxShadow:'0 8px 40px rgba(0,0,0,.5)', transition:'transform .25s ease,box-shadow .25s ease' }
  const btn:React.CSSProperties={ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, padding:'9px 14px', borderRadius:8, fontFamily:"'Cinzel',serif", fontSize:10, fontWeight:600, letterSpacing:'.12em', cursor:'default', flex:1, whiteSpace:'nowrap' }
  const inputStyle:React.CSSProperties={ width:'100%', padding:'10px 14px', borderRadius:8, border:'1px solid rgba(212,175,55,.25)', background:'rgba(212,175,55,.05)', fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:'#F5E6A8', outline:'none' }
  const radioLabel:React.CSSProperties={ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'10px 10px', borderRadius:8, border:'1px solid rgba(212,175,55,.2)', background:'rgba(212,175,55,.04)', cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:'.08em', color:'rgba(212,175,55,.8)', transition:'all .2s', userSelect:'none' }

  return (
    <div style={{position:'fixed',inset:0,top:56,overflowY:'auto',overflowX:'hidden'}}>
      <div style={{position:'fixed',inset:0,background:'radial-gradient(ellipse 90% 80% at 50% 30%,#1A1408 0%,#0A0803 55%,#050401 100%)',zIndex:0}}/>
      <div style={{position:'fixed',inset:0,background:'radial-gradient(ellipse 60% 50% at 15% 20%,rgba(212,175,55,.07) 0%,transparent 55%),radial-gradient(ellipse 50% 45% at 85% 80%,rgba(212,175,55,.06) 0%,transparent 55%)',zIndex:1,pointerEvents:'none'}}/>
      <div style={{position:'fixed',inset:0,opacity:.04,zIndex:1,pointerEvents:'none',backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='.008' numOctaves='8' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='500' height='500' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"}}/>
      <div style={{position:'fixed',top:0,left:0,width:'min(180px,20vw)',height:'min(180px,20vw)',opacity:.65,pointerEvents:'none',zIndex:2}}><ArtDecoCorner/></div>
      <div style={{position:'fixed',top:0,right:0,width:'min(180px,20vw)',height:'min(180px,20vw)',opacity:.65,pointerEvents:'none',zIndex:2}}><ArtDecoCorner flip/></div>
      <div style={{position:'fixed',bottom:0,left:0,width:'min(160px,18vw)',height:'min(160px,18vw)',opacity:.55,pointerEvents:'none',zIndex:2}}><ArtDecoCorner flipY/></div>
      <div style={{position:'fixed',bottom:0,right:0,width:'min(160px,18vw)',height:'min(160px,18vw)',opacity:.55,pointerEvents:'none',zIndex:2}}><ArtDecoCorner flip flipY/></div>
      <div style={{position:'fixed',top:'8%',left:'4%',right:'4%',height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.2),transparent)',zIndex:2,pointerEvents:'none'}}/>

      <div style={{position:'relative',zIndex:10,maxWidth:700,margin:'0 auto',padding:'clamp(36px,6vw,64px) clamp(16px,4vw,32px) 60px',display:'flex',flexDirection:'column',alignItems:'center',gap:0}}>

        <div style={{...a(0),marginBottom:10}}><CrownSVG/></div>
        <p style={{...a(.06),fontFamily:"'Cinzel',serif",fontSize:'clamp(8px,1vw,10px)',letterSpacing:'.36em',textTransform:'uppercase',color:'rgba(212,175,55,.65)',marginBottom:12}}>Cu Onoare Vă Invităm</p>

        {/* NAMES */}
        <div style={{...a(.1),textAlign:'center',marginBottom:6}}>
          <span style={{display:'block',fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(58px,10vw,112px)',fontWeight:600,fontStyle:'italic',color:'#F5E6A8',lineHeight:.92,letterSpacing:'-.01em',textShadow:'0 0 60px rgba(212,175,55,.25)'}}>Alexandra</span>
          <span style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:'clamp(14px,2vw,22px)',fontWeight:400,color:'rgba(212,175,55,.6)',margin:'8px 0',letterSpacing:'.3em'}}>&amp;</span>
          <span style={{display:'block',fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(58px,10vw,112px)',fontWeight:600,fontStyle:'italic',color:'#F5E6A8',lineHeight:.92,letterSpacing:'-.01em',textShadow:'0 0 60px rgba(212,175,55,.25)'}}>Dragoș</span>
        </div>

        <div style={{...a(.18),display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:440,margin:'22px auto'}}><GoldDivider/></div>

        {/* DATE — normale, cu stil */}
        <div style={{...a(.22),textAlign:'center',marginBottom:20}}>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(14px,1.8vw,18px)',letterSpacing:'.22em',color:'#D4AF37',fontWeight:400,marginBottom:6}}>
            Duminică, 3 Mai 2027
          </p>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(14px,1.7vw,18px)',fontStyle:'italic',fontWeight:300,color:'rgba(245,230,168,.55)',letterSpacing:'.06em'}}>
            București, România
          </p>
        </div>

        {/* Nași */}
        <div style={{...a(.27),textAlign:'center',padding:'22px 32px',border:'1px solid rgba(212,175,55,.2)',borderRadius:16,background:'rgba(212,175,55,.04)',backdropFilter:'blur(8px)',maxWidth:380,width:'100%',position:'relative',boxShadow:'0 4px 40px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.1)',marginBottom:0}}>
          {['topleft','topright','bottomleft','bottomright'].map(pos=>(
            <div key={pos} style={{position:'absolute',top:pos.includes('top')?8:'auto',bottom:pos.includes('bottom')?8:'auto',left:pos.includes('left')?8:'auto',right:pos.includes('right')?8:'auto',width:12,height:12,borderTop:pos.includes('top')?'1px solid rgba(212,175,55,.5)':'none',borderBottom:pos.includes('bottom')?'1px solid rgba(212,175,55,.5)':'none',borderLeft:pos.includes('left')?'1px solid rgba(212,175,55,.5)':'none',borderRight:pos.includes('right')?'1px solid rgba(212,175,55,.5)':'none'}}/>
          ))}
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(12px,1.4vw,14px)',fontStyle:'italic',color:'rgba(212,175,55,.6)',marginBottom:8,letterSpacing:'.06em'}}>Alături de nașii noștri</p>
          <div style={{width:32,height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)',margin:'0 auto 10px'}}/>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(20px,2.5vw,26px)',fontStyle:'italic',fontWeight:300,color:'#F5E6A8',letterSpacing:'.04em'}}>Elena &amp; Cristian</p>
        </div>

        <div style={{...a(.32),display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:440,margin:'24px auto'}}><GoldDivider/></div>

        {/* COUNTDOWN */}
        <div style={{...a(.36),width:'100%',maxWidth:480,background:'rgba(212,175,55,.04)',border:'1px solid rgba(212,175,55,.18)',borderRadius:20,padding:'24px 20px',boxShadow:'0 8px 50px rgba(0,0,0,.5),inset 0 1px 0 rgba(212,175,55,.08)',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:'10%',right:'10%',height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)'}}/>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(7px,.9vw,9px)',letterSpacing:'.32em',textTransform:'uppercase',color:'rgba(212,175,55,.55)',marginBottom:18}}>Timp Rămas Până La Marea Sărbătoare</p>
          <div style={{display:'flex',gap:0,justifyContent:'center'}}>
            {[{n:pad(cd.d),l:'Zile'},{n:pad(cd.h),l:'Ore'},{n:pad(cd.m),l:'Minute'},{n:pad(cd.s),l:'Secunde',flip:flipS}].map(u=>(
              <div key={u.l} style={{flex:1,maxWidth:112,textAlign:'center',padding:'0 6px',borderRight:'1px solid rgba(212,175,55,.12)'}}>
                <span style={{display:'block',fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(38px,6vw,64px)',fontWeight:300,lineHeight:1,transition:'transform .15s ease,color .15s ease',transform:(u as any).flip?'scale(1.08) translateY(-3px)':'scale(1)',color:(u as any).flip?'#F5D678':'#D4AF37',textShadow:(u as any).flip?'0 0 20px rgba(212,175,55,.4)':'none'}}>{u.n}</span>
                <span style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(6px,.8vw,8px)',letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(212,175,55,.45)',display:'block',marginTop:4}}>{u.l}</span>
              </div>
            ))}
          </div>
          <div style={{position:'absolute',bottom:0,left:'10%',right:'10%',height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)'}}/>
        </div>

        <div style={{...a(.42),display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:440,margin:'24px auto'}}><GoldDivider/></div>

        {/* LOCATION CARDS */}
        <div style={{...a(.46),width:'100%',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,260px),1fr))',gap:'clamp(12px,2vw,20px)',maxWidth:640}}>
          {[
            {type:'Ceremonia Religioasă',name:'Cununia',venue:'Catedrala Sfântul Iosif',addr:'Strada General Berthelot, București',time:'14:00',
              icon:<svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M12 2L12 6M10 4h4"/><rect x="4" y="9" width="16" height="12" rx="1"/><path d="M9 21V14a3 3 0 0 1 6 0v7"/><path d="M4 9l8-4 8 4"/></svg>},
            {type:'Recepție Gală',name:'Banchetul Imperial',venue:'Grand Hotel Continental',addr:'Calea Victoriei 56, București',time:'18:00',
              icon:<svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M8 18c0 1.65-1.35 3-3 3s-3-1.35-3-3c0-2 3-6 3-6s3 4 3 6z"/><path d="M5 12V4"/><path d="M19 14c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.5 2-4 2-4s2 2.5 2 4z"/><path d="M17 10V6"/><path d="M12 8l2-2M12 8l-2-2M12 8v4"/><circle cx="12" cy="14" r=".7" fill="#D4AF37" stroke="none"/></svg>},
          ].map(card=>(
            <div key={card.type} style={locCard}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)';(e.currentTarget as HTMLDivElement).style.boxShadow='0 20px 60px rgba(0,0,0,.7),0 0 30px rgba(212,175,55,.1)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform='';(e.currentTarget as HTMLDivElement).style.boxShadow='0 8px 40px rgba(0,0,0,.5)'}}>
              <div style={{padding:'16px 18px 12px',background:'linear-gradient(135deg,rgba(212,175,55,.15) 0%,rgba(212,175,55,.06) 100%)',borderBottom:'1px solid rgba(212,175,55,.15)',display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:40,height:40,borderRadius:10,background:'rgba(212,175,55,.12)',border:'1px solid rgba(212,175,55,.3)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{card.icon}</div>
                <div>
                  <span style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.22em',textTransform:'uppercase',color:'rgba(212,175,55,.55)',display:'block',marginBottom:2}}>{card.type}</span>
                  <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(15px,1.8vw,19px)',fontStyle:'italic',fontWeight:300,color:'#F5E6A8',lineHeight:1.2}}>{card.name}</p>
                </div>
              </div>
              <div style={{padding:'14px 18px 16px'}}>
                <p style={{fontFamily:"'Cinzel',serif",fontWeight:600,fontSize:'clamp(10px,1.1vw,12px)',color:'#D4AF37',marginBottom:3,letterSpacing:'.05em'}}>{card.venue}</p>
                <p style={{fontSize:'clamp(10px,1.1vw,12px)',color:'rgba(212,175,55,.45)',lineHeight:1.5,marginBottom:10,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{card.addr}</p>
                <div style={{display:'inline-flex',alignItems:'center',gap:5,background:'rgba(212,175,55,.08)',border:'1px solid rgba(212,175,55,.2)',borderRadius:100,padding:'4px 12px',fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.14em',textTransform:'uppercase',color:'rgba(212,175,55,.7)',marginBottom:12}}>◆ 3 mai 2027 · ora {card.time}</div>
                <div style={{display:'flex',gap:8}}>
                  <div style={{...btn,background:'linear-gradient(135deg,rgba(8,162,212,.25),rgba(8,162,212,.15))',border:'1px solid rgba(8,162,212,.3)',color:'rgba(140,210,240,.9)'}}><WazeIcon/> Waze</div>
                  <div style={{...btn,background:'linear-gradient(135deg,rgba(76,175,79,.22),rgba(76,175,79,.12))',border:'1px solid rgba(76,175,79,.28)',color:'rgba(120,210,120,.9)'}}><MapsIcon/> Maps</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CONTACT */}
        <div style={{...a(.52),width:'100%',maxWidth:640,background:'rgba(212,175,55,.04)',border:'1px solid rgba(212,175,55,.18)',borderRadius:16,padding:'16px 20px',backdropFilter:'blur(8px)',boxShadow:'0 6px 30px rgba(0,0,0,.4)',marginTop:'clamp(12px,2vw,20px)'}}>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.28em',textTransform:'uppercase',color:'rgba(212,175,55,.5)',marginBottom:12}}>Contact Mireasă</p>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(15px,1.8vw,19px)',fontStyle:'italic',color:'#F5E6A8',marginBottom:3}}>Alexandra</p>
              <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(11px,1.3vw,13px)',color:'#D4AF37',letterSpacing:'.08em',fontWeight:600}}>0752 954 258</p>
            </div>
            <div style={{display:'flex',gap:8}}>
              <div style={{...btn,padding:'10px 18px',borderRadius:100,background:'rgba(212,175,55,.12)',border:'1px solid rgba(212,175,55,.3)',color:'#D4AF37'}}><PhoneIcon/> Telefon</div>
              <div style={{...btn,padding:'10px 18px',borderRadius:100,background:'rgba(37,211,102,.12)',border:'1px solid rgba(37,211,102,.3)',color:'rgba(100,220,130,.9)'}}><WaIcon/> WhatsApp</div>
            </div>
          </div>
        </div>

        <div style={{...a(.56),display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:440,margin:'24px auto'}}><GoldDivider/></div>

        {/* ═══ PHOTO UPLOAD ═══ */}
        <div style={{...a(.58),width:'100%',maxWidth:640,background:'linear-gradient(160deg,rgba(212,175,55,.07) 0%,rgba(212,175,55,.03) 100%)',border:'1.5px dashed rgba(212,175,55,.3)',borderRadius:20,padding:'clamp(22px,3vw,32px) clamp(18px,3vw,28px)',textAlign:'center',position:'relative',overflow:'hidden'}}>
          {/* Faded camera watermark */}
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',opacity:.03,pointerEvents:'none',transform:'scale(3)'}}>
            <svg viewBox="0 0 48 48" fill="none" style={{width:80,height:80}}>
              <rect x="4" y="14" width="40" height="28" rx="4" stroke="#D4AF37" strokeWidth="1.5"/>
              <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round"/>
              <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.5"/>
              <circle cx="24" cy="28" r="4" fill="#D4AF37"/>
            </svg>
          </div>
          <div style={{position:'relative',zIndex:1}}>
            <div style={{display:'flex',justifyContent:'center',marginBottom:14}}>
              <div style={{width:72,height:72,borderRadius:'50%',background:'rgba(212,175,55,.1)',border:'2px solid rgba(212,175,55,.28)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:38,height:38}}>
                  <rect x="4" y="14" width="40" height="28" rx="4" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7"/>
                  <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round"/>
                  <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".7"/>
                  <circle cx="24" cy="28" r="4" fill="#D4AF37" fillOpacity=".28"/>
                  <circle cx="37" cy="20" r="2" fill="#D4AF37" fillOpacity=".5"/>
                </svg>
              </div>
            </div>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(18px,2.6vw,26px)',fontStyle:'italic',fontWeight:300,color:'#F5E6A8',marginBottom:8,lineHeight:1.2}}>Împărtășiți momentele cu noi ✦</h3>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(13px,1.6vw,16px)',fontStyle:'italic',color:'rgba(212,175,55,.55)',lineHeight:1.8,marginBottom:18,maxWidth:440,margin:'0 auto 18px'}}>
              Faceți poze în timpul nunții și încărcați-le direct din telefon.<br/>
              Mirii vor accesa toate imaginile voastre într-un album privat exclusivist — amintiri adunate din toate perspectivele.
            </p>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginBottom:20}}>
              {['✦ Poze din toate unghiurile','◆ Album privat al mirilor','✦ Fără limită de fișiere','◆ Acces securizat'].map(tag=>(
                <span key={tag} style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(9px,1vw,10px)',letterSpacing:'.1em',color:'rgba(212,175,55,.7)',background:'rgba(212,175,55,.08)',border:'1px solid rgba(212,175,55,.2)',borderRadius:100,padding:'4px 14px'}}>{tag}</span>
              ))}
            </div>
            <button onClick={()=>setUploadModal(true)} style={{display:'inline-flex',alignItems:'center',gap:10,padding:'13px 32px',borderRadius:4,background:'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)',color:'#0A0803',border:'none',cursor:'pointer',fontFamily:"'Cinzel',serif",fontSize:'clamp(10px,1.2vw,12px)',fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',boxShadow:'0 8px 28px rgba(212,175,55,.3)',transition:'transform .2s,box-shadow .2s',position:'relative',overflow:'hidden'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 14px 40px rgba(212,175,55,.5)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 8px 28px rgba(212,175,55,.3)'}}>
              <svg viewBox="0 0 36 36" fill="none" style={{width:16,height:16}}>
                <path d="M18 26 L18 10 M11 17 L18 10 L25 17" stroke="#0A0803" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 30 Q5 30 3 26 Q1 22 5 19 Q4 16 6 14 Q8 6 16 6 Q22 4 26 9 Q32 9 34 14 Q38 16 36 21 Q35 26 30 26 L9 30Z" stroke="#0A0803" strokeWidth="1.4" strokeOpacity=".5" fill="none"/>
              </svg>
              Încarcă pozele tale
              <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)',backgroundSize:'350px 100%',animation:'shimmer 3s linear infinite'}}/>
            </button>
            <p style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.14em',color:'rgba(212,175,55,.4)',marginTop:10}}>funcție disponibilă în ziua nunții și 72h după eveniment</p>
          </div>
        </div>

        <div style={{...a(.63),display:'flex',alignItems:'center',gap:0,width:'100%',maxWidth:440,margin:'24px auto'}}><GoldDivider/></div>

        {/* RSVP */}
        <div style={{...a(.65),textAlign:'center',width:'100%',maxWidth:400}}>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(14px,1.7vw,17px)',fontStyle:'italic',color:'rgba(212,175,55,.55)',marginBottom:16,lineHeight:1.7,letterSpacing:'.04em'}}>
            Vă rugăm să confirmați prezența Dvs.<br/>până pe <strong style={{color:'#D4AF37',fontStyle:'normal'}}>1 Aprilie 2027</strong>
          </p>
          <button onClick={()=>setModal(true)} style={{display:'block',width:'100%',padding:'clamp(14px,1.8vw,18px) 0',borderRadius:4,background:'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)',color:'#0A0803',textAlign:'center',fontFamily:"'Cinzel',serif",fontSize:'clamp(11px,1.3vw,13px)',fontWeight:700,letterSpacing:'.22em',textTransform:'uppercase',cursor:'pointer',border:'none',boxShadow:'0 8px 40px rgba(212,175,55,.35),0 2px 0 rgba(245,214,120,.5) inset',transition:'transform .22s,box-shadow .22s',position:'relative',overflow:'hidden'}}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 16px 60px rgba(212,175,55,.55),0 2px 0 rgba(245,214,120,.5) inset'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 8px 40px rgba(212,175,55,.35),0 2px 0 rgba(245,214,120,.5) inset'}}>
            <span style={{position:'relative',zIndex:1}}>◆ Confirmă Prezența ◆</span>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)',backgroundSize:'350px 100%',animation:'shimmer 3s linear infinite'}}/>
          </button>
        </div>

        {/* CHOOSE BAR */}
        <div style={{...a(.70),width:'100%',padding:'22px 24px 24px',background:'rgba(212,175,55,.05)',border:'1px solid rgba(212,175,55,.15)',borderRadius:16,display:'flex',flexDirection:'column',alignItems:'center',gap:14,backdropFilter:'blur(8px)',marginTop:16,boxShadow:'0 4px 30px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.1)'}}>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontStyle:'italic',color:'rgba(212,175,55,.6)',letterSpacing:'.04em',margin:0,textAlign:'center'}}>Îți place această temă? Personalizează-o pentru evenimentul tău</p>
          <a href="/preturi?tema=lux" style={{display:'inline-flex',alignItems:'center',gap:10,padding:'12px 36px',borderRadius:4,background:'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)',color:'#0A0803',textDecoration:'none',fontFamily:"'Cinzel',serif",fontSize:11,fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',boxShadow:'0 6px 28px rgba(212,175,55,.35)',transition:'transform .2s,box-shadow .2s'}}
            onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLAnchorElement).style.boxShadow='0 14px 44px rgba(212,175,55,.55)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='';(e.currentTarget as HTMLAnchorElement).style.boxShadow='0 6px 28px rgba(212,175,55,.35)'}}>
            ◆ Alege Această Temă
          </a>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:'.2em',textTransform:'uppercase',color:'rgba(212,175,55,.3)',margin:0}}>VibeInvite © 2026 · Toate drepturile rezervate</p>
        </div>
      </div>

      {/* RSVP MODAL — formular complet */}
      {modal&&(
        <div onClick={()=>setModal(false)} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,.8)',backdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16,animation:'fadeIn .28s ease',overflowY:'auto'}}>
          <div onClick={e=>e.stopPropagation()} style={{background:'linear-gradient(170deg,#1A1408,#0A0803)',borderRadius:20,padding:'clamp(24px,4vw,38px) clamp(18px,4vw,32px)',maxWidth:480,width:'100%',border:'1px solid rgba(212,175,55,.25)',boxShadow:'0 40px 100px rgba(0,0,0,.9),0 0 60px rgba(212,175,55,.12)',animation:'slideUp .32s cubic-bezier(.4,0,.2,1)',maxHeight:'90vh',overflowY:'auto',position:'relative'}}>
            <div style={{position:'absolute',top:0,left:'10%',right:'10%',height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)'}}/>
            <div style={{textAlign:'center',marginBottom:22}}>
              <div style={{marginBottom:10}}><CrownSVG/></div>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(22px,3.5vw,30px)',fontStyle:'italic',fontWeight:300,color:'#F5E6A8',marginBottom:8}}>Confirmă Prezența</h2>
              <div style={{width:36,height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)',margin:'0 auto 10px'}}/>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontStyle:'italic',color:'rgba(212,175,55,.5)',lineHeight:1.7}}>Toate câmpurile sunt opționale.</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {/* Nume */}
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(212,175,55,.55)',marginBottom:6}}>Nume și Prenume</label>
                <input type="text" placeholder="ex. Maria Ionescu" style={inputStyle} onFocus={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(212,175,55,.6)'} onBlur={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(212,175,55,.25)'}/>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,fontStyle:'italic',color:'rgba(212,175,55,.38)',marginTop:4}}>Numele și prenumele dumneavoastră.</p>
              </div>
              {/* Raspuns */}
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(212,175,55,.55)',marginBottom:8}}>Răspuns</label>
                <div style={{display:'flex',gap:8}}>
                  {['Particip','Nu Particip'].map(opt=>(
                    <label key={opt} style={radioLabel} onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(212,175,55,.5)';el.style.background='rgba(212,175,55,.1)'}} onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(212,175,55,.2)';el.style.background='rgba(212,175,55,.04)'}}>
                      <input type="radio" name="raspuns" value={opt} style={{accentColor:'#D4AF37'}}/>{opt}
                    </label>
                  ))}
                </div>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,fontStyle:'italic',color:'rgba(212,175,55,.38)',marginTop:4}}>În cazul în care refuzați, selectați "Nu Particip".</p>
              </div>
              {/* Insotit */}
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(212,175,55,.55)',marginBottom:8}}>Veți fi însoțit/ă?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Da','Nu'].map(opt=>(
                    <label key={opt} style={radioLabel} onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(212,175,55,.5)';el.style.background='rgba(212,175,55,.1)'}} onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(212,175,55,.2)';el.style.background='rgba(212,175,55,.04)'}}>
                      <input type="radio" name="insotit" value={opt} style={{accentColor:'#D4AF37'}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* Partener */}
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(212,175,55,.55)',marginBottom:6}}>Nume și Prenume partener</label>
                <input type="text" placeholder="ex. Ion Ionescu" style={inputStyle} onFocus={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(212,175,55,.6)'} onBlur={e=>(e.currentTarget as HTMLInputElement).style.borderColor='rgba(212,175,55,.25)'}/>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,fontStyle:'italic',color:'rgba(212,175,55,.38)',marginTop:4}}>Numele persoanei care vă va însoți.</p>
              </div>
              {/* Copii */}
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(212,175,55,.55)',marginBottom:8}}>Veți veni cu copii?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Da','Nu'].map(opt=>(
                    <label key={opt} style={radioLabel} onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(212,175,55,.5)';el.style.background='rgba(212,175,55,.1)'}} onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(212,175,55,.2)';el.style.background='rgba(212,175,55,.04)'}}>
                      <input type="radio" name="copii" value={opt} style={{accentColor:'#D4AF37'}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* Meniu */}
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(212,175,55,.55)',marginBottom:8}}>Preferințe meniu</label>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {['2x Meniu Normal','2x Meniu Vegetarian','1x Meniu Normal, 1x Meniu Vegetarian'].map(opt=>(
                    <label key={opt} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:8,border:'1px solid rgba(212,175,55,.2)',background:'rgba(212,175,55,.04)',cursor:'pointer',fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:'.08em',color:'rgba(212,175,55,.75)',transition:'all .2s',userSelect:'none'}}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(212,175,55,.5)';el.style.background='rgba(212,175,55,.1)'}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(212,175,55,.2)';el.style.background='rgba(212,175,55,.04)'}}>
                      <input type="radio" name="meniu" value={opt} style={{accentColor:'#D4AF37',flexShrink:0}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* Cazare */}
              <div>
                <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(212,175,55,.55)',marginBottom:8}}>Aveți nevoie de cazare?</label>
                <div style={{display:'flex',gap:8}}>
                  {['Nu','Da'].map(opt=>(
                    <label key={opt} style={radioLabel} onMouseEnter={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(212,175,55,.5)';el.style.background='rgba(212,175,55,.1)'}} onMouseLeave={e=>{const el=e.currentTarget as HTMLLabelElement;el.style.borderColor='rgba(212,175,55,.2)';el.style.background='rgba(212,175,55,.04)'}}>
                      <input type="radio" name="cazare" value={opt} style={{accentColor:'#D4AF37'}}/>{opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* Submit */}
            <div style={{marginTop:22,textAlign:'center'}}>
              <button onClick={()=>setModal(false)} style={{display:'block',width:'100%',padding:'14px 0',borderRadius:4,background:'linear-gradient(135deg,#8B6914,#D4AF37,#F5D678,#D4AF37,#8B6914)',color:'#0A0803',fontFamily:"'Cinzel',serif",fontSize:11,fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',border:'none',cursor:'pointer',boxShadow:'0 8px 28px rgba(212,175,55,.32)',transition:'transform .2s,box-shadow .2s'}}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 14px 40px rgba(212,175,55,.5)'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 8px 28px rgba(212,175,55,.32)'}}>
                ◆ Trimite Confirmarea ◆
              </button>
              <div style={{marginTop:16,padding:'14px 16px',background:'rgba(212,175,55,.06)',border:'1px solid rgba(212,175,55,.15)',borderRadius:8}}>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontStyle:'italic',color:'rgba(212,175,55,.55)',lineHeight:1.8}}>
                  Mulțumim!<br/>Aceasta este o demonstrație a temei <strong style={{color:'#D4AF37',fontStyle:'normal'}}>Lux</strong>.<br/>Achiziționează pachetul pentru a activa confirmările.
                </p>
              </div>
              <button onClick={()=>setModal(false)} style={{marginTop:10,background:'none',border:'none',cursor:'pointer',fontFamily:"'Cormorant Garamond',serif",fontSize:12,fontStyle:'italic',color:'rgba(212,175,55,.38)',textDecoration:'underline'}}>Închide</button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {uploadModal&&(
        <div onClick={()=>setUploadModal(false)} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,.8)',backdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,animation:'fadeIn .28s ease'}}>
          <div onClick={e=>e.stopPropagation()} style={{background:'linear-gradient(170deg,#1A1408,#0A0803)',borderRadius:20,padding:'38px 32px',maxWidth:380,width:'100%',border:'1px solid rgba(212,175,55,.25)',boxShadow:'0 40px 100px rgba(0,0,0,.9)',textAlign:'center',animation:'slideUp .32s cubic-bezier(.4,0,.2,1)',position:'relative'}}>
            <div style={{position:'absolute',top:0,left:'10%',right:'10%',height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)'}}/>
            <div style={{display:'flex',justifyContent:'center',marginBottom:14}}>
              <div style={{width:64,height:64,borderRadius:'50%',background:'rgba(212,175,55,.1)',border:'2px solid rgba(212,175,55,.28)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <svg viewBox="0 0 48 48" fill="none" style={{width:34,height:34}}>
                  <rect x="4" y="14" width="40" height="28" rx="4" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7"/>
                  <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round"/>
                  <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".7"/>
                  <circle cx="24" cy="28" r="4" fill="#D4AF37" fillOpacity=".25"/>
                </svg>
              </div>
            </div>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontStyle:'italic',fontWeight:300,color:'#F5E6A8',marginBottom:10}}>Încarcă pozele!</h2>
            <div style={{width:36,height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)',margin:'0 auto 14px'}}/>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontStyle:'italic',color:'rgba(212,175,55,.55)',marginBottom:24,lineHeight:1.8}}>
              Aceasta este o demonstrație a temei <strong style={{color:'#D4AF37',fontStyle:'normal'}}>Lux</strong>.<br/>Funcția de upload foto este disponibilă după achiziționarea pachetului.
            </p>
            <button onClick={()=>setUploadModal(false)} style={{padding:'12px 36px',borderRadius:4,background:'linear-gradient(135deg,#8B6914,#D4AF37,#8B6914)',color:'#0A0803',fontSize:11,fontWeight:700,fontFamily:"'Cinzel',serif",letterSpacing:'.2em',textTransform:'uppercase',border:'none',cursor:'pointer',boxShadow:'0 6px 24px rgba(212,175,55,.3)'}}>Închide</button>
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
        body{font-family:'Lato',sans-serif;background:#050401;color:#F5E6A8;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes envFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes lux-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes lux-pulse{0%,100%{opacity:.45}50%{opacity:.9}}
        @keyframes shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:scale(.92) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @media(max-width:480px){body{overflow:hidden}}
      `}</style>

      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:200,height:56,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 clamp(14px,4vw,28px)',background:'rgba(5,4,1,.95)',borderBottom:'1px solid rgba(212,175,55,.15)',backdropFilter:'blur(16px)'}}>
        <a href="/invitatii-digitale" style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:600,letterSpacing:'.24em',textTransform:'uppercase',color:'#D4AF37',textDecoration:'none',transition:'color .2s'}}
          onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.color='#F5D678'}
          onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.color='#D4AF37'}>
          Vibe<span style={{color:'rgba(212,175,55,.5)'}}>Invite</span>
        </a>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontStyle:'italic',color:'rgba(212,175,55,.5)',letterSpacing:'.06em'}}>
          {phase==='invite'?'Alexandra & Dragoș · 3 Mai 2027':'Invitație Lux'}
        </div>
        <a href="/invitatii-digitale" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:3,background:'rgba(212,175,55,.08)',border:'1px solid rgba(212,175,55,.2)',color:'#D4AF37',fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:600,letterSpacing:'.14em',textTransform:'uppercase',cursor:'pointer',textDecoration:'none',transition:'all .2s'}}
          onMouseEnter={e=>{const b=e.currentTarget as HTMLAnchorElement;b.style.background='rgba(212,175,55,.16)';b.style.borderColor='rgba(212,175,55,.4)'}}
          onMouseLeave={e=>{const b=e.currentTarget as HTMLAnchorElement;b.style.background='rgba(212,175,55,.08)';b.style.borderColor='rgba(212,175,55,.2)'}}>
          <BackArrow/> Înapoi
        </a>
      </header>

      {phase!=='invite'&&<EnvelopeScreen onOpen={openEnvelope} phase={phase}/>}
      {phase==='invite'&&<InviteScreen onBack={()=>setPhase('envelope')}/>}
    </>
  )
}
