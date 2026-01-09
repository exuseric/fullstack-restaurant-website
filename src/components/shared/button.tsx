import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 w-full md:w-fit whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] active:button--pressed no-underline cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-button-primary-bg text-button-primary-text border border-button-primary-border hover:bg-button-primary-bg-hover focus-visible:border-border-focus focus-visible:ring-border-focus-ring/50 disabled:bg-button-primary-bg-disabled disabled:text-button-primary-text-disabled disabled:border-button-primary-bg-disabled",
        secondary:
          "bg-button-secondary-bg text-button-secondary-text border border-button-secondary-border hover:bg-button-secondary-bg-hover focus-visible:border-border-focus focus-visible:ring-border-focus-ring/50 disabled:bg-button-secondary-bg-disabled disabled:text-button-secondary-text-disabled disabled:border-button-secondary-bg-disabled",
        destructive:
          "bg-button-destructive-bg text-button-destructive-text border border-button-destructive-bg hover:bg-button-destructive-bg-hover focus-visible:border-border-focus focus-visible:ring-border-focus-ring/50 disabled:opacity-50",
        outline:
          "bg-button-outline-bg text-button-outline-text border border-button-outline-border hover:bg-button-outline-bg-hover hover:text-button-outline-text-hover focus-visible:border-border-focus focus-visible:ring-border-focus-ring/50 disabled:opacity-50",
        ghost:
          "bg-button-ghost-bg text-button-ghost-text hover:bg-button-ghost-bg-hover hover:text-button-ghost-text-hover focus-visible:ring-border-focus-ring/50 disabled:opacity-50",
        link: "text-link-base underline-offset-4 hover:underline hover:text-link-hover active:text-link-active disabled:text-link-disabled",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
