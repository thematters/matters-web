import autosize from 'autosize'
import { useEffect, useRef } from 'react'

import Field, { FieldProps } from '../Field'
import styles from './styles.css'

/**
 * Pure UI component for <textarea> element
 *
 * Usage:
 *
 * ```jsx
 *   <Form.Textarea
 *     type="email"
 *     error="xxx"
 *     hint="xxx"
 *     ...other <textarea> props...
 *   />
 * ```
 *
 */
type TextareaProps = {
  name: string
} & Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  extraButton,

  hint,
  error,

  ...textareaProps
}) => {
  const node = useRef<HTMLTextAreaElement>(null)
  const fieldId = `field-${name}`
  const fieldMsgId = `field-msg-${name}`

  useEffect(() => {
    if (node && node.current) {
      autosize(node.current)
    }
  }, [])

  return (
    <Field>
      <Field.Header label={label} htmlFor={fieldId} extraButton={extraButton} />

      <Field.Content>
        <textarea
          ref={node}
          {...textareaProps}
          id={fieldId}
          name={name}
          aria-describedby={fieldMsgId}
        />
      </Field.Content>

      <Field.Footer fieldMsgId={fieldMsgId} hint={hint} error={error} />

      <style jsx>{styles}</style>
    </Field>
  )
}

export default Textarea
