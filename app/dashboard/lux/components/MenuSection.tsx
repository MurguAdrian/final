"use client";
import React, { useState, useEffect } from 'react';

export const MenuSection = ({ orderId }: { orderId: number }) => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/dashboard/summary?orderId=${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setIsActive(data.weddingDetails?.is_menu_active || false);
        setMenuItems(data.weddingDetails?.menu_details?.items || []);
      }
    }
    load();
  }, [orderId]);

  const save = async () => {
    setLoading(true);
    await fetch('/api/dashboard/personalize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, isMenuActive: isActive, menu_details: { items: menuItems } }),
    });
    setLoading(false);
    alert("Meniu salvat!");
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <h2 style={{ color: '#d4af37' }}>🍴 Meniu Eveniment</h2>
      <label style={{ display: 'block', marginBottom: '20px', fontSize: '1.2rem' }}>
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} /> Activează rubrica Meniu pe invitație
      </label>

      {isActive && (
        <div style={{ background: '#111', padding: '20px', borderRadius: '8px' }}>
          {menuItems.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input placeholder="Titlu (ex: Fel Principal)" style={inpS} value={item.title} onChange={e => {
                const n = [...menuItems]; n[idx].title = e.target.value; setMenuItems(n);
              }} />
              <input placeholder="Descriere" style={inpS} value={item.description} onChange={e => {
                const n = [...menuItems]; n[idx].description = e.target.value; setMenuItems(n);
              }} />
              <button onClick={() => setMenuItems(menuItems.filter((_, i) => i !== idx))} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
          ))}
          <button onClick={() => setMenuItems([...menuItems, { title: '', description: '' }])} style={addBtn}>+ Adaugă Fel Mâncare / Bautură</button>
        </div>
      )}
      <button onClick={save} style={saveBtn}>{loading ? "SALVARE..." : "SALVEAZĂ MENIU"}</button>
    </div>
  );
};
const inpS = { flex: 1, background: '#000', border: '1px solid #333', color: '#fff', padding: '12px' };
const addBtn = { width: '100%', padding: '10px', background: 'none', border: '1px dashed #d4af37', color: '#d4af37', cursor: 'pointer', marginTop: '10px' };
const saveBtn = { width: '100%', padding: '15px', background: '#d4af37', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '20px' };