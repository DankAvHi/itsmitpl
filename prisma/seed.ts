import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env['DATABASE_URL'],
});

const prisma = new PrismaClient({ adapter });

const main = async () => {
  try {
    await prisma.$transaction([
      prisma.profile.deleteMany(),
      prisma.profile.create({
        data: {
          name: 'Даниил Дуров',
          description:
            'Fullstack разработчик с обширным опытом в разработке разнопланового ПО',
          links: {
            createMany: {
              data: [{ label: 'Github', url: 'https://github.com/DankAvHi' }],
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
  } catch (e) {
    console.error(e);
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
