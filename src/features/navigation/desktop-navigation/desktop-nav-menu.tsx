import { Button } from "@/components/shared/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/features/navigation/desktop-navigation/dropdown-menu";
import type { Navigation } from "@/shared/types";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default function DesktopNavMenu({ links }: { links: Navigation[] }) {
  return (
    <nav className="flex items-center gap-x-4" aria-label="Main navigation">
      {links.map((link: Navigation) => (
        <Fragment key={link.id}>
          {!link.children ? (
            <Link href={{ pathname: link.url }} className="no-underline">
              {link.title}
            </Link>
          ) : (
            <NavigationDropdown link={link} />
          )}
        </Fragment>
      ))}
    </nav>
  );
}

function NavigationDropdown({ link }: { link: Navigation }) {
  return (
    <div className="flex items-center">
      <DropdownMenu>
        <>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0" asChild>
              <Link href={{ pathname: link.url }} className="no-underline">
                {link.title}
                <ChevronDown className="size-4" />
              </Link>
            </Button>
          </DropdownMenuTrigger>
        </>
        <DropdownMenuContent
          side="bottom"
          sideOffset={25}
          className="glass-frosted grid max-h-150 w-max grid-cols-3 flex-col gap-x-2 gap-y-8 rounded-none border-t-transparent py-8 pr-0 pl-12 shadow"
        >
          {link.children?.map((child) => (
            <div
              key={child.id}
              className="grid grid-cols-[auto_1fr] items-start gap-2"
            >
              <Link
                href={{
                  pathname: link.url,
                  query: { group: child.slug },
                }}
                className="relative isolate col-start-1 flex h-40 w-55 flex-col items-center justify-end gap-y-2 p-0 pb-2 no-underline"
              >
                <Image
                  src={
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={child.title}
                  fill={true}
                  className="left-0 -z-1 object-cover"
                />
                <span className="glass-frosted row-start-2 flex h-fit w-fit min-w-2/3 items-center justify-center overflow-hidden rounded-md p-2">
                  {child.title}
                </span>
              </Link>

              {child.children && (
                <div className="flex flex-col items-start justify-start gap-y-2 p-0">
                  {child.children.slice(0, 5).map((grandchild) => (
                    <Link
                      className="flex h-fit w-fit no-underline"
                      href={{
                        pathname: link.url,
                        query: { category: grandchild.slug },
                      }}
                      key={grandchild.id}
                    >
                      {grandchild.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function NestedDropdown({ link }: { link: Navigation }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-between">
          {link.title}
          <ChevronDown className="size-4 -rotate-90" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="glass-frosted flex max-h-92 w-full min-w-48 flex-col gap-y-2 p-2 shadow"
        side="right"
        sideOffset={4}
      >
        {link.children?.map((child) => (
          <Button
            key={child.id}
            asChild
            variant="ghost"
            className="justify-start"
          >
            <Link href={{ pathname: child.url }}>{child.title}</Link>
          </Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
