import Image from 'next/image';
import type { ConcertModel as Concert } from '@/generated/prisma/models/Concert';
import type { VenueModel as Venue } from '@/generated/prisma/models/Venue';

type ConcertWithVenue = Concert & { venue: Venue };

export default function FeaturedConcert({
  concert,
}: {
  concert: ConcertWithVenue;
}) {
  return (
    <div className="h-full rounded bg-gray-900 p-6 transition group-hover:bg-gray-800">
      <div className="mb-4 flex items-center gap-4">
        <Image
          src={concert.imageUrl}
          alt={concert.artist}
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <div>
          <div className="font-section text-sm font-bold text-orange-400">
            {concert.genre}
          </div>
          <h2 className="font-heading text-2xl font-black text-white">
            {concert.artist}
          </h2>
        </div>
      </div>

      <div className="font-body space-y-1 text-gray-300">
        <p className="font-semibold">{concert.venue.name}</p>
        <p className="text-sm">{concert.venue.city}</p>
        <p className="text-sm">
          {concert.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-body text-2xl font-bold text-white">
          €{concert.price}
        </span>
        <span
          className={`font-body rounded-full px-3 py-1 text-xs font-bold ${
            concert.status === 'SOLD_OUT'
              ? 'bg-red-500 text-white'
              : concert.status === 'CANCELLED'
                ? 'bg-gray-500 text-white'
                : 'bg-green-500 text-white'
          }`}
        >
          {concert.status.replace('_', ' ')}
        </span>
      </div>
    </div>
  );
}
