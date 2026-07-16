// app/(fotografi)/foto-video-prahova-mia-frames/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import TrackView from '@/components/marketplace/TrackView';
import ShareButton from '@/components/marketplace/ShareButton';
import CallButton from '@/components/marketplace/CallButton';
import WaButton from '@/components/marketplace/WaButton';
import SocialLinks from '@/components/marketplace/SocialLinks';
import MiaReel from './MiaReel';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
const SLUG = 'foto-video-prahova-mia-frames';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${SLUG} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

const CSS = `
header, footer, .cookie-consent { display:none !important; }

@import url('https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html { scroll-behavior:smooth; }

.mf { font-family:'Sora',sans-serif; background:#08090C; color:#EFF1F5; min-height:100vh; overflow-x:hidden; position:relative; }
.mf ::selection { background:#5B8DEF; color:#fff; }

/* aurora backdrop */
.mf-aurora {
  position:fixed; inset:0; z-index:0; pointer-events:none; overflow:hidden;
}
.mf-blob { position:absolute; border-radius:50%; filter:blur(90px); opacity:.45; }
.mf-blob.b1 { width:44vw; height:44vw; background:#2D4EA8; top:-12%; left:-10%; animation:mfDrift1 18s ease-in-out infinite alternate; }
.mf-blob.b2 { width:38vw; height:38vw; background:#7A3F8F; top:32%; right:-12%; animation:mfDrift2 22s ease-in-out infinite alternate; }
.mf-blob.b3 { width:34vw; height:34vw; background:#1E6E70; bottom:-10%; left:22%; animation:mfDrift3 20s ease-in-out infinite alternate; }
@keyframes mfDrift1 { from{transform:translate(0,0) scale(1)} to{transform:translate(6vw,7vh) scale(1.14)} }
@keyframes mfDrift2 { from{transform:translate(0,0) scale(1.06)} to{transform:translate(-7vw,-5vh) scale(1)} }
@keyframes mfDrift3 { from{transform:translate(0,0) scale(1)} to{transform:translate(4vw,-6vh) scale(1.12)} }
.mf-grain {
  position:fixed; inset:0; z-index:1; pointer-events:none; opacity:.05;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:190px;
}
.mf-shell { position:relative; z-index:2; }

@keyframes mfUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

/* ============ NAV ============ */
.mf-nav {
  position:fixed; top:0; left:0; right:0; z-index:300;
  padding:14px 18px; display:flex; align-items:center; justify-content:space-between;
  transition:all .35s ease;
}
@media(min-width:768px){ .mf-nav { padding:16px 36px; } }
.mf-nav.scrolled {
  background:rgba(8,9,12,0.72); backdrop-filter:blur(22px) saturate(140%);
  border-bottom:1px solid rgba(239,241,245,0.08);
}
.mf-nav-back {
  display:flex; align-items:center; gap:6px;
  font-family:'DM Mono',monospace; font-size:11px; letter-spacing:.1em; text-transform:uppercase;
  text-decoration:none; color:rgba(239,241,245,0.5); transition:color .2s;
}
.mf-nav-back:hover { color:#EFF1F5; }
.mf-nav-logo { font-size:16px; font-weight:800; letter-spacing:-.02em; color:#EFF1F5; }
.mf-nav-logo span {
  background:linear-gradient(100deg,#5B8DEF,#9B6BF0,#4FD1C5);
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
}

/* ============ HERO ============ */
.mf-hero {
  min-height:100svh; display:flex; flex-direction:column; justify-content:center;
  padding:118px 20px 56px; position:relative;
}
@media(min-width:900px){ .mf-hero { padding:130px 44px 70px; } }

.mf-hero-badge {
  display:inline-flex; align-items:center; gap:9px; width:fit-content;
  background:rgba(239,241,245,0.05); border:1px solid rgba(239,241,245,0.14);
  backdrop-filter:blur(12px);
  font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.16em; text-transform:uppercase;
  color:rgba(239,241,245,0.7); padding:7px 16px; border-radius:100px; margin-bottom:26px;
  animation:mfUp .8s ease .1s both;
}
.mf-badge-dot { width:6px; height:6px; border-radius:50%; background:#4FD1C5; box-shadow:0 0 12px #4FD1C5; animation:mfBlink 1.6s ease-in-out infinite; }
@keyframes mfBlink { 0%,100%{opacity:1} 50%{opacity:.25} }

.mf-hero-h1 {
  font-size:clamp(46px,11vw,120px); font-weight:800; line-height:.9; letter-spacing:-.035em;
  color:#EFF1F5; margin-bottom:20px; max-width:14ch;
  animation:mfUp .9s ease .24s both;
}
.mf-hero-h1 span {
  background:linear-gradient(100deg,#5B8DEF,#9B6BF0 45%,#4FD1C5);
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  background-size:200% auto; animation:mfShine 6s linear infinite;
}
@keyframes mfShine { to{background-position:200% center} }

.mf-hero-tag {
  font-family:'DM Mono',monospace; font-size:clamp(12px,2.4vw,15px);
  letter-spacing:.22em; text-transform:uppercase; color:rgba(239,241,245,0.4);
  margin-bottom:26px;
  animation:mfUp .9s ease .38s both;
}
.mf-hero-tag i { font-style:normal; color:#9B6BF0; }

.mf-hero-desc {
  font-size:15px; line-height:1.8; color:rgba(239,241,245,0.55);
  max-width:520px; margin-bottom:32px; font-weight:300;
  animation:mfUp .9s ease .5s both;
}
.mf-hero-desc b { color:#EFF1F5; font-weight:600; }

.mf-hero-actions {
  display:flex; gap:10px; flex-wrap:wrap; margin-bottom:44px;
  animation:mfUp .9s ease .62s both;
}
.mf-btn {
  display:flex; align-items:center; gap:9px;
  background:linear-gradient(100deg,#5B8DEF,#9B6BF0);
  color:#fff; font-size:13px; font-weight:700; letter-spacing:.02em;
  padding:16px 30px; border-radius:100px; text-decoration:none;
  box-shadow:0 12px 40px rgba(91,141,239,0.35);
  transition:transform .2s, box-shadow .2s;
}
.mf-btn:hover { transform:translateY(-2px); box-shadow:0 18px 50px rgba(155,107,240,0.45); }
.mf-btn-glass {
  display:flex; align-items:center; gap:9px;
  background:rgba(239,241,245,0.06); border:1px solid rgba(239,241,245,0.16);
  backdrop-filter:blur(12px);
  color:rgba(239,241,245,0.85); font-size:13px; font-weight:500;
  padding:16px 26px; border-radius:100px; text-decoration:none;
  transition:background .25s, border-color .25s, transform .2s;
}
.mf-btn-glass:hover { background:rgba(239,241,245,0.12); border-color:rgba(239,241,245,0.35); transform:translateY(-2px); }

.mf-hero-facts {
  display:grid; grid-template-columns:repeat(2,1fr); gap:1px;
  background:rgba(239,241,245,0.1); border:1px solid rgba(239,241,245,0.1);
  border-radius:16px; overflow:hidden; max-width:640px;
  animation:mfUp .9s ease .74s both;
}
@media(min-width:640px){ .mf-hero-facts { grid-template-columns:repeat(4,1fr); } }
.mf-fact { background:rgba(8,9,12,0.6); backdrop-filter:blur(10px); padding:16px 12px; text-align:center; }
.mf-fact-k { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.16em; text-transform:uppercase; color:rgba(239,241,245,0.35); }
.mf-fact-v { font-size:14px; font-weight:600; color:#EFF1F5; margin-top:4px; }

/* ============ TICKER ============ */
.mf-ticker {
  border-top:1px solid rgba(239,241,245,0.1); border-bottom:1px solid rgba(239,241,245,0.1);
  background:rgba(239,241,245,0.02); backdrop-filter:blur(10px);
  padding:13px 0; overflow:hidden;
}
.mf-ticker-inner { display:flex; width:max-content; animation:mfTick 26s linear infinite; }
@keyframes mfTick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.mf-ticker-item {
  display:flex; align-items:center; gap:14px; padding:0 24px;
  font-family:'DM Mono',monospace; font-size:11px; letter-spacing:.22em; text-transform:uppercase;
  color:rgba(239,241,245,0.45); white-space:nowrap;
}
.mf-ticker-item i { font-style:normal; color:#5B8DEF; }

/* ============ STRIP ============ */
.mf-strip {
  background:rgba(239,241,245,0.03); border-bottom:1px solid rgba(239,241,245,0.08);
  backdrop-filter:blur(10px);
  padding:15px 20px; display:flex; align-items:center; gap:14px;
}
@media(min-width:640px){ .mf-strip { padding:17px 40px; } }
.mf-strip-avatar {
  width:52px; height:52px; border-radius:14px; flex-shrink:0;
  object-fit:cover; border:1px solid rgba(239,241,245,0.18);
}
.mf-strip-name { font-size:15px; font-weight:700; color:#EFF1F5; letter-spacing:-.01em; }
.mf-strip-sub { font-family:'DM Mono',monospace; font-size:10.5px; letter-spacing:.1em; color:rgba(239,241,245,0.4); margin-top:3px; }
.mf-strip-spacer { flex:1; }
.mf-strip-cta {
  display:flex; align-items:center; gap:7px;
  background:linear-gradient(100deg,#5B8DEF,#9B6BF0); color:#fff;
  font-size:12px; font-weight:700; padding:11px 20px; border-radius:100px;
  text-decoration:none; white-space:nowrap;
  box-shadow:0 6px 20px rgba(91,141,239,0.3);
  transition:transform .2s;
}
.mf-strip-cta:hover { transform:translateY(-1px); }

/* ============ BODY ============ */
.mf-body { max-width:1240px; margin:0 auto; padding:66px 20px 170px; }
@media(min-width:640px){ .mf-body { padding:78px 36px 170px; } }
@media(min-width:1024px){ .mf-body { display:grid; grid-template-columns:1fr 330px; gap:60px; padding:88px 36px 130px; } }

.mf-sh { margin-bottom:30px; }
.mf-sh-k {
  display:flex; align-items:center; gap:9px;
  font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.2em; text-transform:uppercase;
  color:#5B8DEF; margin-bottom:8px;
}
.mf-sh-k::before { content:''; width:18px; height:1px; background:#5B8DEF; }
.mf-sh-t { font-size:clamp(28px,5vw,44px); font-weight:800; letter-spacing:-.03em; color:#EFF1F5; line-height:1.05; }
.mf-sh-t span {
  background:linear-gradient(100deg,#5B8DEF,#9B6BF0,#4FD1C5);
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
}

/* ============ REEL (portfolio) ============ */
.mf-portfolio { margin-bottom:76px; }
.mf-reel { position:relative; }
.mf-reel-track {
  display:flex; gap:16px; overflow-x:auto; scroll-snap-type:x mandatory;
  padding:4px 0 18px; margin:0 -20px; padding-left:20px; padding-right:20px;
  scrollbar-width:none; -ms-overflow-style:none;
}
.mf-reel-track::-webkit-scrollbar { display:none; }
@media(min-width:640px){ .mf-reel-track { margin:0; padding-left:0; padding-right:0; gap:20px; } }

.mf-shot {
  flex:0 0 86%; scroll-snap-align:center; text-decoration:none; display:block;
  transition:transform .4s cubic-bezier(.16,1,.3,1);
}
@media(min-width:640px){ .mf-shot { flex:0 0 62%; } }
@media(min-width:1024px){ .mf-shot { flex:0 0 clamp(420px,48%,560px); } }
.mf-shot:hover { transform:translateY(-6px); }

.mf-shot-bar {
  display:flex; align-items:center; gap:9px; padding-bottom:8px;
  font-family:'DM Mono',monospace; font-size:9.5px; letter-spacing:.18em; text-transform:uppercase;
  color:rgba(239,241,245,0.35);
}
.mf-shot-no { color:#4FD1C5; }
.mf-shot-dot { width:4px; height:4px; border-radius:50%; background:rgba(239,241,245,0.25); }
.mf-shot-fmt { margin-left:auto; }

.mf-shot-img {
  position:relative; overflow:hidden; border-radius:18px;
  aspect-ratio:3/2; background:#111319;
  border:1px solid rgba(239,241,245,0.12);
  box-shadow:0 20px 50px rgba(0,0,0,0.45);
}
.mf-shot-img img {
  width:100%; height:100%; object-fit:cover; display:block;
  transition:transform 1.1s cubic-bezier(.16,1,.3,1), filter .5s ease;
  filter:brightness(.86) saturate(1.02);
}
.mf-shot:hover .mf-shot-img img { transform:scale(1.06); filter:brightness(1) saturate(1.12); }

.mf-shot-rec {
  position:absolute; top:12px; left:12px; z-index:3;
  font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.16em;
  color:#fff; background:rgba(8,9,12,0.6); backdrop-filter:blur(8px);
  padding:5px 10px; border-radius:100px; border:1px solid rgba(255,255,255,0.18);
}
.mf-shot-veil {
  position:absolute; inset:0; z-index:2;
  background:linear-gradient(to top, rgba(8,9,12,0.94) 0%, rgba(8,9,12,0.2) 55%, transparent 100%);
  opacity:0; transition:opacity .4s ease;
  display:flex; flex-direction:column; justify-content:flex-end; padding:20px;
}
.mf-shot:hover .mf-shot-veil { opacity:1; }
.mf-shot-title { font-size:17px; font-weight:700; color:#fff; letter-spacing:-.01em; margin-bottom:3px; }
.mf-shot-note { font-size:12px; color:rgba(255,255,255,0.55); margin-bottom:12px; font-weight:300; }
.mf-shot-cta {
  display:inline-flex; align-items:center; gap:6px;
  background:#EFF1F5; color:#08090C; font-size:11px; font-weight:700;
  padding:8px 16px; border-radius:100px; width:fit-content;
}

.mf-reel-nav { display:flex; align-items:center; gap:12px; margin-top:10px; }
.mf-reel-btn {
  width:40px; height:40px; border-radius:50%; flex-shrink:0; cursor:pointer;
  background:rgba(239,241,245,0.06); border:1px solid rgba(239,241,245,0.16);
  color:#EFF1F5; display:flex; align-items:center; justify-content:center;
  transition:background .2s, transform .2s;
}
.mf-reel-btn:hover { background:rgba(239,241,245,0.14); transform:scale(1.06); }
.mf-reel-hint {
  font-family:'DM Mono',monospace; font-size:9.5px; letter-spacing:.16em; text-transform:uppercase;
  color:rgba(239,241,245,0.3);
}

/* ============ ABOUT ============ */
.mf-about { margin-bottom:72px; }
.mf-about-card {
  background:rgba(239,241,245,0.035); border:1px solid rgba(239,241,245,0.1);
  backdrop-filter:blur(16px);
  border-radius:26px; padding:44px 40px; position:relative; overflow:hidden;
}
@media(max-width:640px){ .mf-about-card { padding:30px 22px; border-radius:20px; } }
.mf-about-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:1px;
  background:linear-gradient(to right, transparent, rgba(155,107,240,0.8), transparent);
}
.mf-about-quote {
  font-size:clamp(22px,4vw,36px); font-weight:200; line-height:1.35; color:#EFF1F5;
  letter-spacing:-.02em; margin-bottom:26px;
}
.mf-about-quote span {
  background:linear-gradient(100deg,#5B8DEF,#9B6BF0,#4FD1C5);
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  font-weight:600;
}
.mf-about-text { font-size:14px; line-height:1.95; color:rgba(239,241,245,0.5); font-weight:300; max-width:660px; }
.mf-about-text + .mf-about-text { margin-top:13px; }
.mf-about-text b { color:#EFF1F5; font-weight:600; }

.mf-about-sig {
  margin-top:32px; padding-top:26px; border-top:1px solid rgba(239,241,245,0.1);
  display:flex; align-items:center; gap:14px;
}
.mf-about-sig-av { width:50px; height:50px; border-radius:14px; object-fit:cover; border:1px solid rgba(239,241,245,0.2); }
.mf-about-sig-n { font-size:15px; font-weight:700; color:#EFF1F5; }
.mf-about-sig-r { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.14em; color:rgba(239,241,245,0.35); margin-top:3px; }

/* ============ OFFER ============ */
.mf-offer { margin-bottom:56px; }
.mf-offer-grid { display:grid; gap:12px; }
@media(min-width:640px){ .mf-offer-grid { grid-template-columns:1fr 1fr; } }
.mf-off {
  background:rgba(239,241,245,0.03); border:1px solid rgba(239,241,245,0.09);
  border-radius:18px; padding:22px 20px;
  display:flex; align-items:flex-start; gap:14px;
  transition:transform .3s, border-color .3s, background .3s;
}
.mf-off:hover { transform:translateY(-4px); border-color:rgba(91,141,239,0.5); background:rgba(91,141,239,0.06); }
.mf-off-ck {
  width:32px; height:32px; border-radius:10px; flex-shrink:0;
  background:linear-gradient(135deg,rgba(91,141,239,0.25),rgba(155,107,240,0.25));
  border:1px solid rgba(91,141,239,0.4);
  display:flex; align-items:center; justify-content:center;
  color:#4FD1C5; font-size:14px; font-weight:700;
}
.mf-off-t { font-size:14px; font-weight:600; color:#EFF1F5; margin-bottom:3px; }
.mf-off-d { font-size:12px; line-height:1.7; color:rgba(239,241,245,0.42); font-weight:300; }

/* ============ SIDEBAR ============ */
.mf-sidebar { display:flex; flex-direction:column; gap:14px; }

.mf-ct-card {
  background:linear-gradient(150deg, rgba(91,141,239,0.18), rgba(155,107,240,0.1) 60%, rgba(239,241,245,0.03));
  border:1px solid rgba(239,241,245,0.14); backdrop-filter:blur(16px);
  border-radius:22px; padding:28px 24px; position:relative; overflow:hidden;
}
.mf-ct-card::before {
  content:''; position:absolute; top:-70px; right:-70px; width:200px; height:200px; border-radius:50%;
  background:radial-gradient(circle, rgba(79,209,197,0.25) 0%, transparent 68%); pointer-events:none;
}
.mf-ct-k { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:#4FD1C5; margin-bottom:10px; }
.mf-ct-t { font-size:23px; font-weight:800; letter-spacing:-.02em; color:#EFF1F5; margin-bottom:8px; }
.mf-ct-s { font-size:12px; line-height:1.75; color:rgba(239,241,245,0.45); margin-bottom:22px; font-weight:300; }
.mf-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#EFF1F5; color:#08090C; font-size:13px; font-weight:700;
  padding:15px; border-radius:100px; text-decoration:none;
  transition:transform .2s, opacity .2s; margin-bottom:8px;
}
.mf-ct-btn:hover { transform:translateY(-2px); opacity:.92; }
.mf-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#25D366; color:#fff; font-size:13px; font-weight:700;
  padding:15px; border-radius:100px; text-decoration:none;
  transition:opacity .2s; margin-bottom:12px;
}
.mf-ct-wa:hover { opacity:.9; }
.mf-ct-n { font-family:'DM Mono',monospace; font-size:9.5px; letter-spacing:.14em; text-transform:uppercase; color:rgba(239,241,245,0.3); text-align:center; }

.mf-conn-card {
  background:rgba(239,241,245,0.03); border:1px solid rgba(239,241,245,0.1);
  backdrop-filter:blur(12px); border-radius:20px; padding:20px;
}
.mf-conn-head { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:#5B8DEF; margin-bottom:10px; }
.mf-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(239,241,245,0.07);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
}
.mf-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.mf-conn-row:hover { opacity:.62; }
.mf-conn-l { display:flex; align-items:center; gap:12px; }
.mf-conn-ico { width:36px; height:36px; border-radius:11px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.mf-conn-lbl { font-size:13px; font-weight:600; color:#EFF1F5; }
.mf-conn-sub { font-size:11px; color:rgba(239,241,245,0.35); }

.mf-loc-card {
  background:rgba(239,241,245,0.03); border:1px solid rgba(239,241,245,0.1);
  backdrop-filter:blur(12px); border-radius:18px; padding:16px 18px;
}
.mf-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#EFF1F5; transition:opacity .2s; }
.mf-loc-row:hover { opacity:.72; }
.mf-loc-ico {
  width:42px; height:42px; border-radius:12px; flex-shrink:0;
  background:linear-gradient(135deg,rgba(91,141,239,0.2),rgba(79,209,197,0.2));
  display:flex; align-items:center; justify-content:center;
}
.mf-loc-n { font-size:14px; font-weight:600; }
.mf-loc-s { font-size:11px; color:rgba(239,241,245,0.35); margin-top:2px; font-weight:300; }

.mf-share-card {
  background:rgba(239,241,245,0.03); border:1px solid rgba(239,241,245,0.1);
  backdrop-filter:blur(12px); border-radius:18px; padding:16px 18px;
  display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.mf-share-l { font-family:'DM Mono',monospace; font-size:9.5px; letter-spacing:.16em; text-transform:uppercase; color:rgba(239,241,245,0.35); margin-bottom:4px; }
.mf-share-u {
  font-size:13px; font-weight:700;
  background:linear-gradient(100deg,#5B8DEF,#4FD1C5);
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
}

/* ============ MOBILE BAR ============ */
.mf-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(8,9,12,0.85); backdrop-filter:blur(22px);
  border-top:1px solid rgba(239,241,245,0.1);
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .mf-bar { display:none; } }
.mf-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:linear-gradient(100deg,#5B8DEF,#9B6BF0); color:#fff;
  font-size:13px; font-weight:700; padding:14px; border-radius:100px; text-decoration:none;
  box-shadow:0 6px 20px rgba(91,141,239,0.35);
}
.mf-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff; font-size:13px; font-weight:700;
  padding:14px; border-radius:100px; text-decoration:none;
}
@media(max-width:374px){ .mf-hero-h1 { font-size:40px; } }
`;

const SHOTS_META = [
  { title: 'Momentul „Da"', note: 'Cununie · Prahova' },
  { title: 'Primul dans', note: 'Nuntă · București' },
  { title: 'Emoții reale', note: 'Reportaj · Eveniment' },
  { title: 'Cadrul perfect', note: 'Nuntă · Prahova' },
  { title: 'Povestea zilei', note: 'Foto-Video · Eveniment' },
];

export default async function MiaFramesPage() {
  const p = await getProvider();
  if (!p) notFound();

  const galleryIds: string[] = p.gallery_images ? p.gallery_images.split(',') : [];
  const shortUrl = `https://vibeinvite.ro/${p.short_slug}`;
  const profileImg = p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_300,h_300,c_fill/${p.profile_image}.jpg`;
  const clickTarget = p.website_url || p.instagram_url || '#';

  const shots = galleryIds.map((id, i) => ({
    id,
    title: SHOTS_META[i]?.title || 'Cadru MIA Frames',
    note: SHOTS_META[i]?.note || 'Foto-Video · Eveniment',
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.vibeinvite.ro/foto-video-prahova-mia-frames',
    name: 'MIA Frames',
    description: 'Servicii foto-video profesionale pentru nunți, botezuri, majorate și evenimente în Prahova și București.',
    url: 'https://www.vibeinvite.ro/foto-video-prahova-mia-frames',
    telephone: '+40751552158',
    address: { '@type': 'PostalAddress', addressRegion: 'Prahova', addressCountry: 'RO' },
    image: profileImg,
    sameAs: [p.facebook_url, p.instagram_url, p.website_url].filter(Boolean),
    areaServed: ['Prahova', 'București', 'Ilfov'],
    slogan: 'Povești. Oameni. Emoții.',
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TrackView slug={p.slug} />
      <div className="mf">

        <div className="mf-aurora">
          <span className="mf-blob b1" />
          <span className="mf-blob b2" />
          <span className="mf-blob b3" />
        </div>
        <div className="mf-grain" />

        <div className="mf-shell">

          {/* NAV */}
          <nav className="mf-nav" id="mf-nav">
            <a href="/servicii-nunta" className="mf-nav-back">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              Înapoi
            </a>
            <div className="mf-nav-logo">MIA <span>Frames</span></div>
            <ShareButton shortUrl={shortUrl} name={p.name} />
          </nav>

          {/* HERO */}
          <div className="mf-hero">
            <div className="mf-hero-badge">
              <span className="mf-badge-dot" />
              Foto-Video Verificat · VibeInvite
            </div>
            <h1 className="mf-hero-h1">
              Povești. Oameni. <span>Emoții.</span>
            </h1>
            <p className="mf-hero-tag">MIA Frames <i>·</i> Prahova <i>·</i> București</p>
            <p className="mf-hero-desc">
              Suntem o <b>echipă tânără</b> care pune accent pe emoții reale, cadre autentice și amintiri surprinse natural — într-un stil <b>modern și elegant</b>. Documentăm fiecare etapă a evenimentului, discret, ca tu să te bucuri de fiecare clipă.
            </p>
            <div className="mf-hero-actions">
              {p.phone && (
                <a href={`tel:${p.phone}`} className="mf-btn">
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  Sună Acum
                </a>
              )}
              {p.website_url && (
                <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="mf-btn-glass">
                  miaframes.ro →
                </a>
              )}
              {p.instagram_url && (
                <a href={p.instagram_url} target="_blank" rel="noopener noreferrer" className="mf-btn-glass">
                  Instagram →
                </a>
              )}
            </div>
            <div className="mf-hero-facts">
              <div className="mf-fact"><div className="mf-fact-k">Servicii</div><div className="mf-fact-v">Foto & Video</div></div>
              <div className="mf-fact"><div className="mf-fact-k">Zonă</div><div className="mf-fact-v">Prahova · BUC</div></div>
              <div className="mf-fact"><div className="mf-fact-k">Galerie</div><div className="mf-fact-v">Online privată</div></div>
              <div className="mf-fact"><div className="mf-fact-k">Livrare</div><div className="mf-fact-v">Rapidă</div></div>
            </div>
          </div>

          {/* TICKER */}
          <div className="mf-ticker">
            <div className="mf-ticker-inner">
              {['Nunți', 'Botezuri', 'Majorate', 'Evenimente', 'Prahova', 'București', 'Pachete personalizate', 'Galerie privată', 'Nunți', 'Botezuri', 'Majorate', 'Evenimente', 'Prahova', 'București', 'Pachete personalizate', 'Galerie privată'].map((t, i) => (
                <div key={i} className="mf-ticker-item">
                  {t}
                  <i>◆</i>
                </div>
              ))}
            </div>
          </div>

          {/* STRIP */}
          <div className="mf-strip">
            <img className="mf-strip-avatar" src={profileImg} alt={p.name} />
            <div>
              <div className="mf-strip-name">{p.name}</div>
              <div className="mf-strip-sub">FOTO-VIDEO · PRAHOVA & BUCUREȘTI</div>
            </div>
            <div className="mf-strip-spacer" />
            {p.phone && <CallButton phone={p.phone} slug={p.slug} className="mf-strip-cta" />}
          </div>

          {/* BODY */}
          <div className="mf-body">
            <div>

              {/* PORTFOLIO REEL */}
              {shots.length > 0 && (
                <div className="mf-portfolio">
                  <div className="mf-sh">
                    <div className="mf-sh-k">Portofoliu</div>
                    <h2 className="mf-sh-t">Cadre din <span>poveștile lor</span></h2>
                  </div>
                  <MiaReel shots={shots} cloud={CLOUD} href={clickTarget} slug={p.slug} />
                </div>
              )}

              {/* ABOUT */}
              <div className="mf-about">
                <div className="mf-sh">
                  <div className="mf-sh-k">Despre noi</div>
                  <h2 className="mf-sh-t">Cine <span>suntem</span></h2>
                </div>
                <div className="mf-about-card">
                  <p className="mf-about-quote">
                    Nu regizăm momente. <span>Le așteptăm, le simțim, le păstrăm.</span>
                  </p>
                  <p className="mf-about-text">
                    <b>MIA Frames</b> oferă servicii foto-video profesionale pentru <b>nunți, botezuri, majorate și evenimente</b> în Prahova și București. Suntem o echipă tânără care pune accent pe emoții reale, cadre autentice și amintiri surprinse natural, într-un stil modern și elegant.
                  </p>
                  <p className="mf-about-text">
                    Prin <b>atenție la detalii</b> și o <b>abordare discretă</b>, documentăm fiecare etapă a evenimentului astfel încât să vă puteți bucura de fiecare clipă, fără griji.
                  </p>
                  <p className="mf-about-text">
                    Ne deplasăm pentru evenimente în <b>Prahova, București și împrejurimi</b>.
                  </p>
                  <div className="mf-about-sig">
                    <img className="mf-about-sig-av" src={profileImg} alt={p.name} />
                    <div>
                      <div className="mf-about-sig-n">MIA Frames</div>
                      <div className="mf-about-sig-r">POVEȘTI. OAMENI. EMOȚII.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* OFFER */}
              <div className="mf-offer">
                <div className="mf-sh">
                  <div className="mf-sh-k">Ce vă oferim</div>
                  <h2 className="mf-sh-t">Servicii <span>complete</span></h2>
                </div>
                <div className="mf-offer-grid">
                  <div className="mf-off">
                    <div className="mf-off-ck">✓</div>
                    <div>
                      <div className="mf-off-t">Fotografie & Videografie</div>
                      <div className="mf-off-d">Servicii profesionale, echipament modern, ochi pentru detaliu.</div>
                    </div>
                  </div>
                  <div className="mf-off">
                    <div className="mf-off-ck">✓</div>
                    <div>
                      <div className="mf-off-t">Pachete Personalizate</div>
                      <div className="mf-off-d">Adaptate pentru orice tip de eveniment și buget.</div>
                    </div>
                  </div>
                  <div className="mf-off">
                    <div className="mf-off-ck">✓</div>
                    <div>
                      <div className="mf-off-t">Galerie Online Privată</div>
                      <div className="mf-off-d">Toate cadrele voastre, într-un singur loc, doar pentru voi.</div>
                    </div>
                  </div>
                  <div className="mf-off">
                    <div className="mf-off-ck">✓</div>
                    <div>
                      <div className="mf-off-t">Editare & Livrare Rapidă</div>
                      <div className="mf-off-d">Procesare atentă, fără luni de așteptare.</div>
                    </div>
                  </div>
                  <div className="mf-off">
                    <div className="mf-off-ck">✓</div>
                    <div>
                      <div className="mf-off-t">Amintiri Autentice</div>
                      <div className="mf-off-d">Create cu pasiune, fără poze forțate.</div>
                    </div>
                  </div>
                  <div className="mf-off">
                    <div className="mf-off-ck">✓</div>
                    <div>
                      <div className="mf-off-t">Deplasare Inclusă</div>
                      <div className="mf-off-d">Prahova, București și împrejurimi.</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* SIDEBAR */}
            <div className="mf-sidebar">

              <div className="mf-ct-card">
                <div className="mf-ct-k">Contact direct</div>
                <div className="mf-ct-t">Rezervă-ți data</div>
                <p className="mf-ct-s">Scrie-ne pentru disponibilitate și un pachet personalizat pentru evenimentul tău.</p>
                {p.phone && <CallButton phone={p.phone} slug={p.slug} className="mf-ct-btn" />}
                {p.phone && <WaButton phone={p.phone} slug={p.slug} className="mf-ct-wa" />}
                <p className="mf-ct-n">Răspundem rapid</p>
              </div>

              <div className="mf-conn-card">
                <div className="mf-conn-head">Online</div>
                <SocialLinks
                  provider={p}
                  rowClass="mf-conn-row"
                  leftClass="mf-conn-l"
                  icoClass="mf-conn-ico"
                  lblClass="mf-conn-lbl"
                  subClass="mf-conn-sub"
                />
              </div>

              {p.maps_url && (
                <div className="mf-loc-card">
                  <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="mf-loc-row">
                    <div className="mf-loc-ico">
                      <svg width="18" height="18" fill="none" stroke="#4FD1C5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="mf-loc-n">Prahova · București</div>
                      <div className="mf-loc-s">Ne deplasăm și în împrejurimi · Google Maps</div>
                    </div>
                  </a>
                </div>
              )}

              <div className="mf-share-card">
                <div>
                  <div className="mf-share-l">Distribuie profilul</div>
                  <div className="mf-share-u">vibeinvite.ro/{p.short_slug}</div>
                </div>
                <ShareButton shortUrl={shortUrl} name={p.name} />
              </div>

            </div>
          </div>

          {/* MOBILE BAR */}
          <div className="mf-bar">
            {p.phone && <CallButton phone={p.phone} slug={p.slug} className="mf-bar-call" />}
            {p.phone && <WaButton phone={p.phone} slug={p.slug} className="mf-bar-wa" />}
          </div>

        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll',function(){
          var n=document.getElementById('mf-nav');
          if(!n)return;
          if(window.scrollY>80){n.classList.add('scrolled');}
          else{n.classList.remove('scrolled');}
        });
      `}} />
    </>
  );
}