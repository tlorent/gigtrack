import ConcertForm from '@/components/ConcertForm';
import { updateConcert } from '@/lib/actions';
import prisma from '@/lib/prisma';
import { ConcertFormData } from '@/lib/schemas/concert';
import Link from 'next/link';

export default async function EditConcertPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const venues = await prisma.venue.findMany();

  const concert = await prisma.concert.findUnique({
    where: { id: parseInt(id) },
    include: {
      venue: true,
    },
  });

  if (!concert) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-purple-900 to-black">
        <div className="text-center">
          <h1 className="font-heading mb-4 text-4xl font-bold text-white">
            Concert not found
          </h1>
          <Link
            href="/admin"
            className="font-body text-orange-400 transition hover:text-orange-300"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const defaultValues: ConcertFormData = {
    artist: concert.artist,
    venueId: concert.venueId,
    date: concert.date.toISOString().split('T')[0],
    price: concert.price,
    status: concert.status,
    genre: concert.genre,
    imageUrl: concert.imageUrl,
    description: concert.description,
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-900 to-black py-12">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-heading mb-8 text-4xl font-bold text-white">
          Edit Concert
        </h1>
        <ConcertForm
          action={updateConcert.bind(null, concert.id)}
          defaultValues={defaultValues}
          submitLabel="Save Changes"
          venues={venues}
        />
      </div>
    </div>
  );
}
