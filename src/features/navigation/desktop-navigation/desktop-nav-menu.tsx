import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/shared/navigation-menu";
import type { Navigation, NavigationItem } from "@/shared/types";
import Link from "next/link";
import { Fragment } from "react";
import Image from "next/image";
import { Button } from "@/components/shared/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/features/navigation/desktop-navigation/dropdown-menu";
import { ChevronDown } from "lucide-react";

// export default function DesktopNavMenu({ links }: { links: Navigation[] }) {
//   // const isMobile = useIsMobile()
//   console.log(links);
//   return (
//     <NavigationMenu className="p-0">
//       <NavigationMenuList className="flex flex-wrap gap-x-2 p-0">
//         {links.map((link) => (
//           <Fragment key={link.id}>
//             {!link.children ? (
//               <NavigationMenuItem key={link.id}>
//                 <NavigationMenuLink asChild>
//                   <Link
//                     href={{
//                       pathname: link.url,
//                     }}
//                     className="no-underline"
//                   >
//                     {link.title}
//                   </Link>
//                 </NavigationMenuLink>
//               </NavigationMenuItem>
//             ) : (
//               <NavigationMenuItem key={link.id}>
//                 <NavigationMenuTrigger className="bg-transparent p-2">
//                   <NavigationMenuLink asChild className="p-0">
//                     <Link
//                       href={{ pathname: link.url }}
//                       className="no-underline"
//                     >
//                       {link.title}
//                     </Link>
//                   </NavigationMenuLink>
//                 </NavigationMenuTrigger>
//                 <NavigationMenuContent className="p-2">
//                   <NavigationMenuList className="grid h-full w-200 grid-cols-3 items-start justify-start gap-1 bg-transparent p-2">
//                     {link.children.map((child) => (
//                       <NavigationMenuLink asChild key={child.id}>
//                         <Link
//                           href={{
//                             pathname: link.url,
//                             query: { group: child.slug },
//                           }}
//                           className="relative isolate grid min-h-40 grid-rows-[1fr,.25fr] no-underline"
//                         >
//                           <Image
//                             src={
//                               "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                             }
//                             alt={child.title}
//                             width={200}
//                             height={30}
//                             className="left-0 -z-1 row-start-1 max-h-40 w-full object-cover"
//                           />
//                           <span className="row-start-2 flex items-center justify-center">
//                             {child.title}
//                           </span>
//                         </Link>
//                       </NavigationMenuLink>
//                       // <div key={child.id}>
//                       //   <p className="text-md font-medium">{child.title}</p>
//                       //   {child.children && (
//                       //     <NavigationMenuList className="flex flex-col items-start justify-start gap-y-2 p-0">
//                       //       {child.children.slice(0, 2).map((grandchild) => (
//                       //         <NavigationMenuLink asChild key={grandchild.id}>
//                       //           <Link
//                       //             className="flex h-fit w-fit no-underline"
//                       //             href={{
//                       //               pathname: link.url,
//                       //               query: { category: grandchild.slug },
//                       //             }}
//                       //           >
//                       //             {grandchild.title}
//                       //           </Link>
//                       //         </NavigationMenuLink>
//                       //       ))}
//                       //     </NavigationMenuList>
//                       //   )}
//                       //   <Link
//                       //     className="text-primary mt-6 flex h-fit w-fit text-sm no-underline"
//                       //     href={{
//                       //       pathname: link.url,
//                       //       query: { group: child.slug },
//                       //     }}
//                       //   >
//                       //     All {child.title} &gt;
//                       //   </Link>
//                       // </div>
//                     ))}
//                   </NavigationMenuList>
//                 </NavigationMenuContent>
//               </NavigationMenuItem>
//             )}
//           </Fragment>
//         ))}
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// }

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
          <Link href={{ pathname: link.url }} className="no-underline">
            {link.title}
          </Link>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="aspect-square h-8 w-8"
            >
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
        </>
        <DropdownMenuContent
          side="bottom"
          sideOffset={10}
          className="glass-frosted grid max-h-150 w-max grid-cols-3 flex-col gap-x-2 gap-y-8 py-8 pr-0 pl-12 shadow"
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
