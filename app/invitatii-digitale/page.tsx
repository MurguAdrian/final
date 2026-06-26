
// // andre/app/invitatii-digitale/page.tsx
// 'use client'

// import Link from 'next/link'
// import { useState } from 'react'

// const CSS = `
// @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

// .vid * { box-sizing: border-box; margin: 0; padding: 0; }

// .vid {
//   font-family: 'DM Sans', sans-serif;
//   background: #FDFAF6;
//   color: #1A1208;
//   min-height: 100vh;
//   overflow-x: hidden;
// }

// @keyframes vid-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-14px,14px) scale(.96)} }
// .vid-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(80px); }
// .vid-o1  { width: 500px; height: 500px; background: radial-gradient(circle,rgba(255,107,0,.16) 0%,transparent 70%); top: -100px; right: -80px; animation: vid-orb 14s ease-in-out infinite; }
// .vid-o2  { width: 300px; height: 300px; background: radial-gradient(circle,rgba(255,107,0,.09) 0%,transparent 70%); bottom: 80px; left: -50px; animation: vid-orb 18s ease-in-out infinite reverse; }

// @keyframes vid-up       { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
// @keyframes vid-dot      { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
// @keyframes vid-shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
// @keyframes vid-tick     { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
// @keyframes vid-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
// @keyframes vid-float2   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
// @keyframes vid-float3   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
// @keyframes vid-float4   { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-8px) rotate(.5deg)} }
// @keyframes vid-rowIn    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
// @keyframes vid-pulse    { 0%{transform:scale(.9);opacity:.8} 70%{transform:scale(1.3);opacity:0} 100%{transform:scale(.9);opacity:0} }
// @keyframes vid-toastIn  { from{opacity:0;transform:translateY(16px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
// @keyframes vid-toastOut { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(8px) scale(.97)} }
// @keyframes vid-spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
// @keyframes vid-qrPulse  { 0%,100%{opacity:.5;transform:scale(.97)} 50%{opacity:1;transform:scale(1)} }
// @keyframes vid-scanLine { 0%{top:8px;opacity:1} 80%{top:calc(100% - 12px);opacity:1} 100%{top:8px;opacity:0} }
// @keyframes vid-photoIn  { from{opacity:0;transform:scale(.85)} to{opacity:1;transform:scale(1)} }
// @keyframes vid-fadeScale { from{opacity:0;transform:scale(.97) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }

// .vid-inner {
//   position: relative; z-index: 10;
//   max-width: 1380px; margin: 0 auto;
//   padding: 52px 28px 80px;
// }

// .vid-header { text-align: center; margin-bottom: 48px; opacity: 0; animation: vid-up .7s ease .1s forwards; }
// .vid-super {
//   display: inline-flex; align-items: center; gap: 7px;
//   background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px;
//   padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500;
//   color: #FF6B00; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 18px;
// }
// .vid-sdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; animation: vid-dot 1.8s ease-in-out infinite; }
// .vid-tagline {
//   display: inline-flex; align-items: center; gap: 8px;
//   background: linear-gradient(135deg,#FF6B00,#FF8C35); color: #fff;
//   border-radius: 12px; padding: 9px 20px; font-size: 13px; font-weight: 600;
//   letter-spacing: .02em; margin-bottom: 20px;
// }
// .vid-h1 {
//   font-family: 'Cormorant Garamond', serif;
//   font-size: clamp(32px, 5vw, 60px); font-weight: 300; line-height: 1.07;
//   color: #1A1208; margin-bottom: 16px;
// }
// .vid-h1 em     { font-style: italic; color: #FF6B00; }
// .vid-h1 strong { font-weight: 600; }
// .vid-lead {
//   font-size: 15px; line-height: 1.8; color: rgba(26,18,8,.62);
//   max-width: 580px; margin: 0 auto;
// }
// .vid-lead-pills {
//   display: flex; flex-wrap: wrap; gap: 8px;
//   justify-content: center; margin-top: 20px;
// }
// .vid-lead-pill {
//   display: inline-flex; align-items: center; gap: 5px;
//   background: #fff; border: 1px solid rgba(255,107,0,.18); border-radius: 100px;
//   padding: 5px 13px; font-size: 12px; font-weight: 500; color: #1A1208;
// }

// /* ── FILTER TABS ── */
// .vid-filter-wrap {
//   display: flex; justify-content: center; margin-bottom: 44px;
//   opacity: 0; animation: vid-up .6s ease .3s forwards;
// }
// .vid-filter-tabs {
//   display: inline-flex; gap: 4px;
//   background: rgba(255,255,255,.85); backdrop-filter: blur(12px);
//   border: 1px solid rgba(0,0,0,.08); border-radius: 100px;
//   padding: 5px;
//   box-shadow: 0 4px 20px rgba(0,0,0,.07);
// }
// .vid-filter-tab {
//   padding: 9px 22px; border-radius: 100px;
//   font-size: 13px; font-weight: 500; cursor: pointer;
//   border: none; background: transparent; color: rgba(26,18,8,.55);
//   font-family: 'DM Sans', sans-serif;
//   transition: color .2s, background .2s, transform .15s, box-shadow .2s;
//   white-space: nowrap;
// }
// .vid-filter-tab:hover { color: #1A1208; background: rgba(255,107,0,.06); }
// .vid-filter-tab.active {
//   background: #FF6B00; color: #fff;
//   box-shadow: 0 4px 14px rgba(255,107,0,.35);
//   transform: translateY(-1px);
// }

// /* category badge on each row */
// .vid-cat-badge {
//   display: inline-flex; align-items: center; gap: 4px;
//   font-size: 9px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
//   padding: 3px 9px; border-radius: 100px; margin-bottom: 8px; width: fit-content;
// }

// /* ── ROWS ── */
// .vid-rows { display: flex; flex-direction: column; gap: 24px; }

// .vid-row {
//   border-radius: 28px; overflow: hidden;
//   border: 1px solid rgba(0,0,0,.07);
//   box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 10px 40px rgba(0,0,0,.06);
//   background: #fff;
//   transition: box-shadow .3s, transform .3s, opacity .35s;
//   animation: vid-fadeScale .45s ease both;
// }
// .vid-row:hover {
//   box-shadow: 0 4px 14px rgba(0,0,0,.07), 0 20px 64px rgba(0,0,0,.1);
//   transform: translateY(-2px);
// }

// .vid-row-bar { height: 4px; width: 100%; flex-shrink: 0; }

// .vid-row-body {
//   display: grid;
//   grid-template-columns: 240px 1fr;
//   min-height: 340px;
// }

// .vid-info {
//   padding: 32px 28px;
//   display: flex; flex-direction: column; justify-content: center;
//   border-right: 1px solid rgba(0,0,0,.06);
// }
// .vid-theme-pill {
//   display: inline-flex; align-items: center; gap: 6px;
//   border-radius: 100px; padding: 4px 13px;
//   font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
//   margin-bottom: 12px; width: fit-content;
// }
// .vid-theme-name {
//   font-family: 'Cormorant Garamond', serif;
//   font-size: 32px; font-weight: 300; line-height: 1.05; margin-bottom: 8px;
// }
// .vid-theme-sub { font-size: 12.5px; color: rgba(26,18,8,.58); line-height: 1.65; margin-bottom: 20px; flex: 1; }
// .vid-btns { display: flex; gap: 8px; flex-wrap: wrap; }

// .vid-btn-demo {
//   display: inline-flex; align-items: center; gap: 6px;
//   padding: 9px 17px; border-radius: 100px;
//   border: 1.5px solid rgba(26,18,8,.16);
//   font-size: 12px; font-weight: 500; color: rgba(26,18,8,.75);
//   background: transparent; cursor: pointer;
//   transition: border-color .2s, color .2s, background .2s; font-family: inherit;
//   text-decoration: none;
// }
// .vid-btn-demo:hover { border-color: #FF6B00; color: #FF6B00; background: #FFF4ED; }

// .vid-btn-demo-soon {
//   display: inline-flex; align-items: center; gap: 6px;
//   padding: 9px 17px; border-radius: 100px;
//   border: 1.5px solid rgba(26,18,8,.10);
//   font-size: 12px; font-weight: 500; color: rgba(26,18,8,.4);
//   background: transparent; cursor: default;
//   font-family: inherit; text-decoration: none;
//   position: relative;
// }
// .vid-btn-demo-soon::after {
//   content: 'soon';
//   position: absolute; top: -6px; right: -4px;
//   background: #FF6B00; color: #fff;
//   font-size: 8px; font-weight: 700; padding: 1px 5px; border-radius: 6px;
//   letter-spacing: .04em;
// }

// .vid-btn-choose {
//   display: inline-flex; align-items: center; gap: 6px;
//   padding: 9px 18px; border-radius: 100px;
//   color: #fff; font-size: 12px; font-weight: 600; text-decoration: none;
//   border: none; cursor: pointer; position: relative; overflow: hidden;
//   transition: opacity .2s, transform .15s; font-family: inherit;
// }
// .vid-btn-choose::after {
//   content: ''; position: absolute; inset: 0;
//   background: linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
//   background-size: 300px 100%; animation: vid-shimmer 2.5s linear infinite;
// }
// .vid-btn-choose:hover { opacity: .9; transform: translateY(-1px); }

// .vid-devices {
//   padding: 28px 36px;
//   display: flex; align-items: flex-end; justify-content: center;
//   gap: 22px; overflow: hidden; position: relative;
//   flex-wrap: nowrap;
// }

// .vid-dev-label {
//   text-align: center; margin-top: 7px;
//   font-size: 9px; font-weight: 500; color: rgba(26,18,8,.38); letter-spacing: .03em;
// }

// /* PHONE */
// .vid-phone-wrap { animation: vid-float 4.2s ease-in-out infinite; flex-shrink: 0; }
// .vid-phone-frame {
//   width: 86px; height: 178px;
//   border-radius: 19px; border: 3px solid #222; background: #111; overflow: hidden; position: relative;
//   box-shadow: 0 0 0 1px rgba(255,255,255,.06) inset, 0 12px 36px rgba(0,0,0,.32), 0 2px 6px rgba(0,0,0,.2);
// }
// .vid-phone-notch { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 34px; height: 6px; background: #222; border-radius: 0 0 5px 5px; z-index: 10; }
// .vid-phone-side-btn  { position: absolute; right: -3px; top: 50px; width: 3px; height: 20px; background: #333; border-radius: 2px; }
// .vid-phone-side-vol  { position: absolute; left: -3px; top: 46px; width: 3px; height: 13px; background: #333; border-radius: 2px; }
// .vid-phone-side-vol2 { position: absolute; left: -3px; top: 63px; width: 3px; height: 13px; background: #333; border-radius: 2px; }
// .vid-phone-bar       { position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); width: 26px; height: 3px; background: rgba(255,255,255,.2); border-radius: 2px; z-index: 10; }

// /* TABLET */
// .vid-tablet-wrap { animation: vid-float2 5s ease-in-out infinite .9s; flex-shrink: 0; }
// .vid-tablet-frame {
//   width: 136px; height: 192px;
//   border-radius: 15px; border: 3.5px solid #222; background: #111; overflow: hidden; position: relative;
//   box-shadow: 0 0 0 1px rgba(255,255,255,.06) inset, 0 12px 36px rgba(0,0,0,.32), 0 2px 6px rgba(0,0,0,.2);
// }
// .vid-tablet-cam  { position: absolute; top: 5px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; border-radius: 50%; background: #444; z-index: 10; }
// .vid-tablet-side { position: absolute; right: -4px; top: 56px; width: 3px; height: 28px; background: #333; border-radius: 2px; }
// .vid-tablet-bar  { position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); width: 30px; height: 3px; background: rgba(255,255,255,.18); border-radius: 2px; z-index: 10; }

// /* LAPTOP */
// .vid-laptop-wrap { animation: vid-float3 5.8s ease-in-out infinite 1.8s; flex-shrink: 0; }
// .vid-laptop-lid {
//   width: 238px; height: 150px;
//   border-radius: 10px 10px 0 0; border: 3px solid #222; border-bottom: 2px solid #1a1a1a;
//   background: #111; overflow: hidden; position: relative;
//   box-shadow: 0 0 0 1px rgba(255,255,255,.05) inset, 0 -4px 16px rgba(0,0,0,.15);
// }
// .vid-laptop-cam    { position: absolute; top: 4px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; border-radius: 50%; background: #444; z-index: 10; }
// .vid-laptop-scr    { padding-top: 2px; width: 100%; height: 100%; }
// .vid-laptop-hinge  { width: 260px; height: 6px; background: linear-gradient(to bottom,#2a2a2a,#1a1a1a); margin: 0 auto; box-shadow: 0 2px 8px rgba(0,0,0,.28); }
// .vid-laptop-base   { width: 264px; height: 10px; background: linear-gradient(to bottom,#252525,#1c1c1c); border-radius: 0 0 6px 6px; margin: 0 auto; box-shadow: 0 4px 18px rgba(0,0,0,.22); position: relative; }
// .vid-laptop-base::after { content:''; position:absolute; top:3px; left:50%; transform:translateX(-50%); width:44px; height:3px; border-radius:2px; background:rgba(255,255,255,.07); }

// /* QR PHOTO CARD */
// .vid-qr-wrap { animation: vid-float4 4.6s ease-in-out infinite 2.4s; flex-shrink: 0; }
// .vid-qr-card {
//   width: 110px; background: #fff; border-radius: 18px;
//   border: 1px solid rgba(255,107,0,.18);
//   box-shadow: 0 8px 32px rgba(0,0,0,.14), 0 2px 8px rgba(0,0,0,.08), 0 0 0 1px rgba(255,107,0,.08);
//   overflow: hidden; position: relative;
// }
// .vid-qr-top { padding: 10px 10px 8px; text-align: center; position: relative; }
// .vid-qr-top-label { font-size: 6px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #FF6B00; margin-bottom: 6px; display: block; }
// .vid-qr-code {
//   width: 64px; height: 64px; margin: 0 auto 6px; position: relative;
//   border: 2px solid currentColor; border-radius: 6px; padding: 4px;
//   animation: vid-qrPulse 2.4s ease-in-out infinite;
// }
// .vid-qr-grid { width: 100%; height: 100%; display: grid; grid-template-columns: repeat(7,1fr); grid-template-rows: repeat(7,1fr); gap: 1px; }
// .vid-qr-cell { border-radius: 1px; }
// .vid-qr-scan { position: absolute; left: 4px; right: 4px; height: 2px; background: linear-gradient(90deg,transparent,#FF6B00,transparent); border-radius: 1px; animation: vid-scanLine 2s ease-in-out infinite; z-index: 5; }
// .vid-qr-sublabel { font-size: 5.5px; color: rgba(26,18,8,.5); line-height: 1.4; margin-top: 2px; }
// .vid-qr-divider { height: 1px; background: rgba(255,107,0,.1); margin: 0 8px; }
// .vid-qr-photos { padding: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
// .vid-qr-photo { border-radius: 6px; overflow: hidden; aspect-ratio: 1; position: relative; font-size: 18px; display: flex; align-items: center; justify-content: center; }
// .vid-qr-photo:nth-child(1) { animation: vid-photoIn .4s ease .1s both; }
// .vid-qr-photo:nth-child(2) { animation: vid-photoIn .4s ease .3s both; }
// .vid-qr-photo:nth-child(3) { animation: vid-photoIn .4s ease .5s both; }
// .vid-qr-photo:nth-child(4) { animation: vid-photoIn .4s ease .7s both; }
// .vid-qr-photo-new { position: absolute; bottom: 2px; right: 2px; background: #FF6B00; color: #fff; font-size: 4px; font-weight: 700; padding: 1px 3px; border-radius: 3px; letter-spacing: .04em; }
// .vid-qr-counter { display: flex; align-items: center; justify-content: space-between; padding: 5px 9px 7px; font-size: 5.5px; color: rgba(26,18,8,.55); }
// .vid-qr-live { display: inline-flex; align-items: center; gap: 3px; background: #dcfce7; color: #15803d; padding: 2px 6px; border-radius: 8px; font-size: 5px; font-weight: 700; }
// .vid-qr-live-dot { width: 4px; height: 4px; border-radius: 50%; background: #15803d; animation: vid-dot 1.2s ease-in-out infinite; }

// /* TOAST */
// .vid-toast {
//   position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
//   z-index: 9999; display: flex; align-items: center; gap: 12px;
//   background: #1A1208; color: #fff;
//   padding: 14px 24px; border-radius: 100px;
//   font-size: 14px; font-weight: 500;
//   box-shadow: 0 8px 32px rgba(0,0,0,.3);
//   white-space: nowrap;
// }
// .vid-toast.in  { animation: vid-toastIn .3s ease forwards; }
// .vid-toast.out { animation: vid-toastOut .3s ease forwards; }
// .vid-toast-ico { font-size: 18px; }
// .vid-toast-dot { width: 6px; height: 6px; border-radius: 50%; background: #FF6B00; animation: vid-dot 1.2s ease-in-out infinite; }

// /* TICKER */
// .vid-ticker   { overflow: hidden; background: #FF6B00; padding: 10px 0; }
// .vid-ti-inner { display: flex; width: max-content; animation: vid-tick 24s linear infinite; }
// .vid-ti       { display: flex; align-items: center; gap: 10px; padding: 0 32px; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
// .vid-tdot     { width: 4px; height: 4px; background: rgba(255,255,255,.5); border-radius: 50%; }

// /* BOTTOM CTA */
// .vid-cta { text-align: center; margin-top: 72px; opacity: 0; animation: vid-up .8s ease .8s forwards; }
// .vid-cta-h { font-family: 'Cormorant Garamond', serif; font-size: clamp(26px,4vw,42px); font-weight: 300; color: #1A1208; margin-bottom: 12px; }
// .vid-cta-h em { font-style: italic; color: #FF6B00; }
// .vid-cta-sub { font-size: 14px; color: rgba(26,18,8,.6); margin-bottom: 24px; }
// .vid-cta-pill {
//   display: inline-flex; align-items: center; gap: 8px;
//   background: #FFF4ED; border: 1px solid rgba(255,107,0,.25); border-radius: 100px;
//   padding: 7px 20px; font-size: 13px; font-weight: 600; color: #FF6B00; margin-bottom: 22px;
// }
// .vid-cta-btn {
//   display: inline-flex; align-items: center; gap: 9px;
//   padding: 15px 32px; border-radius: 100px;
//   background: #FF6B00; color: #fff; font-size: 15px; font-weight: 600; text-decoration: none;
//   position: relative; overflow: hidden;
//   box-shadow: 0 8px 28px rgba(255,107,0,.38);
//   transition: background .25s, transform .2s, box-shadow .25s;
// }
// .vid-cta-btn::after {
//   content: ''; position: absolute; inset: 0;
//   background: linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
//   background-size: 400px 100%; animation: vid-shimmer 2.5s linear infinite;
// }
// .vid-cta-btn:hover { background: #FF8C35; transform: translateY(-2px); box-shadow: 0 14px 40px rgba(255,107,0,.45); }

// /* SEO hidden text */
// .vid-seo-text {
//   position: absolute; width: 1px; height: 1px; overflow: hidden;
//   clip: rect(0,0,0,0); white-space: nowrap; border: 0;
// }

// /* ══ RESPONSIVE ══ */
// @media (max-width: 1200px) {
//   .vid-devices  { gap: 16px; padding: 24px 28px; }
//   .vid-laptop-lid { width: 200px; height: 126px; }
//   .vid-laptop-hinge { width: 220px; }
//   .vid-laptop-base  { width: 224px; }
//   .vid-qr-card { width: 100px; }
// }
// @media (max-width: 1024px) {
//   .vid-row-body { grid-template-columns: 220px 1fr; }
//   .vid-laptop-lid { width: 175px; height: 110px; }
//   .vid-laptop-hinge { width: 192px; }
//   .vid-laptop-base  { width: 196px; }
//   .vid-devices { gap: 12px; padding: 20px 22px; }
//   .vid-qr-card { width: 90px; }
//   .vid-qr-code { width: 54px; height: 54px; }
// }
// @media (max-width: 768px) {
//   .vid-row-body { grid-template-columns: 1fr; }
//   .vid-info { border-right: none; border-bottom: 1px solid rgba(0,0,0,.06); padding: 26px 22px; }
//   .vid-devices { padding: 24px 20px; gap: 14px; flex-wrap: wrap; justify-content: center; }
//   .vid-laptop-lid { width: 180px; height: 113px; }
//   .vid-laptop-hinge { width: 197px; }
//   .vid-laptop-base  { width: 201px; }
//   .vid-phone-frame { width: 82px; height: 168px; }
//   .vid-tablet-frame { width: 128px; height: 180px; }
//   .vid-filter-tabs { flex-wrap: wrap; justify-content: center; border-radius: 20px; }
// }
// @media (max-width: 560px) {
//   .vid-inner { padding: 32px 16px 52px; }
//   .vid-laptop-wrap { display: none; }
//   .vid-devices { gap: 18px; justify-content: center; flex-wrap: nowrap; }
//   .vid-phone-frame { width: 90px; height: 184px; }
//   .vid-tablet-frame { width: 132px; height: 186px; }
//   .vid-qr-card { width: 96px; }
//   .vid-toast { font-size: 13px; padding: 12px 20px; }
//   .vid-filter-tab { padding: 8px 16px; font-size: 12px; }
// }
// @media (max-width: 380px) {
//   .vid-qr-wrap { display: none; }
// }
// `

// const VSC_CSS = `
// .vsc { width: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden; }
// .vsc-bar { height: 3px; width: 100%; flex-shrink: 0; }
// .vsc-invite-top {
//   flex: 1; display: flex; flex-direction: column;
//   align-items: center; justify-content: center;
//   padding: 10px 8px 6px; text-align: center; position: relative; overflow: hidden;
// }
// .vsc-deco { position: absolute; opacity: .1; font-size: 30px; transform: rotate(15deg); top: 4px; right: 6px; pointer-events: none; }
// .vsc-mono {
//   width: 30px; height: 30px; border-radius: 50%;
//   display: flex; align-items: center; justify-content: center;
//   margin: 0 auto 6px; font-size: 8.5px; font-style: italic;
//   font-weight: 700; position: relative; font-family: 'Cormorant Garamond', serif;
// }
// .vsc-mono-ring { position: absolute; inset: -5px; border-radius: 50%; border: 1px dashed; opacity: .5; animation: vid-spin 18s linear infinite; }
// .vsc-pulse { position: absolute; inset: -8px; border-radius: 50%; border: 1.5px solid; animation: vid-pulse 2.6s ease-out infinite; }
// .vsc-title { font-family: 'Cormorant Garamond', serif; font-size: 9.5px; line-height: 1.35; }
// .vsc-title em { font-style: italic; }
// .vsc-divline { height: 1px; width: 30px; margin: 4px auto; opacity: .5; }
// .vsc-date { font-size: 6px; letter-spacing: .07em; text-transform: uppercase; opacity: .65; margin-bottom: 1px; }
// .vsc-invite-rows { padding: 5px 6px 4px; }
// .vsc-row { display: flex; align-items: center; gap: 4px; padding: 3px 4px; border-radius: 4px; margin-bottom: 2.5px; }
// .vsc-ico { width: 11px; height: 11px; border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 6px; flex-shrink: 0; }
// .vsc-txt-wrap { display: flex; flex-direction: column; }
// .vsc-lbl { font-size: 5px; opacity: .55; line-height: 1.2; }
// .vsc-val { font-size: 6px; font-weight: 600; line-height: 1.2; }
// .vsc-rsvp-btn { margin: 4px 6px 4px; border-radius: 20px; padding: 4px 0; text-align: center; font-size: 5.5px; font-weight: 700; letter-spacing: .07em; cursor: default; }
// .vsc-dash { width: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden; }
// .vsc-dash-nav { height: 17px; display: flex; align-items: center; padding: 0 7px; gap: 4px; flex-shrink: 0; }
// .vsc-dash-dot { width: 5px; height: 5px; border-radius: 50%; }
// .vsc-dash-logo { font-size: 6px; font-weight: 700; opacity: .55; margin-left: 3px; letter-spacing: .03em; }
// .vsc-dash-body { flex: 1; padding: 5px 6px; display: flex; flex-direction: column; gap: 4px; overflow: hidden; }
// .vsc-dash-section { font-size: 5.5px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; opacity: .4; margin-bottom: 2px; }
// .vsc-stats-row { display: flex; gap: 3px; }
// .vsc-stat { flex: 1; border-radius: 5px; padding: 4px 3px; text-align: center; }
// .vsc-stat-num { font-size: 10px; font-weight: 700; line-height: 1; }
// .vsc-stat-lbl { font-size: 4.5px; opacity: .6; margin-top: 1px; }
// .vsc-progress-bar-wrap { border-radius: 3px; overflow: hidden; height: 4px; margin-top: 2px; }
// .vsc-progress-bar { height: 100%; border-radius: 3px; }
// .vsc-guest-item { display: flex; align-items: center; justify-content: space-between; padding: 3.5px 4px; border-radius: 4px; margin-bottom: 2px; }
// .vsc-guest-name { font-size: 5.5px; font-weight: 500; }
// .vsc-guest-badge { font-size: 5px; padding: 1.5px 4px; border-radius: 8px; font-weight: 700; }
// `

// /* ── QR PATTERN ── */
// const QR_PATTERN = [
//   [1,1,1,1,1,1,1],
//   [1,0,0,0,0,0,1],
//   [1,0,1,0,1,0,1],
//   [1,0,0,1,0,0,1],
//   [1,0,1,0,1,0,1],
//   [1,0,0,0,0,0,1],
//   [1,1,1,1,1,1,1],
// ]

// /* ── CATEGORIES ── */
// type Category = 'nunta' | 'botez' | 'aniversare'

// type T = {
//   id: string; name: string; emoji: string; tagline: string; desc: string
//   accent: string; accentSoft: string; pillBg: string; pillText: string
//   barGrad: string; devBg: string
//   invTopBg: string; invBotBg: string; monoColor: string; monoBg: string
//   titleColor: string; divColor: string; rowBg: string; icoBg: string
//   rsvpBg: string; rsvpColor: string; deco: string
//   navBg: string; statBg: string; statColor: string; guestBg: string
//   badgeOk: string; badgeOkText: string; badgePend: string; badgePendText: string
//   progressBg: string; progressFill: string
//   qrBorder: string; qrAccent: string
//   demoPath: string
//   category: Category
//   inviteTitle: string
//   inviteMonogram: string
//   inviteRows: { ico: string; lbl: string; val: string }[]
//   rsvpLabel: string
//   moments: { emoji: string; bg: string; label: string; isNew: boolean }[]
// }

// const THEMES: T[] = [
//   /* ══ NUNTĂ ══ */
//   {
//     id: 'romantic', name: 'Romantic', emoji: '🌹', category: 'nunta',
//     tagline: 'Iubire & Pasiune Eternă',
//     desc: 'Roșu trandafiriu adânc, roz pudrat și petale de bujori. O declarație de dragoste în sine — caldă, senzorială și imposibil de uitat, ca prima seară împreună.',
//     accent: '#9B2335', accentSoft: '#D4687A', pillBg: '#FDEAED', pillText: '#6B1520',
//     barGrad: 'linear-gradient(90deg,#4a0a11,#6B1520,#9B2335,#D4687A,#9B2335,#6B1520,#4a0a11)',
//     devBg: 'linear-gradient(135deg,rgba(155,35,53,.07),rgba(212,104,122,.11))',
//     invTopBg: 'linear-gradient(170deg,#FDEAED,#F8D0D5)', invBotBg: '#fff',
//     monoColor: '#9B2335', monoBg: '#FDEAED', titleColor: '#5A0F1A', divColor: '#D4687A',
//     rowBg: '#FFF5F6', icoBg: '#FDEAED', rsvpBg: '#9B2335', rsvpColor: '#fff', deco: '🌹',
//     navBg: '#FFF5F6', statBg: '#FDEAED', statColor: '#6B1520', guestBg: '#FFF5F6',
//     badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
//     progressBg: '#FDEAED', progressFill: '#9B2335',
//     qrBorder: 'rgba(155,35,53,.22)', qrAccent: '#9B2335',
//     demoPath: '/invitatii-online-nunta-romantic',
//     inviteTitle: 'Vă invităm la\nNunta Noastră',
//     inviteMonogram: 'A&M',
//     inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '18:00' }, { ico: '📍', lbl: 'Locația', val: 'Grand Hotel' }, { ico: '🍽️', lbl: 'Meniu QR', val: 'Scanează ↗' }],
//     rsvpLabel: 'CONFIRMĂ PREZENȚA ♥',
//     moments: [
//       { emoji: '💐', bg: 'linear-gradient(135deg,#fde8dc,#f5d0c0)', label: 'Cununie', isNew: false },
//       { emoji: '🥂', bg: 'linear-gradient(135deg,#fff8e6,#fef0c0)', label: 'Cocktail', isNew: true },
//       { emoji: '💃', bg: 'linear-gradient(135deg,#fdeaed,#f8d0d5)', label: 'Dans', isNew: true },
//       { emoji: '🎂', bg: 'linear-gradient(135deg,#f0fdf4,#d8f3dc)', label: 'Tort', isNew: false },
//     ],
//   },
//   {
//     id: 'nature', name: 'Nature', emoji: '🌿', category: 'nunta',
//     tagline: 'Prospețime & Nou Început',
//     desc: 'Tonuri botanice de verde și mint, inspirate din grădinile înflorite. Perfectă pentru cuplurile care iubesc natura, aerul curat și un nou capitol plin de viață.',
//     accent: '#2D6A4F', accentSoft: '#52B788', pillBg: '#D8F3DC', pillText: '#1B4332',
//     barGrad: 'linear-gradient(90deg,#1B4332,#2D6A4F,#52B788,#2D6A4F,#1B4332)',
//     devBg: 'linear-gradient(135deg,rgba(45,106,79,.08),rgba(82,183,136,.12))',
//     invTopBg: 'linear-gradient(170deg,#D8F3DC,#B7E4C7)', invBotBg: '#fff',
//     monoColor: '#2D6A4F', monoBg: '#D8F3DC', titleColor: '#1B4332', divColor: '#52B788',
//     rowBg: '#F0FDF4', icoBg: '#D8F3DC', rsvpBg: '#2D6A4F', rsvpColor: '#fff', deco: '🍃',
//     navBg: '#F0FDF4', statBg: '#D8F3DC', statColor: '#1B4332', guestBg: '#F0FDF4',
//     badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
//     progressBg: '#D8F3DC', progressFill: '#2D6A4F',
//     qrBorder: 'rgba(45,106,79,.2)', qrAccent: '#2D6A4F',
//     demoPath: '/invitatii-online-nunta-natura',
//     inviteTitle: 'Vă invităm la\nNunta Noastră',
//     inviteMonogram: 'A&M',
//     inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '18:00' }, { ico: '📍', lbl: 'Locația', val: 'Grădina Eden' }, { ico: '🍽️', lbl: 'Meniu QR', val: 'Scanează ↗' }],
//     rsvpLabel: 'CONFIRMĂ PREZENȚA 🌿',
//     moments: [
//       { emoji: '🌸', bg: 'linear-gradient(135deg,#d8f3dc,#b7e4c7)', label: 'Cununie', isNew: false },
//       { emoji: '🍃', bg: 'linear-gradient(135deg,#f0fdf4,#d8f3dc)', label: 'Grădină', isNew: true },
//       { emoji: '🌻', bg: 'linear-gradient(135deg,#fefce8,#fef9c3)', label: 'Dans', isNew: true },
//       { emoji: '🎂', bg: 'linear-gradient(135deg,#f0fdf4,#d8f3dc)', label: 'Tort', isNew: false },
//     ],
//   },
//   {
//     id: 'lux', name: 'Lux', emoji: '✨', category: 'nunta',
//     tagline: 'Opulență & Grandoare',
//     desc: 'Aur veritabil pe negru profund, cu accente de champagne satinat. Pentru cei care nu fac compromisuri — fiecare invitat va simți grandoarea înainte de a păși pe ușă.',
//     accent: '#C9A84C', accentSoft: '#E8C96A', pillBg: '#FFF8E6', pillText: '#7D5A1E',
//     barGrad: 'linear-gradient(90deg,#7D5A1E,#B8860B,#E8C96A,#C9A84C,#E8C96A,#B8860B,#7D5A1E)',
//     devBg: 'linear-gradient(135deg,rgba(26,18,8,.06),rgba(201,168,76,.1))',
//     invTopBg: 'linear-gradient(170deg,#1A1208,#2d1f0e)', invBotBg: '#1A1208',
//     monoColor: '#C9A84C', monoBg: 'rgba(201,168,76,.2)', titleColor: '#F5E6C0', divColor: '#C9A84C',
//     rowBg: 'rgba(255,255,255,.06)', icoBg: 'rgba(201,168,76,.18)', rsvpBg: '#C9A84C', rsvpColor: '#1A1208', deco: '💎',
//     navBg: '#1A1208', statBg: 'rgba(201,168,76,.15)', statColor: '#C9A84C', guestBg: 'rgba(255,255,255,.06)',
//     badgeOk: 'rgba(134,239,172,.18)', badgeOkText: '#86efac', badgePend: 'rgba(254,243,199,.18)', badgePendText: '#fde68a',
//     progressBg: 'rgba(255,255,255,.1)', progressFill: '#C9A84C',
//     qrBorder: 'rgba(201,168,76,.3)', qrAccent: '#C9A84C',
//     demoPath: '/invitatii-online-nunta-lux',
//     inviteTitle: 'Vă invităm la\nNunta Noastră',
//     inviteMonogram: 'A&M',
//     inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '19:00' }, { ico: '📍', lbl: 'Locația', val: 'Palace Grand' }, { ico: '🍽️', lbl: 'Meniu QR', val: 'Scanează ↗' }],
//     rsvpLabel: 'CONFIRMĂ PREZENȚA ✨',
//     moments: [
//       { emoji: '💎', bg: 'linear-gradient(135deg,#2d1f0e,#3d2a12)', label: 'Cununie', isNew: false },
//       { emoji: '🥂', bg: 'linear-gradient(135deg,#fff8e6,#fef0c0)', label: 'Champagne', isNew: true },
//       { emoji: '👑', bg: 'linear-gradient(135deg,#fef9c3,#fde68a)', label: 'Dans', isNew: true },
//       { emoji: '🎂', bg: 'linear-gradient(135deg,#1a1208,#2d1f0e)', label: 'Tort', isNew: false },
//     ],
//   },
//   {
//     id: 'boho', name: 'Boho', emoji: '🌸', category: 'nunta',
//     tagline: 'Libertate & Autenticitate',
//     desc: 'Terracotta cald, roz prăfuit și textura naturală a bumbacului. O invitație ca o îmbrățișare caldă — cu suflet, naturalețe și imperfecțiunile cele mai frumoase.',
//     accent: '#C47A5A', accentSoft: '#E8A87C', pillBg: '#FDE8DC', pillText: '#7D3C1E',
//     barGrad: 'linear-gradient(90deg,#7D3C1E,#C47A5A,#E8A87C,#D4A5A5,#E8A87C,#C47A5A,#7D3C1E)',
//     devBg: 'linear-gradient(135deg,rgba(196,122,90,.08),rgba(232,168,124,.12))',
//     invTopBg: 'linear-gradient(170deg,#FDE8DC,#F5D0C0)', invBotBg: '#fff',
//     monoColor: '#C47A5A', monoBg: '#FDE8DC', titleColor: '#5C2E1A', divColor: '#E8A87C',
//     rowBg: '#FFF5F0', icoBg: '#FDE8DC', rsvpBg: '#C47A5A', rsvpColor: '#fff', deco: '🌺',
//     navBg: '#FFF5F0', statBg: '#FDE8DC', statColor: '#7D3C1E', guestBg: '#FFF5F0',
//     badgeOk: '#D1FAE5', badgeOkText: '#065f46', badgePend: '#FEF3C7', badgePendText: '#92400e',
//     progressBg: '#FDE8DC', progressFill: '#C47A5A',
//     qrBorder: 'rgba(196,122,90,.2)', qrAccent: '#C47A5A',
//     demoPath: '/invitatii-online-nunta-boho',
//     inviteTitle: 'Vă invităm la\nNunta Noastră',
//     inviteMonogram: 'A&M',
//     inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '17:00' }, { ico: '📍', lbl: 'Locația', val: 'Ferma Boho' }, { ico: '🍽️', lbl: 'Meniu QR', val: 'Scanează ↗' }],
//     rsvpLabel: 'CONFIRMĂ PREZENȚA 🌺',
//     moments: [
//       { emoji: '🌾', bg: 'linear-gradient(135deg,#fde8dc,#f5d0c0)', label: 'Cununie', isNew: false },
//       { emoji: '🥂', bg: 'linear-gradient(135deg,#fff8e6,#fde8dc)', label: 'Cocktail', isNew: true },
//       { emoji: '💃', bg: 'linear-gradient(135deg,#fdeaed,#f5d0c0)', label: 'Dans', isNew: true },
//       { emoji: '🎂', bg: 'linear-gradient(135deg,#fde8dc,#f0ece8)', label: 'Tort', isNew: false },
//     ],
//   },
//   {
//     id: 'royal', name: 'Royal', emoji: '👑', category: 'nunta',
//     tagline: 'Majestate & Eleganță Regală',
//     desc: 'Albastru regal profund cu filoane argintii și detalii de catifea. Inspirat din palatele europene — pentru nunți care vor fi povești spuse din generație în generație.',
//     accent: '#2C3E8C', accentSoft: '#5B77D4', pillBg: '#EEF2FF', pillText: '#1A2654',
//     barGrad: 'linear-gradient(90deg,#0f1a3d,#1A2654,#2C3E8C,#8B9FE8,#2C3E8C,#1A2654,#0f1a3d)',
//     devBg: 'linear-gradient(135deg,rgba(26,38,84,.08),rgba(91,119,212,.12))',
//     invTopBg: 'linear-gradient(170deg,#1A2654,#2C3E8C)', invBotBg: '#1A2654',
//     monoColor: '#C0C8E8', monoBg: 'rgba(192,200,232,.15)', titleColor: '#E8EDF8', divColor: '#5B77D4',
//     rowBg: 'rgba(255,255,255,.07)', icoBg: 'rgba(91,119,212,.2)', rsvpBg: '#5B77D4', rsvpColor: '#fff', deco: '⚜️',
//     navBg: '#1A2654', statBg: 'rgba(91,119,212,.15)', statColor: '#8B9FE8', guestBg: 'rgba(255,255,255,.06)',
//     badgeOk: 'rgba(134,239,172,.18)', badgeOkText: '#86efac', badgePend: 'rgba(254,243,199,.15)', badgePendText: '#fde68a',
//     progressBg: 'rgba(255,255,255,.1)', progressFill: '#5B77D4',
//     qrBorder: 'rgba(44,62,140,.22)', qrAccent: '#2C3E8C',
//     demoPath: '/invitatii-online-nunta-royal',
//     inviteTitle: 'Vă invităm la\nNunta Noastră',
//     inviteMonogram: 'A&M',
//     inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '19:00' }, { ico: '📍', lbl: 'Locația', val: 'Palatul Regal' }, { ico: '🍽️', lbl: 'Meniu QR', val: 'Scanează ↗' }],
//     rsvpLabel: 'CONFIRMĂ PREZENȚA ⚜️',
//     moments: [
//       { emoji: '⚜️', bg: 'linear-gradient(135deg,#1a2654,#2c3e8c)', label: 'Cununie', isNew: false },
//       { emoji: '🥂', bg: 'linear-gradient(135deg,#eef2ff,#c7d2fe)', label: 'Cocktail', isNew: true },
//       { emoji: '👑', bg: 'linear-gradient(135deg,#1a2654,#2c3e8c)', label: 'Dans', isNew: true },
//       { emoji: '🎂', bg: 'linear-gradient(135deg,#eef2ff,#dbeafe)', label: 'Tort', isNew: false },
//     ],
//   },
//   {
//     id: 'minimal', name: 'Minimal', emoji: '◻️', category: 'nunta',
//     tagline: 'Mai Puțin Înseamnă Mai Mult',
//     desc: 'Alb imaculat, negru pur și spațiu alb ca formă de design. Pentru cuplurile moderne care cred că eleganța stă în simplitate și că fiecare cuvânt trebuie să conteze.',
//     accent: '#1A1208', accentSoft: '#5A4F44', pillBg: '#F2F0ED', pillText: '#1A1208',
//     barGrad: 'linear-gradient(90deg,#000,#1A1208,#5A4F44,#1A1208,#000)',
//     devBg: 'linear-gradient(135deg,rgba(26,18,8,.04),rgba(90,79,68,.07))',
//     invTopBg: 'linear-gradient(170deg,#F8F7F5,#EEECEA)', invBotBg: '#fff',
//     monoColor: '#1A1208', monoBg: '#EEECEA', titleColor: '#1A1208', divColor: '#CCCAC5',
//     rowBg: '#F8F7F5', icoBg: '#EEECEA', rsvpBg: '#1A1208', rsvpColor: '#fff', deco: '◻',
//     navBg: '#F5F4F2', statBg: '#EEECEA', statColor: '#1A1208', guestBg: '#F8F7F5',
//     badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
//     progressBg: '#EEECEA', progressFill: '#1A1208',
//     qrBorder: 'rgba(26,18,8,.15)', qrAccent: '#1A1208',
//     demoPath: '/invitatii-online-nunta-minimal',
//     inviteTitle: 'Vă invităm la\nNunta Noastră',
//     inviteMonogram: 'A&M',
//     inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '18:00' }, { ico: '📍', lbl: 'Locația', val: 'The White Hall' }, { ico: '🍽️', lbl: 'Meniu QR', val: 'Scanează ↗' }],
//     rsvpLabel: 'CONFIRMĂ PREZENȚA',
//     moments: [
//       { emoji: '🤍', bg: 'linear-gradient(135deg,#f8f7f5,#eeecea)', label: 'Cununie', isNew: false },
//       { emoji: '🥂', bg: 'linear-gradient(135deg,#f5f4f2,#eeecea)', label: 'Cocktail', isNew: true },
//       { emoji: '🖤', bg: 'linear-gradient(135deg,#1a1208,#2d2519)', label: 'Dans', isNew: true },
//       { emoji: '🎂', bg: 'linear-gradient(135deg,#f8f7f5,#eeecea)', label: 'Tort', isNew: false },
//     ],
//   },

//   /* ══ BOTEZ ══ */
//   {
//     id: 'botez-astronaut', name: 'Astronaut', emoji: '🚀', category: 'botez',
//     tagline: 'Aventură & Univers Nou',
//     desc: 'Albastru noapte cu stele strălucitoare și rachete jucăușe. Pentru micul explorator care abia a aterizat în lumea noastră — o invitație la prima lui mare aventură.',
//     accent: '#1E3A8A', accentSoft: '#60A5FA', pillBg: '#EFF6FF', pillText: '#1E3A8A',
//     barGrad: 'linear-gradient(90deg,#0f172a,#1e3a8a,#3b82f6,#60a5fa,#3b82f6,#1e3a8a,#0f172a)',
//     devBg: 'linear-gradient(135deg,rgba(30,58,138,.08),rgba(96,165,250,.14))',
//     invTopBg: 'linear-gradient(170deg,#0f172a,#1e3a8a)', invBotBg: '#0f172a',
//     monoColor: '#60A5FA', monoBg: 'rgba(96,165,250,.18)', titleColor: '#E0F2FE', divColor: '#3B82F6',
//     rowBg: 'rgba(255,255,255,.06)', icoBg: 'rgba(96,165,250,.18)', rsvpBg: '#3B82F6', rsvpColor: '#fff', deco: '⭐',
//     navBg: '#0f172a', statBg: 'rgba(96,165,250,.15)', statColor: '#60A5FA', guestBg: 'rgba(255,255,255,.06)',
//     badgeOk: 'rgba(134,239,172,.2)', badgeOkText: '#86efac', badgePend: 'rgba(254,243,199,.18)', badgePendText: '#fde68a',
//     progressBg: 'rgba(255,255,255,.1)', progressFill: '#3B82F6',
//     qrBorder: 'rgba(59,130,246,.25)', qrAccent: '#3B82F6',
//     demoPath: '/invitatie-botez-online-baiat-astronaut',
//     inviteTitle: 'Veniți să-l\ncunoașteți pe\nMATEI',
//     inviteMonogram: '🚀',
//     inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '13:00' }, { ico: '📍', lbl: 'Locația', val: 'Cosmos Hall' }, { ico: '🎁', lbl: 'Botez', val: '12.04.2025' }],
//     rsvpLabel: 'CONFIRMĂ PREZENȚA 🚀',
//     moments: [
//       { emoji: '🚀', bg: 'linear-gradient(135deg,#0f172a,#1e3a8a)', label: 'Botez', isNew: false },
//       { emoji: '⭐', bg: 'linear-gradient(135deg,#1e3a8a,#3b82f6)', label: 'Petrecere', isNew: true },
//       { emoji: '🎂', bg: 'linear-gradient(135deg,#eff6ff,#dbeafe)', label: 'Tort', isNew: true },
//       { emoji: '🎁', bg: 'linear-gradient(135deg,#0f172a,#1e3a8a)', label: 'Daruri', isNew: false },
//     ],
//   },
//   {
//     id: 'botez-masinuta', name: 'Mașinuță', emoji: '🚗', category: 'botez',
//     tagline: 'Viteză & Aventuri Mici',
//     desc: 'Roșu aprins și carouri de curse pentru micul pilot al familiei. Energic, jucăuș și plin de personalitate — exact cum este băiețelul vostru în fiecare zi.',
//     accent: '#DC2626', accentSoft: '#F87171', pillBg: '#FEF2F2', pillText: '#991B1B',
//     barGrad: 'linear-gradient(90deg,#7f1d1d,#dc2626,#f87171,#fca5a5,#f87171,#dc2626,#7f1d1d)',
//     devBg: 'linear-gradient(135deg,rgba(220,38,38,.07),rgba(248,113,113,.12))',
//     invTopBg: 'linear-gradient(170deg,#FEF2F2,#FEE2E2)', invBotBg: '#fff',
//     monoColor: '#DC2626', monoBg: '#FEE2E2', titleColor: '#7F1D1D', divColor: '#F87171',
//     rowBg: '#FFF5F5', icoBg: '#FEE2E2', rsvpBg: '#DC2626', rsvpColor: '#fff', deco: '🏁',
//     navBg: '#FFF5F5', statBg: '#FEE2E2', statColor: '#991B1B', guestBg: '#FFF5F5',
//     badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
//     progressBg: '#FEE2E2', progressFill: '#DC2626',
//     qrBorder: 'rgba(220,38,38,.2)', qrAccent: '#DC2626',
//     demoPath: '/invitatie-botez-online-baiat-masinuta',
//     inviteTitle: 'Veniți să-l\ncunoașteți pe\nALEX',
//     inviteMonogram: '🚗',
//     inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '13:00' }, { ico: '📍', lbl: 'Locația', val: 'Racing Club' }, { ico: '🎁', lbl: 'Botez', val: '20.04.2025' }],
//     rsvpLabel: 'CONFIRMĂ PREZENȚA 🏁',
//     moments: [
//       { emoji: '🚗', bg: 'linear-gradient(135deg,#fee2e2,#fecaca)', label: 'Botez', isNew: false },
//       { emoji: '🏁', bg: 'linear-gradient(135deg,#fef2f2,#fee2e2)', label: 'Petrecere', isNew: true },
//       { emoji: '🎂', bg: 'linear-gradient(135deg,#fff5f5,#fee2e2)', label: 'Tort', isNew: true },
//       { emoji: '🎁', bg: 'linear-gradient(135deg,#fef2f2,#fecaca)', label: 'Daruri', isNew: false },
//     ],
//   },
//   {
//     id: 'botez-steluta', name: 'Stéluță', emoji: '⭐', category: 'botez',
//     tagline: 'Luminos & Plin de Magie',
//     desc: 'Galben auriu și stele strălucitoare pentru băiețelul care aduce lumină în familia voastră. Cald, radiant și plin de bucurie — ca primul lui zâmbet dimineața.',
//     accent: '#D97706', accentSoft: '#FCD34D', pillBg: '#FFFBEB', pillText: '#92400E',
//     barGrad: 'linear-gradient(90deg,#78350f,#d97706,#fcd34d,#fde68a,#fcd34d,#d97706,#78350f)',
//     devBg: 'linear-gradient(135deg,rgba(217,119,6,.08),rgba(252,211,77,.14))',
//     invTopBg: 'linear-gradient(170deg,#FFFBEB,#FEF3C7)', invBotBg: '#fff',
//     monoColor: '#D97706', monoBg: '#FEF3C7', titleColor: '#78350F', divColor: '#FCD34D',
//     rowBg: '#FFFDF5', icoBg: '#FEF3C7', rsvpBg: '#D97706', rsvpColor: '#fff', deco: '⭐',
//     navBg: '#FFFDF5', statBg: '#FEF3C7', statColor: '#92400E', guestBg: '#FFFDF5',
//     badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
//     progressBg: '#FEF3C7', progressFill: '#D97706',
//     qrBorder: 'rgba(217,119,6,.22)', qrAccent: '#D97706',
//     demoPath: '/invitatie-botez-online-baiat-steluta',
//     inviteTitle: 'Veniți să-l\ncunoașteți pe\nLUCAS',
//     inviteMonogram: '⭐',
//     inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '13:00' }, { ico: '📍', lbl: 'Locația', val: 'Star Garden' }, { ico: '🎁', lbl: 'Botez', val: '27.04.2025' }],
//     rsvpLabel: 'CONFIRMĂ PREZENȚA ⭐',
//     moments: [
//       { emoji: '⭐', bg: 'linear-gradient(135deg,#fffbeb,#fef3c7)', label: 'Botez', isNew: false },
//       { emoji: '✨', bg: 'linear-gradient(135deg,#fef3c7,#fde68a)', label: 'Petrecere', isNew: true },
//       { emoji: '🎂', bg: 'linear-gradient(135deg,#fffdf5,#fef3c7)', label: 'Tort', isNew: true },
//       { emoji: '🎁', bg: 'linear-gradient(135deg,#fffbeb,#fde68a)', label: 'Daruri', isNew: false },
//     ],
//   },
//   {
//     id: 'botez-baloane', name: 'Baloane', emoji: '🎈', category: 'botez',
//     tagline: 'Bucurie & Culori Pastelate',
//     desc: 'Lavandă delicată, roz pudrat și baloane colorate plutind în aer. O petrecere de botez ca un vis — dulce, aerisit și plin de momentele acelea mici care rămân pentru totdeauna.',
//     accent: '#7C3AED', accentSoft: '#C4B5FD', pillBg: '#F5F3FF', pillText: '#5B21B6',
//     barGrad: 'linear-gradient(90deg,#4c1d95,#7c3aed,#a78bfa,#c4b5fd,#a78bfa,#7c3aed,#4c1d95)',
//     devBg: 'linear-gradient(135deg,rgba(124,58,237,.07),rgba(196,181,253,.14))',
//     invTopBg: 'linear-gradient(170deg,#F5F3FF,#EDE9FE)', invBotBg: '#fff',
//     monoColor: '#7C3AED', monoBg: '#EDE9FE', titleColor: '#4C1D95', divColor: '#A78BFA',
//     rowBg: '#FAF8FF', icoBg: '#EDE9FE', rsvpBg: '#7C3AED', rsvpColor: '#fff', deco: '🎈',
//     navBg: '#FAF8FF', statBg: '#EDE9FE', statColor: '#5B21B6', guestBg: '#FAF8FF',
//     badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
//     progressBg: '#EDE9FE', progressFill: '#7C3AED',
//     qrBorder: 'rgba(124,58,237,.2)', qrAccent: '#7C3AED',
//     demoPath: '/invitatie-botez-online-fata-baloane',
//     inviteTitle: 'Veniți s-o\ncunoașteți pe\nSOFIA',
//     inviteMonogram: '🎈',
//     inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '13:00' }, { ico: '📍', lbl: 'Locația', val: 'Pink Garden' }, { ico: '🎁', lbl: 'Botez', val: '04.05.2025' }],
//     rsvpLabel: 'CONFIRMĂ PREZENȚA 🎈',
//     moments: [
//       { emoji: '🎈', bg: 'linear-gradient(135deg,#f5f3ff,#ede9fe)', label: 'Botez', isNew: false },
//       { emoji: '🌸', bg: 'linear-gradient(135deg,#ede9fe,#ddd6fe)', label: 'Petrecere', isNew: true },
//       { emoji: '🎂', bg: 'linear-gradient(135deg,#faf8ff,#ede9fe)', label: 'Tort', isNew: true },
//       { emoji: '🎁', bg: 'linear-gradient(135deg,#f5f3ff,#ddd6fe)', label: 'Daruri', isNew: false },
//     ],
//   },
//   {
//     id: 'botez-fluture', name: 'Fluture', emoji: '🦋', category: 'botez',
//     tagline: 'Delicatețe & Grație Angelică',
//     desc: 'Mint delicat și turcoaz pastelat, cu fluturași și flori de primăvară. Pentru prințesa voastră care tocmai a sosit — gracioasă, pură și gata să exploreze lumea cu curiozitate.',
//     accent: '#0891B2', accentSoft: '#67E8F9', pillBg: '#ECFEFF', pillText: '#164E63',
//     barGrad: 'linear-gradient(90deg,#083344,#0891b2,#22d3ee,#67e8f9,#22d3ee,#0891b2,#083344)',
//     devBg: 'linear-gradient(135deg,rgba(8,145,178,.07),rgba(103,232,249,.14))',
//     invTopBg: 'linear-gradient(170deg,#ECFEFF,#CFFAFE)', invBotBg: '#fff',
//     monoColor: '#0891B2', monoBg: '#CFFAFE', titleColor: '#164E63', divColor: '#22D3EE',
//     rowBg: '#F0FEFF', icoBg: '#CFFAFE', rsvpBg: '#0891B2', rsvpColor: '#fff', deco: '🦋',
//     navBg: '#F0FEFF', statBg: '#CFFAFE', statColor: '#164E63', guestBg: '#F0FEFF',
//     badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
//     progressBg: '#CFFAFE', progressFill: '#0891B2',
//     qrBorder: 'rgba(8,145,178,.2)', qrAccent: '#0891B2',
//     demoPath: '/invitatie-botez-online-fata-fluture',
//     inviteTitle: 'Veniți s-o\ncunoașteți pe\nELENA',
//     inviteMonogram: '🦋',
//     inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '13:00' }, { ico: '📍', lbl: 'Locația', val: 'Butterfly Garden' }, { ico: '🎁', lbl: 'Botez', val: '11.05.2025' }],
//     rsvpLabel: 'CONFIRMĂ PREZENȚA 🦋',
//     moments: [
//       { emoji: '🦋', bg: 'linear-gradient(135deg,#ecfeff,#cffafe)', label: 'Botez', isNew: false },
//       { emoji: '🌸', bg: 'linear-gradient(135deg,#cffafe,#a5f3fc)', label: 'Petrecere', isNew: true },
//       { emoji: '🎂', bg: 'linear-gradient(135deg,#f0feff,#cffafe)', label: 'Tort', isNew: true },
//       { emoji: '🎁', bg: 'linear-gradient(135deg,#ecfeff,#a5f3fc)', label: 'Daruri', isNew: false },
//     ],
//   },
//   {
//     id: 'botez-ursulet', name: 'Ursuleț', emoji: '🐻', category: 'botez',
//     tagline: 'Căldură & Blândețe Pură',
//     desc: 'Bej cald, maro moale și accente de miere aurie. Ursulețul de pluș al familiei a sosit — și vrea să vă cunoască pe toți. O invitație la fel de caldă ca o îmbrățișare.',
//     accent: '#92400E', accentSoft: '#D97706', pillBg: '#FFF7ED', pillText: '#78350F',
//     barGrad: 'linear-gradient(90deg,#431407,#92400e,#d97706,#fbbf24,#d97706,#92400e,#431407)',
//     devBg: 'linear-gradient(135deg,rgba(146,64,14,.07),rgba(217,119,6,.12))',
//     invTopBg: 'linear-gradient(170deg,#FFF7ED,#FEF3C7)', invBotBg: '#fff',
//     monoColor: '#92400E', monoBg: '#FEF3C7', titleColor: '#451A03', divColor: '#D97706',
//     rowBg: '#FFFAF5', icoBg: '#FEF3C7', rsvpBg: '#92400E', rsvpColor: '#fff', deco: '🐻',
//     navBg: '#FFFAF5', statBg: '#FEF3C7', statColor: '#78350F', guestBg: '#FFFAF5',
//     badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
//     progressBg: '#FEF3C7', progressFill: '#92400E',
//     qrBorder: 'rgba(146,64,14,.2)', qrAccent: '#92400E',
//     demoPath: '/invitatie-botez-online-ursulet',
//     inviteTitle: 'Veniți să-l\ncunoașteți pe\nNOAH',
//     inviteMonogram: '🐻',
//     inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '13:00' }, { ico: '📍', lbl: 'Locația', val: 'Honey Bear Hall' }, { ico: '🎁', lbl: 'Botez', val: '18.05.2025' }],
//     rsvpLabel: 'CONFIRMĂ PREZENȚA 🐻',
//     moments: [
//       { emoji: '🐻', bg: 'linear-gradient(135deg,#fff7ed,#fef3c7)', label: 'Botez', isNew: false },
//       { emoji: '🍯', bg: 'linear-gradient(135deg,#fef3c7,#fde68a)', label: 'Petrecere', isNew: true },
//       { emoji: '🎂', bg: 'linear-gradient(135deg,#fffaf5,#fef3c7)', label: 'Tort', isNew: true },
//       { emoji: '🎁', bg: 'linear-gradient(135deg,#fff7ed,#fde68a)', label: 'Daruri', isNew: false },
//     ],
//   },

//   /* ══ ANIVERSARE ══ */
//   {
//     id: 'majorat-18', name: 'Majorat 18', emoji: '🎉', category: 'aniversare',
//     tagline: 'Libertate & Nou Început',
//     desc: 'Negru premium cu accente neon electric și confetti digital. Pentru cel mai important prag din adolescență — o petrecere de majorat care să fie amintită toată viața.',
//     accent: '#7C3AED', accentSoft: '#A78BFA', pillBg: '#F5F3FF', pillText: '#4C1D95',
//     barGrad: 'linear-gradient(90deg,#FF6B00,#7C3AED,#EC4899,#F59E0B,#10B981,#7C3AED,#FF6B00)',
//     devBg: 'linear-gradient(135deg,rgba(124,58,237,.08),rgba(236,72,153,.1))',
//     invTopBg: 'linear-gradient(170deg,#0f0a1e,#1a0f3a)', invBotBg: '#0f0a1e',
//     monoColor: '#A78BFA', monoBg: 'rgba(167,139,250,.18)', titleColor: '#F0EBFF', divColor: '#7C3AED',
//     rowBg: 'rgba(255,255,255,.06)', icoBg: 'rgba(167,139,250,.18)', rsvpBg: 'linear-gradient(135deg,#7C3AED,#EC4899)', rsvpColor: '#fff', deco: '🎊',
//     navBg: '#0f0a1e', statBg: 'rgba(167,139,250,.15)', statColor: '#A78BFA', guestBg: 'rgba(255,255,255,.06)',
//     badgeOk: 'rgba(134,239,172,.2)', badgeOkText: '#86efac', badgePend: 'rgba(254,243,199,.18)', badgePendText: '#fde68a',
//     progressBg: 'rgba(255,255,255,.1)', progressFill: 'linear-gradient(90deg,#7C3AED,#EC4899)',
//     qrBorder: 'rgba(124,58,237,.25)', qrAccent: '#A78BFA',
//     demoPath: '/invitatie-online-aniversare-majorat-18-ani',
//     inviteTitle: 'Sunt\n18 ani!\nHai la petrecere',
//     inviteMonogram: '18',
//     inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '21:00' }, { ico: '📍', lbl: 'Locația', val: 'Club Neon' }, { ico: '🎊', lbl: 'Data', val: '05.06.2025' }],
//     rsvpLabel: '🎉 CONFIRMĂ PREZENȚA',
//     moments: [
//       { emoji: '🎉', bg: 'linear-gradient(135deg,#1a0f3a,#7c3aed)', label: 'Majorat', isNew: false },
//       { emoji: '🥂', bg: 'linear-gradient(135deg,#0f0a1e,#ec4899)', label: 'Party', isNew: true },
//       { emoji: '🎂', bg: 'linear-gradient(135deg,#f5f3ff,#ede9fe)', label: 'Tort', isNew: true },
//       { emoji: '🎊', bg: 'linear-gradient(135deg,#1a0f3a,#f59e0b)', label: 'Surpriză', isNew: false },
//     ],
//   },
// ]

// /* ── CATEGORY META ── */
// const CAT_META: Record<string, { label: string; badge: string; badgeText: string; badgeBg: string }> = {
//   nunta:      { label: 'Nuntă',      badge: '💍', badgeText: '#7D5A1E', badgeBg: '#FFF8E6' },
//   botez:      { label: 'Botez',      badge: '👶', badgeText: '#164E63', badgeBg: '#ECFEFF' },
//   aniversare: { label: 'Aniversare', badge: '🎂', badgeText: '#4C1D95', badgeBg: '#F5F3FF' },
// }

// /* ── SCREEN COMPONENTS ── */
// function InviteScreen({ t }: { t: T }) {
//   const lines = t.inviteTitle.split('\n')
//   return (
//     <div className="vsc" style={{ background: t.invBotBg }}>
//       <div className="vsc-bar" style={{ background: t.barGrad }} />
//       <div className="vsc-invite-top" style={{ background: t.invTopBg }}>
//         <div aria-hidden="true" className="vsc-deco">{t.deco}</div>
//         <div className="vsc-mono" style={{ background: t.monoBg, color: t.monoColor, border: `1.5px solid ${t.monoColor}40` }}>
//           <div className="vsc-mono-ring" style={{ borderColor: t.monoColor }} />
//           <div className="vsc-pulse" style={{ borderColor: t.monoColor + '60' }} />
//           {t.inviteMonogram}
//         </div>
//         <p className="vsc-title" style={{ color: t.titleColor }}>
//           {lines.map((l, i) => (
//             <span key={i}>{i === lines.length - 1 ? <em>{l}</em> : l}<br /></span>
//           ))}
//         </p>
//         <div className="vsc-divline" style={{ background: t.divColor }} />
//         <p className="vsc-date" style={{ color: t.titleColor }}>
//           {t.inviteRows[2]?.val ?? '2025'}
//         </p>
//       </div>
//       <div className="vsc-invite-rows" style={{ background: t.invBotBg }}>
//         {t.inviteRows.map(r => (
//           <div key={r.lbl} className="vsc-row" style={{ background: t.rowBg }}>
//             <div className="vsc-ico" style={{ background: t.icoBg }}>{r.ico}</div>
//             <div className="vsc-txt-wrap">
//               <span className="vsc-lbl" style={{ color: t.titleColor }}>{r.lbl}</span>
//               <span className="vsc-val" style={{ color: t.titleColor }}>{r.val}</span>
//             </div>
//           </div>
//         ))}
//         <div className="vsc-rsvp-btn" style={{ background: typeof t.rsvpBg === 'string' ? t.rsvpBg : '#7C3AED', color: t.rsvpColor }}>
//           {t.rsvpLabel}
//         </div>
//       </div>
//     </div>
//   )
// }

// function DashboardScreen({ t }: { t: T }) {
//   const catLabel = CAT_META[t.category]?.label ?? 'Event'
//   return (
//     <div className="vsc-dash" style={{ background: t.navBg }}>
//       <div className="vsc-dash-nav" style={{ background: t.navBg, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
//         <div className="vsc-dash-dot" style={{ background: '#ff5f57' }} />
//         <div className="vsc-dash-dot" style={{ background: '#ffbd2e' }} />
//         <div className="vsc-dash-dot" style={{ background: '#28c840' }} />
//         <span className="vsc-dash-logo" style={{ color: t.accentSoft }}>VibeInvite</span>
//       </div>
//       <div className="vsc-dash-body">
//         <div className="vsc-dash-section" style={{ color: t.statColor }}>Dashboard · {catLabel}</div>
//         <div className="vsc-stats-row">
//           {[{ n: '48', l: 'Total' }, { n: '32', l: 'Accept' }, { n: '16', l: 'Pend.' }].map(s => (
//             <div key={s.l} className="vsc-stat" style={{ background: t.statBg }}>
//               <div className="vsc-stat-num" style={{ color: t.statColor }}>{s.n}</div>
//               <div className="vsc-stat-lbl" style={{ color: t.statColor }}>{s.l}</div>
//             </div>
//           ))}
//         </div>
//         <div>
//           <div className="vsc-dash-section" style={{ color: t.statColor }}>Participare</div>
//           <div className="vsc-progress-bar-wrap" style={{ background: t.progressBg }}>
//             <div className="vsc-progress-bar" style={{ width: '67%', background: typeof t.progressFill === 'string' ? t.progressFill : t.accent }} />
//           </div>
//         </div>
//         <div>
//           <div className="vsc-dash-section" style={{ color: t.statColor }}>Invitați</div>
//           {[
//             { name: 'Ana M.', ok: true }, { name: 'Elena I.', ok: true },
//             { name: 'Radu P.', ok: false }, { name: 'Laura D.', ok: true },
//           ].map(g => (
//             <div key={g.name} className="vsc-guest-item" style={{ background: t.guestBg }}>
//               <span className="vsc-guest-name" style={{ color: t.titleColor }}>{g.name}</span>
//               <span className="vsc-guest-badge" style={{ background: g.ok ? t.badgeOk : t.badgePend, color: g.ok ? t.badgeOkText : t.badgePendText }}>
//                 {g.ok ? '✓' : '⏳'}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// function QrPhotoCard({ t }: { t: T }) {
//   return (
//     <div className="vid-qr-card" style={{ borderColor: t.qrBorder }}>
//       <div style={{ height: 3, background: t.barGrad }} />
//       <div className="vid-qr-top">
//         <span className="vid-qr-top-label" style={{ color: t.qrAccent }}>📷 Încarcă poze</span>
//         <div className="vid-qr-code" style={{ borderColor: t.qrAccent, color: t.qrAccent }}>
//           <div className="vid-qr-scan" style={{ background: `linear-gradient(90deg,transparent,${t.qrAccent},transparent)` }} />
//           <div className="vid-qr-grid">
//             {QR_PATTERN.flat().map((cell, i) => (
//               <div key={i} className="vid-qr-cell" style={{ background: cell ? t.qrAccent : 'transparent' }} />
//             ))}
//           </div>
//         </div>
//         <p className="vid-qr-sublabel" style={{ color: 'rgba(26,18,8,.45)' }}>
//           Scanează &amp; trimite<br />momentele tale
//         </p>
//       </div>
//       <div className="vid-qr-divider" />
//       <div className="vid-qr-photos">
//         {t.moments.map((m) => (
//           <div key={m.label} className="vid-qr-photo" style={{ background: m.bg }}>
//             <span style={{ fontSize: 20 }}>{m.emoji}</span>
//             {m.isNew && <span className="vid-qr-photo-new">NOU</span>}
//           </div>
//         ))}
//       </div>
//       <div className="vid-qr-counter">
//         <span style={{ color: 'rgba(26,18,8,.5)' }}>247 poze</span>
//         <span className="vid-qr-live">
//           <span className="vid-qr-live-dot" />
//           LIVE
//         </span>
//       </div>
//     </div>
//   )
// }

// /* ── TICKER ── */
// const TICKER = [
//   '🌹 Romantic', '🌿 Nature', '✨ Lux', '🌸 Boho', '👑 Royal', '◻️ Minimal',
//   '🚀 Botez Astronaut', '🚗 Botez Mașinuță', '⭐ Botez Stéluță',
//   '🎈 Botez Baloane', '🦋 Botez Fluture', '🐻 Botez Ursuleț',
//   '🎉 Majorat 18 Ani',
//   '💌 Invitații Nelimitate', '🍽️ Meniu în Invitație', '📷 Upload Poze Live',
//   '📊 Export Excel', '🗂️ Momente Sortate', '💸 300 Lei · O Singură Dată',
// ]

// type FilterKey = 'toate' | Category

// const FILTERS: { key: FilterKey; label: string }[] = [
//   { key: 'toate', label: 'Toate' },
//   { key: 'nunta', label: 'Nuntă 💍' },
//   { key: 'botez', label: 'Botez 👶' },
//   { key: 'aniversare', label: 'Aniversare 🎂' },
// ]

// export default function InvitatiiDigitalePage() {
//   const [activeFilter, setActiveFilter] = useState<FilterKey>('toate')
//   const [toast, setToast] = useState<{ visible: boolean; leaving: boolean; name: string }>({
//     visible: false, leaving: false, name: '',
//   })

//   const filtered = activeFilter === 'toate' ? THEMES : THEMES.filter(t => t.category === activeFilter)

//   function showToast(name: string) {
//     setToast({ visible: true, leaving: false, name })
//     setTimeout(() => {
//       setToast(s => ({ ...s, leaving: true }))
//       setTimeout(() => setToast({ visible: false, leaving: false, name: '' }), 320)
//     }, 2600)
//   }

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: CSS + VSC_CSS }} />

//       <span className="vid-seo-text">
//         Invitații digitale online pentru nuntă, botez și majorat 18 ani. Invitații online nuntă premium.
//         Invitație online aniversare majorat 18 ani. Invitații botez premium România. Invitații nuntă digitale elegante.
//       </span>

//       <div className="vid">
//         <div className="vid-orb vid-o1" aria-hidden="true" />
//         <div className="vid-orb vid-o2" aria-hidden="true" />

//         <div className="vid-ticker" aria-hidden="true">
//           <div className="vid-ti-inner">
//             {[...TICKER, ...TICKER].map((t, i) => (
//               <div key={i} className="vid-ti">{t}<span className="vid-tdot" /></div>
//             ))}
//           </div>
//         </div>

//         <div className="vid-inner">

//           <header className="vid-header">
//             <p className="vid-tagline">🎊 Nuntă · Botez · Majorat — tot ce ai nevoie într-un singur pachet</p>
//             <p className="vid-super"><span className="vid-sdot" />Alege designul invitației tale</p>
//             <h1 className="vid-h1">13 teme <em>premium</em>, fiecare <strong>unică</strong></h1>
//             <p className="vid-lead">
//               Explorează colecția exclusivă VibeInvite: invitații digitale pentru nuntă, botez și majorat 18 ani.
//               Fiecare include invitație digitală, dashboard invitați și meniu în invitație.
//             </p>
//             <div className="vid-lead-pills">
//               {[
//                 { ico: '💌', txt: 'Invitații nelimitate' },
//                 { ico: '🍽️', txt: 'Meniu în Invitație' },
//                 { ico: '📷', txt: 'Poze live de la invitați' },
//                 { ico: '🗂️', txt: 'Momente organizate' },
//                 { ico: '📊', txt: 'Export Excel' },
//               ].map(p => (
//                 <span key={p.txt} className="vid-lead-pill">
//                   <span aria-hidden="true">{p.ico}</span>{p.txt}
//                 </span>
//               ))}
//             </div>
//           </header>

//           {/* FILTER TABS */}
//           <div className="vid-filter-wrap">
//             <div className="vid-filter-tabs" role="tablist" aria-label="Filtrează după categorie">
//               {FILTERS.map(f => (
//                 <button
//                   key={f.key}
//                   role="tab"
//                   aria-selected={activeFilter === f.key}
//                   className={`vid-filter-tab${activeFilter === f.key ? ' active' : ''}`}
//                   onClick={() => setActiveFilter(f.key)}
//                 >
//                   {f.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* ROWS */}
//           <div className="vid-rows" role="list">
//             {filtered.map((theme, idx) => {
//               const cat = CAT_META[theme.category]
//               return (
//                 <article
//                   key={theme.id}
//                   className="vid-row"
//                   role="listitem"
//                   aria-label={`Tema ${theme.name}`}
//                   style={{ animationDelay: `${idx * 0.07}s` }}
//                 >
//                   <div className="vid-row-bar" style={{ background: theme.barGrad }} aria-hidden="true" />

//                   <div className="vid-row-body">
//                     <div className="vid-info">
//                       <div className="vid-cat-badge" style={{ background: cat.badgeBg, color: cat.badgeText }}>
//                         <span>{cat.badge}</span>{cat.label}
//                       </div>
//                       <div className="vid-theme-pill" style={{ background: theme.pillBg, color: theme.pillText }}>
//                         <span aria-hidden="true">{theme.emoji}</span>
//                         {theme.tagline}
//                       </div>
//                       <h2 className="vid-theme-name" style={{ color: theme.accent }}>
//                         <em>{theme.name}</em>
//                       </h2>
//                       <p className="vid-theme-sub">{theme.desc}</p>
//                       <div className="vid-btns">
//                         <Link href={theme.demoPath} className="vid-btn-demo">
//                           Vezi demo
//                         </Link>
//                         <Link
//                           href="/checkout"
//                           className="vid-btn-choose"
//                           style={{ background: theme.accent }}
//                         >
//                           Alege această temă
//                         </Link>
//                       </div>
//                     </div>

//                     <div className="vid-devices" style={{ background: theme.devBg }} aria-hidden="true">
//                       <div className="vid-phone-wrap">
//                         <div className="vid-phone-frame">
//                           <div className="vid-phone-notch" />
//                           <div className="vid-phone-side-btn" />
//                           <div className="vid-phone-side-vol" />
//                           <div className="vid-phone-side-vol2" />
//                           <div className="vid-phone-bar" />
//                           <InviteScreen t={theme} />
//                         </div>
//                         <p className="vid-dev-label">Telefon · Invitație</p>
//                       </div>

//                       <div className="vid-tablet-wrap">
//                         <div className="vid-tablet-frame">
//                           <div className="vid-tablet-cam" />
//                           <div className="vid-tablet-side" />
//                           <div className="vid-tablet-bar" />
//                           <DashboardScreen t={theme} />
//                         </div>
//                         <p className="vid-dev-label">Tabletă · Dashboard</p>
//                       </div>

//                       <div className="vid-laptop-wrap">
//                         <div className="vid-laptop-lid">
//                           <div className="vid-laptop-cam" />
//                           <div className="vid-laptop-scr">
//                             <InviteScreen t={theme} />
//                           </div>
//                         </div>
//                         <div className="vid-laptop-hinge" />
//                         <div className="vid-laptop-base" />
//                         <p className="vid-dev-label">Laptop · Previzualizare</p>
//                       </div>

//                       <div className="vid-qr-wrap">
//                         <QrPhotoCard t={theme} />
//                         <p className="vid-dev-label">QR · Poze Instant</p>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               )
//             })}
//           </div>

//           <div className="vid-cta">
//             <h2 className="vid-cta-h">Ai ales tema? <em>Pasul următor e simplu.</em></h2>
//             <p className="vid-cta-sub">Toate cele 13 teme sunt incluse în pachetul de 300 lei</p>
//             <div><p className="vid-cta-pill"><span aria-hidden="true">💸</span>300 Lei · Plată Unică </p></div>
//             <div style={{ marginTop: 8 }}>
//               <Link href="/checkout" className="vid-cta-btn">
//                 <span aria-hidden="true">✨</span>Creează Invitația
//               </Link>
//             </div>
//           </div>

//         </div>

//         <div className="vid-ticker" aria-hidden="true">
//           <div className="vid-ti-inner" style={{ animationDirection: 'reverse' }}>
//             {[...TICKER, ...TICKER].map((t, i) => (
//               <div key={i} className="vid-ti">{t}<span className="vid-tdot" /></div>
//             ))}
//           </div>
//         </div>

//         {toast.visible && (
//           <div className={`vid-toast ${toast.leaving ? 'out' : 'in'}`} role="status" aria-live="polite">
//             <span className="vid-toast-ico" aria-hidden="true">🚀</span>
//             <span>Demo <strong>{toast.name}</strong> — coming soon</span>
//             <span className="vid-toast-dot" aria-hidden="true" />
//           </div>
//         )}
//       </div>
//     </>
//   )
// }
'use client'

import Link from 'next/link'
import { useState } from 'react'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.vid * { box-sizing: border-box; margin: 0; padding: 0; }

.vid {
  font-family: 'DM Sans', sans-serif;
  background: #FDFAF6;
  color: #1A1208;
  min-height: 100vh;
  overflow-x: hidden;
}

@keyframes vid-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-14px,14px) scale(.96)} }
.vid-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(80px); }
.vid-o1  { width: 500px; height: 500px; background: radial-gradient(circle,rgba(255,107,0,.16) 0%,transparent 70%); top: -100px; right: -80px; animation: vid-orb 14s ease-in-out infinite; }
.vid-o2  { width: 300px; height: 300px; background: radial-gradient(circle,rgba(255,107,0,.09) 0%,transparent 70%); bottom: 80px; left: -50px; animation: vid-orb 18s ease-in-out infinite reverse; }

@keyframes vid-up       { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
@keyframes vid-dot      { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
@keyframes vid-shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
@keyframes vid-tick     { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes vid-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
@keyframes vid-float2   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
@keyframes vid-float3   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
@keyframes vid-float4   { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-8px) rotate(.5deg)} }
@keyframes vid-rowIn    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes vid-pulse    { 0%{transform:scale(.9);opacity:.8} 70%{transform:scale(1.3);opacity:0} 100%{transform:scale(.9);opacity:0} }
@keyframes vid-toastIn  { from{opacity:0;transform:translateY(16px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes vid-toastOut { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(8px) scale(.97)} }
@keyframes vid-spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes vid-qrPulse  { 0%,100%{opacity:.5;transform:scale(.97)} 50%{opacity:1;transform:scale(1)} }
@keyframes vid-scanLine { 0%{top:8px;opacity:1} 80%{top:calc(100% - 12px);opacity:1} 100%{top:8px;opacity:0} }
@keyframes vid-photoIn  { from{opacity:0;transform:scale(.85)} to{opacity:1;transform:scale(1)} }
@keyframes vid-fadeScale { from{opacity:0;transform:scale(.97) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }

.vid-inner {
  position: relative; z-index: 10;
  max-width: 1380px; margin: 0 auto;
  padding: 52px 28px 80px;
}

.vid-header { text-align: center; margin-bottom: 48px; opacity: 0; animation: vid-up .7s ease .1s forwards; }
.vid-super {
  display: inline-flex; align-items: center; gap: 7px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px;
  padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500;
  color: #FF6B00; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 18px;
}
.vid-sdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; animation: vid-dot 1.8s ease-in-out infinite; }
.vid-tagline {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg,#FF6B00,#FF8C35); color: #fff;
  border-radius: 12px; padding: 9px 20px; font-size: 13px; font-weight: 600;
  letter-spacing: .02em; margin-bottom: 20px;
}
.vid-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(32px, 5vw, 60px); font-weight: 300; line-height: 1.07;
  color: #1A1208; margin-bottom: 16px;
}
.vid-h1 em     { font-style: italic; color: #FF6B00; }
.vid-h1 strong { font-weight: 600; }
.vid-lead {
  font-size: 15px; line-height: 1.8; color: rgba(26,18,8,.62);
  max-width: 580px; margin: 0 auto;
}
.vid-lead-pills {
  display: flex; flex-wrap: wrap; gap: 8px;
  justify-content: center; margin-top: 20px;
}
.vid-lead-pill {
  display: inline-flex; align-items: center; gap: 5px;
  background: #fff; border: 1px solid rgba(255,107,0,.18); border-radius: 100px;
  padding: 5px 13px; font-size: 12px; font-weight: 500; color: #1A1208;
}

.vid-filter-wrap {
  display: flex; justify-content: center; margin-bottom: 44px;
  opacity: 0; animation: vid-up .6s ease .3s forwards;
}
.vid-filter-tabs {
  display: inline-flex; gap: 4px;
  background: rgba(255,255,255,.85); backdrop-filter: blur(12px);
  border: 1px solid rgba(0,0,0,.08); border-radius: 100px;
  padding: 5px;
  box-shadow: 0 4px 20px rgba(0,0,0,.07);
}
.vid-filter-tab {
  padding: 9px 22px; border-radius: 100px;
  font-size: 13px; font-weight: 500; cursor: pointer;
  border: none; background: transparent; color: rgba(26,18,8,.55);
  font-family: 'DM Sans', sans-serif;
  transition: color .2s, background .2s, transform .15s, box-shadow .2s;
  white-space: nowrap;
}
.vid-filter-tab:hover { color: #1A1208; background: rgba(255,107,0,.06); }
.vid-filter-tab.active {
  background: #FF6B00; color: #fff;
  box-shadow: 0 4px 14px rgba(255,107,0,.35);
  transform: translateY(-1px);
}

.vid-cat-badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 9px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  padding: 3px 9px; border-radius: 100px; margin-bottom: 8px; width: fit-content;
}

/* FAVORITE BADGE */
.vid-fav-badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 9px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
  padding: 3px 10px; border-radius: 100px; margin-bottom: 8px; margin-left: 6px;
  width: fit-content;
  background: linear-gradient(135deg,#FF6B00,#FF8C35); color: #fff;
  box-shadow: 0 2px 8px rgba(255,107,0,.3);
}

.vid-rows { display: flex; flex-direction: column; gap: 24px; }

.vid-row {
  border-radius: 28px; overflow: hidden;
  border: 1px solid rgba(0,0,0,.07);
  box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 10px 40px rgba(0,0,0,.06);
  background: #fff;
  transition: box-shadow .3s, transform .3s, opacity .35s;
  animation: vid-fadeScale .45s ease both;
}
.vid-row:hover {
  box-shadow: 0 4px 14px rgba(0,0,0,.07), 0 20px 64px rgba(0,0,0,.1);
  transform: translateY(-2px);
}
.vid-row.vid-row-favorite {
  border: 2px solid rgba(255,107,0,.35);
  box-shadow: 0 2px 8px rgba(255,107,0,.08), 0 10px 40px rgba(255,107,0,.12);
}
.vid-row.vid-row-favorite:hover {
  box-shadow: 0 4px 14px rgba(255,107,0,.12), 0 20px 64px rgba(255,107,0,.18);
}

.vid-row-bar { height: 4px; width: 100%; flex-shrink: 0; }

.vid-row-body {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 340px;
}

.vid-info {
  padding: 32px 28px;
  display: flex; flex-direction: column; justify-content: center;
  border-right: 1px solid rgba(0,0,0,.06);
}
.vid-theme-pill {
  display: inline-flex; align-items: center; gap: 6px;
  border-radius: 100px; padding: 4px 13px;
  font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  margin-bottom: 12px; width: fit-content;
}
.vid-theme-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 32px; font-weight: 300; line-height: 1.05; margin-bottom: 8px;
}
.vid-theme-sub { font-size: 12.5px; color: rgba(26,18,8,.58); line-height: 1.65; margin-bottom: 20px; flex: 1; }
.vid-btns { display: flex; gap: 8px; flex-wrap: wrap; }

.vid-btn-demo {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 17px; border-radius: 100px;
  border: 1.5px solid rgba(26,18,8,.16);
  font-size: 12px; font-weight: 500; color: rgba(26,18,8,.75);
  background: transparent; cursor: pointer;
  transition: border-color .2s, color .2s, background .2s; font-family: inherit;
  text-decoration: none;
}
.vid-btn-demo:hover { border-color: #FF6B00; color: #FF6B00; background: #FFF4ED; }

.vid-btn-demo-soon {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 17px; border-radius: 100px;
  border: 1.5px solid rgba(26,18,8,.10);
  font-size: 12px; font-weight: 500; color: rgba(26,18,8,.4);
  background: transparent; cursor: default;
  font-family: inherit; text-decoration: none;
  position: relative;
}
.vid-btn-demo-soon::after {
  content: 'soon';
  position: absolute; top: -6px; right: -4px;
  background: #FF6B00; color: #fff;
  font-size: 8px; font-weight: 700; padding: 1px 5px; border-radius: 6px;
  letter-spacing: .04em;
}

.vid-btn-choose {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 18px; border-radius: 100px;
  color: #fff; font-size: 12px; font-weight: 600; text-decoration: none;
  border: none; cursor: pointer; position: relative; overflow: hidden;
  transition: opacity .2s, transform .15s; font-family: inherit;
}
.vid-btn-choose::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
  background-size: 300px 100%; animation: vid-shimmer 2.5s linear infinite;
}
.vid-btn-choose:hover { opacity: .9; transform: translateY(-1px); }

.vid-devices {
  padding: 28px 36px;
  display: flex; align-items: flex-end; justify-content: center;
  gap: 22px; overflow: hidden; position: relative;
  flex-wrap: nowrap;
}

.vid-dev-label {
  text-align: center; margin-top: 7px;
  font-size: 9px; font-weight: 500; color: rgba(26,18,8,.38); letter-spacing: .03em;
}

.vid-phone-wrap { animation: vid-float 4.2s ease-in-out infinite; flex-shrink: 0; }
.vid-phone-frame {
  width: 86px; height: 178px;
  border-radius: 19px; border: 3px solid #222; background: #111; overflow: hidden; position: relative;
  box-shadow: 0 0 0 1px rgba(255,255,255,.06) inset, 0 12px 36px rgba(0,0,0,.32), 0 2px 6px rgba(0,0,0,.2);
}
.vid-phone-notch { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 34px; height: 6px; background: #222; border-radius: 0 0 5px 5px; z-index: 10; }
.vid-phone-side-btn  { position: absolute; right: -3px; top: 50px; width: 3px; height: 20px; background: #333; border-radius: 2px; }
.vid-phone-side-vol  { position: absolute; left: -3px; top: 46px; width: 3px; height: 13px; background: #333; border-radius: 2px; }
.vid-phone-side-vol2 { position: absolute; left: -3px; top: 63px; width: 3px; height: 13px; background: #333; border-radius: 2px; }
.vid-phone-bar       { position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); width: 26px; height: 3px; background: rgba(255,255,255,.2); border-radius: 2px; z-index: 10; }

.vid-tablet-wrap { animation: vid-float2 5s ease-in-out infinite .9s; flex-shrink: 0; }
.vid-tablet-frame {
  width: 136px; height: 192px;
  border-radius: 15px; border: 3.5px solid #222; background: #111; overflow: hidden; position: relative;
  box-shadow: 0 0 0 1px rgba(255,255,255,.06) inset, 0 12px 36px rgba(0,0,0,.32), 0 2px 6px rgba(0,0,0,.2);
}
.vid-tablet-cam  { position: absolute; top: 5px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; border-radius: 50%; background: #444; z-index: 10; }
.vid-tablet-side { position: absolute; right: -4px; top: 56px; width: 3px; height: 28px; background: #333; border-radius: 2px; }
.vid-tablet-bar  { position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); width: 30px; height: 3px; background: rgba(255,255,255,.18); border-radius: 2px; z-index: 10; }

.vid-laptop-wrap { animation: vid-float3 5.8s ease-in-out infinite 1.8s; flex-shrink: 0; }
.vid-laptop-lid {
  width: 238px; height: 150px;
  border-radius: 10px 10px 0 0; border: 3px solid #222; border-bottom: 2px solid #1a1a1a;
  background: #111; overflow: hidden; position: relative;
  box-shadow: 0 0 0 1px rgba(255,255,255,.05) inset, 0 -4px 16px rgba(0,0,0,.15);
}
.vid-laptop-cam    { position: absolute; top: 4px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; border-radius: 50%; background: #444; z-index: 10; }
.vid-laptop-scr    { padding-top: 2px; width: 100%; height: 100%; }
.vid-laptop-hinge  { width: 260px; height: 6px; background: linear-gradient(to bottom,#2a2a2a,#1a1a1a); margin: 0 auto; box-shadow: 0 2px 8px rgba(0,0,0,.28); }
.vid-laptop-base   { width: 264px; height: 10px; background: linear-gradient(to bottom,#252525,#1c1c1c); border-radius: 0 0 6px 6px; margin: 0 auto; box-shadow: 0 4px 18px rgba(0,0,0,.22); position: relative; }
.vid-laptop-base::after { content:''; position:absolute; top:3px; left:50%; transform:translateX(-50%); width:44px; height:3px; border-radius:2px; background:rgba(255,255,255,.07); }

.vid-qr-wrap { animation: vid-float4 4.6s ease-in-out infinite 2.4s; flex-shrink: 0; }
.vid-qr-card {
  width: 110px; background: #fff; border-radius: 18px;
  border: 1px solid rgba(255,107,0,.18);
  box-shadow: 0 8px 32px rgba(0,0,0,.14), 0 2px 8px rgba(0,0,0,.08), 0 0 0 1px rgba(255,107,0,.08);
  overflow: hidden; position: relative;
}
.vid-qr-top { padding: 10px 10px 8px; text-align: center; position: relative; }
.vid-qr-top-label { font-size: 6px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #FF6B00; margin-bottom: 6px; display: block; }
.vid-qr-code {
  width: 64px; height: 64px; margin: 0 auto 6px; position: relative;
  border: 2px solid currentColor; border-radius: 6px; padding: 4px;
  animation: vid-qrPulse 2.4s ease-in-out infinite;
}
.vid-qr-grid { width: 100%; height: 100%; display: grid; grid-template-columns: repeat(7,1fr); grid-template-rows: repeat(7,1fr); gap: 1px; }
.vid-qr-cell { border-radius: 1px; }
.vid-qr-scan { position: absolute; left: 4px; right: 4px; height: 2px; background: linear-gradient(90deg,transparent,#FF6B00,transparent); border-radius: 1px; animation: vid-scanLine 2s ease-in-out infinite; z-index: 5; }
.vid-qr-sublabel { font-size: 5.5px; color: rgba(26,18,8,.5); line-height: 1.4; margin-top: 2px; }
.vid-qr-divider { height: 1px; background: rgba(255,107,0,.1); margin: 0 8px; }
.vid-qr-photos { padding: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
.vid-qr-photo { border-radius: 6px; overflow: hidden; aspect-ratio: 1; position: relative; font-size: 18px; display: flex; align-items: center; justify-content: center; }
.vid-qr-photo:nth-child(1) { animation: vid-photoIn .4s ease .1s both; }
.vid-qr-photo:nth-child(2) { animation: vid-photoIn .4s ease .3s both; }
.vid-qr-photo:nth-child(3) { animation: vid-photoIn .4s ease .5s both; }
.vid-qr-photo:nth-child(4) { animation: vid-photoIn .4s ease .7s both; }
.vid-qr-photo-new { position: absolute; bottom: 2px; right: 2px; background: #FF6B00; color: #fff; font-size: 4px; font-weight: 700; padding: 1px 3px; border-radius: 3px; letter-spacing: .04em; }
.vid-qr-counter { display: flex; align-items: center; justify-content: space-between; padding: 5px 9px 7px; font-size: 5.5px; color: rgba(26,18,8,.55); }
.vid-qr-live { display: inline-flex; align-items: center; gap: 3px; background: #dcfce7; color: #15803d; padding: 2px 6px; border-radius: 8px; font-size: 5px; font-weight: 700; }
.vid-qr-live-dot { width: 4px; height: 4px; border-radius: 50%; background: #15803d; animation: vid-dot 1.2s ease-in-out infinite; }

.vid-toast {
  position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
  z-index: 9999; display: flex; align-items: center; gap: 12px;
  background: #1A1208; color: #fff;
  padding: 14px 24px; border-radius: 100px;
  font-size: 14px; font-weight: 500;
  box-shadow: 0 8px 32px rgba(0,0,0,.3);
  white-space: nowrap;
}
.vid-toast.in  { animation: vid-toastIn .3s ease forwards; }
.vid-toast.out { animation: vid-toastOut .3s ease forwards; }
.vid-toast-ico { font-size: 18px; }
.vid-toast-dot { width: 6px; height: 6px; border-radius: 50%; background: #FF6B00; animation: vid-dot 1.2s ease-in-out infinite; }

.vid-ticker   { overflow: hidden; background: #FF6B00; padding: 10px 0; }
.vid-ti-inner { display: flex; width: max-content; animation: vid-tick 24s linear infinite; }
.vid-ti       { display: flex; align-items: center; gap: 10px; padding: 0 32px; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
.vid-tdot     { width: 4px; height: 4px; background: rgba(255,255,255,.5); border-radius: 50%; }

.vid-cta { text-align: center; margin-top: 72px; opacity: 0; animation: vid-up .8s ease .8s forwards; }
.vid-cta-h { font-family: 'Cormorant Garamond', serif; font-size: clamp(26px,4vw,42px); font-weight: 300; color: #1A1208; margin-bottom: 12px; }
.vid-cta-h em { font-style: italic; color: #FF6B00; }
.vid-cta-sub { font-size: 14px; color: rgba(26,18,8,.6); margin-bottom: 24px; }
.vid-cta-pill {
  display: inline-flex; align-items: center; gap: 8px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.25); border-radius: 100px;
  padding: 7px 20px; font-size: 13px; font-weight: 600; color: #FF6B00; margin-bottom: 22px;
}
.vid-cta-btn {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 15px 32px; border-radius: 100px;
  background: #FF6B00; color: #fff; font-size: 15px; font-weight: 600; text-decoration: none;
  position: relative; overflow: hidden;
  box-shadow: 0 8px 28px rgba(255,107,0,.38);
  transition: background .25s, transform .2s, box-shadow .25s;
}
.vid-cta-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
  background-size: 400px 100%; animation: vid-shimmer 2.5s linear infinite;
}
.vid-cta-btn:hover { background: #FF8C35; transform: translateY(-2px); box-shadow: 0 14px 40px rgba(255,107,0,.45); }

.vid-seo-text {
  position: absolute; width: 1px; height: 1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

@media (max-width: 1200px) {
  .vid-devices  { gap: 16px; padding: 24px 28px; }
  .vid-laptop-lid { width: 200px; height: 126px; }
  .vid-laptop-hinge { width: 220px; }
  .vid-laptop-base  { width: 224px; }
  .vid-qr-card { width: 100px; }
}
@media (max-width: 1024px) {
  .vid-row-body { grid-template-columns: 220px 1fr; }
  .vid-laptop-lid { width: 175px; height: 110px; }
  .vid-laptop-hinge { width: 192px; }
  .vid-laptop-base  { width: 196px; }
  .vid-devices { gap: 12px; padding: 20px 22px; }
  .vid-qr-card { width: 90px; }
  .vid-qr-code { width: 54px; height: 54px; }
}
@media (max-width: 768px) {
  .vid-row-body { grid-template-columns: 1fr; }
  .vid-info { border-right: none; border-bottom: 1px solid rgba(0,0,0,.06); padding: 26px 22px; }
  .vid-devices { padding: 24px 20px; gap: 14px; flex-wrap: wrap; justify-content: center; }
  .vid-laptop-lid { width: 180px; height: 113px; }
  .vid-laptop-hinge { width: 197px; }
  .vid-laptop-base  { width: 201px; }
  .vid-phone-frame { width: 82px; height: 168px; }
  .vid-tablet-frame { width: 128px; height: 180px; }
  .vid-filter-tabs { flex-wrap: wrap; justify-content: center; border-radius: 20px; }
}
@media (max-width: 560px) {
  .vid-inner { padding: 32px 16px 52px; }
  .vid-laptop-wrap { display: none; }
  .vid-devices { gap: 18px; justify-content: center; flex-wrap: nowrap; }
  .vid-phone-frame { width: 90px; height: 184px; }
  .vid-tablet-frame { width: 132px; height: 186px; }
  .vid-qr-card { width: 96px; }
  .vid-toast { font-size: 13px; padding: 12px 20px; }
  .vid-filter-tab { padding: 8px 16px; font-size: 12px; }
}
@media (max-width: 380px) {
  .vid-qr-wrap { display: none; }
}
`

const VSC_CSS = `
.vsc { width: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden; }
.vsc-bar { height: 3px; width: 100%; flex-shrink: 0; }
.vsc-invite-top {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 10px 8px 6px; text-align: center; position: relative; overflow: hidden;
}
.vsc-deco { position: absolute; opacity: .1; font-size: 30px; transform: rotate(15deg); top: 4px; right: 6px; pointer-events: none; }
.vsc-mono {
  width: 30px; height: 30px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 6px; font-size: 8.5px; font-style: italic;
  font-weight: 700; position: relative; font-family: 'Cormorant Garamond', serif;
}
.vsc-mono-ring { position: absolute; inset: -5px; border-radius: 50%; border: 1px dashed; opacity: .5; animation: vid-spin 18s linear infinite; }
.vsc-pulse { position: absolute; inset: -8px; border-radius: 50%; border: 1.5px solid; animation: vid-pulse 2.6s ease-out infinite; }
.vsc-title { font-family: 'Cormorant Garamond', serif; font-size: 9.5px; line-height: 1.35; }
.vsc-title em { font-style: italic; }
.vsc-divline { height: 1px; width: 30px; margin: 4px auto; opacity: .5; }
.vsc-date { font-size: 6px; letter-spacing: .07em; text-transform: uppercase; opacity: .65; margin-bottom: 1px; }
.vsc-invite-rows { padding: 5px 6px 4px; }
.vsc-row { display: flex; align-items: center; gap: 4px; padding: 3px 4px; border-radius: 4px; margin-bottom: 2.5px; }
.vsc-ico { width: 11px; height: 11px; border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 6px; flex-shrink: 0; }
.vsc-txt-wrap { display: flex; flex-direction: column; }
.vsc-lbl { font-size: 5px; opacity: .55; line-height: 1.2; }
.vsc-val { font-size: 6px; font-weight: 600; line-height: 1.2; }
.vsc-rsvp-btn { margin: 4px 6px 4px; border-radius: 20px; padding: 4px 0; text-align: center; font-size: 5.5px; font-weight: 700; letter-spacing: .07em; cursor: default; }
.vsc-dash { width: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden; }
.vsc-dash-nav { height: 17px; display: flex; align-items: center; padding: 0 7px; gap: 4px; flex-shrink: 0; }
.vsc-dash-dot { width: 5px; height: 5px; border-radius: 50%; }
.vsc-dash-logo { font-size: 6px; font-weight: 700; opacity: .55; margin-left: 3px; letter-spacing: .03em; }
.vsc-dash-body { flex: 1; padding: 5px 6px; display: flex; flex-direction: column; gap: 4px; overflow: hidden; }
.vsc-dash-section { font-size: 5.5px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; opacity: .4; margin-bottom: 2px; }
.vsc-stats-row { display: flex; gap: 3px; }
.vsc-stat { flex: 1; border-radius: 5px; padding: 4px 3px; text-align: center; }
.vsc-stat-num { font-size: 10px; font-weight: 700; line-height: 1; }
.vsc-stat-lbl { font-size: 4.5px; opacity: .6; margin-top: 1px; }
.vsc-progress-bar-wrap { border-radius: 3px; overflow: hidden; height: 4px; margin-top: 2px; }
.vsc-progress-bar { height: 100%; border-radius: 3px; }
.vsc-guest-item { display: flex; align-items: center; justify-content: space-between; padding: 3.5px 4px; border-radius: 4px; margin-bottom: 2px; }
.vsc-guest-name { font-size: 5.5px; font-weight: 500; }
.vsc-guest-badge { font-size: 5px; padding: 1.5px 4px; border-radius: 8px; font-weight: 700; }
`

const QR_PATTERN = [
  [1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1],
  [1,0,1,0,1,0,1],
  [1,0,0,1,0,0,1],
  [1,0,1,0,1,0,1],
  [1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1],
]

type Category = 'nunta' | 'botez' | 'aniversare'

type T = {
  id: string; name: string; emoji: string; tagline: string; desc: string
  accent: string; accentSoft: string; pillBg: string; pillText: string
  barGrad: string; devBg: string
  invTopBg: string; invBotBg: string; monoColor: string; monoBg: string
  titleColor: string; divColor: string; rowBg: string; icoBg: string
  rsvpBg: string; rsvpColor: string; deco: string
  navBg: string; statBg: string; statColor: string; guestBg: string
  badgeOk: string; badgeOkText: string; badgePend: string; badgePendText: string
  progressBg: string; progressFill: string
  qrBorder: string; qrAccent: string
  demoPath: string
  category: Category
  inviteTitle: string
  inviteMonogram: string
  inviteRows: { ico: string; lbl: string; val: string }[]
  rsvpLabel: string
  moments: { emoji: string; bg: string; label: string; isNew: boolean }[]
  favorite?: boolean
}

const THEMES: T[] = [
  /* ══ NUNTĂ ══ */
  {
    id: 'romantic', name: 'Romantic', emoji: '🌹', category: 'nunta',
    tagline: 'Iubire & Pasiune Eternă',
    desc: 'Roșu trandafiriu adânc, roz pudrat și petale de bujori. O declarație de dragoste în sine — caldă, senzorială și imposibil de uitat, ca prima seară împreună.',
    accent: '#9B2335', accentSoft: '#D4687A', pillBg: '#FDEAED', pillText: '#6B1520',
    barGrad: 'linear-gradient(90deg,#4a0a11,#6B1520,#9B2335,#D4687A,#9B2335,#6B1520,#4a0a11)',
    devBg: 'linear-gradient(135deg,rgba(155,35,53,.07),rgba(212,104,122,.11))',
    invTopBg: 'linear-gradient(170deg,#FDEAED,#F8D0D5)', invBotBg: '#fff',
    monoColor: '#9B2335', monoBg: '#FDEAED', titleColor: '#5A0F1A', divColor: '#D4687A',
    rowBg: '#FFF5F6', icoBg: '#FDEAED', rsvpBg: '#9B2335', rsvpColor: '#fff', deco: '🌹',
    navBg: '#FFF5F6', statBg: '#FDEAED', statColor: '#6B1520', guestBg: '#FFF5F6',
    badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
    progressBg: '#FDEAED', progressFill: '#9B2335',
    qrBorder: 'rgba(155,35,53,.22)', qrAccent: '#9B2335',
    demoPath: '/invitatii-online-nunta-romantic',
    inviteTitle: 'Vă invităm la\nNunta Noastră',
    inviteMonogram: 'A&M',
    inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '18:00' }, { ico: '📍', lbl: 'Locația', val: 'Grand Hotel' }, { ico: '🍽️', lbl: 'Meniu QR', val: 'Scanează ↗' }],
    rsvpLabel: 'CONFIRMĂ PREZENȚA ♥',
    moments: [
      { emoji: '💐', bg: 'linear-gradient(135deg,#fde8dc,#f5d0c0)', label: 'Cununie', isNew: false },
      { emoji: '🥂', bg: 'linear-gradient(135deg,#fff8e6,#fef0c0)', label: 'Cocktail', isNew: true },
      { emoji: '💃', bg: 'linear-gradient(135deg,#fdeaed,#f8d0d5)', label: 'Dans', isNew: true },
      { emoji: '🎂', bg: 'linear-gradient(135deg,#f0fdf4,#d8f3dc)', label: 'Tort', isNew: false },
    ],
  },
  {
    id: 'nature', name: 'Nature', emoji: '🌿', category: 'nunta',
    tagline: 'Prospețime & Nou Început',
    desc: 'Tonuri botanice de verde și mint, inspirate din grădinile înflorite. Perfectă pentru cuplurile care iubesc natura, aerul curat și un nou capitol plin de viață.',
    accent: '#2D6A4F', accentSoft: '#52B788', pillBg: '#D8F3DC', pillText: '#1B4332',
    barGrad: 'linear-gradient(90deg,#1B4332,#2D6A4F,#52B788,#2D6A4F,#1B4332)',
    devBg: 'linear-gradient(135deg,rgba(45,106,79,.08),rgba(82,183,136,.12))',
    invTopBg: 'linear-gradient(170deg,#D8F3DC,#B7E4C7)', invBotBg: '#fff',
    monoColor: '#2D6A4F', monoBg: '#D8F3DC', titleColor: '#1B4332', divColor: '#52B788',
    rowBg: '#F0FDF4', icoBg: '#D8F3DC', rsvpBg: '#2D6A4F', rsvpColor: '#fff', deco: '🍃',
    navBg: '#F0FDF4', statBg: '#D8F3DC', statColor: '#1B4332', guestBg: '#F0FDF4',
    badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
    progressBg: '#D8F3DC', progressFill: '#2D6A4F',
    qrBorder: 'rgba(45,106,79,.2)', qrAccent: '#2D6A4F',
    demoPath: '/invitatii-online-nunta-natura',
    inviteTitle: 'Vă invităm la\nNunta Noastră',
    inviteMonogram: 'A&M',
    inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '18:00' }, { ico: '📍', lbl: 'Locația', val: 'Grădina Eden' }, { ico: '🍽️', lbl: 'Meniu QR', val: 'Scanează ↗' }],
    rsvpLabel: 'CONFIRMĂ PREZENȚA 🌿',
    moments: [
      { emoji: '🌸', bg: 'linear-gradient(135deg,#d8f3dc,#b7e4c7)', label: 'Cununie', isNew: false },
      { emoji: '🍃', bg: 'linear-gradient(135deg,#f0fdf4,#d8f3dc)', label: 'Grădină', isNew: true },
      { emoji: '🌻', bg: 'linear-gradient(135deg,#fefce8,#fef9c3)', label: 'Dans', isNew: true },
      { emoji: '🎂', bg: 'linear-gradient(135deg,#f0fdf4,#d8f3dc)', label: 'Tort', isNew: false },
    ],
  },
  {
    id: 'lux', name: 'Lux', emoji: '✨', category: 'nunta',
    tagline: 'Opulență & Grandoare',
    desc: 'Aur veritabil pe negru profund, cu accente de champagne satinat. Pentru cei care nu fac compromisuri — fiecare invitat va simți grandoarea înainte de a păși pe ușă.',
    accent: '#C9A84C', accentSoft: '#E8C96A', pillBg: '#FFF8E6', pillText: '#7D5A1E',
    barGrad: 'linear-gradient(90deg,#7D5A1E,#B8860B,#E8C96A,#C9A84C,#E8C96A,#B8860B,#7D5A1E)',
    devBg: 'linear-gradient(135deg,rgba(26,18,8,.06),rgba(201,168,76,.1))',
    invTopBg: 'linear-gradient(170deg,#1A1208,#2d1f0e)', invBotBg: '#1A1208',
    monoColor: '#C9A84C', monoBg: 'rgba(201,168,76,.2)', titleColor: '#F5E6C0', divColor: '#C9A84C',
    rowBg: 'rgba(255,255,255,.06)', icoBg: 'rgba(201,168,76,.18)', rsvpBg: '#C9A84C', rsvpColor: '#1A1208', deco: '💎',
    navBg: '#1A1208', statBg: 'rgba(201,168,76,.15)', statColor: '#C9A84C', guestBg: 'rgba(255,255,255,.06)',
    badgeOk: 'rgba(134,239,172,.18)', badgeOkText: '#86efac', badgePend: 'rgba(254,243,199,.18)', badgePendText: '#fde68a',
    progressBg: 'rgba(255,255,255,.1)', progressFill: '#C9A84C',
    qrBorder: 'rgba(201,168,76,.3)', qrAccent: '#C9A84C',
    demoPath: '/invitatii-online-nunta-lux',
    inviteTitle: 'Vă invităm la\nNunta Noastră',
    inviteMonogram: 'A&M',
    inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '19:00' }, { ico: '📍', lbl: 'Locația', val: 'Palace Grand' }, { ico: '🍽️', lbl: 'Meniu QR', val: 'Scanează ↗' }],
    rsvpLabel: 'CONFIRMĂ PREZENȚA ✨',
    moments: [
      { emoji: '💎', bg: 'linear-gradient(135deg,#2d1f0e,#3d2a12)', label: 'Cununie', isNew: false },
      { emoji: '🥂', bg: 'linear-gradient(135deg,#fff8e6,#fef0c0)', label: 'Champagne', isNew: true },
      { emoji: '👑', bg: 'linear-gradient(135deg,#fef9c3,#fde68a)', label: 'Dans', isNew: true },
      { emoji: '🎂', bg: 'linear-gradient(135deg,#1a1208,#2d1f0e)', label: 'Tort', isNew: false },
    ],
  },
  {
    id: 'boho', name: 'Boho', emoji: '🌸', category: 'nunta',
    tagline: 'Libertate & Autenticitate',
    desc: 'Terracotta cald, roz prăfuit și textura naturală a bumbacului. O invitație ca o îmbrățișare caldă — cu suflet, naturalețe și imperfecțiunile cele mai frumoase.',
    accent: '#C47A5A', accentSoft: '#E8A87C', pillBg: '#FDE8DC', pillText: '#7D3C1E',
    barGrad: 'linear-gradient(90deg,#7D3C1E,#C47A5A,#E8A87C,#D4A5A5,#E8A87C,#C47A5A,#7D3C1E)',
    devBg: 'linear-gradient(135deg,rgba(196,122,90,.08),rgba(232,168,124,.12))',
    invTopBg: 'linear-gradient(170deg,#FDE8DC,#F5D0C0)', invBotBg: '#fff',
    monoColor: '#C47A5A', monoBg: '#FDE8DC', titleColor: '#5C2E1A', divColor: '#E8A87C',
    rowBg: '#FFF5F0', icoBg: '#FDE8DC', rsvpBg: '#C47A5A', rsvpColor: '#fff', deco: '🌺',
    navBg: '#FFF5F0', statBg: '#FDE8DC', statColor: '#7D3C1E', guestBg: '#FFF5F0',
    badgeOk: '#D1FAE5', badgeOkText: '#065f46', badgePend: '#FEF3C7', badgePendText: '#92400e',
    progressBg: '#FDE8DC', progressFill: '#C47A5A',
    qrBorder: 'rgba(196,122,90,.2)', qrAccent: '#C47A5A',
    demoPath: '/invitatii-online-nunta-boho',
    inviteTitle: 'Vă invităm la\nNunta Noastră',
    inviteMonogram: 'A&M',
    inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '17:00' }, { ico: '📍', lbl: 'Locația', val: 'Ferma Boho' }, { ico: '🍽️', lbl: 'Meniu QR', val: 'Scanează ↗' }],
    rsvpLabel: 'CONFIRMĂ PREZENȚA 🌺',
    moments: [
      { emoji: '🌾', bg: 'linear-gradient(135deg,#fde8dc,#f5d0c0)', label: 'Cununie', isNew: false },
      { emoji: '🥂', bg: 'linear-gradient(135deg,#fff8e6,#fde8dc)', label: 'Cocktail', isNew: true },
      { emoji: '💃', bg: 'linear-gradient(135deg,#fdeaed,#f5d0c0)', label: 'Dans', isNew: true },
      { emoji: '🎂', bg: 'linear-gradient(135deg,#fde8dc,#f0ece8)', label: 'Tort', isNew: false },
    ],
    favorite: true,
  },
  {
    id: 'royal', name: 'Royal', emoji: '👑', category: 'nunta',
    tagline: 'Majestate & Eleganță Regală',
    desc: 'Albastru regal profund cu filoane argintii și detalii de catifea. Inspirat din palatele europene — pentru nunți care vor fi povești spuse din generație în generație.',
    accent: '#2C3E8C', accentSoft: '#5B77D4', pillBg: '#EEF2FF', pillText: '#1A2654',
    barGrad: 'linear-gradient(90deg,#0f1a3d,#1A2654,#2C3E8C,#8B9FE8,#2C3E8C,#1A2654,#0f1a3d)',
    devBg: 'linear-gradient(135deg,rgba(26,38,84,.08),rgba(91,119,212,.12))',
    invTopBg: 'linear-gradient(170deg,#1A2654,#2C3E8C)', invBotBg: '#1A2654',
    monoColor: '#C0C8E8', monoBg: 'rgba(192,200,232,.15)', titleColor: '#E8EDF8', divColor: '#5B77D4',
    rowBg: 'rgba(255,255,255,.07)', icoBg: 'rgba(91,119,212,.2)', rsvpBg: '#5B77D4', rsvpColor: '#fff', deco: '⚜️',
    navBg: '#1A2654', statBg: 'rgba(91,119,212,.15)', statColor: '#8B9FE8', guestBg: 'rgba(255,255,255,.06)',
    badgeOk: 'rgba(134,239,172,.18)', badgeOkText: '#86efac', badgePend: 'rgba(254,243,199,.15)', badgePendText: '#fde68a',
    progressBg: 'rgba(255,255,255,.1)', progressFill: '#5B77D4',
    qrBorder: 'rgba(44,62,140,.22)', qrAccent: '#2C3E8C',
    demoPath: '/invitatii-online-nunta-royal',
    inviteTitle: 'Vă invităm la\nNunta Noastră',
    inviteMonogram: 'A&M',
    inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '19:00' }, { ico: '📍', lbl: 'Locația', val: 'Palatul Regal' }, { ico: '🍽️', lbl: 'Meniu QR', val: 'Scanează ↗' }],
    rsvpLabel: 'CONFIRMĂ PREZENȚA ⚜️',
    moments: [
      { emoji: '⚜️', bg: 'linear-gradient(135deg,#1a2654,#2c3e8c)', label: 'Cununie', isNew: false },
      { emoji: '🥂', bg: 'linear-gradient(135deg,#eef2ff,#c7d2fe)', label: 'Cocktail', isNew: true },
      { emoji: '👑', bg: 'linear-gradient(135deg,#1a2654,#2c3e8c)', label: 'Dans', isNew: true },
      { emoji: '🎂', bg: 'linear-gradient(135deg,#eef2ff,#dbeafe)', label: 'Tort', isNew: false },
    ],
  },
  {
    id: 'minimal', name: 'Minimal', emoji: '◻️', category: 'nunta',
    tagline: 'Mai Puțin Înseamnă Mai Mult',
    desc: 'Alb imaculat, negru pur și spațiu alb ca formă de design. Pentru cuplurile moderne care cred că eleganța stă în simplitate și că fiecare cuvânt trebuie să conteze.',
    accent: '#1A1208', accentSoft: '#5A4F44', pillBg: '#F2F0ED', pillText: '#1A1208',
    barGrad: 'linear-gradient(90deg,#000,#1A1208,#5A4F44,#1A1208,#000)',
    devBg: 'linear-gradient(135deg,rgba(26,18,8,.04),rgba(90,79,68,.07))',
    invTopBg: 'linear-gradient(170deg,#F8F7F5,#EEECEA)', invBotBg: '#fff',
    monoColor: '#1A1208', monoBg: '#EEECEA', titleColor: '#1A1208', divColor: '#CCCAC5',
    rowBg: '#F8F7F5', icoBg: '#EEECEA', rsvpBg: '#1A1208', rsvpColor: '#fff', deco: '◻',
    navBg: '#F5F4F2', statBg: '#EEECEA', statColor: '#1A1208', guestBg: '#F8F7F5',
    badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
    progressBg: '#EEECEA', progressFill: '#1A1208',
    qrBorder: 'rgba(26,18,8,.15)', qrAccent: '#1A1208',
    demoPath: '/invitatii-online-nunta-minimal',
    inviteTitle: 'Vă invităm la\nNunta Noastră',
    inviteMonogram: 'A&M',
    inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '18:00' }, { ico: '📍', lbl: 'Locația', val: 'The White Hall' }, { ico: '🍽️', lbl: 'Meniu QR', val: 'Scanează ↗' }],
    rsvpLabel: 'CONFIRMĂ PREZENȚA',
    moments: [
      { emoji: '🤍', bg: 'linear-gradient(135deg,#f8f7f5,#eeecea)', label: 'Cununie', isNew: false },
      { emoji: '🥂', bg: 'linear-gradient(135deg,#f5f4f2,#eeecea)', label: 'Cocktail', isNew: true },
      { emoji: '🖤', bg: 'linear-gradient(135deg,#1a1208,#2d2519)', label: 'Dans', isNew: true },
      { emoji: '🎂', bg: 'linear-gradient(135deg,#f8f7f5,#eeecea)', label: 'Tort', isNew: false },
    ],
  },

  /* ══ BOTEZ ══ */
  {
    id: 'botez-astronaut', name: 'Astronaut', emoji: '🚀', category: 'botez',
    tagline: 'Aventură & Univers Nou',
    desc: 'Albastru noapte cu stele strălucitoare și rachete jucăușe. Pentru micul explorator care abia a aterizat în lumea noastră — o invitație la prima lui mare aventură.',
    // astronautTokens: accent #7C6BC4 / accentDark #5848A0 / bgDeep #14152B / bgMid #1E2046
    accent: '#7C6BC4', accentSoft: '#A78BFA', pillBg: '#EFF6FF', pillText: '#1E3A8A',
    barGrad: 'linear-gradient(90deg,#14152B,#1E2046,#5848A0,#7C6BC4,#A78BFA,#7C6BC4,#5848A0,#1E2046,#14152B)',
    devBg: 'radial-gradient(ellipse 70% 60% at 20% 15%, rgba(80,70,160,.35) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 85% 85%, rgba(40,50,120,.4) 0%, transparent 55%), linear-gradient(160deg, #14152B 0%, #1E2046 45%, #2A1F4D 100%)',
    invTopBg: 'linear-gradient(170deg,#14152B,#1E2046)', invBotBg: '#14152B',
    monoColor: '#A78BFA', monoBg: 'rgba(124,107,196,.2)', titleColor: '#F4F6FB', divColor: '#7C6BC4',
    rowBg: 'rgba(255,255,255,.05)', icoBg: 'rgba(124,107,196,.18)', rsvpBg: '#5848A0', rsvpColor: '#fff', deco: '⭐',
    navBg: '#14152B', statBg: 'rgba(124,107,196,.15)', statColor: '#A78BFA', guestBg: 'rgba(255,255,255,.05)',
    badgeOk: 'rgba(134,239,172,.2)', badgeOkText: '#86efac', badgePend: 'rgba(254,243,199,.18)', badgePendText: '#fde68a',
    progressBg: 'rgba(255,255,255,.1)', progressFill: '#7C6BC4',
    qrBorder: 'rgba(124,107,196,.28)', qrAccent: '#7C6BC4',
    demoPath: '/invitatie-botez-online-baiat-astronaut',
    inviteTitle: 'Veniți să-l\ncunoașteți pe\nMATEI',
    inviteMonogram: '🚀',
    inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '13:00' }, { ico: '📍', lbl: 'Locația', val: 'Cosmos Hall' }, { ico: '🎁', lbl: 'Botez', val: '12.04.2025' }],
    rsvpLabel: 'CONFIRMĂ PREZENȚA 🚀',
    moments: [
      { emoji: '🚀', bg: 'linear-gradient(135deg,#14152B,#1E2046)', label: 'Botez', isNew: false },
      { emoji: '⭐', bg: 'linear-gradient(135deg,#1E2046,#5848A0)', label: 'Petrecere', isNew: true },
      { emoji: '🎂', bg: 'linear-gradient(135deg,#2A1F4D,#7C6BC4)', label: 'Tort', isNew: true },
      { emoji: '🎁', bg: 'linear-gradient(135deg,#14152B,#2A1F4D)', label: 'Daruri', isNew: false },
    ],
    favorite: true,
  },
  {
    id: 'botez-masinuta', name: 'Mașinuță', emoji: '🚗', category: 'botez',
    tagline: 'Viteză & Aventuri Mici',
    desc: 'Roșu aprins și carouri de curse pentru micul pilot al familiei. Energic, jucăuș și plin de personalitate — exact cum este băiețelul vostru în fiecare zi.',
    // masinutaTokens: accent #4A8BC2 / accentDark #2E6299 / bgDeep #EAF4FC / sky #DDECF8
    accent: '#4A8BC2', accentSoft: '#A9CBEA', pillBg: '#EAF4FC', pillText: '#1E466E',
    barGrad: 'linear-gradient(90deg,#1E466E,#2E6299,#4A8BC2,#A9CBEA,#4A8BC2,#2E6299,#1E466E)',
    devBg: 'radial-gradient(ellipse 72% 60% at 16% 20%, rgba(126,184,232,.20) 0%, transparent 55%), radial-gradient(ellipse 62% 55% at 84% 80%, rgba(168,208,240,.22) 0%, transparent 55%), linear-gradient(162deg, #FFFFFF 0%, #ECF5FD 46%, #DBEEFB 100%)',
    invTopBg: 'linear-gradient(170deg,#EAF4FC,#DDECF8)', invBotBg: '#fff',
    monoColor: '#2E6299', monoBg: '#DDECF8', titleColor: '#1E466E', divColor: '#4A8BC2',
    rowBg: 'rgba(255,255,255,.82)', icoBg: '#DDECF8', rsvpBg: '#2E6299', rsvpColor: '#fff', deco: '🏁',
    navBg: '#EAF4FC', statBg: '#DDECF8', statColor: '#1E466E', guestBg: 'rgba(255,255,255,.82)',
    badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
    progressBg: '#DDECF8', progressFill: '#4A8BC2',
    qrBorder: 'rgba(74,139,194,.22)', qrAccent: '#4A8BC2',
    demoPath: '/invitatie-botez-online-baiat-masinuta',
    inviteTitle: 'Veniți să-l\ncunoașteți pe\nALEX',
    inviteMonogram: '🚗',
    inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '13:00' }, { ico: '📍', lbl: 'Locația', val: 'Racing Club' }, { ico: '🎁', lbl: 'Botez', val: '20.04.2025' }],
    rsvpLabel: 'CONFIRMĂ PREZENȚA 🏁',
    moments: [
      { emoji: '🚗', bg: 'linear-gradient(135deg,#DDECF8,#A9CBEA)', label: 'Botez', isNew: false },
      { emoji: '🏁', bg: 'linear-gradient(135deg,#EAF4FC,#DDECF8)', label: 'Petrecere', isNew: true },
      { emoji: '🎂', bg: 'linear-gradient(135deg,#F0F7FD,#DDECF8)', label: 'Tort', isNew: true },
      { emoji: '🎁', bg: 'linear-gradient(135deg,#EAF4FC,#A9CBEA)', label: 'Daruri', isNew: false },
    ],
  },
  {
    id: 'botez-steluta', name: 'Stéluță', emoji: '⭐', category: 'botez',
    tagline: 'Luminos & Plin de Magie',
    desc: 'Galben auriu și stele strălucitoare pentru băiețelul care aduce lumină în familia voastră. Cald, radiant și plin de bucurie — ca primul lui zâmbet dimineața.',
    // stelutaTokens (green/emerald): accent #059669 → from page.tsx we use the steluta green theme
    accent: '#059669', accentSoft: '#6EE7B7', pillBg: '#ECFDF5', pillText: '#065F46',
    barGrad: 'linear-gradient(90deg,#022c22,#047857,#059669,#34d399,#059669,#047857,#022c22)',
    devBg: 'radial-gradient(ellipse 70% 60% at 20% 15%, rgba(5,150,105,.15) 0%, transparent 55%), linear-gradient(160deg,#f0fdf4 0%,#d1fae5 50%,#a7f3d0 100%)',
    invTopBg: 'linear-gradient(170deg,#ECFDF5,#D1FAE5)', invBotBg: '#fff',
    monoColor: '#059669', monoBg: '#D1FAE5', titleColor: '#065F46', divColor: '#34D399',
    rowBg: '#F0FDF9', icoBg: '#D1FAE5', rsvpBg: '#059669', rsvpColor: '#fff', deco: '⭐',
    navBg: '#F0FDF9', statBg: '#D1FAE5', statColor: '#065F46', guestBg: '#F0FDF9',
    badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
    progressBg: '#D1FAE5', progressFill: '#059669',
    qrBorder: 'rgba(5,150,105,.22)', qrAccent: '#059669',
    demoPath: '/invitatie-botez-online-baiat-steluta',
    inviteTitle: 'Veniți să-l\ncunoașteți pe\nLUCAS',
    inviteMonogram: '⭐',
    inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '13:00' }, { ico: '📍', lbl: 'Locația', val: 'Star Garden' }, { ico: '🎁', lbl: 'Botez', val: '27.04.2025' }],
    rsvpLabel: 'CONFIRMĂ PREZENȚA ⭐',
    moments: [
      { emoji: '⭐', bg: 'linear-gradient(135deg,#ecfdf5,#d1fae5)', label: 'Botez', isNew: false },
      { emoji: '✨', bg: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', label: 'Petrecere', isNew: true },
      { emoji: '🎂', bg: 'linear-gradient(135deg,#f0fdf9,#d1fae5)', label: 'Tort', isNew: true },
      { emoji: '🎁', bg: 'linear-gradient(135deg,#ecfdf5,#a7f3d0)', label: 'Daruri', isNew: false },
    ],
  },
  {
    id: 'botez-baloane', name: 'Baloane', emoji: '🎈', category: 'botez',
    tagline: 'Bucurie & Culori Pastelate',
    desc: 'Lavandă delicată, roz pudrat și baloane colorate plutind în aer. O petrecere de botez ca un vis — dulce, aerisit și plin de momentele acelea mici care rămân pentru totdeauna.',
    // baloaneTokens: accent #E46BAE / accentDark #C44A8C / lavender #BFA7F2 / bgDeep #FFF4FA
    accent: '#E46BAE', accentSoft: '#BFA7F2', pillBg: '#FFF4FA', pillText: '#5B3A66',
    barGrad: 'linear-gradient(90deg,#5B3A66,#C44A8C,#E46BAE,#BFA7F2,#E46BAE,#C44A8C,#5B3A66)',
    devBg: 'radial-gradient(ellipse 75% 60% at 20% 15%, rgba(216,180,254,.3) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 85% 85%, rgba(255,214,165,.28) 0%, transparent 55%), linear-gradient(155deg, #FFF9F0 0%, #FDEFFA 45%, #F3E4FF 100%)',
    invTopBg: 'linear-gradient(170deg,#FFF4FA,#FCEAF4)', invBotBg: '#fff',
    monoColor: '#C44A8C', monoBg: '#FCEAF4', titleColor: '#5B3A66', divColor: '#E46BAE',
    rowBg: 'rgba(255,255,255,.82)', icoBg: '#FCEAF4', rsvpBg: '#C44A8C', rsvpColor: '#fff', deco: '🎈',
    navBg: '#FFF4FA', statBg: '#FCEAF4', statColor: '#5B3A66', guestBg: 'rgba(255,255,255,.82)',
    badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
    progressBg: '#FCEAF4', progressFill: '#E46BAE',
    qrBorder: 'rgba(228,107,174,.22)', qrAccent: '#E46BAE',
    demoPath: '/invitatie-botez-online-fata-baloane',
    inviteTitle: 'Veniți s-o\ncunoașteți pe\nSOFIA',
    inviteMonogram: '🎈',
    inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '13:00' }, { ico: '📍', lbl: 'Locația', val: 'Pink Garden' }, { ico: '🎁', lbl: 'Botez', val: '04.05.2025' }],
    rsvpLabel: 'CONFIRMĂ PREZENȚA 🎈',
    moments: [
      { emoji: '🎈', bg: 'linear-gradient(135deg,#fff4fa,#fceaf4)', label: 'Botez', isNew: false },
      { emoji: '🌸', bg: 'linear-gradient(135deg,#fceaf4,#f4dff0)', label: 'Petrecere', isNew: true },
      { emoji: '🎂', bg: 'linear-gradient(135deg,#fff4fa,#f3e4ff)', label: 'Tort', isNew: true },
      { emoji: '🎁', bg: 'linear-gradient(135deg,#fceaf4,#bfa7f2)', label: 'Daruri', isNew: false },
    ],
  },
  {
    id: 'botez-fluture', name: 'Fluture', emoji: '🦋', category: 'botez',
    tagline: 'Delicatețe & Grație Angelică',
    desc: 'Mint delicat și turcoaz pastelat, cu fluturași și flori de primăvară. Pentru prințesa voastră care tocmai a sosit — gracioasă, pură și gata să exploreze lumea cu curiozitate.',
    // flutureTokens: accent #E35A87 / accentDark #C94772 / blush #F7C1D5 / bgDeep #FFF7FA
    accent: '#E35A87', accentSoft: '#F7C1D5', pillBg: '#FFF7FA', pillText: '#7A2E4D',
    barGrad: 'linear-gradient(90deg,#7A2E4D,#C94772,#E35A87,#F7C1D5,#E35A87,#C94772,#7A2E4D)',
    devBg: 'radial-gradient(ellipse 70% 60% at 20% 15%, rgba(227,90,135,.12) 0%, transparent 55%), linear-gradient(160deg,#FFF7FA 0%,#FDEBF2 50%,#F8DCE7 100%)',
    invTopBg: 'linear-gradient(170deg,#FFF7FA,#FDEBF2)', invBotBg: '#fff',
    monoColor: '#C94772', monoBg: '#F8DCE7', titleColor: '#7A2E4D', divColor: '#E35A87',
    rowBg: 'rgba(255,255,255,.82)', icoBg: '#F8DCE7', rsvpBg: '#C94772', rsvpColor: '#fff', deco: '🦋',
    navBg: '#FFF7FA', statBg: '#F8DCE7', statColor: '#7A2E4D', guestBg: 'rgba(255,255,255,.82)',
    badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
    progressBg: '#F8DCE7', progressFill: '#E35A87',
    qrBorder: 'rgba(227,90,135,.22)', qrAccent: '#E35A87',
    demoPath: '/invitatie-botez-online-fata-fluture',
    inviteTitle: 'Veniți s-o\ncunoașteți pe\nELENA',
    inviteMonogram: '🦋',
    inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '13:00' }, { ico: '📍', lbl: 'Locația', val: 'Butterfly Garden' }, { ico: '🎁', lbl: 'Botez', val: '11.05.2025' }],
    rsvpLabel: 'CONFIRMĂ PREZENȚA 🦋',
    moments: [
      { emoji: '🦋', bg: 'linear-gradient(135deg,#fff7fa,#fdebf2)', label: 'Botez', isNew: false },
      { emoji: '🌸', bg: 'linear-gradient(135deg,#fdebf2,#f8dce7)', label: 'Petrecere', isNew: true },
      { emoji: '🎂', bg: 'linear-gradient(135deg,#fff7fa,#f7c1d5)', label: 'Tort', isNew: true },
      { emoji: '🎁', bg: 'linear-gradient(135deg,#fdebf2,#f7c1d5)', label: 'Daruri', isNew: false },
    ],
  },
  {
    id: 'botez-ursulet', name: 'Ursuleț', emoji: '🐻', category: 'botez',
    tagline: 'Căldură & Blândețe Pură',
    desc: 'Bej cald, maro moale și accente de miere aurie. Ursulețul de pluș al familiei a sosit — și vrea să vă cunoască pe toți. O invitație la fel de caldă ca o îmbrățișare.',
    // ursuletTokens: accent #59B0E3 / accentDark #3A8CBF / bear #D7BEA8 / bgDeep #FDF8F2
    accent: '#59B0E3', accentSoft: '#B8D8F0', pillBg: '#FDF8F2', pillText: '#76563F',
    barGrad: 'linear-gradient(90deg,#76563F,#3A8CBF,#59B0E3,#B8D8F0,#59B0E3,#3A8CBF,#76563F)',
    devBg: 'radial-gradient(ellipse 75% 60% at 22% 18%, rgba(210,190,160,.18) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 82% 84%, rgba(184,210,232,.14) 0%, transparent 55%), linear-gradient(158deg, #FEFCF7 0%, #FBF5E8 46%, #F7EDD8 100%)',
    invTopBg: 'linear-gradient(170deg,#FDF8F2,#FAF2E7)', invBotBg: '#fff',
    monoColor: '#3A8CBF', monoBg: '#F5EAD9', titleColor: '#76563F', divColor: '#59B0E3',
    rowBg: 'rgba(255,255,255,.88)', icoBg: '#F5EAD9', rsvpBg: '#3A8CBF', rsvpColor: '#fff', deco: '🐻',
    navBg: '#FDF8F2', statBg: '#F5EAD9', statColor: '#76563F', guestBg: 'rgba(255,255,255,.88)',
    badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
    progressBg: '#F5EAD9', progressFill: '#59B0E3',
    qrBorder: 'rgba(89,176,227,.22)', qrAccent: '#59B0E3',
    demoPath: '/invitatie-botez-online-ursulet',
    inviteTitle: 'Veniți să-l\ncunoașteți pe\nNOAH',
    inviteMonogram: '🐻',
    inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '13:00' }, { ico: '📍', lbl: 'Locația', val: 'Honey Bear Hall' }, { ico: '🎁', lbl: 'Botez', val: '18.05.2025' }],
    rsvpLabel: 'CONFIRMĂ PREZENȚA 🐻',
    moments: [
      { emoji: '🐻', bg: 'linear-gradient(135deg,#fdf8f2,#faf2e7)', label: 'Botez', isNew: false },
      { emoji: '🍯', bg: 'linear-gradient(135deg,#faf2e7,#f5ead9)', label: 'Petrecere', isNew: true },
      { emoji: '🎂', bg: 'linear-gradient(135deg,#fdf8f2,#d7bea8)', label: 'Tort', isNew: true },
      { emoji: '🎁', bg: 'linear-gradient(135deg,#faf2e7,#b8d8f0)', label: 'Daruri', isNew: false },
    ],
  },

  /* ══ ANIVERSARE ══ */
  {
    id: 'majorat-18', name: 'Majorat 18', emoji: '🎉', category: 'aniversare',
    tagline: 'Libertate & Nou Început',
    desc: 'Negru premium cu accente neon electric și confetti digital. Pentru cel mai important prag din adolescență — o petrecere de majorat care să fie amintită toată viața.',
    accent: '#7C3AED', accentSoft: '#A78BFA', pillBg: '#F5F3FF', pillText: '#4C1D95',
    barGrad: 'linear-gradient(90deg,#FF6B00,#7C3AED,#EC4899,#F59E0B,#10B981,#7C3AED,#FF6B00)',
    devBg: 'linear-gradient(135deg,rgba(124,58,237,.08),rgba(236,72,153,.1))',
    invTopBg: 'linear-gradient(170deg,#0f0a1e,#1a0f3a)', invBotBg: '#0f0a1e',
    monoColor: '#A78BFA', monoBg: 'rgba(167,139,250,.18)', titleColor: '#F0EBFF', divColor: '#7C3AED',
    rowBg: 'rgba(255,255,255,.06)', icoBg: 'rgba(167,139,250,.18)', rsvpBg: 'linear-gradient(135deg,#7C3AED,#EC4899)', rsvpColor: '#fff', deco: '🎊',
    navBg: '#0f0a1e', statBg: 'rgba(167,139,250,.15)', statColor: '#A78BFA', guestBg: 'rgba(255,255,255,.06)',
    badgeOk: 'rgba(134,239,172,.2)', badgeOkText: '#86efac', badgePend: 'rgba(254,243,199,.18)', badgePendText: '#fde68a',
    progressBg: 'rgba(255,255,255,.1)', progressFill: 'linear-gradient(90deg,#7C3AED,#EC4899)',
    qrBorder: 'rgba(124,58,237,.25)', qrAccent: '#A78BFA',
    demoPath: '/invitatie-online-aniversare-majorat-18-ani',
    inviteTitle: 'Sunt\n18 ani!\nHai la petrecere',
    inviteMonogram: '18',
    inviteRows: [{ ico: '🕕', lbl: 'Ora', val: '21:00' }, { ico: '📍', lbl: 'Locația', val: 'Club Neon' }, { ico: '🎊', lbl: 'Data', val: '05.06.2025' }],
    rsvpLabel: '🎉 CONFIRMĂ PREZENȚA',
    moments: [
      { emoji: '🎉', bg: 'linear-gradient(135deg,#1a0f3a,#7c3aed)', label: 'Majorat', isNew: false },
      { emoji: '🥂', bg: 'linear-gradient(135deg,#0f0a1e,#ec4899)', label: 'Party', isNew: true },
      { emoji: '🎂', bg: 'linear-gradient(135deg,#f5f3ff,#ede9fe)', label: 'Tort', isNew: true },
      { emoji: '🎊', bg: 'linear-gradient(135deg,#1a0f3a,#f59e0b)', label: 'Surpriză', isNew: false },
    ],
  },
]

const CAT_META: Record<string, { label: string; badge: string; badgeText: string; badgeBg: string }> = {
  nunta:      { label: 'Nuntă',      badge: '💍', badgeText: '#7D5A1E', badgeBg: '#FFF8E6' },
  botez:      { label: 'Botez',      badge: '👶', badgeText: '#164E63', badgeBg: '#ECFEFF' },
  aniversare: { label: 'Aniversare', badge: '🎂', badgeText: '#4C1D95', badgeBg: '#F5F3FF' },
}

function InviteScreen({ t }: { t: T }) {
  const lines = t.inviteTitle.split('\n')
  return (
    <div className="vsc" style={{ background: t.invBotBg }}>
      <div className="vsc-bar" style={{ background: t.barGrad }} />
      <div className="vsc-invite-top" style={{ background: t.invTopBg }}>
        <div aria-hidden="true" className="vsc-deco">{t.deco}</div>
        <div className="vsc-mono" style={{ background: t.monoBg, color: t.monoColor, border: `1.5px solid ${t.monoColor}40` }}>
          <div className="vsc-mono-ring" style={{ borderColor: t.monoColor }} />
          <div className="vsc-pulse" style={{ borderColor: t.monoColor + '60' }} />
          {t.inviteMonogram}
        </div>
        <p className="vsc-title" style={{ color: t.titleColor }}>
          {lines.map((l, i) => (
            <span key={i}>{i === lines.length - 1 ? <em>{l}</em> : l}<br /></span>
          ))}
        </p>
        <div className="vsc-divline" style={{ background: t.divColor }} />
        <p className="vsc-date" style={{ color: t.titleColor }}>
          {t.inviteRows[2]?.val ?? '2025'}
        </p>
      </div>
      <div className="vsc-invite-rows" style={{ background: t.invBotBg }}>
        {t.inviteRows.map(r => (
          <div key={r.lbl} className="vsc-row" style={{ background: t.rowBg }}>
            <div className="vsc-ico" style={{ background: t.icoBg }}>{r.ico}</div>
            <div className="vsc-txt-wrap">
              <span className="vsc-lbl" style={{ color: t.titleColor }}>{r.lbl}</span>
              <span className="vsc-val" style={{ color: t.titleColor }}>{r.val}</span>
            </div>
          </div>
        ))}
        <div className="vsc-rsvp-btn" style={{ background: typeof t.rsvpBg === 'string' ? t.rsvpBg : '#7C3AED', color: t.rsvpColor }}>
          {t.rsvpLabel}
        </div>
      </div>
    </div>
  )
}

function DashboardScreen({ t }: { t: T }) {
  const catLabel = CAT_META[t.category]?.label ?? 'Event'
  return (
    <div className="vsc-dash" style={{ background: t.navBg }}>
      <div className="vsc-dash-nav" style={{ background: t.navBg, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div className="vsc-dash-dot" style={{ background: '#ff5f57' }} />
        <div className="vsc-dash-dot" style={{ background: '#ffbd2e' }} />
        <div className="vsc-dash-dot" style={{ background: '#28c840' }} />
        <span className="vsc-dash-logo" style={{ color: t.accentSoft }}>VibeInvite</span>
      </div>
      <div className="vsc-dash-body">
        <div className="vsc-dash-section" style={{ color: t.statColor }}>Dashboard · {catLabel}</div>
        <div className="vsc-stats-row">
          {[{ n: '48', l: 'Total' }, { n: '32', l: 'Accept' }, { n: '16', l: 'Pend.' }].map(s => (
            <div key={s.l} className="vsc-stat" style={{ background: t.statBg }}>
              <div className="vsc-stat-num" style={{ color: t.statColor }}>{s.n}</div>
              <div className="vsc-stat-lbl" style={{ color: t.statColor }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="vsc-dash-section" style={{ color: t.statColor }}>Participare</div>
          <div className="vsc-progress-bar-wrap" style={{ background: t.progressBg }}>
            <div className="vsc-progress-bar" style={{ width: '67%', background: typeof t.progressFill === 'string' ? t.progressFill : t.accent }} />
          </div>
        </div>
        <div>
          <div className="vsc-dash-section" style={{ color: t.statColor }}>Invitați</div>
          {[
            { name: 'Ana M.', ok: true }, { name: 'Elena I.', ok: true },
            { name: 'Radu P.', ok: false }, { name: 'Laura D.', ok: true },
          ].map(g => (
            <div key={g.name} className="vsc-guest-item" style={{ background: t.guestBg }}>
              <span className="vsc-guest-name" style={{ color: t.titleColor }}>{g.name}</span>
              <span className="vsc-guest-badge" style={{ background: g.ok ? t.badgeOk : t.badgePend, color: g.ok ? t.badgeOkText : t.badgePendText }}>
                {g.ok ? '✓' : '⏳'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function QrPhotoCard({ t }: { t: T }) {
  return (
    <div className="vid-qr-card" style={{ borderColor: t.qrBorder }}>
      <div style={{ height: 3, background: t.barGrad }} />
      <div className="vid-qr-top">
        <span className="vid-qr-top-label" style={{ color: t.qrAccent }}>📷 Încarcă poze</span>
        <div className="vid-qr-code" style={{ borderColor: t.qrAccent, color: t.qrAccent }}>
          <div className="vid-qr-scan" style={{ background: `linear-gradient(90deg,transparent,${t.qrAccent},transparent)` }} />
          <div className="vid-qr-grid">
            {QR_PATTERN.flat().map((cell, i) => (
              <div key={i} className="vid-qr-cell" style={{ background: cell ? t.qrAccent : 'transparent' }} />
            ))}
          </div>
        </div>
        <p className="vid-qr-sublabel" style={{ color: 'rgba(26,18,8,.45)' }}>
          Scanează &amp; trimite<br />momentele tale
        </p>
      </div>
      <div className="vid-qr-divider" />
      <div className="vid-qr-photos">
        {t.moments.map((m) => (
          <div key={m.label} className="vid-qr-photo" style={{ background: m.bg }}>
            <span style={{ fontSize: 20 }}>{m.emoji}</span>
            {m.isNew && <span className="vid-qr-photo-new">NOU</span>}
          </div>
        ))}
      </div>
      <div className="vid-qr-counter">
        <span style={{ color: 'rgba(26,18,8,.5)' }}>247 poze</span>
        <span className="vid-qr-live">
          <span className="vid-qr-live-dot" />
          LIVE
        </span>
      </div>
    </div>
  )
}

const TICKER = [
  '🌹 Romantic', '🌿 Nature', '✨ Lux', '🌸 Boho', '👑 Royal', '◻️ Minimal',
  '🚀 Botez Astronaut', '🚗 Botez Mașinuță', '⭐ Botez Stéluță',
  '🎈 Botez Baloane', '🦋 Botez Fluture', '🐻 Botez Ursuleț',
  '🎉 Majorat 18 Ani',
  '💌 Invitații Nelimitate', '🍽️ Meniu în Invitație', '📷 Upload Poze Live',
  '📊 Export Excel', '🗂️ Momente Sortate', '💸 300 Lei · O Singură Dată',
]

type FilterKey = 'toate' | Category

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'toate', label: 'Toate' },
  { key: 'nunta', label: 'Nuntă 💍' },
  { key: 'botez', label: 'Botez 👶' },
  { key: 'aniversare', label: 'Aniversare 🎂' },
]

export default function InvitatiiDigitalePage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('toate')
  const [toast, setToast] = useState<{ visible: boolean; leaving: boolean; name: string }>({
    visible: false, leaving: false, name: '',
  })

  const filtered = activeFilter === 'toate' ? THEMES : THEMES.filter(t => t.category === activeFilter)

  function showToast(name: string) {
    setToast({ visible: true, leaving: false, name })
    setTimeout(() => {
      setToast(s => ({ ...s, leaving: true }))
      setTimeout(() => setToast({ visible: false, leaving: false, name: '' }), 320)
    }, 2600)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS + VSC_CSS }} />

      <span className="vid-seo-text">
        Invitații digitale online pentru nuntă, botez și majorat 18 ani. Invitații online nuntă premium.
        Invitație online aniversare majorat 18 ani. Invitații botez premium România. Invitații nuntă digitale elegante.
      </span>

      <div className="vid">
        <div className="vid-orb vid-o1" aria-hidden="true" />
        <div className="vid-orb vid-o2" aria-hidden="true" />

        <div className="vid-ticker" aria-hidden="true">
          <div className="vid-ti-inner">
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vid-ti">{t}<span className="vid-tdot" /></div>
            ))}
          </div>
        </div>

        <div className="vid-inner">

          <header className="vid-header">
            <p className="vid-tagline">🎊 Nuntă · Botez · Majorat — tot ce ai nevoie într-un singur pachet</p>
            <p className="vid-super"><span className="vid-sdot" />Alege designul invitației tale</p>
            <h1 className="vid-h1">13 teme <em>premium</em>, fiecare <strong>unică</strong></h1>
            <p className="vid-lead">
              Explorează colecția exclusivă VibeInvite: invitații digitale pentru nuntă, botez și majorat 18 ani.
              Fiecare include invitație digitală, dashboard invitați și meniu în invitație.
            </p>
            <div className="vid-lead-pills">
              {[
                { ico: '💌', txt: 'Invitații nelimitate' },
                { ico: '🍽️', txt: 'Meniu în Invitație' },
                { ico: '📷', txt: 'Poze live de la invitați' },
                { ico: '🗂️', txt: 'Momente organizate' },
                { ico: '📊', txt: 'Export Excel' },
              ].map(p => (
                <span key={p.txt} className="vid-lead-pill">
                  <span aria-hidden="true">{p.ico}</span>{p.txt}
                </span>
              ))}
            </div>
          </header>

          <div className="vid-filter-wrap">
            <div className="vid-filter-tabs" role="tablist" aria-label="Filtrează după categorie">
              {FILTERS.map(f => (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={activeFilter === f.key}
                  className={`vid-filter-tab${activeFilter === f.key ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="vid-rows" role="list">
            {filtered.map((theme, idx) => {
              const cat = CAT_META[theme.category]
              return (
                <article
                  key={theme.id}
                  className={`vid-row${theme.favorite ? ' vid-row-favorite' : ''}`}
                  role="listitem"
                  aria-label={`Tema ${theme.name}`}
                  style={{ animationDelay: `${idx * 0.07}s` }}
                >
                  <div className="vid-row-bar" style={{ background: theme.barGrad }} aria-hidden="true" />

                  <div className="vid-row-body">
                    <div className="vid-info">
                      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0 }}>
                        <div className="vid-cat-badge" style={{ background: cat.badgeBg, color: cat.badgeText }}>
                          <span>{cat.badge}</span>{cat.label}
                        </div>
                        {theme.favorite && (
                          <div className="vid-fav-badge">⭐ Preferată</div>
                        )}
                      </div>
                      <div className="vid-theme-pill" style={{ background: theme.pillBg, color: theme.pillText }}>
                        <span aria-hidden="true">{theme.emoji}</span>
                        {theme.tagline}
                      </div>
                      <h2 className="vid-theme-name" style={{ color: theme.accent }}>
                        <em>{theme.name}</em>
                      </h2>
                      <p className="vid-theme-sub">{theme.desc}</p>
                      <div className="vid-btns">
                        <Link href={theme.demoPath} className="vid-btn-demo">
                          Vezi demo
                        </Link>
                        <Link
                          href="/checkout"
                          className="vid-btn-choose"
                          style={{ background: theme.accent }}
                        >
                          Alege această temă
                        </Link>
                      </div>
                    </div>

                    <div className="vid-devices" style={{ background: theme.devBg }} aria-hidden="true">
                      <div className="vid-phone-wrap">
                        <div className="vid-phone-frame">
                          <div className="vid-phone-notch" />
                          <div className="vid-phone-side-btn" />
                          <div className="vid-phone-side-vol" />
                          <div className="vid-phone-side-vol2" />
                          <div className="vid-phone-bar" />
                          <InviteScreen t={theme} />
                        </div>
                        <p className="vid-dev-label">Telefon · Invitație</p>
                      </div>

                      <div className="vid-tablet-wrap">
                        <div className="vid-tablet-frame">
                          <div className="vid-tablet-cam" />
                          <div className="vid-tablet-side" />
                          <div className="vid-tablet-bar" />
                          <DashboardScreen t={theme} />
                        </div>
                        <p className="vid-dev-label">Tabletă · Dashboard</p>
                      </div>

                      <div className="vid-laptop-wrap">
                        <div className="vid-laptop-lid">
                          <div className="vid-laptop-cam" />
                          <div className="vid-laptop-scr">
                            <InviteScreen t={theme} />
                          </div>
                        </div>
                        <div className="vid-laptop-hinge" />
                        <div className="vid-laptop-base" />
                        <p className="vid-dev-label">Laptop · Previzualizare</p>
                      </div>

                      <div className="vid-qr-wrap">
                        <QrPhotoCard t={theme} />
                        <p className="vid-dev-label">QR · Poze Instant</p>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="vid-cta">
            <h2 className="vid-cta-h">Ai ales tema? <em>Pasul următor e simplu.</em></h2>
            <p className="vid-cta-sub">Toate cele 13 teme sunt incluse în pachetul de 300 lei</p>
            <div><p className="vid-cta-pill"><span aria-hidden="true">💸</span>300 Lei · Plată Unică </p></div>
            <div style={{ marginTop: 8 }}>
              <Link href="/checkout" className="vid-cta-btn">
                <span aria-hidden="true">✨</span>Creează Invitația
              </Link>
            </div>
          </div>

        </div>

        <div className="vid-ticker" aria-hidden="true">
          <div className="vid-ti-inner" style={{ animationDirection: 'reverse' }}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vid-ti">{t}<span className="vid-tdot" /></div>
            ))}
          </div>
        </div>

        {toast.visible && (
          <div className={`vid-toast ${toast.leaving ? 'out' : 'in'}`} role="status" aria-live="polite">
            <span className="vid-toast-ico" aria-hidden="true">🚀</span>
            <span>Demo <strong>{toast.name}</strong> — coming soon</span>
            <span className="vid-toast-dot" aria-hidden="true" />
          </div>
        )}
      </div>
    </>
  )
}