export default function Hero() {
  return (
    <section
      className="relative flex min-h-200 items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url(/hero.jpg)' }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-purple-900/80" />
      <div className="relative z-10 px-6 text-center font-extrabold text-white">
        <h1 className="font-heading mb-6 text-5xl leading-tight font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-6xl md:text-7xl lg:text-8xl">
          TRACK YOUR{' '}
          <span className="block bg-linear-to-r from-pink-400 via-pink-300 to-orange-400 bg-clip-text text-6xl leading-normal text-transparent italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] lg:text-7xl">
            FAVORITE CONCERTS!
          </span>
        </h1>
        <p className="font-body text-lg font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-xl md:text-2xl">
          Never miss a show again! Find the best gigs near you.
        </p>
      </div>
    </section>
  );
}
