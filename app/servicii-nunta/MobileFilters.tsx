// app/servicii-nunta/MobileFilters.tsx
'use client';
import { useRouter } from 'next/navigation';

interface Props {
  categories: { value: string; label: string; icon?: string }[];
  judete: string[];
  activeCategory: string;
  activeJudet: string;
  search: string;
}

export default function MobileFilters({ categories, judete, activeCategory, activeJudet, search }: Props) {
  const router = useRouter();

  function nav(cat: string, jud: string) {
    const q = search ? `&q=${search}` : '';
    router.push(`/servicii-nunta?category=${cat}&judet=${jud}${q}`);
  }

  return (
    <div className="lg:hidden" style={{ background: '#fff', borderBottom: '1px solid rgba(26,18,8,0.06)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px', scrollbarWidth: 'none' }}>
        {categories.map((cat) => {
          const active = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => nav(cat.value, activeJudet)}
              style={{
                flexShrink: 0,
                padding: '8px 18px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: active ? 600 : 400,
                background: active ? 'linear-gradient(135deg,#FF6B00,#FF8C35)' : 'transparent',
                color: active ? '#fff' : 'rgba(26,18,8,0.55)',
                border: active ? 'none' : '1px solid rgba(26,18,8,0.12)',
                cursor: 'pointer',
                transition: 'all .15s',
                fontFamily: 'DM Sans, sans-serif',
                letterSpacing: '.01em',
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
      <select
        value={activeJudet}
        onChange={(e) => nav(activeCategory, e.target.value)}
        style={{
          padding: '10px 14px',
          borderRadius: '12px',
          border: '1px solid rgba(26,18,8,0.1)',
          background: '#FDFAF6',
          fontSize: '13px',
          color: 'rgba(26,18,8,0.7)',
          outline: 'none',
          width: '100%',
          fontFamily: 'DM Sans, sans-serif',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
          paddingRight: '36px',
        }}
      >
        <option value="toate">Toate județele</option>
        {judete.map((j) => (
          <option key={j} value={j}>{j}</option>
        ))}
      </select>
    </div>
  );
}