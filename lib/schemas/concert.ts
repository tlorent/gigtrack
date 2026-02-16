import { z } from 'zod';

export const ConcertSchema = z.object({
  artist: z.string().min(1, 'Artist name is required.'),
  venueId: z.number().positive(),
  date: z.string().min(1, 'Please select a date.'),
  price: z
    .number({ error: 'Price must be a number.' })
    .positive('Price must be greater than zero.'),
  status: z.enum(['SCHEDULED', 'CANCELLED', 'SOLD_OUT'], {
    error: 'Please select a valid status.',
  }),
  genre: z.string().min(1, 'Genre is required.'),
  imageUrl: z.string().min(1, 'Image URL is required.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters.'),
});

export type ConcertFormData = z.infer<typeof ConcertSchema>;
