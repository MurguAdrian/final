// "use client";

// import { useState, useEffect, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// function SetupPasswordContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isTokenValid, setIsTokenValid] = useState(true);

//   useEffect(() => {
//     if (!token) {
//       setIsTokenValid(false);
//     }
//   }, [token]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     if (password !== confirmPassword) {
//       alert("Parolele nu coincid!");
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const res = await fetch("/api/auth/setup-password", {
//         method: "POST",
//         body: JSON.stringify({ token, password }),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (res.ok) {
//         alert("Parolă setată cu succes! Acum te poți loga.");
//         router.push("/login");
//       } else {
//         alert("Eroare: Link-ul ar putea fi expirat.");
//       }
//     } catch (err) {
//       alert("Eroare de conexiune la server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isTokenValid) {
//     return (
//       <div style={{ textAlign: 'center', marginTop: '100px', color: 'black' }}>
//         <h1>Link invalid</h1>
//         <p>Token-ul lipsește sau a expirat.</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
//       <h1 style={{ color: 'black' }}>Setează parola</h1>
//       <p style={{ color: 'gray' }}>Alege o parolă pentru a accesa dashboard-ul.</p>
      
//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
//         <input 
//           type="password" 
//           placeholder="Parolă nouă" 
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', color: 'black' }}
//         />
//         <input 
//           type="password" 
//           placeholder="Confirmă parola" 
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', color: 'black' }}
//         />
//         <button 
//           type="submit" 
//           disabled={loading}
//           style={{ padding: '12px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
//         >
//           {loading ? "Se salvează..." : "Salvează Parola"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default function SetupPasswordPage() {
//   return (
//     <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '100px', color: 'black' }}>Se încarcă...</div>}>
//       <SetupPasswordContent />
//     </Suspense>
//   );
// }

"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   STYLES — prefix vsp- (setup-password page)
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.vsp-page * { box-sizing: border-box; margin: 0; padding: 0; }

.vsp-page {
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
@keyframes vsp-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-20px) scale(1.05)} 66%{transform:translate(-14px,14px) scale(.96)} }
.vsp-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(80px); }
.vsp-o1  { width: 480px; height: 480px; background: radial-gradient(circle,rgba(255,107,0,.16) 0%,transparent 70%); top: -100px; right: -100px; animation: vsp-orb 14s ease-in-out infinite; }
.vsp-o2  { width: 300px; height: 300px; background: radial-gradient(circle,rgba(255,107,0,.09) 0%,transparent 70%); bottom: 60px; left: -60px; animation: vsp-orb 18s ease-in-out infinite reverse; }
.vsp-o3  { width: 220px; height: 220px; background: radial-gradient(circle,rgba(255,200,100,.1) 0%,transparent 70%); top: 50%; left: 30%; animation: vsp-orb 22s ease-in-out infinite 4s; }

/* ── animations ── */
@keyframes vsp-up      { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes vsp-dot     { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
@keyframes vsp-shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
@keyframes vsp-tick    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes vsp-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes vsp-shake   { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
@keyframes vsp-pop     { 0%{opacity:0;transform:scale(.9)} 60%{transform:scale(1.04)} 100%{opacity:1;transform:scale(1)} }

/* ── ticker ── */
.vsp-ticker   { overflow: hidden; background: #FF6B00; padding: 10px 0; flex-shrink: 0; }
.vsp-ti-inner { display: flex; width: max-content; animation: vsp-tick 24s linear infinite; }
.vsp-ti       { display: flex; align-items: center; gap: 10px; padding: 0 32px; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
.vsp-tdot     { width: 4px; height: 4px; background: rgba(255,255,255,.5); border-radius: 50%; }

/* ── main ── */
.vsp-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px 48px;
  position: relative;
  z-index: 10;
}

/* ── card ── */
.vsp-card {
  width: 100%;
  max-width: 440px;
  background: #fff;
  border-radius: 28px;
  border: 1px solid rgba(255,107,0,.12);
  box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 16px 56px rgba(0,0,0,.08);
  overflow: hidden;
  position: relative;
  opacity: 0;
  animation: vsp-up .7s ease .1s forwards;
}
.vsp-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg, #FF6B00, #FF8C35, #FF6B00);
}
.vsp-card-ring {
  position: absolute; border-radius: 50%;
  border: 1px dashed rgba(255,107,0,.1);
  pointer-events: none;
  top: -60px; right: -60px;
  width: 200px; height: 200px;
  animation: vsp-spin 40s linear infinite;
}

.vsp-card-inner { padding: 40px 36px 36px; }

/* ── header ── */
.vsp-card-header { text-align: center; margin-bottom: 28px; }

.vsp-super {
  display: inline-flex; align-items: center; gap: 7px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px;
  padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500;
  color: #FF6B00; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 16px;
}
.vsp-sdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; animation: vsp-dot 1.8s ease-in-out infinite; }

.vsp-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 32px; font-weight: 300; line-height: 1.15; color: #1A1208; margin-bottom: 8px;
}
.vsp-h1 em { font-style: italic; color: #FF6B00; }
.vsp-sub { font-size: 13px; color: rgba(26,18,8,.55); line-height: 1.6; }

/* ── strength bar ── */
.vsp-strength { margin-top: 8px; }
.vsp-strength-bar {
  height: 4px; border-radius: 100px; background: rgba(26,18,8,.08);
  overflow: hidden; margin-bottom: 5px;
}
.vsp-strength-fill {
  height: 100%; border-radius: 100px;
  transition: width .35s ease, background .35s ease;
}
.vsp-strength-label { font-size: 11px; font-weight: 500; }

/* ── form ── */
.vsp-form { display: flex; flex-direction: column; gap: 16px; }
.vsp-field { display: flex; flex-direction: column; gap: 6px; }
.vsp-label { font-size: 12px; font-weight: 600; color: rgba(26,18,8,.65); letter-spacing: .03em; }

.vsp-input-wrap { position: relative; }
.vsp-input-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  font-size: 15px; pointer-events: none;
}

.vsp-input {
  width: 100%;
  padding: 13px 14px 13px 42px;
  border-radius: 14px;
  border: 1.5px solid rgba(26,18,8,.12);
  background: #FDFAF6;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; color: #1A1208; outline: none;
  transition: border-color .2s, box-shadow .2s, background .2s;
  -webkit-appearance: none;
}
.vsp-input::placeholder { color: rgba(26,18,8,.35); }
.vsp-input:focus { border-color: #FF6B00; background: #fff; box-shadow: 0 0 0 3px rgba(255,107,0,.1); }
.vsp-input.error { border-color: #dc2626; box-shadow: 0 0 0 3px rgba(220,38,38,.1); }
.vsp-input.success { border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,.1); }

/* ── match indicator ── */
.vsp-match {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 500; margin-top: 6px;
  opacity: 0; transition: opacity .2s;
}
.vsp-match.visible { opacity: 1; }
.vsp-match.ok  { color: #16a34a; }
.vsp-match.bad { color: #dc2626; animation: vsp-shake .35s ease; }

/* ── divider ── */
.vsp-divider { display: flex; align-items: center; gap: 12px; margin: 4px 0; }
.vsp-divider-line { flex: 1; height: 1px; background: rgba(26,18,8,.08); }
.vsp-divider-txt  { font-size: 11px; color: rgba(26,18,8,.35); font-weight: 500; letter-spacing: .04em; }

/* ── btn ── */
.vsp-btn {
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
.vsp-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
  background-size: 400px 100%; animation: vsp-shimmer 2.5s linear infinite;
}
.vsp-btn:hover:not(:disabled) { background: #FF8C35; transform: translateY(-2px); box-shadow: 0 14px 40px rgba(255,107,0,.5); }
.vsp-btn:disabled { opacity: .7; cursor: not-allowed; transform: none; }
.vsp-spinner {
  width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.4);
  border-top-color: #fff; border-radius: 50%; animation: vsp-spin .7s linear infinite; flex-shrink: 0;
}

/* ── alert boxes ── */
.vsp-error {
  background: #FFF0F0; border: 1px solid rgba(220,38,38,.2);
  border-radius: 12px; padding: 12px 14px;
  font-size: 13px; color: #dc2626;
  display: flex; align-items: center; gap: 8px;
  animation: vsp-shake .35s ease;
}
.vsp-success {
  background: #F0FFF4; border: 1px solid rgba(22,163,74,.2);
  border-radius: 12px; padding: 16px 14px;
  font-size: 14px; color: #15803d;
  display: flex; align-items: center; gap: 10px;
  animation: vsp-pop .4s ease forwards;
}
.vsp-success-icon { font-size: 22px; flex-shrink: 0; }

/* ── tips row ── */
.vsp-tips {
  display: flex; flex-direction: column; gap: 5px;
  background: #FDFAF6; border-radius: 14px;
  border: 1px solid rgba(255,107,0,.08); padding: 14px 16px;
}
.vsp-tip {
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; color: rgba(26,18,8,.55);
  transition: color .2s;
}
.vsp-tip.met { color: #16a34a; }
.vsp-tip-dot {
  width: 6px; height: 6px; border-radius: 50%; background: rgba(26,18,8,.2); flex-shrink: 0;
  transition: background .2s;
}
.vsp-tip.met .vsp-tip-dot { background: #16a34a; }

/* ── card footer ── */
.vsp-card-footer {
  background: linear-gradient(160deg, #FFF4ED 0%, #fff8f0 100%);
  border-top: 1px solid rgba(255,107,0,.1);
  padding: 18px 36px;
  display: flex; align-items: center; justify-content: center;
  gap: 10px; flex-wrap: wrap;
}
.vsp-footer-ico { font-size: 16px; }
.vsp-footer-txt { font-size: 12px; color: rgba(26,18,8,.5); }
.vsp-footer-txt strong { color: #1A1208; font-weight: 600; }

/* ── below card ── */
.vsp-below {
  text-align: center; margin-top: 24px; font-size: 13px;
  color: rgba(26,18,8,.5); opacity: 0; animation: vsp-up .7s ease .35s forwards;
}
.vsp-below a { color: #FF6B00; font-weight: 600; text-decoration: none; transition: opacity .2s; }
.vsp-below a:hover { opacity: .75; }

/* ── invalid token card ── */
.vsp-invalid {
  width: 100%; max-width: 440px; text-align: center;
  background: #fff; border-radius: 28px;
  border: 1px solid rgba(255,107,0,.12);
  box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 16px 56px rgba(0,0,0,.08);
  overflow: hidden; position: relative;
  opacity: 0; animation: vsp-up .7s ease .1s forwards;
}
.vsp-invalid::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg, #dc2626, #f87171, #dc2626);
}
.vsp-invalid-inner { padding: 48px 36px 40px; }
.vsp-invalid-ico { font-size: 48px; margin-bottom: 16px; }
.vsp-invalid-h { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; color: #1A1208; margin-bottom: 10px; }
.vsp-invalid-p { font-size: 14px; color: rgba(26,18,8,.55); line-height: 1.7; margin-bottom: 24px; }
.vsp-invalid-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: 100px;
  background: #FF6B00; color: #fff;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(255,107,0,.35);
  transition: background .2s, transform .2s;
}
.vsp-invalid-btn:hover { background: #FF8C35; transform: translateY(-2px); }

/* ── loading fallback ── */
.vsp-loading {
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  color: rgba(26,18,8,.45); font-size: 14px;
}
.vsp-loading-spinner {
  width: 32px; height: 32px; border: 3px solid rgba(255,107,0,.2);
  border-top-color: #FF6B00; border-radius: 50%; animation: vsp-spin .8s linear infinite;
}

/* ── responsive ── */
@media (max-width: 480px) {
  .vsp-card-inner { padding: 32px 22px 28px; }
  .vsp-card-footer { padding: 16px 22px; }
  .vsp-invalid-inner { padding: 36px 22px 32px; }
  .vsp-h1 { font-size: 26px; }
  .vsp-card-ring { display: none; }
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

/* ── password strength util ── */
function getStrength(pwd: string): { score: number; label: string; color: string } {
  if (!pwd) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (pwd.length >= 8)  score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { score: 20,  label: "Slabă",     color: "#dc2626" };
  if (score <= 2) return { score: 40,  label: "Acceptabilă", color: "#f97316" };
  if (score <= 3) return { score: 65,  label: "Bună",       color: "#eab308" };
  if (score <= 4) return { score: 85,  label: "Puternică",  color: "#22c55e" };
  return               { score: 100, label: "Excelentă",  color: "#16a34a" };
}

/* ════════════════════════════════════════════
   INNER CONTENT
════════════════════════════════════════════ */
function SetupPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword]               = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading]                 = useState(false);
  const [isTokenValid, setIsTokenValid]        = useState(true);
  const [error, setError]                      = useState("");
  const [success, setSuccess]                  = useState(false);

  useEffect(() => { if (!token) setIsTokenValid(false); }, [token]);

  const strength = getStrength(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const tips = [
    { text: "Minim 8 caractere",              met: password.length >= 8 },
    { text: "O literă mare (A–Z)",             met: /[A-Z]/.test(password) },
    { text: "O cifră (0–9)",                   met: /[0-9]/.test(password) },
    { text: "Un caracter special (!@#$...)",   met: /[^A-Za-z0-9]/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Parolele nu coincid! Verifică și încearcă din nou.");
      return;
    }
    if (password.length < 8) {
      setError("Parola trebuie să aibă cel puțin 8 caractere.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/setup-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 2500);
      } else {
        setError("Link-ul ar putea fi expirat. Solicită un link nou.");
      }
    } catch {
      setError("Eroare de conexiune la server. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  /* ── invalid token ── */
  if (!isTokenValid) {
    return (
      <div className="vsp-invalid">
        <div className="vsp-invalid-inner">
          <div className="vsp-invalid-ico">🔗</div>
          <h1 className="vsp-invalid-h">Link invalid</h1>
          <p className="vsp-invalid-p">
            Token-ul lipsește sau a expirat.<br />
            Solicită un nou link de activare prin email.
          </p>
          <Link href="/login" className="vsp-invalid-btn">
            <span aria-hidden="true">←</span>
            Înapoi la Login
          </Link>
        </div>
      </div>
    );
  }

  /* ── success state ── */
  if (success) {
    return (
      <div className="vsp-card" style={{ maxWidth: 440, width: "100%" }}>
        <div className="vsp-card-inner" style={{ textAlign: "center", paddingBottom: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h1 className="vsp-h1" style={{ marginBottom: 12 }}>
            Parolă <em>setată!</em>
          </h1>
          <p className="vsp-sub" style={{ marginBottom: 24 }}>
            Contul tău e activat. Te redirecționăm automat la pagina de login...
          </p>
          <div className="vsp-success">
            <span className="vsp-success-icon" aria-hidden="true">✅</span>
            <span>Redirecționare în câteva secunde...</span>
          </div>
        </div>
      </div>
    );
  }

  /* ── main form ── */
  return (
    <div className="vsp-card">
      <div className="vsp-card-ring" aria-hidden="true" />

      <div className="vsp-card-inner">

        {/* header */}
        <div className="vsp-card-header">
          <p className="vsp-super" aria-label="VibeInvite">
            <span className="vsp-sdot" aria-hidden="true" />
            VibeInvite
          </p>
          <h1 className="vsp-h1">
            Setează <em>parola</em>
          </h1>
          <p className="vsp-sub">
            Alege o parolă sigură pentru a accesa dashboard-ul nunții tale.
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="vsp-form" noValidate>

          {error && (
            <div className="vsp-error" role="alert">
              <span aria-hidden="true">⚠️</span>
              {error}
            </div>
          )}

          {/* password field */}
          <div className="vsp-field">
            <label htmlFor="vsp-password" className="vsp-label">Parolă nouă</label>
            <div className="vsp-input-wrap">
              <span className="vsp-input-icon" aria-hidden="true">🔒</span>
              <input
                id="vsp-password"
                type="password"
                placeholder="Minim 8 caractere"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="vsp-input"
              />
            </div>

            {/* strength bar */}
            {password.length > 0 && (
              <div className="vsp-strength">
                <div className="vsp-strength-bar">
                  <div
                    className="vsp-strength-fill"
                    style={{ width: `${strength.score}%`, background: strength.color }}
                  />
                </div>
                <span className="vsp-strength-label" style={{ color: strength.color }}>
                  {strength.label}
                </span>
              </div>
            )}
          </div>

          {/* tips */}
          {password.length > 0 && (
            <div className="vsp-tips" aria-label="Cerințe parolă">
              {tips.map((t) => (
                <div key={t.text} className={`vsp-tip${t.met ? " met" : ""}`}>
                  <div className="vsp-tip-dot" aria-hidden="true" />
                  {t.met ? "✓ " : ""}{t.text}
                </div>
              ))}
            </div>
          )}

          {/* confirm field */}
          <div className="vsp-field">
            <label htmlFor="vsp-confirm" className="vsp-label">Confirmă parola</label>
            <div className="vsp-input-wrap">
              <span className="vsp-input-icon" aria-hidden="true">🔑</span>
              <input
                id="vsp-confirm"
                type="password"
                placeholder="Repetă parola"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                className={`vsp-input${passwordsMatch ? " success" : ""}${passwordsMismatch ? " error" : ""}`}
              />
            </div>
            <div className={`vsp-match${confirmPassword.length > 0 ? " visible" : ""}${passwordsMatch ? " ok" : " bad"}`}>
              {passwordsMatch
                ? <><span aria-hidden="true">✓</span> Parolele coincid</>
                : <><span aria-hidden="true">✗</span> Parolele nu coincid</>
              }
            </div>
          </div>

          <div className="vsp-divider" aria-hidden="true">
            <div className="vsp-divider-line" />
            <span className="vsp-divider-txt">acces securizat</span>
            <div className="vsp-divider-line" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="vsp-btn"
            aria-label="Salvează parola"
          >
            {loading ? (
              <>
                <span className="vsp-spinner" aria-hidden="true" />
                Se salvează...
              </>
            ) : (
              <>
                <span aria-hidden="true">✨</span>
                Salvează Parola
              </>
            )}
          </button>
        </form>
      </div>

      {/* footer */}
      <div className="vsp-card-footer">
        <span className="vsp-footer-ico" aria-hidden="true">🔒</span>
        <span className="vsp-footer-txt">
          <strong>Conexiune securizată</strong> · Parola e criptată
        </span>
        <span className="vsp-footer-ico" aria-hidden="true">⚡</span>
        <span className="vsp-footer-txt">
          <strong>Acces instant</strong> după salvare
        </span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   PAGE WRAPPER
════════════════════════════════════════════ */
export default function SetupPasswordPage() {
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
            name: "Setează Parola | VibeInvite",
            url: "https://vibeinvite.ro/setup-password",
            description: "Setează parola contului tău VibeInvite pentru a accesa dashboard-ul nunții.",
            isPartOf: { "@type": "WebSite", name: "VibeInvite", url: "https://vibeinvite.ro" },
          }),
        }}
      />

      <div className="vsp-page">
        {/* bg orbs */}
        <div className="vsp-orb vsp-o1" aria-hidden="true" />
        <div className="vsp-orb vsp-o2" aria-hidden="true" />
        <div className="vsp-orb vsp-o3" aria-hidden="true" />

        {/* ticker top */}
        <div className="vsp-ticker" aria-hidden="true">
          <div className="vsp-ti-inner">
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vsp-ti">{t}<span className="vsp-tdot" /></div>
            ))}
          </div>
        </div>

        {/* main */}
        <main className="vsp-main">
          <div style={{ width: "100%", maxWidth: "440px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Suspense
              fallback={
                <div className="vsp-loading">
                  <div className="vsp-loading-spinner" aria-hidden="true" />
                  Se încarcă...
                </div>
              }
            >
              <SetupPasswordContent />
            </Suspense>

            <div className="vsp-below">
              Ai deja cont?{" "}
              <Link href="/login">Autentifică-te →</Link>
            </div>
          </div>
        </main>

        {/* ticker bottom */}
        <div className="vsp-ticker" aria-hidden="true">
          <div className="vsp-ti-inner" style={{ animationDirection: "reverse" }}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vsp-ti">{t}<span className="vsp-tdot" /></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
