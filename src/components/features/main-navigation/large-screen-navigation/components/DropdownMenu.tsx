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
  id: number;
}

export default function DropdownMenu({ links, id }: DropdownMenuProps) {
  const { popoverOpen, dropdownRef, setPopoverOpen } = useNavigation();
  return (
    <Popover
      triggerRef={dropdownRef}
      isOpen={id === popoverOpen.id && popoverOpen.state}
      onOpenChange={() => setPopoverOpen({ id, state: false })}
      offset={4}
    >
      <ListBox
        items={links}
        aria-label="Menu Items"
        className="container w-full grid grid-cols-3 items-start gap-4 p-8"
      >
        {(item) => (
          <ListBoxSection className="h-full w-full">
            <Header className="mb-2">
              <Link
                href={{ pathname: "/menu", query: { group: item.slug } }}
                onClick={() => setPopoverOpen({ id, state: false })}
              >
                {item.title}
              </Link>
            </Header>

            <Collection items={item.children?.slice(0, 3)}>
              {(item) => (
                <ListBoxItem textValue={item.title}>
                  <Link
                    href={{
                      pathname: "/menu",
                      query: { category: item.slug },
                    }}
                    className="no-underline"
                    onClick={() => setPopoverOpen({ id, state: false })}
                  >
                    {item.title}
                  </Link>
                </ListBoxItem>
              )}
            </Collection>
          </ListBoxSection>
        )}
      </ListBox>
    </Popover>
  );
}
