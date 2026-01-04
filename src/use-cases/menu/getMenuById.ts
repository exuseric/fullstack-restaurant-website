import menuService from "@/server/services/menu/menu.service";
import type { FindOneResult } from "@/server/services/lib/types";

export async function getMenuById(id: number): Promise<FindOneResult | null> {
    const result = await menuService().findById(id).execute();
    return (result as FindOneResult | null) ?? null;
}
