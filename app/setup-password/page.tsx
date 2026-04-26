"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SetupPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsTokenValid(false);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Parolele nu coincid!");
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
        alert("Parolă setată cu succes! Acum te poți loga.");
        router.push("/login");
      } else {
        alert("Eroare: Link-ul ar putea fi expirat.");
      }
    } catch (err) {
      alert("Eroare de conexiune la server.");
    } finally {
      setLoading(false);
    }
  };

  if (!isTokenValid) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', color: 'black' }}>
        <h1>Link invalid</h1>
        <p>Token-ul lipsește sau a expirat.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: 'black' }}>Setează parola</h1>
      <p style={{ color: 'gray' }}>Alege o parolă pentru a accesa dashboard-ul.</p>
      
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

export default function SetupPasswordPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '100px', color: 'black' }}>Se încarcă...</div>}>
      <SetupPasswordContent />
    </Suspense>
  );
}