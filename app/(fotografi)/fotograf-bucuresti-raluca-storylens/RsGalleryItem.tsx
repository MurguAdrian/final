// app/(fotografi)/fotograf-bucuresti-raluca-storylens/RsGalleryItem.tsx
'use client';

export default function RsGalleryItem({
  href, slug, imgSrc, alt, caption, rotate, eager,
}: { href: string; slug: string; imgSrc: string; alt: string; caption: string; rotate: string; eager?: boolean }) {
  function track() {
    fetch('/api/marketplace/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, type: 'social' }),
      keepalive: true,
    });
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rs-pol"
      style={{ ['--rot' as any]: rotate }}
      onClick={track}
    >
      <span className="rs-pol-tape" />
      <div className="rs-pol-img">
        <img src={imgSrc} alt={alt} loading={eager ? 'eager' : 'lazy'} />
      </div>
      <div className="rs-pol-cap">{caption}</div>
    </a>
  );
}