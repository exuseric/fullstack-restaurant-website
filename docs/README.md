## Project Overview

This is a fullstack restaurant website built with Next.js and Drizzle ORM. It exposes a small domain layer for:

- **Menu items** (with categories, variants, and pagination)
- **Categories** (for organizing menu items)

The goal of the project is to provide a clean, testable backend service layer behind a modern React/Next.js UI.

### High-level architecture

- **Next.js app** in `src/app` renders the UI.
- **Use Cases** in `src/use-cases` orchestrate application business logic.
- **Service layer** in `src/server/services` encapsulates all domain logic.
- **Database access** happens through repositories in `src/server/services/*/repository.ts` using Drizzle.
- **Migrations and schema** live under `drizzle` and `src/server/db`.

For how data flows from the database to the UI, see `docs/data-fetching.md`.

### Local development

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Start the database**

   ```bash
   ./start-database.sh
   ```

3. **Run database migrations**

   ```bash
   pnpm drizzle-kit migrate
   ```

4. **Run the dev server**

   ```bash
   pnpm dev
   ```

### Testing

Menu service tests live in `src/server/services/menu/test/service.test.ts`.

Run tests with:

```bash
pnpm test
```

---

- For details on how data is loaded and composed, see `docs/data-fetching.md`.
- For service-specific docs, see:
  - `src/server/services/menu/README.md`
  - `src/server/services/category/README.md`
