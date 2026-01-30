"use client";
import { Checkbox } from "@/components/shared/Checkbox";
import { CheckboxGroup } from "@/components/shared/CheckBoxGroup";
import type { MenuCategory } from "@/shared/types";
import { useQueryState } from "nuqs";
import { searchParamsParsers } from "@/lib/url-params";

type CategoryFilterProps = {
  categories: MenuCategory[];
};

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useQueryState(
    "category",
    {
      ...searchParamsParsers.category,
      shallow: false,
    },
  );

  const handleGroupChange = async (values: string[]) => {
    await setSelectedCategories(values.map(Number));
  };

  return (
    <CheckboxGroup
      className="flex flex-col gap-2"
      value={selectedCategories.map(String)}
      onChange={handleGroupChange}
    >
      {categories.map((category) => (
        <Checkbox
          key={category.id}
          value={String(category.id)}
          className="hover:text-primary flex cursor-pointer items-center gap-2 transition-colors"
        >
          {category.title}
        </Checkbox>
      ))}
      {categories.length === 0 && (
        <p className="text-tertiary text-sm">No categories found</p>
      )}
    </CheckboxGroup>
  );
}