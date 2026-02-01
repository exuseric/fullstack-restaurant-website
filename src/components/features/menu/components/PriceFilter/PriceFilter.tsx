import { getMinMaxPrice } from "../../lib/fetchPrices";
import { PriceFilterClient } from "./PriceFilterCLient";

export async function PriceFilter() {
  const minMax = await getMinMaxPrice();
  return <PriceFilterClient range={minMax} />;
}
