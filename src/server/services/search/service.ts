import { searchConfig } from "@/components/features/search/lib/search.config";
import type { SearchService } from "@/services-lib/types";
import { searchRepository } from "./repository";
import { InternalServerError } from "@/shared/errors";

export class Service implements SearchService {
  async search(query: string) {
    if (!query || query.length < searchConfig.minQueryLength) {
      return { menuItems: [], categories: [] };
    }

    try {
      const results = await searchRepository.search(query);
      return results;
    } catch (err) {
      if (err instanceof InternalServerError) throw err;

      console.error("[SearchService.search] Error:", err);
      throw new InternalServerError("Failed to search for menu items");
    }
  }
}

export const searchService = new Service();
