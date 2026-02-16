'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const concertSchema = z.object({
  artist: z.string().min(1, 'Artist name is required.'),
  venue: z.string().min(1, 'Venue is required.'),
  city: z.string().min(1, 'City is required.'),
  date: z.string().min(1, 'Please select a date.'),
  price: z
    .number({ error: 'Price must be a number.' })
    .positive('Price must be greater than zero.'),
  status: z.enum(['scheduled', 'cancelled', 'sold_out'], {
    error: 'Please select a valid status.',
  }),
  genre: z.string().min(1, 'Genre is required.'),
  imageUrl: z
    .string()
    .min(1, 'Image URL is required.')
    .url('Please enter a valid URL.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters.'),
});

export type ConcertFormData = z.infer<typeof concertSchema>;

type ConcertFormProps = {
  defaultValues?: ConcertFormData;
  onSubmit: SubmitHandler<ConcertFormData>;
  submitLabel: string;
};

export default function ConcertForm({
  defaultValues,
  onSubmit,
  submitLabel,
}: ConcertFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConcertFormData>({
    resolver: zodResolver(concertSchema),
    defaultValues,
  });

  return (
    <form className="font-body space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Artist
          </label>
          <input
            type="text"
            className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            placeholder="e.g. Arctic Monkeys"
            {...register('artist')}
          />
          {errors.artist && (
            <p className="mt-1 text-sm text-red-400">
              {errors.artist.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Genre
          </label>
          <input
            type="text"
            className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            placeholder="e.g. Indie Rock"
            {...register('genre')}
          />
          {errors.genre && (
            <p className="mt-1 text-sm text-red-400">
              {errors.genre.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Venue
          </label>
          <input
            type="text"
            className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            placeholder="e.g. Paradiso"
            {...register('venue')}
          />
          {errors.venue && (
            <p className="mt-1 text-sm text-red-400">
              {errors.venue.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            City
          </label>
          <input
            type="text"
            className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            placeholder="e.g. Amsterdam"
            {...register('city')}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-400">
              {errors.city.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Date
          </label>
          <input
            type="date"
            className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
            {...register('date')}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-400">
              {errors.date.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Price (€)
          </label>
          <input
            type="number"
            className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            placeholder="0"
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-400">
              {errors.price.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Status
          </label>
          <select
            className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
            {...register('status')}
          >
            <option value="scheduled">Scheduled</option>
            <option value="sold_out">Sold Out</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-400">
              {errors.status.message}
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
          className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          placeholder="https://..."
          {...register('imageUrl')}
        />
        {errors.imageUrl && (
          <p className="mt-1 text-sm text-red-400">
            {errors.imageUrl.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-300">
          Description
        </label>
        <textarea
          rows={4}
          className="w-full rounded border border-purple-700/50 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          placeholder="Describe the concert..."
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer rounded bg-linear-to-r from-orange-600 to-red-600 px-8 py-4 font-bold text-white transition hover:from-orange-700 hover:to-red-700"
      >
        {submitLabel}
      </button>
    </form>
  );
}
