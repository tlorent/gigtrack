import Navigation from '@/components/Navigation';
import { redirect } from 'next/navigation';

const adminLinks = [
  { href: '/admin', label: 'View Concerts' },
  { href: '/admin/concerts/new', label: 'Add Concert' },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.ADMIN_ENABLED !== 'true') {
    redirect('/');
  }

  return (
    <>
      <Navigation links={adminLinks} />
      <main>{children}</main>
    </>
  );
}
