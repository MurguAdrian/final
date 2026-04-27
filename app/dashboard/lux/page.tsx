"use client";
import React, { useState, useEffect } from 'react';
import { SummarySection } from './components/SummarySection';
import { PersonalizeSection } from './components/PersonalizeSection';
import { MenuSection } from './components/MenuSection';
import { PhotosSection } from './components/PhotosSection';

export default function LuxDashboard() {
  const [activeTab, setActiveTab] = useState('summary');
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(true);

  const refreshStatus = async () => {
    try {
      const orderId = 1; 
      // Cache busting cu timestamp pentru refresh instant
      const res = await fetch(`/api/dashboard/summary?orderId=${orderId}&t=${Date.now()}`, {
        cache: 'no-store'
      });
      const data = await res.json();

      if (data.weddingDetails) {
        const complete = !!(data.weddingDetails.bride_name && data.weddingDetails.custom_slug);
        setIsProfileComplete(complete);
        setSlug(data.weddingDetails.custom_slug || "");
      }
    } catch (err) {
      console.error("Eroare la refresh status:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshStatus();
  }, []);

  if (loading) return <div style={{ background: '#121212', color: '#d4af37', height: '100vh', padding: '20px' }}>Se încarcă universul LUX...</div>;

  return (
    <div style={{ display: 'flex', background: '#121212', color: '#d4af37', minHeight: '100vh', fontFamily: "'Playfair Display', serif" }}>
      
      <aside style={{
        width: '300px', borderRight: '1px solid #d4af3733', padding: '40px 20px',
        display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 10
      }}>
        <h2 style={{ fontSize: '1.6rem', textAlign: 'center', marginBottom: '30px', letterSpacing: '2px' }}>
          LUXURY <br/> <span style={{fontSize: '0.7rem'}}>INVITE</span>
        </h2>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setActiveTab('summary')} style={navButtonStyle(activeTab === 'summary')}>📊 SUMMARY</button>
          <button onClick={() => setActiveTab('personalize')} style={navButtonStyle(activeTab === 'personalize')}>🎨 PERSONALIZEAZĂ</button>
          <button onClick={() => setActiveTab('menu')} style={navButtonStyle(activeTab === 'menu')}>🍴 MENIU & QR</button>
          <button onClick={() => setActiveTab('photos')} style={navButtonStyle(activeTab === 'photos')}>📸 POZE INSTANT</button>
        </nav>

        <div style={{ 
          marginTop: '30px', padding: '20px 15px', 
          border: `1px solid ${isProfileComplete ? '#d4af37' : '#ffa500'}`,
          background: '#1a1a1a', borderRadius: '4px'
        }}>
          <p style={{ fontSize: '0.7rem', margin: '0 0 10px 0', fontWeight: 'bold', color: isProfileComplete ? '#d4af37' : '#ffa500' }}>
            {isProfileComplete ? '🔗 LINK INVITAȚIE' : '⚠️ STATUS: INCOMPLET'}
          </p>

          {!isProfileComplete ? (
            <p style={{ fontSize: '0.75rem', color: '#ccc', lineHeight: '1.4' }}>
              Primul Pas: Completează detaliile la <strong>Personalizează</strong> pentru a activa link-ul.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input readOnly value={`vibeinvite.ro/${slug}`}
                style={{ background: '#000', border: '1px solid #333', color: '#fff', padding: '5px', fontSize: '0.8rem' }}
              />
              <button onClick={() => {
                   navigator.clipboard.writeText(`https://vibeinvite.ro/${slug}`);
                   alert("Link copiat!");
                }}
                style={{ background: '#d4af37', color: 'black', border: 'none', padding: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}
              >
                COPIAZĂ LINK
              </button>
            </div>
          )}
        </div>

        <div style={{ marginTop: 'auto', textAlign: 'center' }}>
          <button style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '10px 20px', cursor: 'pointer', fontSize: '0.8rem' }}>
            DECONECTARE
          </button>
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
  fontSize: '0.85rem',
  fontWeight: 'bold',
  transition: '0.3s'
});