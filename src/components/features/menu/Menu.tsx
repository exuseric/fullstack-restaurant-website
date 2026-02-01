import { LargeScreenContainer } from "@/components/features/menu/LargeScreenContainer";
import type { URLFilters } from "@/components/features/menu/lib/types";
import { Suspense } from "react";
import { MenuResultsContainer } from "./components/MenuResults/MenuResultsContainer";

type MenuContainerProps = {
  filters: URLFilters;
};
export function Menu({ filters }: MenuContainerProps) {
  return (
    <LargeScreenContainer>
      <Suspense
        fallback={
          <div className="text-tertiary animate-pulse py-20 text-center">
            Updating menu results...
          </div>
        }
      >
        <MenuResultsContainer filters={filters} />
      </Suspense>
    </LargeScreenContainer>
  );
}
