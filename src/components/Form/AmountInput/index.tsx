import Field, { FieldProps } from '../Field'
import styles from './styles.css'

/**
 *
 * Usage:
 *
 * ```jsx
 *   <Form.AmountInput
 *     fixedPlaceholder="HKD"
 *     error="xxx"
 *     hint="xxx"
 *     ...other <input> props...
 *   />
 * ```
 *
 */

type AmountInputProps = {
  name: string
  fixedPlaceholder: string | React.ReactNode
} & Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const AmountInput: React.FC<AmountInputProps> = ({
  name,
  label,
  extraButton,

  hint,
  error,

  fixedPlaceholder,

  ...inputProps
}) => {
  const fieldId = `field-${name}`
  const fieldMsgId = `field-msg-${name}`

  return (
    <Field>
      <Field.Header htmlFor={fieldId} label={label} extraButton={extraButton} />

      <Field.Content>
        <span className="fixed-placeholder">{fixedPlaceholder}</span>

        <input
          {...inputProps}
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

export default AmountInput
