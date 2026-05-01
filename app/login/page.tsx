// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link"; // ADĂUGAT

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         body: JSON.stringify({ email, password }),
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Redirecționăm în funcție de tema salvată
//         if (data.theme === "Lux") {
//           router.push("/dashboard/lux");
//         } else {
//           router.push("/dashboard/nature");
//         }
//       } else {
//         alert(data.error || "Date invalide");
//       }
//     } catch (err) {
//       alert("Eroare de conexiune");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
//       <h1 style={{ color: 'black' }}>Autentificare Miri</h1>
//       <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
//         <input 
//           type="email" 
//           placeholder="Email" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//           required 
//           style={{ padding: '12px', color: 'black', borderRadius: '8px', border: '1px solid #ccc' }}
//         />
//         <input 
//           type="password" 
//           placeholder="Parolă" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//           required 
//           style={{ padding: '12px', color: 'black', borderRadius: '8px', border: '1px solid #ccc' }}
//         />
//         <button type="submit" disabled={loading} style={{ padding: '12px', background: 'black', color: 'white', cursor: 'pointer', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
//           {loading ? "Se verifică..." : "Intră în Dashboard"}
//         </button>
//       </form>

//       {/* LINK ADĂUGAT AICI */}
//       <div style={{ marginTop: '20px' }}>
//         <Link href="/auth/forgot-password" style={{ color: 'gray', fontSize: '0.9rem', textDecoration: 'none' }}>
//           Ai uitat parola?
//         </Link>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

/* ═══════════════════════════════════════════════════════════════
   SEO METADATA
═══════════════════════════════════════════════════════════════ */
// Dacă vrei să folosești metadata, mută în layout.tsx sau page.tsx server component:
// export const metadata: Metadata = {
//   title: 'Autentificare | VibeInvite — Invitații Digitale Premium',
//   description: 'Intră în contul tău VibeInvite și gestionează invitațiile digitale, RSVP-urile și albumul foto pentru nunta sau botezul tău.',
//   robots: { index: false, follow: false },
// };

/* ═══════════════════════════════════════════════════════════════
   STYLES — prefix vl- (login page)
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.vl-page * { box-sizing: border-box; margin: 0; padding: 0; }

.vl-page {
  font-family: 'DM Sans', sans-serif;
  background: #FDFAF6;
  color: #1A1208;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* ── orbs ── */
@keyframes vl-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-20px) scale(1.05)} 66%{transform:translate(-14px,14px) scale(.96)} }
.vl-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(80px); }
.vl-o1  { width: 480px; height: 480px; background: radial-gradient(circle,rgba(255,107,0,.16) 0%,transparent 70%); top: -100px; right: -100px; animation: vl-orb 14s ease-in-out infinite; }
.vl-o2  { width: 300px; height: 300px; background: radial-gradient(circle,rgba(255,107,0,.09) 0%,transparent 70%); bottom: 60px; left: -60px; animation: vl-orb 18s ease-in-out infinite reverse; }
.vl-o3  { width: 220px; height: 220px; background: radial-gradient(circle,rgba(255,200,100,.1) 0%,transparent 70%); top: 50%; left: 30%; animation: vl-orb 22s ease-in-out infinite 4s; }

/* ── animations ── */
@keyframes vl-up     { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes vl-in     { from{opacity:0} to{opacity:1} }
@keyframes vl-dot    { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
@keyframes vl-shimmer{ 0%{background-position:-400px 0} 100%{background-position:400px 0} }
@keyframes vl-tick   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes vl-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes vl-shake  { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }

/* ── ticker ── */
.vl-ticker   { overflow: hidden; background: #FF6B00; padding: 10px 0; flex-shrink: 0; }
.vl-ti-inner { display: flex; width: max-content; animation: vl-tick 24s linear infinite; }
.vl-ti       { display: flex; align-items: center; gap: 10px; padding: 0 32px; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
.vl-tdot     { width: 4px; height: 4px; background: rgba(255,255,255,.5); border-radius: 50%; }

/* ── main layout ── */
.vl-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px 48px;
  position: relative;
  z-index: 10;
}

/* ── card ── */
.vl-card {
  width: 100%;
  max-width: 440px;
  background: #fff;
  border-radius: 28px;
  border: 1px solid rgba(255,107,0,.12);
  box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 16px 56px rgba(0,0,0,.08);
  overflow: hidden;
  position: relative;
  opacity: 0;
  animation: vl-up .7s ease .1s forwards;
}
.vl-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg, #FF6B00, #FF8C35, #FF6B00);
}

/* decorative ring */
.vl-card-ring {
  position: absolute; border-radius: 50%;
  border: 1px solid rgba(255,107,0,.1);
  pointer-events: none;
  top: -60px; right: -60px;
  width: 200px; height: 200px;
  animation: vl-spin 40s linear infinite;
  border-style: dashed;
}

.vl-card-inner { padding: 40px 36px 36px; }

/* ── card header ── */
.vl-card-header {
  text-align: center;
  margin-bottom: 32px;
}

.vl-super {
  display: inline-flex; align-items: center; gap: 7px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px;
  padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500;
  color: #FF6B00; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 16px;
}
.vl-sdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; animation: vl-dot 1.8s ease-in-out infinite; }

.vl-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 32px;
  font-weight: 300;
  line-height: 1.15;
  color: #1A1208;
  margin-bottom: 8px;
}
.vl-h1 em { font-style: italic; color: #FF6B00; }

.vl-sub {
  font-size: 13px;
  color: rgba(26,18,8,.55);
  line-height: 1.6;
}

/* ── form ── */
.vl-form { display: flex; flex-direction: column; gap: 16px; }

.vl-field { display: flex; flex-direction: column; gap: 6px; }
.vl-label { font-size: 12px; font-weight: 600; color: rgba(26,18,8,.65); letter-spacing: .03em; }

.vl-input-wrap { position: relative; }
.vl-input-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  font-size: 15px; pointer-events: none;
}

.vl-input {
  width: 100%;
  padding: 13px 14px 13px 42px;
  border-radius: 14px;
  border: 1.5px solid rgba(26,18,8,.12);
  background: #FDFAF6;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #1A1208;
  outline: none;
  transition: border-color .2s, box-shadow .2s, background .2s;
  -webkit-appearance: none;
}
.vl-input::placeholder { color: rgba(26,18,8,.35); }
.vl-input:focus {
  border-color: #FF6B00;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(255,107,0,.1);
}

/* ── divider ── */
.vl-divider {
  display: flex; align-items: center; gap: 12px;
  margin: 4px 0;
}
.vl-divider-line { flex: 1; height: 1px; background: rgba(26,18,8,.08); }
.vl-divider-txt  { font-size: 11px; color: rgba(26,18,8,.35); font-weight: 500; letter-spacing: .04em; }

/* ── submit button ── */
.vl-btn {
  display: flex; align-items: center; justify-content: center; gap: 9px;
  padding: 15px 24px; border-radius: 100px;
  background: #FF6B00; color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px; font-weight: 600;
  border: none; cursor: pointer;
  position: relative; overflow: hidden;
  box-shadow: 0 8px 28px rgba(255,107,0,.4);
  transition: background .25s, transform .2s, box-shadow .25s;
  margin-top: 4px;
}
.vl-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
  background-size: 400px 100%; animation: vl-shimmer 2.5s linear infinite;
}
.vl-btn:hover:not(:disabled) { background: #FF8C35; transform: translateY(-2px); box-shadow: 0 14px 40px rgba(255,107,0,.5); }
.vl-btn:disabled { opacity: .7; cursor: not-allowed; transform: none; }

.vl-spinner {
  width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.4);
  border-top-color: #fff; border-radius: 50%; animation: vl-spin .7s linear infinite;
  flex-shrink: 0;
}

/* ── forgot link ── */
.vl-forgot {
  text-align: center;
  margin-top: 6px;
}
.vl-forgot a {
  font-size: 12.5px;
  color: rgba(26,18,8,.45);
  text-decoration: none;
  transition: color .2s;
}
.vl-forgot a:hover { color: #FF6B00; }

/* ── card footer ── */
.vl-card-footer {
  background: linear-gradient(160deg, #FFF4ED 0%, #fff8f0 100%);
  border-top: 1px solid rgba(255,107,0,.1);
  padding: 18px 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}
.vl-footer-ico  { font-size: 16px; }
.vl-footer-txt  { font-size: 12px; color: rgba(26,18,8,.5); }
.vl-footer-txt strong { color: #1A1208; font-weight: 600; }

/* ── below card links ── */
.vl-below {
  text-align: center;
  margin-top: 24px;
  font-size: 13px;
  color: rgba(26,18,8,.5);
  opacity: 0;
  animation: vl-up .7s ease .35s forwards;
}
.vl-below a {
  color: #FF6B00;
  font-weight: 600;
  text-decoration: none;
  transition: opacity .2s;
}
.vl-below a:hover { opacity: .75; }

/* ── error state ── */
.vl-error {
  background: #FFF0F0;
  border: 1px solid rgba(220,38,38,.2);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 13px;
  color: #dc2626;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: vl-shake .35s ease;
}

/* ── responsive ── */
@media (max-width: 480px) {
  .vl-card-inner { padding: 32px 22px 28px; }
  .vl-card-footer { padding: 16px 22px; }
  .vl-h1 { font-size: 28px; }
  .vl-card-ring { display: none; }
}
`;

const TICKER = [
  "💌 Invitații Nelimitate",
  "🍽️ Meniu cu Cod QR",
  "📷 Upload Poze Invitați",
  "✅ RSVP Instant",
  "📊 Export Excel",
  "🗺️ GPS Integrat",
  "💸 300 Lei · Plată Unică",
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        if (data.theme === "Lux") {
          router.push("/dashboard/lux");
        } else {
          router.push("/dashboard/nature");
        }
      } else {
        setError(data.error || "Date invalide. Verifică email-ul și parola.");
      }
    } catch (err) {
      setError("Eroare de conexiune. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Autentificare VibeInvite",
            url: "https://vibeinvite.ro/auth/login",
            description:
              "Autentifică-te în contul tău VibeInvite pentru a gestiona invitațiile digitale, RSVP-urile și albumul foto.",
            isPartOf: {
              "@type": "WebSite",
              name: "VibeInvite",
              url: "https://vibeinvite.ro",
            },
          }),
        }}
      />

      <div className="vl-page">
        {/* bg orbs */}
        <div className="vl-orb vl-o1" aria-hidden="true" />
        <div className="vl-orb vl-o2" aria-hidden="true" />
        <div className="vl-orb vl-o3" aria-hidden="true" />

        {/* ticker top */}
        <div className="vl-ticker" aria-hidden="true">
          <div className="vl-ti-inner">
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vl-ti">
                {t}
                <span className="vl-tdot" />
              </div>
            ))}
          </div>
        </div>

        {/* main content */}
        <main className="vl-main">
          <div style={{ width: "100%", maxWidth: "440px" }}>

            {/* card */}
            <div className="vl-card">
              <div className="vl-card-ring" aria-hidden="true" />

              {/* card body */}
              <div className="vl-card-inner">

                {/* header */}
                <div className="vl-card-header">
                  <p className="vl-super" aria-label="VibeInvite">
                    <span className="vl-sdot" aria-hidden="true" />
                    VibeInvite
                  </p>
                  <h1 className="vl-h1">
                    Bine ai <em>revenit</em>, mire!
                  </h1>
                  <p className="vl-sub">
                    Intră în contul tău și continuă pregătirile pentru ziua cea mare.
                  </p>
                </div>

                {/* form */}
                <form onSubmit={handleLogin} className="vl-form" noValidate>

                  {error && (
                    <div className="vl-error" role="alert">
                      <span aria-hidden="true">⚠️</span>
                      {error}
                    </div>
                  )}

                  <div className="vl-field">
                    <label htmlFor="vl-email" className="vl-label">
                      Adresă email
                    </label>
                    <div className="vl-input-wrap">
                      <span className="vl-input-icon" aria-hidden="true">✉️</span>
                      <input
                        id="vl-email"
                        type="email"
                        placeholder="email@exemplu.ro"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="vl-input"
                      />
                    </div>
                  </div>

                  <div className="vl-field">
                    <label htmlFor="vl-password" className="vl-label">
                      Parolă
                    </label>
                    <div className="vl-input-wrap">
                      <span className="vl-input-icon" aria-hidden="true">🔒</span>
                      <input
                        id="vl-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="vl-input"
                      />
                    </div>
                  </div>

                  <div className="vl-forgot">
                    <Link href="/auth/forgot-password">
                      Ai uitat parola?
                    </Link>
                  </div>

                  <div className="vl-divider" aria-hidden="true">
                    <div className="vl-divider-line" />
                    <span className="vl-divider-txt">acces securizat</span>
                    <div className="vl-divider-line" />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="vl-btn"
                    aria-label="Intră în Dashboard"
                  >
                    {loading ? (
                      <>
                        <span className="vl-spinner" aria-hidden="true" />
                        Se verifică...
                      </>
                    ) : (
                      <>
                        <span aria-hidden="true">✨</span>
                        Intră în Dashboard
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* card footer */}
              <div className="vl-card-footer">
                <span className="vl-footer-ico" aria-hidden="true">🔒</span>
                <span className="vl-footer-txt">
                  <strong>Conexiune securizată</strong> · Datele tale sunt protejate
                </span>
                <span className="vl-footer-ico" aria-hidden="true">⚡</span>
                <span className="vl-footer-txt">
                  <strong>Acces instant</strong> la dashboard
                </span>
              </div>
            </div>

            {/* below card */}
            <div className="vl-below">
              Nu ai cont?{" "}
              <Link href="/preturi">
                Creează-l gratuit →
              </Link>
            </div>
          </div>
        </main>

        {/* ticker bottom */}
        <div className="vl-ticker" aria-hidden="true">
          <div className="vl-ti-inner" style={{ animationDirection: "reverse" }}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vl-ti">
                {t}
                <span className="vl-tdot" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
