import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-purple-900 to-black">
      <div className="max-w-2xl px-6 text-center text-white">
        <h1 className="font-heading mb-4 text-8xl font-black">404</h1>
        <h2 className="font-heading mb-6 text-4xl font-bold">
          The Band Never Showed Up
        </h2>
        <p className="font-body mb-8 text-xl text-gray-300">
          We are sorry, but the band probably got stuck in traffic on the tour
          bus.
        </p>
        <Link
          href="/concerts"
          className="font-body inline-flex items-center gap-2 rounded bg-linear-to-r from-orange-600 to-red-600 px-8 py-4 text-lg font-bold transition hover:from-orange-700 hover:to-red-700"
        >
          Back to concerts
        </Link>
      </div>
    </div>
  );
}
