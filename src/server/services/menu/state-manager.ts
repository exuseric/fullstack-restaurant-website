import type {
  MenuState,
  MenuStateManager,
  PriceRange,
} from "@/server/services/lib/types";
import { DEFAULT_MENU_STATE } from "@/server/services/lib/constants";
import type { MenuItem } from "@/shared/types";

class StateManager implements MenuStateManager {
  constructor(private state: MenuState = DEFAULT_MENU_STATE) {}

  private with(patch: Partial<MenuState>): StateManager {
    return new StateManager({ ...this.state, ...patch });
  }

  reset(): StateManager {
    return new StateManager({...DEFAULT_MENU_STATE});
  }

  setId(id: MenuItem["id"]): StateManager {
    return this.with({ id });
  }

  setCategoryId(categoryId: MenuItem["categoryId"]): StateManager {
    return this.with({ categoryId });
  }

  setSearchQuery(query: string): StateManager {
    return this.with({ searchQuery: query, orderBy: "rank" });
  }

  setOrderBy(orderBy: MenuState["orderBy"]): StateManager {
    return this.with({ orderBy });
  }

  setPagination(pagination: MenuState["pagination"]): StateManager {
    return this.with({ pagination });
  }

  setPriceRange(range: PriceRange): StateManager {
    if (range.min !== null && range.max !== null && range.min > range.max) {
      throw new Error("Minimum price cannot be greater than maximum price");
    }

    return this.with({ priceRange: range });
  }

  get value(): MenuState {
    return this.state;
  }
}

export default function menuStateManager(
  state: MenuState = DEFAULT_MENU_STATE,
): MenuStateManager {
  return new StateManager(state);
}
