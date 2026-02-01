import type {
  PriceRange,
  PriceRepository,
  PriceService,
} from "@/services/lib/types";
import { InternalServerError, NotFoundError } from "@/shared/errors";
import { priceRepository } from "./price.repository";

class Service implements PriceService {
  constructor(private readonly repo: PriceRepository) {}

  async findMinMax(): Promise<PriceRange> {
    try {
      const res = await this.repo.getMinMax();

      if (!res || res.length === 0) {
        throw new NotFoundError(
          "Failed to fetch the minimum and maximum prices",
        );
      }

      const priceRange = res[0] ?? { min: null, max: null };

      // Check if aggregates returned null (empty table)
      if (priceRange.min === null || priceRange.max === null) {
        throw new NotFoundError("No menu items found");
      }

      return priceRange;
    } catch (err) {
      if (err instanceof NotFoundError || err instanceof InternalServerError) {
        throw err;
      }
      console.error("[PriceService.findMinMax] Error:", err);
      throw new InternalServerError(
        "Failed to fetch the minimum and maximum prices",
      );
    }
  }
}

export const priceService = (repo: PriceRepository = priceRepository()) =>
  new Service(repo);
