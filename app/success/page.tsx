

export default function SuccessPage() {
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
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          color: "#52B788",
          fontWeight: 600,
          letterSpacing: "0.04em",
          background: "rgba(82,183,136,0.12)",
          padding: "4px 10px",
          borderRadius: 100,
          border: "1px solid rgba(82,183,136,0.3)",
        }}>
          ✓ Plată confirmată
        </span>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px 60px" }}>
        <div style={{ maxWidth: 560, width: "100%" }}>

          {/* Success hero */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>

            {/* Animated checkmark ring */}
            <div style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #D8F3DC 0%, #B7E4C7 100%)",
              border: "2.5px solid #52B788",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 38,
              boxShadow: "0 0 0 12px rgba(82,183,136,0.08), 0 4px 24px rgba(82,183,136,0.15)",
            }}>
              ✓
            </div>

            {/* Congrats badge */}
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
              🎉 Comandă finalizată
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 6vw, 46px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#1A1208",
              marginBottom: 12,
            }}>
              Felicitări!{" "}
              <em style={{ fontStyle: "italic", color: "#FF6B00" }}>Invitația ta</em>
              {" "}te așteaptă
            </h1>

            <p style={{
              fontSize: "clamp(14px, 3vw, 16px)",
              color: "rgba(26,18,8,0.55)",
              lineHeight: 1.7,
              maxWidth: 420,
              margin: "0 auto",
            }}>
              Plata a fost procesată cu succes. Urmează pașii de mai jos pentru a-ți activa invitația.
            </p>
          </div>

          {/* Steps card */}
          <div style={{
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            marginBottom: 20,
          }}>

            {/* Card header */}
            <div style={{
              background: "#1A1208",
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              <span style={{ fontSize: 16 }}>📬</span>
              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "0.03em",
              }}>
                Ce urmează — 2 pași simpli
              </span>
            </div>

            {/* Step 1 */}
            <div style={{
              display: "flex",
              gap: 16,
              padding: "24px 24px 20px",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "#FFF4ED",
                border: "1.5px solid rgba(255,107,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}>
                ✉️
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#FF6B00",
                  marginBottom: 5,
                }}>
                  Pasul 1 — Verifică emailul
                </div>
                <p style={{
                  fontSize: "clamp(13px, 3vw, 14px)",
                  color: "#1A1208",
                  lineHeight: 1.65,
                  margin: 0,
                  fontWeight: 500,
                }}>
                  Ți-am trimis un email pe adresa folosită la plată.
                </p>
                <p style={{
                  fontSize: 13,
                  color: "rgba(26,18,8,0.5)",
                  lineHeight: 1.6,
                  margin: "6px 0 0",
                }}>
                  Caută un mesaj de la <strong style={{ color: "rgba(26,18,8,0.7)", fontWeight: 600 }}>VibeInvite</strong> cu subiectul „Activează-ți invitația". Dacă nu apare în inbox, verifică folderul Spam sau Promoții.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{
              display: "flex",
              gap: 16,
              padding: "20px 24px 24px",
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "#D8F3DC",
                border: "1.5px solid rgba(45,106,79,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}>
                🔑
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#2D6A4F",
                  marginBottom: 5,
                }}>
                  Pasul 2 — Setează parola
                </div>
                <p style={{
                  fontSize: "clamp(13px, 3vw, 14px)",
                  color: "#1A1208",
                  lineHeight: 1.65,
                  margin: 0,
                  fontWeight: 500,
                }}>
                  Apasă butonul din email pentru a-ți seta parola.
                </p>
                <p style={{
                  fontSize: 13,
                  color: "rgba(26,18,8,0.5)",
                  lineHeight: 1.6,
                  margin: "6px 0 0",
                }}>
                  Vei fi direcționat direct la dashboard-ul tău unde poți personaliza invitația, adăuga lista de invitați și configura meniul QR.
                </p>
              </div>
            </div>
          </div>

          {/* What's included card */}
          <div style={{
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: 20,
            padding: "20px 22px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            marginBottom: 20,
          }}>
            <p style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(26,18,8,0.35)",
              marginBottom: 16,
            }}>
              Ce ai primit · Acces permanent
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {[
                { icon: "💌", label: "Invitație digitală personalizabilă" },
                { icon: "👥", label: "Dashboard invitați cu confirmări" },
                { icon: "📋", label: "Link Personalizat" },
                { icon: "📸", label: "Album foto colectiv pentru invitați" },
              ].map((item) => (
                <div key={item.label} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}>
                  <div style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "#FDFAF6",
                    border: "1px solid rgba(0,0,0,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: 13.5, color: "#1A1208", fontWeight: 500 }}>
                    {item.label}
                  </span>
                  <span style={{
                    marginLeft: "auto",
                    fontSize: 13,
                    color: "#52B788",
                    fontWeight: 600,
                  }}>
                    ✓
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Spam note */}
          <div style={{
            background: "#FFF8E6",
            border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: 14,
            padding: "14px 18px",
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
          }}>
            <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>⚠️</span>
            <p style={{
              fontSize: 12.5,
              color: "#7D5A1E",
              lineHeight: 1.65,
              margin: 0,
            }}>
              <strong style={{ fontWeight: 600 }}>Nu ai primit emailul?</strong>{" "}
              Verifică folderul Spam, Promoții sau Actualizări. Emailul poate întârzia până la 2 minute. Dacă după 5 minute tot nu a sosit, contactează-ne la{" "}
              <a
                href="mailto:office@vibeinvite.ro"
                style={{ color: "#C9A84C", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}
              >
                office@vibeinvite.ro
              </a>.
            </p>
          </div>

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
