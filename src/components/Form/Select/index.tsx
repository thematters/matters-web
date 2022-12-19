import classNames from 'classnames'

import { DropdownDialog } from '~/components'

import { Z_INDEX } from '~/common/enums'

import Field, { FieldProps } from '../Field'
import Option from './Option'
import styles from './styles.css'

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
type Option = {
  name: string | React.ReactNode
  subtitle?: string | React.ReactNode
  value: any
  selected?: boolean
}

type SelectProps = {
  name: string
  title?: React.ReactNode
  options: Option[]
  size?: 'md' | 'sm'
  onChange: (option: Option) => void
} & Omit<FieldProps, 'fieldMsgId'>

const Select: React.FC<SelectProps> = ({
  name,
  title,
  label,
  labelVisHidden,

  options,
  onChange,

  size,
}) => {
  const fieldId = `field-${name}`
  const selectedOptionId = `${fieldId}-selected`

  const selectedOption = options.find((o) => o.selected) || options[0]

  const Options = ({ dropdown }: { dropdown?: boolean }) => {
    const optionsClasses = classNames({
      options: true,
      dropdown,
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
            key={option.value}
          />
        ))}

        <style jsx>{styles}</style>
      </ul>
    )
  }

  const Content = (
    <DropdownDialog
      dropdown={{
        appendTo: 'parent',
        content: <Options dropdown />,
        placement: 'bottom-end',
        zIndex: Z_INDEX.OVER_DIALOG,
      }}
      dialog={{
        content: <Options />,
        title: title || label,
      }}
    >
      {({ openDialog, type, ref }) => (
        <ul aria-labelledby={fieldId}>
          <Option
            role="button"
            ariaHasPopup={type}
            name={selectedOption.name}
            subtitle={selectedOption.subtitle}
            selected
            size={size}
            onClick={openDialog}
            ref={ref}
          />

          <style jsx>{styles}</style>
        </ul>
      )}
    </DropdownDialog>
  )

  return (
    <Field>
      <Field.Header
        label={label}
        labelId={fieldId}
        labelVisHidden={labelVisHidden}
      />

      {Content}
    </Field>
  )
}

export default Select
