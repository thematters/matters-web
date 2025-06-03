import { forwardRef, useId } from 'react'

import Field, { FieldProps } from '../Field'
import styles from './styles.module.css'

/**
 *
 * Usage:
 *
 * ```jsx
 *   <Form.AmountInput
 *     currency="HKD"
 *     error="xxx"
 *     hint="xxx"
 *     ...other <input> props...
 *   />
 * ```
 *
 */

type AmountInputProps = {
  name: string
  currency: string | React.ReactNode
} & Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  (
    {
      name,
      label,
      extraButton,
      hasLabel,

      hint,
      error,
      hintAlign,

      currency,

      spacingTop,
      spacingBottom,

      ...inputProps
    },
    ref
  ) => {
    const fieldId = useId()
    const fieldMsgId = `${fieldId}-msg`

    return (
      <Field spacingTop={spacingTop} spacingBottom={spacingBottom}>
        <Field.Header
          htmlFor={fieldId}
          label={label}
          extraButton={extraButton}
          hasLabel={hasLabel}
        />

        <Field.Content>
          <span className={styles.currency}>{currency}</span>

          <input
            {...inputProps}
            className={error ? `error ${styles.input}` : styles.input}
            id={fieldId}
            ref={ref}
            name={name}
            type="number"
            aria-describedby={fieldMsgId}
            autoComplete="nope"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </Field.Content>

        <Field.Footer
          fieldMsgId={fieldMsgId}
          hint={hint}
          error={error}
          hintAlign={hintAlign}
        />
      </Field>
    )
  }
)

AmountInput.displayName = 'AmountInput'

export default AmountInput
