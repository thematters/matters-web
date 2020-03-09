import VisuallyHidden from '@reach/visually-hidden'

import { Icon } from '~/components'
import { TextIcon } from '~/components/TextIcon'

import Field, { FieldProps } from '../Field'
import styles from './styles.css'

type CheckBoxProps = {
  name: string
} & Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const CheckBox: React.FC<CheckBoxProps> = ({
  name,

  hint,
  error,

  ...inputProps
}) => {
  const fieldId = `field-${name}`
  const fieldMsgId = `field-msg-${name}`

  return (
    <Field>
      <label htmlFor={fieldId}>
        <TextIcon
          icon={
            inputProps.checked ? (
              <Icon.CheckActive size="md-s" />
            ) : (
              <Icon.CheckInactive size="md-s" />
            )
          }
          color="grey-dark"
          spacing="xtight"
        >
          {hint}
        </TextIcon>

        <VisuallyHidden>
          <input
            id={fieldId}
            type="checkbox"
            aria-describedby={fieldMsgId}
            name={name}
            {...inputProps}
          />
        </VisuallyHidden>
      </label>

      <Field.Footer fieldMsgId={fieldMsgId} error={error} />

      <style jsx>{styles}</style>
    </Field>
  )
}

export default CheckBox
