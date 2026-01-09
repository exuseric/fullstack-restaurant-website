import type {
  FindManyResult,
  FindOneResult,
  MenuRepository,
  MenuService,
  MenuState,
  OrderBy,
  Pagination,
  PriceRange,
} from "@/server/services/lib/types";
import { DEFAULT_MENU_STATE } from "@/server/services/lib/constants";
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "@/shared/errors";
import type { MenuItem } from "@/shared/types";
import createMenuRepository from "@/services/menu/menu.repository";
import {
  validateId,
  validatePriceRange,
} from "@/server/services/lib/validate-inputs";

class Service implements MenuService {
  constructor(
    private readonly repository: MenuRepository,
    private readonly state: MenuState = DEFAULT_MENU_STATE,
  ) {}

  findMany() {
    return new Service(this.repository, {
      ...this.state,
      id: null,
    });
  }

  findById(id: MenuItem["id"]) {
    validateId(id);
    return new Service(
      this.repository,
      this.updateState({
        id,
        categoryId: null,
        searchQuery: null,
      }),
    );
  }

  findByCategoryId(categoryId: MenuItem["categoryId"]) {
    if (this.state.id) {
      throw new ValidationError(
        "Cannot call findByCategoryId after findById - use reset() first",
      );
    }
    validateId(categoryId);
    return new Service(this.repository, this.updateState({ categoryId }));
  }

  searchTerm(args: { query: string; orderBy?: OrderBy }) {
    if (this.state.id) {
      throw new ValidationError(
        "Cannot perform search after findById - use reset() first",
      );
    }
    return new Service(
      this.repository,
      this.updateState({
        searchQuery: args.query,
        orderBy: args.orderBy ?? "rank",
      }),
    );
  }

  findByPriceRange(range: PriceRange) {
    validatePriceRange(range);
    return new Service(
      this.repository,
      this.updateState({ priceRange: range }),
    );
  }

  page(pagination: Pagination) {
    return new Service(this.repository, this.updateState({ pagination }));
  }

  reset() {
    return new Service(this.repository, { ...DEFAULT_MENU_STATE });
  }

  private updateState(updates: Partial<MenuState>): MenuState {
    return { ...this.state, ...updates };
  }

  private async repositoryFindOne(state: MenuState): Promise<FindOneResult> {
    try {
      const res = await this.repository.findOne(state);
      if (!res) {
        throw new NotFoundError(`Menu item with id ${state.id} not found`);
      }
      return res;
    } catch (err) {
      if (err instanceof InternalServerError || err instanceof NotFoundError) {
        throw err;
      }
      console.error("[MenuService.repositoryFindOne] Error:", err);
      throw new InternalServerError("Failed to fetch menu item");
    }
  }

  private async repositoryFindMany(state: MenuState): Promise<FindManyResult> {
    try {
      const result = await this.repository.findMany(state);
      if (!result) {
        return { items: [], totalCount: 0, totalPages: 0, page: 1, perPage: 0 };
      }
      return result;
    } catch (err) {
      if (err instanceof InternalServerError || err instanceof NotFoundError) {
        throw err;
      }
      console.error("[MenuService.repositoryFindMany] Error:", err);
      throw new InternalServerError("Failed to fetch menu items");
    }
  }

  /**
   * Executes the query and returns results
   * @returns A single MenuItem if querying by ID, otherwise an array of MenuItems
   * @throws {NotFoundError} if a single item is not found
   * @throws {InternalServerError} if the database query fails
   */
  async execute() {
    const state = this.state;
    return state.id
      ? await this.repositoryFindOne(state)
      : await this.repositoryFindMany(state);
  }
}

/**
 * Query builder for menu items. Methods are chainable and immutable.
 *
 * **State Merging:**
 * - Calling findById() clears category and search filters
 * - Other methods accumulate (AND logic)
 * - Use reset() to start fresh
 *
 * @example
 * // Find specific item
 * await menuService().findById('item-123').execute();
 *
 * @example
 * // Find multiple with filters
 * await menuService()
 *   .findByCategoryId('desserts')
 *   .findByPriceRange({ min: 5, max: 15 })
 *   .page({ limit: 10, offset: 0 })
 *   .execute();
 */
export default function menuService({
  repository = createMenuRepository(),
  state = DEFAULT_MENU_STATE,
}: {
  repository?: MenuRepository;
  state?: MenuState;
} = {}): MenuService {
  return new Service(repository, state);
}
