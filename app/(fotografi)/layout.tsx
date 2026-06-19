// app/(fotografi)/layout.tsx
export default function FotografiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
}