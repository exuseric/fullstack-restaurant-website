import type { NavigationItems } from "@/shared/types";

export default function buildNavigationTree(items: NavigationItems[]): NavigationItems[] {
    const tree: NavigationItems[] = [];
    const itemMap= new Map<number, NavigationItems>();

    items.forEach((item) => {
        itemMap.set(item.id, { ...item, children: [] });
    });

    items.forEach((item) => {
        const node = itemMap.get(item.id)!;

        if (item.parentId === null) {
            tree.push(node);
        } else {
            const parent = itemMap.get(item.parentId);
            if (parent) {
                parent.children?.push(node);
            }
        }
    });

    return tree
}
