'use client';

import ConcertForm, { ConcertFormData } from '@/components/ConcertForm';

export default function NewConcertPage() {
  const onSubmit = (data: ConcertFormData) => {
    console.log('Create concert:', data);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-900 to-black py-12">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-heading mb-8 text-4xl font-bold text-white">
          Add Concert
        </h1>
        <ConcertForm onSubmit={onSubmit} submitLabel="Add Concert" />
      </div>
    </div>
  );
}
