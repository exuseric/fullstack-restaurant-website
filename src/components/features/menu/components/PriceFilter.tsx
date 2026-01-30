"use client";
import { throttle, useQueryStates } from "nuqs";
import { searchParamsParsers } from "@/lib/url-params";
import { Slider } from "./shared/Slider";
import { MENU_CONFIG } from "../lib/menu.config";

export function PriceFilter() {
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
      thumbLabels={["start", "end"]}
      onChange={handlePriceChange}
    />
  );
}