import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useId } from 'react'

import { ReactComponent as IconCircleCheckFill } from '@/public/static/icons/24px/circle-check-fill.svg'
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
