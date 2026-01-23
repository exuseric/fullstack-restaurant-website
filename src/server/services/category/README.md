## Category Service

The category service is responsible for reading menu categories from the database.

### Responsibilities

- Provide a simple API for:
  - Fetching all categories.
  - Fetching a single category by ID.
- Wrap repository calls and normalize errors into `NotFoundError` / `InternalServerError`.

### Key files

- `category.service.ts`: Public category service API (what callers import).
- `category.repository.ts`: Database access using Drizzle.

### Usage

```ts
import categoryService from "@/server/services/category/category.service";

const service = categoryService();

// Fetch all categories
const categories = await service.allCategories();

// Fetch a single category
const category = await service.findById(id);
```

For how this fits into the overall data-fetching story, see `docs/data-fetching.md`.


