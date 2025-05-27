import classNames from 'classnames'
import { useEffect, useId, useRef } from 'react'
import { useVisuallyHidden } from 'react-aria'

import { ReactComponent as IconCircleCheckedFill } from '@/public/static/icons/24px/circle-check-fill.svg'
import { ReactComponent as IconCircleEmpty } from '@/public/static/icons/24px/circle-empty.svg'
import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'

import Field, { FieldProps } from '../Field'
import styles from './styles.module.css'

/**
 *
 * Usage:
 *
 * ```jsx
 *   <Form.RadioGroup
 *     error="xxx"
 *     hint="xxx"
 *     ...other <input> props...
 *   />
 * ```
 *
 */

type RadioInputProps = {
  label: React.ReactNode
  currentValue: string
} & FieldProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

type RadioGroupProps = {
  options: {
    label: React.ReactNode
    value: string
  }[]
  currentValue: string
} & Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const RadioInput: React.FC<RadioInputProps> = ({
  label,

  value,
  name,

  fieldMsgId,
  currentValue,

  disabled,
  ...inputProps
}) => {
  const inputRef: React.RefObject<any> = useRef(null)

  const fieldId = useId()
  const isActive = currentValue === value

  const { visuallyHiddenProps } = useVisuallyHidden()

  const itemClasses = classNames({
    [styles.radioInputItem]: true,
    'u-area-disable': disabled,
  })

  useEffect(() => {
    if (!isActive && inputRef.current) {
      inputRef.current.blur()
      inputRef.current.checked = false
    }
  }, [isActive])

  return (
    <li className={itemClasses}>
      <label htmlFor={fieldId}>
        <TextIcon
          spacing={8}
          size={14}
          icon={
            isActive ? (
              <Icon icon={IconCircleCheckedFill} size={20} color="green" />
            ) : (
              <Icon icon={IconCircleEmpty} size={20} />
            )
          }
        >
          {label}
        </TextIcon>

        <input
          {...inputProps}
          id={fieldId}
          value={value}
          name={name} // share the same name for single selection
          type="radio"
          aria-describedby={fieldMsgId}
          disabled={disabled}
          ref={inputRef}
          {...visuallyHiddenProps}
        />
      </label>
    </li>
  )
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,

  options,

  hint,
  error,
  hintAlign,

  lang,

  spacingTop,
  spacingBottom,

  ...inputProps
}) => {
  const fieldMsgId = `field-msg-${name}`

  return (
    <Field spacingTop={spacingTop} spacingBottom={spacingBottom}>
      <Field.Header label={label} hasLabel />

      <ul className={styles.radioInputOptions}>
        {options.map(({ label, value }) => (
          <RadioInput
            {...inputProps}
            key={value}
            fieldMsgId={fieldMsgId}
            name={name}
            value={value}
            label={label}
          />
        ))}
      </ul>

      <Field.Footer
        fieldMsgId={fieldMsgId}
        error={error}
        hint={hint}
        hintAlign={hintAlign}
      />
    </Field>
  )
}

export default RadioGroup
