import ConcertForm from '@/components/ConcertForm';
import { createConcert } from '@/lib/actions';
import prisma from '@/lib/prisma';

export default async function NewConcertPage() {
  const venues = await prisma.venue.findMany();

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-900 to-black py-12">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-heading mb-8 text-4xl font-bold text-white">
          Add Concert
        </h1>
        <ConcertForm
          action={createConcert}
          submitLabel="Add Concert"
          venues={venues}
        />
      </div>
    </div>
  );
}
