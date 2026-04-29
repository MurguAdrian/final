"use client";
import React, { useState, useEffect } from 'react';

// Adăugăm initialData și onSave în argumente ca să nu mai dea eroare în page.tsx
export const MenuSection = ({ initialData, orderId, onSave }: any) => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(initialData?.is_menu_active ?? false);
  const [menuItems, setMenuItems] = useState<any[]>(initialData?.menu_details?.items || []);

  // Sincronizăm dacă se schimbă datele în părinte
  useEffect(() => {
    setIsActive(initialData?.is_menu_active ?? false);
    setMenuItems(initialData?.menu_details?.items || []);
  }, [initialData]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          orderId, 
          isMenuActive: isActive, 
          menu_details: { items: menuItems } 
        }),
      });
      if (res.ok) {
        alert("Meniu salvat!");
        onSave(); // Refresh în părinte
      }
    } catch (e) { alert("Eroare"); }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <h2 style={{ color: '#d4af37' }}>🍴 Configurare Meniu</h2>
      <label style={{ display: 'block', marginBottom: '20px', cursor: 'pointer' }}>
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} /> 
        <span style={{ marginLeft: '10px' }}>Afișează meniul pe invitație</span>
      </label>

      {isActive && (
        <div style={{ background: '#111', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
          {menuItems.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input placeholder="Titlu (ex: Fel Principal)" style={inpS} value={item.title} onChange={e => {
                const n = [...menuItems]; n[idx].title = e.target.value; setMenuItems(n);
              }} />
              <input placeholder="Descriere" style={inpS} value={item.description} onChange={e => {
                const n = [...menuItems]; n[idx].description = e.target.value; setMenuItems(n);
              }} />
              <button onClick={() => setMenuItems(menuItems.filter((_, i) => i !== idx))} style={{ color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer' }}>Șterge</button>
            </div>
          ))}
          <button onClick={() => setMenuItems([...menuItems, { title: '', description: '' }])} style={addBtn}>+ Adaugă rând</button>
        </div>
      )}
      <button onClick={handleSave} style={saveBtn}>{loading ? "SALVARE..." : "SALVEAZĂ MENIUL"}</button>
    </div>
  );
};

const inpS = { flex: 1, background: '#000', border: '1px solid #333', color: '#fff', padding: '12px' };
const addBtn = { width: '100%', padding: '10px', background: 'none', border: '1px dashed #d4af37', color: '#d4af37', cursor: 'pointer', marginTop: '10px' };
const saveBtn = { width: '100%', padding: '15px', background: '#d4af37', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '20px' };