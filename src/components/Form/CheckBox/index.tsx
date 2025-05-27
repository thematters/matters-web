import { useId } from 'react'
import { useVisuallyHidden } from 'react-aria'

import IconCircleCheckFill from '@/public/static/icons/24px/circle-check-fill.svg'
import { Icon, TextIcon } from '~/components'

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
  const fieldId = useId()
  const fieldMsgId = `${fieldId}-msg-${name}`

  const { visuallyHiddenProps } = useVisuallyHidden()

  return (
    <Field spacingTop={spacingTop} spacingBottom={spacingBottom}>
      <label className={styles.label} htmlFor={fieldId}>
        <TextIcon
          icon={
            <Icon
              icon={IconCircleCheckFill}
              size={20}
              color={inputProps.checked ? 'green' : 'grey'}
            />
          }
          color="greyDark"
          spacing={8}
        >
          <span>{hint}</span>
        </TextIcon>

        <input
          {...inputProps}
          id={fieldId}
          type="checkbox"
          aria-describedby={fieldMsgId}
          name={name}
          {...visuallyHiddenProps}
        />
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
