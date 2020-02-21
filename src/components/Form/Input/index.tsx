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
  type: 'text' | 'password' | 'email'
  name: string
} & FieldProps &
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
}) => (
  <Field>
    <Field.Header htmlFor={name} label={label} extraButton={extraButton} />

    <Field.Content>
      <input {...inputProps} id={name} name={name} type={type} />
    </Field.Content>

    <Field.Footer hint={hint} error={error} />

    <style jsx>{styles}</style>
  </Field>
)

export default Input
