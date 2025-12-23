import type { MenuCategory } from "@/shared/types";
import type {
  CategoryRepository,
  CategoryService,
} from "@/server/services/lib/types";
import categoryRepository from "./repository";
import { InternalServerError, NotFoundError } from "@/shared/errors";

class Service implements CategoryService {
  private readonly repo: CategoryRepository;
  constructor(repo: CategoryRepository) {
    this.repo = repo;
  }

  async allCategories() {
    try {
      const data = await this.repo.findMany();
      return data;
    } catch (err) {
      console.error("[CategoryService.allCategories] Error:", err);
      throw new InternalServerError(
        `Failed to retrieve categories. [${err as Error}]`,
      );
    }
  }

  async findById(id: MenuCategory["id"]) {
    if (!id) throw new Error("Id is required");

    try {
      const category = await this.repo.findOne(id);
      if (!category)
        throw new NotFoundError(`Category with id: ${id} not found`);
      return category;
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw err;
      }
      console.error("[CategoryService.findById] Error:", err);
      throw new InternalServerError(
        `Failed to retrieve category with id: ${id} [${err as Error}]`,
      );
    }
  }
}

let instance: Service | null = null;

export default function categoryService(
  repository?: CategoryRepository,
): CategoryService {
  return (instance ??= new Service(repository ?? categoryRepository()));
}
