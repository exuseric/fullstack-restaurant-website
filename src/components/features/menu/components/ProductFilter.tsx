"use client";
import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "./shared/Disclosure";
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
        <DisclosurePanel className="overscroll-y-contain hide-scrollbar">
          {children}
        </DisclosurePanel>
      </Disclosure>
      <Separator />
    </>
  );
}