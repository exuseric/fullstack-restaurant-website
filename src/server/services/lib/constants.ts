import type { MenuState } from "./types";

export const DEFAULT_MENU_STATE: MenuState = {
  id: null,
  categoryId: null,
  priceRange: {
    min: null,
    max: null,
  },
  searchQuery: null,
  pagination: {
    page: 1,
    perPage: 20,
  },
  orderBy: "id_asc",
} as const;
