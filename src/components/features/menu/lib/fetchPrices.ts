"use server";
import { priceService } from "@/server/services/price/price.service";

export async function getMinMaxPrice() {
  return await priceService().findMinMax();
}
