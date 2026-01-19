"use server";

import navigationService from "@/server/services/navigation/navigation.service";

export const getNavigationLinks = async () => {
  return await navigationService().getNavigationItems();
};
