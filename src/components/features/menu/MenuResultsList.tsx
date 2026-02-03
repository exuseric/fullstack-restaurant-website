"use client";

import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { AmountWithCurrency } from "@/lib/format-price";
import {
  GridLayout,
  ListBox,
  ListBoxItem,
  Size,
  Virtualizer,
} from "react-aria-components";
import type { URLFilters } from "@/components/features/menu/lib/types";
import { useMenuInfiniteQuery } from "./hooks/useMenuInfiniteQuery";
import type { FindManyResult } from "@/services/lib/types";
import { useMobile } from "@/hooks/use-mobile";

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
  const isMobile = useMobile();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allItems = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data?.pages],
  );

  const itemSize = isMobile ? new Size(300, 150) : new Size(350, 150);
  return (
    <Virtualizer
      layout={GridLayout}
      layoutOptions={{
        minItemSize: itemSize,
        minSpace: new Size(8, 8),
        maxColumns: Infinity,
        preserveAspectRatio: false,
      }}
    >
      <ListBox aria-label="Menu Items">
        {allItems.map((item) => (
          <ListBoxItem
            key={item.item.id}
            id={item.item.id}
            textValue={item.item.title}
            className="border-outline-variant bg-surface-container-low hover:bg-surface-container-high h-full w-full border p-4 pt-5 transition-colors"
          >
            <h3 className="text-on-surface mt-0 font-bold">
              {item.item.title}
            </h3>
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