import { db } from "@/server/db";
import type { NavigationRepository } from "@/services-lib/types";
import { navigationItems } from "@/server/db/schema";

class Repository implements NavigationRepository {
    async getAll() {
        const items = await db.select().from(navigationItems);
        return items
    }
}

export default function navigationRepository() {
    return new Repository();
}