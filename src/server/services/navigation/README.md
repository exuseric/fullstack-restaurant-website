# Navigation Service

The Navigation Service is responsible for fetching and structuring the main navigation menu for the application.

## Overview

The service fetches flat navigation data from the database and constructs a hierarchical tree structure suitable for the UI (e.g., mega-menus, mobile drawers). It handles up to three levels of nesting:

1. **Top-level items** (e.g., "Menu", "Locations")
2. **Sub-menu items** (e.g., "Food", "Drinks" under "Menu")
3. **Category items** (e.g., "Burgers", "Pizza" under "Food")

## Installation

```typescript
import navigationService from "@/server/services/navigation/navigation.service";
```

## API Reference

### `getNavigationItems()`

Fetches all navigation items and builds the menu hierarchy.

```typescript
getNavigationItems(): Promise<Navigation[]>
```

**Returns:** A promise that resolves to an array of top-level `Navigation` items, each containing their children.

**Example:**
```typescript
const navItems = await navigationService().getNavigationItems();

// Usage in a component
<Navigation items={navItems} />
```

## Data Structure

The service transforms a flat list of database records into this structure:

```typescript
interface NavigationMenuItem {
  id: number;
  title: string;
  slug: string;
  url?: string;
  children?: NavigationSubMenuItem[];
}

interface NavigationSubMenuItem {
  id: number;
  title: string;
  slug: string;
  url?: string;
  groupId?: number;
  parentId?: number;
  children?: NavigationSubMenuItem[];
}
```

## Hierarchy Logic

1. **Top-level**: Items with no `parentId`.
2. **Second-level**: Items with a `parentId` pointing to a top-level item.
3. **Third-level**: Category items where `groupId` matches the parent's `catGroupId`. These are attached to second-level items.

## Error Handling

If the database query fails, the service logs the error and throws an `InternalServerError`. If no items are found, it returns a default menu state.
