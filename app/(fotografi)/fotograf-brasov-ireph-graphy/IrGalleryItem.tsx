// app/(fotografi)/fotograf-brasov-ireph-graphy/IrGalleryItem.tsx
'use client';

export default function IrGalleryItem({
  href, slug, imgSrc, alt, frame, label, wide, eager,
}: { href: string; slug: string; imgSrc: string; alt: string; frame: string; label: string; wide?: boolean; eager?: boolean }) {
  function track() {
    fetch('/api/marketplace/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, type: 'social' }),
      keepalive: true,
    });
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`ir-fr${wide ? ' ir-fr-wide' : ''}`} onClick={track}>
      <div className="ir-fr-top">
        <span>{frame}</span>
        <span className="ir-fr-dot" />
        <span>35MM</span>
      </div>
      <div className="ir-fr-img">
        <img src={imgSrc} alt={alt} loading={eager ? 'eager' : 'lazy'} />
        <div className="ir-fr-veil">
          <span className="ir-fr-veil-cta">Vezi portofoliul complet →</span>
        </div>
      </div>
      <div className="ir-fr-cap">{label}</div>
    </a>
  );
}