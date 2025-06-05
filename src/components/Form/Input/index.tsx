import classNames from 'classnames'
import { forwardRef, useId } from 'react'

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
  leftButton?: React.ReactNode
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
      leftButton,
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
    const fieldId = useId()
    const fieldMsgId = `${fieldId}-msg`
    const inputClasses = classNames({
      [styles.input]: true,
      [styles.error]: error,
      [styles.wrapper]: !!leftButton || !!rightButton,
    })

    const input = (
      <input
        ref={ref as React.RefObject<HTMLInputElement> | null}
        {...inputProps}
        id={fieldId}
        name={name}
        type={type}
        aria-describedby={fieldMsgId}
        autoComplete="nope"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        className={!leftButton && !rightButton ? inputClasses : undefined}
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

        {leftButton && (
          <Field.Content>
            <section className={inputClasses}>
              {leftButton}
              {input}
            </section>
          </Field.Content>
        )}

        {rightButton && (
          <Field.Content>
            <section className={inputClasses}>
              {input}
              {rightButton}
            </section>
          </Field.Content>
        )}
        {!leftButton && !rightButton && <Field.Content>{input}</Field.Content>}

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
