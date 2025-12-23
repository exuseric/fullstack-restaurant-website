## Menu Service

The menu service coordinates all reads for menu items, including filtering, searching, and pagination.

### Responsibilities

- Build up a query state for menu items via a fluent API.
- Delegate actual database reads to the menu repository.
- Normalize domain errors (`NotFoundError`, `InternalServerError`).

### Key files

- `service.ts`: Public menu service API (what callers use).
- `repository.ts`: Database access using Drizzle.
- `state-manager.ts`: Holds the current query state.
- `builder.ts`: Translates state into a Drizzle query configuration.
- `utils/map-to-result.ts`: Maps raw DB rows into the exposed `MenuItem` shape.

### Usage

```ts
import menuService from "@/server/services/menu/service";

// Example: fetch paginated menu items for a category
const service = menuService();
const result = await service
  .findByCategoryId(categoryId)
  .page({ page: 0, perPage: 20 })
  .execute();
```

For a deeper look at cross-cutting data-fetching patterns, see `docs/data-fetching.md`.


