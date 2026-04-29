// "use client";
// import React, { useState, useEffect, useCallback } from 'react';
// import { SummarySection } from './components/SummarySection';
// import { PersonalizeSection } from './components/PersonalizeSection';
// import { MenuSection } from './components/MenuSection';
// import { PhotosSection } from './components/PhotosSection';

// export default function LuxDashboard() {
//   const [activeTab, setActiveTab] = useState('summary');
//   const [isProfileComplete, setIsProfileComplete] = useState(false);
//   const [slug, setSlug] = useState("");
//   const [loading, setLoading] = useState(true);

//   const refreshStatus = useCallback(async () => {
//     try {
//       const orderId = 1; 
//       const res = await fetch(`/api/dashboard/summary?orderId=${orderId}&v=${Date.now()}`, {
//         cache: 'no-store'
//       });
//       const data = await res.json();
//       if (data.weddingDetails) {
//         setIsProfileComplete(!!(data.weddingDetails.bride_name && data.weddingDetails.custom_slug));
//         setSlug(data.weddingDetails.custom_slug || "");
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { refreshStatus(); }, [refreshStatus]);

//   if (loading) return <div style={{ background: '#000', color: '#d4af37', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>VIBE INVITE LUX...</div>;

//   return (
//     // Container principal: FĂRĂ MARGINI, FĂRĂ LIMITĂRI, 100% DIN ECRAN
//     <div style={{ 
//       display: 'flex', 
//       width: '100vw', 
//       height: '100vh', 
//       overflow: 'hidden', // Nu lăsăm tot ecranul să facă scroll, doar conținutul
//       background: '#0a0a0a' 
//     }}>
      
//       {/* SIDEBAR FIXAT */}
//       <aside style={{
//         width: '280px',
//         background: '#111',
//         borderRight: '1px solid #d4af3722',
//         display: 'flex',
//         flexDirection: 'column',
//         padding: '30px 0',
//         flexShrink: 0 // Sidebar-ul nu se strânge niciodată
//       }}>
//         <div style={{ textAlign: 'center', marginBottom: '40px' }}>
//           <h1 style={{ color: '#d4af37', letterSpacing: '4px', fontSize: '1.2rem', margin: 0 }}>VIBE INVITE</h1>
//           <span style={{ fontSize: '0.6rem', color: '#d4af37', opacity: 0.6 }}>PREMIUM LUXURY EDITION</span>
//         </div>

//         <nav style={{ flex: 1, padding: '0 20px' }}>
//           <TabButton active={activeTab === 'summary'} label="📊 Dashboard" onClick={() => setActiveTab('summary')} />
//           <TabButton active={activeTab === 'personalize'} label="🎨 Personalizare" onClick={() => setActiveTab('personalize')} />
//           <TabButton active={activeTab === 'menu'} label="🍴 Meniu & QR" onClick={() => setActiveTab('menu')} />
//           <TabButton active={activeTab === 'photos'} label="📸 Poze Instant" onClick={() => setActiveTab('photos')} />
//         </nav>

//         {/* STATUS LINK ÎN SIDEBAR */}
//         <div style={{ padding: '20px', borderTop: '1px solid #d4af3711' }}>
//            <div style={{ 
//              padding: '15px', 
//              background: '#000', 
//              border: `1px solid ${isProfileComplete ? '#d4af37' : '#ffa500'}`,
//              borderRadius: '8px'
//            }}>
//              <p style={{ fontSize: '0.6rem', color: isProfileComplete ? '#d4af37' : '#ffa500', margin: '0 0 10px 0' }}>
//                {isProfileComplete ? '● LINK ACTIV' : '○ INCOMPLET'}
//              </p>
//              {isProfileComplete && <p style={{ fontSize: '0.7rem', color: '#fff', wordBreak: 'break-all' }}>vibeinvite.ro/{slug}</p>}
//            </div>
//         </div>
//       </aside>

//       {/* CONȚINUTUL PAGINII: FACE SCROLL INDEPENDENT */}
//       <main style={{ 
//         flex: 1, 
//         height: '100vh', 
//         overflowY: 'auto', 
//         padding: '50px 80px',
//         background: '#0a0a0a',
//         color: '#fff'
//       }}>
//         {activeTab === 'summary' && <SummarySection isComplete={isProfileComplete} />}
//         {activeTab === 'personalize' && <PersonalizeSection onSave={refreshStatus} />}
//         {activeTab === 'menu' && <MenuSection />}
//         {activeTab === 'photos' && <PhotosSection />}
//       </main>
//     </div>
//   );
// }

// // Componenta de buton pentru Sidebar
// const TabButton = ({ active, label, onClick }: any) => (
//   <button onClick={onClick} style={{
//     width: '100%',
//     padding: '14px 20px',
//     marginBottom: '8px',
//     background: active ? '#d4af37' : 'transparent',
//     color: active ? '#000' : '#d4af37',
//     border: 'none',
//     textAlign: 'left',
//     cursor: 'pointer',
//     borderRadius: '8px',
//     fontWeight: 'bold',
//     fontSize: '0.85rem',
//     transition: '0.3s'
//   }}>
//     {label}
//   </button>
// );
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
  
  const orderId = 1; // De înlocuit cu session ulterior

  const refreshStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/dashboard/summary?orderId=${orderId}&v=${Date.now()}`);
      if (!res.ok) throw new Error("Eroare server");
      const data = await res.json();
      if (data?.weddingDetails) {
        setIsProfileComplete(!!(data.weddingDetails.bride_name && data.weddingDetails.custom_slug));
        setSlug(data.weddingDetails.custom_slug || "");
      }
    } catch (err) {
      console.error("Refresh status error:", err);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => { refreshStatus(); }, [refreshStatus]);

  const handleSignOut = () => {
    // Aici adaugi logica de logout (stergere cookie/sesiune)
    window.location.href = "/login";
  };

  if (loading) return <div style={fullScreenCenter}>VIBE INVITE LUX...</div>;

  return (
    <div style={dashboardWrapper}>
      {/* SIDEBAR */}
      <aside style={sidebarS}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#d4af37', letterSpacing: '4px', fontSize: '1.2rem', margin: 0 }}>VIBE INVITE</h1>
          <span style={{ fontSize: '0.6rem', color: '#d4af37', opacity: 0.6 }}>PREMIUM LUXURY EDITION</span>
        </div>

        <nav style={{ flex: 1, padding: '0 20px' }}>
          <TabButton active={activeTab === 'summary'} label="📊 Dashboard" onClick={() => setActiveTab('summary')} />
          <TabButton active={activeTab === 'personalize'} label="🎨 Personalizare" onClick={() => setActiveTab('personalize')} />
          <TabButton active={activeTab === 'menu'} label="🍴 Meniu Nuntă" onClick={() => setActiveTab('menu')} />
          <TabButton active={activeTab === 'photos'} label="📸 Galerie Poze" onClick={() => setActiveTab('photos')} />
        </nav>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
           <div style={statusCardS(isProfileComplete)}>
             <p style={{ fontSize: '0.6rem', color: isProfileComplete ? '#d4af37' : '#ffa500', margin: '0 0 5px 0' }}>
               {isProfileComplete ? '● LINK ACTIV' : '○ INCOMPLET'}
             </p>
             {isProfileComplete && <p style={{ fontSize: '0.7rem', color: '#fff', wordBreak: 'break-all' }}>vibeinvite.ro/{slug}</p>}
           </div>
           
           <button onClick={handleSignOut} style={signOutBtn}>IEȘIRE CONT</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={mainContentS}>
        {activeTab === 'summary' && <SummarySection isComplete={isProfileComplete} orderId={orderId} />}
        {activeTab === 'personalize' && <PersonalizeSection onSave={refreshStatus} orderId={orderId} />}
        {activeTab === 'menu' && <MenuSection orderId={orderId} />}
        {activeTab === 'photos' && <PhotosSection orderId={orderId} />}
      </main>
    </div>
  );
}

// STYLES PENTRU FULLSCREEN
const dashboardWrapper: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
  display: 'flex', background: '#0a0a0a', zIndex: 9999, overflow: 'hidden'
};

const sidebarS: React.CSSProperties = {
  width: '280px', background: '#111', borderRight: '1px solid #d4af3722',
  display: 'flex', flexDirection: 'column', padding: '30px 0', flexShrink: 0
};

const mainContentS: React.CSSProperties = {
  flex: 1, height: '100vh', overflowY: 'auto', padding: '50px 80px', color: '#fff'
};

const TabButton = ({ active, label, onClick }: any) => (
  <button onClick={onClick} style={{
    width: '100%', padding: '14px 20px', marginBottom: '8px',
    background: active ? '#d4af37' : 'transparent', color: active ? '#000' : '#d4af37',
    border: 'none', textAlign: 'left', cursor: 'pointer', borderRadius: '8px',
    fontWeight: 'bold', fontSize: '0.85rem', transition: '0.3s'
  }}>{label}</button>
);

const statusCardS = (ok: boolean): React.CSSProperties => ({
  padding: '12px', background: '#000', border: `1px solid ${ok ? '#d4af37' : '#ffa500'}`, borderRadius: '8px'
});

const signOutBtn: React.CSSProperties = {
  background: 'transparent', color: '#ff4444', border: '1px solid #ff4444',
  padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold'
};

const fullScreenCenter: React.CSSProperties = {
  background: '#000', color: '#d4af37', height: '100vh', width: '100vw',
  display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0
};