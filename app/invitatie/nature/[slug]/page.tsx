import { notFound } from "next/navigation";

export default function NatureInvitation({ params }: { params: { slug: string } }) {
  // Placeholder pentru build succesful
  return (
    <div style={{ background: '#2d4a2d', color: '#fff', minHeight: '100vh', padding: '50px' }}>
      <h1>Tema Nature - {params.slug}</h1>
      <p>În curând...</p>
    </div>
  );
}