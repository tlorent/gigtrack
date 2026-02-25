import { getAdmin } from '@/lib/admin';
import { NextResponse } from 'next/server';

export async function GET() {
  const isAdmin = await getAdmin();
  return NextResponse.json({ isAdmin });
}
