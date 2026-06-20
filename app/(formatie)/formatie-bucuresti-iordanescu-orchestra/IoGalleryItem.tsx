// app/(formatie)/formatie-bucuresti-iordanescu-orchestra/IoGalleryItem.tsx
'use client';

export default function IoGalleryItem({
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
    <a href={href} target="_blank" rel="noopener noreferrer" className="io-gi" onClick={track}>
      <img src={imgSrc} alt={alt} loading={eager ? 'eager' : 'lazy'} />
      <div className="io-gi-mask">
        <div className="io-gi-label">{label}</div>
        <span className="io-gi-cta">Vezi profilul →</span>
      </div>
    </a>
  );
}