import Navigation from '@/components/Navigation';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <main className="flex flex-1 items-center justify-center bg-linear-to-b from-purple-900 to-black px-6 py-12">
        {children}
      </main>
    </>
  );
}
