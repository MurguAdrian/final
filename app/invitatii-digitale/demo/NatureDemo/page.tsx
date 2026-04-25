'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ivory:    #FDFAF2;
  --ivory2:   #F5F0E0;
  --ivory3:   #EDE8D5;
  --gold:     #9A7B3F;
  --gold2:    #C9A84C;
  --gold3:    #E8D4A0;
  --gold4:    #F7EDCC;
  --sage:     #4A6741;
  --sage2:    #6A9160;
  --sage3:    #9BBF91;
  --sage4:    #D4E8CC;
  --sage5:    #EBF4E7;
  --dark:     #1C2218;
  --text:     #2E3828;
  --textlt:   #6B7A5E;
  --white:    #FFFFFF;
}

html { scroll-behavior: smooth; }
html, body { height: 100%; }

body {
  font-family: 'Lato', sans-serif;
  background: var(--ivory);
  color: var(--text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ══════════════════════
   HEADER / NAV
══════════════════════ */
.nd-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  height: 60px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px;
  background: rgba(253,250,242,.92);
  border-bottom: 1px solid rgba(154,123,63,.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.nd-header-logo {
  font-family: 'Cinzel', serif;
  font-size: 13px; font-weight: 600;
  letter-spacing: .22em; text-transform: uppercase;
  color: var(--sage); text-decoration: none;
  transition: color .2s;
}
.nd-header-logo:hover { color: var(--gold); }
.nd-header-logo span { color: var(--gold2); }

.nd-header-center {
  font-family: 'Cormorant', serif;
  font-size: 17px; font-style: italic;
  color: var(--textlt); letter-spacing: .04em;
}

.nd-header-home {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: 'Lato', sans-serif;
  font-size: 11px; font-weight: 700;
  letter-spacing: .14em; text-transform: uppercase;
  color: var(--sage); text-decoration: none;
  transition: color .2s;
}
.nd-header-home:hover { color: var(--gold); }
.nd-header-home svg { width: 14px; height: 14px; }

@media (max-width: 600px) {
  .nd-header { padding: 0 18px; height: 52px; }
  .nd-header-center { display: none; }
  .nd-header-logo { font-size: 11px; }
}

/* ══════════════════════
   SCREEN 1 — ENVELOPE
══════════════════════ */
.nd-screen {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 60px;
}

.nd-s1-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 20% 20%, rgba(155,191,145,.14) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 80%, rgba(232,212,160,.18) 0%, transparent 60%),
    linear-gradient(160deg, #FDFAF2 0%, #F5F0E0 50%, #EEF5EA 100%);
}

/* noise texture overlay */
.nd-noise {
  position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='.03'/%3E%3C/svg%3E");
  opacity: .6;
}

/* ── CORNER ORNAMENTS ── */
.nd-corner {
  position: absolute; width: 180px; height: 180px; pointer-events: none;
}
.nd-corner svg { width: 100%; height: 100%; }
.nd-corner--tl { top: 60px; left: 0; }
.nd-corner--tr { top: 60px; right: 0; transform: scaleX(-1); }
.nd-corner--bl { bottom: 0; left: 0; transform: scaleY(-1); }
.nd-corner--br { bottom: 0; right: 0; transform: scale(-1); }

/* ── FLOWER CORNERS ── */
.nd-flower { position: absolute; pointer-events: none; opacity: .88; }
.nd-flower--tl { top: 60px; left: 0; width: clamp(160px,20vw,300px); }
.nd-flower--tr { top: 60px; right: 0; width: clamp(140px,18vw,260px); transform: scaleX(-1); }
.nd-flower--bl { bottom: 0; left: 0; width: clamp(130px,16vw,240px); transform: scaleY(-1); }
.nd-flower--br { bottom: 0; right: 0; width: clamp(140px,17vw,250px); transform: scale(-1); }

/* ── ENVELOPE STAGE ── */
.nd-env-stage {
  position: relative; z-index: 10;
  display: flex; flex-direction: column; align-items: center;
  gap: 24px; padding: 20px;
}

.nd-env-eyebrow {
  font-family: 'Cinzel', serif;
  font-size: clamp(10px, 1.2vw, 12px);
  letter-spacing: .3em; text-transform: uppercase;
  color: var(--gold); opacity: .85;
  animation: nd-fadeUp .8s ease both;
}

.nd-env-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(32px, 5vw, 58px);
  font-weight: 400; font-style: italic;
  color: var(--dark);
  letter-spacing: .01em;
  text-align: center;
  line-height: 1.15;
  animation: nd-fadeUp .9s ease both .1s;
}
.nd-env-title strong {
  font-weight: 700; font-style: normal;
  color: var(--sage);
}

/* ── ENVELOPE ── */
.nd-envelope {
  position: relative;
  width: clamp(300px, 46vw, 580px);
  cursor: pointer; user-select: none;
  filter: drop-shadow(0 28px 70px rgba(26,38,20,.18));
  animation: nd-envFloat 5s ease-in-out infinite, nd-fadeUp .9s ease both .2s;
}
@keyframes nd-envFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }

.nd-env-shadow {
  position: absolute; bottom: -22px; left: 8%; right: 8%; height: 28px;
  background: radial-gradient(ellipse, rgba(40,60,30,.2) 0%, transparent 70%);
  filter: blur(10px);
  animation: nd-envFloat 5s ease-in-out infinite .08s;
}

.nd-env-body {
  width: 100%; padding-top: 63%; position: relative;
  border-radius: 6px; overflow: hidden;
}

.nd-env-paper {
  position: absolute; inset: 0;
  background: linear-gradient(170deg, #FEFCF6 0%, #F8F3E6 100%);
  border: 1.5px solid rgba(154,123,63,.35);
  border-radius: 6px;
}
.nd-env-paper::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 54%;
  background: linear-gradient(155deg, #F0F8EE 0%, #EAF5E6 100%);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}
.nd-env-paper::after {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 54%;
  border-bottom: 1.5px solid rgba(154,123,63,.3);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  background: transparent;
}

.nd-env-left {
  position: absolute; top: 0; bottom: 0; left: 0; width: 50%;
  background: linear-gradient(155deg, #F0EDE0 0%, #E8E3D0 100%);
  clip-path: polygon(0 0, 0 100%, 100% 100%);
}
.nd-env-right {
  position: absolute; top: 0; bottom: 0; right: 0; width: 50%;
  background: linear-gradient(205deg, #F0EDE0 0%, #E8E3D0 100%);
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
}
.nd-env-bottom {
  position: absolute; bottom: 0; left: 0; right: 0; height: 54%;
  background: linear-gradient(180deg, transparent 0%, #EFF6EC 100%);
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
}

.nd-env-seal {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(56px, 9vw, 88px); height: clamp(56px, 9vw, 88px);
  background: radial-gradient(circle, #F5FBF3 0%, #D9F0DE 100%);
  border-radius: 50%;
  border: 2px solid rgba(154,123,63,.55);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 0 5px rgba(154,123,63,.1), 0 6px 20px rgba(0,0,0,.08);
  z-index: 5;
}
.nd-env-seal::before {
  content: '';
  position: absolute; inset: -7px;
  border: 1px dashed rgba(154,123,63,.38);
  border-radius: 50%;
  animation: nd-spin 22s linear infinite;
}
@keyframes nd-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

.nd-env-mono {
  font-family: 'Playfair Display', serif;
  font-size: clamp(16px, 2.8vw, 26px);
  font-style: italic; font-weight: 400;
  color: var(--sage);
  line-height: 1;
}

.nd-env-letter {
  position: absolute; left: 8%; right: 8%; bottom: 4%;
  height: 68%; z-index: 3;
  background: linear-gradient(170deg, #FEFCF7, #FAF6EC);
  border: 1px solid rgba(154,123,63,.28);
  border-radius: 4px;
  transform: translateY(12px);
  transition: transform 1.1s cubic-bezier(.3,0,.2,1) .3s;
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 8px;
  box-shadow: 0 -6px 24px rgba(0,0,0,.05);
  overflow: hidden;
}
.nd-env-letter.rising { transform: translateY(-92%); }

.nd-env-letter-content { text-align: center; padding: 0 12px; }
.nd-env-letter-names {
  font-family: 'Playfair Display', serif;
  font-size: clamp(16px, 2.6vw, 26px);
  font-style: italic; font-weight: 400;
  color: var(--sage); line-height: 1.3;
}
.nd-env-letter-date {
  font-family: 'Cinzel', serif;
  font-size: clamp(8px, 1vw, 10px);
  letter-spacing: .18em; text-transform: uppercase;
  color: var(--gold); font-weight: 400; margin-top: 6px;
}

.nd-env-flap {
  position: absolute; top: 0; left: 0; right: 0; z-index: 8; height: 54%;
  background: linear-gradient(165deg, #EDF7EB 0%, #E5F2E2 100%);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  border-bottom: 1.5px solid rgba(154,123,63,.35);
  transform-origin: top center;
  transition: transform .95s cubic-bezier(.4,0,.2,1), opacity .6s;
  overflow: hidden;
}
.nd-env-flap::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(165deg, rgba(154,123,63,.05) 0%, transparent 50%);
}
.nd-env-flap.open { transform: rotateX(180deg) translateY(-10%); opacity: 0; }

.nd-env-hint {
  font-family: 'Cinzel', serif;
  font-size: clamp(9px, 1.1vw, 11px);
  letter-spacing: .2em; text-transform: uppercase;
  color: var(--gold); opacity: .75;
  animation: nd-pulse 2.8s ease-in-out infinite;
  animation: nd-fadeUp 1s ease both .4s, nd-pulse 2.8s ease-in-out infinite 1.4s;
}
@keyframes nd-pulse { 0%,100%{opacity:.45} 50%{opacity:.85} }

/* ══════════════════════
   SCREEN 2 — INVITATION
══════════════════════ */
.nd-invite-screen {
  min-height: 100vh; width: 100%;
  position: relative; overflow: hidden;
  padding-top: 60px;
  display: none;
}
.nd-invite-screen.active { display: block; }

.nd-inv-bg {
  position: fixed; inset: 0; z-index: 0;
  background:
    radial-gradient(ellipse 60% 50% at 15% 15%, rgba(155,191,145,.12) 0%, transparent 55%),
    radial-gradient(ellipse 55% 45% at 85% 85%, rgba(232,212,160,.14) 0%, transparent 55%),
    linear-gradient(160deg, #FDFAF2 0%, #F5F0E0 40%, #EEF5EA 100%);
}
.nd-inv-bg-noise {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='.025'/%3E%3C/svg%3E");
}

.nd-inv-corners { position: fixed; inset: 0; z-index: 2; pointer-events: none; }

.nd-inv-content {
  position: relative; z-index: 10;
  max-width: 760px; margin: 0 auto;
  padding: 56px 28px 160px;
  display: flex; flex-direction: column; align-items: center;
  gap: 0;
  animation: nd-fadeUp .75s ease both;
}

/* ── BOTANICAL SEPARATOR ── */
.nd-botanical {
  width: clamp(90px, 13vw, 150px);
  margin-bottom: 20px; opacity: .85;
}

/* ── EYEBROW ── */
.nd-inv-eyebrow {
  font-family: 'Cinzel', serif;
  font-size: clamp(9px, 1.1vw, 11px);
  letter-spacing: .3em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 10px;
}

.nd-inv-announce {
  font-family: 'Lato', sans-serif;
  font-size: clamp(10px, 1.3vw, 12px);
  letter-spacing: .22em; text-transform: uppercase;
  color: var(--textlt); font-weight: 400; margin-bottom: 4px;
}

/* ── NAMES LARGE ── */
.nd-inv-names-wrap {
  text-align: center; margin-bottom: 8px;
}
.nd-inv-firstname {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: clamp(56px, 10vw, 110px);
  font-weight: 500; font-style: italic;
  color: var(--sage);
  line-height: .95;
  text-shadow: 0 4px 24px rgba(74,103,65,.14);
  letter-spacing: -.01em;
}
.nd-inv-amp {
  display: block;
  font-family: 'Cormorant', serif;
  font-size: clamp(26px, 4vw, 44px);
  font-style: italic; font-weight: 300;
  color: var(--gold2); margin: 4px 0;
  line-height: 1.2;
}
.nd-inv-secondname {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: clamp(56px, 10vw, 110px);
  font-weight: 500; font-style: italic;
  color: var(--sage);
  line-height: .95;
  text-shadow: 0 4px 24px rgba(74,103,65,.14);
  letter-spacing: -.01em;
}

/* ── DIVIDER ── */
.nd-divider {
  display: flex; align-items: center; gap: 16px;
  width: 100%; max-width: 400px;
  margin: 22px auto;
}
.nd-div-line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(154,123,63,.45), transparent);
}
.nd-div-diamond {
  width: 8px; height: 8px;
  background: var(--gold2);
  transform: rotate(45deg);
  flex-shrink: 0;
  box-shadow: 0 0 0 3px rgba(154,123,63,.15);
}
.nd-div-leaf { font-size: 16px; color: var(--sage3); opacity: .75; }

/* ── DATE BLOCK ── */
.nd-date-section {
  text-align: center; margin: 4px 0 20px;
}
.nd-date-main {
  font-family: 'Cinzel', serif;
  font-size: clamp(13px, 1.8vw, 17px);
  letter-spacing: .18em;
  color: var(--dark); font-weight: 500;
  margin-bottom: 6px;
}
.nd-date-sub {
  font-family: 'Cormorant', serif;
  font-size: clamp(15px, 2vw, 20px);
  font-style: italic; color: var(--textlt);
  letter-spacing: .04em;
}

/* ── GODPARENTS ── */
.nd-godparents {
  text-align: center; margin-bottom: 0;
  padding: 20px 28px;
  border: 1px solid rgba(154,123,63,.18);
  border-radius: 20px;
  background: rgba(255,255,255,.45);
  backdrop-filter: blur(8px);
  max-width: 380px; width: 100%;
}
.nd-gp-label {
  font-family: 'Cormorant', serif;
  font-size: clamp(13px, 1.6vw, 16px);
  font-style: italic; color: var(--textlt);
  margin-bottom: 8px; display: block;
  letter-spacing: .04em;
}
.nd-gp-names {
  font-family: 'Playfair Display', serif;
  font-size: clamp(18px, 2.4vw, 24px);
  font-style: italic; font-weight: 400;
  color: var(--dark); letter-spacing: .01em;
}
.nd-gp-divider {
  width: 40px; height: 1px;
  background: var(--gold3);
  margin: 10px auto;
}

/* ── COUNTDOWN ── */
.nd-countdown {
  width: 100%; max-width: 480px;
  background: rgba(255,255,255,.5);
  border: 1px solid rgba(154,123,63,.15);
  border-radius: 24px; padding: 24px 20px;
  backdrop-filter: blur(10px);
  text-align: center;
}
.nd-cd-eyebrow {
  font-family: 'Cinzel', serif;
  font-size: clamp(8px, 1vw, 10px);
  letter-spacing: .28em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 16px; display: block; opacity: .8;
}
.nd-cd-row { display: flex; gap: 0; justify-content: center; }
.nd-cd-unit {
  flex: 1; max-width: 100px; text-align: center;
  padding: 0 4px;
  border-right: 1px solid rgba(154,123,63,.2);
}
.nd-cd-unit:last-child { border-right: none; }
.nd-cd-num {
  font-family: 'Cormorant', serif;
  font-size: clamp(38px, 6vw, 62px);
  font-weight: 300; color: var(--dark);
  line-height: 1; display: block;
  transition: transform .15s ease, color .15s ease;
}
.nd-cd-num.flip { transform: scale(1.1) translateY(-3px); color: var(--sage2); }
.nd-cd-lbl {
  font-family: 'Cinzel', serif;
  font-size: clamp(7px, .9vw, 9px);
  letter-spacing: .15em; text-transform: uppercase;
  color: var(--textlt); display: block; margin-top: 4px;
}

/* ══════════════════════
   LOCATION CARDS  ← HIGHLIGHT
══════════════════════ */
.nd-locations {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(14px, 2.5vw, 28px);
  max-width: 680px;
}

.nd-loc-card {
  border-radius: 20px;
  overflow: hidden;
  border: 1.5px solid rgba(154,123,63,.2);
  background: rgba(255,255,255,.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(26,38,20,.07);
  transition: transform .25s ease, box-shadow .25s ease;
}
.nd-loc-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 48px rgba(26,38,20,.13);
}

.nd-loc-header {
  padding: 18px 20px 14px;
  background: linear-gradient(135deg, var(--sage) 0%, #2E4E26 100%);
  display: flex; align-items: center; gap: 12px;
}
.nd-loc-icon {
  width: 40px; height: 40px; border-radius: 12px;
  background: rgba(255,255,255,.18);
  border: 1px solid rgba(255,255,255,.25);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
}
.nd-loc-head-text {}
.nd-loc-type {
  font-family: 'Cinzel', serif;
  font-size: 9px; letter-spacing: .22em; text-transform: uppercase;
  color: rgba(255,255,255,.7); display: block; margin-bottom: 2px;
}
.nd-loc-name {
  font-family: 'Playfair Display', serif;
  font-size: clamp(14px, 1.8vw, 18px);
  font-style: italic; font-weight: 400;
  color: #fff; line-height: 1.2;
}

.nd-loc-body { padding: 16px 20px; }
.nd-loc-venue {
  font-family: 'Lato', sans-serif;
  font-weight: 700; font-size: clamp(11px, 1.3vw, 13px);
  color: var(--dark); margin-bottom: 3px;
  letter-spacing: .02em;
}
.nd-loc-address {
  font-size: clamp(10px, 1.1vw, 12px);
  color: var(--textlt); line-height: 1.55;
  margin-bottom: 10px;
}
.nd-loc-time {
  display: inline-flex; align-items: center; gap: 5px;
  background: var(--sage5);
  border: 1px solid rgba(74,103,65,.2);
  border-radius: 100px; padding: 4px 12px;
  font-family: 'Cinzel', serif;
  font-size: 9px; letter-spacing: .14em; text-transform: uppercase;
  color: var(--sage); margin-bottom: 14px;
}

.nd-loc-nav-btns {
  display: flex; gap: 8px;
}
.nd-loc-btn {
  flex: 1;
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: 10px 8px; border-radius: 12px;
  font-family: 'Lato', sans-serif;
  font-size: 11px; font-weight: 700;
  letter-spacing: .04em;
  text-decoration: none; border: none; cursor: pointer;
  transition: all .22s ease;
  white-space: nowrap;
}
.nd-loc-btn-waze {
  background: linear-gradient(135deg, #08A2D4 0%, #0D8DC0 100%);
  color: #fff;
  box-shadow: 0 4px 14px rgba(8,162,212,.3);
}
.nd-loc-btn-waze:hover {
  background: linear-gradient(135deg, #0DB8EE 0%, #08A2D4 100%);
  box-shadow: 0 6px 20px rgba(8,162,212,.45);
  transform: translateY(-1px);
}
.nd-loc-btn-maps {
  background: linear-gradient(135deg, #4CAF4F 0%, #388E3C 100%);
  color: #fff;
  box-shadow: 0 4px 14px rgba(76,175,79,.3);
}
.nd-loc-btn-maps:hover {
  background: linear-gradient(135deg, #5DC560 0%, #4CAF4F 100%);
  box-shadow: 0 6px 20px rgba(76,175,79,.45);
  transform: translateY(-1px);
}
.nd-loc-btn svg { width: 14px; height: 14px; flex-shrink: 0; }

@media (max-width: 580px) {
  .nd-locations { grid-template-columns: 1fr; max-width: 420px; }
  .nd-loc-nav-btns { flex-direction: column; }
  .nd-loc-btn { padding: 12px; font-size: 12px; }
}

/* ══════════════════════
   RSVP
══════════════════════ */
.nd-rsvp-wrap {
  width: 100%; max-width: 420px;
  text-align: center;
}
.nd-rsvp-hint {
  font-family: 'Cormorant', serif;
  font-size: clamp(14px, 1.8vw, 17px);
  font-style: italic; color: var(--textlt);
  margin-bottom: 14px; display: block;
  letter-spacing: .03em;
}
.nd-rsvp-btn {
  display: block; width: 100%;
  padding: clamp(15px, 2vw, 19px) 0;
  border-radius: 100px;
  background: linear-gradient(135deg, #4A6741 0%, #2E4E26 100%);
  color: #fff; text-align: center;
  font-family: 'Cinzel', serif;
  font-size: clamp(11px, 1.4vw, 13px);
  font-weight: 600; letter-spacing: .2em;
  text-transform: uppercase; cursor: pointer; border: none;
  position: relative; overflow: hidden;
  box-shadow: 0 10px 32px rgba(74,103,65,.38);
  transition: transform .22s, box-shadow .22s;
}
.nd-rsvp-btn::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);
  background-size: 350px 100%;
  animation: nd-shimmer 3s linear infinite;
}
@keyframes nd-shimmer { 0%{background-position:-350px 0} 100%{background-position:350px 0} }
.nd-rsvp-btn:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(74,103,65,.52); }

/* ── FOOTER ── */
.nd-inv-footer {
  text-align: center; margin-top: 8px;
}
.nd-inv-footer-text {
  font-family: 'Cinzel', serif;
  font-size: 9px; letter-spacing: .22em; text-transform: uppercase;
  color: rgba(107,122,94,.55);
}

/* ── CHOOSE BAR ── */
.nd-choose-bar {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
  padding: 16px 24px 24px;
  background: linear-gradient(0deg, rgba(253,250,242,1) 0%, rgba(253,250,242,.97) 50%, transparent 100%);
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  transform: translateY(100%);
  transition: transform .55s cubic-bezier(.4,0,.2,1);
}
.nd-choose-bar.visible { transform: translateY(0); }
.nd-choose-hint {
  font-family: 'Cormorant', serif;
  font-size: 14px; font-style: italic;
  color: var(--textlt); letter-spacing: .03em;
}
.nd-choose-btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 15px 40px; border-radius: 100px;
  background: linear-gradient(135deg, #4A6741 0%, #2E4E26 100%);
  color: #fff; text-decoration: none;
  font-family: 'Cinzel', serif;
  font-size: 13px; font-weight: 600; letter-spacing: .15em; text-transform: uppercase;
  box-shadow: 0 10px 32px rgba(74,103,65,.42);
  position: relative; overflow: hidden;
  transition: transform .22s, box-shadow .22s;
  border: 1.5px solid rgba(107,162,90,.35);
}
.nd-choose-btn::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);
  background-size: 400px 100%;
  animation: nd-shimmer 3s linear infinite;
}
.nd-choose-btn:hover { transform: translateY(-2px); box-shadow: 0 18px 44px rgba(74,103,65,.58); }

/* ── MODAL ── */
.nd-modal-overlay {
  position: fixed; inset: 0; z-index: 300;
  background: rgba(20,30,18,.55); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px; opacity: 0; pointer-events: none;
  transition: opacity .3s;
}
.nd-modal-overlay.open { opacity: 1; pointer-events: auto; }
.nd-modal {
  background: linear-gradient(170deg, #FEFCF7, #F5F0E4);
  border-radius: 28px; padding: 40px 36px;
  max-width: 380px; width: 100%;
  border: 1px solid rgba(154,123,63,.2);
  box-shadow: 0 40px 100px rgba(0,0,0,.28);
  text-align: center;
  transform: scale(.9) translateY(20px);
  transition: transform .32s cubic-bezier(.4,0,.2,1);
}
.nd-modal-overlay.open .nd-modal { transform: scale(1) translateY(0); }
.nd-modal-icon { font-size: 44px; margin-bottom: 14px; display: block; }
.nd-modal-title {
  font-family: 'Playfair Display', serif;
  font-size: 34px; font-style: italic; font-weight: 400;
  color: var(--sage); margin-bottom: 10px;
}
.nd-modal-line {
  width: 40px; height: 1px; background: var(--gold3);
  margin: 0 auto 14px;
}
.nd-modal-sub {
  font-size: 13px; color: var(--textlt);
  margin-bottom: 24px; line-height: 1.75;
}
.nd-modal-close {
  padding: 12px 36px; border-radius: 100px;
  background: linear-gradient(135deg, #4A6741, #2E4E26);
  color: #fff; font-size: 12px; font-weight: 700;
  font-family: 'Cinzel', serif; letter-spacing: .18em; text-transform: uppercase;
  border: none; cursor: pointer;
  transition: opacity .2s;
}
.nd-modal-close:hover { opacity: .85; }

/* ── ANIMATIONS ── */
@keyframes nd-fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
.nd-anim { opacity: 0; animation: nd-fadeUp .75s ease forwards; }
.nd-anim-1  { animation-delay: .08s; }
.nd-anim-2  { animation-delay: .18s; }
.nd-anim-3  { animation-delay: .30s; }
.nd-anim-4  { animation-delay: .44s; }
.nd-anim-5  { animation-delay: .58s; }
.nd-anim-6  { animation-delay: .72s; }
.nd-anim-7  { animation-delay: .86s; }
.nd-anim-8  { animation-delay: 1.00s; }

/* ── RESPONSIVE ── */
@media (max-width: 400px) {
  .nd-flower--bl, .nd-flower--br { display: none; }
  .nd-inv-content { padding: 44px 14px 150px; }
  .nd-cd-unit { max-width: 72px; }
}
@media (min-width: 1100px) {
  .nd-inv-content { max-width: 840px; }
  .nd-locations { max-width: 760px; }
}
`

/* ══════════════════════════════════
   SVG COMPONENTS
══════════════════════════════════ */

const CornerFrame = () => (
  <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10 L10 90" stroke="#9A7B3F" strokeWidth="1.5" opacity=".6"/>
    <path d="M10 10 L90 10" stroke="#9A7B3F" strokeWidth="1.5" opacity=".6"/>
    <path d="M22 22 L22 78" stroke="#C9A84C" strokeWidth=".8" opacity=".4"/>
    <path d="M22 22 L78 22" stroke="#C9A84C" strokeWidth=".8" opacity=".4"/>
    <path d="M34 34 L34 66" stroke="#C9A84C" strokeWidth=".6" opacity=".28"/>
    <path d="M34 34 L66 34" stroke="#C9A84C" strokeWidth=".6" opacity=".28"/>
    <circle cx="10" cy="10" r="3" fill="none" stroke="#9A7B3F" strokeWidth="1" opacity=".5"/>
    <circle cx="22" cy="22" r="2" fill="none" stroke="#C9A84C" strokeWidth=".8" opacity=".38"/>
  </svg>
)

const FlowerSVG = () => (
  <svg viewBox="0 0 320 290" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="55" cy="205" rx="58" ry="20" fill="#6BAE88" fillOpacity=".38" transform="rotate(-38 55 205)"/>
    <ellipse cx="95" cy="225" rx="64" ry="17" fill="#52A878" fillOpacity=".33" transform="rotate(-22 95 225)"/>
    <ellipse cx="28" cy="162" rx="48" ry="15" fill="#7DC4A0" fillOpacity=".32" transform="rotate(-58 28 162)"/>
    <ellipse cx="125" cy="205" rx="52" ry="14" fill="#5EBA8A" fillOpacity=".28" transform="rotate(-12 125 205)"/>
    <ellipse cx="155" cy="232" rx="42" ry="12" fill="#6BAE88" fillOpacity=".26" transform="rotate(-6 155 232)"/>

    <path d="M18 285 Q78 205 142 142 Q185 98 206 56" stroke="#4A7C5A" strokeWidth="1.8" strokeOpacity=".42" fill="none"/>
    <path d="M48 285 Q108 214 162 163" stroke="#4A7C5A" strokeWidth="1.2" strokeOpacity=".3" fill="none"/>

    <g transform="translate(164 88)">
      {[0,72,144,216,288].map(r => (
        <ellipse key={r} cx="0" cy="-23" rx="13" ry="26" fill="white" fillOpacity=".88" transform={`rotate(${r})`}/>
      ))}
      <circle cx="0" cy="0" r="9" fill="#F5E4B8" fillOpacity=".95"/>
      <circle cx="0" cy="0" r="5" fill="#E8C264" fillOpacity=".75"/>
    </g>

    <g transform="translate(102 152)">
      {[0,72,144,216,288].map(r => (
        <ellipse key={r} cx="0" cy="-19" rx="11" ry="22" fill="white" fillOpacity=".82" transform={`rotate(${r})`}/>
      ))}
      <circle cx="0" cy="0" r="7" fill="#F5E4B8" fillOpacity=".9"/>
    </g>

    <g transform="translate(205 42) scale(.72)">
      {[0,72,144,216,288].map(r => (
        <ellipse key={r} cx="0" cy="-17" rx="10" ry="19" fill="white" fillOpacity=".76" transform={`rotate(${r})`}/>
      ))}
      <circle cx="0" cy="0" r="6" fill="#F5E4B8" fillOpacity=".85"/>
    </g>

    <ellipse cx="225" cy="76" rx="6" ry="12" fill="white" fillOpacity=".65" transform="rotate(-22 225 76)"/>
    <ellipse cx="236" cy="55" rx="5" ry="10" fill="#F0F7EE" fillOpacity=".6" transform="rotate(12 236 55)"/>
  </svg>
)

const BotanicalTop = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M80 85 Q24 48 46 12 Q80 -4 114 12 Q136 48 80 85Z" fill="#52A878" fillOpacity=".28"/>
    <path d="M80 85 Q34 52 56 18 Q80 2 104 18 Q126 52 80 85Z" fill="#3A7D5C" fillOpacity=".18"/>
    <path d="M80 85 L80 12" stroke="#4A9E70" strokeWidth=".9" strokeOpacity=".35"/>
    <path d="M80 55 Q56 42 52 26" stroke="#4A9E70" strokeWidth=".7" strokeOpacity=".28" fill="none"/>
    <path d="M80 55 Q104 42 108 26" stroke="#4A9E70" strokeWidth=".7" strokeOpacity=".28" fill="none"/>
    <g transform="translate(44 4)">
      {[0,72,144,216,288].map(r => (
        <ellipse key={r} cx="0" cy="-11" rx="8" ry="13" fill="white" fillOpacity=".72" transform={`rotate(${r})`}/>
      ))}
      <circle cx="0" cy="0" r="5" fill="#F0E4B0" fillOpacity=".88"/>
    </g>
    <g transform="translate(116 8)">
      {[0,72,144,216,288].map(r => (
        <ellipse key={r} cx="0" cy="-10" rx="7" ry="12" fill="white" fillOpacity=".68" transform={`rotate(${r})`}/>
      ))}
      <circle cx="0" cy="0" r="4" fill="#F0E4B0" fillOpacity=".82"/>
    </g>
  </svg>
)

function BgDecor() {
  return (
    <>
      <div className="nd-corner nd-corner--tl"><CornerFrame /></div>
      <div className="nd-corner nd-corner--tr"><CornerFrame /></div>
      <div className="nd-corner nd-corner--bl"><CornerFrame /></div>
      <div className="nd-corner nd-corner--br"><CornerFrame /></div>
      <div className="nd-flower nd-flower--tl"><FlowerSVG /></div>
      <div className="nd-flower nd-flower--tr"><FlowerSVG /></div>
      <div className="nd-flower nd-flower--bl"><FlowerSVG /></div>
      <div className="nd-flower nd-flower--br"><FlowerSVG /></div>
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
   WAZE & MAPS ICONS
══════════════════════════════════ */
const WazeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/>
  </svg>
)

const MapsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
)

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

/* ══════════════════════════════════
   PAGE
══════════════════════════════════ */
export default function NatureDemo() {
  const WEDDING = new Date('2028-05-03T13:00:00')
  const [phase, setPhase] = useState<'envelope' | 'opening' | 'invite'>('envelope')
  const [modal, setModal] = useState(false)
  const cd = useCountdown(WEDDING)
  const [flipS, setFlipS] = useState(false)

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

      <div style={{ fontFamily: 'Lato, sans-serif' }}>

        {/* HEADER */}
        <header className="nd-header">
          <Link href="/invitatii-digitale" className="nd-header-logo">
            Vibe<span>Invite</span>
          </Link>
          <div className="nd-header-center">
            {phase === 'invite' ? 'Andreea & Adrian · 3 Mai 2028' : 'Invitație Nuntă'}
          </div>
          <Link href="/" className="nd-header-home">
            <HomeIcon />
            Acasă
          </Link>
        </header>

        {/* ══ SCREEN 1 — ENVELOPE ══ */}
        {phase !== 'invite' && (
          <div className="nd-screen">
            <div className="nd-s1-bg" />
            <div className="nd-noise" />
            <BgDecor />

            <div className="nd-env-stage">
              <p className="nd-env-eyebrow">Invitație de Nuntă</p>

              <p className="nd-env-title">
                <strong>Andreea</strong> <em style={{ color: 'var(--gold2)', fontWeight: 300 }}>&amp;</em> <strong>Adrian</strong>
              </p>

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

                  <div className={`nd-env-letter${phase === 'opening' ? ' rising' : ''}`}>
                    <div className="nd-env-letter-content">
                      <div className="nd-env-letter-names">Andreea &amp; Adrian</div>
                      <div className="nd-env-letter-date">✦ 3 Mai 2028 ✦</div>
                    </div>
                  </div>

                  <div className="nd-env-seal">
                    <span className="nd-env-mono">A&amp;A</span>
                  </div>

                  <div className={`nd-env-flap${phase === 'opening' ? ' open' : ''}`} />
                </div>
              </div>

              <p className="nd-env-hint">
                {phase === 'opening' ? '✦ Se deschide...' : 'Apasă pentru a deschide'}
              </p>
            </div>
          </div>
        )}

        {/* ══ SCREEN 2 — INVITATION ══ */}
        <div className={`nd-invite-screen${phase === 'invite' ? ' active' : ''}`}>
          <div className="nd-inv-bg" />
          <div className="nd-inv-bg-noise" />
          <div className="nd-inv-corners"><BgDecor /></div>

          <div className="nd-inv-content">

            {/* botanical top */}
            <div className="nd-botanical nd-anim nd-anim-1">
              <BotanicalTop />
            </div>

            <p className="nd-inv-eyebrow nd-anim nd-anim-1">Invitație de Nuntă</p>
            <p className="nd-inv-announce nd-anim nd-anim-2">Vă invităm cu drag la</p>

            {/* NAMES */}
            <div className="nd-inv-names-wrap nd-anim nd-anim-2">
              <span className="nd-inv-firstname">Andreea</span>
              <span className="nd-inv-amp">&amp;</span>
              <span className="nd-inv-secondname">Adrian</span>
            </div>

            {/* divider */}
            <div className="nd-divider nd-anim nd-anim-3">
              <div className="nd-div-line" />
              <div className="nd-div-diamond" />
              <div className="nd-div-line" />
            </div>

            {/* DATE */}
            <div className="nd-date-section nd-anim nd-anim-3">
              <p className="nd-date-main">Duminică · 3 Mai 2028</p>
              <p className="nd-date-sub">Iași, România</p>
            </div>

            {/* GODPARENTS */}
            <div className="nd-godparents nd-anim nd-anim-4">
              <span className="nd-gp-label">Alături de nașii noștri</span>
              <div className="nd-gp-divider" />
              <p className="nd-gp-names">Ioana &amp; Radu</p>
            </div>

            {/* divider */}
            <div className="nd-divider nd-anim nd-anim-4" style={{ marginTop: 20 }}>
              <div className="nd-div-line" />
              <span className="nd-div-leaf">✦</span>
              <div className="nd-div-line" />
            </div>

            {/* COUNTDOWN */}
            <div className="nd-countdown nd-anim nd-anim-5">
              <span className="nd-cd-eyebrow">Au mai rămas</span>
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
              <div className="nd-div-diamond" />
              <div className="nd-div-line" />
            </div>

            {/* LOCATIONS */}
            <div className="nd-locations nd-anim nd-anim-6">

              {/* CHURCH */}
              <div className="nd-loc-card">
                <div className="nd-loc-header">
                  <div className="nd-loc-icon">⛪</div>
                  <div className="nd-loc-head-text">
                    <span className="nd-loc-type">Ceremonia</span>
                    <p className="nd-loc-name">Religioasă</p>
                  </div>
                </div>
                <div className="nd-loc-body">
                  <p className="nd-loc-venue">Biserica Sfântul Prooroc Daniel</p>
                  <p className="nd-loc-address">Șos. Nicolina, Iași</p>
                  <div className="nd-loc-time">
                    <span>📅</span>
                    <span>3 mai 2028 · ora 13:00</span>
                  </div>
                  <div className="nd-loc-nav-btns">
                    <a
                      href="https://waze.com/ul?q=Biserica+Sfantul+Prooroc+Daniel+Iasi"
                      target="_blank" rel="noopener noreferrer"
                      className="nd-loc-btn nd-loc-btn-waze"
                    >
                      <WazeIcon />
                      Waze
                    </a>
                    <a
                      href="https://maps.google.com/?q=Biserica+Sfantul+Prooroc+Daniel+Iasi"
                      target="_blank" rel="noopener noreferrer"
                      className="nd-loc-btn nd-loc-btn-maps"
                    >
                      <MapsIcon />
                      Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* RECEPTION */}
              <div className="nd-loc-card">
                <div className="nd-loc-header">
                  <div className="nd-loc-icon">🥂</div>
                  <div className="nd-loc-head-text">
                    <span className="nd-loc-type">Recepția</span>
                    <p className="nd-loc-name">Petrecerea</p>
                  </div>
                </div>
                <div className="nd-loc-body">
                  <p className="nd-loc-venue">Chalette Events Paun</p>
                  <p className="nd-loc-address">Iași, România</p>
                  <div className="nd-loc-time">
                    <span>📅</span>
                    <span>3 mai 2028 · ora 17:00</span>
                  </div>
                  <div className="nd-loc-nav-btns">
                    <a
                      href="https://waze.com/ul?q=Chalette+Events+Paun+Iasi"
                      target="_blank" rel="noopener noreferrer"
                      className="nd-loc-btn nd-loc-btn-waze"
                    >
                      <WazeIcon />
                      Waze
                    </a>
                    <a
                      href="https://maps.google.com/?q=Chalette+Events+Paun+Iasi"
                      target="_blank" rel="noopener noreferrer"
                      className="nd-loc-btn nd-loc-btn-maps"
                    >
                      <MapsIcon />
                      Google Maps
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* divider */}
            <div className="nd-divider nd-anim nd-anim-7">
              <div className="nd-div-line" />
              <div className="nd-div-diamond" />
              <div className="nd-div-line" />
            </div>

            {/* RSVP */}
            <div className="nd-rsvp-wrap nd-anim nd-anim-7">
              <span className="nd-rsvp-hint">Vă rugăm să confirmați prezența până pe 1 aprilie 2028</span>
              <button className="nd-rsvp-btn" onClick={() => setModal(true)}>
                Confirmă Prezența
              </button>
            </div>

            {/* footer */}
            <div className="nd-inv-footer nd-anim nd-anim-8" style={{ marginTop: 16 }}>
              <span className="nd-inv-footer-text">✦ VibeInvite · Tema Nature ✦</span>
            </div>

          </div>
        </div>

        {/* CHOOSE BAR */}
        <div className={`nd-choose-bar${phase === 'invite' ? ' visible' : ''}`}>
          <span className="nd-choose-hint">Îți place această temă? Alege-o pentru nunta ta</span>
          <Link href="/preturi?tema=nature" className="nd-choose-btn">
            Alege Această Temă
          </Link>
        </div>

        {/* MODAL */}
        <div className={`nd-modal-overlay${modal ? ' open' : ''}`} onClick={() => setModal(false)}>
          <div className="nd-modal" onClick={e => e.stopPropagation()}>
            <span className="nd-modal-icon">🌿</span>
            <h2 className="nd-modal-title">Mulțumim!</h2>
            <div className="nd-modal-line" />
            <p className="nd-modal-sub">
              Aceasta este o demonstrație a temei <strong>Nature</strong>.<br/>
              Achiziționează pachetul pentru a activa confirmările de prezență reale.
            </p>
            <button className="nd-modal-close" onClick={() => setModal(false)}>Închide</button>
          </div>
        </div>

      </div>
    </>
  )
}
