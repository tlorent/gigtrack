'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';
import { mockConcerts } from '@/lib/data/concerts';

function FilterSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center"
      >
        <h3 className="font-heading text-lg font-bold text-gray-400">
          {title}
        </h3>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && <div className="mt-2 flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export default function ConcertFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentMonth = searchParams.get('month') || 'all';
  const currentVenue = searchParams.get('venue') || 'all';
  const currentGenre = searchParams.get('genre') || 'all';
  const currentSearch = searchParams.get('search') || '';

  const [searchValue, setSearchValue] = useState(currentSearch);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local state when URL search param changes externally
  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  // Extract unique values
  const months = [...new Set(mockConcerts.map((c) => c.date.substring(0, 7)))];
  const venues = [...new Set(mockConcerts.map((c) => c.venue))];
  const genres = [...new Set(mockConcerts.map((c) => c.genre))];

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`?${params.toString()}`);
  };

  const updateSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams, router],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      updateSearch(value);
    }, 300);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="mb-8 space-y-6">
      <div className="space-y-4">
        <FilterSection title="MONTH">
          <button
            onClick={() => updateFilter('month', 'all')}
            className={`font-body cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
              currentMonth === 'all'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Months
          </button>
          {months.map((month) => (
            <button
              key={month}
              onClick={() => updateFilter('month', month)}
              className={`font-body cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
                currentMonth === month
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {new Date(month + '-01').toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </button>
          ))}
        </FilterSection>

        <FilterSection title="VENUE">
          <button
            onClick={() => updateFilter('venue', 'all')}
            className={`font-body cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
              currentVenue === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Venues
          </button>
          {venues.map((venue) => (
            <button
              key={venue}
              onClick={() => updateFilter('venue', venue)}
              className={`font-body cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
                currentVenue === venue
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {venue}
            </button>
          ))}
        </FilterSection>

        <FilterSection title="GENRE">
          <button
            onClick={() => updateFilter('genre', 'all')}
            className={`font-body cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
              currentGenre === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Genres
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => updateFilter('genre', genre)}
              className={`font-body cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
                currentGenre === genre
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {genre}
            </button>
          ))}
        </FilterSection>
      </div>

      <div className="relative">
        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by artist"
          value={searchValue}
          onChange={handleSearchChange}
          className="font-body w-full rounded bg-gray-800 py-3 pr-4 pl-12 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-600 focus:outline-none"
        />
      </div>
    </div>
  );
}
