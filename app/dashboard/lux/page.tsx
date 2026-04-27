"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { SummarySection } from './components/SummarySection';
import { PersonalizeSection } from './components/PersonalizeSection';
import { MenuSection } from './components/MenuSection';
import { PhotosSection } from './components/PhotosSection';

export default function LuxDashboard() {
  const [activeTab, setActiveTab] = useState('summary');
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(true);

  const refreshStatus = useCallback(async () => {
    try {
      const orderId = 1; 
      // Timestamp random pentru a sparge cache-ul browserului
      const res = await fetch(`/api/dashboard/summary?orderId=${orderId}&nocache=${Date.now()}`, {
        method: 'GET',
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      });
      
      const data = await res.json();

      if (data.weddingDetails) {
        setSlug(data.weddingDetails.custom_slug || "");
        setIsProfileComplete(!!(data.weddingDetails.bride_name && data.weddingDetails.custom_slug));
        console.log("Slug actualizat din DB:", data.weddingDetails.custom_slug);
      }
    } catch (err) {
      console.error("Eroare refresh:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  if (loading) return <div style={{ background: '#121212', color: '#d4af37', height: '100vh', padding: '20px' }}>Încărcare...</div>;

  return (
    <div style={{ display: 'flex', background: '#121212', color: '#d4af37', minHeight: '100vh', fontFamily: 'serif' }}>
      
      {/* SIDEBAR */}
      <aside style={{ width: '300px', borderRight: '1px solid #d4af3733', padding: '40px 20px', position: 'fixed', height: '100vh' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>LUXURY <br/> INVITE</h2>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setActiveTab('summary')} style={navButtonStyle(activeTab === 'summary')}>📊 SUMMARY</button>
          <button onClick={() => setActiveTab('personalize')} style={navButtonStyle(activeTab === 'personalize')}>🎨 PERSONALIZEAZĂ</button>
          <button onClick={() => setActiveTab('menu')} style={navButtonStyle(activeTab === 'menu')}>🍴 MENIU & QR</button>
          <button onClick={() => setActiveTab('photos')} style={navButtonStyle(activeTab === 'photos')}>📸 POZE INSTANT</button>
        </nav>

        <div style={{ marginTop: '30px', padding: '15px', border: `1px solid ${isProfileComplete ? '#d4af37' : '#ffa500'}`, background: '#1a1a1a' }}>
          <p style={{ fontSize: '0.7rem', color: isProfileComplete ? '#d4af37' : '#ffa500' }}>
            {isProfileComplete ? '🔗 LINK ACTIV' : '⚠️ INCOMPLET'}
          </p>
          {isProfileComplete && (
            <>
              <p style={{ fontSize: '0.8rem', color: '#fff', wordBreak: 'break-all', margin: '10px 0' }}>vibeinvite.ro/{slug}</p>
              <button onClick={() => { navigator.clipboard.writeText(`https://vibeinvite.ro/${slug}`); alert("Copiat!"); }}
                style={{ width: '100%', background: '#d4af37', border: 'none', padding: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                COPIAZĂ LINK
              </button>
            </>
          )}
        </div>
      </aside>

      <main style={{ marginLeft: '300px', flex: 1, padding: '60px' }}>
        {activeTab === 'summary' && <SummarySection isComplete={isProfileComplete} />}
        {activeTab === 'personalize' && <PersonalizeSection onSave={refreshStatus} />}
        {activeTab === 'menu' && <MenuSection />}
        {activeTab === 'photos' && <PhotosSection />}
      </main>
    </div>
  );
}

const navButtonStyle = (isActive: boolean) => ({
  background: isActive ? '#d4af37' : 'transparent',
  color: isActive ? 'black' : '#d4af37',
  border: '1px solid #d4af3733',
  padding: '12px 15px',
  textAlign: 'left' as const,
  cursor: 'pointer',
  width: '100%'
});