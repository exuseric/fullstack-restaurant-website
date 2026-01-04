import type { MenuCategory, MenuItem, MenuVariant, NavigationItems } from "@/shared/types";
import type { SQL } from "drizzle-orm";
import type { SelectedFields } from "drizzle-orm/pg-core";

export interface CategoryRepository {
  findOne(id: MenuCategory["id"]): Promise<MenuCategory | null>;
  findMany(): Promise<MenuCategory[]>;
}

export interface CategoryService {
  findById(id: MenuCategory["id"]): Promise<MenuCategory>;
  allCategories(): Promise<MenuCategory[]>;
  findMany(categoryIds: MenuCategory["id"][]): Promise<MenuCategory[]>;
}

export interface MenuService {
  findById(id: MenuItem["id"]): MenuService;
  findMany(): MenuService;
  findByCategoryId(categoryId: MenuItem["categoryId"]): MenuService;
  searchTerm(args: { query: string, orderBy?: OrderBy }): MenuService;
  page(pagination: Pagination): MenuService;
  findByPriceRange(range: PriceRange): MenuService;
  reset(): MenuService;
  execute(): Promise<FindOneResult | FindManyResult | null>;
}

export interface MenuRepository {
  findOne(state: MenuState): Promise<FindOneResult | null>;
  findMany(state: MenuState): Promise<FindManyResult>;
}

export interface MenuBuilder {
  build(): {
    where: SQL | undefined;
    select: SelectedFields;
    orderBy: SQL;
    pagination: {
      offset: number;
      perPage: number;
    };
  };
}

export interface NavigationRepository {
  getAll(): Promise<NavigationItems[]>;
}

export interface NavigationService {
  getNavigationItems(): Promise<NavigationItems[]>;
}

export type MenuState = {
  id: MenuItem["id"] | null;
  categoryId: MenuItem["categoryId"] | null;
  searchQuery: string | null;
  orderBy: OrderBy;
  pagination: Pagination;
  priceRange: PriceRange;
};

export type PriceRange = {
  min: number | null;
  max: number | null;
};

export type Pagination = {
  page: number;
  perPage: number;
};

export type OrderBy =
  | "rank"
  | "id_asc"
  | "id_desc"
  | "price_asc"
  | "price_desc"
  | "name_asc"
  | "name_desc";

export type MenuRow = {
  id: MenuItem["id"];
  title: MenuItem["title"];
  description: MenuItem["description"];
  price: MenuItem["price"];
  category_id: MenuCategory["id"];
  category_title: MenuCategory["title"];
  category_description: MenuCategory["description"];
  variants: MenuVariant[];
  rank?: number;
  matchSource?: string;
};

export type FindOneResult = {
  item: MenuItem;
  category: Omit<MenuCategory, "description" | "showcase">;
  variants: MenuVariant[];
};

export type FindManyResult = Pagination & {
  items: FindOneResult[];
  totalCount: number;
  totalPages: number;
};
export type MenuServiceFactory = (
  repository: MenuRepository,
  state?: MenuState,
) => MenuService;
