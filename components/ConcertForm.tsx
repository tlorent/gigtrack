'use client';

import { useActionState } from 'react';
import { State } from '@/lib/actions';
import { ConcertFormData } from '@/lib/schemas/concert';

type ConcertFormProps = {
  action: (prevState: State, formData: FormData) => Promise<State>;
  venues: { id: number; name: string; city: string }[];
  submitLabel: string;
  defaultValues?: ConcertFormData;
};

export default function ConcertForm({
  action,
  defaultValues,
  venues,
  submitLabel,
}: ConcertFormProps) {
  const [state, formAction, isPending] = useActionState(action, {
    errors: {},
    message: null,
  });

  return (
    <form className="font-body space-y-6" action={formAction}>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Artist
          </label>
          <input
            type="text"
            name="artist"
            className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            placeholder="e.g. Arctic Monkeys"
            defaultValue={defaultValues?.artist}
            required
          />
          {state.errors?.artist && (
            <p className="mt-1 text-sm text-red-400">
              {state.errors.artist[0]}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Genre
          </label>
          <input
            type="text"
            name="genre"
            className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            placeholder="e.g. Indie Rock"
            defaultValue={defaultValues?.genre}
            required
          />
          {state.errors?.genre && (
            <p className="mt-1 text-sm text-red-400">{state.errors.genre[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-300">
          Venue
        </label>
        <select name="venueId" defaultValue={defaultValues?.venueId}>
          {venues.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} - {v.city}
            </option>
          ))}
        </select>
        {state.errors?.venueId && (
          <p className="mt-1 text-sm text-red-400">{state.errors.venueId[0]}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Date
          </label>
          <input
            type="date"
            name="date"
            className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
            defaultValue={defaultValues?.date}
            required
          />
          {state.errors?.date && (
            <p className="mt-1 text-sm text-red-400">{state.errors.date[0]}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Price (€)
          </label>
          <input
            type="number"
            name="price"
            className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            placeholder="0"
            defaultValue={defaultValues?.price}
            required
          />
          {state.errors?.price && (
            <p className="mt-1 text-sm text-red-400">{state.errors.price[0]}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Status
          </label>
          <select
            name="status"
            className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
            defaultValue={defaultValues?.status ?? 'SCHEDULED'}
          >
            <option value="SCHEDULED">Scheduled</option>
            <option value="SOLD_OUT">Sold Out</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          {state.errors?.status && (
            <p className="mt-1 text-sm text-red-400">
              {state.errors.status[0]}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-300">
          Image URL
        </label>
        <input
          type="url"
          name="imageUrl"
          className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          placeholder="https://..."
          defaultValue={defaultValues?.imageUrl}
          required
        />
        {state.errors?.imageUrl && (
          <p className="mt-1 text-sm text-red-400">
            {state.errors.imageUrl[0]}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-300">
          Description
        </label>
        <textarea
          rows={4}
          name="description"
          className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          placeholder="Describe the concert..."
          defaultValue={defaultValues?.description}
          required
        />
        {state.errors?.description && (
          <p className="mt-1 text-sm text-red-400">
            {state.errors.description[0]}
          </p>
        )}
      </div>

      {state.message && <p className="text-sm text-red-400">{state.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full cursor-pointer rounded bg-linear-to-r from-orange-600 to-red-600 px-8 py-4 font-bold text-white transition hover:from-orange-700 hover:to-red-700 disabled:opacity-50"
      >
        {isPending ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
