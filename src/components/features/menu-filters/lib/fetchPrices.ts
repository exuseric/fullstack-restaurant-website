"use server";
import { priceService } from "@/services/price/price.service";

export async function getMinMaxPrice() {
  return await priceService().findMinMax();
}