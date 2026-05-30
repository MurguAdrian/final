
"use client";
import { useState } from "react";

const THEME_STRIPE: Record<string, { productId: string; priceId: string }> = {
  lux:      { productId: "prod_TODO_LUX",       priceId: "price_1TQR40DLRG6cKGjIoripBApH" },
  nature:   { productId: "prod_TODO_NATURE",    priceId: "price_1TQR3UDLRG6cKGjIUYoD8nVZ" },
  boho:     { productId: "prod_UWtAhTz7QpGP2m", priceId: "price_1TXpNtDLRG6cKGjIYlxLA2fP" },
  royal:    { productId: "prod_UbiaArWhOjNjF2", priceId: "price_1TcV9iDLRG6cKGjIcPjYoUoK" },
  minimal:  { productId: "prod_UWtBC0f4i3qLIg", priceId: "price_1TXpP8DLRG6cKGjIWTkmUYUn" },
  romantic: { productId: "prod_UWtCXrDQ6We3Du", priceId: "price_1TXpPlDLRG6cKGjIGRosuloE" },
};

type Theme = {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  desc: string;
  accent: string;
  accentText: string;
  pillBg: string;
  pillText: string;
  barGrad: string;
};

const THEMES: Theme[] = [
  {
    id: "lux",
    name: "Tema LUX",
    icon: "✨",
    tagline: "Opulență & Grandoare",
    desc: "Aur veritabil pe negru profund. Invitație digitală care impresionează înainte de eveniment.",
    accent: "#C9A84C",
    accentText: "#1A1208",
    pillBg: "#FFF8E6",
    pillText: "#7D5A1E",
    barGrad: "linear-gradient(90deg,#7D5A1E,#C9A84C,#E8C96A,#C9A84C,#7D5A1E)",
  },
  {
    id: "nature",
    name: "Tema NATURE",
    icon: "🌿",
    tagline: "Prospețime & Nou Început",
    desc: "Tonuri botanice de verde mint. Perfectă pentru cupluri care iubesc natura și aerul curat.",
    accent: "#2D6A4F",
    accentText: "#fff",
    pillBg: "#D8F3DC",
    pillText: "#1B4332",
    barGrad: "linear-gradient(90deg,#1B4332,#2D6A4F,#52B788,#2D6A4F,#1B4332)",
  },
  {
    id: "boho",
    name: "Tema BOHO",
    icon: "🌸",
    tagline: "Libertate & Autenticitate",
    desc: "Terracotta cald și roz prăfuit. O invitație ca o îmbrățișare caldă — cu suflet și naturalețe.",
    accent: "#C47A5A",
    accentText: "#fff",
    pillBg: "#FDE8DC",
    pillText: "#7D3C1E",
    barGrad: "linear-gradient(90deg,#7D3C1E,#C47A5A,#E8A87C,#C47A5A,#7D3C1E)",
  },
  {
    id: "royal",
    name: "Tema ROYAL",
    icon: "👑",
    tagline: "Majestate & Eleganță Regală",
    desc: "Albastru regal profund cu argintiu. Inspirat din palatele europene — pentru nunți de poveste.",
    accent: "#2C3E8C",
    accentText: "#fff",
    pillBg: "#EEF2FF",
    pillText: "#1A2654",
    barGrad: "linear-gradient(90deg,#0f1a3d,#2C3E8C,#8B9FE8,#2C3E8C,#0f1a3d)",
  },
  {
    id: "minimal",
    name: "Tema MINIMAL",
    icon: "◻️",
    tagline: "Mai Puțin Înseamnă Mai Mult",
    desc: "Alb imaculat și negru pur. Pentru cupluri moderne care cred că eleganța stă în simplitate.",
    accent: "#1A1208",
    accentText: "#fff",
    pillBg: "#F2F0ED",
    pillText: "#1A1208",
    barGrad: "linear-gradient(90deg,#000,#1A1208,#5A4F44,#1A1208,#000)",
  },
  {
    id: "romantic",
    name: "Tema ROMANTIC",
    icon: "🌹",
    tagline: "Iubire & Pasiune Eternă",
    desc: "Roșu trandafiriu și bujori. O declarație de dragoste în sine — caldă, senzorială, de neuitat.",
    accent: "#9B2335",
    accentText: "#fff",
    pillBg: "#FDEAED",
    pillText: "#6B1520",
    barGrad: "linear-gradient(90deg,#4a0a11,#9B2335,#D4687A,#9B2335,#4a0a11)",
  },
];

export default function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const isReady = accepted && privacyAccepted && email.includes("@") && email.length > 4;

  const handlePayment = async (theme: Theme) => {
    if (!accepted || !privacyAccepted) {
      alert("Trebuie să accepți Termenii, Politica de Confidențialitate și colectarea datelor pentru a continua.");
      return;
    }
    if (!email || !email.includes("@")) {
      alert("Te rugăm să introduci o adresă de email validă!");
      return;
    }
    const stripe = THEME_STRIPE[theme.id];
    if (!stripe) {
      alert("Tema selectată nu este disponibilă momentan.");
      return;
    }
    setLoading(theme.id);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          priceId: stripe.priceId,
          productId: stripe.productId,
          themeName: theme.id,
        }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Eroare la inițierea plății.");
        setLoading("");
      }
    } catch {
      alert("A apărut o eroare de conexiune.");
      setLoading("");
    }
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Inter', sans-serif",
      background: "#FDFAF6",
      color: "#1A1208",
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      overscrollBehavior: "none",
    }}>

      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap"
      />

      {/* Top bar */}
      <div style={{
        background: "#1A1208",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 20,
          fontWeight: 600,
          color: "#fff",
          letterSpacing: "0.02em",
        }}>
          Vibe<em style={{ color: "#C9A84C", fontStyle: "italic" }}>Invite</em>
        </span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
          🔒 Plată securizată Stripe
        </span>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", overscrollBehavior: "contain" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px 80px" }}>

          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#FFF4ED",
              border: "1px solid rgba(255,107,0,0.25)",
              borderRadius: 100,
              padding: "5px 14px",
              fontSize: 11,
              fontWeight: 600,
              color: "#FF6B00",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}>
              💌 Invitații digitale nuntă
            </div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(26px, 5vw, 42px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#1A1208",
              marginBottom: 10,
            }}>
              Alege tema{" "}
              <em style={{ fontStyle: "italic", color: "#FF6B00" }}>invitației</em>
              {" "}tale
            </h1>
            <p style={{ fontSize: 14, color: "rgba(26,18,8,0.55)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
              Introdu email-ul, alege o temă și finalizează comanda.
              Accesul la invitația ta de nuntă online sosește imediat după plată.
            </p>
          </div>

          {/* Email + Terms */}
          <div style={{
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: 20,
            padding: "28px 24px",
            marginBottom: 36,
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          }}>
            <label
              htmlFor="co-email"
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: "#1A1208",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Email pentru acces
            </label>
            <input
              id="co-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="nume@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "13px 16px",
                border: "1.5px solid #E8E4DF",
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "inherit",
                color: "#1A1208",
                background: "#FDFAF6",
                outline: "none",
                WebkitAppearance: "none",
                appearance: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#FF6B00"; }}
              onBlur={(e) => { e.target.style.borderColor = "#E8E4DF"; }}
            />

            <div style={{ height: 1, background: "rgba(0,0,0,0.06)", margin: "20px 0" }} />

            <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", marginBottom: 14 }}>
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                style={{
                  width: 18,
                  height: 18,
                  minWidth: 18,
                  marginTop: 2,
                  accentColor: "#1A1208",
                  cursor: "pointer",
                  flexShrink: 0,
                  fontSize: 16,
                }}
              />
              <span style={{ fontSize: 13, color: "rgba(26,18,8,0.6)", lineHeight: 1.6 }}>
                Sunt de acord cu{" "}
                <a
                  href="/termeni"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1A1208", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}
                >
                  Termenii și Condițiile
                </a>{" "}
                și confirm că am dreptul legal de a prelucra datele invitaților.
              </span>
            </label>
            <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                style={{
                  width: 18,
                  height: 18,
                  minWidth: 18,
                  marginTop: 2,
                  accentColor: "#1A1208",
                  cursor: "pointer",
                  flexShrink: 0,
                  fontSize: 16,
                }}
              />
              <span style={{ fontSize: 13, color: "rgba(26,18,8,0.6)", lineHeight: 1.6 }}>
                Am citit și accept Politica de Confidențialitate și prelucrarea datelor conform GDPR.
              </span>
            </label>
          </div>

          {/* Section title */}
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(26,18,8,0.4)",
            marginBottom: 16,
          }}>
            Teme disponibile · 300 Lei fiecare
          </p>

          {/* Theme cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {THEMES.map((theme) => {
              const isLoading = loading === theme.id;
              const anyLoading = loading !== "";
              return (
                <div
                  key={theme.id}
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.07)",
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Color bar */}
                  <div style={{ height: 3, background: theme.barGrad }} />

                  {/* Card body */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    padding: "22px 22px 22px 20px",
                  }}>
                    {/* Icon */}
                    <div style={{
                      fontSize: 26,
                      flexShrink: 0,
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: theme.pillBg,
                    }}>
                      {theme.icon}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        borderRadius: 100,
                        padding: "3px 10px",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        marginBottom: 5,
                        background: theme.pillBg,
                        color: theme.pillText,
                      }}>
                        {theme.tagline}
                      </div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 20,
                        fontWeight: 600,
                        lineHeight: 1.1,
                        marginBottom: 4,
                        color: theme.accent,
                      }}>
                        {theme.name}
                      </div>
                      <p style={{ fontSize: 12.5, color: "rgba(26,18,8,0.55)", lineHeight: 1.55, margin: 0 }}>
                        {theme.desc}
                      </p>
                    </div>

                    {/* Price + Button */}
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 10,
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: "#1A1208", whiteSpace: "nowrap" }}>
                        300 Lei
                      </span>
                      <button
                        onClick={() => handlePayment(theme)}
                        disabled={anyLoading || !isReady}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "11px 22px",
                          borderRadius: 100,
                          border: "none",
                          fontSize: 13,
                          fontWeight: 600,
                          fontFamily: "inherit",
                          cursor: anyLoading || !isReady ? "not-allowed" : "pointer",
                          whiteSpace: "nowrap",
                          background: isLoading ? "#ccc" : theme.accent,
                          color: isLoading ? "#666" : theme.accentText,
                          opacity: anyLoading || !isReady ? 0.45 : 1,
                          transition: "opacity 0.2s",
                          WebkitTapHighlightColor: "transparent",
                          touchAction: "manipulation",
                        }}
                      >
                        {isLoading ? "Se încarcă..." : "Alege →"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom note */}
          <p style={{ textAlign: "center", marginTop: 28, fontSize: 12, color: "rgba(26,18,8,0.4)", lineHeight: 1.6 }}>
            <strong style={{ color: "rgba(26,18,8,0.65)" }}>Plată unică · Acces permanent.</strong>{" "}
            Invitațiile personalizate nuntă includ dashboard invitați, meniu QR și album foto colectiv.
          </p>

        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: "18px 24px",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        flexShrink: 0,
      }}>
        {["🔒 SSL Stripe", "💳 Card securizat", "✉️ Acces instant"].map((item) => (
          <span key={item} style={{ fontSize: 11, color: "rgba(26,18,8,0.4)", fontWeight: 500 }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
