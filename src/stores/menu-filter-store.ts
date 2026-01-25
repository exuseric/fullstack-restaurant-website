import { create } from 'zustand'

type MenuFilterState = {
    selectedCategories: number[]
    setSelectedCategories: (categories: number[]) => void
    toggleCategory: (categoryId: number) => void
    clearCategories: () => void
}

export const useMenuFilterStore = create<MenuFilterState>((set) => ({
    selectedCategories: [],

    setSelectedCategories: (categories) =>
        set({ selectedCategories: categories }),

    toggleCategory: (categoryId) =>
        set((state) => ({
            selectedCategories: state.selectedCategories.includes(categoryId)
                ? state.selectedCategories.filter(id => id !== categoryId)
                : [...state.selectedCategories, categoryId]
        })),

    clearCategories: () =>
        set({ selectedCategories: [] })
}))