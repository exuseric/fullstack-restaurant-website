import type { categoryGroups, menuCategories, menuItems, navigationItems, variants } from "@/server/db/schema";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export type MenuCategory = Omit<
  InferSelectModel<typeof menuCategories>,
  "searchVector"
>;
export type MenuItem = Omit<InferSelectModel<typeof menuItems>, "searchVector">;
export type MenuVariant = Omit<
  InferSelectModel<typeof variants>,
  "searchVector"
>;
export type NavigationItems = InferSelectModel<typeof navigationItems>
export type CategoryGroups = InferSelectModel<typeof categoryGroups>