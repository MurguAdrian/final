"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { F, FS, SP, BR, GR } from '../masinutaTokens';

export const DeleteAccountButton = () => {
  const router             = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Ești sigur? Toate datele vor fi șterse permanent. Această acțiune este ireversibilă.')) return;
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
        color:          `rgba(232,64,64,.7)`,
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
