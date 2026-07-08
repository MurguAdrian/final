// app/(fotografi)/fotograf-brasov-ireph-graphy/IrGalleryItem.tsx
'use client';

export default function IrGalleryItem({
  href, slug, imgSrc, alt, label, num, eager, className,
}: { href: string; slug: string; imgSrc: string; alt: string; label: string; num: string; eager?: boolean; className?: string }) {
  function track() {
    fetch('/api/marketplace/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, type: 'social' }),
      keepalive: true,
    });
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`ir-gi ${className || ''}`} onClick={track}>
      <img src={imgSrc} alt={alt} loading={eager ? 'eager' : 'lazy'} />
      <div className="ir-gi-mask">
        <span className="ir-gi-num">{num}</span>
        <div className="ir-gi-label">{label}</div>
        <span className="ir-gi-cta">Vezi portofoliul →</span>
      </div>
    </a>
  );
}