import { VisuallyHidden } from '@reach/visually-hidden'

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
  hintAlign,

  spacingTop,
  spacingBottom,

  ...inputProps
}) => {
  const fieldId = `field-${name}`
  const fieldMsgId = `field-msg-${name}`

  return (
    <Field spacingTop={spacingTop} spacingBottom={spacingBottom}>
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
            {...inputProps}
            id={fieldId}
            type="checkbox"
            aria-describedby={fieldMsgId}
            name={name}
          />
        </VisuallyHidden>
      </label>

      <Field.Footer
        fieldMsgId={fieldMsgId}
        error={error}
        hintAlign={hintAlign}
      />
    </Field>
  )
}

export default CheckBox
