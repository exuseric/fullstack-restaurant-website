import { useNavigation } from "@/contexts/navigation-context";
import type { Navigation } from "@/shared/types";
import Link from "next/link";
import { useState } from "react";
import { DisclosureGroup, ListBox, ListBoxItem } from "react-aria-components";
import { Disclosure, DisclosureHeader, DisclosurePanel } from "./lib/Disclosure";

function MobileMenu() {
    const { links, setMobileMenuOpen } = useNavigation()
    const [isExpanded, setIsExpanded] = useState(true);
    return (
        <nav className="nav flex flex-col gap-y-1 overflow-y-scroll overscroll-y-contain">
            <ListBox items={links} aria-label="Navigation Links">
                {link => (
                    <ListBoxItem textValue={link.title} key={link.id} className="not-last:mb-2">
                        <>
                            {!link.children ? (

                                <Link
                                    href={{ pathname: link.url }}
                                    className="inline-flex-row-start items-center px-4 h-full no-underline text-xl min-h-12 w-full"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.title}
                                </Link>
                            ) : (
                                <Disclosure
                                    isExpanded={isExpanded}
                                    onExpandedChange={setIsExpanded}>
                                    <DisclosureHeader>
                                        <Link
                                            href={{ pathname: link.url }}
                                            className="inline-flex-row-start items-center px-4 gap-x-1 no-underline text-xl min-h-12 w-full"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.title}
                                        </Link>
                                    </DisclosureHeader>
                                    <DisclosurePanel>
                                        <DropdownMenu links={link.children} />
                                    </DisclosurePanel>
                                </Disclosure>
                            )}
                        </>
                    </ListBoxItem>
                )}
            </ListBox>
        </nav>
    );
}


function DropdownMenu({ links }: { links: Navigation[] }) {
    const { setMobileMenuOpen } = useNavigation()
    return (
        <DisclosureGroup>
            {links.map((link, idx) => (
                <Disclosure isExpanded={idx === 0 ? true : false} key={link.id}>
                    <DisclosureHeader>
                        <Link
                            href={{ pathname: "/menu", query: { group: link.slug } }}
                            className="inline-flex-row-start items-center px-4 gap-x-1 no-underline text-xl min-h-12 w-full"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.title}
                        </Link>
                    </DisclosureHeader>
                    <DisclosurePanel className="max-h-60 overflow-y-scroll overscroll-y-contain bg-surface-container-low">
                        {link.children!.map(child => (
                            <Link
                                href={{ pathname: "/menu", query: { category: child.slug } }}
                                className="inline-flex-row-start items-center px-4 gap-x-1 no-underline text-xl min-h-12 w-full"
                                onClick={() => setMobileMenuOpen(false)}
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
export default MobileMenu;