/* eslint-disable @next/next/no-img-element */
'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-white/20" />;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="text-white transition hover:text-yellow-300"
      >
        Log In
      </Link>
    );
  }

  const avatarUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(session.user.id)}`;

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/my-concerts"
        className="text-white transition hover:text-yellow-300"
      >
        My Concerts
      </Link>
      <img
        src={avatarUrl}
        alt={session.user.name}
        width={32}
        height={32}
        className="rounded-full"
      />
      <button
        onClick={async () => {
          await authClient.signOut();
          router.push('/');
        }}
        className="cursor-pointer text-sm text-white/90 transition hover:text-yellow-300"
      >
        Log out
      </button>
    </div>
  );
}
