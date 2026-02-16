import type { Metadata } from 'next';
import { Sofia_Sans_Condensed, Work_Sans, Fraunces } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';

const headingFont = Sofia_Sans_Condensed({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const bodyFont = Work_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const sectionFont = Fraunces({
  variable: '--font-section',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'GigTrack - Never miss a concert again.',
  description: 'Never miss a concert again.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sectionFont.variable} ${headingFont.variable} ${bodyFont.variable} flex min-h-screen flex-col antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
