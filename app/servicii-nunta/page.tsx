// app/servicii-nunta/page.tsx
import { neon } from '@neondatabase/serverless';
import Link from 'next/link';
import MobileFilters from './MobileFilters';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const CATEGORIES = [
  { value: 'toate', label: 'Toate' },
  { value: 'fotograf', label: 'Fotografi' },
  { value: 'dj', label: 'DJ' },
  { value: 'formatie', label: 'Formații' },
  { value: 'candybar', label: 'Candy Bar' },
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
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.sn-page { font-family: 'DM Sans', sans-serif; background: #FDFAF6; min-height: 100vh; }

.sn-hero {
  background: linear-gradient(135deg, #1A1208 0%, #2d1f0e 100%);
  padding: 52px 20px 56px; text-align: center; position: relative; overflow: hidden;
}
.sn-hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 70% 50%, rgba(255,107,0,0.15) 0%, transparent 60%);
  pointer-events: none;
}
.sn-hero-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,107,0,0.12); border: 1px solid rgba(255,107,0,0.25);
  border-radius: 100px; padding: 5px 16px; font-size: 11px; font-weight: 600;
  color: #FF8C35; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 20px;
}
.sn-hero-dot { width: 6px; height: 6px; background: #FF6B00; border-radius: 50%; animation: snDot 1.8s ease-in-out infinite; }
@keyframes snDot { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
.sn-hero h1 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(28px, 5vw, 52px); font-weight: 300; color: #fff; line-height: 1.12; margin-bottom: 12px;
}
.sn-hero h1 em { font-style: italic; color: #FF8C35; }
.sn-hero-sub { font-size: 14px; color: rgba(255,255,255,0.45); margin-bottom: 32px; letter-spacing: .01em; }
.sn-search-wrap { position: relative; max-width: 580px; margin: 0 auto; }
.sn-search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.35); pointer-events: none; }
.sn-search {
  width: 100%; padding: 15px 20px 15px 48px;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 18px; font-size: 14px; color: #fff; outline: none;
  transition: border-color .2s, background .2s; font-family: 'DM Sans', sans-serif;
}
.sn-search::placeholder { color: rgba(255,255,255,0.3); }
.sn-search:focus { border-color: rgba(255,107,0,0.5); background: rgba(255,255,255,0.1); }

.sn-body { max-width: 1320px; margin: 0 auto; padding: 36px 20px 80px; display: flex; gap: 32px; align-items: flex-start; }

.sn-sidebar {
  width: 230px; flex-shrink: 0; position: sticky; top: 88px;
  background: #fff; border-radius: 24px; border: 1px solid rgba(26,18,8,0.07);
  box-shadow: 0 2px 16px rgba(0,0,0,0.04); padding: 24px; display: none;
}
@media(min-width:1024px){ .sn-sidebar { display: block; } }

.sn-sidebar-title {
  font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
  color: rgba(26,18,8,0.3); margin-bottom: 10px; padding-left: 4px;
}
.sn-filter-link {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: 14px; font-size: 13.5px;
  color: rgba(26,18,8,0.6); text-decoration: none;
  transition: background .15s, color .15s;
}
.sn-filter-link:hover { background: #FFF4ED; color: #FF6B00; }
.sn-filter-link.active { background: #FFF4ED; color: #FF6B00; font-weight: 600; }
.sn-filter-dot {
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
  background: rgba(26,18,8,0.15); transition: background .15s;
}
.sn-filter-link.active .sn-filter-dot { background: #FF6B00; }
.sn-divider { height: 1px; background: rgba(26,18,8,0.06); margin: 16px 0; }
.sn-judet-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; border-radius: 12px; font-size: 13px;
  color: rgba(26,18,8,0.55); text-decoration: none; transition: background .15s, color .15s;
}
.sn-judet-link:hover { background: #FFF4ED; color: #FF6B00; }
.sn-judet-link.active { background: #FFF4ED; color: #FF6B00; font-weight: 600; }
.sn-judet-count {
  font-size: 11px; background: rgba(26,18,8,0.07); color: rgba(26,18,8,0.4);
  padding: 1px 7px; border-radius: 100px;
}
.sn-judet-link.active .sn-judet-count { background: rgba(255,107,0,0.12); color: #FF6B00; }

.sn-main { flex: 1; min-width: 0; }
.sn-results-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 8px; }
.sn-results-count { font-size: 13px; color: rgba(26,18,8,0.4); }
.sn-results-count strong { color: #1A1208; font-weight: 600; }
.sn-results-tag {
  display: inline-flex; align-items: center; gap: 6px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,0.2);
  color: #FF6B00; font-size: 12px; font-weight: 500;
  padding: 4px 12px; border-radius: 100px;
}

.sn-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media(min-width:540px){ .sn-grid { grid-template-columns: repeat(2,1fr); } }
@media(min-width:1100px){ .sn-grid { grid-template-columns: repeat(3,1fr); } }

.sn-card {
  background: #fff; border-radius: 24px; overflow: hidden;
  border: 1px solid rgba(26,18,8,0.06);
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  transition: transform .22s, box-shadow .22s;
  display: flex; flex-direction: column;
}
.sn-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.09); }

.sn-card-img {
  position: relative; height: 220px;
  background: linear-gradient(135deg, #f5f0ea, #ede8e1);
  overflow: hidden; flex-shrink: 0;
}
.sn-card-img img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; transition: transform .4s ease; }
.sn-card:hover .sn-card-img img { transform: scale(1.04); }
.sn-card-cat {
  position: absolute; top: 12px; left: 12px;
  background: rgba(26,18,8,0.7); backdrop-filter: blur(12px);
  color: #fff; font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  padding: 4px 12px; border-radius: 100px;
}

.sn-card-body { padding: 18px 18px 20px; display: flex; flex-direction: column; flex: 1; }
.sn-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
.sn-card-name { font-size: 15px; font-weight: 600; color: #1A1208; line-height: 1.3; }
.sn-card-loc { display: flex; align-items: center; gap: 4px; font-size: 12px; color: rgba(26,18,8,0.4); margin-bottom: 14px; }
.sn-card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
.sn-card-tag {
  font-size: 11px; color: #FF6B00;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,0.18);
  padding: 3px 10px; border-radius: 100px; font-weight: 500;
}
.sn-card-btn {
  display: block; width: 100%; text-align: center; margin-top: auto;
  background: linear-gradient(135deg,#FF6B00,#FF8C35);
  color: #fff; font-size: 13px; font-weight: 600;
  padding: 11px; border-radius: 14px; text-decoration: none;
  transition: opacity .2s, transform .15s; letter-spacing: .01em;
}
.sn-card-btn:hover { opacity: .88; transform: translateY(-1px); }

.sn-empty { text-align: center; padding: 100px 20px; color: rgba(26,18,8,0.3); }
.sn-empty-ico { font-size: 52px; margin-bottom: 14px; }
.sn-empty-txt { font-size: 15px; line-height: 1.6; }

@media(max-width:639px){
  .sn-hero { padding: 36px 16px 40px; }
  .sn-body { padding: 24px 14px 60px; }
}
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

  const activeCatLabel = CATEGORIES.find(c => c.value === category)?.label;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="sn-page">

        {/* HERO */}
        <div className="sn-hero">
          <div className="sn-hero-badge">
            <span className="sn-hero-dot" />
            Furnizori Verificați · România
          </div>
          <h1>Servicii pentru <em>Nunta Ta</em></h1>
          <p className="sn-hero-sub">Fotografi · DJ · Formații · Candy Bar — contact direct, fără intermediari</p>
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
                <span className="sn-filter-dot" />
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

          {/* GRID */}
          <main className="sn-main">
            <div className="sn-results-bar">
              <p className="sn-results-count">
                <strong>{providers.length}</strong> furnizori găsiți
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {category !== 'toate' && (
                  <span className="sn-results-tag">
                    {activeCatLabel}
                    <Link href={`/servicii-nunta?category=toate&judet=${judet}${search ? `&q=${search}` : ''}`} style={{ color: '#FF6B00', fontWeight: 700, marginLeft: 2 }}>×</Link>
                  </span>
                )}
                {judet !== 'toate' && (
                  <span className="sn-results-tag">
                    {judet}
                    <Link href={`/servicii-nunta?category=${category}&judet=toate${search ? `&q=${search}` : ''}`} style={{ color: '#FF6B00', fontWeight: 700, marginLeft: 2 }}>×</Link>
                  </span>
                )}
              </div>
            </div>

            {providers.length === 0 ? (
              <div className="sn-empty">
                <div className="sn-empty-ico">🔍</div>
                <p className="sn-empty-txt">Niciun furnizor găsit.<br />Încearcă alte filtre sau caută în alt județ.</p>
              </div>
            ) : (
              <div className="sn-grid">
                {providers.map((p: any) => (
                  <div key={p.id} className="sn-card">
                    <div className="sn-card-img">
                      <img
                        src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_600/${p.profile_image}.jpg`}
                        alt={`${p.name} – ${p.category} ${p.oras}`}
                        loading="lazy"
                      />
                      <span className="sn-card-cat">{p.category}</span>
                    </div>
                    <div className="sn-card-body">
                      <div className="sn-card-top">
                        <h2 className="sn-card-name">{p.name}</h2>
                      </div>
                      <div className="sn-card-loc">
                        <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {p.oras}, {p.judet}
                      </div>
                      {p.subtype && (
                        <div className="sn-card-tags">
                          <span className="sn-card-tag">{p.subtype}</span>
                        </div>
                      )}
                      <Link href={`/${p.slug}`} className="sn-card-btn">
                        Vezi Profilul →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}