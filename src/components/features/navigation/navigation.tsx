import { getNavigationLinks } from "@/use-cases/navigation";
import NavigationContainer from "./navigation-container";

export default async function Navigation() {
  const navigationLinks = await getNavigationLinks();

  return <NavigationContainer initialLinks={navigationLinks} />;
}
