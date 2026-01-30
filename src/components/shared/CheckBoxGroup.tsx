import type { ReactNode } from 'react';
import { CheckboxGroup as AriaCheckboxGroup, type CheckboxGroupProps as AriaCheckboxGroupProps, type ValidationResult } from 'react-aria-components';
import { FieldError, Label } from 'react-aria-components';
import { composeTailwindRenderProps } from '@/lib/react-aria-utils';

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'children'> {
    label?: string,
    children?: ReactNode,
    errorMessage?: string | ((validation: ValidationResult) => string)
}

export function CheckboxGroup(props: CheckboxGroupProps) {
    return (
        <AriaCheckboxGroup {...props} className={composeTailwindRenderProps(props.className, 'flex flex-col gap-2')}>
            <Label className='font-semibold text-md'>{props.label}</Label>
            {props.children}
            <FieldError>{props.errorMessage}</FieldError>
        </AriaCheckboxGroup>
    );
}
