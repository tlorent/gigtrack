'use client';

import { useParams } from 'next/navigation';
import { mockConcerts } from '@/lib/data/concerts';
import ConcertForm, { ConcertFormData } from '@/components/ConcertForm';
import Link from 'next/link';

export default function EditConcertPage() {
  const { id } = useParams<{ id: string }>();
  const concert = mockConcerts.find((c) => c.id === id);

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
    venue: concert.venue,
    city: concert.city,
    date: concert.date,
    price: concert.price,
    status: concert.status,
    genre: concert.genre,
    imageUrl: concert.imageUrl,
    description: concert.description,
  };

  const onSubmit = (data: ConcertFormData) => {
    console.log('Update concert:', id, data);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-900 to-black py-12">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-heading mb-8 text-4xl font-bold text-white">
          Edit Concert
        </h1>
        <ConcertForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
