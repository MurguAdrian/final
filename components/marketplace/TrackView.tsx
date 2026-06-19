// components/marketplace/TrackView.tsx
'use client';
import { useEffect } from 'react';

export default function TrackView({ slug }: { slug: string }) {
  useEffect(() => {
    fetch('/api/marketplace/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, type: 'view' }),
    });
  }, [slug]);
  return null;
}