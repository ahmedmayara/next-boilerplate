# Next.js Boilerplate

A scalable, high-performance boilerplate for Next.js applications, designed to accelerate development and streamline the setup process.

## Features

- **Next.js 15** for server-side rendering and static generation.
- **TypeScript** integration for static typing and improved code quality.
- **Tailwind CSS** for efficient, responsive styling.
- **shadcn/ui** for a collection of accessible and beautiful components.
- **React Hook Form** for form handling and validation.
- **Prisma** for database management.
- **PostgreSQL** as the database for your application.
- **Session Based Authentication** for user authentication.
- **React Query** for data fetching and state management.
- **ZSA** for building typesafe server actions in Next.js.
- **ESLint & Prettier** configurations for consistent code formatting.

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ahmedmayara/next-boilerplate.git
   ```

2. **Install dependencies**:

   ```bash
   cd next-boilerplate
   npm install --legacy-peer-deps
   ```

   **Note**: The `--legacy-peer-deps` flag is required since some dependencies are not compatible with the release candidate of React 19.

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run build`
- `npm run dev`
- `npm run start`
- `npm run lint`
- `npm run format`
- `npm run shadcn:add`
- `npm run postinstall`

## Project Structure

```bash
├── src
│   ├── app
│   │   ├── (auth)
│   │   ├── (protected)
│   │   └── api
│   ├── favicon.ico
│   ├── layout.tsx
│   ├── page.tsx
│   ├── assets
│   │   ├── fonts
│   │   │   └── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   ├── components
│   │   ├── marketing
│   │   │   └── logo.tsx
│   │   ├── ui
│   ├── config
│   │   └── env.ts
│   ├── db
│   │   └── index.ts
│   │   └── schema.prisma
│   ├── features
│   │   ├── auth
│   │   │   └── sign-in
│   │   │   └── sign-up
│   ├── hooks
│   │   └── action-hooks.ts
│   ├── lib
│   │   ├── auth
│   │   │   └── session.ts
│   ├── providers
│   │   └── react-query.tsx
│   ├── styles
│   │   └── globals.css
│   ├── types
│   │   └── auth.ts
│   ├── utils
│   │   └── index.ts
│   └── middleware.ts
├── .eslint.json
├── .gitignore
├── .prettierrc
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

This project structure is inspired by [Bulletproof React](https://github.com/ahmedmayara/bulletproof-react).

## Environment Variables

- `DATABASE_URL` - The URL of the Prisma database.
- `AUTH_SECRET` - The secret key used for authentication.

## Contributing

- Contributions, issues, and feature requests are welcome! Please check the [issues page](https://github.com/ahmedmayara/next-boilerplate/issues) to see what features and fixes are needed, and feel free to submit pull requests.

## License

The MIT License (MIT). Copyright (c) 2024 [Ahmed Mayara](https://github.com/ahmedmayara).
