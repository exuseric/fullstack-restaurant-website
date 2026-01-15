"use server";

import { globalSearch } from "@/use-cases/search";

export async function searchAction(query: string) {
  return await globalSearch(query);
}
