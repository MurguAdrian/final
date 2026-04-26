"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        // Redirecționăm în funcție de tema salvată în baza de date!
        if (data.theme === "Lux") {
          router.push("/dashboard/lux");
        } else {
          router.push("/dashboard/nature");
        }
      } else {
        alert(data.error || "Date invalide");
      }
    } catch (err) {
      alert("Eroare de conexiune");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', textAlign: 'center' }}>
      <h1>Autentificare Miri</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '12px', color: 'black' }}
        />
        <input 
          type="password" 
          placeholder="Parolă" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '12px', color: 'black' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '12px', background: 'black', color: 'white', cursor: 'pointer' }}>
          {loading ? "Se verifică..." : "Intră în Dashboard"}
        </button>
      </form>
    </div>
  );
}