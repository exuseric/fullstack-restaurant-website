import { cache } from "react";
import { searchService } from "@/server/services/search/service";

export const globalSearch = cache(async (query: string) => {
  return await searchService.search(query);
});
