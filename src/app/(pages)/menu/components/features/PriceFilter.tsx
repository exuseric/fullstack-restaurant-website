"use client";
import { throttle, useQueryStates } from "nuqs";
import { searchParamsParsers } from "@/lib/url-params";
import { Slider } from "../lib/Slider";
import { searchConfig } from "../../../../../components/features/search/lib/search.config";

export function PriceFilter() {
  const [prices, setPrices] = useQueryStates(
    {
      minPrice: searchParamsParsers.minPrice,
      maxPrice: searchParamsParsers.maxPrice,
    },
    {
      limitUrlUpdates: throttle(searchConfig.debounceMs),
      shallow: false,
    },
  );

  const priceValue: number[] = [prices.minPrice ?? 0, prices.maxPrice ?? 2000];

  const handlePriceChange = async ([min, max]: number[]) => {
    await setPrices({ minPrice: min, maxPrice: max });
  };

  return (
    <Slider
      value={priceValue}
      maxValue={2000}
      minValue={0}
      step={100}
      // formatOptions={{ style: "currency", currency: "KES", minimumFractionDigits: 0, maximumFractionDigits: 2 }}
      thumbLabels={["start", "end"]}
      onChange={handlePriceChange}
    />
  );
}