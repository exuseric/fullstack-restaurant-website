import { relations } from "drizzle-orm/relations";
import { menuCategories, menuItems, variants } from "@/server/db/schema";

export const menuItemsRelations = relations(menuItems, ({ one, many }) => ({
  menuCategory: one(menuCategories, {
    fields: [menuItems.categoryId],
    references: [menuCategories.id],
  }),
  variants: many(variants),
}));

export const menuCategoriesRelations = relations(
  menuCategories,
  ({ many }) => ({
    menuItems: many(menuItems),
  }),
);

export const variantsRelations = relations(variants, ({ one }) => ({
  menuItem: one(menuItems, {
    fields: [variants.menuItemId],
    references: [menuItems.id],
  }),
}));
