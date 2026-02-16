'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { ConcertSchema } from './schemas/concert';

const CreateConcert = ConcertSchema;
const UpdateConcert = ConcertSchema;

export type State = {
  errors?: Partial<Record<keyof z.infer<typeof ConcertSchema>, string[]>>;
  message?: string | null;
};

export async function createConcert(prevState: State, formData: FormData) {
  const validatedFields = CreateConcert.safeParse({
    artist: formData.get('artist'),
    venueId: Number(formData.get('venueId')),
    date: formData.get('date'),
    price: Number(formData.get('price')),
    status: formData.get('status'),
    genre: formData.get('genre'),
    imageUrl: formData.get('imageUrl'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Concert.',
    };
  }

  const { artist, venueId, date, price, status, genre, imageUrl, description } =
    validatedFields.data;

  try {
    await prisma.concert.create({
      data: {
        artist,
        venueId,
        date: new Date(date),
        price,
        status,
        genre,
        imageUrl,
        description,
      },
    });
  } catch {
    return {
      message: 'Database Error: Failed to Create Concert.',
    };
  }

  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateConcert(
  id: number,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateConcert.safeParse({
    artist: formData.get('artist'),
    venueId: Number(formData.get('venueId')),
    date: formData.get('date'),
    price: Number(formData.get('price')),
    status: formData.get('status'),
    genre: formData.get('genre'),
    imageUrl: formData.get('imageUrl'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Concert.',
    };
  }

  const { artist, venueId, date, price, status, genre, imageUrl, description } =
    validatedFields.data;

  try {
    await prisma.concert.update({
      where: {
        id,
      },
      data: {
        artist,
        venueId,
        date: new Date(date),
        price,
        status,
        genre,
        imageUrl,
        description,
      },
    });
  } catch {
    return {
      message: 'Database Error: Failed to Update Concert.',
    };
  }

  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteConcert(id: number) {
  await prisma.concert.delete({
    where: { id },
  });

  revalidatePath('/admin');
  redirect('/admin');
}
