"use server";

import { cache } from "react";
import navigationService from "@/server/services/navigation/navigation.service";

export const getNavigationLinks = cache(async () => {
  return await navigationService().getNavigationItems();
});