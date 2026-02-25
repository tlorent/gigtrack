'use client';

import { Heart } from 'lucide-react';
import { useState, useTransition } from 'react';
import { favoriteConcert, unfavoriteConcert } from '@/lib/actions';
import LoginPromptModal from './LoginPromptModal';

type FavoriteButtonProps = {
  concertId: number;
  isFavorited: boolean;
  isLoggedIn: boolean;
};

export default function FavoriteButton({
  concertId,
  isFavorited,
  isLoggedIn,
}: FavoriteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    startTransition(async () => {
      if (isFavorited) {
        await unfavoriteConcert(concertId);
      } else {
        await favoriteConcert(concertId);
      }
    });
  };

  const isFilled = (isFavorited && !isPending) || (!isFavorited && isPending);

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isPending}
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        className="cursor-pointer rounded-full p-2 transition hover:bg-white/10 disabled:opacity-50"
      >
        <Heart
          className={`h-7 w-7 ${isFilled ? 'fill-red-500 stroke-red-500' : 'stroke-white'}`}
        />
      </button>

      {showLoginPrompt && (
        <LoginPromptModal
          onClose={() => setShowLoginPrompt(false)}
          icon={<Heart className="h-10 w-10 fill-red-500 stroke-red-500" />}
          title="Save your favorites"
          description="Sign in to keep track of the concerts you love."
        />
      )}
    </>
  );
}
