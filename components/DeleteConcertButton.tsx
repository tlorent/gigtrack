'use client';

import { deleteConcert } from '@/lib/actions';
import { Trash2 } from 'lucide-react';

export default function DeleteConcertButton({
  concertId,
}: {
  concertId: number;
}) {
  const deleteAction = deleteConcert.bind(null, concertId);

  return (
    <form
      action={deleteAction}
      onSubmit={(e) => {
        if (!confirm('Are you sure you want to delete this concert?')) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="cursor-pointer rounded p-2 text-gray-400 transition hover:bg-red-900/40 hover:text-red-400"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}
