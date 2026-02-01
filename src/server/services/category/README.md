## Category Service

The category service is responsible for reading menu categories from the database.

### Responsibilities

- Provide a simple API for:
  - Fetching all categories.
  - Fetching a single category by ID.
- Wrap repository calls and normalize errors into `NotFoundError` / `InternalServerError`.

### Key Files

- `category.service.ts`: Public category service API (what callers import).
- `category.repository.ts`: Database access using Drizzle.

### Usage

```ts
import categoryService from "@/server/services/category/category.service";

const service = categoryService();

// Fetch all categories
const categories = await service.allCategories();

// Fetch a single category
const category = await service.findById(1);

// Fetch categories by group ID
const groupCategories = await service.findByGroupId({ groupId: 1, limit: 5 });

// Fetch multiple categories by IDs
const specificCategories = await service.findMany([1, 2]);
```

## API Reference

### `allCategories()`
Returns all categories.

### `findById(id: number)`
Returns a category by ID. Throws `NotFoundError` if not found.

### `findByGroupId(args: { groupId: number, limit?: number })`
Returns categories belonging to a specific group.

### `findMany(categoryIds: number[])`
Returns categories matching the provided IDs.


For how this fits into the overall data-fetching story, see `docs/data-fetching.md`.
