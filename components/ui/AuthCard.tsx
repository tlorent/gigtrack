import Link from 'next/link';

type AuthCardProps = {
  title: string;
  subtitle: string;
  footer: { text: string; linkText: string; href: string };
  error?: string | null;
  children: React.ReactNode;
};

export default function AuthCard({
  title,
  subtitle,
  footer,
  error,
  children,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-xl bg-white/5 p-8 backdrop-blur-sm">
      <h1 className="font-heading mb-2 text-3xl font-bold text-white">
        {title}
      </h1>
      <p className="font-body mb-8 text-sm text-gray-400">{subtitle}</p>

      {error && (
        <div className="font-body mb-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {children}

      <p className="font-body mt-6 text-center text-sm text-gray-400">
        {footer.text}{' '}
        <Link
          href={footer.href}
          className="text-purple-400 hover:text-purple-300"
        >
          {footer.linkText}
        </Link>
      </p>
    </div>
  );
}
