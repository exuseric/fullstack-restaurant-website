"use client"
import { Checkbox } from "@/components/shared/Checkbox";
import { CheckboxGroup } from "@/components/shared/CheckBoxGroup";
import type { MenuCategory } from "@/shared/types";
import { useQueryState } from 'nuqs';
import { Disclosure, DisclosureHeader, DisclosurePanel } from "../lib/Disclosure";
import { searchParamsParsers } from "@/lib/url-params";


type CategoryFilterProps = {
    categories: MenuCategory[];
    heading: string;
}

function CategoryFilter({ categories, heading }: CategoryFilterProps) {
    const [selectedCategories, setSelectedCategories] = useQueryState("category", {
        ...searchParamsParsers.category,
        shallow: false
    })

    const handleGroupChange = async (values: string[]) => {
        await setSelectedCategories(values.map(Number))
    }

    return (
        <Disclosure defaultExpanded>
            <DisclosureHeader>{heading}</DisclosureHeader>
            <DisclosurePanel className="overscroll-y-contain">
                <CheckboxGroup
                    className="flex flex-col gap-2"
                    value={selectedCategories.map(String)}
                    onChange={handleGroupChange}
                >
                    {categories.map((category) => (
                        <Checkbox
                            key={category.id}
                            value={String(category.id)}
                            className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                        >
                            {category.title}
                        </Checkbox>
                    ))}
                    {categories.length === 0 && <p className="text-sm text-tertiary">No categories found</p>}
                </CheckboxGroup>
            </DisclosurePanel>
        </Disclosure >
    );
}

export default CategoryFilter;