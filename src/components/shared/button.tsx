"use client";
import React from "react";
import {
  composeRenderProps,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "@/lib/react-aria-utils";

export interface ButtonProps extends RACButtonProps {
  /** @default 'neutral' */
  variant?: "neutral" | "primary" | "secondary" | "destructive" | "quiet";
}

const button = tv({
  extend: focusRing,
  base: "relative inline-flex items-center justify-center gap-2 border border-transparent h-9 box-border px-3.5 py-0 [&:has(>svg:only-child)]:px-0 [&:has(>svg:only-child)]:h-8 [&:has(>svg:only-child)]:w-8 font-sans text-sm text-center transition rounded-none cursor-pointer [-webkit-tap-highlight-color:transparent] pressed:button--pressed",
  variants: {
    variant: {
      neutral:
        "bg-surface-background hover:bg-surface-background-hover border-border-base",
      primary:
        "bg-button-primary-bg hover:button-primary-bg-hover text-button-primary-text",
      secondary:
        "border-black/10 bg-button-secondary-bg hover:bg-button-secondary-bg-hover text-button-secondary-text",
      destructive: "bg-red-700 hover:bg-red-800 pressed:bg-red-900 text-white",
      quiet:
        "border-0 bg-transparent hover:bg-neutral-200 pressed:bg-neutral-300 text-neutral-800 dark:hover:bg-neutral-700 dark:pressed:bg-neutral-600 dark:text-neutral-100",
    },
    isDisabled: {
      true: "border-transparent dark:border-transparent bg-neutral-100 dark:bg-neutral-800 text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText]",
    },
    isPending: {
      true: "text-transparent",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
  compoundVariants: [
    {
      variant: "quiet",
      isDisabled: true,
      class: "bg-transparent dark:bg-transparent",
    },
  ],
});

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, variant: props.variant, className }),
      )}
    >
      {composeRenderProps(props.children, (children, { isPending }) => (
        <>
          {children}
          {isPending && (
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg
                className="h-4 w-4 animate-spin text-white"
                viewBox="0 0 24 24"
                stroke={
                  props.variant === "secondary" || props.variant === "quiet"
                    ? "light-dark(black, white)"
                    : "white"
                }
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  fill="none"
                  className="opacity-25"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  pathLength="100"
                  strokeDasharray="60 140"
                  strokeDashoffset="0"
                />
              </svg>
            </span>
          )}
        </>
      ))}
    </RACButton>
  );
}
