import { forwardRef } from 'react'

import Field, { FieldProps } from '../Field'
import styles from './styles.css'

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

const AmountInput = forwardRef(
  (
    {
      name,
      label,
      extraButton,

      hint,
      error,

      currency,

      ...inputProps
    }: AmountInputProps,
    ref: any
  ) => {
    const fieldId = `field-${name}`
    const fieldMsgId = `field-msg-${name}`

    return (
      <Field>
        <Field.Header
          htmlFor={fieldId}
          label={label}
          extraButton={extraButton}
        />

        <Field.Content>
          <span className="currency">{currency}</span>

          <input
            {...inputProps}
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

        <Field.Footer fieldMsgId={fieldMsgId} hint={hint} error={error} />

        <style jsx>{styles}</style>
      </Field>
    )
  }
)

export default AmountInput
