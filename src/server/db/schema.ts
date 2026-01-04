import {
  pgTable,
  index,
  foreignKey,
  serial,
  text,
  numeric,
  varchar,
  boolean,
  integer,
  customType,
  unique,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

const tsvector = customType({
  dataType() {
    return "tsvector";
  },
});

export const menuItems = pgTable(
  "menu_items",
  {
    id: serial().primaryKey().notNull(),
    title: text().notNull(),
    description: text(),
    // TODO: failed to parse database type 'tsvector'
    searchVector: tsvector("search_vector").generatedAlwaysAs(
      sql`((setweight(to_tsvector('english'::regconfig, COALESCE(title)), 'A'::"char") || ''::tsvector) || setweight(to_tsvector('english'::regconfig, COALESCE(description)), 'B'::"char"))`,
    ),
    categoryId: serial("category_id").notNull(),
    price: numeric({ precision: 10, scale: 2 }).$type<number>(),
  },
  (table) => [
    index("menu_items_search_vector_idx").using(
      "gin",
      table.searchVector.asc().nullsLast().op("tsvector_ops"),
    ),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [menuCategories.id],
      name: "menu_items_category_id_fkey",
    }),
  ],
);


export const menuCategories = pgTable("menu_categories", {
  id: serial().primaryKey().notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  // TODO: failed to parse database type 'tsvector'
  searchVector: tsvector("search_vector").generatedAlwaysAs(sql`(setweight(to_tsvector('english'::regconfig, (title)::text), 'A'::"char") || setweight(to_tsvector('english'::regconfig, description), 'B'::"char"))`),
  showcase: boolean().default(false),
  groupId: integer("group_id"),
  slug: text().notNull(),
}, (table) => [
  index("idx_menu_categories_group").using("btree", table.groupId.asc().nullsLast().op("int4_ops")),
  index("menu_categories_search_vector_idx").using("gin", table.searchVector.asc().nullsLast().op("tsvector_ops")),
  foreignKey({
    columns: [table.groupId],
    foreignColumns: [categoryGroups.id],
    name: "fk_category_group"
  }).onDelete("set null"),
  unique("menu_categories_slug_key").on(table.slug),
]);

export const variants = pgTable(
  "variants",
  {
    id: serial().primaryKey().notNull(),
    title: text().notNull(),
    description: text(),
    sizeMl: integer("size_ml"),
    price: numeric({ precision: 10, scale: 2 }),
    isDefault: boolean("is_default").default(false),
    // TODO: failed to parse database type 'tsvector'
    searchVector: tsvector("search_vector").generatedAlwaysAs(
      sql`(setweight(to_tsvector('english'::regconfig, COALESCE(title)), 'A'::"char") || setweight(to_tsvector('english'::regconfig, COALESCE(description)), 'B'::"char"))`,
    ),
    menuItemId: integer("menu_item_id").notNull(),
  },
  (table) => [
    index("menu_item_variants_search_vector_idx").using(
      "gin",
      table.searchVector.asc().nullsLast().op("tsvector_ops"),
    ),
    foreignKey({
      columns: [table.menuItemId],
      foreignColumns: [menuItems.id],
      name: "variants_menu_item_id_fkey",
    }),
  ],
);


export const navigationItems = pgTable("navigation_items", {
  id: serial().primaryKey().notNull(),
  title: text().notNull(),
  slug: text().notNull(),
  url: text(),
  parentId: integer("parent_id"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  categoryId: integer("category_id"),
  groupId: integer("group_id"),
}, (table) => [
  foreignKey({
    columns: [table.parentId],
    foreignColumns: [table.id],
    name: "navigation_items_parent_id_fkey"
  }).onDelete("cascade"),
  foreignKey({
    columns: [table.categoryId],
    foreignColumns: [menuCategories.id],
    name: "navigation_items_category_id_fkey"
  }).onDelete("cascade"),
  foreignKey({
    columns: [table.groupId],
    foreignColumns: [categoryGroups.id],
    name: "navigation_items_group_id_fkey"
  }).onDelete("cascade"),
  unique("navigation_items_slug_key").on(table.slug),
]);

export const categoryGroups = pgTable("category_groups", {
  id: serial().primaryKey().notNull(),
  title: text().notNull(),
  slug: text().notNull(),
  description: text(),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
}, (table) => [
  unique("category_groups_slug_key").on(table.slug),
]);
