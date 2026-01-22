import { getNavigationLinks } from "@/use-cases/navigation";
import NavigationContainer from "./NavigationContainer";

export default async function MainNavigation() {
  const links = await getNavigationLinks();
  return <NavigationContainer links={links} />;
}
