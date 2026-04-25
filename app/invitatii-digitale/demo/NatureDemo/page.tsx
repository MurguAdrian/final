'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

/* ═══════════════════════════════════════════════════════════════
   NATURE DEMO — Redesign complet
   Inspirat din: plic mare full-screen, flori watercolor, aur, verde viu
   Path: andre/app/invitatii-digitale/demo/NatureDemo/page.tsx
═══════════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Great+Vibes&family=Jost:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --cream:   #FDFBF5;
  --cream2:  #F7F3E8;
  --gold:    #B8975A;
  --gold2:   #D4AF6A;
  --gold3:   #EDD9A3;
  --green1:  #3A7D5C;
  --green2:  #52A878;
  --green3:  #7DC4A0;
  --green4:  #C8E6D5;
  --white:   #FFFFFF;
  --dark:    #2C3E2D;
  --text:    #3D4A35;
  --textlt:  #6B7A5E;
}

html, body { height: 100%; }

.nd {
  font-family: 'Jost', sans-serif;
  background: var(--cream);
  min-height: 100vh;
  color: var(--text);
  overflow-x: hidden;
}

/* ══════════════════════
   BACK BUTTON
══════════════════════ */
.nd-back {
  position: fixed; top: 20px; left: 20px; z-index: 200;
  display: inline-flex; align-items: center; gap: 7px;
  padding: 9px 18px; border-radius: 100px;
  background: rgba(255,255,255,.92); border: 1px solid rgba(184,151,90,.35);
  color: var(--green1); font-size: 12px; font-weight: 500;
  text-decoration: none; backdrop-filter: blur(8px);
  box-shadow: 0 2px 12px rgba(0,0,0,.08);
  transition: all .2s;
}
.nd-back:hover { background: var(--white); border-color: var(--gold); color: var(--gold); }

/* ══════════════════════
   SCREEN 1 — PLIC
══════════════════════ */
.nd-screen {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* fundal ecran 1 */
.nd-s1-bg {
  position: absolute; inset: 0;
  background: linear-gradient(160deg, #F9F7EE 0%, #F2EDD8 40%, #EDF5EC 100%);
}

/* rame aurii colțuri */
.nd-corner {
  position: absolute;
  width: 160px; height: 160px;
  pointer-events: none;
}
.nd-corner svg { width: 100%; height: 100%; }
.nd-corner--tl { top: 16px; left: 16px; }
.nd-corner--tr { top: 16px; right: 16px; transform: scaleX(-1); }
.nd-corner--bl { bottom: 16px; left: 16px; transform: scaleY(-1); }
.nd-corner--br { bottom: 16px; right: 16px; transform: scale(-1); }

/* flori colțuri */
.nd-flower {
  position: absolute; pointer-events: none;
  opacity: .92;
}
.nd-flower--tl { top: 0; left: 0; width: clamp(180px,22vw,320px); }
.nd-flower--tr { top: 0; right: 0; width: clamp(160px,20vw,280px); transform: scaleX(-1); }
.nd-flower--bl { bottom: 0; left: 0; width: clamp(150px,18vw,260px); transform: scaleY(-1); }
.nd-flower--br { bottom: 0; right: 0; width: clamp(160px,19vw,270px); transform: scale(-1); }

/* plic centru */
.nd-env-stage {
  position: relative; z-index: 10;
  display: flex; flex-direction: column; align-items: center;
  gap: 28px;
}

.nd-env-title {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(28px, 4vw, 48px);
  color: var(--gold);
  letter-spacing: .02em;
  text-align: center;
  text-shadow: 0 2px 8px rgba(184,151,90,.2);
  animation: nd-fadeUp .8s ease both;
}

/* PLIC */
.nd-envelope {
  position: relative;
  width: clamp(280px, 45vw, 560px);
  cursor: pointer;
  user-select: none;
  filter: drop-shadow(0 24px 60px rgba(60,80,50,.22));
  animation: nd-envFloat 4s ease-in-out infinite;
}
@keyframes nd-envFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

.nd-env-shadow {
  position: absolute; bottom: -20px; left: 10%; right: 10%; height: 30px;
  background: radial-gradient(ellipse, rgba(60,80,40,.25) 0%, transparent 70%);
  filter: blur(8px);
  animation: nd-envFloat 4s ease-in-out infinite;
  animation-delay: .05s;
}

/* corp plic — SVG-like cu CSS */
.nd-env-body {
  width: 100%;
  padding-top: 66%; /* aspect ratio ~3:2 */
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.nd-env-paper {
  position: absolute; inset: 0;
  background: linear-gradient(170deg, #FEFCF6 0%, #F7F3E8 100%);
  border: 1.5px solid rgba(184,151,90,.4);
  border-radius: 6px;
}
/* linii interne diagonale (fundal plic) */
.nd-env-paper::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 55%;
  background: linear-gradient(160deg, #EFF7EE 0%, #EBF5EA 100%);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}
/* klap bordura */
.nd-env-paper::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 55%;
  border-bottom: 1.5px solid rgba(184,151,90,.35);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  background: transparent;
}

/* laterale plic */
.nd-env-left {
  position: absolute; top: 0; bottom: 0; left: 0;
  width: 50%; background: linear-gradient(160deg, #F2EFE2 0%, #EAE6D5 100%);
  clip-path: polygon(0 0, 0 100%, 100% 100%);
  border-right: 1px solid rgba(184,151,90,.2);
}
.nd-env-right {
  position: absolute; top: 0; bottom: 0; right: 0;
  width: 50%; background: linear-gradient(200deg, #F2EFE2 0%, #EAE6D5 100%);
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
  border-left: 1px solid rgba(184,151,90,.2);
}
.nd-env-bottom {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 55%; background: linear-gradient(180deg, transparent 0%, #EFF5EE 100%);
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
}

/* sigiliu monograma */
.nd-env-seal {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(52px, 8vw, 80px);
  height: clamp(52px, 8vw, 80px);
  background: radial-gradient(circle, #EFF8EE 0%, #D8F0E2 100%);
  border-radius: 50%;
  border: 2px solid rgba(184,151,90,.6);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 0 4px rgba(184,151,90,.12), 0 4px 16px rgba(0,0,0,.1);
  z-index: 5;
}
.nd-env-seal::before {
  content: '';
  position: absolute; inset: -6px;
  border: 1px dashed rgba(184,151,90,.4);
  border-radius: 50%;
  animation: nd-spin 20s linear infinite;
}
@keyframes nd-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

.nd-env-mono {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(18px, 3vw, 28px);
  color: var(--green1);
  line-height: 1;
}

/* klap animat */
.nd-env-flap {
  position: absolute; top: 0; left: 0; right: 0; z-index: 8;
  height: 55%;
  background: linear-gradient(170deg, #EFF7EE 0%, #E5F2E3 100%);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  border-bottom: 1.5px solid rgba(184,151,90,.4);
  transform-origin: top center;
  transition: transform .9s cubic-bezier(.4,0,.2,1), opacity .6s;
  overflow: hidden;
}
.nd-env-flap::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(170deg, rgba(184,151,90,.06) 0%, transparent 50%);
}
.nd-env-flap.open {
  transform: rotateX(180deg) translateY(-10%);
  opacity: 0;
}

/* scrisoare care iese */
.nd-env-letter {
  position: absolute; left: 8%; right: 8%; bottom: 4%;
  height: 68%;
  background: linear-gradient(170deg, #FEFCF7, #F9F6EC);
  border: 1px solid rgba(184,151,90,.3);
  border-radius: 3px;
  z-index: 3;
  transform: translateY(10px);
  transition: transform 1s cubic-bezier(.4,0,.2,1) .3s;
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 6px;
  box-shadow: 0 -4px 20px rgba(0,0,0,.06);
  overflow: hidden;
}
.nd-env-letter.rising { transform: translateY(-90%); }
.nd-env-letter-content { text-align: center; }
.nd-env-letter-names {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(18px, 3vw, 28px);
  color: var(--green1); line-height: 1.2;
}
.nd-env-letter-date {
  font-size: clamp(9px, 1.2vw, 11px);
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--gold); font-weight: 500; margin-top: 4px;
}

/* hint text */
.nd-env-hint {
  font-size: 13px; color: var(--textlt);
  letter-spacing: .04em; animation: nd-pulse 2.5s ease-in-out infinite;
  font-weight: 400;
}
@keyframes nd-pulse { 0%,100%{opacity:.5} 50%{opacity:1} }

/* ══════════════════════
   SCREEN 2 — INVITATIE
══════════════════════ */
.nd-invite-screen {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: none; /* shown via JS */
}
.nd-invite-screen.active { display: block; }

/* bg invitatie */
.nd-inv-bg {
  position: fixed; inset: 0; z-index: 0;
  background: linear-gradient(160deg, #F9F7EE 0%, #F2EDD8 30%, #EDF5EC 100%);
}

/* colțuri + flori — same as screen 1 */
.nd-inv-corners {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
}

/* conținut */
.nd-inv-content {
  position: relative; z-index: 10;
  max-width: 740px;
  margin: 0 auto;
  padding: 60px 24px 140px;
  display: flex; flex-direction: column; align-items: center;
  gap: 0;
  animation: nd-fadeUp .7s ease both;
}

/* frunza top */
.nd-inv-top-leaf {
  width: clamp(80px, 12vw, 140px);
  margin-bottom: 12px;
}

/* Vă invităm */
.nd-inv-invite {
  font-size: clamp(11px, 1.4vw, 14px);
  letter-spacing: .18em; text-transform: uppercase;
  color: var(--textlt); font-weight: 400; margin-bottom: 6px;
}

/* NUNTA */
.nd-inv-nunta {
  font-size: clamp(12px, 1.6vw, 15px);
  letter-spacing: .22em; text-transform: uppercase;
  color: var(--dark); font-weight: 600; margin-bottom: 24px;
}

/* NAMEN MARE */
.nd-inv-names {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(52px, 9vw, 96px);
  color: var(--green1);
  line-height: 1.0;
  text-align: center;
  text-shadow: 0 4px 20px rgba(58,125,92,.18);
  margin-bottom: 6px;
}
.nd-inv-amp {
  display: block;
  font-size: .55em;
  color: var(--gold);
  margin: -6px 0;
  line-height: 1.3;
}

/* divider aur cu frunza */
.nd-divider {
  display: flex; align-items: center; gap: 14px;
  width: 100%; max-width: 380px;
  margin: 20px auto;
}
.nd-div-line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold2), transparent);
}
.nd-div-ico { font-size: 18px; color: var(--gold); opacity: .8; }

/* DATA diamant */
.nd-date-block {
  display: flex; align-items: center; gap: clamp(16px, 4vw, 40px);
  margin: 8px 0 24px;
}
.nd-date-side {
  font-family: 'Jost', sans-serif;
  font-size: clamp(12px, 1.8vw, 18px);
  font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
  color: var(--gold);
}
.nd-date-diamond {
  width: clamp(64px, 9vw, 96px);
  height: clamp(64px, 9vw, 96px);
  border: 2px solid var(--gold2);
  transform: rotate(45deg);
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.6);
  box-shadow: 0 0 0 6px rgba(184,151,90,.1), 0 4px 20px rgba(0,0,0,.06);
  flex-shrink: 0;
}
.nd-date-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(28px, 5vw, 52px);
  font-weight: 300; color: var(--dark);
  transform: rotate(-45deg);
  line-height: 1;
}

/* NASI */
.nd-nasi {
  text-align: center; margin-bottom: 0;
}
.nd-nasi-label {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(20px, 3vw, 28px);
  color: var(--gold); margin-bottom: 4px;
  display: block;
}
.nd-nasi-names {
  font-size: clamp(15px, 2vw, 19px);
  font-weight: 500; color: var(--dark); letter-spacing: .02em;
}

/* COUNTDOWN */
.nd-countdown {
  width: 100%; max-width: 480px;
  margin: 0 auto;
}
.nd-cd-label {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(22px, 3vw, 30px);
  color: var(--gold); text-align: center; margin-bottom: 14px;
  display: block;
}
.nd-cd-row {
  display: flex; gap: clamp(10px, 2vw, 20px);
  justify-content: center;
}
.nd-cd-unit {
  flex: 1; max-width: 90px; text-align: center;
  border-right: 1px solid rgba(184,151,90,.3);
}
.nd-cd-unit:last-child { border-right: none; }
.nd-cd-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(32px, 5vw, 54px);
  font-weight: 300; color: var(--dark);
  line-height: 1;
  display: block;
  transition: transform .15s ease;
}
.nd-cd-num.flip { transform: scale(1.12) translateY(-3px); color: var(--green1); }
.nd-cd-lbl {
  font-size: clamp(9px, 1.1vw, 11px);
  letter-spacing: .1em; text-transform: uppercase;
  color: var(--textlt); display: block; margin-top: 3px;
}

/* SECTIUNI */
.nd-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(12px, 2vw, 24px);
  width: 100%; max-width: 620px;
  margin: 0 auto;
}
.nd-section {
  background: rgba(255,255,255,.75);
  border: 1px solid rgba(184,151,90,.2);
  border-radius: 16px; padding: clamp(16px, 2.5vw, 24px);
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,.05);
  backdrop-filter: blur(4px);
}
.nd-sec-ico {
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(58,125,92,.1);
  border: 1px solid rgba(58,125,92,.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; margin: 0 auto 10px;
}
.nd-sec-title {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(18px, 2.5vw, 24px);
  color: var(--green1); margin-bottom: 6px;
}
.nd-sec-place {
  font-weight: 600; font-size: clamp(12px, 1.4vw, 14px);
  color: var(--dark); margin-bottom: 2px;
}
.nd-sec-addr {
  font-size: clamp(10px, 1.2vw, 12px); color: var(--textlt);
  line-height: 1.5; margin-bottom: 6px;
}
.nd-sec-dt {
  font-size: clamp(10px, 1.2vw, 12px); color: var(--green1);
  font-weight: 600; margin-bottom: 10px;
}
.nd-sec-btns { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; }
.nd-sec-btn {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 6px 12px; border-radius: 100px;
  font-size: clamp(9px, 1.1vw, 11px); font-weight: 600;
  text-decoration: none; border: 1.5px solid;
  cursor: pointer; font-family: inherit;
  transition: all .2s;
}
.nd-sec-btn-waze {
  border-color: var(--green1); color: var(--green1); background: transparent;
}
.nd-sec-btn-waze:hover { background: var(--green1); color: #fff; }
.nd-sec-btn-map {
  border-color: rgba(58,125,92,.3); color: var(--green1); background: transparent;
}
.nd-sec-btn-map:hover { background: rgba(58,125,92,.1); }

/* RSVP */
.nd-rsvp {
  width: 100%; max-width: 380px; margin: 0 auto;
}
.nd-rsvp-btn {
  display: block; width: 100%;
  padding: clamp(14px, 2vw, 18px) 0;
  border-radius: 100px;
  background: linear-gradient(135deg, var(--green1), #2A5E44);
  color: #fff; text-align: center;
  font-family: 'Jost', sans-serif;
  font-size: clamp(12px, 1.5vw, 14px);
  font-weight: 600; letter-spacing: .1em;
  text-transform: uppercase; cursor: pointer; border: none;
  position: relative; overflow: hidden;
  box-shadow: 0 8px 28px rgba(58,125,92,.35);
  transition: transform .2s, box-shadow .2s;
}
.nd-rsvp-btn::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent);
  background-size: 300px 100%;
  animation: nd-shimmer 2.5s linear infinite;
}
@keyframes nd-shimmer { 0%{background-position:-300px 0} 100%{background-position:300px 0} }
.nd-rsvp-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(58,125,92,.5); }

/* footer invitatie */
.nd-inv-footer {
  text-align: center;
}
.nd-inv-footer-text {
  font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
  color: var(--textlt); font-weight: 400;
}

/* ── CHOOSE BAR ── */
.nd-choose-bar {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
  padding: 14px 24px 20px;
  background: linear-gradient(0deg, rgba(249,247,238,1) 0%, rgba(249,247,238,.96) 60%, transparent 100%);
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  transform: translateY(100%);
  transition: transform .5s cubic-bezier(.4,0,.2,1);
}
.nd-choose-bar.visible { transform: translateY(0); }
.nd-choose-hint {
  font-size: 12px; color: var(--textlt); letter-spacing: .04em;
}
.nd-choose-btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 36px; border-radius: 100px;
  background: linear-gradient(135deg, var(--green1), #2A5E44);
  color: #fff; text-decoration: none;
  font-family: 'Jost', sans-serif;
  font-size: 15px; font-weight: 600; letter-spacing: .04em;
  box-shadow: 0 8px 28px rgba(58,125,92,.4);
  position: relative; overflow: hidden;
  transition: transform .2s, box-shadow .2s;
  border: 1px solid rgba(82,168,120,.4);
}
.nd-choose-btn::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent);
  background-size: 400px 100%;
  animation: nd-shimmer 2.5s linear infinite;
}
.nd-choose-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(58,125,92,.55); }

/* ── MODAL RSVP ── */
.nd-modal-overlay {
  position: fixed; inset: 0; z-index: 300;
  background: rgba(44,62,45,.55); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px; opacity: 0; pointer-events: none;
  transition: opacity .3s;
}
.nd-modal-overlay.open { opacity: 1; pointer-events: auto; }
.nd-modal {
  background: linear-gradient(170deg, #FEFCF7, #F5F0E4);
  border-radius: 24px; padding: 36px 32px;
  max-width: 380px; width: 100%;
  border: 1px solid rgba(184,151,90,.25);
  box-shadow: 0 30px 80px rgba(0,0,0,.3);
  text-align: center;
  transform: scale(.92) translateY(16px);
  transition: transform .3s;
}
.nd-modal-overlay.open .nd-modal { transform: scale(1) translateY(0); }
.nd-modal-leaf { font-size: 40px; margin-bottom: 12px; display: block; }
.nd-modal-title {
  font-family: 'Great Vibes', cursive;
  font-size: 34px; color: var(--green1); margin-bottom: 8px;
}
.nd-modal-sub {
  font-size: 13px; color: var(--textlt);
  margin-bottom: 22px; line-height: 1.7;
}
.nd-modal-close {
  padding: 11px 32px; border-radius: 100px;
  background: var(--green1); color: #fff;
  font-size: 13px; font-weight: 600;
  border: none; cursor: pointer;
  font-family: 'Jost', sans-serif;
  transition: background .2s;
}
.nd-modal-close:hover { background: #2A5E44; }

/* ── ANIMATIONS ── */
@keyframes nd-fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.nd-anim { opacity: 0; animation: nd-fadeUp .7s ease forwards; }
.nd-anim-1  { animation-delay: .1s; }
.nd-anim-2  { animation-delay: .2s; }
.nd-anim-3  { animation-delay: .35s; }
.nd-anim-4  { animation-delay: .5s; }
.nd-anim-5  { animation-delay: .65s; }
.nd-anim-6  { animation-delay: .8s; }
.nd-anim-7  { animation-delay: .95s; }
.nd-anim-8  { animation-delay: 1.1s; }

/* ══════════════════════
   RESPONSIVE
══════════════════════ */
@media (max-width: 640px) {
  .nd-sections { grid-template-columns: 1fr; max-width: 360px; }
  .nd-corner { width: 110px; height: 110px; }
  .nd-flower--tl, .nd-flower--tr { width: 140px; }
  .nd-flower--bl, .nd-flower--br { width: 120px; }
  .nd-env-stage { gap: 20px; }
  .nd-inv-content { padding: 48px 18px 130px; }
}
@media (max-width: 380px) {
  .nd-flower--bl, .nd-flower--br { display: none; }
  .nd-date-diamond { width: 56px; height: 56px; }
}
@media (min-width: 1200px) {
  .nd-inv-content { max-width: 820px; }
  .nd-sections { max-width: 700px; }
}
`

/* ══════════════════════════════════
   SVG ASSETS — inline
══════════════════════════════════ */

// Ramă aur colț
const CornerFrame = () => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8 L8 80" stroke="#B8975A" strokeWidth="1.5" opacity=".7"/>
    <path d="M8 8 L80 8" stroke="#B8975A" strokeWidth="1.5" opacity=".7"/>
    <path d="M18 18 L18 72" stroke="#B8975A" strokeWidth="1" opacity=".45"/>
    <path d="M18 18 L72 18" stroke="#B8975A" strokeWidth="1" opacity=".45"/>
    <path d="M28 28 L28 64" stroke="#D4AF6A" strokeWidth=".75" opacity=".35"/>
    <path d="M28 28 L64 28" stroke="#D4AF6A" strokeWidth=".75" opacity=".35"/>
  </svg>
)

// Flori watercolor SVG (magnolia / florala)
const FlowerTL = () => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* frunze */}
    <ellipse cx="60" cy="200" rx="55" ry="22" fill="#6BAE88" fillOpacity=".45" transform="rotate(-35 60 200)"/>
    <ellipse cx="100" cy="220" rx="60" ry="18" fill="#52A878" fillOpacity=".4" transform="rotate(-20 100 220)"/>
    <ellipse cx="30" cy="160" rx="45" ry="16" fill="#7DC4A0" fillOpacity=".38" transform="rotate(-55 30 160)"/>
    <ellipse cx="130" cy="200" rx="50" ry="15" fill="#5EBA8A" fillOpacity=".35" transform="rotate(-10 130 200)"/>
    <ellipse cx="80" cy="170" rx="40" ry="14" fill="#4A9E70" fillOpacity=".3" transform="rotate(-45 80 170)"/>
    <ellipse cx="150" cy="230" rx="40" ry="13" fill="#6BAE88" fillOpacity=".3" transform="rotate(-5 150 230)"/>
    {/* ramuri */}
    <path d="M20 280 Q80 200 140 140 Q180 100 200 60" stroke="#4A7C5A" strokeWidth="2" strokeOpacity=".5" fill="none"/>
    <path d="M50 280 Q110 210 160 160" stroke="#4A7C5A" strokeWidth="1.5" strokeOpacity=".35" fill="none"/>
    {/* flori albe */}
    <g transform="translate(160 90)">
      <ellipse cx="0" cy="-22" rx="14" ry="26" fill="white" fillOpacity=".9" transform="rotate(0)"/>
      <ellipse cx="0" cy="-22" rx="14" ry="26" fill="white" fillOpacity=".9" transform="rotate(72)"/>
      <ellipse cx="0" cy="-22" rx="14" ry="26" fill="white" fillOpacity=".9" transform="rotate(144)"/>
      <ellipse cx="0" cy="-22" rx="14" ry="26" fill="white" fillOpacity=".9" transform="rotate(216)"/>
      <ellipse cx="0" cy="-22" rx="14" ry="26" fill="white" fillOpacity=".9" transform="rotate(288)"/>
      <circle cx="0" cy="0" r="9" fill="#F5E8C0" fillOpacity=".95"/>
      <circle cx="0" cy="0" r="5" fill="#E8C87A" fillOpacity=".8"/>
    </g>
    <g transform="translate(100 150)">
      <ellipse cx="0" cy="-18" rx="12" ry="22" fill="white" fillOpacity=".85" transform="rotate(0)"/>
      <ellipse cx="0" cy="-18" rx="12" ry="22" fill="white" fillOpacity=".85" transform="rotate(72)"/>
      <ellipse cx="0" cy="-18" rx="12" ry="22" fill="white" fillOpacity=".85" transform="rotate(144)"/>
      <ellipse cx="0" cy="-18" rx="12" ry="22" fill="white" fillOpacity=".85" transform="rotate(216)"/>
      <ellipse cx="0" cy="-18" rx="12" ry="22" fill="white" fillOpacity=".85" transform="rotate(288)"/>
      <circle cx="0" cy="0" r="7" fill="#F5E8C0" fillOpacity=".9"/>
    </g>
    <g transform="translate(200 40) scale(.75)">
      <ellipse cx="0" cy="-18" rx="11" ry="20" fill="white" fillOpacity=".8" transform="rotate(0)"/>
      <ellipse cx="0" cy="-18" rx="11" ry="20" fill="white" fillOpacity=".8" transform="rotate(72)"/>
      <ellipse cx="0" cy="-18" rx="11" ry="20" fill="white" fillOpacity=".8" transform="rotate(144)"/>
      <ellipse cx="0" cy="-18" rx="11" ry="20" fill="white" fillOpacity=".8" transform="rotate(216)"/>
      <ellipse cx="0" cy="-18" rx="11" ry="20" fill="white" fillOpacity=".8" transform="rotate(288)"/>
      <circle cx="0" cy="0" r="6" fill="#F5E8C0" fillOpacity=".85"/>
    </g>
    {/* muguri */}
    <ellipse cx="220" cy="80" rx="6" ry="12" fill="white" fillOpacity=".7" transform="rotate(-20 220 80)"/>
    <ellipse cx="230" cy="60" rx="5" ry="10" fill="#EFF7EE" fillOpacity=".65" transform="rotate(10 230 60)"/>
  </svg>
)

// Frunza simpla top-center
const TopLeaf = () => (
  <svg viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M70 75 Q20 40 40 10 Q70 -5 100 10 Q120 40 70 75Z" fill="#52A878" fillOpacity=".35"/>
    <path d="M70 75 Q30 45 50 15 Q70 0 90 15 Q110 45 70 75Z" fill="#3A7D5C" fillOpacity=".25"/>
    <path d="M70 75 L70 10" stroke="#4A9E70" strokeWidth="1" strokeOpacity=".4"/>
    <path d="M70 50 Q52 38 48 25" stroke="#4A9E70" strokeWidth=".8" strokeOpacity=".3" fill="none"/>
    <path d="M70 50 Q88 38 92 25" stroke="#4A9E70" strokeWidth=".8" strokeOpacity=".3" fill="none"/>
    <g transform="translate(40 0)">
      <ellipse cx="0" cy="-12" rx="8" ry="14" fill="white" fillOpacity=".75" transform="rotate(0)"/>
      <ellipse cx="0" cy="-12" rx="8" ry="14" fill="white" fillOpacity=".75" transform="rotate(72)"/>
      <ellipse cx="0" cy="-12" rx="8" ry="14" fill="white" fillOpacity=".75" transform="rotate(144)"/>
      <ellipse cx="0" cy="-12" rx="8" ry="14" fill="white" fillOpacity=".75" transform="rotate(216)"/>
      <ellipse cx="0" cy="-12" rx="8" ry="14" fill="white" fillOpacity=".75" transform="rotate(288)"/>
      <circle cx="0" cy="0" r="5" fill="#F0E4B0" fillOpacity=".9"/>
    </g>
    <g transform="translate(100 5)">
      <ellipse cx="0" cy="-10" rx="7" ry="12" fill="white" fillOpacity=".7" transform="rotate(0)"/>
      <ellipse cx="0" cy="-10" rx="7" ry="12" fill="white" fillOpacity=".7" transform="rotate(72)"/>
      <ellipse cx="0" cy="-10" rx="7" ry="12" fill="white" fillOpacity=".7" transform="rotate(144)"/>
      <ellipse cx="0" cy="-10" rx="7" ry="12" fill="white" fillOpacity=".7" transform="rotate(216)"/>
      <ellipse cx="0" cy="-10" rx="7" ry="12" fill="white" fillOpacity=".7" transform="rotate(288)"/>
      <circle cx="0" cy="0" r="4" fill="#F0E4B0" fillOpacity=".85"/>
    </g>
  </svg>
)

/* ══════════════════════════════════
   CORNERS & BG DECORATION component
══════════════════════════════════ */
function BgDecor() {
  return (
    <>
      {/* rețea colțuri */}
      <div className="nd-corner nd-corner--tl"><CornerFrame /></div>
      <div className="nd-corner nd-corner--tr"><CornerFrame /></div>
      <div className="nd-corner nd-corner--bl"><CornerFrame /></div>
      <div className="nd-corner nd-corner--br"><CornerFrame /></div>
      {/* flori colțuri */}
      <div className="nd-flower nd-flower--tl"><FlowerTL /></div>
      <div className="nd-flower nd-flower--tr"><FlowerTL /></div>
      <div className="nd-flower nd-flower--bl"><FlowerTL /></div>
      <div className="nd-flower nd-flower--br"><FlowerTL /></div>
    </>
  )
}

/* ══════════════════════════════════
   COUNTDOWN HOOK
══════════════════════════════════ */
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

/* ══════════════════════════════════
   PAGE
══════════════════════════════════ */
export default function NatureDemo() {
  const WEDDING = new Date('2028-05-03T13:00:00')
  const [phase, setPhase] = useState<'envelope' | 'opening' | 'invite'>('envelope')
  const [modal, setModal] = useState(false)
  const cd = useCountdown(WEDDING)
  const [flipS, setFlipS] = useState(false)
  const prevS = useState(cd.s)[0]

  useEffect(() => {
    setFlipS(true)
    const t = setTimeout(() => setFlipS(false), 150)
    return () => clearTimeout(t)
  }, [cd.s])

  function openEnvelope() {
    if (phase !== 'envelope') return
    setPhase('opening')
    setTimeout(() => setPhase('invite'), 1500)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="nd">

        {/* BACK */}
        <Link href="/invitatii-digitale" className="nd-back">← Înapoi</Link>

        {/* ══ SCREEN 1 — PLIC ══ */}
        {phase !== 'invite' && (
          <div className="nd-screen">
            <div className="nd-s1-bg" />
            <BgDecor />

            <div className="nd-env-stage">
              <p className="nd-env-title">Andreea &amp; Adrian</p>

              <div
                className="nd-envelope"
                onClick={openEnvelope}
                role="button"
                tabIndex={0}
                aria-label="Deschide invitația"
                onKeyDown={e => e.key === 'Enter' && openEnvelope()}
              >
                <div className="nd-env-shadow" />
                <div className="nd-env-body">
                  <div className="nd-env-paper" />
                  <div className="nd-env-left" />
                  <div className="nd-env-right" />
                  <div className="nd-env-bottom" />

                  {/* scrisoare */}
                  <div className={`nd-env-letter${phase === 'opening' ? ' rising' : ''}`}>
                    <div className="nd-env-letter-content">
                      <div className="nd-env-letter-names">Andreea &amp; Adrian</div>
                      <div className="nd-env-letter-date">🌿 · 3 Mai 2028 · 🌿</div>
                    </div>
                  </div>

                  {/* sigiliu */}
                  <div className="nd-env-seal">
                    <span className="nd-env-mono">A&amp;A</span>
                  </div>

                  {/* klap */}
                  <div className={`nd-env-flap${phase === 'opening' ? ' open' : ''}`} />
                </div>
              </div>

              <p className="nd-env-hint">
                {phase === 'opening' ? '✨ Se deschide...' : 'Apasă pentru a deschide ↑'}
              </p>
            </div>
          </div>
        )}

        {/* ══ SCREEN 2 — INVITAȚIE ══ */}
        <div className={`nd-invite-screen${phase === 'invite' ? ' active' : ''}`}>
          <div className="nd-inv-bg" />
          <div className="nd-inv-corners">
            <BgDecor />
          </div>

          <div className="nd-inv-content">

            {/* frunza top */}
            <div className="nd-inv-top-leaf nd-anim nd-anim-1">
              <TopLeaf />
            </div>

            <p className="nd-inv-invite nd-anim nd-anim-1">Vă invităm la</p>
            <p className="nd-inv-nunta nd-anim nd-anim-2">Nunta</p>

            {/* NAMES */}
            <div className="nd-inv-names nd-anim nd-anim-2">
              Andreea
              <span className="nd-inv-amp">&amp;</span>
              Adrian
            </div>

            {/* divider */}
            <div className="nd-divider nd-anim nd-anim-3">
              <div className="nd-div-line" />
              <span className="nd-div-ico">🌿</span>
              <div className="nd-div-line" />
            </div>

            {/* DATA */}
            <div className="nd-date-block nd-anim nd-anim-3" style={{ marginBottom: 4 }}>
              <span className="nd-date-side">Duminică</span>
              <div className="nd-date-diamond">
                <span className="nd-date-num">3</span>
              </div>
              <span className="nd-date-side">Mai</span>
            </div>

            {/* NASI */}
            <div className="nd-nasi nd-anim nd-anim-4" style={{ marginBottom: 0 }}>
              <span className="nd-nasi-label">Alături de nașii:</span>
              <p className="nd-nasi-names">Ioana și Radu</p>
            </div>

            {/* divider */}
            <div className="nd-divider nd-anim nd-anim-4">
              <div className="nd-div-line" />
              <span className="nd-div-ico">✦</span>
              <div className="nd-div-line" />
            </div>

            {/* COUNTDOWN */}
            <div className="nd-countdown nd-anim nd-anim-5">
              <span className="nd-cd-label">Au mai rămas:</span>
              <div className="nd-cd-row">
                {[
                  { n: pad(cd.d), l: 'Zile' },
                  { n: pad(cd.h), l: 'Ore' },
                  { n: pad(cd.m), l: 'Minute' },
                  { n: pad(cd.s), l: 'Secunde', flip: flipS },
                ].map(u => (
                  <div className="nd-cd-unit" key={u.l}>
                    <span className={`nd-cd-num${u.flip ? ' flip' : ''}`}>{u.n}</span>
                    <span className="nd-cd-lbl">{u.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* divider */}
            <div className="nd-divider nd-anim nd-anim-5">
              <div className="nd-div-line" />
              <span className="nd-div-ico">🌸</span>
              <div className="nd-div-line" />
            </div>

            {/* SECTIUNI */}
            <div className="nd-sections nd-anim nd-anim-6">
              <div className="nd-section">
                <div className="nd-sec-ico">⛪</div>
                <p className="nd-sec-title">Ceremonia Religioasă</p>
                <p className="nd-sec-place">Biserica Sfântul Prooroc Daniel</p>
                <p className="nd-sec-addr">Șos. Nicolina, Iași</p>
                <p className="nd-sec-dt">📅 3 mai 2028 · ora 13:00</p>
                <div className="nd-sec-btns">
                  <a href="https://waze.com/ul?q=Biserica+Sfantul+Prooroc+Daniel+Iasi" target="_blank" rel="noopener noreferrer" className="nd-sec-btn nd-sec-btn-waze">🗺 Waze</a>
                  <a href="https://maps.google.com/?q=Biserica+Sfantul+Prooroc+Daniel+Iasi" target="_blank" rel="noopener noreferrer" className="nd-sec-btn nd-sec-btn-map">📍 Maps</a>
                </div>
              </div>

              <div className="nd-section">
                <div className="nd-sec-ico">🥂</div>
                <p className="nd-sec-title">Petrecerea</p>
                <p className="nd-sec-place">Chalette Events Paun</p>
                <p className="nd-sec-addr">Iași</p>
                <p className="nd-sec-dt">📅 3 mai 2028 · ora 17:00</p>
                <div className="nd-sec-btns">
                  <a href="https://waze.com/ul?q=Chalette+Events+Paun+Iasi" target="_blank" rel="noopener noreferrer" className="nd-sec-btn nd-sec-btn-waze">🗺 Waze</a>
                  <a href="https://maps.google.com/?q=Chalette+Events+Paun+Iasi" target="_blank" rel="noopener noreferrer" className="nd-sec-btn nd-sec-btn-map">📍 Maps</a>
                </div>
              </div>
            </div>

            {/* divider */}
            <div className="nd-divider nd-anim nd-anim-7">
              <div className="nd-div-line" />
              <span className="nd-div-ico">💚</span>
              <div className="nd-div-line" />
            </div>

            {/* RSVP */}
            <div className="nd-rsvp nd-anim nd-anim-7">
              <button className="nd-rsvp-btn" onClick={() => setModal(true)}>
                💌 Confirmă Prezența ♥
              </button>
            </div>

            {/* footer */}
            <div className="nd-inv-footer nd-anim nd-anim-8" style={{ marginTop: 12 }}>
              <span className="nd-inv-footer-text">🌿 VibeInvite · Tema Nature 🌿</span>
            </div>

          </div>
        </div>

        {/* CHOOSE BAR */}
        <div className={`nd-choose-bar${phase === 'invite' ? ' visible' : ''}`}>
          <span className="nd-choose-hint">Îți place? 🌿 Alege această temă</span>
          <Link href="/preturi?tema=nature" className="nd-choose-btn">
            🌿 Alege Această Temă
          </Link>
        </div>

        {/* MODAL */}
        <div className={`nd-modal-overlay${modal ? ' open' : ''}`} onClick={() => setModal(false)}>
          <div className="nd-modal" onClick={e => e.stopPropagation()}>
            <span className="nd-modal-leaf">🌿</span>
            <h2 className="nd-modal-title">Mulțumim!</h2>
            <p className="nd-modal-sub">
              Aceasta este o demonstrație a temei <strong>Nature</strong>.<br/>
              Cumpără pachetul pentru a activa confirmările de prezență reale.
            </p>
            <button className="nd-modal-close" onClick={() => setModal(false)}>Închide</button>
          </div>
        </div>

      </div>
    </>
  )
}
