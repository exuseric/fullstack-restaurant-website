"use client";
import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@/components/features/menu-filters/components/shared/Disclosure";
import type { ReactNode } from "react";
import { Separator } from "@/components/shared/Separator";

type ProductFilterProps = {
  heading: string;
  children: ReactNode;
};

export function ProductFilter({ heading, children }: ProductFilterProps) {
  return (
    <>
      <Disclosure defaultExpanded>
        <DisclosureHeader>{heading}</DisclosureHeader>
        <DisclosurePanel className="hide-scrollbar overscroll-y-contain">
          {children}
        </DisclosurePanel>
      </Disclosure>
      <Separator />
    </>
  );
}