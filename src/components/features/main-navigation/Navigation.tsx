import { getNavigationLinks } from "./lib/get-navigation-links";
import NavigationContainer from "./NavigationContainer";

export default async function MainNavigation() {
  const links = await getNavigationLinks();
  return <NavigationContainer links={links} />;
}
