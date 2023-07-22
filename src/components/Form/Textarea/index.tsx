import autosize from 'autosize'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'

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
  hasLabel,

  hint,
  error,
  hintAlign,

  spacingTop,
  spacingBottom,

  ...textareaProps
}) => {
  const node: React.RefObject<any> | null = useRef(null)
  const fieldId = `field-${name}`
  const fieldMsgId = `field-msg-${name}`
  const textareaClasses = classNames({
    [styles.textarea]: true,
    [styles.error]: error,
  })

  useEffect(() => {
    if (node && node.current) {
      autosize(node.current)
    }
  }, [])

  return (
    <Field spacingTop={spacingTop} spacingBottom={spacingBottom}>
      <Field.Header
        label={label}
        htmlFor={fieldId}
        extraButton={extraButton}
        hasLabel={hasLabel}
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

      <Field.Footer
        fieldMsgId={fieldMsgId}
        hint={hint}
        error={error}
        hintAlign={hintAlign}
      />
    </Field>
  )
}

export default Textarea
