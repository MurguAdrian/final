'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'

/* ═══════════════════════════════════════════════════════════════
   NOTE: metadata în layout.tsx (page e 'use client')
═══════════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.vc * { box-sizing: border-box; margin: 0; padding: 0; }

.vc {
  font-family: 'DM Sans', sans-serif;
  background: #FDFAF6;
  color: #1A1208;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

/* ── orbs ── */
@keyframes vc-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(32px,-22px) scale(1.06)} 66%{transform:translate(-14px,16px) scale(.96)} }
.vc-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(80px); }
.vc-o1  { width: 520px; height: 520px; background: radial-gradient(circle,rgba(255,107,0,.17) 0%,transparent 70%); top: -100px; right: -80px; animation: vc-orb 13s ease-in-out infinite; }
.vc-o2  { width: 320px; height: 320px; background: radial-gradient(circle,rgba(255,107,0,.10) 0%,transparent 70%); bottom: 80px; left: -60px; animation: vc-orb 17s ease-in-out infinite reverse; }
.vc-o3  { width: 220px; height: 220px; background: radial-gradient(circle,rgba(255,200,120,.1) 0%,transparent 70%); top: 50%; left: 48%; animation: vc-orb 22s ease-in-out infinite 4s; }

/* ── keyframes ── */
@keyframes vc-up       { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes vc-in       { from{opacity:0} to{opacity:1} }
@keyframes vc-dot      { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
@keyframes vc-shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
@keyframes vc-tick     { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes vc-pulse    { 0%{transform:scale(.9);opacity:.8} 70%{transform:scale(1.4);opacity:0} 100%{transform:scale(.9);opacity:0} }
@keyframes vc-spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes vc-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes vc-checkIn  { from{transform:scale(0) rotate(-45deg);opacity:0} to{transform:scale(1) rotate(0deg);opacity:1} }
@keyframes vc-labelUp  { from{transform:translateY(0);font-size:14px;color:rgba(26,18,8,.45)} to{transform:translateY(-22px);font-size:11px;color:#FF6B00} }
@keyframes vc-ripple   { from{transform:scale(0);opacity:.35} to{transform:scale(4);opacity:0} }
@keyframes vc-shake    { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-4px)} 40%{transform:translateX(4px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(3px)} }

/* ── inner ── */
.vc-inner {
  position: relative; z-index: 10;
  max-width: 1180px; margin: 0 auto;
  padding: 52px 24px 72px;
}

/* ── page header ── */
.vc-header { text-align: center; margin-bottom: 56px; opacity: 0; animation: vc-up .7s ease .1s forwards; }
.vc-super {
  display: inline-flex; align-items: center; gap: 7px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px;
  padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500;
  color: #FF6B00; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 18px;
}
.vc-sdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; animation: vc-dot 1.8s ease-in-out infinite; }
.vc-tagline {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg,#FF6B00,#FF8C35); color: #fff;
  border-radius: 12px; padding: 9px 20px; font-size: 13px; font-weight: 600;
  letter-spacing: .02em; margin-bottom: 20px;
}
.vc-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(34px,5vw,60px); font-weight: 300; line-height: 1.08;
  color: #1A1208; margin-bottom: 16px;
}
.vc-h1 em     { font-style: italic; color: #FF6B00; }
.vc-h1 strong { font-weight: 600; }
.vc-lead { font-size: 15px; line-height: 1.8; color: rgba(26,18,8,.62); max-width: 520px; margin: 0 auto; }

/* ── main grid ── */
.vc-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 24px;
  align-items: start;
}
@media (max-width: 860px) { .vc-grid { grid-template-columns: 1fr; } }

/* ════════════════════════════════════════
   FORM CARD
════════════════════════════════════════ */
.vc-form-card {
  background: #fff; border-radius: 28px;
  border: 1px solid rgba(255,107,0,.1);
  box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 16px 56px rgba(0,0,0,.08);
  overflow: hidden;
  opacity: 0; animation: vc-up .8s ease .2s forwards;
}
.vc-form-card::before {
  content: ''; display: block; height: 4px;
  background: linear-gradient(90deg,#FF6B00,#FF8C35,#FF6B00);
}
.vc-form-body { padding: 40px 40px 36px; }

.vc-form-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 26px; font-weight: 300; color: #1A1208; margin-bottom: 6px;
}
.vc-form-title em { font-style: italic; color: #FF6B00; }
.vc-form-sub { font-size: 13px; color: rgba(26,18,8,.55); margin-bottom: 32px; line-height: 1.6; }

/* field group — floating label */
.vc-field { position: relative; margin-bottom: 20px; }
.vc-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }

.vc-label {
  position: absolute; top: 14px; left: 18px;
  font-size: 13px; color: rgba(26,18,8,.45); font-weight: 400;
  pointer-events: none; transition: all .2s ease;
  background: #fff; padding: 0 4px; z-index: 2;
}
.vc-input {
  width: 100%; padding: 13px 18px;
  border: 1.5px solid rgba(26,18,8,.14); border-radius: 14px;
  background: #fff; color: #1A1208; font-size: 14px; font-family: inherit;
  outline: none; transition: border-color .2s, box-shadow .2s;
  position: relative; z-index: 1;
}
.vc-input:focus { border-color: #FF6B00; box-shadow: 0 0 0 3px rgba(255,107,0,.1); }
.vc-input:focus + .vc-label,
.vc-input:not(:placeholder-shown) + .vc-label {
  top: -8px; left: 14px; font-size: 11px; color: #FF6B00; font-weight: 500;
}
.vc-input::placeholder { color: transparent; }
.vc-input.error { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,.1); animation: vc-shake .35s ease; }
.vc-input-err { font-size: 11px; color: #ef4444; margin-top: 4px; padding-left: 4px; display: block; }

/* textarea */
.vc-textarea {
  width: 100%; padding: 14px 18px;
  border: 1.5px solid rgba(26,18,8,.14); border-radius: 14px;
  background: #fff; color: #1A1208; font-size: 14px; font-family: inherit;
  outline: none; resize: none; min-height: 120px;
  transition: border-color .2s, box-shadow .2s;
}
.vc-textarea:focus { border-color: #FF6B00; box-shadow: 0 0 0 3px rgba(255,107,0,.1); }
.vc-textarea:focus + .vc-label,
.vc-textarea:not(:placeholder-shown) + .vc-label {
  top: -8px; left: 14px; font-size: 11px; color: #FF6B00; font-weight: 500;
}
.vc-textarea::placeholder { color: transparent; }

/* event type chips */
.vc-event-label { font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: rgba(26,18,8,.4); margin-bottom: 10px; }
.vc-event-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.vc-event-chip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 15px; border-radius: 100px;
  border: 1.5px solid rgba(26,18,8,.13);
  font-size: 12.5px; font-weight: 500; color: rgba(26,18,8,.7);
  background: #fff; cursor: pointer; transition: all .2s; font-family: inherit;
  user-select: none;
}
.vc-event-chip:hover  { border-color: rgba(255,107,0,.4); color: #FF6B00; background: #FFF4ED; }
.vc-event-chip.active { border-color: #FF6B00; color: #FF6B00; background: #FFF4ED; font-weight: 600; }

/* char counter */
.vc-msg-footer { display: flex; justify-content: flex-end; margin-top: 5px; }
.vc-char { font-size: 11px; color: rgba(26,18,8,.35); }
.vc-char.warn { color: #ef4444; }

/* submit */
.vc-submit-row { display: flex; align-items: center; gap: 16px; margin-top: 28px; flex-wrap: wrap; }
.vc-submit {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 15px 32px; border-radius: 100px;
  background: #FF6B00; color: #fff; font-size: 14px; font-weight: 600;
  border: none; cursor: pointer; font-family: inherit;
  position: relative; overflow: hidden;
  box-shadow: 0 8px 28px rgba(255,107,0,.36);
  transition: background .25s, transform .2s, box-shadow .25s;
}
.vc-submit::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
  background-size: 400px 100%; animation: vc-shimmer 2.5s linear infinite;
}
.vc-submit:hover:not(:disabled) { background: #FF8C35; transform: translateY(-2px); box-shadow: 0 14px 36px rgba(255,107,0,.44); }
.vc-submit:disabled { opacity: .7; cursor: not-allowed; transform: none; }
.vc-submit-spinner {
  width: 16px; height: 16px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,.4); border-top-color: #fff;
  animation: vc-spin .7s linear infinite;
}
.vc-submit-note { font-size: 12px; color: rgba(26,18,8,.45); }

/* ripple on submit */
.vc-ripple {
  position: absolute; border-radius: 50%;
  width: 40px; height: 40px; margin-left: -20px; margin-top: -20px;
  background: rgba(255,255,255,.3);
  animation: vc-ripple .6s ease-out forwards;
  pointer-events: none;
}

/* success state */
.vc-success {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 60px 40px; gap: 16px;
  animation: vc-in .5s ease;
}
.vc-success-ring {
  width: 72px; height: 72px; border-radius: 50%;
  background: #dcfce7; display: flex; align-items: center; justify-content: center;
  font-size: 32px; position: relative; margin-bottom: 8px;
}
.vc-success-ring::before {
  content: ''; position: absolute; inset: -8px; border-radius: 50%;
  border: 2px solid rgba(21,128,61,.2); animation: vc-pulse 2s ease-out infinite;
}
.vc-success-h { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; color: #1A1208; }
.vc-success-h em { font-style: italic; color: #FF6B00; }
.vc-success-sub { font-size: 14px; color: rgba(26,18,8,.6); line-height: 1.7; max-width: 320px; }
.vc-success-back {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 22px; border-radius: 100px; border: 1.5px solid rgba(26,18,8,.15);
  font-size: 13px; font-weight: 500; color: #1A1208; background: transparent;
  cursor: pointer; font-family: inherit; transition: all .2s; margin-top: 8px;
}
.vc-success-back:hover { border-color: #FF6B00; color: #FF6B00; background: #FFF4ED; }

/* ════════════════════════════════════════
   RIGHT COLUMN
════════════════════════════════════════ */
.vc-right { display: flex; flex-direction: column; gap: 18px; }

/* ── contact card ── */
.vc-contact-card {
  background: linear-gradient(135deg,#1A1208 0%,#2d1f0e 100%);
  border-radius: 24px; padding: 32px 28px;
  position: relative; overflow: hidden;
  opacity: 0; animation: vc-up .8s ease .3s forwards;
}
.vc-contact-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg,#FF6B00,#FF8C35,#FF6B00);
}
/* decorative rings */
.vc-deco-ring {
  position: absolute; border-radius: 50%;
  border: 1px solid rgba(255,107,0,.12); pointer-events: none;
}
.vc-dr1 { width: 220px; height: 220px; top: -60px; right: -40px; }
.vc-dr2 { width: 140px; height: 140px; top: -20px; right: 0; border-style: dashed; animation: vc-spin 40s linear infinite; }

.vc-contact-label {
  font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  color: rgba(255,255,255,.4); margin-bottom: 16px;
}
.vc-contact-h {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px; font-weight: 300; color: #fff; margin-bottom: 6px; line-height: 1.2;
}
.vc-contact-h em { font-style: italic; color: #FF8C35; }
.vc-contact-sub { font-size: 13px; color: rgba(255,255,255,.55); line-height: 1.7; margin-bottom: 26px; }

.vc-contact-items { display: flex; flex-direction: column; gap: 12px; }
.vc-contact-item {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 16px; border-radius: 14px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.08);
  text-decoration: none; color: inherit;
  transition: background .2s, border-color .2s, transform .15s;
  position: relative; overflow: hidden;
}
.vc-contact-item:hover {
  background: rgba(255,107,0,.15);
  border-color: rgba(255,107,0,.3);
  transform: translateY(-1px);
}
.vc-contact-item::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent);
  background-size: 300px 100%; animation: vc-shimmer 3s linear infinite;
}
.vc-ci-icon {
  width: 40px; height: 40px; border-radius: 12px;
  background: rgba(255,107,0,.2); display: flex; align-items: center;
  justify-content: center; font-size: 18px; flex-shrink: 0;
  transition: background .2s;
}
.vc-contact-item:hover .vc-ci-icon { background: rgba(255,107,0,.35); }
.vc-ci-info { display: flex; flex-direction: column; }
.vc-ci-label { font-size: 10px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: rgba(255,255,255,.4); margin-bottom: 2px; }
.vc-ci-value { font-size: 13px; font-weight: 500; color: #fff; }
.vc-ci-arrow { margin-left: auto; font-size: 14px; color: rgba(255,255,255,.3); transition: transform .2s, color .2s; flex-shrink: 0; }
.vc-contact-item:hover .vc-ci-arrow { transform: translateX(3px); color: #FF8C35; }

/* response time badge */
.vc-response {
  display: flex; align-items: center; gap: 8px;
  margin-top: 20px; padding: 10px 14px; border-radius: 10px;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.07);
}
.vc-resp-dot { width: 7px; height: 7px; border-radius: 50%; background: #86efac; animation: vc-dot 1.8s ease-in-out infinite; flex-shrink: 0; }
.vc-resp-text { font-size: 11.5px; color: rgba(255,255,255,.55); line-height: 1.5; }
.vc-resp-text strong { color: rgba(255,255,255,.85); }

/* ── trust card ── */
.vc-trust {
  background: #fff; border-radius: 22px;
  border: 1px solid rgba(255,107,0,.1);
  padding: 24px 26px;
  opacity: 0; animation: vc-up .8s ease .4s forwards;
}
.vc-trust-h { font-size: 13px; font-weight: 600; color: #1A1208; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
.vc-trust-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.vc-trust-item {
  background: #FDFAF6; border-radius: 14px;
  border: 1px solid rgba(255,107,0,.08); padding: 14px 12px; text-align: center;
  transition: border-color .2s, transform .2s;
}
.vc-trust-item:hover { border-color: rgba(255,107,0,.3); transform: translateY(-2px); }
.vc-trust-num   { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 600; color: #FF6B00; line-height: 1; }
.vc-trust-label { font-size: 11px; color: rgba(26,18,8,.55); margin-top: 4px; }

/* ── faq mini card ── */
.vc-faq {
  background: #FFF4ED; border-radius: 22px;
  border: 1px solid rgba(255,107,0,.15); padding: 24px 26px;
  opacity: 0; animation: vc-up .8s ease .5s forwards;
}
.vc-faq-h { font-size: 13px; font-weight: 600; color: #1A1208; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
.vc-faq-item { padding: 10px 0; border-bottom: 1px solid rgba(255,107,0,.1); }
.vc-faq-item:last-child { border-bottom: none; padding-bottom: 0; }
.vc-faq-q { font-size: 12.5px; font-weight: 600; color: #1A1208; margin-bottom: 4px; }
.vc-faq-a { font-size: 12px; color: rgba(26,18,8,.62); line-height: 1.6; }

/* ── ticker ── */
.vc-ticker   { overflow: hidden; background: #FF6B00; padding: 10px 0; }
.vc-ti-inner { display: flex; width: max-content; animation: vc-tick 24s linear infinite; }
.vc-ti       { display: flex; align-items: center; gap: 10px; padding: 0 32px; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
.vc-tdot     { width: 4px; height: 4px; background: rgba(255,255,255,.5); border-radius: 50%; }

/* ── guarantee bar ── */
.vc-guarantee {
  display: flex; align-items: center; justify-content: center; gap: 28px; flex-wrap: wrap;
  background: #fff; border-radius: 20px; border: 1px solid rgba(255,107,0,.1);
  padding: 18px 28px; margin-top: 28px;
  opacity: 0; animation: vc-up .8s ease .6s forwards;
}
.vc-gi   { display: flex; align-items: center; gap: 9px; }
.vc-gico { font-size: 20px; }
.vc-gtxt { font-size: 12px; font-weight: 500; color: rgba(26,18,8,.65); }
.vc-gtxt strong { color: #1A1208; display: block; font-size: 12.5px; }
.vc-gdiv { width: 1px; height: 28px; background: rgba(26,18,8,.1); }

/* ── RESPONSIVE ── */
@media (max-width: 639px) {
  .vc-inner { padding: 32px 16px 52px; }
  .vc-form-body { padding: 28px 22px 24px; }
  .vc-field-row { grid-template-columns: 1fr; gap: 0; }
  .vc-guarantee { gap: 14px; }
  .vc-gdiv { display: none; }
  .vc-contact-card { padding: 26px 22px; }
  .vc-dr1,.vc-dr2 { display: none; }
}
@media (min-width: 640px) and (max-width: 859px) {
  .vc-inner { padding: 40px 28px 56px; }
}
`

const EVENTS = [
  { emoji: '💍', label: 'Nuntă' },
  { emoji: '🎀', label: 'Botez' },
  { emoji: '🎂', label: 'Aniversare' },
  { emoji: '🎉', label: 'Petrecere' },
  { emoji: '🏢', label: 'Corporate' },
  { emoji: '💬', label: 'Altele' },
]

const TICKER = [
  '💌 Răspundem în 24h', '📞 WhatsApp disponibil', '✅ Suport inclus în pachet',
  '🎊 Nunți, Botezuri, Petreceri', '💸 300 Lei · Plată Unică', '⭐ 4.9 Rating',
  '12K+ Invitații create', '🔒 Plată securizată',
]

const FAQ = [
  { q: 'Cât durează să primesc răspuns?', a: 'Răspundem în maximum 24h, de obicei în câteva ore în timpul programului.' },
  { q: 'Pot schimba tema după activare?', a: 'Da, poți modifica tema și conținutul oricând, fără costuri suplimentare.' },
  { q: 'Oferiți ajutor la setup?', a: 'Absolut — te ghidăm pas cu pas până când invitația este trimisă primului invitat.' },
]

type FormData = {
  firstName: string; lastName: string; email: string; phone: string; message: string;
}
type FormErrors = Partial<Record<keyof FormData, string>>

export default function ContactPage() {
  const [selectedEvent, setSelectedEvent] = useState<string>('')
  const [form, setForm] = useState<FormData>({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  function handleChange(key: keyof FormData, val: string) {
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }))
  }

  function validate(): boolean {
    const e: FormErrors = {}
    if (!form.firstName.trim())  e.firstName = 'Prenumele este obligatoriu'
    if (!form.lastName.trim())   e.lastName  = 'Numele este obligatoriu'
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Email invalid'
    if (!form.message.trim() || form.message.length < 10) e.message = 'Mesajul trebuie să aibă minim 10 caractere'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.MouseEvent<HTMLButtonElement>) {
    // ripple
    const rect = btnRef.current?.getBoundingClientRect()
    if (rect) setRipple({ x: ev.clientX - rect.left, y: ev.clientY - rect.top })
    setTimeout(() => setRipple(null), 600)

    if (!validate()) return

    setLoading(true)
    // simulate send
    setTimeout(() => { setLoading(false); setSent(true) }, 1800)
  }

  const msgLeft = 500 - form.message.length

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="vc">
        <div className="vc-orb vc-o1" aria-hidden="true" />
        <div className="vc-orb vc-o2" aria-hidden="true" />
        <div className="vc-orb vc-o3" aria-hidden="true" />

        {/* ticker top */}
        <div className="vc-ticker" aria-hidden="true">
          <div className="vc-ti-inner">
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vc-ti">{t}<span className="vc-tdot" /></div>
            ))}
          </div>
        </div>

        <div className="vc-inner">

          {/* header */}
          <header className="vc-header">
            <p className="vc-tagline">🎊 Suntem alături de tine — de la idee la invitație</p>
            <p className="vc-super"><span className="vc-sdot" aria-hidden="true" />Contact & Suport</p>
            <h1 className="vc-h1">Hai să <em>vorbim</em> despre <strong>nunta ta</strong></h1>
            <p className="vc-lead">
              Completează formularul sau contactează-ne direct. Răspundem în maximum 24h
              și te ghidăm pas cu pas prin tot procesul.
            </p>
          </header>

          {/* grid */}
          <div className="vc-grid">

            {/* ── FORM ── */}
            <div className="vc-form-card" role="main">
              <div className="vc-form-body">

                {sent ? (
                  /* SUCCESS STATE */
                  <div className="vc-success">
                    <div className="vc-success-ring">✓</div>
                    <h2 className="vc-success-h">Mesaj trimis cu <em>succes!</em></h2>
                    <p className="vc-success-sub">
                      Îți mulțumim că ne-ai contactat. Un membru al echipei VibeInvite
                      te va contacta în maximum 24h.
                    </p>
                    <button className="vc-success-back" onClick={() => { setSent(false); setForm({ firstName:'', lastName:'', email:'', phone:'', message:'' }); setSelectedEvent('') }}>
                      ← Trimite alt mesaj
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="vc-form-title">Trimite-ne un <em>mesaj</em></h2>
                    <p className="vc-form-sub">Răspundem în 24h · Consultanță gratuită</p>

                    {/* event type */}
                    <div>
                      <p className="vc-event-label">Tipul evenimentului</p>
                      <div className="vc-event-chips" role="group" aria-label="Selectează tipul evenimentului">
                        {EVENTS.map(e => (
                          <button
                            key={e.label}
                            type="button"
                            className={`vc-event-chip${selectedEvent === e.label ? ' active' : ''}`}
                            onClick={() => setSelectedEvent(ev => ev === e.label ? '' : e.label)}
                            aria-pressed={selectedEvent === e.label}
                          >
                            <span aria-hidden="true">{e.emoji}</span>{e.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* name row */}
                    <div className="vc-field-row">
                      <div className="vc-field">
                        <input
                          id="firstName" type="text" className={`vc-input${errors.firstName ? ' error' : ''}`}
                          placeholder="Prenume" value={form.firstName}
                          onChange={e => handleChange('firstName', e.target.value)}
                          aria-describedby={errors.firstName ? 'err-fn' : undefined}
                        />
                        <label htmlFor="firstName" className="vc-label">Prenume</label>
                        {errors.firstName && <span id="err-fn" className="vc-input-err" role="alert">{errors.firstName}</span>}
                      </div>
                      <div className="vc-field">
                        <input
                          id="lastName" type="text" className={`vc-input${errors.lastName ? ' error' : ''}`}
                          placeholder="Nume" value={form.lastName}
                          onChange={e => handleChange('lastName', e.target.value)}
                          aria-describedby={errors.lastName ? 'err-ln' : undefined}
                        />
                        <label htmlFor="lastName" className="vc-label">Nume</label>
                        {errors.lastName && <span id="err-ln" className="vc-input-err" role="alert">{errors.lastName}</span>}
                      </div>
                    </div>

                    {/* email */}
                    <div className="vc-field">
                      <input
                        id="email" type="email" className={`vc-input${errors.email ? ' error' : ''}`}
                        placeholder="Email" value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                        aria-describedby={errors.email ? 'err-em' : undefined}
                      />
                      <label htmlFor="email" className="vc-label">Adresa de email</label>
                      {errors.email && <span id="err-em" className="vc-input-err" role="alert">{errors.email}</span>}
                    </div>

                    {/* phone */}
                    <div className="vc-field">
                      <input
                        id="phone" type="tel" className="vc-input"
                        placeholder="Telefon" value={form.phone}
                        onChange={e => handleChange('phone', e.target.value)}
                      />
                      <label htmlFor="phone" className="vc-label">Telefon (opțional)</label>
                    </div>

                    {/* message */}
                    <div className="vc-field">
                      <textarea
                        id="message"
                        className={`vc-textarea${errors.message ? ' error' : ''}`}
                        placeholder="Mesaj"
                        value={form.message}
                        maxLength={500}
                        onChange={e => handleChange('message', e.target.value)}
                        aria-describedby={errors.message ? 'err-msg' : undefined}
                      />
                      <label htmlFor="message" className="vc-label">Mesajul tău</label>
                      {errors.message && <span id="err-msg" className="vc-input-err" role="alert">{errors.message}</span>}
                      <div className="vc-msg-footer">
                        <span className={`vc-char${msgLeft < 50 ? ' warn' : ''}`}>{msgLeft} caractere rămase</span>
                      </div>
                    </div>

                    {/* submit */}
                    <div className="vc-submit-row">
                      <button
                        ref={btnRef}
                        type="button"
                        className="vc-submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        aria-busy={loading}
                      >
                        {ripple && (
                          <span className="vc-ripple" style={{ left: ripple.x, top: ripple.y }} aria-hidden="true" />
                        )}
                        {loading
                          ? <><span className="vc-submit-spinner" aria-hidden="true" /> Se trimite...</>
                          : <><span aria-hidden="true">✉️</span> Trimite mesajul</>
                        }
                      </button>
                      <span className="vc-submit-note">🔒 Datele tale sunt în siguranță</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div className="vc-right">

              {/* contact card — dark */}
              <div className="vc-contact-card">
                <div className="vc-deco-ring vc-dr1" aria-hidden="true" />
                <div className="vc-deco-ring vc-dr2" aria-hidden="true" />

                <p className="vc-contact-label">Contact direct</p>
                <h2 className="vc-contact-h">Vorbește cu <em>echipa noastră</em></h2>
                <p className="vc-contact-sub">
                  Suntem disponibili pe email și WhatsApp. Alegeți metoda care vă convine
                  — răspundem rapid, fără birocrație.
                </p>

                <div className="vc-contact-items">
                  {/* Email */}
                  <a
                    href="mailto:office@vibeinvite.ro"
                    className="vc-contact-item"
                    aria-label="Trimite email la office@vibeinvite.ro"
                  >
                    <div className="vc-ci-icon">📧</div>
                    <div className="vc-ci-info">
                      <span className="vc-ci-label">Email</span>
                      <span className="vc-ci-value">office@vibeinvite.ro</span>
                    </div>
                    <span className="vc-ci-arrow" aria-hidden="true">↗</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/40752954258"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vc-contact-item"
                    aria-label="Deschide WhatsApp cu numărul +40752954258"
                  >
                    <div className="vc-ci-icon">💬</div>
                    <div className="vc-ci-info">
                      <span className="vc-ci-label">WhatsApp</span>
                      <span className="vc-ci-value">+40 752 954 258</span>
                    </div>
                    <span className="vc-ci-arrow" aria-hidden="true">↗</span>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+40752954258"
                    className="vc-contact-item"
                    aria-label="Sună la +40752954258"
                  >
                    <div className="vc-ci-icon">📞</div>
                    <div className="vc-ci-info">
                      <span className="vc-ci-label">Telefon</span>
                      <span className="vc-ci-value">+40 752 954 258</span>
                    </div>
                    <span className="vc-ci-arrow" aria-hidden="true">↗</span>
                  </a>
                </div>

                <div className="vc-response">
                  <span className="vc-resp-dot" aria-hidden="true" />
                  <span className="vc-resp-text">
                    <strong>Timp de răspuns: max 24h</strong>
                    Luni–Vineri · 09:00–18:00 · WhatsApp disponibil non-stop
                  </span>
                </div>
              </div>

              {/* trust stats */}
              <div className="vc-trust">
                <p className="vc-trust-h"><span aria-hidden="true">⭐</span>De ce aleg VibeInvite</p>
                <div className="vc-trust-grid">
                  {[
                    { num: '12K+', label: 'Invitații create' },
                    { num: '98%',  label: 'Clienți mulțumiți' },
                    { num: '4.9★', label: 'Rating mediu' },
                    { num: '<24h', label: 'Timp răspuns' },
                  ].map(t => (
                    <div key={t.label} className="vc-trust-item">
                      <p className="vc-trust-num">{t.num}</p>
                      <p className="vc-trust-label">{t.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ mini */}
              <div className="vc-faq">
                <p className="vc-faq-h"><span aria-hidden="true">💬</span>Întrebări frecvente</p>
                {FAQ.map(f => (
                  <div key={f.q} className="vc-faq-item">
                    <p className="vc-faq-q">{f.q}</p>
                    <p className="vc-faq-a">{f.a}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* guarantee bar */}
          <div className="vc-guarantee" aria-label="Garanții incluse">
            {[
              { icon: '🔒', strong: 'Date securizate',  text: 'Nu distribuim informațiile tale' },
              { icon: '⚡', strong: 'Răspuns rapid',     text: 'Maximum 24h, de obicei mai puțin' },
              { icon: '🛠️', strong: 'Suport inclus',     text: 'În pachetul de 300 lei' },
              { icon: '♾️', strong: 'Fără abonament',    text: 'Plată unică, acces 12 luni' },
            ].map((g, i, arr) => (
              <>
                <div key={g.strong} className="vc-gi">
                  <span className="vc-gico" aria-hidden="true">{g.icon}</span>
                  <span className="vc-gtxt"><strong>{g.strong}</strong>{g.text}</span>
                </div>
                {i < arr.length - 1 && <div key={`d${i}`} className="vc-gdiv" aria-hidden="true" />}
              </>
            ))}
          </div>

        </div>

        {/* ticker bottom */}
        <div className="vc-ticker" aria-hidden="true">
          <div className="vc-ti-inner" style={{ animationDirection: 'reverse' }}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vc-ti">{t}<span className="vc-tdot" /></div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
