'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* ═══════════════════════════════════════════════════════════════
   LOGO SVG inline — /app/public/logo.svg
   Folosim direct SVG-ul ca să evităm un <img> extra și să
   controlăm culorile prin CSS (tematică alb + #FF6B00)
═══════════════════════════════════════════════════════════════ */
function Logo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="VibeInvite logo"
      role="img"
    >
      <g transform="translate(20, 10)">
        <g transform="translate(20, -10)">
          <path
            d="M150 130 L225 320 H255 L330 130 H290 L240 270 L190 130 Z"
            fill="#FF6B00"
          />
          <g transform="translate(295, 140)">
            <rect
              width="80"
              height="50"
              rx="4"
              fill="none"
              stroke="#FF6B00"
              strokeWidth="8"
            />
            <path
              d="M5 5 L40 28 L75 5"
              fill="none"
              stroke="#FF6B00"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════
   NAV ITEMS
═══════════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { label: 'Invitații Online',   href: '/invitatii-online' },
  { label: 'Invitații Digitale', href: '/invitatii-digitale' },
  { label: 'Prețuri',            href: '/preturi' },
  { label: 'Despre',             href: '/despre' },
  { label: 'Contact',            href: '/contact' },
]

/* ═══════════════════════════════════════════════════════════════
   STYLES — scoped cu prefix vh- (no Tailwind dependency)
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.vh-header *{box-sizing:border-box;margin:0;padding:0}

/* ── scrolled shadow ── */
@keyframes vh-slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
@keyframes vh-shimmer{0%{background-position:-300px 0}100%{background-position:300px 0}}
@keyframes vh-dotPulse{0%,100%{opacity:.4;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
@keyframes vh-mobileIn{from{opacity:0;transform:translateY(-12px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}

/* ── wrapper ── */
.vh-header{
  position:sticky;
  top:0;
  z-index:200;
  width:100%;
  font-family:'DM Sans',sans-serif;
  animation:vh-slideDown .5s ease both;
}

/* ── glass bar ── */
.vh-bar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:32px;
  padding:0 48px;
  height:68px;
  background:rgba(253,250,246,.92);
  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(255,107,0,.12);
  transition:box-shadow .3s, background .3s;
  position:relative;
}
.vh-bar.scrolled{
  background:rgba(253,250,246,.98);
  box-shadow:0 4px 32px rgba(0,0,0,.07);
}

/* accent line top */
.vh-bar::before{
  content:'';
  position:absolute;
  top:0;left:0;right:0;
  height:2.5px;
  background:linear-gradient(90deg,transparent 0%,#FF6B00 40%,#FF8C35 60%,transparent 100%);
  opacity:0;
  transition:opacity .4s;
}
.vh-bar.scrolled::before{opacity:1}

/* ── logo ── */
.vh-logo{
  display:flex;
  align-items:center;
  gap:9px;
  text-decoration:none;
  flex-shrink:0;
}
.vh-logo-text{
  font-family:'DM Sans',sans-serif;
  font-size:18px;
  font-weight:700;
  color:#1A1208;
  letter-spacing:-.4px;
  line-height:1;
}
.vh-logo-text span{color:#FF6B00}

/* ── desktop nav ── */
.vh-nav{
  display:flex;
  align-items:center;
  gap:4px;
  list-style:none;
}
.vh-nav li a{
  position:relative;
  display:inline-flex;
  align-items:center;
  padding:7px 14px;
  border-radius:100px;
  font-size:13.5px;
  font-weight:400;
  color:rgba(26,18,8,.7);
  text-decoration:none;
  transition:color .2s, background .2s;
  white-space:nowrap;
}
.vh-nav li a::after{
  content:'';
  position:absolute;
  bottom:4px;left:14px;right:14px;
  height:1.5px;
  background:#FF6B00;
  border-radius:2px;
  transform:scaleX(0);
  transform-origin:left;
  transition:transform .25s ease;
}
.vh-nav li a:hover{color:#1A1208;background:rgba(255,107,0,.07)}
.vh-nav li a:hover::after{transform:scaleX(1)}
.vh-nav li a.active{color:#FF6B00;font-weight:500}
.vh-nav li a.active::after{transform:scaleX(1)}

/* ── right actions ── */
.vh-actions{
  display:flex;
  align-items:center;
  gap:10px;
  flex-shrink:0;
}
.vh-login{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:8px 18px;
  border-radius:100px;
  border:1px solid rgba(26,18,8,.15);
  font-size:13px;
  font-weight:500;
  color:#1A1208;
  text-decoration:none;
  transition:all .2s;
  background:transparent;
}
.vh-login:hover{border-color:rgba(255,107,0,.4);color:#FF6B00;background:rgba(255,107,0,.05)}

.vh-cta{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:9px 22px;
  border-radius:100px;
  background:#FF6B00;
  font-size:13px;
  font-weight:600;
  color:#fff;
  text-decoration:none;
  position:relative;
  overflow:hidden;
  box-shadow:0 4px 18px rgba(255,107,0,.32);
  transition:all .25s;
  white-space:nowrap;
}
.vh-cta::after{
  content:'';
  position:absolute;
  inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.16),transparent);
  background-size:300px 100%;
  animation:vh-shimmer 2.5s linear infinite;
}
.vh-cta:hover{background:#FF8C35;transform:translateY(-1px);box-shadow:0 8px 26px rgba(255,107,0,.42)}

/* ── badge on CTA (optional "nou" / "free") ── */
.vh-cta-badge{
  background:rgba(255,255,255,.28);
  border-radius:100px;
  padding:1px 7px;
  font-size:10px;
  font-weight:700;
  letter-spacing:.05em;
  text-transform:uppercase;
}

/* ── hamburger ── */
.vh-burger{
  display:none;
  align-items:center;
  justify-content:center;
  width:40px;height:40px;
  border-radius:50%;
  border:1px solid rgba(26,18,8,.12);
  background:#fff;
  cursor:pointer;
  transition:all .2s;
  flex-shrink:0;
  position:relative;
  z-index:210;
}
.vh-burger:hover{border-color:rgba(255,107,0,.35);background:#FFF4ED}
.vh-burger-icon{
  display:flex;flex-direction:column;justify-content:center;
  align-items:center;width:18px;height:14px;gap:4px;
}
.vh-bline{
  width:18px;height:1.5px;background:#1A1208;border-radius:2px;
  transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .3s,width .3s;
  transform-origin:center;
}
/* open state */
.vh-burger.open .vh-bline:nth-child(1){transform:translateY(5.5px) rotate(45deg)}
.vh-burger.open .vh-bline:nth-child(2){opacity:0;width:0}
.vh-burger.open .vh-bline:nth-child(3){transform:translateY(-5.5px) rotate(-45deg)}

/* ── mobile menu ── */
.vh-mobile{
  display:none;
  position:absolute;
  top:calc(100% + 8px);
  left:16px;right:16px;
  background:#fff;
  border-radius:24px;
  border:1px solid rgba(255,107,0,.14);
  box-shadow:0 16px 64px rgba(0,0,0,.12),0 0 0 1px rgba(0,0,0,.03);
  padding:20px;
  z-index:205;
  animation:vh-mobileIn .25s ease both;
}
.vh-mobile.open{display:block}

.vh-mobile-nav{
  list-style:none;
  display:flex;
  flex-direction:column;
  gap:2px;
}
.vh-mobile-nav li a{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:13px 16px;
  border-radius:14px;
  font-size:15px;
  font-weight:400;
  color:#1A1208;
  text-decoration:none;
  transition:background .18s, color .18s;
}
.vh-mobile-nav li a:hover{background:#FFF4ED;color:#FF6B00}
.vh-mobile-nav li a.active{background:#FFF4ED;color:#FF6B00;font-weight:500}
.vh-mobile-nav li a .vh-arrow{
  font-size:12px;
  color:rgba(26,18,8,.35);
  transition:transform .2s;
}
.vh-mobile-nav li a:hover .vh-arrow{transform:translateX(3px);color:#FF6B00}

.vh-mobile-divider{
  height:1px;
  background:rgba(255,107,0,.1);
  margin:14px 0;
}
.vh-mobile-actions{
  display:flex;
  flex-direction:column;
  gap:10px;
}
.vh-mobile-login{
  display:flex;
  align-items:center;
  justify-content:center;
  padding:13px;
  border-radius:14px;
  border:1px solid rgba(26,18,8,.12);
  font-size:14px;
  font-weight:500;
  color:#1A1208;
  text-decoration:none;
  transition:all .2s;
}
.vh-mobile-login:hover{border-color:#FF6B00;color:#FF6B00}
.vh-mobile-cta{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  padding:14px;
  border-radius:14px;
  background:#FF6B00;
  font-size:14px;
  font-weight:600;
  color:#fff;
  text-decoration:none;
  box-shadow:0 4px 16px rgba(255,107,0,.35);
  transition:all .2s;
  position:relative;
  overflow:hidden;
}
.vh-mobile-cta::after{
  content:'';
  position:absolute;
  inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent);
  background-size:300px 100%;
  animation:vh-shimmer 2.5s linear infinite;
}
.vh-mobile-cta:hover{background:#FF8C35;box-shadow:0 8px 24px rgba(255,107,0,.42)}

/* mobile badge indicator */
.vh-mobile-badge{
  display:inline-flex;align-items:center;gap:5px;
  font-size:11px;color:rgba(26,18,8,.45);
  padding:6px 0 0 4px;
}
.vh-mbdot{width:6px;height:6px;background:#FF6B00;border-radius:50%;animation:vh-dotPulse 1.8s ease-in-out infinite}

/* ── overlay backdrop ── */
.vh-overlay{
  display:none;
  position:fixed;
  inset:0;
  background:rgba(26,18,8,.25);
  backdrop-filter:blur(2px);
  z-index:199;
  animation:vh-shimmer .2s ease;
}
.vh-overlay.open{display:block}

/* ── RESPONSIVE ── */

/* tablet */
@media(max-width:1024px){
  .vh-bar{padding:0 28px;height:62px}
  .vh-nav{gap:0}
  .vh-nav li a{padding:7px 10px;font-size:13px}
  .vh-cta{padding:8px 18px}
  .vh-login{display:none}
}

/* mobile — hide desktop nav, show burger */
@media(max-width:768px){
  .vh-bar{padding:0 20px;height:58px}
  .vh-nav{display:none}
  .vh-actions{display:none}
  .vh-burger{display:flex}
}

/* small mobile */
@media(max-width:390px){
  .vh-bar{padding:0 16px;height:54px}
  .vh-logo-text{font-size:16px}
  .vh-mobile{left:10px;right:10px}
}
`

/* ═══════════════════════════════════════════════════════════════
   HEADER COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Header() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname              = usePathname()
  const menuRef               = useRef<HTMLDivElement>(null)

  /* scroll listener — add shadow + accent line */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* close menu on route change */
  useEffect(() => { setOpen(false) }, [pathname])

  /* close menu on outside click */
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  /* lock body scroll on mobile menu open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* backdrop overlay */}
      <div
        className={`vh-overlay${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <header className="vh-header" role="banner">
        <div className={`vh-bar${scrolled ? ' scrolled' : ''}`} ref={menuRef}>

          {/* ── LOGO ── */}
          <Link href="/" className="vh-logo" aria-label="VibeInvite — pagina principală">
            <Logo />
            <span className="vh-logo-text">
              Vibe<span>Invite</span>
            </span>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav aria-label="Navigare principală">
            <ul className="vh-nav">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={pathname === item.href ? 'active' : ''}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── DESKTOP ACTIONS ── */}
          <div className="vh-actions">
            <Link href="/login" className="vh-login">
              <span aria-hidden="true">👤</span>
              Intră în cont
            </Link>
            <Link href="/preturi" className="vh-cta">
              <span aria-hidden="true">✨</span>
              Creează Invitația
              <span className="vh-cta-badge">Free</span>
            </Link>
          </div>

          {/* ── HAMBURGER ── */}
          <button
            type="button"
            className={`vh-burger${open ? ' open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
            aria-expanded={open}
            aria-controls="vh-mobile-menu"
          >
            <div className="vh-burger-icon" aria-hidden="true">
              <span className="vh-bline" />
              <span className="vh-bline" />
              <span className="vh-bline" />
            </div>
          </button>

          {/* ── MOBILE MENU ── */}
          <div
            id="vh-mobile-menu"
            className={`vh-mobile${open ? ' open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Meniu mobil"
          >
            <div className="vh-mobile-badge">
              <span className="vh-mbdot" aria-hidden="true" />
              Link invitație free · 3 minute
            </div>

            <ul className="vh-mobile-nav" style={{ marginTop: 12 }}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={pathname === item.href ? 'active' : ''}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                    <span className="vh-arrow" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="vh-mobile-divider" aria-hidden="true" />

            <div className="vh-mobile-actions">
              <Link href="/login" className="vh-mobile-login" onClick={() => setOpen(false)}>
                <span aria-hidden="true">👤</span>&nbsp; Intră în cont
              </Link>
              <Link href="/preturi" className="vh-mobile-cta" onClick={() => setOpen(false)}>
                <span aria-hidden="true">✨</span>
                Creează Invitația — E Free
              </Link>
            </div>
          </div>

        </div>
      </header>
    </>
  )
}
