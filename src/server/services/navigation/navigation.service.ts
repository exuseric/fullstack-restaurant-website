import { DEFAULT_NAVIGATION_MENU_STATE } from "@/services-lib/constants";
import type {
  NavigationRepository,
  NavigationResults,
  NavigationService,
} from "@/services-lib/types";
import createNavigationRepository from "@/services/navigation/navigation.repository";
import { InternalServerError } from "@/shared/errors";
import type { Navigation, NavigationMenuItem, NavigationSubMenuItem } from "@/shared/types";

class Service implements NavigationService {
  constructor(private readonly repository: NavigationRepository) { }

  async getNavigationItems(): Promise<Navigation[]> {
    try {
      const results = await this.repository.getAll();
      if (!results?.length) {
        return DEFAULT_NAVIGATION_MENU_STATE;
      }

      const topLevelItems = new Map<number, NavigationMenuItem>();
      const secondLevelItems = new Map<number, NavigationSubMenuItem>();
      const thirdLevelItems = new Map<number, NavigationSubMenuItem>();

      // First pass: categorize all items
      for (const item of results) {
        if (!item.parentId) {
          topLevelItems.set(item.id, this.createMenuItem(item));
        } else {
          const secondLevel = this.createSubMenuItem(item);
          secondLevelItems.set(item.id, secondLevel);

          // Add category items when group IDs match
          if (item.catId && item.groupId === item.catGroupId) {
            thirdLevelItems.set(item.catId, this.createCategoryItem(item));
          }
        }
      }

      // Build hierarchy: attach third-level to second-level
      this.attachChildren(thirdLevelItems, secondLevelItems);

      // Build hierarchy: attach second-level to top-level
      this.attachChildren(secondLevelItems, topLevelItems);

      return Array.from(topLevelItems.values());
    } catch (err) {
      console.error("[NavigationService.getNavigationItems] Error:", err);
      throw new InternalServerError("Failed to fetch navigation items");
    }
  }

  private createMenuItem(item: NavigationResults): NavigationMenuItem {
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      url: item.url,
    };
  }

  private createSubMenuItem(item: NavigationResults): NavigationSubMenuItem {
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      url: `grp=${item.slug}`,
      groupId: item.groupId,
      parentId: item.parentId,
    };
  }

  private createCategoryItem(item: NavigationResults): NavigationSubMenuItem {
    return {
      id: item.catId!,
      title: item.catTitle!,
      slug: item.catSlug!,
      url: `cat=${item.catSlug}`,
      groupId: item.catGroupId,
      parentId: item.id,
    };
  }

  private attachChildren(
    childItems: Map<number, NavigationSubMenuItem>,
    parentItems: Map<number, NavigationMenuItem>,
  ): void {
    for (const child of childItems.values()) {
      if (child.parentId != null) {
        const parent = parentItems.get(child.parentId);
        if (parent) {
          parent.children ??= [];
          parent.children?.push(child);
        }
      }
    }
  }
}

export default function navigationService({
  navigationRepository = createNavigationRepository(),
}: {
  navigationRepository?: NavigationRepository;
} = {}) {
  return new Service(navigationRepository);
}
