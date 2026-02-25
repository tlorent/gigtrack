'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { createPortal } from 'react-dom';

type LoginPromptModalProps = {
  onClose: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function LoginPromptModal({
  onClose,
  icon,
  title,
  description,
}: LoginPromptModalProps) {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }}
    >
      <div
        className="relative w-full max-w-sm rounded bg-gray-900 p-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mb-4">{icon}</div>
        <h2 className="font-heading mb-2 text-2xl font-black">{title}</h2>
        <p className="font-body mb-6 text-gray-400">{description}</p>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="font-body flex-1 rounded bg-linear-to-r from-purple-600 to-orange-500 py-2 text-center font-medium transition hover:from-purple-500 hover:to-orange-400"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="font-body flex-1 rounded border border-white/20 py-2 text-center font-medium text-gray-300 transition hover:bg-white/10"
          >
            Register
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
