// app/servicii-nunta/FilterBar.tsx
'use client';
import { useRouter } from 'next/navigation';

interface Props {
  categories: { value: string; label: string }[];
  judete: string[];
  activeCategory: string;
  activeJudet: string;
}

export default function FilterBar({ categories, judete, activeCategory, activeJudet }: Props) {
  const router = useRouter();
  return (
    <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => router.push(`/servicii-nunta?category=${cat.value}&judet=${activeJudet}`)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === cat.value
              ? 'bg-amber-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          {cat.label}
        </button>
      ))}
      <select
        value={activeJudet}
        onChange={(e) => router.push(`/servicii-nunta?category=${activeCategory}&judet=${e.target.value}`)}
        className="flex-shrink-0 px-3 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none"
      >
        <option value="toate">Toate județele</option>
        {judete.map((j) => (
          <option key={j} value={j}>{j}</option>
        ))}
      </select>
    </div>
  );
}