import type { menuCategories, menuItems, variants } from "@/server/db/schema";
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
export type MenuCategoryInsert = InferInsertModel<typeof menuCategories>;
export type MenuItemInsert = InferInsertModel<typeof menuItems>;
export type MenuVariantInsert = InferInsertModel<typeof variants>;
