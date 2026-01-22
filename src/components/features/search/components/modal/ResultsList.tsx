"use client";

import { useSearch } from "@/contexts/search-context";
import { formatPrice } from "@/lib/format-price";
import type {
  MenuCategorySearchResult,
  MenuItemSearchResult,
} from "@/shared/types";
import Link from "next/link";
import { Activity } from "react";
import {
  Header,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Text,
} from "react-aria-components";

export function SearchResultsList() {
  const { results } = useSearch();
  const hasMenuItemsResults = results.menuItems.length > 0;
  const hasMenuCategoriesResults = results.categories.length > 0;

  return (
    <ListBox
      aria-label="Search results"
      className="-mx-4 flex flex-col gap-y-2 overflow-auto px-4 pt-4 outline-none"
      selectionMode="single"
    >
      <Activity mode={hasMenuItemsResults ? "visible" : "hidden"}>
        <SearchResultsSection results={results.menuItems} heading="Menu" />
      </Activity>
      <Activity mode={hasMenuCategoriesResults ? "visible" : "hidden"}>
        <SearchResultsSection
          results={results.categories}
          heading="Categories"
        />
      </Activity>
    </ListBox>
  );
}

function SearchResultsSection<
  T extends MenuItemSearchResult | MenuCategorySearchResult,
>({ results, heading }: { results: T[]; heading: string }) {
  const { setIsOpen } = useSearch();
  return (
    <ListBoxSection>
      <Header className="glass border-scrim text-on-surface sticky top-0 z-10 border px-2 py-1 text-xs font-semibold uppercase">
        {heading}
      </Header>

      {results.map((item) => (
        <ListBoxItem
          key={item.id}
          textValue={item.title}
          className="group outline-none"
        >
          <Link
            href={
              item?.type === "category"
                ? {
                    pathname: "/menu",
                    query: { category: item.slug },
                  }
                : {
                    pathname: "/menu",
                    hash: item.slug,
                  }
            }
            className="hover:bg-primary hover:text-on-primary flex cursor-pointer flex-col rounded-md px-2 py-2 no-underline transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Text
              slot="label"
              className="mb-2 flex w-full flex-row items-center justify-between text-sm font-medium"
            >
              <span>{item.title}</span>
              <span>
                {item?.type === "menu_item" &&
                  item.price &&
                  formatPrice(item.price)}
              </span>
            </Text>

            {item.description && (
              <Text slot="description" className="line-clamp-2 text-xs">
                {item.description}
              </Text>
            )}
          </Link>
        </ListBoxItem>
      ))}
    </ListBoxSection>
  );
}
