import type {
  CategoryRepository,
  CategoryService,
  FindByGroupIdParams,
} from "@/server/services/lib/types";
import { validateId } from "@/server/services/lib/validate-inputs";
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "@/shared/errors";
import type { MenuCategory } from "@/shared/types";
import createCategoryRepository from "@/services/category/category.repository";

class Service implements CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  async allCategories() {
    try {
      const data = await this.repository.findMany();
      return data;
    } catch (err) {
      console.error("[CategoryService.allCategories] Error:", err);
      throw new InternalServerError(`Failed to retrieve categories.`);
    }
  }

  async findById(id: MenuCategory["id"]) {
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

  async findByGroupId(args: FindByGroupIdParams) {
    try {
      const categories = await this.repository.findByGroupId({
        groupId: args.groupId,
        limit: args.limit,
      });
      return categories;
    } catch (err) {
      console.error("[CategoryService.findByGroupId] Error:", err);
      throw new InternalServerError(
        `Failed to retrieve categories by group id: ${args.groupId}`,
      );
    }
  }

  async findMany(categoryIds: MenuCategory["id"][]) {
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

export default function categoryService({
  categoryRepository = createCategoryRepository(),
}: {
  categoryRepository?: CategoryRepository;
} = {}) {
  return new Service(categoryRepository);
}
