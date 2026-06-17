// app/servicii-nunta/page.tsx
import { neon } from '@neondatabase/serverless';
import Link from 'next/link';
import Image from 'next/image';
import MobileFilters from './MobileFilters';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const CATEGORIES = [
  { value: 'toate', label: 'Toate', icon: '✦' },
  { value: 'fotograf', label: 'Fotografi', icon: '📷' },
  { value: 'dj', label: 'DJ', icon: '🎧' },
  { value: 'formatie', label: 'Formații', icon: '🎶' },
  { value: 'candybar', label: 'Candy Bar', icon: '🍬' },
];

async function getProviders(category: string, judet: string, search: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const cat = category !== 'toate' ? category : null;
  const jud = judet !== 'toate' ? judet : null;
  const q = search ? `%${search}%` : null;

  if (cat && jud && q) {
    return await sql`SELECT id,slug,name,category,subtype,judet,oras,cloudinary_folder,profile_image FROM mkt_providers WHERE is_active=true AND category=${cat} AND judet=${jud} AND (name ILIKE ${q} OR oras ILIKE ${q}) ORDER BY created_at DESC`;
  }
  if (cat && jud) {
    return await sql`SELECT id,slug,name,category,subtype,judet,oras,cloudinary_folder,profile_image FROM mkt_providers WHERE is_active=true AND category=${cat} AND judet=${jud} ORDER BY created_at DESC`;
  }
  if (cat && q) {
    return await sql`SELECT id,slug,name,category,subtype,judet,oras,cloudinary_folder,profile_image FROM mkt_providers WHERE is_active=true AND category=${cat} AND (name ILIKE ${q} OR oras ILIKE ${q}) ORDER BY created_at DESC`;
  }
  if (jud && q) {
    return await sql`SELECT id,slug,name,category,subtype,judet,oras,cloudinary_folder,profile_image FROM mkt_providers WHERE is_active=true AND judet=${jud} AND (name ILIKE ${q} OR oras ILIKE ${q}) ORDER BY created_at DESC`;
  }
  if (cat) {
    return await sql`SELECT id,slug,name,category,subtype,judet,oras,cloudinary_folder,profile_image FROM mkt_providers WHERE is_active=true AND category=${cat} ORDER BY created_at DESC`;
  }
  if (jud) {
    return await sql`SELECT id,slug,name,category,subtype,judet,oras,cloudinary_folder,profile_image FROM mkt_providers WHERE is_active=true AND judet=${jud} ORDER BY created_at DESC`;
  }
  if (q) {
    return await sql`SELECT id,slug,name,category,subtype,judet,oras,cloudinary_folder,profile_image FROM mkt_providers WHERE is_active=true AND (name ILIKE ${q} OR oras ILIKE ${q}) ORDER BY created_at DESC`;
  }
  return await sql`SELECT id,slug,name,category,subtype,judet,oras,cloudinary_folder,profile_image FROM mkt_providers WHERE is_active=true ORDER BY created_at DESC`;
}

async function getJudete() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT DISTINCT judet FROM mkt_providers WHERE is_active=true ORDER BY judet ASC`;
  return rows.map((r: any) => r.judet as string);
}

const CSS = `
  .sn-page { font-family: 'DM Sans', sans-serif; background: #FDFAF6; min-height: 100vh; }
  .sn-hero {
    background: linear-gradient(135deg, #1A1208 0%, #2d1f0e 100%);
    padding: 40px 20px 48px; text-align: center; position: relative; overflow: hidden;
  }
  .sn-hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 70% 50%, rgba(255,107,0,0.18) 0%, transparent 60%);
    pointer-events: none;
  }
  .sn-hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,107,0,0.15); border: 1px solid rgba(255,107,0,0.3);
    border-radius: 100px; padding: 4px 14px; font-size: 11px; font-weight: 600;
    color: #FF8C35; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 14px;
  }
  .sn-hero-dot { width: 6px; height: 6px; background: #FF6B00; border-radius: 50%; animation: snDot 1.8s ease-in-out infinite; }
  @keyframes snDot { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
  .sn-hero h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(26px, 5vw, 48px); font-weight: 300; color: #fff; line-height: 1.15; margin-bottom: 10px;
  }
  .sn-hero h1 em { font-style: italic; color: #FF8C35; }
  .sn-hero-sub { font-size: 14px; color: rgba(255,255,255,0.55); margin-bottom: 24px; }
  .sn-search-wrap { position: relative; max-width: 560px; margin: 0 auto; }
  .sn-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.4); pointer-events: none; }
  .sn-search {
    width: 100%; padding: 14px 18px 14px 44px;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
    border-radius: 16px; font-size: 14px; color: #fff; outline: none;
    transition: border-color .2s, background .2s;
  }
  .sn-search::placeholder { color: rgba(255,255,255,0.35); }
  .sn-search:focus { border-color: rgba(255,107,0,0.6); background: rgba(255,255,255,0.12); }

  .sn-body { max-width: 1280px; margin: 0 auto; padding: 28px 16px 60px; display: flex; gap: 24px; align-items: flex-start; }

  .sn-sidebar {
    width: 220px; flex-shrink: 0; position: sticky; top: 80px;
    background: #fff; border-radius: 20px; border: 1px solid rgba(255,107,0,0.1);
    box-shadow: 0 2px 12px rgba(0,0,0,0.05); padding: 20px; display: none;
  }
  @media(min-width:1024px){ .sn-sidebar { display: block; } }

  .sn-sidebar-title {
    font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: rgba(26,18,8,0.4); margin-bottom: 8px; padding-left: 4px;
  }
  .sn-filter-link {
    display: flex; align-items: center; gap: 9px;
    padding: 9px 12px; border-radius: 12px; font-size: 13px;
    color: rgba(26,18,8,0.65); text-decoration: none;
    transition: background .15s, color .15s; cursor: pointer;
  }
  .sn-filter-link:hover { background: #FFF4ED; color: #FF6B00; }
  .sn-filter-link.active { background: #FFF4ED; color: #FF6B00; font-weight: 600; }
  .sn-filter-icon { font-size: 15px; width: 20px; text-align: center; }
  .sn-divider { height: 1px; background: rgba(26,18,8,0.07); margin: 14px 0; }
  .sn-judet-link {
    display: block; padding: 7px 12px; border-radius: 10px; font-size: 12.5px;
    color: rgba(26,18,8,0.6); text-decoration: none; transition: background .15s, color .15s;
  }
  .sn-judet-link:hover { background: #FFF4ED; color: #FF6B00; }
  .sn-judet-link.active { background: #FFF4ED; color: #FF6B00; font-weight: 600; }

  .sn-main { flex: 1; min-width: 0; }
  .sn-results-bar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px; flex-wrap: wrap; gap: 8px;
  }
  .sn-results-count { font-size: 13px; color: rgba(26,18,8,0.45); }
  .sn-results-count strong { color: #1A1208; font-weight: 600; }

  .sn-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
  @media(min-width:540px){ .sn-grid { grid-template-columns: repeat(2,1fr); } }
  @media(min-width:900px){ .sn-grid { grid-template-columns: repeat(2,1fr); } }
  @media(min-width:1100px){ .sn-grid { grid-template-columns: repeat(3,1fr); } }

  .sn-card {
    background: #fff; border-radius: 20px; overflow: hidden;
    border: 1px solid rgba(26,18,8,0.07);
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    transition: transform .2s, box-shadow .2s;
  }
  .sn-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.1); }
  .sn-card-img { position: relative; height: 200px; background: #f0ece6; overflow: hidden; }
  .sn-card-cat {
    position: absolute; top: 10px; left: 10px;
    background: rgba(26,18,8,0.75); backdrop-filter: blur(8px);
    color: #fff; font-size: 10px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 100px;
  }
  .sn-card-body { padding: 16px; }
  .sn-card-name { font-size: 15px; font-weight: 600; color: #1A1208; margin-bottom: 4px; }
  .sn-card-loc { display: flex; align-items: center; gap: 4px; font-size: 12px; color: rgba(26,18,8,0.45); margin-bottom: 10px; }
  .sn-card-tag {
    display: inline-block; font-size: 11px; color: #FF6B00;
    background: #FFF4ED; border: 1px solid rgba(255,107,0,0.2);
    padding: 2px 8px; border-radius: 100px; margin-bottom: 12px;
  }
  .sn-card-btn {
    display: block; width: 100%; text-align: center;
    background: linear-gradient(135deg,#FF6B00,#FF8C35);
    color: #fff; font-size: 13px; font-weight: 600;
    padding: 10px; border-radius: 12px; text-decoration: none;
    transition: opacity .2s, transform .15s;
  }
  .sn-card-btn:hover { opacity: .9; transform: translateY(-1px); }

  .sn-empty { text-align: center; padding: 80px 20px; color: rgba(26,18,8,0.35); }
  .sn-empty-ico { font-size: 48px; margin-bottom: 12px; }
  .sn-empty-txt { font-size: 15px; }

  .sn-seo { max-width: 1280px; margin: 0 auto; padding: 0 16px 60px; }
  .sn-seo-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
  @media(min-width:640px){ .sn-seo-grid { grid-template-columns: repeat(2,1fr); } }
  @media(min-width:1024px){ .sn-seo-grid { grid-template-columns: repeat(4,1fr); } }
  .sn-seo-card {
    background: #fff; border-radius: 16px; padding: 20px;
    border: 1px solid rgba(255,107,0,0.1);
  }
  .sn-seo-ico { font-size: 24px; margin-bottom: 8px; }
  .sn-seo-t { font-size: 13px; font-weight: 600; color: #1A1208; margin-bottom: 4px; }
  .sn-seo-d { font-size: 12px; color: rgba(26,18,8,0.5); line-height: 1.6; }
`;

export default async function ServiciiNuntaPage({
  searchParams,
}: {
  searchParams: { category?: string; judet?: string; q?: string };
}) {
  const category = searchParams.category || 'toate';
  const judet = searchParams.judet || 'toate';
  const search = searchParams.q || '';

  const [providers, judete] = await Promise.all([
    getProviders(category, judet, search),
    getJudete(),
  ]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="sn-page">

        {/* HERO + SEARCH */}
        <div className="sn-hero">
          <div className="sn-hero-badge">
            <span className="sn-hero-dot" />
            Furnizori Verificați România
          </div>
          <h1>Servicii pentru <em>Nunta Ta</em></h1>
          <p className="sn-hero-sub">Fotografi, DJ, Formații, Candy Bar — contact direct, fără intermediari</p>
          <form method="GET" action="/servicii-nunta" className="sn-search-wrap">
            <input type="hidden" name="category" value={category} />
            <input type="hidden" name="judet" value={judet} />
            <svg className="sn-search-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              className="sn-search"
              type="text"
              name="q"
              defaultValue={search}
              placeholder="Caută fotograf, DJ, oraș..."
              autoComplete="off"
            />
          </form>
        </div>

        {/* MOBILE FILTERS */}
        <MobileFilters categories={CATEGORIES} judete={judete} activeCategory={category} activeJudet={judet} search={search} />

        {/* BODY */}
        <div className="sn-body">

          {/* SIDEBAR DESKTOP */}
          <aside className="sn-sidebar">
            <div className="sn-sidebar-title">Categorie</div>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/servicii-nunta?category=${cat.value}&judet=${judet}${search ? `&q=${search}` : ''}`}
                className={`sn-filter-link${category === cat.value ? ' active' : ''}`}
              >
                <span className="sn-filter-icon">{cat.icon}</span>
                {cat.label}
              </Link>
            ))}
            <div className="sn-divider" />
            <div className="sn-sidebar-title">Județ</div>
            <Link
              href={`/servicii-nunta?category=${category}&judet=toate${search ? `&q=${search}` : ''}`}
              className={`sn-judet-link${judet === 'toate' ? ' active' : ''}`}
            >
              Toate județele
            </Link>
            {judete.map((j: string) => (
              <Link
                key={j}
                href={`/servicii-nunta?category=${category}&judet=${j}${search ? `&q=${search}` : ''}`}
                className={`sn-judet-link${judet === j ? ' active' : ''}`}
              >
                {j}
              </Link>
            ))}
          </aside>

          {/* GRID CARDURI */}
          <main className="sn-main">
            <div className="sn-results-bar">
              <p className="sn-results-count">
                <strong>{providers.length}</strong> furnizori găsiți
                {category !== 'toate' && <> în <strong>{CATEGORIES.find(c => c.value === category)?.label}</strong></>}
                {judet !== 'toate' && <> · <strong>{judet}</strong></>}
              </p>
            </div>

            {providers.length === 0 ? (
              <div className="sn-empty">
                <div className="sn-empty-ico">🔍</div>
                <p className="sn-empty-txt">Niciun furnizor găsit. Încearcă alte filtre.</p>
              </div>
            ) : (
              <div className="sn-grid">
                {providers.map((p: any) => (
                  <div key={p.id} className="sn-card">
                    <div className="sn-card-img">
                      <Image
src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_500,h_400,c_fill/${p.profile_image}.jpg`}         alt={`${p.name} – ${p.category} ${p.oras}`}
fill
                        className="object-cover"
                        sizes="(max-width: 540px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      />
                      <span className="sn-card-cat">{p.category}</span>
                    </div>
                    <div className="sn-card-body">
                      <h2 className="sn-card-name">{p.name}</h2>
                      <div className="sn-card-loc">
                        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {p.oras}, {p.judet}
                      </div>
                      {p.subtype && <span className="sn-card-tag">{p.subtype}</span>}
                      <Link href={`/${p.slug}`} className="sn-card-btn">
                        Vezi Profilul
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* SEO SECTION */}
        <section className="sn-seo">
          <div className="sn-seo-grid">
            {[
              { ico: '📍', t: 'Furnizori Locali', d: 'Găsești furnizori din județul tău, cu contact direct și fără comisioane.' },
              { ico: '✅', t: 'Profil Verificat', d: 'Fiecare furnizor are profil real cu poze, descriere și link-uri verificate.' },
              { ico: '💬', t: 'Contact Direct', d: 'Suni direct furnizorul. Fără formulare, fără așteptare, fără intermediari.' },
              { ico: '🆓', t: 'Listare Gratuită', d: 'Ești furnizor? Adaugă-te gratuit și apari în căutările din Google.' },
            ].map((item) => (
              <div key={item.t} className="sn-seo-card">
                <div className="sn-seo-ico">{item.ico}</div>
                <div className="sn-seo-t">{item.t}</div>
                <div className="sn-seo-d">{item.d}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}