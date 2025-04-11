import classNames from 'classnames'

import { Z_INDEX } from '~/common/enums'
import { Dropdown } from '~/components'

import Field, { FieldProps } from '../Field'
import Option from './Option'
import styles from './styles.module.css'

/**
 * Pure UI component for <select> & <option>
 *
 * Usage:
 *
 * ```jsx
 *   <Form.Select
 *     options={}
 *   />
 * ```
 *
 */
export type FormSelectOption<OptionValue> = {
  name: string | React.ReactNode
  subtitle?: string | React.ReactNode
  extra?: string | React.ReactNode
  value: OptionValue
  selected?: boolean
}

export type FormSelectProps<OptionValue> = {
  name: string
  options: FormSelectOption<OptionValue>[]
  size?: 14 | 16
  color?: 'campaignBlue'
  onChange: (option: FormSelectOption<OptionValue>) => void
} & Omit<FieldProps, 'fieldMsgId'>

const Select = <OptionValue,>({
  name,
  label,
  hasLabel,

  options,
  onChange,

  size,
  color,

  spacingTop,
  spacingBottom,
}: FormSelectProps<OptionValue>) => {
  const fieldId = `field-${name}`
  const selectedOptionId = `${fieldId}-selected`

  const selectedOption = options.find((o) => o.selected) || options[0]

  const Options = ({ dropdown }: { dropdown?: boolean }) => {
    const optionsClasses = classNames({
      [styles.list]: true,
      [styles.options]: true,
      [styles.dropdown]: dropdown,
    })

    return (
      <ul
        tabIndex={0}
        className={optionsClasses}
        role="listbox"
        aria-labelledby={fieldId}
        aria-activedescendant={selectedOptionId}
      >
        {options.map((option, index) => (
          <Option
            id={option.selected ? selectedOptionId : `${fieldId}-${index}`}
            name={option.name}
            subtitle={option.subtitle}
            onClick={() => onChange(option)}
            selected={option.selected}
            expanded
            size={size}
            key={index}
          />
        ))}
      </ul>
    )
  }

  const Content = (
    <Dropdown content={<Options dropdown />} zIndex={Z_INDEX.OVER_DIALOG}>
      {({ openDropdown, ref }) => (
        <ul aria-labelledby={fieldId} className={styles.list}>
          <Option
            onClick={openDropdown}
            role="button"
            ariaHasPopup="listbox"
            name={selectedOption.name}
            subtitle={selectedOption.subtitle}
            selected
            extra={selectedOption?.extra}
            size={size}
            color={color}
            ref={ref}
          />
        </ul>
      )}
    </Dropdown>
  )

  return (
    <Field spacingTop={spacingTop} spacingBottom={spacingBottom}>
      <Field.Header label={label} labelId={fieldId} hasLabel={hasLabel} />

      {Content}
    </Field>
  )
}

export default Select
