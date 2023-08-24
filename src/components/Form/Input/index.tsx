import classNames from 'classnames'
import { forwardRef } from 'react'

import Field, { FieldProps } from '../Field'
import styles from './styles.module.css'

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
  hasFooter?: boolean
  rightButton?: React.ReactNode
} & Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const Input = forwardRef(
  (
    {
      type,

      name,
      hasFooter = true,
      rightButton,

      label,
      extraButton,
      hasLabel,

      hint,
      error,
      hintSize,
      hintAlign,
      hintSpace,

      spacingTop,
      spacingBottom,

      ...inputProps
    }: InputProps,
    ref
  ) => {
    const fieldId = `field-${name}`
    const fieldMsgId = `field-msg-${name}`
    const inputClasses = classNames({
      [styles.input]: true,
      [styles.error]: error,
      [styles.wrapper]: !!rightButton,
    })

    const input = (
      <input
        ref={ref as React.RefObject<any> | null}
        {...inputProps}
        id={fieldId}
        name={name}
        type={type}
        aria-describedby={fieldMsgId}
        autoComplete="nope"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        className={!rightButton ? inputClasses : undefined}
      />
    )

    return (
      <Field spacingTop={spacingTop} spacingBottom={spacingBottom}>
        <Field.Header
          htmlFor={fieldId}
          label={label}
          extraButton={extraButton}
          hasLabel={hasLabel}
        />

        {rightButton && (
          <Field.Content>
            <section className={inputClasses}>
              {input}
              {rightButton}
            </section>
          </Field.Content>
        )}
        {!rightButton && <Field.Content>{input}</Field.Content>}

        {hasFooter && (
          <Field.Footer
            fieldMsgId={fieldMsgId}
            hint={hint}
            error={error}
            hintSize={hintSize}
            hintAlign={hintAlign}
            hintSpace={hintSpace}
          />
        )}
      </Field>
    )
  }
)

Input.displayName = 'Input'

export default Input
