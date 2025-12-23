import type {
  FindManyResult,
  FindOneResult,
  MenuRepository,
  MenuService,
  MenuState,
  MenuStateManager,
  Pagination,
  PriceRange,
} from "@/server/services/lib/types";
import { InternalServerError, NotFoundError } from "@/shared/errors";
import type { MenuItem } from "@/shared/types";
import menuStateManager from "./state-manager";
import menuRepository from "./repository";

class Service implements MenuService {
  constructor(
    private readonly repository: MenuRepository,
    private state: MenuStateManager,
  ) {}

  findMany() {
    this.state = this.state.reset();
    return this;
  }

  findById(id: MenuItem["id"]) {
    this.state = this.state.setId(id);
    return this;
  }

  findByCategoryId(categoryId: MenuItem["categoryId"]) {
    this.state = this.state.setCategoryId(categoryId);
    return this;
  }

  findByPriceRange(range: PriceRange) {
    this.state = this.state.setPriceRange(range);
    return this;
  }

  search(query: string) {
    this.state = this.state.setSearchQuery(query);
    return this;
  }

  page(pagination: Pagination) {
    this.state = this.state.setPagination(pagination);
    return this;
  }

  setPriceRange(range: PriceRange) {
    this.state = this.state.setPriceRange(range);
    return this;
  }

  setPagination(pagination: Pagination) {
    this.state = this.state.setPagination(pagination);
    return this;
  }

  reset() {
    this.state = this.state.reset();
    return this;
  }

  private async repositoryFindOne(
    state: MenuState,
  ): Promise<FindOneResult | null> {
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
    }
    return null;
  }

  private async repositoryFindMany(state: MenuState): Promise<FindManyResult> {
    try {
      const result = await this.repository.findMany(state);
      if (!result) {
        throw new NotFoundError(`Menu items not found`);
      }
      return result;
    } catch (err) {
      if (err instanceof InternalServerError || err instanceof NotFoundError) {
        throw err;
      }
    }

    throw new InternalServerError("Failed to fetch menu items");
  }

  /**
   * Executes the query and returns results
   * @returns A single MenuItem if querying by ID, otherwise an array of MenuItems
   * @throws {NotFoundError} if a single item is not found
   * @throws {InternalServerError} if the database query fails
   */
  async execute(): Promise<FindOneResult | FindManyResult | null> {
    const state = this.state.value;
    return state.id
      ? await this.repositoryFindOne(state)
      : await this.repositoryFindMany(state);
  }
}

export default function menuService(
  repository: MenuRepository = menuRepository(),
  state: MenuStateManager = menuStateManager(),
): MenuService {
  return new Service(repository, state);
}
