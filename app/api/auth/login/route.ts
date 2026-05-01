import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const { email, password } = await req.json();

    const users = await sql`
      SELECT password, theme_name FROM orders 
      WHERE email = ${email} AND status = 'paid'
      LIMIT 1
    `;

    if (users.length === 0) {
      return NextResponse.json({ error: "Cont inexistent sau plată neconfirmată" }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, users[0].password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Email sau parolă incorectă" }, { status: 401 });
    }

    await createSession(email, users[0].theme_name);

    return NextResponse.json({ success: true, theme: users[0].theme_name });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}