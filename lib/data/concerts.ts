export type ConcertStatus = 'scheduled' | 'cancelled' | 'sold_out';

export type Concert = {
  id: string;
  artist: string;
  venue: string;
  city: string;
  date: string;
  price: number;
  status: ConcertStatus;
  genre: string;
  imageUrl: string;
  description: string;
};

export const mockConcerts: Concert[] = [
  {
    id: '1',
    artist: 'Arctic Monkeys',
    venue: 'AFAS Live',
    city: 'Amsterdam',
    date: '2026-06-15',
    price: 65,
    status: 'scheduled',
    genre: 'Rock',
    imageUrl: '/hero.jpg',
    description:
      'British rock band known for their energetic performances and indie rock anthems. Expect hits from AM, Tranquility Base Hotel & Casino, and their latest album.',
  },
  {
    id: '2',
    artist: 'Tame Impala',
    venue: 'Paradiso',
    city: 'Amsterdam',
    date: '2026-07-20',
    price: 55,
    status: 'sold_out',
    genre: 'Psychedelic',
    imageUrl: '/hero.jpg',
    description: 'Australian psychedelic rock project led by Kevin Parker. Known for mesmerizing live shows featuring elaborate visuals and dreamy soundscapes. Performing classics from Currents and The Slow Rush.',
  },
  {
    id: '3',
    artist: 'The Strokes',
    venue: 'TivoliVredenburg',
    city: 'Utrecht',
    date: '2026-08-10',
    price: 60,
    status: 'scheduled',
    genre: 'Rock',
    imageUrl: '/hero.jpg',
    description: 'Iconic New York rock band that defined early 2000s indie rock. Expect raw energy and hits from Is This It, Room on Fire, and their recent work. A legendary live experience.',
  },
  {
    id: '4',
    artist: 'Fontaines D.C.',
    venue: 'Melkweg',
    city: 'Amsterdam',
    date: '2026-09-05',
    price: 45,
    status: 'scheduled',
    genre: 'Post-Punk',
    imageUrl: '/hero.jpg',
    description: 'Irish post-punk band bringing intense, poetic performances. Their dark, driving sound and captivating stage presence make for unforgettable shows. Playing songs from their critically acclaimed albums.',
  },
  {
    id: '5',
    artist: 'LCD Soundsystem',
    venue: 'Ziggo Dome',
    city: 'Amsterdam',
    date: '2026-10-12',
    price: 70,
    status: 'cancelled',
    genre: 'Electronic',
    imageUrl: '/hero.jpg',
      description: 'Dance-punk pioneers known for marathon live sets that blend electronic beats with rock energy. James Murphy leads the band through hits spanning their entire career in an electrifying performance.',
  },
];
