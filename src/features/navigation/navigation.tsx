import { getNavigationLinks } from "@/use-cases/navigation/getNavigationLinks";
import DesktopNavigation from "./desktop-navigation/desktop-navigation";

export default async function Navigation() {
  const links = await getNavigationLinks();

  return <DesktopNavigation links={links} />;
}
