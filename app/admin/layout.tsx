import { getAdmin } from '@/lib/admin';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await getAdmin();

  if (!isAdmin) {
    redirect('/');
  }

  return <main>{children}</main>;
}
