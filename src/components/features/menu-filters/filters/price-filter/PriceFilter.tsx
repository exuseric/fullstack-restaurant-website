import { getMinMaxPrice } from "../../lib/fetchPrices";
import { PriceFilterClient } from "./PriceFilterClient";

export async function PriceFilter() {
  const minMax = await getMinMaxPrice();
  return <PriceFilterClient range={minMax} />;
}