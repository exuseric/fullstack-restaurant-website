## Data Fetching & Service Layer

This project implements a clean architecture with **Use Cases** orchestrating the domain logic, which is encapsulated in the **Service Layer** under `src/server/services`. UI components should use Use Cases (`src/use-cases`), not services or repositories directly.

### Key concepts

- **Use Case**: Application-specific business rules. Orchestrates data flow between UI and Services.
- **Service**: Domain logic. Orchestrates queries, builds up state, and handles domain-level errors.
- **Repository**: Knows how to talk to the database using Drizzle, but is unaware of HTTP or UI concerns.
- **State manager / builder**: For menus, an immutable state object and builder turn chained filters into a single query.

### Menu data flow

Files:

- `src/server/services/menu/menu.service.ts`
- `src/server/services/menu/menu.repository.ts`
- `src/server/services/menu/menu.builder.ts`

1. **Build up query state** (filters, pagination, etc.) via the service:
   - `findMany()`, `findById(id)`, `findByCategoryId(categoryId)`, `findByPriceRange(range)`, `search(query)`, `page(pagination)`
2. **Execute the query** using `execute()`, which delegates to the repository.
3. **Repository** (`menu.repository.ts`) translates the state into Drizzle queries and returns typed results.

See `src/server/services/menu/README.md` for details and usage examples.

### Category data flow

Files:

- `src/server/services/category/category.service.ts`
- `src/server/services/category/category.repository.ts`

1. The category service exposes methods like `allCategories()` and `findById(id)`.
2. It calls the underlying repository for database operations.
3. Errors are normalized into domain-level errors (`InternalServerError`, `NotFoundError`).

See `src/server/services/category/README.md` for more detail.

### Using Use Cases from the app

From server components, route handlers, or API routes, import from `@/use-cases`:

```ts
import { getMenuList } from "@/use-cases/menu";

export async function getMenu() {
  // Use cases handle the service orchestration
  const result = await getMenuList({
      pagination: { limit: 20, offset: 0 }
  });
  return result;
}
```

Keep all direct database access isolated to repositories, and business logic within Use Cases and Services.


