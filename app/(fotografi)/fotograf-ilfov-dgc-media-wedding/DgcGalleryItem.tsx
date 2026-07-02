// app/(fotografi)/fotograf-ilfov-dgc-media-wedding/DgcGalleryItem.tsx
'use client';

export default function DgcGalleryItem({
  href, slug, imgSrc, alt, label, eager,
}: { href: string; slug: string; imgSrc: string; alt: string; label: string; eager?: boolean }) {
  function track() {
    fetch('/api/marketplace/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, type: 'social' }),
    });
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="dg-gi" onClick={track}>
      <img src={imgSrc} alt={alt} loading={eager ? 'eager' : 'lazy'} />
      <div className="dg-gi-mask">
        <div className="dg-gi-label">{label}</div>
        <span className="dg-gi-cta">Vezi portofoliu →</span>
      </div>
    </a>
  );
}