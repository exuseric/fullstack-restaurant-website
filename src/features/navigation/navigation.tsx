import { getNavigationLinks } from "@/use-cases/navigation/getNavigationLinks";
import NavigationContainer from "./navigation-container";

export default async function Navigation() {
  const links = await getNavigationLinks();

  return <NavigationContainer links={links} />;
}
