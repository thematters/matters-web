import { VisuallyHidden } from '@reach/visually-hidden'
import { useId } from 'react'

import { IconChecked } from '~/components'
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
  const fieldId = useId()
  const fieldMsgId = `${fieldId}-msg`

  return (
    <Field>
      <label htmlFor={fieldId}>
        <TextIcon
          icon={
            <IconChecked
              size="md-s"
              color={inputProps.checked ? 'green' : 'grey'}
            />
          }
          color="grey-dark"
          spacing="xtight"
        >
          <span>{hint}</span>
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
