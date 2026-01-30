"use client";
import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "../lib/Disclosure";
import type { ReactNode } from "react";
import { Separator } from "@/components/shared/Separator";

type ProductFilterProps = {
  heading: string;
  children: ReactNode;
};

function ProductFilter({ heading, children }: ProductFilterProps) {
  return (
    <>
      <Disclosure defaultExpanded>
        <DisclosureHeader>{heading}</DisclosureHeader>
        <DisclosurePanel className="overscroll-y-contain">
          {children}
        </DisclosurePanel>
      </Disclosure>
      <Separator />
    </>
  );
}

export default ProductFilter;