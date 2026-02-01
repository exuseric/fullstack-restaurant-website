"use server";

import { globalSearch } from "../lib/global-search";

export async function searchAction(query: string) {
  return await globalSearch(query);
}
