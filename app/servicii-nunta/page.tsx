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

  if (cat && jud && q) return await sql`SELECT id,slug,name,category,subtype,judet,oras,profile_image FROM mkt_providers WHERE is_active=true AND category=${cat} AND judet=${jud} AND (name ILIKE ${q} OR oras ILIKE ${q}) ORDER BY created_at DESC`;
  if (cat && jud) return await sql`SELECT id,slug,name,category,subtype,judet,oras,profile_image FROM mkt_providers WHERE is_active=true AND category=${cat} AND judet=${jud} ORDER BY created_at DESC`;
  if (cat && q) return await sql`SELECT id,slug,name,category,subtype,judet,oras,profile_image FROM mkt_providers WHERE is_active=true AND category=${cat} AND (name ILIKE ${q} OR oras ILIKE ${q}) ORDER BY created_at DESC`;
  if (jud && q) return await sql`SELECT id,slug,name,category,subtype,judet,oras,profile_image FROM mkt_providers WHERE is_active=true AND judet=${jud} AND (name ILIKE ${q} OR oras ILIKE ${q}) ORDER BY created_at DESC`;
  if (cat) return await sql`SELECT id,slug,name,category,subtype,judet,oras,profile_image FROM mkt_providers WHERE is_active=true AND category=${cat} ORDER BY created_at DESC`;
  if (jud) return await sql`SELECT id,slug,name,category,subtype,judet,oras,profile_image FROM mkt_providers WHERE is_active=true AND judet=${jud} ORDER BY created_at DESC`;
  if (q) return await sql`SELECT id,slug,name,category,subtype,judet,oras,profile_image FROM mkt_providers WHERE is_active=true AND (name ILIKE ${q} OR oras ILIKE ${q}) ORDER BY created_at DESC`;
  return await sql`SELECT id,slug,name,category,subtype,judet,oras,profile_image FROM mkt_providers WHERE is_active=true ORDER BY created_at DESC`;
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
  padding: 56px 20px 60px; text-align: center; position: relative; overflow: hidden;
}
.sn-hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 70% 50%, rgba(255,107,0,0.13) 0%, transparent 60%);
  pointer-events: none;
}
.sn-hero-badge {
  display: inline-flex; align-items: center; gap: 7px;
  background: rgba(255,107,0,0.1); border: 1px solid rgba(255,107,0,0.22);
  border-radius: 100px; padding: 5px 18px; font-size: 11px; font-weight: 600;
  color: #FF8C35; letter-spacing: .09em; text-transform: uppercase; margin-bottom: 22px;
}
.sn-hero-dot { width: 6px; height: 6px; background: #FF6B00; border-radius: 50%; animation: snDot 1.8s ease-in-out infinite; }
@keyframes snDot { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
.sn-hero h1 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(30px, 5vw, 54px); font-weight: 300; color: #fff; line-height: 1.1; margin-bottom: 12px;
}
.sn-hero h1 em { font-style: italic; color: #FF8C35; }
.sn-hero-sub { font-size: 13.5px; color: rgba(255,255,255,0.4); margin-bottom: 36px; letter-spacing: .04em; }
.sn-search-wrap { position: relative; max-width: 580px; margin: 0 auto; }
.sn-search-icon { position: absolute; left: 17px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.3); pointer-events: none; }
.sn-search {
  width: 100%; padding: 16px 20px 16px 50px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 18px; font-size: 14px; color: #fff; outline: none;
  transition: border-color .2s, background .2s; font-family: 'DM Sans', sans-serif;
}
.sn-search::placeholder { color: rgba(255,255,255,0.28); }
.sn-search:focus { border-color: rgba(255,107,0,0.45); background: rgba(255,255,255,0.09); }

.sn-body { max-width: 1340px; margin: 0 auto; padding: 40px 24px 100px; display: flex; gap: 36px; align-items: flex-start; }

.sn-sidebar {
  width: 236px; flex-shrink: 0; position: sticky; top: 90px;
  background: #fff; border-radius: 24px; border: 1px solid rgba(26,18,8,0.06);
  box-shadow: 0 2px 20px rgba(0,0,0,0.04); padding: 26px; display: none;
}
@media(min-width:1024px){ .sn-sidebar { display: block; } }

.sn-sidebar-label {
  font-size: 9.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
  color: rgba(26,18,8,0.28); margin-bottom: 12px; padding-left: 2px;
}
.sn-cat-btn {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 10px 14px; border-radius: 14px; font-size: 13.5px;
  color: rgba(26,18,8,0.58); text-decoration: none; background: transparent; border: none;
  cursor: pointer; transition: background .15s, color .15s; font-family: 'DM Sans', sans-serif;
  margin-bottom: 2px;
}
.sn-cat-btn:hover { background: #FFF4ED; color: #FF6B00; }
.sn-cat-btn.active { background: linear-gradient(135deg,#FF6B00,#FF8C35); color: #fff; font-weight: 600; }
.sn-cat-arrow { font-size: 10px; opacity: .4; }
.sn-cat-btn.active .sn-cat-arrow { opacity: .7; }

.sn-divider { height: 1px; background: rgba(26,18,8,0.05); margin: 18px 0; }

.sn-judet-btn {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 8px 14px; border-radius: 12px; font-size: 13px;
  color: rgba(26,18,8,0.52); text-decoration: none; background: transparent; border: none;
  cursor: pointer; transition: background .15s, color .15s; font-family: 'DM Sans', sans-serif;
  margin-bottom: 2px;
}
.sn-judet-btn:hover { background: #FFF4ED; color: #FF6B00; }
.sn-judet-btn.active { background: #FFF4ED; color: #FF6B00; font-weight: 600; }

.sn-main { flex: 1; min-width: 0; }
.sn-results-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 10px; }
.sn-results-count { font-size: 13px; color: rgba(26,18,8,0.38); }
.sn-results-count strong { color: #1A1208; font-weight: 600; font-size: 14px; }
.sn-active-filters { display: flex; gap: 8px; flex-wrap: wrap; }
.sn-filter-chip {
  display: inline-flex; align-items: center; gap: 6px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,0.18);
  color: #FF6B00; font-size: 12px; font-weight: 500;
  padding: 5px 12px; border-radius: 100px;
}
.sn-filter-chip a { color: #FF6B00; font-weight: 700; text-decoration: none; margin-left: 2px; opacity: .7; }
.sn-filter-chip a:hover { opacity: 1; }

.sn-grid { display: grid; grid-template-columns: 1fr; gap: 22px; }
@media(min-width:540px){ .sn-grid { grid-template-columns: repeat(2,1fr); } }
@media(min-width:1100px){ .sn-grid { grid-template-columns: repeat(3,1fr); } }

.sn-card {
  background: #fff; border-radius: 24px; overflow: hidden;
  border: 1px solid rgba(26,18,8,0.06);
  box-shadow: 0 2px 14px rgba(0,0,0,0.04);
  transition: transform .22s ease, box-shadow .22s ease;
  display: flex; flex-direction: column;
}
.sn-card:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,0,0,0.09); }

.sn-card-img {
  position: relative; height: 240px;
  background: #f5f0ea;
  overflow: hidden; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.sn-card-img img {
  width: 100%; height: 100%;
  object-fit: contain; object-position: center;
  display: block; transition: transform .4s ease;
}
.sn-card:hover .sn-card-img img { transform: scale(1.03); }

.sn-card-cat {
  position: absolute; top: 12px; left: 12px;
  background: rgba(26,18,8,0.68); backdrop-filter: blur(14px);
  color: #fff; font-size: 9.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  padding: 4px 12px; border-radius: 100px;
}

.sn-card-body { padding: 20px 20px 22px; display: flex; flex-direction: column; flex: 1; }
.sn-card-name { font-size: 15.5px; font-weight: 600; color: #1A1208; line-height: 1.3; margin-bottom: 5px; }
.sn-card-loc { display: flex; align-items: center; gap: 4px; font-size: 12px; color: rgba(26,18,8,0.38); margin-bottom: 14px; }
.sn-card-tag {
  display: inline-block; font-size: 11px; color: #FF6B00;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,0.15);
  padding: 3px 11px; border-radius: 100px; font-weight: 500; margin-bottom: 16px;
}
.sn-card-btn {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  width: 100%; margin-top: auto;
  background: linear-gradient(135deg,#FF6B00,#FF8C35);
  color: #fff; font-size: 13.5px; font-weight: 600;
  padding: 12px; border-radius: 14px; text-decoration: none;
  transition: opacity .2s, transform .15s; letter-spacing: .01em;
  box-shadow: 0 4px 16px rgba(255,107,0,0.25);
}
.sn-card-btn:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,107,0,0.3); }
.sn-card-btn svg { transition: transform .2s; }
.sn-card:hover .sn-card-btn svg { transform: translateX(3px); }

.sn-empty { text-align: center; padding: 100px 20px; color: rgba(26,18,8,0.28); }
.sn-empty-ico { font-size: 52px; margin-bottom: 16px; }
.sn-empty-txt { font-size: 15px; line-height: 1.7; }

@media(max-width:639px){
  .sn-hero { padding: 40px 16px 44px; }
  .sn-body { padding: 24px 14px 70px; gap: 0; }
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
{/* HERO */}
<div className="sn-hero">
  <div className="sn-hero-badge">
    <span className="sn-hero-dot" />
    Furnizori Verificați · România
  </div>
  <h1>Servicii pentru <em>Nunta Ta</em></h1>
  <p className="sn-hero-sub">Fotografi · DJ · Formații · Candy Bar — contact direct, fără intermediari</p>

  {/* CTA PROMOȚIONAL */}
  <div style={{ marginBottom: '24px' }}>
    <Link
      href="https://forms.gle/bQtUVPzGYSWubxEJ7"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        background: 'linear-gradient(135deg, #FF6B00, #FF8C35)',
        color: '#fff',
        padding: '12px 28px',
        borderRadius: '16px',
        textDecoration: 'none',
        boxShadow: '0 4px 20px rgba(255,107,0,0.35)',
        transition: 'opacity .2s, transform .15s',
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = '0.9';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = '1';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '.02em' }}>
        Alătură-te și tu! Este gratis!!!
      </span>
      <span style={{ fontSize: '11px', opacity: 0.75, fontWeight: 400, letterSpacing: '.03em' }}>
        Proiect Pilot până în August 2027
      </span>
    </Link>
  </div>

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
            <div className="sn-sidebar-label">Categorie</div>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/servicii-nunta?category=${cat.value}&judet=${judet}${search ? `&q=${search}` : ''}`}
                className={`sn-cat-btn${category === cat.value ? ' active' : ''}`}
              >
                {cat.label}
                <span className="sn-cat-arrow">›</span>
              </Link>
            ))}
            <div className="sn-divider" />
            <div className="sn-sidebar-label">Județ</div>
            <Link
              href={`/servicii-nunta?category=${category}&judet=toate${search ? `&q=${search}` : ''}`}
              className={`sn-judet-btn${judet === 'toate' ? ' active' : ''}`}
            >
              Toate județele
            </Link>
            {judete.map((j: string) => (
              <Link
                key={j}
                href={`/servicii-nunta?category=${category}&judet=${j}${search ? `&q=${search}` : ''}`}
                className={`sn-judet-btn${judet === j ? ' active' : ''}`}
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
              <div className="sn-active-filters">
                {category !== 'toate' && (
                  <span className="sn-filter-chip">
                    {activeCatLabel}
                    <Link href={`/servicii-nunta?category=toate&judet=${judet}${search ? `&q=${search}` : ''}`}>×</Link>
                  </span>
                )}
                {judet !== 'toate' && (
                  <span className="sn-filter-chip">
                    {judet}
                    <Link href={`/servicii-nunta?category=${category}&judet=toate${search ? `&q=${search}` : ''}`}>×</Link>
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
                      <h2 className="sn-card-name">{p.name}</h2>
                      <div className="sn-card-loc">
                        <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {p.oras}, {p.judet}
                      </div>
                      {p.subtype && <span className="sn-card-tag">{p.subtype}</span>}
                      <Link href={`/${p.slug}`} className="sn-card-btn">
                        Vezi Profilul
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
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