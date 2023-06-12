import { VisuallyHidden } from '@reach/visually-hidden'
import { useId } from 'react'

import { IconChecked } from '~/components'
import { TextIcon } from '~/components/TextIcon'

import Field, { FieldProps } from '../Field'
import styles from './styles.module.css'

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
      <label className={styles.label} htmlFor={fieldId}>
        <TextIcon
          icon={
            <IconChecked
              size="mdS"
              color={inputProps.checked ? 'green' : 'grey'}
            />
          }
          color="greyDark"
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
    </Field>
  )
}

export default CheckBox
