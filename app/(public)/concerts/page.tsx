import Link from 'next/link';
import FeaturedConcert from '@/components/FeaturedConcert';
import ConcertFilters from '@/components/ConcertFilters';
import prisma from '@/lib/prisma';

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

  const [allConcerts, venues, concerts] = await Promise.all([
    prisma.concert.findMany({
      select: { date: true, genre: true },
    }),
    prisma.venue.findMany({
      select: { name: true },
    }),
    prisma.concert.findMany({
      include: { venue: true },
      where: {
        ...(params.month && {
          date: {
            gte: new Date(`${params.month}-01`),
            lt: new Date(
              `${params.month}-01` === `${params.month.slice(0, 4)}-12-01`
                ? `${Number(params.month.slice(0, 4)) + 1}-01-01`
                : `${params.month.slice(0, 4)}-${String(Number(params.month.slice(5, 7)) + 1).padStart(2, '0')}-01`,
            ),
          },
        }),
        ...(params.venue && { venue: { name: params.venue } }),
        ...(params.genre && { genre: params.genre }),
        ...(params.search && {
          artist: { contains: params.search, mode: 'insensitive' as const },
        }),
      },
    }),
  ]);

  const months = [
    ...new Set(
      allConcerts.map((c) => {
        const d = c.date;
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      }),
    ),
  ].sort();
  const venueNames = venues.map((v) => v.name).sort();
  const genres = [...new Set(allConcerts.map((c) => c.genre))].sort();

  return (
    <main className="min-h-screen bg-linear-to-b from-purple-900 to-black py-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-heading mb-8 text-5xl font-bold text-white">
          Browse Concerts
        </h1>

        <ConcertFilters months={months} venues={venueNames} genres={genres} />

        {concerts.length === 0 ? (
          <p className="font-body text-center text-xl text-gray-400">
            No concerts found. Try adjusting your filters.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {concerts.map((concert) => (
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
