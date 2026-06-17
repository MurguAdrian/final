// app/(fotografi)/fotograf-onesti-dragoi-george-adrian/CallButton.tsx
'use client';

function track(slug: string) {
  fetch('/api/marketplace/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug, type: 'call' }),
  });
}

export default function CallButton({ phone, slug }: { phone: string; slug: string }) {
  return (
    <a href={`tel:${phone}`} className="fp-strip-cta" onClick={() => track(slug)}>
      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
      </svg>
      Sună Acum
    </a>
  );
}