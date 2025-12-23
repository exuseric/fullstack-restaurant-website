## Fullstack Restaurant Website

A fullstack restaurant website built with Next.js and Drizzle ORM. It exposes a typed service layer for menu items and categories, backed by a Postgres database.

- **Tech stack**
  - **Framework**: Next.js (App Router)
  - **Database / ORM**: Drizzle ORM
  - **Styling**: Tailwind CSS

### Project structure

- **`src/app`**: Next.js application routes and layout
- **`src/server/db`**: Database schema and Drizzle client
- **`src/server/services`**: Domain services (menu, categories, shared types)
- **`drizzle`**: Database migrations and metadata

### Documentation

- **Project overview & setup**: See `docs/README.md`
- **Data fetching architecture** (how services and repositories work): See `docs/data-fetching.md`
- **Menu service details**: See `src/server/services/menu/README.md`
- **Category service details**: See `src/server/services/category/README.md`

### Getting started

1. **Install dependencies**

   ```bash
   bun install
   ```

2. **Start the database**

   ```bash
   ./start-database.sh
   ```

3. **Run the development server**

   ```bash
   bun dev
   ```

Then open `http://localhost:3000` in your browser.
