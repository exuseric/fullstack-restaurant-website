import type {
  categoryGroups,
  menuCategories,
  menuItems,
  navigationItems,
  variants,
} from "@/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";

export type MenuCategory = Omit<
  InferSelectModel<typeof menuCategories>,
  "searchVector" | "groupId" | "showcase"
> & {
  groupId?: number;
  showcase?: boolean;
};

export type MenuItem = Omit<InferSelectModel<typeof menuItems>, "searchVector">;
export type MenuVariant = Omit<
  InferSelectModel<typeof variants>,
  "searchVector"
>;
export type NavigationItem = InferSelectModel<typeof navigationItems> & {
  children?: NavigationItem[];
};
export type CategoryGroups = InferSelectModel<typeof categoryGroups>;

export type NavigationMenuItem = {
  id: NavigationItem["id"];
  title: NavigationItem["title"];
  slug: NavigationItem["slug"];
  url: NavigationItem["url"];
  children?: NavigationSubMenuItem[];
};

export type NavigationSubMenuItem = {
  id: NavigationItem["id"];
  title: NavigationItem["title"];
  slug: NavigationItem["slug"];
  url: NavigationItem["url"];
  groupId: NavigationItem["groupId"];
  parentId: NavigationItem["parentId"];
  children?: NavigationSubMenuItem[];
};

export type Navigation = {
  id: NavigationItem["id"];
  title: NavigationItem["title"];
  slug: NavigationItem["slug"];
  url: NavigationItem["url"];
  children?: NavigationSubMenuItem[];
};

export type MenuItemSearchResult = MenuItem & {
  type: "menu_item";
};
export type MenuCategorySearchResult = MenuCategory & {
  type: "category";
};

export type GroupedSearchResults = {
  menuItems: MenuItemSearchResult[];
  categories: MenuCategorySearchResult[];
};
