import type { Navigation } from "@/shared/types";
import Link from "next/link";
import { DisclosureGroup, ListBox, ListBoxItem } from "react-aria-components";
import { Disclosure, DisclosureHeader, DisclosurePanel } from "./lib/Disclosure";
import { useNavigation } from "@/contexts/navigation-context";

function DropdownMenu({ links }: { links: Navigation[] }) {
    const { setMobileMenuOpen } = useNavigation()
    return (
        <DisclosureGroup>
            {links.map((link, idx) => (
                <Disclosure key={link.id}>
                    <DisclosureHeader>
                        <Link
                            href={{ pathname: "/menu", query: { group: link.id } }}
                            className="inline-flex-row-start items-center px-4 gap-x-1 no-underline text-xl min-h-12 w-full"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.title}
                        </Link>
                    </DisclosureHeader>
                    <DisclosurePanel className="max-h-60 overflow-y-scroll overscroll-y-contain bg-surface-container-low">
                        {link.children?.map(child => (
                            <Link
                                href={{ pathname: "/menu", query: { category: child.id } }}
                                className="inline-flex-row-start items-center px-4 gap-x-1 no-underline text-xl min-h-12 w-full"
                                onClick={() => setMobileMenuOpen(false)}
                                key={child.id}
                            >
                                {child.title}
                            </Link>
                        ))}
                    </DisclosurePanel>
                </Disclosure>
            ))}
        </DisclosureGroup>
    )
}
export default DropdownMenu;