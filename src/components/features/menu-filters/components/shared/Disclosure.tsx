import React, { useContext } from "react";
import {
  composeRenderProps,
  Disclosure as AriaDisclosure,
  DisclosurePanel as AriaDisclosurePanel,
  type DisclosurePanelProps as AriaDisclosurePanelProps,
  type DisclosureProps as AriaDisclosureProps,
  DisclosureStateContext,
  Heading,
} from "react-aria-components";
import { Button } from "@/components/shared/button";
import { tv } from "tailwind-variants";
import { ChevronRight } from "lucide-react";
import { composeTailwindRenderProps } from "@/lib/react-aria-utils";

const disclosure = tv({
  base: "group min-w-50 font-sans text-on-surface",
});

const chevron = tv({
  base: "w-4 h-4 text-on-surface transition-transform duration-200 ease-in-out",
  variants: {
    isExpanded: {
      true: "transform rotate-90",
    },
    isDisabled: {
      true: "text-on-surface-variant forced-colors:text-[GrayText]",
    },
  },
});

export interface DisclosureProps extends AriaDisclosureProps {
  children: React.ReactNode;
}

export function Disclosure({ children, ...props }: DisclosureProps) {
  return (
    <AriaDisclosure
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        disclosure({ ...renderProps, className }),
      )}
    >
      {children}
    </AriaDisclosure>
  );
}

export interface DisclosureHeaderProps {
  children: React.ReactNode;
}

export function DisclosureHeader({ children }: DisclosureHeaderProps) {
  const { isExpanded } = useContext(DisclosureStateContext)!;
  return (
    <Heading className="m-0 text-lg font-semibold capitalize">
      <Button slot="trigger" variant="quiet" className="w-full justify-start">
        {({ isDisabled }: { isDisabled: boolean }) => (
          <>
            <ChevronRight
              aria-hidden
              className={chevron({ isExpanded, isDisabled })}
            />
            <span className="capitalize">{children}</span>
          </>
        )}
      </Button>
    </Heading>
  );
}

export interface DisclosurePanelProps extends AriaDisclosurePanelProps {
  children: React.ReactNode;
}

export function DisclosurePanel({ children, ...props }: DisclosurePanelProps) {
  return (
    <AriaDisclosurePanel
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "h-(--disclosure-panel-height) max-h-96 overflow-clip overflow-y-scroll pb-2 motion-safe:transition-[height]",
      )}
    >
      <div className="px-4 py-2">{children}</div>
    </AriaDisclosurePanel>
  );
}