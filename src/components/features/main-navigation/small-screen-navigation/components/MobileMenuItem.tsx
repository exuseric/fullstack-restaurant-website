import { useNavigation } from "@/contexts/navigation-context";
import type { Navigation } from "@/shared/types";
import Link from "next/link";
import { useState } from "react";
import { Disclosure, DisclosureHeader, DisclosurePanel } from "./lib/Disclosure";
import DropdownMenu from "./DropdownMenu";

function MobileMenuItem({ link }: { link: Navigation; }) {
    const { setMobileMenuOpen } = useNavigation();
    const [isExpanded, setIsExpanded] = useState(true);

    if (!link.children) {
        return (
            <Link
                href={{ pathname: link.url }}
                className="inline-flex-row-start items-center px-4 h-full no-underline text-xl min-h-12 w-full"
                onClick={() => setMobileMenuOpen(false)}
            >
                {link.title}
            </Link>
        );
    }

    return (
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
    );
}

export default MobileMenuItem;