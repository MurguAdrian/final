// app/(fotografi)/foto-video-prahova-mia-frames/MiaReel.tsx
'use client';

import { useRef } from 'react';

type Shot = { id: string; title: string; note: string };

export default function MiaReel({
  shots, cloud, href, slug,
}: { shots: Shot[]; cloud: string; href: string; slug: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function track() {
    fetch('/api/marketplace/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, type: 'social' }),
      keepalive: true,
    });
  }

  function scrollBy(dir: number) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.82, behavior: 'smooth' });
  }

  return (
    <div className="mf-reel">
      <div className="mf-reel-track" ref={trackRef}>
        {shots.map((s, i) => (
          <a
            key={s.id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mf-shot"
            onClick={track}
          >
            <div className="mf-shot-bar">
              <span className="mf-shot-no">SC.{String(i + 1).padStart(2, '0')}</span>
              <span className="mf-shot-dot" />
              <span className="mf-shot-fmt">2.39 : 1</span>
            </div>
            <div className="mf-shot-img">
              <img
                src={`https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_1500/${s.id}.jpg`}
                alt={`MIA Frames – ${s.title}, foto video eveniment Prahova București`}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <span className="mf-shot-rec">● REC</span>
              <div className="mf-shot-veil">
                <div className="mf-shot-title">{s.title}</div>
                <div className="mf-shot-note">{s.note}</div>
                <span className="mf-shot-cta">Vezi portofoliul →</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mf-reel-nav">
        <button type="button" className="mf-reel-btn" onClick={() => scrollBy(-1)} aria-label="Cadrul anterior">
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="mf-reel-hint">glisează pentru mai multe cadre</span>
        <button type="button" className="mf-reel-btn" onClick={() => scrollBy(1)} aria-label="Cadrul următor">
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}