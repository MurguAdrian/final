"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { F, FS, SP, BR, GR } from '../stelutaTokens';
import Swal from 'sweetalert2';

export const DeleteAccountButton = () => {
  const router             = useRouter();
  const [deleting, setDeleting] = useState(false);

const handleDelete = async () => {
  // Alerta stilizată pentru tema Steluță
  const result = await Swal.fire({
    title: 'Ești sigur?',
    text: 'Toate datele vor fi șterse permanent. Această acțiune este ireversibilă.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Da, șterge!',
    cancelButtonText: 'Anulează',
    background: '#FFFDF6',              // Fundal cald, crem foarte deschis cu tentă aurie
    color: '#765F2B',                   // Text maro-auriu închis elegant
    iconColor: '#F4D06F',               // Galbenul/auriul strălucitor de steluță pentru iconiță
    confirmButtonColor: '#D63031',      // Roșu curat de alertă distructivă
    cancelButtonColor: '#E3B957',       // Aurie mai domolă (goldDim) pentru butonul de anulare
    customClass: {
      popup: 'rounded-2xl border border-[#F4D06F]/50 shadow-2xl font-sans',
    }
  });

  // Dacă utilizatorul a apăsat "Anulează" sau a închis modalul, oprim funcția
  if (!result.isConfirmed) return;

  // Logica ta rămâne 1-1 identică
  setDeleting(true);
  try {
    await fetch('/api/dashboard/delete-account', { method: 'DELETE' });
  } finally {
    router.push('/');
  }
};

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            SP.xs + 2,
        padding:        `${SP.xs + 2}px ${SP.md}px`,
        borderRadius:   BR.pill,
        background:     GR.btnDanger,
        border:         `1px solid rgba(232,64,64,.2)`,
        color:          `rgba(200,80,80,.75)`,
        fontFamily:     F.ui,
        fontSize:       FS.tiny,
        fontWeight:     700,
        letterSpacing:  '.1em',
        textTransform:  'uppercase',
        cursor:         deleting ? 'not-allowed' : 'pointer',
        opacity:        deleting ? 0.6 : 1,
        transition:     'all .2s',
        whiteSpace:     'nowrap',
      } as React.CSSProperties}
    >
      {deleting ? '...' : '🗑️'}
    </button>
  );
};
