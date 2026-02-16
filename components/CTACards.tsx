import { MapPin, Bell, Heart } from 'lucide-react';

export default function CTACards() {
  return (
    <section className="bg-linear-to-b from-purple-900 to-purple-950 py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">
        <div className="flex items-center gap-6 rounded bg-purple-700 p-6 text-white">
          <MapPin className="h-15 w-15 shrink-0 stroke-2" />
          <div className="text-left">
            <h3 className="font-heading mb-1 text-xl leading-tight font-black italic lg:text-3xl">
              FIND SHOWS
              <br />
              NEAR YOU
            </h3>
            <p className="font-body text-lg">Discover Upcoming Concerts</p>
          </div>
        </div>

        <div className="flex items-center gap-6 rounded bg-red-600 p-6 text-white">
          <Bell className="h-15 w-15 shrink-0 stroke-2" />
          <div className="text-left">
            <h3 className="font-heading mb-1 text-xl leading-tight font-black italic lg:text-3xl">
              GET ALERTS
              <br />& REMINDERS
            </h3>
            <p className="font-body text-lg">Set Notifications for Events</p>
          </div>
        </div>

        <div className="flex items-center gap-6 rounded bg-orange-600 p-6 text-white">
          <Heart className="h-15 w-15 shrink-0 fill-white stroke-2" />
          <div className="text-left">
            <h3 className="font-heading mb-1 text-xl leading-tight font-black italic lg:text-3xl">
              FOLLOW YOUR
              <br />
              FAVORITES
            </h3>
            <p className="font-body text-lg">Track Your Top Artists</p>
          </div>
        </div>
      </div>
    </section>
  );
}
