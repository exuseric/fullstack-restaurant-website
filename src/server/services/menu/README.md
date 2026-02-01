# Menu Service Documentation

## Overview

The Menu Service provides a fluent, chainable query builder interface for querying menu items. It follows an immutable builder pattern where each method returns a new service instance with updated query state.

## Installation

```typescript
import menuService from "@/server/services/menu/menu.service";
```

## Basic Usage

### Finding a Single Item

```typescript
// Find by ID
const item = await menuService()
  .findById(123)
  .execute();
```

### Finding Multiple Items

```typescript
// Find all items
const results = await menuService()
  .findMany()
  .execute();

// With filters
const results = await menuService()
  .findByCategoryIds(['desserts'])
  .findByPriceRange({ min: 5, max: 15 })
  .page({ limit: 10, offset: 0 })
  .execute();
```

### Full-Text Search

```typescript
// Search with default ranking
const results = await menuService()
  .searchTerm({ query: 'chocolate cake' })
  .execute();

// Search with custom ordering
const results = await menuService()
  .searchTerm({ query: 'pasta', orderBy: 'price' })
  .execute();
```

## API Reference

### Core Methods

#### `findMany()`
Initializes a query for multiple items. Clears any single-item lookup (ID).

```typescript
findMany(): MenuService
```

**Returns:** New service instance configured for multi-item queries

**Example:**
```typescript
const service = menuService()
  .findById(1)  // Single item lookup
  .findMany()          // Switches to multi-item mode
  .findByCategoryIds(['drinks']);
```

---

#### `findById(id: number)`
Queries for a single menu item by ID. Automatically clears category and search filters to prevent conflicts.

```typescript
findById(id: MenuItem["id"]): MenuService
```

**Parameters:**
- `id` - The unique identifier of the menu item

**Returns:** New service instance configured for single-item lookup

**Throws:** 
- `ValidationError` - If ID is invalid (empty, null, or undefined)

**Example:**
```typescript
const item = await menuService()
  .findById(123)
  .execute();
```

**Note:** Calling `findById()` will clear `categoryId` and `searchQuery` from state to prevent ambiguous queries.

---

#### `findByCategoryIds(categoryIds: string[])`
Filters items by one or more categories.

```typescript
findByCategoryIds(categoryIds: MenuItem["categoryId"][]): MenuService
```

**Parameters:**
- `categoryIds` - Array of category identifiers

**Returns:** New service instance with category filter applied

**Throws:**
- `ValidationError` - If called after `findById()` (use `reset()` first)
- `ValidationError` - If any categoryId is invalid

**Example:**
```typescript
const desserts = await menuService()
  .findByCategoryIds(['desserts'])
  .execute();
```

---

#### `searchTerm(args)`
Performs full-text search on menu items.

```typescript
searchTerm(args: { query: string, orderBy?: OrderBy }): MenuService
```

**Parameters:**
- `args.query` - Search query string
- `args.orderBy` - Sort order (default: `"rank"`)
  - `"rank"` - Relevance-based ranking
  - `"price"` - Price ascending
  - `"name"` - Alphabetical

**Returns:** New service instance with search applied

**Throws:**
- `ValidationError` - If called after `findById()` (use `reset()` first)

**Example:**
```typescript
// Default ranking
const results = await menuService()
  .searchTerm({ query: 'spicy chicken' })
  .execute();

// Custom ordering
const results = await menuService()
  .searchTerm({ query: 'pasta', orderBy: 'price' })
  .execute();
```

---

#### `findByPriceRange(range)`
Filters items by price range.

```typescript
findByPriceRange(range: PriceRange): MenuService
```

**Parameters:**
- `range.min` - Minimum price (inclusive, nullable)
- `range.max` - Maximum price (inclusive, nullable)

**Returns:** New service instance with price filter applied

**Throws:**
- `ValidationError` - If min > max

**Example:**
```typescript
// Between $10 and $20
const items = await menuService()
  .findByPriceRange({ min: 10, max: 20 })
  .execute();

// Under $15
const items = await menuService()
  .findByPriceRange({ min: null, max: 15 })
  .execute();

// Over $25
const items = await menuService()
  .findByPriceRange({ min: 25, max: null })
  .execute();
```

---

#### `page(pagination)`
Applies pagination to the query.

```typescript
page(pagination: Pagination): MenuService
```

**Parameters:**
- `pagination.limit` - Number of items per page
- `pagination.offset` - Number of items to skip

**Returns:** New service instance with pagination applied

**Example:**
```typescript
// Page 1: items 0-9
const page1 = await menuService()
  .findMany()
  .page({ limit: 10, offset: 0 })
  .execute();

// Page 2: items 10-19
const page2 = await menuService()
  .findMany()
  .page({ limit: 10, offset: 10 })
  .execute();
```

---

#### `reset()`
Clears all query state and returns to default configuration.

```typescript
reset(): MenuService
```

**Returns:** New service instance with default state

**Example:**
```typescript
const service = menuService()
  .findByCategoryIds(['drinks'])
  .findByPriceRange({ min: 5, max: 10 })
  .reset()  // Clear everything
  .findByCategoryIds(['desserts']);
```

---

#### `minMaxPrice()`
Gets the minimum and maximum price of menu items.

```typescript
minMaxPrice(): MenuService
```

**Returns:** New service instance configured to fetch min/max prices.

**Example:**
```typescript
// Resets state and prepares for min/max price query
const minMax = await menuService()
  .minMaxPrice()
  .execute();
```


---

#### `execute()`
Executes the built query and returns results.

```typescript
execute(): Promise<FindOneResult | FindManyResult>
```

**Returns:**
- `FindOneResult` - If querying by ID (single item)
- `FindManyResult` - If querying multiple items

**Throws:**
- `NotFoundError` - If single item not found
- `InternalServerError` - If database query fails

**FindOneResult:**
```typescript
{
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  // ... other MenuItem fields
}
```

**FindManyResult:**
```typescript
{
  items: MenuItem[];
  totalCount: number;
  totalPages: number;
  page: number;
  perPage: number;
}
```

**Example:**
```typescript
// Single item
const item = await menuService()
  .findById(123)
  .execute();

console.log(item.name);  // "Chocolate Cake"

// Multiple items
const results = await menuService()
  .findByCategoryIds(['appetizers'])
  .execute();

console.log(results.items.length);      // 15
console.log(results.totalCount);        // 45
console.log(results.totalPages);        // 5
```

## State Management

### Immutability

All methods return **new instances** with updated state. The original instance remains unchanged:

```typescript
const base = menuService();
const withCategory = base.findByCategoryIds(['drinks']);
const withPrice = withCategory.findByPriceRange({ min: 5, max: 10 });

// Each variable holds an independent query builder
await withCategory.execute();  // Only category filter
await withPrice.execute();     // Both category and price filters
```

### State Merging Rules

1. **`findById()` is exclusive**: Clears `categoryId` and `searchQuery`
2. **Other filters accumulate**: Multiple filters are combined with AND logic
3. **Later calls override**: Calling the same method twice uses the latest value

```typescript
// Accumulation (AND logic)
menuService()
  .findByCategoryIds(['drinks'])
  .findByPriceRange({ min: 5, max: 10 })
  // Queries: WHERE categoryId IN ('drinks') AND price BETWEEN 5 AND 10

// Override
menuService()
  .findByCategoryIds(['drinks'])
  .findByCategoryIds(['desserts'])  // Overrides previous category
  // Queries: WHERE categoryId IN ('desserts')

// Exclusive behavior
menuService()
  .findByCategoryIds(['drinks'])
  .searchTerm({ query: 'cola' })
  .findById(123)  // Clears category and search
  // Queries: WHERE id = 123 only
```

### Validation

The service validates state to prevent ambiguous queries:

```typescript
// ❌ This will throw ValidationError
menuService()
  .findById(123)
  .findByCategoryIds(['drinks'])  // Error: Cannot combine with findById

// ✅ Use reset() to clear state
menuService()
  .findById(123)
  .reset()
  .findByCategoryIds(['drinks'])  // OK
```

## Advanced Examples

### Complex Filtering

```typescript
const results = await menuService()
  .findByCategoryIds(['mains'])
  .findByPriceRange({ min: 15, max: 30 })
  .searchTerm({ query: 'vegetarian', orderBy: 'price' })
  .page({ limit: 20, offset: 0 })
  .execute();
```

### Reusable Configurations

```typescript
// Create base query
const affordableItems = menuService()
  .findByPriceRange({ min: null, max: 15 });

// Extend for different categories
const affordableDrinks = await affordableItems
  .findByCategoryIds(['drinks'])
  .execute();

const affordableDesserts = await affordableItems
  .findByCategoryIds(['desserts'])
  .execute();
```

### Conditional Building

```typescript
function buildQuery(options: {
  categoryId?: string;
  maxPrice?: number;
  searchQuery?: string;
}) {
  let query = menuService().findMany();

  if (options.categoryId) {
    query = query.findByCategoryIds([options.categoryId]);
  }

  if (options.maxPrice) {
    query = query.findByPriceRange({ min: null, max: options.maxPrice });
  }

  if (options.searchQuery) {
    query = query.searchTerm({ query: options.searchQuery });
  }

  return query.execute();
}

// Usage
const results = await buildQuery({
  categoryId: 'appetizers',
  maxPrice: 12,
  searchQuery: 'spicy'
});
```

### Pagination Helper

```typescript
async function getAllPages(baseQuery: MenuService) {
  const allItems: MenuItem[] = [];
  let page = 0;
  const perPage = 50;

  while (true) {
    const result = await baseQuery
      .page({ limit: perPage, offset: page * perPage })
      .execute() as FindManyResult;

    allItems.push(...result.items);

    if (allItems.length >= result.totalCount) break;
    page++;
  }

  return allItems;
}

// Usage
const allDesserts = await getAllPages(
  menuService().findByCategoryIds(['desserts'])
);
```

## Error Handling

### Common Errors

```typescript
import { NotFoundError, ValidationError, InternalServerError } from "@/shared/errors";

try {
  const item = await menuService()
    .findById(999)
    .execute();
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log('Item not found');
  } else if (error instanceof ValidationError) {
    console.log('Invalid query parameters');
  } else if (error instanceof InternalServerError) {
    console.log('Database error');
  }
}
```

### Validation Errors

```typescript
// Invalid ID
menuService().findById(0);  // Throws ValidationError

// Invalid price range
menuService().findByPriceRange({ min: 20, max: 10 });  // Throws ValidationError

// Conflicting queries
menuService()
  .findById(1)
  .findByCategoryIds(['drinks']);  // Throws ValidationError
```

## Type Definitions

```typescript
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PriceRange {
  min: number | null;
  max: number | null;
}

interface Pagination {
  limit: number;
  offset: number;
}

type OrderBy = "rank" | "price" | "name";

interface FindManyResult {
  items: MenuItem[];
  totalCount: number;
  totalPages: number;
  page: number;
  perPage: number;
}

type FindOneResult = MenuItem;
```

## Best Practices

### ✅ Do

```typescript
// Chain related filters
const results = await menuService()
  .findByCategoryIds(['mains'])
  .findByPriceRange({ min: 10, max: 25 })
  .execute();

// Use meaningful variable names
const vegetarianMains = await menuService()
  .findByCategoryIds(['mains'])
  .searchTerm({ query: 'vegetarian' })
  .execute();

// Handle errors appropriately
try {
  const item = await menuService().findById(id).execute();
  return item;
} catch (error) {
  if (error instanceof NotFoundError) {
    return null;
  }
  throw error;
}
```

### ❌ Don't

```typescript
// Don't mix findById with other filters without reset
menuService()
  .findById(1)
  .findByCategoryIds(['drinks']);  // Throws ValidationError

// Don't ignore type checking
const result = await menuService().findMany().execute();
result.name;  // Error: FindManyResult has no 'name' property

// Don't create unnecessary intermediate variables
const s1 = menuService();
const s2 = s1.findMany();
const s3 = s2.findByCategoryIds(['drinks']);
const result = await s3.execute();
// Just chain instead ↑
```

## Testing

### Unit Test Example

```typescript
import { describe, it, expect, vi } from 'vitest';
import menuService from '@/server/services/menu/menu.service';

describe('MenuService', () => {
  it('should find item by id', async () => {
    const mockRepo = {
      findOne: vi.fn().mockResolvedValue({ id: 1, name: 'Test' }),
      findMany: vi.fn(),
    };

    const result = await menuService(mockRepo)
      .findById(1)
      .execute();

    expect(mockRepo.findOne).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1 })
    );
    expect(result).toEqual({ id: 1, name: 'Test' });
  });

  it('should throw ValidationError when combining findById with category', () => {
    expect(() => {
      menuService()
        .findById(1)
        .findByCategoryIds(['drinks']);
    }).toThrow(ValidationError);
  });
});
```

## Performance Considerations

- Each method call creates a new instance (lightweight object spread)
- Query execution happens only when `execute()` is called
- Repository layer handles database connection pooling
- Consider caching frequently accessed queries
- Use pagination for large result sets

## Related Documentation