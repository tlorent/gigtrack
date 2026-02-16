import Image from 'next/image';
import type { Concert } from '@/lib/data/concerts';

export default function FeaturedConcert({ concert }: { concert: Concert }) {
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
        <p className="font-semibold">{concert.venue}</p>
        <p className="text-sm">{concert.city}</p>
        <p className="text-sm">{concert.date}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-body text-2xl font-bold text-white">
          €{concert.price}
        </span>
        <span
          className={`font-body rounded-full px-3 py-1 text-xs font-bold ${
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
    </div>
  );
}
