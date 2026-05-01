"use client";
import { useState } from "react";

export default function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const [accepted, setAccepted] = useState(false); // Starea pentru bifa legală

  const handlePayment = async (priceId: string, themeName: string) => {
    // 1. Verificăm dacă a bifat căsuța
    if (!accepted) {
      alert("Trebuie să accepți Termenii și Condițiile pentru a putea cumpăra invitația.");
      return;
    }

    // 2. Verificăm email
    if (!email || !email.includes("@")) {
      alert("Te rugăm să introduci o adresă de email validă!");
      return;
    }

    setLoading(themeName);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ email, priceId, themeName }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Eroare API:", data.error);
        alert("Eroare la inițierea plății.");
        setLoading("");
      }
    } catch (err) {
      console.error("Eroare rețea:", err);
      alert("A apărut o eroare de conexiune.");
      setLoading("");
    }
  };

  return (
    <div className="checkout-container" style={{ padding: "60px 20px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Alege tema preferată</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Introdu email-ul unde vei primi link-ul de editare după plată.
      </p>
      
      <input 
        type="email" 
        placeholder="Adresa ta de email (ex: nume@gmail.com)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ 
          padding: "12px 16px", 
          width: "100%", 
          maxWidth: "400px", 
          marginBottom: "20px", 
          borderRadius: "8px", 
          border: "2px solid #eee", 
          fontSize: "1rem",
          outline: "none",
          color: "black"
        }}
      />

      {/* PARTEA LEGALĂ - CHECKBOX */}
      <div style={{ marginBottom: '40px', textAlign: 'left', maxWidth: '400px', margin: '0 auto 40px' }}>
        <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={accepted} 
            onChange={(e) => setAccepted(e.target.checked)} 
            style={{ marginTop: '4px' }} 
          />
          <span style={{ fontSize: '0.85rem', color: '#555' }}>
            Sunt de acord cu <a href="/termeni" target="_blank" style={{ color: '#000', fontWeight: 'bold' }}>Termenii și Condițiile</a> și confirm că am dreptul legal de a prelucra datele invitaților pe care îi voi adăuga.
          </span>
        </label>
      </div>

      <div style={{ display: "flex", gap: "30px", justifyContent: "center", flexWrap: "wrap" }}>
        
        {/* Card Tema LUX */}
        <div style={{ border: "1px solid #eaeaea", padding: "30px", borderRadius: "20px", width: "280px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "40px", marginBottom: "10px" }}>✨</div>
          <h3 style={{ fontSize: "1.5rem", margin: "10px 0" }}>Tema LUX</h3>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#000" }}>300 Lei</p>
          <button 
            onClick={() => handlePayment("price_1TQR40DLRG6cKGjIoripBApH", "Lux")}
            disabled={loading !== ""}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              backgroundColor: loading === "Lux" ? "#ccc" : "#000",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: (loading === "" && accepted) ? "pointer" : "not-allowed",
              width: "100%",
              fontWeight: "bold",
              opacity: accepted ? 1 : 0.5
            }}
          >
            {loading === "Lux" ? "Se încarcă..." : "Alege LUX"}
          </button>
        </div>

        {/* Card Tema NATURE */}
        <div style={{ border: "1px solid #eaeaea", padding: "30px", borderRadius: "20px", width: "280px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "40px", marginBottom: "10px" }}>🌿</div>
          <h3 style={{ fontSize: "1.5rem", margin: "10px 0" }}>Tema NATURE</h3>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#000" }}>300 Lei</p>
          <button 
            onClick={() => handlePayment("price_1TQR3UDLRG6cKGjIUYoD8nVZ", "Nature")}
            disabled={loading !== ""}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              backgroundColor: loading === "Nature" ? "#ccc" : "#000",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: (loading === "" && accepted) ? "pointer" : "not-allowed",
              width: "100%",
              fontWeight: "bold",
              opacity: accepted ? 1 : 0.5
            }}
          >
            {loading === "Nature" ? "Se încarcă..." : "Alege NATURE"}
          </button>
        </div>

      </div>
    </div>
  );
}