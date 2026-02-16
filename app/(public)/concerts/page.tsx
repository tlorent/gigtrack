import { mockConcerts } from '@/lib/data/concerts';
import Link from 'next/link';
import FeaturedConcert from '@/components/FeaturedConcert';
import ConcertFilters from '@/components/ConcertFilters';

export default async function ConcertsPage({
  searchParams,
}: {
  searchParams: Promise<{
    month?: string;
    venue?: string;
    genre?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;

  // Filter concerts
  let filtered = mockConcerts;

  if (params.month) {
    filtered = filtered.filter((c) => c.date.startsWith(params.month!));
  }
  if (params.venue) {
    filtered = filtered.filter((c) => c.venue === params.venue);
  }
  if (params.genre) {
    filtered = filtered.filter((c) => c.genre === params.genre);
  }
  if (params.search) {
    const query = params.search.toLowerCase();
    filtered = filtered.filter((c) => c.artist.toLowerCase().includes(query));
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-purple-900 to-black py-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-heading mb-8 text-5xl font-bold text-white">
          Browse Concerts
        </h1>

        <ConcertFilters />

        {filtered.length === 0 ? (
          <p className="font-body text-center text-xl text-gray-400">
            No concerts found. Try adjusting your filters.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((concert) => (
              <Link
                href={`/concerts/${concert.id}`}
                key={concert.id}
                className="group overflow-hidden rounded bg-linear-to-br from-purple-600 to-orange-500 p-1"
              >
                <FeaturedConcert concert={concert} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
