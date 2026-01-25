import { Check, Minus } from 'lucide-react';
import { Checkbox as AriaCheckbox, type CheckboxProps, composeRenderProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '@/lib/react-aria-utils';

const checkboxStyles = tv({
    base: 'flex gap-2 items-center group text-sm transition relative [-webkit-tap-highlight-color:transparent]',
    variants: {
        isDisabled: {
            false: 'text-on-surface',
            true: 'text-on-surface-variant forced-colors:text-[GrayText]'
        }
    }
});

const boxStyles = tv({
    extend: focusRing,
    base: 'size-4 box-border shrink-0 rounded-sm flex items-center justify-center border transition  group-pressed:bg-surface-higher group-pressed:scale-90',
    variants: {
        isSelected: {
            false: 'bg-surface-container-high border-outline',
            true: 'bg-primary border-outline text-on-primary'
        },
        isInvalid: {
            true: 'bg-error-container border-error text-error'
        },
        isDisabled: {
            true: 'bg-surface-dim text-on-surface border-outline'
        }
    }
});

const iconStyles = 'size-3 text-current group-disabled:text-neutral-400 forced-colors:text-[HighlightText]';

export function Checkbox(props: CheckboxProps) {
    return (
        <AriaCheckbox {...props} className={composeRenderProps(props.className, (className, renderProps) => checkboxStyles({ ...renderProps, className }))}>
            {composeRenderProps(props.children, (children, { isSelected, isIndeterminate, ...renderProps }) => (
                <>
                    <div className={boxStyles({ isSelected: isSelected || isIndeterminate, ...renderProps })}>
                        {isIndeterminate
                            ? <Minus aria-hidden className={iconStyles} />
                            : isSelected
                                ? <Check aria-hidden className={iconStyles} />
                                : null
                        }
                    </div>
                    {children}
                </>
            ))}
        </AriaCheckbox>
    );
}
