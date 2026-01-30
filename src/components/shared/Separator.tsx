import React from "react";
import { tv } from "tailwind-variants";

type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
  role?: string;
  "aria-orientation"?: "horizontal" | "vertical";
} & React.HTMLAttributes<HTMLHRElement>;

const styles = tv({
  base: "bg-surface-dim forced-colors:bg-[ButtonBorder] border-none",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px min-h-8 h-full",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export function Separator({
  orientation = "horizontal",
  className,
  role = "separator",
  ...props
}: SeparatorProps) {
  return (
    <hr
      {...props}
      role={role}
      aria-orientation={orientation}
      className={styles({
        orientation,
        className,
      })}
    />
  );
}