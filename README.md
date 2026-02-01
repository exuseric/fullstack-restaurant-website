## Fullstack Restaurant Website

A fullstack restaurant website built with Next.js and Drizzle ORM. It exposes a typed service layer for menu items and categories, backed by a Postgres database.

- **Tech stack**
  - **Framework**: Next.js (App Router)
  - **Database / ORM**: Drizzle ORM
  - **Styling**: Tailwind CSS

### Project Structure

- **`src/app`**: Next.js application routes and layout
- **`src/server/db`**: Database schema and Drizzle client
- **`src/server/services`**: Domain services (menu, categories, shared types)
- **`drizzle`**: Database migrations and metadata

### Documentation

- **Project overview & setup**: See `docs/README.md`
- **Data fetching architecture** (how services and repositories work): See `docs/data-fetching.md`
- **Menu service details**: See `src/server/services/menu/README.md`
- **Category service details**: See `src/server/services/category/README.md`
- **Navigation service details**: See `src/server/services/navigation/README.md`
- **Search service details**: See `src/server/services/search/README.md`

### Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Run database migrations**

   ```bash
   pnpm drizzle-kit migrate
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   ```

Then open `http://localhost:3000` in your browser.
