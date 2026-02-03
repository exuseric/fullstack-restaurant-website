"use client";
import { throttle, useQueryStates } from "nuqs";
import { searchParamsParsers } from "@/lib/url-params";
import { Slider } from "@/components/features/menu-filters/components/shared/Slider";
import { MENU_CONFIG } from "@/components/features/menu/lib/menu.config";
import type { PriceRange } from "@/services/lib/types";

type PriceFIlterClientProps = {
  range: PriceRange;
};

export function PriceFilterClient({ range }: PriceFIlterClientProps) {
  const [prices, setPrices] = useQueryStates(
    {
      minPrice: searchParamsParsers.minPrice,
      maxPrice: searchParamsParsers.maxPrice,
    },
    {
      limitUrlUpdates: throttle(MENU_CONFIG.debounceMs),
      shallow: false,
    },
  );

  const priceValue: number[] = [
    prices.minPrice ?? range.min,
    prices.maxPrice ?? range.max,
  ];

  const handlePriceChange = async ([min, max]: number[]) => {
    await setPrices({ minPrice: min, maxPrice: max });
  };

  return (
    <Slider
      value={priceValue}
      maxValue={range.max ?? 2000}
      minValue={range.min ?? 0}
      step={50}
      thumbLabels={["start", "end"]}
      onChange={handlePriceChange}
      label="Price Range"
    />
  );
}