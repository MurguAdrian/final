import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const { email, password } = await req.json();

    // Căutăm comanda plătită cu acest email și parolă
    const user = await sql`
      SELECT theme_name FROM orders 
      WHERE email = ${email} AND password = ${password} AND status = 'paid'
      LIMIT 1
    `;

    if (user.length === 0) {
      return NextResponse.json({ error: "Email sau parolă incorectă (sau plată neconfirmată)" }, { status: 401 });
    }

    // Trimitem tema înapoi la pagină ca să știe unde să facă redirect
    return NextResponse.json({ 
      success: true, 
      theme: user[0].theme_name 
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}