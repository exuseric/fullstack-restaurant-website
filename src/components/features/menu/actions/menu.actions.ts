"use server";

import { getMenuList } from "@/components/features/menu/lib/fetchMenuItems";
import type { MenuListOptions } from "@/components/features/menu/lib/fetchMenuItems";

export async function getMenuListAction(options: MenuListOptions) {
  return await getMenuList(options);
}