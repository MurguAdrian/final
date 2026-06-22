"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { F, FS, SP, BR, GR } from '../masinutaTokens';
import Swal from 'sweetalert2';

export const DeleteAccountButton = () => {
  const router             = useRouter();
  const [deleting, setDeleting] = useState(false);

  // const handleDelete = async () => {
  //   if (!confirm('Ești sigur? Toate datele vor fi șterse permanent. Această acțiune este ireversibilă.')) return;
  //   setDeleting(true);
  //   try {
  //     await fetch('/api/dashboard/delete-account', { method: 'DELETE' });
  //   } finally {
  //     router.push('/');
  //   }
  // };

const handleDelete = async () => {
  // Alerta stilizată care blochează execuția exact ca un confirm nativ datorită await
  const result = await Swal.fire({
    title: 'Ești sigur?',
    text: 'Toate datele vor fi șterse permanent. Această acțiune este ireversibilă.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Da, șterge!',
    cancelButtonText: 'Anulează',
    background: '#F0F6FA',              // Fundal albastru-cer deschis
    color: '#4B6584',                   // Text închis elegant
    iconColor: '#A5D8F3',               // Culoarea mașinuței pentru iconiță
    confirmButtonColor: '#D63031',      // Roșu curat de alertă
    cancelButtonColor: '#778CA3',       // Gri-bej pentru butonul de anulare
    customClass: {
      popup: 'rounded-2xl border border-[#A5D8F3]/50 shadow-2xl font-sans',
    }
  });

  // Dacă utilizatorul a apăsat "Anulează" sau a închis modalul, oprim funcția
  if (!result.isConfirmed) return;

  // Continuarea logicii tale rămâne 1-1 identică
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
