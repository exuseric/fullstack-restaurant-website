import NavigationContainer from "./navigation-container";
import NavigationProvider from "./navigation-context";

export default function Navigation() {
  return (
    <NavigationProvider>
      <NavigationContainer />
    </NavigationProvider>
  );
}
