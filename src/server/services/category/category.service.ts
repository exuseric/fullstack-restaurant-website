import type {
  CategoryRepository,
  CategoryService,
} from "@/server/services/lib/types";
import { validateId } from "@/server/services/lib/validate-inputs";
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "@/shared/errors";
import type { MenuCategory } from "@/shared/types";
import categoryRepository from "@/services/category/category.repository";

class Service implements CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  async allCategories(): Promise<MenuCategory[]> {
    try {
      const data = await this.repository.findMany();
      return data;
    } catch (err) {
      console.error("[CategoryService.allCategories] Error:", err);
      throw new InternalServerError(`Failed to retrieve categories.`);
    }
  }

  async findById(id: MenuCategory["id"]): Promise<MenuCategory> {
    validateId(id);
    try {
      const category = await this.repository.findOne(id);
      if (!category) {
        throw new NotFoundError(`Category with id: ${id} not found`);
      }

      return category;
    } catch (err) {
      if (err instanceof NotFoundError || err instanceof ValidationError) {
        throw err;
      }
      console.error("[CategoryService.findById] Error:", err);
      throw new InternalServerError(
        `Failed to retrieve category with id: ${id}`,
      );
    }
  }

  async findMany(categoryIds: MenuCategory["id"][]): Promise<MenuCategory[]> {
    if (!categoryIds.length) return [];
    categoryIds.forEach((id) => validateId(id));

    try {
      const data = await this.repository.findMany();
      return data;
    } catch (err) {
      console.error("[CategoryService.findMany] Error:", err);
      throw new InternalServerError(`Failed to retrieve categories.`);
    }
  }
}

export default function categoryService(
  repository: CategoryRepository = categoryRepository(),
): CategoryService {
  return new Service(repository);
}
