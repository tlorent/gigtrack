import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-gray-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="font-heading text-2xl font-bold text-white"
            >
              GigTrack
            </Link>
            <p className="font-body mt-3 text-sm">
              Never miss a show again. Find the best gigs near you.
            </p>
          </div>

          <div>
            <h3 className="font-heading mb-3 font-semibold text-white">
              Quick Links
            </h3>
            <ul className="font-body space-y-2 text-sm">
              <li>
                <Link href="/concerts" className="transition hover:text-white">
                  Browse Concerts
                </Link>
              </li>
              <li>
                <Link href="/signup" className="transition hover:text-white">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/login" className="transition hover:text-white">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading mb-3 font-semibold text-white">
              Follow Us
            </h3>
            <ul className="font-body space-y-2 text-sm">
              <li>
                <a href="#" className="transition hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
          <p className="font-body">
            &copy; {new Date().getFullYear()} GigTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
