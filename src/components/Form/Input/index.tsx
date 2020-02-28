import { randomString } from '~/common/utils'

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
  const fieldId = randomString()
  const fieldMsgId = randomString()

  return (
    <Field>
      <Field.Header htmlFor={fieldId} label={label} extraButton={extraButton} />

      <Field.Content>
        <input
          {...inputProps}
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
