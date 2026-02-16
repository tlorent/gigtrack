import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const afasLive = await prisma.venue.create({
    data: { name: 'AFAS Live', city: 'Amsterdam' },
  });

  const paradiso = await prisma.venue.create({
    data: { name: 'Paradiso', city: 'Amsterdam' },
  });

  const tivoli = await prisma.venue.create({
    data: { name: 'TivoliVredenburg', city: 'Utrecht' },
  });

  const melkweg = await prisma.venue.create({
    data: { name: 'Melkweg', city: 'Amsterdam' },
  });

  const ziggo = await prisma.venue.create({
    data: { name: 'Ziggo Dome', city: 'Amsterdam' },
  });

  await prisma.concert.createMany({
    data: [
      {
        artist: 'Arctic Monkeys',
        venueId: afasLive.id,
        date: new Date('2026-06-15'),
        price: 65,
        status: 'SCHEDULED',
        genre: 'Rock',
        imageUrl: '/hero.jpg',
        description:
          'British rock band known for their energetic performances and indie rock anthems. Expect hits from AM, Tranquility Base Hotel & Casino, and their latest album.',
      },
      {
        artist: 'Tame Impala',
        venueId: paradiso.id,
        date: new Date('2026-07-20'),
        price: 55,
        status: 'SOLD_OUT',
        genre: 'Psychedelic',
        imageUrl: '/hero.jpg',
        description:
          'Australian psychedelic rock project led by Kevin Parker. Known for mesmerizing live shows featuring elaborate visuals and dreamy soundscapes. Performing classics from Currents and The Slow Rush.',
      },
      {
        artist: 'The Strokes',
        venueId: tivoli.id,
        date: new Date('2026-08-10'),
        price: 60,
        status: 'SCHEDULED',
        genre: 'Rock',
        imageUrl: '/hero.jpg',
        description:
          'Iconic New York rock band that defined early 2000s indie rock. Expect raw energy and hits from Is This It, Room on Fire, and their recent work. A legendary live experience.',
      },
      {
        artist: 'Fontaines D.C.',
        venueId: melkweg.id,
        date: new Date('2026-09-05'),
        price: 45,
        status: 'SCHEDULED',
        genre: 'Post-Punk',
        imageUrl: '/hero.jpg',
        description:
          'Irish post-punk band bringing intense, poetic performances. Their dark, driving sound and captivating stage presence make for unforgettable shows. Playing songs from their critically acclaimed albums.',
      },
      {
        artist: 'LCD Soundsystem',
        venueId: ziggo.id,
        date: new Date('2026-10-12'),
        price: 70,
        status: 'CANCELLED',
        genre: 'Electronic',
        imageUrl: '/hero.jpg',
        description:
          'Dance-punk pioneers known for marathon live sets that blend electronic beats with rock energy. James Murphy leads the band through hits spanning their entire career in an electrifying performance.',
      },
    ],
  });

  console.log('✅ Seeded database');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
