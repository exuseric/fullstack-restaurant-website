"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AmountWithCurrency } from "@/lib/format-price";
import {
  ListBox,
  ListBoxItem,
  Virtualizer,
  ListLayout,
  GridLayout,
  Size,
  GridList,
  GridListItem,
} from "react-aria-components";
import type { URLFilters } from "@/components/features/menu/lib/types";
import { useMenuInfiniteQuery } from "../../hooks/useMenuInfiniteQuery";
import type { FindManyResult, FindOneResult } from "@/services/lib/types";
import { useQueryState } from "nuqs";
import { searchParamsParsers } from "@/lib/url-params";
import { useUrlParams } from "@/components/features/menu/hooks/useUrlParams";

type MenuResultsListProps = {
  filters: URLFilters;
  initialData?: {
    pages: FindManyResult[];
    pageParams: number[];
  };
};

export function MenuResultsList({
  filters,
  initialData,
}: MenuResultsListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMenuInfiniteQuery(filters, initialData);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allItems = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <Virtualizer
      layout={GridLayout}
      layoutOptions={{
        minItemSize: new Size(400, 150),
        minSpace: new Size(8, 8),
        maxColumns: Infinity,
        preserveAspectRatio: false,
      }}
    >
      <ListBox
        aria-label="Menu Items"
        className="grid grid-cols-1 gap-2 md:grid-cols-2"
      >
        {allItems.map((item) => (
          <ListBoxItem
            key={item.item.id}
            id={item.item.id}
            textValue={item.item.title}
            className="border-outline-variant w-full h-full bg-surface-container-low hover:bg-surface-container-high border pt-5 p-4 transition-colors"
          >
            <h3 className="text-on-surface font-bold mt-0">{item.item.title}</h3>
            <p className="text-on-surface-variant mt-1 line-clamp-2 text-sm">
              {item.item.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-primary font-mono font-medium">
                {AmountWithCurrency(item.item.price ?? 0)}
              </span>
              <span className="text-tertiary bg-surface-container rounded-full px-2 py-1 text-xs">
                {item.category.title}
              </span>
            </div>
          </ListBoxItem>
        ))}
      </ListBox>
      {hasNextPage && (
        <div ref={ref} className="col-span-full py-4 text-center">
          {isFetchingNextPage ? (
            <p className="text-tertiary animate-pulse">Loading more items...</p>
          ) : (
            <div className="h-10" />
          )}
        </div>
      )}
    </Virtualizer>
  );
}