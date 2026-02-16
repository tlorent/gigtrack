import { mockConcerts } from '@/lib/data/concerts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Calendar, Tag } from 'lucide-react';

export default async function ConcertDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const concert = mockConcerts.find((c) => c.id === id);

  if (!concert) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-900 to-black">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Link
          href="/concerts"
          className="font-body mb-8 inline-flex items-center gap-2 text-white transition hover:text-yellow-300"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to concerts
        </Link>

        <div className="mb-8 overflow-hidden rounded">
          <Image
            src={concert.imageUrl}
            alt={concert.artist}
            width={1200}
            height={600}
            className="h-96 w-full object-cover"
          />
        </div>

        <div className="overflow-hidden rounded bg-linear-to-br from-purple-600 to-orange-500 p-1">
          <div className="rounded bg-gray-900 p-8 text-white">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <div className="font-section mb-2 text-sm font-bold text-orange-400">
                  {concert.genre}
                </div>
                <h1 className="font-heading mb-2 text-5xl font-black">
                  {concert.artist}
                </h1>
              </div>
              <span
                className={`font-body rounded-full px-4 py-2 text-sm font-bold ${
                  concert.status === 'sold_out'
                    ? 'bg-red-500 text-white'
                    : concert.status === 'cancelled'
                      ? 'bg-gray-500 text-white'
                      : 'bg-green-500 text-white'
                }`}
              >
                {concert.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="font-body mb-8 grid gap-6 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-6 w-6 text-orange-400" />
                <div>
                  <h2 className="mb-1 text-sm font-bold text-gray-400">
                    VENUE
                  </h2>
                  <p className="text-lg font-semibold">{concert.venue}</p>
                  <p className="text-gray-300">{concert.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="mt-1 h-6 w-6 text-orange-400" />
                <div>
                  <h2 className="mb-1 text-sm font-bold text-gray-400">DATE</h2>
                  <p className="text-lg font-semibold">{concert.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Tag className="mt-1 h-6 w-6 text-orange-400" />
                <div>
                  <h2 className="mb-1 text-sm font-bold text-gray-400">
                    PRICE
                  </h2>
                  <p className="text-3xl font-black">€{concert.price}</p>
                </div>
              </div>
            </div>

            <div className="mb-8 border-t border-gray-700 pt-8">
              <h2 className="font-heading mb-4 text-2xl font-bold">About</h2>
              <p className="font-body leading-relaxed text-gray-300">
                {concert.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
