## Data Fetching & Service Layer

This project centralizes all data fetching and domain logic in a **service layer** under `src/server/services`. UI components should talk to services, not directly to the database.

### Key concepts

- **Service**: Orchestrates queries, builds up state, and handles domain-level errors.
- **Repository**: Knows how to talk to the database using Drizzle, but is unaware of HTTP or UI concerns.
- **State manager / builder**: For menus, a small state object and builder turn chained filters into a single query.

### Menu data flow

Files:

- `src/server/services/menu/service.ts`
- `src/server/services/menu/repository.ts`
- `src/server/services/menu/state-manager.ts`
- `src/server/services/menu/builder.ts`

1. **Build up query state** (filters, pagination, etc.) via the service:
   - `findMany()`, `findById(id)`, `findByCategoryId(categoryId)`, `findByPriceRange(range)`, `search(query)`, `page(pagination)`
2. **Execute the query** using `execute()`, which delegates to the repository.
3. **Repository** (`repository.ts`) translates the state into Drizzle queries and returns typed results.

See `src/server/services/menu/README.md` for details and usage examples.

### Category data flow

Files:

- `src/server/services/category/service.ts`
- `src/server/services/category/repository.ts`

1. The category service exposes methods like `allCategories()` and `findById(id)`.
2. It calls the underlying repository for database operations.
3. Errors are normalized into domain-level errors (`InternalServerError`, `NotFoundError`).

See `src/server/services/category/README.md` for more detail.

### Using services from the app

From server components, route handlers, or API routes:

```ts
import menuService from "@/server/services/menu/service";

export async function getMenu() {
  const service = menuService();
  const result = await service.findMany().page({ page: 0, perPage: 20 }).execute();
  return result;
}
```

Keep all direct database access isolated to repositories and reuse services for consistent behavior and error handling.


