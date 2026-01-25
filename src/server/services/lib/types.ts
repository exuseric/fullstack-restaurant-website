import type {
  GroupedSearchResults,
  MenuCategory,
  MenuItem,
  MenuVariant,
  Navigation,
  NavigationItem,
} from "@/shared/types";
import type { SQL } from "drizzle-orm";
import type { SelectedFields } from "drizzle-orm/pg-core";

export interface CategoryRepository {
  findOne(id: MenuCategory["id"]): Promise<MenuCategory | null>;
  findMany(): Promise<MenuCategory[]>;
  findByGroupId(args: FindByGroupIdParams): Promise<MenuCategory[]>;
}

export interface CategoryService {
  allCategories(): Promise<MenuCategory[]>;
  findById(id: MenuCategory["id"]): Promise<MenuCategory>;
  findByGroupId(args: FindByGroupIdParams): Promise<MenuCategory[]>;
  findMany(categoryIds: MenuCategory["id"][]): Promise<MenuCategory[]>;
}

export interface MenuService {
  findById(id: MenuItem["id"]): MenuService;
  findMany(): MenuService;
  findByCategoryIds(categoryIds: MenuCategory["id"][]): MenuService;
  searchTerm(args: { query: string; orderBy?: OrderBy }): MenuService;
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
  getAll(): Promise<NavigationResults[]>;
}

export interface NavigationService {
  getNavigationItems(): Promise<Navigation[]>;
}

export interface SearchRepository {
  search(query: string): Promise<GroupedSearchResults>;
}

export interface SearchService {
  search(query: string): Promise<GroupedSearchResults>;
}

export type FindByGroupIdParams = {
  groupId: MenuCategory["groupId"];
  limit?: number;
};

export type MenuState = {
  id: MenuItem["id"] | null;
  categoryIds: number[] | null;
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
  slug: MenuItem["slug"];
  price: MenuItem["price"];
  category_id: MenuCategory["id"];
  category_title: MenuCategory["title"];
  category_description: MenuCategory["description"];
  category_group: MenuCategory["groupId"];
  category_slug: MenuCategory["slug"];
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

export type NavigationResults = {
  id: NavigationItem["id"];
  title: NavigationItem["title"];
  slug: NavigationItem["slug"];
  url: NavigationItem["url"];
  parentId: NavigationItem["parentId"] | null;
  categoryId: NavigationItem["categoryId"] | null;
  groupId: NavigationItem["groupId"];
  catId: MenuCategory["id"] | null;
  catTitle: MenuCategory["title"] | null;
  catSlug: MenuCategory["slug"] | null;
  catGroupId: NavigationItem["groupId"];
};