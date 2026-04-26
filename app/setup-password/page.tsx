"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SetupPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"loading" | "valid" | "invalid">("loading");

  // 1. Verificăm dacă token-ul este valid când se încarcă pagina
  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    setStatus("valid"); // În mod ideal, aici am face un fetch scurt să verificăm token-ul în DB
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Parolele nu coincid!");
      return;
    }

    setLoading(true);
    
    // Trimitem parola către un API nou pe care îl facem imediat
    const res = await fetch("/api/auth/setup-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Parolă setată cu succes! Acum te poți loga.");
      router.push("/login");
    } else {
      alert("Eroare la setarea parolei. Token-ul ar putea fi expirat.");
    }
    setLoading(false);
  };

  if (status === "loading") return <p style={{ textAlign: 'center', marginTop: '50px' }}>Se verifică accesul...</p>;
  if (status === "invalid") return <p style={{ textAlign: 'center', marginTop: '50px' }}>Link invalid sau expirat.</p>;

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Setează parola</h1>
      <p>Alege o parolă pentru a accesa dashboard-ul invitației tale.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input 
          type="password" 
          placeholder="Parolă nouă" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', color: 'black' }}
        />
        <input 
          type="password" 
          placeholder="Confirmă parola" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', color: 'black' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '12px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          {loading ? "Se salvează..." : "Salvează Parola"}
        </button>
      </form>
    </div>
  );
}