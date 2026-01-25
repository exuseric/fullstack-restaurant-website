"use client";
import { useQueryStates } from "nuqs";
import { searchParamsParsers } from "@/lib/url-params";
import { Slider } from "../lib/Slider";

export function PriceFilter() {
  const [prices, setPrices] = useQueryStates(
    {
      minPrice: searchParamsParsers.minPrice,
      maxPrice: searchParamsParsers.maxPrice,
    },
    {
      throttleMs: 500,
      shallow: false,
    },
  );

  const handlePriceChange = async ([min, max]: number[]) => {
    await setPrices({ minPrice: min, maxPrice: max });
  };

  return (
    <Slider
      defaultValue={[0, prices.maxPrice ?? 2000]}
      maxValue={2000}
      minValue={0}
      step={100}
      // formatOptions={{ style: "currency", currency: "KES", minimumFractionDigits: 0, maximumFractionDigits: 2 }}
      thumbLabels={["start", "end"]}
      onChange={handlePriceChange}
    />
  );
}