import type { MenuCategory } from "@/shared/types";

export type URLFilters = {
  category: MenuCategory["id"][];
  query: string;
  minPrice: number;
  maxPrice: number;
  page: number;
};