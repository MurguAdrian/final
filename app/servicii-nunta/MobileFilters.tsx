// app/servicii-nunta/MobileFilters.tsx
'use client';
import { useRouter } from 'next/navigation';

interface Props {
categories: { value: string; label: string; icon?: string }[];  judete: string[];
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
    <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-3 flex flex-col gap-3">
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => nav(cat.value, activeJudet)}
            style={{
              flexShrink: 0,
              padding: '7px 14px',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: activeCategory === cat.value ? 600 : 400,
              background: activeCategory === cat.value ? '#FF6B00' : '#F5F0EA',
              color: activeCategory === cat.value ? '#fff' : 'rgba(26,18,8,0.65)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all .15s',
            }}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>
      <select
        value={activeJudet}
        onChange={(e) => nav(activeCategory, e.target.value)}
        style={{
          padding: '8px 12px',
          borderRadius: '12px',
          border: '1px solid rgba(26,18,8,0.12)',
          background: '#fff',
          fontSize: '13px',
          color: 'rgba(26,18,8,0.7)',
          outline: 'none',
          width: '100%',
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