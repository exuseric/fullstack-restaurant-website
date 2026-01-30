"use client";
import { Loader, SearchIcon, XIcon } from "lucide-react";
import React from "react";
import {
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
  type ValidationResult,
} from "react-aria-components";
import {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
} from "@/components/shared/search-field/Field";
import { composeTailwindRenderProps } from "@/lib/react-aria-utils";
import { FieldButton } from "@/components/shared/search-field/FieldButton";

export interface SearchFieldProps extends AriaSearchFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  isPending?: boolean;
}

export function SearchField({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex max-w-full min-w-10 flex-col gap-1 font-sans",
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup className="bg-surface-secondary-subtle rounded-none">
        <SearchIcon
          aria-hidden
          className="text-secondary group-disabled:text-on-surface-disabled ml-2 h-4 w-4 forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]"
        />
        <Input
          placeholder={placeholder}
          className="rounded-none bg-transparent pl-2 [&::-webkit-search-cancel-button]:hidden"
        />
        <FieldButton className="mr-1 w-6 group-empty:invisible">
          {props.isPending ? (
            <Loader className="text-primary h-4 w-4 animate-spin" />
          ) : (
            <XIcon aria-hidden className="h-4 w-4" />
          )}
        </FieldButton>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaSearchField>
  );
}