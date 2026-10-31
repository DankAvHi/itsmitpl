import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const url = process.env['DATABASE_URL'];
if (!url) throw new Error('DATABASE_URL is not set');

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: url }),
});

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
          'Fullstack-разработчик с упором на frontend. Пять лет коммерческой разработки веб и мобильных приложений: React, TypeScript, Next.js, Vue 3; на бэкенде Node.js, NestJS и Prisma.',
        links: {
          createMany: {
            data: [
              { label: 'GitHub', url: 'https://github.com/DankAvHi' },
              { label: 'Telegram', url: 'https://t.me/DankAvHi' },
            ],
          },
        },
        skills: {
          createMany: {
            data: [
              {
                name: 'TypeScript',
                description: 'Основной язык: frontend, Node.js и NestJS',
              },
              { name: 'JavaScript', description: 'Коммерческий опыт 5 лет' },
              {
                name: 'React',
                description: 'Основной frontend-стек, коммерческий опыт',
              },
              {
                name: 'Next.js',
                description: 'Проектирование архитектуры клиентской части',
              },
              {
                name: 'React Native',
                description:
                  'Разработал с нуля мобильное приложение для Android и Web (Expo)',
              },
              {
                name: 'Vue 3',
                description: 'Quasar и Vuetify, коммерческий опыт',
              },
              { name: 'HTML / CSS' },
              {
                name: 'Feature-Sliced Design',
                description:
                  'Организация клиентского кода в коммерческих проектах',
              },
              {
                name: 'Node.js',
                description: 'Серверная часть коммерческих проектов',
              },
              { name: 'NestJS', description: 'Серверная часть и GraphQL API' },
              { name: 'Express' },
              {
                name: 'GraphQL',
                description: 'Apollo Server, code-first подход на NestJS',
              },
              {
                name: 'REST API',
                description: 'Интеграция с backend и сторонними сервисами',
              },
              {
                name: 'WebSocket',
                description: 'Проектирование потоковых real-time обновлений',
              },
              { name: 'Prisma', description: 'ORM для PostgreSQL и MySQL' },
              { name: 'PostgreSQL' },
              { name: 'MySQL' },
              {
                name: 'Docker',
                description: 'Compose для dev- и prod-окружений',
              },
              { name: 'Git' },
              {
                name: 'Картографические интерфейсы',
                description: 'Карты, геометрия, редактор стилей карты',
              },
              {
                name: 'Frontend-архитектура',
                description:
                  'Выбор стека на прототипах, проектирование клиентской части',
              },
              {
                name: 'Code review',
                description:
                  'Ревью кода, координация работы другого frontend-разработчика',
              },
              { name: 'Telegram-боты и Mini Apps' },
              {
                name: 'LLM и локальные модели',
                description:
                  'Tool Use, мультиагентные сценарии, начальный опыт дообучения',
              },
              { name: 'Системное администрирование' },
              { name: 'Английский язык', description: 'B1' },
            ],
          },
        },
        experience: {
          createMany: {
            data: [
              {
                company: 'М2М',
                position: 'Программист-разработчик',
                startDate: new Date('2025-09-01'),
                endDate: new Date('2026-07-01'),
                achievements: [
                  'Разрабатывал клиентскую часть веб-платформы для работы с обращениями, инцидентами и картографическими данными',
                  'Сравнил варианты организации frontend-стека на прототипах и представил результаты команде',
                  'Реализовал сложные интерфейсы: картографические инструменты, редактор стилей карты, графики, аудио- и видеоплееры, конструкторы форм',
                  'Участвовал в развитии внутренней DSL-платформы для декларативного описания страниц и форм',
                ],
              },
              {
                company: 'Аванта телеком',
                position: 'Frontend-разработчик',
                startDate: new Date('2024-10-01'),
                endDate: new Date('2025-08-01'),
                achievements: [
                  'Самостоятельно с нуля разработал партнёрское мобильное приложение на React Native и Expo (Android и Web)',
                  'Разрабатывал новые функции и исправлял ошибки во внутренней корпоративной платформе провайдера',
                  'Применял Feature-Sliced Design для организации и расширяемости клиентского кода',
                  'Поддерживал клиентские веб-сайты компании',
                ],
              },
              {
                company: 'Фриланс',
                position: 'Fullstack-разработчик',
                startDate: new Date('2021-06-01'),
                endDate: new Date('2024-07-01'),
                achievements: [
                  'Разрабатывал и поддерживал проекты разного масштаба: от сайтов и доработок до клиент-серверных приложений, самостоятельно и в небольших командах',
                  'Спроектировал архитектуру клиента на Next.js в команде из двух frontend- и двух backend-разработчиков, проводил код-ревью',
                  'Делал админ-панели, авторизацию, загрузку файлов, интеграции со сторонними API, Telegram-ботов и Mini Apps',
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
                description:
                  'Клиентская часть приложения для заметок: аккаунты, хранение в localStorage и в облаке',
                repoLink: 'https://github.com/DankAvHi/notanote-client',
              },
              {
                name: 'Promenade History',
                description:
                  'Лендинг сервиса продвижения экскурсий и продажи билетов для сезонного мероприятия: авторизация через VK, вебхуки билетной кассы',
                repoLink: 'https://github.com/DankAvHi/promenade_history',
              },
              {
                name: 'Imba-Dev',
                description:
                  'Командное букмекерское веб-приложение (React, Next.js, REST API, WebSocket): архитектура клиентской части и код-ревью',
              },
              {
                name: 'Work Search Israel',
                description:
                  'Сервис поиска работы и CRM: админ-панель и серверная часть (React, Node.js, Express, Prisma, MySQL, Passport.js)',
              },
              {
                name: 'Rockot Krasnodar',
                description:
                  'Информационный портал спортивного клуба: многостраничный сайт с админ-панелью. Код в закрытом репозитории',
                link: 'https://rockot-krasnodar.ru',
              },
              {
                name: 'FARRK',
                description:
                  'Информационный портал федерации Акробатического р-н-р Кубани: многостраничный сайт с админ-панелью. Код в закрытом репозитории',
                link: 'https://фаррк.рф',
              },
            ],
          },
        },
      },
    }),
  ]);

  console.log('Database seeded');
};

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
