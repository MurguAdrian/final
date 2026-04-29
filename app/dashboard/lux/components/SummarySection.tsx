
// "use client";
// import React, { useEffect, useState } from 'react';

// // Am actualizat interfața pentru a include orderId
// interface SummaryProps {
//   isComplete: boolean;
//   orderId: number; 
// }

// export const SummarySection = ({ isComplete, orderId }: SummaryProps) => {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Folosim orderId primit prin props
//         const res = await fetch(`/api/dashboard/summary?orderId=${orderId}`);
//         const result = await res.json();
//         setData(result);
//       } catch (err) { 
//         console.error("Eroare API Summary:", err); 
//       } finally { 
//         setLoading(false); 
//       }
//     }
//     fetchData();
//   }, [orderId]);

//   const userSlug = data?.weddingDetails?.custom_slug || "nunta-ta";

//   if (loading) return (
//     <div style={{ color: '#d4af37', padding: '20px', fontFamily: 'serif' }}>
//       Se încarcă experiența premium...
//     </div>
//   );

//   return (
//     <div style={{ animation: 'fadeIn 0.5s ease-in', fontFamily: 'serif' }}>
//       <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', fontWeight: '300', color: '#d4af37' }}>
//         📊 Centrul de Comandă
//       </h2>
      
//       {/* CARD TRIMITE INVITAȚIA */}
//       <div style={{ 
//         background: isComplete ? '#1c1c1c' : '#2a210a', 
//         border: `1px solid ${isComplete ? '#d4af37' : '#ffa500'}`, 
//         padding: '25px', 
//         marginBottom: '40px',
//         borderRadius: '8px'
//       }}>
//         {!isComplete ? (
//           <div>
//             <h4 style={{ color: '#ffa500', margin: '0 0 10px 0' }}>⚠️ Pasul 1: Configurează Link-ul și Detaliile</h4>
//             <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
//               Mergi la <strong>Personalizează</strong> pentru a alege numele link-ului (ex: vibeinvite.ro/nunta-noastra).
//             </p>
//           </div>
//         ) : (
//           <div>
//             <h4 style={{ color: '#d4af37', margin: '0 0 10px 0' }}>🚀 Invitația ta este LIVE!</h4>
//             <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '10px' }}>Copiază link-ul și trimite-l pe WhatsApp sau Social Media:</p>
//             <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//               <input 
//                 readOnly 
//                 value={`https://vibeinvite.ro/${userSlug}`} 
//                 style={{ 
//                   flex: 1, padding: '12px', background: '#000', border: '1px solid #333', color: '#d4af37', fontWeight: 'bold' 
//                 }}
//               />
//               <button 
//                 onClick={() => {
//                   navigator.clipboard.writeText(`https://vibeinvite.ro/${userSlug}`);
//                   alert("Link-ul a fost copiat!");
//                 }}
//                 style={{ 
//                   padding: '12px 25px', background: '#d4af37', color: 'black', 
//                   fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '4px' 
//                 }}
//               >
//                 COPIAZĂ
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* GRID STATISTICI */}
//       <div style={{ 
//         display: 'grid', 
//         gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
//         gap: '20px', 
//         marginBottom: '50px' 
//       }}>
//         <StatCard title="Vizualizări Link" value={data?.views} />
//         <StatCard title="Confirmări (DA)" value={data?.stats?.da} />
//         <StatCard title="Refuzuri (NU)" value={data?.stats?.nu} />
//         <StatCard title="Total Persoane" value={(data?.stats?.adulti || 0) + (data?.stats?.copii || 0)} />
//       </div>

//       {/* LISTĂ INVITAȚI */}
//       <div style={{ 
//         background: '#1c1c1c', 
//         padding: '30px', 
//         border: '1px solid #d4af3733',
//         borderRadius: '8px'
//       }}>
//         <h3 style={{ marginBottom: '20px', letterSpacing: '1px', color: '#d4af37' }}>DETALII RĂSPUNSURI</h3>
//         <div style={{ overflowX: 'auto' }}>
//           <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
//             <thead>
//               <tr style={{ borderBottom: '1px solid #d4af37', color: '#d4af37' }}>
//                 <th style={tableHeaderStyle}>NUME INVITAȚI</th>
//                 <th style={tableHeaderStyle}>STATUS</th>
//                 <th style={tableHeaderStyle}>PERSOANE</th>
//                 <th style={tableHeaderStyle}>ALTE DETALII</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data?.guests?.length > 0 ? (
//                 data.guests.map((guest: any) => (
//                   <tr key={guest.id} style={{ borderBottom: '1px solid #ffffff11' }}>
//                     <td style={tableCellStyle}>{guest.guest_name}</td>
//                     <td style={tableCellStyle}>
//                       {guest.is_coming ? 
//                         <span style={{ color: '#4caf50' }}>VINE ✅</span> : 
//                         <span style={{ color: '#f44336' }}>NU VINE ❌</span>
//                       }
//                     </td>
//                     <td style={tableCellStyle}>{guest.adults_count} Adulți / {guest.kids_count} Copii</td>
//                     <td style={tableCellStyle}>{guest.dietary_preferences || 'Fără preferințe'}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
//                     Aici va apărea lista invitaților imediat ce încep să răspundă.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ title, value }: { title: string, value: any }) => (
//   <div style={{ 
//     background: '#1c1c1c', padding: '25px', border: '1px solid #d4af3733', 
//     textAlign: 'center', borderRadius: '4px'
//   }}>
//     <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</p>
//     <h4 style={{ fontSize: '2.5rem', margin: 0, color: '#fff' }}>{value || 0}</h4>
//   </div>
// );

// const tableHeaderStyle: React.CSSProperties = { padding: '15px 10px', fontSize: '0.8rem', letterSpacing: '1px' };
// const tableCellStyle: React.CSSProperties = { padding: '15px 10px', color: '#ccc', fontSize: '0.9rem' };

"use client";
import React, { useEffect, useState } from 'react';

interface SummaryProps {
  isComplete: boolean;
  orderId: number; 
}

export const SummarySection = ({ isComplete, orderId }: SummaryProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/dashboard/summary?orderId=${orderId}&t=${Date.now()}`);
        const result = await res.json();
        setData(result);
      } catch (err) { 
        console.error("Eroare API Summary:", err); 
      } finally { 
        setLoading(false); 
      }
    }
    fetchData();
  }, [orderId]);

  // FUNCȚIE EXPORT EXCEL (CSV)
  const exportToExcel = () => {
    if (!data?.guests) return;

    const headers = ["Nume Invitat", "Status", "Adulti", "Copii", "Cazare", "Transport", "Preferinte Dieta", "Mentiuni"];
    const rows = data.guests.map((g: any) => [
      g.guest_name,
      g.is_coming ? "DA" : "NU",
      g.adults_count,
      g.kids_count,
      g.needs_accommodation ? "DA" : "NU",
      g.needs_transport ? "DA" : "NU",
      g.dietary_preferences || "-",
      g.other_mentions || "-"
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `lista_invitati_${data.weddingDetails.custom_slug}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const userSlug = data?.weddingDetails?.custom_slug || "nunta-ta";

  if (loading) return <div style={{ color: '#d4af37', padding: '20px' }}>Se încarcă experiența premium...</div>;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-in', fontFamily: 'serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '300', color: '#d4af37', margin: 0 }}>📊 Centrul de Comandă</h2>
        {data?.guests?.length > 0 && (
          <button onClick={exportToExcel} style={exportBtnS}>📥 EXPORTĂ LISTA EXCEL</button>
        )}
      </div>
      
      {/* CARD TRIMITE INVITAȚIA */}
      <div style={linkCardS(isComplete)}>
        {!isComplete ? (
          <div>
            <h4 style={{ color: '#ffa500', margin: '0 0 10px 0' }}>⚠️ Pasul 1: Configurează Link-ul</h4>
            <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Mergi la Personalizare pentru a alege numele link-ului.</p>
          </div>
        ) : (
          <div>
            <h4 style={{ color: '#d4af37', margin: '0 0 10px 0' }}>🚀 Invitația ta este LIVE!</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input readOnly value={`https://vibeinvite.ro/invitatie/lux/${userSlug}`} style={linkInputS} />
              <button onClick={() => { navigator.clipboard.writeText(`https://vibeinvite.ro/invitatie/lux/${userSlug}`); alert("Copiat!"); }} style={copyBtnS}>COPIAZĂ</button>
            </div>
          </div>
        )}
      </div>

      {/* GRID STATISTICI */}
      <div style={gridS}>
        <StatCard title="Vizualizări" value={data?.views} />
        <StatCard title="Confirmări (DA)" value={data?.stats?.da} />
        <StatCard title="Total Persoane" value={(data?.stats?.adulti || 0) + (data?.stats?.copii || 0)} />
        <StatCard title="Necesită Cazare" value={data?.stats?.cazare} />
        <StatCard title="Necesită Transport" value={data?.stats?.transport} />
      </div>

      {/* LISTĂ INVITAȚI */}
      <div style={tableContainerS}>
        <h3 style={{ marginBottom: '20px', color: '#d4af37' }}>DETALII RĂSPUNSURI</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #d4af37', color: '#d4af37' }}>
                <th style={thS}>NUME</th>
                <th style={thS}>STATUS</th>
                <th style={thS}>PERSOANE</th>
                <th style={thS}>CAZARE</th>
                <th style={thS}>TRANSPORT</th>
                <th style={thS}>DETALII/DIETĂ</th>
              </tr>
            </thead>
            <tbody>
              {data?.guests?.length > 0 ? (
                data.guests.map((guest: any) => (
                  <tr key={guest.id} style={{ borderBottom: '1px solid #ffffff11' }}>
                    <td style={tdS}>{guest.guest_name}</td>
                    <td style={tdS}>{guest.is_coming ? <span style={{color:'#4caf50'}}>VINE ✅</span> : <span style={{color:'#f44336'}}>NU ❌</span>}</td>
                    <td style={tdS}>{guest.adults_count}A / {guest.kids_count}C</td>
                    <td style={tdS}>{guest.needs_accommodation ? "DA 🏠" : "NU"}</td>
                    <td style={tdS}>{guest.needs_transport ? "DA 🚌" : "NU"}</td>
                    <td style={tdS}>{guest.dietary_preferences || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Niciun răspuns încă.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }: any) => (
  <div style={{ background: '#1c1c1c', padding: '20px', border: '1px solid #d4af3733', textAlign: 'center', borderRadius: '4px' }}>
    <p style={{ fontSize: '0.65rem', color: '#888', marginBottom: '5px', textTransform: 'uppercase' }}>{title}</p>
    <h4 style={{ fontSize: '2rem', margin: 0, color: '#fff' }}>{value || 0}</h4>
  </div>
);

// STILURI
const gridS = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '15px', marginBottom: '40px' };
const linkCardS = (ok:any) => ({ background: ok ? '#1c1c1c' : '#2a210a', border: `1px solid ${ok ? '#d4af37' : '#ffa500'}`, padding: '25px', marginBottom: '40px', borderRadius: '8px' });
const linkInputS = { flex: 1, padding: '12px', background: '#000', border: '1px solid #333', color: '#d4af37', fontWeight: 'bold' };
const copyBtnS = { padding: '12px 25px', background: '#d4af37', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer' };
const exportBtnS = { background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '8px 15px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' };
const tableContainerS = { background: '#1c1c1c', padding: '30px', border: '1px solid #d4af3733', borderRadius: '8px' };
const thS = { padding: '15px 10px', fontSize: '0.75rem' };
const tdS = { padding: '15px 10px', color: '#ccc', fontSize: '0.85rem' };