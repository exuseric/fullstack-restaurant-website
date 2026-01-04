import type { NavigationRepository, NavigationService } from "@/services-lib/types";
import navigationRepository from "@/services/navigation/navigation.repository";
import { InternalServerError } from "@/shared/errors";
import type { NavigationItems } from "@/shared/types";
import { DEFAULT_NAVIGATION_MENU_STATE } from "@/services-lib/constants";
import buildNavigationTree from "@/services/navigation/utils/build-navigation-tree";

class Service implements NavigationService {
    constructor(private readonly repository: NavigationRepository) { }

    async getNavigationItems(): Promise<NavigationItems[]> {
        try {
            const items = await this.repository.getAll();
            if (!items) {
                return DEFAULT_NAVIGATION_MENU_STATE;
            };
            console.log(buildNavigationTree(items))
            return items;
        } catch (err) {
            console.error('[NavigationService.getNavigationItems] Error:', err);
            throw new InternalServerError("Failed to fetch navigation items");
        }
    }
}

export default function navigationService() {
    const repository = navigationRepository();
    return new Service(repository);
}