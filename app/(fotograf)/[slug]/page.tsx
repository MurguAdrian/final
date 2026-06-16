// app/(fotograf)/[slug]/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import TrackView from './TrackView';
import ContactButtons from './ContactButtons';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

async function getProvider(slug: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${slug} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

export async function generateStaticParams() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT slug FROM mkt_providers WHERE is_active = true`;
  return rows.map((r: any) => ({ slug: r.slug }));
}

export default async function ProviderPage({ params }: { params: { slug: string } }) {
  const p = await getProvider(params.slug);
  if (!p) notFound();

  const galleryImages = [2, 3, 4, 5, 6].map((n) =>
    `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_800/${p.cloudinary_folder}/${n}.jpg`
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <TrackView slug={p.slug} />

      {/* Back */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <Link href="/servicii-nunta" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Înapoi
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-32 pt-4">

        {/* Card profil */}
        <div className="bg-white rounded-3xl p-6 text-center shadow-sm border border-gray-100 mb-4">
          <div className="relative w-28 h-28 mx-auto mb-4">
            <Image
              src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_300/${p.cloudinary_folder}/1.jpg`}
              alt={p.name}
              fill
              priority
              className="object-cover rounded-full border-4 border-white shadow-md"
              sizes="112px"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900">{p.name}</h1>
          <p className="text-amber-600 text-sm font-medium mt-1 capitalize">{p.category}{p.subtype ? ` · ${p.subtype}` : ''}</p>
          {p.seo_description && (
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">{p.seo_description}</p>
          )}
          <div className="flex items-center justify-center gap-1 mt-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-400 text-sm">{p.oras}, {p.judet}</span>
          </div>
        </div>

        {/* Galerie */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">Portfolio</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 col-span-2">
              <Image
                src={galleryImages[0]}
                alt={`${p.name} foto 1`}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 672px) 100vw, 672px"
              />
            </div>
            {galleryImages.slice(1).map((url, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={url}
                  alt={`${p.name} foto ${i + 2}`}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 672px) 50vw, 336px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-4">
          <h2 className="font-semibold text-gray-900 mb-3">Connect</h2>
          <div className="flex flex-col gap-2">
            {p.instagram_url && (
              <a
                href={p.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Instagram</span>
                </div>
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {p.facebook_url && (
              <a
                href={p.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Facebook</span>
                </div>
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                </a>
            )}
            {p.website_url && (
              <a
                href={p.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Website</span>
                </div>
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>

       
        {p.maps_url && (
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-3">Locație</h2>
            <a
              href={p.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 transition-colors"
            >
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">{p.oras}, {p.judet}</p>
                <p className="text-xs text-gray-400">Vezi pe Google Maps</p>
              </div>
            </a>
          </div>
        )}
      </div>

      {/* Butoane fixe jos */}
      <ContactButtons provider={p} />
    </div>
  );
}