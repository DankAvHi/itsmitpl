import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const url = process.env['DATABASE_URL'];
if (!url) throw new Error('DATABASE_URL is not set');

const adapter = new PrismaPg({ connectionString: url });
const prisma = new PrismaClient({ adapter });
const force = process.argv.includes('--force');

const main = async () => {
  if (!force && (await prisma.profile.count()) > 0) {
    console.log('Database already seeded, skipping (use --force to reseed)');
    return;
  }
  await prisma.$transaction([
    prisma.profile.deleteMany(),
    prisma.profile.create({
      data: {
        name: 'Даниил Дуров',
        description:
          'Fullstack разработчик с обширным опытом в разработке разнопланового ПО',
        links: {
          createMany: {
            data: [{ label: 'GitHub', url: 'https://github.com/DankAvHi' }],
          },
        },
        skills: {
          createMany: {
            data: [
              {
                name: 'JavaScript',
                description: 'Как джава, но со скриптами',
              },
              {
                name: 'TypeScript',
                description: 'Те же яйца только в профиль',
              },
              { name: 'NestJS' },
              { name: 'ReactJS' },
            ],
          },
        },
        experience: {
          createMany: {
            data: [
              {
                company: 'Аванта телеком',
                position: 'Frontend разработчик',
                startDate: new Date('2024-10-01'),
                endDate: new Date('2025-08-01'),
                achievements: [
                  'Единолично создал react native приложение Партнёрского портала',
                ],
              },
              {
                company: 'М2М',
                position: 'Fullstack разработчик',
                startDate: new Date('2025-09-01'),
                endDate: new Date('2026-07-01'),
                achievements: [
                  'Участвовал в разработке самописной DSL системы',
                ],
              },
            ],
          },
        },
        projects: {
          createMany: {
            data: [
              {
                name: 'notanote',
                repoLink: 'https://github.com/DankAvHi/notanote-client',
              },
            ],
          },
        },
      },
    }),
  ]);
};

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
