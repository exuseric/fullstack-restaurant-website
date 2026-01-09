import navigationService from "@/server/services/navigation/navigation.service";

export async function getNavigationLinks() {
  const service = navigationService();
  const links = await service.getNavigationItems();

  return links;
}
