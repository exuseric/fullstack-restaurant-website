import { LargeScreenPresenter } from "@/components/features/menu-filters/LargeScreenPresenter";
import { SmallScreenPresenter } from "@/components/features/menu-filters/SmallScreenPresenter";
import { Filters } from "@/components/features/menu-filters/filters/Filters";

export function FiltersContainer() {
  return (
    <>
      <LargeScreenPresenter>
        <Filters />
      </LargeScreenPresenter>
      <SmallScreenPresenter>
        <Filters />
      </SmallScreenPresenter>
    </>
  );
}