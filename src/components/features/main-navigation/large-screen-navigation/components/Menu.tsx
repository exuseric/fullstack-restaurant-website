import { useNavigation } from "@/contexts/navigation-context";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import DropdownMenu from "./DropdownMenu";
import { Button } from "@/components/shared/button";

export default function Menu() {
  const { links, setPopoverOpen, popoverOpen } = useNavigation();

  return (
    <nav className="flex-row-between w-fit items-center gap-x-4">
      {links.map((link) => (
        <Fragment key={link.id}>
          {!link.children ? (
            <Link
              href={{ pathname: link.url }}
              className="inline-flex-center h-full min-h-8 w-fit no-underline"
            >
              {link.title}
            </Link>
          ) : (
            <div className="flex-row-start items-center">
              <Link
                href={{ pathname: link.url }}
                className="inline-flex-center w-fit gap-x-1 no-underline"
              >
                {link.title}
              </Link>
              <Button
                variant="quiet"
                onPress={() => setPopoverOpen({ id: link.id, state: popoverOpen.id === link.id ? !popoverOpen.state : true })}
                aria-label="Open dropdown menu"
              >
                <ChevronDown
                  className={`size-4 ${popoverOpen.id === link.id && popoverOpen.state ? "rotate-180" : "rotate-0"} ease`}
                />
              </Button>
              <DropdownMenu links={link.children} id={link.id} />
            </div>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
