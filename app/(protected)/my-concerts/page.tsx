import Link from 'next/link';
import { redirect } from 'next/navigation';
import FeaturedConcert from '@/components/FeaturedConcert';
import { getSession } from '@/lib/session';
import prisma from '@/lib/prisma';

export default async function MyConcertsPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      concert: {
        include: {
          venue: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-linear-to-b from-purple-900 to-black py-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-heading mb-8 text-5xl font-bold text-white">
          My Concerts
        </h1>

        {favorites.length === 0 ? (
          <p className="font-body text-center text-xl text-gray-400">
            You haven&apos;t favorited any concerts yet.{' '}
            <Link href="/concerts" className="text-yellow-300 hover:underline">
              Browse concerts
            </Link>
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((favorite) => (
              <Link
                href={`/concerts/${favorite.concert.id}`}
                key={favorite.concert.id}
                className="group overflow-hidden rounded bg-linear-to-br from-purple-600 to-orange-500 p-1"
              >
                <FeaturedConcert
                  concert={favorite.concert}
                  isFavorited={true}
                  isLoggedIn={true}
                  favoriteCount={0}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
