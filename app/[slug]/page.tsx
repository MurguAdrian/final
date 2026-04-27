import { neon } from "@neondatabase/serverless";
import { notFound, redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function RedirectByTheme({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const sql = neon(process.env.DATABASE_URL!);
  
  // Căutăm în orders legat cu wedding_settings ce temă are acest slug
  const result = await sql`
    SELECT o.theme_name 
    FROM orders o
    JOIN wedding_settings ws ON o.id = ws.order_id
    WHERE ws.custom_slug = ${slug}
    LIMIT 1
  `;

  if (!result || result.length === 0) {
    notFound();
  }

  const theme = result[0].theme_name.toLowerCase(); // 'lux' sau 'nature'

  // Incrementăm vizualizările aici, la poarta de intrare
  await sql`UPDATE wedding_settings SET view_count = view_count + 1 WHERE custom_slug = ${slug}`;

  // Îl trimitem la pagina cu design-ul specific, dar el în browser vede tot URL-ul scurt!
  redirect(`/invitatie/${theme}/${slug}`);
}