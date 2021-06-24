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
 *     error="xxx"
 *     hint="xxx"
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

  options,
  onChange,

  size,

  hint,
  error,
}) => {
  const fieldId = `field-${name}`
  const fieldMsgId = `field-msg-${name}`

  const selectedOption = options.find((o) => o.selected) || options[0]

  const Options = ({ dropdown }: { dropdown?: boolean }) => {
    const optionsClasses = classNames({
      options: true,
      dropdown,
    })

    return (
      <ul className={optionsClasses} id={fieldId}>
        {options.map((option) => (
          <Option
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
      {({ openDialog, ref }) => (
        <ul
          id={fieldId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={fieldId}
          aria-describedby={fieldMsgId}
        >
          <Option
            name={selectedOption.name}
            subtitle={selectedOption.subtitle}
            selected
            size={size}
            onClick={openDialog}
            aria-haspopup="listbox"
            ref={ref}
          />

          <style jsx>{styles}</style>
        </ul>
      )}
    </DropdownDialog>
  )

  if (!label) {
    return Content
  }

  return (
    <Field>
      <Field.Header label={label} />

      {Content}

      <Field.Footer fieldMsgId={fieldMsgId} hint={hint} error={error} />
    </Field>
  )
}

export default Select
