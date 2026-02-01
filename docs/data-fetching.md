## Data Fetching & Service Layer

This project implements a clean architecture with **Use Cases** orchestrating the domain logic, which is encapsulated in the **Service Layer** under `src/server/services`. UI components should use use cases not services or repositories directly.

### Key Concepts

- **Use Case**: Application-specific business rules. Orchestrates data flow between UI and Services.
- **Service**: Domain logic. Orchestrates queries, builds up state, and handles domain-level errors.
- **Repository**: Knows how to talk to the database using Drizzle, but is unaware of HTTP or UI concerns.
- **State manager / builder**: For menus, an immutable state object and builder turn chained filters into a single query.

### Menu Data Flow

Files:

- `src/server/services/menu/menu.service.ts`
- `src/server/services/menu/menu.repository.ts`
- `src/server/services/menu/menu.builder.ts`

1. **Build up query state** (filters, pagination, etc.) via the service:
   - `findMany()`, `findById(id)`, `findByCategoryIds(categoryIds)`, `findByPriceRange(range)`, `search(query)`, `page(pagination)`
2. **Execute the query** using `execute()`, which delegates to the repository.
3. **Repository** (`menu.repository.ts`) translates the state into Drizzle queries and returns typed results.

See `src/server/services/menu/README.md` for details and usage examples.

### Category Data Flow

Files:

- `src/server/services/category/category.service.ts`
- `src/server/services/category/category.repository.ts`

1. The category service exposes methods like `allCategories()` and `findById(id)`.
2. It calls the underlying repository for database operations.
3. Errors are normalized into domain-level errors (`InternalServerError`, `NotFoundError`).

See `src/server/services/category/README.md` for more detail.

### Navigation Data Flow

Files:

- `src/server/services/navigation/navigation.service.ts`
- `src/server/services/navigation/navigation.repository.ts`

1. **Service** fetches flat navigation items from the repository.
2. It constructs a hierarchical tree (up to 3 levels deep) in memory.
3. Errors are normalized into `InternalServerError`.

See `src/server/services/navigation/README.md` for details.

### Search Data Flow

Files:

- `src/server/services/search/service.ts`
- `src/server/services/search/repository.ts`

1. **Service** validates the query (e.g., minimum length).
2. It delegates to the repository to perform full-text search on menu items and categories.
3. Returns a unified result object with `menuItems` and `categories`.

See `src/server/services/search/README.md` for details.

Keep all direct database access isolated to repositories, and business logic within Use Cases and Services.
