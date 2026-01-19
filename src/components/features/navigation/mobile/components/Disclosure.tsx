import React, { useContext } from "react";
import {
  Disclosure as AriaDisclosure,
  type DisclosureProps as AriaDisclosureProps,
  DisclosurePanel as AriaDisclosurePanel,
  type DisclosurePanelProps as AriaDisclosurePanelProps,
  composeRenderProps,
  Heading,
  DisclosureStateContext,
} from "react-aria-components";
import { Button } from "../../../../shared/Button";
import { tv } from "tailwind-variants";
import { ChevronDown, ChevronRight } from "lucide-react";
import { composeTailwindRenderProps } from "@/lib/react-aria-utils";

const disclosure = tv({
  base: "group font-sans",
});

const chevron = tv({
  base: "w-4 h-4 text-foreground-tertiary transition-transform duration-200 ease-in-out",
  variants: {
    isExpanded: {
      true: "transform rotate-180",
    },
    isDisabled: {
      true: "text-foreground-disabled forced-colors:text-[GrayText]",
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
    <Heading className="m-0 font-normal">
      <Button
        slot="trigger"
        variant="quiet"
        className="w-full! justify-start px-0 font-medium"
      >
        {({ isDisabled }: { isDisabled: boolean }) => (
          <>
            <span>{children}</span>
            <ChevronDown
              aria-hidden
              className={chevron({ isExpanded, isDisabled })}
            />
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
        "h-(--disclosure-panel-height) overflow-clip motion-safe:transition-[height]",
      )}
    >
      <div className="px-4 py-2">{children}</div>
    </AriaDisclosurePanel>
  );
}
