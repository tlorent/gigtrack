import Image from 'next/image';
import Link from 'next/link';
import UserMenu from '@/components/UserMenu';

export default function Navigation({ isAdmin = false }: { isAdmin?: boolean }) {
  return (
    <nav className="z-50 w-full bg-linear-to-r from-purple-900 to-purple-900/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 font-bold">
        <Link href="/">
          <Image src="/logo.png" alt="GigTrack" width={35} height={35} />
        </Link>
        <div className="font-body flex items-center gap-8 font-extrabold">
          <UserMenu isAdmin={isAdmin} />
        </div>
      </div>
    </nav>
  );
}
