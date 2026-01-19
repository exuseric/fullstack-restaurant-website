import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@/components/features/navigation/mobile/components/Disclosure";
import { DisclosureGroup } from "@/components/features/navigation/mobile/components/DisclosureGroup";
import { Button } from "@/components/shared/Button";
import Sheet from "@/components/shared/Sheet";
import type { Navigation } from "@/shared/types";
import { BookOpenIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { Dialog } from "react-aria-components";
import { useNavigationMenu } from "../hooks/use-navigation-menu";

export default function MobileMenu() {
  const { setIsOpen, isOpen, result: links } = useNavigationMenu();
  return (
    <>
      <Button variant="quiet" onPress={() => setIsOpen(true)}>
        <span className="flex flex-col items-center justify-center gap-y-2">
          <BookOpenIcon className="size-5" />
          Menu
        </span>
      </Button>

      <Sheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <Dialog
          className="flex h-full flex-col p-4 outline-none"
          aria-label="Explore our menu"
        >
          {/*<Heading slot="title" className="mt-0">
            Explore our Menu
          </Heading>*/}

          <nav
            className="hide-scrollbar flex w-full flex-col items-start gap-x-4 overflow-y-auto overscroll-y-contain"
            aria-label="Main navigation"
          >
            {links.map((link: Navigation) => (
              <Fragment key={link.id}>
                {!link.children ? (
                  <Link
                    href={{ pathname: link.url }}
                    className="py-4 text-2xl no-underline"
                  >
                    {link.title}
                  </Link>
                ) : (
                  <Disclosure className="w-full py-4" isExpanded={true}>
                    <DisclosureHeader>
                      <span className="text-2xl no-underline">
                        {link.title}
                      </span>
                    </DisclosureHeader>
                    <DisclosurePanel className="hide-scrollbar max-h-96 overflow-y-auto overscroll-y-contain">
                      {link?.children.map((child) => (
                        <DisclosureGroup key={child.id}>
                          <Disclosure className="w-full py-2">
                            <DisclosureHeader>
                              <span className="text-xl no-underline">
                                {child.title}
                              </span>
                            </DisclosureHeader>
                            <DisclosurePanel className="hide-scrollbar flex max-h-60 flex-col gap-y-2 overflow-y-auto overscroll-y-contain">
                              {child?.children?.map((grandchild) => (
                                <Link
                                  className="flex h-fit w-fit flex-row items-center justify-start py-2 no-underline"
                                  href={{
                                    pathname: link.url,
                                    query: { category: grandchild.slug },
                                  }}
                                  key={grandchild.id}
                                >
                                  {grandchild.title}
                                </Link>
                              ))}
                            </DisclosurePanel>
                          </Disclosure>
                        </DisclosureGroup>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                )}
              </Fragment>
            ))}
          </nav>
        </Dialog>
      </Sheet>
    </>
  );
}
