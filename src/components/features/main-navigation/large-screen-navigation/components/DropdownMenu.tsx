import type { Navigation } from "@/shared/types";
import { Popover } from "./lib/Popover";
import Link from "next/link";
import {
  Header,
  ListBoxSection,
  ListBox,
  Collection,
  ListBoxItem,
} from "react-aria-components";
import { useNavigation } from "@/contexts/navigation-context";

interface DropdownMenuProps {
  links: Navigation[];
}

export default function DropdownMenu({ links }: DropdownMenuProps) {
  const { dropdownOpen, dropdownRef, setDropdownOpen } = useNavigation();
  return (
    <Popover
      triggerRef={dropdownRef}
      isOpen={dropdownOpen}
      onOpenChange={() => setDropdownOpen(false)}
      offset={4}
    >
      <ListBox
        items={links}
        className="container grid w-full grid-cols-3 items-start gap-4 p-8"
      >
        {(item) => (
          <ListBoxSection className="h-full w-full">
            <Header className="mb-2">
              <Link
                href={{ pathname: "/menu", query: { group: item.slug } }}
                onClick={() => setDropdownOpen(false)}
              >
                {item.title}
              </Link>
            </Header>

            <Collection items={item.children?.slice(0, 3)}>
              {(item) => (
                <ListBoxItem>
                  <Link
                    href={{
                      pathname: "/menu",
                      query: { category: item.slug },
                    }}
                    className="no-underline"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {item.title}
                  </Link>
                </ListBoxItem>
              )}
            </Collection>
          </ListBoxSection>
        )}
      </ListBox>
      {/*{links.map((link) => (
        <Link key={link.id} href={{ pathname: link.url }}>
          {link.title}
        </Link>
      ))}*/}
    </Popover>
  );
}
