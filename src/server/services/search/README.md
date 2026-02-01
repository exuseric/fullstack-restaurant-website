# Search Service

The Search Service provides a dedicated interface for global search functionality across the application, primarily focused on finding menu items and categories.

## Overview

This service abstracts the full-text search logic, handling minimum query length validation and delegating to the search repository.

## Installation

```typescript
import { searchService } from "@/server/services/search/service";
```

## API Reference

### `search(query)`

Performs a search for menu items and categories matching the query string.

```typescript
search(query: string): Promise<SearchResults>
```

**Parameters:**
- `query`: The search string.

**Returns:**
A promise resolving to a `SearchResults` object containing matched menu items and categories.

```typescript
{
  menuItems: MenuItem[];
  categories: Category[];
}
```

**Behavior:**
- If `query` is empty or shorter than the configured minimum length (default: 2), it returns an empty result set immediately without hitting the database.
- It normalizes errors into `InternalServerError`.

**Example:**
```typescript
const { menuItems, categories } = await searchService.search("burger");
```

## Configuration

The service uses `searchConfig` (typically from `@/components/features/search/lib/search.config`) to determine behavior like `minQueryLength`.

## Error Handling

- **InternalServerError**: Thrown if the underlying repository operation fails.
