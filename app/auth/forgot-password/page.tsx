"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setMessage("Dacă email-ul există în sistem, vei primi un link de resetare.");
      } else {
        setMessage("A apărut o eroare. Încearcă din nou.");
      }
    } catch (err) {
      setMessage("Eroare de conexiune.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: 'black' }}>Resetare Parolă</h1>
      <p style={{ color: 'gray' }}>Introdu email-ul tău pentru a primi link-ul de resetare.</p>
      
      {message ? (
        <p style={{ padding: '20px', color: 'green', fontWeight: 'bold' }}>{message}</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <input 
            type="email" 
            placeholder="Email-ul tău" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: '12px', color: 'black', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <button type="submit" disabled={loading} style={{ padding: '12px', background: 'black', color: 'white', cursor: 'pointer', border: 'none', borderRadius: '8px' }}>
            {loading ? "Se trimite..." : "Trimite Link Resetare"}
          </button>
        </form>
      )}
    </div>
  );
}