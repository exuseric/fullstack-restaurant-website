import type { NavigationItem } from "@/shared/types";
import type { MenuState } from "@/services-lib/types";

export const DEFAULT_MENU_STATE: MenuState = {
  id: null,
  categoryIds: null,
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

export const DEFAULT_NAVIGATION_MENU_STATE: NavigationItem[] = [
  {
    id: 1,
    title: "Home",
    slug: "home",
    url: "/",
    parentId: null,
    sortOrder: 0,
    isActive: true,
    categoryId: null,
    groupId: null,
  },
  {
    id: 2,
    title: "Menu",
    slug: "menu",
    url: "/menu",
    parentId: null,
    sortOrder: 1,
    isActive: true,
    categoryId: null,
    groupId: null,
  },
  {
    id: 3,
    title: "About",
    slug: "about",
    url: "/about",
    parentId: null,
    sortOrder: 2,
    isActive: true,
    categoryId: null,
    groupId: null,
  },
  {
    id: 4,
    title: "Contact",
    slug: "contact",
    url: "/contact",
    parentId: null,
    sortOrder: 3,
    isActive: true,
    categoryId: null,
    groupId: null,
  },
];
