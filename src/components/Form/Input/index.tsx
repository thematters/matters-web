import Field, { FieldProps } from '../Field'
import styles from './styles.css'

/**
 * Pure UI component for <input> element
 *
 * Usage:
 *
 * ```jsx
 *   <Form.Input
 *     type="email"
 *     error="xxx"
 *     hint="xxx"
 *     ...other <input> props...
 *   />
 * ```
 *
 */

type InputProps = {
  type: 'text' | 'password' | 'email' | 'number'
  name: string
} & Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const Input: React.FC<InputProps> = ({
  type,

  name,
  label,
  extraButton,

  hint,
  error,

  ...inputProps
}) => {
  const fieldMsgId = `input-msg-${name}`

  return (
    <Field>
      <Field.Header htmlFor={name} label={label} extraButton={extraButton} />

      <Field.Content>
        <input
          {...inputProps}
          id={name}
          name={name}
          type={type}
          aria-describedby={fieldMsgId}
        />
      </Field.Content>

      <Field.Footer fieldMsgId={fieldMsgId} hint={hint} error={error} />

      <style jsx>{styles}</style>
    </Field>
  )
}

export default Input
