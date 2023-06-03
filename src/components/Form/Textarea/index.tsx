import autosize from 'autosize'
import classNames from 'classnames'
import { useEffect, useId, useRef } from 'react'

import Field, { FieldProps } from '../Field'
import styles from './styles.module.css'

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
  labelVisHidden,

  hint,
  error,

  ...textareaProps
}) => {
  const node: React.RefObject<any> | null = useRef(null)
  const fieldId = useId()
  const fieldMsgId = `${fieldId}-msg`
  const textareaClasses = classNames({
    error,
  })

  useEffect(() => {
    if (node && node.current) {
      autosize(node.current)
    }
  }, [])

  return (
    <Field>
      <Field.Header
        label={label}
        htmlFor={fieldId}
        extraButton={extraButton}
        labelVisHidden={labelVisHidden}
      />

      <Field.Content>
        <textarea
          ref={node}
          {...textareaProps}
          id={fieldId}
          name={name}
          aria-describedby={fieldMsgId}
          className={textareaClasses}
        />
      </Field.Content>

      <Field.Footer fieldMsgId={fieldMsgId} hint={hint} error={error} />
    </Field>
  )
}

export default Textarea
