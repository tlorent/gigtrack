import DeleteConcertButton from '@/components/DeleteConcertButton';
import prisma from '@/lib/prisma';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

export default async function AdminPage() {
  const concerts = await prisma.concert.findMany({
    include: { venue: true },
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-900 to-black py-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-heading mb-8 text-4xl font-bold text-white">
          Manage Concerts
        </h1>

        <div className="overflow-x-auto rounded border border-purple-700/50">
          <table className="font-body w-full text-left text-sm text-gray-300">
            <thead className="bg-purple-900/60 text-xs tracking-wider text-gray-400 uppercase">
              <tr>
                <th className="px-6 py-4">Artist</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Venue</th>
                <th className="px-6 py-4">City</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-800/40">
              {concerts.map((concert) => (
                <tr
                  key={concert.id}
                  className="bg-gray-900/60 transition hover:bg-purple-900/30"
                >
                  <td className="px-6 py-4 font-semibold whitespace-nowrap text-white">
                    {concert.artist}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {concert.date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {concert.venue.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {concert.venue.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    €{concert.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                        concert.status === 'SOLD_OUT'
                          ? 'bg-red-500/20 text-red-400'
                          : concert.status === 'CANCELLED'
                            ? 'bg-gray-500/20 text-gray-400'
                            : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {concert.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/concerts/${concert.id}/edit`}
                        className="rounded p-2 text-gray-400 transition hover:bg-purple-800/40 hover:text-yellow-300"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteConcertButton concertId={concert.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
