import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function getAdmin(): Promise<boolean> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return false
  }

  const admin = (await prisma.user.findUnique({
    where: { id: session?.user.id },
    select: { isAdmin: true },
  }));

  return !!admin?.isAdmin
}
