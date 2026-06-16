// app/servicii-nunta/page.tsx
import { neon } from '@neondatabase/serverless';
import Link from 'next/link';
import Image from 'next/image';
import FilterBar from './FilterBar';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

async function getProviders(category?: string, judet?: string) {
  const sql = neon(process.env.DATABASE_URL!);
  if (category && category !== 'toate' && judet && judet !== 'toate') {
    return await sql`SELECT * FROM mkt_providers WHERE is_active = true AND category = ${category} AND judet = ${judet} ORDER BY created_at DESC`;
  }
  if (category && category !== 'toate') {
    return await sql`SELECT * FROM mkt_providers WHERE is_active = true AND category = ${category} ORDER BY created_at DESC`;
  }
  if (judet && judet !== 'toate') {
    return await sql`SELECT * FROM mkt_providers WHERE is_active = true AND judet = ${judet} ORDER BY created_at DESC`;
  }
  return await sql`SELECT * FROM mkt_providers WHERE is_active = true ORDER BY created_at DESC`;
}

async function getJudete() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT DISTINCT judet FROM mkt_providers WHERE is_active = true ORDER BY judet ASC`;
  return rows.map((r: any) => r.judet);
}

export const metadata = {
  title: 'Servicii Nuntă | VibeInvite',
  description: 'Găsește fotografi, DJ, formații și candybar pentru nunta ta. Furnizori verificați din toată România.',
};

const CATEGORIES = [
  { value: 'toate', label: 'Toate' },
  { value: 'fotograf', label: 'Fotografi' },
  { value: 'dj', label: 'DJ' },
  { value: 'formatie', label: 'Formații' },
  { value: 'candybar', label: 'Candy Bar' },
];

export default async function ServiciiNuntaPage({
  searchParams,
}: {
  searchParams: { category?: string; judet?: string };
}) {
  const category = searchParams.category || 'toate';
  const judet = searchParams.judet || 'toate';
  const [providers, judete] = await Promise.all([
    getProviders(category, judet),
    getJudete(),
  ]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background, #F9F5EE)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
            Furnizori pentru Nunta Ta
          </h1>
          <p className="text-gray-500 text-sm mt-1">{providers.length} furnizori disponibili</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Caută furnizori..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar Filtre - Desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sticky top-4">
              <h2 className="font-semibold text-gray-900 text-sm mb-3">Categorie</h2>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.value}
                    href={`/servicii-nunta?category=${cat.value}&judet=${judet}`}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      category === cat.value
                        ? 'bg-amber-50 text-amber-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
              <hr className="my-4 border-gray-100" />
              <h2 className="font-semibold text-gray-900 text-sm mb-3">Județ</h2>
              <div className="flex flex-col gap-1">
                <Link
                  href={`/servicii-nunta?category=${category}&judet=toate`}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    judet === 'toate' ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Toate județele
                </Link>
                {judete.map((j: string) => (
                  <Link
                    key={j}
                    href={`/servicii-nunta?category=${category}&judet=${j}`}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      judet === j ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {j}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Filtre */}
          <FilterBar categories={CATEGORIES} judete={judete} activeCategory={category} activeJudet={judet} />

          {/* Grid */}
          <div className="flex-1">
            {providers.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p>Niciun furnizor găsit.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {providers.map((p: any) => (
                  <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-52 bg-gray-100">
                      <Image
                        src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_500/${p.cloudinary_folder}/1.jpg`}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="font-semibold text-gray-900 text-base leading-tight">{p.name}</h2>
                        <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full capitalize flex-shrink-0">
                          {p.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1.5">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-gray-400 text-xs">{p.oras}, {p.judet}</p>
                      </div>
                      {p.subtype && (
                        <span className="inline-block mt-2 text-xs border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full capitalize">
                          {p.subtype}
                        </span>
                      )}
                      <Link
                        href={`/${p.slug}`}
                        className="mt-4 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                      >
                        Afișează detalii
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}