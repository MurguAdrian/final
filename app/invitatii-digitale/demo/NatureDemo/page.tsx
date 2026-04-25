'use client'

import { useState, useEffect, useRef } from 'react'

function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) { setT({ d:0,h:0,m:0,s:0 }); return }
      setT({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff % 864e5) / 36e5),
        m: Math.floor((diff % 36e5) / 6e4),
        s: Math.floor((diff % 6e4) / 1e3),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}
const pad = (n: number) => String(n).padStart(2, '0')

const FloralSprig = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 310 Q92 255 88 210 Q80 150 90 88 Q94 52 100 18" stroke="#5C8A52" strokeWidth="1.8" strokeOpacity=".48" fill="none" strokeLinecap="round"/>
    <path d="M93 218 Q65 196 48 178" stroke="#5C8A52" strokeWidth="1.2" strokeOpacity=".4" fill="none" strokeLinecap="round"/>
    <path d="M90 172 Q118 152 135 132" stroke="#5C8A52" strokeWidth="1.2" strokeOpacity=".4" fill="none" strokeLinecap="round"/>
    <path d="M91 126 Q63 108 48 86" stroke="#5C8A52" strokeWidth="1.0" strokeOpacity=".35" fill="none" strokeLinecap="round"/>
    <path d="M94 80 Q116 64 126 48" stroke="#5C8A52" strokeWidth=".9" strokeOpacity=".32" fill="none" strokeLinecap="round"/>
    <ellipse cx="40" cy="174" rx="22" ry="9" fill="#7AB86A" fillOpacity=".4" transform="rotate(-38 40 174)"/>
    <ellipse cx="140" cy="126" rx="19" ry="8" fill="#6AAE5A" fillOpacity=".36" transform="rotate(32 140 126)"/>
    <ellipse cx="40" cy="80" rx="16" ry="7" fill="#7AB86A" fillOpacity=".32" transform="rotate(-44 40 80)"/>
    <ellipse cx="130" cy="46" rx="14" ry="6" fill="#88C47A" fillOpacity=".3" transform="rotate(22 130 46)"/>
    <g transform="translate(100 20)">
      {[0,72,144,216,288].map(r => (
        <ellipse key={r} cx="0" cy="-14" rx="10" ry="18" fill="white" fillOpacity=".85" transform={`rotate(${r})`}/>
      ))}
      <circle cx="0" cy="0" r="7" fill="#F2D98E" fillOpacity=".92"/>
      <circle cx="0" cy="0" r="3.5" fill="#D4A843" fillOpacity=".78"/>
    </g>
    <g transform="translate(40 174) scale(.78)">
      {[0,72,144,216,288].map(r => (
        <ellipse key={r} cx="0" cy="-12" rx="8" ry="15" fill="white" fillOpacity=".78" transform={`rotate(${r})`}/>
      ))}
      <circle cx="0" cy="0" r="5" fill="#F2D98E" fillOpacity=".88"/>
    </g>
    <g transform="translate(140 126) scale(.68)">
      {[0,72,144,216,288].map(r => (
        <ellipse key={r} cx="0" cy="-11" rx="7" ry="13" fill="white" fillOpacity=".72" transform={`rotate(${r})`}/>
      ))}
      <circle cx="0" cy="0" r="4" fill="#F2D98E" fillOpacity=".82"/>
    </g>
    <ellipse cx="66" cy="52" rx="5" ry="8" fill="white" fillOpacity=".55" transform="rotate(-18 66 52)"/>
    <ellipse cx="132" cy="80" rx="4" ry="7" fill="#F0F8EC" fillOpacity=".5" transform="rotate(22 132 80)"/>
  </svg>
)

const CornerBotanical = ({ flip = false }: { flip?: boolean }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
    <path d="M12 12 L12 96" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42"/>
    <path d="M12 12 L96 12" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42"/>
    <path d="M22 22 L22 78" stroke="#C4963C" strokeWidth=".7" strokeOpacity=".3"/>
    <path d="M22 22 L78 22" stroke="#C4963C" strokeWidth=".7" strokeOpacity=".3"/>
    <circle cx="12" cy="12" r="3.5" fill="none" stroke="#8A6B2E" strokeWidth="1" strokeOpacity=".38"/>
    <circle cx="22" cy="22" r="2" fill="#C4963C" fillOpacity=".26"/>
    <path d="M30 30 Q54 70 92 104" stroke="#5C8A52" strokeWidth="1.1" strokeOpacity=".35" fill="none" strokeLinecap="round"/>
    <ellipse cx="52" cy="58" rx="14" ry="6" fill="#7AB86A" fillOpacity=".32" transform="rotate(44 52 58)"/>
    <ellipse cx="78" cy="84" rx="12" ry="5" fill="#6AAE5A" fillOpacity=".28" transform="rotate(55 78 84)"/>
    <g transform="translate(94 106) scale(.62)">
      {[0,72,144,216,288].map(r => (
        <ellipse key={r} cx="0" cy="-9" rx="6" ry="11" fill="white" fillOpacity=".7" transform={`rotate(${r})`}/>
      ))}
      <circle cx="0" cy="0" r="4" fill="#F0D87C" fillOpacity=".85"/>
    </g>
    <g transform="translate(50 28) scale(.48)">
      {[0,72,144,216,288].map(r => (
        <ellipse key={r} cx="0" cy="-7" rx="5" ry="9" fill="white" fillOpacity=".6" transform={`rotate(${r})`}/>
      ))}
      <circle cx="0" cy="0" r="3" fill="#F0D87C" fillOpacity=".78"/>
    </g>
  </svg>
)

const WazeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:14,height:14}}>
    <path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/>
  </svg>
)

const MapsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:14,height:14}}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
)

const BackArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}>
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
)

type Phase = 'envelope' | 'opening' | 'invite'

function EnvelopeScreen({ onOpen, phase }: { onOpen: () => void; phase: Phase }) {
  return (
    <div style={{
      position:'fixed', inset:0, top:56,
      display:'flex', alignItems:'center', justifyContent:'center',
      overflow:'hidden',
    }}>
      {/* Background */}
      <div style={{
        position:'absolute', inset:0,
        background:'radial-gradient(ellipse 70% 60% at 18% 22%, rgba(140,190,130,.13) 0%, transparent 55%), radial-gradient(ellipse 60% 55% at 82% 78%, rgba(225,205,148,.16) 0%, transparent 55%), linear-gradient(155deg, #FDFAF2 0%, #F3EED8 45%, #EDF5E8 100%)',
      }}/>

      {/* Corner botanicals */}
      <div style={{position:'absolute',top:0,left:0,width:180,opacity:.82,pointerEvents:'none'}}><CornerBotanical/></div>
      <div style={{position:'absolute',top:0,right:0,width:180,opacity:.82,pointerEvents:'none'}}><CornerBotanical flip/></div>
      <div style={{position:'absolute',bottom:0,left:0,width:180,opacity:.75,pointerEvents:'none',transform:'scaleY(-1)'}}><CornerBotanical/></div>
      <div style={{position:'absolute',bottom:0,right:0,width:180,opacity:.75,pointerEvents:'none',transform:'scale(-1)'}}><CornerBotanical/></div>

      {/* Side florals */}
      <div style={{position:'absolute',left:0,top:'10%',width:'min(18vw,220px)',opacity:.85,pointerEvents:'none'}}>
        <FloralSprig/>
      </div>
      <div style={{position:'absolute',right:0,top:'10%',width:'min(18vw,220px)',opacity:.85,pointerEvents:'none',transform:'scaleX(-1)'}}>
        <FloralSprig/>
      </div>

      {/* Center stage */}
      <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',gap:20,padding:'20px 24px'}}>
        <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(9px,1.1vw,11px)',letterSpacing:'.28em',textTransform:'uppercase',color:'#9A7B3F',opacity:.82,animation:'fadeUp .7s ease both'}}>
          Invitație de Nuntă
        </p>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,4.5vw,52px)',fontWeight:400,fontStyle:'italic',color:'#1C2218',textAlign:'center',lineHeight:1.15,animation:'fadeUp .8s ease both .08s',margin:0}}>
          <strong style={{fontWeight:700,fontStyle:'normal',color:'#3A5E33'}}>Andreea</strong>
          {' '}<span style={{color:'#C9A84C',fontWeight:300}}>&amp;</span>{' '}
          <strong style={{fontWeight:700,fontStyle:'normal',color:'#3A5E33'}}>Adrian</strong>
        </h1>

        {/* ENVELOPE WRAPPER — outer clickable div, overflow visible so letter can exit */}
        <div
          onClick={onOpen}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key==='Enter' && onOpen()}
          style={{
            position:'relative',
            width:'clamp(280px,42vw,500px)',
            cursor:'pointer',
            userSelect:'none',
            animation:'envFloat 5s ease-in-out infinite, fadeUp .85s ease both .15s',
          }}
        >
          {/* Drop shadow below envelope */}
          <div style={{
            position:'absolute', bottom:-16, left:'8%', right:'8%', height:20,
            background:'radial-gradient(ellipse, rgba(36,56,28,.25) 0%, transparent 70%)',
            filter:'blur(10px)',
            zIndex:0,
          }}/>

          {/* LETTER — sits ABOVE envelope wrapper, starts hidden behind flap */}
          {/* When opening: flies upward and forward */}
          <div style={{
            position:'absolute',
            left:'10%', right:'10%',
            /* start: bottom edge of letter flush with bottom of envelope */
            bottom: phase === 'opening' ? 'auto' : '5%',
            top: phase === 'opening' ? 'auto' : 'auto',
            height:'58%',
            /* Hidden behind envelope body (z=2) and flap (z=8) initially */
            zIndex: phase === 'opening' ? 30 : 2,
            background:'linear-gradient(165deg, #FEFDF8 0%, #F7F2E4 100%)',
            border:'1px solid rgba(154,123,63,.3)',
            borderRadius:6,
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            gap:6,
            boxShadow: phase === 'opening'
              ? '0 32px 80px rgba(0,0,0,.28), 0 8px 24px rgba(0,0,0,.14)'
              : '0 2px 8px rgba(0,0,0,.05)',
            transform: phase === 'opening'
              ? 'translateY(-140%) scale(1.05) rotate(-0.8deg)'
              : 'translateY(0%)',
            transition:'transform 1.4s cubic-bezier(.22,.1,.2,1) .25s, box-shadow 1.4s ease .25s, z-index 0s .25s',
            overflow:'hidden',
          }}>
            {/* lined paper texture */}
            <div style={{
              position:'absolute', inset:0, opacity:.035,
              backgroundImage:'repeating-linear-gradient(0deg, #5C8A52 0, #5C8A52 1px, transparent 1px, transparent 26px)',
            }}/>
            <div style={{textAlign:'center', padding:'0 16px', position:'relative', zIndex:1}}>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(15px,2.6vw,26px)',fontStyle:'italic',fontWeight:400,color:'#3A5E33',lineHeight:1.25}}>
                Andreea &amp; Adrian
              </p>
              <div style={{width:36,height:1,background:'rgba(154,123,63,.42)',margin:'10px auto'}}/>
              <p style={{fontFamily:"'Cinzel',serif",fontSize:'clamp(7px,.9vw,9.5px)',letterSpacing:'.2em',textTransform:'uppercase',color:'#9A7B3F',fontWeight:400}}>
                ✦ 3 Mai 2028 · Iași ✦
              </p>
            </div>
          </div>

          {/* ENVELOPE BODY — solid, opaque, on top of letter initially */}
          <div style={{
            width:'100%', paddingTop:'60%', position:'relative',
            zIndex:5,
          }}>
            {/* Envelope back panel — fully opaque cream */}
            <div style={{
              position:'absolute', inset:0,
              background:'#F0E8D0',
              borderRadius:8,
              border:'1.5px solid rgba(154,123,63,.35)',
              boxShadow:'0 4px 20px rgba(0,0,0,.1)',
              overflow:'hidden',
            }}>
              {/* Left side triangle */}
              <div style={{
                position:'absolute', top:0, bottom:0, left:0, width:'50%',
                background:'#E5DCC4',
                clipPath:'polygon(0 0, 0 100%, 100% 100%)',
              }}/>
              {/* Right side triangle */}
              <div style={{
                position:'absolute', top:0, bottom:0, right:0, width:'50%',
                background:'#E5DCC4',
                clipPath:'polygon(100% 0, 0 100%, 100% 100%)',
              }}/>
              {/* Bottom V */}
              <div style={{
                position:'absolute', bottom:0, left:0, right:0, height:'50%',
                background:'#D8E5D0',
                clipPath:'polygon(0 100%, 50% 0, 100% 100%)',
              }}/>
            </div>

            {/* Wax seal — on top of everything in closed state */}
            <div style={{
              position:'absolute', top:'50%', left:'50%',
              transform:'translate(-50%, -52%)',
              width:'clamp(50px,8vw,76px)', height:'clamp(50px,8vw,76px)',
              background:'radial-gradient(circle, #F5FBF2 0%, #C8E8C0 100%)',
              borderRadius:'50%',
              border:'2px solid rgba(154,123,63,.55)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 0 0 5px rgba(154,123,63,.1), 0 4px 16px rgba(0,0,0,.12)',
              zIndex:7,
              /* hide seal when opening */
              opacity: phase === 'opening' ? 0 : 1,
              transition:'opacity .3s ease',
            }}>
              <div style={{
                position:'absolute', inset:-7,
                border:'1px dashed rgba(154,123,63,.38)',
                borderRadius:'50%',
                animation:'spin 22s linear infinite',
              }}/>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(13px,2.2vw,20px)',fontStyle:'italic',color:'#3A5E33',position:'relative',zIndex:1}}>
                A&amp;A
              </span>
            </div>

            {/* FLAP — top triangle, flips open */}
            <div style={{
              position:'absolute', top:0, left:0, right:0,
              zIndex:8,
              height:'52%',
              background:'linear-gradient(155deg, #E8F0E4 0%, #DCE8D6 100%)',
              clipPath:'polygon(0 0, 100% 0, 50% 100%)',
              transformOrigin:'top center',
              transform: phase === 'opening'
                ? 'perspective(700px) rotateX(190deg)'
                : 'perspective(700px) rotateX(0deg)',
              transition:'transform 1s cubic-bezier(.4,0,.2,1)',
              borderBottom:'1.5px solid rgba(154,123,63,.3)',
            }}>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(155deg,rgba(154,123,63,.05) 0%,transparent 55%)'}}/>
            </div>
          </div>
        </div>

        <p style={{
          fontFamily:"'Cinzel',serif",
          fontSize:'clamp(9px,1.1vw,11px)',
          letterSpacing:'.22em', textTransform:'uppercase',
          color:'#9A7B3F',
          animation: phase === 'opening'
            ? 'none'
            : 'fadeUp 1s ease both .4s, pulse 2.8s ease-in-out infinite 1.4s',
          opacity: phase === 'opening' ? .9 : undefined,
        }}>
          {phase === 'opening' ? '✦  Se extrage invitația...' : 'Atinge pentru a deschide'}
        </p>
      </div>
    </div>
  )
}

function InviteScreen({ onBack: _onBack }: { onBack: () => void }) {
  const WEDDING = new Date('2028-05-03T13:00:00')
  const [modal, setModal] = useState(false)
  const [visible, setVisible] = useState(false)
  const cd = useCountdown(WEDDING)
  const [flipS, setFlipS] = useState(false)
  const _ref = useRef<HTMLDivElement>(null)

  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t) }, [])
  useEffect(() => {
    setFlipS(true)
    const t = setTimeout(() => setFlipS(false), 155)
    return () => clearTimeout(t)
  }, [cd.s])

  const anim = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
  })

  return (
    <div style={{
      position:'fixed', inset:0, top:56,
      overflowY:'auto', overflowX:'hidden',
    }}>
      {/* Fixed bg */}
      <div style={{
        position:'fixed', inset:0,
        background:'radial-gradient(ellipse 65% 55% at 16% 18%, rgba(140,190,130,.11) 0%, transparent 55%), radial-gradient(ellipse 58% 50% at 84% 82%, rgba(225,205,148,.14) 0%, transparent 55%), linear-gradient(155deg, #FDFAF2 0%, #F3EED8 45%, #EDF5E8 100%)',
        zIndex:0,
      }}/>

      {/* Fixed corner botanicals */}
      <div style={{position:'fixed',top:0,left:0,width:160,opacity:.78,pointerEvents:'none',zIndex:1}}><CornerBotanical/></div>
      <div style={{position:'fixed',top:0,right:0,width:160,opacity:.78,pointerEvents:'none',zIndex:1}}><CornerBotanical flip/></div>
      <div style={{position:'fixed',bottom:0,left:0,width:140,opacity:.7,pointerEvents:'none',zIndex:1,transform:'scaleY(-1)'}}><CornerBotanical/></div>
      <div style={{position:'fixed',bottom:0,right:0,width:140,opacity:.7,pointerEvents:'none',zIndex:1,transform:'scale(-1)'}}><CornerBotanical/></div>

      {/* Content */}
      <div ref={_ref} style={{
        position:'relative', zIndex:2,
        maxWidth:720, margin:'0 auto',
        padding:'48px 24px 220px',
        display:'flex', flexDirection:'column', alignItems:'center',
        gap:0,
      }}>

        {/* Top botanical */}
        <div style={{...anim(0), marginBottom:16, width:'clamp(160px,28vw,240px)'}}>
          <svg viewBox="0 0 300 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',display:'block'}}>
            <path d="M150 80 Q108 52 92 26 Q84 8 104 4 Q122 0 136 18 Q144 30 150 55 Q156 30 164 18 Q178 0 196 4 Q216 8 208 26 Q192 52 150 80Z" fill="#5C8A52" fillOpacity=".26"/>
            <path d="M150 80 L150 18" stroke="#5C8A52" strokeWidth=".9" strokeOpacity=".32"/>
            <path d="M150 46 Q118 30 108 14" stroke="#5C8A52" strokeWidth=".7" strokeOpacity=".26" fill="none"/>
            <path d="M150 46 Q182 30 192 14" stroke="#5C8A52" strokeWidth=".7" strokeOpacity=".26" fill="none"/>
            <g transform="translate(150 14)">
              {[0,72,144,216,288].map(r=><ellipse key={r} cx="0" cy="-10" rx="7" ry="13" fill="white" fillOpacity=".72" transform={`rotate(${r})`}/>)}
              <circle cx="0" cy="0" r="4.5" fill="#F0D87C" fillOpacity=".88"/>
            </g>
            <g transform="translate(100 18) scale(.6)">
              {[0,72,144,216,288].map(r=><ellipse key={r} cx="0" cy="-8" rx="6" ry="10" fill="white" fillOpacity=".62" transform={`rotate(${r})`}/>)}
              <circle cx="0" cy="0" r="3" fill="#F0D87C" fillOpacity=".78"/>
            </g>
            <g transform="translate(200 18) scale(.6)">
              {[0,72,144,216,288].map(r=><ellipse key={r} cx="0" cy="-8" rx="6" ry="10" fill="white" fillOpacity=".62" transform={`rotate(${r})`}/>)}
              <circle cx="0" cy="0" r="3" fill="#F0D87C" fillOpacity=".78"/>
            </g>
            <path d="M55 80 Q36 58 24 42 Q18 28 30 20 Q44 12 54 28 Q62 40 72 58" stroke="#5C8A52" strokeWidth=".8" strokeOpacity=".28" fill="none"/>
            <path d="M245 80 Q264 58 276 42 Q282 28 270 20 Q256 12 246 28 Q238 40 228 58" stroke="#5C8A52" strokeWidth=".8" strokeOpacity=".28" fill="none"/>
            <ellipse cx="38" cy="30" rx="10" ry="4" fill="#7AB86A" fillOpacity=".28" transform="rotate(-44 38 30)"/>
            <ellipse cx="262" cy="30" rx="10" ry="4" fill="#7AB86A" fillOpacity=".28" transform="rotate(44 262 30)"/>
          </svg>
        </div>

        {/* Eyebrow */}
        <p style={{...anim(.06), fontFamily:"'Cinzel',serif", fontSize:'clamp(9px,1.1vw,11px)', letterSpacing:'.28em', textTransform:'uppercase', color:'#9A7B3F', opacity: visible ? .82 : 0, marginBottom:10}}>
          Cu Dragoste Vă Invităm
        </p>

        {/* Names */}
        <div style={{...anim(.12), textAlign:'center', marginBottom:4}}>
          <span style={{display:'block', fontFamily:"'Playfair Display',serif", fontSize:'clamp(54px,9.5vw,104px)', fontWeight:500, fontStyle:'italic', color:'#3A5E33', lineHeight:.95, textShadow:'0 4px 28px rgba(60,90,50,.14)', letterSpacing:'-.01em'}}>
            Andreea
          </span>
          <span style={{display:'block', fontFamily:"'Cormorant',serif", fontSize:'clamp(24px,3.8vw,40px)', fontStyle:'italic', fontWeight:300, color:'#C9A84C', margin:'4px 0', lineHeight:1.2}}>
            &amp;
          </span>
          <span style={{display:'block', fontFamily:"'Playfair Display',serif", fontSize:'clamp(54px,9.5vw,104px)', fontWeight:500, fontStyle:'italic', color:'#3A5E33', lineHeight:.95, textShadow:'0 4px 28px rgba(60,90,50,.14)', letterSpacing:'-.01em'}}>
            Adrian
          </span>
        </div>

        {/* Divider */}
        <div style={{...anim(.18), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'20px auto'}}>
          <div style={{flex:1, height:1, background:'linear-gradient(90deg, transparent, rgba(154,123,63,.4), transparent)'}}/>
          <svg viewBox="0 0 40 20" width="40" height="20">
            <ellipse cx="20" cy="10" rx="6" ry="10" fill="#4A6741" fillOpacity=".32"/>
            <ellipse cx="20" cy="10" rx="3" ry="6" fill="#4A6741" fillOpacity=".48"/>
            <line x1="0" y1="10" x2="11" y2="10" stroke="#9A7B3F" strokeWidth=".8" strokeOpacity=".48"/>
            <line x1="29" y1="10" x2="40" y2="10" stroke="#9A7B3F" strokeWidth=".8" strokeOpacity=".48"/>
          </svg>
          <div style={{flex:1, height:1, background:'linear-gradient(90deg, rgba(154,123,63,.4), transparent)'}}/>
        </div>

        {/* Date */}
        <div style={{...anim(.24), textAlign:'center', marginBottom:18}}>
          <p style={{fontFamily:"'Cinzel',serif", fontSize:'clamp(12px,1.7vw,16px)', letterSpacing:'.16em', color:'#1C2218', fontWeight:500, marginBottom:5}}>
            Duminică · 3 Mai 2028
          </p>
          <p style={{fontFamily:"'Cormorant',serif", fontSize:'clamp(14px,1.9vw,19px)', fontStyle:'italic', color:'#6B7A5E', letterSpacing:'.04em'}}>
            Iași, România
          </p>
        </div>

        {/* Godparents */}
        <div style={{
          ...anim(.3),
          textAlign:'center', marginBottom:0,
          padding:'18px 28px',
          border:'1px solid rgba(154,123,63,.18)',
          borderRadius:18,
          background:'rgba(255,255,255,.5)',
          backdropFilter:'blur(10px)',
          maxWidth:340, width:'100%',
          boxShadow:'0 4px 24px rgba(0,0,0,.04)',
        }}>
          <p style={{fontFamily:"'Cormorant',serif", fontSize:'clamp(13px,1.5vw,15px)', fontStyle:'italic', color:'#6B7A5E', marginBottom:8, letterSpacing:'.04em'}}>
            Alături de nașii noștri
          </p>
          <div style={{width:36, height:1, background:'rgba(201,168,76,.5)', margin:'0 auto 10px'}}/>
          <p style={{fontFamily:"'Playfair Display',serif", fontSize:'clamp(18px,2.3vw,23px)', fontStyle:'italic', fontWeight:400, color:'#1C2218', letterSpacing:'.01em'}}>
            Ioana &amp; Radu
          </p>
        </div>

        {/* Divider */}
        <div style={{...anim(.36), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'20px auto'}}>
          <div style={{flex:1, height:1, background:'linear-gradient(90deg, transparent, rgba(154,123,63,.38), transparent)'}}/>
          <span style={{color:'#C9A84C', fontSize:11, opacity:.68}}>✦</span>
          <div style={{flex:1, height:1, background:'linear-gradient(90deg, rgba(154,123,63,.38), transparent)'}}/>
        </div>

        {/* Countdown */}
        <div style={{
          ...anim(.42),
          width:'100%', maxWidth:440,
          background:'rgba(255,255,255,.52)',
          border:'1px solid rgba(154,123,63,.15)',
          borderRadius:22, padding:'22px 18px',
          backdropFilter:'blur(12px)',
          textAlign:'center',
          boxShadow:'0 6px 28px rgba(0,0,0,.05)',
        }}>
          <p style={{fontFamily:"'Cinzel',serif", fontSize:'clamp(7px,.95vw,9.5px)', letterSpacing:'.26em', textTransform:'uppercase', color:'#9A7B3F', marginBottom:14, opacity:.78}}>
            Timp Rămas Până La Marele Eveniment
          </p>
          <div style={{display:'flex', gap:0, justifyContent:'center'}}>
            {[
              {n:pad(cd.d), l:'Zile'},
              {n:pad(cd.h), l:'Ore'},
              {n:pad(cd.m), l:'Minute'},
              {n:pad(cd.s), l:'Secunde', flip:flipS},
            ].map(u => (
              <div key={u.l} style={{flex:1, maxWidth:104, textAlign:'center', padding:'0 4px', borderRight:'1px solid rgba(154,123,63,.18)'}}>
                <span style={{
                  display:'block',
                  fontFamily:"'Cormorant',serif",
                  fontSize:'clamp(36px,5.8vw,58px)',
                  fontWeight:300, lineHeight:1,
                  transition:'transform .15s ease, color .15s ease',
                  transform: u.flip ? 'scale(1.1) translateY(-3px)' : 'scale(1)',
                  color: u.flip ? '#3A5E33' : '#1C2218',
                }}>
                  {u.n}
                </span>
                <span style={{fontFamily:"'Cinzel',serif", fontSize:'clamp(6px,.85vw,8.5px)', letterSpacing:'.14em', textTransform:'uppercase', color:'#6B7A5E', display:'block', marginTop:3}}>
                  {u.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{...anim(.48), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'20px auto'}}>
          <div style={{flex:1, height:1, background:'linear-gradient(90deg, transparent, rgba(154,123,63,.38), transparent)'}}/>
          <div style={{width:8, height:8, background:'#C9A84C', transform:'rotate(45deg)', boxShadow:'0 0 0 3px rgba(154,123,63,.15)'}}/>
          <div style={{flex:1, height:1, background:'linear-gradient(90deg, rgba(154,123,63,.38), transparent)'}}/>
        </div>

        {/* Location cards */}
        <div style={{
          ...anim(.54),
          width:'100%',
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))',
          gap:'clamp(14px,2.2vw,24px)',
          maxWidth:640,
        }}>
          {/* Church */}
          <div style={{
            borderRadius:18, overflow:'hidden',
            border:'1.5px solid rgba(154,123,63,.2)',
            background:'rgba(255,255,255,.72)',
            backdropFilter:'blur(10px)',
            boxShadow:'0 6px 28px rgba(26,38,20,.07)',
            transition:'transform .24s ease, box-shadow .24s ease',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(-5px)'; (e.currentTarget as HTMLDivElement).style.boxShadow='0 18px 48px rgba(26,38,20,.14)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform=''; (e.currentTarget as HTMLDivElement).style.boxShadow='0 6px 28px rgba(26,38,20,.07)'; }}
          >
            <div style={{padding:'16px 18px 12px', background:'linear-gradient(135deg, #3A5E33 0%, #274422 100%)', display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:38, height:38, borderRadius:11, background:'rgba(255,255,255,.16)', border:'1px solid rgba(255,255,255,.22)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:19, flexShrink:0}}>⛪</div>
              <div>
                <span style={{fontFamily:"'Cinzel',serif", fontSize:8.5, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.68)', display:'block', marginBottom:2}}>Ceremonia Religioasă</span>
                <p style={{fontFamily:"'Playfair Display',serif", fontSize:'clamp(14px,1.7vw,17px)', fontStyle:'italic', fontWeight:400, color:'#fff', lineHeight:1.2}}>Cununia</p>
              </div>
            </div>
            <div style={{padding:'14px 18px 16px'}}>
              <p style={{fontFamily:"'Lato',sans-serif", fontWeight:700, fontSize:'clamp(11px,1.2vw,13px)', color:'#1C2218', marginBottom:3, letterSpacing:'.02em'}}>Biserica Sfântul Prooroc Daniel</p>
              <p style={{fontSize:'clamp(10px,1.1vw,12px)', color:'#6B7A5E', lineHeight:1.5, marginBottom:10}}>Șos. Nicolina, Iași, România</p>
              <div style={{display:'inline-flex', alignItems:'center', gap:5, background:'#EBF4E7', border:'1px solid rgba(74,103,65,.18)', borderRadius:100, padding:'4px 11px', fontFamily:"'Cinzel',serif", fontSize:8.5, letterSpacing:'.13em', textTransform:'uppercase', color:'#3A5E33', marginBottom:12}}>
                ⏰ 3 mai 2028 · ora 13:00
              </div>
              <div style={{display:'flex', gap:8}}>
                <a href="https://waze.com/ul?q=Biserica+Sfantul+Prooroc+Daniel+Iasi" target="_blank" rel="noopener noreferrer" style={{flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, padding:'9px 8px', borderRadius:11, background:'linear-gradient(135deg, #08A2D4 0%, #0788B0 100%)', color:'#fff', textDecoration:'none', fontFamily:"'Lato',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.04em', boxShadow:'0 4px 14px rgba(8,162,212,.28)', transition:'all .2s ease', whiteSpace:'nowrap'}}>
                  <WazeIcon/> Waze
                </a>
                <a href="https://maps.google.com/?q=Biserica+Sfantul+Prooroc+Daniel+Iasi" target="_blank" rel="noopener noreferrer" style={{flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, padding:'9px 8px', borderRadius:11, background:'linear-gradient(135deg, #4CAF4F 0%, #388E3C 100%)', color:'#fff', textDecoration:'none', fontFamily:"'Lato',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.04em', boxShadow:'0 4px 14px rgba(76,175,79,.28)', transition:'all .2s ease', whiteSpace:'nowrap'}}>
                  <MapsIcon/> Maps
                </a>
              </div>
            </div>
          </div>

          {/* Reception */}
          <div style={{
            borderRadius:18, overflow:'hidden',
            border:'1.5px solid rgba(154,123,63,.2)',
            background:'rgba(255,255,255,.72)',
            backdropFilter:'blur(10px)',
            boxShadow:'0 6px 28px rgba(26,38,20,.07)',
            transition:'transform .24s ease, box-shadow .24s ease',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(-5px)'; (e.currentTarget as HTMLDivElement).style.boxShadow='0 18px 48px rgba(26,38,20,.14)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform=''; (e.currentTarget as HTMLDivElement).style.boxShadow='0 6px 28px rgba(26,38,20,.07)'; }}
          >
            <div style={{padding:'16px 18px 12px', background:'linear-gradient(135deg, #6B4E1A 0%, #503A10 100%)', display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:38, height:38, borderRadius:11, background:'rgba(255,255,255,.16)', border:'1px solid rgba(255,255,255,.22)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:19, flexShrink:0}}>🥂</div>
              <div>
                <span style={{fontFamily:"'Cinzel',serif", fontSize:8.5, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.68)', display:'block', marginBottom:2}}>Recepție și Petrecere</span>
                <p style={{fontFamily:"'Playfair Display',serif", fontSize:'clamp(14px,1.7vw,17px)', fontStyle:'italic', fontWeight:400, color:'#fff', lineHeight:1.2}}>Banchetul</p>
              </div>
            </div>
            <div style={{padding:'14px 18px 16px'}}>
              <p style={{fontFamily:"'Lato',sans-serif", fontWeight:700, fontSize:'clamp(11px,1.2vw,13px)', color:'#1C2218', marginBottom:3, letterSpacing:'.02em'}}>Chalette Events Paun</p>
              <p style={{fontSize:'clamp(10px,1.1vw,12px)', color:'#6B7A5E', lineHeight:1.5, marginBottom:10}}>Iași, România</p>
              <div style={{display:'inline-flex', alignItems:'center', gap:5, background:'#EBF4E7', border:'1px solid rgba(74,103,65,.18)', borderRadius:100, padding:'4px 11px', fontFamily:"'Cinzel',serif", fontSize:8.5, letterSpacing:'.13em', textTransform:'uppercase', color:'#3A5E33', marginBottom:12}}>
                ⏰ 3 mai 2028 · ora 17:00
              </div>
              <div style={{display:'flex', gap:8}}>
                <a href="https://waze.com/ul?q=Chalette+Events+Paun+Iasi" target="_blank" rel="noopener noreferrer" style={{flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, padding:'9px 8px', borderRadius:11, background:'linear-gradient(135deg, #08A2D4 0%, #0788B0 100%)', color:'#fff', textDecoration:'none', fontFamily:"'Lato',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.04em', boxShadow:'0 4px 14px rgba(8,162,212,.28)', transition:'all .2s ease', whiteSpace:'nowrap'}}>
                  <WazeIcon/> Waze
                </a>
                <a href="https://maps.google.com/?q=Chalette+Events+Paun+Iasi" target="_blank" rel="noopener noreferrer" style={{flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, padding:'9px 8px', borderRadius:11, background:'linear-gradient(135deg, #4CAF4F 0%, #388E3C 100%)', color:'#fff', textDecoration:'none', fontFamily:"'Lato',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.04em', boxShadow:'0 4px 14px rgba(76,175,79,.28)', transition:'all .2s ease', whiteSpace:'nowrap'}}>
                  <MapsIcon/> Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{...anim(.6), display:'flex', alignItems:'center', gap:14, width:'100%', maxWidth:360, margin:'20px auto'}}>
          <div style={{flex:1, height:1, background:'linear-gradient(90deg, transparent, rgba(154,123,63,.38), transparent)'}}/>
          <div style={{width:8, height:8, background:'#C9A84C', transform:'rotate(45deg)', boxShadow:'0 0 0 3px rgba(154,123,63,.15)'}}/>
          <div style={{flex:1, height:1, background:'linear-gradient(90deg, rgba(154,123,63,.38), transparent)'}}/>
        </div>

        {/* RSVP */}
        <div style={{...anim(.66), textAlign:'center', width:'100%', maxWidth:380}}>
          <p style={{fontFamily:"'Cormorant',serif", fontSize:'clamp(14px,1.7vw,17px)', fontStyle:'italic', color:'#6B7A5E', marginBottom:14, lineHeight:1.6, letterSpacing:'.03em'}}>
            Vă rugăm să ne anunțați prezența<br/>până pe <strong style={{color:'#3A5E33', fontStyle:'normal'}}>1 Aprilie 2028</strong>
          </p>
          <button
            onClick={() => setModal(true)}
            style={{
              display:'block', width:'100%',
              padding:'clamp(14px,1.8vw,18px) 0',
              borderRadius:100,
              background:'linear-gradient(135deg, #3A5E33 0%, #274422 100%)',
              color:'#fff', textAlign:'center',
              fontFamily:"'Cinzel',serif",
              fontSize:'clamp(11px,1.3vw,13px)',
              fontWeight:600, letterSpacing:'.2em', textTransform:'uppercase',
              cursor:'pointer', border:'none',
              boxShadow:'0 10px 32px rgba(58,94,51,.4)',
              transition:'transform .22s, box-shadow .22s',
              position:'relative', overflow:'hidden',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform='translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 18px 42px rgba(58,94,51,.55)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform=''; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 10px 32px rgba(58,94,51,.4)'; }}
          >
            <span style={{position:'relative', zIndex:1}}>Confirmă Prezența ✦</span>
            <div style={{position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent)', backgroundSize:'350px 100%', animation:'shimmer 3s linear infinite'}}/>
          </button>
        </div>

        {/* Footer */}
        <div style={{...anim(.72), textAlign:'center', marginTop:14}}>
          <p style={{fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(107,122,94,.5)'}}>
            ✦ VibeInvite · Tema Nature ✦
          </p>
        </div>

        {/* CHOOSE THEME BAR */}
        <div style={{
          position:'fixed', bottom:0, left:0, right:0, zIndex:50,
          padding:'14px 24px 20px',
          background:'linear-gradient(0deg, rgba(253,250,242,1) 0%, rgba(253,250,242,.98) 60%, rgba(253,250,242,.88) 100%)',
          borderTop:'1px solid rgba(154,123,63,.12)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:10,
          backdropFilter:'blur(4px)',
        }}>
          <p style={{fontFamily:"'Cormorant',serif", fontSize:14, fontStyle:'italic', color:'#6B7A5E', letterSpacing:'.03em', margin:0}}>
            Îți place această temă? Personalizează-o pentru evenimentul tău
          </p>
          <a href="/preturi?tema=nature" style={{
            display:'inline-flex', alignItems:'center', gap:10,
            padding:'13px 38px', borderRadius:100,
            background:'linear-gradient(135deg, #3A5E33 0%, #274422 100%)',
            color:'#fff', textDecoration:'none',
            fontFamily:"'Cinzel',serif", fontSize:12, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase',
            boxShadow:'0 8px 28px rgba(58,94,51,.42)',
            transition:'transform .2s, box-shadow .2s',
            border:'1.5px solid rgba(90,140,78,.3)',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow='0 16px 40px rgba(58,94,51,.58)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform=''; (e.currentTarget as HTMLAnchorElement).style.boxShadow='0 8px 28px rgba(58,94,51,.42)'; }}
          >
            Alege Această Temă
          </a>
        </div>

      </div>

      {/* Modal */}
      {modal && (
        <div
          onClick={() => setModal(false)}
          style={{
            position:'fixed', inset:0, zIndex:300,
            background:'rgba(18,26,16,.52)', backdropFilter:'blur(10px)',
            display:'flex', alignItems:'center', justifyContent:'center',
            padding:20, animation:'fadeIn .28s ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background:'linear-gradient(165deg, #FEFCF7, #F5F0E2)',
              borderRadius:26, padding:'38px 32px',
              maxWidth:360, width:'100%',
              border:'1px solid rgba(154,123,63,.2)',
              boxShadow:'0 40px 100px rgba(0,0,0,.3)',
              textAlign:'center',
              animation:'slideUp .32s cubic-bezier(.4,0,.2,1)',
            }}
          >
            <span style={{fontSize:44, display:'block', marginBottom:14}}>🌿</span>
            <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:32, fontStyle:'italic', fontWeight:400, color:'#3A5E33', marginBottom:10}}>Mulțumim!</h2>
            <div style={{width:38, height:1, background:'rgba(201,168,76,.5)', margin:'0 auto 14px'}}/>
            <p style={{fontSize:13, color:'#6B7A5E', marginBottom:24, lineHeight:1.75}}>
              Aceasta este o demonstrație a temei <strong>Nature</strong>.<br/>
              Achiziționează pachetul pentru a activa funcționalitatea de confirmare a prezenței.
            </p>
            <button
              onClick={() => setModal(false)}
              style={{
                padding:'12px 36px', borderRadius:100,
                background:'linear-gradient(135deg, #3A5E33, #274422)',
                color:'#fff', fontSize:12, fontWeight:700,
                fontFamily:"'Cinzel',serif", letterSpacing:'.18em', textTransform:'uppercase',
                border:'none', cursor:'pointer', transition:'opacity .2s',
              }}
            >
              Închide
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('envelope')

  function openEnvelope() {
    if (phase !== 'envelope') return
    setPhase('opening')
    setTimeout(() => setPhase('invite'), 1700)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; overflow: hidden; -webkit-font-smoothing: antialiased; }
        body { font-family: 'Lato', sans-serif; background: #FDFAF2; color: #2E3828; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes envFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:.42} 50%{opacity:.88} }
        @keyframes shimmer { 0%{background-position:-350px 0} 100%{background-position:350px 0} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:scale(.92) translateY(18px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>

      {/* HEADER */}
      <header style={{
        position:'fixed', top:0, left:0, right:0, zIndex:200,
        height:56,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 24px',
        background:'rgba(253,250,242,.93)',
        borderBottom:'1px solid rgba(154,123,63,.14)',
        backdropFilter:'blur(14px)',
      }}>
        <a
          href="/invitatii-digitale"
          style={{
            fontFamily:"'Cinzel',serif", fontSize:12, fontWeight:600,
            letterSpacing:'.22em', textTransform:'uppercase',
            color:'#3A5E33', textDecoration:'none', cursor:'pointer',
            transition:'color .2s',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color='#9A7B3F'}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color='#3A5E33'}
        >
          Vibe<span style={{color:'#C9A84C'}}>Invite</span>
        </a>

        <div style={{fontFamily:"'Cormorant',serif", fontSize:16, fontStyle:'italic', color:'#6B7A5E', letterSpacing:'.04em'}}>
          {phase === 'invite' ? 'Andreea & Adrian · 3 Mai 2028' : 'Invitație de Nuntă'}
        </div>

        <a
          href="/invitatii-digitale"
          style={{
            display:'inline-flex', alignItems:'center', gap:6,
            padding:'6px 14px', borderRadius:100,
            background:'rgba(58,94,51,.08)',
            border:'1px solid rgba(58,94,51,.18)',
            color:'#3A5E33',
            fontFamily:"'Lato',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase',
            cursor:'pointer', textDecoration:'none',
            transition:'all .2s',
          }}
          onMouseEnter={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background='rgba(58,94,51,.15)'; b.style.borderColor='rgba(58,94,51,.32)'; }}
          onMouseLeave={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background='rgba(58,94,51,.08)'; b.style.borderColor='rgba(58,94,51,.18)'; }}
        >
          <BackArrow />
          Înapoi
        </a>
      </header>

      {phase !== 'invite' && <EnvelopeScreen onOpen={openEnvelope} phase={phase} />}
      {phase === 'invite' && <InviteScreen onBack={() => setPhase('envelope')} />}
    </>
  )
}
